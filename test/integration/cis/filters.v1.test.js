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

const FiltersV1 = require('../../../dist/cis/filtersv1/v1');
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

describe('FiltersV1', () => {
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
  const expressions = [
    '(ip.src eq 13.60.125.234)',
    '(http.request.uri eq "/test?number=1")',
    'not http.request.uri.path matches "^/api/[\\W].*$"',
    '(http.request.uri.path ~ "^.*/wpt[\\d]-login.php$" or http.request.uri.path ~ "^.*/xmlrpc.php$")',
  ];

  const expressions_update = [
    '(ip.src eq 13.60.125.235)',
    '(http.request.uri eq "/test-update?number=1")',
    'not http.request.uri.path matches "^/api-update/.*$"',
    '(http.host eq "testexample-update.com")',
  ];

  let filtersV1;

  let filters;

  const filterIdentifier = [];

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    filtersV1 = FiltersV1.newInstance(options);
    expect(filtersV1).not.toBeNull();
    done();
  });

  describe('clear all filters', () => {
    test('should successfully clear all filters', async done => {
      const filterId = [];
      try {
        const params = {
          crn: options.crn,
          xAuthUserToken: options.authenticator.apikey,
          zoneIdentifier: options.zoneIdentifier,
        };
        const response = await filtersV1.listAllFilters(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        result.result.forEach(idsList => filterId.push(idsList.id));
        expect(result).toBeDefined();
        expect(result.result).toBeDefined();
        expect(filterId).toBeDefined();

        for (let i = 0; i < filterId.length; i++) {
          const params1 = {
            crn: options.crn,
            xAuthUserToken: options.authenticator.apikey,
            zoneIdentifier: options.zoneIdentifier,
            id: filterId[i],
          };
          const response = await filtersV1.deleteFilters(params1);
          expect(response).toBeDefined();
          expect(response.status).toEqual(200);
          const { result } = response || {};
          expect(result).toBeDefined();
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

  describe('Create the filters', () => {
    test('should successfully created filters', async done => {
      try {
        for (let i = 0; i < 4; i++) {
          const filter = {
            expression: expressions[i],
            paused: false,
            description: 'Login-Office-SDK',
          };
          const params = {
            crn: options.crn,
            xAuthUserToken: options.authenticator.apikey,
            zoneIdentifier: options.zoneIdentifier,
            filterInput: [filter],
          };
          const response = await filtersV1.createFilter(params);
          expect(response).toBeDefined();
          expect(response.status).toEqual(200);

          const { result } = response || {};

          expect(result).toBeDefined();
          expect(result.result).toBeDefined();
          result.result.forEach(idsList => filterIdentifier.push(idsList.id));
          expect(filterIdentifier).toBeDefined();
          if (result && result.result) {
            filters = result.result;
            expect(filters).toBeDefined();
            expect(filters.expression).toEqual(params.filterInput.expression);
            expect(filters.paused).toEqual(params.filterInput.paused);
            expect(filters.description).toEqual(params.filterInput.description);
          }
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Fetching the List all filters', () => {
    test('should successfully List all filters', async done => {
      try {
        const params = {
          crn: options.crn,
          xAuthUserToken: options.authenticator.apikey,
          zoneIdentifier: options.zoneIdentifier,
        };
        const response = await filtersV1.listAllFilters(params);
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

  describe('Update the filters', () => {
    test('should successfully updated filters', async done => {
      try {
        for (let i = 0; i < 3; i++) {
          const filterUpdateInputModel = {
            id: filterIdentifier[i],
            expression: expressions_update[i],
            paused: false,
            description: 'Login-Office-SDK',
          };
          const params = {
            xAuthUserToken: options.authenticator.apikey,
            crn: options.crn,
            zoneIdentifier: options.zoneIdentifier,
            filterUpdateInput: [filterUpdateInputModel],
          };
          const response = await filtersV1.updateFilters(params);
          expect(response).toBeDefined();
          expect(response.status).toEqual(200);

          const { result } = response || {};

          expect(result).toBeDefined();
          expect(result.result).toBeDefined();

          if (result && result.result) {
            filters = result.result;
            expect(filters).toBeDefined();
            expect(filters.id).toEqual(params.filterUpdateInput.id);
            expect(filters.expression).toEqual(params.filterUpdateInput.expression);
            expect(filters.paused).toEqual(params.filterUpdateInput.paused);
            expect(filters.description).toEqual(params.filterUpdateInput.description);
          }
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Update the filter', () => {
    test('should successfully updated filters', async done => {
      try {
        const params = {
          xAuthUserToken: options.authenticator.apikey,
          crn: options.crn,
          zoneIdentifier: options.zoneIdentifier,
          filterIdentifier: filterIdentifier[3],
          expression: expressions_update[3],
          description: 'not /api',
          paused: false,
        };
        const response = await filtersV1.updateFilter(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(filterIdentifier).toBeDefined();

        if (result && result.result) {
          filters = result.result;
          expect(filters).toBeDefined();
          expect(filters.id).toEqual(params.filterIdentifier);
          expect(filters.expression).toEqual(params.expression);
          expect(filters.paused).toEqual(params.paused);
          expect(filters.description).toEqual(params.description);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Get the filters', () => {
    test('should successfully fetched filters', async done => {
      try {
        const params = {
          xAuthUserToken: options.authenticator.apikey,
          crn: options.crn,
          zoneIdentifier: options.zoneIdentifier,
          filterIdentifier: filterIdentifier[3],
        };
        const response = await filtersV1.getFilter(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(filterIdentifier).toBeDefined();

        if (result && result.result) {
          filters = result.result;
          expect(filters).toBeDefined();
          expect(filters.id).toEqual(params.filterIdentifier);
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Delete the filter', () => {
    test('should successfully deleted filter', async done => {
      try {
        const params = {
          xAuthUserToken: options.authenticator.apikey,
          crn: options.crn,
          zoneIdentifier: options.zoneIdentifier,
          filterIdentifier: filterIdentifier[3],
        };
        const response = await filtersV1.deleteFilter(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();

        if (result && result.result) {
          expect(result.result).toBeDefined();
          expect(result.result.id).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('Delete the filters', () => {
    test('should successfully deleted filters', async done => {
      try {
        for (let i = 0; i < 3; i++) {
          const params = {
            xAuthUserToken: options.authenticator.apikey,
            crn: options.crn,
            zoneIdentifier: options.zoneIdentifier,
            filterIdentifier: filterIdentifier[i],
          };
          const response = await filtersV1.deleteFilter(params);
          expect(response).toBeDefined();
          expect(response.status).toEqual(200);

          const { result } = response || {};

          expect(result).toBeDefined();

          if (result && result.result) {
            expect(result.result).toBeDefined();
            expect(filterIdentifier).toBeDefined();
          }
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
