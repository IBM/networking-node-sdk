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

const UserAgentBlockingRulesV1 = require('../../../dist/cis/useragentblockingrulesv1/v1');

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

const userAgentBlockingRulesService = new UserAgentBlockingRulesV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(userAgentBlockingRulesService, 'createRequest');
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

describe('UserAgentBlockingRulesV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = UserAgentBlockingRulesV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(
        UserAgentBlockingRulesV1.DEFAULT_SERVICE_NAME
      );
      expect(testInstance.baseOptions.serviceUrl).toBe(
        UserAgentBlockingRulesV1.DEFAULT_SERVICE_URL
      );
      expect(testInstance).toBeInstanceOf(UserAgentBlockingRulesV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = UserAgentBlockingRulesV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(UserAgentBlockingRulesV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new UserAgentBlockingRulesV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new UserAgentBlockingRulesV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(
        UserAgentBlockingRulesV1.DEFAULT_SERVICE_URL
      );
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new UserAgentBlockingRulesV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneIdentifier).toEqual(service.zoneIdentifier);
      });
    });
  });
  describe('listAllZoneUserAgentRules', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAllZoneUserAgentRules
        const page = 38;
        const perPage = 5;
        const params = {
          page: page,
          perPage: perPage,
        };

        const listAllZoneUserAgentRulesResult = userAgentBlockingRulesService.listAllZoneUserAgentRules(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listAllZoneUserAgentRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/firewall/ua_rules', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['page']).toEqual(page);
        expect(options.qs['per_page']).toEqual(perPage);
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

        userAgentBlockingRulesService.listAllZoneUserAgentRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        userAgentBlockingRulesService.listAllZoneUserAgentRules({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createZoneUserAgentRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // UseragentRuleInputConfiguration
      const useragentRuleInputConfigurationModel = {
        target: 'ua',
        value:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createZoneUserAgentRule
        const mode = 'block';
        const configuration = useragentRuleInputConfigurationModel;
        const paused = true;
        const description =
          'Prevent access from abusive clients identified by this UserAgent to mitigate DDoS attack';
        const params = {
          mode: mode,
          configuration: configuration,
          paused: paused,
          description: description,
        };

        const createZoneUserAgentRuleResult = userAgentBlockingRulesService.createZoneUserAgentRule(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createZoneUserAgentRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/firewall/ua_rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['mode']).toEqual(mode);
        expect(options.body['configuration']).toEqual(configuration);
        expect(options.body['paused']).toEqual(paused);
        expect(options.body['description']).toEqual(description);
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

        userAgentBlockingRulesService.createZoneUserAgentRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        userAgentBlockingRulesService.createZoneUserAgentRule({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteZoneUserAgentRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteZoneUserAgentRule
        const useragentRuleIdentifier = 'testString';
        const params = {
          useragentRuleIdentifier: useragentRuleIdentifier,
        };

        const deleteZoneUserAgentRuleResult = userAgentBlockingRulesService.deleteZoneUserAgentRule(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteZoneUserAgentRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/firewall/ua_rules/{useragent_rule_identifier}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['useragent_rule_identifier']).toEqual(useragentRuleIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const useragentRuleIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          useragentRuleIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        userAgentBlockingRulesService.deleteZoneUserAgentRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await userAgentBlockingRulesService.deleteZoneUserAgentRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const deleteZoneUserAgentRulePromise = userAgentBlockingRulesService.deleteZoneUserAgentRule();
        expectToBePromise(deleteZoneUserAgentRulePromise);

        deleteZoneUserAgentRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getUserAgentRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getUserAgentRule
        const useragentRuleIdentifier = 'testString';
        const params = {
          useragentRuleIdentifier: useragentRuleIdentifier,
        };

        const getUserAgentRuleResult = userAgentBlockingRulesService.getUserAgentRule(params);

        // all methods should return a Promise
        expectToBePromise(getUserAgentRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/firewall/ua_rules/{useragent_rule_identifier}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['useragent_rule_identifier']).toEqual(useragentRuleIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const useragentRuleIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          useragentRuleIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        userAgentBlockingRulesService.getUserAgentRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await userAgentBlockingRulesService.getUserAgentRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const getUserAgentRulePromise = userAgentBlockingRulesService.getUserAgentRule();
        expectToBePromise(getUserAgentRulePromise);

        getUserAgentRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateUserAgentRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // UseragentRuleInputConfiguration
      const useragentRuleInputConfigurationModel = {
        target: 'ua',
        value:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateUserAgentRule
        const useragentRuleIdentifier = 'testString';
        const mode = 'block';
        const configuration = useragentRuleInputConfigurationModel;
        const paused = true;
        const description =
          'Prevent access from abusive clients identified by this UserAgent to mitigate DDoS attack';
        const params = {
          useragentRuleIdentifier: useragentRuleIdentifier,
          mode: mode,
          configuration: configuration,
          paused: paused,
          description: description,
        };

        const updateUserAgentRuleResult = userAgentBlockingRulesService.updateUserAgentRule(params);

        // all methods should return a Promise
        expectToBePromise(updateUserAgentRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/firewall/ua_rules/{useragent_rule_identifier}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['mode']).toEqual(mode);
        expect(options.body['configuration']).toEqual(configuration);
        expect(options.body['paused']).toEqual(paused);
        expect(options.body['description']).toEqual(description);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['useragent_rule_identifier']).toEqual(useragentRuleIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const useragentRuleIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          useragentRuleIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        userAgentBlockingRulesService.updateUserAgentRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await userAgentBlockingRulesService.updateUserAgentRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const updateUserAgentRulePromise = userAgentBlockingRulesService.updateUserAgentRule();
        expectToBePromise(updateUserAgentRulePromise);

        updateUserAgentRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
