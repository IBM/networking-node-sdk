/**
 * (C) Copyright IBM Corp. 2021.
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

const FiltersV1 = require('../../../dist/cis/filtersv1/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
} = unitTestUtils;

const filtersServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
};

const filtersService = new FiltersV1(filtersServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(filtersService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('FiltersV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = FiltersV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(FiltersV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(FiltersV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(FiltersV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = FiltersV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(FiltersV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new FiltersV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new FiltersV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(FiltersV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('listAllFilters', () => {
    describe('positive tests', () => {
      function __listAllFiltersTest() {
        // Construct the params object for operation listAllFilters
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const params = {
          xAuthUserToken: xAuthUserToken,
          crn: crn,
          zoneIdentifier: zoneIdentifier,
        };

        const listAllFiltersResult = filtersService.listAllFilters(params);

        // all methods should return a Promise
        expectToBePromise(listAllFiltersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/filters', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-User-Token', xAuthUserToken);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAllFiltersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        filtersService.enableRetries();
        __listAllFiltersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        filtersService.disableRetries();
        __listAllFiltersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthUserToken,
          crn,
          zoneIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        filtersService.listAllFilters(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await filtersService.listAllFilters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await filtersService.listAllFilters();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createFilter', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // FilterInput
      const filterInputModel = {
        expression: 'not http.request.uri.path matches "^/api/.*$"',
        paused: false,
        description: 'not /api',
      };

      function __createFilterTest() {
        // Construct the params object for operation createFilter
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const filterInput = [filterInputModel];
        const params = {
          xAuthUserToken: xAuthUserToken,
          crn: crn,
          zoneIdentifier: zoneIdentifier,
          filterInput: filterInput,
        };

        const createFilterResult = filtersService.createFilter(params);

        // all methods should return a Promise
        expectToBePromise(createFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/filters', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-User-Token', xAuthUserToken);
        expect(mockRequestOptions.body).toEqual(filterInput);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        filtersService.enableRetries();
        __createFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        filtersService.disableRetries();
        __createFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthUserToken,
          crn,
          zoneIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        filtersService.createFilter(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await filtersService.createFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await filtersService.createFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateFilters', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // FilterUpdateInput
      const filterUpdateInputModel = {
        id: 'f2a64520581a4209aab12187a0081364',
        expression: 'not http.request.uri.path matches "^/api/.*$"',
        description: 'not /api',
        paused: false,
      };

      function __updateFiltersTest() {
        // Construct the params object for operation updateFilters
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const filterUpdateInput = [filterUpdateInputModel];
        const params = {
          xAuthUserToken: xAuthUserToken,
          crn: crn,
          zoneIdentifier: zoneIdentifier,
          filterUpdateInput: filterUpdateInput,
        };

        const updateFiltersResult = filtersService.updateFilters(params);

        // all methods should return a Promise
        expectToBePromise(updateFiltersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/filters', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-User-Token', xAuthUserToken);
        expect(mockRequestOptions.body).toEqual(filterUpdateInput);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateFiltersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        filtersService.enableRetries();
        __updateFiltersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        filtersService.disableRetries();
        __updateFiltersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthUserToken,
          crn,
          zoneIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        filtersService.updateFilters(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await filtersService.updateFilters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await filtersService.updateFilters();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteFilters', () => {
    describe('positive tests', () => {
      function __deleteFiltersTest() {
        // Construct the params object for operation deleteFilters
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const id = 'b7ff25282d394be7b945e23c7106ce8a';
        const params = {
          xAuthUserToken: xAuthUserToken,
          crn: crn,
          zoneIdentifier: zoneIdentifier,
          id: id,
        };

        const deleteFiltersResult = filtersService.deleteFilters(params);

        // all methods should return a Promise
        expectToBePromise(deleteFiltersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/filters',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-User-Token', xAuthUserToken);
        expect(mockRequestOptions.qs.id).toEqual(id);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteFiltersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        filtersService.enableRetries();
        __deleteFiltersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        filtersService.disableRetries();
        __deleteFiltersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const id = 'b7ff25282d394be7b945e23c7106ce8a';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthUserToken,
          crn,
          zoneIdentifier,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        filtersService.deleteFilters(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await filtersService.deleteFilters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await filtersService.deleteFilters();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteFilter', () => {
    describe('positive tests', () => {
      function __deleteFilterTest() {
        // Construct the params object for operation deleteFilter
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const filterIdentifier = 'testString';
        const params = {
          xAuthUserToken: xAuthUserToken,
          crn: crn,
          zoneIdentifier: zoneIdentifier,
          filterIdentifier: filterIdentifier,
        };

        const deleteFilterResult = filtersService.deleteFilter(params);

        // all methods should return a Promise
        expectToBePromise(deleteFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/filters/{filter_identifier}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-User-Token', xAuthUserToken);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
        expect(mockRequestOptions.path.filter_identifier).toEqual(filterIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        filtersService.enableRetries();
        __deleteFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        filtersService.disableRetries();
        __deleteFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const filterIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthUserToken,
          crn,
          zoneIdentifier,
          filterIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        filtersService.deleteFilter(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await filtersService.deleteFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await filtersService.deleteFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getFilter', () => {
    describe('positive tests', () => {
      function __getFilterTest() {
        // Construct the params object for operation getFilter
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const filterIdentifier = 'testString';
        const params = {
          xAuthUserToken: xAuthUserToken,
          crn: crn,
          zoneIdentifier: zoneIdentifier,
          filterIdentifier: filterIdentifier,
        };

        const getFilterResult = filtersService.getFilter(params);

        // all methods should return a Promise
        expectToBePromise(getFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/filters/{filter_identifier}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-User-Token', xAuthUserToken);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
        expect(mockRequestOptions.path.filter_identifier).toEqual(filterIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        filtersService.enableRetries();
        __getFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        filtersService.disableRetries();
        __getFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const filterIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthUserToken,
          crn,
          zoneIdentifier,
          filterIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        filtersService.getFilter(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await filtersService.getFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await filtersService.getFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateFilter', () => {
    describe('positive tests', () => {
      function __updateFilterTest() {
        // Construct the params object for operation updateFilter
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const filterIdentifier = 'testString';
        const id = 'f2a64520581a4209aab12187a0081364';
        const expression = 'not http.request.uri.path matches "^/api/.*$"';
        const description = 'not /api';
        const paused = false;
        const params = {
          xAuthUserToken: xAuthUserToken,
          crn: crn,
          zoneIdentifier: zoneIdentifier,
          filterIdentifier: filterIdentifier,
          id: id,
          expression: expression,
          description: description,
          paused: paused,
        };

        const updateFilterResult = filtersService.updateFilter(params);

        // all methods should return a Promise
        expectToBePromise(updateFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/filters/{filter_identifier}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-User-Token', xAuthUserToken);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.expression).toEqual(expression);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.paused).toEqual(paused);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
        expect(mockRequestOptions.path.filter_identifier).toEqual(filterIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        filtersService.enableRetries();
        __updateFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        filtersService.disableRetries();
        __updateFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const filterIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthUserToken,
          crn,
          zoneIdentifier,
          filterIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        filtersService.updateFilter(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await filtersService.updateFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await filtersService.updateFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
