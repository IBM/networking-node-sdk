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

const ListsApiV1 = require('../../../dist/cis/lists-api/v1');
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

describe.skip('ListsApiV1', () => {
  jest.setTimeout(timeout);

  // itemId, listId, operationId are placeholders — real values captured during tests.
  const options = {
    authenticator: new IamAuthenticator({
      apikey: config.CIS_SERVICES_APIKEY,
      url: config.CIS_SERVICES_AUTH_URL,
    }),
    crn: config.CIS_SERVICES_CRN,
    itemId: '00000000000000000000000000000001',
    listId: '00000000000000000000000000000001',
    operationId: '00000000000000000000000000000001',
    serviceUrl: config.CIS_SERVICES_URL,
  };

  let listsApiV1;

  test('should successfully complete initialization', done => {
    listsApiV1 = ListsApiV1.newInstance(options);
    expect(listsApiV1).not.toBeNull();
    done();
  });

  beforeAll(async () => {
    listsApiV1 = ListsApiV1.newInstance(options);
    const response = await listsApiV1.getCustomLists();
    const lists = (response.result && response.result.result) || [];
    for (const list of lists) {
      if (list.name === 'sdk_integration_test_list') {
        listsApiV1.listId = list.id;
        await listsApiV1.deleteCustomList();
      }
    }
  });

  describe('List Managed Lists', () => {
    test('should successfully list managed lists', async () => {
      const response = await listsApiV1.getManagedLists();
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result.length).toBeGreaterThanOrEqual(0);
        expect(result.result).toBeDefined();
      }
    });
  });

  describe('List Custom Lists', () => {
    test('should successfully list custom lists', async () => {
      const response = await listsApiV1.getCustomLists();
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result.length).toBeGreaterThanOrEqual(0);
        expect(result.result).toBeDefined();
      }
    });
  });

  describe('Create Custom List', () => {
    test('should successfully create custom list', async () => {
      const params = {
        kind: 'ip',
        name: 'sdk_integration_test_list',
        description: 'Integration test custom list',
      };
      const response = await listsApiV1.createCustomLists(params);
      expect(response).toBeDefined();
      expect([200, 201]).toContain(response.status);

      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.success).toBeTruthy();
      expect(result.result).toBeDefined();
      expect(result.result.id).toBeDefined();

      // Capture the created list ID for subsequent tests
      listsApiV1.listId = result.result.id;
    });
  });

  describe('Get Custom List', () => {
    test('should successfully get custom list', async () => {
      const response = await listsApiV1.getCustomList();
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result).toBeDefined();
      }
    });
  });

  describe('Update Custom List', () => {
    test('should successfully update custom list', async () => {
      const params = {
        description: 'Updated integration test custom list',
      };
      const response = await listsApiV1.updateCustomList(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.success).toBeTruthy();
        expect(result.result).toBeDefined();
      }
    });
  });

  describe('Create List Items', () => {
    test('should successfully create list items', async () => {
      const params = {
        createListItemsReqItem: [
          {
            ip: '192.0.2.10',
            comment: 'integration test item',
          },
        ],
      };
      const response = await listsApiV1.createListItems(params);
      expect(response).toBeDefined();
      expect([200, 202]).toContain(response.status);

      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.success).toBeTruthy();
      expect(result.result).toBeDefined();
      expect(result.result.operation_id).toBeDefined();

      // Capture operation ID for status check
      listsApiV1.operationId = result.result.operation_id;
    });
  });

  describe('Get Operation Status', () => {
    test('should successfully get operation status', async () => {
      const response = await listsApiV1.getOperationStatus();
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result).toBeDefined();
      }
    });
  });

  describe('Get List Items', () => {
    test('should successfully get list items', async () => {
      const params = {
        perPage: 1,
        search: '192.0.2',
      };
      const response = await listsApiV1.getListItems(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      expect(result).toBeDefined();

      if (result && result.result && result.result.length > 0) {
        expect(result.result).toBeDefined();
        // Capture item ID for getListItem test
        listsApiV1.itemId = result.result[0].id;
      }
    });
  });

  describe('Get List Item', () => {
    test('should successfully get list item', async () => {
      const response = await listsApiV1.getListItem();
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result).toBeDefined();
      }
    });
  });

  describe('Update All List Items', () => {
    test('should successfully update all list items', async () => {
      const params = {
        createListItemsReqItem: [
          {
            ip: '192.0.2.11',
            comment: 'updated integration test item',
          },
        ],
      };
      const response = await listsApiV1.updateListItems(params);
      expect(response).toBeDefined();
      expect([200, 202]).toContain(response.status);

      const { result } = response || {};
      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.success).toBeTruthy();
        expect(result.result).toBeDefined();
      }
    });
  });

  describe('Delete List Items', () => {
    test('should successfully delete list items', async () => {
      const params = {
        items: [
          {
            id: listsApiV1.itemId,
          },
        ],
      };
      const response = await listsApiV1.deleteListItems(params);
      expect(response).toBeDefined();
      expect([200, 202]).toContain(response.status);

      const { result } = response || {};
      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.success).toBeTruthy();
        expect(result.result).toBeDefined();
      }
    });
  });

  describe('Delete Custom List', () => {
    test('should successfully delete custom list', async () => {
      const response = await listsApiV1.deleteCustomList();
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result).toBeDefined();
      }
    });
  });
});
