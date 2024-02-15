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

const SSLCertificateApi = require('../../../dist/cis/ssl-certificate-api/v1');
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
const crn = config.CIS_SERVICES_CRN;
const zoneIdentifier = config.CIS_SERVICES_ZONE_ID;

describe('SSL Certificate', () => {
  jest.setTimeout(timeout);

  // Initialize the service client.
  const options = {
    authenticator: new IamAuthenticator({
      apikey: config.CIS_SERVICES_APIKEY,
      url: config.CIS_SERVICES_AUTH_URL,
    }),
    crn: crn,
    serviceUrl: config.CIS_SERVICES_URL,
    version: config.CIS_SERVICES_API_VERSION,
    zoneIdentifier: zoneIdentifier,
  };

  let sslCertInstance;

  const CertificateStatus = {
    ACTIVE: 'active',
    AUTHORIZING: 'authorizing',
    DELETED: 'deleted',
    INITIALIZING: 'initializing',
    ISSUING: 'issuing',
    NONE: 'none',
    PENDING_ISSUANCE: 'pending_issuance',
    PENDING_VALIDATION: 'pending_validation',
  };

  const SslOption = {
    SSL_OFF: 'off',
    CLIENT_TO_EDGE: 'flexible',
    END_TO_END_FLEX: 'full',
    END_TO_END_CA_SIGNED: 'strict',
  };

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    sslCertInstance = SSLCertificateApi.newInstance(options);
    expect(sslCertInstance).not.toBeNull();
    done();
  });

  // skipping due to travis integ-test fail
  describe.skip('SSL Settings', () => {
    test('successfully fetch ssl setting', async done => {
      try {
        const response = await sslCertInstance.getSslSetting({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toBe('ssl');
          expect(Object.values(CertificateStatus)).toContain(result.result.certificate_status);
          expect(Object.values(SslOption)).toContain(result.result.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully change ssl setting', async done => {
      const params = {
        value: SslOption.END_TO_END_CA_SIGNED,
      };
      try {
        const response = await sslCertInstance.changeSslSetting(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toBe('ssl');
          expect(Object.values(CertificateStatus)).toContain(result.result.certificate_status);
          expect(result.result.value).toContain(SslOption.END_TO_END_CA_SIGNED);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update ssl setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await sslCertInstance.changeSslSetting(params);
      } catch (err) {
        expect(Object.values(SslOption)).not.toContain(params.value);
        done();
      }
      done();
    });
  });

  describe.skip('Universal Certificate Settings', () => {
    test('successfully fetch universal certificate setting', async done => {
      try {
        const response = await sslCertInstance.getUniversalCertificateSetting({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect([true, false]).toContain(result.result.enabled);
          expect(result.result.certificate_authority).toBe('digicert');
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should successfully turn off/disabled universal certificate setting', async done => {
      try {
        const params = {
          enabled: false,
        };
        const response = await sslCertInstance.changeUniversalCertificateSetting(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result && result.result) {
          expect(result.result.enabled).toBeFalsy;
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should successfully turn on/enabled universal certificate setting', async done => {
      try {
        const params = {
          enabled: true,
        };
        const response = await sslCertInstance.changeUniversalCertificateSetting(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result && result.result) {
          expect(result.result.enabled).toBeTruthy;
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update universal certificate setting', async done => {
      const params = {
        enabled: 'test',
      };
      try {
        await sslCertInstance.changeUniversalCertificateSetting(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Tls12 Settings', () => {
    test('successfully fetch tls12 setting', async () => {
      const response = await sslCertInstance.getTls12Setting({});
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      if (result.result && Object.keys(result.result).length > 0) {
        expect(result.result.id).toBe('tls_1_2_only');
        expect(['on', 'off']).toContain(result.result.value);
      }
    });

    test('should successfully turn off/disabled Tls12 setting', async () => {
      const params = {
        value: 'off',
      };
      const response = await sslCertInstance.changeTls12Setting(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      if (result && result.result) {
        expect(result.result.value).toEqual('off');
      }
    });
    // skipping enable case as there is an issue with updating Tls12
    it.skip('should successfully turn on/enabled Tls12 setting', async () => {
      const params = {
        value: 'on',
      };
      const response = await sslCertInstance.changeTls12Setting(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      if (result && result.result) {
        expect(result.result.value).toEqual('on');
      }
    });

    test.skip('should fail to update tls12 setting', async () => {
      try {
        const params = {
          value: 'test',
        };
        await sslCertInstance.changeTls12Setting(params);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('Tls13 Settings', () => {
    test('successfully fetch tls13 setting', async () => {
      const response = await sslCertInstance.getTls13Setting({});
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      if (result.result && Object.keys(result.result).length > 0) {
        expect(result.result.id).toBe('tls_1_3');
        expect(['on', 'off', 'zrt']).toContain(result.result.value);
      }
    });

    test('should successfully turn off/disabled Tls13 setting', async () => {
      const params = {
        value: 'off',
      };
      const response = await sslCertInstance.changeTls13Setting(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      if (result && result.result) {
        expect(result.result.value).toEqual('off');
      }
    });

    test('should successfully turn on/enabled Tls13 setting', async () => {
      const params = {
        value: 'on',
      };
      const response = await sslCertInstance.changeTls13Setting(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};
      if (result && result.result) {
        expect(['on', 'zrt']).toContain(result.result.value);
      }
    });
    test.skip('should fail to update tls13 setting', async () => {
      const params = {
        value: 'test',
      };
      try {
        await sslCertInstance.changeTls13Setting(params);
      } catch (err) {
        expect(Object.values(SslOption)).not.toContain(params.value);
      }
    });
  });

  // this should be automated
  describe.skip('Custom Edge Certificate', () => {
    let customCertificateId;
    test('successfully upload a certificate', async done => {
      try {
        const params = {
          bundle_method: config.CERT_BUNDLE_METHOD,
          certificate: config.CERTIFICATE,
          privateKey: config.PRIVATE_KEY,
        };
        const response = await sslCertInstance.uploadCustomCertificate(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          customCertificateId = result.result.id;
          expect(result.success).toBeTruthy();
          expect(result.result.id).toBeDefined();
          expect(result.result.status).toEqual('active');
          expect(result.result.signature).toEqual('SHA256WithRSA');
          expect(result.result.type).toEqual('legacy_custom');
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully list custom certificates', async done => {
      try {
        const response = await sslCertInstance.listCustomCertificates({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result.result) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully get certificate by id', async done => {
      try {
        const response = await sslCertInstance.getCustomCertificate({
          customCertId: customCertificateId,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully update a custom certificate', async done => {
      try {
        const params = {
          certificate: config.CERTIFICATE, // todo: replace with a new certificate
          privateKey: config.PRIVATE_KEY, // todo: replace with a new certificate
          customCertId: customCertificateId,
        };
        const response = await sslCertInstance.updateCustomCertificate(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          customCertificateId = result.result.id;
          expect(result.success).toBeTruthy();
          expect(result.result.id).toBeDefined();
          expect(result.result.bundle_method).toBe('ubiquitous');
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should successfully change priority of certificates', async done => {
      try {
        const certPriorityReqCertificatesItemModel = {
          customCertId: customCertificateId,
          priority: 1,
        };
        const params = {
          certificates: [certPriorityReqCertificatesItemModel],
        };

        const response = await sslCertInstance.changeCertificatePriority(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          customCertificateId = result.result.id;
          expect(result.success).toBeTruthy();
          expect(result.result.priority).toBe(1);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should successfully delete the certificate', async done => {
      const params = {
        customCertId: customCertificateId,
      };

      try {
        const response = await sslCertInstance.deleteCustomCertificate(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to delete certificate for wrong id', async done => {
      const params = {
        customCertId: '111',
      };
      try {
        await sslCertInstance.deleteCustomCertificate(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Edge Certificate', () => {
    let certificateId;

    test('successfully order a certificate', async () => {
      const params = {
        type: 'advanced',
        hosts: [config.DOMAIN_NAME, `dev.${config.DOMAIN_NAME}`],
        validationMethod: 'txt',
        validityDays: 90,
        certificateAuthority: 'lets_encrypt',
        cloudflareBranding: false,
      };

      const res = await sslCertInstance.orderAdvancedCertificate(params);
      expect(res).toBeDefined();
      expect([200, 201]).toContain(res.status);


      const { result } = res || {};
      if (result.result && Object.keys(result.result).length > 0) {
        certificateId = result.result.id;
        expect(result.success).toBeTruthy();
        expect(result.result.id).toBeDefined();
        expect(result.result.validity_days).toBe(90);
        expect(['initializing', 'pending_deployment']).toContain(result.result.status);
      }
    });

    test.skip('restart certificate validation', async () => {
      const patchCertificateParams = {
        certIdentifier: certificateId,
      };

      const res = await sslCertInstance.patchCertificate(patchCertificateParams);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
    });

    test.skip('get ssl verification info', async () => {
      const params = {
        xCorrelationId: 'testString',
      };

      const res = await sslCertInstance.getSslVerification(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
    });

    test('delete certificate', async () => {
      const params = {
        certIdentifier: certificateId,
        xCorrelationId: 'testString',
      };

      const res = await sslCertInstance.deleteCertificateV2(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
    });

  });


  describe('Origin Certificate', () => {
    let OriginCertificateId;
    sslCertInstance = SSLCertificateApi.newInstance(options);

    test('list origin certificates', async () => {
      const params = {
        crn: crn,
        zoneIdentifier: zoneIdentifier,
      };

      const res = await sslCertInstance.listOriginCertificates(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
    });

    test('create origin certificate', async () => {
      const params = {
        crn: crn,
        zoneIdentifier: zoneIdentifier,
        hostnames: [config.DOMAIN_NAME],
        requestType: 'origin-rsa',
        requestedValidity: 5475,
        csr: '-----BEGIN CERTIFICATE REQUEST-----\nMIICxzCCAa8CAQAwSDELMAkGA1UEBhMCVVMxFjAUBgNVBAgTDVNhbiBGcmFuY2lz\nY28xCzAJBgNVBAcTAkNBMRQwEgYDVQQDEwtleGFtcGxlLm5ldDCCASIwDQYJKoZI\nhvcNAQEBBQADggEPADCCAQoCggEBALxejtu4b+jPdFeFi6OUsye8TYJQBm3WfCvL\nHu5EvijMO/4Z2TImwASbwUF7Ir8OLgH+mGlQZeqyNvGoSOMEaZVXcYfpR1hlVak8\n4GGVr+04IGfOCqaBokaBFIwzclGZbzKmLGwIQioNxGfqFm6RGYGA3be2Je2iseBc\nN8GV1wYmvYE0RR+yWweJCTJ157exyRzu7sVxaEW9F87zBQLyOnwXc64rflXslRqi\ng7F7w5IaQYOl8yvmk/jEPCAha7fkiUfEpj4N12+oPRiMvleJF98chxjD4MH39c5I\nuOslULhrWunfh7GB1jwWNA9y44H0snrf+xvoy2TcHmxvma9Eln8CAwEAAaA6MDgG\nCSqGSIb3DQEJDjErMCkwJwYDVR0RBCAwHoILZXhhbXBsZS5uZXSCD3d3dy5leGFt\ncGxlLm5ldDANBgkqhkiG9w0BAQsFAAOCAQEAcBaX6dOnI8ncARrI9ZSF2AJX+8mx\npTHY2+Y2C0VvrVDGMtbBRH8R9yMbqWtlxeeNGf//LeMkSKSFa4kbpdx226lfui8/\nauRDBTJGx2R1ccUxmLZXx4my0W5iIMxunu+kez+BDlu7bTT2io0uXMRHue4i6quH\nyc5ibxvbJMjR7dqbcanVE10/34oprzXQsJ/VmSuZNXtjbtSKDlmcpw6To/eeAJ+J\nhXykcUihvHyG4A1m2R6qpANBjnA0pHexfwM/SgfzvpbvUg0T1ubmer8BgTwCKIWs\ndcWYTthM51JIqRBfNqy4QcBnX+GY05yltEEswQI55wdiS3CjTTA67sdbcQ==\n-----END CERTIFICATE REQUEST-----',
      };

      const res = await sslCertInstance.createOriginCertificate(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();

      const { result } = res || {};
      if (result.result && Object.keys(result.result).length > 0) {
        OriginCertificateId = result.result.id;
        expect(result.success).toBeTruthy();
        expect(result.result.id).toBeDefined();
      }
    });


    test('get origin certificate', async () => {
      const params = {
        crn: crn,
        zoneIdentifier: zoneIdentifier,
        certIdentifier: OriginCertificateId,
      };

      const res = await sslCertInstance.getOriginCertificate(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
    });

    test('delete origin certificate', async () => {
      const params = {
        crn: crn,
        zoneIdentifier: zoneIdentifier,
        certIdentifier: OriginCertificateId,
      };

      const res = await sslCertInstance.revokeOriginCertificate(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
    });
  });
});
