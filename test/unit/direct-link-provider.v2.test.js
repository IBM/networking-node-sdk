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

const DirectLinkProviderV2 = require('../../dist/direct-link-provider/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://directlink.cloud.ibm.com/provider/v2',
  version: 'testString',
};

const directLinkProvider = new DirectLinkProviderV2(service);

// dont actually create a request
const createRequestMock = jest.spyOn(directLinkProvider, 'createRequest');
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

describe.skip('DirectLinkProviderV2', () => {
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

      options = extend(options, requiredGlobals);

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

      options = extend(options, requiredGlobals);

      const testInstance = new DirectLinkProviderV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = extend(options, requiredGlobals);

      const testInstance = new DirectLinkProviderV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(DirectLinkProviderV2.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new DirectLinkProviderV2(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(service.version);
      });
    });
  });
  describe('listProviderGateways', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listProviderGateways
        const start = 'testString';
        const limit = 38;
        const params = {
          start: start,
          limit: limit,
        };

        const listProviderGatewaysResult = directLinkProvider.listProviderGateways(params);

        // all methods should return a Promise
        expectToBePromise(listProviderGatewaysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
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

        directLinkProvider.listProviderGateways(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        directLinkProvider.listProviderGateways({});
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createProviderGateway
        const bgpAsn = 64999;
        const customerAccountId = '4111d05f36894e3cb9b46a43556d9000';
        const name = 'myGateway';
        const port = providerGatewayPortIdentityModel;
        const speedMbps = 1000;
        const bgpCerCidr = '10.254.30.78/30';
        const bgpIbmCidr = '10.254.30.77/30';
        const checkOnly = 'testString';
        const params = {
          bgpAsn: bgpAsn,
          customerAccountId: customerAccountId,
          name: name,
          port: port,
          speedMbps: speedMbps,
          bgpCerCidr: bgpCerCidr,
          bgpIbmCidr: bgpIbmCidr,
          checkOnly: checkOnly,
        };

        const createProviderGatewayResult = directLinkProvider.createProviderGateway(params);

        // all methods should return a Promise
        expectToBePromise(createProviderGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['bgp_asn']).toEqual(bgpAsn);
        expect(options.body['customer_account_id']).toEqual(customerAccountId);
        expect(options.body['name']).toEqual(name);
        expect(options.body['port']).toEqual(port);
        expect(options.body['speed_mbps']).toEqual(speedMbps);
        expect(options.body['bgp_cer_cidr']).toEqual(bgpCerCidr);
        expect(options.body['bgp_ibm_cidr']).toEqual(bgpIbmCidr);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.qs['check_only']).toEqual(checkOnly);
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

        directLinkProvider.createProviderGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkProvider.createProviderGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createProviderGatewayPromise = directLinkProvider.createProviderGateway();
        expectToBePromise(createProviderGatewayPromise);

        createProviderGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteProviderGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteProviderGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteProviderGatewayResult = directLinkProvider.deleteProviderGateway(params);

        // all methods should return a Promise
        expectToBePromise(deleteProviderGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{id}', 'DELETE');
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

        directLinkProvider.deleteProviderGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkProvider.deleteProviderGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteProviderGatewayPromise = directLinkProvider.deleteProviderGateway();
        expectToBePromise(deleteProviderGatewayPromise);

        deleteProviderGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getProviderGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getProviderGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const getProviderGatewayResult = directLinkProvider.getProviderGateway(params);

        // all methods should return a Promise
        expectToBePromise(getProviderGatewayResult);

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

        directLinkProvider.getProviderGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkProvider.getProviderGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getProviderGatewayPromise = directLinkProvider.getProviderGateway();
        expectToBePromise(getProviderGatewayPromise);

        getProviderGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateProviderGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateProviderGateway
        const id = 'testString';
        const bgpAsn = 64999;
        const bgpCerCidr = '169.254.0.10/30';
        const bgpIbmCidr = '169.254.0.9/30';
        const name = 'myNewGateway';
        const speedMbps = 1000;
        const params = {
          id: id,
          bgpAsn: bgpAsn,
          bgpCerCidr: bgpCerCidr,
          bgpIbmCidr: bgpIbmCidr,
          name: name,
          speedMbps: speedMbps,
        };

        const updateProviderGatewayResult = directLinkProvider.updateProviderGateway(params);

        // all methods should return a Promise
        expectToBePromise(updateProviderGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['bgp_asn']).toEqual(bgpAsn);
        expect(options.body['bgp_cer_cidr']).toEqual(bgpCerCidr);
        expect(options.body['bgp_ibm_cidr']).toEqual(bgpIbmCidr);
        expect(options.body['name']).toEqual(name);
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

        directLinkProvider.updateProviderGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkProvider.updateProviderGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateProviderGatewayPromise = directLinkProvider.updateProviderGateway();
        expectToBePromise(updateProviderGatewayPromise);

        updateProviderGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listProviderPorts', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listProviderPorts
        const start = 'testString';
        const limit = 38;
        const params = {
          start: start,
          limit: limit,
        };

        const listProviderPortsResult = directLinkProvider.listProviderPorts(params);

        // all methods should return a Promise
        expectToBePromise(listProviderPortsResult);

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

        directLinkProvider.listProviderPorts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        directLinkProvider.listProviderPorts({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getProviderPort', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getProviderPort
        const id = 'testString';
        const params = {
          id: id,
        };

        const getProviderPortResult = directLinkProvider.getProviderPort(params);

        // all methods should return a Promise
        expectToBePromise(getProviderPortResult);

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

        directLinkProvider.getProviderPort(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkProvider.getProviderPort({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getProviderPortPromise = directLinkProvider.getProviderPort();
        expectToBePromise(getProviderPortPromise);

        getProviderPortPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
