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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const DirectLinkProviderV2 = require('../../dist/direct-link-provider/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const directLinkProviderServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://directlink.cloud.ibm.com/provider/v2',
  version: 'testString',
};

const directLinkProviderService = new DirectLinkProviderV2(directLinkProviderServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(directLinkProviderService, 'createRequest');
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

describe('DirectLinkProviderV2', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = DirectLinkProviderV2.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(DirectLinkProviderV2.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(DirectLinkProviderV2.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(DirectLinkProviderV2);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = DirectLinkProviderV2.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(DirectLinkProviderV2);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DirectLinkProviderV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DirectLinkProviderV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(DirectLinkProviderV2.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new DirectLinkProviderV2(directLinkProviderServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(directLinkProviderServiceOptions.version);
      });
    });
  });
  describe('listProviderGateways', () => {
    describe('positive tests', () => {
      function __listProviderGatewaysTest() {
        // Construct the params object for operation listProviderGateways
        const start = 'testString';
        const limit = 1;
        const params = {
          start: start,
          limit: limit,
        };

        const listProviderGatewaysResult = directLinkProviderService.listProviderGateways(params);

        // all methods should return a Promise
        expectToBePromise(listProviderGatewaysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkProviderServiceOptions.version);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProviderGatewaysTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkProviderService.enableRetries();
        __listProviderGatewaysTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkProviderService.disableRetries();
        __listProviderGatewaysTest();
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

        directLinkProviderService.listProviderGateways(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        directLinkProviderService.listProviderGateways({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createProviderGateway', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProviderGatewayPortIdentity
      const providerGatewayPortIdentityModel = {
        id: 'fffdcb1a-fee4-41c7-9e11-9cd99e65c777',
      };

      function __createProviderGatewayTest() {
        // Construct the params object for operation createProviderGateway
        const bgpAsn = 64999;
        const customerAccountId = '4111d05f36894e3cb9b46a43556d9000';
        const name = 'myGateway';
        const port = providerGatewayPortIdentityModel;
        const speedMbps = 1000;
        const bgpCerCidr = '10.254.30.78/30';
        const bgpIbmCidr = '10.254.30.77/30';
        const vlan = 10;
        const checkOnly = 'testString';
        const params = {
          bgpAsn: bgpAsn,
          customerAccountId: customerAccountId,
          name: name,
          port: port,
          speedMbps: speedMbps,
          bgpCerCidr: bgpCerCidr,
          bgpIbmCidr: bgpIbmCidr,
          vlan: vlan,
          checkOnly: checkOnly,
        };

        const createProviderGatewayResult = directLinkProviderService.createProviderGateway(params);

        // all methods should return a Promise
        expectToBePromise(createProviderGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.bgp_asn).toEqual(bgpAsn);
        expect(mockRequestOptions.body.customer_account_id).toEqual(customerAccountId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.port).toEqual(port);
        expect(mockRequestOptions.body.speed_mbps).toEqual(speedMbps);
        expect(mockRequestOptions.body.bgp_cer_cidr).toEqual(bgpCerCidr);
        expect(mockRequestOptions.body.bgp_ibm_cidr).toEqual(bgpIbmCidr);
        expect(mockRequestOptions.body.vlan).toEqual(vlan);
        expect(mockRequestOptions.qs.version).toEqual(directLinkProviderServiceOptions.version);
        expect(mockRequestOptions.qs.check_only).toEqual(checkOnly);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createProviderGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkProviderService.enableRetries();
        __createProviderGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkProviderService.disableRetries();
        __createProviderGatewayTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bgpAsn = 64999;
        const customerAccountId = '4111d05f36894e3cb9b46a43556d9000';
        const name = 'myGateway';
        const port = providerGatewayPortIdentityModel;
        const speedMbps = 1000;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          bgpAsn,
          customerAccountId,
          name,
          port,
          speedMbps,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        directLinkProviderService.createProviderGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkProviderService.createProviderGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkProviderService.createProviderGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteProviderGateway', () => {
    describe('positive tests', () => {
      function __deleteProviderGatewayTest() {
        // Construct the params object for operation deleteProviderGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteProviderGatewayResult = directLinkProviderService.deleteProviderGateway(params);

        // all methods should return a Promise
        expectToBePromise(deleteProviderGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkProviderServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteProviderGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkProviderService.enableRetries();
        __deleteProviderGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkProviderService.disableRetries();
        __deleteProviderGatewayTest();
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

        directLinkProviderService.deleteProviderGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkProviderService.deleteProviderGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkProviderService.deleteProviderGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getProviderGateway', () => {
    describe('positive tests', () => {
      function __getProviderGatewayTest() {
        // Construct the params object for operation getProviderGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const getProviderGatewayResult = directLinkProviderService.getProviderGateway(params);

        // all methods should return a Promise
        expectToBePromise(getProviderGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkProviderServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProviderGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkProviderService.enableRetries();
        __getProviderGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkProviderService.disableRetries();
        __getProviderGatewayTest();
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

        directLinkProviderService.getProviderGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkProviderService.getProviderGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkProviderService.getProviderGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateProviderGateway', () => {
    describe('positive tests', () => {
      function __updateProviderGatewayTest() {
        // Construct the params object for operation updateProviderGateway
        const id = 'testString';
        const bgpAsn = 64999;
        const bgpCerCidr = '169.254.0.10/30';
        const bgpIbmCidr = '169.254.0.9/30';
        const name = 'myNewGateway';
        const speedMbps = 1000;
        const vlan = 10;
        const params = {
          id: id,
          bgpAsn: bgpAsn,
          bgpCerCidr: bgpCerCidr,
          bgpIbmCidr: bgpIbmCidr,
          name: name,
          speedMbps: speedMbps,
          vlan: vlan,
        };

        const updateProviderGatewayResult = directLinkProviderService.updateProviderGateway(params);

        // all methods should return a Promise
        expectToBePromise(updateProviderGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/gateways/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.bgp_asn).toEqual(bgpAsn);
        expect(mockRequestOptions.body.bgp_cer_cidr).toEqual(bgpCerCidr);
        expect(mockRequestOptions.body.bgp_ibm_cidr).toEqual(bgpIbmCidr);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.speed_mbps).toEqual(speedMbps);
        expect(mockRequestOptions.body.vlan).toEqual(vlan);
        expect(mockRequestOptions.qs.version).toEqual(directLinkProviderServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateProviderGatewayTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkProviderService.enableRetries();
        __updateProviderGatewayTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkProviderService.disableRetries();
        __updateProviderGatewayTest();
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

        directLinkProviderService.updateProviderGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkProviderService.updateProviderGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkProviderService.updateProviderGateway();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listProviderPorts', () => {
    describe('positive tests', () => {
      function __listProviderPortsTest() {
        // Construct the params object for operation listProviderPorts
        const start = 'testString';
        const limit = 1;
        const params = {
          start: start,
          limit: limit,
        };

        const listProviderPortsResult = directLinkProviderService.listProviderPorts(params);

        // all methods should return a Promise
        expectToBePromise(listProviderPortsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ports', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkProviderServiceOptions.version);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProviderPortsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkProviderService.enableRetries();
        __listProviderPortsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkProviderService.disableRetries();
        __listProviderPortsTest();
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

        directLinkProviderService.listProviderPorts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        directLinkProviderService.listProviderPorts({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getProviderPort', () => {
    describe('positive tests', () => {
      function __getProviderPortTest() {
        // Construct the params object for operation getProviderPort
        const id = 'testString';
        const params = {
          id: id,
        };

        const getProviderPortResult = directLinkProviderService.getProviderPort(params);

        // all methods should return a Promise
        expectToBePromise(getProviderPortResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/ports/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(directLinkProviderServiceOptions.version);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProviderPortTest();

        // enable retries and test again
        createRequestMock.mockClear();
        directLinkProviderService.enableRetries();
        __getProviderPortTest();

        // disable retries and test again
        createRequestMock.mockClear();
        directLinkProviderService.disableRetries();
        __getProviderPortTest();
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

        directLinkProviderService.getProviderPort(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await directLinkProviderService.getProviderPort({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await directLinkProviderService.getProviderPort();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
