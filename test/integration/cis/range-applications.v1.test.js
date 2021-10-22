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

 const RangeApplicationsV1 = require('../../../dist/cis/rangeapplicationsv1/v1');
 const { IamAuthenticator } = require('ibm-cloud-sdk-core');
 const authHelper = require('../../resources/auth-helper.js');
 const ZonesV1 = require('../../../dist/cis/zonesv1/v1');
 
 const timeout = 120000; // two minutes
 
 // Location of our config file.
 const configFile = 'cis.env';
 
 // Use authHelper to skip tests if our configFile is not available.
 const describe = authHelper.prepareTests(configFile);
 
 // Retrieve the config file as an object.
 // We do this because we're going to directly use the
 // config properties, rather than let the SDK do it for us.
 const config = authHelper.loadConfig();
 
 describe('RangeApplicationsV1', () => {
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
 
   let rangeApplicationsV1;
   let zonesV1;
   let rangeAppCreated;
 
   test('should successfully complete initialization', done => {
     // Initialize the service client.
     rangeApplicationsV1 = RangeApplicationsV1.newInstance(options);
     expect(rangeApplicationsV1).not.toBeNull();
 
     zonesV1 = ZonesV1.newInstance(options);
     expect(zonesV1).not.toBeNull();
     done();
   });
 
   test('should successfully create the range application', async done => {
     try {
       const params = {
         protocol: 'tcp/35',
         dns: { type: 'CNAME', name: 'ab.' + config.DOMAIN_NAME },
         originDirect: ['tcp://2.5.6.7:35'],
         proxyProtocol: 'off',
         ipFirewall: false,
         tls: 'off',
         trafficType: 'direct',
         edgeIps: { connectivity: 'all', type: 'dynamic' },
       };
       const response = await rangeApplicationsV1.createRangeApp(params);
       expect(response).toBeDefined();
       expect(response.status).toEqual(200);
 
       const result = response || {};
       expect(result).toBeDefined();
 
       rangeAppCreated = result.result;
       if (rangeAppCreated) {
         expect(rangeAppCreated).toBeDefined();
         expect(rangeAppCreated.result.protocol).toEqual(params.protocol);
         expect(rangeAppCreated.result.dns).toEqual(params.dns);
         expect(rangeAppCreated.result.tls).toEqual(params.tls);
         expect(rangeAppCreated.result.origin_direct).toEqual(params.originDirect);
         expect(rangeAppCreated.result.proxy_protocol).toEqual(params.proxyProtocol);
         expect(rangeAppCreated.result.ip_firewall).toEqual(params.ipFirewall);
       }
       done();
     } catch (err) {
       done(err);
     }
   });
 
   test('should successfully update the range application', async done => {
     try {
       const params = {
         appIdentifier: rangeAppCreated.result.id,
         protocol: 'tcp/35',
         dns: { type: 'CNAME', name: rangeAppCreated.result.dns.name },
         originDirect: ['tcp://2.5.6.7:32'],
         proxyProtocol: 'v1',
         ipFirewall: true,
         tls: 'flexible',
         trafficType: 'direct',
       };
       const response = await rangeApplicationsV1.updateRangeApp(params);
       expect(response).toBeDefined();
       expect(response.status).toEqual(200);
 
       const result = response || {};
       expect(result).toBeDefined();
       rangeAppCreated = result.result;
       if (rangeAppCreated) {
         expect(rangeAppCreated).toBeDefined();
         expect(rangeAppCreated.result.protocol).toEqual(params.protocol);
         expect(rangeAppCreated.result.dns).toEqual(params.dns);
         expect(rangeAppCreated.result.tls).toEqual(params.tls);
         expect(rangeAppCreated.result.origin_direct).toEqual(params.originDirect);
         expect(rangeAppCreated.result.proxy_protocol).toEqual(params.proxyProtocol);
         expect(rangeAppCreated.result.ip_firewall).toEqual(params.ipFirewall);
       }
       done();
     } catch (err) {
       done(err);
     }
   });
 
   test('should successfully fetch the range application', async done => {
     try {
       const params = {
         appIdentifier: rangeAppCreated.result.id,
       };
       const response = await rangeApplicationsV1.getRangeApp(params);
       expect(response).toBeDefined();
       expect(response.status).toEqual(200);
 
       const result = response || {};
       expect(result).toBeDefined();
       const app = result.result;
       if (app) {
         expect(app).toBeDefined();
         expect(app.result.protocol).toEqual(rangeAppCreated.result.protocol);
         expect(app.result.dns).toEqual(rangeAppCreated.result.dns);
         expect(app.result.tls).toEqual(rangeAppCreated.result.tls);
         expect(app.result.origin_direct).toEqual(rangeAppCreated.result.origin_direct);
         expect(app.result.proxy_protocol).toEqual(rangeAppCreated.result.proxy_protocol);
         expect(app.result.ip_firewall).toEqual(rangeAppCreated.result.ip_firewall);
       }
       done();
     } catch (err) {
       done(err);
     }
   });
 
   test('should successfully list the range application', async done => {
     try {
       const response = await rangeApplicationsV1.listRangeApps();
       expect(response).toBeDefined();
       expect(response.status).toEqual(200);
 
       const { result } = response || {};
       expect(result).toBeDefined();
 
       if (result.result && result.result.length > 0) {
         expect(result.result.length).toBeGreaterThan(0);
         expect(result.result[0].id).toBeDefined();
         expect(result.result[0].protocol).toBeDefined();
       }
 
       done();
     } catch (err) {
       done(err);
     }
   });
 
   test('should successfully delete the range application', async done => {
     try {
       const params = {
         appIdentifier: rangeAppCreated.result.id,
       };
       const response = await rangeApplicationsV1.deleteRangeApp(params);
       expect(response).toBeDefined();
       expect(response.status).toEqual(200);
 
       const { result } = response || {};
       expect(result).toBeDefined();
 
       if (result.result) {
         expect(result.result.id).toEqual(params.appIdentifier);
       }
       done();
     } catch (err) {
       done(err);
     }
   });
 });
 