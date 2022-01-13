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

const AlertsV1 = require('../../../dist/cis/alertsv1/v1');
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

describe('AlertsV1', () => {
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
  let alertsV1;
  let alerts;
  let alertIdentifier;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    alertsV1 = AlertsV1.newInstance(options);
    expect(webhooksV1).not.toBeNull();
    webhooksV1 = WebhooksV1.newInstance(options);
    expect(alertsV1).not.toBeNull();
    done();
  });

  describe('clear all Alert-policies', () => {
    test('should successfully clear all Alert-policies', async done => {
      try {
        const response = await alertsV1.getAlertPolicies();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();
        expect(result.result).toBeDefined();
        if (result.result == null) {
          return done();
        }

        for (let i = 0; i < result.result.length; i++) {
          const alertsId = result.result[i].id;
          const params1 = {
            policyId: alertsId,
          };
          const response1 = alertsV1.deleteAlertPolicy(params1);
          expect(response1).toBeDefined();
          // expect(response1.status).toEqual(200);
          //   const { result1 } = response1 || {};
          //   expect(result1).toBeDefined();
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
    test('should successfully created webhooks', async done => {
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

  describe('Create the Alert-policies', () => {
    test('should successfully create Alert-policies', async done => {
      try {
        const emailItemModel = {
          id: 'mynotifications@email.com',
        };

        const webhooksItemModel = {
          id: webhookIdentifier,
        };

        const mechanismsModel = {
          email: [emailItemModel],
          webhooks: [webhooksItemModel],
        };
        const name = 'My Alert Policy';
        const enabled = true;
        const alertType = 'g6_pool_toggle_alert';
        const mechanisms = mechanismsModel;
        const description = 'A description for my alert policy';
        const filters = {
          enabled: ['false', 'true'],
          pool_id: ['6e67c08e3bae7eb398101d08def8a68a', 'df2d9d70fcb194ea60d2e58397cb35a6'],
        };
        const params = {
          name: name,
          enabled: enabled,
          alertType: alertType,
          mechanisms: mechanisms,
          description: description,
          filters: filters,
        };

        const response = await alertsV1.createAlertPolicy(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();

        alertIdentifier = result.result.id;
        expect(alertIdentifier).toBeDefined();

        if (result && result.result) {
          alerts = result.result;
          expect(alerts).toBeDefined();
          expect(result.success).toBeTruthy();
          expect(alerts.id).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('List the Alert-policies', () => {
    test('should successfully List Alert-policies', async done => {
      try {
        const response = await alertsV1.getAlertPolicies();
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

  describe('Update the Alert-policies', () => {
    test('should successfully Updated Alert-policies', async done => {
      try {
        const emailItemModel = {
          id: 'mynewnotifications@email.com',
        };

        const webhooksItemModel = {
          id: webhookIdentifier,
        };

        const mechanismsModel = {
          email: [emailItemModel],
          webhooks: [webhooksItemModel],
        };
        const policyId = alertIdentifier;
        const name = 'My Alert Policy';
        const enabled = true;
        const alertType = 'g6_pool_toggle_alert';
        const mechanisms = mechanismsModel;
        const description = 'A description for my alert policy';
        const filters = {
          enabled: ['true', 'false'],
          pool_id: ['6e67c08e3bae7eb398101d08def8a68a', 'df2d9d70fcb194ea60d2e58397cb35a6'],
        };
        const conditions = {
          conditions: {
            and: [
              {
                or: [
                  {
                    '==': [
                      {
                        var: 'pool_id',
                      },
                      '6e67c08e3bae7eb398101d08def8a68a',
                    ],
                  },
                  {
                    '==': [
                      {
                        var: 'pool_id',
                      },
                      'df2d9d70fcb194ea60d2e58397cb35a6',
                    ],
                  },
                ],
              },
              {
                or: [
                  {
                    '==': [
                      {
                        var: 'enabled',
                      },
                      'false',
                    ],
                  },
                  {
                    '==': [
                      {
                        var: 'enabled',
                      },
                      'true',
                    ],
                  },
                ],
              },
            ],
          },
        };
        const params = {
          policyId: policyId,
          name: name,
          enabled: enabled,
          alertType: alertType,
          mechanisms: mechanisms,
          description: description,
          filters: filters,
          conditions: conditions,
        };

        const response = await alertsV1.updateAlertPolicy(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();
        alertIdentifier = result.result.id;
        expect(alertIdentifier).toBeDefined();

        if (result && result.result) {
          alerts = result.result;
          expect(alerts).toBeDefined();
          expect(result.success).toBeTruthy();
          expect(alerts.id).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('get the Alert-policies by ID', () => {
    test('should successfully get Alert-policy', async done => {
      try {
        const params = {
          policyId: alertIdentifier,
        };
        const response = await alertsV1.getAlertPolicy(params);
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

  describe('delete the Alert-policies by ID', () => {
    test('should successfully delete Alert-policies', async done => {
      try {
        const params = {
          policyId: alertIdentifier,
        };
        const response = await alertsV1.deleteAlertPolicy(params);
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
