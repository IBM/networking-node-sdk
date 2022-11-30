/**
 * Copyright 2019 IBM All Rights Reserved.
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
/*

How to run this test:     

npm run test-integration
    or
jest test/integration/transit-gateway.v1.test.js or
./node_modules/.bin/jest test/integration/transit-gateway.v1.test.js

*/

'use strict';

const TransitGatewayApisV1 = require('../../dist/transit-gateway-apis/v1');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

const timeout = 120000; // two minutes

// Location of our config file.
const configFile = 'transit.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

// Retrieve the config file as an object.
// We do this because we're going to directly use the
// config properties, rather than let the SDK do it for us.
const config = authHelper.loadConfig();

let RR_INSTANCE_ID;
let GATEWAY_INSTANCE_ID;
let DL_CONN_INSTANCE_ID;
let VPC_CONN_INSTANCE_ID;
let GRE_CONN_INSTANCE_ID;
let UNBOUND_GRE_CONN_INSTANCE_ID;
let CLASSIC_CONN_INSTANCE_ID;

let DL_CONN_INSTANCE_NAME;
let VPC_CONN_INSTANCE_NAME;
let GRE_CONN_INSTANCE_NAME;
let UNBOUND_GRE_CONN_INSTANCE_NAME;
let CLASSIC_CONN_INSTANCE_NAME;

