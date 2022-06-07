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
const { NoAuthAuthenticator, unitTestUtils } = core;

const EdgeFunctionsApiV1 = require('../../../dist/cis/edgefunctionsapiv1/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  zoneIdentifier: 'testString',
};

const edgeFunctionsApiService = new EdgeFunctionsApiV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(edgeFunctionsApiService, 'createRequest');
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

describe('EdgeFunctionsApiV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = EdgeFunctionsApiV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(EdgeFunctionsApiV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(EdgeFunctionsApiV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(EdgeFunctionsApiV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = EdgeFunctionsApiV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(EdgeFunctionsApiV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new EdgeFunctionsApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new EdgeFunctionsApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(EdgeFunctionsApiV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new EdgeFunctionsApiV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneIdentifier).toEqual(service.zoneIdentifier);
      });
    });
  });
  describe('listEdgeFunctionsActions', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listEdgeFunctionsActions
        const xCorrelationId = 'testString';
        const params = {
          xCorrelationId: xCorrelationId,
        };

        const listEdgeFunctionsActionsResult = edgeFunctionsApiService.listEdgeFunctionsActions(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listEdgeFunctionsActionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/workers/scripts', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
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

        edgeFunctionsApiService.listEdgeFunctionsActions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        edgeFunctionsApiService.listEdgeFunctionsActions({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('updateEdgeFunctionsAction', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateEdgeFunctionsAction
        const scriptName = 'testString';
        const edgeFunctionsAction = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          scriptName: scriptName,
          edgeFunctionsAction: edgeFunctionsAction,
          xCorrelationId: xCorrelationId,
        };

        const updateEdgeFunctionsActionResult = edgeFunctionsApiService.updateEdgeFunctionsAction(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateEdgeFunctionsActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/workers/scripts/{script_name}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/javascript';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(options.body).toEqual(edgeFunctionsAction);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['script_name']).toEqual(scriptName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const scriptName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          scriptName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        edgeFunctionsApiService.updateEdgeFunctionsAction(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await edgeFunctionsApiService.updateEdgeFunctionsAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const updateEdgeFunctionsActionPromise = edgeFunctionsApiService.updateEdgeFunctionsAction();
        expectToBePromise(updateEdgeFunctionsActionPromise);

        updateEdgeFunctionsActionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getEdgeFunctionsAction', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getEdgeFunctionsAction
        const scriptName = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          scriptName: scriptName,
          xCorrelationId: xCorrelationId,
        };

        const getEdgeFunctionsActionResult = edgeFunctionsApiService.getEdgeFunctionsAction(params);

        // all methods should return a Promise
        expectToBePromise(getEdgeFunctionsActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/workers/scripts/{script_name}', 'GET');
        const expectedAccept = 'application/javascript';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['script_name']).toEqual(scriptName);
        expect(options.responseType).toBe('stream');
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const scriptName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          scriptName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        edgeFunctionsApiService.getEdgeFunctionsAction(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await edgeFunctionsApiService.getEdgeFunctionsAction({});
        } catch (e) {
          err = e;
        }
        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const getEdgeFunctionsActionPromise = edgeFunctionsApiService.getEdgeFunctionsAction();
        expectToBePromise(getEdgeFunctionsActionPromise);

        getEdgeFunctionsActionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteEdgeFunctionsAction', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteEdgeFunctionsAction
        const scriptName = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          scriptName: scriptName,
          xCorrelationId: xCorrelationId,
        };

        const deleteEdgeFunctionsActionResult = edgeFunctionsApiService.deleteEdgeFunctionsAction(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteEdgeFunctionsActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/workers/scripts/{script_name}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['script_name']).toEqual(scriptName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const scriptName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          scriptName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        edgeFunctionsApiService.deleteEdgeFunctionsAction(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await edgeFunctionsApiService.deleteEdgeFunctionsAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const deleteEdgeFunctionsActionPromise = edgeFunctionsApiService.deleteEdgeFunctionsAction();
        expectToBePromise(deleteEdgeFunctionsActionPromise);

        deleteEdgeFunctionsActionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createEdgeFunctionsTrigger', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createEdgeFunctionsTrigger
        const pattern = 'example.net/*';
        const script = 'this-is_my_script-01';
        const xCorrelationId = 'testString';
        const params = {
          pattern: pattern,
          script: script,
          xCorrelationId: xCorrelationId,
        };

        const createEdgeFunctionsTriggerResult = edgeFunctionsApiService.createEdgeFunctionsTrigger(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createEdgeFunctionsTriggerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/workers/routes', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(options.body['pattern']).toEqual(pattern);
        expect(options.body['script']).toEqual(script);
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

        edgeFunctionsApiService.createEdgeFunctionsTrigger(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        edgeFunctionsApiService.createEdgeFunctionsTrigger({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('listEdgeFunctionsTriggers', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listEdgeFunctionsTriggers
        const xCorrelationId = 'testString';
        const params = {
          xCorrelationId: xCorrelationId,
        };

        const listEdgeFunctionsTriggersResult = edgeFunctionsApiService.listEdgeFunctionsTriggers(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listEdgeFunctionsTriggersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/workers/routes', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
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

        edgeFunctionsApiService.listEdgeFunctionsTriggers(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        edgeFunctionsApiService.listEdgeFunctionsTriggers({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getEdgeFunctionsTrigger', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getEdgeFunctionsTrigger
        const routeId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          routeId: routeId,
          xCorrelationId: xCorrelationId,
        };

        const getEdgeFunctionsTriggerResult = edgeFunctionsApiService.getEdgeFunctionsTrigger(
          params
        );

        // all methods should return a Promise
        expectToBePromise(getEdgeFunctionsTriggerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/workers/routes/{route_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['route_id']).toEqual(routeId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const routeId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          routeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        edgeFunctionsApiService.getEdgeFunctionsTrigger(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await edgeFunctionsApiService.getEdgeFunctionsTrigger({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const getEdgeFunctionsTriggerPromise = edgeFunctionsApiService.getEdgeFunctionsTrigger();
        expectToBePromise(getEdgeFunctionsTriggerPromise);

        getEdgeFunctionsTriggerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateEdgeFunctionsTrigger', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateEdgeFunctionsTrigger
        const routeId = 'testString';
        const pattern = 'example.net/*';
        const script = 'this-is_my_script-01';
        const xCorrelationId = 'testString';
        const params = {
          routeId: routeId,
          pattern: pattern,
          script: script,
          xCorrelationId: xCorrelationId,
        };

        const updateEdgeFunctionsTriggerResult = edgeFunctionsApiService.updateEdgeFunctionsTrigger(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateEdgeFunctionsTriggerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/workers/routes/{route_id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(options.body['pattern']).toEqual(pattern);
        expect(options.body['script']).toEqual(script);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['route_id']).toEqual(routeId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const routeId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          routeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        edgeFunctionsApiService.updateEdgeFunctionsTrigger(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await edgeFunctionsApiService.updateEdgeFunctionsTrigger({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const updateEdgeFunctionsTriggerPromise = edgeFunctionsApiService.updateEdgeFunctionsTrigger();
        expectToBePromise(updateEdgeFunctionsTriggerPromise);

        updateEdgeFunctionsTriggerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteEdgeFunctionsTrigger', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteEdgeFunctionsTrigger
        const routeId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          routeId: routeId,
          xCorrelationId: xCorrelationId,
        };

        const deleteEdgeFunctionsTriggerResult = edgeFunctionsApiService.deleteEdgeFunctionsTrigger(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteEdgeFunctionsTriggerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/workers/routes/{route_id}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['route_id']).toEqual(routeId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const routeId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          routeId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        edgeFunctionsApiService.deleteEdgeFunctionsTrigger(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await edgeFunctionsApiService.deleteEdgeFunctionsTrigger({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const deleteEdgeFunctionsTriggerPromise = edgeFunctionsApiService.deleteEdgeFunctionsTrigger();
        expectToBePromise(deleteEdgeFunctionsTriggerPromise);

        deleteEdgeFunctionsTriggerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
