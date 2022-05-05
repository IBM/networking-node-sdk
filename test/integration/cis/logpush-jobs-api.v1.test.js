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

const LogPushJobsApiV1 = require('../../../dist/cis/logpushjobsapiv1/v1');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const authHelper = require('../../resources/auth-helper.js');

const timeout = 120000; // two minutes

// Location of our config file.
const configFile = 'cislog.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

// Retrieve the config file as an object.
// We do this because we're going to directly use the
// config properties, rather than let the SDK do it for us.
const config = authHelper.loadConfig();

describe('LogPushJobsApiV1', () => {
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
    ingressKey: config.INGRESS_KEY,
    domainName: config.DOMAIN_NAME,
    logRegion: config.LOGDNA_REGION,
    dataset: 'http_requests',
  };

  let logpushV1;

  let logpush;

  let logpushIdentifier;

  test('should successfully complete initialization', done => {
    // Initialize the service client .
    logpushV1 = LogPushJobsApiV1.newInstance(options);
    expect(logpushV1).not.toBeNull();
    done();
  });

  describe('clear all LogPushJobs LogDNA', () => {
    test('should successfully clear all LogPushJobs LogDNA', async done => {
      try {
        const response = await logpushV1.getLogpushJobsV2();
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};
        expect(result).toBeDefined();
        expect(result.result).toBeDefined();
        if (result.result == null) {
          return done();
        }

        for (let i = 0; i < result.result.length; i++) {
          // NOSONAR
          const logpushIden = result.result[i].id;
          const params1 = {
            jobId: logpushIden,
          };
          const response1 = logpushV1.deleteLogpushJobV2(params1);
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

  describe('Create the LogPushJobs LogDNA', () => {
    test('should successfully LogPushJobs LogDNA', async done => {
      try {
        const name = 'Test123';
        const enabled = true;
        const logpull_options = 'timestamps=rfc3339&timestamps=rfc3339';
        const logdna = {
          'ingress_key': options.ingressKey,
          'region': options.logRegion,
          'hostname': options.domainName,
        };
        const dataset = 'http_requests';
        const frequency = 'high';
        const createLogpushJobV2RequestModel = {
          name: name,
          enabled: enabled,
          logpull_options: logpull_options,
          logdna: logdna,
          dataset: dataset,
          frequency: frequency,
        };
        const createLogpushJobV2Request = createLogpushJobV2RequestModel;
        const params = {
          createLogpushJobV2Request: createLogpushJobV2Request,
        };
        const response = await logpushV1.createLogpushJobV2(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(201);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();

        logpushIdentifier = result.result.id;
        expect(logpushIdentifier).toBeDefined();
        if (result && result.result) {
          logpush = result.result;
          expect(logpush).toBeDefined();
          expect(result.success).toBeTruthy();
          expect(logpush.id).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('List the LogPushJobs LogDNA', () => {
    test('should successfully List  LogPushJobs LogDNA', async done => {
      try {
        const response = await logpushV1.getLogpushJobsV2();
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

  describe('update the  LogPushJobs LogDNA', () => {
    test('should successfully updated  LogPushJobs LogDNA', async done => {
      try {
        const enabled = true;
        const logdna = {
          'ingress_key': options.ingressKey,
          'region': options.logRegion,
          'hostname': options.domainName,
        };
        const logpull_options = 'timestamps=rfc3339&timestamps=rfc3338';
        const frequency = 'low';
        const jobId = logpushIdentifier;
        const updateLogpushJobV2RequestModel = {
          logdna: logdna,
          enabled: enabled,
          logpull_options: logpull_options,
          frequency: frequency,
        };
        const updateLogpushJobV2Request = updateLogpushJobV2RequestModel;

        const params = {
          jobId: jobId,
          updateLogpushJobV2Request: updateLogpushJobV2Request,
        };

        const response = await logpushV1.updateLogpushJobV2(params);
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);

        const { result } = response || {};

        expect(result).toBeDefined();
        expect(result.result).toBeDefined();

        if (result && result.result) {
          logpush = result.result;
          expect(logpush).toBeDefined();
          expect(result.success).toBeTruthy();
          expect(logpush.id).toBeDefined();
        }
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('get the LogPushJobs LogDNA', () => {
    test('should successfully get LogPushJobs LogDNA', async done => {
      try {
        const jobId = logpushIdentifier;
        const params = {
          jobId: jobId,
        };
        const response = await logpushV1.getLogpushJobV2(params);
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

  describe('delete the Webhooks by ID', () => {
    test('should successfully delete webhooks', async done => {
      try {
        const jobId = logpushIdentifier;
        const params = {
          jobId: jobId,
        };
        const response = await logpushV1.deleteLogpushJobV2(params);
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
