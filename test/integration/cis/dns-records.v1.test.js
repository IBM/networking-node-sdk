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

const DNSRecordsApisV1 = require('../../../dist/cis/dnsrecordsv1/v1');
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

let DNS_RECORD_ID;

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
    zoneIdentifier: config.CIS_SERVICES_ZONE_ID,
  };

  let dnsRecords;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    dnsRecords = DNSRecordsApisV1.newInstance(options);
    expect(dnsRecords).not.toBeNull();
    done();
  });

  describe('Create dns record', () => {
    test('should successfully create the dns record', async done => {
      try {
        const params = {
          name: 'www',
          type: 'A',
          content: '192.168.117.112',
        };

        const response = await dnsRecords.createDnsRecord(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        DNS_RECORD_ID = result.result.id;
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Fetch or Get the DNS record', () => {
    test('should successfully fetch the dns record', async done => {
      try {
        const params = {
          dnsrecordIdentifier: DNS_RECORD_ID,
        };
        const response = await dnsRecords.getDnsRecord(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update the DNS records', () => {
    test('should successfully update the dns record', async done => {
      try {
        const params = {
          dnsrecordIdentifier: DNS_RECORD_ID,
          name: 'www-testing',
          type: 'A',
          content: '192.168.117.102',
        };
        const response = await dnsRecords.updateDnsRecord(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result.name).toEqual(params.name + '.' + result.result.zone_name);

        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('List DNS Records', () => {
    test('should successfully list the dns records', async done => {
      try {
        const response = await dnsRecords.listAllDnsRecords();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();

        if (result.result && result.result.length > 0) {
          expect(result.result[0].zone_id).toEqual(config.CIS_SERVICES_ZONE_ID);
          expect(result.result.length).toBeGreaterThan(0);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should successfully list the dns records with params', async done => {
      try {
        const params = {
          perPage: 5,
        };
        const response = await dnsRecords.listAllDnsRecords(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();

        if (result.result && result.result.length > 0) {
          expect(result.result[0].zone_id).toEqual(config.CIS_SERVICES_ZONE_ID);
          expect(result.result.length).toBeGreaterThan(0);

          const { result_info } = result || {};
          expect(result_info).toBeDefined();

          expect(result_info.per_page).toEqual(params.perPage);
        }

        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Deletion of DNS records', () => {
    test('should successfully delete the dns record', async done => {
      try {
        const params = {
          dnsrecordIdentifier: DNS_RECORD_ID,
        };
        const response = await dnsRecords.deleteDnsRecord(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
