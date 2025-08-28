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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.106.0-09823488-20250707-071701
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  AbortSignal,
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../../lib/common';

/**
 * Rulesets Engine
 *
 * API Version: 1.0.1
 */

class RulesetsV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'rulesets';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of RulesetsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {RulesetsV1}
   */

  public static newInstance(options: UserOptions): RulesetsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new RulesetsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /** Full url-encoded CRN of the service instance. */
  crn: string;

  /** zone identifier. */
  zoneIdentifier: string;

  /**
   * Construct a RulesetsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded CRN of the service instance.
   * @param {string} options.zoneIdentifier - zone identifier.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {RulesetsV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const _requiredParams = ['crn','zoneIdentifier'];
    const _validationErrors = validateParams(options, _requiredParams, null);
    if (_validationErrors) {
      throw _validationErrors;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(RulesetsV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * instanceRulesets
   ************************/

  /**
   * List Instance rulesets.
   *
   * List all rulesets at the instance level.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.ListRulesetsResp>>}
   */
  public getInstanceRulesets(
    params?: RulesetsV1.GetInstanceRulesetsParams
  ): Promise<RulesetsV1.Response<RulesetsV1.ListRulesetsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceRulesets');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get an instance ruleset.
   *
   * View a specific instance ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public getInstanceRuleset(
    params: RulesetsV1.GetInstanceRulesetParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId'];
    const _validParams = ['rulesetId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'ruleset_id': _params.rulesetId,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceRuleset');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets/{ruleset_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update an instance ruleset.
   *
   * Update a specific instance ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {string} [params.description] - description of the ruleset.
   * @param {string} [params.kind] -
   * @param {string} [params.name] - human readable name of the ruleset.
   * @param {string} [params.phase] - The phase of the ruleset.
   * @param {RuleCreate[]} [params.rules] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public updateInstanceRuleset(
    params: RulesetsV1.UpdateInstanceRulesetParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId'];
    const _validParams = ['rulesetId', 'description', 'kind', 'name', 'phase', 'rules', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'kind': _params.kind,
      'name': _params.name,
      'phase': _params.phase,
      'rules': _params.rules,
    };

    const path = {
      'crn': this.crn,
      'ruleset_id': _params.rulesetId,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateInstanceRuleset');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets/{ruleset_id}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete an instance ruleset.
   *
   * Delete a specific instance ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.EmptyObject>>}
   */
  public deleteInstanceRuleset(
    params: RulesetsV1.DeleteInstanceRulesetParams
  ): Promise<RulesetsV1.Response<RulesetsV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId'];
    const _validParams = ['rulesetId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'ruleset_id': _params.rulesetId,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteInstanceRuleset');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets/{ruleset_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List version of an instance ruleset.
   *
   * List all versions of a specific instance ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.ListRulesetsResp>>}
   */
  public getInstanceRulesetVersions(
    params: RulesetsV1.GetInstanceRulesetVersionsParams
  ): Promise<RulesetsV1.Response<RulesetsV1.ListRulesetsResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId'];
    const _validParams = ['rulesetId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'ruleset_id': _params.rulesetId,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceRulesetVersions');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets/{ruleset_id}/versions',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a specific version of an instance ruleset.
   *
   * View a specific version of a specific instance ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {string} params.rulesetVersion - The version of the ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public getInstanceRulesetVersion(
    params: RulesetsV1.GetInstanceRulesetVersionParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId', 'rulesetVersion'];
    const _validParams = ['rulesetId', 'rulesetVersion', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'ruleset_id': _params.rulesetId,
      'ruleset_version': _params.rulesetVersion,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceRulesetVersion');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets/{ruleset_id}/versions/{ruleset_version}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a specific version of an instance ruleset.
   *
   * Delete a specific version of a specific instance ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {string} params.rulesetVersion - The version of the ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.EmptyObject>>}
   */
  public deleteInstanceRulesetVersion(
    params: RulesetsV1.DeleteInstanceRulesetVersionParams
  ): Promise<RulesetsV1.Response<RulesetsV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId', 'rulesetVersion'];
    const _validParams = ['rulesetId', 'rulesetVersion', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'ruleset_id': _params.rulesetId,
      'ruleset_version': _params.rulesetVersion,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteInstanceRulesetVersion');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets/{ruleset_id}/versions/{ruleset_version}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get an instance entrypoint ruleset.
   *
   * Get the instance ruleset for the given phase's entrypoint.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetPhase - The phase of the ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public getInstanceEntrypointRuleset(
    params: RulesetsV1.GetInstanceEntrypointRulesetParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetPhase'];
    const _validParams = ['rulesetPhase', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'ruleset_phase': _params.rulesetPhase,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceEntrypointRuleset');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets/phases/{ruleset_phase}/entrypoint',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update an instance entrypoint ruleset.
   *
   * Updates the instance ruleset for the given phase's entry point.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetPhase - The phase of the ruleset.
   * @param {string} [params.description] - description of the ruleset.
   * @param {string} [params.kind] -
   * @param {string} [params.name] - human readable name of the ruleset.
   * @param {string} [params.phase] - The phase of the ruleset.
   * @param {RuleCreate[]} [params.rules] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public updateInstanceEntrypointRuleset(
    params: RulesetsV1.UpdateInstanceEntrypointRulesetParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetPhase'];
    const _validParams = ['rulesetPhase', 'description', 'kind', 'name', 'phase', 'rules', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'kind': _params.kind,
      'name': _params.name,
      'phase': _params.phase,
      'rules': _params.rules,
    };

    const path = {
      'crn': this.crn,
      'ruleset_phase': _params.rulesetPhase,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateInstanceEntrypointRuleset');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets/phases/{ruleset_phase}/entrypoint',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List an instance entry point ruleset's versions.
   *
   * Lists the instance ruleset versions for the given phase's entry point.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetPhase - The phase of the ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.ListRulesetsResp>>}
   */
  public getInstanceEntryPointRulesetVersions(
    params: RulesetsV1.GetInstanceEntryPointRulesetVersionsParams
  ): Promise<RulesetsV1.Response<RulesetsV1.ListRulesetsResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetPhase'];
    const _validParams = ['rulesetPhase', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'ruleset_phase': _params.rulesetPhase,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceEntryPointRulesetVersions');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets/phases/{ruleset_phase}/entrypoint/versions',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get an instance entry point ruleset version.
   *
   * Fetches a specific version of an instance entry point ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetPhase - The phase of the ruleset.
   * @param {string} params.rulesetVersion - The version of the ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public getInstanceEntryPointRulesetVersion(
    params: RulesetsV1.GetInstanceEntryPointRulesetVersionParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetPhase', 'rulesetVersion'];
    const _validParams = ['rulesetPhase', 'rulesetVersion', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'ruleset_phase': _params.rulesetPhase,
      'ruleset_version': _params.rulesetVersion,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceEntryPointRulesetVersion');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets/phases/{ruleset_phase}/entrypoint/versions/{ruleset_version}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create an instance ruleset rule.
   *
   * Create an instance ruleset rule.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {string} [params.action] - What happens when theres a match for the rule expression.
   * @param {string} [params.expression] - The expression defining which traffic will match the rule.
   * @param {ActionParameters} [params.actionParameters] -
   * @param {Ratelimit} [params.ratelimit] -
   * @param {string} [params.description] -
   * @param {boolean} [params.enabled] -
   * @param {string} [params.id] -
   * @param {Logging} [params.logging] -
   * @param {string} [params.ref] - The reference of the rule (the rule ID by default).
   * @param {Position} [params.position] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public createInstanceRulesetRule(
    params: RulesetsV1.CreateInstanceRulesetRuleParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId'];
    const _validParams = ['rulesetId', 'action', 'expression', 'actionParameters', 'ratelimit', 'description', 'enabled', 'id', 'logging', 'ref', 'position', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'action': _params.action,
      'expression': _params.expression,
      'action_parameters': _params.actionParameters,
      'ratelimit': _params.ratelimit,
      'description': _params.description,
      'enabled': _params.enabled,
      'id': _params.id,
      'logging': _params.logging,
      'ref': _params.ref,
      'position': _params.position,
    };

    const path = {
      'crn': this.crn,
      'ruleset_id': _params.rulesetId,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'createInstanceRulesetRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets/{ruleset_id}/rules',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update an instance ruleset rule.
   *
   * Update an instance ruleset rule.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {string} params.ruleId - ID of a specific rule.
   * @param {string} [params.action] - What happens when theres a match for the rule expression.
   * @param {ActionParameters} [params.actionParameters] -
   * @param {Ratelimit} [params.ratelimit] -
   * @param {string} [params.description] -
   * @param {boolean} [params.enabled] -
   * @param {string} [params.expression] - The expression defining which traffic will match the rule.
   * @param {string} [params.id] -
   * @param {Logging} [params.logging] -
   * @param {string} [params.ref] - The reference of the rule (the rule ID by default).
   * @param {Position} [params.position] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public updateInstanceRulesetRule(
    params: RulesetsV1.UpdateInstanceRulesetRuleParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId', 'ruleId'];
    const _validParams = ['rulesetId', 'ruleId', 'action', 'actionParameters', 'ratelimit', 'description', 'enabled', 'expression', 'id', 'logging', 'ref', 'position', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'action': _params.action,
      'action_parameters': _params.actionParameters,
      'ratelimit': _params.ratelimit,
      'description': _params.description,
      'enabled': _params.enabled,
      'expression': _params.expression,
      'id': _params.id,
      'logging': _params.logging,
      'ref': _params.ref,
      'position': _params.position,
    };

    const path = {
      'crn': this.crn,
      'ruleset_id': _params.rulesetId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateInstanceRulesetRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets/{ruleset_id}/rules/{rule_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete an instance ruleset rule.
   *
   * Delete an instance ruleset rule.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {string} params.ruleId - ID of a specific rule.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RuleResp>>}
   */
  public deleteInstanceRulesetRule(
    params: RulesetsV1.DeleteInstanceRulesetRuleParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RuleResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId', 'ruleId'];
    const _validParams = ['rulesetId', 'ruleId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'ruleset_id': _params.rulesetId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteInstanceRulesetRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets/{ruleset_id}/rules/{rule_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List an instance ruleset verion's rules by tag.
   *
   * Lists rules by tag for a specific version of an instance ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {string} params.rulesetVersion - The version of the ruleset.
   * @param {string} params.ruleTag - A category of the rule.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public getInstanceRulesetVersionByTag(
    params: RulesetsV1.GetInstanceRulesetVersionByTagParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId', 'rulesetVersion', 'ruleTag'];
    const _validParams = ['rulesetId', 'rulesetVersion', 'ruleTag', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'ruleset_id': _params.rulesetId,
      'ruleset_version': _params.rulesetVersion,
      'rule_tag': _params.ruleTag,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceRulesetVersionByTag');

    const parameters = {
      options: {
        url: '/v1/{crn}/rulesets/{ruleset_id}/versions/{ruleset_version}/by_tag/{rule_tag}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * zoneRulesets
   ************************/

  /**
   * List zone rulesets.
   *
   * List all rulesets at the zone level.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.ListRulesetsResp>>}
   */
  public getZoneRulesets(
    params?: RulesetsV1.GetZoneRulesetsParams
  ): Promise<RulesetsV1.Response<RulesetsV1.ListRulesetsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getZoneRulesets');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rulesets',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a zone ruleset.
   *
   * View a specific zone ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public getZoneRuleset(
    params: RulesetsV1.GetZoneRulesetParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId'];
    const _validParams = ['rulesetId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'ruleset_id': _params.rulesetId,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getZoneRuleset');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a zone ruleset.
   *
   * Update a specific zone ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {string} [params.description] - description of the ruleset.
   * @param {string} [params.kind] -
   * @param {string} [params.name] - human readable name of the ruleset.
   * @param {string} [params.phase] - The phase of the ruleset.
   * @param {RuleCreate[]} [params.rules] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public updateZoneRuleset(
    params: RulesetsV1.UpdateZoneRulesetParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId'];
    const _validParams = ['rulesetId', 'description', 'kind', 'name', 'phase', 'rules', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'kind': _params.kind,
      'name': _params.name,
      'phase': _params.phase,
      'rules': _params.rules,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'ruleset_id': _params.rulesetId,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateZoneRuleset');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a zone ruleset.
   *
   * Delete a specific zone ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.EmptyObject>>}
   */
  public deleteZoneRuleset(
    params: RulesetsV1.DeleteZoneRulesetParams
  ): Promise<RulesetsV1.Response<RulesetsV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId'];
    const _validParams = ['rulesetId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'ruleset_id': _params.rulesetId,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteZoneRuleset');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List version of a zone ruleset.
   *
   * List all versions of a specific zone ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.ListRulesetsResp>>}
   */
  public getZoneRulesetVersions(
    params: RulesetsV1.GetZoneRulesetVersionsParams
  ): Promise<RulesetsV1.Response<RulesetsV1.ListRulesetsResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId'];
    const _validParams = ['rulesetId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'ruleset_id': _params.rulesetId,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getZoneRulesetVersions');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}/versions',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a specific version of a zone ruleset.
   *
   * View a specific version of a specific zone ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {string} params.rulesetVersion - The version of the ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public getZoneRulesetVersion(
    params: RulesetsV1.GetZoneRulesetVersionParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId', 'rulesetVersion'];
    const _validParams = ['rulesetId', 'rulesetVersion', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'ruleset_id': _params.rulesetId,
      'ruleset_version': _params.rulesetVersion,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getZoneRulesetVersion');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}/versions/{ruleset_version}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a specific version of a zone ruleset.
   *
   * Delete a specific version of a specific zone ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {string} params.rulesetVersion - The version of the ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.EmptyObject>>}
   */
  public deleteZoneRulesetVersion(
    params: RulesetsV1.DeleteZoneRulesetVersionParams
  ): Promise<RulesetsV1.Response<RulesetsV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId', 'rulesetVersion'];
    const _validParams = ['rulesetId', 'rulesetVersion', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'ruleset_id': _params.rulesetId,
      'ruleset_version': _params.rulesetVersion,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteZoneRulesetVersion');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}/versions/{ruleset_version}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a zone entrypoint ruleset.
   *
   * Get the zone ruleset for the given phase's entrypoint.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetPhase - The phase of the ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public getZoneEntrypointRuleset(
    params: RulesetsV1.GetZoneEntrypointRulesetParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetPhase'];
    const _validParams = ['rulesetPhase', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'ruleset_phase': _params.rulesetPhase,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getZoneEntrypointRuleset');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rulesets/phases/{ruleset_phase}/entrypoint',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a zone entrypoint ruleset.
   *
   * Updates the instance ruleset for the given phase's entry point.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetPhase - The phase of the ruleset.
   * @param {string} [params.description] - description of the ruleset.
   * @param {string} [params.kind] -
   * @param {string} [params.name] - human readable name of the ruleset.
   * @param {string} [params.phase] - The phase of the ruleset.
   * @param {RuleCreate[]} [params.rules] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public updateZoneEntrypointRuleset(
    params: RulesetsV1.UpdateZoneEntrypointRulesetParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetPhase'];
    const _validParams = ['rulesetPhase', 'description', 'kind', 'name', 'phase', 'rules', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'kind': _params.kind,
      'name': _params.name,
      'phase': _params.phase,
      'rules': _params.rules,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'ruleset_phase': _params.rulesetPhase,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateZoneEntrypointRuleset');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rulesets/phases/{ruleset_phase}/entrypoint',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List a zone entry point ruleset's versions.
   *
   * Lists the zone ruleset versions for the given phase's entry point.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetPhase - The phase of the ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.ListRulesetsResp>>}
   */
  public getZoneEntryPointRulesetVersions(
    params: RulesetsV1.GetZoneEntryPointRulesetVersionsParams
  ): Promise<RulesetsV1.Response<RulesetsV1.ListRulesetsResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetPhase'];
    const _validParams = ['rulesetPhase', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'ruleset_phase': _params.rulesetPhase,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getZoneEntryPointRulesetVersions');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rulesets/phases/{ruleset_phase}/entrypoint/versions',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a zone entry point ruleset version.
   *
   * Fetches a specific version of a zone entry point ruleset.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetPhase - The phase of the ruleset.
   * @param {string} params.rulesetVersion - The version of the ruleset.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public getZoneEntryPointRulesetVersion(
    params: RulesetsV1.GetZoneEntryPointRulesetVersionParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetPhase', 'rulesetVersion'];
    const _validParams = ['rulesetPhase', 'rulesetVersion', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'ruleset_phase': _params.rulesetPhase,
      'ruleset_version': _params.rulesetVersion,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'getZoneEntryPointRulesetVersion');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rulesets/phases/{ruleset_phase}/entrypoint/versions/{ruleset_version}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a zone ruleset rule.
   *
   * Create a zone ruleset rule.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {string} [params.action] - What happens when theres a match for the rule expression.
   * @param {string} [params.expression] - The expression defining which traffic will match the rule.
   * @param {ActionParameters} [params.actionParameters] -
   * @param {Ratelimit} [params.ratelimit] -
   * @param {string} [params.description] -
   * @param {boolean} [params.enabled] -
   * @param {string} [params.id] -
   * @param {Logging} [params.logging] -
   * @param {string} [params.ref] - The reference of the rule (the rule ID by default).
   * @param {Position} [params.position] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public createZoneRulesetRule(
    params: RulesetsV1.CreateZoneRulesetRuleParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId'];
    const _validParams = ['rulesetId', 'action', 'expression', 'actionParameters', 'ratelimit', 'description', 'enabled', 'id', 'logging', 'ref', 'position', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'action': _params.action,
      'expression': _params.expression,
      'action_parameters': _params.actionParameters,
      'ratelimit': _params.ratelimit,
      'description': _params.description,
      'enabled': _params.enabled,
      'id': _params.id,
      'logging': _params.logging,
      'ref': _params.ref,
      'position': _params.position,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'ruleset_id': _params.rulesetId,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'createZoneRulesetRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}/rules',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a zone ruleset rule.
   *
   * Update a zone ruleset rule.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {string} params.ruleId - ID of a specific rule.
   * @param {string} [params.action] - What happens when theres a match for the rule expression.
   * @param {ActionParameters} [params.actionParameters] -
   * @param {Ratelimit} [params.ratelimit] -
   * @param {string} [params.description] -
   * @param {boolean} [params.enabled] -
   * @param {string} [params.expression] - The expression defining which traffic will match the rule.
   * @param {string} [params.id] -
   * @param {Logging} [params.logging] -
   * @param {string} [params.ref] - The reference of the rule (the rule ID by default).
   * @param {Position} [params.position] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>>}
   */
  public updateZoneRulesetRule(
    params: RulesetsV1.UpdateZoneRulesetRuleParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RulesetResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId', 'ruleId'];
    const _validParams = ['rulesetId', 'ruleId', 'action', 'actionParameters', 'ratelimit', 'description', 'enabled', 'expression', 'id', 'logging', 'ref', 'position', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'action': _params.action,
      'action_parameters': _params.actionParameters,
      'ratelimit': _params.ratelimit,
      'description': _params.description,
      'enabled': _params.enabled,
      'expression': _params.expression,
      'id': _params.id,
      'logging': _params.logging,
      'ref': _params.ref,
      'position': _params.position,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'ruleset_id': _params.rulesetId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateZoneRulesetRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}/rules/{rule_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a zone ruleset rule.
   *
   * Delete an instance ruleset rule.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rulesetId - ID of a specific ruleset.
   * @param {string} params.ruleId - ID of a specific rule.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RulesetsV1.Response<RulesetsV1.RuleResp>>}
   */
  public deleteZoneRulesetRule(
    params: RulesetsV1.DeleteZoneRulesetRuleParams
  ): Promise<RulesetsV1.Response<RulesetsV1.RuleResp>> {
    const _params = { ...params };
    const _requiredParams = ['rulesetId', 'ruleId'];
    const _validParams = ['rulesetId', 'ruleId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'ruleset_id': _params.rulesetId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(RulesetsV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteZoneRulesetRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rulesets/{ruleset_id}/rules/{rule_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace RulesetsV1 {
  /** Options for the `RulesetsV1` constructor. */
  export interface Options extends UserOptions {
    /** Full url-encoded CRN of the service instance. */
    crn: string;
    /** zone identifier. */
    zoneIdentifier: string;
  }

  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

   interface DefaultParams {
     headers?: OutgoingHttpHeaders;
     signal?: AbortSignal;
   }

  /** Parameters for the `getInstanceRulesets` operation. */
  export interface GetInstanceRulesetsParams extends DefaultParams {
  }

  /** Parameters for the `getInstanceRuleset` operation. */
  export interface GetInstanceRulesetParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
  }

  /** Parameters for the `updateInstanceRuleset` operation. */
  export interface UpdateInstanceRulesetParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
    /** description of the ruleset. */
    description?: string;
    kind?: UpdateInstanceRulesetConstants.Kind | string;
    /** human readable name of the ruleset. */
    name?: string;
    /** The phase of the ruleset. */
    phase?: UpdateInstanceRulesetConstants.Phase | string;
    rules?: RuleCreate[];
  }

  /** Constants for the `updateInstanceRuleset` operation. */
  export namespace UpdateInstanceRulesetConstants {
    /** Kind */
    export enum Kind {
      MANAGED = 'managed',
      CUSTOM = 'custom',
      ROOT = 'root',
      ZONE = 'zone',
    }
    /** The phase of the ruleset. */
    export enum Phase {
      DDOS_L4 = 'ddos_l4',
      DDOS_L7 = 'ddos_l7',
      HTTP_CONFIG_SETTINGS = 'http_config_settings',
      HTTP_CUSTOM_ERRORS = 'http_custom_errors',
      HTTP_LOG_CUSTOM_FIELDS = 'http_log_custom_fields',
      HTTP_RATELIMIT = 'http_ratelimit',
      HTTP_REQUEST_CACHE_SETTINGS = 'http_request_cache_settings',
      HTTP_REQUEST_DYNAMIC_REDIRECT = 'http_request_dynamic_redirect',
      HTTP_REQUEST_FIREWALL_CUSTOM = 'http_request_firewall_custom',
      HTTP_REQUEST_FIREWALL_MANAGED = 'http_request_firewall_managed',
      HTTP_REQUEST_LATE_TRANSFORM = 'http_request_late_transform',
      HTTP_REQUEST_ORIGIN = 'http_request_origin',
      HTTP_REQUEST_REDIRECT = 'http_request_redirect',
      HTTP_REQUEST_SANITIZE = 'http_request_sanitize',
      HTTP_REQUEST_SBFM = 'http_request_sbfm',
      HTTP_REQUEST_SELECT_CONFIGURATION = 'http_request_select_configuration',
      HTTP_REQUEST_TRANSFORM = 'http_request_transform',
      HTTP_RESPONSE_COMPRESSION = 'http_response_compression',
      HTTP_RESPONSE_FIREWALL_MANAGED = 'http_response_firewall_managed',
      HTTP_RESPONSE_HEADERS_TRANSFORM = 'http_response_headers_transform',
    }
  }

  /** Parameters for the `deleteInstanceRuleset` operation. */
  export interface DeleteInstanceRulesetParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
  }

  /** Parameters for the `getInstanceRulesetVersions` operation. */
  export interface GetInstanceRulesetVersionsParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
  }

  /** Parameters for the `getInstanceRulesetVersion` operation. */
  export interface GetInstanceRulesetVersionParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
    /** The version of the ruleset. */
    rulesetVersion: string;
  }

  /** Parameters for the `deleteInstanceRulesetVersion` operation. */
  export interface DeleteInstanceRulesetVersionParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
    /** The version of the ruleset. */
    rulesetVersion: string;
  }

  /** Parameters for the `getInstanceEntrypointRuleset` operation. */
  export interface GetInstanceEntrypointRulesetParams extends DefaultParams {
    /** The phase of the ruleset. */
    rulesetPhase: GetInstanceEntrypointRulesetConstants.RulesetPhase | string;
  }

  /** Constants for the `getInstanceEntrypointRuleset` operation. */
  export namespace GetInstanceEntrypointRulesetConstants {
    /** The phase of the ruleset. */
    export enum RulesetPhase {
      DDOS_L4 = 'ddos_l4',
      DDOS_L7 = 'ddos_l7',
      HTTP_CONFIG_SETTINGS = 'http_config_settings',
      HTTP_CUSTOM_ERRORS = 'http_custom_errors',
      HTTP_LOG_CUSTOM_FIELDS = 'http_log_custom_fields',
      HTTP_RATELIMIT = 'http_ratelimit',
      HTTP_REQUEST_CACHE_SETTINGS = 'http_request_cache_settings',
      HTTP_REQUEST_DYNAMIC_REDIRECT = 'http_request_dynamic_redirect',
      HTTP_REQUEST_FIREWALL_CUSTOM = 'http_request_firewall_custom',
      HTTP_REQUEST_FIREWALL_MANAGED = 'http_request_firewall_managed',
      HTTP_REQUEST_LATE_TRANSFORM = 'http_request_late_transform',
      HTTP_REQUEST_ORIGIN = 'http_request_origin',
      HTTP_REQUEST_REDIRECT = 'http_request_redirect',
      HTTP_REQUEST_SANITIZE = 'http_request_sanitize',
      HTTP_REQUEST_SBFM = 'http_request_sbfm',
      HTTP_REQUEST_SELECT_CONFIGURATION = 'http_request_select_configuration',
      HTTP_REQUEST_TRANSFORM = 'http_request_transform',
      HTTP_RESPONSE_COMPRESSION = 'http_response_compression',
      HTTP_RESPONSE_FIREWALL_MANAGED = 'http_response_firewall_managed',
      HTTP_RESPONSE_HEADERS_TRANSFORM = 'http_response_headers_transform',
    }
  }

  /** Parameters for the `updateInstanceEntrypointRuleset` operation. */
  export interface UpdateInstanceEntrypointRulesetParams extends DefaultParams {
    /** The phase of the ruleset. */
    rulesetPhase: UpdateInstanceEntrypointRulesetConstants.RulesetPhase | string;
    /** description of the ruleset. */
    description?: string;
    kind?: UpdateInstanceEntrypointRulesetConstants.Kind | string;
    /** human readable name of the ruleset. */
    name?: string;
    /** The phase of the ruleset. */
    phase?: UpdateInstanceEntrypointRulesetConstants.Phase | string;
    rules?: RuleCreate[];
  }

  /** Constants for the `updateInstanceEntrypointRuleset` operation. */
  export namespace UpdateInstanceEntrypointRulesetConstants {
    /** The phase of the ruleset. */
    export enum RulesetPhase {
      DDOS_L4 = 'ddos_l4',
      DDOS_L7 = 'ddos_l7',
      HTTP_CONFIG_SETTINGS = 'http_config_settings',
      HTTP_CUSTOM_ERRORS = 'http_custom_errors',
      HTTP_LOG_CUSTOM_FIELDS = 'http_log_custom_fields',
      HTTP_RATELIMIT = 'http_ratelimit',
      HTTP_REQUEST_CACHE_SETTINGS = 'http_request_cache_settings',
      HTTP_REQUEST_DYNAMIC_REDIRECT = 'http_request_dynamic_redirect',
      HTTP_REQUEST_FIREWALL_CUSTOM = 'http_request_firewall_custom',
      HTTP_REQUEST_FIREWALL_MANAGED = 'http_request_firewall_managed',
      HTTP_REQUEST_LATE_TRANSFORM = 'http_request_late_transform',
      HTTP_REQUEST_ORIGIN = 'http_request_origin',
      HTTP_REQUEST_REDIRECT = 'http_request_redirect',
      HTTP_REQUEST_SANITIZE = 'http_request_sanitize',
      HTTP_REQUEST_SBFM = 'http_request_sbfm',
      HTTP_REQUEST_SELECT_CONFIGURATION = 'http_request_select_configuration',
      HTTP_REQUEST_TRANSFORM = 'http_request_transform',
      HTTP_RESPONSE_COMPRESSION = 'http_response_compression',
      HTTP_RESPONSE_FIREWALL_MANAGED = 'http_response_firewall_managed',
      HTTP_RESPONSE_HEADERS_TRANSFORM = 'http_response_headers_transform',
    }
    /** Kind */
    export enum Kind {
      MANAGED = 'managed',
      CUSTOM = 'custom',
      ROOT = 'root',
      ZONE = 'zone',
    }
    /** The phase of the ruleset. */
    export enum Phase {
      DDOS_L4 = 'ddos_l4',
      DDOS_L7 = 'ddos_l7',
      HTTP_CONFIG_SETTINGS = 'http_config_settings',
      HTTP_CUSTOM_ERRORS = 'http_custom_errors',
      HTTP_LOG_CUSTOM_FIELDS = 'http_log_custom_fields',
      HTTP_RATELIMIT = 'http_ratelimit',
      HTTP_REQUEST_CACHE_SETTINGS = 'http_request_cache_settings',
      HTTP_REQUEST_DYNAMIC_REDIRECT = 'http_request_dynamic_redirect',
      HTTP_REQUEST_FIREWALL_CUSTOM = 'http_request_firewall_custom',
      HTTP_REQUEST_FIREWALL_MANAGED = 'http_request_firewall_managed',
      HTTP_REQUEST_LATE_TRANSFORM = 'http_request_late_transform',
      HTTP_REQUEST_ORIGIN = 'http_request_origin',
      HTTP_REQUEST_REDIRECT = 'http_request_redirect',
      HTTP_REQUEST_SANITIZE = 'http_request_sanitize',
      HTTP_REQUEST_SBFM = 'http_request_sbfm',
      HTTP_REQUEST_SELECT_CONFIGURATION = 'http_request_select_configuration',
      HTTP_REQUEST_TRANSFORM = 'http_request_transform',
      HTTP_RESPONSE_COMPRESSION = 'http_response_compression',
      HTTP_RESPONSE_FIREWALL_MANAGED = 'http_response_firewall_managed',
      HTTP_RESPONSE_HEADERS_TRANSFORM = 'http_response_headers_transform',
    }
  }

  /** Parameters for the `getInstanceEntryPointRulesetVersions` operation. */
  export interface GetInstanceEntryPointRulesetVersionsParams extends DefaultParams {
    /** The phase of the ruleset. */
    rulesetPhase: GetInstanceEntryPointRulesetVersionsConstants.RulesetPhase | string;
  }

  /** Constants for the `getInstanceEntryPointRulesetVersions` operation. */
  export namespace GetInstanceEntryPointRulesetVersionsConstants {
    /** The phase of the ruleset. */
    export enum RulesetPhase {
      DDOS_L4 = 'ddos_l4',
      DDOS_L7 = 'ddos_l7',
      HTTP_CONFIG_SETTINGS = 'http_config_settings',
      HTTP_CUSTOM_ERRORS = 'http_custom_errors',
      HTTP_LOG_CUSTOM_FIELDS = 'http_log_custom_fields',
      HTTP_RATELIMIT = 'http_ratelimit',
      HTTP_REQUEST_CACHE_SETTINGS = 'http_request_cache_settings',
      HTTP_REQUEST_DYNAMIC_REDIRECT = 'http_request_dynamic_redirect',
      HTTP_REQUEST_FIREWALL_CUSTOM = 'http_request_firewall_custom',
      HTTP_REQUEST_FIREWALL_MANAGED = 'http_request_firewall_managed',
      HTTP_REQUEST_LATE_TRANSFORM = 'http_request_late_transform',
      HTTP_REQUEST_ORIGIN = 'http_request_origin',
      HTTP_REQUEST_REDIRECT = 'http_request_redirect',
      HTTP_REQUEST_SANITIZE = 'http_request_sanitize',
      HTTP_REQUEST_SBFM = 'http_request_sbfm',
      HTTP_REQUEST_SELECT_CONFIGURATION = 'http_request_select_configuration',
      HTTP_REQUEST_TRANSFORM = 'http_request_transform',
      HTTP_RESPONSE_COMPRESSION = 'http_response_compression',
      HTTP_RESPONSE_FIREWALL_MANAGED = 'http_response_firewall_managed',
      HTTP_RESPONSE_HEADERS_TRANSFORM = 'http_response_headers_transform',
    }
  }

  /** Parameters for the `getInstanceEntryPointRulesetVersion` operation. */
  export interface GetInstanceEntryPointRulesetVersionParams extends DefaultParams {
    /** The phase of the ruleset. */
    rulesetPhase: GetInstanceEntryPointRulesetVersionConstants.RulesetPhase | string;
    /** The version of the ruleset. */
    rulesetVersion: string;
  }

  /** Constants for the `getInstanceEntryPointRulesetVersion` operation. */
  export namespace GetInstanceEntryPointRulesetVersionConstants {
    /** The phase of the ruleset. */
    export enum RulesetPhase {
      DDOS_L4 = 'ddos_l4',
      DDOS_L7 = 'ddos_l7',
      HTTP_CONFIG_SETTINGS = 'http_config_settings',
      HTTP_CUSTOM_ERRORS = 'http_custom_errors',
      HTTP_LOG_CUSTOM_FIELDS = 'http_log_custom_fields',
      HTTP_RATELIMIT = 'http_ratelimit',
      HTTP_REQUEST_CACHE_SETTINGS = 'http_request_cache_settings',
      HTTP_REQUEST_DYNAMIC_REDIRECT = 'http_request_dynamic_redirect',
      HTTP_REQUEST_FIREWALL_CUSTOM = 'http_request_firewall_custom',
      HTTP_REQUEST_FIREWALL_MANAGED = 'http_request_firewall_managed',
      HTTP_REQUEST_LATE_TRANSFORM = 'http_request_late_transform',
      HTTP_REQUEST_ORIGIN = 'http_request_origin',
      HTTP_REQUEST_REDIRECT = 'http_request_redirect',
      HTTP_REQUEST_SANITIZE = 'http_request_sanitize',
      HTTP_REQUEST_SBFM = 'http_request_sbfm',
      HTTP_REQUEST_SELECT_CONFIGURATION = 'http_request_select_configuration',
      HTTP_REQUEST_TRANSFORM = 'http_request_transform',
      HTTP_RESPONSE_COMPRESSION = 'http_response_compression',
      HTTP_RESPONSE_FIREWALL_MANAGED = 'http_response_firewall_managed',
      HTTP_RESPONSE_HEADERS_TRANSFORM = 'http_response_headers_transform',
    }
  }

  /** Parameters for the `createInstanceRulesetRule` operation. */
  export interface CreateInstanceRulesetRuleParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
    /** What happens when theres a match for the rule expression. */
    action?: string;
    /** The expression defining which traffic will match the rule. */
    expression?: string;
    actionParameters?: ActionParameters;
    ratelimit?: Ratelimit;
    description?: string;
    enabled?: boolean;
    id?: string;
    logging?: Logging;
    /** The reference of the rule (the rule ID by default). */
    ref?: string;
    position?: Position;
  }

  /** Parameters for the `updateInstanceRulesetRule` operation. */
  export interface UpdateInstanceRulesetRuleParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
    /** ID of a specific rule. */
    ruleId: string;
    /** What happens when theres a match for the rule expression. */
    action?: string;
    actionParameters?: ActionParameters;
    ratelimit?: Ratelimit;
    description?: string;
    enabled?: boolean;
    /** The expression defining which traffic will match the rule. */
    expression?: string;
    id?: string;
    logging?: Logging;
    /** The reference of the rule (the rule ID by default). */
    ref?: string;
    position?: Position;
  }

  /** Parameters for the `deleteInstanceRulesetRule` operation. */
  export interface DeleteInstanceRulesetRuleParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
    /** ID of a specific rule. */
    ruleId: string;
  }

  /** Parameters for the `getInstanceRulesetVersionByTag` operation. */
  export interface GetInstanceRulesetVersionByTagParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
    /** The version of the ruleset. */
    rulesetVersion: string;
    /** A category of the rule. */
    ruleTag: string;
  }

  /** Parameters for the `getZoneRulesets` operation. */
  export interface GetZoneRulesetsParams extends DefaultParams {
  }

  /** Parameters for the `getZoneRuleset` operation. */
  export interface GetZoneRulesetParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
  }

  /** Parameters for the `updateZoneRuleset` operation. */
  export interface UpdateZoneRulesetParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
    /** description of the ruleset. */
    description?: string;
    kind?: UpdateZoneRulesetConstants.Kind | string;
    /** human readable name of the ruleset. */
    name?: string;
    /** The phase of the ruleset. */
    phase?: UpdateZoneRulesetConstants.Phase | string;
    rules?: RuleCreate[];
  }

  /** Constants for the `updateZoneRuleset` operation. */
  export namespace UpdateZoneRulesetConstants {
    /** Kind */
    export enum Kind {
      MANAGED = 'managed',
      CUSTOM = 'custom',
      ROOT = 'root',
      ZONE = 'zone',
    }
    /** The phase of the ruleset. */
    export enum Phase {
      DDOS_L4 = 'ddos_l4',
      DDOS_L7 = 'ddos_l7',
      HTTP_CONFIG_SETTINGS = 'http_config_settings',
      HTTP_CUSTOM_ERRORS = 'http_custom_errors',
      HTTP_LOG_CUSTOM_FIELDS = 'http_log_custom_fields',
      HTTP_RATELIMIT = 'http_ratelimit',
      HTTP_REQUEST_CACHE_SETTINGS = 'http_request_cache_settings',
      HTTP_REQUEST_DYNAMIC_REDIRECT = 'http_request_dynamic_redirect',
      HTTP_REQUEST_FIREWALL_CUSTOM = 'http_request_firewall_custom',
      HTTP_REQUEST_FIREWALL_MANAGED = 'http_request_firewall_managed',
      HTTP_REQUEST_LATE_TRANSFORM = 'http_request_late_transform',
      HTTP_REQUEST_ORIGIN = 'http_request_origin',
      HTTP_REQUEST_REDIRECT = 'http_request_redirect',
      HTTP_REQUEST_SANITIZE = 'http_request_sanitize',
      HTTP_REQUEST_SBFM = 'http_request_sbfm',
      HTTP_REQUEST_SELECT_CONFIGURATION = 'http_request_select_configuration',
      HTTP_REQUEST_TRANSFORM = 'http_request_transform',
      HTTP_RESPONSE_COMPRESSION = 'http_response_compression',
      HTTP_RESPONSE_FIREWALL_MANAGED = 'http_response_firewall_managed',
      HTTP_RESPONSE_HEADERS_TRANSFORM = 'http_response_headers_transform',
    }
  }

  /** Parameters for the `deleteZoneRuleset` operation. */
  export interface DeleteZoneRulesetParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
  }

  /** Parameters for the `getZoneRulesetVersions` operation. */
  export interface GetZoneRulesetVersionsParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
  }

  /** Parameters for the `getZoneRulesetVersion` operation. */
  export interface GetZoneRulesetVersionParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
    /** The version of the ruleset. */
    rulesetVersion: string;
  }

  /** Parameters for the `deleteZoneRulesetVersion` operation. */
  export interface DeleteZoneRulesetVersionParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
    /** The version of the ruleset. */
    rulesetVersion: string;
  }

  /** Parameters for the `getZoneEntrypointRuleset` operation. */
  export interface GetZoneEntrypointRulesetParams extends DefaultParams {
    /** The phase of the ruleset. */
    rulesetPhase: GetZoneEntrypointRulesetConstants.RulesetPhase | string;
  }

  /** Constants for the `getZoneEntrypointRuleset` operation. */
  export namespace GetZoneEntrypointRulesetConstants {
    /** The phase of the ruleset. */
    export enum RulesetPhase {
      DDOS_L4 = 'ddos_l4',
      DDOS_L7 = 'ddos_l7',
      HTTP_CONFIG_SETTINGS = 'http_config_settings',
      HTTP_CUSTOM_ERRORS = 'http_custom_errors',
      HTTP_LOG_CUSTOM_FIELDS = 'http_log_custom_fields',
      HTTP_RATELIMIT = 'http_ratelimit',
      HTTP_REQUEST_CACHE_SETTINGS = 'http_request_cache_settings',
      HTTP_REQUEST_DYNAMIC_REDIRECT = 'http_request_dynamic_redirect',
      HTTP_REQUEST_FIREWALL_CUSTOM = 'http_request_firewall_custom',
      HTTP_REQUEST_FIREWALL_MANAGED = 'http_request_firewall_managed',
      HTTP_REQUEST_LATE_TRANSFORM = 'http_request_late_transform',
      HTTP_REQUEST_ORIGIN = 'http_request_origin',
      HTTP_REQUEST_REDIRECT = 'http_request_redirect',
      HTTP_REQUEST_SANITIZE = 'http_request_sanitize',
      HTTP_REQUEST_SBFM = 'http_request_sbfm',
      HTTP_REQUEST_SELECT_CONFIGURATION = 'http_request_select_configuration',
      HTTP_REQUEST_TRANSFORM = 'http_request_transform',
      HTTP_RESPONSE_COMPRESSION = 'http_response_compression',
      HTTP_RESPONSE_FIREWALL_MANAGED = 'http_response_firewall_managed',
      HTTP_RESPONSE_HEADERS_TRANSFORM = 'http_response_headers_transform',
    }
  }

  /** Parameters for the `updateZoneEntrypointRuleset` operation. */
  export interface UpdateZoneEntrypointRulesetParams extends DefaultParams {
    /** The phase of the ruleset. */
    rulesetPhase: UpdateZoneEntrypointRulesetConstants.RulesetPhase | string;
    /** description of the ruleset. */
    description?: string;
    kind?: UpdateZoneEntrypointRulesetConstants.Kind | string;
    /** human readable name of the ruleset. */
    name?: string;
    /** The phase of the ruleset. */
    phase?: UpdateZoneEntrypointRulesetConstants.Phase | string;
    rules?: RuleCreate[];
  }

  /** Constants for the `updateZoneEntrypointRuleset` operation. */
  export namespace UpdateZoneEntrypointRulesetConstants {
    /** The phase of the ruleset. */
    export enum RulesetPhase {
      DDOS_L4 = 'ddos_l4',
      DDOS_L7 = 'ddos_l7',
      HTTP_CONFIG_SETTINGS = 'http_config_settings',
      HTTP_CUSTOM_ERRORS = 'http_custom_errors',
      HTTP_LOG_CUSTOM_FIELDS = 'http_log_custom_fields',
      HTTP_RATELIMIT = 'http_ratelimit',
      HTTP_REQUEST_CACHE_SETTINGS = 'http_request_cache_settings',
      HTTP_REQUEST_DYNAMIC_REDIRECT = 'http_request_dynamic_redirect',
      HTTP_REQUEST_FIREWALL_CUSTOM = 'http_request_firewall_custom',
      HTTP_REQUEST_FIREWALL_MANAGED = 'http_request_firewall_managed',
      HTTP_REQUEST_LATE_TRANSFORM = 'http_request_late_transform',
      HTTP_REQUEST_ORIGIN = 'http_request_origin',
      HTTP_REQUEST_REDIRECT = 'http_request_redirect',
      HTTP_REQUEST_SANITIZE = 'http_request_sanitize',
      HTTP_REQUEST_SBFM = 'http_request_sbfm',
      HTTP_REQUEST_SELECT_CONFIGURATION = 'http_request_select_configuration',
      HTTP_REQUEST_TRANSFORM = 'http_request_transform',
      HTTP_RESPONSE_COMPRESSION = 'http_response_compression',
      HTTP_RESPONSE_FIREWALL_MANAGED = 'http_response_firewall_managed',
      HTTP_RESPONSE_HEADERS_TRANSFORM = 'http_response_headers_transform',
    }
    /** Kind */
    export enum Kind {
      MANAGED = 'managed',
      CUSTOM = 'custom',
      ROOT = 'root',
      ZONE = 'zone',
    }
    /** The phase of the ruleset. */
    export enum Phase {
      DDOS_L4 = 'ddos_l4',
      DDOS_L7 = 'ddos_l7',
      HTTP_CONFIG_SETTINGS = 'http_config_settings',
      HTTP_CUSTOM_ERRORS = 'http_custom_errors',
      HTTP_LOG_CUSTOM_FIELDS = 'http_log_custom_fields',
      HTTP_RATELIMIT = 'http_ratelimit',
      HTTP_REQUEST_CACHE_SETTINGS = 'http_request_cache_settings',
      HTTP_REQUEST_DYNAMIC_REDIRECT = 'http_request_dynamic_redirect',
      HTTP_REQUEST_FIREWALL_CUSTOM = 'http_request_firewall_custom',
      HTTP_REQUEST_FIREWALL_MANAGED = 'http_request_firewall_managed',
      HTTP_REQUEST_LATE_TRANSFORM = 'http_request_late_transform',
      HTTP_REQUEST_ORIGIN = 'http_request_origin',
      HTTP_REQUEST_REDIRECT = 'http_request_redirect',
      HTTP_REQUEST_SANITIZE = 'http_request_sanitize',
      HTTP_REQUEST_SBFM = 'http_request_sbfm',
      HTTP_REQUEST_SELECT_CONFIGURATION = 'http_request_select_configuration',
      HTTP_REQUEST_TRANSFORM = 'http_request_transform',
      HTTP_RESPONSE_COMPRESSION = 'http_response_compression',
      HTTP_RESPONSE_FIREWALL_MANAGED = 'http_response_firewall_managed',
      HTTP_RESPONSE_HEADERS_TRANSFORM = 'http_response_headers_transform',
    }
  }

  /** Parameters for the `getZoneEntryPointRulesetVersions` operation. */
  export interface GetZoneEntryPointRulesetVersionsParams extends DefaultParams {
    /** The phase of the ruleset. */
    rulesetPhase: GetZoneEntryPointRulesetVersionsConstants.RulesetPhase | string;
  }

  /** Constants for the `getZoneEntryPointRulesetVersions` operation. */
  export namespace GetZoneEntryPointRulesetVersionsConstants {
    /** The phase of the ruleset. */
    export enum RulesetPhase {
      DDOS_L4 = 'ddos_l4',
      DDOS_L7 = 'ddos_l7',
      HTTP_CONFIG_SETTINGS = 'http_config_settings',
      HTTP_CUSTOM_ERRORS = 'http_custom_errors',
      HTTP_LOG_CUSTOM_FIELDS = 'http_log_custom_fields',
      HTTP_RATELIMIT = 'http_ratelimit',
      HTTP_REQUEST_CACHE_SETTINGS = 'http_request_cache_settings',
      HTTP_REQUEST_DYNAMIC_REDIRECT = 'http_request_dynamic_redirect',
      HTTP_REQUEST_FIREWALL_CUSTOM = 'http_request_firewall_custom',
      HTTP_REQUEST_FIREWALL_MANAGED = 'http_request_firewall_managed',
      HTTP_REQUEST_LATE_TRANSFORM = 'http_request_late_transform',
      HTTP_REQUEST_ORIGIN = 'http_request_origin',
      HTTP_REQUEST_REDIRECT = 'http_request_redirect',
      HTTP_REQUEST_SANITIZE = 'http_request_sanitize',
      HTTP_REQUEST_SBFM = 'http_request_sbfm',
      HTTP_REQUEST_SELECT_CONFIGURATION = 'http_request_select_configuration',
      HTTP_REQUEST_TRANSFORM = 'http_request_transform',
      HTTP_RESPONSE_COMPRESSION = 'http_response_compression',
      HTTP_RESPONSE_FIREWALL_MANAGED = 'http_response_firewall_managed',
      HTTP_RESPONSE_HEADERS_TRANSFORM = 'http_response_headers_transform',
    }
  }

  /** Parameters for the `getZoneEntryPointRulesetVersion` operation. */
  export interface GetZoneEntryPointRulesetVersionParams extends DefaultParams {
    /** The phase of the ruleset. */
    rulesetPhase: GetZoneEntryPointRulesetVersionConstants.RulesetPhase | string;
    /** The version of the ruleset. */
    rulesetVersion: string;
  }

  /** Constants for the `getZoneEntryPointRulesetVersion` operation. */
  export namespace GetZoneEntryPointRulesetVersionConstants {
    /** The phase of the ruleset. */
    export enum RulesetPhase {
      DDOS_L4 = 'ddos_l4',
      DDOS_L7 = 'ddos_l7',
      HTTP_CONFIG_SETTINGS = 'http_config_settings',
      HTTP_CUSTOM_ERRORS = 'http_custom_errors',
      HTTP_LOG_CUSTOM_FIELDS = 'http_log_custom_fields',
      HTTP_RATELIMIT = 'http_ratelimit',
      HTTP_REQUEST_CACHE_SETTINGS = 'http_request_cache_settings',
      HTTP_REQUEST_DYNAMIC_REDIRECT = 'http_request_dynamic_redirect',
      HTTP_REQUEST_FIREWALL_CUSTOM = 'http_request_firewall_custom',
      HTTP_REQUEST_FIREWALL_MANAGED = 'http_request_firewall_managed',
      HTTP_REQUEST_LATE_TRANSFORM = 'http_request_late_transform',
      HTTP_REQUEST_ORIGIN = 'http_request_origin',
      HTTP_REQUEST_REDIRECT = 'http_request_redirect',
      HTTP_REQUEST_SANITIZE = 'http_request_sanitize',
      HTTP_REQUEST_SBFM = 'http_request_sbfm',
      HTTP_REQUEST_SELECT_CONFIGURATION = 'http_request_select_configuration',
      HTTP_REQUEST_TRANSFORM = 'http_request_transform',
      HTTP_RESPONSE_COMPRESSION = 'http_response_compression',
      HTTP_RESPONSE_FIREWALL_MANAGED = 'http_response_firewall_managed',
      HTTP_RESPONSE_HEADERS_TRANSFORM = 'http_response_headers_transform',
    }
  }

  /** Parameters for the `createZoneRulesetRule` operation. */
  export interface CreateZoneRulesetRuleParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
    /** What happens when theres a match for the rule expression. */
    action?: string;
    /** The expression defining which traffic will match the rule. */
    expression?: string;
    actionParameters?: ActionParameters;
    ratelimit?: Ratelimit;
    description?: string;
    enabled?: boolean;
    id?: string;
    logging?: Logging;
    /** The reference of the rule (the rule ID by default). */
    ref?: string;
    position?: Position;
  }

  /** Parameters for the `updateZoneRulesetRule` operation. */
  export interface UpdateZoneRulesetRuleParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
    /** ID of a specific rule. */
    ruleId: string;
    /** What happens when theres a match for the rule expression. */
    action?: string;
    actionParameters?: ActionParameters;
    ratelimit?: Ratelimit;
    description?: string;
    enabled?: boolean;
    /** The expression defining which traffic will match the rule. */
    expression?: string;
    id?: string;
    logging?: Logging;
    /** The reference of the rule (the rule ID by default). */
    ref?: string;
    position?: Position;
  }

  /** Parameters for the `deleteZoneRulesetRule` operation. */
  export interface DeleteZoneRulesetRuleParams extends DefaultParams {
    /** ID of a specific ruleset. */
    rulesetId: string;
    /** ID of a specific rule. */
    ruleId: string;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * ActionParametersResponse.
   */
  export interface ActionParametersResponse {
    /** the content to return. */
    content: string;
    content_type: string;
    /** The status code to return. */
    status_code: number;
  }

  /**
   * The source of this message.
   */
  export interface MessageSource {
    /** A JSON pointer to the field that is the source of the message. */
    pointer: string;
  }

  /**
   * ActionParameters.
   */
  export interface ActionParameters {
    /** unique ID of the ruleset. */
    id?: string;
    overrides?: Overrides;
    /** The version of the ruleset. Use "latest" to get the latest version. */
    version?: string;
    /** Ruleset ID of the ruleset to apply action to. Use "current" to apply to the current ruleset. */
    ruleset?: string;
    /** List of ruleset ids to apply action to. Use "current" to apply to the current ruleset. */
    rulesets?: string[];
    /** Skips the execution of one or more phases. */
    phases?: string[];
    /** Skips specific security products that are not based on the Ruleset Engine. */
    products?: string[];
    response?: ActionParametersResponse;
  }

  /**
   * CategoriesOverride.
   */
  export interface CategoriesOverride {
    /** The category tag name to override. */
    category?: string;
    enabled?: boolean;
    /** What happens when theres a match for the rule expression. */
    action?: string;
  }

  /**
   * List rulesets response.
   */
  export interface ListRulesetsResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: Message[];
    /** Array of messages returned. */
    messages: Message[];
    /** Container for response information. */
    result: ListedRuleset[];
  }

  /**
   * ListedRuleset.
   */
  export interface ListedRuleset {
    /** description of the ruleset. */
    description: string;
    /** unique ID of the ruleset. */
    id: string;
    kind: ListedRuleset.Constants.Kind | string;
    /** The timestamp of when the resource was last modified. */
    last_updated: string;
    /** human readable name of the ruleset. */
    name: string;
    /** The phase of the ruleset. */
    phase: ListedRuleset.Constants.Phase | string;
    /** The version of the ruleset. */
    version: string;
  }
  export namespace ListedRuleset {
    export namespace Constants {
      /** Kind */
      export enum Kind {
        MANAGED = 'managed',
        CUSTOM = 'custom',
        ROOT = 'root',
        ZONE = 'zone',
      }
      /** The phase of the ruleset. */
      export enum Phase {
        DDOS_L4 = 'ddos_l4',
        DDOS_L7 = 'ddos_l7',
        HTTP_CONFIG_SETTINGS = 'http_config_settings',
        HTTP_CUSTOM_ERRORS = 'http_custom_errors',
        HTTP_LOG_CUSTOM_FIELDS = 'http_log_custom_fields',
        HTTP_RATELIMIT = 'http_ratelimit',
        HTTP_REQUEST_CACHE_SETTINGS = 'http_request_cache_settings',
        HTTP_REQUEST_DYNAMIC_REDIRECT = 'http_request_dynamic_redirect',
        HTTP_REQUEST_FIREWALL_CUSTOM = 'http_request_firewall_custom',
        HTTP_REQUEST_FIREWALL_MANAGED = 'http_request_firewall_managed',
        HTTP_REQUEST_LATE_TRANSFORM = 'http_request_late_transform',
        HTTP_REQUEST_ORIGIN = 'http_request_origin',
        HTTP_REQUEST_REDIRECT = 'http_request_redirect',
        HTTP_REQUEST_SANITIZE = 'http_request_sanitize',
        HTTP_REQUEST_SBFM = 'http_request_sbfm',
        HTTP_REQUEST_SELECT_CONFIGURATION = 'http_request_select_configuration',
        HTTP_REQUEST_TRANSFORM = 'http_request_transform',
        HTTP_RESPONSE_COMPRESSION = 'http_response_compression',
        HTTP_RESPONSE_FIREWALL_MANAGED = 'http_response_firewall_managed',
        HTTP_RESPONSE_HEADERS_TRANSFORM = 'http_response_headers_transform',
      }
    }
  }

  /**
   * Logging.
   */
  export interface Logging {
    enabled: boolean;
  }

  /**
   * Message.
   */
  export interface Message {
    /** A unique code for this message. */
    code?: number;
    /** A text description of this message. */
    message: string;
    /** The source of this message. */
    source?: MessageSource;
  }

  /**
   * Overrides.
   */
  export interface Overrides {
    /** What happens when theres a match for the rule expression. */
    action?: string;
    enabled?: boolean;
    /** The sensitivity level of the rule. */
    sensitivity_level?: Overrides.Constants.SensitivityLevel | string;
    rules?: RulesOverride[];
    categories?: CategoriesOverride[];
  }
  export namespace Overrides {
    export namespace Constants {
      /** The sensitivity level of the rule. */
      export enum SensitivityLevel {
        HIGH = 'high',
        MEDIUM = 'medium',
        LOW = 'low',
      }
    }
  }

  /**
   * Position.
   */
  export interface Position {
    /** The rule ID to place this rule before. */
    before?: string;
    /** The rule ID to place this rule after. */
    after?: string;
    /** The index to place this rule at. */
    index?: number;
  }

  /**
   * Ratelimit.
   */
  export interface Ratelimit {
    /** The set of parameters that define how rate for this rule is tracked. */
    characteristics?: string[];
    /** Expression that specifies the criteria you are matching traffic on. */
    counting_expression?: string;
    /** Once the rate is reached, the rate limiting rule blocks further requests for the period of time defined in
     *  this field.
     */
    mitigation_timeout?: number;
    /** The period of time to consider (in seconds) when evaluating the rate. */
    period?: number;
    /** The number of requests over the period of time that will trigger the rate limiting rule. */
    requests_per_period?: number;
  }

  /**
   * RuleCreate.
   */
  export interface RuleCreate {
    /** What happens when theres a match for the rule expression. */
    action: string;
    action_parameters?: ActionParameters;
    ratelimit?: Ratelimit;
    description?: string;
    enabled?: boolean;
    /** The expression defining which traffic will match the rule. */
    expression: string;
    id?: string;
    logging?: Logging;
    /** The reference of the rule (the rule ID by default). */
    ref?: string;
    position?: Position;
  }

  /**
   * RuleDetails.
   */
  export interface RuleDetails {
    /** unique ID of rule. */
    id: string;
    /** The version of the rule. */
    version?: string;
    /** What happens when theres a match for the rule expression. */
    action?: string;
    action_parameters?: ActionParameters;
    /** List of categories for the rule. */
    categories?: string[];
    /** Is the rule enabled. */
    enabled?: boolean;
    /** description of the rule. */
    description?: string;
    /** The expression defining which traffic will match the rule. */
    expression?: string;
    /** The reference of the rule (the rule ID by default). */
    ref?: string;
    logging?: Logging;
    /** The timestamp of when the resource was last modified. */
    last_updated?: string;
  }

  /**
   * List rules response.
   */
  export interface RuleResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: Message[];
    /** Array of messages returned. */
    messages: Message[];
    result: RuleDetails;
  }

  /**
   * RulesOverride.
   */
  export interface RulesOverride {
    id?: string;
    enabled?: boolean;
    /** What happens when theres a match for the rule expression. */
    action?: string;
    /** The sensitivity level of the rule. */
    sensitivity_level?: RulesOverride.Constants.SensitivityLevel | string;
    /** The score threshold of the rule. */
    score_threshold?: number;
  }
  export namespace RulesOverride {
    export namespace Constants {
      /** The sensitivity level of the rule. */
      export enum SensitivityLevel {
        HIGH = 'high',
        MEDIUM = 'medium',
        LOW = 'low',
      }
    }
  }

  /**
   * RulesetDetails.
   */
  export interface RulesetDetails {
    /** description of the ruleset. */
    description: string;
    /** unique ID of the ruleset. */
    id: string;
    kind: RulesetDetails.Constants.Kind | string;
    /** The timestamp of when the resource was last modified. */
    last_updated: string;
    /** human readable name of the ruleset. */
    name: string;
    /** The phase of the ruleset. */
    phase: RulesetDetails.Constants.Phase | string;
    /** The version of the ruleset. */
    version: string;
    rules: RuleDetails[];
  }
  export namespace RulesetDetails {
    export namespace Constants {
      /** Kind */
      export enum Kind {
        MANAGED = 'managed',
        CUSTOM = 'custom',
        ROOT = 'root',
        ZONE = 'zone',
      }
      /** The phase of the ruleset. */
      export enum Phase {
        DDOS_L4 = 'ddos_l4',
        DDOS_L7 = 'ddos_l7',
        HTTP_CONFIG_SETTINGS = 'http_config_settings',
        HTTP_CUSTOM_ERRORS = 'http_custom_errors',
        HTTP_LOG_CUSTOM_FIELDS = 'http_log_custom_fields',
        HTTP_RATELIMIT = 'http_ratelimit',
        HTTP_REQUEST_CACHE_SETTINGS = 'http_request_cache_settings',
        HTTP_REQUEST_DYNAMIC_REDIRECT = 'http_request_dynamic_redirect',
        HTTP_REQUEST_FIREWALL_CUSTOM = 'http_request_firewall_custom',
        HTTP_REQUEST_FIREWALL_MANAGED = 'http_request_firewall_managed',
        HTTP_REQUEST_LATE_TRANSFORM = 'http_request_late_transform',
        HTTP_REQUEST_ORIGIN = 'http_request_origin',
        HTTP_REQUEST_REDIRECT = 'http_request_redirect',
        HTTP_REQUEST_SANITIZE = 'http_request_sanitize',
        HTTP_REQUEST_SBFM = 'http_request_sbfm',
        HTTP_REQUEST_SELECT_CONFIGURATION = 'http_request_select_configuration',
        HTTP_REQUEST_TRANSFORM = 'http_request_transform',
        HTTP_RESPONSE_COMPRESSION = 'http_response_compression',
        HTTP_RESPONSE_FIREWALL_MANAGED = 'http_response_firewall_managed',
        HTTP_RESPONSE_HEADERS_TRANSFORM = 'http_response_headers_transform',
      }
    }
  }

  /**
   * Ruleset response.
   */
  export interface RulesetResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: Message[];
    /** Array of messages returned. */
    messages: Message[];
    result: RulesetDetails;
  }
}

export = RulesetsV1;
