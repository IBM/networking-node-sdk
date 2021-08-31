/**
 * Copyright 2020 IBM All Rights Reserved.
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
jest test/integration/direct-link-provider.v2.test.js

*/

'use strict';

const DirectLinkProviderV2 = require('../../dist/direct-link-provider/v2');
const DirectLinkV1 = require('../../dist/direct-link/v1');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

const timeout = 120000; // two minutes

const currentDate = new Date();
const timestamp = currentDate.getTime().toString();

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

// Location of our config file.
const configFile = 'directlink.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

// Retrieve the config file as an object.
// We do this because we're going to directly use the
// config properties, rather than let the SDK do it for us.
const config = authHelper.loadConfig();

const providerOptions = {
  authenticator: new IamAuthenticator({
    apikey: config.PROVIDER_APIKEY,
    url: config.IAMURL,
  }),
  serviceUrl: config.SERVICE_URL_V2,
  version: '2020-06-01',
};

const options = {
  authenticator: new IamAuthenticator({
    apikey: config.IAMAPIKEY,
    url: config.IAMURL,
  }),
  serviceUrl: config.SERVICE_URL,
  version: '2020-06-01',
};

// Initialize the direct link service client.
const dlService = new DirectLinkV1(options);

// Initialize the provider.
const dlProviderService = new DirectLinkProviderV2(providerOptions);

