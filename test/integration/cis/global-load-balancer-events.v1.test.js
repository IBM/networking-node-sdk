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

const GLBEventsApi = require('../../../dist/cis/global-load-balancer-events/v1');
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

describe.skip('GLBEventsApi', () => {
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

  let glbEventsInstance;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    glbEventsInstance = GLBEventsApi.newInstance(options);
    expect(glbEventsInstance).not.toBeNull();
    done();
  });

  // get glb events list
  test('successfully get glb events list', async done => {
    const params = {};
    try {
      const response = await glbEventsInstance.getLoadBalancerEvents(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result.result.length).toBeGreaterThanOrEqual(0);
      done();
    } catch (err) {
      done(err);
    }
  });

  test('should fail to get events list for invalid params', async done => {
    try {
      await glbEventsInstance.getLoadBalancerEvents({ id: '111' });
    } catch (err) {
      expect(err.status).toEqual(500);
      done();
    }
    done();
  });
});
