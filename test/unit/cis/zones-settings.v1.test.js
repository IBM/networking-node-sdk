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
const ZonesSettingsV1 = require('../../../dist/cis/zones-settings/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const zonesSettingsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  zoneIdentifier: 'testString',
};

const zonesSettingsService = new ZonesSettingsV1(zonesSettingsServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(zonesSettingsService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('ZonesSettingsV1', () => {
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
      const testInstance = ZonesSettingsV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(ZonesSettingsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(ZonesSettingsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(ZonesSettingsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = ZonesSettingsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(ZonesSettingsV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ZonesSettingsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ZonesSettingsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(ZonesSettingsV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new ZonesSettingsV1(zonesSettingsServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(serviceObj.zoneIdentifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      });
    });
  });

  describe('getZoneDnssec', () => {
    describe('positive tests', () => {
      function __getZoneDnssecTest() {
        // Construct the params object for operation getZoneDnssec
        const getZoneDnssecParams = {};

        const getZoneDnssecResult = zonesSettingsService.getZoneDnssec(getZoneDnssecParams);

        // all methods should return a Promise
        expectToBePromise(getZoneDnssecResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/dnssec', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getZoneDnssecTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getZoneDnssecTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getZoneDnssecTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getZoneDnssecParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getZoneDnssec(getZoneDnssecParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getZoneDnssec({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateZoneDnssec', () => {
    describe('positive tests', () => {
      function __updateZoneDnssecTest() {
        // Construct the params object for operation updateZoneDnssec
        const status = 'active';
        const updateZoneDnssecParams = {
          status,
        };

        const updateZoneDnssecResult = zonesSettingsService.updateZoneDnssec(updateZoneDnssecParams);

        // all methods should return a Promise
        expectToBePromise(updateZoneDnssecResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/dnssec', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.status).toEqual(status);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateZoneDnssecTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateZoneDnssecTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateZoneDnssecTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateZoneDnssecParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateZoneDnssec(updateZoneDnssecParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateZoneDnssec({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getZoneCnameFlattening', () => {
    describe('positive tests', () => {
      function __getZoneCnameFlatteningTest() {
        // Construct the params object for operation getZoneCnameFlattening
        const getZoneCnameFlatteningParams = {};

        const getZoneCnameFlatteningResult = zonesSettingsService.getZoneCnameFlattening(getZoneCnameFlatteningParams);

        // all methods should return a Promise
        expectToBePromise(getZoneCnameFlatteningResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/cname_flattening', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getZoneCnameFlatteningTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getZoneCnameFlatteningTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getZoneCnameFlatteningTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getZoneCnameFlatteningParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getZoneCnameFlattening(getZoneCnameFlatteningParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getZoneCnameFlattening({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateZoneCnameFlattening', () => {
    describe('positive tests', () => {
      function __updateZoneCnameFlatteningTest() {
        // Construct the params object for operation updateZoneCnameFlattening
        const value = 'flatten_all';
        const updateZoneCnameFlatteningParams = {
          value,
        };

        const updateZoneCnameFlatteningResult = zonesSettingsService.updateZoneCnameFlattening(updateZoneCnameFlatteningParams);

        // all methods should return a Promise
        expectToBePromise(updateZoneCnameFlatteningResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/cname_flattening', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateZoneCnameFlatteningTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateZoneCnameFlatteningTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateZoneCnameFlatteningTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateZoneCnameFlatteningParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateZoneCnameFlattening(updateZoneCnameFlatteningParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateZoneCnameFlattening({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getOpportunisticEncryption', () => {
    describe('positive tests', () => {
      function __getOpportunisticEncryptionTest() {
        // Construct the params object for operation getOpportunisticEncryption
        const getOpportunisticEncryptionParams = {};

        const getOpportunisticEncryptionResult = zonesSettingsService.getOpportunisticEncryption(getOpportunisticEncryptionParams);

        // all methods should return a Promise
        expectToBePromise(getOpportunisticEncryptionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/opportunistic_encryption', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOpportunisticEncryptionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getOpportunisticEncryptionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getOpportunisticEncryptionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getOpportunisticEncryptionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getOpportunisticEncryption(getOpportunisticEncryptionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getOpportunisticEncryption({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateOpportunisticEncryption', () => {
    describe('positive tests', () => {
      function __updateOpportunisticEncryptionTest() {
        // Construct the params object for operation updateOpportunisticEncryption
        const value = 'off';
        const updateOpportunisticEncryptionParams = {
          value,
        };

        const updateOpportunisticEncryptionResult = zonesSettingsService.updateOpportunisticEncryption(updateOpportunisticEncryptionParams);

        // all methods should return a Promise
        expectToBePromise(updateOpportunisticEncryptionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/opportunistic_encryption', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateOpportunisticEncryptionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateOpportunisticEncryptionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateOpportunisticEncryptionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateOpportunisticEncryptionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateOpportunisticEncryption(updateOpportunisticEncryptionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateOpportunisticEncryption({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getOpportunisticOnion', () => {
    describe('positive tests', () => {
      function __getOpportunisticOnionTest() {
        // Construct the params object for operation getOpportunisticOnion
        const getOpportunisticOnionParams = {};

        const getOpportunisticOnionResult = zonesSettingsService.getOpportunisticOnion(getOpportunisticOnionParams);

        // all methods should return a Promise
        expectToBePromise(getOpportunisticOnionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/opportunistic_onion', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOpportunisticOnionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getOpportunisticOnionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getOpportunisticOnionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getOpportunisticOnionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getOpportunisticOnion(getOpportunisticOnionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getOpportunisticOnion({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateOpportunisticOnion', () => {
    describe('positive tests', () => {
      function __updateOpportunisticOnionTest() {
        // Construct the params object for operation updateOpportunisticOnion
        const value = 'off';
        const updateOpportunisticOnionParams = {
          value,
        };

        const updateOpportunisticOnionResult = zonesSettingsService.updateOpportunisticOnion(updateOpportunisticOnionParams);

        // all methods should return a Promise
        expectToBePromise(updateOpportunisticOnionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/opportunistic_onion', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateOpportunisticOnionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateOpportunisticOnionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateOpportunisticOnionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateOpportunisticOnionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateOpportunisticOnion(updateOpportunisticOnionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateOpportunisticOnion({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getChallengeTtl', () => {
    describe('positive tests', () => {
      function __getChallengeTtlTest() {
        // Construct the params object for operation getChallengeTtl
        const getChallengeTtlParams = {};

        const getChallengeTtlResult = zonesSettingsService.getChallengeTtl(getChallengeTtlParams);

        // all methods should return a Promise
        expectToBePromise(getChallengeTtlResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/challenge_ttl', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getChallengeTtlTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getChallengeTtlTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getChallengeTtlTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getChallengeTtlParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getChallengeTtl(getChallengeTtlParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getChallengeTtl({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateChallengeTtl', () => {
    describe('positive tests', () => {
      function __updateChallengeTtlTest() {
        // Construct the params object for operation updateChallengeTtl
        const value = 1800;
        const updateChallengeTtlParams = {
          value,
        };

        const updateChallengeTtlResult = zonesSettingsService.updateChallengeTtl(updateChallengeTtlParams);

        // all methods should return a Promise
        expectToBePromise(updateChallengeTtlResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/challenge_ttl', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateChallengeTtlTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateChallengeTtlTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateChallengeTtlTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateChallengeTtlParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateChallengeTtl(updateChallengeTtlParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateChallengeTtl({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getAutomaticHttpsRewrites', () => {
    describe('positive tests', () => {
      function __getAutomaticHttpsRewritesTest() {
        // Construct the params object for operation getAutomaticHttpsRewrites
        const getAutomaticHttpsRewritesParams = {};

        const getAutomaticHttpsRewritesResult = zonesSettingsService.getAutomaticHttpsRewrites(getAutomaticHttpsRewritesParams);

        // all methods should return a Promise
        expectToBePromise(getAutomaticHttpsRewritesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/automatic_https_rewrites', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAutomaticHttpsRewritesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getAutomaticHttpsRewritesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getAutomaticHttpsRewritesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAutomaticHttpsRewritesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getAutomaticHttpsRewrites(getAutomaticHttpsRewritesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getAutomaticHttpsRewrites({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateAutomaticHttpsRewrites', () => {
    describe('positive tests', () => {
      function __updateAutomaticHttpsRewritesTest() {
        // Construct the params object for operation updateAutomaticHttpsRewrites
        const value = 'off';
        const updateAutomaticHttpsRewritesParams = {
          value,
        };

        const updateAutomaticHttpsRewritesResult = zonesSettingsService.updateAutomaticHttpsRewrites(updateAutomaticHttpsRewritesParams);

        // all methods should return a Promise
        expectToBePromise(updateAutomaticHttpsRewritesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/automatic_https_rewrites', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAutomaticHttpsRewritesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateAutomaticHttpsRewritesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateAutomaticHttpsRewritesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAutomaticHttpsRewritesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateAutomaticHttpsRewrites(updateAutomaticHttpsRewritesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateAutomaticHttpsRewrites({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getTrueClientIp', () => {
    describe('positive tests', () => {
      function __getTrueClientIpTest() {
        // Construct the params object for operation getTrueClientIp
        const getTrueClientIpParams = {};

        const getTrueClientIpResult = zonesSettingsService.getTrueClientIp(getTrueClientIpParams);

        // all methods should return a Promise
        expectToBePromise(getTrueClientIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/true_client_ip_header', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTrueClientIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getTrueClientIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getTrueClientIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTrueClientIpParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getTrueClientIp(getTrueClientIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getTrueClientIp({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateTrueClientIp', () => {
    describe('positive tests', () => {
      function __updateTrueClientIpTest() {
        // Construct the params object for operation updateTrueClientIp
        const value = 'on';
        const updateTrueClientIpParams = {
          value,
        };

        const updateTrueClientIpResult = zonesSettingsService.updateTrueClientIp(updateTrueClientIpParams);

        // all methods should return a Promise
        expectToBePromise(updateTrueClientIpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/true_client_ip_header', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateTrueClientIpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateTrueClientIpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateTrueClientIpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateTrueClientIpParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateTrueClientIp(updateTrueClientIpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateTrueClientIp({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getAlwaysUseHttps', () => {
    describe('positive tests', () => {
      function __getAlwaysUseHttpsTest() {
        // Construct the params object for operation getAlwaysUseHttps
        const getAlwaysUseHttpsParams = {};

        const getAlwaysUseHttpsResult = zonesSettingsService.getAlwaysUseHttps(getAlwaysUseHttpsParams);

        // all methods should return a Promise
        expectToBePromise(getAlwaysUseHttpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/always_use_https', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAlwaysUseHttpsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getAlwaysUseHttpsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getAlwaysUseHttpsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAlwaysUseHttpsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getAlwaysUseHttps(getAlwaysUseHttpsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getAlwaysUseHttps({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateAlwaysUseHttps', () => {
    describe('positive tests', () => {
      function __updateAlwaysUseHttpsTest() {
        // Construct the params object for operation updateAlwaysUseHttps
        const value = 'on';
        const updateAlwaysUseHttpsParams = {
          value,
        };

        const updateAlwaysUseHttpsResult = zonesSettingsService.updateAlwaysUseHttps(updateAlwaysUseHttpsParams);

        // all methods should return a Promise
        expectToBePromise(updateAlwaysUseHttpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/always_use_https', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAlwaysUseHttpsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateAlwaysUseHttpsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateAlwaysUseHttpsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAlwaysUseHttpsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateAlwaysUseHttps(updateAlwaysUseHttpsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateAlwaysUseHttps({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getImageSizeOptimization', () => {
    describe('positive tests', () => {
      function __getImageSizeOptimizationTest() {
        // Construct the params object for operation getImageSizeOptimization
        const getImageSizeOptimizationParams = {};

        const getImageSizeOptimizationResult = zonesSettingsService.getImageSizeOptimization(getImageSizeOptimizationParams);

        // all methods should return a Promise
        expectToBePromise(getImageSizeOptimizationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/image_size_optimization', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getImageSizeOptimizationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getImageSizeOptimizationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getImageSizeOptimizationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getImageSizeOptimizationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getImageSizeOptimization(getImageSizeOptimizationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getImageSizeOptimization({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateImageSizeOptimization', () => {
    describe('positive tests', () => {
      function __updateImageSizeOptimizationTest() {
        // Construct the params object for operation updateImageSizeOptimization
        const value = 'lossless';
        const updateImageSizeOptimizationParams = {
          value,
        };

        const updateImageSizeOptimizationResult = zonesSettingsService.updateImageSizeOptimization(updateImageSizeOptimizationParams);

        // all methods should return a Promise
        expectToBePromise(updateImageSizeOptimizationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/image_size_optimization', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateImageSizeOptimizationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateImageSizeOptimizationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateImageSizeOptimizationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateImageSizeOptimizationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateImageSizeOptimization(updateImageSizeOptimizationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateImageSizeOptimization({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getScriptLoadOptimization', () => {
    describe('positive tests', () => {
      function __getScriptLoadOptimizationTest() {
        // Construct the params object for operation getScriptLoadOptimization
        const getScriptLoadOptimizationParams = {};

        const getScriptLoadOptimizationResult = zonesSettingsService.getScriptLoadOptimization(getScriptLoadOptimizationParams);

        // all methods should return a Promise
        expectToBePromise(getScriptLoadOptimizationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/script_load_optimization', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getScriptLoadOptimizationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getScriptLoadOptimizationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getScriptLoadOptimizationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getScriptLoadOptimizationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getScriptLoadOptimization(getScriptLoadOptimizationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getScriptLoadOptimization({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateScriptLoadOptimization', () => {
    describe('positive tests', () => {
      function __updateScriptLoadOptimizationTest() {
        // Construct the params object for operation updateScriptLoadOptimization
        const value = 'on';
        const updateScriptLoadOptimizationParams = {
          value,
        };

        const updateScriptLoadOptimizationResult = zonesSettingsService.updateScriptLoadOptimization(updateScriptLoadOptimizationParams);

        // all methods should return a Promise
        expectToBePromise(updateScriptLoadOptimizationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/script_load_optimization', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateScriptLoadOptimizationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateScriptLoadOptimizationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateScriptLoadOptimizationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateScriptLoadOptimizationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateScriptLoadOptimization(updateScriptLoadOptimizationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateScriptLoadOptimization({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getImageLoadOptimization', () => {
    describe('positive tests', () => {
      function __getImageLoadOptimizationTest() {
        // Construct the params object for operation getImageLoadOptimization
        const getImageLoadOptimizationParams = {};

        const getImageLoadOptimizationResult = zonesSettingsService.getImageLoadOptimization(getImageLoadOptimizationParams);

        // all methods should return a Promise
        expectToBePromise(getImageLoadOptimizationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/image_load_optimization', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getImageLoadOptimizationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getImageLoadOptimizationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getImageLoadOptimizationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getImageLoadOptimizationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getImageLoadOptimization(getImageLoadOptimizationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getImageLoadOptimization({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateImageLoadOptimization', () => {
    describe('positive tests', () => {
      function __updateImageLoadOptimizationTest() {
        // Construct the params object for operation updateImageLoadOptimization
        const value = 'on';
        const updateImageLoadOptimizationParams = {
          value,
        };

        const updateImageLoadOptimizationResult = zonesSettingsService.updateImageLoadOptimization(updateImageLoadOptimizationParams);

        // all methods should return a Promise
        expectToBePromise(updateImageLoadOptimizationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/image_load_optimization', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateImageLoadOptimizationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateImageLoadOptimizationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateImageLoadOptimizationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateImageLoadOptimizationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateImageLoadOptimization(updateImageLoadOptimizationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateImageLoadOptimization({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getMinify', () => {
    describe('positive tests', () => {
      function __getMinifyTest() {
        // Construct the params object for operation getMinify
        const getMinifyParams = {};

        const getMinifyResult = zonesSettingsService.getMinify(getMinifyParams);

        // all methods should return a Promise
        expectToBePromise(getMinifyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/minify', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMinifyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getMinifyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getMinifyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMinifyParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getMinify(getMinifyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getMinify({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateMinify', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // MinifySettingValue
      const minifySettingValueModel = {
        css: 'off',
        html: 'off',
        js: 'off',
      };

      function __updateMinifyTest() {
        // Construct the params object for operation updateMinify
        const value = minifySettingValueModel;
        const updateMinifyParams = {
          value,
        };

        const updateMinifyResult = zonesSettingsService.updateMinify(updateMinifyParams);

        // all methods should return a Promise
        expectToBePromise(updateMinifyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/minify', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateMinifyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateMinifyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateMinifyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateMinifyParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateMinify(updateMinifyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateMinify({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getMinTlsVersion', () => {
    describe('positive tests', () => {
      function __getMinTlsVersionTest() {
        // Construct the params object for operation getMinTlsVersion
        const getMinTlsVersionParams = {};

        const getMinTlsVersionResult = zonesSettingsService.getMinTlsVersion(getMinTlsVersionParams);

        // all methods should return a Promise
        expectToBePromise(getMinTlsVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/min_tls_version', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMinTlsVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getMinTlsVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getMinTlsVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMinTlsVersionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getMinTlsVersion(getMinTlsVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getMinTlsVersion({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateMinTlsVersion', () => {
    describe('positive tests', () => {
      function __updateMinTlsVersionTest() {
        // Construct the params object for operation updateMinTlsVersion
        const value = '1.2';
        const updateMinTlsVersionParams = {
          value,
        };

        const updateMinTlsVersionResult = zonesSettingsService.updateMinTlsVersion(updateMinTlsVersionParams);

        // all methods should return a Promise
        expectToBePromise(updateMinTlsVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/min_tls_version', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateMinTlsVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateMinTlsVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateMinTlsVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateMinTlsVersionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateMinTlsVersion(updateMinTlsVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateMinTlsVersion({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getIpGeolocation', () => {
    describe('positive tests', () => {
      function __getIpGeolocationTest() {
        // Construct the params object for operation getIpGeolocation
        const getIpGeolocationParams = {};

        const getIpGeolocationResult = zonesSettingsService.getIpGeolocation(getIpGeolocationParams);

        // all methods should return a Promise
        expectToBePromise(getIpGeolocationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/ip_geolocation', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getIpGeolocationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getIpGeolocationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getIpGeolocationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getIpGeolocationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getIpGeolocation(getIpGeolocationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getIpGeolocation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateIpGeolocation', () => {
    describe('positive tests', () => {
      function __updateIpGeolocationTest() {
        // Construct the params object for operation updateIpGeolocation
        const value = 'on';
        const updateIpGeolocationParams = {
          value,
        };

        const updateIpGeolocationResult = zonesSettingsService.updateIpGeolocation(updateIpGeolocationParams);

        // all methods should return a Promise
        expectToBePromise(updateIpGeolocationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/ip_geolocation', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateIpGeolocationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateIpGeolocationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateIpGeolocationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateIpGeolocationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateIpGeolocation(updateIpGeolocationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateIpGeolocation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getServerSideExclude', () => {
    describe('positive tests', () => {
      function __getServerSideExcludeTest() {
        // Construct the params object for operation getServerSideExclude
        const getServerSideExcludeParams = {};

        const getServerSideExcludeResult = zonesSettingsService.getServerSideExclude(getServerSideExcludeParams);

        // all methods should return a Promise
        expectToBePromise(getServerSideExcludeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/server_side_exclude', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getServerSideExcludeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getServerSideExcludeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getServerSideExcludeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getServerSideExcludeParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getServerSideExclude(getServerSideExcludeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getServerSideExclude({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateServerSideExclude', () => {
    describe('positive tests', () => {
      function __updateServerSideExcludeTest() {
        // Construct the params object for operation updateServerSideExclude
        const value = 'on';
        const updateServerSideExcludeParams = {
          value,
        };

        const updateServerSideExcludeResult = zonesSettingsService.updateServerSideExclude(updateServerSideExcludeParams);

        // all methods should return a Promise
        expectToBePromise(updateServerSideExcludeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/server_side_exclude', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateServerSideExcludeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateServerSideExcludeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateServerSideExcludeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateServerSideExcludeParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateServerSideExclude(updateServerSideExcludeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateServerSideExclude({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getSecurityHeader', () => {
    describe('positive tests', () => {
      function __getSecurityHeaderTest() {
        // Construct the params object for operation getSecurityHeader
        const getSecurityHeaderParams = {};

        const getSecurityHeaderResult = zonesSettingsService.getSecurityHeader(getSecurityHeaderParams);

        // all methods should return a Promise
        expectToBePromise(getSecurityHeaderResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/security_header', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSecurityHeaderTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getSecurityHeaderTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getSecurityHeaderTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSecurityHeaderParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getSecurityHeader(getSecurityHeaderParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getSecurityHeader({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateSecurityHeader', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SecurityHeaderSettingValueStrictTransportSecurity
      const securityHeaderSettingValueStrictTransportSecurityModel = {
        enabled: true,
        max_age: 86400,
        include_subdomains: true,
        preload: true,
        nosniff: true,
      };

      // SecurityHeaderSettingValue
      const securityHeaderSettingValueModel = {
        strict_transport_security: securityHeaderSettingValueStrictTransportSecurityModel,
      };

      function __updateSecurityHeaderTest() {
        // Construct the params object for operation updateSecurityHeader
        const value = securityHeaderSettingValueModel;
        const updateSecurityHeaderParams = {
          value,
        };

        const updateSecurityHeaderResult = zonesSettingsService.updateSecurityHeader(updateSecurityHeaderParams);

        // all methods should return a Promise
        expectToBePromise(updateSecurityHeaderResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/security_header', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSecurityHeaderTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateSecurityHeaderTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateSecurityHeaderTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSecurityHeaderParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateSecurityHeader(updateSecurityHeaderParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateSecurityHeader({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getMobileRedirect', () => {
    describe('positive tests', () => {
      function __getMobileRedirectTest() {
        // Construct the params object for operation getMobileRedirect
        const getMobileRedirectParams = {};

        const getMobileRedirectResult = zonesSettingsService.getMobileRedirect(getMobileRedirectParams);

        // all methods should return a Promise
        expectToBePromise(getMobileRedirectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/mobile_redirect', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMobileRedirectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getMobileRedirectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getMobileRedirectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMobileRedirectParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getMobileRedirect(getMobileRedirectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getMobileRedirect({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateMobileRedirect', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // MobileRedirecSettingValue
      const mobileRedirecSettingValueModel = {
        status: 'on',
        mobile_subdomain: 'm',
        strip_uri: false,
      };

      function __updateMobileRedirectTest() {
        // Construct the params object for operation updateMobileRedirect
        const value = mobileRedirecSettingValueModel;
        const updateMobileRedirectParams = {
          value,
        };

        const updateMobileRedirectResult = zonesSettingsService.updateMobileRedirect(updateMobileRedirectParams);

        // all methods should return a Promise
        expectToBePromise(updateMobileRedirectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/mobile_redirect', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateMobileRedirectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateMobileRedirectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateMobileRedirectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateMobileRedirectParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateMobileRedirect(updateMobileRedirectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateMobileRedirect({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getPrefetchPreload', () => {
    describe('positive tests', () => {
      function __getPrefetchPreloadTest() {
        // Construct the params object for operation getPrefetchPreload
        const getPrefetchPreloadParams = {};

        const getPrefetchPreloadResult = zonesSettingsService.getPrefetchPreload(getPrefetchPreloadParams);

        // all methods should return a Promise
        expectToBePromise(getPrefetchPreloadResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/prefetch_preload', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPrefetchPreloadTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getPrefetchPreloadTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getPrefetchPreloadTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPrefetchPreloadParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getPrefetchPreload(getPrefetchPreloadParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getPrefetchPreload({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updatePrefetchPreload', () => {
    describe('positive tests', () => {
      function __updatePrefetchPreloadTest() {
        // Construct the params object for operation updatePrefetchPreload
        const value = 'on';
        const updatePrefetchPreloadParams = {
          value,
        };

        const updatePrefetchPreloadResult = zonesSettingsService.updatePrefetchPreload(updatePrefetchPreloadParams);

        // all methods should return a Promise
        expectToBePromise(updatePrefetchPreloadResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/prefetch_preload', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updatePrefetchPreloadTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updatePrefetchPreloadTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updatePrefetchPreloadTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updatePrefetchPreloadParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updatePrefetchPreload(updatePrefetchPreloadParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updatePrefetchPreload({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getHttp2', () => {
    describe('positive tests', () => {
      function __getHttp2Test() {
        // Construct the params object for operation getHttp2
        const getHttp2Params = {};

        const getHttp2Result = zonesSettingsService.getHttp2(getHttp2Params);

        // all methods should return a Promise
        expectToBePromise(getHttp2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/http2', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getHttp2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getHttp2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getHttp2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getHttp2Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getHttp2(getHttp2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getHttp2({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateHttp2', () => {
    describe('positive tests', () => {
      function __updateHttp2Test() {
        // Construct the params object for operation updateHttp2
        const value = 'on';
        const updateHttp2Params = {
          value,
        };

        const updateHttp2Result = zonesSettingsService.updateHttp2(updateHttp2Params);

        // all methods should return a Promise
        expectToBePromise(updateHttp2Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/http2', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateHttp2Test();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateHttp2Test();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateHttp2Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateHttp2Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateHttp2(updateHttp2Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateHttp2({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getHttp3', () => {
    describe('positive tests', () => {
      function __getHttp3Test() {
        // Construct the params object for operation getHttp3
        const getHttp3Params = {};

        const getHttp3Result = zonesSettingsService.getHttp3(getHttp3Params);

        // all methods should return a Promise
        expectToBePromise(getHttp3Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/http3', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getHttp3Test();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getHttp3Test();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getHttp3Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getHttp3Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getHttp3(getHttp3Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getHttp3({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateHttp3', () => {
    describe('positive tests', () => {
      function __updateHttp3Test() {
        // Construct the params object for operation updateHttp3
        const value = 'on';
        const updateHttp3Params = {
          value,
        };

        const updateHttp3Result = zonesSettingsService.updateHttp3(updateHttp3Params);

        // all methods should return a Promise
        expectToBePromise(updateHttp3Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/http3', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateHttp3Test();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateHttp3Test();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateHttp3Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateHttp3Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateHttp3(updateHttp3Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateHttp3({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getIpv6', () => {
    describe('positive tests', () => {
      function __getIpv6Test() {
        // Construct the params object for operation getIpv6
        const getIpv6Params = {};

        const getIpv6Result = zonesSettingsService.getIpv6(getIpv6Params);

        // all methods should return a Promise
        expectToBePromise(getIpv6Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/ipv6', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getIpv6Test();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getIpv6Test();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getIpv6Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getIpv6Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getIpv6(getIpv6Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getIpv6({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateIpv6', () => {
    describe('positive tests', () => {
      function __updateIpv6Test() {
        // Construct the params object for operation updateIpv6
        const value = 'on';
        const updateIpv6Params = {
          value,
        };

        const updateIpv6Result = zonesSettingsService.updateIpv6(updateIpv6Params);

        // all methods should return a Promise
        expectToBePromise(updateIpv6Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/ipv6', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateIpv6Test();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateIpv6Test();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateIpv6Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateIpv6Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateIpv6(updateIpv6Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateIpv6({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getWebSockets', () => {
    describe('positive tests', () => {
      function __getWebSocketsTest() {
        // Construct the params object for operation getWebSockets
        const getWebSocketsParams = {};

        const getWebSocketsResult = zonesSettingsService.getWebSockets(getWebSocketsParams);

        // all methods should return a Promise
        expectToBePromise(getWebSocketsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/websockets', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getWebSocketsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getWebSocketsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getWebSocketsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getWebSocketsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getWebSockets(getWebSocketsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getWebSockets({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateWebSockets', () => {
    describe('positive tests', () => {
      function __updateWebSocketsTest() {
        // Construct the params object for operation updateWebSockets
        const value = 'on';
        const updateWebSocketsParams = {
          value,
        };

        const updateWebSocketsResult = zonesSettingsService.updateWebSockets(updateWebSocketsParams);

        // all methods should return a Promise
        expectToBePromise(updateWebSocketsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/websockets', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateWebSocketsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateWebSocketsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateWebSocketsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateWebSocketsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateWebSockets(updateWebSocketsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateWebSockets({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getPseudoIpv4', () => {
    describe('positive tests', () => {
      function __getPseudoIpv4Test() {
        // Construct the params object for operation getPseudoIpv4
        const getPseudoIpv4Params = {};

        const getPseudoIpv4Result = zonesSettingsService.getPseudoIpv4(getPseudoIpv4Params);

        // all methods should return a Promise
        expectToBePromise(getPseudoIpv4Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/pseudo_ipv4', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPseudoIpv4Test();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getPseudoIpv4Test();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getPseudoIpv4Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPseudoIpv4Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getPseudoIpv4(getPseudoIpv4Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getPseudoIpv4({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updatePseudoIpv4', () => {
    describe('positive tests', () => {
      function __updatePseudoIpv4Test() {
        // Construct the params object for operation updatePseudoIpv4
        const value = 'add_header';
        const updatePseudoIpv4Params = {
          value,
        };

        const updatePseudoIpv4Result = zonesSettingsService.updatePseudoIpv4(updatePseudoIpv4Params);

        // all methods should return a Promise
        expectToBePromise(updatePseudoIpv4Result);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/pseudo_ipv4', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updatePseudoIpv4Test();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updatePseudoIpv4Test();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updatePseudoIpv4Test();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updatePseudoIpv4Params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updatePseudoIpv4(updatePseudoIpv4Params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updatePseudoIpv4({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getResponseBuffering', () => {
    describe('positive tests', () => {
      function __getResponseBufferingTest() {
        // Construct the params object for operation getResponseBuffering
        const getResponseBufferingParams = {};

        const getResponseBufferingResult = zonesSettingsService.getResponseBuffering(getResponseBufferingParams);

        // all methods should return a Promise
        expectToBePromise(getResponseBufferingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/response_buffering', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResponseBufferingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getResponseBufferingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getResponseBufferingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getResponseBufferingParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getResponseBuffering(getResponseBufferingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getResponseBuffering({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateResponseBuffering', () => {
    describe('positive tests', () => {
      function __updateResponseBufferingTest() {
        // Construct the params object for operation updateResponseBuffering
        const value = 'on';
        const updateResponseBufferingParams = {
          value,
        };

        const updateResponseBufferingResult = zonesSettingsService.updateResponseBuffering(updateResponseBufferingParams);

        // all methods should return a Promise
        expectToBePromise(updateResponseBufferingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/response_buffering', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateResponseBufferingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateResponseBufferingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateResponseBufferingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateResponseBufferingParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateResponseBuffering(updateResponseBufferingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateResponseBuffering({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getHotlinkProtection', () => {
    describe('positive tests', () => {
      function __getHotlinkProtectionTest() {
        // Construct the params object for operation getHotlinkProtection
        const getHotlinkProtectionParams = {};

        const getHotlinkProtectionResult = zonesSettingsService.getHotlinkProtection(getHotlinkProtectionParams);

        // all methods should return a Promise
        expectToBePromise(getHotlinkProtectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/hotlink_protection', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getHotlinkProtectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getHotlinkProtectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getHotlinkProtectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getHotlinkProtectionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getHotlinkProtection(getHotlinkProtectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getHotlinkProtection({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateHotlinkProtection', () => {
    describe('positive tests', () => {
      function __updateHotlinkProtectionTest() {
        // Construct the params object for operation updateHotlinkProtection
        const value = 'on';
        const updateHotlinkProtectionParams = {
          value,
        };

        const updateHotlinkProtectionResult = zonesSettingsService.updateHotlinkProtection(updateHotlinkProtectionParams);

        // all methods should return a Promise
        expectToBePromise(updateHotlinkProtectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/hotlink_protection', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateHotlinkProtectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateHotlinkProtectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateHotlinkProtectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateHotlinkProtectionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateHotlinkProtection(updateHotlinkProtectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateHotlinkProtection({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getMaxUpload', () => {
    describe('positive tests', () => {
      function __getMaxUploadTest() {
        // Construct the params object for operation getMaxUpload
        const getMaxUploadParams = {};

        const getMaxUploadResult = zonesSettingsService.getMaxUpload(getMaxUploadParams);

        // all methods should return a Promise
        expectToBePromise(getMaxUploadResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/max_upload', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMaxUploadTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getMaxUploadTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getMaxUploadTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMaxUploadParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getMaxUpload(getMaxUploadParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getMaxUpload({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateMaxUpload', () => {
    describe('positive tests', () => {
      function __updateMaxUploadTest() {
        // Construct the params object for operation updateMaxUpload
        const value = 300;
        const updateMaxUploadParams = {
          value,
        };

        const updateMaxUploadResult = zonesSettingsService.updateMaxUpload(updateMaxUploadParams);

        // all methods should return a Promise
        expectToBePromise(updateMaxUploadResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/max_upload', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateMaxUploadTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateMaxUploadTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateMaxUploadTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateMaxUploadParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateMaxUpload(updateMaxUploadParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateMaxUpload({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getTlsClientAuth', () => {
    describe('positive tests', () => {
      function __getTlsClientAuthTest() {
        // Construct the params object for operation getTlsClientAuth
        const getTlsClientAuthParams = {};

        const getTlsClientAuthResult = zonesSettingsService.getTlsClientAuth(getTlsClientAuthParams);

        // all methods should return a Promise
        expectToBePromise(getTlsClientAuthResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/tls_client_auth', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTlsClientAuthTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getTlsClientAuthTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getTlsClientAuthTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTlsClientAuthParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getTlsClientAuth(getTlsClientAuthParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getTlsClientAuth({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateTlsClientAuth', () => {
    describe('positive tests', () => {
      function __updateTlsClientAuthTest() {
        // Construct the params object for operation updateTlsClientAuth
        const value = 'on';
        const updateTlsClientAuthParams = {
          value,
        };

        const updateTlsClientAuthResult = zonesSettingsService.updateTlsClientAuth(updateTlsClientAuthParams);

        // all methods should return a Promise
        expectToBePromise(updateTlsClientAuthResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/tls_client_auth', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateTlsClientAuthTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateTlsClientAuthTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateTlsClientAuthTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateTlsClientAuthParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateTlsClientAuth(updateTlsClientAuthParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateTlsClientAuth({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getBrotli', () => {
    describe('positive tests', () => {
      function __getBrotliTest() {
        // Construct the params object for operation getBrotli
        const getBrotliParams = {};

        const getBrotliResult = zonesSettingsService.getBrotli(getBrotliParams);

        // all methods should return a Promise
        expectToBePromise(getBrotliResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/brotli', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBrotliTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getBrotliTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getBrotliTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBrotliParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getBrotli(getBrotliParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getBrotli({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateBrotli', () => {
    describe('positive tests', () => {
      function __updateBrotliTest() {
        // Construct the params object for operation updateBrotli
        const value = 'on';
        const updateBrotliParams = {
          value,
        };

        const updateBrotliResult = zonesSettingsService.updateBrotli(updateBrotliParams);

        // all methods should return a Promise
        expectToBePromise(updateBrotliResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/brotli', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateBrotliTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateBrotliTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateBrotliTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateBrotliParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateBrotli(updateBrotliParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateBrotli({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getProxyReadTimeout', () => {
    describe('positive tests', () => {
      function __getProxyReadTimeoutTest() {
        // Construct the params object for operation getProxyReadTimeout
        const getProxyReadTimeoutParams = {};

        const getProxyReadTimeoutResult = zonesSettingsService.getProxyReadTimeout(getProxyReadTimeoutParams);

        // all methods should return a Promise
        expectToBePromise(getProxyReadTimeoutResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/proxy_read_timeout', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProxyReadTimeoutTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getProxyReadTimeoutTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getProxyReadTimeoutTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProxyReadTimeoutParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getProxyReadTimeout(getProxyReadTimeoutParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getProxyReadTimeout({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateProxyReadTimeout', () => {
    describe('positive tests', () => {
      function __updateProxyReadTimeoutTest() {
        // Construct the params object for operation updateProxyReadTimeout
        const value = 600;
        const updateProxyReadTimeoutParams = {
          value,
        };

        const updateProxyReadTimeoutResult = zonesSettingsService.updateProxyReadTimeout(updateProxyReadTimeoutParams);

        // all methods should return a Promise
        expectToBePromise(updateProxyReadTimeoutResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/proxy_read_timeout', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateProxyReadTimeoutTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateProxyReadTimeoutTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateProxyReadTimeoutTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateProxyReadTimeoutParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateProxyReadTimeout(updateProxyReadTimeoutParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateProxyReadTimeout({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getBrowserCheck', () => {
    describe('positive tests', () => {
      function __getBrowserCheckTest() {
        // Construct the params object for operation getBrowserCheck
        const getBrowserCheckParams = {};

        const getBrowserCheckResult = zonesSettingsService.getBrowserCheck(getBrowserCheckParams);

        // all methods should return a Promise
        expectToBePromise(getBrowserCheckResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/browser_check', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBrowserCheckTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getBrowserCheckTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getBrowserCheckTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBrowserCheckParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getBrowserCheck(getBrowserCheckParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getBrowserCheck({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateBrowserCheck', () => {
    describe('positive tests', () => {
      function __updateBrowserCheckTest() {
        // Construct the params object for operation updateBrowserCheck
        const value = 'on';
        const updateBrowserCheckParams = {
          value,
        };

        const updateBrowserCheckResult = zonesSettingsService.updateBrowserCheck(updateBrowserCheckParams);

        // all methods should return a Promise
        expectToBePromise(updateBrowserCheckResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/browser_check', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateBrowserCheckTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateBrowserCheckTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateBrowserCheckTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateBrowserCheckParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateBrowserCheck(updateBrowserCheckParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateBrowserCheck({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getEnableErrorPagesOn', () => {
    describe('positive tests', () => {
      function __getEnableErrorPagesOnTest() {
        // Construct the params object for operation getEnableErrorPagesOn
        const getEnableErrorPagesOnParams = {};

        const getEnableErrorPagesOnResult = zonesSettingsService.getEnableErrorPagesOn(getEnableErrorPagesOnParams);

        // all methods should return a Promise
        expectToBePromise(getEnableErrorPagesOnResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/origin_error_page_pass_thru', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getEnableErrorPagesOnTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getEnableErrorPagesOnTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getEnableErrorPagesOnTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getEnableErrorPagesOnParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getEnableErrorPagesOn(getEnableErrorPagesOnParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getEnableErrorPagesOn({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateEnableErrorPagesOn', () => {
    describe('positive tests', () => {
      function __updateEnableErrorPagesOnTest() {
        // Construct the params object for operation updateEnableErrorPagesOn
        const value = 'on';
        const updateEnableErrorPagesOnParams = {
          value,
        };

        const updateEnableErrorPagesOnResult = zonesSettingsService.updateEnableErrorPagesOn(updateEnableErrorPagesOnParams);

        // all methods should return a Promise
        expectToBePromise(updateEnableErrorPagesOnResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/origin_error_page_pass_thru', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateEnableErrorPagesOnTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateEnableErrorPagesOnTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateEnableErrorPagesOnTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateEnableErrorPagesOnParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateEnableErrorPagesOn(updateEnableErrorPagesOnParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateEnableErrorPagesOn({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getWebApplicationFirewall', () => {
    describe('positive tests', () => {
      function __getWebApplicationFirewallTest() {
        // Construct the params object for operation getWebApplicationFirewall
        const getWebApplicationFirewallParams = {};

        const getWebApplicationFirewallResult = zonesSettingsService.getWebApplicationFirewall(getWebApplicationFirewallParams);

        // all methods should return a Promise
        expectToBePromise(getWebApplicationFirewallResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/waf', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getWebApplicationFirewallTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getWebApplicationFirewallTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getWebApplicationFirewallTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getWebApplicationFirewallParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getWebApplicationFirewall(getWebApplicationFirewallParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getWebApplicationFirewall({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateWebApplicationFirewall', () => {
    describe('positive tests', () => {
      function __updateWebApplicationFirewallTest() {
        // Construct the params object for operation updateWebApplicationFirewall
        const value = 'on';
        const updateWebApplicationFirewallParams = {
          value,
        };

        const updateWebApplicationFirewallResult = zonesSettingsService.updateWebApplicationFirewall(updateWebApplicationFirewallParams);

        // all methods should return a Promise
        expectToBePromise(updateWebApplicationFirewallResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/waf', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateWebApplicationFirewallTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateWebApplicationFirewallTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateWebApplicationFirewallTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateWebApplicationFirewallParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateWebApplicationFirewall(updateWebApplicationFirewallParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateWebApplicationFirewall({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getCiphers', () => {
    describe('positive tests', () => {
      function __getCiphersTest() {
        // Construct the params object for operation getCiphers
        const getCiphersParams = {};

        const getCiphersResult = zonesSettingsService.getCiphers(getCiphersParams);

        // all methods should return a Promise
        expectToBePromise(getCiphersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/ciphers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCiphersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getCiphersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getCiphersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCiphersParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getCiphers(getCiphersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getCiphers({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateCiphers', () => {
    describe('positive tests', () => {
      function __updateCiphersTest() {
        // Construct the params object for operation updateCiphers
        const value = ['AES256-GCM-SHA384', 'AES256-SHA256'];
        const updateCiphersParams = {
          value,
        };

        const updateCiphersResult = zonesSettingsService.updateCiphers(updateCiphersParams);

        // all methods should return a Promise
        expectToBePromise(updateCiphersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/ciphers', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCiphersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateCiphersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateCiphersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateCiphersParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateCiphers(updateCiphersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateCiphers({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getOriginMaxHttpVersion', () => {
    describe('positive tests', () => {
      function __getOriginMaxHttpVersionTest() {
        // Construct the params object for operation getOriginMaxHttpVersion
        const getOriginMaxHttpVersionParams = {};

        const getOriginMaxHttpVersionResult = zonesSettingsService.getOriginMaxHttpVersion(getOriginMaxHttpVersionParams);

        // all methods should return a Promise
        expectToBePromise(getOriginMaxHttpVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/origin_max_http_version', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOriginMaxHttpVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getOriginMaxHttpVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getOriginMaxHttpVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getOriginMaxHttpVersionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getOriginMaxHttpVersion(getOriginMaxHttpVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getOriginMaxHttpVersion({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateOriginMaxHttpVersion', () => {
    describe('positive tests', () => {
      function __updateOriginMaxHttpVersionTest() {
        // Construct the params object for operation updateOriginMaxHttpVersion
        const value = '1';
        const updateOriginMaxHttpVersionParams = {
          value,
        };

        const updateOriginMaxHttpVersionResult = zonesSettingsService.updateOriginMaxHttpVersion(updateOriginMaxHttpVersionParams);

        // all methods should return a Promise
        expectToBePromise(updateOriginMaxHttpVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/origin_max_http_version', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateOriginMaxHttpVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateOriginMaxHttpVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateOriginMaxHttpVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateOriginMaxHttpVersionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateOriginMaxHttpVersion(updateOriginMaxHttpVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateOriginMaxHttpVersion({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getOriginPostQuantumEncryption', () => {
    describe('positive tests', () => {
      function __getOriginPostQuantumEncryptionTest() {
        // Construct the params object for operation getOriginPostQuantumEncryption
        const getOriginPostQuantumEncryptionParams = {};

        const getOriginPostQuantumEncryptionResult = zonesSettingsService.getOriginPostQuantumEncryption(getOriginPostQuantumEncryptionParams);

        // all methods should return a Promise
        expectToBePromise(getOriginPostQuantumEncryptionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/cache/origin_post_quantum_encryption', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOriginPostQuantumEncryptionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getOriginPostQuantumEncryptionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getOriginPostQuantumEncryptionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getOriginPostQuantumEncryptionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getOriginPostQuantumEncryption(getOriginPostQuantumEncryptionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getOriginPostQuantumEncryption({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateOriginPostQuantumEncryption', () => {
    describe('positive tests', () => {
      function __updateOriginPostQuantumEncryptionTest() {
        // Construct the params object for operation updateOriginPostQuantumEncryption
        const value = 'preferred';
        const updateOriginPostQuantumEncryptionParams = {
          value,
        };

        const updateOriginPostQuantumEncryptionResult = zonesSettingsService.updateOriginPostQuantumEncryption(updateOriginPostQuantumEncryptionParams);

        // all methods should return a Promise
        expectToBePromise(updateOriginPostQuantumEncryptionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/cache/origin_post_quantum_encryption', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateOriginPostQuantumEncryptionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateOriginPostQuantumEncryptionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateOriginPostQuantumEncryptionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateOriginPostQuantumEncryptionParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateOriginPostQuantumEncryption(updateOriginPostQuantumEncryptionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateOriginPostQuantumEncryption({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getLogRetention', () => {
    describe('positive tests', () => {
      function __getLogRetentionTest() {
        // Construct the params object for operation getLogRetention
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const getLogRetentionParams = {
          crn,
          zoneIdentifier,
        };

        const getLogRetentionResult = zonesSettingsService.getLogRetention(getLogRetentionParams);

        // all methods should return a Promise
        expectToBePromise(getLogRetentionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/logs/retention', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLogRetentionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getLogRetentionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getLogRetentionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLogRetentionParams = {
          crn,
          zoneIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getLogRetention(getLogRetentionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await zonesSettingsService.getLogRetention({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await zonesSettingsService.getLogRetention();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateLogRetention', () => {
    describe('positive tests', () => {
      function __updateLogRetentionTest() {
        // Construct the params object for operation updateLogRetention
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const flag = true;
        const updateLogRetentionParams = {
          crn,
          zoneIdentifier,
          flag,
        };

        const updateLogRetentionResult = zonesSettingsService.updateLogRetention(updateLogRetentionParams);

        // all methods should return a Promise
        expectToBePromise(updateLogRetentionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/logs/retention', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.flag).toEqual(flag);
        expect(mockRequestOptions.path.crn).toEqual(crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateLogRetentionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateLogRetentionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateLogRetentionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const crn = 'testString';
        const zoneIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateLogRetentionParams = {
          crn,
          zoneIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateLogRetention(updateLogRetentionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await zonesSettingsService.updateLogRetention({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await zonesSettingsService.updateLogRetention();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getBotManagement', () => {
    describe('positive tests', () => {
      function __getBotManagementTest() {
        // Construct the params object for operation getBotManagement
        const getBotManagementParams = {};

        const getBotManagementResult = zonesSettingsService.getBotManagement(getBotManagementParams);

        // all methods should return a Promise
        expectToBePromise(getBotManagementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/bot_management', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBotManagementTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getBotManagementTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getBotManagementTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBotManagementParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getBotManagement(getBotManagementParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getBotManagement({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateBotManagement', () => {
    describe('positive tests', () => {
      function __updateBotManagementTest() {
        // Construct the params object for operation updateBotManagement
        const sessionScore = false;
        const enableJs = false;
        const useLatestModel = false;
        const aiBotsProtection = 'block';
        const updateBotManagementParams = {
          sessionScore,
          enableJs,
          useLatestModel,
          aiBotsProtection,
        };

        const updateBotManagementResult = zonesSettingsService.updateBotManagement(updateBotManagementParams);

        // all methods should return a Promise
        expectToBePromise(updateBotManagementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/bot_management', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.session_score).toEqual(sessionScore);
        expect(mockRequestOptions.body.enable_js).toEqual(enableJs);
        expect(mockRequestOptions.body.use_latest_model).toEqual(useLatestModel);
        expect(mockRequestOptions.body.ai_bots_protection).toEqual(aiBotsProtection);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateBotManagementTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateBotManagementTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateBotManagementTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateBotManagementParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateBotManagement(updateBotManagementParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateBotManagement({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getReplaceInsecureJs', () => {
    describe('positive tests', () => {
      function __getReplaceInsecureJsTest() {
        // Construct the params object for operation getReplaceInsecureJs
        const getReplaceInsecureJsParams = {};

        const getReplaceInsecureJsResult = zonesSettingsService.getReplaceInsecureJs(getReplaceInsecureJsParams);

        // all methods should return a Promise
        expectToBePromise(getReplaceInsecureJsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/replace_insecure_js', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReplaceInsecureJsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getReplaceInsecureJsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getReplaceInsecureJsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReplaceInsecureJsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getReplaceInsecureJs(getReplaceInsecureJsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getReplaceInsecureJs({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateReplaceInsecureJs', () => {
    describe('positive tests', () => {
      function __updateReplaceInsecureJsTest() {
        // Construct the params object for operation updateReplaceInsecureJs
        const value = 'off';
        const updateReplaceInsecureJsParams = {
          value,
        };

        const updateReplaceInsecureJsResult = zonesSettingsService.updateReplaceInsecureJs(updateReplaceInsecureJsParams);

        // all methods should return a Promise
        expectToBePromise(updateReplaceInsecureJsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/replace_insecure_js', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateReplaceInsecureJsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateReplaceInsecureJsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateReplaceInsecureJsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateReplaceInsecureJsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateReplaceInsecureJs(updateReplaceInsecureJsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateReplaceInsecureJs({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getEmailObfuscation', () => {
    describe('positive tests', () => {
      function __getEmailObfuscationTest() {
        // Construct the params object for operation getEmailObfuscation
        const getEmailObfuscationParams = {};

        const getEmailObfuscationResult = zonesSettingsService.getEmailObfuscation(getEmailObfuscationParams);

        // all methods should return a Promise
        expectToBePromise(getEmailObfuscationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/email_obfuscation', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getEmailObfuscationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __getEmailObfuscationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __getEmailObfuscationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getEmailObfuscationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.getEmailObfuscation(getEmailObfuscationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.getEmailObfuscation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('updateEmailObfuscation', () => {
    describe('positive tests', () => {
      function __updateEmailObfuscationTest() {
        // Construct the params object for operation updateEmailObfuscation
        const value = 'off';
        const updateEmailObfuscationParams = {
          value,
        };

        const updateEmailObfuscationResult = zonesSettingsService.updateEmailObfuscation(updateEmailObfuscationParams);

        // all methods should return a Promise
        expectToBePromise(updateEmailObfuscationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/settings/email_obfuscation', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value).toEqual(value);
        expect(mockRequestOptions.path.crn).toEqual(zonesSettingsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(zonesSettingsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateEmailObfuscationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.enableRetries();
        __updateEmailObfuscationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        zonesSettingsService.disableRetries();
        __updateEmailObfuscationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateEmailObfuscationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zonesSettingsService.updateEmailObfuscation(updateEmailObfuscationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zonesSettingsService.updateEmailObfuscation({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
