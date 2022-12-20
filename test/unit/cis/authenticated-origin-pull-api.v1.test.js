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

const AuthenticatedOriginPullApiV1 = require('../../../dist/cis/authenticated-origin-pull-apiv1/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const authenticatedOriginPullApiServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  zoneIdentifier: 'testString',
};

const authenticatedOriginPullApiService = new AuthenticatedOriginPullApiV1(
  authenticatedOriginPullApiServiceOptions
);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(authenticatedOriginPullApiService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('AuthenticatedOriginPullApiV1', () => {
  beforeEach(() => {
    mock_createRequest();
    // these are changed when passed into the factory/constructor, so re-init
    requiredGlobals = {
      crn: 'testString',
      zoneIdentifier: 'testString',
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
      const testInstance = AuthenticatedOriginPullApiV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(
        AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_NAME
      );
      expect(testInstance.baseOptions.serviceUrl).toBe(
        AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_URL
      );
      expect(testInstance).toBeInstanceOf(AuthenticatedOriginPullApiV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = AuthenticatedOriginPullApiV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(AuthenticatedOriginPullApiV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AuthenticatedOriginPullApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new AuthenticatedOriginPullApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(
        AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_URL
      );
    });
  });

  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new AuthenticatedOriginPullApiV1(
          authenticatedOriginPullApiServiceOptions
        );
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(authenticatedOriginPullApiServiceOptions.crn);
        expect(serviceObj.zoneIdentifier).toEqual(
          authenticatedOriginPullApiServiceOptions.zoneIdentifier
        );
      });
    });
  });

  describe('getZoneOriginPullSettings', () => {
    describe('positive tests', () => {
      function __getZoneOriginPullSettingsTest() {
        // Construct the params object for operation getZoneOriginPullSettings
        const xCorrelationId = 'testString';
        const getZoneOriginPullSettingsParams = {
          xCorrelationId,
        };

        const getZoneOriginPullSettingsResult = authenticatedOriginPullApiService.getZoneOriginPullSettings(
          getZoneOriginPullSettingsParams
        );

        // all methods should return a Promise
        expectToBePromise(getZoneOriginPullSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/settings',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(authenticatedOriginPullApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(
          authenticatedOriginPullApiServiceOptions.zoneIdentifier
        );
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getZoneOriginPullSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.enableRetries();
        __getZoneOriginPullSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.disableRetries();
        __getZoneOriginPullSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getZoneOriginPullSettingsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        authenticatedOriginPullApiService.getZoneOriginPullSettings(
          getZoneOriginPullSettingsParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        authenticatedOriginPullApiService.getZoneOriginPullSettings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('setZoneOriginPullSettings', () => {
    describe('positive tests', () => {
      function __setZoneOriginPullSettingsTest() {
        // Construct the params object for operation setZoneOriginPullSettings
        const enabled = true;
        const xCorrelationId = 'testString';
        const setZoneOriginPullSettingsParams = {
          enabled,
          xCorrelationId,
        };

        const setZoneOriginPullSettingsResult = authenticatedOriginPullApiService.setZoneOriginPullSettings(
          setZoneOriginPullSettingsParams
        );

        // all methods should return a Promise
        expectToBePromise(setZoneOriginPullSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/settings',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.path.crn).toEqual(authenticatedOriginPullApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(
          authenticatedOriginPullApiServiceOptions.zoneIdentifier
        );
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __setZoneOriginPullSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.enableRetries();
        __setZoneOriginPullSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.disableRetries();
        __setZoneOriginPullSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const setZoneOriginPullSettingsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        authenticatedOriginPullApiService.setZoneOriginPullSettings(
          setZoneOriginPullSettingsParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        authenticatedOriginPullApiService.setZoneOriginPullSettings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listZoneOriginPullCertificates', () => {
    describe('positive tests', () => {
      function __listZoneOriginPullCertificatesTest() {
        // Construct the params object for operation listZoneOriginPullCertificates
        const xCorrelationId = 'testString';
        const listZoneOriginPullCertificatesParams = {
          xCorrelationId,
        };

        const listZoneOriginPullCertificatesResult = authenticatedOriginPullApiService.listZoneOriginPullCertificates(
          listZoneOriginPullCertificatesParams
        );

        // all methods should return a Promise
        expectToBePromise(listZoneOriginPullCertificatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(authenticatedOriginPullApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(
          authenticatedOriginPullApiServiceOptions.zoneIdentifier
        );
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listZoneOriginPullCertificatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.enableRetries();
        __listZoneOriginPullCertificatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.disableRetries();
        __listZoneOriginPullCertificatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listZoneOriginPullCertificatesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        authenticatedOriginPullApiService.listZoneOriginPullCertificates(
          listZoneOriginPullCertificatesParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        authenticatedOriginPullApiService.listZoneOriginPullCertificates({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('uploadZoneOriginPullCertificate', () => {
    describe('positive tests', () => {
      function __uploadZoneOriginPullCertificateTest() {
        // Construct the params object for operation uploadZoneOriginPullCertificate
        const certificate = '-----BEGIN CERTIFICATE-----\n......\n-----END CERTIFICATE-----\n';
        const privateKey =
          '-----BEGIN RSA PRIVATE KEY-----\n......\n-----END RSA PRIVATE KEY-----\n';
        const xCorrelationId = 'testString';
        const uploadZoneOriginPullCertificateParams = {
          certificate,
          privateKey,
          xCorrelationId,
        };

        const uploadZoneOriginPullCertificateResult = authenticatedOriginPullApiService.uploadZoneOriginPullCertificate(
          uploadZoneOriginPullCertificateParams
        );

        // all methods should return a Promise
        expectToBePromise(uploadZoneOriginPullCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.certificate).toEqual(certificate);
        expect(mockRequestOptions.body.private_key).toEqual(privateKey);
        expect(mockRequestOptions.path.crn).toEqual(authenticatedOriginPullApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(
          authenticatedOriginPullApiServiceOptions.zoneIdentifier
        );
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __uploadZoneOriginPullCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.enableRetries();
        __uploadZoneOriginPullCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.disableRetries();
        __uploadZoneOriginPullCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const uploadZoneOriginPullCertificateParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        authenticatedOriginPullApiService.uploadZoneOriginPullCertificate(
          uploadZoneOriginPullCertificateParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        authenticatedOriginPullApiService.uploadZoneOriginPullCertificate({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getZoneOriginPullCertificate', () => {
    describe('positive tests', () => {
      function __getZoneOriginPullCertificateTest() {
        // Construct the params object for operation getZoneOriginPullCertificate
        const certIdentifier = 'testString';
        const xCorrelationId = 'testString';
        const getZoneOriginPullCertificateParams = {
          certIdentifier,
          xCorrelationId,
        };

        const getZoneOriginPullCertificateResult = authenticatedOriginPullApiService.getZoneOriginPullCertificate(
          getZoneOriginPullCertificateParams
        );

        // all methods should return a Promise
        expectToBePromise(getZoneOriginPullCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/{cert_identifier}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(authenticatedOriginPullApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(
          authenticatedOriginPullApiServiceOptions.zoneIdentifier
        );
        expect(mockRequestOptions.path.cert_identifier).toEqual(certIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getZoneOriginPullCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.enableRetries();
        __getZoneOriginPullCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.disableRetries();
        __getZoneOriginPullCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const certIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getZoneOriginPullCertificateParams = {
          certIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        authenticatedOriginPullApiService.getZoneOriginPullCertificate(
          getZoneOriginPullCertificateParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await authenticatedOriginPullApiService.getZoneOriginPullCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await authenticatedOriginPullApiService.getZoneOriginPullCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteZoneOriginPullCertificate', () => {
    describe('positive tests', () => {
      function __deleteZoneOriginPullCertificateTest() {
        // Construct the params object for operation deleteZoneOriginPullCertificate
        const certIdentifier = 'testString';
        const xCorrelationId = 'testString';
        const deleteZoneOriginPullCertificateParams = {
          certIdentifier,
          xCorrelationId,
        };

        const deleteZoneOriginPullCertificateResult = authenticatedOriginPullApiService.deleteZoneOriginPullCertificate(
          deleteZoneOriginPullCertificateParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteZoneOriginPullCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/{cert_identifier}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(authenticatedOriginPullApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(
          authenticatedOriginPullApiServiceOptions.zoneIdentifier
        );
        expect(mockRequestOptions.path.cert_identifier).toEqual(certIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteZoneOriginPullCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.enableRetries();
        __deleteZoneOriginPullCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.disableRetries();
        __deleteZoneOriginPullCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const certIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteZoneOriginPullCertificateParams = {
          certIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        authenticatedOriginPullApiService.deleteZoneOriginPullCertificate(
          deleteZoneOriginPullCertificateParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await authenticatedOriginPullApiService.deleteZoneOriginPullCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await authenticatedOriginPullApiService.deleteZoneOriginPullCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAllPerHostnameAuthenticatedOriginPullSettings', () => {
    describe('positive tests', () => {
      function __listAllPerHostnameAuthenticatedOriginPullSettingsTest() {
        // Construct the params object for operation listAllPerHostnameAuthenticatedOriginPullSettings
        const xCorrelationId = 'testString';
        const listAllPerHostnameAuthenticatedOriginPullSettingsParams = {
          xCorrelationId,
        };

        const listAllPerHostnameAuthenticatedOriginPullSettingsResult = authenticatedOriginPullApiService.listAllPerHostnameAuthenticatedOriginPullSettings(
          listAllPerHostnameAuthenticatedOriginPullSettingsParams
        );

        // all methods should return a Promise
        expectToBePromise(listAllPerHostnameAuthenticatedOriginPullSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/hostnames',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(authenticatedOriginPullApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(
          authenticatedOriginPullApiServiceOptions.zoneIdentifier
        );
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAllPerHostnameAuthenticatedOriginPullSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.enableRetries();
        __listAllPerHostnameAuthenticatedOriginPullSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.disableRetries();
        __listAllPerHostnameAuthenticatedOriginPullSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAllPerHostnameAuthenticatedOriginPullSettingsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        authenticatedOriginPullApiService.listAllPerHostnameAuthenticatedOriginPullSettings(
          listAllPerHostnameAuthenticatedOriginPullSettingsParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        authenticatedOriginPullApiService.listAllPerHostnameAuthenticatedOriginPullSettings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('setHostnameOriginPullSettings', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // HostnameOriginPullSettings
      const hostnameOriginPullSettingsModel = {
        hostname: 'app.example.com',
        cert_id: '2458ce5a-0c35-4c7f-82c7-8e9487d3ff60',
        enabled: true,
      };

      function __setHostnameOriginPullSettingsTest() {
        // Construct the params object for operation setHostnameOriginPullSettings
        const config = [hostnameOriginPullSettingsModel];
        const xCorrelationId = 'testString';
        const setHostnameOriginPullSettingsParams = {
          config,
          xCorrelationId,
        };

        const setHostnameOriginPullSettingsResult = authenticatedOriginPullApiService.setHostnameOriginPullSettings(
          setHostnameOriginPullSettingsParams
        );

        // all methods should return a Promise
        expectToBePromise(setHostnameOriginPullSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/hostnames',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.config).toEqual(config);
        expect(mockRequestOptions.path.crn).toEqual(authenticatedOriginPullApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(
          authenticatedOriginPullApiServiceOptions.zoneIdentifier
        );
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __setHostnameOriginPullSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.enableRetries();
        __setHostnameOriginPullSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.disableRetries();
        __setHostnameOriginPullSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const setHostnameOriginPullSettingsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        authenticatedOriginPullApiService.setHostnameOriginPullSettings(
          setHostnameOriginPullSettingsParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        authenticatedOriginPullApiService.setHostnameOriginPullSettings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getHostnameOriginPullSettings', () => {
    describe('positive tests', () => {
      function __getHostnameOriginPullSettingsTest() {
        // Construct the params object for operation getHostnameOriginPullSettings
        const hostname = 'testString';
        const xCorrelationId = 'testString';
        const getHostnameOriginPullSettingsParams = {
          hostname,
          xCorrelationId,
        };

        const getHostnameOriginPullSettingsResult = authenticatedOriginPullApiService.getHostnameOriginPullSettings(
          getHostnameOriginPullSettingsParams
        );

        // all methods should return a Promise
        expectToBePromise(getHostnameOriginPullSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/hostnames/{hostname}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(authenticatedOriginPullApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(
          authenticatedOriginPullApiServiceOptions.zoneIdentifier
        );
        expect(mockRequestOptions.path.hostname).toEqual(hostname);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getHostnameOriginPullSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.enableRetries();
        __getHostnameOriginPullSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.disableRetries();
        __getHostnameOriginPullSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const hostname = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getHostnameOriginPullSettingsParams = {
          hostname,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        authenticatedOriginPullApiService.getHostnameOriginPullSettings(
          getHostnameOriginPullSettingsParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await authenticatedOriginPullApiService.getHostnameOriginPullSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await authenticatedOriginPullApiService.getHostnameOriginPullSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAllPerHostnameAuthenticatedOriginPullCertificates', () => {
    describe('positive tests', () => {
      function __listAllPerHostnameAuthenticatedOriginPullCertificatesTest() {
        // Construct the params object for operation listAllPerHostnameAuthenticatedOriginPullCertificates
        const xCorrelationId = 'testString';
        const listAllPerHostnameAuthenticatedOriginPullCertificatesParams = {
          xCorrelationId,
        };

        const listAllPerHostnameAuthenticatedOriginPullCertificatesResult = authenticatedOriginPullApiService.listAllPerHostnameAuthenticatedOriginPullCertificates(
          listAllPerHostnameAuthenticatedOriginPullCertificatesParams
        );

        // all methods should return a Promise
        expectToBePromise(listAllPerHostnameAuthenticatedOriginPullCertificatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/hostnames/certificates',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(authenticatedOriginPullApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(
          authenticatedOriginPullApiServiceOptions.zoneIdentifier
        );
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAllPerHostnameAuthenticatedOriginPullCertificatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.enableRetries();
        __listAllPerHostnameAuthenticatedOriginPullCertificatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.disableRetries();
        __listAllPerHostnameAuthenticatedOriginPullCertificatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAllPerHostnameAuthenticatedOriginPullCertificatesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        authenticatedOriginPullApiService.listAllPerHostnameAuthenticatedOriginPullCertificates(
          listAllPerHostnameAuthenticatedOriginPullCertificatesParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        authenticatedOriginPullApiService.listAllPerHostnameAuthenticatedOriginPullCertificates({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('uploadHostnameOriginPullCertificate', () => {
    describe('positive tests', () => {
      function __uploadHostnameOriginPullCertificateTest() {
        // Construct the params object for operation uploadHostnameOriginPullCertificate
        const certificate = '-----BEGIN CERTIFICATE-----\n......\n-----END CERTIFICATE-----\n';
        const privateKey =
          '-----BEGIN RSA PRIVATE KEY-----\n......\n-----END RSA PRIVATE KEY-----\n';
        const xCorrelationId = 'testString';
        const uploadHostnameOriginPullCertificateParams = {
          certificate,
          privateKey,
          xCorrelationId,
        };

        const uploadHostnameOriginPullCertificateResult = authenticatedOriginPullApiService.uploadHostnameOriginPullCertificate(
          uploadHostnameOriginPullCertificateParams
        );

        // all methods should return a Promise
        expectToBePromise(uploadHostnameOriginPullCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/hostnames/certificates',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.certificate).toEqual(certificate);
        expect(mockRequestOptions.body.private_key).toEqual(privateKey);
        expect(mockRequestOptions.path.crn).toEqual(authenticatedOriginPullApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(
          authenticatedOriginPullApiServiceOptions.zoneIdentifier
        );
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __uploadHostnameOriginPullCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.enableRetries();
        __uploadHostnameOriginPullCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.disableRetries();
        __uploadHostnameOriginPullCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const uploadHostnameOriginPullCertificateParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        authenticatedOriginPullApiService.uploadHostnameOriginPullCertificate(
          uploadHostnameOriginPullCertificateParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        authenticatedOriginPullApiService.uploadHostnameOriginPullCertificate({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getHostnameOriginPullCertificate', () => {
    describe('positive tests', () => {
      function __getHostnameOriginPullCertificateTest() {
        // Construct the params object for operation getHostnameOriginPullCertificate
        const certIdentifier = 'testString';
        const xCorrelationId = 'testString';
        const getHostnameOriginPullCertificateParams = {
          certIdentifier,
          xCorrelationId,
        };

        const getHostnameOriginPullCertificateResult = authenticatedOriginPullApiService.getHostnameOriginPullCertificate(
          getHostnameOriginPullCertificateParams
        );

        // all methods should return a Promise
        expectToBePromise(getHostnameOriginPullCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/hostnames/certificates/{cert_identifier}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(authenticatedOriginPullApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(
          authenticatedOriginPullApiServiceOptions.zoneIdentifier
        );
        expect(mockRequestOptions.path.cert_identifier).toEqual(certIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getHostnameOriginPullCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.enableRetries();
        __getHostnameOriginPullCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.disableRetries();
        __getHostnameOriginPullCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const certIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getHostnameOriginPullCertificateParams = {
          certIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        authenticatedOriginPullApiService.getHostnameOriginPullCertificate(
          getHostnameOriginPullCertificateParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await authenticatedOriginPullApiService.getHostnameOriginPullCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await authenticatedOriginPullApiService.getHostnameOriginPullCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteHostnameOriginPullCertificate', () => {
    describe('positive tests', () => {
      function __deleteHostnameOriginPullCertificateTest() {
        // Construct the params object for operation deleteHostnameOriginPullCertificate
        const certIdentifier = 'testString';
        const xCorrelationId = 'testString';
        const deleteHostnameOriginPullCertificateParams = {
          certIdentifier,
          xCorrelationId,
        };

        const deleteHostnameOriginPullCertificateResult = authenticatedOriginPullApiService.deleteHostnameOriginPullCertificate(
          deleteHostnameOriginPullCertificateParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteHostnameOriginPullCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/hostnames/certificates/{cert_identifier}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(authenticatedOriginPullApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(
          authenticatedOriginPullApiServiceOptions.zoneIdentifier
        );
        expect(mockRequestOptions.path.cert_identifier).toEqual(certIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteHostnameOriginPullCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.enableRetries();
        __deleteHostnameOriginPullCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        authenticatedOriginPullApiService.disableRetries();
        __deleteHostnameOriginPullCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const certIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteHostnameOriginPullCertificateParams = {
          certIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        authenticatedOriginPullApiService.deleteHostnameOriginPullCertificate(
          deleteHostnameOriginPullCertificateParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await authenticatedOriginPullApiService.deleteHostnameOriginPullCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await authenticatedOriginPullApiService.deleteHostnameOriginPullCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
