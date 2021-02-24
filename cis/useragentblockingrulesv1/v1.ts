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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.19.0-be3b4618-20201113-200858
 */
 

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../../lib/common';

/**
 * User-Agent Blocking Rules
 */

class UserAgentBlockingRulesV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'user_agent_blocking_rules';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of UserAgentBlockingRulesV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {UserAgentBlockingRulesV1}
   */

  public static newInstance(options: UserOptions): UserAgentBlockingRulesV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new UserAgentBlockingRulesV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Full url-encoded cloud resource name (CRN) of resource instance. */
  crn: string;

  /** Zone identifier of the zone for which user-agent rule is created. */
  zoneIdentifier: string;

  /**
   * Construct a UserAgentBlockingRulesV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} options.zoneIdentifier - Zone identifier of the zone for which user-agent rule is created.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {UserAgentBlockingRulesV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const requiredParams = ['crn','zoneIdentifier'];
    const missingParams = getMissingParams(options, requiredParams);
    if (missingParams) {
      throw missingParams;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(UserAgentBlockingRulesV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * userAgentBlockingRules
   ************************/

  /**
   * List all user-agent blocking rules.
   *
   * List all user agent blocking rules.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.page] - Page number of paginated results.
   * @param {number} [params.perPage] - Maximum number of user-agent rules per page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<UserAgentBlockingRulesV1.Response<UserAgentBlockingRulesV1.ListUseragentRulesResp>>}
   */
  public listAllZoneUserAgentRules(params?: UserAgentBlockingRulesV1.ListAllZoneUserAgentRulesParams): Promise<UserAgentBlockingRulesV1.Response<UserAgentBlockingRulesV1.ListUseragentRulesResp>> {
    const _params = Object.assign({}, params);

    const query = {
      'page': _params.page,
      'per_page': _params.perPage
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(UserAgentBlockingRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'listAllZoneUserAgentRules');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/ua_rules',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create user-agent blocking rule.
   *
   * Create a new user-agent blocking rule for a given zone under a service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.mode] - The type of action to perform.
   * @param {UseragentRuleInputConfiguration} [params.configuration] - Target/Value pair to use for this rule. The value
   * is the exact UserAgent to match.
   * @param {boolean} [params.paused] - Whether this user-agent rule is currently disabled.
   * @param {string} [params.description] - Some useful information about this rule to help identify the purpose of it.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<UserAgentBlockingRulesV1.Response<UserAgentBlockingRulesV1.UseragentRuleResp>>}
   */
  public createZoneUserAgentRule(params?: UserAgentBlockingRulesV1.CreateZoneUserAgentRuleParams): Promise<UserAgentBlockingRulesV1.Response<UserAgentBlockingRulesV1.UseragentRuleResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'mode': _params.mode,
      'configuration': _params.configuration,
      'paused': _params.paused,
      'description': _params.description
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(UserAgentBlockingRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'createZoneUserAgentRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/ua_rules',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete user-agent blocking rule.
   *
   * Delete a user-agent blocking rule for a particular zone, given its id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.useragentRuleIdentifier - Identifier of the user-agent rule to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<UserAgentBlockingRulesV1.Response<UserAgentBlockingRulesV1.DeleteUseragentRuleResp>>}
   */
  public deleteZoneUserAgentRule(params: UserAgentBlockingRulesV1.DeleteZoneUserAgentRuleParams): Promise<UserAgentBlockingRulesV1.Response<UserAgentBlockingRulesV1.DeleteUseragentRuleResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['useragentRuleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'useragent_rule_identifier': _params.useragentRuleIdentifier
    };

    const sdkHeaders = getSdkHeaders(UserAgentBlockingRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteZoneUserAgentRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/ua_rules/{useragent_rule_identifier}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get user-agent blocking rule.
   *
   * For a given service instance, zone id and user-agent rule id, get the user-agent blocking rule details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.useragentRuleIdentifier - Identifier of user-agent blocking rule for the given zone.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<UserAgentBlockingRulesV1.Response<UserAgentBlockingRulesV1.UseragentRuleResp>>}
   */
  public getUserAgentRule(params: UserAgentBlockingRulesV1.GetUserAgentRuleParams): Promise<UserAgentBlockingRulesV1.Response<UserAgentBlockingRulesV1.UseragentRuleResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['useragentRuleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'useragent_rule_identifier': _params.useragentRuleIdentifier
    };

    const sdkHeaders = getSdkHeaders(UserAgentBlockingRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'getUserAgentRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/ua_rules/{useragent_rule_identifier}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update user-agent blocking rule.
   *
   * Update an existing user-agent blocking rule for a given zone under a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.useragentRuleIdentifier - Identifier of user-agent rule.
   * @param {string} [params.mode] - The type of action to perform.
   * @param {UseragentRuleInputConfiguration} [params.configuration] - Target/Value pair to use for this rule. The value
   * is the exact UserAgent to match.
   * @param {boolean} [params.paused] - Whether this user-agent rule is currently disabled.
   * @param {string} [params.description] - Some useful information about this rule to help identify the purpose of it.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<UserAgentBlockingRulesV1.Response<UserAgentBlockingRulesV1.UseragentRuleResp>>}
   */
  public updateUserAgentRule(params: UserAgentBlockingRulesV1.UpdateUserAgentRuleParams): Promise<UserAgentBlockingRulesV1.Response<UserAgentBlockingRulesV1.UseragentRuleResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['useragentRuleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'mode': _params.mode,
      'configuration': _params.configuration,
      'paused': _params.paused,
      'description': _params.description
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'useragent_rule_identifier': _params.useragentRuleIdentifier
    };

    const sdkHeaders = getSdkHeaders(UserAgentBlockingRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'updateUserAgentRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/ua_rules/{useragent_rule_identifier}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

}

