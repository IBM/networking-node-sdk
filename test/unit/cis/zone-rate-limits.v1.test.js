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

const ZoneRateLimitsV1 = require('../../../dist/cis/zoneratelimitsv1/v1');

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
  zoneIdentifier: 'testString',
};

const zoneRateLimitsService = new ZoneRateLimitsV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(zoneRateLimitsService, 'createRequest');
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
    zoneIdentifier: 'testString',
  };
});

describe.skip('ZoneRateLimitsV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = ZoneRateLimitsV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(ZoneRateLimitsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(ZoneRateLimitsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(ZoneRateLimitsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = ZoneRateLimitsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(ZoneRateLimitsV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ZoneRateLimitsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ZoneRateLimitsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(ZoneRateLimitsV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new ZoneRateLimitsV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(service.crn);
        expect(serviceObj.zoneIdentifier).toEqual(service.zoneIdentifier);
      });
    });
  });
  describe('listAllZoneRateLimits', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAllZoneRateLimits
        const page = 38;
        const perPage = 5;
        const params = {
          page: page,
          perPage: perPage,
        };

        const listAllZoneRateLimitsResult = zoneRateLimitsService.listAllZoneRateLimits(params);

        // all methods should return a Promise
        expectToBePromise(listAllZoneRateLimitsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/rate_limits', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['page']).toEqual(page);
        expect(options.qs['per_page']).toEqual(perPage);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
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

        zoneRateLimitsService.listAllZoneRateLimits(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zoneRateLimitsService.listAllZoneRateLimits({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createZoneRateLimits', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RatelimitInputActionResponse
      const ratelimitInputActionResponseModel = {
        content_type: 'text/plain',
        body: 'This request has been rate-limited.',
      };

      // RatelimitInputAction
      const ratelimitInputActionModel = {
        mode: 'simulate',
        timeout: 60,
        response: ratelimitInputActionResponseModel,
      };

      // RatelimitInputMatchRequest
      const ratelimitInputMatchRequestModel = {
        methods: ['GET'],
        schemes: ['HTTP'],
        url: '*.example.org/path*',
      };

      // RatelimitInputMatchResponseHeadersItem
      const ratelimitInputMatchResponseHeadersItemModel = {
        name: 'Cf-Cache-Status',
        op: 'ne',
        value: 'HIT',
      };

      // RatelimitInputMatchResponse
      const ratelimitInputMatchResponseModel = {
        status: [403],
        headers: [ratelimitInputMatchResponseHeadersItemModel],
        origin_traffic: false,
      };

      // RatelimitInputMatch
      const ratelimitInputMatchModel = {
        request: ratelimitInputMatchRequestModel,
        response: ratelimitInputMatchResponseModel,
      };

      // RatelimitInputBypassItem
      const ratelimitInputBypassItemModel = {
        name: 'url',
        value: 'api.example.com/*',
      };

      // RatelimitInputCorrelate
      const ratelimitInputCorrelateModel = {
        by: 'nat',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createZoneRateLimits
        const threshold = 1000;
        const period = 60;
        const action = ratelimitInputActionModel;
        const match = ratelimitInputMatchModel;
        const disabled = false;
        const description = 'Prevent multiple login failures to mitigate brute force attacks';
        const bypass = [ratelimitInputBypassItemModel];
        const correlate = ratelimitInputCorrelateModel;
        const params = {
          threshold: threshold,
          period: period,
          action: action,
          match: match,
          disabled: disabled,
          description: description,
          bypass: bypass,
          correlate: correlate,
        };

        const createZoneRateLimitsResult = zoneRateLimitsService.createZoneRateLimits(params);

        // all methods should return a Promise
        expectToBePromise(createZoneRateLimitsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/{crn}/zones/{zone_identifier}/rate_limits', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['threshold']).toEqual(threshold);
        expect(options.body['period']).toEqual(period);
        expect(options.body['action']).toEqual(action);
        expect(options.body['match']).toEqual(match);
        expect(options.body['disabled']).toEqual(disabled);
        expect(options.body['description']).toEqual(description);
        expect(options.body['bypass']).toEqual(bypass);
        expect(options.body['correlate']).toEqual(correlate);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
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

        zoneRateLimitsService.createZoneRateLimits(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        zoneRateLimitsService.createZoneRateLimits({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteZoneRateLimit', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteZoneRateLimit
        const rateLimitIdentifier = 'testString';
        const params = {
          rateLimitIdentifier: rateLimitIdentifier,
        };

        const deleteZoneRateLimitResult = zoneRateLimitsService.deleteZoneRateLimit(params);

        // all methods should return a Promise
        expectToBePromise(deleteZoneRateLimitResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/rate_limits/{rate_limit_identifier}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['rate_limit_identifier']).toEqual(rateLimitIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rateLimitIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          rateLimitIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zoneRateLimitsService.deleteZoneRateLimit(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await zoneRateLimitsService.deleteZoneRateLimit({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteZoneRateLimitPromise = zoneRateLimitsService.deleteZoneRateLimit();
        expectToBePromise(deleteZoneRateLimitPromise);

        deleteZoneRateLimitPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getRateLimit', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getRateLimit
        const rateLimitIdentifier = 'testString';
        const params = {
          rateLimitIdentifier: rateLimitIdentifier,
        };

        const getRateLimitResult = zoneRateLimitsService.getRateLimit(params);

        // all methods should return a Promise
        expectToBePromise(getRateLimitResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/rate_limits/{rate_limit_identifier}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['rate_limit_identifier']).toEqual(rateLimitIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rateLimitIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          rateLimitIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zoneRateLimitsService.getRateLimit(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await zoneRateLimitsService.getRateLimit({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getRateLimitPromise = zoneRateLimitsService.getRateLimit();
        expectToBePromise(getRateLimitPromise);

        getRateLimitPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateRateLimit', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RatelimitInputActionResponse
      const ratelimitInputActionResponseModel = {
        content_type: 'text/plain',
        body: 'This request has been rate-limited.',
      };

      // RatelimitInputAction
      const ratelimitInputActionModel = {
        mode: 'simulate',
        timeout: 60,
        response: ratelimitInputActionResponseModel,
      };

      // RatelimitInputMatchRequest
      const ratelimitInputMatchRequestModel = {
        methods: ['GET'],
        schemes: ['HTTP'],
        url: '*.example.org/path*',
      };

      // RatelimitInputMatchResponseHeadersItem
      const ratelimitInputMatchResponseHeadersItemModel = {
        name: 'Cf-Cache-Status',
        op: 'ne',
        value: 'HIT',
      };

      // RatelimitInputMatchResponse
      const ratelimitInputMatchResponseModel = {
        status: [403],
        headers: [ratelimitInputMatchResponseHeadersItemModel],
        origin_traffic: false,
      };

      // RatelimitInputMatch
      const ratelimitInputMatchModel = {
        request: ratelimitInputMatchRequestModel,
        response: ratelimitInputMatchResponseModel,
      };

      // RatelimitInputBypassItem
      const ratelimitInputBypassItemModel = {
        name: 'url',
        value: 'api.example.com/*',
      };

      // RatelimitInputCorrelate
      const ratelimitInputCorrelateModel = {
        by: 'nat',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateRateLimit
        const rateLimitIdentifier = 'testString';
        const threshold = 1000;
        const period = 60;
        const action = ratelimitInputActionModel;
        const match = ratelimitInputMatchModel;
        const disabled = false;
        const description = 'Prevent multiple login failures to mitigate brute force attacks';
        const bypass = [ratelimitInputBypassItemModel];
        const correlate = ratelimitInputCorrelateModel;
        const params = {
          rateLimitIdentifier: rateLimitIdentifier,
          threshold: threshold,
          period: period,
          action: action,
          match: match,
          disabled: disabled,
          description: description,
          bypass: bypass,
          correlate: correlate,
        };

        const updateRateLimitResult = zoneRateLimitsService.updateRateLimit(params);

        // all methods should return a Promise
        expectToBePromise(updateRateLimitResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v1/{crn}/zones/{zone_identifier}/rate_limits/{rate_limit_identifier}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['threshold']).toEqual(threshold);
        expect(options.body['period']).toEqual(period);
        expect(options.body['action']).toEqual(action);
        expect(options.body['match']).toEqual(match);
        expect(options.body['disabled']).toEqual(disabled);
        expect(options.body['description']).toEqual(description);
        expect(options.body['bypass']).toEqual(bypass);
        expect(options.body['correlate']).toEqual(correlate);
        expect(options.path['crn']).toEqual(service.crn);
        expect(options.path['zone_identifier']).toEqual(service.zoneIdentifier);
        expect(options.path['rate_limit_identifier']).toEqual(rateLimitIdentifier);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rateLimitIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          rateLimitIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        zoneRateLimitsService.updateRateLimit(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await zoneRateLimitsService.updateRateLimit({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateRateLimitPromise = zoneRateLimitsService.updateRateLimit();
        expectToBePromise(updateRateLimitPromise);

        updateRateLimitPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
