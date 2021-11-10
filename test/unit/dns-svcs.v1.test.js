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

const DnsSvcsV1 = require('../../dist/dns-svcs/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
} = unitTestUtils;

const dnsSvcsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.dns-svcs.cloud.ibm.com/v1',
};

const dnsSvcsService = new DnsSvcsV1(dnsSvcsServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(dnsSvcsService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe.skip('DnsSvcsV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = DnsSvcsV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(DnsSvcsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(DnsSvcsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(DnsSvcsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = DnsSvcsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(DnsSvcsV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new DnsSvcsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new DnsSvcsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(DnsSvcsV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('listDnszones', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listDnszones
        const instanceId = 'testString';
        const xCorrelationId = 'testString';
        const offset = 38;
        const limit = 200;
        const params = {
          instanceId: instanceId,
          xCorrelationId: xCorrelationId,
          offset: offset,
          limit: limit,
        };

        const listDnszonesResult = dnsSvcsService.listDnszones(params);

        // all methods should return a Promise
        expectToBePromise(listDnszonesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/dnszones', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listDnszones(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.listDnszones({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listDnszonesPromise = dnsSvcsService.listDnszones();
        expectToBePromise(listDnszonesPromise);

        listDnszonesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createDnszone', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createDnszone
        const instanceId = 'testString';
        const name = 'example.com';
        const description = 'The DNS zone is used for VPCs in us-east region';
        const label = 'us-east';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          name: name,
          description: description,
          label: label,
          xCorrelationId: xCorrelationId,
        };

        const createDnszoneResult = dnsSvcsService.createDnszone(params);

        // all methods should return a Promise
        expectToBePromise(createDnszoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/dnszones', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createDnszone(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.createDnszone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createDnszonePromise = dnsSvcsService.createDnszone();
        expectToBePromise(createDnszonePromise);

        createDnszonePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteDnszone', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteDnszone
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          xCorrelationId: xCorrelationId,
        };

        const deleteDnszoneResult = dnsSvcsService.deleteDnszone(params);

        // all methods should return a Promise
        expectToBePromise(deleteDnszoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteDnszone(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.deleteDnszone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteDnszonePromise = dnsSvcsService.deleteDnszone();
        expectToBePromise(deleteDnszonePromise);

        deleteDnszonePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDnszone', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDnszone
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          xCorrelationId: xCorrelationId,
        };

        const getDnszoneResult = dnsSvcsService.getDnszone(params);

        // all methods should return a Promise
        expectToBePromise(getDnszoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getDnszone(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.getDnszone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getDnszonePromise = dnsSvcsService.getDnszone();
        expectToBePromise(getDnszonePromise);

        getDnszonePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateDnszone', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateDnszone
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const description = 'The DNS zone is used for VPCs in us-east region';
        const label = 'us-east';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          description: description,
          label: label,
          xCorrelationId: xCorrelationId,
        };

        const updateDnszoneResult = dnsSvcsService.updateDnszone(params);

        // all methods should return a Promise
        expectToBePromise(updateDnszoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateDnszone(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.updateDnszone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateDnszonePromise = dnsSvcsService.updateDnszone();
        expectToBePromise(updateDnszonePromise);

        updateDnszonePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listResourceRecords', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listResourceRecords
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const offset = 38;
        const limit = 200;
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          xCorrelationId: xCorrelationId,
          offset: offset,
          limit: limit,
        };

        const listResourceRecordsResult = dnsSvcsService.listResourceRecords(params);

        // all methods should return a Promise
        expectToBePromise(listResourceRecordsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/resource_records',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listResourceRecords(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.listResourceRecords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listResourceRecordsPromise = dnsSvcsService.listResourceRecords();
        expectToBePromise(listResourceRecordsPromise);

        listResourceRecordsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createResourceRecord', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceRecordInputRdataRdataARecord
      const resourceRecordInputRdataModel = {
        ip: '10.110.201.214',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createResourceRecord
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const type = 'SRV';
        const name = 'test.example.com';
        const rdata = resourceRecordInputRdataModel;
        const ttl = 120;
        const service = '_sip';
        const protocol = 'udp';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          type: type,
          name: name,
          rdata: rdata,
          ttl: ttl,
          service: service,
          protocol: protocol,
          xCorrelationId: xCorrelationId,
        };

        const createResourceRecordResult = dnsSvcsService.createResourceRecord(params);

        // all methods should return a Promise
        expectToBePromise(createResourceRecordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/resource_records',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.rdata).toEqual(rdata);
        expect(mockRequestOptions.body.ttl).toEqual(ttl);
        expect(mockRequestOptions.body.service).toEqual(service);
        expect(mockRequestOptions.body.protocol).toEqual(protocol);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createResourceRecord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.createResourceRecord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createResourceRecordPromise = dnsSvcsService.createResourceRecord();
        expectToBePromise(createResourceRecordPromise);

        createResourceRecordPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteResourceRecord', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteResourceRecord
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const recordId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          recordId: recordId,
          xCorrelationId: xCorrelationId,
        };

        const deleteResourceRecordResult = dnsSvcsService.deleteResourceRecord(params);

        // all methods should return a Promise
        expectToBePromise(deleteResourceRecordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/resource_records/{record_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
        expect(mockRequestOptions.path.record_id).toEqual(recordId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const recordId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          recordId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteResourceRecord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.deleteResourceRecord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteResourceRecordPromise = dnsSvcsService.deleteResourceRecord();
        expectToBePromise(deleteResourceRecordPromise);

        deleteResourceRecordPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getResourceRecord', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getResourceRecord
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const recordId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          recordId: recordId,
          xCorrelationId: xCorrelationId,
        };

        const getResourceRecordResult = dnsSvcsService.getResourceRecord(params);

        // all methods should return a Promise
        expectToBePromise(getResourceRecordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/resource_records/{record_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
        expect(mockRequestOptions.path.record_id).toEqual(recordId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const recordId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          recordId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getResourceRecord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.getResourceRecord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getResourceRecordPromise = dnsSvcsService.getResourceRecord();
        expectToBePromise(getResourceRecordPromise);

        getResourceRecordPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateResourceRecord', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceRecordUpdateInputRdataRdataARecord
      const resourceRecordUpdateInputRdataModel = {
        ip: '10.110.201.214',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateResourceRecord
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const recordId = 'testString';
        const name = 'test.example.com';
        const rdata = resourceRecordUpdateInputRdataModel;
        const ttl = 120;
        const service = '_sip';
        const protocol = 'udp';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          recordId: recordId,
          name: name,
          rdata: rdata,
          ttl: ttl,
          service: service,
          protocol: protocol,
          xCorrelationId: xCorrelationId,
        };

        const updateResourceRecordResult = dnsSvcsService.updateResourceRecord(params);

        // all methods should return a Promise
        expectToBePromise(updateResourceRecordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/resource_records/{record_id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.rdata).toEqual(rdata);
        expect(mockRequestOptions.body.ttl).toEqual(ttl);
        expect(mockRequestOptions.body.service).toEqual(service);
        expect(mockRequestOptions.body.protocol).toEqual(protocol);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
        expect(mockRequestOptions.path.record_id).toEqual(recordId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const recordId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          recordId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateResourceRecord(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.updateResourceRecord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateResourceRecordPromise = dnsSvcsService.updateResourceRecord();
        expectToBePromise(updateResourceRecordPromise);

        updateResourceRecordPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('exportResourceRecords', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation exportResourceRecords
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          xCorrelationId: xCorrelationId,
        };

        const exportResourceRecordsResult = dnsSvcsService.exportResourceRecords(params);

        // all methods should return a Promise
        expectToBePromise(exportResourceRecordsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/export_resource_records',
          'GET'
        );
        const expectedAccept = 'text/plain; charset=utf-8';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
        expect(mockRequestOptions.responseType).toBe('stream');
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.exportResourceRecords(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.exportResourceRecords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const exportResourceRecordsPromise = dnsSvcsService.exportResourceRecords();
        expectToBePromise(exportResourceRecordsPromise);

        exportResourceRecordsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('importResourceRecords', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation importResourceRecords
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const file = Buffer.from('This is a mock file.');
        const fileContentType = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          file: file,
          fileContentType: fileContentType,
          xCorrelationId: xCorrelationId,
        };

        const importResourceRecordsResult = dnsSvcsService.importResourceRecords(params);

        // all methods should return a Promise
        expectToBePromise(importResourceRecordsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/import_resource_records',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.formData.file.data).toEqual(file);
        expect(mockRequestOptions.formData.file.contentType).toEqual(fileContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.importResourceRecords(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.importResourceRecords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const importResourceRecordsPromise = dnsSvcsService.importResourceRecords();
        expectToBePromise(importResourceRecordsPromise);

        importResourceRecordsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listPermittedNetworks', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listPermittedNetworks
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const offset = 38;
        const limit = 200;
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          xCorrelationId: xCorrelationId,
          offset: offset,
          limit: limit,
        };

        const listPermittedNetworksResult = dnsSvcsService.listPermittedNetworks(params);

        // all methods should return a Promise
        expectToBePromise(listPermittedNetworksResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/permitted_networks',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listPermittedNetworks(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.listPermittedNetworks({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listPermittedNetworksPromise = dnsSvcsService.listPermittedNetworks();
        expectToBePromise(listPermittedNetworksPromise);

        listPermittedNetworksPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createPermittedNetwork', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PermittedNetworkVpc
      const permittedNetworkVpcModel = {
        vpc_crn:
          'crn:v1:bluemix:public:is:eu-de:a/bcf1865e99742d38d2d5fc3fb80a5496::vpc:6e6cc326-04d1-4c99-a289-efb3ae4193d6',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createPermittedNetwork
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const type = 'vpc';
        const permittedNetwork = permittedNetworkVpcModel;
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          type: type,
          permittedNetwork: permittedNetwork,
          xCorrelationId: xCorrelationId,
        };

        const createPermittedNetworkResult = dnsSvcsService.createPermittedNetwork(params);

        // all methods should return a Promise
        expectToBePromise(createPermittedNetworkResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/permitted_networks',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.permitted_network).toEqual(permittedNetwork);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createPermittedNetwork(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.createPermittedNetwork({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createPermittedNetworkPromise = dnsSvcsService.createPermittedNetwork();
        expectToBePromise(createPermittedNetworkPromise);

        createPermittedNetworkPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deletePermittedNetwork', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deletePermittedNetwork
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const permittedNetworkId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          permittedNetworkId: permittedNetworkId,
          xCorrelationId: xCorrelationId,
        };

        const deletePermittedNetworkResult = dnsSvcsService.deletePermittedNetwork(params);

        // all methods should return a Promise
        expectToBePromise(deletePermittedNetworkResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/permitted_networks/{permitted_network_id}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
        expect(mockRequestOptions.path.permitted_network_id).toEqual(permittedNetworkId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const permittedNetworkId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          permittedNetworkId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deletePermittedNetwork(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.deletePermittedNetwork({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deletePermittedNetworkPromise = dnsSvcsService.deletePermittedNetwork();
        expectToBePromise(deletePermittedNetworkPromise);

        deletePermittedNetworkPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getPermittedNetwork', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getPermittedNetwork
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const permittedNetworkId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          permittedNetworkId: permittedNetworkId,
          xCorrelationId: xCorrelationId,
        };

        const getPermittedNetworkResult = dnsSvcsService.getPermittedNetwork(params);

        // all methods should return a Promise
        expectToBePromise(getPermittedNetworkResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/permitted_networks/{permitted_network_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
        expect(mockRequestOptions.path.permitted_network_id).toEqual(permittedNetworkId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const permittedNetworkId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          permittedNetworkId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getPermittedNetwork(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.getPermittedNetwork({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getPermittedNetworkPromise = dnsSvcsService.getPermittedNetwork();
        expectToBePromise(getPermittedNetworkPromise);

        getPermittedNetworkPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listLoadBalancers', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listLoadBalancers
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          xCorrelationId: xCorrelationId,
        };

        const listLoadBalancersResult = dnsSvcsService.listLoadBalancers(params);

        // all methods should return a Promise
        expectToBePromise(listLoadBalancersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/load_balancers',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listLoadBalancers(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.listLoadBalancers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listLoadBalancersPromise = dnsSvcsService.listLoadBalancers();
        expectToBePromise(listLoadBalancersPromise);

        listLoadBalancersPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createLoadBalancer', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LoadBalancerAzPoolsItem
      const loadBalancerAzPoolsItemModel = {
        availability_zone: 'us-south-1',
        pools: ['0fc0bb7c-2fab-476e-8b9b-40fa14bf8e3d'],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createLoadBalancer
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const name = 'glb.example.com';
        const fallbackPool = '24ccf79a-4ae0-4769-b4c8-17f8f230072e';
        const defaultPools = [
          '24ccf79a-4ae0-4769-b4c8-17f8f230072e',
          '13fa7d9e-aeff-4e14-8300-58021db9ee74',
        ];
        const description = 'Load balancer for glb.example.com.';
        const enabled = true;
        const ttl = 120;
        const azPools = [loadBalancerAzPoolsItemModel];
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          name: name,
          fallbackPool: fallbackPool,
          defaultPools: defaultPools,
          description: description,
          enabled: enabled,
          ttl: ttl,
          azPools: azPools,
          xCorrelationId: xCorrelationId,
        };

        const createLoadBalancerResult = dnsSvcsService.createLoadBalancer(params);

        // all methods should return a Promise
        expectToBePromise(createLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/load_balancers',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.fallback_pool).toEqual(fallbackPool);
        expect(mockRequestOptions.body.default_pools).toEqual(defaultPools);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.ttl).toEqual(ttl);
        expect(mockRequestOptions.body.az_pools).toEqual(azPools);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createLoadBalancer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.createLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createLoadBalancerPromise = dnsSvcsService.createLoadBalancer();
        expectToBePromise(createLoadBalancerPromise);

        createLoadBalancerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteLoadBalancer', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteLoadBalancer
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const lbId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          lbId: lbId,
          xCorrelationId: xCorrelationId,
        };

        const deleteLoadBalancerResult = dnsSvcsService.deleteLoadBalancer(params);

        // all methods should return a Promise
        expectToBePromise(deleteLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/load_balancers/{lb_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
        expect(mockRequestOptions.path.lb_id).toEqual(lbId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const lbId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          lbId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteLoadBalancer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.deleteLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteLoadBalancerPromise = dnsSvcsService.deleteLoadBalancer();
        expectToBePromise(deleteLoadBalancerPromise);

        deleteLoadBalancerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getLoadBalancer', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getLoadBalancer
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const lbId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          lbId: lbId,
          xCorrelationId: xCorrelationId,
        };

        const getLoadBalancerResult = dnsSvcsService.getLoadBalancer(params);

        // all methods should return a Promise
        expectToBePromise(getLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/load_balancers/{lb_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
        expect(mockRequestOptions.path.lb_id).toEqual(lbId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const lbId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          lbId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getLoadBalancer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.getLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getLoadBalancerPromise = dnsSvcsService.getLoadBalancer();
        expectToBePromise(getLoadBalancerPromise);

        getLoadBalancerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateLoadBalancer', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LoadBalancerAzPoolsItem
      const loadBalancerAzPoolsItemModel = {
        availability_zone: 'us-south-1',
        pools: ['0fc0bb7c-2fab-476e-8b9b-40fa14bf8e3d'],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateLoadBalancer
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const lbId = 'testString';
        const name = 'glb.example.com';
        const description = 'Load balancer for glb.example.com.';
        const enabled = true;
        const ttl = 120;
        const fallbackPool = '24ccf79a-4ae0-4769-b4c8-17f8f230072e';
        const defaultPools = [
          '24ccf79a-4ae0-4769-b4c8-17f8f230072e',
          '13fa7d9e-aeff-4e14-8300-58021db9ee74',
        ];
        const azPools = [loadBalancerAzPoolsItemModel];
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          lbId: lbId,
          name: name,
          description: description,
          enabled: enabled,
          ttl: ttl,
          fallbackPool: fallbackPool,
          defaultPools: defaultPools,
          azPools: azPools,
          xCorrelationId: xCorrelationId,
        };

        const updateLoadBalancerResult = dnsSvcsService.updateLoadBalancer(params);

        // all methods should return a Promise
        expectToBePromise(updateLoadBalancerResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/load_balancers/{lb_id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.ttl).toEqual(ttl);
        expect(mockRequestOptions.body.fallback_pool).toEqual(fallbackPool);
        expect(mockRequestOptions.body.default_pools).toEqual(defaultPools);
        expect(mockRequestOptions.body.az_pools).toEqual(azPools);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
        expect(mockRequestOptions.path.lb_id).toEqual(lbId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const lbId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          dnszoneId,
          lbId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateLoadBalancer(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.updateLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateLoadBalancerPromise = dnsSvcsService.updateLoadBalancer();
        expectToBePromise(updateLoadBalancerPromise);

        updateLoadBalancerPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listPools', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listPools
        const instanceId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          xCorrelationId: xCorrelationId,
        };

        const listPoolsResult = dnsSvcsService.listPools(params);

        // all methods should return a Promise
        expectToBePromise(listPoolsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/pools', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listPools(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.listPools({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listPoolsPromise = dnsSvcsService.listPools();
        expectToBePromise(listPoolsPromise);

        listPoolsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createPool', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // OriginInput
      const originInputModel = {
        name: 'app-server-1',
        description: 'description of the origin server',
        address: '10.10.16.8',
        enabled: true,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createPool
        const instanceId = 'testString';
        const name = 'dal10-az-pool';
        const origins = [originInputModel];
        const description = 'Load balancer pool for dal10 availability zone.';
        const enabled = true;
        const healthyOriginsThreshold = 1;
        const monitor = '7dd6841c-264e-11ea-88df-062967242a6a';
        const notificationChannel = 'https://mywebsite.com/dns/webhook';
        const healthcheckRegion = 'us-south';
        const healthcheckSubnets = [
          'crn:v1:staging:public:is:us-south-1:a/01652b251c3ae2787110a995d8db0135::subnet:0716-b49ef064-0f89-4fb1-8212-135b12568f04',
        ];
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          name: name,
          origins: origins,
          description: description,
          enabled: enabled,
          healthyOriginsThreshold: healthyOriginsThreshold,
          monitor: monitor,
          notificationChannel: notificationChannel,
          healthcheckRegion: healthcheckRegion,
          healthcheckSubnets: healthcheckSubnets,
          xCorrelationId: xCorrelationId,
        };

        const createPoolResult = dnsSvcsService.createPool(params);

        // all methods should return a Promise
        expectToBePromise(createPoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/pools', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.origins).toEqual(origins);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.healthy_origins_threshold).toEqual(healthyOriginsThreshold);
        expect(mockRequestOptions.body.monitor).toEqual(monitor);
        expect(mockRequestOptions.body.notification_channel).toEqual(notificationChannel);
        expect(mockRequestOptions.body.healthcheck_region).toEqual(healthcheckRegion);
        expect(mockRequestOptions.body.healthcheck_subnets).toEqual(healthcheckSubnets);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createPool(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.createPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createPoolPromise = dnsSvcsService.createPool();
        expectToBePromise(createPoolPromise);

        createPoolPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deletePool', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deletePool
        const instanceId = 'testString';
        const poolId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          poolId: poolId,
          xCorrelationId: xCorrelationId,
        };

        const deletePoolResult = dnsSvcsService.deletePool(params);

        // all methods should return a Promise
        expectToBePromise(deletePoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/pools/{pool_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.pool_id).toEqual(poolId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const poolId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          poolId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deletePool(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.deletePool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deletePoolPromise = dnsSvcsService.deletePool();
        expectToBePromise(deletePoolPromise);

        deletePoolPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getPool', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getPool
        const instanceId = 'testString';
        const poolId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          poolId: poolId,
          xCorrelationId: xCorrelationId,
        };

        const getPoolResult = dnsSvcsService.getPool(params);

        // all methods should return a Promise
        expectToBePromise(getPoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/pools/{pool_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.pool_id).toEqual(poolId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const poolId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          poolId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getPool(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.getPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getPoolPromise = dnsSvcsService.getPool();
        expectToBePromise(getPoolPromise);

        getPoolPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updatePool', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // OriginInput
      const originInputModel = {
        name: 'app-server-1',
        description: 'description of the origin server',
        address: '10.10.16.8',
        enabled: true,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updatePool
        const instanceId = 'testString';
        const poolId = 'testString';
        const name = 'dal10-az-pool';
        const description = 'Load balancer pool for dal10 availability zone.';
        const enabled = true;
        const healthyOriginsThreshold = 1;
        const origins = [originInputModel];
        const monitor = '7dd6841c-264e-11ea-88df-062967242a6a';
        const notificationChannel = 'https://mywebsite.com/dns/webhook';
        const healthcheckRegion = 'us-south';
        const healthcheckSubnets = [
          'crn:v1:staging:public:is:us-south-1:a/01652b251c3ae2787110a995d8db0135::subnet:0716-b49ef064-0f89-4fb1-8212-135b12568f04',
        ];
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          poolId: poolId,
          name: name,
          description: description,
          enabled: enabled,
          healthyOriginsThreshold: healthyOriginsThreshold,
          origins: origins,
          monitor: monitor,
          notificationChannel: notificationChannel,
          healthcheckRegion: healthcheckRegion,
          healthcheckSubnets: healthcheckSubnets,
          xCorrelationId: xCorrelationId,
        };

        const updatePoolResult = dnsSvcsService.updatePool(params);

        // all methods should return a Promise
        expectToBePromise(updatePoolResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/pools/{pool_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.healthy_origins_threshold).toEqual(healthyOriginsThreshold);
        expect(mockRequestOptions.body.origins).toEqual(origins);
        expect(mockRequestOptions.body.monitor).toEqual(monitor);
        expect(mockRequestOptions.body.notification_channel).toEqual(notificationChannel);
        expect(mockRequestOptions.body.healthcheck_region).toEqual(healthcheckRegion);
        expect(mockRequestOptions.body.healthcheck_subnets).toEqual(healthcheckSubnets);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.pool_id).toEqual(poolId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const poolId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          poolId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updatePool(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.updatePool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updatePoolPromise = dnsSvcsService.updatePool();
        expectToBePromise(updatePoolPromise);

        updatePoolPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listMonitors', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listMonitors
        const instanceId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          xCorrelationId: xCorrelationId,
        };

        const listMonitorsResult = dnsSvcsService.listMonitors(params);

        // all methods should return a Promise
        expectToBePromise(listMonitorsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/monitors', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listMonitors(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.listMonitors({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listMonitorsPromise = dnsSvcsService.listMonitors();
        expectToBePromise(listMonitorsPromise);

        listMonitorsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createMonitor', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // HealthcheckHeader
      const healthcheckHeaderModel = {
        name: 'Host',
        value: ['origin.example.com'],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createMonitor
        const instanceId = 'testString';
        const name = 'healthcheck-monitor';
        const type = 'HTTPS';
        const description = 'Load balancer monitor for glb.example.com.';
        const port = 8080;
        const interval = 60;
        const retries = 2;
        const timeout = 5;
        const method = 'GET';
        const path = '/health';
        const _headers = [healthcheckHeaderModel];
        const allowInsecure = false;
        const expectedCodes = '200';
        const expectedBody = 'alive';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          name: name,
          type: type,
          description: description,
          port: port,
          interval: interval,
          retries: retries,
          timeout: timeout,
          method: method,
          path: path,
          _headers: _headers,
          allowInsecure: allowInsecure,
          expectedCodes: expectedCodes,
          expectedBody: expectedBody,
          xCorrelationId: xCorrelationId,
        };

        const createMonitorResult = dnsSvcsService.createMonitor(params);

        // all methods should return a Promise
        expectToBePromise(createMonitorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/monitors', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.port).toEqual(port);
        expect(mockRequestOptions.body.interval).toEqual(interval);
        expect(mockRequestOptions.body.retries).toEqual(retries);
        expect(mockRequestOptions.body.timeout).toEqual(timeout);
        expect(mockRequestOptions.body.method).toEqual(method);
        expect(mockRequestOptions.body.path).toEqual(path);
        expect(mockRequestOptions.body.headers).toEqual(_headers);
        expect(mockRequestOptions.body.allow_insecure).toEqual(allowInsecure);
        expect(mockRequestOptions.body.expected_codes).toEqual(expectedCodes);
        expect(mockRequestOptions.body.expected_body).toEqual(expectedBody);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createMonitor(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.createMonitor({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createMonitorPromise = dnsSvcsService.createMonitor();
        expectToBePromise(createMonitorPromise);

        createMonitorPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteMonitor', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteMonitor
        const instanceId = 'testString';
        const monitorId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          monitorId: monitorId,
          xCorrelationId: xCorrelationId,
        };

        const deleteMonitorResult = dnsSvcsService.deleteMonitor(params);

        // all methods should return a Promise
        expectToBePromise(deleteMonitorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/monitors/{monitor_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.monitor_id).toEqual(monitorId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const monitorId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          monitorId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteMonitor(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.deleteMonitor({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteMonitorPromise = dnsSvcsService.deleteMonitor();
        expectToBePromise(deleteMonitorPromise);

        deleteMonitorPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getMonitor', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getMonitor
        const instanceId = 'testString';
        const monitorId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          monitorId: monitorId,
          xCorrelationId: xCorrelationId,
        };

        const getMonitorResult = dnsSvcsService.getMonitor(params);

        // all methods should return a Promise
        expectToBePromise(getMonitorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/monitors/{monitor_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.monitor_id).toEqual(monitorId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const monitorId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          monitorId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getMonitor(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.getMonitor({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getMonitorPromise = dnsSvcsService.getMonitor();
        expectToBePromise(getMonitorPromise);

        getMonitorPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateMonitor', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // HealthcheckHeader
      const healthcheckHeaderModel = {
        name: 'Host',
        value: ['origin.example.com'],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateMonitor
        const instanceId = 'testString';
        const monitorId = 'testString';
        const name = 'healthcheck-monitor';
        const description = 'Load balancer monitor for glb.example.com.';
        const type = 'HTTPS';
        const port = 8080;
        const interval = 60;
        const retries = 2;
        const timeout = 5;
        const method = 'GET';
        const path = '/health';
        const _headers = [healthcheckHeaderModel];
        const allowInsecure = false;
        const expectedCodes = '200';
        const expectedBody = 'alive';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          monitorId: monitorId,
          name: name,
          description: description,
          type: type,
          port: port,
          interval: interval,
          retries: retries,
          timeout: timeout,
          method: method,
          path: path,
          _headers: _headers,
          allowInsecure: allowInsecure,
          expectedCodes: expectedCodes,
          expectedBody: expectedBody,
          xCorrelationId: xCorrelationId,
        };

        const updateMonitorResult = dnsSvcsService.updateMonitor(params);

        // all methods should return a Promise
        expectToBePromise(updateMonitorResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/monitors/{monitor_id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.port).toEqual(port);
        expect(mockRequestOptions.body.interval).toEqual(interval);
        expect(mockRequestOptions.body.retries).toEqual(retries);
        expect(mockRequestOptions.body.timeout).toEqual(timeout);
        expect(mockRequestOptions.body.method).toEqual(method);
        expect(mockRequestOptions.body.path).toEqual(path);
        expect(mockRequestOptions.body.headers).toEqual(_headers);
        expect(mockRequestOptions.body.allow_insecure).toEqual(allowInsecure);
        expect(mockRequestOptions.body.expected_codes).toEqual(expectedCodes);
        expect(mockRequestOptions.body.expected_body).toEqual(expectedBody);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.monitor_id).toEqual(monitorId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const monitorId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          monitorId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateMonitor(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.updateMonitor({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateMonitorPromise = dnsSvcsService.updateMonitor();
        expectToBePromise(updateMonitorPromise);

        updateMonitorPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listCustomResolvers', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listCustomResolvers
        const instanceId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          xCorrelationId: xCorrelationId,
        };

        const listCustomResolversResult = dnsSvcsService.listCustomResolvers(params);

        // all methods should return a Promise
        expectToBePromise(listCustomResolversResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/custom_resolvers', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listCustomResolvers(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.listCustomResolvers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listCustomResolversPromise = dnsSvcsService.listCustomResolvers();
        expectToBePromise(listCustomResolversPromise);

        listCustomResolversPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createCustomResolver', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LocationInput
      const locationInputModel = {
        subnet_crn:
          'crn:v1:bluemix:public:is:us-south-1:a/01652b251c3ae2787110a995d8db0135::subnet:0716-b49ef064-0f89-4fb1-8212-135b12568f04',
        enabled: false,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createCustomResolver
        const instanceId = 'testString';
        const name = 'my-resolver';
        const description = 'custom resolver';
        const locations = [locationInputModel];
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          name: name,
          description: description,
          locations: locations,
          xCorrelationId: xCorrelationId,
        };

        const createCustomResolverResult = dnsSvcsService.createCustomResolver(params);

        // all methods should return a Promise
        expectToBePromise(createCustomResolverResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/custom_resolvers', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.locations).toEqual(locations);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createCustomResolver(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.createCustomResolver({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createCustomResolverPromise = dnsSvcsService.createCustomResolver();
        expectToBePromise(createCustomResolverPromise);

        createCustomResolverPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteCustomResolver', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteCustomResolver
        const instanceId = 'testString';
        const resolverId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          resolverId: resolverId,
          xCorrelationId: xCorrelationId,
        };

        const deleteCustomResolverResult = dnsSvcsService.deleteCustomResolver(params);

        // all methods should return a Promise
        expectToBePromise(deleteCustomResolverResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteCustomResolver(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.deleteCustomResolver({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteCustomResolverPromise = dnsSvcsService.deleteCustomResolver();
        expectToBePromise(deleteCustomResolverPromise);

        deleteCustomResolverPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getCustomResolver', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getCustomResolver
        const instanceId = 'testString';
        const resolverId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          resolverId: resolverId,
          xCorrelationId: xCorrelationId,
        };

        const getCustomResolverResult = dnsSvcsService.getCustomResolver(params);

        // all methods should return a Promise
        expectToBePromise(getCustomResolverResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getCustomResolver(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.getCustomResolver({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getCustomResolverPromise = dnsSvcsService.getCustomResolver();
        expectToBePromise(getCustomResolverPromise);

        getCustomResolverPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateCustomResolver', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateCustomResolver
        const instanceId = 'testString';
        const resolverId = 'testString';
        const name = 'my-resolver';
        const description = 'custom resolver';
        const enabled = false;
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          resolverId: resolverId,
          name: name,
          description: description,
          enabled: enabled,
          xCorrelationId: xCorrelationId,
        };

        const updateCustomResolverResult = dnsSvcsService.updateCustomResolver(params);

        // all methods should return a Promise
        expectToBePromise(updateCustomResolverResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateCustomResolver(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.updateCustomResolver({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateCustomResolverPromise = dnsSvcsService.updateCustomResolver();
        expectToBePromise(updateCustomResolverPromise);

        updateCustomResolverPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('addCustomResolverLocation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation addCustomResolverLocation
        const instanceId = 'testString';
        const resolverId = 'testString';
        const subnetCrn =
          'crn:v1:bluemix:public:is:us-south-1:a/01652b251c3ae2787110a995d8db0135::subnet:0716-b49ef064-0f89-4fb1-8212-135b12568f04';
        const enabled = false;
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          resolverId: resolverId,
          subnetCrn: subnetCrn,
          enabled: enabled,
          xCorrelationId: xCorrelationId,
        };

        const addCustomResolverLocationResult = dnsSvcsService.addCustomResolverLocation(params);

        // all methods should return a Promise
        expectToBePromise(addCustomResolverLocationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}/locations',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.subnet_crn).toEqual(subnetCrn);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.addCustomResolverLocation(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.addCustomResolverLocation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const addCustomResolverLocationPromise = dnsSvcsService.addCustomResolverLocation();
        expectToBePromise(addCustomResolverLocationPromise);

        addCustomResolverLocationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateCustomResolverLocation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateCustomResolverLocation
        const instanceId = 'testString';
        const resolverId = 'testString';
        const locationId = 'testString';
        const enabled = false;
        const subnetCrn =
          'crn:v1:bluemix:public:is:us-south-1:a/01652b251c3ae2787110a995d8db0135::subnet:0716-b49ef064-0f89-4fb1-8212-135b12568f04';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          resolverId: resolverId,
          locationId: locationId,
          enabled: enabled,
          subnetCrn: subnetCrn,
          xCorrelationId: xCorrelationId,
        };

        const updateCustomResolverLocationResult = dnsSvcsService.updateCustomResolverLocation(
          params
        );

        // all methods should return a Promise
        expectToBePromise(updateCustomResolverLocationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}/locations/{location_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.subnet_crn).toEqual(subnetCrn);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
        expect(mockRequestOptions.path.location_id).toEqual(locationId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const locationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          resolverId,
          locationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateCustomResolverLocation(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.updateCustomResolverLocation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateCustomResolverLocationPromise = dnsSvcsService.updateCustomResolverLocation();
        expectToBePromise(updateCustomResolverLocationPromise);

        updateCustomResolverLocationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteCustomResolverLocation', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteCustomResolverLocation
        const instanceId = 'testString';
        const resolverId = 'testString';
        const locationId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          resolverId: resolverId,
          locationId: locationId,
          xCorrelationId: xCorrelationId,
        };

        const deleteCustomResolverLocationResult = dnsSvcsService.deleteCustomResolverLocation(
          params
        );

        // all methods should return a Promise
        expectToBePromise(deleteCustomResolverLocationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}/locations/{location_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
        expect(mockRequestOptions.path.location_id).toEqual(locationId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const locationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          resolverId,
          locationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteCustomResolverLocation(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.deleteCustomResolverLocation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteCustomResolverLocationPromise = dnsSvcsService.deleteCustomResolverLocation();
        expectToBePromise(deleteCustomResolverLocationPromise);

        deleteCustomResolverLocationPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listForwardingRules', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listForwardingRules
        const instanceId = 'testString';
        const resolverId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          resolverId: resolverId,
          xCorrelationId: xCorrelationId,
        };

        const listForwardingRulesResult = dnsSvcsService.listForwardingRules(params);

        // all methods should return a Promise
        expectToBePromise(listForwardingRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}/forwarding_rules',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listForwardingRules(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.listForwardingRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listForwardingRulesPromise = dnsSvcsService.listForwardingRules();
        expectToBePromise(listForwardingRulesPromise);

        listForwardingRulesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createForwardingRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createForwardingRule
        const instanceId = 'testString';
        const resolverId = 'testString';
        const type = 'zone';
        const match = 'example.com';
        const forwardTo = ['161.26.0.7'];
        const description = 'forwarding rule';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          resolverId: resolverId,
          type: type,
          match: match,
          forwardTo: forwardTo,
          description: description,
          xCorrelationId: xCorrelationId,
        };

        const createForwardingRuleResult = dnsSvcsService.createForwardingRule(params);

        // all methods should return a Promise
        expectToBePromise(createForwardingRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}/forwarding_rules',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.match).toEqual(match);
        expect(mockRequestOptions.body.forward_to).toEqual(forwardTo);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createForwardingRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.createForwardingRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createForwardingRulePromise = dnsSvcsService.createForwardingRule();
        expectToBePromise(createForwardingRulePromise);

        createForwardingRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteForwardingRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteForwardingRule
        const instanceId = 'testString';
        const resolverId = 'testString';
        const ruleId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          resolverId: resolverId,
          ruleId: ruleId,
          xCorrelationId: xCorrelationId,
        };

        const deleteForwardingRuleResult = dnsSvcsService.deleteForwardingRule(params);

        // all methods should return a Promise
        expectToBePromise(deleteForwardingRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}/forwarding_rules/{rule_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          resolverId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteForwardingRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.deleteForwardingRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteForwardingRulePromise = dnsSvcsService.deleteForwardingRule();
        expectToBePromise(deleteForwardingRulePromise);

        deleteForwardingRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getForwardingRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getForwardingRule
        const instanceId = 'testString';
        const resolverId = 'testString';
        const ruleId = 'testString';
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          resolverId: resolverId,
          ruleId: ruleId,
          xCorrelationId: xCorrelationId,
        };

        const getForwardingRuleResult = dnsSvcsService.getForwardingRule(params);

        // all methods should return a Promise
        expectToBePromise(getForwardingRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}/forwarding_rules/{rule_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          resolverId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getForwardingRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.getForwardingRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getForwardingRulePromise = dnsSvcsService.getForwardingRule();
        expectToBePromise(getForwardingRulePromise);

        getForwardingRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateForwardingRule', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateForwardingRule
        const instanceId = 'testString';
        const resolverId = 'testString';
        const ruleId = 'testString';
        const description = 'forwarding rule';
        const match = 'example.com';
        const forwardTo = ['161.26.0.7'];
        const xCorrelationId = 'testString';
        const params = {
          instanceId: instanceId,
          resolverId: resolverId,
          ruleId: ruleId,
          description: description,
          match: match,
          forwardTo: forwardTo,
          xCorrelationId: xCorrelationId,
        };

        const updateForwardingRuleResult = dnsSvcsService.updateForwardingRule(params);

        // all methods should return a Promise
        expectToBePromise(updateForwardingRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}/forwarding_rules/{rule_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.match).toEqual(match);
        expect(mockRequestOptions.body.forward_to).toEqual(forwardTo);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          resolverId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateForwardingRule(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await dnsSvcsService.updateForwardingRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateForwardingRulePromise = dnsSvcsService.updateForwardingRule();
        expectToBePromise(updateForwardingRulePromise);

        updateForwardingRulePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
