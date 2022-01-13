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
const FirewallRulesV1 = require('../../../dist/cis/firewallrulesv1/v1');
const FiltersV1 = require('../../../dist/cis/filtersv1/v1');
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

describe('FirewallRulesV1', () => {
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
  const expressions = [
    '(ip.src eq 13.60.125.234)',
    '(http.request.uri eq "/test?number=1")',
    'not http.request.uri.path matches "^/api/[\\W].*$"',
    '(http.request.uri.path ~ "^.*/wpt[\\d]-login.php$" or http.request.uri.path ~ "^.*/xmlrpc.php$")',
  ];
  const actions = ['log', 'allow', 'challenge', 'js_challenge', 'block', 'bypass'];
  const actions_update = ['block', 'challenge', 'allow', 'log'];

  let filtersV1;
  let filters;
  const filterIdentifier = [];
  let firewallRulesV1;
  let firewallRules;
  const firewallRulesIdentifier = [];

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    firewallRulesV1 = FirewallRulesV1.newInstance(options);
    expect(firewallRulesV1).not.toBeNull();
    filtersV1 = FiltersV1.newInstance(options);
    expect(filtersV1).not.toBeNull();
    done();
  });

  describe('clear all filters', () => {
    test('should successfully clear all filters', async done => {
      const filterId = [];
      try {
        const params = {
          crn: options.crn,
          xAuthUserToken: options.authenticator.apikey,
          zoneIdentifier: options.zoneIdentifier,
        };
        const response = await filtersV1.listAllFilters(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        result.result.forEach(idsList => filterId.push(idsList.id));
        expect(result).toBeDefined();
        expect(result.result).toBeDefined();
        expect(filterId).toBeDefined();

        for (let i = 0; i < filterId.length; i++) {
          const params1 = {
            crn: options.crn,
            xAuthUserToken: options.authenticator.apikey,
            zoneIdentifier: options.zoneIdentifier,
            id: filterId[i],
          };
          const response = await filtersV1.deleteFilters(params1);
          expect(response).toBeDefined();
          expect(response.status).toEqual(200);
          const { result } = response || {};
          expect(result).toBeDefined();
        }
        if (result && result.result) {
          expect(result.result.length).toBeGreaterThanOrEqual(0);
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Create the filters', () => {
    test('should successfully created filters', async done => {
      try {
        for (let i = 0; i < 4; i++) {
          const filter = {
            expression: expressions[i],
            paused: false,
            description: 'Login-Office-SDK',
          };
          const params = {
            crn: options.crn,
            xAuthUserToken: options.authenticator.apikey,
            zoneIdentifier: options.zoneIdentifier,
            filterInput: [filter],
          };
          const response = await filtersV1.createFilter(params);
          expect(response).toBeDefined();
          expect(response.status).toEqual(200);

          const { result } = response || {};

          expect(result).toBeDefined();
          expect(result.result).toBeDefined();
          result.result.forEach(idsList => filterIdentifier.push(idsList.id));
          expect(filterIdentifier).toBeDefined();
          if (result && result.result) {
            filters = result.result;
            expect(filters).toBeDefined();
            expect(filters.expression).toEqual(params.filterInput.expression);
            expect(filters.paused).toEqual(params.filterInput.paused);
            expect(filters.description).toEqual(params.filterInput.description);
          }
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Create the firewallRules', () => {
    test('should successfully created firewallRules', async done => {
      try {
        for (let i = 0; i < 4; i++) {
          const filterId = {
            id: filterIdentifier[i],
          };
          const firewallRuleInputWithFilterIdModel = {
            filter: filterId,
            action: actions[i],
            description: 'Firewall-Rules-create-SDK-Test',
          };
          const params = {
            crn: options.crn,
            xAuthUserToken: options.authenticator.apikey,
            zoneIdentifier: options.zoneIdentifier,
            firewallRuleInputWithFilterId: [firewallRuleInputWithFilterIdModel],
          };
          const response = await firewallRulesV1.createFirewallRules(params);
          expect(response).toBeDefined();
          expect(response.status).toEqual(200);

          const { result } = response || {};

          expect(result).toBeDefined();
          expect(result.result).toBeDefined();
          result.result.forEach(idsList => firewallRulesIdentifier.push(idsList.id));
          expect(firewallRulesIdentifier).toBeDefined();
          if (result && result.result) {
            firewallRules = result.result;
            expect(firewallRules).toBeDefined();
            expect(firewallRules.filter).toEqual(params.firewallRuleInputWithFilterId.filter);
            expect(firewallRules.action).toEqual(params.firewallRuleInputWithFilterId.action);
            expect(firewallRules.description).toEqual(
              params.firewallRuleInputWithFilterId.description
            );
          }
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Fetching the List all firewallRules', () => {
    test('should successfully List all firewallRules', async done => {
      try {
        const params = {
          crn: options.crn,
          xAuthUserToken: options.authenticator.apikey,
          zoneIdentifier: options.zoneIdentifier,
        };
        const response = await firewallRulesV1.listAllFirewallRules(params);
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

  describe('Update the firewallRule', () => {
    test('should successfully updated firewallRule', async done => {
      try {
        const filterId = {
          id: filterIdentifier[2],
        };
        const params = {
          xAuthUserToken: options.authenticator.apikey,
          crn: options.crn,
          zoneIdentifier: options.zoneIdentifier,
          firewallRuleIdentifier: firewallRulesIdentifier[2],
          action: actions_update[1],
          paused: false,
          description: 'Firewall-Rules-create-SDK-Test',
          filter: filterId,
        };
        const response = await firewallRulesV1.updateFirewallRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        expect(result).toBeDefined();
        expect(firewallRulesIdentifier).toBeDefined();

        if (result && result.result) {
          firewallRules = result.result;
          expect(firewallRules).toBeDefined();
          expect(firewallRules.action).toEqual(params.action);
          expect(firewallRules.description).toEqual(params.description);
          expect(firewallRules.id).toEqual(params.firewallRuleIdentifier);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Get the firewallRule', () => {
    test('should successfully fetched firewallRule', async done => {
      try {
        const params = {
          xAuthUserToken: options.authenticator.apikey,
          crn: options.crn,
          zoneIdentifier: options.zoneIdentifier,
          firewallRuleIdentifier: firewallRulesIdentifier[2],
        };
        const response = await firewallRulesV1.getFirewallRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        if (result && result.result) {
          firewallRules = result.result;
          expect(firewallRules).toBeDefined();
          expect(firewallRules.id).toEqual(params.firewallRuleIdentifier);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update the firewallRules', () => {
    test('should successfully firewallRules', async done => {
      try {
        for (let i = 0; i < firewallRulesIdentifier.length; i++) {
          const filterId = {
            id: filterIdentifier[i],
          };
          const firewallRuleInputWithFilterIdModel = {
            id: firewallRulesIdentifier[i],
            action: actions_update[i],
            paused: false,
            description: 'Firewall-Rules-create-SDK-Test',
            filter: filterId,
          };
          const params = {
            xAuthUserToken: options.authenticator.apikey,
            crn: options.crn,
            zoneIdentifier: options.zoneIdentifier,
            firewallRulesUpdateInputItem: [firewallRuleInputWithFilterIdModel],
          };
          const response = await firewallRulesV1.updateFirewllRules(params);
          expect(response).toBeDefined();
          expect(response.status).toEqual(200);

          const { result } = response || {};

          expect(result).toBeDefined();
          expect(result.result).toBeDefined();
          expect(firewallRulesIdentifier).toBeDefined();

          if (result && result.result) {
            firewallRules = result.result;
            expect(firewallRules).toBeDefined();
            expect(firewallRules.filter).toEqual(params.firewallRulesUpdateInputItem.filter);
            expect(firewallRules.action).toEqual(params.firewallRulesUpdateInputItem.action);
            expect(firewallRules.description).toEqual(
              params.firewallRulesUpdateInputItem.description
            );
            expect(firewallRules.id).toEqual(params.firewallRulesUpdateInputItem.id);
          }
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Delete the firewallRule', () => {
    test('should successfully deleted firewallRule', async done => {
      try {
        const params = {
          xAuthUserToken: options.authenticator.apikey,
          crn: options.crn,
          zoneIdentifier: options.zoneIdentifier,
          firewallRuleIdentifier: firewallRulesIdentifier[2],
        };
        const response = await firewallRulesV1.deleteFirewallRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          expect(firewallRulesIdentifier).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Delete the firewallRules', () => {
    test('should successfully deleted firewallRules', async done => {
      try {
        for (let i = 0; i < 4; i++) {
          const params = {
            xAuthUserToken: options.authenticator.apikey,
            crn: options.crn,
            zoneIdentifier: options.zoneIdentifier,
            id: firewallRulesIdentifier[i],
          };
          const response = await firewallRulesV1.deleteFirewallRules(params);
          expect(response).toBeDefined();
          expect(response.status).toEqual(200);

          const { result } = response || {};

          expect(result).toBeDefined();

          if (result && result.result) {
            expect(result.result).toBeDefined();
            expect(firewallRulesIdentifier).toBeDefined();
          }
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
