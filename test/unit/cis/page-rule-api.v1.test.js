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

const PageRuleApiV1 = require('../../../dist/cis/page-rule-api/v1');

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
  zoneId: 'testString',
};

const pageRuleApiService = new PageRuleApiV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(pageRuleApiService, 'createRequest');
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

describe('PageRuleApiV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = PageRuleApiV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(PageRuleApiV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(PageRuleApiV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(PageRuleApiV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = PageRuleApiV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(PageRuleApiV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new PageRuleApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new PageRuleApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(PageRuleApiV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new PageRuleApiV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneId).toEqual(service.zoneId);
      });
    });
  });
  describe('getPageRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getPageRule
        const ruleId = 'testString';
        const params = {
          ruleId: ruleId,
        };

        const getPageRuleResult = pageRuleApiService.getPageRule(params);

        // all methods should return a Promise
        expectToBePromise(getPageRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_id}/pagerules/{rule_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_id']).toEqual(service.zoneId);
        expect(options.path['rule_id']).toEqual(ruleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        pageRuleApiService.getPageRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await pageRuleApiService.getPageRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const getPageRulePromise = pageRuleApiService.getPageRule();
        expectToBePromise(getPageRulePromise);

        getPageRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('changePageRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TargetsItemConstraint
      const targetsItemConstraintModel = {
        operator: 'matches',
        value: '*example.com/images/*',
      };

      // TargetsItem
      const targetsItemModel = {
        target: 'url',
        constraint: targetsItemConstraintModel,
      };

      // PageRulesBodyActionsItemActionsSecurity
      const pageRulesBodyActionsItemModel = {
        value: { foo: 'bar' },
        id: 'disable_security',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation changePageRule
        const ruleId = 'testString';
        const targets = [targetsItemModel];
        const actions = [pageRulesBodyActionsItemModel];
        const priority = 1;
        const status = 'active';
        const params = {
          ruleId: ruleId,
          targets: targets,
          actions: actions,
          priority: priority,
          status: status,
        };

        const changePageRuleResult = pageRuleApiService.changePageRule(params);

        // all methods should return a Promise
        expectToBePromise(changePageRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_id}/pagerules/{rule_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['targets']).toEqual(targets);
        expect(options.body['actions']).toEqual(actions);
        expect(options.body['priority']).toEqual(priority);
        expect(options.body['status']).toEqual(status);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_id']).toEqual(service.zoneId);
        expect(options.path['rule_id']).toEqual(ruleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        pageRuleApiService.changePageRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await pageRuleApiService.changePageRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const changePageRulePromise = pageRuleApiService.changePageRule();
        expectToBePromise(changePageRulePromise);

        changePageRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updatePageRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TargetsItemConstraint
      const targetsItemConstraintModel = {
        operator: 'matches',
        value: '*example.com/images/*',
      };

      // TargetsItem
      const targetsItemModel = {
        target: 'url',
        constraint: targetsItemConstraintModel,
      };

      // PageRulesBodyActionsItemActionsSecurity
      const pageRulesBodyActionsItemModel = {
        value: { foo: 'bar' },
        id: 'disable_security',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updatePageRule
        const ruleId = 'testString';
        const targets = [targetsItemModel];
        const actions = [pageRulesBodyActionsItemModel];
        const priority = 1;
        const status = 'active';
        const params = {
          ruleId: ruleId,
          targets: targets,
          actions: actions,
          priority: priority,
          status: status,
        };

        const updatePageRuleResult = pageRuleApiService.updatePageRule(params);

        // all methods should return a Promise
        expectToBePromise(updatePageRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_id}/pagerules/{rule_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['targets']).toEqual(targets);
        expect(options.body['actions']).toEqual(actions);
        expect(options.body['priority']).toEqual(priority);
        expect(options.body['status']).toEqual(status);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_id']).toEqual(service.zoneId);
        expect(options.path['rule_id']).toEqual(ruleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        pageRuleApiService.updatePageRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await pageRuleApiService.updatePageRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const updatePageRulePromise = pageRuleApiService.updatePageRule();
        expectToBePromise(updatePageRulePromise);

        updatePageRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deletePageRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deletePageRule
        const ruleId = 'testString';
        const params = {
          ruleId: ruleId,
        };

        const deletePageRuleResult = pageRuleApiService.deletePageRule(params);

        // all methods should return a Promise
        expectToBePromise(deletePageRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_id}/pagerules/{rule_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_id']).toEqual(service.zoneId);
        expect(options.path['rule_id']).toEqual(ruleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        pageRuleApiService.deletePageRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await pageRuleApiService.deletePageRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const deletePageRulePromise = pageRuleApiService.deletePageRule();
        expectToBePromise(deletePageRulePromise);

        deletePageRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listPageRules', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listPageRules
        const status = 'active';
        const order = 'status';
        const direction = 'desc';
        const match = 'all';
        const params = {
          status: status,
          order: order,
          direction: direction,
          match: match,
        };

        const listPageRulesResult = pageRuleApiService.listPageRules(params);

        // all methods should return a Promise
        expectToBePromise(listPageRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_id}/pagerules', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['status']).toEqual(status);
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

        pageRuleApiService.listPageRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        pageRuleApiService.listPageRules({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createPageRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TargetsItemConstraint
      const targetsItemConstraintModel = {
        operator: 'matches',
        value: '*example.com/images/*',
      };

      // TargetsItem
      const targetsItemModel = {
        target: 'url',
        constraint: targetsItemConstraintModel,
      };

      // PageRulesBodyActionsItemActionsSecurity
      const pageRulesBodyActionsItemModel = {
        value: { foo: 'bar' },
        id: 'disable_security',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createPageRule
        const targets = [targetsItemModel];
        const actions = [pageRulesBodyActionsItemModel];
        const priority = 1;
        const status = 'active';
        const params = {
          targets: targets,
          actions: actions,
          priority: priority,
          status: status,
        };

        const createPageRuleResult = pageRuleApiService.createPageRule(params);

        // all methods should return a Promise
        expectToBePromise(createPageRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_id}/pagerules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['targets']).toEqual(targets);
        expect(options.body['actions']).toEqual(actions);
        expect(options.body['priority']).toEqual(priority);
        expect(options.body['status']).toEqual(status);
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

        pageRuleApiService.createPageRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        pageRuleApiService.createPageRule({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
