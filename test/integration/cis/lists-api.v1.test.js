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

  // Initialize the service client.
  const options = {
    authenticator: new IamAuthenticator({
      apikey: config.CIS_SERVICES_APIKEY,
      url: config.CIS_SERVICES_AUTH_URL,
    }),
    crn: config.CIS_SERVICES_CRN,
    itemId: config.CIS_SERVICES_LIST_ITEM_ID,
    listId: config.CIS_SERVICES_LIST_ID,
    operationId: config.CIS_SERVICES_LIST_OPERATION_ID,
    serviceUrl: config.CIS_SERVICES_URL,
  };

  let listsApiV1;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    listsApiV1 = ListsApiV1.newInstance(options);
    expect(listsApiV1).not.toBeNull();
    done();
  });

  describe('List Managed Lists', () => {
    test('should successfully list managed lists', async done => {
      try {
        const response = await listsApiV1.getManagedLists();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();

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

  describe('List Custom Lists', () => {
    test('should successfully list custom lists', async done => {
      try {
        const response = await listsApiV1.getCustomLists();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();

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

  describe('Create Custom List', () => {
    test('should successfully create custom list', async done => {
      try {
        const params = {
          kind: 'ip',
          name: 'sdk integration test list',
          description: 'Integration test custom list',
        };
        const response = await listsApiV1.createCustomLists(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};
        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.success).toBeTruthy();
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Get Custom List', () => {
    test('should successfully get custom list', async done => {
      try {
        const response = await listsApiV1.getCustomList();
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

  describe('Update Custom List', () => {
    test('should successfully update custom list', async done => {
      try {
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
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Delete Custom List', () => {
    test('should successfully delete custom list', async done => {
      try {
        const response = await listsApiV1.deleteCustomList();
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

  describe('Get List Items', () => {
    test('should successfully get list items', async done => {
      try {
        const params = {
          perPage: 1,
          search: '192.0.2',
        };
        const response = await listsApiV1.getListItems(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();

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

  describe('Create List Items', () => {
    test('should successfully create list items', async done => {
      try {
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
        expect(response.status).toEqual(202);

        const { result } = response || {};
        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.success).toBeTruthy();
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Delete List Items', () => {
    test('should successfully delete list items', async done => {
      try {
        const params = {
          items: [
            {
              id: options.itemId,
            },
          ],
        };
        const response = await listsApiV1.deleteListItems(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(202);

        const { result } = response || {};
        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.success).toBeTruthy();
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update All List Items', () => {
    test('should successfully update all list items', async done => {
      try {
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
        expect(response.status).toEqual(202);

        const { result } = response || {};
        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.success).toBeTruthy();
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Get List Item', () => {
    test('should successfully get list item', async done => {
      try {
        const response = await listsApiV1.getListItem();
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

  describe('Get Operation Status', () => {
    test('should successfully get operation status', async done => {
      try {
        const response = await listsApiV1.getOperationStatus();
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
