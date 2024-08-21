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

const AlertsV1 = require('../../../dist/cis/alertsv1/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');


const alertsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
};

const alertsService = new AlertsV1(alertsServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(alertsService, 'createRequest');
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

describe('AlertsV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = AlertsV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(AlertsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(AlertsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(AlertsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = AlertsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(AlertsV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AlertsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AlertsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(AlertsV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new AlertsV1(alertsServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(alertsServiceOptions.crn);
      });
    });
  });
  describe('getAlertPolicies', () => {
    describe('positive tests', () => {
      function __getAlertPoliciesTest() {
        // Construct the params object for operation getAlertPolicies
        const params = {};

        const getAlertPoliciesResult = alertsService.getAlertPolicies(params);

        // all methods should return a Promise
        expectToBePromise(getAlertPoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/alerting/policies', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(alertsServiceOptions.crn);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAlertPoliciesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        alertsService.enableRetries();
        __getAlertPoliciesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        alertsService.disableRetries();
        __getAlertPoliciesTest();
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

        alertsService.getAlertPolicies(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        alertsService.getAlertPolicies({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createAlertPolicy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CreateAlertPolicyInputMechanismsEmailItem
      const createAlertPolicyInputMechanismsEmailItemModel = {
        id: 'mynotifications@email.com',
      };

      // CreateAlertPolicyInputMechanismsWebhooksItem
      const createAlertPolicyInputMechanismsWebhooksItemModel = {
        id: 'f0413b106d2c4aa9b1553d5d0209c522',
      };

      // CreateAlertPolicyInputMechanisms
      const createAlertPolicyInputMechanismsModel = {
        email: [createAlertPolicyInputMechanismsEmailItemModel],
        webhooks: [createAlertPolicyInputMechanismsWebhooksItemModel],
      };

      function __createAlertPolicyTest() {
        // Construct the params object for operation createAlertPolicy
        const name = 'My Alert Policy';
        const enabled = true;
        const alertType = 'dos_attack_l7';
        const mechanisms = createAlertPolicyInputMechanismsModel;
        const description = 'A description for my alert policy';
        const filters = { foo: 'bar' };
        const conditions = { foo: 'bar' };
        const params = {
          name: name,
          enabled: enabled,
          alertType: alertType,
          mechanisms: mechanisms,
          description: description,
          filters: filters,
          conditions: conditions,
        };

        const createAlertPolicyResult = alertsService.createAlertPolicy(params);

        // all methods should return a Promise
        expectToBePromise(createAlertPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/alerting/policies', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.alert_type).toEqual(alertType);
        expect(mockRequestOptions.body.mechanisms).toEqual(mechanisms);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.filters).toEqual(filters);
        expect(mockRequestOptions.body.conditions).toEqual(conditions);
        expect(mockRequestOptions.path.crn).toEqual(alertsServiceOptions.crn);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAlertPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        alertsService.enableRetries();
        __createAlertPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        alertsService.disableRetries();
        __createAlertPolicyTest();
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

        alertsService.createAlertPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        alertsService.createAlertPolicy({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getAlertPolicy', () => {
    describe('positive tests', () => {
      function __getAlertPolicyTest() {
        // Construct the params object for operation getAlertPolicy
        const policyId = 'testString';
        const params = {
          policyId: policyId,
        };

        const getAlertPolicyResult = alertsService.getAlertPolicy(params);

        // all methods should return a Promise
        expectToBePromise(getAlertPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/alerting/policies/{policy_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(alertsServiceOptions.crn);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAlertPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        alertsService.enableRetries();
        __getAlertPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        alertsService.disableRetries();
        __getAlertPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          policyId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        alertsService.getAlertPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await alertsService.getAlertPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await alertsService.getAlertPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateAlertPolicy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // UpdateAlertPolicyInputMechanismsEmailItem
      const updateAlertPolicyInputMechanismsEmailItemModel = {
        id: 'mynotifications@email.com',
      };

      // UpdateAlertPolicyInputMechanismsWebhooksItem
      const updateAlertPolicyInputMechanismsWebhooksItemModel = {
        id: 'f0413b106d2c4aa9b1553d5d0209c522',
      };

      // UpdateAlertPolicyInputMechanisms
      const updateAlertPolicyInputMechanismsModel = {
        email: [updateAlertPolicyInputMechanismsEmailItemModel],
        webhooks: [updateAlertPolicyInputMechanismsWebhooksItemModel],
      };

      function __updateAlertPolicyTest() {
        // Construct the params object for operation updateAlertPolicy
        const policyId = 'testString';
        const name = 'My Alert Policy';
        const enabled = true;
        const alertType = 'dos_attack_l7';
        const mechanisms = updateAlertPolicyInputMechanismsModel;
        const conditions = { foo: 'bar' };
        const description = 'A description for my alert policy';
        const filters = { foo: 'bar' };
        const params = {
          policyId: policyId,
          name: name,
          enabled: enabled,
          alertType: alertType,
          mechanisms: mechanisms,
          conditions: conditions,
          description: description,
          filters: filters,
        };

        const updateAlertPolicyResult = alertsService.updateAlertPolicy(params);

        // all methods should return a Promise
        expectToBePromise(updateAlertPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/alerting/policies/{policy_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.alert_type).toEqual(alertType);
        expect(mockRequestOptions.body.mechanisms).toEqual(mechanisms);
        expect(mockRequestOptions.body.conditions).toEqual(conditions);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.filters).toEqual(filters);
        expect(mockRequestOptions.path.crn).toEqual(alertsServiceOptions.crn);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAlertPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        alertsService.enableRetries();
        __updateAlertPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        alertsService.disableRetries();
        __updateAlertPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          policyId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        alertsService.updateAlertPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await alertsService.updateAlertPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await alertsService.updateAlertPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteAlertPolicy', () => {
    describe('positive tests', () => {
      function __deleteAlertPolicyTest() {
        // Construct the params object for operation deleteAlertPolicy
        const policyId = 'testString';
        const params = {
          policyId: policyId,
        };

        const deleteAlertPolicyResult = alertsService.deleteAlertPolicy(params);

        // all methods should return a Promise
        expectToBePromise(deleteAlertPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/alerting/policies/{policy_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(alertsServiceOptions.crn);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAlertPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        alertsService.enableRetries();
        __deleteAlertPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        alertsService.disableRetries();
        __deleteAlertPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          policyId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        alertsService.deleteAlertPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await alertsService.deleteAlertPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await alertsService.deleteAlertPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
