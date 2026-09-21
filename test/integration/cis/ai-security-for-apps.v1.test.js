/**
 * (C) Copyright IBM Corp. 2026.
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

/* eslint-disable no-console */

const AiSecurityForAppsV1 = require('../../../dist/cis/ai-security-for-apps/v1');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const authHelper = require('../../resources/auth-helper.js');

const timeout = 120000; // two minutes

// Location of our config file.
const configFile = 'cis.env';

const describe = authHelper.prepareTests(configFile);

// Retrieve the config file as an object.
const config = authHelper.loadConfig();

describe('AiSecurityForAppsV1', () => {
  jest.setTimeout(timeout);

  const options = {
    authenticator: new IamAuthenticator({
      apikey: config.CIS_SERVICES_APIKEY,
      url: config.CIS_SERVICES_AUTH_URL,
    }),
    crn: config.CRN,
    serviceUrl: config.API_ENDPOINT,
    zoneIdentifier: config.ZONE_ID,
  };

  let aiSecurityService;

  test('Initialize service', () => {
    aiSecurityService = AiSecurityForAppsV1.newInstance(options);
    expect(aiSecurityService).not.toBeNull();
  });

  describe('AI Security Settings', () => {
    let currentEnabled;

    test('should get AI security settings', async () => {
      const response = await aiSecurityService.getAiSecuritySettings();
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response;
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      currentEnabled = result.result.enabled;
    });

    test('should update AI security settings', async () => {
      const newEnabled = !currentEnabled;
      const response = await aiSecurityService.replaceZoneAiSecuritySettings({
        enabled: newEnabled,
      });
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result.success).toBe(true);

      // Restore original value
      await aiSecurityService.replaceZoneAiSecuritySettings({
        enabled: currentEnabled,
      });
    });
  });

  describe('API Gateway Discovery', () => {
    test('should get API Gateway discovery', async () => {
      const response = await aiSecurityService.getApiGatewayDiscovery();
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result.success).toBe(true);
    });

    test('should list API Gateway discovery operations', async () => {
      const response = await aiSecurityService.listApiGatewayDiscoveryOperations();
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result.success).toBe(true);
    });
  });

  describe('API Gateway Schemas', () => {
    test('should get API Gateway schemas', async () => {
      const response = await aiSecurityService.getApiGatewaySchemas();
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result.success).toBe(true);
    });
  });

  describe('API Gateway Operations', () => {
    test('should create and delete a single API Gateway operation', async () => {
      const createResponse = await aiSecurityService.createApiGatewayOperationItem({
        method: 'POST',
        host: 'api.example.com',
        endpoint: '/v1/messages',
      });
      expect(createResponse).toBeDefined();
      expect(createResponse.status).toEqual(200);
      expect(createResponse.result.success).toBe(true);

      const operationId = createResponse.result.result.operation_id;

      // Delete the created operation
      const deleteResponse = await aiSecurityService.deleteZoneApiGatewayOperation({
        operationId,
      });
      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.status).toEqual(204);
    });
  });
});
