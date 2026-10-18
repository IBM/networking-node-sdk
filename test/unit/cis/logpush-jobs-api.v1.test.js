/**
 * (C) Copyright IBM Corp. 2026.
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
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const LogpushJobsApiV1 = require('../../../dist/cis/logpushjobsapiv1/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const logpushJobsApiServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  dataset: 'testString',
  zoneId: 'testString',
};

const logpushJobsApiService = new LogpushJobsApiV1(logpushJobsApiServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(logpushJobsApiService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('LogpushJobsApiV1', () => {
  beforeEach(() => {
    mock_createRequest();
    // these are changed when passed into the factory/constructor, so re-init
    requiredGlobals = {
      crn: 'testString',
      dataset: 'testString',
      zoneId: 'testString',
    };
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = LogpushJobsApiV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(LogpushJobsApiV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(LogpushJobsApiV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(LogpushJobsApiV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = LogpushJobsApiV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(LogpushJobsApiV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new LogpushJobsApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new LogpushJobsApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(LogpushJobsApiV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new LogpushJobsApiV1(logpushJobsApiServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(logpushJobsApiServiceOptions.crn);
        expect(serviceObj.dataset).toEqual(logpushJobsApiServiceOptions.dataset);
        expect(serviceObj.zoneId).toEqual(logpushJobsApiServiceOptions.zoneId);
      });
    });
  });

  describe('getLogpushJobsV2', () => {
    describe('positive tests', () => {
      function __getLogpushJobsV2Test() {
        // Construct the params object for operation getLogpushJobsV2
        const getLogpushJobsV2Params = {};

        const getLogpushJobsV2Result = logpushJobsApiService.getLogpushJobsV2(getLogpushJobsV2Params);

        // all methods should return a Promise
        expectToBePromise(getLogpushJobsV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/{crn}/zones/{zone_id}/logpush/jobs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(logpushJobsApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(logpushJobsApiServiceOptions.zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLogpushJobsV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.enableRetries();
        __getLogpushJobsV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.disableRetries();
        __getLogpushJobsV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLogpushJobsV2Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        logpushJobsApiService.getLogpushJobsV2(getLogpushJobsV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        logpushJobsApiService.getLogpushJobsV2({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createLogpushJobV2', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CreateLogpushJobV2RequestLogpushJobCosReq
      const createLogpushJobV2RequestModel = {
        name: 'My log push job',
        enabled: false,
        logpull_options: 'timestamps=rfc3339&timestamps=rfc3339',
        cos: { bucket_name: 'cos-bucket001', region: 'us-south', id: '231f5467-3072-4cb9-9e39-a906fa3032ea' },
        ownership_challenge: '00000000000000000000000000000000',
        dataset: 'http_requests',
        frequency: 'high',
      };

      function __createLogpushJobV2Test() {
        // Construct the params object for operation createLogpushJobV2
        const createLogpushJobV2Request = createLogpushJobV2RequestModel;
        const createLogpushJobV2Params = {
          createLogpushJobV2Request,
        };

        const createLogpushJobV2Result = logpushJobsApiService.createLogpushJobV2(createLogpushJobV2Params);

        // all methods should return a Promise
        expectToBePromise(createLogpushJobV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/{crn}/zones/{zone_id}/logpush/jobs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(createLogpushJobV2Request);
        expect(mockRequestOptions.path.crn).toEqual(logpushJobsApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(logpushJobsApiServiceOptions.zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createLogpushJobV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.enableRetries();
        __createLogpushJobV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.disableRetries();
        __createLogpushJobV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createLogpushJobV2Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        logpushJobsApiService.createLogpushJobV2(createLogpushJobV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        logpushJobsApiService.createLogpushJobV2({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getLogpushJobV2', () => {
    describe('positive tests', () => {
      function __getLogpushJobV2Test() {
        // Construct the params object for operation getLogpushJobV2
        const jobId = 'testString';
        const getLogpushJobV2Params = {
          jobId,
        };

        const getLogpushJobV2Result = logpushJobsApiService.getLogpushJobV2(getLogpushJobV2Params);

        // all methods should return a Promise
        expectToBePromise(getLogpushJobV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/{crn}/zones/{zone_id}/logpush/jobs/{job_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(logpushJobsApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(logpushJobsApiServiceOptions.zoneId);
        expect(mockRequestOptions.path.job_id).toEqual(jobId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLogpushJobV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.enableRetries();
        __getLogpushJobV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.disableRetries();
        __getLogpushJobV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const jobId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLogpushJobV2Params = {
          jobId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        logpushJobsApiService.getLogpushJobV2(getLogpushJobV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await logpushJobsApiService.getLogpushJobV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await logpushJobsApiService.getLogpushJobV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateLogpushJobV2', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // UpdateLogpushJobV2RequestLogpushJobsUpdateCosReq
      const updateLogpushJobV2RequestModel = {
        enabled: false,
        logpull_options: 'timestamps=rfc3339&timestamps=rfc3339',
        cos: { bucket_name: 'cos-bucket001', region: 'us-south', id: '231f5467-3072-4cb9-9e39-a906fa3032ea' },
        ownership_challenge: '00000000000000000000000000000000',
        frequency: 'high',
      };

      function __updateLogpushJobV2Test() {
        // Construct the params object for operation updateLogpushJobV2
        const jobId = 'testString';
        const updateLogpushJobV2Request = updateLogpushJobV2RequestModel;
        const updateLogpushJobV2Params = {
          jobId,
          updateLogpushJobV2Request,
        };

        const updateLogpushJobV2Result = logpushJobsApiService.updateLogpushJobV2(updateLogpushJobV2Params);

        // all methods should return a Promise
        expectToBePromise(updateLogpushJobV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/{crn}/zones/{zone_id}/logpush/jobs/{job_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(updateLogpushJobV2Request);
        expect(mockRequestOptions.path.crn).toEqual(logpushJobsApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(logpushJobsApiServiceOptions.zoneId);
        expect(mockRequestOptions.path.job_id).toEqual(jobId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateLogpushJobV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.enableRetries();
        __updateLogpushJobV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.disableRetries();
        __updateLogpushJobV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const jobId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateLogpushJobV2Params = {
          jobId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        logpushJobsApiService.updateLogpushJobV2(updateLogpushJobV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await logpushJobsApiService.updateLogpushJobV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await logpushJobsApiService.updateLogpushJobV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteLogpushJobV2', () => {
    describe('positive tests', () => {
      function __deleteLogpushJobV2Test() {
        // Construct the params object for operation deleteLogpushJobV2
        const jobId = 'testString';
        const deleteLogpushJobV2Params = {
          jobId,
        };

        const deleteLogpushJobV2Result = logpushJobsApiService.deleteLogpushJobV2(deleteLogpushJobV2Params);

        // all methods should return a Promise
        expectToBePromise(deleteLogpushJobV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/{crn}/zones/{zone_id}/logpush/jobs/{job_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(logpushJobsApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(logpushJobsApiServiceOptions.zoneId);
        expect(mockRequestOptions.path.job_id).toEqual(jobId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteLogpushJobV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.enableRetries();
        __deleteLogpushJobV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.disableRetries();
        __deleteLogpushJobV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const jobId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteLogpushJobV2Params = {
          jobId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        logpushJobsApiService.deleteLogpushJobV2(deleteLogpushJobV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await logpushJobsApiService.deleteLogpushJobV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await logpushJobsApiService.deleteLogpushJobV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getLogpushOwnershipV2', () => {
    describe('positive tests', () => {
      function __getLogpushOwnershipV2Test() {
        // Construct the params object for operation getLogpushOwnershipV2
        const cos = { bucket_name: 'cos-bucket001', region: 'us-south', id: '231f5467-3072-4cb9-9e39-a906fa3032ea' };
        const getLogpushOwnershipV2Params = {
          cos,
        };

        const getLogpushOwnershipV2Result = logpushJobsApiService.getLogpushOwnershipV2(getLogpushOwnershipV2Params);

        // all methods should return a Promise
        expectToBePromise(getLogpushOwnershipV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/{crn}/zones/{zone_id}/logpush/ownership', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.cos).toEqual(cos);
        expect(mockRequestOptions.path.crn).toEqual(logpushJobsApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(logpushJobsApiServiceOptions.zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLogpushOwnershipV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.enableRetries();
        __getLogpushOwnershipV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.disableRetries();
        __getLogpushOwnershipV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLogpushOwnershipV2Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        logpushJobsApiService.getLogpushOwnershipV2(getLogpushOwnershipV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        logpushJobsApiService.getLogpushOwnershipV2({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('validateLogpushOwnershipChallengeV2', () => {
    describe('positive tests', () => {
      function __validateLogpushOwnershipChallengeV2Test() {
        // Construct the params object for operation validateLogpushOwnershipChallengeV2
        const cos = { bucket_name: 'cos-bucket001', region: 'us-south', id: '231f5467-3072-4cb9-9e39-a906fa3032ea' };
        const ownershipChallenge = '00000000000000000000';
        const validateLogpushOwnershipChallengeV2Params = {
          cos,
          ownershipChallenge,
        };

        const validateLogpushOwnershipChallengeV2Result = logpushJobsApiService.validateLogpushOwnershipChallengeV2(validateLogpushOwnershipChallengeV2Params);

        // all methods should return a Promise
        expectToBePromise(validateLogpushOwnershipChallengeV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/{crn}/zones/{zone_id}/logpush/ownership/validate', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.cos).toEqual(cos);
        expect(mockRequestOptions.body.ownership_challenge).toEqual(ownershipChallenge);
        expect(mockRequestOptions.path.crn).toEqual(logpushJobsApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(logpushJobsApiServiceOptions.zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __validateLogpushOwnershipChallengeV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.enableRetries();
        __validateLogpushOwnershipChallengeV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.disableRetries();
        __validateLogpushOwnershipChallengeV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const validateLogpushOwnershipChallengeV2Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        logpushJobsApiService.validateLogpushOwnershipChallengeV2(validateLogpushOwnershipChallengeV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        logpushJobsApiService.validateLogpushOwnershipChallengeV2({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listFieldsForDatasetV2', () => {
    describe('positive tests', () => {
      function __listFieldsForDatasetV2Test() {
        // Construct the params object for operation listFieldsForDatasetV2
        const listFieldsForDatasetV2Params = {};

        const listFieldsForDatasetV2Result = logpushJobsApiService.listFieldsForDatasetV2(listFieldsForDatasetV2Params);

        // all methods should return a Promise
        expectToBePromise(listFieldsForDatasetV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/{crn}/zones/{zone_id}/logpush/datasets/{dataset}/fields', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(logpushJobsApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(logpushJobsApiServiceOptions.zoneId);
        expect(mockRequestOptions.path.dataset).toEqual(logpushJobsApiServiceOptions.dataset);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listFieldsForDatasetV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.enableRetries();
        __listFieldsForDatasetV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.disableRetries();
        __listFieldsForDatasetV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listFieldsForDatasetV2Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        logpushJobsApiService.listFieldsForDatasetV2(listFieldsForDatasetV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        logpushJobsApiService.listFieldsForDatasetV2({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listLogpushJobsForDatasetV2', () => {
    describe('positive tests', () => {
      function __listLogpushJobsForDatasetV2Test() {
        // Construct the params object for operation listLogpushJobsForDatasetV2
        const listLogpushJobsForDatasetV2Params = {};

        const listLogpushJobsForDatasetV2Result = logpushJobsApiService.listLogpushJobsForDatasetV2(listLogpushJobsForDatasetV2Params);

        // all methods should return a Promise
        expectToBePromise(listLogpushJobsForDatasetV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/{crn}/zones/{zone_id}/logpush/datasets/{dataset}/jobs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(logpushJobsApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(logpushJobsApiServiceOptions.zoneId);
        expect(mockRequestOptions.path.dataset).toEqual(logpushJobsApiServiceOptions.dataset);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLogpushJobsForDatasetV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.enableRetries();
        __listLogpushJobsForDatasetV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.disableRetries();
        __listLogpushJobsForDatasetV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLogpushJobsForDatasetV2Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        logpushJobsApiService.listLogpushJobsForDatasetV2(listLogpushJobsForDatasetV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        logpushJobsApiService.listLogpushJobsForDatasetV2({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getLogsRetention', () => {
    describe('positive tests', () => {
      function __getLogsRetentionTest() {
        // Construct the params object for operation getLogsRetention
        const getLogsRetentionParams = {};

        const getLogsRetentionResult = logpushJobsApiService.getLogsRetention(getLogsRetentionParams);

        // all methods should return a Promise
        expectToBePromise(getLogsRetentionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_id}/logs/retention', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(logpushJobsApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(logpushJobsApiServiceOptions.zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLogsRetentionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.enableRetries();
        __getLogsRetentionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.disableRetries();
        __getLogsRetentionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLogsRetentionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        logpushJobsApiService.getLogsRetention(getLogsRetentionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        logpushJobsApiService.getLogsRetention({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createLogRetention', () => {
    describe('positive tests', () => {
      function __createLogRetentionTest() {
        // Construct the params object for operation createLogRetention
        const flag = false;
        const createLogRetentionParams = {
          flag,
        };

        const createLogRetentionResult = logpushJobsApiService.createLogRetention(createLogRetentionParams);

        // all methods should return a Promise
        expectToBePromise(createLogRetentionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_id}/logs/retention', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.flag).toEqual(flag);
        expect(mockRequestOptions.path.crn).toEqual(logpushJobsApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(logpushJobsApiServiceOptions.zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createLogRetentionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.enableRetries();
        __createLogRetentionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        logpushJobsApiService.disableRetries();
        __createLogRetentionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createLogRetentionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        logpushJobsApiService.createLogRetention(createLogRetentionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        logpushJobsApiService.createLogRetention({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
