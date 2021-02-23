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

const SecurityEventsApiV1 = require('../../../dist/cis/securityeventsapiv1/v1');

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

const securityEventsApiService = new SecurityEventsApiV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(securityEventsApiService, 'createRequest');
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

describe('SecurityEventsApiV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = SecurityEventsApiV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(SecurityEventsApiV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(SecurityEventsApiV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(SecurityEventsApiV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = SecurityEventsApiV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(SecurityEventsApiV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new SecurityEventsApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new SecurityEventsApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(SecurityEventsApiV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new SecurityEventsApiV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneId).toEqual(service.zoneId);
      });
    });
  });
  describe('securityEvents', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation securityEvents
        const ipClass = 'unknown';
        const method = 'GET';
        const scheme = 'unknown';
        const ip = 'testString';
        const host = 'testString';
        const proto = 'UNK';
        const uri = 'testString';
        const ua = 'testString';
        const colo = 'testString';
        const rayId = 'testString';
        const kind = 'firewall';
        const action = 'unknown';
        const cursor = 'testString';
        const country = 'testString';
        const since = '2019-01-01T12:00:00';
        const source = 'unknown';
        const limit = 10;
        const ruleId = 'testString';
        const until = '2019-01-01T12:00:00';
        const params = {
          ipClass: ipClass,
          method: method,
          scheme: scheme,
          ip: ip,
          host: host,
          proto: proto,
          uri: uri,
          ua: ua,
          colo: colo,
          rayId: rayId,
          kind: kind,
          action: action,
          cursor: cursor,
          country: country,
          since: since,
          source: source,
          limit: limit,
          ruleId: ruleId,
          until: until,
        };

        const securityEventsResult = securityEventsApiService.securityEvents(params);

        // all methods should return a Promise
        expectToBePromise(securityEventsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_id}/security/events', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['ip_class']).toEqual(ipClass);
        expect(options.qs['method']).toEqual(method);
        expect(options.qs['scheme']).toEqual(scheme);
        expect(options.qs['ip']).toEqual(ip);
        expect(options.qs['host']).toEqual(host);
        expect(options.qs['proto']).toEqual(proto);
        expect(options.qs['uri']).toEqual(uri);
        expect(options.qs['ua']).toEqual(ua);
        expect(options.qs['colo']).toEqual(colo);
        expect(options.qs['ray_id']).toEqual(rayId);
        expect(options.qs['kind']).toEqual(kind);
        expect(options.qs['action']).toEqual(action);
        expect(options.qs['cursor']).toEqual(cursor);
        expect(options.qs['country']).toEqual(country);
        expect(options.qs['since']).toEqual(since);
        expect(options.qs['source']).toEqual(source);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['rule_id']).toEqual(ruleId);
        expect(options.qs['until']).toEqual(until);
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

        securityEventsApiService.securityEvents(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        securityEventsApiService.securityEvents({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
