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

const DnsRecordsV1 = require('../../../dist/cis/dnsrecordsv1/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  zoneIdentifier: 'testString',
};

const dnsRecordsService = new DnsRecordsV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(dnsRecordsService, 'createRequest');
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

describe('DnsRecordsV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = DnsRecordsV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(DnsRecordsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(DnsRecordsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(DnsRecordsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = DnsRecordsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(DnsRecordsV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DnsRecordsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new DnsRecordsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(DnsRecordsV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new DnsRecordsV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneIdentifier).toEqual(service.zoneIdentifier);
      });
    });
  });
  describe('listAllDnsRecords', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAllDnsRecords
        const type = 'testString';
        const name = 'host1.test-example.com';
        const content = '1.2.3.4';
        const page = 38;
        const perPage = 5;
        const order = 'type';
        const direction = 'asc';
        const match = 'any';
        const params = {
          type: type,
          name: name,
          content: content,
          page: page,
          perPage: perPage,
          order: order,
          direction: direction,
          match: match,
        };

        const listAllDnsRecordsResult = dnsRecordsService.listAllDnsRecords(params);

        // all methods should return a Promise
        expectToBePromise(listAllDnsRecordsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/dns_records', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['type']).toEqual(type);
        expect(options.qs['name']).toEqual(name);
        expect(options.qs['content']).toEqual(content);
        expect(options.qs['page']).toEqual(page);
        expect(options.qs['per_page']).toEqual(perPage);
        expect(options.qs['order']).toEqual(order);
        expect(options.qs['direction']).toEqual(direction);
        expect(options.qs['match']).toEqual(match);
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

        dnsRecordsService.listAllDnsRecords(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dnsRecordsService.listAllDnsRecords({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createDnsRecord', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createDnsRecord
        const type = 'A';
        const name = 'host-1.test-example.com';
        const ttl = 120;
        const content = '1.2.3.4';
        const priority = 5;
        const data = { foo: 'bar' };
        const params = {
          type: type,
          name: name,
          ttl: ttl,
          content: content,
          priority: priority,
          data: data,
        };

        const createDnsRecordResult = dnsRecordsService.createDnsRecord(params);

        // all methods should return a Promise
        expectToBePromise(createDnsRecordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/dns_records', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['type']).toEqual(type);
        expect(options.body['name']).toEqual(name);
        expect(options.body['ttl']).toEqual(ttl);
        expect(options.body['content']).toEqual(content);
        expect(options.body['priority']).toEqual(priority);
        expect(options.body['data']).toEqual(data);
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

        dnsRecordsService.createDnsRecord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dnsRecordsService.createDnsRecord({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteDnsRecord', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteDnsRecord
        const dnsrecordIdentifier = 'testString';
        const params = {
          dnsrecordIdentifier: dnsrecordIdentifier,
        };

        const deleteDnsRecordResult = dnsRecordsService.deleteDnsRecord(params);

        // all methods should return a Promise
        expectToBePromise(deleteDnsRecordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/dns_records/{dnsrecord_identifier}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['dnsrecord_identifier']).toEqual(dnsrecordIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dnsrecordIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dnsrecordIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsRecordsService.deleteDnsRecord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsRecordsService.deleteDnsRecord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const deleteDnsRecordPromise = dnsRecordsService.deleteDnsRecord();
        expectToBePromise(deleteDnsRecordPromise);

        deleteDnsRecordPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDnsRecord', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDnsRecord
        const dnsrecordIdentifier = 'testString';
        const params = {
          dnsrecordIdentifier: dnsrecordIdentifier,
        };

        const getDnsRecordResult = dnsRecordsService.getDnsRecord(params);

        // all methods should return a Promise
        expectToBePromise(getDnsRecordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/dns_records/{dnsrecord_identifier}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['dnsrecord_identifier']).toEqual(dnsrecordIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dnsrecordIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dnsrecordIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsRecordsService.getDnsRecord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsRecordsService.getDnsRecord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const getDnsRecordPromise = dnsRecordsService.getDnsRecord();
        expectToBePromise(getDnsRecordPromise);

        getDnsRecordPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateDnsRecord', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateDnsRecord
        const dnsrecordIdentifier = 'testString';
        const type = 'A';
        const name = 'host-1.test-example.com';
        const ttl = 120;
        const content = '1.2.3.4';
        const priority = 5;
        const proxied = false;
        const data = { foo: 'bar' };
        const params = {
          dnsrecordIdentifier: dnsrecordIdentifier,
          type: type,
          name: name,
          ttl: ttl,
          content: content,
          priority: priority,
          proxied: proxied,
          data: data,
        };

        const updateDnsRecordResult = dnsRecordsService.updateDnsRecord(params);

        // all methods should return a Promise
        expectToBePromise(updateDnsRecordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/dns_records/{dnsrecord_identifier}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['type']).toEqual(type);
        expect(options.body['name']).toEqual(name);
        expect(options.body['ttl']).toEqual(ttl);
        expect(options.body['content']).toEqual(content);
        expect(options.body['priority']).toEqual(priority);
        expect(options.body['proxied']).toEqual(proxied);
        expect(options.body['data']).toEqual(data);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['dnsrecord_identifier']).toEqual(dnsrecordIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dnsrecordIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dnsrecordIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsRecordsService.updateDnsRecord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsRecordsService.updateDnsRecord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', done => {
        const updateDnsRecordPromise = dnsRecordsService.updateDnsRecord();
        expectToBePromise(updateDnsRecordPromise);

        updateDnsRecordPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
