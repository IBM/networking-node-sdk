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

const ZonesV1 = require('../../../dist/cis/zonesv1/v1');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const authHelper = require('../../resources/auth-helper.js');

const timeout = 120000; // two minutes

// Location of our config file.
const configFile = 'cis.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

// Retrieve the config file as an object.
// We do this because we're going to directly use the
// config properties, rather than let the SDK do it for us.
const config = authHelper.loadConfig();

let zonesV1;
let zone;
const NEW_ZONE_NAME = 'testingsdk.';

describe.skip('DNSRecordsApisV1', () => {
  jest.setTimeout(timeout);

  // Initialize the service client.
  const options = {
    authenticator: new IamAuthenticator({
      apikey: config.CIS_SERVICES_APIKEY,
      url: config.CIS_SERVICES_AUTH_URL,
    }),
    crn: config.CIS_SERVICES_CRN,
    serviceUrl: config.CIS_SERVICES_URL,
    version: config.CIS_SERVICES_API_VERSION,
    zoneId: config.CIS_SERVICES_ZONE_ID,
  };

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    zonesV1 = ZonesV1.newInstance(options);
    expect(zonesV1).not.toBeNull();
    done();
  });

  describe('Fetching the List all zones', () => {
    test('should successfully List all zones', async done => {
      try {
        const response = await zonesV1.listZones();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          expect(result.result).toBeDefined();
          zone = result.result[0];
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Create the zone', () => {
    test('should successfully created zone', async done => {
      try {
        const pathByDate = new Date().getTime();
        const params = {
          name: pathByDate + NEW_ZONE_NAME + config.DOMAIN_NAME,
        };
        const response = await zonesV1.createZone(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          zone = result.result;
          expect(zone).toBeDefined();
          expect(zone.name).toEqual(params.name);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update the zone', () => {
    test('should successfully updated zone', async done => {
      try {
        const params = {
          paused: !zone.paused,
          zoneIdentifier: zone.id,
        };
        const response = await zonesV1.updateZone(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          const localZone = result.result;
          expect(localZone).toBeDefined();
          expect(localZone).toBeDefined();
          expect(localZone.name).toEqual(zone.name);
          expect(localZone.paused).toEqual(!zone.paused);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Check the zone', () => {
    test('should successfully checked zone', async done => {
      try {
        const params = {
          zoneIdentifier: zone.id,
        };
        const response = await zonesV1.zoneActivationCheck(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          const localZone = result.result;
          expect(localZone).toBeDefined();
          expect(localZone.id).toEqual(zone.id);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Delete the zone', () => {
    test('should successfully deleted zone', async done => {
      try {
        const params = {
          zoneIdentifier: zone.id,
        };
        const response = await zonesV1.deleteZone(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result.id).toEqual(zone.id);
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
