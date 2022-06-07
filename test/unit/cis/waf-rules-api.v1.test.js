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

const WafRulesApiV1 = require('../../../dist/cis/wafrulesapiv1/v1');

const { getOptions, checkUrlAndMethod, checkMediaHeaders, expectToBePromise } = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  zoneId: 'testString',
};

const wafRulesApiService = new WafRulesApiV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(wafRulesApiService, 'createRequest');
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

describe('WafRulesApiV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = WafRulesApiV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(WafRulesApiV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(WafRulesApiV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(WafRulesApiV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = WafRulesApiV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(WafRulesApiV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new WafRulesApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new WafRulesApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(WafRulesApiV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new WafRulesApiV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneId).toEqual(service.zoneId);
      });
    });
  });
  describe('listWafRules', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listWafRules
        const packageId = 'testString';
        const mode = 'on';
        const priority = '5';
        const match = 'all';
        const order = 'status';
        const groupId = 'de677e5818985db1285d0e80225f06e5';
        const description = 'SQL-injection-prevention-for-SELECT-statements';
        const direction = 'desc';
        const page = 1;
        const perPage = 50;
        const params = {
          packageId: packageId,
          mode: mode,
          priority: priority,
          match: match,
          order: order,
          groupId: groupId,
          description: description,
          direction: direction,
          page: page,
          perPage: perPage,
        };

        const listWafRulesResult = wafRulesApiService.listWafRules(params);

        // all methods should return a Promise
        expectToBePromise(listWafRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_id}/firewall/waf/packages/{package_id}/rules',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['mode']).toEqual(mode);
        expect(options.qs['priority']).toEqual(priority);
        expect(options.qs['match']).toEqual(match);
        expect(options.qs['order']).toEqual(order);
        expect(options.qs['group_id']).toEqual(groupId);
        expect(options.qs['description']).toEqual(description);
        expect(options.qs['direction']).toEqual(direction);
        expect(options.qs['page']).toEqual(page);
        expect(options.qs['per_page']).toEqual(perPage);
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

        wafRulesApiService.listWafRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await wafRulesApiService.listWafRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const listWafRulesPromise = wafRulesApiService.listWafRules();
        expectToBePromise(listWafRulesPromise);

        listWafRulesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getWafRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getWafRule
        const packageId = 'testString';
        const identifier = 'testString';
        const params = {
          packageId: packageId,
          identifier: identifier,
        };

        const getWafRuleResult = wafRulesApiService.getWafRule(params);

        // all methods should return a Promise
        expectToBePromise(getWafRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_id}/firewall/waf/packages/{package_id}/rules/{identifier}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_id']).toEqual(service.zoneId);
        expect(options.path['package_id']).toEqual(packageId);
        expect(options.path['identifier']).toEqual(identifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const packageId = 'testString';
        const identifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          packageId,
          identifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        wafRulesApiService.getWafRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await wafRulesApiService.getWafRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const getWafRulePromise = wafRulesApiService.getWafRule();
        expectToBePromise(getWafRulePromise);

        getWafRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateWafRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // WafRuleBodyCis
      const wafRuleBodyCisModel = {
        mode: 'default',
      };

      // WafRuleBodyOwasp
      const wafRuleBodyOwaspModel = {
        mode: 'on',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateWafRule
        const packageId = 'testString';
        const identifier = 'testString';
        const cis = wafRuleBodyCisModel;
        const owasp = wafRuleBodyOwaspModel;
        const params = {
          packageId: packageId,
          identifier: identifier,
          cis: cis,
          owasp: owasp,
        };

        const updateWafRuleResult = wafRulesApiService.updateWafRule(params);

        // all methods should return a Promise
        expectToBePromise(updateWafRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_id}/firewall/waf/packages/{package_id}/rules/{identifier}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['cis']).toEqual(cis);
        expect(options.body['owasp']).toEqual(owasp);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_id']).toEqual(service.zoneId);
        expect(options.path['package_id']).toEqual(packageId);
        expect(options.path['identifier']).toEqual(identifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const packageId = 'testString';
        const identifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          packageId,
          identifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        wafRulesApiService.updateWafRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await wafRulesApiService.updateWafRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const updateWafRulePromise = wafRulesApiService.updateWafRule();
        expectToBePromise(updateWafRulePromise);

        updateWafRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
