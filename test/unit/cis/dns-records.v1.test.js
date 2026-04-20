/**
 * (C) Copyright IBM Corp. 2026.
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
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const DnsRecordsV1 = require('../../../dist/cis/dnsrecordsv1/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const dnsRecordsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  zoneIdentifier: 'testString',
};

const dnsRecordsService = new DnsRecordsV1(dnsRecordsServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(dnsRecordsService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('DnsRecordsV1', () => {
  beforeEach(() => {
    mock_createRequest();
    // these are changed when passed into the factory/constructor, so re-init
    requiredGlobals = {
      crn: 'testString',
      zoneIdentifier: 'testString',
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
        const serviceObj = new DnsRecordsV1(dnsRecordsServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(dnsRecordsServiceOptions.crn);
        expect(serviceObj.zoneIdentifier).toEqual(dnsRecordsServiceOptions.zoneIdentifier);
      });
    });
  });

  describe('listAllDnsRecords', () => {
    describe('positive tests', () => {
      function __listAllDnsRecordsTest() {
        // Construct the params object for operation listAllDnsRecords
        const type = 'testString';
        const name = 'host1.test-example.com';
        const content = '1.2.3.4';
        const page = 1;
        const perPage = 20;
        const order = 'type';
        const direction = 'asc';
        const match = 'any';
        const listAllDnsRecordsParams = {
          type,
          name,
          content,
          page,
          perPage,
          order,
          direction,
          match,
        };

        const listAllDnsRecordsResult = dnsRecordsService.listAllDnsRecords(listAllDnsRecordsParams);

        // all methods should return a Promise
        expectToBePromise(listAllDnsRecordsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/dns_records', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.content).toEqual(content);
        expect(mockRequestOptions.qs.page).toEqual(page);
        expect(mockRequestOptions.qs.per_page).toEqual(perPage);
        expect(mockRequestOptions.qs.order).toEqual(order);
        expect(mockRequestOptions.qs.direction).toEqual(direction);
        expect(mockRequestOptions.qs.match).toEqual(match);
        expect(mockRequestOptions.path.crn).toEqual(dnsRecordsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(dnsRecordsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAllDnsRecordsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsRecordsService.enableRetries();
        __listAllDnsRecordsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsRecordsService.disableRetries();
        __listAllDnsRecordsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAllDnsRecordsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsRecordsService.listAllDnsRecords(listAllDnsRecordsParams);
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
      function __createDnsRecordTest() {
        // Construct the params object for operation createDnsRecord
        const type = 'A';
        const name = 'host-1.test-example.com';
        const ttl = 120;
        const content = '1.2.3.4';
        const priority = 5;
        const proxied = false;
        const data = { anyKey: 'anyValue' };
        const createDnsRecordParams = {
          type,
          name,
          ttl,
          content,
          priority,
          proxied,
          data,
        };

        const createDnsRecordResult = dnsRecordsService.createDnsRecord(createDnsRecordParams);

        // all methods should return a Promise
        expectToBePromise(createDnsRecordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/dns_records', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.ttl).toEqual(ttl);
        expect(mockRequestOptions.body.content).toEqual(content);
        expect(mockRequestOptions.body.priority).toEqual(priority);
        expect(mockRequestOptions.body.proxied).toEqual(proxied);
        expect(mockRequestOptions.body.data).toEqual(data);
        expect(mockRequestOptions.path.crn).toEqual(dnsRecordsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(dnsRecordsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDnsRecordTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsRecordsService.enableRetries();
        __createDnsRecordTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsRecordsService.disableRetries();
        __createDnsRecordTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDnsRecordParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsRecordsService.createDnsRecord(createDnsRecordParams);
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
      function __deleteDnsRecordTest() {
        // Construct the params object for operation deleteDnsRecord
        const dnsrecordIdentifier = 'testString';
        const deleteDnsRecordParams = {
          dnsrecordIdentifier,
        };

        const deleteDnsRecordResult = dnsRecordsService.deleteDnsRecord(deleteDnsRecordParams);

        // all methods should return a Promise
        expectToBePromise(deleteDnsRecordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/dns_records/{dnsrecord_identifier}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(dnsRecordsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(dnsRecordsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.dnsrecord_identifier).toEqual(dnsrecordIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDnsRecordTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsRecordsService.enableRetries();
        __deleteDnsRecordTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsRecordsService.disableRetries();
        __deleteDnsRecordTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dnsrecordIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDnsRecordParams = {
          dnsrecordIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsRecordsService.deleteDnsRecord(deleteDnsRecordParams);
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

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsRecordsService.deleteDnsRecord();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDnsRecord', () => {
    describe('positive tests', () => {
      function __getDnsRecordTest() {
        // Construct the params object for operation getDnsRecord
        const dnsrecordIdentifier = 'testString';
        const getDnsRecordParams = {
          dnsrecordIdentifier,
        };

        const getDnsRecordResult = dnsRecordsService.getDnsRecord(getDnsRecordParams);

        // all methods should return a Promise
        expectToBePromise(getDnsRecordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/dns_records/{dnsrecord_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(dnsRecordsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(dnsRecordsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.dnsrecord_identifier).toEqual(dnsrecordIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDnsRecordTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsRecordsService.enableRetries();
        __getDnsRecordTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsRecordsService.disableRetries();
        __getDnsRecordTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dnsrecordIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDnsRecordParams = {
          dnsrecordIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsRecordsService.getDnsRecord(getDnsRecordParams);
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

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsRecordsService.getDnsRecord();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDnsRecord', () => {
    describe('positive tests', () => {
      function __updateDnsRecordTest() {
        // Construct the params object for operation updateDnsRecord
        const dnsrecordIdentifier = 'testString';
        const type = 'A';
        const name = 'host-1.test-example.com';
        const ttl = 120;
        const content = '1.2.3.4';
        const priority = 5;
        const proxied = false;
        const data = { anyKey: 'anyValue' };
        const updateDnsRecordParams = {
          dnsrecordIdentifier,
          type,
          name,
          ttl,
          content,
          priority,
          proxied,
          data,
        };

        const updateDnsRecordResult = dnsRecordsService.updateDnsRecord(updateDnsRecordParams);

        // all methods should return a Promise
        expectToBePromise(updateDnsRecordResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/dns_records/{dnsrecord_identifier}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.ttl).toEqual(ttl);
        expect(mockRequestOptions.body.content).toEqual(content);
        expect(mockRequestOptions.body.priority).toEqual(priority);
        expect(mockRequestOptions.body.proxied).toEqual(proxied);
        expect(mockRequestOptions.body.data).toEqual(data);
        expect(mockRequestOptions.path.crn).toEqual(dnsRecordsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(dnsRecordsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.dnsrecord_identifier).toEqual(dnsrecordIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDnsRecordTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsRecordsService.enableRetries();
        __updateDnsRecordTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsRecordsService.disableRetries();
        __updateDnsRecordTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dnsrecordIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDnsRecordParams = {
          dnsrecordIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsRecordsService.updateDnsRecord(updateDnsRecordParams);
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

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await dnsRecordsService.updateDnsRecord();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('batchDnsRecords', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // BatchDnsRecordsRequestDeletesItem
      const batchDnsRecordsRequestDeletesItemModel = {
        id: 'testString',
      };

      // BatchDnsRecordsRequestPatchesItem
      const batchDnsRecordsRequestPatchesItemModel = {
        id: 'testString',
        name: 'host-1.test-example.com',
        type: 'A',
        ttl: 120,
        content: '1.2.3.4',
        priority: 5,
        proxied: false,
        data: { anyKey: 'anyValue' },
      };

      // DnsrecordInput
      const dnsrecordInputModel = {
        name: 'host-1.test-example.com',
        type: 'A',
        ttl: 120,
        content: '1.2.3.4',
        priority: 5,
        proxied: false,
        data: { anyKey: 'anyValue' },
      };

      // BatchDnsRecordsRequestPutsItem
      const batchDnsRecordsRequestPutsItemModel = {
        id: 'testString',
        name: 'host-1.test-example.com',
        type: 'A',
        ttl: 120,
        content: '1.2.3.4',
        priority: 5,
        proxied: false,
        data: { anyKey: 'anyValue' },
      };

      function __batchDnsRecordsTest() {
        // Construct the params object for operation batchDnsRecords
        const deletes = [batchDnsRecordsRequestDeletesItemModel];
        const patches = [batchDnsRecordsRequestPatchesItemModel];
        const posts = [dnsrecordInputModel];
        const puts = [batchDnsRecordsRequestPutsItemModel];
        const batchDnsRecordsParams = {
          deletes,
          patches,
          posts,
          puts,
        };

        const batchDnsRecordsResult = dnsRecordsService.batchDnsRecords(batchDnsRecordsParams);

        // all methods should return a Promise
        expectToBePromise(batchDnsRecordsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/dns_records/batch', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.deletes).toEqual(deletes);
        expect(mockRequestOptions.body.patches).toEqual(patches);
        expect(mockRequestOptions.body.posts).toEqual(posts);
        expect(mockRequestOptions.body.puts).toEqual(puts);
        expect(mockRequestOptions.path.crn).toEqual(dnsRecordsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(dnsRecordsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __batchDnsRecordsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        dnsRecordsService.enableRetries();
        __batchDnsRecordsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        dnsRecordsService.disableRetries();
        __batchDnsRecordsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const batchDnsRecordsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        dnsRecordsService.batchDnsRecords(batchDnsRecordsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        dnsRecordsService.batchDnsRecords({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
