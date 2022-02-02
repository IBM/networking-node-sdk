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

const ZoneFirewallAccessRulesV1 = require('../../../dist/cis/zonefirewallaccessrulesv1/v1');
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

let zoneFirewallAccessRulesV1;
let zoneFirewallAccessRule;

describe.skip('ZoneFirewallAccessRulesV1', () => {
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
    zoneFirewallAccessRulesV1 = ZoneFirewallAccessRulesV1.newInstance(options);
    expect(zoneFirewallAccessRulesV1).not.toBeNull();
    done();
  });

  describe('Create the zone firewall rule', () => {
    test('should successfully created zone', async done => {
      try {
        const params = {
          allowed_modes: ['whitelist', 'block', 'challenge', 'js_challenge'],
          mode: 'whitelist',
          notes: 'This is for verifying the api',
          configuration: { target: 'ip', value: '10.38.9.8' },
        };
        const response = await zoneFirewallAccessRulesV1.createZoneAccessRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          zoneFirewallAccessRule = result.result;
          expect(zoneFirewallAccessRule).toBeDefined();
          expect(zoneFirewallAccessRule.mode).toEqual(params.mode);
          expect(zoneFirewallAccessRule.notes).toEqual(params.notes);
          expect(zoneFirewallAccessRule.configuration).toEqual(params.configuration);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Fetching the List all zones access rules', () => {
    test('should successfully List all zones', async done => {
      try {
        const response = await zoneFirewallAccessRulesV1.listAllZoneAccessRules();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Get the zone firewall rule', () => {
    test('should successfully fetched zone', async done => {
      try {
        const params = {
          accessruleIdentifier: zoneFirewallAccessRule.id,
        };
        const response = await zoneFirewallAccessRulesV1.getZoneAccessRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          const fetchedZoneFirewallRuleAccess = result.result;
          expect(fetchedZoneFirewallRuleAccess).toBeDefined();
          expect(fetchedZoneFirewallRuleAccess.mode).toEqual(zoneFirewallAccessRule.mode);
          expect(fetchedZoneFirewallRuleAccess.notes).toEqual(zoneFirewallAccessRule.notes);
          expect(fetchedZoneFirewallRuleAccess.configuration).toEqual(
            zoneFirewallAccessRule.configuration
          );
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update the zone firewall rule', () => {
    test('should successfully updated zone', async done => {
      try {
        const params = {
          accessruleIdentifier: zoneFirewallAccessRule.id,
          notes: 'This is for verifying the api',
        };
        const response = await zoneFirewallAccessRulesV1.updateZoneAccessRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          zoneFirewallAccessRule = result.result;
          expect(zoneFirewallAccessRule).toBeDefined();
          expect(zoneFirewallAccessRule.notes).toEqual(params.notes);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Delete the zone firewall rule', () => {
    test('should successfully deleted zone firewall rule', async done => {
      try {
        const params = {
          accessruleIdentifier: zoneFirewallAccessRule.id,
        };
        const response = await zoneFirewallAccessRulesV1.deleteZoneAccessRule(params);
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
