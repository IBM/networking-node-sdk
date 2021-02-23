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

const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const authHelper = require('../../resources/auth-helper.js');
const FirewallEventAnalyticsApiV1 = require('../../../dist/cis/firewalleventanalyticsapiv1/v1');
const ZonesV1 = require('../../../dist/cis/zonesv1/v1');

const timeout = 120000; // two minutes

// Location of our config file.
const configFile = 'cis.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

// Retrieve the config file as an object.
// We do this because we're going to directly use the
// config properties, rather than let the SDK do it for us.
const config = authHelper.loadConfig();

describe('FirewallEventAnalyticsAPIV1', () => {
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
    zoneIdentifier: config.CIS_SERVICES_ZONE_ID,
    zoneId: config.CIS_SERVICES_ZONE_ID,
  };

  let firewallEventAnalytics;
  let zonesV1;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    firewallEventAnalytics = FirewallEventAnalyticsApiV1.newInstance(options);
    expect(firewallEventAnalytics).not.toBeNull();

    zonesV1 = ZonesV1.newInstance(options);
    expect(zonesV1).not.toBeNull();

    done();
  });

  describe('Firewall Event Analytics', () => {
    test('should successfully fetch firewall event analytics', async done => {
      try {
        let response = await zonesV1.listZones();
        let zone;
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        let { result } = response || {};

        if (result && result.result) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          expect(result.result).toBeDefined();
          zone = result.result[0];
        }

        const params = {
          zoneId: zone.id,
        };
        response = await firewallEventAnalytics.firewallEventAnalytics(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        result = response.result || {};
        expect(result).toBeDefined();

        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
