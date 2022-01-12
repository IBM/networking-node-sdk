/**
 * Copyright 2022 IBM All Rights Reserved.
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

const WebhooksV1 = require('../../../dist/cis/webhooksv1/v1');
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

describe('WebhooksV1', () => {
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

  let webhooksV1;

  let webhooks;

  let webhookIdentifier;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    webhooksV1 = WebhooksV1.newInstance(options);
    expect(webhooksV1).not.toBeNull();
    done();
  });

  describe('clear all webhooks', () => {
    test('should successfully clear all Webhooks', async done => {
      try {
        const response = await webhooksV1.getAlertWebhooks();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();
        expect(result.result).toBeDefined();
        if (result.result == null) {
          return done();
        }

        for (let i = 0; i < result.result.length; i++) {
          const webhookIden = result.result[i].id;
          const params1 = {
            webhookId: webhookIden,
          };
          const response1 = webhooksV1.deleteAlertWebhook(params1);
          expect(response1).toBeDefined();
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

  describe('Create the webhooks', () => {
    test('should successfully create webhooks', async done => {
      try {
        const name = 'My Slack Alert Webhook';
        const url = 'https://hooks.slack.com/services/Ds3fdBFbV/456464Gdd';
        const secret = options.authenticator.apikey;
        const params = {
          name: name,
          url: url,
          secret: secret,
        };
        const response = await webhooksV1.createAlertWebhook(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();

        webhookIdentifier = result.result.id;
        expect(webhookIdentifier).toBeDefined();

        if (result && result.result) {
          webhooks = result.result;
          expect(webhooks).toBeDefined();
          expect(result.success).toBeTruthy();
          expect(webhooks.id).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('List the Webhooks', () => {
    test('should successfully List webhooks', async done => {
      try {
        const response = await webhooksV1.getAlertWebhooks();
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

  describe('update the webhooks', () => {
    test('should successfully updated webhooks', async done => {
      try {
        const name = 'My new Alert Webhook';
        const url = 'https://hooks.slack.com/services/Ds3fdBFbV/456464Gdd';
        const secret = options.authenticator.apikey;
        const params = {
          webhookId: webhookIdentifier,
          name: name,
          url: url,
          secret: secret,
        };
        const response = await webhooksV1.updateAlertWebhook(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();
        if (result && result.result) {
          webhooks = result.result;
          expect(webhooks).toBeDefined();
          expect(result.success).toBeTruthy();
          expect(webhooks.id).toBeDefined();
          expect(webhooks.id).toEqual(params.webhookId);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('get the Webhooks by ID', () => {
    test('should successfully get webhook', async done => {
      try {
        const params = {
          webhookId: webhookIdentifier,
        };
        const response = await webhooksV1.getAlertWebhooks(params);
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

  describe('delete the Webhooks by ID', () => {
    test('should successfully delete webhooks', async done => {
      try {
        const params = {
          webhookId: webhookIdentifier,
        };
        const response = await webhooksV1.deleteAlertWebhook(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
