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

const FirewallApiV1 = require('../../../dist/cis/firewallapiv1/v1');
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

let firewallApiV1;
let currentSecurityLevel;

describe('FirewallApiV1', () => {
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
    firewallApiV1 = FirewallApiV1.newInstance(options);
    expect(firewallApiV1).not.toBeNull();
    done();
  });

  describe('Fetching the security level setting.', () => {
    test('should successfully Get security level setting.', async done => {
      try {
        const response = await firewallApiV1.getSecurityLevelSetting();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          currentSecurityLevel = result.result;
          expect(currentSecurityLevel.id).toBeDefined();
          expect(currentSecurityLevel.value).toBeDefined();
          expect(currentSecurityLevel.editable).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Updating the security level setting.', () => {
    test('should successfully updated security level setting.', async done => {
      try {
        const params = {
          value: currentSecurityLevel.value === 'under_attack' ? 'medium ' : 'under_attack',
        };
        const response = await firewallApiV1.setSecurityLevelSetting(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          expect(result.result.id).toEqual(currentSecurityLevel.id);
          expect(result.result.value).toEqual(params.value);
          expect(result.result.editable).toEqual(currentSecurityLevel.editable);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Reset the security level setting.', () => {
    test('should successfully reset security level setting.', async done => {
      try {
        const params = {
          value: currentSecurityLevel.value,
        };
        const response = await firewallApiV1.setSecurityLevelSetting(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          currentSecurityLevel = result.result;
          expect(currentSecurityLevel.id).toBeDefined();
          expect(currentSecurityLevel.value).toBeDefined();
          expect(currentSecurityLevel.editable).toBeDefined();
          expect(result.result.value).toEqual(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