/*************************
 * interfaces
 ************************/

namespace UserAgentBlockingRulesV1 {

  /** Options for the `UserAgentBlockingRulesV1` constructor. */
  export interface Options extends UserOptions {

    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;

    /** Zone identifier of the zone for which user-agent rule is created. */
    zoneIdentifier: string;
  }

  /** An operation response. */
  export interface Response<T = any>  {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listAllZoneUserAgentRules` operation. */
  export interface ListAllZoneUserAgentRulesParams {
    /** Page number of paginated results. */
    page?: number;
    /** Maximum number of user-agent rules per page. */
    perPage?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createZoneUserAgentRule` operation. */
  export interface CreateZoneUserAgentRuleParams {
    /** The type of action to perform. */
    mode?: CreateZoneUserAgentRuleConstants.Mode | string;
    /** Target/Value pair to use for this rule. The value is the exact UserAgent to match. */
    configuration?: UseragentRuleInputConfiguration;
    /** Whether this user-agent rule is currently disabled. */
    paused?: boolean;
    /** Some useful information about this rule to help identify the purpose of it. */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createZoneUserAgentRule` operation. */
  export namespace CreateZoneUserAgentRuleConstants {
    /** The type of action to perform. */
    export enum Mode {
      BLOCK = 'block',
      CHALLENGE = 'challenge',
      JS_CHALLENGE = 'js_challenge',
    }
  }

  /** Parameters for the `deleteZoneUserAgentRule` operation. */
  export interface DeleteZoneUserAgentRuleParams {
    /** Identifier of the user-agent rule to be deleted. */
    useragentRuleIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getUserAgentRule` operation. */
  export interface GetUserAgentRuleParams {
    /** Identifier of user-agent blocking rule for the given zone. */
    useragentRuleIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateUserAgentRule` operation. */
  export interface UpdateUserAgentRuleParams {
    /** Identifier of user-agent rule. */
    useragentRuleIdentifier: string;
    /** The type of action to perform. */
    mode?: UpdateUserAgentRuleConstants.Mode | string;
    /** Target/Value pair to use for this rule. The value is the exact UserAgent to match. */
    configuration?: UseragentRuleInputConfiguration;
    /** Whether this user-agent rule is currently disabled. */
    paused?: boolean;
    /** Some useful information about this rule to help identify the purpose of it. */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateUserAgentRule` operation. */
  export namespace UpdateUserAgentRuleConstants {
    /** The type of action to perform. */
    export enum Mode {
      BLOCK = 'block',
      CHALLENGE = 'challenge',
      JS_CHALLENGE = 'js_challenge',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** Container for response information. */
  export interface DeleteUseragentRuleRespResult {
    /** ID. */
    id: string;
  }

  /** Statistics of results. */
  export interface ListUseragentRulesRespResultInfo {
    /** Page number. */
    page: number;
    /** Number of results per page. */
    per_page: number;
    /** Number of results. */
    count: number;
    /** Total number of results. */
    total_count: number;
  }

  /** Target/Value pair to use for this rule. The value is the exact UserAgent to match. */
  export interface UseragentRuleInputConfiguration {
    /** properties. */
    target: string;
    /** The exact UserAgent string to match with this rule. */
    value: string;
  }

  /** Target/Value pair to use for this rule. The value is the exact UserAgent to match. */
  export interface UseragentRuleObjectConfiguration {
    /** properties. */
    target: string;
    /** The exact UserAgent string to match with this rule. */
    value: string;
  }

  /** user agent delete response. */
  export interface DeleteUseragentRuleResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: DeleteUseragentRuleRespResult;
  }

  /** user agent rules response. */
  export interface ListUseragentRulesResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: UseragentRuleObject[];
    /** Statistics of results. */
    result_info: ListUseragentRulesRespResultInfo;
  }

  /** user agent rule object. */
  export interface UseragentRuleObject {
    /** Identifier of the user-agent blocking rule. */
    id: string;
    /** Whether this user-agent rule is currently disabled. */
    paused: boolean;
    /** Some useful information about this rule to help identify the purpose of it. */
    description: string;
    /** The type of action to perform. */
    mode: string;
    /** Target/Value pair to use for this rule. The value is the exact UserAgent to match. */
    configuration: UseragentRuleObjectConfiguration;
  }

  /** user agent rule response. */
  export interface UseragentRuleResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** user agent rule object. */
    result: UseragentRuleObject;
  }

}

export = UserAgentBlockingRulesV1;
