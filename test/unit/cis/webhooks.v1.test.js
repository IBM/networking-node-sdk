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

const WebhooksV1 = require('../../../dist/cis/webhooksv1/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const webhooksServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
};

const webhooksService = new WebhooksV1(webhooksServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(webhooksService, 'createRequest');
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

describe('WebhooksV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = WebhooksV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(WebhooksV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(WebhooksV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(WebhooksV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = WebhooksV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(WebhooksV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new WebhooksV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new WebhooksV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(WebhooksV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new WebhooksV1(webhooksServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(webhooksServiceOptions.crn);
      });
    });
  });
  describe('getAlertWebhooks', () => {
    describe('positive tests', () => {
      function __getAlertWebhooksTest() {
        // Construct the params object for operation getAlertWebhooks
        const params = {};

        const getAlertWebhooksResult = webhooksService.getAlertWebhooks(params);

        // all methods should return a Promise
        expectToBePromise(getAlertWebhooksResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/alerting/destinations/webhooks', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(webhooksServiceOptions.crn);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAlertWebhooksTest();

        // enable retries and test again
        createRequestMock.mockClear();
        webhooksService.enableRetries();
        __getAlertWebhooksTest();

        // disable retries and test again
        createRequestMock.mockClear();
        webhooksService.disableRetries();
        __getAlertWebhooksTest();
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

        webhooksService.getAlertWebhooks(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        webhooksService.getAlertWebhooks({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createAlertWebhook', () => {
    describe('positive tests', () => {
      function __createAlertWebhookTest() {
        // Construct the params object for operation createAlertWebhook
        const name = 'My Slack Alert Webhook';
        const url = 'https://hooks.slack.com/services/Ds3fdBFbV/456464Gdd';
        const secret = 'ff1d9b80-b51d-4a06-bf67-6752fae1eb74';
        const params = {
          name: name,
          url: url,
          secret: secret,
        };

        const createAlertWebhookResult = webhooksService.createAlertWebhook(params);

        // all methods should return a Promise
        expectToBePromise(createAlertWebhookResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/alerting/destinations/webhooks', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.url).toEqual(url);
        expect(mockRequestOptions.body.secret).toEqual(secret);
        expect(mockRequestOptions.path.crn).toEqual(webhooksServiceOptions.crn);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAlertWebhookTest();

        // enable retries and test again
        createRequestMock.mockClear();
        webhooksService.enableRetries();
        __createAlertWebhookTest();

        // disable retries and test again
        createRequestMock.mockClear();
        webhooksService.disableRetries();
        __createAlertWebhookTest();
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

        webhooksService.createAlertWebhook(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        webhooksService.createAlertWebhook({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getAlertWebhook', () => {
    describe('positive tests', () => {
      function __getAlertWebhookTest() {
        // Construct the params object for operation getAlertWebhook
        const webhookId = 'testString';
        const params = {
          webhookId: webhookId,
        };

        const getAlertWebhookResult = webhooksService.getAlertWebhook(params);

        // all methods should return a Promise
        expectToBePromise(getAlertWebhookResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/alerting/destinations/webhooks/{webhook_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(webhooksServiceOptions.crn);
        expect(mockRequestOptions.path.webhook_id).toEqual(webhookId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAlertWebhookTest();

        // enable retries and test again
        createRequestMock.mockClear();
        webhooksService.enableRetries();
        __getAlertWebhookTest();

        // disable retries and test again
        createRequestMock.mockClear();
        webhooksService.disableRetries();
        __getAlertWebhookTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const webhookId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          webhookId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        webhooksService.getAlertWebhook(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await webhooksService.getAlertWebhook({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await webhooksService.getAlertWebhook();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateAlertWebhook', () => {
    describe('positive tests', () => {
      function __updateAlertWebhookTest() {
        // Construct the params object for operation updateAlertWebhook
        const webhookId = 'testString';
        const name = 'My Slack Alert Webhook';
        const url = 'https://hooks.slack.com/services/Ds3fdBFbV/456464Gdd';
        const secret = 'ff1d9b80-b51d-4a06-bf67-6752fae1eb74';
        const params = {
          webhookId: webhookId,
          name: name,
          url: url,
          secret: secret,
        };

        const updateAlertWebhookResult = webhooksService.updateAlertWebhook(params);

        // all methods should return a Promise
        expectToBePromise(updateAlertWebhookResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/alerting/destinations/webhooks/{webhook_id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.url).toEqual(url);
        expect(mockRequestOptions.body.secret).toEqual(secret);
        expect(mockRequestOptions.path.crn).toEqual(webhooksServiceOptions.crn);
        expect(mockRequestOptions.path.webhook_id).toEqual(webhookId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAlertWebhookTest();

        // enable retries and test again
        createRequestMock.mockClear();
        webhooksService.enableRetries();
        __updateAlertWebhookTest();

        // disable retries and test again
        createRequestMock.mockClear();
        webhooksService.disableRetries();
        __updateAlertWebhookTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const webhookId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          webhookId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        webhooksService.updateAlertWebhook(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await webhooksService.updateAlertWebhook({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await webhooksService.updateAlertWebhook();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteAlertWebhook', () => {
    describe('positive tests', () => {
      function __deleteAlertWebhookTest() {
        // Construct the params object for operation deleteAlertWebhook
        const webhookId = 'testString';
        const params = {
          webhookId: webhookId,
        };

        const deleteAlertWebhookResult = webhooksService.deleteAlertWebhook(params);

        // all methods should return a Promise
        expectToBePromise(deleteAlertWebhookResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/alerting/destinations/webhooks/{webhook_id}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(webhooksServiceOptions.crn);
        expect(mockRequestOptions.path.webhook_id).toEqual(webhookId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAlertWebhookTest();

        // enable retries and test again
        createRequestMock.mockClear();
        webhooksService.enableRetries();
        __deleteAlertWebhookTest();

        // disable retries and test again
        createRequestMock.mockClear();
        webhooksService.disableRetries();
        __deleteAlertWebhookTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const webhookId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          webhookId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        webhooksService.deleteAlertWebhook(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await webhooksService.deleteAlertWebhook({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await webhooksService.deleteAlertWebhook();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
