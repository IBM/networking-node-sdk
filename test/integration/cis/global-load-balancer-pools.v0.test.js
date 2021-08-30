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

const GLBPoolApi = require('../../../dist/cis/global-load-balancer-pools/v0');
const GLBMonitorApi = require('../../../dist/cis/global-load-balancer-monitor/v1');
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

describe.skip('GLBPoolApi', () => {
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

  let glbPoolInstance;
  let glbMonitorInstance;
  let healthCheckId;
  let poolId;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    glbPoolInstance = GLBPoolApi.newInstance(options);
    glbMonitorInstance = GLBMonitorApi.newInstance(options);
    expect(glbMonitorInstance).not.toBeNull();
    expect(glbPoolInstance).not.toBeNull();
    done();
  });

  // LoadBalancerPoolReqOriginsItem
  const loadBalancerPoolReqOriginsItemModel = {
    name: 'app-server-1',
    address: '123.4.5.6',
    enabled: true,
    weight: 1,
  };

  // Construct the params object for operation createLoadBalancerPool.
  const randomId = new Date().getTime().toString(36);
  const poolConfig = {
    name: `primary-dc-1${randomId}`,
    checkRegions: ['WNAM'],
    origins: [loadBalancerPoolReqOriginsItemModel],
    description: 'Primary data center - Provider XYZ',
    minimumOrigins: 1,
    enabled: true,
    notificationEmail: config.NOTIFICATION_EMAIL,
  };

  describe('Create and verify GLB pool', () => {
    test('successfully create a global load balancer', async done => {
      const monitorParams = {
        expectedCodes: '2xx',
        type: 'http',
        description: 'test monitor creation',
        method: 'GET',
        port: 8080,
        path: '/',
        timeout: 5,
        retries: 2,
        interval: 60,
        followRedirects: true,
        expectedBody: 'alive',
        allowInsecure: true,
        header: { 'key1': ['testString'] },
      };

      try {
        const monitorResponse = await glbMonitorInstance.createLoadBalancerMonitor(monitorParams);
        let { result } = monitorResponse || {};
        if (result.result && Object.keys(result.result).length > 0) {
          healthCheckId = result.result.id;
        }
        const response = await glbPoolInstance.createLoadBalancerPool({
          ...poolConfig,
          monitor: healthCheckId,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        result = response.result || {};
        if (result.result && Object.keys(result.result).length > 0) {
          poolId = result.result.id;
          expect(result.success).toBeTruthy();
          expect(result.result.id).toBeDefined();
          expect(result.result.expectedCodes).toBe(poolConfig.minimum_origins);
          expect(result.result.description).toBe(poolConfig.description);
          expect(result.result.method).toBe(poolConfig.notification_email);
          expect(result.result.name).toBe(poolConfig.name);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to create glb pool with same name', async done => {
      try {
        await glbPoolInstance.createLoadBalancerPool(poolConfig);
      } catch (err) {
        expect(err.status).toEqual(409);
        expect(err.message).toEqual('A pool with that name already exists: value not unique');
        done();
      }
      done();
    });
  });

  describe('List GLB Pools', () => {
    test('should list all the pools', async done => {
      try {
        const response = await glbPoolInstance.listAllLoadBalancerPools({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result.result && result.result.length > 0) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          // loop through the list of pool's and match with stored pool id.
          for (const pool of result.result) {
            if (pool.id == poolId) {
              expect(pool.description).toBe(pool.description);
            }
          }
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update GLB Pool', () => {
    test('should successfully update the name of the glb pool', async done => {
      try {
        const params = {
          ...poolConfig,
          description: 'test pool updated',
          monitor: healthCheckId,
          poolIdentifier: poolId,
        };
        const response = await glbPoolInstance.editLoadBalancerPool(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result.description).toBe(params.description);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update the pool with wrong identifier', async done => {
      try {
        await glbPoolInstance.editLoadBalancerPool({ poolIdentifier: '111' });
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Get GLB Pool by Id', () => {
    test('should successfully fetches the glb pool details by id', async done => {
      try {
        const response = await glbPoolInstance.getLoadBalancerPool({
          poolIdentifier: poolId,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();
        expect(result.result.id).toEqual(poolId);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to get pool details for wrong instance id', async done => {
      try {
        await glbPoolInstance.getLoadBalancerPool({
          poolIdentifier: '111',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }
      done();
    });
  });

  describe('Delete GLB Pool', () => {
    test('successfully delete glb pool by id', async done => {
      try {
        const response = await glbPoolInstance.deleteLoadBalancerPool({
          poolIdentifier: poolId,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        await glbMonitorInstance.deleteLoadBalancerMonitor({
          monitorIdentifier: healthCheckId,
        });
        done();
      } catch (err) {
        done(err);
      }
    });

    test('fail to delete the pool by id', async done => {
      try {
        await glbPoolInstance.deleteLoadBalancerPool({
          poolIdentifier: '111',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }
      done();
    });
  });
});
