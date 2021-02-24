/**
 * Copyright 2021, 2021 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const PageRuleAPI = require('../../../dist/cis/page-rule-api/v1');
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

describe('PageRuleAPI', () => {
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

  let pageRuleInstance;
  let pageRuleId;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    pageRuleInstance = PageRuleAPI.newInstance(options);
    expect(pageRuleInstance).not.toBeNull();
    done();
  });

  // TargetsItemConstraint
  const pathByDate = new Date().getTime();
  const targetsItemConstraintModel = {
    operator: 'matches',
    value: `*${config.DOMAIN_NAME}/images/${pathByDate}/*`,
  };

  // TargetsItem
  const targetsItemModel = {
    target: 'url',
    constraint: targetsItemConstraintModel,
  };

  // PageRulesBodyActionsItemActionsSecurity
  const pageRulesBodyActionsItemModel = {
    value: 'on',
    id: 'browser_check',
  };

  const pageRuleConfig = {
    targets: [targetsItemModel],
    actions: [pageRulesBodyActionsItemModel],
    priority: 1,
    status: 'active',
  };

  describe('Create and verify page rule setting', () => {
    test('successfully create a page rule', async done => {
      try {
        const response = await pageRuleInstance.createPageRule(pageRuleConfig);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          pageRuleId = result.result.id;
          expect(result.success).toBeTruthy();
          expect(result.result.id).toBeDefined();
          expect(result.result.priority).toBe(pageRuleConfig.priority);
          expect(result.result.status).toBe(pageRuleConfig.status);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to create a page rule with same url pattern', async done => {
      try {
        await pageRuleInstance.createPageRule(pageRuleConfig);
      } catch (err) {
        expect(err.status).toEqual(400);
        expect(err.message).toContain('Your zone already has an existing page rule with that URL');
        done();
      }
      done();
    });
  });

  describe('List Page Rules', () => {
    test('should list all the page rules', async done => {
      try {
        const response = await pageRuleInstance.listPageRules({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result.result && result.result.length > 0) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          // loop through the list of glb's and match with stored glb id.
          for (const rule of result.result) {
            if (rule.id == pageRuleId) {
              expect(rule.actions[0].id).toBe(pageRulesBodyActionsItemModel.id);
            }
          }
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update Page Rule', () => {
    test('should successfully update the page rule setting', async done => {
      try {
        const params = {
          ...pageRuleConfig,
          actions: [{ id: 'disable_security' }],
          ruleId: pageRuleId,
        };
        const response = await pageRuleInstance.updatePageRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        expect(result).toBeDefined();
        expect(result.result.actions[0].id).toEqual('disable_security');
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update the page rule for wrong identifier', async done => {
      try {
        const params = {
          ...pageRuleConfig,
          ruleId: 111,
        };
        await pageRuleInstance.updatePageRule(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Change Page Rule Setting', () => {
    test('should successfully change the existing the page rule setting', async done => {
      try {
        const params = {
          ...pageRuleConfig,
          actions: [
            {
              id: 'email_obfuscation',
              value: 'on',
            },
          ],
          ruleId: pageRuleId,
        };
        const response = await pageRuleInstance.changePageRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();
        expect(result.result.actions.length).toEqual(2);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to change page rule for wrong identifier', async done => {
      try {
        const params = {
          ...pageRuleConfig,
          ruleId: 111,
        };
        await pageRuleInstance.changePageRule(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Get Rule by Id', () => {
    test('should successfully fetches page rule settings by rule id', async done => {
      try {
        const response = await pageRuleInstance.getPageRule({
          ruleId: pageRuleId,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();
        expect(result.result.id).toEqual(pageRuleId);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to get page rule setting for wrong rule id', async done => {
      try {
        await pageRuleInstance.getPageRule({
          ruleId: '111',
        });
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Delete Page rule configuration', () => {
    test('successfully delete page rule by rule id', async done => {
      try {
        const response = await pageRuleInstance.deletePageRule({
          ruleId: pageRuleId,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('fail to delete the page rule for invalid id', async done => {
      try {
        await pageRuleInstance.deletePageRule({
          ruleId: '111',
        });
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });
});
