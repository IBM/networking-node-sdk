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

const WAFApisV1 = require('../../../dist/cis/wafapiv1/v1');
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

describe.skip('WAFApisV1', () => {
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
    zoneId: config.CIS_SERVICES_ZONE_ID,
  };

  let wafAPIV1;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    wafAPIV1 = WAFApisV1.newInstance(options);
    expect(wafAPIV1).not.toBeNull();
    done();
  });

  describe('Set WAF setting', () => {
    test('should successfully turn off the WAF value', async done => {
      try {
        const params = {
          value: 'off',
        };
        const response = await wafAPIV1.updateWafSettings(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result && result.result) {
          expect(result.result.id).toEqual('waf');
          expect(result.result.value).toEqual(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should successfully turn on the WAF value', async done => {
      try {
        const params = {
          value: 'on',
        };
        const response = await wafAPIV1.updateWafSettings(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result && result.result) {
          expect(result.result.id).toEqual('waf');
          expect(result.result.value).toEqual(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Fetch WAF setting', () => {
    test('should successfully fetch the WAF value', async done => {
      try {
        const response = await wafAPIV1.getWafSettings();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result && result.result) {
          expect(result.result.id).toEqual('waf');
          expect(result.result.value).toEqual('on');
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
