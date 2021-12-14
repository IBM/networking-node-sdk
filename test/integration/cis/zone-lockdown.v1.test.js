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

const ZoneLockdownV1 = require('../../../dist/cis/zonelockdownv1/v1');
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

let zoneLockdownV1;
let zoneLockdown;

describe('ZoneLockdownV1', () => {
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
    zoneLockdownV1 = ZoneLockdownV1.newInstance(options);
    expect(zoneLockdownV1).not.toBeNull();
    done();
  });

  describe('Create the zone lockdown rule', () => {
    test('should successfully created zone lockdown rule', async done => {
      try {
        const params = {
          description: 'integration testing',
          configurations: [
            {
              id: '372e67954025e0ba6aaa6d586b9e0b50',
              target: 'ip_range',
              value: '2.0.2.0/24',
            },
          ],
          urls: ['api.mysite.com/some/endpoint*'],
          paused: false,
        };
        const response = await zoneLockdownV1.createZoneLockdownRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          zoneLockdown = result.result;
          expect(zoneLockdown).toBeDefined();
          expect(zoneLockdown.urls).toEqual(params.urls);
          expect(zoneLockdown.configuration).toEqual(params.configuration);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Fetching the List all zone lock down rules', () => {
    test('should successfully List all zone lock down rules', async done => {
      try {
        const response = await zoneLockdownV1.listAllZoneLockownRules();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result && result.result.length) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Get the zone lockdown rule', () => {
    test('should successfully get the zone lockdown rule', async done => {
      try {
        const params = {
          lockdownRuleIdentifier: zoneLockdown.id,
        };
        const response = await zoneLockdownV1.getLockdown(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          const fetchedZoneLockdown = result.result;
          expect(fetchedZoneLockdown).toBeDefined();
          expect(fetchedZoneLockdown.id).toEqual(zoneLockdown.id);
          expect(fetchedZoneLockdown.configurations).toEqual(zoneLockdown.configurations);
          expect(fetchedZoneLockdown.description).toEqual(zoneLockdown.description);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update the zone lockdown rule', () => {
    test('should successfully updated zone lockdown rule', async done => {
      try {
        const params = {
          configurations: [
            {
              id: '372e67954025e0ba6aaa6d586b9e0b50',
              target: 'ip_range',
              value: '2.0.2.0/24',
            },
          ],
          lockdownRuleIdentifier: zoneLockdown.id,
          paused: !zoneLockdown.paused,
          urls: ['api.mysite.com/some/endpoint*'],
        };
        const response = await zoneLockdownV1.updateLockdownRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          const localZoneLockdown = result.result;
          expect(localZoneLockdown).toBeDefined();
          expect(localZoneLockdown).toBeDefined();
          expect(localZoneLockdown.id).toEqual(zoneLockdown.id);
          expect(localZoneLockdown.paused).toEqual(!zoneLockdown.paused);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Delete the zone lockdown rule', () => {
    test('should successfully created zone lockdown rule', async done => {
      try {
        const params = {
          lockdownRuleIdentifier: zoneLockdown.id,
        };
        const response = await zoneLockdownV1.deleteZoneLockdownRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          expect(result.result.id).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
