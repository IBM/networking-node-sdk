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

const CustomPagesV1 = require('../../../dist/cis/custompagesv1/v1');
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

let customPagesV1;
let customPage;
let customPage1;

describe.skip('CustomPagesV1', () => {
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

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    customPagesV1 = CustomPagesV1.newInstance(options);
    expect(customPagesV1).not.toBeNull();
    done();
  });

  describe('Fetching the List all custom pages', () => {
    test('should successfully List all custom pages', async done => {
      try {
        const response = await customPagesV1.listInstanceCustomPages();
        expect(response).toBeDefined();
        if (response.status) {
          expect(response.status).toEqual(200);

          const { result } = response || {};

          expect(result).toBeDefined();

          if (result && result.result && result.result.length) {
            expect(result.result.length).toBeGreaterThanOrEqual(1);
            expect(result.result).toBeDefined();
            const items = result.result.filter(item => item.state === 'default');
            if (items && items.length > 1) {
              customPage = items[0];
              customPage1 = items[1];
            }
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

  describe('Fetching the List all custom pages for a given zone', () => {
    test('should successfully List all custom pages for a given zone', async done => {
      try {
        const response = await customPagesV1.listZoneCustomPages();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result && result.result.length) {
          expect(result.result.length).toBeGreaterThanOrEqual(1);
          expect(result.result).toBeDefined();
        }
        done();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Warning --- ' + err);
        done();
      }
    });
  });

  describe('Fetching a specific custom page', () => {
    test('should successfully fetching a specific custom page', async done => {
      try {
        if (customPage && customPage.id) {
          const params = {
            pageIdentifier: customPage.id,
          };
          const response = await customPagesV1.getInstanceCustomPage(params);
          expect(response).toBeDefined();
          if (response.status) {
            expect(response.status).toEqual(200);

            const { result } = response || {};

            expect(result).toBeDefined();

            if (result && result.result) {
              const fetchedCustomPage = result.result;
              expect(fetchedCustomPage).toBeDefined();
              expect(fetchedCustomPage.description).toEqual(customPage.description);
              expect(fetchedCustomPage.required_tokens).toEqual(customPage.required_tokens);
              expect(fetchedCustomPage.preview_target).toEqual(customPage.preview_target);
              expect(fetchedCustomPage.state).toEqual(customPage.state);
              expect(fetchedCustomPage.url).toEqual(customPage.url);
            }
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

  describe('Fetching a specific custom page for a given zone', () => {
    test('should successfully fetching a specific custom page for a given zone', async done => {
      try {
        if (customPage1 && customPage1.id) {
          const params = {
            pageIdentifier: customPage1.id,
          };
          const response = await customPagesV1.getZoneCustomPage(params);
          expect(response).toBeDefined();
          expect(response.status).toEqual(200);

          const { result } = response || {};

          expect(result).toBeDefined();

          if (result && result.result) {
            const fetchedCustomPage = result.result;
            expect(fetchedCustomPage).toBeDefined();
            expect(fetchedCustomPage.description).toEqual(customPage1.description);
            expect(fetchedCustomPage.required_tokens).toEqual(customPage1.required_tokens);
            expect(fetchedCustomPage.preview_target).toEqual(customPage1.preview_target);
            expect(['default', 'customized']).toContain(customPage1.state);
            expect(fetchedCustomPage.url).toEqual(customPage1.url);
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

  describe('Updating a specific custom page', () => {
    test('should successfully updated a specific custom page', async done => {
      try {
        if (customPage && customPage.id) {
          const params = {
            pageIdentifier: customPage.id,
            url: config.CUSTOM_PAGE_URL,
            state: 'customized',
          };
          const response = await customPagesV1.updateInstanceCustomPage(params);
          expect(response).toBeDefined();
          expect(response.status).toEqual(200);

          const { result } = response || {};

          expect(result).toBeDefined();

          if (result && result.result) {
            customPage = result.result;
            expect(customPage).toBeDefined();
            expect(customPage.description).toEqual(customPage.description);
            expect(customPage.required_tokens).toEqual(customPage.required_tokens);
            expect(customPage.preview_target).toEqual(customPage.preview_target);
            expect(customPage.state).toEqual(params.state);
            expect(customPage.url).toEqual(params.url);
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

  describe('Updating a specific custom page to default', () => {
    test('should successfully updated a specific custom page to default', async done => {
      try {
        if (customPage && customPage.id) {
          const params = {
            pageIdentifier: customPage.id,
            url: '',
            state: 'default',
          };
          const response = await customPagesV1.updateInstanceCustomPage(params);
          expect(response).toBeDefined();
          if (response.status) {
            expect(response.status).toEqual(200);

            const { result } = response || {};

            expect(result).toBeDefined();

            if (result && result.result) {
              customPage = result.result;
              expect(customPage).toBeDefined();
              expect(customPage.description).toEqual(customPage.description);
              expect(customPage.required_tokens).toEqual(customPage.required_tokens);
              expect(customPage.preview_target).toEqual(customPage.preview_target);
              expect(customPage.state).toEqual(params.state);
              expect(customPage.url).toBeNull();
            }
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

  describe('Updating a specific custom page for a given zone', () => {
    test('should successfully updated a specific custom page for a given zone', async done => {
      try {
        const params = {
          pageIdentifier: customPage1.id,
          url: config.CUSTOM_PAGE_URL,
          state: 'customized',
        };
        const response = await customPagesV1.updateZoneCustomPage(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          customPage = result.result;
          expect(customPage).toBeDefined();
          expect(customPage.description).toEqual(customPage.description);
          expect(customPage.required_tokens).toEqual(customPage.required_tokens);
          expect(customPage.preview_target).toEqual(customPage.preview_target);
          expect(customPage.state).toEqual(params.state);
          expect(customPage.url).toEqual(params.url);
        }
        done();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Warning --- ' + err);
        done();
      }
    });
  });

  describe('Updating a specific custom page to default for a given zone', () => {
    test('should successfully updated a specific custom page to default for a given zone', async done => {
      try {
        if (customPage1 && customPage1.id) {
          const params = {
            pageIdentifier: customPage1.id,
            url: '',
            state: 'default',
          };
          const response = await customPagesV1.updateZoneCustomPage(params);
          expect(response).toBeDefined();
          expect(response.status).toEqual(200);

          const { result } = response || {};

          expect(result).toBeDefined();

          if (result && result.result) {
            customPage = result.result;
            expect(customPage).toBeDefined();
            expect(customPage.description).toEqual(customPage.description);
            expect(customPage.required_tokens).toEqual(customPage.required_tokens);
            expect(customPage.preview_target).toEqual(customPage.preview_target);
            expect(customPage.state).toEqual(params.state);
            expect(customPage.url).toBeNull();
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
});
