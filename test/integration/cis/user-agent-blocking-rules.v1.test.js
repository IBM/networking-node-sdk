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

const UserAgentBlockingRulesV1 = require('../../../dist/cis/useragentblockingrulesv1/v1');
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

let userAgentBlockingRulesV1;
let userAgentBlockingRule;

describe('UserAgentBlockingRulesV1', () => {
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
    userAgentBlockingRulesV1 = UserAgentBlockingRulesV1.newInstance(options);
    expect(UserAgentBlockingRulesV1).not.toBeNull();
    done();
  });

  describe('Create the user agent blocking rules', () => {
    test('should successfully created user agent blocking rules', async done => {
      try {
        const params = {
          paused: false,
          description:
            'Prevent access from abusive clients identified by this UserAgent to mitigate DDoS attack',
          mode: 'block',
          configuration: {
            target: 'ua',
            value:
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4',
          },
        };
        const response = await userAgentBlockingRulesV1.createZoneUserAgentRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          userAgentBlockingRule = result.result;
          expect(userAgentBlockingRule).toBeDefined();
          expect(userAgentBlockingRule.mode).toEqual(params.mode);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    describe('Fetching the List all user agent blocking rules', () => {
      test('should successfully List all user agent blocking rules', async done => {
        try {
          const response = await userAgentBlockingRulesV1.listAllZoneUserAgentRules();
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
  });

  describe('Get the user agent blocking rule', () => {
    test('should successfully fetched user agent blocking rule', async done => {
      try {
        const params = {
          useragentRuleIdentifier: userAgentBlockingRule.id,
        };
        const response = await userAgentBlockingRulesV1.getUserAgentRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          const fetchedUserAgentBlockingRule = result.result;
          expect(fetchedUserAgentBlockingRule).toBeDefined();
          expect(fetchedUserAgentBlockingRule.mode).toEqual(userAgentBlockingRule.mode);
          expect(fetchedUserAgentBlockingRule.description).toEqual(
            userAgentBlockingRule.description
          );
          expect(fetchedUserAgentBlockingRule.configuration).toEqual(
            userAgentBlockingRule.configuration
          );
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update the user agent blocking rule', () => {
    test('should successfully updated user agent blocking rule', async done => {
      try {
        const params = {
          configuration: {
            target: 'ua',
            value:
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4',
          },
          mode: 'block',
          notes: 'This is for verifying the api for user agent blocking rule.',
          useragentRuleIdentifier: userAgentBlockingRule.id,
        };
        const response = await userAgentBlockingRulesV1.updateUserAgentRule(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          userAgentBlockingRule = result.result;
          expect(userAgentBlockingRule).toBeDefined();
          expect(userAgentBlockingRule.description).toEqual(params.description);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Delete the user agent blocking rule', () => {
    test('should successfully deleted user agent blocking rule', async done => {
      try {
        const params = {
          useragentRuleIdentifier: userAgentBlockingRule.id,
        };
        const response = await userAgentBlockingRulesV1.deleteZoneUserAgentRule(params);
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
