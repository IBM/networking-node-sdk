/**
 * Copyright 2020, 2021 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const GlobalLoadBalancerApi = require('../../../dist/cis/global-load-balancer/v1');
const GLBPoolApi = require('../../../dist/cis/global-load-balancer-pools/v0');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const authHelper = require('../../resources/auth-helper.js');

const timeout = 120000; // two minutes

// Location of our config file.
const configFile = 'cis.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

// Retrieve the config file as an object.
// We do this because we're going to directly use the
// config properties, rather than let the SDK do it for us.
const config = authHelper.loadConfig();

describe.skip('GlobalLoadBalancerApi', () => {
  jest.setTimeout(timeout);

  // Initialize the service client.
  const options = {
    authenticator: new IamAuthenticator({
      apikey: config.CIS_SERVICES_APIKEY,
      url: config.CIS_SERVICES_AUTH_URL,
    }),
    crn: config.CIS_SERVICES_CRN,
    serviceUrl: config.CIS_SERVICES_URL,
    version: config.CIS_SERVICES_API_VERSION,
    zoneIdentifier: config.CIS_SERVICES_ZONE_ID,
  };

  let loadBalancerInstance;
  let glbPoolInstance;
  let loadBalancerId;
  let poolId;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    loadBalancerInstance = GlobalLoadBalancerApi.newInstance(options);
    glbPoolInstance = GLBPoolApi.newInstance(options);
    expect(loadBalancerInstance).not.toBeNull();
    expect(glbPoolInstance).not.toBeNull();
    done();
  });

  const loadBalancerConfig = {
    name: config.DOMAIN_NAME,
    description: 'Load Balancer for npathak.austest-10.cistest-load.com',
    ttl: 30,
    proxied: true,
    enabled: true,
    sessionAffinity: 'ip_cookie',
    steeringPolicy: 'dynamic_latency',
  };

  describe.skip('Create and verify load balancer', () => {
    // Construct the params object for operation createLoadBalancer
    const randomId = new Date().getTime().toString(36);
    const poolConfig = {
      name: `default-pool${randomId}`,
      checkRegions: ['WNAM'],
      origins: [
        {
          name: 'app-server-1',
          address: '0.0.0.0',
          enabled: true,
          weight: 1,
        },
      ],
      description: 'Primary data center - Provider',
      minimumOrigins: 1,
      enabled: true,
    };

    test('successfully create a global load balancer', async done => {
      try {
        const poolResponse = await glbPoolInstance.createLoadBalancerPool(poolConfig);
        let { result } = poolResponse || {};
        if (result.result && Object.keys(result.result).length > 0) {
          poolId = result.result.id;
        }
        const response = await loadBalancerInstance.createLoadBalancer({
          ...loadBalancerConfig,
          defaultPools: [poolId],
          fallbackPool: poolId,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        result = response.result || {};
        if (result.result && Object.keys(result.result).length > 0) {
          loadBalancerId = result.result.id;
          expect(result.success).toBeTruthy();
          expect(result.result.id).toBeDefined();
          expect(result.result.name).toBe(loadBalancerConfig.name);
          expect(result.result.session_affinity).toBe(loadBalancerConfig.sessionAffinity);
          expect(result.result.steering_policy).toBe(loadBalancerConfig.steeringPolicy);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to create a load balancer with same name', async done => {
      try {
        await loadBalancerInstance.createLoadBalancer({
          ...loadBalancerConfig,
          defaultPools: [poolId],
          fallbackPool: poolId,
        });
      } catch (err) {
        expect(err.status).toEqual(409);
        expect(err.message).toEqual(
          'A load balancer with that name already exists: value not unique'
        );
        done();
      }
      done();
    });
  });

  describe.skip('List Load Balancers', () => {
    test('should list all the load balancers', async done => {
      try {
        const response = await loadBalancerInstance.listAllLoadBalancers({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result.result && result.result.length > 0) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          // loop through the list of glb's and match with stored glb id.
          for (const glb of result.result) {
            if (glb.id == loadBalancerId) {
              expect(glb.description).toBe(loadBalancerConfig.description);
            }
          }
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update Load Balancer', () => {
    test('should successfully update the name of the load balancer', async done => {
      try {
        const params = {
          ...loadBalancerConfig,
          defaultPools: [poolId],
          fallbackPool: poolId,
          name: `app.${config.DOMAIN_NAME}`,
          loadBalancerIdentifier: loadBalancerId,
        };
        const response = await loadBalancerInstance.editLoadBalancer(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result.name).toEqual(`app.${config.DOMAIN_NAME}`);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update the load balancer with wrong identifier', async done => {
      try {
        const params = {
          ...loadBalancerConfig,
          name: 'testapp',
          loadBalancerIdentifier: 111,
        };
        await loadBalancerInstance.editLoadBalancer(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Get Load balancer by Id', () => {
    test('should successfully fetches the load balancer settings by load balancer id', async done => {
      try {
        const response = await loadBalancerInstance.getLoadBalancerSettings({
          loadBalancerIdentifier: loadBalancerId,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();
        expect(result.result.id).toEqual(loadBalancerId);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to get load balancer for wrong instance id', async done => {
      try {
        await loadBalancerInstance.getLoadBalancerSettings({
          loadBalancerIdentifier: '111',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }
      done();
    });
  });

  describe('Delete Load Balancer Configuration', () => {
    test('successfully delete load balancer by glb id', async done => {
      try {
        const response = await loadBalancerInstance.deleteLoadBalancer({
          loadBalancerIdentifier: loadBalancerId,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        // delete the associated pool.
        await glbPoolInstance.deleteLoadBalancerPool({
          poolIdentifier: poolId,
        });
        done();
      } catch (err) {
        done(err);
      }
    });

    test('fail to delete the load balancer by instanceID', async done => {
      try {
        await loadBalancerInstance.deleteLoadBalancer({
          loadBalancerIdentifier: '111',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }
      done();
    });
  });
});
