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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const ListsApiV1 = require('../../dist/lists-api/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const listsApiServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  itemId: 'testString',
  listId: 'testString',
  operationId: 'testString',
};

const listsApiService = new ListsApiV1(listsApiServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(listsApiService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('ListsApiV1', () => {
  beforeEach(() => {
    mock_createRequest();
    // these are changed when passed into the factory/constructor, so re-init
    requiredGlobals = {
      crn: 'testString',
      itemId: 'testString',
      listId: 'testString',
      operationId: 'testString',
    };
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = ListsApiV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(ListsApiV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(ListsApiV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(ListsApiV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = ListsApiV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(ListsApiV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ListsApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ListsApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(ListsApiV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new ListsApiV1(listsApiServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(listsApiServiceOptions.crn);
        expect(serviceObj.itemId).toEqual(listsApiServiceOptions.itemId);
        expect(serviceObj.listId).toEqual(listsApiServiceOptions.listId);
        expect(serviceObj.operationId).toEqual(listsApiServiceOptions.operationId);
      });
    });
  });

  describe('getManagedLists', () => {
    describe('positive tests', () => {
      function __getManagedListsTest() {
        // Construct the params object for operation getManagedLists
        const getManagedListsParams = {};

        const getManagedListsResult = listsApiService.getManagedLists(getManagedListsParams);

        // all methods should return a Promise
        expectToBePromise(getManagedListsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rules/managed_lists', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(listsApiServiceOptions.crn);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getManagedListsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        listsApiService.enableRetries();
        __getManagedListsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        listsApiService.disableRetries();
        __getManagedListsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getManagedListsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        listsApiService.getManagedLists(getManagedListsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        listsApiService.getManagedLists({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getCustomLists', () => {
    describe('positive tests', () => {
      function __getCustomListsTest() {
        // Construct the params object for operation getCustomLists
        const getCustomListsParams = {};

        const getCustomListsResult = listsApiService.getCustomLists(getCustomListsParams);

        // all methods should return a Promise
        expectToBePromise(getCustomListsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rules/lists', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(listsApiServiceOptions.crn);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCustomListsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        listsApiService.enableRetries();
        __getCustomListsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        listsApiService.disableRetries();
        __getCustomListsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCustomListsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        listsApiService.getCustomLists(getCustomListsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        listsApiService.getCustomLists({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createCustomLists', () => {
    describe('positive tests', () => {
      function __createCustomListsTest() {
        // Construct the params object for operation createCustomLists
        const kind = 'ip';
        const name = 'testString';
        const description = 'testString';
        const createCustomListsParams = {
          kind,
          name,
          description,
        };

        const createCustomListsResult = listsApiService.createCustomLists(createCustomListsParams);

        // all methods should return a Promise
        expectToBePromise(createCustomListsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rules/lists', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.crn).toEqual(listsApiServiceOptions.crn);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createCustomListsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        listsApiService.enableRetries();
        __createCustomListsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        listsApiService.disableRetries();
        __createCustomListsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createCustomListsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        listsApiService.createCustomLists(createCustomListsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        listsApiService.createCustomLists({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getCustomList', () => {
    describe('positive tests', () => {
      function __getCustomListTest() {
        // Construct the params object for operation getCustomList
        const getCustomListParams = {};

        const getCustomListResult = listsApiService.getCustomList(getCustomListParams);

        // all methods should return a Promise
        expectToBePromise(getCustomListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rules/lists/{list_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(listsApiServiceOptions.crn);
        expect(mockRequestOptions.path.list_id).toEqual(listsApiServiceOptions.listId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCustomListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        listsApiService.enableRetries();
        __getCustomListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        listsApiService.disableRetries();
        __getCustomListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCustomListParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        listsApiService.getCustomList(getCustomListParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        listsApiService.getCustomList({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateCustomList', () => {
    describe('positive tests', () => {
      function __updateCustomListTest() {
        // Construct the params object for operation updateCustomList
        const description = 'testString';
        const updateCustomListParams = {
          description,
        };

        const updateCustomListResult = listsApiService.updateCustomList(updateCustomListParams);

        // all methods should return a Promise
        expectToBePromise(updateCustomListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rules/lists/{list_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.crn).toEqual(listsApiServiceOptions.crn);
        expect(mockRequestOptions.path.list_id).toEqual(listsApiServiceOptions.listId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCustomListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        listsApiService.enableRetries();
        __updateCustomListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        listsApiService.disableRetries();
        __updateCustomListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateCustomListParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        listsApiService.updateCustomList(updateCustomListParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        listsApiService.updateCustomList({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('deleteCustomList', () => {
    describe('positive tests', () => {
      function __deleteCustomListTest() {
        // Construct the params object for operation deleteCustomList
        const deleteCustomListParams = {};

        const deleteCustomListResult = listsApiService.deleteCustomList(deleteCustomListParams);

        // all methods should return a Promise
        expectToBePromise(deleteCustomListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rules/lists/{list_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(listsApiServiceOptions.crn);
        expect(mockRequestOptions.path.list_id).toEqual(listsApiServiceOptions.listId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCustomListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        listsApiService.enableRetries();
        __deleteCustomListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        listsApiService.disableRetries();
        __deleteCustomListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCustomListParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        listsApiService.deleteCustomList(deleteCustomListParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        listsApiService.deleteCustomList({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getListItems', () => {
    describe('positive tests', () => {
      function __getListItemsTest() {
        // Construct the params object for operation getListItems
        const cursor = 'testString';
        const perPage = 1;
        const search = 'testString';
        const getListItemsParams = {
          cursor,
          perPage,
          search,
        };

        const getListItemsResult = listsApiService.getListItems(getListItemsParams);

        // all methods should return a Promise
        expectToBePromise(getListItemsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rules/lists/{list_id}/items', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.cursor).toEqual(cursor);
        expect(mockRequestOptions.qs.per_page).toEqual(perPage);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.path.crn).toEqual(listsApiServiceOptions.crn);
        expect(mockRequestOptions.path.list_id).toEqual(listsApiServiceOptions.listId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getListItemsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        listsApiService.enableRetries();
        __getListItemsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        listsApiService.disableRetries();
        __getListItemsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getListItemsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        listsApiService.getListItems(getListItemsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        listsApiService.getListItems({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createListItems', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CreateListItemsReqItem
      const createListItemsReqItemModel = {
        asn: 19604,
        comment: 'My list of developer IPs.',
        hostname: 'cloud.ibm.com',
        ip: '172.64.0.0/13',
      };

      function __createListItemsTest() {
        // Construct the params object for operation createListItems
        const createListItemsReqItem = [createListItemsReqItemModel];
        const createListItemsParams = {
          createListItemsReqItem,
        };

        const createListItemsResult = listsApiService.createListItems(createListItemsParams);

        // all methods should return a Promise
        expectToBePromise(createListItemsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rules/lists/{list_id}/items', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(createListItemsReqItem);
        expect(mockRequestOptions.path.crn).toEqual(listsApiServiceOptions.crn);
        expect(mockRequestOptions.path.list_id).toEqual(listsApiServiceOptions.listId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createListItemsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        listsApiService.enableRetries();
        __createListItemsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        listsApiService.disableRetries();
        __createListItemsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createListItemsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        listsApiService.createListItems(createListItemsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        listsApiService.createListItems({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('deleteListItems', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DeleteListItemsReqItemsItem
      const deleteListItemsReqItemsItemModel = {
        id: '70c2009751b24ffc9ed1ab462ba957b4',
      };

      function __deleteListItemsTest() {
        // Construct the params object for operation deleteListItems
        const items = [deleteListItemsReqItemsItemModel];
        const deleteListItemsParams = {
          items,
        };

        const deleteListItemsResult = listsApiService.deleteListItems(deleteListItemsParams);

        // all methods should return a Promise
        expectToBePromise(deleteListItemsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rules/lists/{list_id}/items', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.items).toEqual(items);
        expect(mockRequestOptions.path.crn).toEqual(listsApiServiceOptions.crn);
        expect(mockRequestOptions.path.list_id).toEqual(listsApiServiceOptions.listId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteListItemsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        listsApiService.enableRetries();
        __deleteListItemsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        listsApiService.disableRetries();
        __deleteListItemsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteListItemsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        listsApiService.deleteListItems(deleteListItemsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        listsApiService.deleteListItems({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateListItems', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CreateListItemsReqItem
      const createListItemsReqItemModel = {
        asn: 19604,
        comment: 'My list of developer IPs.',
        hostname: 'cloud.ibm.com',
        ip: '172.64.0.0/13',
      };

      function __updateListItemsTest() {
        // Construct the params object for operation updateListItems
        const createListItemsReqItem = [createListItemsReqItemModel];
        const updateListItemsParams = {
          createListItemsReqItem,
        };

        const updateListItemsResult = listsApiService.updateListItems(updateListItemsParams);

        // all methods should return a Promise
        expectToBePromise(updateListItemsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rules/lists/{list_id}/items', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(createListItemsReqItem);
        expect(mockRequestOptions.path.crn).toEqual(listsApiServiceOptions.crn);
        expect(mockRequestOptions.path.list_id).toEqual(listsApiServiceOptions.listId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateListItemsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        listsApiService.enableRetries();
        __updateListItemsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        listsApiService.disableRetries();
        __updateListItemsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateListItemsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        listsApiService.updateListItems(updateListItemsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        listsApiService.updateListItems({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getListItem', () => {
    describe('positive tests', () => {
      function __getListItemTest() {
        // Construct the params object for operation getListItem
        const getListItemParams = {};

        const getListItemResult = listsApiService.getListItem(getListItemParams);

        // all methods should return a Promise
        expectToBePromise(getListItemResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rules/lists/{list_id}/items/{item_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(listsApiServiceOptions.crn);
        expect(mockRequestOptions.path.list_id).toEqual(listsApiServiceOptions.listId);
        expect(mockRequestOptions.path.item_id).toEqual(listsApiServiceOptions.itemId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getListItemTest();

        // enable retries and test again
        createRequestMock.mockClear();
        listsApiService.enableRetries();
        __getListItemTest();

        // disable retries and test again
        createRequestMock.mockClear();
        listsApiService.disableRetries();
        __getListItemTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getListItemParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        listsApiService.getListItem(getListItemParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        listsApiService.getListItem({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getOperationStatus', () => {
    describe('positive tests', () => {
      function __getOperationStatusTest() {
        // Construct the params object for operation getOperationStatus
        const getOperationStatusParams = {};

        const getOperationStatusResult = listsApiService.getOperationStatus(getOperationStatusParams);

        // all methods should return a Promise
        expectToBePromise(getOperationStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rules/lists/bulk_operations/{operation_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(listsApiServiceOptions.crn);
        expect(mockRequestOptions.path.operation_id).toEqual(listsApiServiceOptions.operationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOperationStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        listsApiService.enableRetries();
        __getOperationStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        listsApiService.disableRetries();
        __getOperationStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getOperationStatusParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        listsApiService.getOperationStatus(getOperationStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        listsApiService.getOperationStatus({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