const poll = async (fn, fnCondition, sec) => {
  let result;
  let timerCount = 0;

  const pollInterval = 15;
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
    if (timerCount === 12 || fnCondition(result)) {
      break;
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

describe.skip('TransitGatewayApisV1', () => {
  jest.setTimeout(timeout);

  // Initialize the service client.
  const options = {
    authenticator: new IamAuthenticator({
      apikey: config.IAMAPIKEY,
      url: config.IAMURL,
    }),
    serviceUrl: config.SERVICE_URL,
    version: config.API_VERSION,
  };

  let transitGateway;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    transitGateway = TransitGatewayApisV1.newInstance(options);
    expect(transitGateway).not.toBeNull();
    done();
  });

  describe('PreTest cleanup', () => {
    test('Successfully clean test environment', async done => {
      try {
        const response = await transitGateway.listTransitGateways({});
        expect(response.status).toBe(200);

        const { result } = response || {};
        const gateways = result.transit_gateways;
        for (let i = 0; i < gateways.length; i++) {
          const gtwName = gateways[i].name;
          if (gtwName.includes('SDK-NODE-TEST') === true) {
            const response = await transitGateway.listTransitGatewayConnections({
              transitGatewayId: gateways[i].id,
            });
            expect(response.status).toBe(200);

            const { result } = response || {};
            const connections = result.connections;
            if (connections.length > 0) {
              const connIDs = [];
              for (let j = 0; j < connections.length; j++) {
                if (connections[j].status.includes('delet') === false) {
                  const connID = connections[j].id;
                  // Delete GRE Connections first.
                  if (
                    connections[j].networkType === 'gre_tunnel' ||
                    connections[j].networkType === 'unbound_gre_tunnel'
                  ) {
                    const response = await transitGateway.deleteTransitGateway({
                      id: connID,
                    });
                    expect(response.status).toBe(204);
                  } else {
                    connIDs.push(connID);
                  }
                }
              }
              // Delete Connections from other types.
              for (let k = 0; k < connIDs.length; k++) {
                const response = await transitGateway.deleteTransitGateway({
                  id: connIDs[k],
                });
                expect(response.status).toBe(204);
              }
            }
            // Remove empty gateways
            if (gateways[i].status.includes('delet') === false) {
              const response = await transitGateway.deleteTransitGateway({
                id: gateways[i].id,
              });
              expect(response.status).toBe(204);
            }
          }
        }

        done();
      } catch (err) {
        done(err);
      }
    });
  });

  // ///////////////////////////////////////////////////////////////////////////
  //                        Transit Locations Tests                          //
  // ///////////////////////////////////////////////////////////////////////////

  describe('LIST Transit Locations', () => {
    test('successfully lists the gateway locations', async done => {
      try {
        const response = await transitGateway.listGatewayLocations({});

        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.locations.length).toBeGreaterThan(0);

        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('GET Transit Location', () => {
    test('successfully get location by ID', async done => {
      try {
        const response = await transitGateway.getGatewayLocation({
          name: config.LOCATION,
        });

        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.name).toEqual(config.LOCATION);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('fail to get location by instance name', async done => {
      try {
        await transitGateway.getGatewayLocation({
          name: 'bad-name',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }
      done();
    });
  });

  // /////////////////////////////////////////////////////////////////////////////
  //                           Transit Gateway Tests                           //
  // /////////////////////////////////////////////////////////////////////////////

  describe('CREATE Transit Gateway', () => {
    test('should successfully create a gateway', async done => {
      try {
        const stamp = Math.floor(Math.random() * 1000);
        config.GATEWAY_NAME = config.GATEWAY_NAME + '_' + stamp;

        const response = await transitGateway.createTransitGateway({
          name: config.GATEWAY_NAME,
          location: config.LOCATION,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.name).toEqual(config.GATEWAY_NAME);
        expect(result.location).toEqual(config.LOCATION);

        GATEWAY_INSTANCE_ID = result.id;

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should successfully wait for gateway to be created', async done => {
      try {
        const result = await poll(
          () => transitGateway.getTransitGateway({ id: GATEWAY_INSTANCE_ID }),
          result => result.status === 'available',
          100
        );

        expect(result).toBeDefined();
        expect(result.status).toEqual('available');

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to create a gateway', async done => {
      try {
        await transitGateway.createTransitGateway({
          name: config.GATEWAY_NAME,
          location: config.LOCATION,
        });
      } catch (err) {
        expect(err.status).toEqual(409);
        expect(err.message).toEqual('A gateway with the same name already exists.');
        done();
      }
      done();
    });
  });

  describe('GET Gateway By Id', () => {
    test('should successfully fetches the gateway by instance id', async done => {
      try {
        const response = await transitGateway.getTransitGateway({ id: GATEWAY_INSTANCE_ID });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.id).toEqual(GATEWAY_INSTANCE_ID);
        expect(result.name).toEqual(config.GATEWAY_NAME);
        expect(result.location).toEqual(config.LOCATION);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to get gateway by instance id', async done => {
      try {
        await transitGateway.getTransitGateway({ id: 'bad-id-123' });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }
      done();
    });
  });

  describe('UPDATE Transit Gateway', () => {
    test('should successfully update the name of the gateway', async done => {
      config.GATEWAY_NAME = 'UPDATED-' + config.GATEWAY_NAME;
      try {
        const response = await transitGateway.updateTransitGateway({
          id: GATEWAY_INSTANCE_ID,
          name: config.GATEWAY_NAME,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.id).toEqual(GATEWAY_INSTANCE_ID);
        expect(result.name).toEqual(config.GATEWAY_NAME);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update the gateway with wrong instance id', async done => {
      try {
        await transitGateway.updateTransitGateway({
          id: 'bad-id-123',
          name: 'updateGatewayName',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }

      done();
    });
  });

  describe('LIST Transit Gateways', () => {
    test('should list all the gateways', async done => {
      try {
        const response = await transitGateway.listTransitGateways({});
        expect(response.status).toBe(200);

        const { result } = response || {};
        const gateways = result.transit_gateways;
        expect(gateways.length).toBeGreaterThan(0);

        let found = false;
        for (let i = 0; i < gateways.length; i++) {
          if (gateways[i].id === GATEWAY_INSTANCE_ID) {
            expect(gateways[i].name).toBe(config.GATEWAY_NAME);
            expect(gateways[i].location).toEqual(config.LOCATION);

            found = true;
          }
        }
        expect(found).toEqual(true);

        done();
      } catch (err) {
        done(err);
      }
    });
  });

  // /////////////////////////////////////////////////////////////////////////////
  //                    Transit Gateway Connections Tests                      //
  // /////////////////////////////////////////////////////////////////////////////

  describe('CREATE Transit Gateway Connection', () => {
    test('successfully creates CLASSIC connection', async done => {
      const type = 'classic';
      const stamp = Math.floor(Math.random() * 1000);
      const connectionName = 'CLASSIC-' + config.GATEWAY_CONNECTION_NAME + '_' + stamp;

      try {
        const response = await transitGateway.createTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          networkType: type,
          name: connectionName,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.name).toEqual(connectionName);

        CLASSIC_CONN_INSTANCE_ID = result.id;
        CLASSIC_CONN_INSTANCE_NAME = result.name;

        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully wait for the CLASSIC connection to report as attached', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.getTransitGatewayConnection({
              transitGatewayId: GATEWAY_INSTANCE_ID,
              id: CLASSIC_CONN_INSTANCE_ID,
            }),
          result => result.status === 'attached',
          100
        );

        expect(result).toBeDefined();
        expect(result.status).toEqual('attached');

        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully creates VPC connection', async done => {
      const type = 'vpc';
      const crn = config.VPC_CRN;
      const stamp = Math.floor(Math.random() * 1000);
      const connectionName = 'VPC-' + config.GATEWAY_CONNECTION_NAME + '_' + stamp;

      try {
        const response = await transitGateway.createTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          networkType: type,
          name: connectionName,
          networkId: crn,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.name).toEqual(connectionName);

        VPC_CONN_INSTANCE_ID = result.id;
        VPC_CONN_INSTANCE_NAME = result.name;

        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully wait for the VPC connection to report as attached', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.getTransitGatewayConnection({
              transitGatewayId: GATEWAY_INSTANCE_ID,
              id: VPC_CONN_INSTANCE_ID,
            }),
          result => result.status === 'attached',
          100
        );

        expect(result).toBeDefined();
        expect(result.status).toEqual('attached');

        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully creates DL connection', async done => {
      const type = 'directlink';
      const crn = config.DL_CRN;
      const stamp = Math.floor(Math.random() * 1000);
      const connectionName = 'DL-' + config.GATEWAY_CONNECTION_NAME + '_' + stamp;

      try {
        const response = await transitGateway.createTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          networkType: type,
          name: connectionName,
          networkId: crn,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.name).toEqual(connectionName);

        DL_CONN_INSTANCE_ID = result.id;
        DL_CONN_INSTANCE_NAME = result.name;

        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully wait for the DL connection to report as attached', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.getTransitGatewayConnection({
              transitGatewayId: GATEWAY_INSTANCE_ID,
              id: DL_CONN_INSTANCE_ID,
            }),
          result => result.status === 'attached',
          100
        );

        expect(result).toBeDefined();
        expect(result.status).toEqual('attached');

        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully creates GRE connection', async done => {
      const type = 'gre_tunnel';
      const testZone = { name: 'us-south-1' };
      const stamp = Math.floor(Math.random() * 1000);
      const connectionName = 'GRE-' + config.GATEWAY_CONNECTION_NAME + '_' + stamp;

      try {
        const response = await transitGateway.createTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          networkType: type,
          name: connectionName,
          zone: testZone,
          localTunnelIp: '192.168.101.1',
          localGatewayIp: '192.168.100.1',
          remoteTunnelIp: '192.168.101.2',
          remoteGatewayIp: '10.242.63.12',
          baseConnectionId: CLASSIC_CONN_INSTANCE_ID,
        });

        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.name).toEqual(connectionName);

        GRE_CONN_INSTANCE_ID = result.id;
        GRE_CONN_INSTANCE_NAME = result.name;

        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully wait for the GRE connection to report as attached', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.getTransitGatewayConnection({
              transitGatewayId: GATEWAY_INSTANCE_ID,
              id: GRE_CONN_INSTANCE_ID,
            }),
          result => result.status === 'attached',
          100
        );

        expect(result).toBeDefined();
        expect(result.status).toEqual('attached');

        done();
      } catch (err) {
        done(err);
      }
    });

    test('fail to create a transit connection', async done => {
      try {
        await transitGateway.createTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          networkType: 'bad-type',
          name: 'testString',
        });
        done();
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }

      done();
    });
  });

  test('successfully creates Unbound GRE connection', async done => {
    const type = 'unbound_gre_tunnel';
    const testZone = { name: 'us-south-1' };
    const stamp = Math.floor(Math.random() * 1000);
    const connectionName = 'unbound-GRE-' + config.GATEWAY_CONNECTION_NAME + '_' + stamp;

    try {
      const response = await transitGateway.createTransitGatewayConnection({
        transitGatewayId: GATEWAY_INSTANCE_ID,
        networkType: type,
        name: connectionName,
        zone: testZone,
        localTunnelIp: '192.168.101.1',
        localGatewayIp: '192.168.100.1',
        remoteTunnelIp: '192.168.101.2',
        remoteGatewayIp: '10.242.63.12',
        baseConnectionId: CLASSIC_CONN_INSTANCE_ID,
        baseNetworkType: 'classic',
      });

      expect(response).toBeDefined();
      expect(response.status).toEqual(201);

      const { result } = response || {};

      expect(result).toBeDefined();
      expect(result.name).toEqual(connectionName);

      UNBOUND_GRE_CONN_INSTANCE_ID = result.id;
      UNBOUND_GRE_CONN_INSTANCE_NAME = result.name;

      done();
    } catch (err) {
      done(err);
    }
  });

  test('successfully wait for the Unbound GRE connection to report as attached', async done => {
    try {
      const result = await poll(
        () =>
          transitGateway.getTransitGatewayConnection({
            transitGatewayId: GATEWAY_INSTANCE_ID,
            id: UNBOUND_GRE_CONN_INSTANCE_ID,
          }),
        result => result.status === 'attached',
        100
      );

      expect(result).toBeDefined();
      expect(result.status).toEqual('attached');

      done();
    } catch (err) {
      done(err);
    }
  });

  describe('GET Transit Gateway Connection', () => {
    test('sucessfully get VPC connection by id', async done => {
      try {
        const response = await transitGateway.getTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: VPC_CONN_INSTANCE_ID,
        });

        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.id).toEqual(VPC_CONN_INSTANCE_ID);
        expect(result.name).toEqual(VPC_CONN_INSTANCE_NAME);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('sucessfully get CLASSIC connection by id', async done => {
      try {
        const response = await transitGateway.getTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: CLASSIC_CONN_INSTANCE_ID,
        });

        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.id).toEqual(CLASSIC_CONN_INSTANCE_ID);
        expect(result.name).toEqual(CLASSIC_CONN_INSTANCE_NAME);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('sucessfully get DL connection by id', async done => {
      try {
        const response = await transitGateway.getTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: DL_CONN_INSTANCE_ID,
        });

        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.id).toEqual(DL_CONN_INSTANCE_ID);
        expect(result.name).toEqual(DL_CONN_INSTANCE_NAME);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('sucessfully get GRE connection by id', async done => {
      try {
        const response = await transitGateway.getTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: GRE_CONN_INSTANCE_ID,
        });

        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.id).toEqual(GRE_CONN_INSTANCE_ID);
        expect(result.name).toEqual(GRE_CONN_INSTANCE_NAME);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('sucessfully get Unbound GRE connection by id', async done => {
      try {
        const response = await transitGateway.getTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: UNBOUND_GRE_CONN_INSTANCE_ID,
        });

        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.id).toEqual(UNBOUND_GRE_CONN_INSTANCE_ID);
        expect(result.name).toEqual(UNBOUND_GRE_CONN_INSTANCE_NAME);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('fail to get connection by instanceID', async done => {
      try {
        await transitGateway.getTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: 'bad-id-123',
        });
        done();
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }

      done();
    });
  });

  describe('UPDATE Transit Gateway Connection', () => {
    test('successfully update a VPC connection name by instance id', async done => {
      VPC_CONN_INSTANCE_NAME = 'UPDATED-' + VPC_CONN_INSTANCE_NAME;
      try {
        const response = await transitGateway.updateTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: VPC_CONN_INSTANCE_ID,
          name: VPC_CONN_INSTANCE_NAME,
        });
        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.id).toEqual(VPC_CONN_INSTANCE_ID);
        expect(result.name).toEqual(VPC_CONN_INSTANCE_NAME);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully update a CLASSIC connection name by instance id', async done => {
      CLASSIC_CONN_INSTANCE_NAME = 'UPDATED-' + CLASSIC_CONN_INSTANCE_NAME;
      try {
        const response = await transitGateway.updateTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: CLASSIC_CONN_INSTANCE_ID,
          name: CLASSIC_CONN_INSTANCE_NAME,
        });
        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.id).toEqual(CLASSIC_CONN_INSTANCE_ID);
        expect(result.name).toEqual(CLASSIC_CONN_INSTANCE_NAME);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully update a DL connection name by instance id', async done => {
      DL_CONN_INSTANCE_NAME = 'UPDATED-' + DL_CONN_INSTANCE_NAME;
      try {
        const response = await transitGateway.updateTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: DL_CONN_INSTANCE_ID,
          name: DL_CONN_INSTANCE_NAME,
        });
        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.id).toEqual(DL_CONN_INSTANCE_ID);
        expect(result.name).toEqual(DL_CONN_INSTANCE_NAME);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully update a GRE connection name by instance id', async done => {
      GRE_CONN_INSTANCE_NAME = 'UPDATED-' + GRE_CONN_INSTANCE_NAME;
      try {
        const response = await transitGateway.updateTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: GRE_CONN_INSTANCE_ID,
          name: GRE_CONN_INSTANCE_NAME,
        });
        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.id).toEqual(GRE_CONN_INSTANCE_ID);
        expect(result.name).toEqual(GRE_CONN_INSTANCE_NAME);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully update an Unbund GRE connection name by instance id', async done => {
      UNBOUND_GRE_CONN_INSTANCE_NAME = 'UPDATED-' + UNBOUND_GRE_CONN_INSTANCE_NAME;
      try {
        const response = await transitGateway.updateTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: UNBOUND_GRE_CONN_INSTANCE_ID,
          name: UNBOUND_GRE_CONN_INSTANCE_NAME,
        });
        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.id).toEqual(UNBOUND_GRE_CONN_INSTANCE_ID);
        expect(result.name).toEqual(UNBOUND_GRE_CONN_INSTANCE_NAME);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('fail to update Connection by instance id', async done => {
      try {
        await transitGateway.updateTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: 'bad-id-123',
          name: 'to update',
        });
        done();
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }

      done();
    });
  });

  describe('LIST Gateway Connections', () => {
    test('should list all the connections for a gateway', async done => {
      try {
        const response = await transitGateway.listTransitGatewayConnections({
          transitGatewayId: GATEWAY_INSTANCE_ID,
        });
        expect(response.status).toBe(200);

        const { result } = response || {};
        const connections = result.connections;
        expect(connections.length).toBeGreaterThan(0);

        let foundDL = false;
        let foundVPC = false;
        let foundGRE = false;
        let foundUnboundGRE = false;
        let foundClassic = false;
        for (let i = 0; i < connections.length; i++) {
          if (connections[i].id === CLASSIC_CONN_INSTANCE_ID) {
            expect(connections[i].name).toEqual(CLASSIC_CONN_INSTANCE_NAME);
            foundClassic = true;
          } else if (connections[i].id === VPC_CONN_INSTANCE_ID) {
            expect(connections[i].name).toEqual(VPC_CONN_INSTANCE_NAME);
            foundVPC = true;
          } else if (connections[i].id === DL_CONN_INSTANCE_ID) {
            expect(connections[i].name).toEqual(DL_CONN_INSTANCE_NAME);
            foundDL = true;
          } else if (connections[i].id === GRE_CONN_INSTANCE_ID) {
            expect(connections[i].name).toEqual(GRE_CONN_INSTANCE_NAME);
            foundGRE = true;
          } else if (connections[i].id === UNBOUND_GRE_CONN_INSTANCE_ID) {
            expect(connections[i].name).toEqual(UNBOUND_GRE_CONN_INSTANCE_NAME);
            foundUnboundGRE = true;
          }
        }
        expect(foundDL).toEqual(true);
        expect(foundVPC).toEqual(true);
        expect(foundGRE).toEqual(true);
        expect(foundClassic).toEqual(true);
        expect(foundUnboundGRE).toEqual(true);

        done();
      } catch (err) {
        done(err);
      }
    });
  });

  // /////////////////////////////////////////////////////////////////////////////
  //                  Transit Gateway Route Reports Tests                      //
  // /////////////////////////////////////////////////////////////////////////////

  describe('CREATE Gateway Route Report', () => {
    test('should successfully create a route report', async done => {
      try {
        const response = await transitGateway.createTransitGatewayRouteReport({
          transitGatewayId: GATEWAY_INSTANCE_ID,
        });

        expect(response).toBeDefined();
        expect(response.status).toEqual(202);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.id).not.toBe('');
        expect(result.status).not.toBe('');
        expect(result.createdAt).not.toBe('');
        expect(result.updatedAt).not.toBe('');

        RR_INSTANCE_ID = result.id;

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should successfully wait for route report to be created', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.getTransitGatewayRouteReport({
              transitGatewayId: GATEWAY_INSTANCE_ID,
              id: RR_INSTANCE_ID,
            }),
          result => result.status === 'complete',
          500
        );

        expect(result).toBeDefined();
        expect(result.status).toEqual('complete');

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to create a route report', async done => {
      try {
        await transitGateway.createTransitGatewayRouteReport({
          transitGatewayId: 'bad-id-123',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        expect(err.message).toEqual('The gateway was not found.');
        done();
      }
      done();
    });
  });

  describe('GET Gateway Route Report By Id', () => {
    test('should successfully fetches the route report by instance id', async done => {
      try {
        const response = await transitGateway.getTransitGatewayRouteReport({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: RR_INSTANCE_ID,
        });

        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        const rrConnections = result.connections;

        expect(result).toBeDefined();
        expect(result.createdAt).not.toBe('');
        expect(result.updatedAt).not.toBe('');
        expect(result.status).toBe('complete');
        expect(rrConnections).not.toBe(null);
        expect(result.id).toBe(RR_INSTANCE_ID);
        expect(rrConnections.length).toBeGreaterThan(0);

        let foundDL = false;
        let foundVPC = false;
        let foundGRE = false;
        let foundClassic = false;
        let foundUnboundGRE = false;
        for (let i = 0; i < rrConnections.length; i++) {
          if (rrConnections[i].id === VPC_CONN_INSTANCE_ID) {
            expect(rrConnections[i].name).toEqual(VPC_CONN_INSTANCE_NAME);
            foundVPC = true;
          } else if (rrConnections[i].id === DL_CONN_INSTANCE_ID) {
            expect(rrConnections[i].name).toEqual(DL_CONN_INSTANCE_NAME);
            foundDL = true;
          } else if (rrConnections[i].id === GRE_CONN_INSTANCE_ID) {
            expect(rrConnections[i].name).toEqual(GRE_CONN_INSTANCE_NAME);
            foundGRE = true;
          } else if (rrConnections[i].id === UNBOUND_GRE_CONN_INSTANCE_ID) {
            expect(rrConnections[i].name).toEqual(UNBOUND_GRE_CONN_INSTANCE_NAME);
            foundUnboundGRE = true;
          } else if (rrConnections[i].id === CLASSIC_CONN_INSTANCE_ID) {
            expect(rrConnections[i].name).toEqual(CLASSIC_CONN_INSTANCE_NAME);
            foundClassic = true;
          }
        }
        expect(foundDL).toEqual(true);
        expect(foundVPC).toEqual(true);
        expect(foundGRE).toEqual(true);
        expect(foundUnboundGRE).toEqual(true);
        expect(foundClassic).toEqual(true);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to get route report by instance id', async done => {
      try {
        await transitGateway.getTransitGatewayRouteReport({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: 'bad-id-123',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }
      done();
    });
  });

  describe('LIST Gateway Route Report', () => {
    test('should list all Route Report in a gateway', async done => {
      try {
        const response = await transitGateway.listTransitGatewayRouteReports({
          transitGatewayId: GATEWAY_INSTANCE_ID,
        });
        expect(response.status).toBe(200);

        const { result } = response || {};
        const reports = result.route_reports;
        expect(reports.length).toBeGreaterThan(0);

        let found = false;
        for (let i = 0; i < reports.length; i++) {
          if (reports[i].id === RR_INSTANCE_ID) {
            expect(reports[i].createdAt).not.toBe('');
            expect(reports[i].updatedAt).not.toBe('');
            expect(reports[i].status).toBe('complete');
            expect(reports[i].connections).not.toBe(null);
            expect(reports[i].connections.length).toBeGreaterThan(0);

            found = true;
          }
        }
        expect(found).toEqual(true);

        done();
      } catch (err) {
        done(err);
      }
    });
  });

  // /////////////////////////////////////////////////////////////////////////////
  //                   DELETE Transit Gateway Route Report                     //
  // /////////////////////////////////////////////////////////////////////////////

  describe('DELETE Gateway Route Report', () => {
    test('successfully delete route report by instanceID', async done => {
      try {
        const response = await transitGateway.deleteTransitGatewayRouteReport({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: RR_INSTANCE_ID,
        });

        expect(response.status).toBe(204);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully waits for the route report to be deleted', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.getTransitGatewayRouteReport({
              transitGatewayId: GATEWAY_INSTANCE_ID,
              id: RR_INSTANCE_ID,
            }),
          result => result.status === 404,
          50
        );

        expect(result).toBeDefined();
        expect(result.status).toBe(404);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('fail to delete the route report by instanceID', async done => {
      try {
        await transitGateway.deleteTransitGatewayRouteReport({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: 'bad-id-123',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }

      done();
    });
  });

  // /////////////////////////////////////////////////////////////////////////////
  //                    DELETE Transit Gateway Connections                     //
  // /////////////////////////////////////////////////////////////////////////////

  describe('DELETE Transit Gateway Connection', () => {
    test('successfully delete GRE Connection by instanceID', async done => {
      try {
        const response = await transitGateway.deleteTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: GRE_CONN_INSTANCE_ID,
        });

        expect(response.status).toBe(204);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully waits for the GRE connection to report as deleted', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.getTransitGatewayConnection({
              transitGatewayId: GATEWAY_INSTANCE_ID,
              id: GRE_CONN_INSTANCE_ID,
            }),
          result => result.status === 404,
          200
        );

        expect(result).toBeDefined();
        expect(result.status).toBe(404);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully delete Unbound GRE Connection by instanceID', async done => {
      try {
        const response = await transitGateway.deleteTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: UNBOUND_GRE_CONN_INSTANCE_ID,
        });

        expect(response.status).toBe(204);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully waits for the Unbound GRE connection to report as deleted', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.getTransitGatewayConnection({
              transitGatewayId: GATEWAY_INSTANCE_ID,
              id: UNBOUND_GRE_CONN_INSTANCE_ID,
            }),
          result => result.status === 404,
          200
        );

        expect(result).toBeDefined();
        expect(result.status).toBe(404);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully delete VPC connection by instanceID', async done => {
      try {
        const response = await transitGateway.deleteTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: VPC_CONN_INSTANCE_ID,
        });

        expect(response.status).toBe(204);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully waits for the VPC connection to report as deleted', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.getTransitGatewayConnection({
              transitGatewayId: GATEWAY_INSTANCE_ID,
              id: VPC_CONN_INSTANCE_ID,
            }),
          result => result.status === 404,
          200
        );

        expect(result).toBeDefined();
        expect(result.status).toBe(404);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully delete DL connection by instanceID', async done => {
      try {
        const response = await transitGateway.deleteTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: DL_CONN_INSTANCE_ID,
        });

        expect(response.status).toBe(204);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully waits for the DL connection to report as deleted', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.getTransitGatewayConnection({
              transitGatewayId: GATEWAY_INSTANCE_ID,
              id: DL_CONN_INSTANCE_ID,
            }),
          result => result.status === 404,
          200
        );

        expect(result).toBeDefined();
        expect(result.status).toBe(404);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully delete CLASSIC connection by instanceID', async done => {
      try {
        const response = await transitGateway.deleteTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: CLASSIC_CONN_INSTANCE_ID,
        });

        expect(response.status).toBe(204);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully waits for the CLASSIC connection to report as deleted', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.getTransitGatewayConnection({
              transitGatewayId: GATEWAY_INSTANCE_ID,
              id: CLASSIC_CONN_INSTANCE_ID,
            }),
          result => result.status === 404,
          200
        );

        expect(result).toBeDefined();
        expect(result.status).toBe(404);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('Failed to delete the transit gateway connection by instance id', async done => {
      try {
        await transitGateway.deleteTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: 'bad-id-123',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }

      done();
    });
  });

  // /////////////////////////////////////////////////////////////////////////////
  //                           DELETE Transit Gateway                          //
  // /////////////////////////////////////////////////////////////////////////////

  describe('DELETE Transit Gateway', () => {
    test('successfully delete gateway by instanceID', async done => {
      try {
        const response = await transitGateway.deleteTransitGateway({
          id: GATEWAY_INSTANCE_ID,
        });

        expect(response.status).toBe(204);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully waits for the gateway to be deleted', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.getTransitGateway({
              id: GATEWAY_INSTANCE_ID,
            }),
          result => result.status === 404,
          200
        );

        expect(result).toBeDefined();
        expect(result.status).toBe(404);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('fail to delete the gateway by instanceID', async done => {
      try {
        await transitGateway.deleteTransitGateway({
          id: 'bad-id-123',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }

      done();
    });
  });
});
