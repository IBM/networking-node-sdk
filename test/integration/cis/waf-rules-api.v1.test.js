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

const WafRulesApiV1 = require('../../../dist/cis/wafrulesapiv1/v1');
const WafRulePackagesApiV1 = require('../../../dist/cis/wafrulepackagesapiv1/v1');
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

describe('WafRulesApiV1', () => {
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

  let wafRulesApiV1;
  let wafRulePackagesApiV1;
  let wafRulePackage;
  let wafRule;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    wafRulesApiV1 = WafRulesApiV1.newInstance(options);
    expect(wafRulesApiV1).not.toBeNull();
    done();
  });

  test('WafRulePackagesApiV1 should successfully complete initialization', done => {
    // Initialize the service client.
    wafRulePackagesApiV1 = WafRulePackagesApiV1.newInstance(options);
    expect(wafRulePackagesApiV1).not.toBeNull();
    done();
  });

  describe('List WAF Rules', () => {
    test('should successfully turn off the WAF value', async done => {
      try {
        const wafRuleResponse = await wafRulePackagesApiV1.listWafPackages();
        expect(wafRuleResponse).toBeDefined();
        expect(wafRuleResponse.status).toEqual(200);

        let { result } = wafRuleResponse || {};
        expect(result).toBeDefined();

        if (result.result && result.result.length > 0) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          const filteredItems = result.result.filter(item => item.detection_mode === 'anomaly');
          if (filteredItems && filteredItems.length > 0) {
            wafRulePackage = filteredItems[0];
          }
        }

        const params = {
          packageId: wafRulePackage.id,
        };
        const response = await wafRulesApiV1.listWafRules(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        result = response.result || {};
        expect(result).toBeDefined();

        if (result.result && result.result.length > 0) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          wafRule = result.result[0];
          expect(wafRule).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Updating WAF Rules', () => {
    test('should successfully update the WAF value', async done => {
      try {
        const params = {
          identifier: wafRule.id,
          packageId: wafRule.package_id,
          cis: { mode: wafRule.mode == 'on' ? 'off' : 'on' },
          owsap: { mode: 'off' },
        };
        const response = await wafRulesApiV1.updateWafRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();
        if (result && result.result) {
          wafRule = result.result;
          expect(wafRule.package_id).toEqual(params.packageId);
          expect(wafRule.mode).toEqual(params.cis.mode);
          expect(wafRule.description).toEqual(wafRule.description);
          expect(wafRule.owsap).toEqual(wafRule.owsap);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Fetching WAF Rules', () => {
    test('should successfully fetch the WAF rule', async done => {
      try {
        const params = {
          identifier: wafRule.id,
          packageId: wafRule.package_id,
        };

        const response = await wafRulesApiV1.getWafRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();
        if (result && result.result) {
          expect(result.result.package_id).toEqual(params.packageId);
          expect(wafRule.package_id).toEqual(params.packageId);
          expect(wafRule.description).toEqual(wafRule.description);
          expect(wafRule.owsap).toEqual(wafRule.owsap);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
