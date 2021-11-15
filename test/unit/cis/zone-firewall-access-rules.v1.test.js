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

const ZoneFirewallAccessRulesV1 = require('../../../dist/cis/zonefirewallaccessrulesv1/v1');

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

const zoneFirewallAccessRulesService = new ZoneFirewallAccessRulesV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(zoneFirewallAccessRulesService, 'createRequest');
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

describe('ZoneFirewallAccessRulesV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = ZoneFirewallAccessRulesV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(
        ZoneFirewallAccessRulesV1.DEFAULT_SERVICE_NAME
      );
      expect(testInstance.baseOptions.serviceUrl).toBe(
        ZoneFirewallAccessRulesV1.DEFAULT_SERVICE_URL
      );
      expect(testInstance).toBeInstanceOf(ZoneFirewallAccessRulesV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = ZoneFirewallAccessRulesV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(ZoneFirewallAccessRulesV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ZoneFirewallAccessRulesV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ZoneFirewallAccessRulesV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(
        ZoneFirewallAccessRulesV1.DEFAULT_SERVICE_URL
      );
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new ZoneFirewallAccessRulesV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneIdentifier).toEqual(service.zoneIdentifier);
      });
    });
  });
  describe('listAllZoneAccessRules', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAllZoneAccessRules
        const notes = 'testString';
        const mode = 'block';
        const configurationTarget = 'ip';
        const configurationValue = '1.2.3.4';
        const page = 38;
        const perPage = 5;
        const order = 'configuration.target';
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

        const listAllZoneAccessRulesResult = zoneFirewallAccessRulesService.listAllZoneAccessRules(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listAllZoneAccessRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/firewall/access_rules/rules',
          'GET'
        );
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

        zoneFirewallAccessRulesService.listAllZoneAccessRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zoneFirewallAccessRulesService.listAllZoneAccessRules({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createZoneAccessRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ZoneAccessRuleInputConfiguration
      const zoneAccessRuleInputConfigurationModel = {
        target: 'ip',
        value:
          'ip example 198.51.100.4; ip_range example 198.51.100.4/16 ; asn example AS12345; country example AZ',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createZoneAccessRule
        const mode = 'block';
        const notes = 'This rule is added because of event X that occurred on date xyz';
        const configuration = zoneAccessRuleInputConfigurationModel;
        const params = {
          mode: mode,
          notes: notes,
          configuration: configuration,
        };

        const createZoneAccessRuleResult = zoneFirewallAccessRulesService.createZoneAccessRule(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createZoneAccessRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/firewall/access_rules/rules',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['mode']).toEqual(mode);
        expect(options.body['notes']).toEqual(notes);
        expect(options.body['configuration']).toEqual(configuration);
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

        zoneFirewallAccessRulesService.createZoneAccessRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zoneFirewallAccessRulesService.createZoneAccessRule({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteZoneAccessRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteZoneAccessRule
        const accessruleIdentifier = 'testString';
        const params = {
          accessruleIdentifier: accessruleIdentifier,
        };

        const deleteZoneAccessRuleResult = zoneFirewallAccessRulesService.deleteZoneAccessRule(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteZoneAccessRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/firewall/access_rules/rules/{accessrule_identifier}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
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

        zoneFirewallAccessRulesService.deleteZoneAccessRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await zoneFirewallAccessRulesService.deleteZoneAccessRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteZoneAccessRulePromise = zoneFirewallAccessRulesService.deleteZoneAccessRule();
        expectToBePromise(deleteZoneAccessRulePromise);

        deleteZoneAccessRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getZoneAccessRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getZoneAccessRule
        const accessruleIdentifier = 'testString';
        const params = {
          accessruleIdentifier: accessruleIdentifier,
        };

        const getZoneAccessRuleResult = zoneFirewallAccessRulesService.getZoneAccessRule(params);

        // all methods should return a Promise
        expectToBePromise(getZoneAccessRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/firewall/access_rules/rules/{accessrule_identifier}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
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

        zoneFirewallAccessRulesService.getZoneAccessRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await zoneFirewallAccessRulesService.getZoneAccessRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getZoneAccessRulePromise = zoneFirewallAccessRulesService.getZoneAccessRule();
        expectToBePromise(getZoneAccessRulePromise);

        getZoneAccessRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateZoneAccessRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateZoneAccessRule
        const accessruleIdentifier = 'testString';
        const mode = 'block';
        const notes = 'This rule is added because of event X that occurred on date xyz';
        const params = {
          accessruleIdentifier: accessruleIdentifier,
          mode: mode,
          notes: notes,
        };

        const updateZoneAccessRuleResult = zoneFirewallAccessRulesService.updateZoneAccessRule(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateZoneAccessRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/firewall/access_rules/rules/{accessrule_identifier}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['mode']).toEqual(mode);
        expect(options.body['notes']).toEqual(notes);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
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

        zoneFirewallAccessRulesService.updateZoneAccessRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await zoneFirewallAccessRulesService.updateZoneAccessRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateZoneAccessRulePromise = zoneFirewallAccessRulesService.updateZoneAccessRule();
        expectToBePromise(updateZoneAccessRulePromise);

        updateZoneAccessRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
