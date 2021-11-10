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

const ZoneLockdownV1 = require('../../../dist/cis/zonelockdownv1/v1');

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

const zoneLockdownService = new ZoneLockdownV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(zoneLockdownService, 'createRequest');
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

describe.skip('ZoneLockdownV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = ZoneLockdownV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(ZoneLockdownV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(ZoneLockdownV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(ZoneLockdownV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = ZoneLockdownV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(ZoneLockdownV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ZoneLockdownV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ZoneLockdownV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(ZoneLockdownV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new ZoneLockdownV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneIdentifier).toEqual(service.zoneIdentifier);
      });
    });
  });
  describe('listAllZoneLockownRules', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAllZoneLockownRules
        const page = 38;
        const perPage = 5;
        const params = {
          page: page,
          perPage: perPage,
        };

        const listAllZoneLockownRulesResult = zoneLockdownService.listAllZoneLockownRules(params);

        // all methods should return a Promise
        expectToBePromise(listAllZoneLockownRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/firewall/lockdowns', 'GET');
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

        zoneLockdownService.listAllZoneLockownRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zoneLockdownService.listAllZoneLockownRules({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createZoneLockdownRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LockdownInputConfigurationsItem
      const lockdownInputConfigurationsItemModel = {
        target: 'ip',
        value: '198.51.100.4 if target=ip, 2.2.2.0/24 if target=ip_range',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createZoneLockdownRule
        const urls = ['api.mysite.com/some/endpoint*'];
        const configurations = [lockdownInputConfigurationsItemModel];
        const id = '372e67954025e0ba6aaa6d586b9e0b59';
        const paused = false;
        const description =
          'Restrict access to these endpoints to requests from a known IP address';
        const priority = 5;
        const params = {
          urls: urls,
          configurations: configurations,
          id: id,
          paused: paused,
          description: description,
          priority: priority,
        };

        const createZoneLockdownRuleResult = zoneLockdownService.createZoneLockdownRule(params);

        // all methods should return a Promise
        expectToBePromise(createZoneLockdownRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/firewall/lockdowns', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['urls']).toEqual(urls);
        expect(options.body['configurations']).toEqual(configurations);
        expect(options.body['id']).toEqual(id);
        expect(options.body['paused']).toEqual(paused);
        expect(options.body['description']).toEqual(description);
        expect(options.body['priority']).toEqual(priority);
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

        zoneLockdownService.createZoneLockdownRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zoneLockdownService.createZoneLockdownRule({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteZoneLockdownRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteZoneLockdownRule
        const lockdownRuleIdentifier = 'testString';
        const params = {
          lockdownRuleIdentifier: lockdownRuleIdentifier,
        };

        const deleteZoneLockdownRuleResult = zoneLockdownService.deleteZoneLockdownRule(params);

        // all methods should return a Promise
        expectToBePromise(deleteZoneLockdownRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/firewall/lockdowns/{lockdown_rule_identifier}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['lockdown_rule_identifier']).toEqual(lockdownRuleIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const lockdownRuleIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          lockdownRuleIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zoneLockdownService.deleteZoneLockdownRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await zoneLockdownService.deleteZoneLockdownRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteZoneLockdownRulePromise = zoneLockdownService.deleteZoneLockdownRule();
        expectToBePromise(deleteZoneLockdownRulePromise);

        deleteZoneLockdownRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getLockdown', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLockdown
        const lockdownRuleIdentifier = 'testString';
        const params = {
          lockdownRuleIdentifier: lockdownRuleIdentifier,
        };

        const getLockdownResult = zoneLockdownService.getLockdown(params);

        // all methods should return a Promise
        expectToBePromise(getLockdownResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/firewall/lockdowns/{lockdown_rule_identifier}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['lockdown_rule_identifier']).toEqual(lockdownRuleIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const lockdownRuleIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          lockdownRuleIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zoneLockdownService.getLockdown(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await zoneLockdownService.getLockdown({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getLockdownPromise = zoneLockdownService.getLockdown();
        expectToBePromise(getLockdownPromise);

        getLockdownPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateLockdownRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LockdownInputConfigurationsItem
      const lockdownInputConfigurationsItemModel = {
        target: 'ip',
        value: '198.51.100.4 if target=ip, 2.2.2.0/24 if target=ip_range',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateLockdownRule
        const lockdownRuleIdentifier = 'testString';
        const urls = ['api.mysite.com/some/endpoint*'];
        const configurations = [lockdownInputConfigurationsItemModel];
        const id = '372e67954025e0ba6aaa6d586b9e0b59';
        const paused = false;
        const description =
          'Restrict access to these endpoints to requests from a known IP address';
        const priority = 5;
        const params = {
          lockdownRuleIdentifier: lockdownRuleIdentifier,
          urls: urls,
          configurations: configurations,
          id: id,
          paused: paused,
          description: description,
          priority: priority,
        };

        const updateLockdownRuleResult = zoneLockdownService.updateLockdownRule(params);

        // all methods should return a Promise
        expectToBePromise(updateLockdownRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/firewall/lockdowns/{lockdown_rule_identifier}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['urls']).toEqual(urls);
        expect(options.body['configurations']).toEqual(configurations);
        expect(options.body['id']).toEqual(id);
        expect(options.body['paused']).toEqual(paused);
        expect(options.body['description']).toEqual(description);
        expect(options.body['priority']).toEqual(priority);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['lockdown_rule_identifier']).toEqual(lockdownRuleIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const lockdownRuleIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          lockdownRuleIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zoneLockdownService.updateLockdownRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await zoneLockdownService.updateLockdownRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateLockdownRulePromise = zoneLockdownService.updateLockdownRule();
        expectToBePromise(updateLockdownRulePromise);

        updateLockdownRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
