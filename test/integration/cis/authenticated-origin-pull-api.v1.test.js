/**
 * Copyright 2022 IBM All Rights Reserved.
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

const AuthenticatedOriginPullApiV1 = require('../../../dist/cis/authenticated-origin-pull-apiv1/v1');
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

describe('Authenticated Origin Pull', () => {
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

  let authenticatedOriginpullapiV1;

  let zoneOriginPull;

  let zoneOriginPullId;

  let hostname;

  let hostnameId;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    authenticatedOriginpullapiV1 = AuthenticatedOriginPullApiV1.newInstance(options);
    expect(authenticatedOriginpullapiV1).not.toBeNull();
    done();
  });

  describe('clear all Authenticated Zone OriginPull', () => {
    test('should successfully clear all Authenticated OriginPull', async done => {
      try {
        const response = await authenticatedOriginpullapiV1.listZoneOriginPullCertificates();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();
        expect(result.result).toBeDefined();
        if (result.result == null) {
          return done();
        }

        for (let i = 0; i < result.result.length; i++) {
          const certIdentifier = result.result[i].id;
          const xCorrelationId = '45678';
          const params1 = {
            certIdentifier,
            xCorrelationId,
          };
          const response1 = authenticatedOriginpullapiV1.deleteZoneOriginPullCertificate(params1);
          expect(response1).toBeDefined();
        }
        if (result && result.result) {
          expect(result.result.length).toBeGreaterThanOrEqual(0);
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('clear all Per-hostname Authenticated Origin Pull', () => {
    test('should successfully clear all Per-hostname Authenticated Origin Pull', async done => {
      try {
        const xCorrelationId = 'testString';
        const params = {
          xCorrelationId,
        };
        const response = await authenticatedOriginpullapiV1.listAllPerHostnameAuthenticatedOriginPullCertificates(
          params
        );
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();
        expect(result.result).toBeDefined();
        if (result.result == null) {
          return done();
        }

        for (let i = 0; i < result.result.length; i++) {
          const certIdentifier = result.result[i].id;
          const xCorrelationId = '45678';
          const params1 = {
            certIdentifier,
            xCorrelationId,
          };
          const response1 = authenticatedOriginpullapiV1.deleteHostnameOriginPullCertificate(
            params1
          );
          expect(response1).toBeDefined();
        }
        if (result && result.result) {
          expect(result.result.length).toBeGreaterThanOrEqual(0);
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Create the Zone OriginPull Certificate', () => {
    test('should successfully upload Zone OriginPull Certificate', async done => {
      try {
        const certificate =
          '-----BEGIN CERTIFICATE-----\nMIIDpjCCAo4CCQDiw+/u+5c4eTANBgkqhkiG9w0BAQsFADCBlDELMAkGA1UEBhMC\nSU4xEjAQBgNVBAgMCUtBUk5BVEFLQTESMBAGA1UEBwwJQkFOR0FMT1JFMQwwCgYD\nVQQKDANJQk0xEjAQBgNVBAsMCUlCTSBDTE9VRDEXMBUGA1UEAwwOaWJtdGVzdG1h\nY2hpbmUxIjAgBgkqhkiG9w0BCQEWE2RhcnVueWEuZC5jQGlibS5jb20wHhcNMjIw\nNDA0MTM1ODE2WhcNMjMwNDA0MTM1ODE2WjCBlDELMAkGA1UEBhMCSU4xEjAQBgNV\nBAgMCUtBUk5BVEFLQTESMBAGA1UEBwwJQkFOR0FMT1JFMQwwCgYDVQQKDANJQk0x\nEjAQBgNVBAsMCUlCTSBDTE9VRDEXMBUGA1UEAwwOaWJtdGVzdG1hY2hpbmUxIjAg\nBgkqhkiG9w0BCQEWE2RhcnVueWEuZC5jQGlibS5jb20wggEiMA0GCSqGSIb3DQEB\nAQUAA4IBDwAwggEKAoIBAQCxg0xZgI+JExNCL41AK7FSphsHGP18/RsmrVHiQxGS\nONnh4pBtMJ+/HnnqEoko52L9GGWadu9494JG4vb1Oz3jBJx6vyOBAfJX9EIO0JCz\n/bDdOgyAl9L4MzXF0T5Mc511jHcwMH8jLgczC7hPVm2Acz68z3OFajViLEq7d3+a\n3pC1YV93P3BWn0tNCnHMfUmiXTg40iCVSl1BDpg1hwQnY/L6zAAF+k2jhCJ6W8Ny\nCukSbZ0sEzrhNteYASzWS9k2KMJT8PxoX6bmDWiVVIGHW08YnOC9OZjxHG8fagFs\npEn2FDFc0KNpH7lpLc1qMfWI/i/7cOkHjpqahuD6z9xLAgMBAAEwDQYJKoZIhvcN\nAQELBQADggEBAJIMKN23ChGVU6v+2GT3nnUh5IcZO5qb2bEJrvlyb30uVD8FoBkP\nh7dXlOGsh6tReLB0HLGOz9bnDO1Xzls73So8Ep3M2Xk/42JdzKwXL+Bw3KKTEHP/\n9QUijuwqFTW13KIwX2PWfpYpZTkQwWpi6FS7io+JtEAfO/c5MuwjaWLBEGm7t+HX\nIG21Z2TyIMhFfFoprZG98BSJA4bdqW5gZL2gijoKEtXYpkx65u+4txV566jg2dDr\nKwnFm3A0zHZ3ObRWNt6Vat0SUqOnMOeb0yGNNoxgnoc2NSXlg3+PH9e9FBs5uKE8\npfOqqBCXtdq9QUKjIJnujw/CsYWW4vqLNRI=\n-----END CERTIFICATE-----\n';
        const privateKey =
          '-----BEGIN RSA PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxg0xZgI+JExNC\nL41AK7FSphsHGP18/RsmrVHiQxGSONnh4pBtMJ+/HnnqEoko52L9GGWadu9494JG\n4vb1Oz3jBJx6vyOBAfJX9EIO0JCz/bDdOgyAl9L4MzXF0T5Mc511jHcwMH8jLgcz\nC7hPVm2Acz68z3OFajViLEq7d3+a3pC1YV93P3BWn0tNCnHMfUmiXTg40iCVSl1B\nDpg1hwQnY/L6zAAF+k2jhCJ6W8NyCukSbZ0sEzrhNteYASzWS9k2KMJT8PxoX6bm\nDWiVVIGHW08YnOC9OZjxHG8fagFspEn2FDFc0KNpH7lpLc1qMfWI/i/7cOkHjpqa\nhuD6z9xLAgMBAAECggEAbO29NE8HxX3HG55Cd1ZYgfccLsbPBpvqxVkmHko5xhjM\n2yhEqDxmSslQ1qp5MHiM7fLCpn7FhN2dPBKaqPGpkF2MCGaySr//Dqn8v0qNAWZz\n2c19TovcEiKapME6EYAA59lCanfYDKZ6FIDkoQrQNzqBDSvgH8aE67FySoeR7l4O\nX2ltn2iEDdfbx7oFRdvA4mq2JfnIEK7faaVF+AybwDdn0WGyzcvsju85uEtHF/SS\n75BtwFZzyTNuEcjhBWevA9dTjBFMcnpWx2HgxyO/oKcNuiG8KFQMOoPLlfKw8Lwt\ntqhYmoV1ATmLsdsp9v3d2alvO3WlOrzWcBCS91jqQQKBgQDrAbLflXNOtFjwChEQ\nh6JzFbFGCeQw+avkh+h4qMPKpuX+kMzOQRZb30PDY+zxSDD5lJXqRxTNa5TsByVj\n8GAGWvy/84pLmB6KR/ujVJ+DH0OlqyEQTPttrTtrEkI0uw6cO/AGP6Fb8Gp0/3QN\n0np1She1iptPHxi9HFUhjFONvwKBgQDBXsp56yDmRAnl7twrCNvQTCB1dq7nPZE6\n/7N+Vpznon1k9At92rHErgYo9Rib21o/hPNeQJTIaey70ODB7q0BRv2e2PXwfyN3\nJrJwGYRRO8vLO/zrhHVxzjDt405bXR5R/j2IpR2pgrLXqpx+PfzujWFayQFkbzHf\ncqQBEwzsdQKBgGvzztBIHbzEuaoiZa5bL/N/vnw25PzeY+jJya9Ljw0TV8l1iK8i\nVPwE9mLWDyzTBbRQXgFNf6/RQIqfybw72lBxEXO3kwqgqT7KTDy+Dbw062U51Clh\nw4mhLw9DRuhkGRUJr3ufVScfrDdsdUo4Koqga324WxmgZkPQtQaBKIyPAoGAWudN\n9jyj7bwEjzRYCl8Svvxasf3GQWz/DiZQ4k6jWn1Xx5K2qEacFWLeAHkgRXy8E2pT\n4nYnu4OYR77tOh4S9KvD5N4H2DRcntHxRqOoQWwD5RnhT3Kop4SQGfUmy+qdq1wC\n328H371Sh/JruSk484hBQSWHYwinAG1rThn/lFUCgYA3okRpQKVulm7xg/g7pKwy\nxvBVlNVa0BxtqFO+vn//kfW7CMNSJQO5m+X0y7wYoX0yYsXHAX/PusuCsJGuvjnd\nnvKzVqYTUQ5HMA0rk80TizM34loHbrDnCwMS0WJTNyyt/QC+KRcrKHXvuHYgu2J6\nSjci4j+SSooywqCcC4Liww==\n-----END RSA PRIVATE KEY-----\n';
        const xCorrelationId = '45678';
        const params = {
          certificate: certificate,
          privateKey: privateKey,
          xCorrelationId: xCorrelationId,
        };
        const response = await authenticatedOriginpullapiV1.uploadZoneOriginPullCertificate(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();

        zoneOriginPullId = result.result.id;
        expect(zoneOriginPullId).toBeDefined();

        if (result && result.result) {
          zoneOriginPull = result.result;
          expect(zoneOriginPull).toBeDefined();
          expect(result.success).toBeTruthy();
          expect(zoneOriginPull.id).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('get the Zone OriginPull Certificate by ID', () => {
    test('should successfully get Zone OriginPull Certificate', async done => {
      try {
        const certIdentifier = zoneOriginPullId;
        const xCorrelationId = '45678';
        const params = {
          certIdentifier: certIdentifier,
          xCorrelationId: xCorrelationId,
        };
        const response = await authenticatedOriginpullapiV1.getZoneOriginPullCertificate(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('set Zone Origin Pull Settings', () => {
    test('should successfully set Zone Origin Pull Settings', async done => {
      try {
        const enabled = true;
        const xCorrelationId = '45678';
        const params = {
          enabled: enabled,
          xCorrelationId: xCorrelationId,
        };
        const response = await authenticatedOriginpullapiV1.setZoneOriginPullSettings(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(202);

        const { result } = response || {};
        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('get Zone Origin Pull Settings', () => {
    test('should successfully get Zone Origin Pull Settings', async done => {
      try {
        const xCorrelationId = '45678';
        const params = {
          xCorrelationId: xCorrelationId,
        };
        const response = await authenticatedOriginpullapiV1.getZoneOriginPullSettings(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(202);

        const { result } = response || {};
        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('list Zone Origin Pull Certificates', () => {
    test('should successfully list Zone Origin Pull Certificates', async done => {
      try {
        const response = await authenticatedOriginpullapiV1.listZoneOriginPullCertificates();
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

  describe('delete the Zone OriginPull Certificate by ID', () => {
    test('should successfully delete Zone OriginPull Certificate', async done => {
      const xCorrelationId = '45678';
      try {
        const params = {
          certIdentifier: zoneOriginPullId,
          xCorrelationId: xCorrelationId,
        };
        const response = await authenticatedOriginpullapiV1.deleteZoneOriginPullCertificate(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe.skip('Create the Per-hostname Authenticated Origin Pull', () => {
    test('should successfully upload Per-hostname Authenticated Origin Pull', async done => {
      try {
        const certificate =
          '-----BEGIN CERTIFICATE-----\nMIIDpjCCAo4CCQDiw+/u+5c4eTANBgkqhkiG9w0BAQsFADCBlDELMAkGA1UEBhMC\nSU4xEjAQBgNVBAgMCUtBUk5BVEFLQTESMBAGA1UEBwwJQkFOR0FMT1JFMQwwCgYD\nVQQKDANJQk0xEjAQBgNVBAsMCUlCTSBDTE9VRDEXMBUGA1UEAwwOaWJtdGVzdG1h\nY2hpbmUxIjAgBgkqhkiG9w0BCQEWE2RhcnVueWEuZC5jQGlibS5jb20wHhcNMjIw\nNDA0MTM1ODE2WhcNMjMwNDA0MTM1ODE2WjCBlDELMAkGA1UEBhMCSU4xEjAQBgNV\nBAgMCUtBUk5BVEFLQTESMBAGA1UEBwwJQkFOR0FMT1JFMQwwCgYDVQQKDANJQk0x\nEjAQBgNVBAsMCUlCTSBDTE9VRDEXMBUGA1UEAwwOaWJtdGVzdG1hY2hpbmUxIjAg\nBgkqhkiG9w0BCQEWE2RhcnVueWEuZC5jQGlibS5jb20wggEiMA0GCSqGSIb3DQEB\nAQUAA4IBDwAwggEKAoIBAQCxg0xZgI+JExNCL41AK7FSphsHGP18/RsmrVHiQxGS\nONnh4pBtMJ+/HnnqEoko52L9GGWadu9494JG4vb1Oz3jBJx6vyOBAfJX9EIO0JCz\n/bDdOgyAl9L4MzXF0T5Mc511jHcwMH8jLgczC7hPVm2Acz68z3OFajViLEq7d3+a\n3pC1YV93P3BWn0tNCnHMfUmiXTg40iCVSl1BDpg1hwQnY/L6zAAF+k2jhCJ6W8Ny\nCukSbZ0sEzrhNteYASzWS9k2KMJT8PxoX6bmDWiVVIGHW08YnOC9OZjxHG8fagFs\npEn2FDFc0KNpH7lpLc1qMfWI/i/7cOkHjpqahuD6z9xLAgMBAAEwDQYJKoZIhvcN\nAQELBQADggEBAJIMKN23ChGVU6v+2GT3nnUh5IcZO5qb2bEJrvlyb30uVD8FoBkP\nh7dXlOGsh6tReLB0HLGOz9bnDO1Xzls73So8Ep3M2Xk/42JdzKwXL+Bw3KKTEHP/\n9QUijuwqFTW13KIwX2PWfpYpZTkQwWpi6FS7io+JtEAfO/c5MuwjaWLBEGm7t+HX\nIG21Z2TyIMhFfFoprZG98BSJA4bdqW5gZL2gijoKEtXYpkx65u+4txV566jg2dDr\nKwnFm3A0zHZ3ObRWNt6Vat0SUqOnMOeb0yGNNoxgnoc2NSXlg3+PH9e9FBs5uKE8\npfOqqBCXtdq9QUKjIJnujw/CsYWW4vqLNRI=\n-----END CERTIFICATE-----\n';
        const privateKey =
          '-----BEGIN RSA PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxg0xZgI+JExNC\nL41AK7FSphsHGP18/RsmrVHiQxGSONnh4pBtMJ+/HnnqEoko52L9GGWadu9494JG\n4vb1Oz3jBJx6vyOBAfJX9EIO0JCz/bDdOgyAl9L4MzXF0T5Mc511jHcwMH8jLgcz\nC7hPVm2Acz68z3OFajViLEq7d3+a3pC1YV93P3BWn0tNCnHMfUmiXTg40iCVSl1B\nDpg1hwQnY/L6zAAF+k2jhCJ6W8NyCukSbZ0sEzrhNteYASzWS9k2KMJT8PxoX6bm\nDWiVVIGHW08YnOC9OZjxHG8fagFspEn2FDFc0KNpH7lpLc1qMfWI/i/7cOkHjpqa\nhuD6z9xLAgMBAAECggEAbO29NE8HxX3HG55Cd1ZYgfccLsbPBpvqxVkmHko5xhjM\n2yhEqDxmSslQ1qp5MHiM7fLCpn7FhN2dPBKaqPGpkF2MCGaySr//Dqn8v0qNAWZz\n2c19TovcEiKapME6EYAA59lCanfYDKZ6FIDkoQrQNzqBDSvgH8aE67FySoeR7l4O\nX2ltn2iEDdfbx7oFRdvA4mq2JfnIEK7faaVF+AybwDdn0WGyzcvsju85uEtHF/SS\n75BtwFZzyTNuEcjhBWevA9dTjBFMcnpWx2HgxyO/oKcNuiG8KFQMOoPLlfKw8Lwt\ntqhYmoV1ATmLsdsp9v3d2alvO3WlOrzWcBCS91jqQQKBgQDrAbLflXNOtFjwChEQ\nh6JzFbFGCeQw+avkh+h4qMPKpuX+kMzOQRZb30PDY+zxSDD5lJXqRxTNa5TsByVj\n8GAGWvy/84pLmB6KR/ujVJ+DH0OlqyEQTPttrTtrEkI0uw6cO/AGP6Fb8Gp0/3QN\n0np1She1iptPHxi9HFUhjFONvwKBgQDBXsp56yDmRAnl7twrCNvQTCB1dq7nPZE6\n/7N+Vpznon1k9At92rHErgYo9Rib21o/hPNeQJTIaey70ODB7q0BRv2e2PXwfyN3\nJrJwGYRRO8vLO/zrhHVxzjDt405bXR5R/j2IpR2pgrLXqpx+PfzujWFayQFkbzHf\ncqQBEwzsdQKBgGvzztBIHbzEuaoiZa5bL/N/vnw25PzeY+jJya9Ljw0TV8l1iK8i\nVPwE9mLWDyzTBbRQXgFNf6/RQIqfybw72lBxEXO3kwqgqT7KTDy+Dbw062U51Clh\nw4mhLw9DRuhkGRUJr3ufVScfrDdsdUo4Koqga324WxmgZkPQtQaBKIyPAoGAWudN\n9jyj7bwEjzRYCl8Svvxasf3GQWz/DiZQ4k6jWn1Xx5K2qEacFWLeAHkgRXy8E2pT\n4nYnu4OYR77tOh4S9KvD5N4H2DRcntHxRqOoQWwD5RnhT3Kop4SQGfUmy+qdq1wC\n328H371Sh/JruSk484hBQSWHYwinAG1rThn/lFUCgYA3okRpQKVulm7xg/g7pKwy\nxvBVlNVa0BxtqFO+vn//kfW7CMNSJQO5m+X0y7wYoX0yYsXHAX/PusuCsJGuvjnd\nnvKzVqYTUQ5HMA0rk80TizM34loHbrDnCwMS0WJTNyyt/QC+KRcrKHXvuHYgu2J6\nSjci4j+SSooywqCcC4Liww==\n-----END RSA PRIVATE KEY-----\n';
        const xCorrelationId = '45678';
        const params = {
          certificate: certificate,
          privateKey: privateKey,
          xCorrelationId: xCorrelationId,
        };
        const response = await authenticatedOriginpullapiV1.uploadHostnameOriginPullCertificate(
          params
        );
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();

        hostnameId = result.result.id;
        expect(hostnameId).toBeDefined();

        if (result && result.result) {
          hostname = result.result;
          expect(hostname).toBeDefined();
          expect(result.success).toBeTruthy();
          expect(hostname.id).toBeDefined();
        }

        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe.skip('get Hostname OriginPull Certificate by ID', () => {
    test('should successfully get Zone OriginPull Certificate', async done => {
      try {
        const certIdentifier = hostnameId;
        const xCorrelationId = '45678';
        const params = {
          certIdentifier: certIdentifier,
          xCorrelationId: xCorrelationId,
        };
        const response = await authenticatedOriginpullapiV1.getHostnameOriginPullCertificate(
          params
        );
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe.skip('set Hostname OriginPull Settings', () => {
    test('should successfully set Hostname OriginPull Settings', async done => {
      try {
        const params = {
          hostname: 'darunya.austest-10.cistest-load.com',
          cert_id: hostnameId,
          enabled: true,
        };
        const config = [params];
        const xCorrelationId = '45678';
        const setHostnameOriginPullSettingsParams = {
          config,
          xCorrelationId,
        };
        const response = await authenticatedOriginpullapiV1.setHostnameOriginPullSettings(
          setHostnameOriginPullSettingsParams
        );
        expect(response).toBeDefined();
        expect(response.status).toEqual(202);

        const { result } = response || {};
        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe.skip('delete Hostname OriginPull Certificate by ID', () => {
    test('should successfully delete Hostname OriginPull Certificate', async done => {
      const xCorrelationId = '45678';
      try {
        const params = {
          certIdentifier: hostnameId,
          xCorrelationId: xCorrelationId,
        };
        const response = await authenticatedOriginpullapiV1.deleteHostnameOriginPullCertificate(
          params
        );
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
