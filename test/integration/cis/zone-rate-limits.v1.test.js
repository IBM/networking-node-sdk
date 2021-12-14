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

const ZoneRateLimitAPI = require('../../../dist/cis/zoneratelimitsv1/v1');
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

describe('ZoneRateLimitAPI', () => {
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

  let rateLimitInstance;
  let rateLimitId;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    rateLimitInstance = ZoneRateLimitAPI.newInstance(options);
    expect(rateLimitInstance).not.toBeNull();
    done();
  });

  // Request models needed create/update operation.

  // RatelimitInputActionResponse
  const ratelimitInputActionResponseModel = {
    content_type: 'text/plain',
    body: 'This request has been rate-limited.',
  };

  // RatelimitInputAction
  const ratelimitInputActionModel = {
    mode: 'simulate',
    timeout: 60,
    response: ratelimitInputActionResponseModel,
  };

  // RatelimitInputMatchRequest
  const pathByDate = new Date().getTime();
  const ratelimitInputMatchRequestModel = {
    methods: ['GET'],
    schemes: ['HTTP'],
    url: `*.${config.DOMAIN_NAME}/path/${pathByDate}*`,
  };

  // RatelimitInputMatchResponseHeadersItem
  const ratelimitInputMatchResponseHeadersItemModel = {
    name: 'Cf-Cache-Status',
    op: 'ne',
    value: 'HIT',
  };

  // RatelimitInputMatchResponse
  const ratelimitInputMatchResponseModel = {
    status: [403],
    headers: [ratelimitInputMatchResponseHeadersItemModel],
    origin_traffic: false,
  };

  // RatelimitInputMatch
  const ratelimitInputMatchModel = {
    request: ratelimitInputMatchRequestModel,
    response: ratelimitInputMatchResponseModel,
  };

  const rateLimitConfig = {
    threshold: 5,
    period: 2,
    action: ratelimitInputActionModel,
    match: ratelimitInputMatchModel,
    disabled: false,
    description: 'Prevent multiple login failures to mitigate brute force attacks',
  };

  describe('Create Rate Limit Rule', () => {
    test('successfully create a rate limit rule', async done => {
      try {
        const response = await rateLimitInstance.createZoneRateLimits(rateLimitConfig);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response.result || {};
        expect(response.result.success).toBeTruthy();
        if (result && Object.keys(result).length > 0) {
          rateLimitId = result.id;
          expect(result.id).toBeDefined();
          expect(result.description).toBe(rateLimitConfig.description);
          expect(result.login_protect).toBe(false);
          expect(result.threshold).toBe(rateLimitConfig.threshold);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to create a rule with same url', async done => {
      try {
        await rateLimitInstance.createZoneRateLimits(rateLimitConfig);
      } catch (err) {
        expect(err.status).toEqual(400);
        expect(err.message).toEqual('ratelimit.api.duplicate_of_existing_ratelimit');
        done();
      }
      done();
    });
  });

  describe('List Zone Rate Limit Rules', () => {
    test('should list all the rate limit rules', async done => {
      try {
        const response = await rateLimitInstance.listAllZoneRateLimits({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result.result && result.result.length > 0) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          // loop through the list of rules and match with stored id.
          for (const rule of result.result) {
            if (rule.id == rateLimitId) {
              expect(rule.description).toBe(rateLimitConfig.description);
            }
          }
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update Zone Rate Limit Rule', () => {
    test('should successfully update the rule', async done => {
      try {
        const params = {
          ...rateLimitConfig,
          threshold: 10,
          rateLimitIdentifier: rateLimitId,
        };
        const response = await rateLimitInstance.updateRateLimit(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result.threshold).toEqual(10);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update the rule for wrong identifier', async done => {
      try {
        const params = {
          ...rateLimitConfig,
          rateLimitIdentifier: 111,
        };
        await rateLimitInstance.updateRateLimit(params);
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }
      done();
    });
  });

  describe('Get Rate Limit Rule', () => {
    test('should successfully fetches the rule settings by id', async done => {
      try {
        const response = await rateLimitInstance.getRateLimit({
          rateLimitIdentifier: rateLimitId,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();
        expect(result.result.id).toEqual(rateLimitId);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to get rule for wrong id', async done => {
      try {
        await rateLimitInstance.getRateLimit({
          rateLimitIdentifier: '111',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }
      done();
    });
  });

  describe('Delete Rate Limit Rule', () => {
    test('successfully delete rule by id', async done => {
      try {
        const response = await rateLimitInstance.deleteZoneRateLimit({
          rateLimitIdentifier: rateLimitId,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('fail to delete the rate limit rule for invalid id', async done => {
      try {
        await rateLimitInstance.deleteZoneRateLimit({
          rateLimitIdentifier: '111',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }
      done();
    });
  });
});
