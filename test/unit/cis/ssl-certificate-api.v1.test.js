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

const SslCertificateApiV1 = require('../../../dist/cis/ssl-certificate-api/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  zoneIdentifier: 'testString',
};

const sslCertificateApiService = new SslCertificateApiV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(sslCertificateApiService, 'createRequest');
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

describe('SslCertificateApiV1', () => {
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
        const serviceObj = new SslCertificateApiV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneIdentifier).toEqual(service.zoneIdentifier);
      });
    });
  });
  describe('listCertificates', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listCertificates
        const xCorrelationId = 'testString';
        const params = {
          xCorrelationId: xCorrelationId,
        };

        const listCertificatesResult = sslCertificateApiService.listCertificates(params);

        // all methods should return a Promise
        expectToBePromise(listCertificatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/ssl/certificate_packs',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
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

        sslCertificateApiService.listCertificates(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation orderCertificate
        const type = 'dedicated';
        const hosts = ['example.com'];
        const xCorrelationId = 'testString';
        const params = {
          type: type,
          hosts: hosts,
          xCorrelationId: xCorrelationId,
        };

        const orderCertificateResult = sslCertificateApiService.orderCertificate(params);

        // all methods should return a Promise
        expectToBePromise(orderCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/ssl/certificate_packs',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(options.body['type']).toEqual(type);
        expect(options.body['hosts']).toEqual(hosts);
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

        sslCertificateApiService.orderCertificate(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteCertificate
        const certIdentifier = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          certIdentifier: certIdentifier,
          xCorrelationId: xCorrelationId,
        };

        const deleteCertificateResult = sslCertificateApiService.deleteCertificate(params);

        // all methods should return a Promise
        expectToBePromise(deleteCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/ssl/certificate_packs/{cert_identifier}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['cert_identifier']).toEqual(certIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const certIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          certIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.deleteCertificate(params);
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

      test('should reject promise when required params are not given', done => {
        const deleteCertificatePromise = sslCertificateApiService.deleteCertificate();
        expectToBePromise(deleteCertificatePromise);

        deleteCertificatePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSslSetting', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSslSetting
        const params = {};

        const getSslSettingResult = sslCertificateApiService.getSslSetting(params);

        // all methods should return a Promise
        expectToBePromise(getSslSettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/settings/ssl', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

        sslCertificateApiService.getSslSetting(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation changeSslSetting
        const value = 'off';
        const params = {
          value: value,
        };

        const changeSslSettingResult = sslCertificateApiService.changeSslSetting(params);

        // all methods should return a Promise
        expectToBePromise(changeSslSettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/settings/ssl', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['value']).toEqual(value);
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

        sslCertificateApiService.changeSslSetting(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listCustomCertificates
        const params = {};

        const listCustomCertificatesResult = sslCertificateApiService.listCustomCertificates(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listCustomCertificatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/custom_certificates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

        sslCertificateApiService.listCustomCertificates(params);
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation uploadCustomCertificate
        const certificate = 'testString';
        const privateKey = 'testString';
        const bundleMethod = 'ubiquitous';
        const geoRestrictions = customCertReqGeoRestrictionsModel;
        const params = {
          certificate: certificate,
          privateKey: privateKey,
          bundleMethod: bundleMethod,
          geoRestrictions: geoRestrictions,
        };

        const uploadCustomCertificateResult = sslCertificateApiService.uploadCustomCertificate(
          params
        );

        // all methods should return a Promise
        expectToBePromise(uploadCustomCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/custom_certificates', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['certificate']).toEqual(certificate);
        expect(options.body['private_key']).toEqual(privateKey);
        expect(options.body['bundle_method']).toEqual(bundleMethod);
        expect(options.body['geo_restrictions']).toEqual(geoRestrictions);
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

        sslCertificateApiService.uploadCustomCertificate(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCustomCertificate
        const customCertId = 'testString';
        const params = {
          customCertId: customCertId,
        };

        const getCustomCertificateResult = sslCertificateApiService.getCustomCertificate(params);

        // all methods should return a Promise
        expectToBePromise(getCustomCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/custom_certificates/{custom_cert_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['custom_cert_id']).toEqual(customCertId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customCertId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customCertId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.getCustomCertificate(params);
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

      test('should reject promise when required params are not given', done => {
        const getCustomCertificatePromise = sslCertificateApiService.getCustomCertificate();
        expectToBePromise(getCustomCertificatePromise);

        getCustomCertificatePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateCustomCertificate
        const customCertId = 'testString';
        const certificate = 'testString';
        const privateKey = 'testString';
        const bundleMethod = 'ubiquitous';
        const geoRestrictions = customCertReqGeoRestrictionsModel;
        const params = {
          customCertId: customCertId,
          certificate: certificate,
          privateKey: privateKey,
          bundleMethod: bundleMethod,
          geoRestrictions: geoRestrictions,
        };

        const updateCustomCertificateResult = sslCertificateApiService.updateCustomCertificate(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateCustomCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/custom_certificates/{custom_cert_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['certificate']).toEqual(certificate);
        expect(options.body['private_key']).toEqual(privateKey);
        expect(options.body['bundle_method']).toEqual(bundleMethod);
        expect(options.body['geo_restrictions']).toEqual(geoRestrictions);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['custom_cert_id']).toEqual(customCertId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customCertId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customCertId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.updateCustomCertificate(params);
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

      test('should reject promise when required params are not given', done => {
        const updateCustomCertificatePromise = sslCertificateApiService.updateCustomCertificate();
        expectToBePromise(updateCustomCertificatePromise);

        updateCustomCertificatePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteCustomCertificate', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteCustomCertificate
        const customCertId = 'testString';
        const params = {
          customCertId: customCertId,
        };

        const deleteCustomCertificateResult = sslCertificateApiService.deleteCustomCertificate(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteCustomCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/custom_certificates/{custom_cert_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['custom_cert_id']).toEqual(customCertId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const customCertId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          customCertId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        sslCertificateApiService.deleteCustomCertificate(params);
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

      test('should reject promise when required params are not given', done => {
        const deleteCustomCertificatePromise = sslCertificateApiService.deleteCustomCertificate();
        expectToBePromise(deleteCustomCertificatePromise);

        deleteCustomCertificatePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation changeCertificatePriority
        const certificates = [certPriorityReqCertificatesItemModel];
        const params = {
          certificates: certificates,
        };

        const changeCertificatePriorityResult = sslCertificateApiService.changeCertificatePriority(
          params
        );

        // all methods should return a Promise
        expectToBePromise(changeCertificatePriorityResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/custom_certificates/prioritize',
          'PUT'
        );
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['certificates']).toEqual(certificates);
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

        sslCertificateApiService.changeCertificatePriority(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getUniversalCertificateSetting
        const params = {};

        const getUniversalCertificateSettingResult = sslCertificateApiService.getUniversalCertificateSetting(
          params
        );

        // all methods should return a Promise
        expectToBePromise(getUniversalCertificateSettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/ssl/universal/settings',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

        sslCertificateApiService.getUniversalCertificateSetting(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation changeUniversalCertificateSetting
        const enabled = true;
        const params = {
          enabled: enabled,
        };

        const changeUniversalCertificateSettingResult = sslCertificateApiService.changeUniversalCertificateSetting(
          params
        );

        // all methods should return a Promise
        expectToBePromise(changeUniversalCertificateSettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/ssl/universal/settings',
          'PATCH'
        );
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['enabled']).toEqual(enabled);
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

        sslCertificateApiService.changeUniversalCertificateSetting(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getTls12Setting
        const params = {};

        const getTls12SettingResult = sslCertificateApiService.getTls12Setting(params);

        // all methods should return a Promise
        expectToBePromise(getTls12SettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_2_only',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

        sslCertificateApiService.getTls12Setting(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation changeTls12Setting
        const value = 'on';
        const params = {
          value: value,
        };

        const changeTls12SettingResult = sslCertificateApiService.changeTls12Setting(params);

        // all methods should return a Promise
        expectToBePromise(changeTls12SettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_2_only',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['value']).toEqual(value);
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

        sslCertificateApiService.changeTls12Setting(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getTls13Setting
        const params = {};

        const getTls13SettingResult = sslCertificateApiService.getTls13Setting(params);

        // all methods should return a Promise
        expectToBePromise(getTls13SettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_3', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

        sslCertificateApiService.getTls13Setting(params);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation changeTls13Setting
        const value = 'on';
        const params = {
          value: value,
        };

        const changeTls13SettingResult = sslCertificateApiService.changeTls13Setting(params);

        // all methods should return a Promise
        expectToBePromise(changeTls13SettingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_3', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['value']).toEqual(value);
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

        sslCertificateApiService.changeTls13Setting(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        sslCertificateApiService.changeTls13Setting({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
