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

const FirewallAccessRulesV1 = require('../../../dist/cis/firewallaccessrulesv1/v1');
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

let firewallAccessRulesV1;
let firewallAccessRule;

describe('FirewallAccessRulesV1', () => {
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
    firewallAccessRulesV1 = FirewallAccessRulesV1.newInstance(options);
    expect(firewallAccessRulesV1).not.toBeNull();
    done();
  });

  describe('Create the firewall access rules', () => {
    test('should successfully created firewall access rules', async done => {
      try {
        const params = {
          mode: 'block',
          notes: 'This rule is added because of event X that occurred on date xyz',
          configuration: {
            target: 'ip',
            value: '192.169.1.100',
          },
        };
        const response = await firewallAccessRulesV1.createAccountAccessRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          firewallAccessRule = result.result;
          expect(firewallAccessRule).toBeDefined();
          expect(firewallAccessRule.mode).toEqual(params.mode);
          expect(firewallAccessRule.notes).toEqual(params.notes);
          expect(firewallAccessRule.configuration).toEqual(params.configuration);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Fetching the List all firewall access rules', () => {
    test('should successfully List all firewall access rules', async done => {
      try {
        const response = await firewallAccessRulesV1.listAllAccountAccessRules();
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

  describe('Get the firewall access rule', () => {
    test('should successfully fetched firewall access rule', async done => {
      try {
        const params = {
          accessruleIdentifier: firewallAccessRule.id,
        };
        const response = await firewallAccessRulesV1.getAccountAccessRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          const fetchedFirewallAccessRule = result.result;
          expect(fetchedFirewallAccessRule).toBeDefined();
          expect(fetchedFirewallAccessRule.mode).toEqual(firewallAccessRule.mode);
          expect(fetchedFirewallAccessRule.configuration).toEqual(firewallAccessRule.configuration);
          expect(fetchedFirewallAccessRule.configuration).toEqual(firewallAccessRule.configuration);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update the firewall access rule', () => {
    test('should successfully updated firewall access rule', async done => {
      try {
        const params = {
          accessruleIdentifier: firewallAccessRule.id,
          mode: 'block',
          notes:
            'after update api, This rule is added because of event X that occurred on date xyz',
          configuration: {
            target: 'ip',
            value: '192.169.1.100',
          },
        };
        const response = await firewallAccessRulesV1.updateAccountAccessRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          firewallAccessRule = result.result;
          expect(firewallAccessRule).toBeDefined();
          expect(firewallAccessRule.configuration).toEqual(params.configuration);
          expect(firewallAccessRule.mode).toEqual(params.mode);
          expect(firewallAccessRule.notes).toEqual(params.notes);
          expect(firewallAccessRule.id).toEqual(params.accessruleIdentifier);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Delete the firewall access rule', () => {
    test('should successfully deleted firewall access rule', async done => {
      try {
        const params = {
          accessruleIdentifier: firewallAccessRule.id,
        };
        const response = await firewallAccessRulesV1.deleteAccountAccessRule(params);
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
