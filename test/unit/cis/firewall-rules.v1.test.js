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

const FirewallRulesV1 = require('../../../dist/cis/firewallrulesv1/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
} = unitTestUtils;

const firewallRulesServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
};

const firewallRulesService = new FirewallRulesV1(firewallRulesServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(firewallRulesService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('FirewallRulesV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = FirewallRulesV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(FirewallRulesV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(FirewallRulesV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(FirewallRulesV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = FirewallRulesV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(FirewallRulesV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new FirewallRulesV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new FirewallRulesV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(FirewallRulesV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('listAllFirewallRules', () => {
    describe('positive tests', () => {
      function __listAllFirewallRulesTest() {
        // Construct the params object for operation listAllFirewallRules
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const params = {
          xAuthUserToken: xAuthUserToken,
          crn: crn,
          zoneIdentifier: zoneIdentifier,
        };

        const listAllFirewallRulesResult = firewallRulesService.listAllFirewallRules(params);

        // all methods should return a Promise
        expectToBePromise(listAllFirewallRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/firewall/rules',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-User-Token', xAuthUserToken);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAllFirewallRulesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        firewallRulesService.enableRetries();
        __listAllFirewallRulesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        firewallRulesService.disableRetries();
        __listAllFirewallRulesTest();
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

        firewallRulesService.listAllFirewallRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await firewallRulesService.listAllFirewallRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await firewallRulesService.listAllFirewallRules();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createFirewallRules', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // FirewallRuleInputWithFilterIdFilter
      const firewallRuleInputWithFilterIdFilterModel = {
        id: '6f58318e7fa2477a23112e8118c66f61',
      };

      // FirewallRuleInputWithFilterId
      const firewallRuleInputWithFilterIdModel = {
        filter: firewallRuleInputWithFilterIdFilterModel,
        action: 'js_challenge',
        description: 'JS challenge site',
      };

      function __createFirewallRulesTest() {
        // Construct the params object for operation createFirewallRules
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const firewallRuleInputWithFilterId = [firewallRuleInputWithFilterIdModel];
        const params = {
          xAuthUserToken: xAuthUserToken,
          crn: crn,
          zoneIdentifier: zoneIdentifier,
          firewallRuleInputWithFilterId: firewallRuleInputWithFilterId,
        };

        const createFirewallRulesResult = firewallRulesService.createFirewallRules(params);

        // all methods should return a Promise
        expectToBePromise(createFirewallRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/firewall/rules',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-User-Token', xAuthUserToken);
        expect(mockRequestOptions.body).toEqual(firewallRuleInputWithFilterId);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createFirewallRulesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        firewallRulesService.enableRetries();
        __createFirewallRulesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        firewallRulesService.disableRetries();
        __createFirewallRulesTest();
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

        firewallRulesService.createFirewallRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await firewallRulesService.createFirewallRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await firewallRulesService.createFirewallRules();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateFirewllRules', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // FirewallRulesUpdateInputItemFilter
      const firewallRulesUpdateInputItemFilterModel = {
        id: '6f58318e7fa2477a23112e8118c66f61',
      };

      // FirewallRulesUpdateInputItem
      const firewallRulesUpdateInputItemModel = {
        id: '52161eb6af4241bb9d4b32394be72fdf',
        action: 'js_challenge',
        paused: false,
        description: 'JS challenge site',
        filter: firewallRulesUpdateInputItemFilterModel,
      };

      function __updateFirewllRulesTest() {
        // Construct the params object for operation updateFirewllRules
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const firewallRulesUpdateInputItem = [firewallRulesUpdateInputItemModel];
        const params = {
          xAuthUserToken: xAuthUserToken,
          crn: crn,
          zoneIdentifier: zoneIdentifier,
          firewallRulesUpdateInputItem: firewallRulesUpdateInputItem,
        };

        const updateFirewllRulesResult = firewallRulesService.updateFirewllRules(params);

        // all methods should return a Promise
        expectToBePromise(updateFirewllRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/firewall/rules',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-User-Token', xAuthUserToken);
        expect(mockRequestOptions.body).toEqual(firewallRulesUpdateInputItem);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateFirewllRulesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        firewallRulesService.enableRetries();
        __updateFirewllRulesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        firewallRulesService.disableRetries();
        __updateFirewllRulesTest();
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

        firewallRulesService.updateFirewllRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await firewallRulesService.updateFirewllRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await firewallRulesService.updateFirewllRules();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteFirewallRules', () => {
    describe('positive tests', () => {
      function __deleteFirewallRulesTest() {
        // Construct the params object for operation deleteFirewallRules
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const id = 'f2d427378e7542acb295380d352e2ebd';
        const params = {
          xAuthUserToken: xAuthUserToken,
          crn: crn,
          zoneIdentifier: zoneIdentifier,
          id: id,
        };

        const deleteFirewallRulesResult = firewallRulesService.deleteFirewallRules(params);

        // all methods should return a Promise
        expectToBePromise(deleteFirewallRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/firewall/rules',
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
        __deleteFirewallRulesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        firewallRulesService.enableRetries();
        __deleteFirewallRulesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        firewallRulesService.disableRetries();
        __deleteFirewallRulesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const id = 'f2d427378e7542acb295380d352e2ebd';
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

        firewallRulesService.deleteFirewallRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await firewallRulesService.deleteFirewallRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await firewallRulesService.deleteFirewallRules();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteFirewallRule', () => {
    describe('positive tests', () => {
      function __deleteFirewallRuleTest() {
        // Construct the params object for operation deleteFirewallRule
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const firewallRuleIdentifier = 'testString';
        const params = {
          xAuthUserToken: xAuthUserToken,
          crn: crn,
          zoneIdentifier: zoneIdentifier,
          firewallRuleIdentifier: firewallRuleIdentifier,
        };

        const deleteFirewallRuleResult = firewallRulesService.deleteFirewallRule(params);

        // all methods should return a Promise
        expectToBePromise(deleteFirewallRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/firewall/rules/{firewall_rule_identifier}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-User-Token', xAuthUserToken);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
        expect(mockRequestOptions.path.firewall_rule_identifier).toEqual(firewallRuleIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteFirewallRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        firewallRulesService.enableRetries();
        __deleteFirewallRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        firewallRulesService.disableRetries();
        __deleteFirewallRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const firewallRuleIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthUserToken,
          crn,
          zoneIdentifier,
          firewallRuleIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        firewallRulesService.deleteFirewallRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await firewallRulesService.deleteFirewallRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await firewallRulesService.deleteFirewallRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getFirewallRule', () => {
    describe('positive tests', () => {
      function __getFirewallRuleTest() {
        // Construct the params object for operation getFirewallRule
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const firewallRuleIdentifier = 'testString';
        const params = {
          xAuthUserToken: xAuthUserToken,
          crn: crn,
          zoneIdentifier: zoneIdentifier,
          firewallRuleIdentifier: firewallRuleIdentifier,
        };

        const getFirewallRuleResult = firewallRulesService.getFirewallRule(params);

        // all methods should return a Promise
        expectToBePromise(getFirewallRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/firewall/rules/{firewall_rule_identifier}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-User-Token', xAuthUserToken);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
        expect(mockRequestOptions.path.firewall_rule_identifier).toEqual(firewallRuleIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getFirewallRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        firewallRulesService.enableRetries();
        __getFirewallRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        firewallRulesService.disableRetries();
        __getFirewallRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const firewallRuleIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthUserToken,
          crn,
          zoneIdentifier,
          firewallRuleIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        firewallRulesService.getFirewallRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await firewallRulesService.getFirewallRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await firewallRulesService.getFirewallRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateFirewallRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // FirewallRuleUpdateInputFilter
      const firewallRuleUpdateInputFilterModel = {
        id: '6f58318e7fa2477a23112e8118c66f61',
      };

      function __updateFirewallRuleTest() {
        // Construct the params object for operation updateFirewallRule
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const firewallRuleIdentifier = 'testString';
        const action = 'js_challenge';
        const paused = false;
        const description = 'JS challenge site';
        const filter = firewallRuleUpdateInputFilterModel;
        const params = {
          xAuthUserToken: xAuthUserToken,
          crn: crn,
          zoneIdentifier: zoneIdentifier,
          firewallRuleIdentifier: firewallRuleIdentifier,
          action: action,
          paused: paused,
          description: description,
          filter: filter,
        };

        const updateFirewallRuleResult = firewallRulesService.updateFirewallRule(params);

        // all methods should return a Promise
        expectToBePromise(updateFirewallRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/firewall/rules/{firewall_rule_identifier}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-User-Token', xAuthUserToken);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.paused).toEqual(paused);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.filter).toEqual(filter);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
        expect(mockRequestOptions.path.firewall_rule_identifier).toEqual(firewallRuleIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateFirewallRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        firewallRulesService.enableRetries();
        __updateFirewallRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        firewallRulesService.disableRetries();
        __updateFirewallRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthUserToken = 'testString';
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const firewallRuleIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthUserToken,
          crn,
          zoneIdentifier,
          firewallRuleIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        firewallRulesService.updateFirewallRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await firewallRulesService.updateFirewallRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await firewallRulesService.updateFirewallRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
