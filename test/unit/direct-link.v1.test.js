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

const extend = require('extend');
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

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://directlink.cloud.ibm.com/v1',
  version: 'testString',
};

const directLink = new DirectLinkV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(directLink, 'createRequest');
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

      options = extend(options, requiredGlobals);

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

      options = extend(options, requiredGlobals);

      const testInstance = new DirectLinkV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = extend(options, requiredGlobals);

      const testInstance = new DirectLinkV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(DirectLinkV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new DirectLinkV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(service.version);
      });
    });
  });
  describe('listGateways', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listGateways
        const params = {};

        const listGatewaysResult = directLink.listGateways(params);

        // all methods should return a Promise
        expectToBePromise(listGatewaysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
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

        directLink.listGateways(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        directLink.listGateways({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createGateway', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // GatewayMacsecConfigTemplateFallbackCak
      const gatewayMacsecConfigTemplateFallbackCakModel = {
        crn:
          'crn:v1:bluemix:public:hs-crypto:us-south:a/4111d05f36894e3cb9b46a43556d9000:abc111b8-37aa-4034-9def-f2607c87aaaa:key:bbb222bc-430a-4de9-9aad-84e5bb022222',
      };

      // GatewayMacsecConfigTemplatePrimaryCak
      const gatewayMacsecConfigTemplatePrimaryCakModel = {
        crn:
          'crn:v1:bluemix:public:hs-crypto:us-south:a/4111d05f36894e3cb9b46a43556d9000:abc111b8-37aa-4034-9def-f2607c87aaaa:key:bbb222bc-430a-4de9-9aad-84e5bb022222',
      };

      // GatewayBfdConfigTemplate
      const gatewayBfdConfigTemplateModel = {
        interval: 2000,
        multiplier: 10,
      };

      // GatewayMacsecConfigTemplate
      const gatewayMacsecConfigTemplateModel = {
        active: true,
        fallback_cak: gatewayMacsecConfigTemplateFallbackCakModel,
        primary_cak: gatewayMacsecConfigTemplatePrimaryCakModel,
        window_size: 148809600,
      };

      // GatewayTemplateGatewayTypeDedicatedTemplateAuthenticationKey
      const gatewayTemplateGatewayTypeDedicatedTemplateAuthenticationKeyModel = {
        crn:
          'crn:v1:bluemix:public:kms:us-south:a/766d8d374a484f029d0fca5a40a52a1c:5d343839-07d3-4213-a950-0f71ed45423f:key:7fc1a0ba-4633-48cb-997b-5749787c952c',
      };

      // ResourceGroupIdentity
      const resourceGroupIdentityModel = {
        id: '56969d6043e9465c883cb9f7363e78e8',
      };

      // GatewayTemplateGatewayTypeDedicatedTemplate
      const gatewayTemplateModel = {
        authentication_key: gatewayTemplateGatewayTypeDedicatedTemplateAuthenticationKeyModel,
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createGateway
        const gatewayTemplate = gatewayTemplateModel;
        const params = {
          gatewayTemplate: gatewayTemplate,
        };

        const createGatewayResult = directLink.createGateway(params);

        // all methods should return a Promise
        expectToBePromise(createGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(gatewayTemplate);
        expect(options.qs['version']).toEqual(service.version);
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

        directLink.createGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.createGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createGatewayPromise = directLink.createGateway();
        expectToBePromise(createGatewayPromise);

        createGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteGatewayResult = directLink.deleteGateway(params);

        // all methods should return a Promise
        expectToBePromise(deleteGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
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

        directLink.deleteGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.deleteGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteGatewayPromise = directLink.deleteGateway();
        expectToBePromise(deleteGatewayPromise);

        deleteGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const getGatewayResult = directLink.getGateway(params);

        // all methods should return a Promise
        expectToBePromise(getGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
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

        directLink.getGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.getGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getGatewayPromise = directLink.getGateway();
        expectToBePromise(getGatewayPromise);

        getGatewayPromise.catch(err => {
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
        crn:
          'crn:v1:bluemix:public:kms:us-south:a/766d8d374a484f029d0fca5a40a52a1c:5d343839-07d3-4213-a950-0f71ed45423f:key:7fc1a0ba-4633-48cb-997b-5749787c952c',
      };

      // GatewayBfdPatchTemplate
      const gatewayBfdPatchTemplateModel = {
        interval: 2000,
        multiplier: 10,
      };

      // GatewayMacsecConfigPatchTemplateFallbackCak
      const gatewayMacsecConfigPatchTemplateFallbackCakModel = {
        crn:
          'crn:v1:bluemix:public:hs-crypto:us-south:a/4111d05f36894e3cb9b46a43556d9000:abc111b8-37aa-4034-9def-f2607c87aaaa:key:bbb222bc-430a-4de9-9aad-84e5bb022222',
      };

      // GatewayMacsecConfigPatchTemplatePrimaryCak
      const gatewayMacsecConfigPatchTemplatePrimaryCakModel = {
        crn:
          'crn:v1:bluemix:public:hs-crypto:us-south:a/4111d05f36894e3cb9b46a43556d9000:abc111b8-37aa-4034-9def-f2607c87aaaa:key:bbb222bc-430a-4de9-9aad-84e5bb022222',
      };

      // GatewayMacsecConfigPatchTemplate
      const gatewayMacsecConfigPatchTemplateModel = {
        active: true,
        fallback_cak: gatewayMacsecConfigPatchTemplateFallbackCakModel,
        primary_cak: gatewayMacsecConfigPatchTemplatePrimaryCakModel,
        window_size: 512,
      };

      test('should pass the right params to createRequest', () => {
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

        const updateGatewayResult = directLink.updateGateway(params);

        // all methods should return a Promise
        expectToBePromise(updateGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['authentication_key']).toEqual(authenticationKey);
        expect(options.body['bfd_config']).toEqual(bfdConfig);
        expect(options.body['bgp_asn']).toEqual(bgpAsn);
        expect(options.body['bgp_cer_cidr']).toEqual(bgpCerCidr);
        expect(options.body['bgp_ibm_cidr']).toEqual(bgpIbmCidr);
        expect(options.body['connection_mode']).toEqual(connectionMode);
        expect(options.body['global']).toEqual(global);
        expect(options.body['loa_reject_reason']).toEqual(loaRejectReason);
        expect(options.body['macsec_config']).toEqual(macsecConfig);
        expect(options.body['metered']).toEqual(metered);
        expect(options.body['name']).toEqual(name);
        expect(options.body['operational_status']).toEqual(operationalStatus);
        expect(options.body['patch_panel_completion_notice']).toEqual(patchPanelCompletionNotice);
        expect(options.body['speed_mbps']).toEqual(speedMbps);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
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

        directLink.updateGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.updateGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateGatewayPromise = directLink.updateGateway();
        expectToBePromise(updateGatewayPromise);

        updateGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createGatewayAction', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // GatewayActionTemplateAuthenticationKey
      const gatewayActionTemplateAuthenticationKeyModel = {
        crn:
          'crn:v1:bluemix:public:kms:us-south:a/766d8d374a484f029d0fca5a40a52a1c:5d343839-07d3-4213-a950-0f71ed45423f:key:7fc1a0ba-4633-48cb-997b-5749787c952c',
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createGatewayAction
        const id = 'testString';
        const action = 'create_gateway_approve';
        const authenticationKey = gatewayActionTemplateAuthenticationKeyModel;
        const bfdConfig = gatewayBfdConfigActionTemplateModel;
        const connectionMode = 'transit';
        const global = true;
        const metered = false;
        const resourceGroup = resourceGroupIdentityModel;
        const updates = [{ foo: 'bar' }];
        const params = {
          id: id,
          action: action,
          authenticationKey: authenticationKey,
          bfdConfig: bfdConfig,
          connectionMode: connectionMode,
          global: global,
          metered: metered,
          resourceGroup: resourceGroup,
          updates: updates,
        };

        const createGatewayActionResult = directLink.createGatewayAction(params);

        // all methods should return a Promise
        expectToBePromise(createGatewayActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{id}/actions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['action']).toEqual(action);
        expect(options.body['authentication_key']).toEqual(authenticationKey);
        expect(options.body['bfd_config']).toEqual(bfdConfig);
        expect(options.body['connection_mode']).toEqual(connectionMode);
        expect(options.body['global']).toEqual(global);
        expect(options.body['metered']).toEqual(metered);
        expect(options.body['resource_group']).toEqual(resourceGroup);
        expect(options.body['updates']).toEqual(updates);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
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

        directLink.createGatewayAction(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.createGatewayAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createGatewayActionPromise = directLink.createGatewayAction();
        expectToBePromise(createGatewayActionPromise);

        createGatewayActionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listGatewayCompletionNotice', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listGatewayCompletionNotice
        const id = 'testString';
        const params = {
          id: id,
        };

        const listGatewayCompletionNoticeResult = directLink.listGatewayCompletionNotice(params);

        // all methods should return a Promise
        expectToBePromise(listGatewayCompletionNoticeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{id}/completion_notice', 'GET');
        const expectedAccept = 'application/pdf';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
        expect(options.responseType).toBe('stream');
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

        directLink.listGatewayCompletionNotice(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.listGatewayCompletionNotice({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listGatewayCompletionNoticePromise = directLink.listGatewayCompletionNotice();
        expectToBePromise(listGatewayCompletionNoticePromise);

        listGatewayCompletionNoticePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createGatewayCompletionNotice', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createGatewayCompletionNotice
        const id = 'testString';
        const upload = Buffer.from('This is a mock file.');
        const uploadContentType = 'testString';
        const params = {
          id: id,
          upload: upload,
          uploadContentType: uploadContentType,
        };

        const createGatewayCompletionNoticeResult = directLink.createGatewayCompletionNotice(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createGatewayCompletionNoticeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{id}/completion_notice', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.formData['upload'].data).toEqual(upload);
        expect(options.formData['upload'].contentType).toEqual(uploadContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
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

        directLink.createGatewayCompletionNotice(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.createGatewayCompletionNotice({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createGatewayCompletionNoticePromise = directLink.createGatewayCompletionNotice();
        expectToBePromise(createGatewayCompletionNoticePromise);

        createGatewayCompletionNoticePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listGatewayLetterOfAuthorization', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listGatewayLetterOfAuthorization
        const id = 'testString';
        const params = {
          id: id,
        };

        const listGatewayLetterOfAuthorizationResult = directLink.listGatewayLetterOfAuthorization(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listGatewayLetterOfAuthorizationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{id}/letter_of_authorization', 'GET');
        const expectedAccept = 'application/pdf';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
        expect(options.responseType).toBe('stream');
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

        directLink.listGatewayLetterOfAuthorization(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.listGatewayLetterOfAuthorization({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listGatewayLetterOfAuthorizationPromise = directLink.listGatewayLetterOfAuthorization();
        expectToBePromise(listGatewayLetterOfAuthorizationPromise);

        listGatewayLetterOfAuthorizationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGatewayStatistics', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getGatewayStatistics
        const id = 'testString';
        const type = 'macsec_mka';
        const params = {
          id: id,
          type: type,
        };

        const getGatewayStatisticsResult = directLink.getGatewayStatistics(params);

        // all methods should return a Promise
        expectToBePromise(getGatewayStatisticsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{id}/statistics', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['type']).toEqual(type);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const type = 'macsec_mka';
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

        directLink.getGatewayStatistics(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.getGatewayStatistics({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getGatewayStatisticsPromise = directLink.getGatewayStatistics();
        expectToBePromise(getGatewayStatisticsPromise);

        getGatewayStatisticsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGatewayStatus', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getGatewayStatus
        const id = 'testString';
        const type = 'bgp';
        const params = {
          id: id,
          type: type,
        };

        const getGatewayStatusResult = directLink.getGatewayStatus(params);

        // all methods should return a Promise
        expectToBePromise(getGatewayStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{id}/status', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['type']).toEqual(type);
        expect(options.path['id']).toEqual(id);
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

        directLink.getGatewayStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.getGatewayStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getGatewayStatusPromise = directLink.getGatewayStatus();
        expectToBePromise(getGatewayStatusPromise);

        getGatewayStatusPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listOfferingTypeLocations', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listOfferingTypeLocations
        const offeringType = 'dedicated';
        const params = {
          offeringType: offeringType,
        };

        const listOfferingTypeLocationsResult = directLink.listOfferingTypeLocations(params);

        // all methods should return a Promise
        expectToBePromise(listOfferingTypeLocationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/offering_types/{offering_type}/locations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['offering_type']).toEqual(offeringType);
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

        directLink.listOfferingTypeLocations(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.listOfferingTypeLocations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listOfferingTypeLocationsPromise = directLink.listOfferingTypeLocations();
        expectToBePromise(listOfferingTypeLocationsPromise);

        listOfferingTypeLocationsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listOfferingTypeLocationCrossConnectRouters', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listOfferingTypeLocationCrossConnectRouters
        const offeringType = 'dedicated';
        const locationName = 'testString';
        const params = {
          offeringType: offeringType,
          locationName: locationName,
        };

        const listOfferingTypeLocationCrossConnectRoutersResult = directLink.listOfferingTypeLocationCrossConnectRouters(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listOfferingTypeLocationCrossConnectRoutersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/offering_types/{offering_type}/locations/{location_name}/cross_connect_routers',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['offering_type']).toEqual(offeringType);
        expect(options.path['location_name']).toEqual(locationName);
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

        directLink.listOfferingTypeLocationCrossConnectRouters(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.listOfferingTypeLocationCrossConnectRouters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listOfferingTypeLocationCrossConnectRoutersPromise = directLink.listOfferingTypeLocationCrossConnectRouters();
        expectToBePromise(listOfferingTypeLocationCrossConnectRoutersPromise);

        listOfferingTypeLocationCrossConnectRoutersPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listOfferingTypeSpeeds', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listOfferingTypeSpeeds
        const offeringType = 'dedicated';
        const params = {
          offeringType: offeringType,
        };

        const listOfferingTypeSpeedsResult = directLink.listOfferingTypeSpeeds(params);

        // all methods should return a Promise
        expectToBePromise(listOfferingTypeSpeedsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/offering_types/{offering_type}/speeds', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['offering_type']).toEqual(offeringType);
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

        directLink.listOfferingTypeSpeeds(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.listOfferingTypeSpeeds({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listOfferingTypeSpeedsPromise = directLink.listOfferingTypeSpeeds();
        expectToBePromise(listOfferingTypeSpeedsPromise);

        listOfferingTypeSpeedsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listPorts', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listPorts
        const start = 'testString';
        const limit = 38;
        const locationName = 'testString';
        const params = {
          start: start,
          limit: limit,
          locationName: locationName,
        };

        const listPortsResult = directLink.listPorts(params);

        // all methods should return a Promise
        expectToBePromise(listPortsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ports', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['location_name']).toEqual(locationName);
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

        directLink.listPorts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        directLink.listPorts({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getPort', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getPort
        const id = 'testString';
        const params = {
          id: id,
        };

        const getPortResult = directLink.getPort(params);

        // all methods should return a Promise
        expectToBePromise(getPortResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/ports/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['id']).toEqual(id);
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

        directLink.getPort(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.getPort({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getPortPromise = directLink.getPort();
        expectToBePromise(getPortPromise);

        getPortPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listGatewayVirtualConnections', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listGatewayVirtualConnections
        const gatewayId = 'testString';
        const params = {
          gatewayId: gatewayId,
        };

        const listGatewayVirtualConnectionsResult = directLink.listGatewayVirtualConnections(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listGatewayVirtualConnectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{gateway_id}/virtual_connections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['gateway_id']).toEqual(gatewayId);
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

        directLink.listGatewayVirtualConnections(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.listGatewayVirtualConnections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listGatewayVirtualConnectionsPromise = directLink.listGatewayVirtualConnections();
        expectToBePromise(listGatewayVirtualConnectionsPromise);

        listGatewayVirtualConnectionsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createGatewayVirtualConnection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createGatewayVirtualConnection
        const gatewayId = 'testString';
        const name = 'newVC';
        const type = 'vpc';
        const networkId =
          'crn:v1:bluemix:public:is:us-east:a/28e4d90ac7504be69447111122223333::vpc:aaa81ac8-5e96-42a0-a4b7-6c2e2d1bbbbb';
        const params = {
          gatewayId: gatewayId,
          name: name,
          type: type,
          networkId: networkId,
        };

        const createGatewayVirtualConnectionResult = directLink.createGatewayVirtualConnection(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createGatewayVirtualConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{gateway_id}/virtual_connections', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['type']).toEqual(type);
        expect(options.body['network_id']).toEqual(networkId);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['gateway_id']).toEqual(gatewayId);
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

        directLink.createGatewayVirtualConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.createGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createGatewayVirtualConnectionPromise = directLink.createGatewayVirtualConnection();
        expectToBePromise(createGatewayVirtualConnectionPromise);

        createGatewayVirtualConnectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteGatewayVirtualConnection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteGatewayVirtualConnection
        const gatewayId = 'testString';
        const id = 'testString';
        const params = {
          gatewayId: gatewayId,
          id: id,
        };

        const deleteGatewayVirtualConnectionResult = directLink.deleteGatewayVirtualConnection(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteGatewayVirtualConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{gateway_id}/virtual_connections/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['gateway_id']).toEqual(gatewayId);
        expect(options.path['id']).toEqual(id);
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

        directLink.deleteGatewayVirtualConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.deleteGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteGatewayVirtualConnectionPromise = directLink.deleteGatewayVirtualConnection();
        expectToBePromise(deleteGatewayVirtualConnectionPromise);

        deleteGatewayVirtualConnectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getGatewayVirtualConnection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getGatewayVirtualConnection
        const gatewayId = 'testString';
        const id = 'testString';
        const params = {
          gatewayId: gatewayId,
          id: id,
        };

        const getGatewayVirtualConnectionResult = directLink.getGatewayVirtualConnection(params);

        // all methods should return a Promise
        expectToBePromise(getGatewayVirtualConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{gateway_id}/virtual_connections/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['gateway_id']).toEqual(gatewayId);
        expect(options.path['id']).toEqual(id);
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

        directLink.getGatewayVirtualConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.getGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getGatewayVirtualConnectionPromise = directLink.getGatewayVirtualConnection();
        expectToBePromise(getGatewayVirtualConnectionPromise);

        getGatewayVirtualConnectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateGatewayVirtualConnection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
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

        const updateGatewayVirtualConnectionResult = directLink.updateGatewayVirtualConnection(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateGatewayVirtualConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{gateway_id}/virtual_connections/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['status']).toEqual(status);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['gateway_id']).toEqual(gatewayId);
        expect(options.path['id']).toEqual(id);
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

        directLink.updateGatewayVirtualConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLink.updateGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateGatewayVirtualConnectionPromise = directLink.updateGatewayVirtualConnection();
        expectToBePromise(updateGatewayVirtualConnectionPromise);

        updateGatewayVirtualConnectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
