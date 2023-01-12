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

const MtlsApiV1 = require('../../../dist/cis/mtlsv1/v1');
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

describe('MLTS', () => {
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
    url: config.URL,
  };

  let mtlsapiV1;

  let cert;

  let certificateId;

  let application;

  let applicationId;

  let policy;

  let accesspolicyId;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    mtlsapiV1 = MtlsApiV1.newInstance(options);
    expect(mtlsapiV1).not.toBeNull();
    done();
  });

  describe('clear all Access Applications, Acess Policy, Acess Certificates', () => {
    test('should successfully clear all Access Applications, Acess Policy', async done => {
      try {
        const zoneId = options.zoneIdentifier;
        const listApplicationsParams = {
          zoneId,
        };
        const response = await mtlsapiV1.listAccessApplications(listApplicationsParams);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();
        expect(result.result).toBeDefined();
        if (result.result == null) {
          return done();
        }

        for (let i = 0; i < result.result.length; i++) {
          const appId = result.result[i].id;
          const zoneId = options.zoneIdentifier;
          const params1 = {
            zoneId,
            appId,
          };
          const response2 = mtlsapiV1.deleteAccessApplication(params1);
          expect(response2).toBeDefined();
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

  describe('clear all  Acess Certificates', () => {
    test('should successfully clear all Acess Certificates', async done => {
      try {
        const zoneId = options.zoneIdentifier;
        const listAccessCertificatesParams = {
          zoneId,
        };
        const response = await mtlsapiV1.listAccessCertificates(listAccessCertificatesParams);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();
        expect(result.result).toBeDefined();
        if (result.result == null) {
          return done();
        }

        for (let i = 0; i < result.result.length; i++) {
          const certId = result.result[i].id;
          const zoneId = options.zoneIdentifier;

          const deleteAccessCertificateParams = {
            zoneId,
            certId,
          };
          const response1 = mtlsapiV1.deleteAccessCertificate(deleteAccessCertificateParams);

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

  describe('Create the Access Certificate', () => {
    test('should successfully create the Access Certificate', async done => {
      try {
        const zoneId = options.zoneIdentifier;
        const name = 'test-cert2';
        const certificate =
          '-----BEGIN CERTIFICATE-----\nMIIEFzCCAv+gAwIBAgIJAMhhsP5Ubtu2MA0GCSqGSIb3DQEBCwUAMIGhMQswCQYD\nVQQGEwJpbjESMBAGA1UECAwJa2FybmF0YWthMRIwEAYDVQQHDAliYW5nYWxvcmUx\nDDAKBgNVBAoMA2libTEMMAoGA1UECwwDY2lzMSowKAYDVQQDDCFtdGxzNy5hdXN0\nZXN0LTEwLmNpc3Rlc3QtbG9hZC5jb20xIjAgBgkqhkiG9w0BCQEWE2RhcnVueWEu\nZC5jQGlibS5jb20wHhcNMjIwNDIyMTEwMzU3WhcNMzIwNDE5MTEwMzU3WjCBoTEL\nMAkGA1UEBhMCaW4xEjAQBgNVBAgMCWthcm5hdGFrYTESMBAGA1UEBwwJYmFuZ2Fs\nb3JlMQwwCgYDVQQKDANpYm0xDDAKBgNVBAsMA2NpczEqMCgGA1UEAwwhbXRsczcu\nYXVzdGVzdC0xMC5jaXN0ZXN0LWxvYWQuY29tMSIwIAYJKoZIhvcNAQkBFhNkYXJ1\nbnlhLmQuY0BpYm0uY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA\n3tjgNpucsvwNFPNWl1DXkWGFLzvdMKDdk3PTAJ3AAYFG4jLVDtZurf3qCLZ8fcz+\nnukYdDKhRZYSP9QvGwDTS4mHOTV/6FAYsb7qfke+V8+v0okmCca07KgTUKFR5F9e\nw1NPYW9yRjoVpy/Kgs983WigDBRQeo50wcLYG7APml0ceqsBKZaXOiTVrf2xDSvd\nNn6Qchgd5dmxiP+drypt7BGIf9j8QlN5HvEETfUQQybwJfq9G6KhNKIKcw+IKGIy\nbI03RmItC+eVhwja/t1UldlXt/L3JduwEkq9QNQe080toAZyaQ/9Vymk80DTrffN\njb1YG224XLlflSSdzbUC0QIDAQABo1AwTjAdBgNVHQ4EFgQUs5QUMLmjPfNutr8U\n2zcjT/yH1pYwHwYDVR0jBBgwFoAUs5QUMLmjPfNutr8U2zcjT/yH1pYwDAYDVR0T\nBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAPCqm4rXm0ptf0iSp+u4X60A3U3ON\ntSpKq5BU1KGF0i5/ZB1ia1we2ORdOzeoNIhoffmRCg/a//Ba5fLRhktzXMcT/zwC\nDVxH9OAtFoj6/rfEko6s+NP/WtWMd7YF1w4wVvK189YWSUDKbE4MijeDLvEfBi3T\nStNu14p4gN8hkSLX/3Rn9ZmI2wDIpqsYRF5KPfvNZ0iIpvJoBWjS6bbVYGd3yNs+\nrXez+Q36oEFfMcM35EEt3qo2EGu4mljqZxhIae5Hy4sKe4c6s0AfpYA4wTQ97cAg\nQ0Sdw3p+PIqPMOcY1sjRLbvPDHGbzc60LvKhHgt/7Cc5ntvxIjJ9ZUt5Ng==\n-----END CERTIFICATE-----\n';
        const associatedHostnames = [options.url];
        const createAccessCertificateParams = {
          zoneId,
          name,
          certificate,
          associatedHostnames,
        };

        const response = await mtlsapiV1.createAccessCertificate(createAccessCertificateParams);
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();

        certificateId = result.result.id;
        expect(certificateId).toBeDefined();

        if (result && result.result) {
          cert = result.result;
          expect(cert).toBeDefined();
          expect(result.success).toBeTruthy();
          expect(cert.id).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update the Access Certificate', () => {
    test('should successfully Update the Access Certificate', async done => {
      try {
        const zoneId = options.zoneIdentifier;
        const certId = certificateId;
        const name = 'test-cert';
        const associatedHostnames = [];
        const updateAccessCertificateParams = {
          zoneId,
          certId,
          name,
          associatedHostnames,
        };

        const response = await mtlsapiV1.updateAccessCertificate(updateAccessCertificateParams);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();

        if (result && result.result) {
          expect(result.success).toBeTruthy();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('get the Access Certificate by ID', () => {
    test('should successfully get the Access Certificate', async done => {
      try {
        const zoneId = options.zoneIdentifier;
        const certId = certificateId;
        const getAccessCertificateParams = {
          zoneId,
          certId,
        };

        const response = await mtlsapiV1.getAccessCertificate(getAccessCertificateParams);
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

  describe('Create the Create Access Application', () => {
    test('should successfully create access application', async done => {
      try {
        const zoneId = options.zoneIdentifier;
        const name = 'mtls-test-app';
        const domain = options.url;
        const sessionDuration = '24h';
        const createAccessApplicationParams = {
          zoneId,
          name,
          domain,
          sessionDuration,
        };
        const response = await mtlsapiV1.createAccessApplication(createAccessApplicationParams);

        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();

        applicationId = result.result.id;
        expect(applicationId).toBeDefined();

        if (result && result.result) {
          application = result.result;
          expect(application).toBeDefined();
          expect(result.success).toBeTruthy();
          expect(application.id).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update the access application', () => {
    test('should successfully Update the access application', async done => {
      try {
        const zoneId = options.zoneIdentifier;
        const appId = applicationId;
        const name = 'mtls-test-app1';
        const domain = options.url;
        const sessionDuration = '24h';
        const updateAccessApplicationParams = {
          zoneId,
          appId,
          name,
          domain,
          sessionDuration,
        };

        const response = await mtlsapiV1.updateAccessApplication(updateAccessApplicationParams);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();

        if (result && result.result) {
          expect(result.success).toBeTruthy();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('get the access application by ID', () => {
    test('should successfully get the access application', async done => {
      try {
        const zoneId = options.zoneIdentifier;
        const appId = applicationId;
        const getAccessApplicationParams = {
          zoneId,
          appId,
        };

        const response = await mtlsapiV1.getAccessApplication(getAccessApplicationParams);

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

  describe('Create the Create Access policy', () => {
    test('should successfully create access policy', async done => {
      try {
        const policyRuleModel = {
          certificate: { foo: 'bar' },
        };
        const zoneId = options.zoneIdentifier;
        const appId = applicationId;
        const name = 'mtls-test-policy';
        const decision = 'non_identity';
        const include = [policyRuleModel];
        const createAccessPolicyParams = {
          zoneId,
          appId,
          name,
          decision,
          include,
        };
        const response = await mtlsapiV1.createAccessPolicy(createAccessPolicyParams);

        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();

        accesspolicyId = result.result.id;
        expect(accesspolicyId).toBeDefined();

        if (result && result.result) {
          policy = result.result;
          expect(policy).toBeDefined();
          expect(result.success).toBeTruthy();
          expect(policy.id).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('get the Access policy by ID', () => {
    test('should successfully get the access application', async done => {
      try {
        const zoneId = options.zoneIdentifier;
        const getAccessCertSettingsParams = {
          zoneId,
        };

        const response = await mtlsapiV1.getAccessCertSettings(getAccessCertSettingsParams);

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

  describe('Update the Access policy', () => {
    test('should successfully Update the Access policy', async done => {
      try {
        const policyRuleModel = {
          certificate: { foo: 'bar' },
        };
        const zoneId = options.zoneIdentifier;
        const appId = applicationId;
        const policyId = accesspolicyId;
        const name = 'mtls-test-policy2';
        const decision = 'non_identity';
        const include = [policyRuleModel];
        const updateAccessPolicyParams = {
          zoneId,
          appId,
          policyId,
          name,
          decision,
          include,
        };

        const response = await mtlsapiV1.updateAccessPolicy(updateAccessPolicyParams);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();

        if (result && result.result) {
          expect(result.success).toBeTruthy();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('delete the  Access policy by ID', () => {
    test('should successfully delete  Access policy', async done => {
      try {
        const zoneId = options.zoneIdentifier;
        const appId = applicationId;
        const policyId = accesspolicyId;
        const deleteAccessPolicyParams = {
          zoneId,
          appId,
          policyId,
        };

        const response = await mtlsapiV1.deleteAccessPolicy(deleteAccessPolicyParams);
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
});
