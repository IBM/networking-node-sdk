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

const GlobalLoadBalancerMonitorV1 = require('../../../dist/cis/global-load-balancer-monitor/v1');

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
};

const globalLoadBalancerMonitorService = new GlobalLoadBalancerMonitorV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(globalLoadBalancerMonitorService, 'createRequest');
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
  };
});

describe('GlobalLoadBalancerMonitorV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = GlobalLoadBalancerMonitorV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(
        GlobalLoadBalancerMonitorV1.DEFAULT_SERVICE_NAME
      );
      expect(testInstance.baseOptions.serviceUrl).toBe(
        GlobalLoadBalancerMonitorV1.DEFAULT_SERVICE_URL
      );
      expect(testInstance).toBeInstanceOf(GlobalLoadBalancerMonitorV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = GlobalLoadBalancerMonitorV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(GlobalLoadBalancerMonitorV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new GlobalLoadBalancerMonitorV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new GlobalLoadBalancerMonitorV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(
        GlobalLoadBalancerMonitorV1.DEFAULT_SERVICE_URL
      );
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new GlobalLoadBalancerMonitorV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
      });
    });
  });
  describe('listAllLoadBalancerMonitors', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAllLoadBalancerMonitors
        const params = {};

        const listAllLoadBalancerMonitorsResult = globalLoadBalancerMonitorService.listAllLoadBalancerMonitors(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listAllLoadBalancerMonitorsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/load_balancers/monitors', 'GET');
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

        globalLoadBalancerMonitorService.listAllLoadBalancerMonitors(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        globalLoadBalancerMonitorService.listAllLoadBalancerMonitors({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createLoadBalancerMonitor', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createLoadBalancerMonitor
        const expectedCodes = '2xx';
        const type = 'http';
        const description = 'Login page monitor';
        const method = 'GET';
        const port = 8080;
        const path = '/';
        const timeout = 5;
        const retries = 2;
        const interval = 60;
        const followRedirects = true;
        const expectedBody = 'alive';
        const allowInsecure = true;
        const header = { 'key1': ['testString'] };
        const params = {
          expectedCodes: expectedCodes,
          type: type,
          description: description,
          method: method,
          port: port,
          path: path,
          timeout: timeout,
          retries: retries,
          interval: interval,
          followRedirects: followRedirects,
          expectedBody: expectedBody,
          allowInsecure: allowInsecure,
          header: header,
        };

        const createLoadBalancerMonitorResult = globalLoadBalancerMonitorService.createLoadBalancerMonitor(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerMonitorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/load_balancers/monitors', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['expected_codes']).toEqual(expectedCodes);
        expect(options.body['type']).toEqual(type);
        expect(options.body['description']).toEqual(description);
        expect(options.body['method']).toEqual(method);
        expect(options.body['port']).toEqual(port);
        expect(options.body['path']).toEqual(path);
        expect(options.body['timeout']).toEqual(timeout);
        expect(options.body['retries']).toEqual(retries);
        expect(options.body['interval']).toEqual(interval);
        expect(options.body['follow_redirects']).toEqual(followRedirects);
        expect(options.body['expected_body']).toEqual(expectedBody);
        expect(options.body['allow_insecure']).toEqual(allowInsecure);
        expect(options.body['header']).toEqual(header);
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

        globalLoadBalancerMonitorService.createLoadBalancerMonitor(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        globalLoadBalancerMonitorService.createLoadBalancerMonitor({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('editLoadBalancerMonitor', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation editLoadBalancerMonitor
        const monitorIdentifier = 'testString';
        const expectedCodes = '2xx';
        const type = 'http';
        const description = 'Login page monitor';
        const method = 'GET';
        const port = 8080;
        const path = '/';
        const timeout = 5;
        const retries = 2;
        const interval = 60;
        const followRedirects = true;
        const expectedBody = 'alive';
        const allowInsecure = true;
        const header = { 'key1': ['testString'] };
        const params = {
          monitorIdentifier: monitorIdentifier,
          expectedCodes: expectedCodes,
          type: type,
          description: description,
          method: method,
          port: port,
          path: path,
          timeout: timeout,
          retries: retries,
          interval: interval,
          followRedirects: followRedirects,
          expectedBody: expectedBody,
          allowInsecure: allowInsecure,
          header: header,
        };

        const editLoadBalancerMonitorResult = globalLoadBalancerMonitorService.editLoadBalancerMonitor(
          params
        );

        // all methods should return a Promise
        expectToBePromise(editLoadBalancerMonitorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/load_balancers/monitors/{monitor_identifier}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['expected_codes']).toEqual(expectedCodes);
        expect(options.body['type']).toEqual(type);
        expect(options.body['description']).toEqual(description);
        expect(options.body['method']).toEqual(method);
        expect(options.body['port']).toEqual(port);
        expect(options.body['path']).toEqual(path);
        expect(options.body['timeout']).toEqual(timeout);
        expect(options.body['retries']).toEqual(retries);
        expect(options.body['interval']).toEqual(interval);
        expect(options.body['follow_redirects']).toEqual(followRedirects);
        expect(options.body['expected_body']).toEqual(expectedBody);
        expect(options.body['allow_insecure']).toEqual(allowInsecure);
        expect(options.body['header']).toEqual(header);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['monitor_identifier']).toEqual(monitorIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const monitorIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          monitorIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalLoadBalancerMonitorService.editLoadBalancerMonitor(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalLoadBalancerMonitorService.editLoadBalancerMonitor({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const editLoadBalancerMonitorPromise = globalLoadBalancerMonitorService.editLoadBalancerMonitor();
        expectToBePromise(editLoadBalancerMonitorPromise);

        editLoadBalancerMonitorPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteLoadBalancerMonitor', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteLoadBalancerMonitor
        const monitorIdentifier = 'testString';
        const params = {
          monitorIdentifier: monitorIdentifier,
        };

        const deleteLoadBalancerMonitorResult = globalLoadBalancerMonitorService.deleteLoadBalancerMonitor(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerMonitorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/load_balancers/monitors/{monitor_identifier}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['monitor_identifier']).toEqual(monitorIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const monitorIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          monitorIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalLoadBalancerMonitorService.deleteLoadBalancerMonitor(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalLoadBalancerMonitorService.deleteLoadBalancerMonitor({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const deleteLoadBalancerMonitorPromise = globalLoadBalancerMonitorService.deleteLoadBalancerMonitor();
        expectToBePromise(deleteLoadBalancerMonitorPromise);

        deleteLoadBalancerMonitorPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getLoadBalancerMonitor', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLoadBalancerMonitor
        const monitorIdentifier = 'testString';
        const params = {
          monitorIdentifier: monitorIdentifier,
        };

        const getLoadBalancerMonitorResult = globalLoadBalancerMonitorService.getLoadBalancerMonitor(
          params
        );

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerMonitorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/load_balancers/monitors/{monitor_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['monitor_identifier']).toEqual(monitorIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const monitorIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          monitorIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalLoadBalancerMonitorService.getLoadBalancerMonitor(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalLoadBalancerMonitorService.getLoadBalancerMonitor({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const getLoadBalancerMonitorPromise = globalLoadBalancerMonitorService.getLoadBalancerMonitor();
        expectToBePromise(getLoadBalancerMonitorPromise);

        getLoadBalancerMonitorPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
