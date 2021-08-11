/**
 * Copyright 2021 IBM All Rights Reserved.
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
let dnsZone;
const NEW_ZONE_NAME = '.testingsdk';
let dnsResourceRecord;
let permittedNW;
let glbMonitor;
let glbPool;
let glb;

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

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    dnsSvcsApisV1 = DNSSVCSApisV1.newInstance(options);
    expect(dnsSvcsApisV1).not.toBeNull();
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
  describe('Fetching the list all dns records', () => {
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
          'type': 'SRV',
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
          expect(result.type).toEqual(params.type);
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
});
