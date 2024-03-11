/**
 * (C) Copyright IBM Corp. 2024.
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

/* eslint-disable no-await-in-loop */

const nock = require('nock');

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;
const DirectLinkV1 = require('../../dist/direct-link/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const directLinkServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://directlink.cloud.ibm.com/v1',
  version: 'testString',
};

const directLinkService = new DirectLinkV1(directLinkServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(directLinkService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}
function unmock_createRequest() {
  if (createRequestMock) {
    createRequestMock.mockRestore();
    createRequestMock = null;
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('DirectLinkV1', () => {
  beforeEach(() => {
    mock_createRequest();
    // these are changed when passed into the factory/constructor, so re-init
    requiredGlobals = {
      version: 'testString',
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

  describe('listGateways', () => {
    describe('positive tests', () => {
      function __listGatewaysTest() {
        // Construct the params object for operation listGateways
        const listGatewaysParams = {};

        const listGatewaysResult = directLinkService.listGateways(listGatewaysParams);

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
        const listGatewaysParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listGateways(listGatewaysParams);
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
        specific_prefixes: ['192.168.3.0/24'],
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

      // GatewayTemplateRouteFilter
      const gatewayTemplateRouteFilterModel = {
        action: 'permit',
        ge: 25,
        le: 30,
        prefix: '192.168.100.0/24',
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
        default_export_route_filter: 'permit',
        default_import_route_filter: 'permit',
        export_route_filters: [gatewayTemplateRouteFilterModel],
        global: true,
        import_route_filters: [gatewayTemplateRouteFilterModel],
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
        vlan: 10,
      };

      function __createGatewayTest() {
        // Construct the params object for operation createGateway
        const gatewayTemplate = gatewayTemplateModel;
        const createGatewayParams = {
          gatewayTemplate,
        };

        const createGatewayResult = directLinkService.createGateway(createGatewayParams);

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
        const createGatewayParams = {
          gatewayTemplate,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.createGateway(createGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.createGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.createGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteGateway', () => {
    describe('positive tests', () => {
      function __deleteGatewayTest() {
        // Construct the params object for operation deleteGateway
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const deleteGatewayParams = {
          id,
        };

        const deleteGatewayResult = directLinkService.deleteGateway(deleteGatewayParams);

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
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.deleteGateway(deleteGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.deleteGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.deleteGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getGateway', () => {
    describe('positive tests', () => {
      function __getGatewayTest() {
        // Construct the params object for operation getGateway
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const getGatewayParams = {
          id,
        };

        const getGatewayResult = directLinkService.getGateway(getGatewayParams);

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
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.getGateway(getGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.getGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.getGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const authenticationKey = gatewayPatchTemplateAuthenticationKeyModel;
        const bfdConfig = gatewayBfdPatchTemplateModel;
        const bgpAsn = 64999;
        const bgpCerCidr = '169.254.0.10/30';
        const bgpIbmCidr = '169.254.0.9/30';
        const connectionMode = 'transit';
        const defaultExportRouteFilter = 'permit';
        const defaultImportRouteFilter = 'permit';
        const global = true;
        const loaRejectReason = 'The port mentioned was incorrect';
        const macsecConfig = gatewayMacsecConfigPatchTemplateModel;
        const metered = false;
        const name = 'testGateway';
        const operationalStatus = 'loa_accepted';
        const patchPanelCompletionNotice = 'patch panel configuration details';
        const speedMbps = 1000;
        const vlan = 10;
        const updateGatewayParams = {
          id,
          authenticationKey,
          bfdConfig,
          bgpAsn,
          bgpCerCidr,
          bgpIbmCidr,
          connectionMode,
          defaultExportRouteFilter,
          defaultImportRouteFilter,
          global,
          loaRejectReason,
          macsecConfig,
          metered,
          name,
          operationalStatus,
          patchPanelCompletionNotice,
          speedMbps,
          vlan,
        };

        const updateGatewayResult = directLinkService.updateGateway(updateGatewayParams);

        // all methods should return a Promise
        expectToBePromise(updateGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.authentication_key).toEqual(authenticationKey);
        expect(mockRequestOptions.body.bfd_config).toEqual(bfdConfig);
        expect(mockRequestOptions.body.bgp_asn).toEqual(bgpAsn);
        expect(mockRequestOptions.body.bgp_cer_cidr).toEqual(bgpCerCidr);
        expect(mockRequestOptions.body.bgp_ibm_cidr).toEqual(bgpIbmCidr);
        expect(mockRequestOptions.body.connection_mode).toEqual(connectionMode);
        expect(mockRequestOptions.body.default_export_route_filter).toEqual(defaultExportRouteFilter);
        expect(mockRequestOptions.body.default_import_route_filter).toEqual(defaultImportRouteFilter);
        expect(mockRequestOptions.body.global).toEqual(global);
        expect(mockRequestOptions.body.loa_reject_reason).toEqual(loaRejectReason);
        expect(mockRequestOptions.body.macsec_config).toEqual(macsecConfig);
        expect(mockRequestOptions.body.metered).toEqual(metered);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.operational_status).toEqual(operationalStatus);
        expect(mockRequestOptions.body.patch_panel_completion_notice).toEqual(patchPanelCompletionNotice);
        expect(mockRequestOptions.body.speed_mbps).toEqual(speedMbps);
        expect(mockRequestOptions.body.vlan).toEqual(vlan);
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
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateGatewayParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.updateGateway(updateGatewayParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.updateGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.updateGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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
        specific_prefixes: ['192.168.3.0/24'],
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

      // GatewayTemplateRouteFilter
      const gatewayTemplateRouteFilterModel = {
        action: 'permit',
        ge: 25,
        le: 30,
        prefix: '192.168.100.0/24',
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
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const action = 'create_gateway_approve';
        const asPrepends = [asPrependTemplateModel];
        const authenticationKey = gatewayActionTemplateAuthenticationKeyModel;
        const bfdConfig = gatewayBfdConfigActionTemplateModel;
        const connectionMode = 'transit';
        const defaultExportRouteFilter = 'permit';
        const defaultImportRouteFilter = 'permit';
        const exportRouteFilters = [gatewayTemplateRouteFilterModel];
        const global = true;
        const importRouteFilters = [gatewayTemplateRouteFilterModel];
        const metered = false;
        const resourceGroup = resourceGroupIdentityModel;
        const updates = [gatewayActionTemplateUpdatesItemModel];
        const createGatewayActionParams = {
          id,
          action,
          asPrepends,
          authenticationKey,
          bfdConfig,
          connectionMode,
          defaultExportRouteFilter,
          defaultImportRouteFilter,
          exportRouteFilters,
          global,
          importRouteFilters,
          metered,
          resourceGroup,
          updates,
        };

        const createGatewayActionResult = directLinkService.createGatewayAction(createGatewayActionParams);

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
        expect(mockRequestOptions.body.default_export_route_filter).toEqual(defaultExportRouteFilter);
        expect(mockRequestOptions.body.default_import_route_filter).toEqual(defaultImportRouteFilter);
        expect(mockRequestOptions.body.export_route_filters).toEqual(exportRouteFilters);
        expect(mockRequestOptions.body.global).toEqual(global);
        expect(mockRequestOptions.body.import_route_filters).toEqual(importRouteFilters);
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
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createGatewayActionParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.createGatewayAction(createGatewayActionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.createGatewayAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.createGatewayAction();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listGatewayCompletionNotice', () => {
    describe('positive tests', () => {
      function __listGatewayCompletionNoticeTest() {
        // Construct the params object for operation listGatewayCompletionNotice
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const listGatewayCompletionNoticeParams = {
          id,
        };

        const listGatewayCompletionNoticeResult = directLinkService.listGatewayCompletionNotice(listGatewayCompletionNoticeParams);

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
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listGatewayCompletionNoticeParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listGatewayCompletionNotice(listGatewayCompletionNoticeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.listGatewayCompletionNotice({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.listGatewayCompletionNotice();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createGatewayCompletionNotice', () => {
    describe('positive tests', () => {
      function __createGatewayCompletionNoticeTest() {
        // Construct the params object for operation createGatewayCompletionNotice
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const upload = Buffer.from('This is a mock file.');
        const uploadContentType = 'testString';
        const createGatewayCompletionNoticeParams = {
          id,
          upload,
          uploadContentType,
        };

        const createGatewayCompletionNoticeResult = directLinkService.createGatewayCompletionNotice(createGatewayCompletionNoticeParams);

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
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createGatewayCompletionNoticeParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.createGatewayCompletionNotice(createGatewayCompletionNoticeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.createGatewayCompletionNotice({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.createGatewayCompletionNotice();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listGatewayLetterOfAuthorization', () => {
    describe('positive tests', () => {
      function __listGatewayLetterOfAuthorizationTest() {
        // Construct the params object for operation listGatewayLetterOfAuthorization
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const listGatewayLetterOfAuthorizationParams = {
          id,
        };

        const listGatewayLetterOfAuthorizationResult = directLinkService.listGatewayLetterOfAuthorization(listGatewayLetterOfAuthorizationParams);

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
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listGatewayLetterOfAuthorizationParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listGatewayLetterOfAuthorization(listGatewayLetterOfAuthorizationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.listGatewayLetterOfAuthorization({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.listGatewayLetterOfAuthorization();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getGatewayStatistics', () => {
    describe('positive tests', () => {
      function __getGatewayStatisticsTest() {
        // Construct the params object for operation getGatewayStatistics
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const type = 'macsec_mka_session';
        const getGatewayStatisticsParams = {
          id,
          type,
        };

        const getGatewayStatisticsResult = directLinkService.getGatewayStatistics(getGatewayStatisticsParams);

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
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const type = 'macsec_mka_session';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getGatewayStatisticsParams = {
          id,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.getGatewayStatistics(getGatewayStatisticsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.getGatewayStatistics({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.getGatewayStatistics();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getGatewayStatus', () => {
    describe('positive tests', () => {
      function __getGatewayStatusTest() {
        // Construct the params object for operation getGatewayStatus
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const type = 'bgp';
        const getGatewayStatusParams = {
          id,
          type,
        };

        const getGatewayStatusResult = directLinkService.getGatewayStatus(getGatewayStatusParams);

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
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getGatewayStatusParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.getGatewayStatus(getGatewayStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.getGatewayStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.getGatewayStatus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listGatewayExportRouteFilters', () => {
    describe('positive tests', () => {
      function __listGatewayExportRouteFiltersTest() {
        // Construct the params object for operation listGatewayExportRouteFilters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const listGatewayExportRouteFiltersParams = {
          gatewayId,
        };

        const listGatewayExportRouteFiltersResult = directLinkService.listGatewayExportRouteFilters(listGatewayExportRouteFiltersParams);

        // all methods should return a Promise
        expectToBePromise(listGatewayExportRouteFiltersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/export_route_filters', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listGatewayExportRouteFiltersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __listGatewayExportRouteFiltersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __listGatewayExportRouteFiltersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listGatewayExportRouteFiltersParams = {
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listGatewayExportRouteFilters(listGatewayExportRouteFiltersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.listGatewayExportRouteFilters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.listGatewayExportRouteFilters();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createGatewayExportRouteFilter', () => {
    describe('positive tests', () => {
      function __createGatewayExportRouteFilterTest() {
        // Construct the params object for operation createGatewayExportRouteFilter
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const action = 'permit';
        const prefix = '192.168.100.0/24';
        const before = '1a15dcab-7e40-45e1-b7c5-bc690eaa9782';
        const ge = 25;
        const le = 30;
        const createGatewayExportRouteFilterParams = {
          gatewayId,
          action,
          prefix,
          before,
          ge,
          le,
        };

        const createGatewayExportRouteFilterResult = directLinkService.createGatewayExportRouteFilter(createGatewayExportRouteFilterParams);

        // all methods should return a Promise
        expectToBePromise(createGatewayExportRouteFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/export_route_filters', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.prefix).toEqual(prefix);
        expect(mockRequestOptions.body.before).toEqual(before);
        expect(mockRequestOptions.body.ge).toEqual(ge);
        expect(mockRequestOptions.body.le).toEqual(le);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createGatewayExportRouteFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __createGatewayExportRouteFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __createGatewayExportRouteFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const action = 'permit';
        const prefix = '192.168.100.0/24';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createGatewayExportRouteFilterParams = {
          gatewayId,
          action,
          prefix,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.createGatewayExportRouteFilter(createGatewayExportRouteFilterParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.createGatewayExportRouteFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.createGatewayExportRouteFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceGatewayExportRouteFilters', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // GatewayTemplateRouteFilter
      const gatewayTemplateRouteFilterModel = {
        action: 'permit',
        ge: 25,
        le: 30,
        prefix: '192.168.100.0/24',
      };

      function __replaceGatewayExportRouteFiltersTest() {
        // Construct the params object for operation replaceGatewayExportRouteFilters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const ifMatch = 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"';
        const exportRouteFilters = [gatewayTemplateRouteFilterModel];
        const replaceGatewayExportRouteFiltersParams = {
          gatewayId,
          ifMatch,
          exportRouteFilters,
        };

        const replaceGatewayExportRouteFiltersResult = directLinkService.replaceGatewayExportRouteFilters(replaceGatewayExportRouteFiltersParams);

        // all methods should return a Promise
        expectToBePromise(replaceGatewayExportRouteFiltersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/export_route_filters', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.export_route_filters).toEqual(exportRouteFilters);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceGatewayExportRouteFiltersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __replaceGatewayExportRouteFiltersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __replaceGatewayExportRouteFiltersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const ifMatch = 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceGatewayExportRouteFiltersParams = {
          gatewayId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.replaceGatewayExportRouteFilters(replaceGatewayExportRouteFiltersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.replaceGatewayExportRouteFilters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.replaceGatewayExportRouteFilters();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteGatewayExportRouteFilter', () => {
    describe('positive tests', () => {
      function __deleteGatewayExportRouteFilterTest() {
        // Construct the params object for operation deleteGatewayExportRouteFilter
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const deleteGatewayExportRouteFilterParams = {
          gatewayId,
          id,
        };

        const deleteGatewayExportRouteFilterResult = directLinkService.deleteGatewayExportRouteFilter(deleteGatewayExportRouteFilterParams);

        // all methods should return a Promise
        expectToBePromise(deleteGatewayExportRouteFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/export_route_filters/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteGatewayExportRouteFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __deleteGatewayExportRouteFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __deleteGatewayExportRouteFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteGatewayExportRouteFilterParams = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.deleteGatewayExportRouteFilter(deleteGatewayExportRouteFilterParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.deleteGatewayExportRouteFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.deleteGatewayExportRouteFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getGatewayExportRouteFilter', () => {
    describe('positive tests', () => {
      function __getGatewayExportRouteFilterTest() {
        // Construct the params object for operation getGatewayExportRouteFilter
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const getGatewayExportRouteFilterParams = {
          gatewayId,
          id,
        };

        const getGatewayExportRouteFilterResult = directLinkService.getGatewayExportRouteFilter(getGatewayExportRouteFilterParams);

        // all methods should return a Promise
        expectToBePromise(getGatewayExportRouteFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/export_route_filters/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getGatewayExportRouteFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __getGatewayExportRouteFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __getGatewayExportRouteFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getGatewayExportRouteFilterParams = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.getGatewayExportRouteFilter(getGatewayExportRouteFilterParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.getGatewayExportRouteFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.getGatewayExportRouteFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateGatewayExportRouteFilter', () => {
    describe('positive tests', () => {
      function __updateGatewayExportRouteFilterTest() {
        // Construct the params object for operation updateGatewayExportRouteFilter
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const action = 'permit';
        const before = '1a15dcab-7e40-45e1-b7c5-bc690eaa9782';
        const ge = 25;
        const le = 30;
        const prefix = '192.168.100.0/24';
        const updateGatewayExportRouteFilterParams = {
          gatewayId,
          id,
          action,
          before,
          ge,
          le,
          prefix,
        };

        const updateGatewayExportRouteFilterResult = directLinkService.updateGatewayExportRouteFilter(updateGatewayExportRouteFilterParams);

        // all methods should return a Promise
        expectToBePromise(updateGatewayExportRouteFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/export_route_filters/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.before).toEqual(before);
        expect(mockRequestOptions.body.ge).toEqual(ge);
        expect(mockRequestOptions.body.le).toEqual(le);
        expect(mockRequestOptions.body.prefix).toEqual(prefix);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateGatewayExportRouteFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __updateGatewayExportRouteFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __updateGatewayExportRouteFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateGatewayExportRouteFilterParams = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.updateGatewayExportRouteFilter(updateGatewayExportRouteFilterParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.updateGatewayExportRouteFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.updateGatewayExportRouteFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listGatewayImportRouteFilters', () => {
    describe('positive tests', () => {
      function __listGatewayImportRouteFiltersTest() {
        // Construct the params object for operation listGatewayImportRouteFilters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const listGatewayImportRouteFiltersParams = {
          gatewayId,
        };

        const listGatewayImportRouteFiltersResult = directLinkService.listGatewayImportRouteFilters(listGatewayImportRouteFiltersParams);

        // all methods should return a Promise
        expectToBePromise(listGatewayImportRouteFiltersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/import_route_filters', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listGatewayImportRouteFiltersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __listGatewayImportRouteFiltersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __listGatewayImportRouteFiltersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listGatewayImportRouteFiltersParams = {
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listGatewayImportRouteFilters(listGatewayImportRouteFiltersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.listGatewayImportRouteFilters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.listGatewayImportRouteFilters();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createGatewayImportRouteFilter', () => {
    describe('positive tests', () => {
      function __createGatewayImportRouteFilterTest() {
        // Construct the params object for operation createGatewayImportRouteFilter
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const action = 'permit';
        const prefix = '192.168.100.0/24';
        const before = '1a15dcab-7e40-45e1-b7c5-bc690eaa9782';
        const ge = 25;
        const le = 30;
        const createGatewayImportRouteFilterParams = {
          gatewayId,
          action,
          prefix,
          before,
          ge,
          le,
        };

        const createGatewayImportRouteFilterResult = directLinkService.createGatewayImportRouteFilter(createGatewayImportRouteFilterParams);

        // all methods should return a Promise
        expectToBePromise(createGatewayImportRouteFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/import_route_filters', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.prefix).toEqual(prefix);
        expect(mockRequestOptions.body.before).toEqual(before);
        expect(mockRequestOptions.body.ge).toEqual(ge);
        expect(mockRequestOptions.body.le).toEqual(le);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createGatewayImportRouteFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __createGatewayImportRouteFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __createGatewayImportRouteFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const action = 'permit';
        const prefix = '192.168.100.0/24';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createGatewayImportRouteFilterParams = {
          gatewayId,
          action,
          prefix,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.createGatewayImportRouteFilter(createGatewayImportRouteFilterParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.createGatewayImportRouteFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.createGatewayImportRouteFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceGatewayImportRouteFilters', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // GatewayTemplateRouteFilter
      const gatewayTemplateRouteFilterModel = {
        action: 'permit',
        ge: 25,
        le: 30,
        prefix: '192.168.100.0/24',
      };

      function __replaceGatewayImportRouteFiltersTest() {
        // Construct the params object for operation replaceGatewayImportRouteFilters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const ifMatch = 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"';
        const importRouteFilters = [gatewayTemplateRouteFilterModel];
        const replaceGatewayImportRouteFiltersParams = {
          gatewayId,
          ifMatch,
          importRouteFilters,
        };

        const replaceGatewayImportRouteFiltersResult = directLinkService.replaceGatewayImportRouteFilters(replaceGatewayImportRouteFiltersParams);

        // all methods should return a Promise
        expectToBePromise(replaceGatewayImportRouteFiltersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/import_route_filters', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.import_route_filters).toEqual(importRouteFilters);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceGatewayImportRouteFiltersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __replaceGatewayImportRouteFiltersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __replaceGatewayImportRouteFiltersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const ifMatch = 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceGatewayImportRouteFiltersParams = {
          gatewayId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.replaceGatewayImportRouteFilters(replaceGatewayImportRouteFiltersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.replaceGatewayImportRouteFilters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.replaceGatewayImportRouteFilters();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteGatewayImportRouteFilter', () => {
    describe('positive tests', () => {
      function __deleteGatewayImportRouteFilterTest() {
        // Construct the params object for operation deleteGatewayImportRouteFilter
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const deleteGatewayImportRouteFilterParams = {
          gatewayId,
          id,
        };

        const deleteGatewayImportRouteFilterResult = directLinkService.deleteGatewayImportRouteFilter(deleteGatewayImportRouteFilterParams);

        // all methods should return a Promise
        expectToBePromise(deleteGatewayImportRouteFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/import_route_filters/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteGatewayImportRouteFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __deleteGatewayImportRouteFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __deleteGatewayImportRouteFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteGatewayImportRouteFilterParams = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.deleteGatewayImportRouteFilter(deleteGatewayImportRouteFilterParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.deleteGatewayImportRouteFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.deleteGatewayImportRouteFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getGatewayImportRouteFilter', () => {
    describe('positive tests', () => {
      function __getGatewayImportRouteFilterTest() {
        // Construct the params object for operation getGatewayImportRouteFilter
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const getGatewayImportRouteFilterParams = {
          gatewayId,
          id,
        };

        const getGatewayImportRouteFilterResult = directLinkService.getGatewayImportRouteFilter(getGatewayImportRouteFilterParams);

        // all methods should return a Promise
        expectToBePromise(getGatewayImportRouteFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/import_route_filters/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getGatewayImportRouteFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __getGatewayImportRouteFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __getGatewayImportRouteFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getGatewayImportRouteFilterParams = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.getGatewayImportRouteFilter(getGatewayImportRouteFilterParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.getGatewayImportRouteFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.getGatewayImportRouteFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateGatewayImportRouteFilter', () => {
    describe('positive tests', () => {
      function __updateGatewayImportRouteFilterTest() {
        // Construct the params object for operation updateGatewayImportRouteFilter
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const action = 'permit';
        const before = '1a15dcab-7e40-45e1-b7c5-bc690eaa9782';
        const ge = 25;
        const le = 30;
        const prefix = '192.168.100.0/24';
        const updateGatewayImportRouteFilterParams = {
          gatewayId,
          id,
          action,
          before,
          ge,
          le,
          prefix,
        };

        const updateGatewayImportRouteFilterResult = directLinkService.updateGatewayImportRouteFilter(updateGatewayImportRouteFilterParams);

        // all methods should return a Promise
        expectToBePromise(updateGatewayImportRouteFilterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/import_route_filters/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.before).toEqual(before);
        expect(mockRequestOptions.body.ge).toEqual(ge);
        expect(mockRequestOptions.body.le).toEqual(le);
        expect(mockRequestOptions.body.prefix).toEqual(prefix);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateGatewayImportRouteFilterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __updateGatewayImportRouteFilterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __updateGatewayImportRouteFilterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateGatewayImportRouteFilterParams = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.updateGatewayImportRouteFilter(updateGatewayImportRouteFilterParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.updateGatewayImportRouteFilter({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.updateGatewayImportRouteFilter();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listGatewayRouteReports', () => {
    describe('positive tests', () => {
      function __listGatewayRouteReportsTest() {
        // Construct the params object for operation listGatewayRouteReports
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const listGatewayRouteReportsParams = {
          gatewayId,
        };

        const listGatewayRouteReportsResult = directLinkService.listGatewayRouteReports(listGatewayRouteReportsParams);

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
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listGatewayRouteReportsParams = {
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listGatewayRouteReports(listGatewayRouteReportsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.listGatewayRouteReports({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.listGatewayRouteReports();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createGatewayRouteReport', () => {
    describe('positive tests', () => {
      function __createGatewayRouteReportTest() {
        // Construct the params object for operation createGatewayRouteReport
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const createGatewayRouteReportParams = {
          gatewayId,
        };

        const createGatewayRouteReportResult = directLinkService.createGatewayRouteReport(createGatewayRouteReportParams);

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
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createGatewayRouteReportParams = {
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.createGatewayRouteReport(createGatewayRouteReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.createGatewayRouteReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.createGatewayRouteReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteGatewayRouteReport', () => {
    describe('positive tests', () => {
      function __deleteGatewayRouteReportTest() {
        // Construct the params object for operation deleteGatewayRouteReport
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const deleteGatewayRouteReportParams = {
          gatewayId,
          id,
        };

        const deleteGatewayRouteReportResult = directLinkService.deleteGatewayRouteReport(deleteGatewayRouteReportParams);

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
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteGatewayRouteReportParams = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.deleteGatewayRouteReport(deleteGatewayRouteReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.deleteGatewayRouteReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.deleteGatewayRouteReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getGatewayRouteReport', () => {
    describe('positive tests', () => {
      function __getGatewayRouteReportTest() {
        // Construct the params object for operation getGatewayRouteReport
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const getGatewayRouteReportParams = {
          gatewayId,
          id,
        };

        const getGatewayRouteReportResult = directLinkService.getGatewayRouteReport(getGatewayRouteReportParams);

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
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getGatewayRouteReportParams = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.getGatewayRouteReport(getGatewayRouteReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.getGatewayRouteReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.getGatewayRouteReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listGatewayVirtualConnections', () => {
    describe('positive tests', () => {
      function __listGatewayVirtualConnectionsTest() {
        // Construct the params object for operation listGatewayVirtualConnections
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const listGatewayVirtualConnectionsParams = {
          gatewayId,
        };

        const listGatewayVirtualConnectionsResult = directLinkService.listGatewayVirtualConnections(listGatewayVirtualConnectionsParams);

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
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listGatewayVirtualConnectionsParams = {
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listGatewayVirtualConnections(listGatewayVirtualConnectionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.listGatewayVirtualConnections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.listGatewayVirtualConnections();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createGatewayVirtualConnection', () => {
    describe('positive tests', () => {
      function __createGatewayVirtualConnectionTest() {
        // Construct the params object for operation createGatewayVirtualConnection
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const name = 'newVC';
        const type = 'vpc';
        const networkId = 'crn:v1:bluemix:public:is:us-east:a/28e4d90ac7504be69447111122223333::vpc:aaa81ac8-5e96-42a0-a4b7-6c2e2d1bbbbb';
        const createGatewayVirtualConnectionParams = {
          gatewayId,
          name,
          type,
          networkId,
        };

        const createGatewayVirtualConnectionResult = directLinkService.createGatewayVirtualConnection(createGatewayVirtualConnectionParams);

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
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const name = 'newVC';
        const type = 'vpc';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createGatewayVirtualConnectionParams = {
          gatewayId,
          name,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.createGatewayVirtualConnection(createGatewayVirtualConnectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.createGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.createGatewayVirtualConnection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteGatewayVirtualConnection', () => {
    describe('positive tests', () => {
      function __deleteGatewayVirtualConnectionTest() {
        // Construct the params object for operation deleteGatewayVirtualConnection
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const deleteGatewayVirtualConnectionParams = {
          gatewayId,
          id,
        };

        const deleteGatewayVirtualConnectionResult = directLinkService.deleteGatewayVirtualConnection(deleteGatewayVirtualConnectionParams);

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
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteGatewayVirtualConnectionParams = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.deleteGatewayVirtualConnection(deleteGatewayVirtualConnectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.deleteGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.deleteGatewayVirtualConnection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getGatewayVirtualConnection', () => {
    describe('positive tests', () => {
      function __getGatewayVirtualConnectionTest() {
        // Construct the params object for operation getGatewayVirtualConnection
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const getGatewayVirtualConnectionParams = {
          gatewayId,
          id,
        };

        const getGatewayVirtualConnectionResult = directLinkService.getGatewayVirtualConnection(getGatewayVirtualConnectionParams);

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
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getGatewayVirtualConnectionParams = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.getGatewayVirtualConnection(getGatewayVirtualConnectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.getGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.getGatewayVirtualConnection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateGatewayVirtualConnection', () => {
    describe('positive tests', () => {
      function __updateGatewayVirtualConnectionTest() {
        // Construct the params object for operation updateGatewayVirtualConnection
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const name = 'newConnectionName';
        const status = 'attached';
        const updateGatewayVirtualConnectionParams = {
          gatewayId,
          id,
          name,
          status,
        };

        const updateGatewayVirtualConnectionResult = directLinkService.updateGatewayVirtualConnection(updateGatewayVirtualConnectionParams);

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
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateGatewayVirtualConnectionParams = {
          gatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.updateGatewayVirtualConnection(updateGatewayVirtualConnectionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.updateGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.updateGatewayVirtualConnection();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listOfferingTypeLocations', () => {
    describe('positive tests', () => {
      function __listOfferingTypeLocationsTest() {
        // Construct the params object for operation listOfferingTypeLocations
        const offeringType = 'dedicated';
        const listOfferingTypeLocationsParams = {
          offeringType,
        };

        const listOfferingTypeLocationsResult = directLinkService.listOfferingTypeLocations(listOfferingTypeLocationsParams);

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
        const listOfferingTypeLocationsParams = {
          offeringType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listOfferingTypeLocations(listOfferingTypeLocationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.listOfferingTypeLocations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.listOfferingTypeLocations();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listOfferingTypeLocationCrossConnectRouters', () => {
    describe('positive tests', () => {
      function __listOfferingTypeLocationCrossConnectRoutersTest() {
        // Construct the params object for operation listOfferingTypeLocationCrossConnectRouters
        const offeringType = 'dedicated';
        const locationName = 'testString';
        const listOfferingTypeLocationCrossConnectRoutersParams = {
          offeringType,
          locationName,
        };

        const listOfferingTypeLocationCrossConnectRoutersResult = directLinkService.listOfferingTypeLocationCrossConnectRouters(listOfferingTypeLocationCrossConnectRoutersParams);

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
        const listOfferingTypeLocationCrossConnectRoutersParams = {
          offeringType,
          locationName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listOfferingTypeLocationCrossConnectRouters(listOfferingTypeLocationCrossConnectRoutersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.listOfferingTypeLocationCrossConnectRouters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.listOfferingTypeLocationCrossConnectRouters();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listOfferingTypeSpeeds', () => {
    describe('positive tests', () => {
      function __listOfferingTypeSpeedsTest() {
        // Construct the params object for operation listOfferingTypeSpeeds
        const offeringType = 'dedicated';
        const listOfferingTypeSpeedsParams = {
          offeringType,
        };

        const listOfferingTypeSpeedsResult = directLinkService.listOfferingTypeSpeeds(listOfferingTypeSpeedsParams);

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
        const listOfferingTypeSpeedsParams = {
          offeringType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listOfferingTypeSpeeds(listOfferingTypeSpeedsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.listOfferingTypeSpeeds({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.listOfferingTypeSpeeds();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listPorts', () => {
    describe('positive tests', () => {
      function __listPortsTest() {
        // Construct the params object for operation listPorts
        const start = 'testString';
        const limit = 50;
        const locationName = 'testString';
        const listPortsParams = {
          start,
          limit,
          locationName,
        };

        const listPortsResult = directLinkService.listPorts(listPortsParams);

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
        const listPortsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listPorts(listPortsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        directLinkService.listPorts({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('PortsPager tests', () => {
      const serviceUrl = directLinkServiceOptions.url;
      const path = '/ports';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"ports":[{"direct_link_count":1,"id":"01122b9b-820f-4c44-8a31-77f1f0806765","label":"XCR-FRK-CS-SEC-01","location_display_name":"Dallas 03","location_name":"dal03","provider_name":"provider_1","supported_link_speeds":[21]}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"ports":[{"direct_link_count":1,"id":"01122b9b-820f-4c44-8a31-77f1f0806765","label":"XCR-FRK-CS-SEC-01","location_display_name":"Dallas 03","location_name":"dal03","provider_name":"provider_1","supported_link_speeds":[21]}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          limit: 10,
          locationName: 'testString',
        };
        const allResults = [];
        const pager = new DirectLinkV1.PortsPager(directLinkService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          limit: 10,
          locationName: 'testString',
        };
        const pager = new DirectLinkV1.PortsPager(directLinkService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getPort', () => {
    describe('positive tests', () => {
      function __getPortTest() {
        // Construct the params object for operation getPort
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const getPortParams = {
          id,
        };

        const getPortResult = directLinkService.getPort(getPortParams);

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
        const id = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPortParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.getPort(getPortParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.getPort({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.getPort();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listGatewayAsPrepends', () => {
    describe('positive tests', () => {
      function __listGatewayAsPrependsTest() {
        // Construct the params object for operation listGatewayAsPrepends
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const listGatewayAsPrependsParams = {
          gatewayId,
        };

        const listGatewayAsPrependsResult = directLinkService.listGatewayAsPrepends(listGatewayAsPrependsParams);

        // all methods should return a Promise
        expectToBePromise(listGatewayAsPrependsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/as_prepends', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listGatewayAsPrependsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __listGatewayAsPrependsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __listGatewayAsPrependsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listGatewayAsPrependsParams = {
          gatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.listGatewayAsPrepends(listGatewayAsPrependsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.listGatewayAsPrepends({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.listGatewayAsPrepends();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceGatewayAsPrepends', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AsPrependPrefixArrayTemplate
      const asPrependPrefixArrayTemplateModel = {
        length: 4,
        policy: 'import',
        specific_prefixes: ['192.168.3.0/24'],
      };

      function __replaceGatewayAsPrependsTest() {
        // Construct the params object for operation replaceGatewayAsPrepends
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const ifMatch = 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"';
        const asPrepends = [asPrependPrefixArrayTemplateModel];
        const replaceGatewayAsPrependsParams = {
          gatewayId,
          ifMatch,
          asPrepends,
        };

        const replaceGatewayAsPrependsResult = directLinkService.replaceGatewayAsPrepends(replaceGatewayAsPrependsParams);

        // all methods should return a Promise
        expectToBePromise(replaceGatewayAsPrependsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{gateway_id}/as_prepends', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.as_prepends).toEqual(asPrepends);
        expect(mockRequestOptions.qs.version).toEqual(directLinkServiceOptions.version);
        expect(mockRequestOptions.path.gateway_id).toEqual(gatewayId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceGatewayAsPrependsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkService.enableRetries();
        __replaceGatewayAsPrependsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkService.disableRetries();
        __replaceGatewayAsPrependsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const gatewayId = '0a06fb9b-820f-4c44-8a31-77f1f0806d28';
        const ifMatch = 'W/"96d225c4-56bd-43d9-98fc-d7148e5c5028"';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceGatewayAsPrependsParams = {
          gatewayId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkService.replaceGatewayAsPrepends(replaceGatewayAsPrependsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkService.replaceGatewayAsPrepends({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkService.replaceGatewayAsPrepends();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
