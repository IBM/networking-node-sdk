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

const CachingApiV1 = require('../../../dist/cis/cachingapiv1/v1');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const authHelper = require('../../resources/auth-helper');

const timeout = 120000; // two minutes

// Location of our config file.
const configFile = 'cis.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

// Retrieve the config file as an object.
// We do this because we're going to directly use the
// config properties, rather than let the SDK do it for us.
const config = authHelper.loadConfig();

let cachingApiV1;
let cachingDetails;
let browserCacheTtl;
let developmentMode;
let sortQueryStrForCache;

describe('DNSRecordsApisV1', () => {
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
    cachingApiV1 = CachingApiV1.newInstance(options);
    expect(cachingApiV1).not.toBeNull();
    done();
  });

  describe('Fetching the Caching the Level', () => {
    test('should successfully Get the cache level', async done => {
      try {
        const response = await cachingApiV1.getCacheLevel();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          cachingDetails = result.result;
          expect(cachingDetails).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update the Caching the Level', () => {
    test('should successfully update the cache level', async done => {
      try {
        const cacheValue = cachingDetails.value === 'basic' ? 'aggressive' : 'basic';
        const params = {
          value: cacheValue,
        };
        const response = await cachingApiV1.updateCacheLevel(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result.value).toEqual(cacheValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Purge all as part of Caching Setting', () => {
    test('should successfully purge all for cache setting', async done => {
      try {
        const response = await cachingApiV1.purgeAll();
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

  describe('Purge by Urls as part of Caching Setting', () => {
    test('should successfully purge by Urls for cache setting', async done => {
      try {
        const params = {
          'files': [
            'http://www.example.com/example_01.jpg',
            'http://www.example.com/example_02.jpg',
          ],
        };
        const response = await cachingApiV1.purgeByUrls(params);
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

  describe('Purge by cache tags as part of Caching Setting', () => {
    test('should successfully purge by cache tags for cache setting', async done => {
      try {
        const params = {
          'tags': ['cache-tag-01', 'cache-tag-02'],
        };
        const response = await cachingApiV1.purgeByCacheTags(params);
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

  describe('Purge by cache tags as part of Caching Setting', () => {
    test('should successfully purge by cache tags for cache setting', async done => {
      try {
        const params = {
          'hosts': ['one.example.com', 'two.example.com'],
        };
        const response = await cachingApiV1.purgeByHosts(params);
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

  describe('Fecthing browser cache TTL setting as part of Caching Setting', () => {
    test('should successfully Get browser cache TTL setting for cache setting', async done => {
      try {
        const response = await cachingApiV1.getBrowserCacheTtl();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          browserCacheTtl = result.result;
          expect(browserCacheTtl).toBeDefined();
          expect(browserCacheTtl.id).toEqual('browser_cache_ttl');
          expect(browserCacheTtl.value).toBeGreaterThanOrEqual(0);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Updating browser cache TTL setting as part of Caching Setting', () => {
    test('should successfully Get browser cache TTL setting for cache setting', async done => {
      try {
        const currentTTLValue = browserCacheTtl.value === 1800 ? 14400 : 1800;
        const params = {
          value: currentTTLValue,
        };
        const response = await cachingApiV1.updateBrowserCacheTtl(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          browserCacheTtl = result.result;
          expect(browserCacheTtl).toBeDefined();
          expect(browserCacheTtl.id).toEqual('browser_cache_ttl');
          expect(browserCacheTtl.value).toBeGreaterThanOrEqual(0);
          expect(browserCacheTtl.value).toEqual(currentTTLValue);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Fecthing development mode setting as part of Caching Setting', () => {
    test('should successfully Get development mode setting for cache setting', async done => {
      try {
        const response = await cachingApiV1.getDevelopmentMode();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          developmentMode = result.result;
          expect(developmentMode).toBeDefined();
          expect(developmentMode.id).toEqual('development_mode');
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Updating development mode setting as part of Caching Setting', () => {
    test('should successfully update development mode setting for cache setting', async done => {
      try {
        const isBrowserCacheTtlOn = browserCacheTtl === 'off' ? 'on' : 'off';
        const params = {
          'value': isBrowserCacheTtlOn,
        };
        const response = await cachingApiV1.updateDevelopmentMode(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          developmentMode = result.result;
          expect(developmentMode).toBeDefined();
          expect(developmentMode.id).toEqual('development_mode');
          expect(developmentMode.value).toEqual(isBrowserCacheTtlOn);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Fecthing Enable Query String Sort setting as part of Caching Setting', () => {
    test('should successfully Get Enable Query String Sort setting for cache setting', async done => {
      try {
        const response = await cachingApiV1.getQueryStringSort();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          sortQueryStrForCache = result.result;
          expect(sortQueryStrForCache).toBeDefined();
          expect(sortQueryStrForCache.id).toEqual('sort_query_string_for_cache');
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Updating Enable Query String Sort setting as part of Caching Setting', () => {
    test('should successfully enable Query String Sort setting for cache setting', async done => {
      try {
        const isSortStrEnabled = sortQueryStrForCache.value === 'off' ? 'on' : 'off';
        const params = {
          value: isSortStrEnabled,
        };
        const response = await cachingApiV1.updateQueryStringSort(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          sortQueryStrForCache = result.result;
          expect(sortQueryStrForCache).toBeDefined();
          expect(sortQueryStrForCache.id).toEqual('sort_query_string_for_cache');
          expect(sortQueryStrForCache.value).toEqual(isSortStrEnabled);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
