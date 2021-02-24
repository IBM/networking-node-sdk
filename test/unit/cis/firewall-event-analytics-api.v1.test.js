/**
 * (C) Copyright IBM Corp. 2021.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const FirewallEventAnalyticsApiV1 = require('../../../dist/cis/firewalleventanalyticsapiv1/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  zoneId: 'testString',
};

const firewallEventAnalyticsApiService = new FirewallEventAnalyticsApiV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(firewallEventAnalyticsApiService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

// used for the service construction tests
let requiredGlobals;
beforeEach(() => {
  // these are changed when passed into the factory/constructor, so re-init
  requiredGlobals = {
    crn: 'testString',
    zoneId: 'testString',
  };
});

describe('FirewallEventAnalyticsApiV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = FirewallEventAnalyticsApiV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(
        FirewallEventAnalyticsApiV1.DEFAULT_SERVICE_NAME
      );
      expect(testInstance.baseOptions.serviceUrl).toBe(
        FirewallEventAnalyticsApiV1.DEFAULT_SERVICE_URL
      );
      expect(testInstance).toBeInstanceOf(FirewallEventAnalyticsApiV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = FirewallEventAnalyticsApiV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(FirewallEventAnalyticsApiV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new FirewallEventAnalyticsApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new FirewallEventAnalyticsApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(
        FirewallEventAnalyticsApiV1.DEFAULT_SERVICE_URL
      );
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new FirewallEventAnalyticsApiV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneId).toEqual(service.zoneId);
      });
    });
  });
  describe('firewallEventAnalytics', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation firewallEventAnalytics
        const dataset = 'firewallEventsAdaptiveGroups';
        const filter = 'testString';
        const limit = 1;
        const orderBy = 'datetime_ASC';
        const params = {
          dataset: dataset,
          filter: filter,
          limit: limit,
          orderBy: orderBy,
        };

        const firewallEventAnalyticsResult = firewallEventAnalyticsApiService.firewallEventAnalytics(
          params
        );

        // all methods should return a Promise
        expectToBePromise(firewallEventAnalyticsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/{crn}/zones/{zone_id}/analytics/firewall_events', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['dataset']).toEqual(dataset);
        expect(options.qs['filter']).toEqual(filter);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['orderBy']).toEqual(orderBy);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_id']).toEqual(service.zoneId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        firewallEventAnalyticsApiService.firewallEventAnalytics(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        firewallEventAnalyticsApiService.firewallEventAnalytics({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
