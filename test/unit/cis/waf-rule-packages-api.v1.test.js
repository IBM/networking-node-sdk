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

const WafRulePackagesApiV1 = require('../../../dist/cis/wafrulepackagesapiv1/v1');

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
  zoneId: 'testString',
};

const wafRulePackagesApiService = new WafRulePackagesApiV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(wafRulePackagesApiService, 'createRequest');
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
    zoneId: 'testString',
  };
});

describe('WafRulePackagesApiV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = WafRulePackagesApiV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(WafRulePackagesApiV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(WafRulePackagesApiV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(WafRulePackagesApiV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = WafRulePackagesApiV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(WafRulePackagesApiV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new WafRulePackagesApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new WafRulePackagesApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(WafRulePackagesApiV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new WafRulePackagesApiV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneId).toEqual(service.zoneId);
      });
    });
  });
  describe('listWafPackages', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listWafPackages
        const name = 'Wordpress-rules';
        const page = 1;
        const perPage = 50;
        const order = 'status';
        const direction = 'desc';
        const match = 'all';
        const params = {
          name: name,
          page: page,
          perPage: perPage,
          order: order,
          direction: direction,
          match: match,
        };

        const listWafPackagesResult = wafRulePackagesApiService.listWafPackages(params);

        // all methods should return a Promise
        expectToBePromise(listWafPackagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_id}/firewall/waf/packages', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['name']).toEqual(name);
        expect(options.qs['page']).toEqual(page);
        expect(options.qs['per_page']).toEqual(perPage);
        expect(options.qs['order']).toEqual(order);
        expect(options.qs['direction']).toEqual(direction);
        expect(options.qs['match']).toEqual(match);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_id']).toEqual(service.zoneId);
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

        wafRulePackagesApiService.listWafPackages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        wafRulePackagesApiService.listWafPackages({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getWafPackage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getWafPackage
        const packageId = 'testString';
        const params = {
          packageId: packageId,
        };

        const getWafPackageResult = wafRulePackagesApiService.getWafPackage(params);

        // all methods should return a Promise
        expectToBePromise(getWafPackageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_id}/firewall/waf/packages/{package_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_id']).toEqual(service.zoneId);
        expect(options.path['package_id']).toEqual(packageId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const packageId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          packageId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        wafRulePackagesApiService.getWafPackage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await wafRulePackagesApiService.getWafPackage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getWafPackagePromise = wafRulePackagesApiService.getWafPackage();
        expectToBePromise(getWafPackagePromise);

        getWafPackagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateWafPackage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateWafPackage
        const packageId = 'testString';
        const sensitivity = 'high';
        const actionMode = 'simulate';
        const params = {
          packageId: packageId,
          sensitivity: sensitivity,
          actionMode: actionMode,
        };

        const updateWafPackageResult = wafRulePackagesApiService.updateWafPackage(params);

        // all methods should return a Promise
        expectToBePromise(updateWafPackageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_id}/firewall/waf/packages/{package_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['sensitivity']).toEqual(sensitivity);
        expect(options.body['action_mode']).toEqual(actionMode);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_id']).toEqual(service.zoneId);
        expect(options.path['package_id']).toEqual(packageId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const packageId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          packageId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        wafRulePackagesApiService.updateWafPackage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await wafRulePackagesApiService.updateWafPackage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateWafPackagePromise = wafRulePackagesApiService.updateWafPackage();
        expectToBePromise(updateWafPackagePromise);

        updateWafPackagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
