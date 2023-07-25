/**
 * Copyright 2023 IBM All Rights Reserved.
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

const DNSSVCSApisV1 = require('../../dist/dns-svcs/v1');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper');

const timeout = 120000; // two minutes

// Location of our config file.
const configFile = 'dns.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

// Retrieve the config file as an object.
// We do this because we're going to directly use the
// config properties, rather than let the SDK do it for us.
const config = authHelper.loadConfig();

// eslint-disable-next-line no-unused-vars
const poll = async (fn, fnCondition, sec) => {
  let result;
  let timerCount = 0;
  const pollInterval = 5;
  const maxIterations = Math.trunc(sec / pollInterval);

  // eslint-disable-next-line no-constant-condition
  let done = false;
  while (!done) {
    try {
      const response = await fn();
      result = response.result || {};

      if (timerCount >= maxIterations || fnCondition(result)) {
        done = true;
      }
    } catch (err) {
      result = err || {};
      if (timerCount >= maxIterations || fnCondition(result)) {
        done = true;
      }
    }

    if (!done) {
      await wait(pollInterval * 1000); // convert to seconds
      timerCount++;
    }
  }
  return result;
};

const wait = (ms = 5000) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

let dnsSvcsApisV1;
let dnsSvcsApisV1CrossAccountClient;
let dnsZone;
const NEW_ZONE_NAME = '.testingsdk';
let dnsResourceRecord;
let permittedNW;
let glbMonitor;
let glbPool;
let glb;
let customResolver;
let secondaryZone;
let linkedZone;
let request_id;
let permitted_network_id;
let customResolverLocation;
let forwardingRule;

describe('DNSSVCSApisV1', () => {
jest.setTimeout(timeout);

// Initialize the service client.
const options = {
  authenticator: new IamAuthenticator({
    apikey: config.DNS_SVCS_APIKEY,
    url: config.DNS_SVCS_AUTH_URL,
  }),
  crn: config.DNS_SVCS_CUSTOMER_LOCATION_SUBNET_CRN,
  serviceUrl: config.DNS_SVCS_URL,
  version: config.DNS_SERVICES_API_VERSION,
};

const optionsCrossAccount = {
  authenticator: new IamAuthenticator({
    apikey: config.DNS_SVCS_OWNER_APIKEY,
    url: config.DNS_SVCS_AUTH_URL,
  }),
  serviceUrl: config.DNS_SVCS_URL,
  version: config.DNS_SERVICES_API_VERSION,
};

test('should successfully complete initialization', done => {
  // Initialize the service client.
  dnsSvcsApisV1 = DNSSVCSApisV1.newInstance(options);
  expect(dnsSvcsApisV1).not.toBeNull();
  done();

  dnsSvcsApisV1CrossAccountClient = DNSSVCSApisV1.newInstance(optionsCrossAccount);
  expect(dnsSvcsApisV1CrossAccountClient).not.toBeNull();
  done();
});

describe('Create the zone', () => {
  test('should successfully created zone', async done => {
    try {
      const pathByDate = new Date().getTime();
      const params = {
        name: pathByDate + NEW_ZONE_NAME,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
      };
      const response = await dnsSvcsApisV1.createDnszone(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
        dnsZone = result;
        expect(dnsZone).toBeDefined();
        expect(dnsZone.name).toEqual(params.name);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('Fetching the list all dns zones', () => {
  test('should successfully list all dns zones', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
      };
      const response = await dnsSvcsApisV1.listDnszones(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result.length).toBeGreaterThanOrEqual(1);
        expect(result.result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('Fetch the dns zone', () => {
  test('should successfully get dns zone', async done => {
    try {
      const params = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
      };
      const response = await dnsSvcsApisV1.getDnszone(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        const localZone = result;
        expect(localZone).toBeDefined();
        expect(localZone.name).toEqual(dnsZone.name);
        expect(localZone.description).toEqual(dnsZone.description);
        expect(localZone.dnszoneId).toEqual(dnsZone.dnszoneId);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('Update the dns zone', () => {
  test('should successfully updated dns zone', async done => {
    try {
      const params = {
        description: 'updating the description.',
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
      };
      const response = await dnsSvcsApisV1.updateDnszone(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        const localZone = result;
        expect(localZone).toBeDefined();
        expect(localZone.name).toEqual(dnsZone.name);
        expect(localZone.description).toEqual(params.description);
        expect(localZone.dnszoneId).toEqual(params.dnszoneId);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// DNS Records ...
// Creating of DNS Records ...
describe('Create the DNS Records', () => {
  test('should successfully created DNS Record', async done => {
    try {
      const params = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        'name': 'test.example.com',
        'type': 'SRV',
        'rdata': {
          'priority': 100,
          'weight': 100,
          'port': 8000,
          'target': 'siphost.com',
        },
        'ttl': 120,
        'service': '_sip',
        'protocol': 'udp',
      };
      const response = await dnsSvcsApisV1.createResourceRecord(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      expect(result).toBeDefined();
      if (result) {
        dnsResourceRecord = result;
        expect(dnsResourceRecord).toBeDefined();
        expect(dnsResourceRecord.service).toEqual(params.service);
        expect(dnsResourceRecord.protocol).toEqual(params.protocol);
        expect(dnsResourceRecord.rdata).toEqual(params.rdata);
        expect(dnsResourceRecord.ttl).toEqual(params.ttl);
        expect(dnsResourceRecord.type).toEqual(params.type);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Fetching List of DNS Records ...
describe('Fetching the list of all dns records', () => {
  test('should successfully list all dns records', async done => {
    try {
      const params = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
      };
      const response = await dnsSvcsApisV1.listResourceRecords(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Fetching List of DNS Records of type SRV ...
describe('Fetching the list of all dns records', () => {
  test('should successfully list all dns records of type SRV', async done => {
    try {
      // List by type
      const listParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        type: 'SRV',
      };
      let listResponse = await dnsSvcsApisV1.listResourceRecords(listParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      let { result } = listResponse || {};

      expect(result).toBeDefined();
      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
        expect(result.resource_records[0].type).toEqual('SRV');
      }

      // List by name
      const listByNameParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        name: dnsResourceRecord.name,
      };
      listResponse = await dnsSvcsApisV1.listResourceRecords(listByNameParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
        expect(result.resource_records[0].name).toEqual(dnsResourceRecord.name);
      }

      done();
    } catch (err) {
      done(err);
    }
  });
});

// Create/list/delete 'A' type DNS Record
describe('Fetching the list of all dns records', () => {
  test('should successfully list all dns records of type A', async done => {
    try {
      // Create
      let resourceRecord;
      const createParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        'name': 'test-a',
        'type': 'A',
        'rdata': {
          'ip': '1.1.1.1',
        },
        'ttl': 120,
      };
      const createResponse = await dnsSvcsApisV1.createResourceRecord(createParams);
      expect(createResponse).toBeDefined();
      expect(createResponse.status).toEqual(200);

      let { result } = createResponse || {};
      expect(result).toBeDefined();
      if (result) {
        resourceRecord = result;
        expect(resourceRecord).toBeDefined();
        expect(resourceRecord.rdata).toEqual(createParams.rdata);
        expect(resourceRecord.ttl).toEqual(createParams.ttl);
        expect(resourceRecord.type).toEqual(createParams.type);
      }

      // List by type
      const listParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        type: 'A',
      };
      let listResponse = await dnsSvcsApisV1.listResourceRecords(listParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
        expect(result.resource_records[0].type).toEqual('A');
      }

      // List by name
      const listByNameParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        name: resourceRecord.name,
      };
      listResponse = await dnsSvcsApisV1.listResourceRecords(listByNameParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
        expect(result.resource_records[0].name).toEqual(resourceRecord.name);
      }

      // Delete
      const deleteParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        recordId: resourceRecord.id,
      };
      const deleteResponse = await dnsSvcsApisV1.deleteResourceRecord(deleteParams);
      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.status).toEqual(204);

      ({ result } = deleteResponse || {});
      if (result) {
        expect(result).toBeDefined();
      }

      done();
    } catch (err) {
      done(err);
    }
  });
});

// Create/list/delete 'AAAA' type DNS Record
describe('Fetching the list of all dns records', () => {
  test('should successfully list all dns records of type AAAA', async done => {
    try {
      // Create
      let resourceRecord;
      const createParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        'name': 'test-aaaa',
        'type': 'AAAA',
        'rdata': {
          'ip': '2001:db8:3333:4444:5555:6666:7777:8888',
        },
        'ttl': 120,
      };
      const createResponse = await dnsSvcsApisV1.createResourceRecord(createParams);
      expect(createResponse).toBeDefined();
      expect(createResponse.status).toEqual(200);

      let { result } = createResponse || {};
      expect(result).toBeDefined();
      if (result) {
        resourceRecord = result;
        expect(resourceRecord).toBeDefined();
        expect(resourceRecord.rdata).toEqual(createParams.rdata);
        expect(resourceRecord.ttl).toEqual(createParams.ttl);
        expect(resourceRecord.type).toEqual(createParams.type);
      }

      // List by type
      const listParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        type: 'AAAA',
      };
      let listResponse = await dnsSvcsApisV1.listResourceRecords(listParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
        expect(result.resource_records[0].type).toEqual('AAAA');
      }

      // List by name
      const listByNameParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        name: resourceRecord.name,
      };
      listResponse = await dnsSvcsApisV1.listResourceRecords(listByNameParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});
      expect(result).toBeDefined();
      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
        expect(result.resource_records[0].name).toEqual(resourceRecord.name);
      }

      // Delete
      const deleteParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        recordId: resourceRecord.id,
      };
      const deleteResponse = await dnsSvcsApisV1.deleteResourceRecord(deleteParams);
      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.status).toEqual(204);

      ({ result } = deleteResponse || {});
      if (result) {
        expect(result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Create/list/delete 'CNAME' type DNS Record
describe('Fetching the list of all dns records', () => {
  test('should successfully list all dns records of type CNAME', async done => {
    try {
      // Create
      let resourceRecord;
      const createParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        'name': 'test-cname',
        'type': 'CNAME',
        'rdata': {
          'cname': 'www.ibm.com',
        },
        'ttl': 120,
      };
      const createResponse = await dnsSvcsApisV1.createResourceRecord(createParams);
      expect(createResponse).toBeDefined();
      expect(createResponse.status).toEqual(200);

      let { result } = createResponse || {};
      expect(result).toBeDefined();
      if (result) {
        resourceRecord = result;
        expect(resourceRecord).toBeDefined();
        expect(resourceRecord.rdata).toEqual(createParams.rdata);
        expect(resourceRecord.ttl).toEqual(createParams.ttl);
        expect(resourceRecord.type).toEqual(createParams.type);
      }

      // List by type
      const listParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        type: 'CNAME',
      };
      let listResponse = await dnsSvcsApisV1.listResourceRecords(listParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
        expect(result.resource_records[0].type).toEqual('CNAME');
      }

      // List by name
      const listByNameParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        name: resourceRecord.name,
      };
      listResponse = await dnsSvcsApisV1.listResourceRecords(listByNameParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});
      expect(result).toBeDefined();
      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
        expect(result.resource_records[0].name).toEqual(resourceRecord.name);
      }

      // Delete
      const deleteParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        recordId: resourceRecord.id,
      };
      const deleteResponse = await dnsSvcsApisV1.deleteResourceRecord(deleteParams);
      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.status).toEqual(204);

      ({ result } = deleteResponse || {});
      if (result) {
        expect(result).toBeDefined();
      }

      done();
    } catch (err) {
      done(err);
    }
  });
});

// Create/list/delete 'TXT' type DNS Record
describe('Fetching the list of all dns records', () => {
  test('should successfully list all dns records of type TXT', async done => {
    try {
      // Create
      let resourceRecord;
      const createParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        'name': 'test-txt',
        'type': 'TXT',
        'rdata': {
          'text': 'Test message',
        },
        'ttl': 120,
      };
      const createResponse = await dnsSvcsApisV1.createResourceRecord(createParams);
      expect(createResponse).toBeDefined();
      expect(createResponse.status).toEqual(200);

      let { result } = createResponse || {};
      expect(result).toBeDefined();
      if (result) {
        resourceRecord = result;
        expect(resourceRecord).toBeDefined();
        expect(resourceRecord.rdata).toEqual(createParams.rdata);
        expect(resourceRecord.ttl).toEqual(createParams.ttl);
        expect(resourceRecord.type).toEqual(createParams.type);
      }

      // List by type
      const listParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        type: 'TXT',
      };
      let listResponse = await dnsSvcsApisV1.listResourceRecords(listParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
        expect(result.resource_records[0].type).toEqual('TXT');
      }

      // List by name
      const listByNameParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        name: resourceRecord.name,
      };
      listResponse = await dnsSvcsApisV1.listResourceRecords(listByNameParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});
      expect(result).toBeDefined();
      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
        expect(result.resource_records[0].name).toEqual(resourceRecord.name);
      }

      // Delete
      const deleteParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        recordId: resourceRecord.id,
      };
      const deleteResponse = await dnsSvcsApisV1.deleteResourceRecord(deleteParams);
      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.status).toEqual(204);

      ({ result } = deleteResponse || {});
      if (result) {
        expect(result).toBeDefined();
      }

      done();
    } catch (err) {
      done(err);
    }
  });
});

// Create/list/delete 'MX' type DNS Record
describe('Fetching the list of all dns records', () => {
  test('should successfully list all dns records of type MX', async done => {
    try {
      // Create
      let resourceRecord;
      const createParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        'name': 'test-mx',
        'type': 'MX',
        'rdata': {
          'exchange': 'mail.ibm.com',
          'preference': 1,
        },
        'ttl': 120,
      };
      const createResponse = await dnsSvcsApisV1.createResourceRecord(createParams);
      expect(createResponse).toBeDefined();
      expect(createResponse.status).toEqual(200);

      let { result } = createResponse || {};
      expect(result).toBeDefined();
      if (result) {
        resourceRecord = result;
        expect(resourceRecord).toBeDefined();
        expect(resourceRecord.rdata).toEqual(createParams.rdata);
        expect(resourceRecord.ttl).toEqual(createParams.ttl);
        expect(resourceRecord.type).toEqual(createParams.type);
      }

      // List by type
      const listParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        type: 'MX',
      };
      let listResponse = await dnsSvcsApisV1.listResourceRecords(listParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
        expect(result.resource_records[0].type).toEqual('MX');
      }

      // List by name
      const listByNameParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        name: resourceRecord.name,
      };
      listResponse = await dnsSvcsApisV1.listResourceRecords(listByNameParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});
      expect(result).toBeDefined();
      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
        expect(result.resource_records[0].name).toEqual(resourceRecord.name);
      }

      // Delete
      const deleteParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        recordId: resourceRecord.id,
      };
      const deleteResponse = await dnsSvcsApisV1.deleteResourceRecord(deleteParams);
      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.status).toEqual(204);

      ({ result } = deleteResponse || {});
      if (result) {
        expect(result).toBeDefined();
      }

      done();
    } catch (err) {
      done(err);
    }
  });
});

// Create/list/delete 'PTR' type DNS Record
describe('Fetching the list of all dns records', () => {
  test('should successfully list all dns records of type PTR', async done => {
    try {
      // Create
      let resourceRecord;
      let resourceRecordPTR;
      const createParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        'name': 'test-a',
        'type': 'A',
        'rdata': {
          'ip': '1.1.1.1',
        },
        'ttl': 120,
      };
      const createResponse = await dnsSvcsApisV1.createResourceRecord(createParams);
      expect(createResponse).toBeDefined();
      expect(createResponse.status).toEqual(200);

      let { result } = createResponse || {};
      expect(result).toBeDefined();
      if (result) {
        resourceRecord = result;
        expect(resourceRecord).toBeDefined();
        expect(resourceRecord.rdata).toEqual(createParams.rdata);
        expect(resourceRecord.ttl).toEqual(createParams.ttl);
        expect(resourceRecord.type).toEqual(createParams.type);
      }

      const createParamsPTR = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        'name': '1.1.1.1',
        'type': 'PTR',
        'rdata': {
          'ptrdname': resourceRecord.name,
        },
        'ttl': 120,
      };
      const createResponsePTR = await dnsSvcsApisV1.createResourceRecord(createParamsPTR);
      expect(createResponsePTR).toBeDefined();
      expect(createResponsePTR.status).toEqual(200);

      ({ result } = createResponsePTR || {});
      expect(result).toBeDefined();
      if (result) {
        resourceRecordPTR = result;
        expect(resourceRecordPTR).toBeDefined();
        expect(resourceRecordPTR.rdata).toEqual(createParamsPTR.rdata);
        expect(resourceRecordPTR.ttl).toEqual(createParamsPTR.ttl);
        expect(resourceRecordPTR.type).toEqual(createParamsPTR.type);
      }

      // List by type
      const listParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        type: 'PTR',
      };
      let listResponse = await dnsSvcsApisV1.listResourceRecords(listParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
        expect(result.resource_records[0].type).toEqual('PTR');
      }

      // List by name
      const listByNameParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        name: resourceRecordPTR.name,
      };
      listResponse = await dnsSvcsApisV1.listResourceRecords(listByNameParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.resource_records) {
        expect(result.resource_records.length).toBeGreaterThanOrEqual(1);
        expect(result).toBeDefined();
        expect(result.total_count).toBeGreaterThanOrEqual(1);
        expect(result.resource_records[0].name).toEqual(resourceRecordPTR.name);
      }

      // Delete PTR
      const deleteParamsPTR = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        recordId: resourceRecordPTR.id,
      };
      const deleteResponsePTR = await dnsSvcsApisV1.deleteResourceRecord(deleteParamsPTR);
      expect(deleteResponsePTR).toBeDefined();
      expect(deleteResponsePTR.status).toEqual(204);

      ({ result } = deleteResponsePTR || {});
      if (result) {
        expect(result).toBeDefined();
      }

      // Delete A record
      const deleteParams = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        recordId: resourceRecord.id,
      };
      const deleteResponse = await dnsSvcsApisV1.deleteResourceRecord(deleteParams);
      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.status).toEqual(204);

      ({ result } = deleteResponse || {});
      if (result) {
        expect(result).toBeDefined();
      }

      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('Fetch the dns zone resource record', () => {
  test('should successfully get dns zone resource record', async done => {
    try {
      const params = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        recordId: dnsResourceRecord.id,
      };
      const response = await dnsSvcsApisV1.getResourceRecord(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result) {
        expect(result).toBeDefined();
        expect(result.service).toEqual(dnsResourceRecord.service);
        expect(result.protocol).toEqual(dnsResourceRecord.protocol);
        expect(result.rdata).toEqual(dnsResourceRecord.rdata);
        expect(result.ttl).toEqual(dnsResourceRecord.ttl);
        expect(result.type).toEqual(dnsResourceRecord.type);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('Update the dns zone resource record', () => {
  test('should successfully updated dns zone resource record', async done => {
    try {
      const params = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        recordId: dnsResourceRecord.id,
        'name': 'test.example.com-testing',
        'rdata': {
          'priority': 110,
          'weight': 110,
          'port': 8010,
          'target': 'siphost.com',
        },
        'ttl': 3600,
        'service': '_sip',
        'protocol': 'udp',
      };
      const response = await dnsSvcsApisV1.updateResourceRecord(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result).toBeDefined();
        expect(result.service).toEqual(params.service);
        expect(result.protocol).toEqual(params.protocol);
        expect(result.rdata).toEqual(params.rdata);
        expect(result.ttl).toEqual(params.ttl);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Import dns zone resource record
describe('Import the dns zone resource record', () => {
  test('should successfully Import dns zone resource record', async done => {
    try {
      const params = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        file: Buffer.from('exampletest.com 1 IN AAAA 2001::888'),
        fileContentType: 'testString',
        xCorrelationId: 'testString',
      };
      const response = await dnsSvcsApisV1.importResourceRecords(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      if (result) {
        expect(result).toBeDefined();
        expect(result.total_records_parsed).toEqual(1);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Export dns zone resource record
describe('Export the dns zone resource record', () => {
  test('should successfully Export dns zone resource record', async done => {
    try {
      const params = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        xCorrelationId: 'testString',
      };
      const response = await dnsSvcsApisV1.exportResourceRecords(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      if (result) {
        expect(result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('Delete the dns zone resource record', () => {
  test('should successfully deleted dns zone resource record', async done => {
    try {
      const params = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        recordId: dnsResourceRecord.id,
      };
      const response = await dnsSvcsApisV1.deleteResourceRecord(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(204);

      const { result } = response || {};
      if (result) {
        expect(result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Permitted Network ...
// Create a permitted network for a given DNS zone ...
describe('Create a permitted network for a given DNS zone', () => {
  test('should successfully created a permitted network for a given DNS zone', async done => {
    try {
      const params = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        type: 'vpc',
        permittedNetwork: {
          'vpc_crn': config.DNS_SVCS_VPC_CRN,
        },
      };
      const response = await dnsSvcsApisV1.createPermittedNetwork(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        permittedNW = result;
        expect(permittedNW.type).toEqual(params.type);
        expect(permittedNW.permitted_network).toEqual(params.permittedNetwork);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// List the permitted networks for a given DNS zone ...
describe('Fetching the permitted networks for a given DNS zone', () => {
  test('should successfully list permitted networks for a given DNS zone', async done => {
    try {
      const params = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
      };
      const response = await dnsSvcsApisV1.listPermittedNetworks(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.permitted_networks) {
        expect(result.permitted_networks).toBeDefined();
        expect(result.permitted_networks.length).toBeGreaterThanOrEqual(1);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

describe('Get details of a permitted network', () => {
  test('should successfully get details of a permitted network', async done => {
    try {
      const params = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        permittedNetworkId: permittedNW.id,
      };
      const response = await dnsSvcsApisV1.getPermittedNetwork(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result) {
        expect(result).toBeDefined();
        expect(result.type).toEqual(permittedNW.type);
        expect(result.permitted_network.vpc_crn).toEqual(config.DNS_SVCS_VPC_CRN);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Remove a permitted network ...
describe('Remove a permitted network', () => {
  test('should successfully removed a permitted network', async done => {
    try {
      const params = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        permittedNetworkId: permittedNW.id,
      };
      const response = await dnsSvcsApisV1.deletePermittedNetwork(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(202);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result.id).toEqual(permittedNW.id);
        expect(result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Global Load Balancer - Monitor
describe('Create load balancer monitor', () => {
  test('should successfully create load balancer monitor', async done => {
    // create GLB monitor
    try {
      const pathByDate = new Date().getTime();
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        name: 'sdkMonitor' + pathByDate,
        type: 'HTTP',
        description: 'PDNS Load balancer monitor.',
        port: 8080,
        interval: 60,
        retries: 2,
        timeout: 5,
        method: 'GET',
        path: 'health',
        allowInsecure: false,
        expectedCodes: '200',
        expectedBody: 'alive',
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.createMonitor(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
        glbMonitor = result;
        expect(glbMonitor).toBeDefined();
        expect(glbMonitor.name).toEqual(params.name);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Test Get Monitor
describe('Get load balancer monitor', () => {
  test('should successfully get load balancer monitor', async done => {
    // create GLB monitor
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        monitorId: glbMonitor.id,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.getMonitor(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        const localMonitor = result;
        expect(localMonitor).toBeDefined();
        expect(localMonitor.name).toEqual(glbMonitor.name);
        expect(localMonitor.description).toEqual(glbMonitor.description);
        expect(localMonitor.monitorId).toEqual(glbMonitor.monitorId);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Test List load balancer monitors
describe('List load balancer monitors', () => {
  test('should successfully list load balancer monitors', async done => {
    // List GLB monitors
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.listMonitors(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result.length).toBeGreaterThanOrEqual(1);
        expect(result.result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Test- Update load balacer - monitor
describe('Update load balancer monitor', () => {
  test('should successfully update load balancer monitor', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        monitorId: glbMonitor.id,
        description: 'Update Description - SDK Test',
        name: 'UpdatedSDK-Test',
        xCorrelationId: 'abc123',
      };
      const response = await dnsSvcsApisV1.updateMonitor(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        const localMonitor = result;
        expect(localMonitor).toBeDefined();
        expect(localMonitor.name).toEqual(params.name);
        expect(localMonitor.description).toEqual(params.description);
        expect(localMonitor.id).toEqual(params.monitorId);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Create load balancer pool
describe('Create load balancer pool', () => {
  test('should successfully created load balancer pool', async done => {
    // create GLB monitor
    try {
      const pathByDate = new Date().getTime();
      // OriginInput
      const originInputModel = {
        name: 'app-server-1',
        description: 'description of the origin server',
        address: '10.10.16.8',
        enabled: true,
      };
      // Construct the params object for operation createPool
      const name = 'sdk-test-pool' + pathByDate;
      const origins = [originInputModel];
      const description = 'Load balancer pool for sdk test zone.';
      const enabled = true;
      const healthyOriginsThreshold = 1;
      const monitor = glbMonitor.id;
      const healthcheckRegion = 'us-south';
      const healthcheckSubnets = [config.DNS_SVCS_SUBNET_CRN];
      const xCorrelationId = 'abc123';
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        name: name,
        origins: origins,
        description: description,
        enabled: enabled,
        healthyOriginsThreshold: healthyOriginsThreshold,
        monitor: monitor,
        healthcheckRegion: healthcheckRegion,
        healthcheckSubnets: healthcheckSubnets,
        xCorrelationId: xCorrelationId,
      };

      const response = await dnsSvcsApisV1.createPool(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
        glbPool = result;
        expect(glbPool).toBeDefined();
        expect(glbPool.name).toEqual(params.name);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Test - List load balancer pools
describe('List load balancer pools', () => {
  test('should successfully list load balancer pools', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        xCorrelationId: 'abc123',
      };
      const response = await dnsSvcsApisV1.listPools(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result.length).toBeGreaterThanOrEqual(1);
        expect(result.result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Test - Get load balancer pool
describe('Get load balancer pool', () => {
  test('should successfully get load balancer pool', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        poolId: glbPool.id,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.getPool(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        const localPool = result;
        expect(localPool).toBeDefined();
        expect(localPool).toEqual(glbPool.name);
        expect(localPool.description).toEqual(glbPool.description);
        expect(localPool.poolId).toEqual(params.poolId);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Update Global Load balancer Pool
describe('Update load balancer pool', () => {
  test('should successfully Update load balancer pool', async done => {
    try {
      // OriginInput
      const originInputModel = {
        name: 'app-server-1',
        description: 'description of the origin server',
        address: '10.10.16.8',
        enabled: true,
      };
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        poolId: glbPool.id,
        name: 'updatedtestpool',
        description: 'updating testPool',
        enabled: true,
        origins: [originInputModel],
        monitor: glbMonitor.id,
        healthcheckRegion: 'us-south',
        healthcheckSubnets: [config.DNS_SVCS_SUBNET_CRN],
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.updatePool(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        const localPool = result;
        expect(localPool).toBeDefined();
        expect(localPool.name).toEqual(params.name);
        expect(localPool.description).toEqual(params.description);
        expect(localPool.poolId).toEqual(params.poolId);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
//  GLB
// Test - Create load balancer
describe('Create load balancer', () => {
  test('should successfully created load balancer', async done => {
    // Test - Create GLB
    try {
      const pathByDate = new Date().getTime();
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        dnszoneId: dnsZone.id,
        name: 'testloadbalancer' + pathByDate,
        fallbackPool: glbPool.id,
        defaultPools: [glbPool.id],
        description: 'PDNS Load balancer',
        enabled: true,
        ttl: 120,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.createLoadBalancer(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
        glb = result;
        expect(glb).toBeDefined();
        expect(glb.name).toContain(params.name);
        // expect(glb).toEqual({});
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Test - List load balancers
describe('List load balancers', () => {
  test('should successfully list load balancers', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        dnszoneId: dnsZone.id,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.listLoadBalancers(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result.length).toBeGreaterThanOrEqual(1);
        expect(result.result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Test - Get a load balancer
describe('Get a load balancer', () => {
  test('should successfully get a load balancer', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        dnszoneId: dnsZone.id,
        lbId: glb.id,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.getLoadBalancer(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        const localGlb = result;
        expect(localGlb).toBeDefined();
        expect(localGlb.name).toEqual(glb.name);
        expect(localGlb.description).toEqual(glb.description);
        expect(localGlb.id).toEqual(glb.id);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Test - Update GLB
describe('Update the dns zone', () => {
  test('should successfully updated dns zone', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        dnszoneId: dnsZone.id,
        lbId: glb.id,
        name: 'updateLoadBalancer',
        description: 'updating Load Balancer',
        ttl: 300,
        fallbackPool: glbPool.id,
        defaultPools: [glbPool.id],
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.updateLoadBalancer(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        const localGlb = result;
        expect(localGlb).toBeDefined();
        expect(localGlb.name).toEqual(params.name);
        expect(localGlb.description).toEqual(params.description);
        expect(localGlb.ttl).toEqual(params.ttl);
        expect(localGlb.id).toEqual(params.lbId);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Test - Delete GLB
describe('Delete load balancer', () => {
  test('should successfully Delete load balancer', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        dnszoneId: dnsZone.id,
        lbId: glb.id,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.deleteLoadBalancer(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(204);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result.id).toEqual(glb.id);
        expect(result.result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Delete a pool
describe('Delete load balancer pool', () => {
  test('should successfully delete load balancer pool', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        poolId: glbPool.id,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.deletePool(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(204);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result.id).toEqual(glbPool.id);
        expect(result.result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Test - Delete load balancer monitor
describe('Delete load balancer monitor', () => {
  test('should successfully deleted load balancer monitor', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        monitorId: glbMonitor.id,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.deleteMonitor(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(204);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result.id).toEqual(glbMonitor.id);
        expect(result.result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Test - Create a custom resolver
describe('Create a custom resolver', () => {
  test('should successfully created a custom resolver', async done => {
    try {
      const pathByDate = new Date().getTime();
      const locationInputModel = {
        subnet_crn: config.DNS_SVCS_CUSTOMER_LOCATION_SUBNET_CRN,
        enabled: false,
      };
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        name: 'test-resolver' + pathByDate,
        description: 'SDK test custom resolver',
        locations: [locationInputModel],
        xCorrelationId: 'abc123',
      };
      const response = await dnsSvcsApisV1.createCustomResolver(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
        customResolver = result;
        expect(customResolver).toBeDefined();
        expect(customResolver.name).toEqual(params.name);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Test - List custom resolvers
describe('List custom resolvers', () => {
  test('should successfully list custom resolvers', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        xCorrelationId: 'abc123',
      };
      const response = await dnsSvcsApisV1.listCustomResolvers(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      if (result && result.result) {
        expect(result.result.length).toBeGreaterThanOrEqual(1);
        expect(result.result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Test - Get a custom resolver
describe('Get a custom resolver', () => {
  test('should successfully get a custom resolver', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        xCorrelationId: 'abc123',
      };
      const response = await dnsSvcsApisV1.getCustomResolver(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      if (result && result.result) {
        const localResolver = result;
        expect(localResolver).toBeDefined();
        expect(localResolver.name).toEqual(customResolver.name);
        expect(localResolver.description).toEqual(customResolver.description);
        expect(localResolver.id).toEqual(customResolver.id);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Test - Update Custom Resolver
describe('Update the properties of a custom resolver', () => {
  test('should successfully update the properties of a custom resolver', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        name: 'SDK-resolverUpdateName',
        description: 'SDK updating the description.',
        enabled: false,
        xCorrelationId: 'abc123',
      };
      const response = await dnsSvcsApisV1.updateCustomResolver(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      if (result && result.result) {
        const localResolver = result;
        expect(localResolver).toBeDefined();
        expect(localResolver.name).toEqual(params.name);
        expect(localResolver.description).toEqual(params.description);
        expect(localResolver.id).toEqual(params.resolverId);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Test - Update the locations order of a custom resolver
describe('Update the locations order of a custom resolver', () => {
  test('should successfully Update the locations order of a custom resolver', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        xCorrelationId: 'abc123',
        locations: [customResolver.locations[0].id],
      };
      const response = await dnsSvcsApisV1.updateCrLocationsOrder(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      if (result && result.result) {
        const localResolver = result;
        expect(localResolver).toBeDefined();
        expect(localResolver.id).toEqual(params.resolverId);
        expect(localResolver.locations).toEqual(params.locations);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Add a custom resolver loction
describe('Add custom resolver location   ', () => {
  test('should successfully add a custom resolver location', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        subnetCrn: config.DNS_SVCS_CUSTOMER_LOCATION_SUBNET_CRN,
        enabled: true,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.addCustomResolverLocation(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result) {
        customResolverLocation = result;
        expect(customResolverLocation).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Update Custom Resolver Location
describe('Update custom resolver location', () => {
  test('should successfully update the custom resolver location', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        locationId: customResolverLocation.id,
        enabled: false,
        subnetCrn: config.DNS_SVCS_CUSTOMER_LOCATION_SUBNET_CRN,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.updateCustomResolverLocation(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        const localResolverLocation = result;
        expect(localResolverLocation).toBeDefined();
        expect(localResolverLocation.id).toEqual(params.locationId);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Create a forwarding rule
describe('Create a forwarding rule', () => {
  test('should successfully Create a forwarding rule for the given custom resolver   ', async done => {
    try {
      // const pathByDate = new Date().getTime();

      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        type: 'zone',
        match: 'example.com',
        forwardTo: ['161.26.0.7'],
        description: 'forwarding rule',
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.createForwardingRule(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
        forwardingRule = result;
        expect(forwardingRule).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// List forwarding rules
describe('List the forwarding rules of the given custom resolver  ', () => {
  test('should successfully list the forwarding rules of the given custom resolver', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.listForwardingRules(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result.length).toBeGreaterThanOrEqual(1);
        expect(result.result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// List forwarding rules with offset and limit
describe('List the forwarding rules of the given custom resolver  ', () => {
  test('should successfully list the forwarding rules of the given custom resolver with given offset and limit', async done => {
    try {
      // Create another forwarding rule
      let forwardingRule2;
      const createParams = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        type: 'zone',
        match: 'example2.com',
        forwardTo: ['161.26.0.8'],
        description: 'second forwarding rule',
        xCorrelationId: 'abc1234',
      };

      const createResponse = await dnsSvcsApisV1.createForwardingRule(createParams);
      expect(createResponse).toBeDefined();
      expect(createResponse.status).toEqual(200);

      let { result } = createResponse || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
        forwardingRule2 = result;
        expect(forwardingRule2).toBeDefined();
      }

      // List forwarding rule
      // offset = 0 and limit = default
      let listParams = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        xCorrelationId: 'abc123',
        offset: 0,
      };

      let listResponse = await dnsSvcsApisV1.listForwardingRules(listParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.forwarding_rules) {
        expect(result.forwarding_rules.length).toBeGreaterThanOrEqual(1);
        expect(result.forwarding_rules).toBeDefined();
        expect(result.offset).toEqual(listParams.offset);
        expect(result.count).toEqual(3);
      }

      // List forwarding rule
      // offset = 1 and limit = default
      listParams = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        xCorrelationId: 'abc123',
        offset: 1,
      };

      listResponse = await dnsSvcsApisV1.listForwardingRules(listParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.forwarding_rules) {
        expect(result.forwarding_rules.length).toBeGreaterThanOrEqual(1);
        expect(result.forwarding_rules).toBeDefined();
        expect(result.offset).toEqual(listParams.offset);
        expect(result.count).toEqual(2);
      }

      // List forwarding rule
      // offset = 3 and limit = default
      listParams = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        xCorrelationId: 'abc123',
        offset: 3,
      };

      listResponse = await dnsSvcsApisV1.listForwardingRules(listParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.forwarding_rules) {
        expect(result.forwarding_rules.length).toBeGreaterThanOrEqual(0);
        expect(result.forwarding_rules).toBeDefined();
        expect(result.offset).toEqual(listParams.offset);
        expect(result.count).toEqual(0);
      }

      // List forwarding rule
      // offset = default and limit = 1
      listParams = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        xCorrelationId: 'abc123',
        offset: 0,
        limit: 1,
      };

      listResponse = await dnsSvcsApisV1.listForwardingRules(listParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.forwarding_rules) {
        expect(result.forwarding_rules.length).toBeGreaterThanOrEqual(1);
        expect(result.forwarding_rules).toBeDefined();
        expect(result.limit).toEqual(listParams.limit);
        expect(result.count).toEqual(1);
      }

      // List forwarding rule
      // offset = default and limit = 2
      listParams = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        xCorrelationId: 'abc123',
        offset: 0,
        limit: 2,
      };

      listResponse = await dnsSvcsApisV1.listForwardingRules(listParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.forwarding_rules) {
        expect(result.forwarding_rules.length).toBeGreaterThanOrEqual(1);
        expect(result.forwarding_rules).toBeDefined();
        expect(result.limit).toEqual(listParams.limit);
        expect(result.count).toEqual(2);
      }

      // List forwarding rule
      // offset = 1 and limit = 2
      listParams = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        xCorrelationId: 'abc123',
        offset: 1,
        limit: 2,
      };

      listResponse = await dnsSvcsApisV1.listForwardingRules(listParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.forwarding_rules) {
        expect(result.forwarding_rules.length).toBeGreaterThanOrEqual(1);
        expect(result.forwarding_rules).toBeDefined();
        expect(result.limit).toEqual(listParams.limit);
        expect(result.offset).toEqual(listParams.offset);
        expect(result.count).toEqual(2);
      }

      // List forwarding rule
      // offset = 0 and limit = 200
      listParams = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        xCorrelationId: 'abc123',
        offset: 0,
        limit: 200,
      };

      listResponse = await dnsSvcsApisV1.listForwardingRules(listParams);
      expect(listResponse).toBeDefined();
      expect(listResponse.status).toEqual(200);

      ({ result } = listResponse || {});

      expect(result).toBeDefined();
      if (result && result.forwarding_rules) {
        expect(result.forwarding_rules.length).toBeGreaterThanOrEqual(1);
        expect(result.forwarding_rules).toBeDefined();
        expect(result.limit).toEqual(listParams.limit);
        expect(result.offset).toEqual(listParams.offset);
        expect(result.count).toEqual(3);
      }

      // Delete second forwarding rule
      const deleteParams = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        ruleId: forwardingRule2.id,
        xCorrelationId: 'abc123',
      };

      const deleteResponse = await dnsSvcsApisV1.deleteForwardingRule(deleteParams);
      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.status).toEqual(204);
      ({ result } = deleteResponse || {});

      expect(result).toBeDefined();
      if (result && result.result) {
        expect(result.result.id).toEqual(deleteParams.ruleId);
        expect(result.result).toBeDefined();
      }

      done();
    } catch (err) {
      done(err);
    }
  });
});

// Get details of a forwarding rule
describe('Get details of a forwarding rule on the given custom resolver  ', () => {
  test('should successfully get details of forwarding rules', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        ruleId: forwardingRule.id,
        xCorrelationId: 'abc123',
      };
      const response = await dnsSvcsApisV1.getForwardingRule(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        const localForwardingRule = result.result;
        expect(localForwardingRule).toBeDefined();
        expect(localForwardingRule.id).toEqual(params.ruleId);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Update properties of a forwarding rule on the given custom resolver.
describe('Update forwarding rule on the given custom resolver', () => {
  test('should successfully update properties of a forwarding rule', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        ruleId: forwardingRule.id,
        description: 'update forwarding rule',
        match: 'example.com',
        forwardTo: ['161.26.0.8'],
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.updateForwardingRule(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        const localForwardingRule = result;
        expect(localForwardingRule).toBeDefined();
        expect(localForwardingRule.id).toEqual(params.ruleId);
        expect(localForwardingRule.description).toEqual(params.description);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Create secondary zone on the given custom resolver.
describe('Create secondary zone on the given custom resolver', () => {
  test('should successfully Create secondary zone on the given custom resolver', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        zone: 'testexample.com',
        transferFrom: ['10.0.0.7'],
        enabled: false,
        description: 'secondary zone',
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.createSecondaryZone(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        secondaryZone = result;
        expect(secondaryZone).toBeDefined();
        expect(secondaryZone.zone).toEqual(params.zone);
        expect(secondaryZone.enabled).toEqual(params.enabled);
        expect(secondaryZone.description).toEqual(params.description);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// List secondary zone on the given custom resolver.
describe('List secondary zone on the given custom resolver', () => {
  test('should successfully list secondary zone on the given custom resolver', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        offset: 0,
        limit: 200,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.listSecondaryZones(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
        expect(result.offset).toEqual(params.offset);
        expect(result.limit).toEqual(params.limit);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Get secondary zone on the given custom resolver.
describe('Get secondary zone on the given custom resolver', () => {
  test('should successfully get secondary zone on the given custom resolver', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        secondaryZoneId: secondaryZone.id,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.getSecondaryZone(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
        expect(result.id).toEqual(params.secondaryZoneId);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Update secondary zone on the given custom resolver.
describe('Update secondary zone on the given custom resolver', () => {
  test('should successfully update secondary zone on the given custom resolver', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        secondaryZoneId: secondaryZone.id,
        transferFrom: ['10.0.0.8'],
        enabled: false,
        description: 'update secondary zone',
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.updateSecondaryZone(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        const secondaryZone = result;
        expect(secondaryZone).toBeDefined();
        expect(secondaryZone.enabled).toEqual(params.enabled);
        expect(secondaryZone.description).toEqual(params.description);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Delete secondary zone on the given custom resolver.
describe('Delete secondary zone on the given custom resolver', () => {
  test('should successfully delete secondary zone on the given custom resolver', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        secondaryZoneId: secondaryZone.id,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.deleteSecondaryZone(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(204);

      const { result } = response || {};
      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
        expect(result.id).toEqual(params.secondaryZoneId);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Delete a forwarding rule
describe('Delete a forwarding rule on the given custom resolver', () => {
  test('should successfully delete a forwarding rule', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        ruleId: forwardingRule.id,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.deleteForwardingRule(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(204);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result.id).toEqual(params.ruleId);
        expect(result.result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Delete a Custom Resolver Location
describe('Delete custom resolver location', () => {
  test('should successfully delete a custom resolver location', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        locationId: customResolverLocation.id,
        xCorrelationId: 'abc123',
      };

      const response = await dnsSvcsApisV1.deleteCustomResolverLocation(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(204);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result && result.result) {
        expect(result.result.id).toEqual(customResolverLocation.id);
        expect(result.result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
// Test - Delete a Custom Resolver
describe('Delete a custom resolver', () => {
  test('should successfully delete a custom resolver', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        resolverId: customResolver.id,
        xCorrelationId: 'abc123',
      };
      const response = await dnsSvcsApisV1.deleteCustomResolver(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(204);
      const { result } = response || {};
      expect(result).toBeDefined();
      if (result && result.result) {
        expect(result.result.id).toEqual(customResolver.id);
        expect(result.result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Test - Delete a zone
describe('Delete the dns zone', () => {
  test('should successfully deleted dns zone', async done => {
    try {
      const params = {
        dnszoneId: dnsZone.id,
        instanceId: config.DNS_SVCS_INSTANCE_ID,
      };
      const response = await dnsSvcsApisV1.deleteDnszone(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(204);

      const { result } = response || {};

      expect(result).toBeDefined();

      if (result) {
        expect(result).toBeDefined();
        expect(result.id).toEqual(dnsZone.id);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Cross Account
// Create Linked zones
describe('Create linked zone', () => {
  test('should successfully Create linked zone', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        ownerInstanceId: config.DNS_SVCS_OWNER_INSTANCE_ID,
        ownerZoneId: config.DNS_SVCS_OWNER_ZONE_ID,
        description: 'linked zone',
        label: 'dev',
        xCorrelationId: 'create-linked-zone-sdk-at123',
      };

      const response = await dnsSvcsApisV1.createLinkedZone(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        linkedZone = result;
        expect(linkedZone).toBeDefined();
        expect(linkedZone.linked_to.zone_id).toEqual(params.ownerZoneId);
        expect(linkedZone.label).toEqual(params.label);
        expect(linkedZone.description).toEqual(params.description);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// List Linked zones
describe('List linked zone', () => {
  test('should successfully list linked zone', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        offset: 0,
        limit: 200,
        xCorrelationId: 'list-linked-zone-sdk-at123',
      };

      const response = await dnsSvcsApisV1.listLinkedZones(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
        expect(result.offset).toEqual(params.offset);
        expect(result.limit).toEqual(params.limit);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Get Linked zones
describe('Get linked zone', () => {
  test('should successfully get linked zone', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        linkedDnszoneId: linkedZone.id,
        xCorrelationId: 'get-linked-zone-sdk-at123',
      };

      const response = await dnsSvcsApisV1.getLinkedZone(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
        expect(result.id).toEqual(params.linkedDnszoneId);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Update Linked zones
describe('Update linked zone', () => {
  test('should successfully update linked zone', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        linkedDnszoneId: linkedZone.id,
        description: 'update linked zone',
        label: 'update-dev',
        xCorrelationId: 'update-linked-zone-sdk-at123',
      };

      const response = await dnsSvcsApisV1.updateLinkedZone(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
        expect(result.id).toEqual(params.linkedDnszoneId);
        expect(result.description).toEqual(params.description);
        expect(result.label).toEqual(params.label);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// List Access Requests
describe('List access requests', () => {
  test('should successfully list access requests', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_OWNER_INSTANCE_ID,
        dnszoneId: config.DNS_SVCS_OWNER_ZONE_ID,
        offset: 0,
        limit: 200,
        xCorrelationId: 'list-access-request-sdk-at123',
      };

      const response = await dnsSvcsApisV1CrossAccountClient.listDnszoneAccessRequests(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        request_id = result.access_requests[0]['id'];
        expect(result).toBeDefined();
        expect(result.offset).toEqual(params.offset);
        expect(result.limit).toEqual(params.limit);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Get Access Requests
describe('Get access requests', () => {
  test('should successfully list access requests', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_OWNER_INSTANCE_ID,
        dnszoneId: config.DNS_SVCS_OWNER_ZONE_ID,
        requestId: request_id,
        xCorrelationId: 'get-access-request-sdk-at123',
      };

      const response = await dnsSvcsApisV1CrossAccountClient.getDnszoneAccessRequest(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Update the state of an access request
describe('Update the state of an access request', () => {
  test('should successfully Update the state of an access request', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_OWNER_INSTANCE_ID,
        dnszoneId: config.DNS_SVCS_OWNER_ZONE_ID,
        requestId: request_id,
        action: 'APPROVE',
        xCorrelationId: 'update-access-request-sdk-at123',
      };

      const response = await dnsSvcsApisV1CrossAccountClient.updateDnszoneAccessRequest(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Create a permitted network for a linked zone
describe('Create a permitted network for a linked zone', () => {
  test('should successfully Create a permitted network for a linked zone', async done => {
    try {
      const permittedNetworkVpcModel = {
        vpc_crn: config.DNS_SVCS_VPC_CRN_LZ_PERMITTED_NETWORK,
      };
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        linkedDnszoneId: linkedZone.id,
        type: 'vpc',
        permittedNetwork: permittedNetworkVpcModel,
        xCorrelationId: 'create-permitted-network-sdk-at123',
      };

      const response = await dnsSvcsApisV1.createLzPermittedNetwork(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        permitted_network_id = result.id;
        expect(result).toBeDefined();
        expect(result.type).toEqual(params.type);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// List the permitted networks for a linked zone
describe('List the permitted networks for a linked zone', () => {
  test('should successfully List the permitted networks for a linked zone', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        linkedDnszoneId: linkedZone.id,
        xCorrelationId: 'list-permitted-network-sdk-at123',
      };

      const response = await dnsSvcsApisV1.listLinkedPermittedNetworks(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Get a permitted networks for a linked zone
describe('Get a permitted networks for a linked zone', () => {
  test('should successfully Get a permitted networks for a linked zone', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        linkedDnszoneId: linkedZone.id,
        xCorrelationId: 'get-permitted-network-sdk-at123',
        permittedNetworkId: permitted_network_id,
      };

      const response = await dnsSvcsApisV1.getLinkedPermittedNetwork(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Remove a permitted networks for a linked zone
describe('Remove a permitted networks for a linked zone', () => {
  test('should successfully remove a permitted networks for a linked zone', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        linkedDnszoneId: linkedZone.id,
        xCorrelationId: 'delete-permitted-network-sdk-at123',
        permittedNetworkId: permitted_network_id,
      };

      const response = await dnsSvcsApisV1.deleteLzPermittedNetwork(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(202);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});

// Delete Linked zones
describe('delete linked zone', () => {
  test('should successfully delete linked zone', async done => {
    try {
      const params = {
        instanceId: config.DNS_SVCS_INSTANCE_ID,
        linkedDnszoneId: linkedZone.id,
        xCorrelationId: 'list-linked-zone-sdk-at123',
      };

      const response = await dnsSvcsApisV1.deleteLinkedZone(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(204);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result) {
        expect(result).toBeDefined();
        expect(result.id).toEqual(params.linkedDnszoneId);
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});
});
