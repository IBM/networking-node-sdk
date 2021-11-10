/**
 * Copyright 2021 IBM All Rights Reserved.
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

const EdgeFunctionsApiV1 = require('../../../dist/cis/edgefunctionsapiv1/v1');
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

const currentDate = new Date();
const timestamp = currentDate.getTime().toString();
let edgeFunctionsApiV1;
let edgeFunctionAction;
let edgeFunctionTrigger;

describe.skip('EdgeFunctionsApiV1', () => {
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

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    edgeFunctionsApiV1 = EdgeFunctionsApiV1.newInstance(options);
    expect(edgeFunctionsApiV1).not.toBeNull();
    done();
  });

  describe('Uploading the Edge Functions Action', () => {
    test('should successfully upload Edge functions Action', async done => {
      try {
        const params = {
          scriptName: timestamp,
          edgeFunctionsAction:
            "addEventListener('fetch', (event) => { event.respondWith(handleRequest(event.request)) })",
        };
        const response = await edgeFunctionsApiV1.updateEdgeFunctionsAction(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Fetching the List all Edge Functions Actions', () => {
    test('should successfully List all Edge functions Actions', async done => {
      try {
        const response = await edgeFunctionsApiV1.listEdgeFunctionsActions();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        if (result && result.result && result.result.length > 0) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          expect(result.result).toBeDefined();
          const items = result.result.filter(item => item.id === timestamp);
          edgeFunctionAction = items[0];
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Fetching the Edge Functions Action', () => {
    test('should successfully fetch Edge functions Action', async done => {
      try {
        const params = {
          scriptName: edgeFunctionAction.id,
        };
        const response = await edgeFunctionsApiV1.getEdgeFunctionsAction(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Uploading the Edge Functions Trigger', () => {
    test('should successfully upload Edge functions Trigger', async done => {
      try {
        const params = {
          'script': edgeFunctionAction.id,
          'pattern': timestamp + '.' + config.DOMAIN_NAME + '/*',
        };
        const response = await edgeFunctionsApiV1.createEdgeFunctionsTrigger(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Fetching the List all Edge Functions Trigger', () => {
    test('should successfully List all Edge functions Trigger', async done => {
      try {
        const response = await edgeFunctionsApiV1.listEdgeFunctionsTriggers();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        if (result && result.result && result.result.length > 0) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          expect(result.result).toBeDefined();
          const items = result.result.filter(item => item.script === timestamp);
          edgeFunctionTrigger = items[0];
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Fetching the Edge Functions Trigger', () => {
    test('should successfully fetch Edge functions Trigger', async done => {
      try {
        const params = {
          routeId: edgeFunctionTrigger.id,
        };
        const response = await edgeFunctionsApiV1.getEdgeFunctionsTrigger(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Updating the Edge Functions Trigger', () => {
    test('should successfully update Edge functions Trigger', async done => {
      try {
        const params = {
          pattern: timestamp + '.' + config.DOMAIN_NAME + '/*',
          routeId: edgeFunctionTrigger.id,
        };
        const response = await edgeFunctionsApiV1.updateEdgeFunctionsTrigger(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Deleting the Edge Functions Trigger', () => {
    test('should successfully delete Edge functions Trigger', async done => {
      try {
        const params = {
          routeId: edgeFunctionTrigger.id,
        };
        const response = await edgeFunctionsApiV1.deleteEdgeFunctionsTrigger(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        expect(result.success).toEqual(true);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Deleting the Edge Functions Action', () => {
    test('should successfully delete Edge functions Action', async done => {
      try {
        const params = {
          scriptName: edgeFunctionAction.id,
        };
        const response = await edgeFunctionsApiV1.deleteEdgeFunctionsAction(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        expect(result.success).toEqual(true);
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
