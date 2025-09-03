/**
 * (C) Copyright IBM Corp. 2025.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const RulesetsV1 = require('../../../dist/cis/rulesets/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const rulesetsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.cis.cloud.ibm.com',
  crn: 'testString',
  zoneIdentifier: 'testString',
};

const rulesetsService = new RulesetsV1(rulesetsServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(rulesetsService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('RulesetsV1', () => {
  beforeEach(() => {
    mock_createRequest();
    // these are changed when passed into the factory/constructor, so re-init
    requiredGlobals = {
      crn: 'testString',
      zoneIdentifier: 'testString',
    };
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = RulesetsV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(RulesetsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(RulesetsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(RulesetsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = RulesetsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(RulesetsV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new RulesetsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new RulesetsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(RulesetsV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new RulesetsV1(rulesetsServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.crn).toEqual(rulesetsServiceOptions.crn);
        expect(serviceObj.zoneIdentifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
      });
    });
  });

  describe('getInstanceRulesets', () => {
    describe('positive tests', () => {
      function __getInstanceRulesetsTest() {
        // Construct the params object for operation getInstanceRulesets
        const getInstanceRulesetsParams = {};

        const getInstanceRulesetsResult = rulesetsService.getInstanceRulesets(getInstanceRulesetsParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceRulesetsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceRulesetsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getInstanceRulesetsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getInstanceRulesetsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceRulesetsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getInstanceRulesets(getInstanceRulesetsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        rulesetsService.getInstanceRulesets({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getInstanceRuleset', () => {
    describe('positive tests', () => {
      function __getInstanceRulesetTest() {
        // Construct the params object for operation getInstanceRuleset
        const rulesetId = 'testString';
        const getInstanceRulesetParams = {
          rulesetId,
        };

        const getInstanceRulesetResult = rulesetsService.getInstanceRuleset(getInstanceRulesetParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceRulesetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets/{ruleset_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceRulesetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getInstanceRulesetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getInstanceRulesetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceRulesetParams = {
          rulesetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getInstanceRuleset(getInstanceRulesetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.getInstanceRuleset({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.getInstanceRuleset();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateInstanceRuleset', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RulesOverride
      const rulesOverrideModel = {
        id: 'testString',
        enabled: true,
        action: 'testString',
        sensitivity_level: 'high',
        score_threshold: 60,
      };

      // CategoriesOverride
      const categoriesOverrideModel = {
        category: 'testString',
        enabled: true,
        action: 'testString',
      };

      // Overrides
      const overridesModel = {
        action: 'testString',
        enabled: true,
        sensitivity_level: 'high',
        rules: [rulesOverrideModel],
        categories: [categoriesOverrideModel],
      };

      // ActionParametersResponse
      const actionParametersResponseModel = {
        content: '{"success": false, "error": "you have been blocked"}',
        content_type: 'application/json',
        status_code: 400,
      };

      // ActionParameters
      const actionParametersModel = {
        id: 'testString',
        overrides: overridesModel,
        version: 'testString',
        ruleset: 'testString',
        rulesets: ['testString'],
        phases: ['testString'],
        products: ['testString'],
        response: actionParametersResponseModel,
      };

      // Ratelimit
      const ratelimitModel = {
        characteristics: ['testString'],
        counting_expression: 'testString',
        mitigation_timeout: 38,
        period: 38,
        requests_per_period: 38,
      };

      // Logging
      const loggingModel = {
        enabled: true,
      };

      // Position
      const positionModel = {
        before: 'testString',
        after: 'testString',
        index: 0,
      };

      // RuleCreate
      const ruleCreateModel = {
        action: 'testString',
        action_parameters: actionParametersModel,
        ratelimit: ratelimitModel,
        description: 'testString',
        enabled: true,
        expression: 'ip.src ne 1.1.1.1',
        id: 'testString',
        logging: loggingModel,
        ref: 'my_ref',
        position: positionModel,
      };

      function __updateInstanceRulesetTest() {
        // Construct the params object for operation updateInstanceRuleset
        const rulesetId = 'testString';
        const description = 'Custom instance ruleset';
        const kind = 'managed';
        const name = 'testString';
        const phase = 'ddos_l4';
        const rules = [ruleCreateModel];
        const updateInstanceRulesetParams = {
          rulesetId,
          description,
          kind,
          name,
          phase,
          rules,
        };

        const updateInstanceRulesetResult = rulesetsService.updateInstanceRuleset(updateInstanceRulesetParams);

        // all methods should return a Promise
        expectToBePromise(updateInstanceRulesetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets/{ruleset_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.phase).toEqual(phase);
        expect(mockRequestOptions.body.rules).toEqual(rules);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceRulesetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __updateInstanceRulesetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __updateInstanceRulesetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceRulesetParams = {
          rulesetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.updateInstanceRuleset(updateInstanceRulesetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.updateInstanceRuleset({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.updateInstanceRuleset();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteInstanceRuleset', () => {
    describe('positive tests', () => {
      function __deleteInstanceRulesetTest() {
        // Construct the params object for operation deleteInstanceRuleset
        const rulesetId = 'testString';
        const deleteInstanceRulesetParams = {
          rulesetId,
        };

        const deleteInstanceRulesetResult = rulesetsService.deleteInstanceRuleset(deleteInstanceRulesetParams);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceRulesetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets/{ruleset_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceRulesetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __deleteInstanceRulesetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __deleteInstanceRulesetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceRulesetParams = {
          rulesetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.deleteInstanceRuleset(deleteInstanceRulesetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.deleteInstanceRuleset({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.deleteInstanceRuleset();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getInstanceRulesetVersions', () => {
    describe('positive tests', () => {
      function __getInstanceRulesetVersionsTest() {
        // Construct the params object for operation getInstanceRulesetVersions
        const rulesetId = 'testString';
        const getInstanceRulesetVersionsParams = {
          rulesetId,
        };

        const getInstanceRulesetVersionsResult = rulesetsService.getInstanceRulesetVersions(getInstanceRulesetVersionsParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceRulesetVersionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets/{ruleset_id}/versions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceRulesetVersionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getInstanceRulesetVersionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getInstanceRulesetVersionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceRulesetVersionsParams = {
          rulesetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getInstanceRulesetVersions(getInstanceRulesetVersionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.getInstanceRulesetVersions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.getInstanceRulesetVersions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getInstanceRulesetVersion', () => {
    describe('positive tests', () => {
      function __getInstanceRulesetVersionTest() {
        // Construct the params object for operation getInstanceRulesetVersion
        const rulesetId = 'testString';
        const rulesetVersion = '1';
        const getInstanceRulesetVersionParams = {
          rulesetId,
          rulesetVersion,
        };

        const getInstanceRulesetVersionResult = rulesetsService.getInstanceRulesetVersion(getInstanceRulesetVersionParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceRulesetVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets/{ruleset_id}/versions/{ruleset_version}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
        expect(mockRequestOptions.path.ruleset_version).toEqual(rulesetVersion);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceRulesetVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getInstanceRulesetVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getInstanceRulesetVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const rulesetVersion = '1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceRulesetVersionParams = {
          rulesetId,
          rulesetVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getInstanceRulesetVersion(getInstanceRulesetVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.getInstanceRulesetVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.getInstanceRulesetVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteInstanceRulesetVersion', () => {
    describe('positive tests', () => {
      function __deleteInstanceRulesetVersionTest() {
        // Construct the params object for operation deleteInstanceRulesetVersion
        const rulesetId = 'testString';
        const rulesetVersion = '1';
        const deleteInstanceRulesetVersionParams = {
          rulesetId,
          rulesetVersion,
        };

        const deleteInstanceRulesetVersionResult = rulesetsService.deleteInstanceRulesetVersion(deleteInstanceRulesetVersionParams);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceRulesetVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets/{ruleset_id}/versions/{ruleset_version}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
        expect(mockRequestOptions.path.ruleset_version).toEqual(rulesetVersion);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceRulesetVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __deleteInstanceRulesetVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __deleteInstanceRulesetVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const rulesetVersion = '1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceRulesetVersionParams = {
          rulesetId,
          rulesetVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.deleteInstanceRulesetVersion(deleteInstanceRulesetVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.deleteInstanceRulesetVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.deleteInstanceRulesetVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getInstanceEntrypointRuleset', () => {
    describe('positive tests', () => {
      function __getInstanceEntrypointRulesetTest() {
        // Construct the params object for operation getInstanceEntrypointRuleset
        const rulesetPhase = 'ddos_l4';
        const getInstanceEntrypointRulesetParams = {
          rulesetPhase,
        };

        const getInstanceEntrypointRulesetResult = rulesetsService.getInstanceEntrypointRuleset(getInstanceEntrypointRulesetParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceEntrypointRulesetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets/phases/{ruleset_phase}/entrypoint', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.ruleset_phase).toEqual(rulesetPhase);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceEntrypointRulesetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getInstanceEntrypointRulesetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getInstanceEntrypointRulesetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetPhase = 'ddos_l4';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceEntrypointRulesetParams = {
          rulesetPhase,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getInstanceEntrypointRuleset(getInstanceEntrypointRulesetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.getInstanceEntrypointRuleset({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.getInstanceEntrypointRuleset();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateInstanceEntrypointRuleset', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RulesOverride
      const rulesOverrideModel = {
        id: 'testString',
        enabled: true,
        action: 'testString',
        sensitivity_level: 'high',
        score_threshold: 60,
      };

      // CategoriesOverride
      const categoriesOverrideModel = {
        category: 'testString',
        enabled: true,
        action: 'testString',
      };

      // Overrides
      const overridesModel = {
        action: 'testString',
        enabled: true,
        sensitivity_level: 'high',
        rules: [rulesOverrideModel],
        categories: [categoriesOverrideModel],
      };

      // ActionParametersResponse
      const actionParametersResponseModel = {
        content: '{"success": false, "error": "you have been blocked"}',
        content_type: 'application/json',
        status_code: 400,
      };

      // ActionParameters
      const actionParametersModel = {
        id: 'testString',
        overrides: overridesModel,
        version: 'testString',
        ruleset: 'testString',
        rulesets: ['testString'],
        phases: ['testString'],
        products: ['testString'],
        response: actionParametersResponseModel,
      };

      // Ratelimit
      const ratelimitModel = {
        characteristics: ['testString'],
        counting_expression: 'testString',
        mitigation_timeout: 38,
        period: 38,
        requests_per_period: 38,
      };

      // Logging
      const loggingModel = {
        enabled: true,
      };

      // Position
      const positionModel = {
        before: 'testString',
        after: 'testString',
        index: 0,
      };

      // RuleCreate
      const ruleCreateModel = {
        action: 'testString',
        action_parameters: actionParametersModel,
        ratelimit: ratelimitModel,
        description: 'testString',
        enabled: true,
        expression: 'ip.src ne 1.1.1.1',
        id: 'testString',
        logging: loggingModel,
        ref: 'my_ref',
        position: positionModel,
      };

      function __updateInstanceEntrypointRulesetTest() {
        // Construct the params object for operation updateInstanceEntrypointRuleset
        const rulesetPhase = 'ddos_l4';
        const description = 'Custom instance ruleset';
        const kind = 'managed';
        const name = 'testString';
        const phase = 'ddos_l4';
        const rules = [ruleCreateModel];
        const updateInstanceEntrypointRulesetParams = {
          rulesetPhase,
          description,
          kind,
          name,
          phase,
          rules,
        };

        const updateInstanceEntrypointRulesetResult = rulesetsService.updateInstanceEntrypointRuleset(updateInstanceEntrypointRulesetParams);

        // all methods should return a Promise
        expectToBePromise(updateInstanceEntrypointRulesetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets/phases/{ruleset_phase}/entrypoint', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.phase).toEqual(phase);
        expect(mockRequestOptions.body.rules).toEqual(rules);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.ruleset_phase).toEqual(rulesetPhase);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceEntrypointRulesetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __updateInstanceEntrypointRulesetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __updateInstanceEntrypointRulesetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetPhase = 'ddos_l4';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceEntrypointRulesetParams = {
          rulesetPhase,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.updateInstanceEntrypointRuleset(updateInstanceEntrypointRulesetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.updateInstanceEntrypointRuleset({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.updateInstanceEntrypointRuleset();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getInstanceEntryPointRulesetVersions', () => {
    describe('positive tests', () => {
      function __getInstanceEntryPointRulesetVersionsTest() {
        // Construct the params object for operation getInstanceEntryPointRulesetVersions
        const rulesetPhase = 'ddos_l4';
        const getInstanceEntryPointRulesetVersionsParams = {
          rulesetPhase,
        };

        const getInstanceEntryPointRulesetVersionsResult = rulesetsService.getInstanceEntryPointRulesetVersions(getInstanceEntryPointRulesetVersionsParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceEntryPointRulesetVersionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets/phases/{ruleset_phase}/entrypoint/versions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.ruleset_phase).toEqual(rulesetPhase);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceEntryPointRulesetVersionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getInstanceEntryPointRulesetVersionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getInstanceEntryPointRulesetVersionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetPhase = 'ddos_l4';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceEntryPointRulesetVersionsParams = {
          rulesetPhase,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getInstanceEntryPointRulesetVersions(getInstanceEntryPointRulesetVersionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.getInstanceEntryPointRulesetVersions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.getInstanceEntryPointRulesetVersions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getInstanceEntryPointRulesetVersion', () => {
    describe('positive tests', () => {
      function __getInstanceEntryPointRulesetVersionTest() {
        // Construct the params object for operation getInstanceEntryPointRulesetVersion
        const rulesetPhase = 'ddos_l4';
        const rulesetVersion = '1';
        const getInstanceEntryPointRulesetVersionParams = {
          rulesetPhase,
          rulesetVersion,
        };

        const getInstanceEntryPointRulesetVersionResult = rulesetsService.getInstanceEntryPointRulesetVersion(getInstanceEntryPointRulesetVersionParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceEntryPointRulesetVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets/phases/{ruleset_phase}/entrypoint/versions/{ruleset_version}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.ruleset_phase).toEqual(rulesetPhase);
        expect(mockRequestOptions.path.ruleset_version).toEqual(rulesetVersion);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceEntryPointRulesetVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getInstanceEntryPointRulesetVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getInstanceEntryPointRulesetVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetPhase = 'ddos_l4';
        const rulesetVersion = '1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceEntryPointRulesetVersionParams = {
          rulesetPhase,
          rulesetVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getInstanceEntryPointRulesetVersion(getInstanceEntryPointRulesetVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.getInstanceEntryPointRulesetVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.getInstanceEntryPointRulesetVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createInstanceRulesetRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RulesOverride
      const rulesOverrideModel = {
        id: 'testString',
        enabled: true,
        action: 'testString',
        sensitivity_level: 'high',
        score_threshold: 60,
      };

      // CategoriesOverride
      const categoriesOverrideModel = {
        category: 'testString',
        enabled: true,
        action: 'testString',
      };

      // Overrides
      const overridesModel = {
        action: 'testString',
        enabled: true,
        sensitivity_level: 'high',
        rules: [rulesOverrideModel],
        categories: [categoriesOverrideModel],
      };

      // ActionParametersResponse
      const actionParametersResponseModel = {
        content: '{"success": false, "error": "you have been blocked"}',
        content_type: 'application/json',
        status_code: 400,
      };

      // ActionParameters
      const actionParametersModel = {
        id: 'testString',
        overrides: overridesModel,
        version: 'testString',
        ruleset: 'testString',
        rulesets: ['testString'],
        phases: ['testString'],
        products: ['testString'],
        response: actionParametersResponseModel,
      };

      // Ratelimit
      const ratelimitModel = {
        characteristics: ['testString'],
        counting_expression: 'testString',
        mitigation_timeout: 38,
        period: 38,
        requests_per_period: 38,
      };

      // Logging
      const loggingModel = {
        enabled: true,
      };

      // Position
      const positionModel = {
        before: 'testString',
        after: 'testString',
        index: 0,
      };

      function __createInstanceRulesetRuleTest() {
        // Construct the params object for operation createInstanceRulesetRule
        const rulesetId = 'testString';
        const action = 'testString';
        const expression = 'ip.src ne 1.1.1.1';
        const actionParameters = actionParametersModel;
        const ratelimit = ratelimitModel;
        const description = 'testString';
        const enabled = true;
        const id = 'testString';
        const logging = loggingModel;
        const ref = 'my_ref';
        const position = positionModel;
        const createInstanceRulesetRuleParams = {
          rulesetId,
          action,
          expression,
          actionParameters,
          ratelimit,
          description,
          enabled,
          id,
          logging,
          ref,
          position,
        };

        const createInstanceRulesetRuleResult = rulesetsService.createInstanceRulesetRule(createInstanceRulesetRuleParams);

        // all methods should return a Promise
        expectToBePromise(createInstanceRulesetRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets/{ruleset_id}/rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.expression).toEqual(expression);
        expect(mockRequestOptions.body.action_parameters).toEqual(actionParameters);
        expect(mockRequestOptions.body.ratelimit).toEqual(ratelimit);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.logging).toEqual(logging);
        expect(mockRequestOptions.body.ref).toEqual(ref);
        expect(mockRequestOptions.body.position).toEqual(position);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceRulesetRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __createInstanceRulesetRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __createInstanceRulesetRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceRulesetRuleParams = {
          rulesetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.createInstanceRulesetRule(createInstanceRulesetRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.createInstanceRulesetRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.createInstanceRulesetRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateInstanceRulesetRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RulesOverride
      const rulesOverrideModel = {
        id: 'testString',
        enabled: true,
        action: 'testString',
        sensitivity_level: 'high',
        score_threshold: 60,
      };

      // CategoriesOverride
      const categoriesOverrideModel = {
        category: 'testString',
        enabled: true,
        action: 'testString',
      };

      // Overrides
      const overridesModel = {
        action: 'testString',
        enabled: true,
        sensitivity_level: 'high',
        rules: [rulesOverrideModel],
        categories: [categoriesOverrideModel],
      };

      // ActionParametersResponse
      const actionParametersResponseModel = {
        content: '{"success": false, "error": "you have been blocked"}',
        content_type: 'application/json',
        status_code: 400,
      };

      // ActionParameters
      const actionParametersModel = {
        id: 'testString',
        overrides: overridesModel,
        version: 'testString',
        ruleset: 'testString',
        rulesets: ['testString'],
        phases: ['testString'],
        products: ['testString'],
        response: actionParametersResponseModel,
      };

      // Ratelimit
      const ratelimitModel = {
        characteristics: ['testString'],
        counting_expression: 'testString',
        mitigation_timeout: 38,
        period: 38,
        requests_per_period: 38,
      };

      // Logging
      const loggingModel = {
        enabled: true,
      };

      // Position
      const positionModel = {
        before: 'testString',
        after: 'testString',
        index: 0,
      };

      function __updateInstanceRulesetRuleTest() {
        // Construct the params object for operation updateInstanceRulesetRule
        const rulesetId = 'testString';
        const ruleId = 'testString';
        const action = 'testString';
        const actionParameters = actionParametersModel;
        const ratelimit = ratelimitModel;
        const description = 'testString';
        const enabled = true;
        const expression = 'ip.src ne 1.1.1.1';
        const id = 'testString';
        const logging = loggingModel;
        const ref = 'my_ref';
        const position = positionModel;
        const updateInstanceRulesetRuleParams = {
          rulesetId,
          ruleId,
          action,
          actionParameters,
          ratelimit,
          description,
          enabled,
          expression,
          id,
          logging,
          ref,
          position,
        };

        const updateInstanceRulesetRuleResult = rulesetsService.updateInstanceRulesetRule(updateInstanceRulesetRuleParams);

        // all methods should return a Promise
        expectToBePromise(updateInstanceRulesetRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets/{ruleset_id}/rules/{rule_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.action_parameters).toEqual(actionParameters);
        expect(mockRequestOptions.body.ratelimit).toEqual(ratelimit);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.expression).toEqual(expression);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.logging).toEqual(logging);
        expect(mockRequestOptions.body.ref).toEqual(ref);
        expect(mockRequestOptions.body.position).toEqual(position);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceRulesetRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __updateInstanceRulesetRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __updateInstanceRulesetRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceRulesetRuleParams = {
          rulesetId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.updateInstanceRulesetRule(updateInstanceRulesetRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.updateInstanceRulesetRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.updateInstanceRulesetRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteInstanceRulesetRule', () => {
    describe('positive tests', () => {
      function __deleteInstanceRulesetRuleTest() {
        // Construct the params object for operation deleteInstanceRulesetRule
        const rulesetId = 'testString';
        const ruleId = 'testString';
        const deleteInstanceRulesetRuleParams = {
          rulesetId,
          ruleId,
        };

        const deleteInstanceRulesetRuleResult = rulesetsService.deleteInstanceRulesetRule(deleteInstanceRulesetRuleParams);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceRulesetRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets/{ruleset_id}/rules/{rule_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceRulesetRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __deleteInstanceRulesetRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __deleteInstanceRulesetRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceRulesetRuleParams = {
          rulesetId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.deleteInstanceRulesetRule(deleteInstanceRulesetRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.deleteInstanceRulesetRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.deleteInstanceRulesetRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getInstanceRulesetVersionByTag', () => {
    describe('positive tests', () => {
      function __getInstanceRulesetVersionByTagTest() {
        // Construct the params object for operation getInstanceRulesetVersionByTag
        const rulesetId = 'testString';
        const rulesetVersion = '1';
        const ruleTag = 'testString';
        const getInstanceRulesetVersionByTagParams = {
          rulesetId,
          rulesetVersion,
          ruleTag,
        };

        const getInstanceRulesetVersionByTagResult = rulesetsService.getInstanceRulesetVersionByTag(getInstanceRulesetVersionByTagParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceRulesetVersionByTagResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/rulesets/{ruleset_id}/versions/{ruleset_version}/by_tag/{rule_tag}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
        expect(mockRequestOptions.path.ruleset_version).toEqual(rulesetVersion);
        expect(mockRequestOptions.path.rule_tag).toEqual(ruleTag);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceRulesetVersionByTagTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getInstanceRulesetVersionByTagTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getInstanceRulesetVersionByTagTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const rulesetVersion = '1';
        const ruleTag = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceRulesetVersionByTagParams = {
          rulesetId,
          rulesetVersion,
          ruleTag,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getInstanceRulesetVersionByTag(getInstanceRulesetVersionByTagParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.getInstanceRulesetVersionByTag({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.getInstanceRulesetVersionByTag();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getZoneRulesets', () => {
    describe('positive tests', () => {
      function __getZoneRulesetsTest() {
        // Construct the params object for operation getZoneRulesets
        const getZoneRulesetsParams = {};

        const getZoneRulesetsResult = rulesetsService.getZoneRulesets(getZoneRulesetsParams);

        // all methods should return a Promise
        expectToBePromise(getZoneRulesetsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/rulesets', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getZoneRulesetsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getZoneRulesetsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getZoneRulesetsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getZoneRulesetsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getZoneRulesets(getZoneRulesetsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        rulesetsService.getZoneRulesets({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getZoneRuleset', () => {
    describe('positive tests', () => {
      function __getZoneRulesetTest() {
        // Construct the params object for operation getZoneRuleset
        const rulesetId = 'testString';
        const getZoneRulesetParams = {
          rulesetId,
        };

        const getZoneRulesetResult = rulesetsService.getZoneRuleset(getZoneRulesetParams);

        // all methods should return a Promise
        expectToBePromise(getZoneRulesetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getZoneRulesetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getZoneRulesetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getZoneRulesetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getZoneRulesetParams = {
          rulesetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getZoneRuleset(getZoneRulesetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.getZoneRuleset({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.getZoneRuleset();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateZoneRuleset', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RulesOverride
      const rulesOverrideModel = {
        id: 'testString',
        enabled: true,
        action: 'testString',
        sensitivity_level: 'high',
        score_threshold: 60,
      };

      // CategoriesOverride
      const categoriesOverrideModel = {
        category: 'testString',
        enabled: true,
        action: 'testString',
      };

      // Overrides
      const overridesModel = {
        action: 'testString',
        enabled: true,
        sensitivity_level: 'high',
        rules: [rulesOverrideModel],
        categories: [categoriesOverrideModel],
      };

      // ActionParametersResponse
      const actionParametersResponseModel = {
        content: '{"success": false, "error": "you have been blocked"}',
        content_type: 'application/json',
        status_code: 400,
      };

      // ActionParameters
      const actionParametersModel = {
        id: 'testString',
        overrides: overridesModel,
        version: 'testString',
        ruleset: 'testString',
        rulesets: ['testString'],
        phases: ['testString'],
        products: ['testString'],
        response: actionParametersResponseModel,
      };

      // Ratelimit
      const ratelimitModel = {
        characteristics: ['testString'],
        counting_expression: 'testString',
        mitigation_timeout: 38,
        period: 38,
        requests_per_period: 38,
      };

      // Logging
      const loggingModel = {
        enabled: true,
      };

      // Position
      const positionModel = {
        before: 'testString',
        after: 'testString',
        index: 0,
      };

      // RuleCreate
      const ruleCreateModel = {
        action: 'testString',
        action_parameters: actionParametersModel,
        ratelimit: ratelimitModel,
        description: 'testString',
        enabled: true,
        expression: 'ip.src ne 1.1.1.1',
        id: 'testString',
        logging: loggingModel,
        ref: 'my_ref',
        position: positionModel,
      };

      function __updateZoneRulesetTest() {
        // Construct the params object for operation updateZoneRuleset
        const rulesetId = 'testString';
        const description = 'Custom instance ruleset';
        const kind = 'managed';
        const name = 'testString';
        const phase = 'ddos_l4';
        const rules = [ruleCreateModel];
        const updateZoneRulesetParams = {
          rulesetId,
          description,
          kind,
          name,
          phase,
          rules,
        };

        const updateZoneRulesetResult = rulesetsService.updateZoneRuleset(updateZoneRulesetParams);

        // all methods should return a Promise
        expectToBePromise(updateZoneRulesetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.phase).toEqual(phase);
        expect(mockRequestOptions.body.rules).toEqual(rules);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateZoneRulesetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __updateZoneRulesetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __updateZoneRulesetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateZoneRulesetParams = {
          rulesetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.updateZoneRuleset(updateZoneRulesetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.updateZoneRuleset({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.updateZoneRuleset();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteZoneRuleset', () => {
    describe('positive tests', () => {
      function __deleteZoneRulesetTest() {
        // Construct the params object for operation deleteZoneRuleset
        const rulesetId = 'testString';
        const deleteZoneRulesetParams = {
          rulesetId,
        };

        const deleteZoneRulesetResult = rulesetsService.deleteZoneRuleset(deleteZoneRulesetParams);

        // all methods should return a Promise
        expectToBePromise(deleteZoneRulesetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteZoneRulesetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __deleteZoneRulesetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __deleteZoneRulesetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteZoneRulesetParams = {
          rulesetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.deleteZoneRuleset(deleteZoneRulesetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.deleteZoneRuleset({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.deleteZoneRuleset();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getZoneRulesetVersions', () => {
    describe('positive tests', () => {
      function __getZoneRulesetVersionsTest() {
        // Construct the params object for operation getZoneRulesetVersions
        const rulesetId = 'testString';
        const getZoneRulesetVersionsParams = {
          rulesetId,
        };

        const getZoneRulesetVersionsResult = rulesetsService.getZoneRulesetVersions(getZoneRulesetVersionsParams);

        // all methods should return a Promise
        expectToBePromise(getZoneRulesetVersionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}/versions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getZoneRulesetVersionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getZoneRulesetVersionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getZoneRulesetVersionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getZoneRulesetVersionsParams = {
          rulesetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getZoneRulesetVersions(getZoneRulesetVersionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.getZoneRulesetVersions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.getZoneRulesetVersions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getZoneRulesetVersion', () => {
    describe('positive tests', () => {
      function __getZoneRulesetVersionTest() {
        // Construct the params object for operation getZoneRulesetVersion
        const rulesetId = 'testString';
        const rulesetVersion = '1';
        const getZoneRulesetVersionParams = {
          rulesetId,
          rulesetVersion,
        };

        const getZoneRulesetVersionResult = rulesetsService.getZoneRulesetVersion(getZoneRulesetVersionParams);

        // all methods should return a Promise
        expectToBePromise(getZoneRulesetVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}/versions/{ruleset_version}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
        expect(mockRequestOptions.path.ruleset_version).toEqual(rulesetVersion);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getZoneRulesetVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getZoneRulesetVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getZoneRulesetVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const rulesetVersion = '1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getZoneRulesetVersionParams = {
          rulesetId,
          rulesetVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getZoneRulesetVersion(getZoneRulesetVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.getZoneRulesetVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.getZoneRulesetVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteZoneRulesetVersion', () => {
    describe('positive tests', () => {
      function __deleteZoneRulesetVersionTest() {
        // Construct the params object for operation deleteZoneRulesetVersion
        const rulesetId = 'testString';
        const rulesetVersion = '1';
        const deleteZoneRulesetVersionParams = {
          rulesetId,
          rulesetVersion,
        };

        const deleteZoneRulesetVersionResult = rulesetsService.deleteZoneRulesetVersion(deleteZoneRulesetVersionParams);

        // all methods should return a Promise
        expectToBePromise(deleteZoneRulesetVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}/versions/{ruleset_version}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
        expect(mockRequestOptions.path.ruleset_version).toEqual(rulesetVersion);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteZoneRulesetVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __deleteZoneRulesetVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __deleteZoneRulesetVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const rulesetVersion = '1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteZoneRulesetVersionParams = {
          rulesetId,
          rulesetVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.deleteZoneRulesetVersion(deleteZoneRulesetVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.deleteZoneRulesetVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.deleteZoneRulesetVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getZoneEntrypointRuleset', () => {
    describe('positive tests', () => {
      function __getZoneEntrypointRulesetTest() {
        // Construct the params object for operation getZoneEntrypointRuleset
        const rulesetPhase = 'ddos_l4';
        const getZoneEntrypointRulesetParams = {
          rulesetPhase,
        };

        const getZoneEntrypointRulesetResult = rulesetsService.getZoneEntrypointRuleset(getZoneEntrypointRulesetParams);

        // all methods should return a Promise
        expectToBePromise(getZoneEntrypointRulesetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/rulesets/phases/{ruleset_phase}/entrypoint', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.ruleset_phase).toEqual(rulesetPhase);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getZoneEntrypointRulesetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getZoneEntrypointRulesetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getZoneEntrypointRulesetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetPhase = 'ddos_l4';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getZoneEntrypointRulesetParams = {
          rulesetPhase,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getZoneEntrypointRuleset(getZoneEntrypointRulesetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.getZoneEntrypointRuleset({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.getZoneEntrypointRuleset();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateZoneEntrypointRuleset', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RulesOverride
      const rulesOverrideModel = {
        id: 'testString',
        enabled: true,
        action: 'testString',
        sensitivity_level: 'high',
        score_threshold: 60,
      };

      // CategoriesOverride
      const categoriesOverrideModel = {
        category: 'testString',
        enabled: true,
        action: 'testString',
      };

      // Overrides
      const overridesModel = {
        action: 'testString',
        enabled: true,
        sensitivity_level: 'high',
        rules: [rulesOverrideModel],
        categories: [categoriesOverrideModel],
      };

      // ActionParametersResponse
      const actionParametersResponseModel = {
        content: '{"success": false, "error": "you have been blocked"}',
        content_type: 'application/json',
        status_code: 400,
      };

      // ActionParameters
      const actionParametersModel = {
        id: 'testString',
        overrides: overridesModel,
        version: 'testString',
        ruleset: 'testString',
        rulesets: ['testString'],
        phases: ['testString'],
        products: ['testString'],
        response: actionParametersResponseModel,
      };

      // Ratelimit
      const ratelimitModel = {
        characteristics: ['testString'],
        counting_expression: 'testString',
        mitigation_timeout: 38,
        period: 38,
        requests_per_period: 38,
      };

      // Logging
      const loggingModel = {
        enabled: true,
      };

      // Position
      const positionModel = {
        before: 'testString',
        after: 'testString',
        index: 0,
      };

      // RuleCreate
      const ruleCreateModel = {
        action: 'testString',
        action_parameters: actionParametersModel,
        ratelimit: ratelimitModel,
        description: 'testString',
        enabled: true,
        expression: 'ip.src ne 1.1.1.1',
        id: 'testString',
        logging: loggingModel,
        ref: 'my_ref',
        position: positionModel,
      };

      function __updateZoneEntrypointRulesetTest() {
        // Construct the params object for operation updateZoneEntrypointRuleset
        const rulesetPhase = 'ddos_l4';
        const description = 'Custom instance ruleset';
        const kind = 'managed';
        const name = 'testString';
        const phase = 'ddos_l4';
        const rules = [ruleCreateModel];
        const updateZoneEntrypointRulesetParams = {
          rulesetPhase,
          description,
          kind,
          name,
          phase,
          rules,
        };

        const updateZoneEntrypointRulesetResult = rulesetsService.updateZoneEntrypointRuleset(updateZoneEntrypointRulesetParams);

        // all methods should return a Promise
        expectToBePromise(updateZoneEntrypointRulesetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/rulesets/phases/{ruleset_phase}/entrypoint', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.phase).toEqual(phase);
        expect(mockRequestOptions.body.rules).toEqual(rules);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.ruleset_phase).toEqual(rulesetPhase);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateZoneEntrypointRulesetTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __updateZoneEntrypointRulesetTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __updateZoneEntrypointRulesetTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetPhase = 'ddos_l4';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateZoneEntrypointRulesetParams = {
          rulesetPhase,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.updateZoneEntrypointRuleset(updateZoneEntrypointRulesetParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.updateZoneEntrypointRuleset({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.updateZoneEntrypointRuleset();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getZoneEntryPointRulesetVersions', () => {
    describe('positive tests', () => {
      function __getZoneEntryPointRulesetVersionsTest() {
        // Construct the params object for operation getZoneEntryPointRulesetVersions
        const rulesetPhase = 'ddos_l4';
        const getZoneEntryPointRulesetVersionsParams = {
          rulesetPhase,
        };

        const getZoneEntryPointRulesetVersionsResult = rulesetsService.getZoneEntryPointRulesetVersions(getZoneEntryPointRulesetVersionsParams);

        // all methods should return a Promise
        expectToBePromise(getZoneEntryPointRulesetVersionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/rulesets/phases/{ruleset_phase}/entrypoint/versions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.ruleset_phase).toEqual(rulesetPhase);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getZoneEntryPointRulesetVersionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getZoneEntryPointRulesetVersionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getZoneEntryPointRulesetVersionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetPhase = 'ddos_l4';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getZoneEntryPointRulesetVersionsParams = {
          rulesetPhase,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getZoneEntryPointRulesetVersions(getZoneEntryPointRulesetVersionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.getZoneEntryPointRulesetVersions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.getZoneEntryPointRulesetVersions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getZoneEntryPointRulesetVersion', () => {
    describe('positive tests', () => {
      function __getZoneEntryPointRulesetVersionTest() {
        // Construct the params object for operation getZoneEntryPointRulesetVersion
        const rulesetPhase = 'ddos_l4';
        const rulesetVersion = '1';
        const getZoneEntryPointRulesetVersionParams = {
          rulesetPhase,
          rulesetVersion,
        };

        const getZoneEntryPointRulesetVersionResult = rulesetsService.getZoneEntryPointRulesetVersion(getZoneEntryPointRulesetVersionParams);

        // all methods should return a Promise
        expectToBePromise(getZoneEntryPointRulesetVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/rulesets/phases/{ruleset_phase}/entrypoint/versions/{ruleset_version}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.ruleset_phase).toEqual(rulesetPhase);
        expect(mockRequestOptions.path.ruleset_version).toEqual(rulesetVersion);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getZoneEntryPointRulesetVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __getZoneEntryPointRulesetVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __getZoneEntryPointRulesetVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetPhase = 'ddos_l4';
        const rulesetVersion = '1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getZoneEntryPointRulesetVersionParams = {
          rulesetPhase,
          rulesetVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.getZoneEntryPointRulesetVersion(getZoneEntryPointRulesetVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.getZoneEntryPointRulesetVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.getZoneEntryPointRulesetVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createZoneRulesetRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RulesOverride
      const rulesOverrideModel = {
        id: 'testString',
        enabled: true,
        action: 'testString',
        sensitivity_level: 'high',
        score_threshold: 60,
      };

      // CategoriesOverride
      const categoriesOverrideModel = {
        category: 'testString',
        enabled: true,
        action: 'testString',
      };

      // Overrides
      const overridesModel = {
        action: 'testString',
        enabled: true,
        sensitivity_level: 'high',
        rules: [rulesOverrideModel],
        categories: [categoriesOverrideModel],
      };

      // ActionParametersResponse
      const actionParametersResponseModel = {
        content: '{"success": false, "error": "you have been blocked"}',
        content_type: 'application/json',
        status_code: 400,
      };

      // ActionParameters
      const actionParametersModel = {
        id: 'testString',
        overrides: overridesModel,
        version: 'testString',
        ruleset: 'testString',
        rulesets: ['testString'],
        phases: ['testString'],
        products: ['testString'],
        response: actionParametersResponseModel,
      };

      // Ratelimit
      const ratelimitModel = {
        characteristics: ['testString'],
        counting_expression: 'testString',
        mitigation_timeout: 38,
        period: 38,
        requests_per_period: 38,
      };

      // Logging
      const loggingModel = {
        enabled: true,
      };

      // Position
      const positionModel = {
        before: 'testString',
        after: 'testString',
        index: 0,
      };

      function __createZoneRulesetRuleTest() {
        // Construct the params object for operation createZoneRulesetRule
        const rulesetId = 'testString';
        const action = 'testString';
        const expression = 'ip.src ne 1.1.1.1';
        const actionParameters = actionParametersModel;
        const ratelimit = ratelimitModel;
        const description = 'testString';
        const enabled = true;
        const id = 'testString';
        const logging = loggingModel;
        const ref = 'my_ref';
        const position = positionModel;
        const createZoneRulesetRuleParams = {
          rulesetId,
          action,
          expression,
          actionParameters,
          ratelimit,
          description,
          enabled,
          id,
          logging,
          ref,
          position,
        };

        const createZoneRulesetRuleResult = rulesetsService.createZoneRulesetRule(createZoneRulesetRuleParams);

        // all methods should return a Promise
        expectToBePromise(createZoneRulesetRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}/rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.expression).toEqual(expression);
        expect(mockRequestOptions.body.action_parameters).toEqual(actionParameters);
        expect(mockRequestOptions.body.ratelimit).toEqual(ratelimit);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.logging).toEqual(logging);
        expect(mockRequestOptions.body.ref).toEqual(ref);
        expect(mockRequestOptions.body.position).toEqual(position);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createZoneRulesetRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __createZoneRulesetRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __createZoneRulesetRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createZoneRulesetRuleParams = {
          rulesetId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.createZoneRulesetRule(createZoneRulesetRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.createZoneRulesetRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.createZoneRulesetRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateZoneRulesetRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RulesOverride
      const rulesOverrideModel = {
        id: 'testString',
        enabled: true,
        action: 'testString',
        sensitivity_level: 'high',
        score_threshold: 60,
      };

      // CategoriesOverride
      const categoriesOverrideModel = {
        category: 'testString',
        enabled: true,
        action: 'testString',
      };

      // Overrides
      const overridesModel = {
        action: 'testString',
        enabled: true,
        sensitivity_level: 'high',
        rules: [rulesOverrideModel],
        categories: [categoriesOverrideModel],
      };

      // ActionParametersResponse
      const actionParametersResponseModel = {
        content: '{"success": false, "error": "you have been blocked"}',
        content_type: 'application/json',
        status_code: 400,
      };

      // ActionParameters
      const actionParametersModel = {
        id: 'testString',
        overrides: overridesModel,
        version: 'testString',
        ruleset: 'testString',
        rulesets: ['testString'],
        phases: ['testString'],
        products: ['testString'],
        response: actionParametersResponseModel,
      };

      // Ratelimit
      const ratelimitModel = {
        characteristics: ['testString'],
        counting_expression: 'testString',
        mitigation_timeout: 38,
        period: 38,
        requests_per_period: 38,
      };

      // Logging
      const loggingModel = {
        enabled: true,
      };

      // Position
      const positionModel = {
        before: 'testString',
        after: 'testString',
        index: 0,
      };

      function __updateZoneRulesetRuleTest() {
        // Construct the params object for operation updateZoneRulesetRule
        const rulesetId = 'testString';
        const ruleId = 'testString';
        const action = 'testString';
        const actionParameters = actionParametersModel;
        const ratelimit = ratelimitModel;
        const description = 'testString';
        const enabled = true;
        const expression = 'ip.src ne 1.1.1.1';
        const id = 'testString';
        const logging = loggingModel;
        const ref = 'my_ref';
        const position = positionModel;
        const updateZoneRulesetRuleParams = {
          rulesetId,
          ruleId,
          action,
          actionParameters,
          ratelimit,
          description,
          enabled,
          expression,
          id,
          logging,
          ref,
          position,
        };

        const updateZoneRulesetRuleResult = rulesetsService.updateZoneRulesetRule(updateZoneRulesetRuleParams);

        // all methods should return a Promise
        expectToBePromise(updateZoneRulesetRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}/rules/{rule_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.action).toEqual(action);
        expect(mockRequestOptions.body.action_parameters).toEqual(actionParameters);
        expect(mockRequestOptions.body.ratelimit).toEqual(ratelimit);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.expression).toEqual(expression);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.logging).toEqual(logging);
        expect(mockRequestOptions.body.ref).toEqual(ref);
        expect(mockRequestOptions.body.position).toEqual(position);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateZoneRulesetRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __updateZoneRulesetRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __updateZoneRulesetRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateZoneRulesetRuleParams = {
          rulesetId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.updateZoneRulesetRule(updateZoneRulesetRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.updateZoneRulesetRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.updateZoneRulesetRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteZoneRulesetRule', () => {
    describe('positive tests', () => {
      function __deleteZoneRulesetRuleTest() {
        // Construct the params object for operation deleteZoneRulesetRule
        const rulesetId = 'testString';
        const ruleId = 'testString';
        const deleteZoneRulesetRuleParams = {
          rulesetId,
          ruleId,
        };

        const deleteZoneRulesetRuleResult = rulesetsService.deleteZoneRulesetRule(deleteZoneRulesetRuleParams);

        // all methods should return a Promise
        expectToBePromise(deleteZoneRulesetRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}/rules/{rule_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.crn).toEqual(rulesetsServiceOptions.crn);
        expect(mockRequestOptions.path.zone_identifier).toEqual(rulesetsServiceOptions.zoneIdentifier);
        expect(mockRequestOptions.path.ruleset_id).toEqual(rulesetId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteZoneRulesetRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        rulesetsService.enableRetries();
        __deleteZoneRulesetRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        rulesetsService.disableRetries();
        __deleteZoneRulesetRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const rulesetId = 'testString';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteZoneRulesetRuleParams = {
          rulesetId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        rulesetsService.deleteZoneRulesetRule(deleteZoneRulesetRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await rulesetsService.deleteZoneRulesetRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await rulesetsService.deleteZoneRulesetRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
