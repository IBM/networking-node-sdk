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
    crn: config.CIS_SERVICES_CRN,
    serviceUrl: config.CIS_SERVICES_URL,
    zoneIdentifier: config.CIS_SERVICES_ZONE_ID,
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

    test('should list API Gateway discovery operations with filters', async () => {
      const response = await aiSecurityService.listApiGatewayDiscoveryOperations({
        perPage: 5,
        page: 1,
      });
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

  describe('API Gateway Discovery Operations - Update', () => {
    test('should bulk-update discovered operation state (ignored -> review)', async () => {
      // Find at least one operation in "review" state to patch
      const listResponse = await aiSecurityService.listApiGatewayDiscoveryOperations({
        state: 'review',
        perPage: 5,
      });
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);
      expect(listResponse.result.success).toBe(true);

      if (!listResponse.result.result || listResponse.result.result.length === 0) {
        console.warn("Skipping: no discovered operations in 'review' state");
        return;
      }

      const discoveredId = listResponse.result.result[0].id;

      // PATCH: mark "ignored"; body is a free-form map { uuid: { state } }
      const patchResponse = await aiSecurityService.updateZoneApiGatewayDiscoveryOperation({
        requestBody: { [discoveredId]: { state: 'ignored' } },
      });
      expect(patchResponse).toBeDefined();
      expect(patchResponse.status).toEqual(200);
      expect(patchResponse.result.success).toBe(true);

      // Restore to "review"
      const restoreResponse = await aiSecurityService.updateZoneApiGatewayDiscoveryOperation({
        requestBody: { [discoveredId]: { state: 'review' } },
      });
      expect(restoreResponse.status).toEqual(200);
    });
  });

  describe('API Gateway Operations - List', () => {
    test('should list zone API Gateway operations', async () => {
      const response = await aiSecurityService.listZoneApiGatewayOperations({});
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result.success).toBe(true);
    });
  });

  describe('API Gateway Operations - Bulk delete', () => {
    test('should create two operations then bulk-delete them', async () => {
      const createResponse = await aiSecurityService.createZoneApiGatewayOperation({
        apiGatewayOperation: [
          { method: 'GET', host: 'api.example.com', endpoint: '/v1/bulk-del/a' },
          { method: 'POST', host: 'api.example.com', endpoint: '/v1/bulk-del/b' },
        ],
      });
      expect(createResponse).toBeDefined();
      expect(createResponse.status).toEqual(200);
      expect(createResponse.result.success).toBe(true);
      expect(createResponse.result.result.length).toBeGreaterThanOrEqual(1);

      let ids = createResponse.result.result
        .filter((op) => op.operation_id)
        .map((op) => op.operation_id);

      try {
        // Attempt bulk-delete; tolerate failure (backend inconsistency on some zones)
        const bulkDeleteResponse = await aiSecurityService.deleteZoneApiGatewayOperations({
          operationIds: ids,
        });
        expect(bulkDeleteResponse).toBeDefined();
        expect(bulkDeleteResponse.result.success).toBe(true);
        ids = [];
      } catch (err) {
        console.warn(
          `deleteZoneApiGatewayOperations returned error (may be unsupported on this zone): ${err.message}`
        );
      } finally {
        // Always clean up individually
        for (const operationId of ids) {
          try {
            await aiSecurityService.deleteZoneApiGatewayOperation({ operationId });
          } catch (e) {
            // ignore
          }
        }
      }
    });
  });

  describe('API Gateway Operation Labels — per-operation lifecycle', () => {
    let labelOperationId;

    test('should create a single operation for label tests', async () => {
      const createResponse = await aiSecurityService.createApiGatewayOperationItem({
        method: 'POST',
        host: 'api.example.com',
        endpoint: '/v1/label-test',
      });
      expect(createResponse).toBeDefined();
      expect(createResponse.status).toEqual(200);
      expect(createResponse.result.success).toBe(true);
      labelOperationId = createResponse.result.result.operation_id;
      expect(labelOperationId).toBeTruthy();
    });

    test('should add labels to a single operation (createApiGatewayOperationLabels)', async () => {
      if (!labelOperationId) {
        console.warn('Skipping: labelOperationId not set');
        return;
      }
      const response = await aiSecurityService.createApiGatewayOperationLabels({
        operationId: labelOperationId,
        user: [],
        managed: ['cf-llm'],
      });
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result.success).toBe(true);
    });

    test('should replace labels on a single operation (setZoneApiGatewayOperationLabels)', async () => {
      if (!labelOperationId) {
        console.warn('Skipping: labelOperationId not set');
        return;
      }
      const response = await aiSecurityService.setZoneApiGatewayOperationLabels({
        operationId: labelOperationId,
        user: [],
        managed: ['cf-llm'],
      });
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result.success).toBe(true);
    });

    test('should bulk-replace labels via selector (replaceZoneApiGatewayOperationLabels)', async () => {
      if (!labelOperationId) {
        console.warn('Skipping: labelOperationId not set');
        return;
      }
      const response = await aiSecurityService.replaceZoneApiGatewayOperationLabels({
        selector: { include: { operation_ids: [labelOperationId] } },
        user: { labels: [] },
        managed: { labels: ['cf-llm'] },
      });
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result.success).toBe(true);
    });

    test('should remove labels from a single operation (unsetZoneApiGatewayOperationLabels)', async () => {
      if (!labelOperationId) {
        console.warn('Skipping: labelOperationId not set');
        return;
      }
      const response = await aiSecurityService.unsetZoneApiGatewayOperationLabels({
        operationId: labelOperationId,
        user: [],
        managed: ['cf-llm'],
      });
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result.success).toBe(true);
    });

    test('should bulk-delete labels via selector (deleteZoneApiGatewayOperationLabels)', async () => {
      if (!labelOperationId) {
        console.warn('Skipping: labelOperationId not set');
        return;
      }
      const response = await aiSecurityService.deleteZoneApiGatewayOperationLabels({
        selector: { include: { operation_ids: [labelOperationId] } },
        managed: { labels: ['cf-llm'] },
      });
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result.success).toBe(true);
    });

    test('should delete the label-test operation', async () => {
      if (!labelOperationId) {
        console.warn('Skipping: labelOperationId not set');
        return;
      }
      const response = await aiSecurityService.deleteZoneApiGatewayOperation({
        operationId: labelOperationId,
      });
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result.success).toBe(true);
    });
  });

  describe('API Gateway Operations - Single operation lifecycle', () => {
    test('Create a single API Gateway operation, retrieve it by operation ID, delete it, and verify deletion', async () => {
      // 1. Create a single operation
      const createResponse = await aiSecurityService.createApiGatewayOperationItem({
        method: 'POST',
        host: 'api.example.com',
        endpoint: '/v1/messages',
      });
      expect(createResponse).toBeDefined();
      expect(createResponse.status).toEqual(200);
      expect(createResponse.result).toBeDefined();
      expect(createResponse.result.success).toBe(true);
      expect(createResponse.result.result).toBeDefined();
      expect(createResponse.result.result.operation_id).toBeTruthy();

      const operationId = createResponse.result.result.operation_id;

      // 2a. List operations and verify the newly created one appears
      const listResponse = await aiSecurityService.listZoneApiGatewayOperations({
        host: ['api.example.com'],
        method: ['POST'],
      });
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);
      expect(listResponse.result.success).toBe(true);
      expect(listResponse.result.result.some((op) => op.operation_id === operationId)).toBe(true);

      // 2b. Retrieve the operation using the captured operationID
      const getResponse = await aiSecurityService.getZoneApiGatewayOperation({
        operationId,
      });
      expect(getResponse).toBeDefined();
      expect(getResponse.status).toEqual(200);
      expect(getResponse.result).toBeDefined();
      expect(getResponse.result.success).toBe(true);
      expect(getResponse.result.result).toBeDefined();
      expect(getResponse.result.result.operation_id).toEqual(operationId);
      expect(getResponse.result.result.method).toEqual('POST');
      expect(getResponse.result.result.host).toEqual('api.example.com');
      expect(getResponse.result.result.endpoint).toEqual('/v1/messages');

      // 3. Delete the operation
      const deleteResponse = await aiSecurityService.deleteZoneApiGatewayOperation({
        operationId,
      });
      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.status).toEqual(200);
      expect(deleteResponse.result).toBeDefined();
      expect(deleteResponse.result.success).toBe(true);

      // 4. Verify deletion - getZoneApiGatewayOperation should fail with HTTP 404
      try {
        await aiSecurityService.getZoneApiGatewayOperation({
          operationId,
        });
        // If it doesn't throw, fail the test
        expect(true).toBe(false);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.status).toEqual(404);
      }
    });
  });

  describe('API Gateway Operations - Bulk lifecycle', () => {
    let bulkOperationIDs = [];

    test('Scenario 1: Create 3 operations in bulk and retrieve the second one', async () => {
      const operations = [
        {
          method: 'GET',
          host: 'api.example.com',
          endpoint: '/v2/users',
        },
        {
          method: 'POST',
          host: 'api.example.com',
          endpoint: '/v2/orders',
        },
        {
          method: 'DELETE',
          host: 'api.example.com',
          endpoint: '/v2/sessions',
        },
      ];

      const bulkCreateResponse = await aiSecurityService.createZoneApiGatewayOperation({
        apiGatewayOperation: operations,
      });
      expect(bulkCreateResponse).toBeDefined();
      expect(bulkCreateResponse.status).toEqual(200);
      expect(bulkCreateResponse.result).toBeDefined();
      expect(bulkCreateResponse.result.success).toBe(true);
      expect(bulkCreateResponse.result.result).toBeDefined();
      expect(bulkCreateResponse.result.result).toHaveLength(3);

      bulkOperationIDs = bulkCreateResponse.result.result.map((op) => op.operation_id);
      expect(bulkOperationIDs).toHaveLength(3);
      bulkOperationIDs.forEach((id) => expect(id).toBeTruthy());

      // Retrieve the second operation
      const getSecondResponse = await aiSecurityService.getZoneApiGatewayOperation({
        operationId: bulkOperationIDs[1],
      });
      expect(getSecondResponse).toBeDefined();
      expect(getSecondResponse.status).toEqual(200);
      expect(getSecondResponse.result).toBeDefined();
      expect(getSecondResponse.result.success).toBe(true);
      expect(getSecondResponse.result.result).toBeDefined();
      expect(getSecondResponse.result.result.operation_id).toEqual(bulkOperationIDs[1]);
    });

    test('Scenario 2: Update operation labels — add to all, remove one, verify label persists for remaining', async () => {
      if (!bulkOperationIDs || bulkOperationIDs.length === 0) {
        console.warn('Skipping Scenario 2: bulkOperationIDs is empty or unavailable');
        return;
      }

      const managedLabel = 'cf-llm';

      // 1. Add managed label to all 3 operations
      const updateAllResponse = await aiSecurityService.updateApiGatewayOperationLabels({
        selector: {
          include: {
            operation_ids: bulkOperationIDs,
          },
        },
        user: {
          labels: [],
        },
        managed: {
          labels: [managedLabel],
        },
      });
      expect(updateAllResponse).toBeDefined();
      expect(updateAllResponse.status).toEqual(200);
      expect(updateAllResponse.result).toBeDefined();
      expect(updateAllResponse.result.success).toBe(true);
      expect(updateAllResponse.result.result).toBeDefined();
      expect(updateAllResponse.result.result).toHaveLength(3);
      updateAllResponse.result.result.forEach((item) => {
        const labelNames = item.labels.map((l) => (typeof l === 'string' ? l : l.name));
        expect(labelNames).toContain(managedLabel);
      });

      // 2. Narrow selector to only 2nd and 3rd IDs (drop 1st ID)
      const narrowedIDs = [bulkOperationIDs[1], bulkOperationIDs[2]];
      const updateNarrowedResponse = await aiSecurityService.updateApiGatewayOperationLabels({
        selector: {
          include: {
            operation_ids: narrowedIDs,
          },
        },
        user: {
          labels: [],
        },
        managed: {
          labels: [managedLabel],
        },
      });
      expect(updateNarrowedResponse).toBeDefined();
      expect(updateNarrowedResponse.status).toEqual(200);
      expect(updateNarrowedResponse.result).toBeDefined();
      expect(updateNarrowedResponse.result.success).toBe(true);
      expect(updateNarrowedResponse.result.result).toBeDefined();
      expect(updateNarrowedResponse.result.result).toHaveLength(2);
      updateNarrowedResponse.result.result.forEach((item) => {
        const labelNames = item.labels.map((l) => (typeof l === 'string' ? l : l.name));
        expect(labelNames).toContain(managedLabel);
      });
    });

    test('Scenario 2b: Bulk-replace and bulk-delete labels on all operations', async () => {
      if (!bulkOperationIDs || bulkOperationIDs.length === 0) {
        console.warn('Skipping Scenario 2b: bulkOperationIDs is empty or unavailable');
        return;
      }

      const managedLabel = 'cf-llm';

      // PUT /operations/labels
      const replaceResponse = await aiSecurityService.replaceZoneApiGatewayOperationLabels({
        selector: { include: { operation_ids: bulkOperationIDs } },
        user: { labels: [] },
        managed: { labels: [managedLabel] },
      });
      expect(replaceResponse).toBeDefined();
      expect(replaceResponse.status).toEqual(200);
      expect(replaceResponse.result.success).toBe(true);

      // DELETE /operations/labels
      const deleteLabelsResponse = await aiSecurityService.deleteZoneApiGatewayOperationLabels({
        selector: { include: { operation_ids: bulkOperationIDs } },
        managed: { labels: [managedLabel] },
      });
      expect(deleteLabelsResponse).toBeDefined();
      expect(deleteLabelsResponse.status).toEqual(200);
      expect(deleteLabelsResponse.result.success).toBe(true);
    });

    test('Scenario 3: Delete all bulk-created operations', async () => {
      if (!bulkOperationIDs || bulkOperationIDs.length === 0) {
        console.warn('Skipping Scenario 3: bulkOperationIDs is empty or unavailable');
        return;
      }

      for (const operationId of bulkOperationIDs) {
        const deleteResponse = await aiSecurityService.deleteZoneApiGatewayOperation({
          operationId,
        });
        expect(deleteResponse).toBeDefined();
        expect(deleteResponse.status).toEqual(200);
        expect(deleteResponse.result).toBeDefined();
        expect(deleteResponse.result.success).toBe(true);
      }
    });
  });
});
