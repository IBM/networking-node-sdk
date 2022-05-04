/**
 * (C) Copyright IBM Corp. 2022.
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
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const TransitGatewayApisV1 = require('../../dist/transit-gateway-apis/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const transitGatewayApisServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://transit.cloud.ibm.com/v1',
  version: 'testString',
};

const transitGatewayApisService = new TransitGatewayApisV1(transitGatewayApisServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(transitGatewayApisService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

// used for the service construction tests
let requiredGlobals;
beforeEach(() => {
  // these are changed when passed into the factory/constructor, so re-init
  requiredGlobals = {
    version: 'testString',
  };
});

describe('TransitGatewayApisV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = TransitGatewayApisV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(TransitGatewayApisV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(TransitGatewayApisV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(TransitGatewayApisV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = TransitGatewayApisV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(TransitGatewayApisV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new TransitGatewayApisV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new TransitGatewayApisV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(TransitGatewayApisV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new TransitGatewayApisV1(transitGatewayApisServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(transitGatewayApisServiceOptions.version);
      });
    });
  });
  describe('listConnections', () => {
    describe('positive tests', () => {
      function __listConnectionsTest() {
        // Construct the params object for operation listConnections
        const limit = 1;
        const start = 'testString';
        const networkId = 'testString';
        const listConnectionsParams = {
          limit: limit,
          start: start,
          networkId: networkId,
        };

        const listConnectionsResult = transitGatewayApisService.listConnections(
          listConnectionsParams
        );

        // all methods should return a Promise
        expectToBePromise(listConnectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/connections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.network_id).toEqual(networkId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listConnectionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __listConnectionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __listConnectionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listConnectionsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.listConnections(listConnectionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        transitGatewayApisService.listConnections({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('listTransitGatewayConnectionPrefixFilters', () => {
    describe('positive tests', () => {
      function __listTransitGatewayConnectionPrefixFiltersTest() {
        // Construct the params object for operation listTransitGatewayConnectionPrefixFilters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const listTransitGatewayConnectionPrefixFiltersParams = {
          transitGatewayId: transitGatewayId,
          id: id,
        };

        const listTransitGatewayConnectionPrefixFiltersResult = transitGatewayApisService.listTransitGatewayConnectionPrefixFilters(
          listTransitGatewayConnectionPrefixFiltersParams
        );

        // all methods should return a Promise
        expectToBePromise(listTransitGatewayConnectionPrefixFiltersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/connections/{id}/prefix_filters',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTransitGatewayConnectionPrefixFiltersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __listTransitGatewayConnectionPrefixFiltersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __listTransitGatewayConnectionPrefixFiltersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTransitGatewayConnectionPrefixFiltersParams = {
          transitGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.listTransitGatewayConnectionPrefixFilters(
          listTransitGatewayConnectionPrefixFiltersParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.listTransitGatewayConnectionPrefixFilters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.listTransitGatewayConnectionPrefixFilters();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createTransitGatewayConnectionPrefixFilter', () => {
    describe('positive tests', () => {
      function __createTransitGatewayConnectionPrefixFilterTest() {
        // Construct the params object for operation createTransitGatewayConnectionPrefixFilter
        const transitGatewayId = 'testString';
        const id = 'testString';
        const action = 'permit';
        const prefix = '192.168.100.0/24';
        const before = '1a15dcab-7e40-45e1-b7c5-bc690eaa9782';
        const ge = 0;
        const le = 32;
        const createTransitGatewayConnectionPrefixFilterParams = {
          transitGatewayId: transitGatewayId,
          id: id,
          action: action,
          prefix: prefix,
          before: before,
          ge: ge,
          le: le,
        };

        const createTransitGatewayConnectionPrefixFilterResult = transitGatewayApisService.createTransitGatewayConnectionPrefixFilter(
          createTransitGatewayConnectionPrefixFilterParams
        );

        // all methods should return a Promise
        expectToBePromise(createTransitGatewayConnectionPrefixFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/connections/{id}/prefix_filters',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.prefix).toEqual(prefix);
        expect(mockRequestOptions.body.before).toEqual(before);
        expect(mockRequestOptions.body.ge).toEqual(ge);
        expect(mockRequestOptions.body.le).toEqual(le);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTransitGatewayConnectionPrefixFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __createTransitGatewayConnectionPrefixFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __createTransitGatewayConnectionPrefixFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const action = 'permit';
        const prefix = '192.168.100.0/24';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTransitGatewayConnectionPrefixFilterParams = {
          transitGatewayId,
          id,
          action,
          prefix,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.createTransitGatewayConnectionPrefixFilter(
          createTransitGatewayConnectionPrefixFilterParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.createTransitGatewayConnectionPrefixFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.createTransitGatewayConnectionPrefixFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteTransitGatewayConnectionPrefixFilter', () => {
    describe('positive tests', () => {
      function __deleteTransitGatewayConnectionPrefixFilterTest() {
        // Construct the params object for operation deleteTransitGatewayConnectionPrefixFilter
        const transitGatewayId = 'testString';
        const id = 'testString';
        const filterId = 'testString';
        const deleteTransitGatewayConnectionPrefixFilterParams = {
          transitGatewayId: transitGatewayId,
          id: id,
          filterId: filterId,
        };

        const deleteTransitGatewayConnectionPrefixFilterResult = transitGatewayApisService.deleteTransitGatewayConnectionPrefixFilter(
          deleteTransitGatewayConnectionPrefixFilterParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteTransitGatewayConnectionPrefixFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/connections/{id}/prefix_filters/{filter_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.filter_id).toEqual(filterId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTransitGatewayConnectionPrefixFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __deleteTransitGatewayConnectionPrefixFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __deleteTransitGatewayConnectionPrefixFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const filterId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTransitGatewayConnectionPrefixFilterParams = {
          transitGatewayId,
          id,
          filterId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.deleteTransitGatewayConnectionPrefixFilter(
          deleteTransitGatewayConnectionPrefixFilterParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.deleteTransitGatewayConnectionPrefixFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.deleteTransitGatewayConnectionPrefixFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getTransitGatewayConnectionPrefixFilter', () => {
    describe('positive tests', () => {
      function __getTransitGatewayConnectionPrefixFilterTest() {
        // Construct the params object for operation getTransitGatewayConnectionPrefixFilter
        const transitGatewayId = 'testString';
        const id = 'testString';
        const filterId = 'testString';
        const getTransitGatewayConnectionPrefixFilterParams = {
          transitGatewayId: transitGatewayId,
          id: id,
          filterId: filterId,
        };

        const getTransitGatewayConnectionPrefixFilterResult = transitGatewayApisService.getTransitGatewayConnectionPrefixFilter(
          getTransitGatewayConnectionPrefixFilterParams
        );

        // all methods should return a Promise
        expectToBePromise(getTransitGatewayConnectionPrefixFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/connections/{id}/prefix_filters/{filter_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.filter_id).toEqual(filterId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTransitGatewayConnectionPrefixFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __getTransitGatewayConnectionPrefixFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __getTransitGatewayConnectionPrefixFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const filterId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTransitGatewayConnectionPrefixFilterParams = {
          transitGatewayId,
          id,
          filterId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.getTransitGatewayConnectionPrefixFilter(
          getTransitGatewayConnectionPrefixFilterParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.getTransitGatewayConnectionPrefixFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.getTransitGatewayConnectionPrefixFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateTransitGatewayConnectionPrefixFilter', () => {
    describe('positive tests', () => {
      function __updateTransitGatewayConnectionPrefixFilterTest() {
        // Construct the params object for operation updateTransitGatewayConnectionPrefixFilter
        const transitGatewayId = 'testString';
        const id = 'testString';
        const filterId = 'testString';
        const action = 'permit';
        const before = '1a15dcab-7e40-45e1-b7c5-bc690eaa9782';
        const ge = 0;
        const le = 32;
        const prefix = '192.168.100.0/24';
        const updateTransitGatewayConnectionPrefixFilterParams = {
          transitGatewayId: transitGatewayId,
          id: id,
          filterId: filterId,
          action: action,
          before: before,
          ge: ge,
          le: le,
          prefix: prefix,
        };

        const updateTransitGatewayConnectionPrefixFilterResult = transitGatewayApisService.updateTransitGatewayConnectionPrefixFilter(
          updateTransitGatewayConnectionPrefixFilterParams
        );

        // all methods should return a Promise
        expectToBePromise(updateTransitGatewayConnectionPrefixFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/connections/{id}/prefix_filters/{filter_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.before).toEqual(before);
        expect(mockRequestOptions.body.ge).toEqual(ge);
        expect(mockRequestOptions.body.le).toEqual(le);
        expect(mockRequestOptions.body.prefix).toEqual(prefix);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.filter_id).toEqual(filterId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateTransitGatewayConnectionPrefixFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __updateTransitGatewayConnectionPrefixFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __updateTransitGatewayConnectionPrefixFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const filterId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateTransitGatewayConnectionPrefixFilterParams = {
          transitGatewayId,
          id,
          filterId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.updateTransitGatewayConnectionPrefixFilter(
          updateTransitGatewayConnectionPrefixFilterParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.updateTransitGatewayConnectionPrefixFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.updateTransitGatewayConnectionPrefixFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listTransitGatewayRouteReports', () => {
    describe('positive tests', () => {
      function __listTransitGatewayRouteReportsTest() {
        // Construct the params object for operation listTransitGatewayRouteReports
        const transitGatewayId = 'testString';
        const listTransitGatewayRouteReportsParams = {
          transitGatewayId: transitGatewayId,
        };

        const listTransitGatewayRouteReportsResult = transitGatewayApisService.listTransitGatewayRouteReports(
          listTransitGatewayRouteReportsParams
        );

        // all methods should return a Promise
        expectToBePromise(listTransitGatewayRouteReportsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/route_reports',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTransitGatewayRouteReportsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __listTransitGatewayRouteReportsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __listTransitGatewayRouteReportsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTransitGatewayRouteReportsParams = {
          transitGatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.listTransitGatewayRouteReports(
          listTransitGatewayRouteReportsParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.listTransitGatewayRouteReports({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.listTransitGatewayRouteReports();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createTransitGatewayRouteReport', () => {
    describe('positive tests', () => {
      function __createTransitGatewayRouteReportTest() {
        // Construct the params object for operation createTransitGatewayRouteReport
        const transitGatewayId = 'testString';
        const createTransitGatewayRouteReportParams = {
          transitGatewayId: transitGatewayId,
        };

        const createTransitGatewayRouteReportResult = transitGatewayApisService.createTransitGatewayRouteReport(
          createTransitGatewayRouteReportParams
        );

        // all methods should return a Promise
        expectToBePromise(createTransitGatewayRouteReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/route_reports',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTransitGatewayRouteReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __createTransitGatewayRouteReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __createTransitGatewayRouteReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTransitGatewayRouteReportParams = {
          transitGatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.createTransitGatewayRouteReport(
          createTransitGatewayRouteReportParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.createTransitGatewayRouteReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.createTransitGatewayRouteReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteTransitGatewayRouteReport', () => {
    describe('positive tests', () => {
      function __deleteTransitGatewayRouteReportTest() {
        // Construct the params object for operation deleteTransitGatewayRouteReport
        const transitGatewayId = 'testString';
        const id = 'testString';
        const deleteTransitGatewayRouteReportParams = {
          transitGatewayId: transitGatewayId,
          id: id,
        };

        const deleteTransitGatewayRouteReportResult = transitGatewayApisService.deleteTransitGatewayRouteReport(
          deleteTransitGatewayRouteReportParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteTransitGatewayRouteReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/route_reports/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTransitGatewayRouteReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __deleteTransitGatewayRouteReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __deleteTransitGatewayRouteReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTransitGatewayRouteReportParams = {
          transitGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.deleteTransitGatewayRouteReport(
          deleteTransitGatewayRouteReportParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.deleteTransitGatewayRouteReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.deleteTransitGatewayRouteReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getTransitGatewayRouteReport', () => {
    describe('positive tests', () => {
      function __getTransitGatewayRouteReportTest() {
        // Construct the params object for operation getTransitGatewayRouteReport
        const transitGatewayId = 'testString';
        const id = 'testString';
        const getTransitGatewayRouteReportParams = {
          transitGatewayId: transitGatewayId,
          id: id,
        };

        const getTransitGatewayRouteReportResult = transitGatewayApisService.getTransitGatewayRouteReport(
          getTransitGatewayRouteReportParams
        );

        // all methods should return a Promise
        expectToBePromise(getTransitGatewayRouteReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/route_reports/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTransitGatewayRouteReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __getTransitGatewayRouteReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __getTransitGatewayRouteReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTransitGatewayRouteReportParams = {
          transitGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.getTransitGatewayRouteReport(getTransitGatewayRouteReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.getTransitGatewayRouteReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.getTransitGatewayRouteReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listTransitGateways', () => {
    describe('positive tests', () => {
      function __listTransitGatewaysTest() {
        // Construct the params object for operation listTransitGateways
        const limit = 1;
        const start = 'testString';
        const listTransitGatewaysParams = {
          limit: limit,
          start: start,
        };

        const listTransitGatewaysResult = transitGatewayApisService.listTransitGateways(
          listTransitGatewaysParams
        );

        // all methods should return a Promise
        expectToBePromise(listTransitGatewaysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/transit_gateways', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTransitGatewaysTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __listTransitGatewaysTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __listTransitGatewaysTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTransitGatewaysParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.listTransitGateways(listTransitGatewaysParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        transitGatewayApisService.listTransitGateways({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createTransitGateway', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceGroupIdentity
      const resourceGroupIdentityModel = {
        id: '56969d6043e9465c883cb9f7363e78e8',
      };

      function __createTransitGatewayTest() {
        // Construct the params object for operation createTransitGateway
        const location = 'us-south';
        const name = 'Transit_Service_BWTN_SJ_DL';
        const global = true;
        const resourceGroup = resourceGroupIdentityModel;
        const createTransitGatewayParams = {
          location: location,
          name: name,
          global: global,
          resourceGroup: resourceGroup,
        };

        const createTransitGatewayResult = transitGatewayApisService.createTransitGateway(
          createTransitGatewayParams
        );

        // all methods should return a Promise
        expectToBePromise(createTransitGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/transit_gateways', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.location).toEqual(location);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.global).toEqual(global);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTransitGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __createTransitGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __createTransitGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const location = 'us-south';
        const name = 'Transit_Service_BWTN_SJ_DL';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTransitGatewayParams = {
          location,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.createTransitGateway(createTransitGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.createTransitGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.createTransitGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteTransitGateway', () => {
    describe('positive tests', () => {
      function __deleteTransitGatewayTest() {
        // Construct the params object for operation deleteTransitGateway
        const id = 'testString';
        const deleteTransitGatewayParams = {
          id: id,
        };

        const deleteTransitGatewayResult = transitGatewayApisService.deleteTransitGateway(
          deleteTransitGatewayParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteTransitGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/transit_gateways/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTransitGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __deleteTransitGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __deleteTransitGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTransitGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.deleteTransitGateway(deleteTransitGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.deleteTransitGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.deleteTransitGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getTransitGateway', () => {
    describe('positive tests', () => {
      function __getTransitGatewayTest() {
        // Construct the params object for operation getTransitGateway
        const id = 'testString';
        const getTransitGatewayParams = {
          id: id,
        };

        const getTransitGatewayResult = transitGatewayApisService.getTransitGateway(
          getTransitGatewayParams
        );

        // all methods should return a Promise
        expectToBePromise(getTransitGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/transit_gateways/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTransitGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __getTransitGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __getTransitGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTransitGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.getTransitGateway(getTransitGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.getTransitGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.getTransitGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateTransitGateway', () => {
    describe('positive tests', () => {
      function __updateTransitGatewayTest() {
        // Construct the params object for operation updateTransitGateway
        const id = 'testString';
        const global = true;
        const name = 'my-transit-gateway';
        const updateTransitGatewayParams = {
          id: id,
          global: global,
          name: name,
        };

        const updateTransitGatewayResult = transitGatewayApisService.updateTransitGateway(
          updateTransitGatewayParams
        );

        // all methods should return a Promise
        expectToBePromise(updateTransitGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/transit_gateways/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.global).toEqual(global);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateTransitGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __updateTransitGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __updateTransitGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateTransitGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.updateTransitGateway(updateTransitGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.updateTransitGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.updateTransitGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listTransitGatewayConnections', () => {
    describe('positive tests', () => {
      function __listTransitGatewayConnectionsTest() {
        // Construct the params object for operation listTransitGatewayConnections
        const transitGatewayId = 'testString';
        const listTransitGatewayConnectionsParams = {
          transitGatewayId: transitGatewayId,
        };

        const listTransitGatewayConnectionsResult = transitGatewayApisService.listTransitGatewayConnections(
          listTransitGatewayConnectionsParams
        );

        // all methods should return a Promise
        expectToBePromise(listTransitGatewayConnectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/connections',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTransitGatewayConnectionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __listTransitGatewayConnectionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __listTransitGatewayConnectionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTransitGatewayConnectionsParams = {
          transitGatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.listTransitGatewayConnections(
          listTransitGatewayConnectionsParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.listTransitGatewayConnections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.listTransitGatewayConnections();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createTransitGatewayConnection', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TransitGatewayConnectionPrefixFilter
      const transitGatewayConnectionPrefixFilterModel = {
        action: 'permit',
        ge: 0,
        le: 32,
        prefix: '192.168.100.0/24',
      };

      // ZoneIdentityByName
      const zoneIdentityModel = {
        name: 'us-south-1',
      };

      function __createTransitGatewayConnectionTest() {
        // Construct the params object for operation createTransitGatewayConnection
        const transitGatewayId = 'testString';
        const networkType = 'vpc';
        const baseConnectionId = '975f58c1-afe7-469a-9727-7f3d720f2d32';
        const localGatewayIp = '192.168.100.1';
        const localTunnelIp = '192.168.129.2';
        const name = 'Transit_Service_BWTN_SJ_DL';
        const networkAccountId = '28e4d90ac7504be694471ee66e70d0d5';
        const networkId =
          'crn:v1:bluemix:public:is:us-south:a/123456::vpc:4727d842-f94f-4a2d-824a-9bc9b02c523b';
        const prefixFilters = [transitGatewayConnectionPrefixFilterModel];
        const prefixFiltersDefault = 'permit';
        const remoteBgpAsn = '65010';
        const remoteGatewayIp = '10.242.63.12';
        const remoteTunnelIp = '192.168.129.1';
        const zone = zoneIdentityModel;
        const createTransitGatewayConnectionParams = {
          transitGatewayId: transitGatewayId,
          networkType: networkType,
          baseConnectionId: baseConnectionId,
          localGatewayIp: localGatewayIp,
          localTunnelIp: localTunnelIp,
          name: name,
          networkAccountId: networkAccountId,
          networkId: networkId,
          prefixFilters: prefixFilters,
          prefixFiltersDefault: prefixFiltersDefault,
          remoteBgpAsn: remoteBgpAsn,
          remoteGatewayIp: remoteGatewayIp,
          remoteTunnelIp: remoteTunnelIp,
          zone: zone,
        };

        const createTransitGatewayConnectionResult = transitGatewayApisService.createTransitGatewayConnection(
          createTransitGatewayConnectionParams
        );

        // all methods should return a Promise
        expectToBePromise(createTransitGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/connections',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.network_type).toEqual(networkType);
        expect(mockRequestOptions.body.base_connection_id).toEqual(baseConnectionId);
        expect(mockRequestOptions.body.local_gateway_ip).toEqual(localGatewayIp);
        expect(mockRequestOptions.body.local_tunnel_ip).toEqual(localTunnelIp);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.network_account_id).toEqual(networkAccountId);
        expect(mockRequestOptions.body.network_id).toEqual(networkId);
        expect(mockRequestOptions.body.prefix_filters).toEqual(prefixFilters);
        expect(mockRequestOptions.body.prefix_filters_default).toEqual(prefixFiltersDefault);
        expect(mockRequestOptions.body.remote_bgp_asn).toEqual(remoteBgpAsn);
        expect(mockRequestOptions.body.remote_gateway_ip).toEqual(remoteGatewayIp);
        expect(mockRequestOptions.body.remote_tunnel_ip).toEqual(remoteTunnelIp);
        expect(mockRequestOptions.body.zone).toEqual(zone);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTransitGatewayConnectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __createTransitGatewayConnectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __createTransitGatewayConnectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const networkType = 'vpc';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTransitGatewayConnectionParams = {
          transitGatewayId,
          networkType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.createTransitGatewayConnection(
          createTransitGatewayConnectionParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.createTransitGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.createTransitGatewayConnection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteTransitGatewayConnection', () => {
    describe('positive tests', () => {
      function __deleteTransitGatewayConnectionTest() {
        // Construct the params object for operation deleteTransitGatewayConnection
        const transitGatewayId = 'testString';
        const id = 'testString';
        const deleteTransitGatewayConnectionParams = {
          transitGatewayId: transitGatewayId,
          id: id,
        };

        const deleteTransitGatewayConnectionResult = transitGatewayApisService.deleteTransitGatewayConnection(
          deleteTransitGatewayConnectionParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteTransitGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/connections/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTransitGatewayConnectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __deleteTransitGatewayConnectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __deleteTransitGatewayConnectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTransitGatewayConnectionParams = {
          transitGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.deleteTransitGatewayConnection(
          deleteTransitGatewayConnectionParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.deleteTransitGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.deleteTransitGatewayConnection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getTransitGatewayConnection', () => {
    describe('positive tests', () => {
      function __getTransitGatewayConnectionTest() {
        // Construct the params object for operation getTransitGatewayConnection
        const transitGatewayId = 'testString';
        const id = 'testString';
        const getTransitGatewayConnectionParams = {
          transitGatewayId: transitGatewayId,
          id: id,
        };

        const getTransitGatewayConnectionResult = transitGatewayApisService.getTransitGatewayConnection(
          getTransitGatewayConnectionParams
        );

        // all methods should return a Promise
        expectToBePromise(getTransitGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/connections/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTransitGatewayConnectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __getTransitGatewayConnectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __getTransitGatewayConnectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTransitGatewayConnectionParams = {
          transitGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.getTransitGatewayConnection(getTransitGatewayConnectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.getTransitGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.getTransitGatewayConnection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateTransitGatewayConnection', () => {
    describe('positive tests', () => {
      function __updateTransitGatewayConnectionTest() {
        // Construct the params object for operation updateTransitGatewayConnection
        const transitGatewayId = 'testString';
        const id = 'testString';
        const name = 'Transit_Service_BWTN_SJ_DL';
        const prefixFiltersDefault = 'permit';
        const updateTransitGatewayConnectionParams = {
          transitGatewayId: transitGatewayId,
          id: id,
          name: name,
          prefixFiltersDefault: prefixFiltersDefault,
        };

        const updateTransitGatewayConnectionResult = transitGatewayApisService.updateTransitGatewayConnection(
          updateTransitGatewayConnectionParams
        );

        // all methods should return a Promise
        expectToBePromise(updateTransitGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/connections/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.prefix_filters_default).toEqual(prefixFiltersDefault);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateTransitGatewayConnectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __updateTransitGatewayConnectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __updateTransitGatewayConnectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateTransitGatewayConnectionParams = {
          transitGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.updateTransitGatewayConnection(
          updateTransitGatewayConnectionParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.updateTransitGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.updateTransitGatewayConnection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createTransitGatewayConnectionActions', () => {
    describe('positive tests', () => {
      function __createTransitGatewayConnectionActionsTest() {
        // Construct the params object for operation createTransitGatewayConnectionActions
        const transitGatewayId = 'testString';
        const id = 'testString';
        const action = 'approve';
        const createTransitGatewayConnectionActionsParams = {
          transitGatewayId: transitGatewayId,
          id: id,
          action: action,
        };

        const createTransitGatewayConnectionActionsResult = transitGatewayApisService.createTransitGatewayConnectionActions(
          createTransitGatewayConnectionActionsParams
        );

        // all methods should return a Promise
        expectToBePromise(createTransitGatewayConnectionActionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/transit_gateways/{transit_gateway_id}/connections/{id}/actions',
          'POST'
        );
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.transit_gateway_id).toEqual(transitGatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTransitGatewayConnectionActionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __createTransitGatewayConnectionActionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __createTransitGatewayConnectionActionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const action = 'approve';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTransitGatewayConnectionActionsParams = {
          transitGatewayId,
          id,
          action,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.createTransitGatewayConnectionActions(
          createTransitGatewayConnectionActionsParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.createTransitGatewayConnectionActions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.createTransitGatewayConnectionActions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listGatewayLocations', () => {
    describe('positive tests', () => {
      function __listGatewayLocationsTest() {
        // Construct the params object for operation listGatewayLocations
        const listGatewayLocationsParams = {};

        const listGatewayLocationsResult = transitGatewayApisService.listGatewayLocations(
          listGatewayLocationsParams
        );

        // all methods should return a Promise
        expectToBePromise(listGatewayLocationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/locations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listGatewayLocationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __listGatewayLocationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __listGatewayLocationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listGatewayLocationsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.listGatewayLocations(listGatewayLocationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        transitGatewayApisService.listGatewayLocations({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getGatewayLocation', () => {
    describe('positive tests', () => {
      function __getGatewayLocationTest() {
        // Construct the params object for operation getGatewayLocation
        const name = 'testString';
        const getGatewayLocationParams = {
          name: name,
        };

        const getGatewayLocationResult = transitGatewayApisService.getGatewayLocation(
          getGatewayLocationParams
        );

        // all methods should return a Promise
        expectToBePromise(getGatewayLocationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/locations/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(transitGatewayApisServiceOptions.version);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getGatewayLocationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.enableRetries();
        __getGatewayLocationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        transitGatewayApisService.disableRetries();
        __getGatewayLocationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getGatewayLocationParams = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApisService.getGatewayLocation(getGatewayLocationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await transitGatewayApisService.getGatewayLocation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await transitGatewayApisService.getGatewayLocation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
