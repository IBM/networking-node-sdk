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
Possible ways to run this test:     
  1) jest test/integration/transit-gateway.v1.test.js 
  2) ./node_modules/.bin/jest test/integration/transit-gateway.v1.test.js
  3) npm run test-integration 
*/

'use strict';

const TransitGatewayApisV1 = require('../../dist/transit-gateway-apis/v1');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

const timeout = 600000; // ten minutes

// Location of our config file.
const configFile = 'transit.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

// Retrieve the config file as an object.
// We do this because we're going to directly use the
// config properties, rather than let the SDK do it for us.
const config = authHelper.loadConfig();

let RR_INSTANCE_ID;
let PF_INSTANCE_ID;
let GATEWAY_INSTANCE_ID;
let DL_CONN_INSTANCE_ID;
let VPC_CONN_INSTANCE_ID;
let GRE_CONN_INSTANCE_ID;
let CLASSIC_CONN_INSTANCE_ID;

let DL_CONN_INSTANCE_NAME;
let VPC_CONN_INSTANCE_NAME;
let GRE_CONN_INSTANCE_NAME;
let CLASSIC_CONN_INSTANCE_NAME;

let PREFIX_FILTERS_INSTANCE;
let PREFIX_FILTERS_BEFORE_INSTANCE;
let PREFIX_FILTERS_DEFAULT_INSTANCE;

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
  // describe('TransitGatewayApisV1', () => {
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
          const gtwID = gateways[i].id;
          const gtwName = gateways[i].name;

          if (gtwName.includes('NODE-SDK') === true) {
            const response = await transitGateway.listTransitGatewayConnections({
              transitGatewayId: gtwID,
            });
            expect(response.status).toBe(200);
            const { result } = response || {};
            const connections = result.connections;

            if (connections.length > 0) {
              const connIDs = [];
              for (let j = 0; j < connections.length; j++) {
                if (connections[j].status.includes('delet') === false) {
                  const connID = connections[j].id;
                  const connName = connections[j].name;

                  // Delete GRE Connections first.
                  if (connName.includes('GRE-NODE') === true) {
                    const response = await transitGateway.deleteTransitGatewayConnection({
                      transitGatewayId: gtwID,
                      id: connID,
                    });
                    expect(response.status).toBe(204);
                    try {
                      const result = await poll(
                        () =>
                          transitGateway.getTransitGatewayConnection({
                            transitGatewayId: gtwID,
                            id: connID,
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
                  } else {
                    connIDs.push(connID);
                  }
                }
              }
              // Delete Connections from other types.
              for (let k = 0; k < connIDs.length; k++) {
                const response = await transitGateway.deleteTransitGatewayConnection({
                  transitGatewayId: gtwID,
                  id: connIDs[k],
                });
                expect(response.status).toBe(204);
                try {
                  const result = await poll(
                    () =>
                      transitGateway.getTransitGatewayConnection({
                        transitGatewayId: gtwID,
                        id: connIDs[k],
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
              }
            }
            // Remove empty gateways
            if (gateways[i].status.includes('delet') === false) {
              const response = await transitGateway.deleteTransitGateway({
                id: gtwID,
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
      PREFIX_FILTERS_DEFAULT_INSTANCE = 'permit';
      PREFIX_FILTERS_INSTANCE = [
        {
          'action': PREFIX_FILTERS_DEFAULT_INSTANCE,
          'ge': 24,
          'le': 32,
          'prefix': '192.168.100.0/24',
        },
      ];

      try {
        const response = await transitGateway.createTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          networkType: type,
          name: connectionName,
          networkId: crn,
          prefixFilters: PREFIX_FILTERS_INSTANCE,
          prefixFiltersDefault: PREFIX_FILTERS_DEFAULT_INSTANCE,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.name).toEqual(connectionName);

        VPC_CONN_INSTANCE_ID = result.id;
        VPC_CONN_INSTANCE_NAME = result.name;
        PREFIX_FILTERS_BEFORE_INSTANCE = result.prefix_filters[0].id;

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
        expect(result.prefix_filters_default).toEqual(PREFIX_FILTERS_DEFAULT_INSTANCE);
        expect(result.prefix_filters[0].action).toEqual(PREFIX_FILTERS_INSTANCE[0].action);
        expect(result.prefix_filters[0].prefix).toEqual(PREFIX_FILTERS_INSTANCE[0].prefix);
        expect(result.prefix_filters[0].ge).toEqual(PREFIX_FILTERS_INSTANCE[0].ge);
        expect(result.prefix_filters[0].le).toEqual(PREFIX_FILTERS_INSTANCE[0].le);
        expect(result.prefix_filters[0].createdAt).not.toBe('');
        expect(result.prefix_filters[0].updatedAt).not.toBe('');

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
      PREFIX_FILTERS_DEFAULT_INSTANCE = 'deny';
      try {
        const response = await transitGateway.updateTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: VPC_CONN_INSTANCE_ID,
          name: VPC_CONN_INSTANCE_NAME,
          prefixFiltersDefault: PREFIX_FILTERS_DEFAULT_INSTANCE,
        });
        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.id).toEqual(VPC_CONN_INSTANCE_ID);
        expect(result.name).toEqual(VPC_CONN_INSTANCE_NAME);
        expect(result.prefix_filters_default).toEqual(PREFIX_FILTERS_DEFAULT_INSTANCE);

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
          }
        }
        expect(foundDL).toEqual(true);
        expect(foundVPC).toEqual(true);
        expect(foundGRE).toEqual(true);
        expect(foundClassic).toEqual(true);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to list gateway connections', async done => {
      try {
        await transitGateway.listTransitGatewayConnections({
          transitGatewayId: 'bad-gateway-id-123',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        expect(err.message).toEqual('The gateway was not found.');
        done();
      }
      done();
    });
  });

  // /////////////////////////////////////////////////////////////////////////////
  //                 Transit Connection Prefix-Filters Tests                   //
  // /////////////////////////////////////////////////////////////////////////////

  describe('CREATE Connection Prefix Filter', () => {
    test('should successfully create a prefix filter', async done => {
      try {
        const response = await transitGateway.createTransitGatewayConnectionPrefixFilter({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: VPC_CONN_INSTANCE_ID,
          action: 'permit',
          before: PREFIX_FILTERS_BEFORE_INSTANCE,
          prefix: '192.168.111.0/12',
          ge: 12,
          le: 22,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.id).not.toBe('');
        expect(result.createdAt).not.toBe('');

        PF_INSTANCE_ID = result.id;

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to create a prefix filter', async done => {
      try {
        await transitGateway.createTransitGatewayConnectionPrefixFilter({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: 'bad-conn-id-123',
          action: 'deny',
          prefix: '192.168.111.0/12',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        expect(err.message).toEqual('The connection was not found.');
        done();
      }
      done();
    });
  });

  describe('GET Connection Prefix Filter', () => {
    test('should successfully get a prefix filter', async done => {
      try {
        const response = await transitGateway.getTransitGatewayConnectionPrefixFilter({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: VPC_CONN_INSTANCE_ID,
          filterId: PF_INSTANCE_ID,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.id).toEqual(PF_INSTANCE_ID);
        expect(result.ge).toEqual(12);
        expect(result.le).toEqual(22);
        expect(result.action).toEqual('permit');
        expect(result.prefix).toEqual('192.168.111.0/12');
        expect(result.before).toEqual(PREFIX_FILTERS_BEFORE_INSTANCE);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to get a prefix filter', async done => {
      try {
        await transitGateway.getTransitGatewayConnectionPrefixFilter({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: VPC_CONN_INSTANCE_ID,
          filterId: 'bad-pf-id-123',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        expect(err.message).toEqual('The prefix filter was not found');
        done();
      }
      done();
    });
  });

  describe('UPDATE Connection Prefix Filter', () => {
    test('should successfully update a prefix filter', async done => {
      try {
        const response = await transitGateway.updateTransitGatewayConnectionPrefixFilter({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: VPC_CONN_INSTANCE_ID,
          filterId: PF_INSTANCE_ID,
          action: 'deny',
          prefix: '192.168.112.1/18',
          ge: 18,
          le: 24,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.id).toEqual(PF_INSTANCE_ID);
        expect(result.ge).toEqual(18);
        expect(result.le).toEqual(24);
        expect(result.action).toEqual('deny');
        expect(result.prefix).toEqual('192.168.112.1/18');

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update a prefix filter', async done => {
      try {
        await transitGateway.updateTransitGatewayConnectionPrefixFilter({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: VPC_CONN_INSTANCE_ID,
          filterId: 'bad-pf-id-123',
        });
      } catch (err) {
        expect(err.status).toEqual(400);
        expect(err.message).toEqual(
          'The information given was invalid, malformed, or missing a required field.'
        );
        done();
      }
      done();
    });
  });

  describe('LIST Connections Prefix Filters', () => {
    test('should list all the prefix filters for a connection', async done => {
      try {
        const response = await transitGateway.listTransitGatewayConnectionPrefixFilters({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: VPC_CONN_INSTANCE_ID,
        });
        expect(response.status).toBe(200);

        const { result } = response || {};
        const prefixFilters = result.prefix_filters;
        expect(prefixFilters.length).toBeGreaterThan(0);

        let foundPF1 = false;
        let foundPF2 = false;
        for (let i = 0; i < prefixFilters.length; i++) {
          if (prefixFilters[i].id === PF_INSTANCE_ID) {
            expect(prefixFilters[i].ge).toEqual(18);
            expect(prefixFilters[i].le).toEqual(24);
            expect(prefixFilters[i].action).toEqual('deny');
            expect(prefixFilters[i].prefix).toEqual('192.168.112.1/18');
            expect(prefixFilters[i].before).toEqual(PREFIX_FILTERS_BEFORE_INSTANCE);
            foundPF1 = true;
          } else if (prefixFilters[i].id === PREFIX_FILTERS_BEFORE_INSTANCE) {
            expect(prefixFilters[i].ge).toEqual(24);
            expect(prefixFilters[i].le).toEqual(32);
            expect(prefixFilters[i].action).toEqual('permit');
            expect(prefixFilters[i].prefix).toEqual('192.168.100.0/24');
            foundPF2 = true;
          }
        }
        expect(foundPF1).toEqual(true);
        expect(foundPF2).toEqual(true);

        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to list a prefix filters', async done => {
      try {
        await transitGateway.listTransitGatewayConnectionPrefixFilters({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: 'bad-conn-id-123',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        expect(err.message).toEqual('The connection was not found.');
        done();
      }
      done();
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
          } else if (rrConnections[i].id === CLASSIC_CONN_INSTANCE_ID) {
            expect(rrConnections[i].name).toEqual(CLASSIC_CONN_INSTANCE_NAME);
            foundClassic = true;
          }
        }
        expect(foundDL).toEqual(true);
        expect(foundVPC).toEqual(true);
        expect(foundGRE).toEqual(true);
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
  //                 DELETE Connection Prefix-Filters Test                     //
  // /////////////////////////////////////////////////////////////////////////////

  describe('DELETE Connection Prefix Filter', () => {
    test('successfully delete prefix filter by instanceID', async done => {
      try {
        const response = await transitGateway.deleteTransitGatewayConnectionPrefixFilter({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: VPC_CONN_INSTANCE_ID,
          filterId: PF_INSTANCE_ID,
        });

        expect(response.status).toBe(204);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully waits for the prefix filter to be deleted', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.deleteTransitGatewayConnectionPrefixFilter({
              transitGatewayId: GATEWAY_INSTANCE_ID,
              id: VPC_CONN_INSTANCE_ID,
              filterId: PF_INSTANCE_ID,
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
        await transitGateway.deleteTransitGatewayConnectionPrefixFilter({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: VPC_CONN_INSTANCE_ID,
          filterId: 'bad-filter-id-123',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }

      done();
    });
  });

  // /////////////////////////////////////////////////////////////////////////////
  //                DELETE Transit Gateway Route Report Test                   //
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
  //                DELETE Transit Gateway Connection Tests                    //
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
  //                       DELETE Transit Gateway Tests                        //
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
