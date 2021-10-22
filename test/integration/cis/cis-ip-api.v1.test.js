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

const DNSRecordsApisV1 = require('../../../dist/cis/cisipapiv1/v1');
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

describe('CisIpApiV1', () => {
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
  };

  let cisIpApiV1;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    cisIpApiV1 = DNSRecordsApisV1.newInstance(options);
    expect(cisIpApiV1).not.toBeNull();
    done();
  });

  describe('Fetch or Get the DNS record', () => {
    test('should successfully fetch the dns record', async done => {
      try {
        const response = await cisIpApiV1.listIps();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        const data = result.result;
        expect(data).toBeDefined();

        const ip4CIDRs = data.ipv4_cidrs;
        expect(ip4CIDRs).toBeDefined();
        expect(ip4CIDRs.length).toBeGreaterThanOrEqual(0);

        const ip6CIDRs = data.ipv6_cidrs;
        expect(ip6CIDRs).toBeDefined();
        expect(ip6CIDRs.length).toBeGreaterThanOrEqual(0);

        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
