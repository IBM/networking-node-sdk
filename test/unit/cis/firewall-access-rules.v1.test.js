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

const FirewallAccessRulesV1 = require('../../../dist/cis/firewallaccessrulesv1/v1');

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

const firewallAccessRulesService = new FirewallAccessRulesV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(firewallAccessRulesService, 'createRequest');
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

describe('FirewallAccessRulesV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = FirewallAccessRulesV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(FirewallAccessRulesV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(FirewallAccessRulesV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(FirewallAccessRulesV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = FirewallAccessRulesV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(FirewallAccessRulesV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new FirewallAccessRulesV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new FirewallAccessRulesV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(FirewallAccessRulesV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new FirewallAccessRulesV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
      });
    });
  });
  describe('listAllAccountAccessRules', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAllAccountAccessRules
        const notes = 'testString';
        const mode = 'block';
        const configurationTarget = 'ip';
        const configurationValue = '1.2.3.4';
        const page = 38;
        const perPage = 5;
        const order = 'target';
        const direction = 'asc';
        const match = 'any';
        const params = {
          notes: notes,
          mode: mode,
          configurationTarget: configurationTarget,
          configurationValue: configurationValue,
          page: page,
          perPage: perPage,
          order: order,
          direction: direction,
          match: match,
        };

        const listAllAccountAccessRulesResult = firewallAccessRulesService.listAllAccountAccessRules(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listAllAccountAccessRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/firewall/access_rules/rules', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['notes']).toEqual(notes);
        expect(options.qs['mode']).toEqual(mode);
        expect(options.qs['configuration.target']).toEqual(configurationTarget);
        expect(options.qs['configuration.value']).toEqual(configurationValue);
        expect(options.qs['page']).toEqual(page);
        expect(options.qs['per_page']).toEqual(perPage);
        expect(options.qs['order']).toEqual(order);
        expect(options.qs['direction']).toEqual(direction);
        expect(options.qs['match']).toEqual(match);
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

        firewallAccessRulesService.listAllAccountAccessRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        firewallAccessRulesService.listAllAccountAccessRules({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createAccountAccessRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AccountAccessRuleInputConfiguration
      const accountAccessRuleInputConfigurationModel = {
        target: 'ip',
        value:
          'ip example 198.51.100.4; ip_range example 198.51.100.4/16 ; asn example AS12345; country example AZ',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createAccountAccessRule
        const mode = 'block';
        const notes = 'This rule is added because of event X that occurred on date xyz';
        const configuration = accountAccessRuleInputConfigurationModel;
        const params = {
          mode: mode,
          notes: notes,
          configuration: configuration,
        };

        const createAccountAccessRuleResult = firewallAccessRulesService.createAccountAccessRule(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createAccountAccessRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/firewall/access_rules/rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['mode']).toEqual(mode);
        expect(options.body['notes']).toEqual(notes);
        expect(options.body['configuration']).toEqual(configuration);
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

        firewallAccessRulesService.createAccountAccessRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        firewallAccessRulesService.createAccountAccessRule({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteAccountAccessRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteAccountAccessRule
        const accessruleIdentifier = 'testString';
        const params = {
          accessruleIdentifier: accessruleIdentifier,
        };

        const deleteAccountAccessRuleResult = firewallAccessRulesService.deleteAccountAccessRule(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteAccountAccessRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/firewall/access_rules/rules/{accessrule_identifier}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['accessrule_identifier']).toEqual(accessruleIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessruleIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accessruleIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        firewallAccessRulesService.deleteAccountAccessRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await firewallAccessRulesService.deleteAccountAccessRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const deleteAccountAccessRulePromise = firewallAccessRulesService.deleteAccountAccessRule();
        expectToBePromise(deleteAccountAccessRulePromise);

        deleteAccountAccessRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getAccountAccessRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getAccountAccessRule
        const accessruleIdentifier = 'testString';
        const params = {
          accessruleIdentifier: accessruleIdentifier,
        };

        const getAccountAccessRuleResult = firewallAccessRulesService.getAccountAccessRule(params);

        // all methods should return a Promise
        expectToBePromise(getAccountAccessRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/firewall/access_rules/rules/{accessrule_identifier}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['accessrule_identifier']).toEqual(accessruleIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessruleIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accessruleIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        firewallAccessRulesService.getAccountAccessRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await firewallAccessRulesService.getAccountAccessRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const getAccountAccessRulePromise = firewallAccessRulesService.getAccountAccessRule();
        expectToBePromise(getAccountAccessRulePromise);

        getAccountAccessRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateAccountAccessRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateAccountAccessRule
        const accessruleIdentifier = 'testString';
        const mode = 'block';
        const notes = 'This rule is added because of event X that occurred on date xyz';
        const params = {
          accessruleIdentifier: accessruleIdentifier,
          mode: mode,
          notes: notes,
        };

        const updateAccountAccessRuleResult = firewallAccessRulesService.updateAccountAccessRule(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateAccountAccessRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/firewall/access_rules/rules/{accessrule_identifier}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['mode']).toEqual(mode);
        expect(options.body['notes']).toEqual(notes);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['accessrule_identifier']).toEqual(accessruleIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessruleIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accessruleIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        firewallAccessRulesService.updateAccountAccessRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await firewallAccessRulesService.updateAccountAccessRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const updateAccountAccessRulePromise = firewallAccessRulesService.updateAccountAccessRule();
        expectToBePromise(updateAccountAccessRulePromise);

        updateAccountAccessRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
