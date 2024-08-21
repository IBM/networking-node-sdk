/**
 * (C) Copyright IBM Corp. 2023.
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
} = require('@ibm-cloud/sdk-test-utilities');

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

describe('DnsSvcsV1', () => {
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
      function __listDnszonesTest() {
        // Construct the params object for operation listDnszones
        const instanceId = 'testString';
        const xCorrelationId = 'testString';
        const offset = 38;
        const limit = 200;
        const vpcId = 'testString';
        const listDnszonesParams = {
          instanceId: instanceId,
          xCorrelationId: xCorrelationId,
          offset: offset,
          limit: limit,
          vpcId: vpcId,
        };

        const listDnszonesResult = dnsSvcsService.listDnszones(listDnszonesParams);

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
        expect(mockRequestOptions.qs.vpc_id).toEqual(vpcId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDnszonesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __listDnszonesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __listDnszonesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDnszonesParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listDnszones(listDnszonesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.listDnszones({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.listDnszones();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createDnszone', () => {
    describe('positive tests', () => {
      function __createDnszoneTest() {
        // Construct the params object for operation createDnszone
        const instanceId = 'testString';
        const name = 'example.com';
        const description = 'The DNS zone is used for VPCs in us-east region';
        const label = 'us-east';
        const xCorrelationId = 'testString';
        const createDnszoneParams = {
          instanceId: instanceId,
          name: name,
          description: description,
          label: label,
          xCorrelationId: xCorrelationId,
        };

        const createDnszoneResult = dnsSvcsService.createDnszone(createDnszoneParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDnszoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __createDnszoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __createDnszoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDnszoneParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createDnszone(createDnszoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.createDnszone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.createDnszone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteDnszone', () => {
    describe('positive tests', () => {
      function __deleteDnszoneTest() {
        // Construct the params object for operation deleteDnszone
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const deleteDnszoneParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          xCorrelationId: xCorrelationId,
        };

        const deleteDnszoneResult = dnsSvcsService.deleteDnszone(deleteDnszoneParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDnszoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __deleteDnszoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __deleteDnszoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDnszoneParams = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteDnszone(deleteDnszoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.deleteDnszone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.deleteDnszone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getDnszone', () => {
    describe('positive tests', () => {
      function __getDnszoneTest() {
        // Construct the params object for operation getDnszone
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const getDnszoneParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          xCorrelationId: xCorrelationId,
        };

        const getDnszoneResult = dnsSvcsService.getDnszone(getDnszoneParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDnszoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __getDnszoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __getDnszoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDnszoneParams = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getDnszone(getDnszoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.getDnszone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.getDnszone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateDnszone', () => {
    describe('positive tests', () => {
      function __updateDnszoneTest() {
        // Construct the params object for operation updateDnszone
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const description = 'The DNS zone is used for VPCs in us-east region';
        const label = 'us-east';
        const xCorrelationId = 'testString';
        const updateDnszoneParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          description: description,
          label: label,
          xCorrelationId: xCorrelationId,
        };

        const updateDnszoneResult = dnsSvcsService.updateDnszone(updateDnszoneParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDnszoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __updateDnszoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __updateDnszoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDnszoneParams = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateDnszone(updateDnszoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.updateDnszone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.updateDnszone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listResourceRecords', () => {
    describe('positive tests', () => {
      function __listResourceRecordsTest() {
        // Construct the params object for operation listResourceRecords
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const offset = 38;
        const limit = 200;
        const type = 'A';
        const name = 'www.example.com';
        const listResourceRecordsParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          xCorrelationId: xCorrelationId,
          offset: offset,
          limit: limit,
          type: type,
          name: name,
        };

        const listResourceRecordsResult = dnsSvcsService.listResourceRecords(
          listResourceRecordsParams
        );

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
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listResourceRecordsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __listResourceRecordsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __listResourceRecordsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listResourceRecordsParams = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listResourceRecords(listResourceRecordsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.listResourceRecords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.listResourceRecords();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createResourceRecordTest() {
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
        const createResourceRecordParams = {
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

        const createResourceRecordResult = dnsSvcsService.createResourceRecord(
          createResourceRecordParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createResourceRecordTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __createResourceRecordTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __createResourceRecordTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createResourceRecordParams = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createResourceRecord(createResourceRecordParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.createResourceRecord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.createResourceRecord();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteResourceRecord', () => {
    describe('positive tests', () => {
      function __deleteResourceRecordTest() {
        // Construct the params object for operation deleteResourceRecord
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const recordId = 'testString';
        const xCorrelationId = 'testString';
        const deleteResourceRecordParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          recordId: recordId,
          xCorrelationId: xCorrelationId,
        };

        const deleteResourceRecordResult = dnsSvcsService.deleteResourceRecord(
          deleteResourceRecordParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteResourceRecordTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __deleteResourceRecordTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __deleteResourceRecordTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const recordId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteResourceRecordParams = {
          instanceId,
          dnszoneId,
          recordId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteResourceRecord(deleteResourceRecordParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.deleteResourceRecord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.deleteResourceRecord();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getResourceRecord', () => {
    describe('positive tests', () => {
      function __getResourceRecordTest() {
        // Construct the params object for operation getResourceRecord
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const recordId = 'testString';
        const xCorrelationId = 'testString';
        const getResourceRecordParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          recordId: recordId,
          xCorrelationId: xCorrelationId,
        };

        const getResourceRecordResult = dnsSvcsService.getResourceRecord(getResourceRecordParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResourceRecordTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __getResourceRecordTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __getResourceRecordTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const recordId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getResourceRecordParams = {
          instanceId,
          dnszoneId,
          recordId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getResourceRecord(getResourceRecordParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.getResourceRecord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.getResourceRecord();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __updateResourceRecordTest() {
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
        const updateResourceRecordParams = {
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

        const updateResourceRecordResult = dnsSvcsService.updateResourceRecord(
          updateResourceRecordParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateResourceRecordTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __updateResourceRecordTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __updateResourceRecordTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const recordId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateResourceRecordParams = {
          instanceId,
          dnszoneId,
          recordId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateResourceRecord(updateResourceRecordParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.updateResourceRecord({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.updateResourceRecord();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('exportResourceRecords', () => {
    describe('positive tests', () => {
      function __exportResourceRecordsTest() {
        // Construct the params object for operation exportResourceRecords
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const exportResourceRecordsParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          xCorrelationId: xCorrelationId,
        };

        const exportResourceRecordsResult = dnsSvcsService.exportResourceRecords(
          exportResourceRecordsParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __exportResourceRecordsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __exportResourceRecordsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __exportResourceRecordsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const exportResourceRecordsParams = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.exportResourceRecords(exportResourceRecordsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.exportResourceRecords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.exportResourceRecords();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('importResourceRecords', () => {
    describe('positive tests', () => {
      function __importResourceRecordsTest() {
        // Construct the params object for operation importResourceRecords
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const file = Buffer.from('This is a mock file.');
        const fileContentType = 'testString';
        const xCorrelationId = 'testString';
        const importResourceRecordsParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          file: file,
          fileContentType: fileContentType,
          xCorrelationId: xCorrelationId,
        };

        const importResourceRecordsResult = dnsSvcsService.importResourceRecords(
          importResourceRecordsParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __importResourceRecordsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __importResourceRecordsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __importResourceRecordsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const importResourceRecordsParams = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.importResourceRecords(importResourceRecordsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.importResourceRecords({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.importResourceRecords();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listPermittedNetworks', () => {
    describe('positive tests', () => {
      function __listPermittedNetworksTest() {
        // Construct the params object for operation listPermittedNetworks
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const accounts = 'testString';
        const xCorrelationId = 'testString';
        const listPermittedNetworksParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          accounts: accounts,
          xCorrelationId: xCorrelationId,
        };

        const listPermittedNetworksResult = dnsSvcsService.listPermittedNetworks(
          listPermittedNetworksParams
        );

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
        expect(mockRequestOptions.qs.accounts).toEqual(accounts);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPermittedNetworksTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __listPermittedNetworksTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __listPermittedNetworksTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listPermittedNetworksParams = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listPermittedNetworks(listPermittedNetworksParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.listPermittedNetworks({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.listPermittedNetworks();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createPermittedNetworkTest() {
        // Construct the params object for operation createPermittedNetwork
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const type = 'vpc';
        const permittedNetwork = permittedNetworkVpcModel;
        const accounts = 'testString';
        const xCorrelationId = 'testString';
        const createPermittedNetworkParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          type: type,
          permittedNetwork: permittedNetwork,
          accounts: accounts,
          xCorrelationId: xCorrelationId,
        };

        const createPermittedNetworkResult = dnsSvcsService.createPermittedNetwork(
          createPermittedNetworkParams
        );

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
        expect(mockRequestOptions.qs.accounts).toEqual(accounts);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createPermittedNetworkTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __createPermittedNetworkTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __createPermittedNetworkTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createPermittedNetworkParams = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createPermittedNetwork(createPermittedNetworkParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.createPermittedNetwork({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.createPermittedNetwork();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deletePermittedNetwork', () => {
    describe('positive tests', () => {
      function __deletePermittedNetworkTest() {
        // Construct the params object for operation deletePermittedNetwork
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const permittedNetworkId = 'testString';
        const xCorrelationId = 'testString';
        const deletePermittedNetworkParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          permittedNetworkId: permittedNetworkId,
          xCorrelationId: xCorrelationId,
        };

        const deletePermittedNetworkResult = dnsSvcsService.deletePermittedNetwork(
          deletePermittedNetworkParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deletePermittedNetworkTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __deletePermittedNetworkTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __deletePermittedNetworkTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const permittedNetworkId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deletePermittedNetworkParams = {
          instanceId,
          dnszoneId,
          permittedNetworkId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deletePermittedNetwork(deletePermittedNetworkParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.deletePermittedNetwork({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.deletePermittedNetwork();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getPermittedNetwork', () => {
    describe('positive tests', () => {
      function __getPermittedNetworkTest() {
        // Construct the params object for operation getPermittedNetwork
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const permittedNetworkId = 'testString';
        const xCorrelationId = 'testString';
        const getPermittedNetworkParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          permittedNetworkId: permittedNetworkId,
          xCorrelationId: xCorrelationId,
        };

        const getPermittedNetworkResult = dnsSvcsService.getPermittedNetwork(
          getPermittedNetworkParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPermittedNetworkTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __getPermittedNetworkTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __getPermittedNetworkTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const permittedNetworkId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPermittedNetworkParams = {
          instanceId,
          dnszoneId,
          permittedNetworkId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getPermittedNetwork(getPermittedNetworkParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.getPermittedNetwork({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.getPermittedNetwork();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listLoadBalancers', () => {
    describe('positive tests', () => {
      function __listLoadBalancersTest() {
        // Construct the params object for operation listLoadBalancers
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const offset = 38;
        const limit = 200;
        const listLoadBalancersParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          xCorrelationId: xCorrelationId,
          offset: offset,
          limit: limit,
        };

        const listLoadBalancersResult = dnsSvcsService.listLoadBalancers(listLoadBalancersParams);

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
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLoadBalancersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __listLoadBalancersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __listLoadBalancersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLoadBalancersParams = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listLoadBalancers(listLoadBalancersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.listLoadBalancers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.listLoadBalancers();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createLoadBalancerTest() {
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
        const createLoadBalancerParams = {
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

        const createLoadBalancerResult = dnsSvcsService.createLoadBalancer(
          createLoadBalancerParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createLoadBalancerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __createLoadBalancerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __createLoadBalancerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createLoadBalancerParams = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createLoadBalancer(createLoadBalancerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.createLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.createLoadBalancer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteLoadBalancer', () => {
    describe('positive tests', () => {
      function __deleteLoadBalancerTest() {
        // Construct the params object for operation deleteLoadBalancer
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const lbId = 'testString';
        const xCorrelationId = 'testString';
        const deleteLoadBalancerParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          lbId: lbId,
          xCorrelationId: xCorrelationId,
        };

        const deleteLoadBalancerResult = dnsSvcsService.deleteLoadBalancer(
          deleteLoadBalancerParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteLoadBalancerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __deleteLoadBalancerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __deleteLoadBalancerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const lbId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteLoadBalancerParams = {
          instanceId,
          dnszoneId,
          lbId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteLoadBalancer(deleteLoadBalancerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.deleteLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.deleteLoadBalancer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getLoadBalancer', () => {
    describe('positive tests', () => {
      function __getLoadBalancerTest() {
        // Construct the params object for operation getLoadBalancer
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const lbId = 'testString';
        const xCorrelationId = 'testString';
        const getLoadBalancerParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          lbId: lbId,
          xCorrelationId: xCorrelationId,
        };

        const getLoadBalancerResult = dnsSvcsService.getLoadBalancer(getLoadBalancerParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLoadBalancerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __getLoadBalancerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __getLoadBalancerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const lbId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLoadBalancerParams = {
          instanceId,
          dnszoneId,
          lbId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getLoadBalancer(getLoadBalancerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.getLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.getLoadBalancer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __updateLoadBalancerTest() {
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
        const updateLoadBalancerParams = {
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

        const updateLoadBalancerResult = dnsSvcsService.updateLoadBalancer(
          updateLoadBalancerParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateLoadBalancerTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __updateLoadBalancerTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __updateLoadBalancerTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const lbId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateLoadBalancerParams = {
          instanceId,
          dnszoneId,
          lbId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateLoadBalancer(updateLoadBalancerParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.updateLoadBalancer({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.updateLoadBalancer();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listPools', () => {
    describe('positive tests', () => {
      function __listPoolsTest() {
        // Construct the params object for operation listPools
        const instanceId = 'testString';
        const xCorrelationId = 'testString';
        const offset = 38;
        const limit = 200;
        const listPoolsParams = {
          instanceId: instanceId,
          xCorrelationId: xCorrelationId,
          offset: offset,
          limit: limit,
        };

        const listPoolsResult = dnsSvcsService.listPools(listPoolsParams);

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
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPoolsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __listPoolsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __listPoolsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listPoolsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listPools(listPoolsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.listPools({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.listPools();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createPoolTest() {
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
        const createPoolParams = {
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

        const createPoolResult = dnsSvcsService.createPool(createPoolParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createPoolTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __createPoolTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __createPoolTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createPoolParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createPool(createPoolParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.createPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.createPool();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deletePool', () => {
    describe('positive tests', () => {
      function __deletePoolTest() {
        // Construct the params object for operation deletePool
        const instanceId = 'testString';
        const poolId = 'testString';
        const xCorrelationId = 'testString';
        const deletePoolParams = {
          instanceId: instanceId,
          poolId: poolId,
          xCorrelationId: xCorrelationId,
        };

        const deletePoolResult = dnsSvcsService.deletePool(deletePoolParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deletePoolTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __deletePoolTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __deletePoolTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const poolId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deletePoolParams = {
          instanceId,
          poolId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deletePool(deletePoolParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.deletePool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.deletePool();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getPool', () => {
    describe('positive tests', () => {
      function __getPoolTest() {
        // Construct the params object for operation getPool
        const instanceId = 'testString';
        const poolId = 'testString';
        const xCorrelationId = 'testString';
        const getPoolParams = {
          instanceId: instanceId,
          poolId: poolId,
          xCorrelationId: xCorrelationId,
        };

        const getPoolResult = dnsSvcsService.getPool(getPoolParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPoolTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __getPoolTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __getPoolTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const poolId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPoolParams = {
          instanceId,
          poolId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getPool(getPoolParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.getPool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.getPool();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __updatePoolTest() {
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
        const updatePoolParams = {
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

        const updatePoolResult = dnsSvcsService.updatePool(updatePoolParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updatePoolTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __updatePoolTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __updatePoolTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const poolId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updatePoolParams = {
          instanceId,
          poolId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updatePool(updatePoolParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.updatePool({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.updatePool();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listMonitors', () => {
    describe('positive tests', () => {
      function __listMonitorsTest() {
        // Construct the params object for operation listMonitors
        const instanceId = 'testString';
        const xCorrelationId = 'testString';
        const offset = 38;
        const limit = 200;
        const listMonitorsParams = {
          instanceId: instanceId,
          xCorrelationId: xCorrelationId,
          offset: offset,
          limit: limit,
        };

        const listMonitorsResult = dnsSvcsService.listMonitors(listMonitorsParams);

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
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listMonitorsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __listMonitorsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __listMonitorsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listMonitorsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listMonitors(listMonitorsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.listMonitors({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.listMonitors();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createMonitorTest() {
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
        const createMonitorParams = {
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

        const createMonitorResult = dnsSvcsService.createMonitor(createMonitorParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createMonitorTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __createMonitorTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __createMonitorTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createMonitorParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createMonitor(createMonitorParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.createMonitor({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.createMonitor();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteMonitor', () => {
    describe('positive tests', () => {
      function __deleteMonitorTest() {
        // Construct the params object for operation deleteMonitor
        const instanceId = 'testString';
        const monitorId = 'testString';
        const xCorrelationId = 'testString';
        const deleteMonitorParams = {
          instanceId: instanceId,
          monitorId: monitorId,
          xCorrelationId: xCorrelationId,
        };

        const deleteMonitorResult = dnsSvcsService.deleteMonitor(deleteMonitorParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteMonitorTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __deleteMonitorTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __deleteMonitorTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const monitorId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteMonitorParams = {
          instanceId,
          monitorId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteMonitor(deleteMonitorParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.deleteMonitor({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.deleteMonitor();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getMonitor', () => {
    describe('positive tests', () => {
      function __getMonitorTest() {
        // Construct the params object for operation getMonitor
        const instanceId = 'testString';
        const monitorId = 'testString';
        const xCorrelationId = 'testString';
        const getMonitorParams = {
          instanceId: instanceId,
          monitorId: monitorId,
          xCorrelationId: xCorrelationId,
        };

        const getMonitorResult = dnsSvcsService.getMonitor(getMonitorParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMonitorTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __getMonitorTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __getMonitorTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const monitorId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMonitorParams = {
          instanceId,
          monitorId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getMonitor(getMonitorParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.getMonitor({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.getMonitor();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __updateMonitorTest() {
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
        const updateMonitorParams = {
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

        const updateMonitorResult = dnsSvcsService.updateMonitor(updateMonitorParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateMonitorTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __updateMonitorTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __updateMonitorTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const monitorId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateMonitorParams = {
          instanceId,
          monitorId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateMonitor(updateMonitorParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.updateMonitor({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.updateMonitor();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listCustomResolvers', () => {
    describe('positive tests', () => {
      function __listCustomResolversTest() {
        // Construct the params object for operation listCustomResolvers
        const instanceId = 'testString';
        const xCorrelationId = 'testString';
        const listCustomResolversParams = {
          instanceId: instanceId,
          xCorrelationId: xCorrelationId,
        };

        const listCustomResolversResult = dnsSvcsService.listCustomResolvers(
          listCustomResolversParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCustomResolversTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __listCustomResolversTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __listCustomResolversTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCustomResolversParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listCustomResolvers(listCustomResolversParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.listCustomResolvers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.listCustomResolvers();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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

      function __createCustomResolverTest() {
        // Construct the params object for operation createCustomResolver
        const instanceId = 'testString';
        const name = 'my-resolver';
        const description = 'custom resolver';
        const locations = [locationInputModel];
        const xCorrelationId = 'testString';
        const createCustomResolverParams = {
          instanceId: instanceId,
          name: name,
          description: description,
          locations: locations,
          xCorrelationId: xCorrelationId,
        };

        const createCustomResolverResult = dnsSvcsService.createCustomResolver(
          createCustomResolverParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createCustomResolverTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __createCustomResolverTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __createCustomResolverTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createCustomResolverParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createCustomResolver(createCustomResolverParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.createCustomResolver({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.createCustomResolver();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteCustomResolver', () => {
    describe('positive tests', () => {
      function __deleteCustomResolverTest() {
        // Construct the params object for operation deleteCustomResolver
        const instanceId = 'testString';
        const resolverId = 'testString';
        const xCorrelationId = 'testString';
        const deleteCustomResolverParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          xCorrelationId: xCorrelationId,
        };

        const deleteCustomResolverResult = dnsSvcsService.deleteCustomResolver(
          deleteCustomResolverParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCustomResolverTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __deleteCustomResolverTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __deleteCustomResolverTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCustomResolverParams = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteCustomResolver(deleteCustomResolverParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.deleteCustomResolver({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.deleteCustomResolver();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getCustomResolver', () => {
    describe('positive tests', () => {
      function __getCustomResolverTest() {
        // Construct the params object for operation getCustomResolver
        const instanceId = 'testString';
        const resolverId = 'testString';
        const xCorrelationId = 'testString';
        const getCustomResolverParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          xCorrelationId: xCorrelationId,
        };

        const getCustomResolverResult = dnsSvcsService.getCustomResolver(getCustomResolverParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCustomResolverTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __getCustomResolverTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __getCustomResolverTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCustomResolverParams = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getCustomResolver(getCustomResolverParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.getCustomResolver({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.getCustomResolver();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateCustomResolver', () => {
    describe('positive tests', () => {
      function __updateCustomResolverTest() {
        // Construct the params object for operation updateCustomResolver
        const instanceId = 'testString';
        const resolverId = 'testString';
        const name = 'my-resolver';
        const description = 'custom resolver';
        const enabled = false;
        const xCorrelationId = 'testString';
        const updateCustomResolverParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          name: name,
          description: description,
          enabled: enabled,
          xCorrelationId: xCorrelationId,
        };

        const updateCustomResolverResult = dnsSvcsService.updateCustomResolver(
          updateCustomResolverParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCustomResolverTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __updateCustomResolverTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __updateCustomResolverTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateCustomResolverParams = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateCustomResolver(updateCustomResolverParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.updateCustomResolver({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.updateCustomResolver();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateCrLocationsOrder', () => {
    describe('positive tests', () => {
      function __updateCrLocationsOrderTest() {
        // Construct the params object for operation updateCrLocationsOrder
        const instanceId = 'testString';
        const resolverId = 'testString';
        const locations = ['9a234ede-c2b6-4c39-bc27-d39ec139ecdb'];
        const xCorrelationId = 'testString';
        const updateCrLocationsOrderParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          locations: locations,
          xCorrelationId: xCorrelationId,
        };

        const updateCrLocationsOrderResult = dnsSvcsService.updateCrLocationsOrder(
          updateCrLocationsOrderParams
        );

        // all methods should return a Promise
        expectToBePromise(updateCrLocationsOrderResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}/locations_order',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.locations).toEqual(locations);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCrLocationsOrderTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __updateCrLocationsOrderTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __updateCrLocationsOrderTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateCrLocationsOrderParams = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateCrLocationsOrder(updateCrLocationsOrderParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.updateCrLocationsOrder({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.updateCrLocationsOrder();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('addCustomResolverLocation', () => {
    describe('positive tests', () => {
      function __addCustomResolverLocationTest() {
        // Construct the params object for operation addCustomResolverLocation
        const instanceId = 'testString';
        const resolverId = 'testString';
        const subnetCrn =
          'crn:v1:bluemix:public:is:us-south-1:a/01652b251c3ae2787110a995d8db0135::subnet:0716-b49ef064-0f89-4fb1-8212-135b12568f04';
        const enabled = false;
        const xCorrelationId = 'testString';
        const addCustomResolverLocationParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          subnetCrn: subnetCrn,
          enabled: enabled,
          xCorrelationId: xCorrelationId,
        };

        const addCustomResolverLocationResult = dnsSvcsService.addCustomResolverLocation(
          addCustomResolverLocationParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addCustomResolverLocationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __addCustomResolverLocationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __addCustomResolverLocationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addCustomResolverLocationParams = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.addCustomResolverLocation(addCustomResolverLocationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.addCustomResolverLocation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.addCustomResolverLocation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateCustomResolverLocation', () => {
    describe('positive tests', () => {
      function __updateCustomResolverLocationTest() {
        // Construct the params object for operation updateCustomResolverLocation
        const instanceId = 'testString';
        const resolverId = 'testString';
        const locationId = 'testString';
        const enabled = false;
        const subnetCrn =
          'crn:v1:bluemix:public:is:us-south-1:a/01652b251c3ae2787110a995d8db0135::subnet:0716-b49ef064-0f89-4fb1-8212-135b12568f04';
        const xCorrelationId = 'testString';
        const updateCustomResolverLocationParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          locationId: locationId,
          enabled: enabled,
          subnetCrn: subnetCrn,
          xCorrelationId: xCorrelationId,
        };

        const updateCustomResolverLocationResult = dnsSvcsService.updateCustomResolverLocation(
          updateCustomResolverLocationParams
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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCustomResolverLocationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __updateCustomResolverLocationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __updateCustomResolverLocationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const locationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateCustomResolverLocationParams = {
          instanceId,
          resolverId,
          locationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateCustomResolverLocation(updateCustomResolverLocationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.updateCustomResolverLocation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.updateCustomResolverLocation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteCustomResolverLocation', () => {
    describe('positive tests', () => {
      function __deleteCustomResolverLocationTest() {
        // Construct the params object for operation deleteCustomResolverLocation
        const instanceId = 'testString';
        const resolverId = 'testString';
        const locationId = 'testString';
        const xCorrelationId = 'testString';
        const deleteCustomResolverLocationParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          locationId: locationId,
          xCorrelationId: xCorrelationId,
        };

        const deleteCustomResolverLocationResult = dnsSvcsService.deleteCustomResolverLocation(
          deleteCustomResolverLocationParams
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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCustomResolverLocationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __deleteCustomResolverLocationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __deleteCustomResolverLocationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const locationId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCustomResolverLocationParams = {
          instanceId,
          resolverId,
          locationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteCustomResolverLocation(deleteCustomResolverLocationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.deleteCustomResolverLocation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.deleteCustomResolverLocation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listForwardingRules', () => {
    describe('positive tests', () => {
      function __listForwardingRulesTest() {
        // Construct the params object for operation listForwardingRules
        const instanceId = 'testString';
        const resolverId = 'testString';
        const xCorrelationId = 'testString';
        const offset = 38;
        const limit = 200;
        const listForwardingRulesParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          xCorrelationId: xCorrelationId,
          offset: offset,
          limit: limit,
        };

        const listForwardingRulesResult = dnsSvcsService.listForwardingRules(
          listForwardingRulesParams
        );

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
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listForwardingRulesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __listForwardingRulesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __listForwardingRulesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listForwardingRulesParams = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listForwardingRules(listForwardingRulesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.listForwardingRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.listForwardingRules();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createForwardingRule', () => {
    describe('positive tests', () => {
      function __createForwardingRuleTest() {
        // Construct the params object for operation createForwardingRule
        const instanceId = 'testString';
        const resolverId = 'testString';
        const type = 'zone';
        const match = 'example.com';
        const forwardTo = ['161.26.0.7'];
        const description = 'forwarding rule';
        const xCorrelationId = 'testString';
        const createForwardingRuleParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          type: type,
          match: match,
          forwardTo: forwardTo,
          description: description,
          xCorrelationId: xCorrelationId,
        };

        const createForwardingRuleResult = dnsSvcsService.createForwardingRule(
          createForwardingRuleParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createForwardingRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __createForwardingRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __createForwardingRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createForwardingRuleParams = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createForwardingRule(createForwardingRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.createForwardingRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.createForwardingRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteForwardingRule', () => {
    describe('positive tests', () => {
      function __deleteForwardingRuleTest() {
        // Construct the params object for operation deleteForwardingRule
        const instanceId = 'testString';
        const resolverId = 'testString';
        const ruleId = 'testString';
        const xCorrelationId = 'testString';
        const deleteForwardingRuleParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          ruleId: ruleId,
          xCorrelationId: xCorrelationId,
        };

        const deleteForwardingRuleResult = dnsSvcsService.deleteForwardingRule(
          deleteForwardingRuleParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteForwardingRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __deleteForwardingRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __deleteForwardingRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteForwardingRuleParams = {
          instanceId,
          resolverId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteForwardingRule(deleteForwardingRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.deleteForwardingRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.deleteForwardingRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getForwardingRule', () => {
    describe('positive tests', () => {
      function __getForwardingRuleTest() {
        // Construct the params object for operation getForwardingRule
        const instanceId = 'testString';
        const resolverId = 'testString';
        const ruleId = 'testString';
        const xCorrelationId = 'testString';
        const getForwardingRuleParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          ruleId: ruleId,
          xCorrelationId: xCorrelationId,
        };

        const getForwardingRuleResult = dnsSvcsService.getForwardingRule(getForwardingRuleParams);

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getForwardingRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __getForwardingRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __getForwardingRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getForwardingRuleParams = {
          instanceId,
          resolverId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getForwardingRule(getForwardingRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.getForwardingRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.getForwardingRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateForwardingRule', () => {
    describe('positive tests', () => {
      function __updateForwardingRuleTest() {
        // Construct the params object for operation updateForwardingRule
        const instanceId = 'testString';
        const resolverId = 'testString';
        const ruleId = 'testString';
        const description = 'forwarding rule';
        const match = 'example.com';
        const forwardTo = ['161.26.0.7'];
        const xCorrelationId = 'testString';
        const updateForwardingRuleParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          ruleId: ruleId,
          description: description,
          match: match,
          forwardTo: forwardTo,
          xCorrelationId: xCorrelationId,
        };

        const updateForwardingRuleResult = dnsSvcsService.updateForwardingRule(
          updateForwardingRuleParams
        );

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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateForwardingRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __updateForwardingRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __updateForwardingRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateForwardingRuleParams = {
          instanceId,
          resolverId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateForwardingRule(updateForwardingRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.updateForwardingRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.updateForwardingRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createSecondaryZone', () => {
    describe('positive tests', () => {
      function __createSecondaryZoneTest() {
        // Construct the params object for operation createSecondaryZone
        const instanceId = 'testString';
        const resolverId = 'testString';
        const zone = 'example.com';
        const transferFrom = ['10.0.0.7'];
        const description = 'secondary zone';
        const enabled = false;
        const xCorrelationId = 'testString';
        const createSecondaryZoneParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          zone: zone,
          transferFrom: transferFrom,
          description: description,
          enabled: enabled,
          xCorrelationId: xCorrelationId,
        };

        const createSecondaryZoneResult = dnsSvcsService.createSecondaryZone(
          createSecondaryZoneParams
        );

        // all methods should return a Promise
        expectToBePromise(createSecondaryZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}/secondary_zones',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.zone).toEqual(zone);
        expect(mockRequestOptions.body.transfer_from).toEqual(transferFrom);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSecondaryZoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __createSecondaryZoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __createSecondaryZoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSecondaryZoneParams = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createSecondaryZone(createSecondaryZoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.createSecondaryZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.createSecondaryZone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listSecondaryZones', () => {
    describe('positive tests', () => {
      function __listSecondaryZonesTest() {
        // Construct the params object for operation listSecondaryZones
        const instanceId = 'testString';
        const resolverId = 'testString';
        const xCorrelationId = 'testString';
        const offset = 38;
        const limit = 200;
        const listSecondaryZonesParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          xCorrelationId: xCorrelationId,
          offset: offset,
          limit: limit,
        };

        const listSecondaryZonesResult = dnsSvcsService.listSecondaryZones(
          listSecondaryZonesParams
        );

        // all methods should return a Promise
        expectToBePromise(listSecondaryZonesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}/secondary_zones',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSecondaryZonesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __listSecondaryZonesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __listSecondaryZonesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSecondaryZonesParams = {
          instanceId,
          resolverId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listSecondaryZones(listSecondaryZonesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.listSecondaryZones({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.listSecondaryZones();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getSecondaryZone', () => {
    describe('positive tests', () => {
      function __getSecondaryZoneTest() {
        // Construct the params object for operation getSecondaryZone
        const instanceId = 'testString';
        const resolverId = 'testString';
        const secondaryZoneId = 'testString';
        const xCorrelationId = 'testString';
        const getSecondaryZoneParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          secondaryZoneId: secondaryZoneId,
          xCorrelationId: xCorrelationId,
        };

        const getSecondaryZoneResult = dnsSvcsService.getSecondaryZone(getSecondaryZoneParams);

        // all methods should return a Promise
        expectToBePromise(getSecondaryZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}/secondary_zones/{secondary_zone_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
        expect(mockRequestOptions.path.secondary_zone_id).toEqual(secondaryZoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSecondaryZoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __getSecondaryZoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __getSecondaryZoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const secondaryZoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSecondaryZoneParams = {
          instanceId,
          resolverId,
          secondaryZoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getSecondaryZone(getSecondaryZoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.getSecondaryZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.getSecondaryZone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateSecondaryZone', () => {
    describe('positive tests', () => {
      function __updateSecondaryZoneTest() {
        // Construct the params object for operation updateSecondaryZone
        const instanceId = 'testString';
        const resolverId = 'testString';
        const secondaryZoneId = 'testString';
        const description = 'secondary zone';
        const enabled = false;
        const transferFrom = ['10.0.0.7'];
        const xCorrelationId = 'testString';
        const updateSecondaryZoneParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          secondaryZoneId: secondaryZoneId,
          description: description,
          enabled: enabled,
          transferFrom: transferFrom,
          xCorrelationId: xCorrelationId,
        };

        const updateSecondaryZoneResult = dnsSvcsService.updateSecondaryZone(
          updateSecondaryZoneParams
        );

        // all methods should return a Promise
        expectToBePromise(updateSecondaryZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}/secondary_zones/{secondary_zone_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.transfer_from).toEqual(transferFrom);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
        expect(mockRequestOptions.path.secondary_zone_id).toEqual(secondaryZoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSecondaryZoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __updateSecondaryZoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __updateSecondaryZoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const secondaryZoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSecondaryZoneParams = {
          instanceId,
          resolverId,
          secondaryZoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateSecondaryZone(updateSecondaryZoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.updateSecondaryZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.updateSecondaryZone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteSecondaryZone', () => {
    describe('positive tests', () => {
      function __deleteSecondaryZoneTest() {
        // Construct the params object for operation deleteSecondaryZone
        const instanceId = 'testString';
        const resolverId = 'testString';
        const secondaryZoneId = 'testString';
        const xCorrelationId = 'testString';
        const deleteSecondaryZoneParams = {
          instanceId: instanceId,
          resolverId: resolverId,
          secondaryZoneId: secondaryZoneId,
          xCorrelationId: xCorrelationId,
        };

        const deleteSecondaryZoneResult = dnsSvcsService.deleteSecondaryZone(
          deleteSecondaryZoneParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteSecondaryZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/custom_resolvers/{resolver_id}/secondary_zones/{secondary_zone_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.resolver_id).toEqual(resolverId);
        expect(mockRequestOptions.path.secondary_zone_id).toEqual(secondaryZoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSecondaryZoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __deleteSecondaryZoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __deleteSecondaryZoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const resolverId = 'testString';
        const secondaryZoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSecondaryZoneParams = {
          instanceId,
          resolverId,
          secondaryZoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteSecondaryZone(deleteSecondaryZoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.deleteSecondaryZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.deleteSecondaryZone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listLinkedZones', () => {
    describe('positive tests', () => {
      function __listLinkedZonesTest() {
        // Construct the params object for operation listLinkedZones
        const instanceId = 'testString';
        const xCorrelationId = 'testString';
        const offset = 38;
        const limit = 200;
        const listLinkedZonesParams = {
          instanceId: instanceId,
          xCorrelationId: xCorrelationId,
          offset: offset,
          limit: limit,
        };

        const listLinkedZonesResult = dnsSvcsService.listLinkedZones(listLinkedZonesParams);

        // all methods should return a Promise
        expectToBePromise(listLinkedZonesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/linked_dnszones', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLinkedZonesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __listLinkedZonesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __listLinkedZonesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLinkedZonesParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listLinkedZones(listLinkedZonesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.listLinkedZones({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.listLinkedZones();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createLinkedZone', () => {
    describe('positive tests', () => {
      function __createLinkedZoneTest() {
        // Construct the params object for operation createLinkedZone
        const instanceId = 'testString';
        const ownerInstanceId = 'abe30019-1c08-42dc-9ad9-a0682af70054';
        const ownerZoneId = '05855abe-3908-4cdc-bf0d-063e0b1c296d';
        const description = 'linked zone example';
        const label = 'dev';
        const xCorrelationId = 'testString';
        const createLinkedZoneParams = {
          instanceId: instanceId,
          ownerInstanceId: ownerInstanceId,
          ownerZoneId: ownerZoneId,
          description: description,
          label: label,
          xCorrelationId: xCorrelationId,
        };

        const createLinkedZoneResult = dnsSvcsService.createLinkedZone(createLinkedZoneParams);

        // all methods should return a Promise
        expectToBePromise(createLinkedZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/{instance_id}/linked_dnszones', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.owner_instance_id).toEqual(ownerInstanceId);
        expect(mockRequestOptions.body.owner_zone_id).toEqual(ownerZoneId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createLinkedZoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __createLinkedZoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __createLinkedZoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createLinkedZoneParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createLinkedZone(createLinkedZoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.createLinkedZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.createLinkedZone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getLinkedZone', () => {
    describe('positive tests', () => {
      function __getLinkedZoneTest() {
        // Construct the params object for operation getLinkedZone
        const instanceId = 'testString';
        const linkedDnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const getLinkedZoneParams = {
          instanceId: instanceId,
          linkedDnszoneId: linkedDnszoneId,
          xCorrelationId: xCorrelationId,
        };

        const getLinkedZoneResult = dnsSvcsService.getLinkedZone(getLinkedZoneParams);

        // all methods should return a Promise
        expectToBePromise(getLinkedZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/linked_dnszones/{linked_dnszone_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.linked_dnszone_id).toEqual(linkedDnszoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLinkedZoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __getLinkedZoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __getLinkedZoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const linkedDnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLinkedZoneParams = {
          instanceId,
          linkedDnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getLinkedZone(getLinkedZoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.getLinkedZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.getLinkedZone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateLinkedZone', () => {
    describe('positive tests', () => {
      function __updateLinkedZoneTest() {
        // Construct the params object for operation updateLinkedZone
        const instanceId = 'testString';
        const linkedDnszoneId = 'testString';
        const description = 'linked zone example';
        const label = 'dev';
        const xCorrelationId = 'testString';
        const updateLinkedZoneParams = {
          instanceId: instanceId,
          linkedDnszoneId: linkedDnszoneId,
          description: description,
          label: label,
          xCorrelationId: xCorrelationId,
        };

        const updateLinkedZoneResult = dnsSvcsService.updateLinkedZone(updateLinkedZoneParams);

        // all methods should return a Promise
        expectToBePromise(updateLinkedZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/linked_dnszones/{linked_dnszone_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.linked_dnszone_id).toEqual(linkedDnszoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateLinkedZoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __updateLinkedZoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __updateLinkedZoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const linkedDnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateLinkedZoneParams = {
          instanceId,
          linkedDnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateLinkedZone(updateLinkedZoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.updateLinkedZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.updateLinkedZone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteLinkedZone', () => {
    describe('positive tests', () => {
      function __deleteLinkedZoneTest() {
        // Construct the params object for operation deleteLinkedZone
        const instanceId = 'testString';
        const linkedDnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const deleteLinkedZoneParams = {
          instanceId: instanceId,
          linkedDnszoneId: linkedDnszoneId,
          xCorrelationId: xCorrelationId,
        };

        const deleteLinkedZoneResult = dnsSvcsService.deleteLinkedZone(deleteLinkedZoneParams);

        // all methods should return a Promise
        expectToBePromise(deleteLinkedZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/linked_dnszones/{linked_dnszone_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.linked_dnszone_id).toEqual(linkedDnszoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteLinkedZoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __deleteLinkedZoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __deleteLinkedZoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const linkedDnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteLinkedZoneParams = {
          instanceId,
          linkedDnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteLinkedZone(deleteLinkedZoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.deleteLinkedZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.deleteLinkedZone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listDnszoneAccessRequests', () => {
    describe('positive tests', () => {
      function __listDnszoneAccessRequestsTest() {
        // Construct the params object for operation listDnszoneAccessRequests
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const offset = 38;
        const limit = 200;
        const listDnszoneAccessRequestsParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          xCorrelationId: xCorrelationId,
          offset: offset,
          limit: limit,
        };

        const listDnszoneAccessRequestsResult = dnsSvcsService.listDnszoneAccessRequests(
          listDnszoneAccessRequestsParams
        );

        // all methods should return a Promise
        expectToBePromise(listDnszoneAccessRequestsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/access_requests',
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
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDnszoneAccessRequestsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __listDnszoneAccessRequestsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __listDnszoneAccessRequestsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDnszoneAccessRequestsParams = {
          instanceId,
          dnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listDnszoneAccessRequests(listDnszoneAccessRequestsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.listDnszoneAccessRequests({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.listDnszoneAccessRequests();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getDnszoneAccessRequest', () => {
    describe('positive tests', () => {
      function __getDnszoneAccessRequestTest() {
        // Construct the params object for operation getDnszoneAccessRequest
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const requestId = 'testString';
        const xCorrelationId = 'testString';
        const getDnszoneAccessRequestParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          requestId: requestId,
          xCorrelationId: xCorrelationId,
        };

        const getDnszoneAccessRequestResult = dnsSvcsService.getDnszoneAccessRequest(
          getDnszoneAccessRequestParams
        );

        // all methods should return a Promise
        expectToBePromise(getDnszoneAccessRequestResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/access_requests/{request_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
        expect(mockRequestOptions.path.request_id).toEqual(requestId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDnszoneAccessRequestTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __getDnszoneAccessRequestTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __getDnszoneAccessRequestTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const requestId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDnszoneAccessRequestParams = {
          instanceId,
          dnszoneId,
          requestId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getDnszoneAccessRequest(getDnszoneAccessRequestParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.getDnszoneAccessRequest({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.getDnszoneAccessRequest();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateDnszoneAccessRequest', () => {
    describe('positive tests', () => {
      function __updateDnszoneAccessRequestTest() {
        // Construct the params object for operation updateDnszoneAccessRequest
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const requestId = 'testString';
        const action = 'APPROVE';
        const xCorrelationId = 'testString';
        const updateDnszoneAccessRequestParams = {
          instanceId: instanceId,
          dnszoneId: dnszoneId,
          requestId: requestId,
          action: action,
          xCorrelationId: xCorrelationId,
        };

        const updateDnszoneAccessRequestResult = dnsSvcsService.updateDnszoneAccessRequest(
          updateDnszoneAccessRequestParams
        );

        // all methods should return a Promise
        expectToBePromise(updateDnszoneAccessRequestResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/dnszones/{dnszone_id}/access_requests/{request_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.dnszone_id).toEqual(dnszoneId);
        expect(mockRequestOptions.path.request_id).toEqual(requestId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDnszoneAccessRequestTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __updateDnszoneAccessRequestTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __updateDnszoneAccessRequestTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const dnszoneId = 'testString';
        const requestId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDnszoneAccessRequestParams = {
          instanceId,
          dnszoneId,
          requestId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.updateDnszoneAccessRequest(updateDnszoneAccessRequestParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.updateDnszoneAccessRequest({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.updateDnszoneAccessRequest();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listLinkedPermittedNetworks', () => {
    describe('positive tests', () => {
      function __listLinkedPermittedNetworksTest() {
        // Construct the params object for operation listLinkedPermittedNetworks
        const instanceId = 'testString';
        const linkedDnszoneId = 'testString';
        const xCorrelationId = 'testString';
        const listLinkedPermittedNetworksParams = {
          instanceId: instanceId,
          linkedDnszoneId: linkedDnszoneId,
          xCorrelationId: xCorrelationId,
        };

        const listLinkedPermittedNetworksResult = dnsSvcsService.listLinkedPermittedNetworks(
          listLinkedPermittedNetworksParams
        );

        // all methods should return a Promise
        expectToBePromise(listLinkedPermittedNetworksResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/linked_dnszones/{linked_dnszone_id}/permitted_networks',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.linked_dnszone_id).toEqual(linkedDnszoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLinkedPermittedNetworksTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __listLinkedPermittedNetworksTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __listLinkedPermittedNetworksTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const linkedDnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLinkedPermittedNetworksParams = {
          instanceId,
          linkedDnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.listLinkedPermittedNetworks(listLinkedPermittedNetworksParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.listLinkedPermittedNetworks({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.listLinkedPermittedNetworks();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createLzPermittedNetwork', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PermittedNetworkVpc
      const permittedNetworkVpcModel = {
        vpc_crn:
          'crn:v1:bluemix:public:is:eu-de:a/bcf1865e99742d38d2d5fc3fb80a5496::vpc:6e6cc326-04d1-4c99-a289-efb3ae4193d6',
      };

      function __createLzPermittedNetworkTest() {
        // Construct the params object for operation createLzPermittedNetwork
        const instanceId = 'testString';
        const linkedDnszoneId = 'testString';
        const type = 'vpc';
        const permittedNetwork = permittedNetworkVpcModel;
        const xCorrelationId = 'testString';
        const createLzPermittedNetworkParams = {
          instanceId: instanceId,
          linkedDnszoneId: linkedDnszoneId,
          type: type,
          permittedNetwork: permittedNetwork,
          xCorrelationId: xCorrelationId,
        };

        const createLzPermittedNetworkResult = dnsSvcsService.createLzPermittedNetwork(
          createLzPermittedNetworkParams
        );

        // all methods should return a Promise
        expectToBePromise(createLzPermittedNetworkResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/linked_dnszones/{linked_dnszone_id}/permitted_networks',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.permitted_network).toEqual(permittedNetwork);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.linked_dnszone_id).toEqual(linkedDnszoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createLzPermittedNetworkTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __createLzPermittedNetworkTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __createLzPermittedNetworkTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const linkedDnszoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createLzPermittedNetworkParams = {
          instanceId,
          linkedDnszoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.createLzPermittedNetwork(createLzPermittedNetworkParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.createLzPermittedNetwork({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.createLzPermittedNetwork();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteLzPermittedNetwork', () => {
    describe('positive tests', () => {
      function __deleteLzPermittedNetworkTest() {
        // Construct the params object for operation deleteLzPermittedNetwork
        const instanceId = 'testString';
        const linkedDnszoneId = 'testString';
        const permittedNetworkId = 'testString';
        const xCorrelationId = 'testString';
        const deleteLzPermittedNetworkParams = {
          instanceId: instanceId,
          linkedDnszoneId: linkedDnszoneId,
          permittedNetworkId: permittedNetworkId,
          xCorrelationId: xCorrelationId,
        };

        const deleteLzPermittedNetworkResult = dnsSvcsService.deleteLzPermittedNetwork(
          deleteLzPermittedNetworkParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteLzPermittedNetworkResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/linked_dnszones/{linked_dnszone_id}/permitted_networks/{permitted_network_id}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.linked_dnszone_id).toEqual(linkedDnszoneId);
        expect(mockRequestOptions.path.permitted_network_id).toEqual(permittedNetworkId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteLzPermittedNetworkTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __deleteLzPermittedNetworkTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __deleteLzPermittedNetworkTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const linkedDnszoneId = 'testString';
        const permittedNetworkId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteLzPermittedNetworkParams = {
          instanceId,
          linkedDnszoneId,
          permittedNetworkId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.deleteLzPermittedNetwork(deleteLzPermittedNetworkParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.deleteLzPermittedNetwork({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.deleteLzPermittedNetwork();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getLinkedPermittedNetwork', () => {
    describe('positive tests', () => {
      function __getLinkedPermittedNetworkTest() {
        // Construct the params object for operation getLinkedPermittedNetwork
        const instanceId = 'testString';
        const linkedDnszoneId = 'testString';
        const permittedNetworkId = 'testString';
        const xCorrelationId = 'testString';
        const getLinkedPermittedNetworkParams = {
          instanceId: instanceId,
          linkedDnszoneId: linkedDnszoneId,
          permittedNetworkId: permittedNetworkId,
          xCorrelationId: xCorrelationId,
        };

        const getLinkedPermittedNetworkResult = dnsSvcsService.getLinkedPermittedNetwork(
          getLinkedPermittedNetworkParams
        );

        // all methods should return a Promise
        expectToBePromise(getLinkedPermittedNetworkResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/instances/{instance_id}/linked_dnszones/{linked_dnszone_id}/permitted_networks/{permitted_network_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-ID', xCorrelationId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.linked_dnszone_id).toEqual(linkedDnszoneId);
        expect(mockRequestOptions.path.permitted_network_id).toEqual(permittedNetworkId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLinkedPermittedNetworkTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.enableRetries();
        __getLinkedPermittedNetworkTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsSvcsService.disableRetries();
        __getLinkedPermittedNetworkTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const linkedDnszoneId = 'testString';
        const permittedNetworkId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLinkedPermittedNetworkParams = {
          instanceId,
          linkedDnszoneId,
          permittedNetworkId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsSvcsService.getLinkedPermittedNetwork(getLinkedPermittedNetworkParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await dnsSvcsService.getLinkedPermittedNetwork({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsSvcsService.getLinkedPermittedNetwork();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
