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

const GlobalLoadBalancerV1 = require('../../../dist/cis/global-load-balancer/v1');

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
  zoneIdentifier: 'testString',
};

const globalLoadBalancerService = new GlobalLoadBalancerV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(globalLoadBalancerService, 'createRequest');
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

describe('GlobalLoadBalancerV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = GlobalLoadBalancerV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(GlobalLoadBalancerV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(GlobalLoadBalancerV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(GlobalLoadBalancerV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = GlobalLoadBalancerV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(GlobalLoadBalancerV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new GlobalLoadBalancerV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new GlobalLoadBalancerV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(GlobalLoadBalancerV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new GlobalLoadBalancerV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneIdentifier).toEqual(service.zoneIdentifier);
      });
    });
  });
  describe('listAllLoadBalancers', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAllLoadBalancers
        const params = {};

        const listAllLoadBalancersResult = globalLoadBalancerService.listAllLoadBalancers(params);

        // all methods should return a Promise
        expectToBePromise(listAllLoadBalancersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/load_balancers', 'GET');
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

        globalLoadBalancerService.listAllLoadBalancers(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        globalLoadBalancerService.listAllLoadBalancers({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createLoadBalancer', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createLoadBalancer
        const name = 'www.example.com';
        const fallbackPool = '17b5962d775c646f3f9725cbc7a53df4';
        const defaultPools = ['testString'];
        const description = 'Load Balancer for www.example.com';
        const ttl = 30;
        const regionPools = { foo: 'bar' };
        const popPools = { foo: 'bar' };
        const proxied = true;
        const enabled = true;
        const sessionAffinity = 'ip_cookie';
        const steeringPolicy = 'dynamic_latency';
        const params = {
          name: name,
          fallbackPool: fallbackPool,
          defaultPools: defaultPools,
          description: description,
          ttl: ttl,
          regionPools: regionPools,
          popPools: popPools,
          proxied: proxied,
          enabled: enabled,
          sessionAffinity: sessionAffinity,
          steeringPolicy: steeringPolicy,
        };

        const createLoadBalancerResult = globalLoadBalancerService.createLoadBalancer(params);

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/load_balancers', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['fallback_pool']).toEqual(fallbackPool);
        expect(options.body['default_pools']).toEqual(defaultPools);
        expect(options.body['description']).toEqual(description);
        expect(options.body['ttl']).toEqual(ttl);
        expect(options.body['region_pools']).toEqual(regionPools);
        expect(options.body['pop_pools']).toEqual(popPools);
        expect(options.body['proxied']).toEqual(proxied);
        expect(options.body['enabled']).toEqual(enabled);
        expect(options.body['session_affinity']).toEqual(sessionAffinity);
        expect(options.body['steering_policy']).toEqual(steeringPolicy);
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

        globalLoadBalancerService.createLoadBalancer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        globalLoadBalancerService.createLoadBalancer({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('editLoadBalancer', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation editLoadBalancer
        const loadBalancerIdentifier = 'testString';
        const name = 'www.example.com';
        const fallbackPool = '17b5962d775c646f3f9725cbc7a53df4';
        const defaultPools = ['testString'];
        const description = 'Load Balancer for www.example.com';
        const ttl = 30;
        const regionPools = { foo: 'bar' };
        const popPools = { foo: 'bar' };
        const proxied = true;
        const enabled = true;
        const sessionAffinity = 'ip_cookie';
        const steeringPolicy = 'dynamic_latency';
        const params = {
          loadBalancerIdentifier: loadBalancerIdentifier,
          name: name,
          fallbackPool: fallbackPool,
          defaultPools: defaultPools,
          description: description,
          ttl: ttl,
          regionPools: regionPools,
          popPools: popPools,
          proxied: proxied,
          enabled: enabled,
          sessionAffinity: sessionAffinity,
          steeringPolicy: steeringPolicy,
        };

        const editLoadBalancerResult = globalLoadBalancerService.editLoadBalancer(params);

        // all methods should return a Promise
        expectToBePromise(editLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/load_balancers/{load_balancer_identifier}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['fallback_pool']).toEqual(fallbackPool);
        expect(options.body['default_pools']).toEqual(defaultPools);
        expect(options.body['description']).toEqual(description);
        expect(options.body['ttl']).toEqual(ttl);
        expect(options.body['region_pools']).toEqual(regionPools);
        expect(options.body['pop_pools']).toEqual(popPools);
        expect(options.body['proxied']).toEqual(proxied);
        expect(options.body['enabled']).toEqual(enabled);
        expect(options.body['session_affinity']).toEqual(sessionAffinity);
        expect(options.body['steering_policy']).toEqual(steeringPolicy);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['load_balancer_identifier']).toEqual(loadBalancerIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalLoadBalancerService.editLoadBalancer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await globalLoadBalancerService.editLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const editLoadBalancerPromise = globalLoadBalancerService.editLoadBalancer();
        expectToBePromise(editLoadBalancerPromise);

        editLoadBalancerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteLoadBalancer', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteLoadBalancer
        const loadBalancerIdentifier = 'testString';
        const params = {
          loadBalancerIdentifier: loadBalancerIdentifier,
        };

        const deleteLoadBalancerResult = globalLoadBalancerService.deleteLoadBalancer(params);

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/load_balancers/{load_balancer_identifier}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['load_balancer_identifier']).toEqual(loadBalancerIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalLoadBalancerService.deleteLoadBalancer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await globalLoadBalancerService.deleteLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteLoadBalancerPromise = globalLoadBalancerService.deleteLoadBalancer();
        expectToBePromise(deleteLoadBalancerPromise);

        deleteLoadBalancerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getLoadBalancerSettings', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLoadBalancerSettings
        const loadBalancerIdentifier = 'testString';
        const params = {
          loadBalancerIdentifier: loadBalancerIdentifier,
        };

        const getLoadBalancerSettingsResult = globalLoadBalancerService.getLoadBalancerSettings(
          params
        );

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/load_balancers/{load_balancer_identifier}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['load_balancer_identifier']).toEqual(loadBalancerIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const loadBalancerIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          loadBalancerIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalLoadBalancerService.getLoadBalancerSettings(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await globalLoadBalancerService.getLoadBalancerSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getLoadBalancerSettingsPromise = globalLoadBalancerService.getLoadBalancerSettings();
        expectToBePromise(getLoadBalancerSettingsPromise);

        getLoadBalancerSettingsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
