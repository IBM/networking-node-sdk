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

const GlobalLoadBalancerPoolsV0 = require('../../../dist/cis/global-load-balancer-pools/v0');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
};

const globalLoadBalancerPoolsService = new GlobalLoadBalancerPoolsV0(service);

// dont actually create a request
const createRequestMock = jest.spyOn(globalLoadBalancerPoolsService, 'createRequest');
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

describe('GlobalLoadBalancerPoolsV0', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = GlobalLoadBalancerPoolsV0.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(
        GlobalLoadBalancerPoolsV0.DEFAULT_SERVICE_NAME
      );
      expect(testInstance.baseOptions.serviceUrl).toBe(
        GlobalLoadBalancerPoolsV0.DEFAULT_SERVICE_URL
      );
      expect(testInstance).toBeInstanceOf(GlobalLoadBalancerPoolsV0);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = GlobalLoadBalancerPoolsV0.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(GlobalLoadBalancerPoolsV0);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new GlobalLoadBalancerPoolsV0(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new GlobalLoadBalancerPoolsV0(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(
        GlobalLoadBalancerPoolsV0.DEFAULT_SERVICE_URL
      );
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new GlobalLoadBalancerPoolsV0(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
      });
    });
  });
  describe('listAllLoadBalancerPools', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAllLoadBalancerPools
        const params = {};

        const listAllLoadBalancerPoolsResult = globalLoadBalancerPoolsService.listAllLoadBalancerPools(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listAllLoadBalancerPoolsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/load_balancers/pools', 'GET');
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

        globalLoadBalancerPoolsService.listAllLoadBalancerPools(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        globalLoadBalancerPoolsService.listAllLoadBalancerPools({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createLoadBalancerPool', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LoadBalancerPoolReqOriginsItem
      const loadBalancerPoolReqOriginsItemModel = {
        name: 'app-server-1',
        address: '0.0.0.0',
        enabled: true,
        weight: 1,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createLoadBalancerPool
        const name = 'primary-dc-1';
        const checkRegions = ['WNAM'];
        const origins = [loadBalancerPoolReqOriginsItemModel];
        const description = 'Primary data center - Provider XYZ';
        const minimumOrigins = 2;
        const enabled = true;
        const monitor = 'f1aba936b94213e5b8dca0c0dbf1f9cc';
        const notificationEmail = 'someone@example.com';
        const params = {
          name: name,
          checkRegions: checkRegions,
          origins: origins,
          description: description,
          minimumOrigins: minimumOrigins,
          enabled: enabled,
          monitor: monitor,
          notificationEmail: notificationEmail,
        };

        const createLoadBalancerPoolResult = globalLoadBalancerPoolsService.createLoadBalancerPool(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerPoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/load_balancers/pools', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['check_regions']).toEqual(checkRegions);
        expect(options.body['origins']).toEqual(origins);
        expect(options.body['description']).toEqual(description);
        expect(options.body['minimum_origins']).toEqual(minimumOrigins);
        expect(options.body['enabled']).toEqual(enabled);
        expect(options.body['monitor']).toEqual(monitor);
        expect(options.body['notification_email']).toEqual(notificationEmail);
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

        globalLoadBalancerPoolsService.createLoadBalancerPool(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        globalLoadBalancerPoolsService.createLoadBalancerPool({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getLoadBalancerPool', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLoadBalancerPool
        const poolIdentifier = 'testString';
        const params = {
          poolIdentifier: poolIdentifier,
        };

        const getLoadBalancerPoolResult = globalLoadBalancerPoolsService.getLoadBalancerPool(
          params
        );

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerPoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/load_balancers/pools/{pool_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['pool_identifier']).toEqual(poolIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const poolIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          poolIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalLoadBalancerPoolsService.getLoadBalancerPool(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await globalLoadBalancerPoolsService.getLoadBalancerPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getLoadBalancerPoolPromise = globalLoadBalancerPoolsService.getLoadBalancerPool();
        expectToBePromise(getLoadBalancerPoolPromise);

        getLoadBalancerPoolPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteLoadBalancerPool', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteLoadBalancerPool
        const poolIdentifier = 'testString';
        const params = {
          poolIdentifier: poolIdentifier,
        };

        const deleteLoadBalancerPoolResult = globalLoadBalancerPoolsService.deleteLoadBalancerPool(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerPoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/load_balancers/pools/{pool_identifier}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['pool_identifier']).toEqual(poolIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const poolIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          poolIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalLoadBalancerPoolsService.deleteLoadBalancerPool(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await globalLoadBalancerPoolsService.deleteLoadBalancerPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteLoadBalancerPoolPromise = globalLoadBalancerPoolsService.deleteLoadBalancerPool();
        expectToBePromise(deleteLoadBalancerPoolPromise);

        deleteLoadBalancerPoolPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('editLoadBalancerPool', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LoadBalancerPoolReqOriginsItem
      const loadBalancerPoolReqOriginsItemModel = {
        name: 'app-server-1',
        address: '0.0.0.0',
        enabled: true,
        weight: 1,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation editLoadBalancerPool
        const poolIdentifier = 'testString';
        const name = 'primary-dc-1';
        const checkRegions = ['WNAM'];
        const origins = [loadBalancerPoolReqOriginsItemModel];
        const description = 'Primary data center - Provider XYZ';
        const minimumOrigins = 2;
        const enabled = true;
        const monitor = 'f1aba936b94213e5b8dca0c0dbf1f9cc';
        const notificationEmail = 'someone@example.com';
        const params = {
          poolIdentifier: poolIdentifier,
          name: name,
          checkRegions: checkRegions,
          origins: origins,
          description: description,
          minimumOrigins: minimumOrigins,
          enabled: enabled,
          monitor: monitor,
          notificationEmail: notificationEmail,
        };

        const editLoadBalancerPoolResult = globalLoadBalancerPoolsService.editLoadBalancerPool(
          params
        );

        // all methods should return a Promise
        expectToBePromise(editLoadBalancerPoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/load_balancers/pools/{pool_identifier}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['check_regions']).toEqual(checkRegions);
        expect(options.body['origins']).toEqual(origins);
        expect(options.body['description']).toEqual(description);
        expect(options.body['minimum_origins']).toEqual(minimumOrigins);
        expect(options.body['enabled']).toEqual(enabled);
        expect(options.body['monitor']).toEqual(monitor);
        expect(options.body['notification_email']).toEqual(notificationEmail);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['pool_identifier']).toEqual(poolIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const poolIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          poolIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalLoadBalancerPoolsService.editLoadBalancerPool(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await globalLoadBalancerPoolsService.editLoadBalancerPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const editLoadBalancerPoolPromise = globalLoadBalancerPoolsService.editLoadBalancerPool();
        expectToBePromise(editLoadBalancerPoolPromise);

        editLoadBalancerPoolPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
