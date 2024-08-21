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

const WafRuleGroupsApiV1 = require('../../../dist/cis/wafrulegroupsapiv1/v1');

const { getOptions, checkUrlAndMethod, checkMediaHeaders, expectToBePromise } = require('@ibm-cloud/sdk-test-utilities');

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  zoneId: 'testString',
};

const wafRuleGroupsApiService = new WafRuleGroupsApiV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(wafRuleGroupsApiService, 'createRequest');
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

describe('WafRuleGroupsApiV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = WafRuleGroupsApiV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(WafRuleGroupsApiV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(WafRuleGroupsApiV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(WafRuleGroupsApiV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = WafRuleGroupsApiV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(WafRuleGroupsApiV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new WafRuleGroupsApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new WafRuleGroupsApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(WafRuleGroupsApiV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new WafRuleGroupsApiV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneId).toEqual(service.zoneId);
      });
    });
  });
  describe('listWafRuleGroups', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listWafRuleGroups
        const pkgId = 'testString';
        const name = 'Wordpress-rules';
        const mode = 'true';
        const rulesCount = '10';
        const page = 1;
        const perPage = 50;
        const order = 'status';
        const direction = 'desc';
        const match = 'all';
        const params = {
          pkgId: pkgId,
          name: name,
          mode: mode,
          rulesCount: rulesCount,
          page: page,
          perPage: perPage,
          order: order,
          direction: direction,
          match: match,
        };

        const listWafRuleGroupsResult = wafRuleGroupsApiService.listWafRuleGroups(params);

        // all methods should return a Promise
        expectToBePromise(listWafRuleGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_id}/firewall/waf/packages/{pkg_id}/groups',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['name']).toEqual(name);
        expect(options.qs['mode']).toEqual(mode);
        expect(options.qs['rules_count']).toEqual(rulesCount);
        expect(options.qs['page']).toEqual(page);
        expect(options.qs['per_page']).toEqual(perPage);
        expect(options.qs['order']).toEqual(order);
        expect(options.qs['direction']).toEqual(direction);
        expect(options.qs['match']).toEqual(match);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_id']).toEqual(service.zoneId);
        expect(options.path['pkg_id']).toEqual(pkgId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pkgId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          pkgId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        wafRuleGroupsApiService.listWafRuleGroups(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await wafRuleGroupsApiService.listWafRuleGroups({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const listWafRuleGroupsPromise = wafRuleGroupsApiService.listWafRuleGroups();
        expectToBePromise(listWafRuleGroupsPromise);

        listWafRuleGroupsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getWafRuleGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getWafRuleGroup
        const pkgId = 'testString';
        const groupId = 'testString';
        const params = {
          pkgId: pkgId,
          groupId: groupId,
        };

        const getWafRuleGroupResult = wafRuleGroupsApiService.getWafRuleGroup(params);

        // all methods should return a Promise
        expectToBePromise(getWafRuleGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_id}/firewall/waf/packages/{pkg_id}/groups/{group_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_id']).toEqual(service.zoneId);
        expect(options.path['pkg_id']).toEqual(pkgId);
        expect(options.path['group_id']).toEqual(groupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pkgId = 'testString';
        const groupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          pkgId,
          groupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        wafRuleGroupsApiService.getWafRuleGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await wafRuleGroupsApiService.getWafRuleGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const getWafRuleGroupPromise = wafRuleGroupsApiService.getWafRuleGroup();
        expectToBePromise(getWafRuleGroupPromise);

        getWafRuleGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateWafRuleGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateWafRuleGroup
        const pkgId = 'testString';
        const groupId = 'testString';
        const mode = 'on';
        const params = {
          pkgId: pkgId,
          groupId: groupId,
          mode: mode,
        };

        const updateWafRuleGroupResult = wafRuleGroupsApiService.updateWafRuleGroup(params);

        // all methods should return a Promise
        expectToBePromise(updateWafRuleGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_id}/firewall/waf/packages/{pkg_id}/groups/{group_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['mode']).toEqual(mode);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_id']).toEqual(service.zoneId);
        expect(options.path['pkg_id']).toEqual(pkgId);
        expect(options.path['group_id']).toEqual(groupId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pkgId = 'testString';
        const groupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          pkgId,
          groupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        wafRuleGroupsApiService.updateWafRuleGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await wafRuleGroupsApiService.updateWafRuleGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const updateWafRuleGroupPromise = wafRuleGroupsApiService.updateWafRuleGroup();
        expectToBePromise(updateWafRuleGroupPromise);

        updateWafRuleGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
