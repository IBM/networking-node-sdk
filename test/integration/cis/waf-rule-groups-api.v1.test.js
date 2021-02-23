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

const WafRuleGroupsApiV1 = require('../../../dist/cis/wafrulegroupsapiv1/v1');
const WafRulePackagesApiV1 = require('../../../dist/cis/wafrulepackagesapiv1/v1');
const WafRulesApiV1 = require('../../../dist/cis/wafrulesapiv1/v1');
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

describe('WafRuleGroupsApiV1', () => {
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

  let wafRuleGroupsApiV1;
  let wafRulePackagesApiV1;
  let wafRulesApiV1;
  let wafRulePackage;
  let wafRule;
  let wafRuleGroup;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    wafRuleGroupsApiV1 = WafRuleGroupsApiV1.newInstance(options);
    expect(wafRuleGroupsApiV1).not.toBeNull();
    done();
  });

  test('WafRulePackagesApiV1 should successfully complete initialization', done => {
    // Initialize the service client.
    wafRulePackagesApiV1 = WafRulePackagesApiV1.newInstance(options);
    expect(wafRulePackagesApiV1).not.toBeNull();
    done();
  });

  test('WafRulesApiV1 should successfully complete initialization', done => {
    // Initialize the service client.
    wafRulesApiV1 = WafRulesApiV1.newInstance(options);
    expect(wafRulesApiV1).not.toBeNull();
    done();
  });

  describe('List WAF Rule Groups setting', () => {
    test('should successfully turn off the WAF value', async done => {
      try {
        const wafRuleResponse = await wafRulePackagesApiV1.listWafPackages();
        expect(wafRuleResponse).toBeDefined();
        expect(wafRuleResponse.status).toEqual(200);

        const { result } = wafRuleResponse || {};
        expect(result).toBeDefined();

        if (result.result && result.result.length > 0) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          wafRulePackage = result.result[0];
        }

        if (wafRulePackage) {
          const params = {
            pkgId: wafRulePackage.id,
          };
          const response = await wafRuleGroupsApiV1.listWafRuleGroups(params);
          expect(response).toBeDefined();
          expect(response.status).toEqual(200);

          const { result } = response || {};
          expect(result).toBeDefined();

          if (result.result && result.result.length > 0) {
            expect(result.result.length).toBeGreaterThanOrEqual(1);
            expect(result.result).toBeDefined();
          }
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('List WAF Rule Groups setting', () => {
    test('should successfully turn off the WAF value', async done => {
      try {
        const params = {
          packageId: wafRulePackage.id,
        };
        let response = await wafRulesApiV1.listWafRules(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        let result = response.result || {};
        expect(result).toBeDefined();

        if (result.result && result.result.length > 0) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          wafRule = result.result[0];
          expect(wafRule).toBeDefined();
        }

        const paramsWafRuleGrp = {
          pkgId: wafRule.package_id,
          groupId: wafRule.group.id,
        };
        response = await wafRuleGroupsApiV1.getWafRuleGroup(paramsWafRuleGrp);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        result = response.result || {};
        expect(result).toBeDefined();
        if (result && result.result) {
          wafRuleGroup = result.result;

          expect(wafRuleGroup.package_id).toEqual(wafRule.package_id);
          expect(wafRuleGroup.id).toEqual(wafRule.group.id);
          expect(wafRuleGroup.name).toEqual(wafRule.group.name);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('List WAF Rule Groups setting', () => {
    test('should successfully turn off the WAF value', async done => {
      try {
        const modeValue = wafRuleGroup.mode === 'on' ? 'off' : 'on';
        const params = {
          pkgId: wafRule.package_id,
          groupId: wafRule.group.id,
          mode: modeValue,
        };
        const response = await wafRuleGroupsApiV1.updateWafRuleGroup(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();

        if (result && result.result) {
          const wafRuleResponse = result.result;
          expect(wafRuleResponse.package_id).toEqual(wafRule.package_id);
          expect(wafRuleResponse.id).toEqual(wafRule.group.id);
          expect(wafRuleResponse.name).toEqual(wafRule.group.name);
          expect(wafRuleResponse.mode).toEqual(modeValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
