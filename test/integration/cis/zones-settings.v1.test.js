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

describe('Zones Settings', () => {
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
    test('successfully fetch zoneDnssec', async done => {
      try {
        const response = await zoneInstance.getZoneDnssec({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(['active', 'pending', 'disabled']).toContain(result.result.status);
          status = result.result.status;
        }
        done();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Warning --- ' + err);
        done();
      }
    });

    test('successfully update zoneDnssec', async done => {
      const params = {
        status: status === 'disabled' ? 'active' : 'disabled',
      };
      try {
        const response = await zoneInstance.updateZoneDnssec(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.status).toBeDefined();
        }
        done();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Warning --- ' + err);
        done();
      }
    });

    test('successfully reset previous zoneDnssec setting', async done => {
      try {
        const response = await zoneInstance.getZoneDnssec({});
        const { result } = response || {};
        const newStatus = result.result.status;
        if (newStatus !== 'pending') {
          const params = {
            status: newStatus === 'disabled' ? 'active' : 'disabled',
          };
          const response = await zoneInstance.updateZoneDnssec(params);
          expect(response).toBeDefined();
          expect(response.status).toEqual(200);
          const { result } = response || {};
          if (result.result && Object.keys(result.result).length > 0) {
            expect(result.result.status).toBeDefined();
          }
        }
        done();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Warning --- ' + err);
        done();
      }
    });
  });

  describe('Zone Cname Flattening', () => {
    let value;
    test('successfully fetch zoneCname flatting', async done => {
      try {
        const response = await zoneInstance.getZoneCnameFlattening({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('cname_flattening');
          expect(['flatten_at_root', 'flatten_all']).toContain(result.result.value);
          value = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update zone cname', async done => {
      const params = {
        value: value === 'flatten_at_root' ? 'flatten_all' : 'flatten_at_root',
      };
      try {
        const response = await zoneInstance.updateZoneCnameFlattening(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous zone cname setting', async done => {
      const params = {
        value: value,
      };
      try {
        const response = await zoneInstance.updateZoneCnameFlattening(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update zone cname', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateZoneCnameFlattening(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Opportunistic Encryption', () => {
    let value;
    test('successfully fetch OpportunisticEncryption', async done => {
      try {
        const response = await zoneInstance.getOpportunisticEncryption({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('opportunistic_encryption');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update opportunistic encryption', async done => {
      const params = {
        value: 'off',
      };
      try {
        const response = await zoneInstance.updateOpportunisticEncryption(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous opportunistic encryptionc setting', async done => {
      const params = {
        value: value,
      };
      try {
        const response = await zoneInstance.updateOpportunisticEncryption(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update opportunistic encryption', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateOpportunisticEncryption(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Challenge TTL', () => {
    let value;
    test('successfully get Challenge Ttl', async done => {
      try {
        const response = await zoneInstance.getChallengeTtl({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('challenge_ttl');
          expect(ChallengeTTL).toContain(result.result.value);
          value = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update challenge TTL', async done => {
      const params = {
        value: 7200,
      };
      try {
        const response = await zoneInstance.updateChallengeTtl(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous challenge TTL', async done => {
      const params = {
        value: value,
      };
      try {
        const response = await zoneInstance.updateChallengeTtl(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update challenge TTL', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateChallengeTtl(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Automatic Https Rewrites', () => {
    let value;
    test('successfully fetch automatic httpsRmewrites', async done => {
      try {
        const response = await zoneInstance.getAutomaticHttpsRewrites({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('automatic_https_rewrites');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update automatic httpsRmewrites', async done => {
      const params = {
        value: 'off',
      };
      try {
        const response = await zoneInstance.updateAutomaticHttpsRewrites(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous challenge TTL', async done => {
      const params = {
        value: value,
      };
      try {
        const response = await zoneInstance.updateAutomaticHttpsRewrites(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update challenge TTL', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateAutomaticHttpsRewrites(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('True Client IP', () => {
    let value;
    test('successfully fetch trueclientip setting', async done => {
      try {
        const response = await zoneInstance.getTrueClientIp({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('true_client_ip_header');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update trueclientip', async done => {
      const params = {
        value: 'off',
      };
      try {
        const response = await zoneInstance.updateTrueClientIp(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous trueclientip setting', async done => {
      const params = {
        value: value,
      };
      try {
        const response = await zoneInstance.updateTrueClientIp(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update trueclientip', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateTrueClientIp(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Always Use Https setting', () => {
    let value;
    test('successfully fetch always use https flag/setting', async done => {
      try {
        const response = await zoneInstance.getAlwaysUseHttps({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('always_use_https');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update always use https setting', async done => {
      const params = {
        value: 'off',
      };
      try {
        const response = await zoneInstance.updateAlwaysUseHttps(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous always use https setting', async done => {
      const params = {
        value: value,
      };
      try {
        const response = await zoneInstance.updateAlwaysUseHttps(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update always use https setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateAlwaysUseHttps(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Image Size Optimization', () => {
    let value;
    test('successfully get ImageSizeOptimization setting', async done => {
      try {
        const response = await zoneInstance.getImageSizeOptimization({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('image_size_optimization');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update ImageSizeOptimization setting', async done => {
      const params = {
        value: 'off',
      };
      try {
        const response = await zoneInstance.updateImageSizeOptimization(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous ImageSizeOptimization setting', async done => {
      const params = {
        value: value,
      };
      try {
        const response = await zoneInstance.updateImageSizeOptimization(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update ImageSizeOptimization setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateImageSizeOptimization(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Script Load Optimization', () => {
    let value;
    test('successfully get ScriptLoadOptimization setting', async done => {
      try {
        const response = await zoneInstance.getScriptLoadOptimization({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('script_load_optimization');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update ScriptLoadOptimization setting', async done => {
      const params = {
        value: 'off',
      };
      try {
        const response = await zoneInstance.updateScriptLoadOptimization(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous ScriptLoadOptimization setting', async done => {
      const params = {
        value: value,
      };
      try {
        const response = await zoneInstance.updateScriptLoadOptimization(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update ScriptLoadOptimization setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateScriptLoadOptimization(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Image Load Optimization', () => {
    let value;
    test('successfully get ImageLoadOptimization setting', async done => {
      try {
        const response = await zoneInstance.getImageLoadOptimization({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('image_load_optimization');
          expect(['on', 'off']).toContain(result.result.value);
          value = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update ImageLoadOptimization setting', async done => {
      const params = {
        value: 'off',
      };
      try {
        const response = await zoneInstance.updateImageLoadOptimization(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous ImageLoadOptimization setting', async done => {
      const params = {
        value: value,
      };
      try {
        const response = await zoneInstance.updateImageLoadOptimization(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update ImageLoadOptimization setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateImageLoadOptimization(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Minify Setting', () => {
    let minifiedValue;
    test('successfully get minify setting', async done => {
      try {
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
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update minify setting', async done => {
      const params = {
        value: {
          ...minifiedValue,
          js: 'off',
        },
      };
      try {
        const response = await zoneInstance.updateMinify(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toMatchObject(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous minify setting', async done => {
      const params = {
        value: minifiedValue,
      };
      try {
        const response = await zoneInstance.updateMinify(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toMatchObject(minifiedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update minify setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateMinify(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Min TLS Version', () => {
    let minTlsVersion;
    test('successfully fetch MinTlsVersion', async done => {
      try {
        const response = await zoneInstance.getMinTlsVersion({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('min_tls_version');
          expect(MinTlsVersion).toContain(result.result.value);
          minTlsVersion = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update MinTlsVersion', async done => {
      const params = {
        value: '1.1',
      };
      try {
        const response = await zoneInstance.updateMinTlsVersion(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous MinTlsVersion', async done => {
      const params = {
        value: minTlsVersion,
      };
      try {
        const response = await zoneInstance.updateMinTlsVersion(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(minTlsVersion);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update MinTlsVersion', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateMinTlsVersion(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Ip Geolocation', () => {
    let ipGeoLocation;
    test('successfully get IpGeolocation', async done => {
      try {
        const response = await zoneInstance.getIpGeolocation({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('ip_geolocation');
          expect(['on', 'off']).toContain(result.result.value);
          ipGeoLocation = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn off IpGeolocation', async done => {
      const params = {
        value: 'off',
      };
      try {
        const response = await zoneInstance.updateIpGeolocation(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous IpGeolocation', async done => {
      const params = {
        value: ipGeoLocation,
      };
      try {
        const response = await zoneInstance.updateIpGeolocation(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(ipGeoLocation);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update IpGeolocation', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateIpGeolocation(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Server Side Exclude', () => {
    let storedValue;
    test('successfully get ServerSideExclude setting', async done => {
      try {
        const response = await zoneInstance.getServerSideExclude({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('server_side_exclude');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn off  ServerSideExclude setting', async done => {
      const params = {
        value: 'off',
      };
      try {
        const response = await zoneInstance.updateServerSideExclude(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous  ServerSideExclude setting', async done => {
      const params = {
        value: storedValue,
      };
      try {
        const response = await zoneInstance.updateServerSideExclude(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update  ServerSideExclude setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateServerSideExclude(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Security Header', () => {
    let securityHeader;
    test('successfully get SecurityHeader setting', async done => {
      try {
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
              max_age: 86400,
              nosniff: true,
              preload: false,
            },
          });
          securityHeader = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully enable SecurityHeader strict transport setting', async done => {
      const params = {
        value: {
          ...securityHeader,
          strict_transport_security: {
            ...securityHeader.strict_transport_security,
            enabled: true,
          },
        },
      };
      try {
        const response = await zoneInstance.updateSecurityHeader(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value.strict_transport_security.enabled).toBe(true);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous  SecurityHeader setting', async done => {
      const params = {
        value: securityHeader,
      };
      try {
        const response = await zoneInstance.updateSecurityHeader(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toMatchObject(securityHeader);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update  ServerSideExclude setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateSecurityHeader(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Prefetch Preload Setting', () => {
    let storedValue;
    test('successfully get Prefetch Preload setting', async done => {
      try {
        const response = await zoneInstance.getPrefetchPreload({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('prefetch_preload');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn off Prefetch Preload setting', async done => {
      const params = {
        value: 'off',
      };
      try {
        const response = await zoneInstance.updatePrefetchPreload(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous Prefetch Preload setting', async done => {
      const params = {
        value: storedValue,
      };
      try {
        const response = await zoneInstance.updatePrefetchPreload(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update Prefetch Preload setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updatePrefetchPreload(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Http2 setting', () => {
    let storedValue;
    test('successfully get Http2', async done => {
      try {
        const response = await zoneInstance.getHttp2({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('http2');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn on Http2 setting', async done => {
      const params = {
        value: 'on',
      };
      try {
        const response = await zoneInstance.updateHttp2(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous Http2 setting', async done => {
      const params = {
        value: storedValue,
      };
      try {
        const response = await zoneInstance.updateHttp2(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update Http2 setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateHttp2(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Http3 setting', () => {
    let storedValue;
    test('successfully get Http3', async done => {
      try {
        const response = await zoneInstance.getHttp3({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('http3');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn on Http3 setting', async done => {
      const params = {
        value: 'on',
      };
      try {
        const response = await zoneInstance.updateHttp3(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous Http3 setting', async done => {
      const params = {
        value: storedValue,
      };
      try {
        const response = await zoneInstance.updateHttp3(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update Http3 setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateHttp3(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Ipv6', () => {
    let storedValue;
    test('successfully get Ipv6', async done => {
      try {
        const response = await zoneInstance.getIpv6({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('ipv6');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn on Ipv6', async done => {
      const params = {
        value: 'on',
      };
      try {
        const response = await zoneInstance.updateIpv6(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous Ipv6', async done => {
      const params = {
        value: storedValue,
      };
      try {
        const response = await zoneInstance.updateIpv6(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update Ipv6', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateIpv6(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Web Sockets', () => {
    let storedValue;
    test('successfully fetch web socket setting', async done => {
      try {
        const response = await zoneInstance.getWebSockets({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('websockets');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn on web socket setting', async done => {
      const params = {
        value: 'on',
      };
      try {
        const response = await zoneInstance.updateWebSockets(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous web socket setting', async done => {
      const params = {
        value: storedValue,
      };
      try {
        const response = await zoneInstance.updateWebSockets(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update web socket setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateWebSockets(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('PseudoIpv4', () => {
    let storedValue;
    test('successfully get PseudoIpv4', async done => {
      try {
        const response = await zoneInstance.getPseudoIpv4({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('pseudo_ipv4');
          expect(['off', 'add_header', 'overwrite_header']).toContain(result.result.value);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn on PseudoIpv4', async done => {
      const params = {
        value: 'add_header',
      };
      try {
        const response = await zoneInstance.updatePseudoIpv4(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous PseudoIpv4', async done => {
      const params = {
        value: storedValue,
      };
      try {
        const response = await zoneInstance.updatePseudoIpv4(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update PseudoIpv4', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updatePseudoIpv4(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Response Buffering', () => {
    let storedValue;
    test('successfully fetch response buffering', async done => {
      try {
        const response = await zoneInstance.getResponseBuffering({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('response_buffering');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn on response buffering setting', async done => {
      const params = {
        value: 'on',
      };
      try {
        const response = await zoneInstance.updateResponseBuffering(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous response buffering setting', async done => {
      const params = {
        value: storedValue,
      };
      try {
        const response = await zoneInstance.updateResponseBuffering(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update response buffering setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateResponseBuffering(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Hot Link Protection', () => {
    let storedValue;
    test('successfully fetch hot link protection setting buffering', async done => {
      try {
        const response = await zoneInstance.getHotlinkProtection({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('hotlink_protection');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn on hot link protection setting', async done => {
      const params = {
        value: 'on',
      };
      try {
        const response = await zoneInstance.updateHotlinkProtection(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous hot link protection setting', async done => {
      const params = {
        value: storedValue,
      };
      try {
        const response = await zoneInstance.updateHotlinkProtection(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update hot link protection setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateHotlinkProtection(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('MaxUpload setting', () => {
    let storedValue;
    test('successfully fetch MaxUpload value', async done => {
      try {
        const response = await zoneInstance.getMaxUpload({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('max_upload');
          expect(MaxUpload).toContain(result.result.value);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update MaxUpload setting', async done => {
      const params = {
        value: 125,
      };
      try {
        const response = await zoneInstance.updateMaxUpload(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous MaxUpload', async done => {
      const params = {
        value: storedValue,
      };
      try {
        const response = await zoneInstance.updateMaxUpload(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update MaxUpload', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateMaxUpload(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('TlsClientAuth', () => {
    let storedValue;
    test('successfully fetch tls client auth value', async done => {
      try {
        const response = await zoneInstance.getTlsClientAuth({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('tls_client_auth');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn on tls client auth setting', async done => {
      const params = {
        value: 'on',
      };
      try {
        const response = await zoneInstance.updateTlsClientAuth(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous tls client auth setting', async done => {
      const params = {
        value: storedValue,
      };
      try {
        const response = await zoneInstance.updateTlsClientAuth(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update response tls client auth setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateResponseBuffering(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Verify Browser Check', () => {
    let storedValue;
    test('successfully fetch browser check data', async done => {
      try {
        const response = await zoneInstance.getBrowserCheck({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('browser_check');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn on browser check setting', async done => {
      const params = {
        value: 'on',
      };
      try {
        const response = await zoneInstance.updateBrowserCheck(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous browser check setting', async done => {
      const params = {
        value: storedValue,
      };
      try {
        const response = await zoneInstance.updateBrowserCheck(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update browser check setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateBrowserCheck(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Enable Error PagesOn', () => {
    let storedValue;
    test('successfully fetch EnableErrorPagesOn', async done => {
      try {
        const response = await zoneInstance.getEnableErrorPagesOn({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('origin_error_page_pass_thru');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn on EnableErrorPagesOn', async done => {
      const params = {
        value: 'on',
      };
      try {
        const response = await zoneInstance.updateEnableErrorPagesOn(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous EnableErrorPagesOn', async done => {
      const params = {
        value: storedValue,
      };
      try {
        const response = await zoneInstance.updateEnableErrorPagesOn(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update EnableErrorPagesOn', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateEnableErrorPagesOn(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Web Application Firewall', () => {
    let storedValue;
    test('successfully fetch WebApplicationFirewall', async done => {
      try {
        const response = await zoneInstance.getWebApplicationFirewall({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('waf');
          expect(['on', 'off']).toContain(result.result.value);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn on WebApplicationFirewall', async done => {
      const params = {
        value: 'on',
      };
      try {
        const response = await zoneInstance.updateWebApplicationFirewall(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous WebApplicationFirewall', async done => {
      const params = {
        value: storedValue,
      };
      try {
        const response = await zoneInstance.updateWebApplicationFirewall(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toBe(storedValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update WebApplicationFirewall', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateWebApplicationFirewall(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Ciphers', () => {
    let storedCiphers = [];
    test('successfully fetch ciphers data', async done => {
      try {
        const response = await zoneInstance.getCiphers({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('ciphers');
          storedCiphers = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn on ciphers', async done => {
      const params = {
        value: ['ECDHE-RSA-AES128-GCM-SHA256', 'AES128-SHA'],
      };
      try {
        const response = await zoneInstance.updateCiphers(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toEqual(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous ciphers', async done => {
      const params = {
        value: storedCiphers,
      };
      try {
        const response = await zoneInstance.updateCiphers(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toEqual(storedCiphers);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update ciphers', async done => {
      const params = {
        value: ['test'],
      };
      try {
        await zoneInstance.updateCiphers(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });

  describe('Mobile Redirect Setting', () => {
    let storedValue;
    test('successfully fetch MobileRedirect setting', async done => {
      try {
        const response = await zoneInstance.getMobileRedirect({});
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.id).toEqual('mobile_redirect');
          expect(['on', 'off']).toContain(result.result.value.status);
          storedValue = result.result.value;
        }
        done();
      } catch (err) {
        done(err);
      }
    });
    test('successfully update/turn on  MobileRedirect setting', async done => {
      const params = {
        value: {
          status: 'on',
          mobile_subdomain: config.SUB_DOMAIN_NAME,
          strip_uri: false,
        },
      };
      try {
        const response = await zoneInstance.updateMobileRedirect(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value.status).toEqual('on');
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('successfully reset previous  MobileRedirect setting', async done => {
      const params = {
        value: {
          ...storedValue,
          status: 'off',
        },
      };
      try {
        const response = await zoneInstance.updateMobileRedirect(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        const { result } = response || {};
        if (result.result && Object.keys(result.result).length > 0) {
          expect(result.result.value).toMatchObject(params.value);
        }
        done();
      } catch (err) {
        done(err);
      }
    });

    test('should fail to update  MobileRedirect setting', async done => {
      const params = {
        value: 'test',
      };
      try {
        await zoneInstance.updateMobileRedirect(params);
      } catch (err) {
        expect(err.status).toEqual(400);
        done();
      }
      done();
    });
  });
});
