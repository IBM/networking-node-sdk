/**
 * (C) Copyright IBM Corp. 2020.
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

const DirectLinkApisV1 = require('../../dist/direct-link-apis/v1');

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
  version: '2019-01-01',
};

const directLinkApis = new DirectLinkApisV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(directLinkApis, 'createRequest');
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
    version: '2019-01-01',
  };
});

describe('DirectLinkApisV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = DirectLinkApisV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(DirectLinkApisV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(DirectLinkApisV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(DirectLinkApisV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = extend(options, requiredGlobals);

      const testInstance = DirectLinkApisV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(DirectLinkApisV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = extend(options, requiredGlobals);

      const testInstance = new DirectLinkApisV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = extend(options, requiredGlobals);

      const testInstance = new DirectLinkApisV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(DirectLinkApisV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new DirectLinkApisV1(service);
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

        const listGatewaysResult = directLinkApis.listGateways(params);

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

        directLinkApis.listGateways(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        directLinkApis.listGateways({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createGateway', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceGroupIdentity
      const resourceGroupIdentityModel = {
        id: '56969d6043e9465c883cb9f7363e78e8',
      };

      // GatewayTemplateGatewayTypeDedicatedTemplate
      const gatewayTemplateModel = {
        bgp_asn: 64999,
        bgp_base_cidr: '10.254.30.76/30',
        bgp_cer_cidr: '10.254.30.78/30',
        bgp_ibm_cidr: '10.254.30.77/30',
        global: true,
        metered: false,
        name: 'myGateway',
        resource_group: resourceGroupIdentityModel,
        speed_mbps: 1000,
        type: 'dedicated',
        carrier_name: 'myCarrierName',
        cross_connect_router: 'xcr01.dal03',
        customer_name: 'newCustomerName',
        dedicated_hosting_id: 'ef4dcb1a-fee4-41c7-9e11-9cd99e65c1f4',
        location_name: 'dal03',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createGateway
        const gatewayTemplate = gatewayTemplateModel;
        const params = {
          gatewayTemplate: gatewayTemplate,
        };

        const createGatewayResult = directLinkApis.createGateway(params);

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

        directLinkApis.createGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.createGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createGatewayPromise = directLinkApis.createGateway();
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

        const deleteGatewayResult = directLinkApis.deleteGateway(params);

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

        directLinkApis.deleteGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.deleteGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteGatewayPromise = directLinkApis.deleteGateway();
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

        const getGatewayResult = directLinkApis.getGateway(params);

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

        directLinkApis.getGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.getGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getGatewayPromise = directLinkApis.getGateway();
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateGateway
        const id = 'testString';
        const global = true;
        const loaRejectReason = 'The port mentioned was incorrect';
        const metered = false;
        const name = 'testGateway';
        const operationalStatus = 'loa_accepted';
        const speedMbps = 1000;
        const params = {
          id: id,
          global: global,
          loaRejectReason: loaRejectReason,
          metered: metered,
          name: name,
          operationalStatus: operationalStatus,
          speedMbps: speedMbps,
        };

        const updateGatewayResult = directLinkApis.updateGateway(params);

        // all methods should return a Promise
        expectToBePromise(updateGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/gateways/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['global']).toEqual(global);
        expect(options.body['loa_reject_reason']).toEqual(loaRejectReason);
        expect(options.body['metered']).toEqual(metered);
        expect(options.body['name']).toEqual(name);
        expect(options.body['operational_status']).toEqual(operationalStatus);
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

        directLinkApis.updateGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.updateGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateGatewayPromise = directLinkApis.updateGateway();
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

      // ResourceGroupIdentity
      const resourceGroupIdentityModel = {
        id: '56969d6043e9465c883cb9f7363e78e8',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createGatewayAction
        const id = 'testString';
        const action = 'create_gateway_approve';
        const global = true;
        const metered = false;
        const resourceGroup = resourceGroupIdentityModel;
        const updates = [{ foo: 'bar' }];
        const params = {
          id: id,
          action: action,
          global: global,
          metered: metered,
          resourceGroup: resourceGroup,
          updates: updates,
        };

        const createGatewayActionResult = directLinkApis.createGatewayAction(params);

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

        directLinkApis.createGatewayAction(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.createGatewayAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createGatewayActionPromise = directLinkApis.createGatewayAction();
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

        const listGatewayCompletionNoticeResult = directLinkApis.listGatewayCompletionNotice(
          params
        );

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

        directLinkApis.listGatewayCompletionNotice(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.listGatewayCompletionNotice({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listGatewayCompletionNoticePromise = directLinkApis.listGatewayCompletionNotice();
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

        const createGatewayCompletionNoticeResult = directLinkApis.createGatewayCompletionNotice(
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

        directLinkApis.createGatewayCompletionNotice(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.createGatewayCompletionNotice({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createGatewayCompletionNoticePromise = directLinkApis.createGatewayCompletionNotice();
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

        const listGatewayLetterOfAuthorizationResult = directLinkApis.listGatewayLetterOfAuthorization(
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

        directLinkApis.listGatewayLetterOfAuthorization(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.listGatewayLetterOfAuthorization({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listGatewayLetterOfAuthorizationPromise = directLinkApis.listGatewayLetterOfAuthorization();
        expectToBePromise(listGatewayLetterOfAuthorizationPromise);

        listGatewayLetterOfAuthorizationPromise.catch(err => {
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

        const listOfferingTypeLocationsResult = directLinkApis.listOfferingTypeLocations(params);

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

        directLinkApis.listOfferingTypeLocations(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.listOfferingTypeLocations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listOfferingTypeLocationsPromise = directLinkApis.listOfferingTypeLocations();
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

        const listOfferingTypeLocationCrossConnectRoutersResult = directLinkApis.listOfferingTypeLocationCrossConnectRouters(
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

        directLinkApis.listOfferingTypeLocationCrossConnectRouters(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.listOfferingTypeLocationCrossConnectRouters({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listOfferingTypeLocationCrossConnectRoutersPromise = directLinkApis.listOfferingTypeLocationCrossConnectRouters();
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

        const listOfferingTypeSpeedsResult = directLinkApis.listOfferingTypeSpeeds(params);

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

        directLinkApis.listOfferingTypeSpeeds(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.listOfferingTypeSpeeds({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listOfferingTypeSpeedsPromise = directLinkApis.listOfferingTypeSpeeds();
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
        const limit = 1;
        const locationName = 'testString';
        const params = {
          start: start,
          limit: limit,
          locationName: locationName,
        };

        const listPortsResult = directLinkApis.listPorts(params);

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

        directLinkApis.listPorts(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        directLinkApis.listPorts({});
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

        const getPortResult = directLinkApis.getPort(params);

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

        directLinkApis.getPort(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.getPort({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getPortPromise = directLinkApis.getPort();
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

        const listGatewayVirtualConnectionsResult = directLinkApis.listGatewayVirtualConnections(
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

        directLinkApis.listGatewayVirtualConnections(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.listGatewayVirtualConnections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listGatewayVirtualConnectionsPromise = directLinkApis.listGatewayVirtualConnections();
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

        const createGatewayVirtualConnectionResult = directLinkApis.createGatewayVirtualConnection(
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

        directLinkApis.createGatewayVirtualConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.createGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createGatewayVirtualConnectionPromise = directLinkApis.createGatewayVirtualConnection();
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

        const deleteGatewayVirtualConnectionResult = directLinkApis.deleteGatewayVirtualConnection(
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

        directLinkApis.deleteGatewayVirtualConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.deleteGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteGatewayVirtualConnectionPromise = directLinkApis.deleteGatewayVirtualConnection();
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

        const getGatewayVirtualConnectionResult = directLinkApis.getGatewayVirtualConnection(
          params
        );

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

        directLinkApis.getGatewayVirtualConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.getGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getGatewayVirtualConnectionPromise = directLinkApis.getGatewayVirtualConnection();
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

        const updateGatewayVirtualConnectionResult = directLinkApis.updateGatewayVirtualConnection(
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

        directLinkApis.updateGatewayVirtualConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await directLinkApis.updateGatewayVirtualConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateGatewayVirtualConnectionPromise = directLinkApis.updateGatewayVirtualConnection();
        expectToBePromise(updateGatewayVirtualConnectionPromise);

        updateGatewayVirtualConnectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
