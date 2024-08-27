/**
 * (C) Copyright IBM Corp. 2023.
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
const { NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;

const SslCertificateApiV1 = require('../../../dist/cis/ssl-certificate-api/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const sslCertificateApiServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  zoneIdentifier: 'testString',
};

const sslCertificateApiService = new SslCertificateApiV1(sslCertificateApiServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(sslCertificateApiService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('SslCertificateApiV1', () => {
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
      const testInstance = SslCertificateApiV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(SslCertificateApiV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(SslCertificateApiV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(SslCertificateApiV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = SslCertificateApiV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(SslCertificateApiV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new SslCertificateApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new SslCertificateApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(SslCertificateApiV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new SslCertificateApiV1(sslCertificateApiServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(serviceObj.zoneIdentifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      });
    });
  });

  describe('listCertificates', () => {
    describe('positive tests', () => {
      function __listCertificatesTest() {
        // Construct the params object for operation listCertificates
        const xCorrelationId = 'testString';
        const listCertificatesParams = {
          xCorrelationId,
        };

        const listCertificatesResult = sslCertificateApiService.listCertificates(listCertificatesParams);

        // all methods should return a Promise
        expectToBePromise(listCertificatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/ssl/certificate_packs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCertificatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __listCertificatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __listCertificatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCertificatesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.listCertificates(listCertificatesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.listCertificates({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('orderCertificate', () => {
    describe('positive tests', () => {
      function __orderCertificateTest() {
        // Construct the params object for operation orderCertificate
        const type = 'dedicated';
        const hosts = ['example.com', '*.example.com'];
        const xCorrelationId = 'testString';
        const orderCertificateParams = {
          type,
          hosts,
          xCorrelationId,
        };

        const orderCertificateResult = sslCertificateApiService.orderCertificate(orderCertificateParams);

        // all methods should return a Promise
        expectToBePromise(orderCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/ssl/certificate_packs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.hosts).toEqual(hosts);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __orderCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __orderCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __orderCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const orderCertificateParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.orderCertificate(orderCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.orderCertificate({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('deleteCertificate', () => {
    describe('positive tests', () => {
      function __deleteCertificateTest() {
        // Construct the params object for operation deleteCertificate
        const certIdentifier = 'testString';
        const xCorrelationId = 'testString';
        const deleteCertificateParams = {
          certIdentifier,
          xCorrelationId,
        };

        const deleteCertificateResult = sslCertificateApiService.deleteCertificate(deleteCertificateParams);

        // all methods should return a Promise
        expectToBePromise(deleteCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/ssl/certificate_packs/{cert_identifier}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.cert_identifier).toEqual(certIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __deleteCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __deleteCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const certIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCertificateParams = {
          certIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.deleteCertificate(deleteCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await sslCertificateApiService.deleteCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await sslCertificateApiService.deleteCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSslSetting', () => {
    describe('positive tests', () => {
      function __getSslSettingTest() {
        // Construct the params object for operation getSslSetting
        const getSslSettingParams = {};

        const getSslSettingResult = sslCertificateApiService.getSslSetting(getSslSettingParams);

        // all methods should return a Promise
        expectToBePromise(getSslSettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/ssl', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSslSettingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __getSslSettingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __getSslSettingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSslSettingParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.getSslSetting(getSslSettingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.getSslSetting({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('changeSslSetting', () => {
    describe('positive tests', () => {
      function __changeSslSettingTest() {
        // Construct the params object for operation changeSslSetting
        const value = 'off';
        const changeSslSettingParams = {
          value,
        };

        const changeSslSettingResult = sslCertificateApiService.changeSslSetting(changeSslSettingParams);

        // all methods should return a Promise
        expectToBePromise(changeSslSettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/ssl', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __changeSslSettingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __changeSslSettingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __changeSslSettingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const changeSslSettingParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.changeSslSetting(changeSslSettingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.changeSslSetting({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listCustomCertificates', () => {
    describe('positive tests', () => {
      function __listCustomCertificatesTest() {
        // Construct the params object for operation listCustomCertificates
        const listCustomCertificatesParams = {};

        const listCustomCertificatesResult = sslCertificateApiService.listCustomCertificates(listCustomCertificatesParams);

        // all methods should return a Promise
        expectToBePromise(listCustomCertificatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/custom_certificates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCustomCertificatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __listCustomCertificatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __listCustomCertificatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCustomCertificatesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.listCustomCertificates(listCustomCertificatesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.listCustomCertificates({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('uploadCustomCertificate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CustomCertReqGeoRestrictions
      const customCertReqGeoRestrictionsModel = {
        label: 'us',
      };

      function __uploadCustomCertificateTest() {
        // Construct the params object for operation uploadCustomCertificate
        const certificate = 'testString';
        const privateKey = 'testString';
        const bundleMethod = 'ubiquitous';
        const geoRestrictions = customCertReqGeoRestrictionsModel;
        const uploadCustomCertificateParams = {
          certificate,
          privateKey,
          bundleMethod,
          geoRestrictions,
        };

        const uploadCustomCertificateResult = sslCertificateApiService.uploadCustomCertificate(uploadCustomCertificateParams);

        // all methods should return a Promise
        expectToBePromise(uploadCustomCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/custom_certificates', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.certificate).toEqual(certificate);
        expect(mockRequestOptions.body.private_key).toEqual(privateKey);
        expect(mockRequestOptions.body.bundle_method).toEqual(bundleMethod);
        expect(mockRequestOptions.body.geo_restrictions).toEqual(geoRestrictions);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __uploadCustomCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __uploadCustomCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __uploadCustomCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const uploadCustomCertificateParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.uploadCustomCertificate(uploadCustomCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.uploadCustomCertificate({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getCustomCertificate', () => {
    describe('positive tests', () => {
      function __getCustomCertificateTest() {
        // Construct the params object for operation getCustomCertificate
        const customCertId = 'testString';
        const getCustomCertificateParams = {
          customCertId,
        };

        const getCustomCertificateResult = sslCertificateApiService.getCustomCertificate(getCustomCertificateParams);

        // all methods should return a Promise
        expectToBePromise(getCustomCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/custom_certificates/{custom_cert_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.custom_cert_id).toEqual(customCertId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCustomCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __getCustomCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __getCustomCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customCertId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCustomCertificateParams = {
          customCertId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.getCustomCertificate(getCustomCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await sslCertificateApiService.getCustomCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await sslCertificateApiService.getCustomCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateCustomCertificate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CustomCertReqGeoRestrictions
      const customCertReqGeoRestrictionsModel = {
        label: 'us',
      };

      function __updateCustomCertificateTest() {
        // Construct the params object for operation updateCustomCertificate
        const customCertId = 'testString';
        const certificate = 'testString';
        const privateKey = 'testString';
        const bundleMethod = 'ubiquitous';
        const geoRestrictions = customCertReqGeoRestrictionsModel;
        const updateCustomCertificateParams = {
          customCertId,
          certificate,
          privateKey,
          bundleMethod,
          geoRestrictions,
        };

        const updateCustomCertificateResult = sslCertificateApiService.updateCustomCertificate(updateCustomCertificateParams);

        // all methods should return a Promise
        expectToBePromise(updateCustomCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/custom_certificates/{custom_cert_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.certificate).toEqual(certificate);
        expect(mockRequestOptions.body.private_key).toEqual(privateKey);
        expect(mockRequestOptions.body.bundle_method).toEqual(bundleMethod);
        expect(mockRequestOptions.body.geo_restrictions).toEqual(geoRestrictions);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.custom_cert_id).toEqual(customCertId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCustomCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __updateCustomCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __updateCustomCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customCertId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateCustomCertificateParams = {
          customCertId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.updateCustomCertificate(updateCustomCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await sslCertificateApiService.updateCustomCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await sslCertificateApiService.updateCustomCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteCustomCertificate', () => {
    describe('positive tests', () => {
      function __deleteCustomCertificateTest() {
        // Construct the params object for operation deleteCustomCertificate
        const customCertId = 'testString';
        const deleteCustomCertificateParams = {
          customCertId,
        };

        const deleteCustomCertificateResult = sslCertificateApiService.deleteCustomCertificate(deleteCustomCertificateParams);

        // all methods should return a Promise
        expectToBePromise(deleteCustomCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/custom_certificates/{custom_cert_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.custom_cert_id).toEqual(customCertId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCustomCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __deleteCustomCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __deleteCustomCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customCertId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCustomCertificateParams = {
          customCertId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.deleteCustomCertificate(deleteCustomCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await sslCertificateApiService.deleteCustomCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await sslCertificateApiService.deleteCustomCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('changeCertificatePriority', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CertPriorityReqCertificatesItem
      const certPriorityReqCertificatesItemModel = {
        id: '5a7805061c76ada191ed06f989cc3dac',
        priority: 1,
      };

      function __changeCertificatePriorityTest() {
        // Construct the params object for operation changeCertificatePriority
        const certificates = [certPriorityReqCertificatesItemModel];
        const changeCertificatePriorityParams = {
          certificates,
        };

        const changeCertificatePriorityResult = sslCertificateApiService.changeCertificatePriority(changeCertificatePriorityParams);

        // all methods should return a Promise
        expectToBePromise(changeCertificatePriorityResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/custom_certificates/prioritize', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.certificates).toEqual(certificates);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __changeCertificatePriorityTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __changeCertificatePriorityTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __changeCertificatePriorityTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const changeCertificatePriorityParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.changeCertificatePriority(changeCertificatePriorityParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.changeCertificatePriority({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getUniversalCertificateSetting', () => {
    describe('positive tests', () => {
      function __getUniversalCertificateSettingTest() {
        // Construct the params object for operation getUniversalCertificateSetting
        const getUniversalCertificateSettingParams = {};

        const getUniversalCertificateSettingResult = sslCertificateApiService.getUniversalCertificateSetting(getUniversalCertificateSettingParams);

        // all methods should return a Promise
        expectToBePromise(getUniversalCertificateSettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/ssl/universal/settings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getUniversalCertificateSettingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __getUniversalCertificateSettingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __getUniversalCertificateSettingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getUniversalCertificateSettingParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.getUniversalCertificateSetting(getUniversalCertificateSettingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.getUniversalCertificateSetting({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('changeUniversalCertificateSetting', () => {
    describe('positive tests', () => {
      function __changeUniversalCertificateSettingTest() {
        // Construct the params object for operation changeUniversalCertificateSetting
        const enabled = true;
        const changeUniversalCertificateSettingParams = {
          enabled,
        };

        const changeUniversalCertificateSettingResult = sslCertificateApiService.changeUniversalCertificateSetting(changeUniversalCertificateSettingParams);

        // all methods should return a Promise
        expectToBePromise(changeUniversalCertificateSettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/ssl/universal/settings', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __changeUniversalCertificateSettingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __changeUniversalCertificateSettingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __changeUniversalCertificateSettingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const changeUniversalCertificateSettingParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.changeUniversalCertificateSetting(changeUniversalCertificateSettingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.changeUniversalCertificateSetting({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getTls12Setting', () => {
    describe('positive tests', () => {
      function __getTls12SettingTest() {
        // Construct the params object for operation getTls12Setting
        const getTls12SettingParams = {};

        const getTls12SettingResult = sslCertificateApiService.getTls12Setting(getTls12SettingParams);

        // all methods should return a Promise
        expectToBePromise(getTls12SettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_2_only', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTls12SettingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __getTls12SettingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __getTls12SettingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTls12SettingParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.getTls12Setting(getTls12SettingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.getTls12Setting({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('changeTls12Setting', () => {
    describe('positive tests', () => {
      function __changeTls12SettingTest() {
        // Construct the params object for operation changeTls12Setting
        const value = 'on';
        const changeTls12SettingParams = {
          value,
        };

        const changeTls12SettingResult = sslCertificateApiService.changeTls12Setting(changeTls12SettingParams);

        // all methods should return a Promise
        expectToBePromise(changeTls12SettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_2_only', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __changeTls12SettingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __changeTls12SettingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __changeTls12SettingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const changeTls12SettingParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.changeTls12Setting(changeTls12SettingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.changeTls12Setting({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getTls13Setting', () => {
    describe('positive tests', () => {
      function __getTls13SettingTest() {
        // Construct the params object for operation getTls13Setting
        const getTls13SettingParams = {};

        const getTls13SettingResult = sslCertificateApiService.getTls13Setting(getTls13SettingParams);

        // all methods should return a Promise
        expectToBePromise(getTls13SettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_3', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTls13SettingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __getTls13SettingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __getTls13SettingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTls13SettingParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.getTls13Setting(getTls13SettingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.getTls13Setting({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('changeTls13Setting', () => {
    describe('positive tests', () => {
      function __changeTls13SettingTest() {
        // Construct the params object for operation changeTls13Setting
        const value = 'on';
        const changeTls13SettingParams = {
          value,
        };

        const changeTls13SettingResult = sslCertificateApiService.changeTls13Setting(changeTls13SettingParams);

        // all methods should return a Promise
        expectToBePromise(changeTls13SettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_3', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __changeTls13SettingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __changeTls13SettingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __changeTls13SettingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const changeTls13SettingParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.changeTls13Setting(changeTls13SettingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.changeTls13Setting({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('orderAdvancedCertificate', () => {
    describe('positive tests', () => {
      function __orderAdvancedCertificateTest() {
        // Construct the params object for operation orderAdvancedCertificate
        const type = 'advanced';
        const hosts = ['example.com', '*.example.com'];
        const validationMethod = 'txt';
        const validityDays = 90;
        const certificateAuthority = 'lets_encrypt';
        const cloudflareBranding = false;
        const xCorrelationId = 'testString';
        const orderAdvancedCertificateParams = {
          type,
          hosts,
          validationMethod,
          validityDays,
          certificateAuthority,
          cloudflareBranding,
          xCorrelationId,
        };

        const orderAdvancedCertificateResult = sslCertificateApiService.orderAdvancedCertificate(orderAdvancedCertificateParams);

        // all methods should return a Promise
        expectToBePromise(orderAdvancedCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/{crn}/zones/{zone_identifier}/ssl/certificate_packs/order', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.hosts).toEqual(hosts);
        expect(mockRequestOptions.body.validation_method).toEqual(validationMethod);
        expect(mockRequestOptions.body.validity_days).toEqual(validityDays);
        expect(mockRequestOptions.body.certificate_authority).toEqual(certificateAuthority);
        expect(mockRequestOptions.body.cloudflare_branding).toEqual(cloudflareBranding);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __orderAdvancedCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __orderAdvancedCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __orderAdvancedCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const orderAdvancedCertificateParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.orderAdvancedCertificate(orderAdvancedCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.orderAdvancedCertificate({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('patchCertificate', () => {
    describe('positive tests', () => {
      function __patchCertificateTest() {
        // Construct the params object for operation patchCertificate
        const certIdentifier = 'testString';
        const xCorrelationId = 'testString';
        const patchCertificateParams = {
          certIdentifier,
          xCorrelationId,
        };

        const patchCertificateResult = sslCertificateApiService.patchCertificate(patchCertificateParams);

        // all methods should return a Promise
        expectToBePromise(patchCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/{crn}/zones/{zone_identifier}/ssl/certificate_packs/{cert_identifier}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.cert_identifier).toEqual(certIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __patchCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __patchCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __patchCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const certIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const patchCertificateParams = {
          certIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.patchCertificate(patchCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await sslCertificateApiService.patchCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await sslCertificateApiService.patchCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteCertificateV2', () => {
    describe('positive tests', () => {
      function __deleteCertificateV2Test() {
        // Construct the params object for operation deleteCertificateV2
        const certIdentifier = 'testString';
        const xCorrelationId = 'testString';
        const deleteCertificateV2Params = {
          certIdentifier,
          xCorrelationId,
        };

        const deleteCertificateV2Result = sslCertificateApiService.deleteCertificateV2(deleteCertificateV2Params);

        // all methods should return a Promise
        expectToBePromise(deleteCertificateV2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/{crn}/zones/{zone_identifier}/ssl/certificate_packs/{cert_identifier}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.cert_identifier).toEqual(certIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCertificateV2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __deleteCertificateV2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __deleteCertificateV2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const certIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCertificateV2Params = {
          certIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.deleteCertificateV2(deleteCertificateV2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await sslCertificateApiService.deleteCertificateV2({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await sslCertificateApiService.deleteCertificateV2();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSslVerification', () => {
    describe('positive tests', () => {
      function __getSslVerificationTest() {
        // Construct the params object for operation getSslVerification
        const xCorrelationId = 'testString';
        const getSslVerificationParams = {
          xCorrelationId,
        };

        const getSslVerificationResult = sslCertificateApiService.getSslVerification(getSslVerificationParams);

        // all methods should return a Promise
        expectToBePromise(getSslVerificationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/{crn}/zones/{zone_identifier}/ssl/verification', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(sslCertificateApiServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(sslCertificateApiServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSslVerificationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __getSslVerificationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __getSslVerificationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSslVerificationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.getSslVerification(getSslVerificationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.getSslVerification({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listOriginCertificates', () => {
    describe('positive tests', () => {
      function __listOriginCertificatesTest() {
        // Construct the params object for operation listOriginCertificates
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const xCorrelationId = 'testString';
        const listOriginCertificatesParams = {
          crn,
          zoneIdentifier,
          xCorrelationId,
        };

        const listOriginCertificatesResult = sslCertificateApiService.listOriginCertificates(listOriginCertificatesParams);

        // all methods should return a Promise
        expectToBePromise(listOriginCertificatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/origin_certificates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listOriginCertificatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __listOriginCertificatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __listOriginCertificatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listOriginCertificatesParams = {
          crn,
          zoneIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.listOriginCertificates(listOriginCertificatesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await sslCertificateApiService.listOriginCertificates({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await sslCertificateApiService.listOriginCertificates();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createOriginCertificate', () => {
    describe('positive tests', () => {
      function __createOriginCertificateTest() {
        // Construct the params object for operation createOriginCertificate
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const hostnames = ['example.com'];
        const requestType = 'origin-rsa';
        const requestedValidity = 5475;
        const csr = '-----BEGIN CERTIFICATE REQUEST-----\n...\n-----END CERTIFICATE REQUEST-----';
        const xCorrelationId = 'testString';
        const createOriginCertificateParams = {
          crn,
          zoneIdentifier,
          hostnames,
          requestType,
          requestedValidity,
          csr,
          xCorrelationId,
        };

        const createOriginCertificateResult = sslCertificateApiService.createOriginCertificate(createOriginCertificateParams);

        // all methods should return a Promise
        expectToBePromise(createOriginCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/origin_certificates', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.hostnames).toEqual(hostnames);
        expect(mockRequestOptions.body.request_type).toEqual(requestType);
        expect(mockRequestOptions.body.requested_validity).toEqual(requestedValidity);
        expect(mockRequestOptions.body.csr).toEqual(csr);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createOriginCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __createOriginCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __createOriginCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createOriginCertificateParams = {
          crn,
          zoneIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.createOriginCertificate(createOriginCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await sslCertificateApiService.createOriginCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await sslCertificateApiService.createOriginCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('revokeOriginCertificate', () => {
    describe('positive tests', () => {
      function __revokeOriginCertificateTest() {
        // Construct the params object for operation revokeOriginCertificate
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const certIdentifier = 'testString';
        const xCorrelationId = 'testString';
        const revokeOriginCertificateParams = {
          crn,
          zoneIdentifier,
          certIdentifier,
          xCorrelationId,
        };

        const revokeOriginCertificateResult = sslCertificateApiService.revokeOriginCertificate(revokeOriginCertificateParams);

        // all methods should return a Promise
        expectToBePromise(revokeOriginCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/origin_certificates/{cert_identifier}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
        expect(mockRequestOptions.path.cert_identifier).toEqual(certIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __revokeOriginCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __revokeOriginCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __revokeOriginCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const certIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const revokeOriginCertificateParams = {
          crn,
          zoneIdentifier,
          certIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.revokeOriginCertificate(revokeOriginCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await sslCertificateApiService.revokeOriginCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await sslCertificateApiService.revokeOriginCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getOriginCertificate', () => {
    describe('positive tests', () => {
      function __getOriginCertificateTest() {
        // Construct the params object for operation getOriginCertificate
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const certIdentifier = 'testString';
        const xCorrelationId = 'testString';
        const getOriginCertificateParams = {
          crn,
          zoneIdentifier,
          certIdentifier,
          xCorrelationId,
        };

        const getOriginCertificateResult = sslCertificateApiService.getOriginCertificate(getOriginCertificateParams);

        // all methods should return a Promise
        expectToBePromise(getOriginCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/origin_certificates/{cert_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
        expect(mockRequestOptions.path.cert_identifier).toEqual(certIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOriginCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.enableRetries();
        __getOriginCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        sslCertificateApiService.disableRetries();
        __getOriginCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const certIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getOriginCertificateParams = {
          crn,
          zoneIdentifier,
          certIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.getOriginCertificate(getOriginCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await sslCertificateApiService.getOriginCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await sslCertificateApiService.getOriginCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