describe('DirectLinkProviderV2', () => {
  describe('Direct Link Provider Ports', () => {
    jest.setTimeout(timeout);

    let portId = '';

    it('should successfully lists the ports', async done => {
      try {
        const response = await dlProviderService.listProviderPorts({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result.ports.length).toBeGreaterThan(0);
        portId = result.ports[0].id;
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully fetch the port by id', async done => {
      try {
        const response = await dlProviderService.getProviderPort({ id: portId });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};

        expect(result.id).toEqual(portId);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Direct Link Provider Gateways', () => {
    jest.setTimeout(timeout);

    let portId = '';
    let gatewayId = '';

    const params = {
      name: 'NODE-INT-SDK-PROVIDER-' + timestamp,
      speedMbps: 1000,
      bgpAsn: 64999,
      metered: false,
      customerAccountId: config.CUSTOMER_ACCT_ID,
    };

    it('should successfully get a provider port', async done => {
      try {
        const response = await dlProviderService.listProviderPorts({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result.ports.length).toBeGreaterThan(0);
        portId = result.ports[0].id;
        done();
      } catch (err) {
        done(err);
      }
    });

    it('successfully create a provider gateway', async done => {
      try {
        const response = await dlProviderService.createProviderGateway({
          ...params,
          port: { id: portId },
        });
        expect(response).toBeDefined();
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(201);

        if (null != response && null != response.result && null != response.result.id) {
          gatewayId = response.result.id;
        }

        expect(response.result.id).toBeDefined();
        expect(response.result.name).toEqual(params.name);
        expect(response.result.type).toEqual('connect');
        expect(response.result.speed_mbps).toEqual(params.speedMbps);
        expect(response.result.bgp_asn).toEqual(params.bgpAsn);
        expect(response.result.operational_status).toEqual('create_pending');
        expect(response.result.customer_account_id).toEqual(config.CUSTOMER_ACCT_ID);
        expect(response.result.provider_api_managed).toBeTruthy();
        expect(response.result.bgp_cer_cidr).not.toBe('');
        expect(response.result.bgp_ibm_cidr).not.toBe('');
        expect(response.result.bgp_ibm_asn).not.toBe('');
        expect(response.result.bgp_status).not.toBe('');
        expect(response.result.created_at).not.toBe('');
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully get the created gateway', async done => {
      try {
        const response = await dlProviderService.getProviderGateway({ id: gatewayId });
        expect(response).toBeDefined();
        expect(response.status).toBe(200);

        expect(response.result.id).toBeDefined();
        expect(response.result.name).toEqual(params.name);
        expect(response.result.type).toEqual('connect');
        expect(response.result.speed_mbps).toEqual(params.speedMbps);
        expect(response.result.bgp_asn).toEqual(params.bgpAsn);
        expect(response.result.operational_status).toEqual('create_pending');
        expect(response.result.customer_account_id).toEqual(config.CUSTOMER_ACCT_ID);
        expect(response.result.provider_api_managed).toBeTruthy();
        expect(response.result.bgp_cer_cidr).not.toBe('');
        expect(response.result.bgp_ibm_cidr).not.toBe('');
        expect(response.result.bgp_ibm_asn).not.toBe('');
        expect(response.result.bgp_status).not.toBe('');
        expect(response.result.created_at).not.toBe('');
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully list the gateways', async done => {
      try {
        const response = await dlProviderService.listProviderGateways({});
        expect(response).toBeDefined();
        expect(response.status).toBe(200);

        const { result } = response || {};
        expect(result.gateways.length).toBeGreaterThan(0);
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should fail to update the created gateway due to invalid status', async done => {
      const params = {
        id: gatewayId,
        name: 'NODE-INT-SDK-PROVIDER-PATCH-' + timestamp,
      };
      try {
        await dlProviderService.updateProviderGateway(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        expect(err.message).toBe('Cannot update a gateway with current status');
        done();
      }
      done();
    });

    it('should successfully delete a gateway', async done => {
      try {
        const response = await dlProviderService.deleteProviderGateway({ id: gatewayId });
        expect(response).toBeDefined();
        expect(response.status).toBe(204);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Direct Link Provider Gateways with Client API', () => {
    jest.setTimeout(timeout);

    const gwName = 'NODE-INT-SDK-PROVIDER-' + timestamp;
    const updatedGWName = 'NODE-INT-SDK-PROVIDER-PATCH-' + timestamp;
    const speedMbps = 1000;
    const updatedSpeedMbps = 2000;

    let portId = '';
    let gatewayId = '';

    const params = {
      name: gwName,
      speedMbps,
      bgpAsn: 64999,
      metered: false,
      customerAccountId: config.CUSTOMER_ACCT_ID,
    };

    it('should successfully get the provider port', async done => {
      try {
        const response = await dlProviderService.listProviderPorts({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result.ports.length).toBeGreaterThan(0);
        portId = result.ports[0].id;
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should create a provider gateway', async done => {
      try {
        const response = await dlProviderService.createProviderGateway({
          ...params,
          port: { id: portId },
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);
        gatewayId = response.result.id;
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully verify that client account can see the created gatway', async done => {
      try {
        const response = await dlService.getGateway({ id: gatewayId });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result.id).toBe(gatewayId);
        expect(result.name).toEqual(gwName);
        expect(result.type).toEqual('connect');
        expect(result.speed_mbps).toEqual(speedMbps);
        expect(result.bgp_asn).toEqual(params.bgpAsn);
        expect(result.operational_status).toEqual('create_pending');
        expect(result.provider_api_managed).toBeTruthy();
        expect(result.bgp_cer_cidr).not.toBe('');
        expect(result.bgp_ibm_cidr).not.toBe('');
        expect(result.bgp_ibm_asn).not.toBe('');
        expect(result.bgp_status).not.toBe('');
        expect(result.created_at).not.toBe('');
        expect(result.port.id).toBe(portId);
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully approve the provider created gateway', async done => {
      try {
        const response = await dlService.createGatewayAction({
          id: gatewayId,
          action: 'create_gateway_approve',
          global: false,
          metered: false,
        });

        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result.id).toBe(gatewayId);
        expect(result.name).toEqual(gwName);
        expect(result.type).toEqual('connect');
        expect(result.speed_mbps).toEqual(speedMbps);
        expect(result.bgp_asn).toEqual(params.bgpAsn);
        expect(result.operational_status).toEqual('create_pending');
        expect(result.provider_api_managed).toBeTruthy();
        expect(result.bgp_cer_cidr).not.toBe('');
        expect(result.bgp_ibm_cidr).not.toBe('');
        expect(result.bgp_ibm_asn).not.toBe('');
        expect(result.bgp_status).not.toBe('');
        expect(result.created_at).not.toBe('');
        expect(result.port.id).toBe(portId);
        expect(result.global).toBeFalsy();
        expect(result.metered).toBeFalsy();
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for the gateway to move to provisioned state', async done => {
      try {
        const result = await poll(
          () => dlService.getGateway({ id: gatewayId }),
          result => result.operational_status === 'provisioned',
          50
        );

        expect(result).toBeDefined();
        expect(result.operational_status).toEqual('provisioned');
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully update the name of the gateway', async done => {
      try {
        const response = await dlProviderService.updateProviderGateway({
          id: gatewayId,
          name: updatedGWName,
        });

        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result.name).toEqual(updatedGWName);
        expect(result.id).toEqual(gatewayId);
        expect(result.type).toEqual('connect');
        expect(result.speed_mbps).toEqual(speedMbps);
        expect(result.bgp_asn).toEqual(params.bgpAsn);
        expect(result.operational_status).toEqual('provisioned');
        expect(result.customer_account_id).toEqual(config.CUSTOMER_ACCT_ID);
        expect(result.provider_api_managed).toBeTruthy();
        expect(result.bgp_cer_cidr).not.toBe('');
        expect(result.bgp_ibm_cidr).not.toBe('');
        expect(result.bgp_ibm_asn).not.toBe('');
        expect(result.bgp_status).not.toBe('');
        expect(result.created_at).not.toBe('');
        expect(result.port.id).toBe(portId);
        expect(result.global).toBeFalsy();
        expect(result.metered).toBeFalsy();
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully request the speed update of the gateway', async done => {
      try {
        const response = await dlProviderService.updateProviderGateway({
          id: gatewayId,
          speedMbps: updatedSpeedMbps,
        });

        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result.name).toEqual(updatedGWName);
        expect(result.id).toEqual(gatewayId);
        expect(result.type).toEqual('connect');
        expect(result.speed_mbps).toEqual(speedMbps); // Speed not updated yet
        expect(result.bgp_asn).toEqual(params.bgpAsn);
        expect(result.operational_status).toEqual('provisioned');
        expect(result.customer_account_id).toEqual(config.CUSTOMER_ACCT_ID);
        expect(result.provider_api_managed).toBeTruthy();
        expect(result.bgp_cer_cidr).not.toBe('');
        expect(result.bgp_ibm_cidr).not.toBe('');
        expect(result.bgp_ibm_asn).not.toBe('');
        expect(result.bgp_status).not.toBe('');
        expect(result.created_at).not.toBe('');
        expect(result.port.id).toBe(portId);
        expect(result.global).toBeFalsy();
        expect(result.metered).toBeFalsy();
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully approve gateway speed change using client account', async done => {
      try {
        const response = await dlService.createGatewayAction({
          id: gatewayId,
          action: 'update_attributes_approve',
          updates: [
            {
              speed_mbps: updatedSpeedMbps,
            },
          ],
        });

        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result.name).toEqual(updatedGWName);
        expect(result.id).toEqual(gatewayId);
        expect(result.type).toEqual('connect');
        expect(result.speed_mbps).toEqual(updatedSpeedMbps); // Speed updated now
        expect(result.bgp_asn).toEqual(params.bgpAsn);
        expect(result.operational_status).toEqual('configuring');
        expect(result.provider_api_managed).toBeTruthy();
        expect(result.bgp_cer_cidr).not.toBe('');
        expect(result.bgp_ibm_cidr).not.toBe('');
        expect(result.bgp_ibm_asn).not.toBe('');
        expect(result.bgp_status).not.toBe('');
        expect(result.created_at).not.toBe('');
        expect(result.port.id).toBe(portId);
        expect(result.global).toBeFalsy();
        expect(result.metered).toBeFalsy();
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for the gateway to move to provisioned state', async done => {
      try {
        const result = await poll(
          () => dlProviderService.getProviderGateway({ id: gatewayId }),
          result => result.operational_status === 'provisioned',
          100
        );

        expect(result).toBeDefined();
        expect(result.operational_status).toEqual('provisioned');
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully request delete gateway using provider account', async done => {
      try {
        const response = await dlProviderService.deleteProviderGateway({ id: gatewayId });
        expect(response).toBeDefined();
        expect(response.status).toEqual(202);
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully reject delete gayeway using client account', async done => {
      try {
        const response = await dlService.createGatewayAction({
          id: gatewayId,
          action: 'delete_gateway_reject',
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully verify reject gateway using client account', async done => {
      try {
        const response = await dlService.getGateway({ id: gatewayId });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const result = response || {};

        expect(result.change_request).toBeUndefined();
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for the gateway to move to provisioned state', async done => {
      try {
        const result = await poll(
          () => dlProviderService.getProviderGateway({ id: gatewayId }),
          result => result.operational_status === 'provisioned',
          100
        );

        expect(result).toBeDefined();
        expect(result.operational_status).toEqual('provisioned');
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully re-request delete gateway using provider account', async done => {
      try {
        const response = await dlProviderService.deleteProviderGateway({ id: gatewayId });
        expect(response).toBeDefined();
        expect(response.status).toEqual(202);
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully approve delete gayeway using client account', async done => {
      try {
        const response = await dlService.createGatewayAction({
          id: gatewayId,
          action: 'delete_gateway_approve',
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(204);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Direct Link Provider Gateways with Client API with authenticationKey', () => {
    jest.setTimeout(timeout);

    const time = currentDate.getTime().toString();
    const gwName = 'NODE-INT-SDK-PROVIDER-' + time;
    const speedMbps = 1000;

    let portId = '';
    let gatewayId = '';

    const params = {
      name: gwName,
      speedMbps,
      bgpAsn: 64999,
      metered: false,
      customerAccountId: config.CUSTOMER_ACCT_ID,
    };

    it('should successfully get the provider port', async done => {
      try {
        const response = await dlProviderService.listProviderPorts({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result.ports.length).toBeGreaterThan(0);
        portId = result.ports[0].id;
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should create a provider gateway', async done => {
      try {
        const response = await dlProviderService.createProviderGateway({
          ...params,
          port: { id: portId },
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);
        gatewayId = response.result.id;
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully approve the provider created gateway', async done => {
      try {
        const response = await dlService.createGatewayAction({
          id: gatewayId,
          action: 'create_gateway_approve',
          global: false,
          metered: false,
          authenticationKey: {
            crn: config.AUTHENTICATION_KEY,
          },
        });

        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        expect(result.id).toBe(gatewayId);
        expect(result.name).toEqual(gwName);
        expect(result.authentication_key.crn).toEqual(config.AUTHENTICATION_KEY);
        expect(result.type).toEqual('connect');
        expect(result.speed_mbps).toEqual(speedMbps);
        expect(result.bgp_asn).toEqual(params.bgpAsn);
        expect(result.operational_status).toEqual('create_pending');
        expect(result.provider_api_managed).toBeTruthy();
        expect(result.bgp_cer_cidr).not.toBe('');
        expect(result.bgp_ibm_cidr).not.toBe('');
        expect(result.bgp_ibm_asn).not.toBe('');
        expect(result.bgp_status).not.toBe('');
        expect(result.created_at).not.toBe('');
        expect(result.port.id).toBe(portId);
        expect(result.global).toBeFalsy();
        expect(result.metered).toBeFalsy();
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for the gateway to move to provisioned state', async done => {
      try {
        const result = await poll(
          () => dlProviderService.getProviderGateway({ id: gatewayId }),
          result => result.operational_status === 'provisioned',
          100
        );

        expect(result).toBeDefined();
        expect(result.operational_status).toEqual('provisioned');
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully request delete gateway using provider account', async done => {
      try {
        const response = await dlProviderService.deleteProviderGateway({ id: gatewayId });
        expect(response).toBeDefined();
        expect(response.status).toEqual(202);
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully approve delete gayeway using client account', async done => {
      try {
        const response = await dlService.createGatewayAction({
          id: gatewayId,
          action: 'delete_gateway_approve',
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(204);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Direct Link Provider Gateways with DLAAS', () => {
    jest.setTimeout(timeout);

    const time = currentDate.getTime().toString();
    const gwName = 'NODE-INT-SDK-PROVIDER-DLAAS-' + time;
    const speedMbps = 1000;

    let portId = '';
    let gatewayId = '';

    const params = {
      name: gwName,
      speedMbps,
      bgpAsn: 64999,
      metered: false,
      customerAccountId: config.CUSTOMER_ACCT_ID,
    };

    it('should successfully get the provider port', async done => {
      try {
        const response = await dlProviderService.listProviderPorts({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result.ports.length).toBeGreaterThan(0);
        portId = result.ports[0].id;
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should create a provider gateway', async done => {
      try {
        const response = await dlProviderService.createProviderGateway({
          ...params,
          port: { id: portId },
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);
        gatewayId = response.result.id;
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully approve the provider created gateway with connection mode set as transit', async done => {
      try {
        const response = await dlService.createGatewayAction({
          id: gatewayId,
          action: 'create_gateway_approve',
          global: false,
          metered: false,
          connectionMode: 'transit',
        });

        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        expect(result.id).toBe(gatewayId);
        expect(result.name).toEqual(gwName);
        expect(result.connection_mode).toEqual('transit');
        expect(result.type).toEqual('connect');
        expect(result.speed_mbps).toEqual(speedMbps);
        expect(result.bgp_asn).toEqual(params.bgpAsn);
        expect(result.port.id).toBe(portId);
        expect(result.global).toBeFalsy();
        expect(result.metered).toBeFalsy();
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for the gateway to move to provisioned state', async done => {
      try {
        const result = await poll(
          () => dlProviderService.getProviderGateway({ id: gatewayId }),
          result => result.operational_status === 'provisioned',
          100
        );

        expect(result).toBeDefined();
        expect(result.operational_status).toEqual('provisioned');
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully request delete gateway using provider account', async done => {
      try {
        const response = await dlProviderService.deleteProviderGateway({ id: gatewayId });
        expect(response).toBeDefined();
        expect(response.status).toEqual(202);
        done();
      } catch (err) {
        done(err);
      }
    });

    it('should successfully approve delete gayeway using client account', async done => {
      try {
        const response = await dlService.createGatewayAction({
          id: gatewayId,
          action: 'delete_gateway_approve',
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(204);
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
