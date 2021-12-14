/**
 * Copyright 2020 IBM All Rights Reserved.
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

describe('GLBMonitorApi', () => {
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

  let glbMonitorInstance;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    glbMonitorInstance = GLBMonitorApi.newInstance(options);
    expect(glbMonitorInstance).not.toBeNull();
    done();
  });

  describe('Create/verify a health check', () => {
    // health check monitor params
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

    // Save the health check/monitor ID for deletion/fetch.
    let monitorId = '';

    // create a health check and verify the results
    test('successfully create a glb health check monitor', async done => {
      try {
        const params = {
          ...monitorParams,
        };
        const response = await glbMonitorInstance.createLoadBalancerMonitor(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          monitorId = result.result.id;
          expect(result.success).toBeTruthy();
          expect(result.result.id).toBeDefined();
          expect(result.result.expectedCodes).toBe(params.expected_codes);
          expect(result.result.type).toBe(params.type);
          expect(result.result.description).toBe(params.description);
          expect(result.result.method).toBe(params.method);
          expect(result.result.port).toBe(params.port);
          expect(result.result.path).toBe(params.path);
          expect(result.result.timeout).toBe(params.timeout);
          expect(result.result.retries).toBe(params.retries);
          expect(result.result.interval).toBe(params.interval);
          expect(result.result.followRedirects).toBe(params.follow_redirects);
          expect(result.result.expectedBody).toBe(params.expected_body);
          expect(result.result.allowInsecure).toBe(params.allow_insecure);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    // get the glb monitor and verify name/id
    test('successfully get health check monitor details', async done => {
      const params = {
        monitorIdentifier: monitorId,
      };
      try {
        const response = await glbMonitorInstance.getLoadBalancerMonitor(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          monitorId = result.result.id;
          expect(result.result.description).toBeDefined();
          expect(result.result.id).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    // List all the glb health check monitors.
    test('successfully list all health check monitors', async done => {
      try {
        const response = await glbMonitorInstance.listAllLoadBalancerMonitors({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result.result.length).toBeGreaterThan(0);
        if (result.result && result.result.length > 0) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          // loop through the list of monitors.  If we find the id of the  created health check, verify the description is correct.
          for (const glbm of result.result) {
            if (glbm.id == monitorId) {
              expect(glbm.description).toBe(monitorParams.description);
            }
          }
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    // update a glb monitor and verify the results
    test('successfully update a health check monitor', async done => {
      // params for patching dedicated health check
      const params = {
        ...monitorParams,
        type: 'https',
        description: 'test monitor updated',
        monitorIdentifier: monitorId,
      };
      try {
        const response = await glbMonitorInstance.editLoadBalancerMonitor(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toBe(monitorId);
          expect(result.success).toBeTruthy();
          expect(result.result.id).toBeDefined();
          expect(result.result.type).toBe(params.type);
          expect(result.result.description).toBe(params.description);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    // delete the glb monitor
    test('successfully delete the health check monitor', async done => {
      const params = {
        monitorIdentifier: monitorId,
      };

      try {
        const response = await glbMonitorInstance.deleteLoadBalancerMonitor(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to create monitor when type is set to TCP and port is not given', async done => {
      try {
        const tcpParams = {
          ...monitorParams,
          type: 'tcp',
          port: 0,
        };
        await glbMonitorInstance.createLoadBalancerMonitor(tcpParams);
      } catch (err) {
        expect(err.status).toEqual(400);
        expect(err.message).toEqual(
          'port must be set to non-zero for TCP monitors: validation failed'
        );
        done();
      }
      done();
    });

    test('should fail to update monitors for invalid monitor id', async done => {
      try {
        await glbMonitorInstance.editLoadBalancerMonitor({ monitorIdentifier: '111' });
      } catch (err) {
        expect(err.status).toEqual(500);
        done();
      }
      done();
    });
  });
});
