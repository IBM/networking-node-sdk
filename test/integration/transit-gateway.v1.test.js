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
'use strict';

const TransitGatewayApisV1 = require('../../dist/transit-gateway-apis/v1');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

const timeout = 120000; // two minutes

// Location of our config file.
const configFile = 'transit-gateway.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

// Retrieve the config file as an object.
// We do this because we're going to directly use the
// config properties, rather than let the SDK do it for us.
const config = authHelper.loadConfig();

let GATEWAY_INSTANCE_ID;
let CONN_INSTANCE_ID;

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

describe('TransitGatewayApisV1', () => {
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

  describe('Create Transit Gateway', () => {
    const gatewayName = config.GATEWAY_NAME;
    const gatewayLocation = config.LOCATION;

    const params = {
      name: gatewayName,
      location: gatewayLocation,
    };

    test('should successfully create a gateway', async done => {
      try {
        const response = await transitGateway.createTransitGateway(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.name).toEqual(gatewayName);
        expect(result.location).toEqual(gatewayLocation);
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
          50
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
        await transitGateway.createTransitGateway(params);
      } catch (err) {
        expect(err.status).toEqual(409);
        expect(err.message).toEqual('A gateway with the same name already exists.');
        done();
      }
      done();
    });
  });

  describe('List Gateways', () => {
    test('should list all the gateways', async done => {
      try {
        const response = await transitGateway.listTransitGateways({});
        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.transit_gateways.length).toBeGreaterThan(0);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update Gateway', () => {
    const updateGatewayName = config.UPDATE_GATEWAY_NAME;

    test('should successfully update the name of the gateway', async done => {
      try {
        const params = {
          id: GATEWAY_INSTANCE_ID,
          name: updateGatewayName,
        };

        const response = await transitGateway.updateTransitGateway(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.name).toEqual(updateGatewayName);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update the gateway with wrong instance id', async done => {
      try {
        const params = {
          id: '111',
          name: updateGatewayName,
        };
        await transitGateway.updateTransitGateway(params);
      } catch (err) {
        expect(err.status).toEqual(404);
        expect(err.message).toEqual('The gateway was not found.');
        done();
      }

      done();
    });
  });

  describe('Get Gateway By Id', () => {
    test('should successfully fetches the gateway by instance id', async done => {
      try {
        const response = await transitGateway.getTransitGateway({ id: GATEWAY_INSTANCE_ID });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.id).toEqual(GATEWAY_INSTANCE_ID);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to get gateway by instance id', async done => {
      try {
        await transitGateway.getTransitGateway({ id: '111' });
      } catch (err) {
        expect(err.status).toEqual(404);
        expect(err.message).toEqual('The gateway was not found.');
        done();
      }
      done();
    });
  });

  describe('Create Transit Gateway Connection', () => {
    test('successfully creates resource', async done => {
      const connectionName = config.GATEWAY_CONNECTION_NAME;
      const type = 'vpc';
      const crn = config.VPC_CRN;

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

        CONN_INSTANCE_ID = result.id;
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully wait for the connection to report as attached', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.getTransitGatewayConnection({
              transitGatewayId: GATEWAY_INSTANCE_ID,
              id: CONN_INSTANCE_ID,
            }),
          result => result.status === 'attached',
          50
        );

        expect(result).toBeDefined();
        expect(result.status).toEqual('attached');

        done();
      } catch (err) {
        done(err);
      }
    });

    test('fail to create a resource', async done => {
      try {
        await transitGateway.createTransitGatewayConnection({
          transitGatewayId: 'testString',
          networkType: 'testString',
          name: 'testString',
        });
        done();
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }

      done();
    });
  });

  describe('List Gateway Connections', () => {
    test('should list all the connections for a gateway', async done => {
      try {
        const response = await transitGateway.listTransitGatewayConnections({
          transitGatewayId: GATEWAY_INSTANCE_ID,
        });
        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.connections.length).toBeGreaterThan(0);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update Gateway Connection', () => {
    test('successfully update a gateway connection name by instance id', async done => {
      try {
        const response = await transitGateway.updateTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: CONN_INSTANCE_ID,
          name: 'NODE-SDK-INT-CONN-UPDATED',
        });

        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.name).toEqual('NODE-SDK-INT-CONN-UPDATED');
        done();
      } catch (err) {
        done(err);
      }
    });

    test('fail to update resource by instance id', async done => {
      try {
        await transitGateway.updateTransitGatewayConnection({
          transitGatewayId: '111',
          id: '111',
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

  describe('List Transit Gateway Connection', () => {
    test('sucessfully get gateway connection by id', async done => {
      try {
        const response = await transitGateway.getTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: CONN_INSTANCE_ID,
        });

        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.id).toEqual(CONN_INSTANCE_ID);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('fail to get gateway connection by instanceID', async done => {
      try {
        await transitGateway.getTransitGatewayConnection({
          transitGatewayId: '111',
          id: '111',
        });
        done();
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }

      done();
    });
  });

  describe('Delete Transit Gateway Connection', () => {
    test('successfully delete resource by instanceID', async done => {
      try {
        const response = await transitGateway.deleteTransitGatewayConnection({
          transitGatewayId: GATEWAY_INSTANCE_ID,
          id: CONN_INSTANCE_ID,
        });

        expect(response.status).toBe(204);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully waits for the connection to report as deleted', async done => {
      try {
        const result = await poll(
          () =>
            transitGateway.getTransitGatewayConnection({
              transitGatewayId: GATEWAY_INSTANCE_ID,
              id: CONN_INSTANCE_ID,
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

    test('Failed to delete the transit gateway connection by instance id', async done => {
      try {
        await transitGateway.deleteTransitGatewayConnection({
          transitGatewayId: '111',
          id: '111',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        done();
      }

      done();
    });
  });

  describe('Delete Transit Gateway', () => {
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
          50
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
          id: '111',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        expect(err.message).toEqual('The gateway was not found.');
        done();
      }

      done();
    });
  });

  describe('List Locations', () => {
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

  describe('Get Location', () => {
    test('successfully get location by ID', async done => {
      try {
        const response = await transitGateway.getGatewayLocation({
          name: config.LOCATION_NAME,
        });

        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.name).toEqual(config.LOCATION_NAME);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('fail to get location by instance id', async done => {
      try {
        await transitGateway.getGatewayLocation({
          name: '111',
        });
      } catch (err) {
        expect(err.status).toEqual(404);
        expect(err.message).toEqual('The location was not found.');
        done();
      }

      done();
    });
  });
});
