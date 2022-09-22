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

const DirectLinkV1 = require('../../dist/direct-link/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const directLinkServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://directlink.cloud.ibm.com/v1',
  version: 'testString',
};

const directLinkService = new DirectLinkV1(directLinkServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(directLinkService, 'createRequest');
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
    version: 'testString',
  };
});

describe('DirectLinkV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = DirectLinkV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(DirectLinkV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(DirectLinkV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(DirectLinkV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = DirectLinkV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(DirectLinkV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DirectLinkV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DirectLinkV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(DirectLinkV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new DirectLinkV1(directLinkServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(directLinkServiceOptions.version);
      });
    });
  });
  describe('listGatewayRouteReports', () => {
    describe('positive tests', () => {
      function __listGatewayRouteReportsTest() {
        // Construct the params object for operation listGatewayRouteReports
        const gatewayId = 'testString';
        const params = {
          gatewayId: gatewayId,
        };

        const listGatewayRouteReportsResult = directLinkService.listGatewayRouteReports(params);

        // all methods should return a Promise
        expectToBePromise(listGatewayRouteReportsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/route_reports', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listGatewayRouteReportsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __listGatewayRouteReportsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __listGatewayRouteReportsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listGatewayRouteReports(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.listGatewayRouteReports({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listGatewayRouteReportsPromise = directLinkService.listGatewayRouteReports();
        expectToBePromise(listGatewayRouteReportsPromise);

        listGatewayRouteReportsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createGatewayRouteReport', () => {
    describe('positive tests', () => {
      function __createGatewayRouteReportTest() {
        // Construct the params object for operation createGatewayRouteReport
        const gatewayId = 'testString';
        const params = {
          gatewayId: gatewayId,
        };

        const createGatewayRouteReportResult = directLinkService.createGatewayRouteReport(params);

        // all methods should return a Promise
        expectToBePromise(createGatewayRouteReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/route_reports', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createGatewayRouteReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __createGatewayRouteReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __createGatewayRouteReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.createGatewayRouteReport(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.createGatewayRouteReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createGatewayRouteReportPromise = directLinkService.createGatewayRouteReport();
        expectToBePromise(createGatewayRouteReportPromise);

        createGatewayRouteReportPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteGatewayRouteReport', () => {
    describe('positive tests', () => {
      function __deleteGatewayRouteReportTest() {
        // Construct the params object for operation deleteGatewayRouteReport
        const gatewayId = 'testString';
        const id = 'testString';
        const params = {
          gatewayId: gatewayId,
          id: id,
        };

        const deleteGatewayRouteReportResult = directLinkService.deleteGatewayRouteReport(params);

        // all methods should return a Promise
        expectToBePromise(deleteGatewayRouteReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/route_reports/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteGatewayRouteReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __deleteGatewayRouteReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __deleteGatewayRouteReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.deleteGatewayRouteReport(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.deleteGatewayRouteReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteGatewayRouteReportPromise = directLinkService.deleteGatewayRouteReport();
        expectToBePromise(deleteGatewayRouteReportPromise);

        deleteGatewayRouteReportPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGatewayRouteReport', () => {
    describe('positive tests', () => {
      function __getGatewayRouteReportTest() {
        // Construct the params object for operation getGatewayRouteReport
        const gatewayId = 'testString';
        const id = 'testString';
        const params = {
          gatewayId: gatewayId,
          id: id,
        };

        const getGatewayRouteReportResult = directLinkService.getGatewayRouteReport(params);

        // all methods should return a Promise
        expectToBePromise(getGatewayRouteReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/route_reports/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getGatewayRouteReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __getGatewayRouteReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __getGatewayRouteReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.getGatewayRouteReport(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.getGatewayRouteReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getGatewayRouteReportPromise = directLinkService.getGatewayRouteReport();
        expectToBePromise(getGatewayRouteReportPromise);

        getGatewayRouteReportPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listGateways', () => {
    describe('positive tests', () => {
      function __listGatewaysTest() {
        // Construct the params object for operation listGateways
        const params = {};

        const listGatewaysResult = directLinkService.listGateways(params);

        // all methods should return a Promise
        expectToBePromise(listGatewaysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listGatewaysTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __listGatewaysTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __listGatewaysTest();
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

        directLinkService.listGateways(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        directLinkService.listGateways({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createGateway', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AsPrependTemplate
      const asPrependTemplateModel = {
        length: 4,
        policy: 'import',
        prefix: '172.17.0.0/16',
      };

      // GatewayTemplateAuthenticationKey
      const gatewayTemplateAuthenticationKeyModel = {
        crn: 'crn:v1:bluemix:public:kms:us-south:a/766d8d374a484f029d0fca5a40a52a1c:5d343839-07d3-4213-a950-0f71ed45423f:key:7fc1a0ba-4633-48cb-997b-5749787c952c',
      };

      // GatewayBfdConfigTemplate
      const gatewayBfdConfigTemplateModel = {
        interval: 2000,
        multiplier: 10,
      };

      // ResourceGroupIdentity
      const resourceGroupIdentityModel = {
        id: '56969d6043e9465c883cb9f7363e78e8',
      };

      // GatewayMacsecConfigTemplateFallbackCak
      const gatewayMacsecConfigTemplateFallbackCakModel = {
        crn: 'crn:v1:bluemix:public:hs-crypto:us-south:a/4111d05f36894e3cb9b46a43556d9000:abc111b8-37aa-4034-9def-f2607c87aaaa:key:bbb222bc-430a-4de9-9aad-84e5bb022222',
      };

      // GatewayMacsecConfigTemplatePrimaryCak
      const gatewayMacsecConfigTemplatePrimaryCakModel = {
        crn: 'crn:v1:bluemix:public:hs-crypto:us-south:a/4111d05f36894e3cb9b46a43556d9000:abc111b8-37aa-4034-9def-f2607c87aaaa:key:bbb222bc-430a-4de9-9aad-84e5bb022222',
      };

      // GatewayMacsecConfigTemplate
      const gatewayMacsecConfigTemplateModel = {
        active: true,
        fallback_cak: gatewayMacsecConfigTemplateFallbackCakModel,
        primary_cak: gatewayMacsecConfigTemplatePrimaryCakModel,
        window_size: 148809600,
      };

      // GatewayTemplateGatewayTypeDedicatedTemplate
      const gatewayTemplateModel = {
        as_prepends: [asPrependTemplateModel],
        authentication_key: gatewayTemplateAuthenticationKeyModel,
        bfd_config: gatewayBfdConfigTemplateModel,
        bgp_asn: 64999,
        bgp_base_cidr: 'testString',
        bgp_cer_cidr: '169.254.0.10/30',
        bgp_ibm_cidr: '169.254.0.9/30',
        connection_mode: 'transit',
        global: true,
        metered: false,
        name: 'myGateway',
        patch_panel_completion_notice: 'patch panel configuration details',
        resource_group: resourceGroupIdentityModel,
        speed_mbps: 1000,
        type: 'dedicated',
        carrier_name: 'myCarrierName',
        cross_connect_router: 'xcr01.dal03',
        customer_name: 'newCustomerName',
        location_name: 'dal03',
        macsec_config: gatewayMacsecConfigTemplateModel,
      };

      function __createGatewayTest() {
        // Construct the params object for operation createGateway
        const gatewayTemplate = gatewayTemplateModel;
        const params = {
          gatewayTemplate: gatewayTemplate,
        };

        const createGatewayResult = directLinkService.createGateway(params);

        // all methods should return a Promise
        expectToBePromise(createGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(gatewayTemplate);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __createGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __createGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayTemplate = gatewayTemplateModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          gatewayTemplate,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.createGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.createGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createGatewayPromise = directLinkService.createGateway();
        expectToBePromise(createGatewayPromise);

        createGatewayPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteGateway', () => {
    describe('positive tests', () => {
      function __deleteGatewayTest() {
        // Construct the params object for operation deleteGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteGatewayResult = directLinkService.deleteGateway(params);

        // all methods should return a Promise
        expectToBePromise(deleteGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __deleteGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __deleteGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.deleteGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.deleteGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteGatewayPromise = directLinkService.deleteGateway();
        expectToBePromise(deleteGatewayPromise);

        deleteGatewayPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGateway', () => {
    describe('positive tests', () => {
      function __getGatewayTest() {
        // Construct the params object for operation getGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const getGatewayResult = directLinkService.getGateway(params);

        // all methods should return a Promise
        expectToBePromise(getGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __getGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __getGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.getGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.getGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getGatewayPromise = directLinkService.getGateway();
        expectToBePromise(getGatewayPromise);

        getGatewayPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateGateway', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // GatewayPatchTemplateAuthenticationKey
      const gatewayPatchTemplateAuthenticationKeyModel = {
        crn: 'crn:v1:bluemix:public:kms:us-south:a/766d8d374a484f029d0fca5a40a52a1c:5d343839-07d3-4213-a950-0f71ed45423f:key:7fc1a0ba-4633-48cb-997b-5749787c952c',
      };

      // GatewayBfdPatchTemplate
      const gatewayBfdPatchTemplateModel = {
        interval: 2000,
        multiplier: 10,
      };

      // GatewayMacsecConfigPatchTemplateFallbackCak
      const gatewayMacsecConfigPatchTemplateFallbackCakModel = {
        crn: 'crn:v1:bluemix:public:hs-crypto:us-south:a/4111d05f36894e3cb9b46a43556d9000:abc111b8-37aa-4034-9def-f2607c87aaaa:key:bbb222bc-430a-4de9-9aad-84e5bb022222',
      };

      // GatewayMacsecConfigPatchTemplatePrimaryCak
      const gatewayMacsecConfigPatchTemplatePrimaryCakModel = {
        crn: 'crn:v1:bluemix:public:hs-crypto:us-south:a/4111d05f36894e3cb9b46a43556d9000:abc111b8-37aa-4034-9def-f2607c87aaaa:key:bbb222bc-430a-4de9-9aad-84e5bb022222',
      };

      // GatewayMacsecConfigPatchTemplate
      const gatewayMacsecConfigPatchTemplateModel = {
        active: true,
        fallback_cak: gatewayMacsecConfigPatchTemplateFallbackCakModel,
        primary_cak: gatewayMacsecConfigPatchTemplatePrimaryCakModel,
        window_size: 512,
      };

      function __updateGatewayTest() {
        // Construct the params object for operation updateGateway
        const id = 'testString';
        const authenticationKey = gatewayPatchTemplateAuthenticationKeyModel;
        const bfdConfig = gatewayBfdPatchTemplateModel;
        const bgpAsn = 64999;
        const bgpCerCidr = '169.254.0.10/30';
        const bgpIbmCidr = '169.254.0.9/30';
        const connectionMode = 'transit';
        const global = true;
        const loaRejectReason = 'The port mentioned was incorrect';
        const macsecConfig = gatewayMacsecConfigPatchTemplateModel;
        const metered = false;
        const name = 'testGateway';
        const operationalStatus = 'loa_accepted';
        const patchPanelCompletionNotice = 'patch panel configuration details';
        const speedMbps = 1000;
        const params = {
          id: id,
          authenticationKey: authenticationKey,
          bfdConfig: bfdConfig,
          bgpAsn: bgpAsn,
          bgpCerCidr: bgpCerCidr,
          bgpIbmCidr: bgpIbmCidr,
          connectionMode: connectionMode,
          global: global,
          loaRejectReason: loaRejectReason,
          macsecConfig: macsecConfig,
          metered: metered,
          name: name,
          operationalStatus: operationalStatus,
          patchPanelCompletionNotice: patchPanelCompletionNotice,
          speedMbps: speedMbps,
        };

        const updateGatewayResult = directLinkService.updateGateway(params);

        // all methods should return a Promise
        expectToBePromise(updateGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.authentication_key).toEqual(authenticationKey);
        expect(mockRequestOptions.body.bfd_config).toEqual(bfdConfig);
        expect(mockRequestOptions.body.bgp_asn).toEqual(bgpAsn);
        expect(mockRequestOptions.body.bgp_cer_cidr).toEqual(bgpCerCidr);
        expect(mockRequestOptions.body.bgp_ibm_cidr).toEqual(bgpIbmCidr);
        expect(mockRequestOptions.body.connection_mode).toEqual(connectionMode);
        expect(mockRequestOptions.body.global).toEqual(global);
        expect(mockRequestOptions.body.loa_reject_reason).toEqual(loaRejectReason);
        expect(mockRequestOptions.body.macsec_config).toEqual(macsecConfig);
        expect(mockRequestOptions.body.metered).toEqual(metered);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.operational_status).toEqual(operationalStatus);
        expect(mockRequestOptions.body.patch_panel_completion_notice).toEqual(patchPanelCompletionNotice);
        expect(mockRequestOptions.body.speed_mbps).toEqual(speedMbps);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __updateGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __updateGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.updateGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.updateGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateGatewayPromise = directLinkService.updateGateway();
        expectToBePromise(updateGatewayPromise);

        updateGatewayPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createGatewayAction', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AsPrependTemplate
      const asPrependTemplateModel = {
        length: 4,
        policy: 'import',
        prefix: '172.17.0.0/16',
      };

      // GatewayActionTemplateAuthenticationKey
      const gatewayActionTemplateAuthenticationKeyModel = {
        crn: 'crn:v1:bluemix:public:kms:us-south:a/766d8d374a484f029d0fca5a40a52a1c:5d343839-07d3-4213-a950-0f71ed45423f:key:7fc1a0ba-4633-48cb-997b-5749787c952c',
      };

      // GatewayBfdConfigActionTemplate
      const gatewayBfdConfigActionTemplateModel = {
        interval: 2000,
        multiplier: 10,
      };

      // ResourceGroupIdentity
      const resourceGroupIdentityModel = {
        id: '56969d6043e9465c883cb9f7363e78e8',
      };

      // GatewayActionTemplateUpdatesItemGatewayClientSpeedUpdate
      const gatewayActionTemplateUpdatesItemModel = {
        speed_mbps: 500,
      };

      function __createGatewayActionTest() {
        // Construct the params object for operation createGatewayAction
        const id = 'testString';
        const action = 'create_gateway_approve';
        const asPrepends = [asPrependTemplateModel];
        const authenticationKey = gatewayActionTemplateAuthenticationKeyModel;
        const bfdConfig = gatewayBfdConfigActionTemplateModel;
        const connectionMode = 'transit';
        const global = true;
        const metered = false;
        const resourceGroup = resourceGroupIdentityModel;
        const updates = [gatewayActionTemplateUpdatesItemModel];
        const params = {
          id: id,
          action: action,
          asPrepends: asPrepends,
          authenticationKey: authenticationKey,
          bfdConfig: bfdConfig,
          connectionMode: connectionMode,
          global: global,
          metered: metered,
          resourceGroup: resourceGroup,
          updates: updates,
        };

        const createGatewayActionResult = directLinkService.createGatewayAction(params);

        // all methods should return a Promise
        expectToBePromise(createGatewayActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{id}/actions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.as_prepends).toEqual(asPrepends);
        expect(mockRequestOptions.body.authentication_key).toEqual(authenticationKey);
        expect(mockRequestOptions.body.bfd_config).toEqual(bfdConfig);
        expect(mockRequestOptions.body.connection_mode).toEqual(connectionMode);
        expect(mockRequestOptions.body.global).toEqual(global);
        expect(mockRequestOptions.body.metered).toEqual(metered);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.body.updates).toEqual(updates);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createGatewayActionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __createGatewayActionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __createGatewayActionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const action = 'create_gateway_approve';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          action,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.createGatewayAction(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.createGatewayAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createGatewayActionPromise = directLinkService.createGatewayAction();
        expectToBePromise(createGatewayActionPromise);

        createGatewayActionPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listGatewayCompletionNotice', () => {
    describe('positive tests', () => {
      function __listGatewayCompletionNoticeTest() {
        // Construct the params object for operation listGatewayCompletionNotice
        const id = 'testString';
        const params = {
          id: id,
        };

        const listGatewayCompletionNoticeResult = directLinkService.listGatewayCompletionNotice(params);

        // all methods should return a Promise
        expectToBePromise(listGatewayCompletionNoticeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{id}/completion_notice', 'GET');
        const expectedAccept = 'application/pdf';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listGatewayCompletionNoticeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __listGatewayCompletionNoticeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __listGatewayCompletionNoticeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listGatewayCompletionNotice(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.listGatewayCompletionNotice({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listGatewayCompletionNoticePromise = directLinkService.listGatewayCompletionNotice();
        expectToBePromise(listGatewayCompletionNoticePromise);

        listGatewayCompletionNoticePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createGatewayCompletionNotice', () => {
    describe('positive tests', () => {
      function __createGatewayCompletionNoticeTest() {
        // Construct the params object for operation createGatewayCompletionNotice
        const id = 'testString';
        const upload = Buffer.from('This is a mock file.');
        const uploadContentType = 'testString';
        const params = {
          id: id,
          upload: upload,
          uploadContentType: uploadContentType,
        };

        const createGatewayCompletionNoticeResult = directLinkService.createGatewayCompletionNotice(params);

        // all methods should return a Promise
        expectToBePromise(createGatewayCompletionNoticeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{id}/completion_notice', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.upload.data).toEqual(upload);
        expect(mockRequestOptions.formData.upload.contentType).toEqual(uploadContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createGatewayCompletionNoticeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __createGatewayCompletionNoticeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __createGatewayCompletionNoticeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.createGatewayCompletionNotice(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.createGatewayCompletionNotice({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createGatewayCompletionNoticePromise = directLinkService.createGatewayCompletionNotice();
        expectToBePromise(createGatewayCompletionNoticePromise);

        createGatewayCompletionNoticePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listGatewayLetterOfAuthorization', () => {
    describe('positive tests', () => {
      function __listGatewayLetterOfAuthorizationTest() {
        // Construct the params object for operation listGatewayLetterOfAuthorization
        const id = 'testString';
        const params = {
          id: id,
        };

        const listGatewayLetterOfAuthorizationResult = directLinkService.listGatewayLetterOfAuthorization(params);

        // all methods should return a Promise
        expectToBePromise(listGatewayLetterOfAuthorizationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{id}/letter_of_authorization', 'GET');
        const expectedAccept = 'application/pdf';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listGatewayLetterOfAuthorizationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __listGatewayLetterOfAuthorizationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __listGatewayLetterOfAuthorizationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listGatewayLetterOfAuthorization(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.listGatewayLetterOfAuthorization({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listGatewayLetterOfAuthorizationPromise = directLinkService.listGatewayLetterOfAuthorization();
        expectToBePromise(listGatewayLetterOfAuthorizationPromise);

        listGatewayLetterOfAuthorizationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGatewayStatistics', () => {
    describe('positive tests', () => {
      function __getGatewayStatisticsTest() {
        // Construct the params object for operation getGatewayStatistics
        const id = 'testString';
        const type = 'macsec_mka_session';
        const params = {
          id: id,
          type: type,
        };

        const getGatewayStatisticsResult = directLinkService.getGatewayStatistics(params);

        // all methods should return a Promise
        expectToBePromise(getGatewayStatisticsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{id}/statistics', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getGatewayStatisticsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __getGatewayStatisticsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __getGatewayStatisticsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const type = 'macsec_mka_session';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.getGatewayStatistics(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.getGatewayStatistics({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getGatewayStatisticsPromise = directLinkService.getGatewayStatistics();
        expectToBePromise(getGatewayStatisticsPromise);

        getGatewayStatisticsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGatewayStatus', () => {
    describe('positive tests', () => {
      function __getGatewayStatusTest() {
        // Construct the params object for operation getGatewayStatus
        const id = 'testString';
        const type = 'bgp';
        const params = {
          id: id,
          type: type,
        };

        const getGatewayStatusResult = directLinkService.getGatewayStatus(params);

        // all methods should return a Promise
        expectToBePromise(getGatewayStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{id}/status', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getGatewayStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __getGatewayStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __getGatewayStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.getGatewayStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.getGatewayStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getGatewayStatusPromise = directLinkService.getGatewayStatus();
        expectToBePromise(getGatewayStatusPromise);

        getGatewayStatusPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listOfferingTypeLocations', () => {
    describe('positive tests', () => {
      function __listOfferingTypeLocationsTest() {
        // Construct the params object for operation listOfferingTypeLocations
        const offeringType = 'dedicated';
        const params = {
          offeringType: offeringType,
        };

        const listOfferingTypeLocationsResult = directLinkService.listOfferingTypeLocations(params);

        // all methods should return a Promise
        expectToBePromise(listOfferingTypeLocationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/offering_types/{offering_type}/locations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.offering_type).toEqual(offeringType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listOfferingTypeLocationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __listOfferingTypeLocationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __listOfferingTypeLocationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const offeringType = 'dedicated';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          offeringType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listOfferingTypeLocations(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.listOfferingTypeLocations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listOfferingTypeLocationsPromise = directLinkService.listOfferingTypeLocations();
        expectToBePromise(listOfferingTypeLocationsPromise);

        listOfferingTypeLocationsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listOfferingTypeLocationCrossConnectRouters', () => {
    describe('positive tests', () => {
      function __listOfferingTypeLocationCrossConnectRoutersTest() {
        // Construct the params object for operation listOfferingTypeLocationCrossConnectRouters
        const offeringType = 'dedicated';
        const locationName = 'testString';
        const params = {
          offeringType: offeringType,
          locationName: locationName,
        };

        const listOfferingTypeLocationCrossConnectRoutersResult = directLinkService.listOfferingTypeLocationCrossConnectRouters(params);

        // all methods should return a Promise
        expectToBePromise(listOfferingTypeLocationCrossConnectRoutersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/offering_types/{offering_type}/locations/{location_name}/cross_connect_routers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.offering_type).toEqual(offeringType);
        expect(mockRequestOptions.path.location_name).toEqual(locationName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listOfferingTypeLocationCrossConnectRoutersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __listOfferingTypeLocationCrossConnectRoutersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __listOfferingTypeLocationCrossConnectRoutersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const offeringType = 'dedicated';
        const locationName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          offeringType,
          locationName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listOfferingTypeLocationCrossConnectRouters(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.listOfferingTypeLocationCrossConnectRouters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listOfferingTypeLocationCrossConnectRoutersPromise = directLinkService.listOfferingTypeLocationCrossConnectRouters();
        expectToBePromise(listOfferingTypeLocationCrossConnectRoutersPromise);

        listOfferingTypeLocationCrossConnectRoutersPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listOfferingTypeSpeeds', () => {
    describe('positive tests', () => {
      function __listOfferingTypeSpeedsTest() {
        // Construct the params object for operation listOfferingTypeSpeeds
        const offeringType = 'dedicated';
        const params = {
          offeringType: offeringType,
        };

        const listOfferingTypeSpeedsResult = directLinkService.listOfferingTypeSpeeds(params);

        // all methods should return a Promise
        expectToBePromise(listOfferingTypeSpeedsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/offering_types/{offering_type}/speeds', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.offering_type).toEqual(offeringType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listOfferingTypeSpeedsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __listOfferingTypeSpeedsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __listOfferingTypeSpeedsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const offeringType = 'dedicated';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          offeringType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listOfferingTypeSpeeds(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.listOfferingTypeSpeeds({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listOfferingTypeSpeedsPromise = directLinkService.listOfferingTypeSpeeds();
        expectToBePromise(listOfferingTypeSpeedsPromise);

        listOfferingTypeSpeedsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listPorts', () => {
    describe('positive tests', () => {
      function __listPortsTest() {
        // Construct the params object for operation listPorts
        const start = 'testString';
        const limit = 1;
        const locationName = 'testString';
        const params = {
          start: start,
          limit: limit,
          locationName: locationName,
        };

        const listPortsResult = directLinkService.listPorts(params);

        // all methods should return a Promise
        expectToBePromise(listPortsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ports', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.location_name).toEqual(locationName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPortsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __listPortsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __listPortsTest();
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

        directLinkService.listPorts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        directLinkService.listPorts({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getPort', () => {
    describe('positive tests', () => {
      function __getPortTest() {
        // Construct the params object for operation getPort
        const id = 'testString';
        const params = {
          id: id,
        };

        const getPortResult = directLinkService.getPort(params);

        // all methods should return a Promise
        expectToBePromise(getPortResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ports/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPortTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __getPortTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __getPortTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.getPort(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.getPort({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getPortPromise = directLinkService.getPort();
        expectToBePromise(getPortPromise);

        getPortPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listGatewayVirtualConnections', () => {
    describe('positive tests', () => {
      function __listGatewayVirtualConnectionsTest() {
        // Construct the params object for operation listGatewayVirtualConnections
        const gatewayId = 'testString';
        const params = {
          gatewayId: gatewayId,
        };

        const listGatewayVirtualConnectionsResult = directLinkService.listGatewayVirtualConnections(params);

        // all methods should return a Promise
        expectToBePromise(listGatewayVirtualConnectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/virtual_connections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listGatewayVirtualConnectionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __listGatewayVirtualConnectionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __listGatewayVirtualConnectionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listGatewayVirtualConnections(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.listGatewayVirtualConnections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listGatewayVirtualConnectionsPromise = directLinkService.listGatewayVirtualConnections();
        expectToBePromise(listGatewayVirtualConnectionsPromise);

        listGatewayVirtualConnectionsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createGatewayVirtualConnection', () => {
    describe('positive tests', () => {
      function __createGatewayVirtualConnectionTest() {
        // Construct the params object for operation createGatewayVirtualConnection
        const gatewayId = 'testString';
        const name = 'newVC';
        const type = 'vpc';
        const networkId = 'crn:v1:bluemix:public:is:us-east:a/28e4d90ac7504be69447111122223333::vpc:aaa81ac8-5e96-42a0-a4b7-6c2e2d1bbbbb';
        const params = {
          gatewayId: gatewayId,
          name: name,
          type: type,
          networkId: networkId,
        };

        const createGatewayVirtualConnectionResult = directLinkService.createGatewayVirtualConnection(params);

        // all methods should return a Promise
        expectToBePromise(createGatewayVirtualConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/virtual_connections', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.network_id).toEqual(networkId);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createGatewayVirtualConnectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __createGatewayVirtualConnectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __createGatewayVirtualConnectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = 'testString';
        const name = 'newVC';
        const type = 'vpc';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          gatewayId,
          name,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.createGatewayVirtualConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.createGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createGatewayVirtualConnectionPromise = directLinkService.createGatewayVirtualConnection();
        expectToBePromise(createGatewayVirtualConnectionPromise);

        createGatewayVirtualConnectionPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteGatewayVirtualConnection', () => {
    describe('positive tests', () => {
      function __deleteGatewayVirtualConnectionTest() {
        // Construct the params object for operation deleteGatewayVirtualConnection
        const gatewayId = 'testString';
        const id = 'testString';
        const params = {
          gatewayId: gatewayId,
          id: id,
        };

        const deleteGatewayVirtualConnectionResult = directLinkService.deleteGatewayVirtualConnection(params);

        // all methods should return a Promise
        expectToBePromise(deleteGatewayVirtualConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/virtual_connections/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteGatewayVirtualConnectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __deleteGatewayVirtualConnectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __deleteGatewayVirtualConnectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.deleteGatewayVirtualConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.deleteGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteGatewayVirtualConnectionPromise = directLinkService.deleteGatewayVirtualConnection();
        expectToBePromise(deleteGatewayVirtualConnectionPromise);

        deleteGatewayVirtualConnectionPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGatewayVirtualConnection', () => {
    describe('positive tests', () => {
      function __getGatewayVirtualConnectionTest() {
        // Construct the params object for operation getGatewayVirtualConnection
        const gatewayId = 'testString';
        const id = 'testString';
        const params = {
          gatewayId: gatewayId,
          id: id,
        };

        const getGatewayVirtualConnectionResult = directLinkService.getGatewayVirtualConnection(params);

        // all methods should return a Promise
        expectToBePromise(getGatewayVirtualConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/virtual_connections/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getGatewayVirtualConnectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __getGatewayVirtualConnectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __getGatewayVirtualConnectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.getGatewayVirtualConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.getGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getGatewayVirtualConnectionPromise = directLinkService.getGatewayVirtualConnection();
        expectToBePromise(getGatewayVirtualConnectionPromise);

        getGatewayVirtualConnectionPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateGatewayVirtualConnection', () => {
    describe('positive tests', () => {
      function __updateGatewayVirtualConnectionTest() {
        // Construct the params object for operation updateGatewayVirtualConnection
        const gatewayId = 'testString';
        const id = 'testString';
        const name = 'newConnectionName';
        const status = 'attached';
        const params = {
          gatewayId: gatewayId,
          id: id,
          name: name,
          status: status,
        };

        const updateGatewayVirtualConnectionResult = directLinkService.updateGatewayVirtualConnection(params);

        // all methods should return a Promise
        expectToBePromise(updateGatewayVirtualConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/virtual_connections/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.status).toEqual(status);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateGatewayVirtualConnectionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __updateGatewayVirtualConnectionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __updateGatewayVirtualConnectionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.updateGatewayVirtualConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await directLinkService.updateGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateGatewayVirtualConnectionPromise = directLinkService.updateGatewayVirtualConnection();
        expectToBePromise(updateGatewayVirtualConnectionPromise);

        updateGatewayVirtualConnectionPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
