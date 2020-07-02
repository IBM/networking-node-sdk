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

const TransitGatewayApisV1 = require('../../dist/transit-gateway/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://transit.cloud.ibm.com/v1',
  version: '2019-01-01',
};

const transitGatewayApis = new TransitGatewayApisV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(transitGatewayApis, 'createRequest');
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

describe('TransitGatewayApisV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = TransitGatewayApisV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(TransitGatewayApisV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(TransitGatewayApisV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(TransitGatewayApisV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = extend(options, requiredGlobals);

      const testInstance = TransitGatewayApisV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(TransitGatewayApisV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = extend(options, requiredGlobals);

      const testInstance = new TransitGatewayApisV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = extend(options, requiredGlobals);

      const testInstance = new TransitGatewayApisV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(TransitGatewayApisV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new TransitGatewayApisV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.version).toEqual(service.version);
      });
    });
  });
  describe('listTransitGateways', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listTransitGateways
        const params = {};

        const listTransitGatewaysResult = transitGatewayApis.listTransitGateways(params);

        // all methods should return a Promise
        expectToBePromise(listTransitGatewaysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/transit_gateways', 'GET');
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

        transitGatewayApis.listTransitGateways(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        transitGatewayApis.listTransitGateways({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createTransitGateway', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceGroupIdentity
      const resourceGroupIdentityModel = {
        id: '56969d60-43e9-465c-883c-b9f7363e78e8',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createTransitGateway
        const location = 'us-south';
        const name = 'Transit_Service_BWTN_SJ_DL';
        const global = true;
        const resourceGroup = resourceGroupIdentityModel;
        const params = {
          location: location,
          name: name,
          global: global,
          resourceGroup: resourceGroup,
        };

        const createTransitGatewayResult = transitGatewayApis.createTransitGateway(params);

        // all methods should return a Promise
        expectToBePromise(createTransitGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/transit_gateways', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['location']).toEqual(location);
        expect(options.body['name']).toEqual(name);
        expect(options.body['global']).toEqual(global);
        expect(options.body['resource_group']).toEqual(resourceGroup);
        expect(options.qs['version']).toEqual(service.version);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const location = 'us-south';
        const name = 'Transit_Service_BWTN_SJ_DL';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          location,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApis.createTransitGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await transitGatewayApis.createTransitGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createTransitGatewayPromise = transitGatewayApis.createTransitGateway();
        expectToBePromise(createTransitGatewayPromise);

        createTransitGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteTransitGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteTransitGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteTransitGatewayResult = transitGatewayApis.deleteTransitGateway(params);

        // all methods should return a Promise
        expectToBePromise(deleteTransitGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/transit_gateways/{id}', 'DELETE');
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

        transitGatewayApis.deleteTransitGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await transitGatewayApis.deleteTransitGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteTransitGatewayPromise = transitGatewayApis.deleteTransitGateway();
        expectToBePromise(deleteTransitGatewayPromise);

        deleteTransitGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('detailTransitGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation detailTransitGateway
        const id = 'testString';
        const params = {
          id: id,
        };

        const detailTransitGatewayResult = transitGatewayApis.detailTransitGateway(params);

        // all methods should return a Promise
        expectToBePromise(detailTransitGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/transit_gateways/{id}', 'GET');
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

        transitGatewayApis.detailTransitGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await transitGatewayApis.detailTransitGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const detailTransitGatewayPromise = transitGatewayApis.detailTransitGateway();
        expectToBePromise(detailTransitGatewayPromise);

        detailTransitGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateTransitGateway', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateTransitGateway
        const id = 'testString';
        const global = true;
        const name = 'my-transit-gateway';
        const params = {
          id: id,
          global: global,
          name: name,
        };

        const updateTransitGatewayResult = transitGatewayApis.updateTransitGateway(params);

        // all methods should return a Promise
        expectToBePromise(updateTransitGatewayResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/transit_gateways/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['global']).toEqual(global);
        expect(options.body['name']).toEqual(name);
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

        transitGatewayApis.updateTransitGateway(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await transitGatewayApis.updateTransitGateway({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateTransitGatewayPromise = transitGatewayApis.updateTransitGateway();
        expectToBePromise(updateTransitGatewayPromise);

        updateTransitGatewayPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listTransitGatewayConnections', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listTransitGatewayConnections
        const transitGatewayId = 'testString';
        const params = {
          transitGatewayId: transitGatewayId,
        };

        const listTransitGatewayConnectionsResult = transitGatewayApis.listTransitGatewayConnections(
          params
        );

        // all methods should return a Promise
        expectToBePromise(listTransitGatewayConnectionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/transit_gateways/{transit_gateway_id}/connections', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['transit_gateway_id']).toEqual(transitGatewayId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          transitGatewayId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApis.listTransitGatewayConnections(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await transitGatewayApis.listTransitGatewayConnections({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listTransitGatewayConnectionsPromise = transitGatewayApis.listTransitGatewayConnections();
        expectToBePromise(listTransitGatewayConnectionsPromise);

        listTransitGatewayConnectionsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createTransitGatewayConnection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createTransitGatewayConnection
        const transitGatewayId = 'testString';
        const networkType = 'vpc';
        const name = 'Transit_Service_BWTN_SJ_DL';
        const networkId =
          'crn:v1:bluemix:public:is:us-south:a/123456::vpc:4727d842-f94f-4a2d-824a-9bc9b02c523b';
        const params = {
          transitGatewayId: transitGatewayId,
          networkType: networkType,
          name: name,
          networkId: networkId,
        };

        const createTransitGatewayConnectionResult = transitGatewayApis.createTransitGatewayConnection(
          params
        );

        // all methods should return a Promise
        expectToBePromise(createTransitGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/transit_gateways/{transit_gateway_id}/connections', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['network_type']).toEqual(networkType);
        expect(options.body['name']).toEqual(name);
        expect(options.body['network_id']).toEqual(networkId);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['transit_gateway_id']).toEqual(transitGatewayId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const networkType = 'vpc';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          transitGatewayId,
          networkType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApis.createTransitGatewayConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await transitGatewayApis.createTransitGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createTransitGatewayConnectionPromise = transitGatewayApis.createTransitGatewayConnection();
        expectToBePromise(createTransitGatewayConnectionPromise);

        createTransitGatewayConnectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteTransitGatewayConnection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteTransitGatewayConnection
        const transitGatewayId = 'testString';
        const id = 'testString';
        const params = {
          transitGatewayId: transitGatewayId,
          id: id,
        };

        const deleteTransitGatewayConnectionResult = transitGatewayApis.deleteTransitGatewayConnection(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteTransitGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/transit_gateways/{transit_gateway_id}/connections/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['transit_gateway_id']).toEqual(transitGatewayId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          transitGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApis.deleteTransitGatewayConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await transitGatewayApis.deleteTransitGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteTransitGatewayConnectionPromise = transitGatewayApis.deleteTransitGatewayConnection();
        expectToBePromise(deleteTransitGatewayConnectionPromise);

        deleteTransitGatewayConnectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('detailTransitGatewayConnection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation detailTransitGatewayConnection
        const transitGatewayId = 'testString';
        const id = 'testString';
        const params = {
          transitGatewayId: transitGatewayId,
          id: id,
        };

        const detailTransitGatewayConnectionResult = transitGatewayApis.detailTransitGatewayConnection(
          params
        );

        // all methods should return a Promise
        expectToBePromise(detailTransitGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/transit_gateways/{transit_gateway_id}/connections/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['transit_gateway_id']).toEqual(transitGatewayId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          transitGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApis.detailTransitGatewayConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await transitGatewayApis.detailTransitGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const detailTransitGatewayConnectionPromise = transitGatewayApis.detailTransitGatewayConnection();
        expectToBePromise(detailTransitGatewayConnectionPromise);

        detailTransitGatewayConnectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateTransitGatewayConnection', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateTransitGatewayConnection
        const transitGatewayId = 'testString';
        const id = 'testString';
        const name = 'Transit_Service_BWTN_SJ_DL';
        const params = {
          transitGatewayId: transitGatewayId,
          id: id,
          name: name,
        };

        const updateTransitGatewayConnectionResult = transitGatewayApis.updateTransitGatewayConnection(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateTransitGatewayConnectionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/transit_gateways/{transit_gateway_id}/connections/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['name']).toEqual(name);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['transit_gateway_id']).toEqual(transitGatewayId);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const transitGatewayId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          transitGatewayId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApis.updateTransitGatewayConnection(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await transitGatewayApis.updateTransitGatewayConnection({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateTransitGatewayConnectionPromise = transitGatewayApis.updateTransitGatewayConnection();
        expectToBePromise(updateTransitGatewayConnectionPromise);

        updateTransitGatewayConnectionPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listGatewayLocations', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listGatewayLocations
        const params = {};

        const listGatewayLocationsResult = transitGatewayApis.listGatewayLocations(params);

        // all methods should return a Promise
        expectToBePromise(listGatewayLocationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/locations', 'GET');
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

        transitGatewayApis.listGatewayLocations(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        transitGatewayApis.listGatewayLocations({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('detailGatewayLocation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation detailGatewayLocation
        const name = 'testString';
        const params = {
          name: name,
        };

        const detailGatewayLocationResult = transitGatewayApis.detailGatewayLocation(params);

        // all methods should return a Promise
        expectToBePromise(detailGatewayLocationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/locations/{name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['version']).toEqual(service.version);
        expect(options.path['name']).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        transitGatewayApis.detailGatewayLocation(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await transitGatewayApis.detailGatewayLocation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const detailGatewayLocationPromise = transitGatewayApis.detailGatewayLocation();
        expectToBePromise(detailGatewayLocationPromise);

        detailGatewayLocationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
