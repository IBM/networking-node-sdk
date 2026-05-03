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

const ZoneSettingsApi = require('../../../dist/cis/zones-settings/v1');
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

const ChallengeTTL = [
  300,
  900,
  1800,
  2700,
  3600,
  7200,
  10800,
  14400,
  28800,
  57600,
  86400,
  604800,
  2592000,
  31536000,
];
const MinTlsVersion = ['1.0', '1.1', '1.2', '1.3'];
const MaxUpload = [
  100,
  125,
  150,
  175,
  200,
  225,
  250,
  275,
  300,
  325,
  350,
  375,
  400,
  425,
  450,
  475,
  500,
];

describe.skip('Zones Settings', () => {
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

  let zoneInstance;

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    zoneInstance = ZoneSettingsApi.newInstance(options);
    expect(zoneInstance).not.toBeNull();
    done();
  });

  describe('Zone DNS SEC', () => {
    let status;
    test('successfully fetch zoneDnssec', async () => {
      
        const response = await zoneInstance.getZoneDnssec({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(['active', 'pending', 'disabled']).toContain(result.result.status);
          status = result.result.status;
        }
    });
  });

  describe('Opportunistic Encryption', () => {
    let value;
    test('successfully fetch OpportunisticEncryption', async () => {
      
        const response = await zoneInstance.getOpportunisticEncryption({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('opportunistic_encryption');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
    });
    test('successfully update opportunistic encryption', async () => {
      const params = {
        value: 'off',
      };
      
        const response = await zoneInstance.updateOpportunisticEncryption(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous opportunistic encryptionc setting', async () => {
      const params = {
        value: value,
      };
      
        const response = await zoneInstance.updateOpportunisticEncryption(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
    });

    test('should fail to update opportunistic encryption', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateOpportunisticEncryption(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Challenge TTL', () => {
    let value;
    test('successfully get Challenge Ttl', async () => {
      
        const response = await zoneInstance.getChallengeTtl({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('challenge_ttl');
          expect(ChallengeTTL).toContain(result.result.value);
          value = result.result.value;
        }
    });
    test('successfully update challenge TTL', async () => {
      const params = {
        value: 7200,
      };
      
        const response = await zoneInstance.updateChallengeTtl(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous challenge TTL', async () => {
      const params = {
        value: value,
      };
      
        const response = await zoneInstance.updateChallengeTtl(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
    });

    test('should fail to update challenge TTL', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateChallengeTtl(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Automatic Https Rewrites', () => {
    let value;
    test('successfully fetch automatic httpsRmewrites', async () => {
      
        const response = await zoneInstance.getAutomaticHttpsRewrites({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('automatic_https_rewrites');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
    });
    test('successfully update automatic httpsRmewrites', async () => {
      const params = {
        value: 'off',
      };
      
        const response = await zoneInstance.updateAutomaticHttpsRewrites(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous challenge TTL', async () => {
      const params = {
        value: value,
      };
      
        const response = await zoneInstance.updateAutomaticHttpsRewrites(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
    });

    test('should fail to update challenge TTL', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateAutomaticHttpsRewrites(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('True Client IP', () => {
    let value;
    test('successfully fetch trueclientip setting', async () => {
      
        const response = await zoneInstance.getTrueClientIp({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('true_client_ip_header');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
    });
    test('successfully update trueclientip', async () => {
      const params = {
        value: 'off',
      };
      
        const response = await zoneInstance.updateTrueClientIp(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous trueclientip setting', async () => {
      const params = {
        value: value,
      };
      
        const response = await zoneInstance.updateTrueClientIp(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
    });

    test('should fail to update trueclientip', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateTrueClientIp(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Always Use Https setting', () => {
    let value;
    test('successfully fetch always use https flag/setting', async () => {
      
        const response = await zoneInstance.getAlwaysUseHttps({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('always_use_https');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
    });
    test('successfully update always use https setting', async () => {
      const params = {
        value: 'off',
      };
      
        const response = await zoneInstance.updateAlwaysUseHttps(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous always use https setting', async () => {
      const params = {
        value: value,
      };
      
        const response = await zoneInstance.updateAlwaysUseHttps(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
    });

    test('should fail to update always use https setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateAlwaysUseHttps(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Image Size Optimization', () => {
    let value;
    test('successfully get ImageSizeOptimization setting', async () => {
      
        const response = await zoneInstance.getImageSizeOptimization({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('image_size_optimization');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
    });
    test('successfully update ImageSizeOptimization setting', async () => {
      const params = {
        value: 'off',
      };
      
        const response = await zoneInstance.updateImageSizeOptimization(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous ImageSizeOptimization setting', async () => {
      const params = {
        value: value,
      };
      
        const response = await zoneInstance.updateImageSizeOptimization(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
    });

    test('should fail to update ImageSizeOptimization setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateImageSizeOptimization(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Script Load Optimization', () => {
    let value;
    test('successfully get ScriptLoadOptimization setting', async () => {
      
        const response = await zoneInstance.getScriptLoadOptimization({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('script_load_optimization');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
    });
    test('successfully update ScriptLoadOptimization setting', async () => {
      const params = {
        value: 'off',
      };
      
        const response = await zoneInstance.updateScriptLoadOptimization(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous ScriptLoadOptimization setting', async () => {
      const params = {
        value: value,
      };
      
        const response = await zoneInstance.updateScriptLoadOptimization(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
    });

    test('should fail to update ScriptLoadOptimization setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateScriptLoadOptimization(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Image Load Optimization', () => {
    let value;
    test('successfully get ImageLoadOptimization setting', async () => {
      
        const response = await zoneInstance.getImageLoadOptimization({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('image_load_optimization');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
    });
    test('successfully update ImageLoadOptimization setting', async () => {
      const params = {
        value: 'off',
      };
      
        const response = await zoneInstance.updateImageLoadOptimization(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous ImageLoadOptimization setting', async () => {
      const params = {
        value: value,
      };
      
        const response = await zoneInstance.updateImageLoadOptimization(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
    });

    test('should fail to update ImageLoadOptimization setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateImageLoadOptimization(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Minify Setting', () => {
    let minifiedValue;
    test('successfully get minify setting', async () => {
      
        const response = await zoneInstance.getMinify({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('minify');
          expect(['on', 'off']).toContain(result.result.value.css);
          expect(['on', 'off']).toContain(result.result.value.html);
          expect(['on', 'off']).toContain(result.result.value.js);
          minifiedValue = result.result.value;
        }
    });
    test('successfully update minify setting', async () => {
      const params = {
        value: {
          ...minifiedValue,
          js: 'off',
        },
      };
      
        const response = await zoneInstance.updateMinify(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toMatchObject(params.value);
        }
    });

    test('successfully reset previous minify setting', async () => {
      const params = {
        value: minifiedValue,
      };
      
        const response = await zoneInstance.updateMinify(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toMatchObject(minifiedValue);
        }
    });

    test('should fail to update minify setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateMinify(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Min TLS Version', () => {
    let minTlsVersion;
    test('successfully fetch MinTlsVersion', async () => {
      
        const response = await zoneInstance.getMinTlsVersion({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('min_tls_version');
          expect(MinTlsVersion).toContain(result.result.value);
          minTlsVersion = result.result.value;
        }
    });
    test('successfully update MinTlsVersion', async () => {
      const params = {
        value: '1.1',
      };
      
        const response = await zoneInstance.updateMinTlsVersion(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous MinTlsVersion', async () => {
      const params = {
        value: minTlsVersion,
      };
      
        const response = await zoneInstance.updateMinTlsVersion(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(minTlsVersion);
        }
    });

    test('should fail to update MinTlsVersion', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateMinTlsVersion(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Ip Geolocation', () => {
    let ipGeoLocation;
    test('successfully get IpGeolocation', async () => {
      
        const response = await zoneInstance.getIpGeolocation({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('ip_geolocation');
          expect(['on', 'off']).toContain(result.result.value);
          ipGeoLocation = result.result.value;
        }
    });
    test('successfully update/turn off IpGeolocation', async () => {
      const params = {
        value: 'off',
      };
      
        const response = await zoneInstance.updateIpGeolocation(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous IpGeolocation', async () => {
      const params = {
        value: ipGeoLocation,
      };
      
        const response = await zoneInstance.updateIpGeolocation(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(ipGeoLocation);
        }
    });

    test('should fail to update IpGeolocation', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateIpGeolocation(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Server Side Exclude', () => {
    let storedValue;
    test('successfully get ServerSideExclude setting', async () => {
      
        const response = await zoneInstance.getServerSideExclude({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('server_side_exclude');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
    });
    test('successfully update/turn off  ServerSideExclude setting', async () => {
      const params = {
        value: 'off',
      };
      
        const response = await zoneInstance.updateServerSideExclude(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous  ServerSideExclude setting', async () => {
      const params = {
        value: storedValue,
      };
      
        const response = await zoneInstance.updateServerSideExclude(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
    });

    test('should fail to update  ServerSideExclude setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateServerSideExclude(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Security Header', () => {
    let securityHeader;
    test('successfully get SecurityHeader setting', async () => {
      
        const response = await zoneInstance.getSecurityHeader({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('security_header');
          expect(result.result.value).toMatchObject({
            strict_transport_security: {
              enabled: true,
              include_subdomains: true,
              nosniff: true,
              preload: false,
            },
          });
          securityHeader = result.result.value;
        }
    });
    test('successfully enable SecurityHeader strict transport setting', async () => {
      const params = {
        value: {
          ...securityHeader,
          strict_transport_security: {
            ...securityHeader.strict_transport_security,
            enabled: true,
          },
        },
      };
      
        const response = await zoneInstance.updateSecurityHeader(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value.strict_transport_security.enabled).toBe(true);
        }
    });

    test('successfully reset previous  SecurityHeader setting', async () => {
      const params = {
        value: securityHeader,
      };
      
        const response = await zoneInstance.updateSecurityHeader(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toMatchObject(securityHeader);
        }
    });

    test('should fail to update  ServerSideExclude setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateSecurityHeader(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Prefetch Preload Setting', () => {
    let storedValue;
    test('successfully get Prefetch Preload setting', async () => {
      
        const response = await zoneInstance.getPrefetchPreload({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('prefetch_preload');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
    });
    test('successfully update/turn off Prefetch Preload setting', async () => {
      const params = {
        value: 'off',
      };
      
        const response = await zoneInstance.updatePrefetchPreload(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous Prefetch Preload setting', async () => {
      const params = {
        value: storedValue,
      };
      
        const response = await zoneInstance.updatePrefetchPreload(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
    });

    test('should fail to update Prefetch Preload setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updatePrefetchPreload(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Http2 setting', () => {
    let storedValue;
    test('successfully get Http2', async () => {
      
        const response = await zoneInstance.getHttp2({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('http2');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
    });
    test('successfully update/turn on Http2 setting', async () => {
      const params = {
        value: 'on',
      };
      
        const response = await zoneInstance.updateHttp2(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous Http2 setting', async () => {
      const params = {
        value: storedValue,
      };
      
        const response = await zoneInstance.updateHttp2(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
    });

    test('should fail to update Http2 setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateHttp2(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Http3 setting', () => {
    let storedValue;
    test('successfully get Http3', async () => {
      
        const response = await zoneInstance.getHttp3({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('http3');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
    });
    test('successfully update/turn on Http3 setting', async () => {
      const params = {
        value: 'on',
      };
      
        const response = await zoneInstance.updateHttp3(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous Http3 setting', async () => {
      const params = {
        value: storedValue,
      };
      
        const response = await zoneInstance.updateHttp3(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
    });

    test('should fail to update Http3 setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateHttp3(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Ipv6', () => {
    let storedValue;
    test('successfully get Ipv6', async () => {
      
        const response = await zoneInstance.getIpv6({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('ipv6');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
    });
    test('successfully update/turn on Ipv6', async () => {
      const params = {
        value: 'on',
      };
      
        const response = await zoneInstance.updateIpv6(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous Ipv6', async () => {
      const params = {
        value: storedValue,
      };
      
        const response = await zoneInstance.updateIpv6(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
    });

    test('should fail to update Ipv6', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateIpv6(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Web Sockets', () => {
    let storedValue;
    test('successfully fetch web socket setting', async () => {
      
        const response = await zoneInstance.getWebSockets({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('websockets');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
    });
    test('successfully update/turn on web socket setting', async () => {
      const params = {
        value: 'on',
      };
      
        const response = await zoneInstance.updateWebSockets(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous web socket setting', async () => {
      const params = {
        value: storedValue,
      };
      
        const response = await zoneInstance.updateWebSockets(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
    });

    test('should fail to update web socket setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateWebSockets(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('PseudoIpv4', () => {
    let storedValue;
    test('successfully get PseudoIpv4', async () => {
      
        const response = await zoneInstance.getPseudoIpv4({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('pseudo_ipv4');
          expect(['off', 'add_header', 'overwrite_header']).toContain(result.result.value);
          storedValue = result.result.value;
        }
    });
    test('successfully update/turn on PseudoIpv4', async () => {
      const params = {
        value: 'add_header',
      };
      
        const response = await zoneInstance.updatePseudoIpv4(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous PseudoIpv4', async () => {
      const params = {
        value: storedValue,
      };
      
        const response = await zoneInstance.updatePseudoIpv4(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
    });

    test('should fail to update PseudoIpv4', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updatePseudoIpv4(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Response Buffering', () => {
    let storedValue;
    test('successfully fetch response buffering', async () => {
      
        const response = await zoneInstance.getResponseBuffering({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('response_buffering');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
    });
    test('successfully update/turn on response buffering setting', async () => {
      const params = {
        value: 'on',
      };
      
        const response = await zoneInstance.updateResponseBuffering(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous response buffering setting', async () => {
      const params = {
        value: storedValue,
      };
      
        const response = await zoneInstance.updateResponseBuffering(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
    });

    test('should fail to update response buffering setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateResponseBuffering(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Hot Link Protection', () => {
    let storedValue;
    test('successfully fetch hot link protection setting buffering', async () => {
      
        const response = await zoneInstance.getHotlinkProtection({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('hotlink_protection');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
    });
    test('successfully update/turn on hot link protection setting', async () => {
      const params = {
        value: 'on',
      };
      
        const response = await zoneInstance.updateHotlinkProtection(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous hot link protection setting', async () => {
      const params = {
        value: storedValue,
      };
      
        const response = await zoneInstance.updateHotlinkProtection(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
    });

    test('should fail to update hot link protection setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateHotlinkProtection(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('MaxUpload setting', () => {
    let storedValue;
    test('successfully fetch MaxUpload value', async () => {
      
        const response = await zoneInstance.getMaxUpload({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('max_upload');
          expect(MaxUpload).toContain(result.result.value);
          storedValue = result.result.value;
        }
    });
    test('successfully update MaxUpload setting', async () => {
      const params = {
        value: 125,
      };
      
        const response = await zoneInstance.updateMaxUpload(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous MaxUpload', async () => {
      const params = {
        value: storedValue,
      };
      
        const response = await zoneInstance.updateMaxUpload(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
    });

    test('should fail to update MaxUpload', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateMaxUpload(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('TlsClientAuth', () => {
    let storedValue;
    test('successfully fetch tls client auth value', async () => {
      
        const response = await zoneInstance.getTlsClientAuth({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('tls_client_auth');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
    });
    test('successfully update/turn on tls client auth setting', async () => {
      const params = {
        value: 'on',
      };
      
        const response = await zoneInstance.updateTlsClientAuth(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous tls client auth setting', async () => {
      const params = {
        value: storedValue,
      };
      
        const response = await zoneInstance.updateTlsClientAuth(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
    });

    test('should fail to update response tls client auth setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateResponseBuffering(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Verify Browser Check', () => {
    let storedValue;
    test('successfully fetch browser check data', async () => {
      
        const response = await zoneInstance.getBrowserCheck({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('browser_check');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
    });
    test('successfully update/turn on browser check setting', async () => {
      const params = {
        value: 'on',
      };
      
        const response = await zoneInstance.updateBrowserCheck(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous browser check setting', async () => {
      const params = {
        value: storedValue,
      };
      
        const response = await zoneInstance.updateBrowserCheck(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
    });

    test('should fail to update browser check setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateBrowserCheck(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Enable Error PagesOn', () => {
    let storedValue;
    test('successfully fetch EnableErrorPagesOn', async () => {
      
        const response = await zoneInstance.getEnableErrorPagesOn({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('origin_error_page_pass_thru');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
    });
    test('successfully update/turn on EnableErrorPagesOn', async () => {
      const params = {
        value: 'on',
      };
      
        const response = await zoneInstance.updateEnableErrorPagesOn(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous EnableErrorPagesOn', async () => {
      const params = {
        value: storedValue,
      };
      
        const response = await zoneInstance.updateEnableErrorPagesOn(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
    });

    test('should fail to update EnableErrorPagesOn', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateEnableErrorPagesOn(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Web Application Firewall', () => {
    let storedValue;
    test('successfully fetch WebApplicationFirewall', async () => {
      
        const response = await zoneInstance.getWebApplicationFirewall({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('waf');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
    });
    test('successfully update/turn on WebApplicationFirewall', async () => {
      const params = {
        value: 'on',
      };
      
        const response = await zoneInstance.updateWebApplicationFirewall(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous WebApplicationFirewall', async () => {
      const params = {
        value: storedValue,
      };
      
        const response = await zoneInstance.updateWebApplicationFirewall(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
    });

    test('should fail to update WebApplicationFirewall', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateWebApplicationFirewall(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Ciphers', () => {
    let storedCiphers = [];
    test('successfully fetch ciphers data', async () => {
      
        const response = await zoneInstance.getCiphers({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('ciphers');
          storedCiphers = result.result.value;
        }
    });
    test('successfully update/turn on ciphers', async () => {
      const params = {
        value: ['ECDHE-RSA-AES128-GCM-SHA256', 'AES128-SHA'],
      };
      
        const response = await zoneInstance.updateCiphers(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toEqual(params.value);
        }
    });

    test('successfully reset previous ciphers', async () => {
      const params = {
        value: storedCiphers,
      };
      
        const response = await zoneInstance.updateCiphers(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toEqual(storedCiphers);
        }
    });

    test('should fail to update ciphers', async () => {
      const params = {
        value: ['test'],
      };
      
        await expect(zoneInstance.updateCiphers(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Mobile Redirect Setting', () => {
    let storedValue;
    test('successfully fetch MobileRedirect setting', async () => {
      
        const response = await zoneInstance.getMobileRedirect({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('mobile_redirect');
          expect(['on', 'off']).toContain(result.result.value.status);
          storedValue = result.result.value;
        }
    });
    test('successfully update/turn on  MobileRedirect setting', async () => {
      const params = {
        value: {
          status: 'on',
          mobile_subdomain: config.SUB_DOMAIN_NAME,
          strip_uri: false,
        },
      };
      
        const response = await zoneInstance.updateMobileRedirect(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value.status).toEqual('on');
        }
    });

    test('successfully reset previous  MobileRedirect setting', async () => {
      const params = {
        value: {
          ...storedValue,
          status: 'off',
        },
      };
      
        const response = await zoneInstance.updateMobileRedirect(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toMatchObject(params.value);
        }
    });

    test('should fail to update  MobileRedirect setting', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateMobileRedirect(params)).rejects.toMatchObject({
        status: 400,
      });
    });

  describe('Opportunistic Onion', () => {
    let value;
    test('successfully fetch OpportunisticOnion', async () => {
      const response = await zoneInstance.getOpportunisticOnion({});
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      if (result.result && Object.keys(result.result).length > 0) {
        expect(result.result.id).toEqual('opportunistic_onion');
        expect(['on', 'off']).toContain(result.result.value);
        value = result.result.value;
      }
    });
    test('successfully update opportunistic onion', async () => {
      const params = {
        value: 'off',
      };
      const response = await zoneInstance.updateOpportunisticOnion(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      if (result.result && Object.keys(result.result).length > 0) {
        expect(result.result.value).toBe(params.value);
      }
    });

    test('successfully reset previous opportunistic onion setting', async () => {
      const params = {
        value: value,
      };
      const response = await zoneInstance.updateOpportunisticOnion(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      if (result.result && Object.keys(result.result).length > 0) {
        expect(result.result.value).toBe(value);
      }
    });

    test('should fail to update opportunistic onion', async () => {
      const params = {
        value: 'test',
      };
      await expect(zoneInstance.updateOpportunisticOnion(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Bot Management', () => {
    let value;
    test('successfully fetch BotManagement', async () => {
      
        const response = await zoneInstance.getBotManagement({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result && result.success) {
          expect(result.success).toBe(true);
          if (result.result) {
            value = result.result.value;
          }
        }
    });
    test('successfully update bot management', async () => {
      const params = {
        enableJs: true,
        useLatestModel: true,
      };
      
        const response = await zoneInstance.updateBotManagement(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result && result.success) {
          expect(result.success).toBe(true);
        }
    });

    test('successfully reset previous bot management setting', async () => {
      const params = {
        enableJs: false,
        useLatestModel: false,
      };
      
        const response = await zoneInstance.updateBotManagement(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result && result.success) {
          expect(result.success).toBe(true);
        }
    });
  });

  describe('Brotli', () => {
    let value;
    test('successfully fetch Brotli', async () => {
      
        const response = await zoneInstance.getBrotli({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('brotli');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
    });
    test('successfully update brotli', async () => {
      const params = {
        value: 'on',
      };
      
        const response = await zoneInstance.updateBrotli(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous brotli setting', async () => {
      const params = {
        value: value,
      };
      
        const response = await zoneInstance.updateBrotli(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
    });

    test('should fail to update brotli', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateBrotli(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Email Obfuscation', () => {
    let value;
    test('successfully fetch EmailObfuscation', async () => {
      
        const response = await zoneInstance.getEmailObfuscation({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('email_obfuscation');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
    });
    test('successfully update email obfuscation', async () => {
      const params = {
        value: 'on',
      };
      
        const response = await zoneInstance.updateEmailObfuscation(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous email obfuscation setting', async () => {
      const params = {
        value: value,
      };
      
        const response = await zoneInstance.updateEmailObfuscation(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
    });

    test('should fail to update email obfuscation', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateEmailObfuscation(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Log Retention', () => {
    let value;
    test('successfully fetch LogRetention', async () => {
      
        const response = await zoneInstance.getLogRetention({
          crn: config.CIS_SERVICES_CRN,
          zoneIdentifier: config.CIS_SERVICES_ZONE_ID,
        });
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result && result.success) {
          expect(result.success).toBe(true);
          if (result.result) {
            value = result.result.flag;
          }
        }
    });
    test('successfully update log retention', async () => {
      const params = {
        crn: config.CIS_SERVICES_CRN,
        zoneIdentifier: config.CIS_SERVICES_ZONE_ID,
        flag: true,
      };
      
        const response = await zoneInstance.updateLogRetention(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result && result.success) {
          expect(result.success).toBe(true);
        }
    });

    test('successfully reset previous log retention setting', async () => {
      const params = {
        crn: config.CIS_SERVICES_CRN,
        zoneIdentifier: config.CIS_SERVICES_ZONE_ID,
        flag: value !== undefined ? value : false,
      };
      
        const response = await zoneInstance.updateLogRetention(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result && result.success) {
          expect(result.success).toBe(true);
        }
    });
  });

  describe('Origin Max HTTP Version', () => {
    let value;
    test('successfully fetch OriginMaxHttpVersion', async () => {
      
        const response = await zoneInstance.getOriginMaxHttpVersion({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('origin_max_http_version');
          value = result.result.value;
        }
    });
    test('successfully update origin max http version', async () => {
      const params = {
        value: '2',
      };
      
        const response = await zoneInstance.updateOriginMaxHttpVersion(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous origin max http version setting', async () => {
      const params = {
        value: value,
      };
      
        const response = await zoneInstance.updateOriginMaxHttpVersion(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
    });

    test('should fail to update origin max http version', async () => {
      const params = {
        value: 'invalid',
      };
      
        await expect(zoneInstance.updateOriginMaxHttpVersion(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Origin Post Quantum Encryption', () => {
    let value;
    test('successfully fetch OriginPostQuantumEncryption', async () => {
      
        const response = await zoneInstance.getOriginPostQuantumEncryption({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('origin_pqe');
          expect(['preferred', 'supported', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
    });
    test('successfully update origin post quantum encryption', async () => {
      const params = {
        value: 'preferred',
      };
      
        const response = await zoneInstance.updateOriginPostQuantumEncryption(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous origin post quantum encryption setting', async () => {
      const params = {
        value: value || 'off',
      };
      
        const response = await zoneInstance.updateOriginPostQuantumEncryption(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value || 'off');
        }
    });

    test('should fail to update origin post quantum encryption', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateOriginPostQuantumEncryption(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Proxy Read Timeout', () => {
    let value;
    test('successfully fetch ProxyReadTimeout', async () => {
      
        const response = await zoneInstance.getProxyReadTimeout({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('proxy_read_timeout');
          value = result.result.value;
        }
    });
    test('successfully update proxy read timeout', async () => {
      const params = {
        value: 100,
      };
      
        const response = await zoneInstance.updateProxyReadTimeout(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(parseInt(result.result.value)).toBe(params.value);
        }
    });

    test('successfully reset previous proxy read timeout setting', async () => {
      const params = {
        value: parseInt(value),
      };
      
        const response = await zoneInstance.updateProxyReadTimeout(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(parseInt(result.result.value)).toBe(parseInt(value));
        }
    });

    test('should fail to update proxy read timeout', async () => {
      const params = {
        value: -1,
      };
      
        await expect(zoneInstance.updateProxyReadTimeout(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });

  describe('Replace Insecure JS', () => {
    let value;
    test('successfully fetch ReplaceInsecureJs', async () => {
      
        const response = await zoneInstance.getReplaceInsecureJs({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('replace_insecure_js');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
    });
    test('successfully update replace insecure js', async () => {
      const params = {
        value: 'on',
      };
      
        const response = await zoneInstance.updateReplaceInsecureJs(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
    });

    test('successfully reset previous replace insecure js setting', async () => {
      const params = {
        value: value,
      };
      
        const response = await zoneInstance.updateReplaceInsecureJs(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
    });

    test('should fail to update replace insecure js', async () => {
      const params = {
        value: 'test',
      };
      
        await expect(zoneInstance.updateReplaceInsecureJs(params)).rejects.toMatchObject({
        status: 400,
      });
    });
  });
  });

  describe('Security Level', () => {
    let securityLevelInstance;
    beforeAll(() => {
      securityLevelInstance = ZoneSettingsApi.newInstance({
        authenticator: new IamAuthenticator({
          apikey: config.CIS_SERVICES_APIKEY,
          url: config.CIS_SERVICES_AUTH_URL,
        }),
        crn: config.CIS_SERVICES_CRN,
        serviceUrl: config.CIS_SERVICES_URL,
        version: config.CIS_SERVICES_API_VERSION,
        zoneIdentifier: config.CIS_SERVICES_ZONE_ID,
      });
    });

    test('should successfully get security level setting', async () => {
      const response = await securityLevelInstance.getSecurityLevel();
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result && result.result) {
        expect(result.result).toBeDefined();
      }
    });

    test('should successfully update security level setting', async () => {
      const params = {
        value: 'medium',
      };
      const response = await securityLevelInstance.updateSecurityLevel(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);

      const { result } = response || {};

      expect(result).toBeDefined();
      if (result && result.result) {
        expect(result.result).toBeDefined();
      }
    });
  });
});