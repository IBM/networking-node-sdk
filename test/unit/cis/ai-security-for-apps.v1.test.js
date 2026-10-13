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
const AiSecurityForAppsV1 = require('../../../dist/cis/ai-security-for-apps/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const aiSecurityForAppsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  zoneIdentifier: 'testString',
};

const aiSecurityForAppsService = new AiSecurityForAppsV1(aiSecurityForAppsServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(aiSecurityForAppsService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('AiSecurityForAppsV1', () => {
  beforeEach(() => {
    mock_createRequest();
    // these are changed when passed into the factory/constructor, so re-init
    requiredGlobals = {
      crn: 'testString',
      zoneIdentifier: 'testString',
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
      const testInstance = AiSecurityForAppsV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(AiSecurityForAppsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(AiSecurityForAppsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(AiSecurityForAppsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = AiSecurityForAppsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(AiSecurityForAppsV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AiSecurityForAppsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AiSecurityForAppsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(AiSecurityForAppsV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new AiSecurityForAppsV1(aiSecurityForAppsServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(serviceObj.zoneIdentifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
      });
    });
  });

  describe('getAiSecuritySettings', () => {
    describe('positive tests', () => {
      function __getAiSecuritySettingsTest() {
        // Construct the params object for operation getAiSecuritySettings
        const getAiSecuritySettingsParams = {};

        const getAiSecuritySettingsResult = aiSecurityForAppsService.getAiSecuritySettings(getAiSecuritySettingsParams);

        // all methods should return a Promise
        expectToBePromise(getAiSecuritySettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/ai_security/settings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAiSecuritySettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __getAiSecuritySettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __getAiSecuritySettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAiSecuritySettingsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.getAiSecuritySettings(getAiSecuritySettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        aiSecurityForAppsService.getAiSecuritySettings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('replaceZoneAiSecuritySettings', () => {
    describe('positive tests', () => {
      function __replaceZoneAiSecuritySettingsTest() {
        // Construct the params object for operation replaceZoneAiSecuritySettings
        const enabled = true;
        const replaceZoneAiSecuritySettingsParams = {
          enabled,
        };

        const replaceZoneAiSecuritySettingsResult = aiSecurityForAppsService.replaceZoneAiSecuritySettings(replaceZoneAiSecuritySettingsParams);

        // all methods should return a Promise
        expectToBePromise(replaceZoneAiSecuritySettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/ai_security/settings', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceZoneAiSecuritySettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __replaceZoneAiSecuritySettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __replaceZoneAiSecuritySettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceZoneAiSecuritySettingsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.replaceZoneAiSecuritySettings(replaceZoneAiSecuritySettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        aiSecurityForAppsService.replaceZoneAiSecuritySettings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getApiGatewayDiscovery', () => {
    describe('positive tests', () => {
      function __getApiGatewayDiscoveryTest() {
        // Construct the params object for operation getApiGatewayDiscovery
        const getApiGatewayDiscoveryParams = {};

        const getApiGatewayDiscoveryResult = aiSecurityForAppsService.getApiGatewayDiscovery(getApiGatewayDiscoveryParams);

        // all methods should return a Promise
        expectToBePromise(getApiGatewayDiscoveryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/discovery', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getApiGatewayDiscoveryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __getApiGatewayDiscoveryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __getApiGatewayDiscoveryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getApiGatewayDiscoveryParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.getApiGatewayDiscovery(getApiGatewayDiscoveryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        aiSecurityForAppsService.getApiGatewayDiscovery({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listApiGatewayDiscoveryOperations', () => {
    describe('positive tests', () => {
      function __listApiGatewayDiscoveryOperationsTest() {
        // Construct the params object for operation listApiGatewayDiscoveryOperations
        const diff = true;
        const direction = 'asc';
        const endpoint = 'testString';
        const host = ['testString'];
        const method = ['testString'];
        const order = 'host';
        const origin = 'ML';
        const state = 'review';
        const page = 1;
        const perPage = 5;
        const listApiGatewayDiscoveryOperationsParams = {
          diff,
          direction,
          endpoint,
          host,
          method,
          order,
          origin,
          state,
          page,
          perPage,
        };

        const listApiGatewayDiscoveryOperationsResult = aiSecurityForAppsService.listApiGatewayDiscoveryOperations(listApiGatewayDiscoveryOperationsParams);

        // all methods should return a Promise
        expectToBePromise(listApiGatewayDiscoveryOperationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/discovery/operations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.diff).toEqual(diff);
        expect(mockRequestOptions.qs.direction).toEqual(direction);
        expect(mockRequestOptions.qs.endpoint).toEqual(endpoint);
        expect(mockRequestOptions.qs.host).toEqual(host);
        expect(mockRequestOptions.qs.method).toEqual(method);
        expect(mockRequestOptions.qs.order).toEqual(order);
        expect(mockRequestOptions.qs.origin).toEqual(origin);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.qs.page).toEqual(page);
        expect(mockRequestOptions.qs.per_page).toEqual(perPage);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listApiGatewayDiscoveryOperationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __listApiGatewayDiscoveryOperationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __listApiGatewayDiscoveryOperationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listApiGatewayDiscoveryOperationsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.listApiGatewayDiscoveryOperations(listApiGatewayDiscoveryOperationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        aiSecurityForAppsService.listApiGatewayDiscoveryOperations({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateZoneApiGatewayDiscoveryOperation', () => {
    describe('positive tests', () => {
      function __updateZoneApiGatewayDiscoveryOperationTest() {
        // Construct the params object for operation updateZoneApiGatewayDiscoveryOperation
        const requestBody = { 'key1': 'testString' };
        const updateZoneApiGatewayDiscoveryOperationParams = {
          requestBody,
        };

        const updateZoneApiGatewayDiscoveryOperationResult = aiSecurityForAppsService.updateZoneApiGatewayDiscoveryOperation(updateZoneApiGatewayDiscoveryOperationParams);

        // all methods should return a Promise
        expectToBePromise(updateZoneApiGatewayDiscoveryOperationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/discovery/operations', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(requestBody);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateZoneApiGatewayDiscoveryOperationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __updateZoneApiGatewayDiscoveryOperationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __updateZoneApiGatewayDiscoveryOperationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateZoneApiGatewayDiscoveryOperationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.updateZoneApiGatewayDiscoveryOperation(updateZoneApiGatewayDiscoveryOperationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        aiSecurityForAppsService.updateZoneApiGatewayDiscoveryOperation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('deleteZoneApiGatewayOperations', () => {
    describe('positive tests', () => {
      function __deleteZoneApiGatewayOperationsTest() {
        // Construct the params object for operation deleteZoneApiGatewayOperations
        const operationIds = ['f174e90a-fafe-4643-bbbc-4a0ed4fc8415'];
        const deleteZoneApiGatewayOperationsParams = {
          operationIds,
        };

        const deleteZoneApiGatewayOperationsResult = aiSecurityForAppsService.deleteZoneApiGatewayOperations(deleteZoneApiGatewayOperationsParams);

        // all methods should return a Promise
        expectToBePromise(deleteZoneApiGatewayOperationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.operation_ids).toEqual(operationIds);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteZoneApiGatewayOperationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __deleteZoneApiGatewayOperationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __deleteZoneApiGatewayOperationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteZoneApiGatewayOperationsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.deleteZoneApiGatewayOperations(deleteZoneApiGatewayOperationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        aiSecurityForAppsService.deleteZoneApiGatewayOperations({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listZoneApiGatewayOperations', () => {
    describe('positive tests', () => {
      function __listZoneApiGatewayOperationsTest() {
        // Construct the params object for operation listZoneApiGatewayOperations
        const host = ['testString'];
        const method = ['GET'];
        const endpoint = 'testString';
        const labels = ['testString'];
        const direction = 'asc';
        const order = 'host';
        const page = 1;
        const perPage = 1;
        const listZoneApiGatewayOperationsParams = {
          host,
          method,
          endpoint,
          labels,
          direction,
          order,
          page,
          perPage,
        };

        const listZoneApiGatewayOperationsResult = aiSecurityForAppsService.listZoneApiGatewayOperations(listZoneApiGatewayOperationsParams);

        // all methods should return a Promise
        expectToBePromise(listZoneApiGatewayOperationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.host).toEqual(host);
        expect(mockRequestOptions.qs.method).toEqual(method);
        expect(mockRequestOptions.qs.endpoint).toEqual(endpoint);
        expect(mockRequestOptions.qs.labels).toEqual(labels);
        expect(mockRequestOptions.qs.direction).toEqual(direction);
        expect(mockRequestOptions.qs.order).toEqual(order);
        expect(mockRequestOptions.qs.page).toEqual(page);
        expect(mockRequestOptions.qs.per_page).toEqual(perPage);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listZoneApiGatewayOperationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __listZoneApiGatewayOperationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __listZoneApiGatewayOperationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listZoneApiGatewayOperationsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.listZoneApiGatewayOperations(listZoneApiGatewayOperationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        aiSecurityForAppsService.listZoneApiGatewayOperations({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createZoneApiGatewayOperation', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ApiGatewayOperation
      const apiGatewayOperationModel = {
        method: 'POST',
        host: 'api.example.com',
        endpoint: '/v1/messages',
      };

      function __createZoneApiGatewayOperationTest() {
        // Construct the params object for operation createZoneApiGatewayOperation
        const apiGatewayOperation = [apiGatewayOperationModel];
        const createZoneApiGatewayOperationParams = {
          apiGatewayOperation,
        };

        const createZoneApiGatewayOperationResult = aiSecurityForAppsService.createZoneApiGatewayOperation(createZoneApiGatewayOperationParams);

        // all methods should return a Promise
        expectToBePromise(createZoneApiGatewayOperationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(apiGatewayOperation);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createZoneApiGatewayOperationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __createZoneApiGatewayOperationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __createZoneApiGatewayOperationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createZoneApiGatewayOperationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.createZoneApiGatewayOperation(createZoneApiGatewayOperationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        aiSecurityForAppsService.createZoneApiGatewayOperation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createApiGatewayOperationItem', () => {
    describe('positive tests', () => {
      function __createApiGatewayOperationItemTest() {
        // Construct the params object for operation createApiGatewayOperationItem
        const method = 'POST';
        const host = 'api.example.com';
        const endpoint = '/v1/messages';
        const createApiGatewayOperationItemParams = {
          method,
          host,
          endpoint,
        };

        const createApiGatewayOperationItemResult = aiSecurityForAppsService.createApiGatewayOperationItem(createApiGatewayOperationItemParams);

        // all methods should return a Promise
        expectToBePromise(createApiGatewayOperationItemResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations/item', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.method).toEqual(method);
        expect(mockRequestOptions.body.host).toEqual(host);
        expect(mockRequestOptions.body.endpoint).toEqual(endpoint);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createApiGatewayOperationItemTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __createApiGatewayOperationItemTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __createApiGatewayOperationItemTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createApiGatewayOperationItemParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.createApiGatewayOperationItem(createApiGatewayOperationItemParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        aiSecurityForAppsService.createApiGatewayOperationItem({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('replaceZoneApiGatewayOperationLabels', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ApiGatewayOperationsLabelsBulkInputSelectorInclude
      const apiGatewayOperationsLabelsBulkInputSelectorIncludeModel = {
        operation_ids: ['f174e90a-fafe-4643-bbbc-4a0ed4fc8415'],
      };

      // ApiGatewayOperationsLabelsBulkInputSelector
      const apiGatewayOperationsLabelsBulkInputSelectorModel = {
        include: apiGatewayOperationsLabelsBulkInputSelectorIncludeModel,
      };

      // ApiGatewayOperationsLabelsBulkInputUser
      const apiGatewayOperationsLabelsBulkInputUserModel = {
        labels: ['testString'],
      };

      // ApiGatewayOperationsLabelsBulkInputManaged
      const apiGatewayOperationsLabelsBulkInputManagedModel = {
        labels: ['testString'],
      };

      function __replaceZoneApiGatewayOperationLabelsTest() {
        // Construct the params object for operation replaceZoneApiGatewayOperationLabels
        const selector = apiGatewayOperationsLabelsBulkInputSelectorModel;
        const user = apiGatewayOperationsLabelsBulkInputUserModel;
        const managed = apiGatewayOperationsLabelsBulkInputManagedModel;
        const replaceZoneApiGatewayOperationLabelsParams = {
          selector,
          user,
          managed,
        };

        const replaceZoneApiGatewayOperationLabelsResult = aiSecurityForAppsService.replaceZoneApiGatewayOperationLabels(replaceZoneApiGatewayOperationLabelsParams);

        // all methods should return a Promise
        expectToBePromise(replaceZoneApiGatewayOperationLabelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations/labels', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.selector).toEqual(selector);
        expect(mockRequestOptions.body.user).toEqual(user);
        expect(mockRequestOptions.body.managed).toEqual(managed);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceZoneApiGatewayOperationLabelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __replaceZoneApiGatewayOperationLabelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __replaceZoneApiGatewayOperationLabelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceZoneApiGatewayOperationLabelsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.replaceZoneApiGatewayOperationLabels(replaceZoneApiGatewayOperationLabelsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        aiSecurityForAppsService.replaceZoneApiGatewayOperationLabels({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('deleteZoneApiGatewayOperationLabels', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ApiGatewayOperationsLabelsBulkDeleteInputSelectorInclude
      const apiGatewayOperationsLabelsBulkDeleteInputSelectorIncludeModel = {
        operation_ids: ['f174e90a-fafe-4643-bbbc-4a0ed4fc8415'],
      };

      // ApiGatewayOperationsLabelsBulkDeleteInputSelector
      const apiGatewayOperationsLabelsBulkDeleteInputSelectorModel = {
        include: apiGatewayOperationsLabelsBulkDeleteInputSelectorIncludeModel,
      };

      // ApiGatewayOperationsLabelsBulkDeleteInputUser
      const apiGatewayOperationsLabelsBulkDeleteInputUserModel = {
        labels: ['testString'],
      };

      // ApiGatewayOperationsLabelsBulkDeleteInputManaged
      const apiGatewayOperationsLabelsBulkDeleteInputManagedModel = {
        labels: ['testString'],
      };

      function __deleteZoneApiGatewayOperationLabelsTest() {
        // Construct the params object for operation deleteZoneApiGatewayOperationLabels
        const selector = apiGatewayOperationsLabelsBulkDeleteInputSelectorModel;
        const user = apiGatewayOperationsLabelsBulkDeleteInputUserModel;
        const managed = apiGatewayOperationsLabelsBulkDeleteInputManagedModel;
        const deleteZoneApiGatewayOperationLabelsParams = {
          selector,
          user,
          managed,
        };

        const deleteZoneApiGatewayOperationLabelsResult = aiSecurityForAppsService.deleteZoneApiGatewayOperationLabels(deleteZoneApiGatewayOperationLabelsParams);

        // all methods should return a Promise
        expectToBePromise(deleteZoneApiGatewayOperationLabelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations/labels', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.selector).toEqual(selector);
        expect(mockRequestOptions.body.user).toEqual(user);
        expect(mockRequestOptions.body.managed).toEqual(managed);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteZoneApiGatewayOperationLabelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __deleteZoneApiGatewayOperationLabelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __deleteZoneApiGatewayOperationLabelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const selector = apiGatewayOperationsLabelsBulkDeleteInputSelectorModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteZoneApiGatewayOperationLabelsParams = {
          selector,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.deleteZoneApiGatewayOperationLabels(deleteZoneApiGatewayOperationLabelsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await aiSecurityForAppsService.deleteZoneApiGatewayOperationLabels({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await aiSecurityForAppsService.deleteZoneApiGatewayOperationLabels();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateApiGatewayOperationLabels', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ApiGatewayOperationsLabelsBulkInputSelectorInclude
      const apiGatewayOperationsLabelsBulkInputSelectorIncludeModel = {
        operation_ids: ['f174e90a-fafe-4643-bbbc-4a0ed4fc8415'],
      };

      // ApiGatewayOperationsLabelsBulkInputSelector
      const apiGatewayOperationsLabelsBulkInputSelectorModel = {
        include: apiGatewayOperationsLabelsBulkInputSelectorIncludeModel,
      };

      // ApiGatewayOperationsLabelsBulkInputUser
      const apiGatewayOperationsLabelsBulkInputUserModel = {
        labels: ['testString'],
      };

      // ApiGatewayOperationsLabelsBulkInputManaged
      const apiGatewayOperationsLabelsBulkInputManagedModel = {
        labels: ['testString'],
      };

      function __updateApiGatewayOperationLabelsTest() {
        // Construct the params object for operation updateApiGatewayOperationLabels
        const selector = apiGatewayOperationsLabelsBulkInputSelectorModel;
        const user = apiGatewayOperationsLabelsBulkInputUserModel;
        const managed = apiGatewayOperationsLabelsBulkInputManagedModel;
        const updateApiGatewayOperationLabelsParams = {
          selector,
          user,
          managed,
        };

        const updateApiGatewayOperationLabelsResult = aiSecurityForAppsService.updateApiGatewayOperationLabels(updateApiGatewayOperationLabelsParams);

        // all methods should return a Promise
        expectToBePromise(updateApiGatewayOperationLabelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations/labels', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.selector).toEqual(selector);
        expect(mockRequestOptions.body.user).toEqual(user);
        expect(mockRequestOptions.body.managed).toEqual(managed);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateApiGatewayOperationLabelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __updateApiGatewayOperationLabelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __updateApiGatewayOperationLabelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateApiGatewayOperationLabelsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.updateApiGatewayOperationLabels(updateApiGatewayOperationLabelsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        aiSecurityForAppsService.updateApiGatewayOperationLabels({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createApiGatewayOperationLabels', () => {
    describe('positive tests', () => {
      function __createApiGatewayOperationLabelsTest() {
        // Construct the params object for operation createApiGatewayOperationLabels
        const operationId = 'testString';
        const user = [];
        const managed = ['cf-llm'];
        const createApiGatewayOperationLabelsParams = {
          operationId,
          user,
          managed,
        };

        const createApiGatewayOperationLabelsResult = aiSecurityForAppsService.createApiGatewayOperationLabels(createApiGatewayOperationLabelsParams);

        // all methods should return a Promise
        expectToBePromise(createApiGatewayOperationLabelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations/{operation_id}/labels', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.user).toEqual(user);
        expect(mockRequestOptions.body.managed).toEqual(managed);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.operation_id).toEqual(operationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createApiGatewayOperationLabelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __createApiGatewayOperationLabelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __createApiGatewayOperationLabelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const operationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createApiGatewayOperationLabelsParams = {
          operationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.createApiGatewayOperationLabels(createApiGatewayOperationLabelsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await aiSecurityForAppsService.createApiGatewayOperationLabels({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await aiSecurityForAppsService.createApiGatewayOperationLabels();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('setZoneApiGatewayOperationLabels', () => {
    describe('positive tests', () => {
      function __setZoneApiGatewayOperationLabelsTest() {
        // Construct the params object for operation setZoneApiGatewayOperationLabels
        const operationId = 'testString';
        const user = [];
        const managed = ['cf-llm'];
        const setZoneApiGatewayOperationLabelsParams = {
          operationId,
          user,
          managed,
        };

        const setZoneApiGatewayOperationLabelsResult = aiSecurityForAppsService.setZoneApiGatewayOperationLabels(setZoneApiGatewayOperationLabelsParams);

        // all methods should return a Promise
        expectToBePromise(setZoneApiGatewayOperationLabelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations/{operation_id}/labels', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.user).toEqual(user);
        expect(mockRequestOptions.body.managed).toEqual(managed);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.operation_id).toEqual(operationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __setZoneApiGatewayOperationLabelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __setZoneApiGatewayOperationLabelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __setZoneApiGatewayOperationLabelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const operationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const setZoneApiGatewayOperationLabelsParams = {
          operationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.setZoneApiGatewayOperationLabels(setZoneApiGatewayOperationLabelsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await aiSecurityForAppsService.setZoneApiGatewayOperationLabels({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await aiSecurityForAppsService.setZoneApiGatewayOperationLabels();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('unsetZoneApiGatewayOperationLabels', () => {
    describe('positive tests', () => {
      function __unsetZoneApiGatewayOperationLabelsTest() {
        // Construct the params object for operation unsetZoneApiGatewayOperationLabels
        const operationId = 'testString';
        const user = ['testString'];
        const managed = ['testString'];
        const unsetZoneApiGatewayOperationLabelsParams = {
          operationId,
          user,
          managed,
        };

        const unsetZoneApiGatewayOperationLabelsResult = aiSecurityForAppsService.unsetZoneApiGatewayOperationLabels(unsetZoneApiGatewayOperationLabelsParams);

        // all methods should return a Promise
        expectToBePromise(unsetZoneApiGatewayOperationLabelsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations/{operation_id}/labels', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.user).toEqual(user);
        expect(mockRequestOptions.body.managed).toEqual(managed);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.operation_id).toEqual(operationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __unsetZoneApiGatewayOperationLabelsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __unsetZoneApiGatewayOperationLabelsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __unsetZoneApiGatewayOperationLabelsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const operationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const unsetZoneApiGatewayOperationLabelsParams = {
          operationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.unsetZoneApiGatewayOperationLabels(unsetZoneApiGatewayOperationLabelsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await aiSecurityForAppsService.unsetZoneApiGatewayOperationLabels({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await aiSecurityForAppsService.unsetZoneApiGatewayOperationLabels();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getZoneApiGatewayOperation', () => {
    describe('positive tests', () => {
      function __getZoneApiGatewayOperationTest() {
        // Construct the params object for operation getZoneApiGatewayOperation
        const operationId = 'testString';
        const getZoneApiGatewayOperationParams = {
          operationId,
        };

        const getZoneApiGatewayOperationResult = aiSecurityForAppsService.getZoneApiGatewayOperation(getZoneApiGatewayOperationParams);

        // all methods should return a Promise
        expectToBePromise(getZoneApiGatewayOperationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations/{operation_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.operation_id).toEqual(operationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getZoneApiGatewayOperationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __getZoneApiGatewayOperationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __getZoneApiGatewayOperationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const operationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getZoneApiGatewayOperationParams = {
          operationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.getZoneApiGatewayOperation(getZoneApiGatewayOperationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await aiSecurityForAppsService.getZoneApiGatewayOperation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await aiSecurityForAppsService.getZoneApiGatewayOperation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteZoneApiGatewayOperation', () => {
    describe('positive tests', () => {
      function __deleteZoneApiGatewayOperationTest() {
        // Construct the params object for operation deleteZoneApiGatewayOperation
        const operationId = 'testString';
        const deleteZoneApiGatewayOperationParams = {
          operationId,
        };

        const deleteZoneApiGatewayOperationResult = aiSecurityForAppsService.deleteZoneApiGatewayOperation(deleteZoneApiGatewayOperationParams);

        // all methods should return a Promise
        expectToBePromise(deleteZoneApiGatewayOperationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations/{operation_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.operation_id).toEqual(operationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteZoneApiGatewayOperationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __deleteZoneApiGatewayOperationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __deleteZoneApiGatewayOperationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const operationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteZoneApiGatewayOperationParams = {
          operationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.deleteZoneApiGatewayOperation(deleteZoneApiGatewayOperationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await aiSecurityForAppsService.deleteZoneApiGatewayOperation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await aiSecurityForAppsService.deleteZoneApiGatewayOperation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getApiGatewaySchemas', () => {
    describe('positive tests', () => {
      function __getApiGatewaySchemasTest() {
        // Construct the params object for operation getApiGatewaySchemas
        const getApiGatewaySchemasParams = {};

        const getApiGatewaySchemasResult = aiSecurityForAppsService.getApiGatewaySchemas(getApiGatewaySchemasParams);

        // all methods should return a Promise
        expectToBePromise(getApiGatewaySchemasResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/api_gateway/schemas', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(aiSecurityForAppsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(aiSecurityForAppsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getApiGatewaySchemasTest();

        // enable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.enableRetries();
        __getApiGatewaySchemasTest();

        // disable retries and test again
        createRequestMock.mockClear();
        aiSecurityForAppsService.disableRetries();
        __getApiGatewaySchemasTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getApiGatewaySchemasParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        aiSecurityForAppsService.getApiGatewaySchemas(getApiGatewaySchemasParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        aiSecurityForAppsService.getApiGatewaySchemas({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
