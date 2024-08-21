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
const core = require('ibm-cloud-sdk-core');

const MtlsV1 = require('../../../dist/cis/mtlsv1/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const mtlsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
};

const mtlsService = new MtlsV1(mtlsServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(mtlsService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('MtlsV1', () => {
  beforeEach(() => {
    mock_createRequest();
    // these are changed when passed into the factory/constructor, so re-init
    requiredGlobals = {
      crn: 'testString',
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
      const testInstance = MtlsV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(MtlsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(MtlsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(MtlsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = MtlsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(MtlsV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new MtlsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new MtlsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(MtlsV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new MtlsV1(mtlsServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(mtlsServiceOptions.crn);
      });
    });
  });

  describe('listAccessCertificates', () => {
    describe('positive tests', () => {
      function __listAccessCertificatesTest() {
        // Construct the params object for operation listAccessCertificates
        const zoneId = 'testString';
        const listAccessCertificatesParams = {
          zoneId,
        };

        const listAccessCertificatesResult = mtlsService.listAccessCertificates(
          listAccessCertificatesParams
        );

        // all methods should return a Promise
        expectToBePromise(listAccessCertificatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/certificates',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAccessCertificatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __listAccessCertificatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __listAccessCertificatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAccessCertificatesParams = {
          zoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.listAccessCertificates(listAccessCertificatesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.listAccessCertificates({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.listAccessCertificates();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createAccessCertificate', () => {
    describe('positive tests', () => {
      function __createAccessCertificateTest() {
        // Construct the params object for operation createAccessCertificate
        const zoneId = 'testString';
        const name = 'test-cert';
        const certificate =
          '-----BEGIN CERTIFICATE-----\nMIIGAjCCA+qgAwIBAgIJAI7kymlF7CWT...N4RI7KKB7nikiuUf8vhULKy5IX10\nDrUtmu/B\n-----END CERTIFICATE-----';
        const associatedHostnames = ['test.example.com'];
        const createAccessCertificateParams = {
          zoneId,
          name,
          certificate,
          associatedHostnames,
        };

        const createAccessCertificateResult = mtlsService.createAccessCertificate(
          createAccessCertificateParams
        );

        // all methods should return a Promise
        expectToBePromise(createAccessCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/certificates',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.certificate).toEqual(certificate);
        expect(mockRequestOptions.body.associated_hostnames).toEqual(associatedHostnames);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAccessCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __createAccessCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __createAccessCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAccessCertificateParams = {
          zoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.createAccessCertificate(createAccessCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.createAccessCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.createAccessCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAccessCertificate', () => {
    describe('positive tests', () => {
      function __getAccessCertificateTest() {
        // Construct the params object for operation getAccessCertificate
        const zoneId = 'testString';
        const certId = 'testString';
        const getAccessCertificateParams = {
          zoneId,
          certId,
        };

        const getAccessCertificateResult = mtlsService.getAccessCertificate(
          getAccessCertificateParams
        );

        // all methods should return a Promise
        expectToBePromise(getAccessCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/certificates/{cert_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
        expect(mockRequestOptions.path.cert_id).toEqual(certId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccessCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __getAccessCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __getAccessCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const certId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccessCertificateParams = {
          zoneId,
          certId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.getAccessCertificate(getAccessCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.getAccessCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.getAccessCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateAccessCertificate', () => {
    describe('positive tests', () => {
      function __updateAccessCertificateTest() {
        // Construct the params object for operation updateAccessCertificate
        const zoneId = 'testString';
        const certId = 'testString';
        const name = 'test-cert';
        const associatedHostnames = ['test.example.com'];
        const updateAccessCertificateParams = {
          zoneId,
          certId,
          name,
          associatedHostnames,
        };

        const updateAccessCertificateResult = mtlsService.updateAccessCertificate(
          updateAccessCertificateParams
        );

        // all methods should return a Promise
        expectToBePromise(updateAccessCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/certificates/{cert_id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.associated_hostnames).toEqual(associatedHostnames);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
        expect(mockRequestOptions.path.cert_id).toEqual(certId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAccessCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __updateAccessCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __updateAccessCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const certId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAccessCertificateParams = {
          zoneId,
          certId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.updateAccessCertificate(updateAccessCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.updateAccessCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.updateAccessCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAccessCertificate', () => {
    describe('positive tests', () => {
      function __deleteAccessCertificateTest() {
        // Construct the params object for operation deleteAccessCertificate
        const zoneId = 'testString';
        const certId = 'testString';
        const deleteAccessCertificateParams = {
          zoneId,
          certId,
        };

        const deleteAccessCertificateResult = mtlsService.deleteAccessCertificate(
          deleteAccessCertificateParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteAccessCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/certificates/{cert_id}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
        expect(mockRequestOptions.path.cert_id).toEqual(certId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAccessCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __deleteAccessCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __deleteAccessCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const certId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAccessCertificateParams = {
          zoneId,
          certId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.deleteAccessCertificate(deleteAccessCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.deleteAccessCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.deleteAccessCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAccessApplications', () => {
    describe('positive tests', () => {
      function __listAccessApplicationsTest() {
        // Construct the params object for operation listAccessApplications
        const zoneId = 'testString';
        const listAccessApplicationsParams = {
          zoneId,
        };

        const listAccessApplicationsResult = mtlsService.listAccessApplications(
          listAccessApplicationsParams
        );

        // all methods should return a Promise
        expectToBePromise(listAccessApplicationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_id}/access/apps', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAccessApplicationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __listAccessApplicationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __listAccessApplicationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAccessApplicationsParams = {
          zoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.listAccessApplications(listAccessApplicationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.listAccessApplications({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.listAccessApplications();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createAccessApplication', () => {
    describe('positive tests', () => {
      function __createAccessApplicationTest() {
        // Construct the params object for operation createAccessApplication
        const zoneId = 'testString';
        const name = 'mtls-test-app';
        const domain = 'test.example.com';
        const sessionDuration = '24h';
        const createAccessApplicationParams = {
          zoneId,
          name,
          domain,
          sessionDuration,
        };

        const createAccessApplicationResult = mtlsService.createAccessApplication(
          createAccessApplicationParams
        );

        // all methods should return a Promise
        expectToBePromise(createAccessApplicationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_id}/access/apps', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.domain).toEqual(domain);
        expect(mockRequestOptions.body.session_duration).toEqual(sessionDuration);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAccessApplicationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __createAccessApplicationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __createAccessApplicationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAccessApplicationParams = {
          zoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.createAccessApplication(createAccessApplicationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.createAccessApplication({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.createAccessApplication();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAccessApplication', () => {
    describe('positive tests', () => {
      function __getAccessApplicationTest() {
        // Construct the params object for operation getAccessApplication
        const zoneId = 'testString';
        const appId = 'testString';
        const getAccessApplicationParams = {
          zoneId,
          appId,
        };

        const getAccessApplicationResult = mtlsService.getAccessApplication(
          getAccessApplicationParams
        );

        // all methods should return a Promise
        expectToBePromise(getAccessApplicationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
        expect(mockRequestOptions.path.app_id).toEqual(appId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccessApplicationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __getAccessApplicationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __getAccessApplicationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const appId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccessApplicationParams = {
          zoneId,
          appId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.getAccessApplication(getAccessApplicationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.getAccessApplication({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.getAccessApplication();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateAccessApplication', () => {
    describe('positive tests', () => {
      function __updateAccessApplicationTest() {
        // Construct the params object for operation updateAccessApplication
        const zoneId = 'testString';
        const appId = 'testString';
        const name = 'mtls-test-app';
        const domain = 'test.example.com';
        const sessionDuration = '24h';
        const updateAccessApplicationParams = {
          zoneId,
          appId,
          name,
          domain,
          sessionDuration,
        };

        const updateAccessApplicationResult = mtlsService.updateAccessApplication(
          updateAccessApplicationParams
        );

        // all methods should return a Promise
        expectToBePromise(updateAccessApplicationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.domain).toEqual(domain);
        expect(mockRequestOptions.body.session_duration).toEqual(sessionDuration);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
        expect(mockRequestOptions.path.app_id).toEqual(appId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAccessApplicationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __updateAccessApplicationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __updateAccessApplicationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const appId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAccessApplicationParams = {
          zoneId,
          appId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.updateAccessApplication(updateAccessApplicationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.updateAccessApplication({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.updateAccessApplication();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAccessApplication', () => {
    describe('positive tests', () => {
      function __deleteAccessApplicationTest() {
        // Construct the params object for operation deleteAccessApplication
        const zoneId = 'testString';
        const appId = 'testString';
        const deleteAccessApplicationParams = {
          zoneId,
          appId,
        };

        const deleteAccessApplicationResult = mtlsService.deleteAccessApplication(
          deleteAccessApplicationParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteAccessApplicationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
        expect(mockRequestOptions.path.app_id).toEqual(appId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAccessApplicationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __deleteAccessApplicationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __deleteAccessApplicationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const appId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAccessApplicationParams = {
          zoneId,
          appId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.deleteAccessApplication(deleteAccessApplicationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.deleteAccessApplication({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.deleteAccessApplication();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAccessPolicies', () => {
    describe('positive tests', () => {
      function __listAccessPoliciesTest() {
        // Construct the params object for operation listAccessPolicies
        const zoneId = 'testString';
        const appId = 'testString';
        const listAccessPoliciesParams = {
          zoneId,
          appId,
        };

        const listAccessPoliciesResult = mtlsService.listAccessPolicies(listAccessPoliciesParams);

        // all methods should return a Promise
        expectToBePromise(listAccessPoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}/policies',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
        expect(mockRequestOptions.path.app_id).toEqual(appId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAccessPoliciesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __listAccessPoliciesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __listAccessPoliciesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const appId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAccessPoliciesParams = {
          zoneId,
          appId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.listAccessPolicies(listAccessPoliciesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.listAccessPolicies({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.listAccessPolicies();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createAccessPolicy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PolicyRulePolicyCertRule
      const policyRuleModel = {
        certificate: { foo: 'bar' },
      };

      function __createAccessPolicyTest() {
        // Construct the params object for operation createAccessPolicy
        const zoneId = 'testString';
        const appId = 'testString';
        const name = 'mtls-test-policy';
        const decision = 'non_identity';
        const include = [policyRuleModel];
        const createAccessPolicyParams = {
          zoneId,
          appId,
          name,
          decision,
          include,
        };

        const createAccessPolicyResult = mtlsService.createAccessPolicy(createAccessPolicyParams);

        // all methods should return a Promise
        expectToBePromise(createAccessPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}/policies',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.decision).toEqual(decision);
        expect(mockRequestOptions.body.include).toEqual(include);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
        expect(mockRequestOptions.path.app_id).toEqual(appId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAccessPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __createAccessPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __createAccessPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const appId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAccessPolicyParams = {
          zoneId,
          appId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.createAccessPolicy(createAccessPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.createAccessPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.createAccessPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAccessPolicy', () => {
    describe('positive tests', () => {
      function __getAccessPolicyTest() {
        // Construct the params object for operation getAccessPolicy
        const zoneId = 'testString';
        const appId = 'testString';
        const policyId = 'testString';
        const getAccessPolicyParams = {
          zoneId,
          appId,
          policyId,
        };

        const getAccessPolicyResult = mtlsService.getAccessPolicy(getAccessPolicyParams);

        // all methods should return a Promise
        expectToBePromise(getAccessPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}/policies/{policy_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
        expect(mockRequestOptions.path.app_id).toEqual(appId);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccessPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __getAccessPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __getAccessPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const appId = 'testString';
        const policyId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccessPolicyParams = {
          zoneId,
          appId,
          policyId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.getAccessPolicy(getAccessPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.getAccessPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.getAccessPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateAccessPolicy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PolicyRulePolicyCertRule
      const policyRuleModel = {
        certificate: { foo: 'bar' },
      };

      function __updateAccessPolicyTest() {
        // Construct the params object for operation updateAccessPolicy
        const zoneId = 'testString';
        const appId = 'testString';
        const policyId = 'testString';
        const name = 'mtls-test-policy';
        const decision = 'non_identity';
        const include = [policyRuleModel];
        const updateAccessPolicyParams = {
          zoneId,
          appId,
          policyId,
          name,
          decision,
          include,
        };

        const updateAccessPolicyResult = mtlsService.updateAccessPolicy(updateAccessPolicyParams);

        // all methods should return a Promise
        expectToBePromise(updateAccessPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}/policies/{policy_id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.decision).toEqual(decision);
        expect(mockRequestOptions.body.include).toEqual(include);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
        expect(mockRequestOptions.path.app_id).toEqual(appId);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAccessPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __updateAccessPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __updateAccessPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const appId = 'testString';
        const policyId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAccessPolicyParams = {
          zoneId,
          appId,
          policyId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.updateAccessPolicy(updateAccessPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.updateAccessPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.updateAccessPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAccessPolicy', () => {
    describe('positive tests', () => {
      function __deleteAccessPolicyTest() {
        // Construct the params object for operation deleteAccessPolicy
        const zoneId = 'testString';
        const appId = 'testString';
        const policyId = 'testString';
        const deleteAccessPolicyParams = {
          zoneId,
          appId,
          policyId,
        };

        const deleteAccessPolicyResult = mtlsService.deleteAccessPolicy(deleteAccessPolicyParams);

        // all methods should return a Promise
        expectToBePromise(deleteAccessPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}/policies/{policy_id}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
        expect(mockRequestOptions.path.app_id).toEqual(appId);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAccessPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __deleteAccessPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __deleteAccessPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const appId = 'testString';
        const policyId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAccessPolicyParams = {
          zoneId,
          appId,
          policyId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.deleteAccessPolicy(deleteAccessPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.deleteAccessPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.deleteAccessPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAccessCertSettings', () => {
    describe('positive tests', () => {
      function __getAccessCertSettingsTest() {
        // Construct the params object for operation getAccessCertSettings
        const zoneId = 'testString';
        const getAccessCertSettingsParams = {
          zoneId,
        };

        const getAccessCertSettingsResult = mtlsService.getAccessCertSettings(
          getAccessCertSettingsParams
        );

        // all methods should return a Promise
        expectToBePromise(getAccessCertSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/certificates/settings',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccessCertSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __getAccessCertSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __getAccessCertSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccessCertSettingsParams = {
          zoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.getAccessCertSettings(getAccessCertSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.getAccessCertSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.getAccessCertSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateAccessCertSettings', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AccessCertSettingsInputArray
      const accessCertSettingsInputArrayModel = {
        hostname: 'test.example.com',
        client_certificate_forwarding: true,
      };

      function __updateAccessCertSettingsTest() {
        // Construct the params object for operation updateAccessCertSettings
        const zoneId = 'testString';
        const settings = [accessCertSettingsInputArrayModel];
        const updateAccessCertSettingsParams = {
          zoneId,
          settings,
        };

        const updateAccessCertSettingsResult = mtlsService.updateAccessCertSettings(
          updateAccessCertSettingsParams
        );

        // all methods should return a Promise
        expectToBePromise(updateAccessCertSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/{crn}/zones/{zone_id}/access/certificates/settings',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.settings).toEqual(settings);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAccessCertSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __updateAccessCertSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __updateAccessCertSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAccessCertSettingsParams = {
          zoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.updateAccessCertSettings(updateAccessCertSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await mtlsService.updateAccessCertSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await mtlsService.updateAccessCertSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createAccessOrganization', () => {
    describe('positive tests', () => {
      function __createAccessOrganizationTest() {
        // Construct the params object for operation createAccessOrganization
        const name = 'MTLS enabled';
        const authDomain = '01652b251c3ae2787110a995d8db0135.cloudflareaccess.com';
        const createAccessOrganizationParams = {
          name,
          authDomain,
        };

        const createAccessOrganizationResult = mtlsService.createAccessOrganization(
          createAccessOrganizationParams
        );

        // all methods should return a Promise
        expectToBePromise(createAccessOrganizationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/access/organizations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.auth_domain).toEqual(authDomain);
        expect(mockRequestOptions.path.crn).toEqual(mtlsServiceOptions.crn);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAccessOrganizationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        mtlsService.enableRetries();
        __createAccessOrganizationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        mtlsService.disableRetries();
        __createAccessOrganizationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAccessOrganizationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        mtlsService.createAccessOrganization(createAccessOrganizationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        mtlsService.createAccessOrganization({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
