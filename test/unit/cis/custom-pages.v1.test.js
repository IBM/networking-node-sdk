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
'use strict';

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const CustomPagesV1 = require('../../../dist/cis/custompagesv1/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  zoneIdentifier: 'testString',
};

const customPagesService = new CustomPagesV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(customPagesService, 'createRequest');
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
    crn: 'testString',
    zoneIdentifier: 'testString',
  };
});

describe('CustomPagesV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = CustomPagesV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(CustomPagesV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(CustomPagesV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(CustomPagesV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = CustomPagesV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(CustomPagesV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new CustomPagesV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new CustomPagesV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(CustomPagesV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new CustomPagesV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneIdentifier).toEqual(service.zoneIdentifier);
      });
    });
  });
  describe('listInstanceCustomPages', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listInstanceCustomPages
        const params = {};

        const listInstanceCustomPagesResult = customPagesService.listInstanceCustomPages(params);

        // all methods should return a Promise
        expectToBePromise(listInstanceCustomPagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/custom_pages', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        customPagesService.listInstanceCustomPages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        customPagesService.listInstanceCustomPages({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getInstanceCustomPage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getInstanceCustomPage
        const pageIdentifier = 'basic_challenge';
        const params = {
          pageIdentifier: pageIdentifier,
        };

        const getInstanceCustomPageResult = customPagesService.getInstanceCustomPage(params);

        // all methods should return a Promise
        expectToBePromise(getInstanceCustomPageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/custom_pages/{page_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['page_identifier']).toEqual(pageIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pageIdentifier = 'basic_challenge';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          pageIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        customPagesService.getInstanceCustomPage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await customPagesService.getInstanceCustomPage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const getInstanceCustomPagePromise = customPagesService.getInstanceCustomPage();
        expectToBePromise(getInstanceCustomPagePromise);

        getInstanceCustomPagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateInstanceCustomPage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateInstanceCustomPage
        const pageIdentifier = 'basic_challenge';
        const url = 'https://www.example.com/basic_challenge_error.html';
        const state = 'customized';
        const params = {
          pageIdentifier: pageIdentifier,
          url: url,
          state: state,
        };

        const updateInstanceCustomPageResult = customPagesService.updateInstanceCustomPage(params);

        // all methods should return a Promise
        expectToBePromise(updateInstanceCustomPageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/custom_pages/{page_identifier}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['url']).toEqual(url);
        expect(options.body['state']).toEqual(state);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['page_identifier']).toEqual(pageIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pageIdentifier = 'basic_challenge';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          pageIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        customPagesService.updateInstanceCustomPage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await customPagesService.updateInstanceCustomPage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const updateInstanceCustomPagePromise = customPagesService.updateInstanceCustomPage();
        expectToBePromise(updateInstanceCustomPagePromise);

        updateInstanceCustomPagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listZoneCustomPages', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listZoneCustomPages
        const params = {};

        const listZoneCustomPagesResult = customPagesService.listZoneCustomPages(params);

        // all methods should return a Promise
        expectToBePromise(listZoneCustomPagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/custom_pages', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        customPagesService.listZoneCustomPages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        customPagesService.listZoneCustomPages({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getZoneCustomPage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getZoneCustomPage
        const pageIdentifier = 'basic_challenge';
        const params = {
          pageIdentifier: pageIdentifier,
        };

        const getZoneCustomPageResult = customPagesService.getZoneCustomPage(params);

        // all methods should return a Promise
        expectToBePromise(getZoneCustomPageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/custom_pages/{page_identifier}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['page_identifier']).toEqual(pageIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pageIdentifier = 'basic_challenge';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          pageIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        customPagesService.getZoneCustomPage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await customPagesService.getZoneCustomPage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const getZoneCustomPagePromise = customPagesService.getZoneCustomPage();
        expectToBePromise(getZoneCustomPagePromise);

        getZoneCustomPagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateZoneCustomPage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateZoneCustomPage
        const pageIdentifier = 'basic_challenge';
        const url = 'https://www.example.com/basic_challenge_error.html';
        const state = 'customized';
        const params = {
          pageIdentifier: pageIdentifier,
          url: url,
          state: state,
        };

        const updateZoneCustomPageResult = customPagesService.updateZoneCustomPage(params);

        // all methods should return a Promise
        expectToBePromise(updateZoneCustomPageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/custom_pages/{page_identifier}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['url']).toEqual(url);
        expect(options.body['state']).toEqual(state);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['page_identifier']).toEqual(pageIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pageIdentifier = 'basic_challenge';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          pageIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        customPagesService.updateZoneCustomPage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await customPagesService.updateZoneCustomPage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const updateZoneCustomPagePromise = customPagesService.updateZoneCustomPage();
        expectToBePromise(updateZoneCustomPagePromise);

        updateZoneCustomPagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
