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

const RangeApplicationsV1 = require('../../../dist/cis/rangeapplicationsv1/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  zoneIdentifier: 'testString',
};

const rangeApplicationsService = new RangeApplicationsV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(rangeApplicationsService, 'createRequest');
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

describe('RangeApplicationsV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = RangeApplicationsV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(RangeApplicationsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(RangeApplicationsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(RangeApplicationsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = RangeApplicationsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(RangeApplicationsV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new RangeApplicationsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new RangeApplicationsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(RangeApplicationsV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new RangeApplicationsV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneIdentifier).toEqual(service.zoneIdentifier);
      });
    });
  });
  describe('listRangeApps', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listRangeApps
        const page = 38;
        const perPage = 1;
        const order = 'protocol';
        const direction = 'asc';
        const params = {
          page: page,
          perPage: perPage,
          order: order,
          direction: direction,
        };

        const listRangeAppsResult = rangeApplicationsService.listRangeApps(params);

        // all methods should return a Promise
        expectToBePromise(listRangeAppsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/range/apps', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['page']).toEqual(page);
        expect(options.qs['per_page']).toEqual(perPage);
        expect(options.qs['order']).toEqual(order);
        expect(options.qs['direction']).toEqual(direction);
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

        rangeApplicationsService.listRangeApps(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        rangeApplicationsService.listRangeApps({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createRangeApp', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RangeAppReqDns
      const rangeAppReqDnsModel = {
        type: 'CNAME',
        name: 'ssh.example.com',
      };

      // RangeAppReqOriginDns
      const rangeAppReqOriginDnsModel = {
        name: 'origin.net',
      };

      // RangeAppReqEdgeIps
      const rangeAppReqEdgeIpsModel = {
        type: 'dynamic',
        connectivity: 'all',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createRangeApp
        const protocol = 'tcp/22';
        const dns = rangeAppReqDnsModel;
        const originDirect = ['testString'];
        const originDns = rangeAppReqOriginDnsModel;
        const originPort = 22;
        const ipFirewall = true;
        const proxyProtocol = 'off';
        const edgeIps = rangeAppReqEdgeIpsModel;
        const trafficType = 'direct';
        const tls = 'off';
        const params = {
          protocol: protocol,
          dns: dns,
          originDirect: originDirect,
          originDns: originDns,
          originPort: originPort,
          ipFirewall: ipFirewall,
          proxyProtocol: proxyProtocol,
          edgeIps: edgeIps,
          trafficType: trafficType,
          tls: tls,
        };

        const createRangeAppResult = rangeApplicationsService.createRangeApp(params);

        // all methods should return a Promise
        expectToBePromise(createRangeAppResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/range/apps', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['protocol']).toEqual(protocol);
        expect(options.body['dns']).toEqual(dns);
        expect(options.body['origin_direct']).toEqual(originDirect);
        expect(options.body['origin_dns']).toEqual(originDns);
        expect(options.body['origin_port']).toEqual(originPort);
        expect(options.body['ip_firewall']).toEqual(ipFirewall);
        expect(options.body['proxy_protocol']).toEqual(proxyProtocol);
        expect(options.body['edge_ips']).toEqual(edgeIps);
        expect(options.body['traffic_type']).toEqual(trafficType);
        expect(options.body['tls']).toEqual(tls);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const protocol = 'tcp/22';
        const dns = rangeAppReqDnsModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          protocol,
          dns,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rangeApplicationsService.createRangeApp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rangeApplicationsService.createRangeApp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const createRangeAppPromise = rangeApplicationsService.createRangeApp();
        expectToBePromise(createRangeAppPromise);

        createRangeAppPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getRangeApp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getRangeApp
        const appIdentifier = 'testString';
        const params = {
          appIdentifier: appIdentifier,
        };

        const getRangeAppResult = rangeApplicationsService.getRangeApp(params);

        // all methods should return a Promise
        expectToBePromise(getRangeAppResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/range/apps/{app_identifier}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['app_identifier']).toEqual(appIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const appIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          appIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rangeApplicationsService.getRangeApp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rangeApplicationsService.getRangeApp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const getRangeAppPromise = rangeApplicationsService.getRangeApp();
        expectToBePromise(getRangeAppPromise);

        getRangeAppPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateRangeApp', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RangeAppReqDns
      const rangeAppReqDnsModel = {
        type: 'CNAME',
        name: 'ssh.example.com',
      };

      // RangeAppReqOriginDns
      const rangeAppReqOriginDnsModel = {
        name: 'origin.net',
      };

      // RangeAppReqEdgeIps
      const rangeAppReqEdgeIpsModel = {
        type: 'dynamic',
        connectivity: 'all',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateRangeApp
        const appIdentifier = 'testString';
        const protocol = 'tcp/22';
        const dns = rangeAppReqDnsModel;
        const originDirect = ['testString'];
        const originDns = rangeAppReqOriginDnsModel;
        const originPort = 22;
        const ipFirewall = true;
        const proxyProtocol = 'off';
        const edgeIps = rangeAppReqEdgeIpsModel;
        const trafficType = 'direct';
        const tls = 'off';
        const params = {
          appIdentifier: appIdentifier,
          protocol: protocol,
          dns: dns,
          originDirect: originDirect,
          originDns: originDns,
          originPort: originPort,
          ipFirewall: ipFirewall,
          proxyProtocol: proxyProtocol,
          edgeIps: edgeIps,
          trafficType: trafficType,
          tls: tls,
        };

        const updateRangeAppResult = rangeApplicationsService.updateRangeApp(params);

        // all methods should return a Promise
        expectToBePromise(updateRangeAppResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/range/apps/{app_identifier}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['protocol']).toEqual(protocol);
        expect(options.body['dns']).toEqual(dns);
        expect(options.body['origin_direct']).toEqual(originDirect);
        expect(options.body['origin_dns']).toEqual(originDns);
        expect(options.body['origin_port']).toEqual(originPort);
        expect(options.body['ip_firewall']).toEqual(ipFirewall);
        expect(options.body['proxy_protocol']).toEqual(proxyProtocol);
        expect(options.body['edge_ips']).toEqual(edgeIps);
        expect(options.body['traffic_type']).toEqual(trafficType);
        expect(options.body['tls']).toEqual(tls);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['app_identifier']).toEqual(appIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const appIdentifier = 'testString';
        const protocol = 'tcp/22';
        const dns = rangeAppReqDnsModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          appIdentifier,
          protocol,
          dns,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rangeApplicationsService.updateRangeApp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rangeApplicationsService.updateRangeApp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const updateRangeAppPromise = rangeApplicationsService.updateRangeApp();
        expectToBePromise(updateRangeAppPromise);

        updateRangeAppPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteRangeApp', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteRangeApp
        const appIdentifier = 'testString';
        const params = {
          appIdentifier: appIdentifier,
        };

        const deleteRangeAppResult = rangeApplicationsService.deleteRangeApp(params);

        // all methods should return a Promise
        expectToBePromise(deleteRangeAppResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/range/apps/{app_identifier}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['app_identifier']).toEqual(appIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const appIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          appIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rangeApplicationsService.deleteRangeApp(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rangeApplicationsService.deleteRangeApp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const deleteRangeAppPromise = rangeApplicationsService.deleteRangeApp();
        expectToBePromise(deleteRangeAppPromise);

        deleteRangeAppPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
