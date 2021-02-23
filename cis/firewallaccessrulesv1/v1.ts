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
 * Instance Level Firewall Access Rules
 */

class FirewallAccessRulesV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'firewall_access_rules';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of FirewallAccessRulesV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {FirewallAccessRulesV1}
   */

  public static newInstance(options: UserOptions): FirewallAccessRulesV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new FirewallAccessRulesV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Full crn of the service instance. */
  crn: string;

  /**
   * Construct a FirewallAccessRulesV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full crn of the service instance.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {FirewallAccessRulesV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const requiredParams = ['crn'];
    const missingParams = getMissingParams(options, requiredParams);
    if (missingParams) {
      throw missingParams;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(FirewallAccessRulesV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
  }

  /*************************
   * instanceLevelFirewallAccessRules
   ************************/

  /**
   * List instance level firewall access rules.
   *
   * List all instance level firewall access rules.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.notes] - Search access rules by note.(Not case sensitive).
   * @param {string} [params.mode] - Search access rules by mode.
   * @param {string} [params.configurationTarget] - Search access rules by configuration target.
   * @param {string} [params.configurationValue] - Search access rules by configuration value which can be IP, IPrange,
   * or country code.
   * @param {number} [params.page] - Page number of paginated results.
   * @param {number} [params.perPage] - Maximum number of access rules per page.
   * @param {string} [params.order] - Field by which to order list of access rules.
   * @param {string} [params.direction] - Direction in which to order results [ascending/descending order].
   * @param {string} [params.match] - Whether to match all (all) or atleast one search parameter (any).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallAccessRulesV1.Response<FirewallAccessRulesV1.ListAccountAccessRulesResp>>}
   */
  public listAllAccountAccessRules(params?: FirewallAccessRulesV1.ListAllAccountAccessRulesParams): Promise<FirewallAccessRulesV1.Response<FirewallAccessRulesV1.ListAccountAccessRulesResp>> {
    const _params = Object.assign({}, params);

    const query = {
      'notes': _params.notes,
      'mode': _params.mode,
      'configuration.target': _params.configurationTarget,
      'configuration.value': _params.configurationValue,
      'page': _params.page,
      'per_page': _params.perPage,
      'order': _params.order,
      'direction': _params.direction,
      'match': _params.match
    };

    const path = {
      'crn': this.crn
    };

    const sdkHeaders = getSdkHeaders(FirewallAccessRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'listAllAccountAccessRules');

    const parameters = {
      options: {
        url: '/v1/{crn}/firewall/access_rules/rules',
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
   * Create instance level firewall access rule.
   *
   * Create a new instance level firewall access rule for a given service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.mode] - The action to apply to a matched request.
   * @param {string} [params.notes] - A personal note about the rule. Typically used as a reminder or explanation for
   * the rule.
   * @param {AccountAccessRuleInputConfiguration} [params.configuration] - Configuration object specifying access rule.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallAccessRulesV1.Response<FirewallAccessRulesV1.AccountAccessRuleResp>>}
   */
  public createAccountAccessRule(params?: FirewallAccessRulesV1.CreateAccountAccessRuleParams): Promise<FirewallAccessRulesV1.Response<FirewallAccessRulesV1.AccountAccessRuleResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'mode': _params.mode,
      'notes': _params.notes,
      'configuration': _params.configuration
    };

    const path = {
      'crn': this.crn
    };

    const sdkHeaders = getSdkHeaders(FirewallAccessRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'createAccountAccessRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/firewall/access_rules/rules',
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
   * Delete instance level access rule.
   *
   * Delete an instance level access rule given its id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessruleIdentifier - Identifier of the access rule to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallAccessRulesV1.Response<FirewallAccessRulesV1.DeleteAccountAccessRuleResp>>}
   */
  public deleteAccountAccessRule(params: FirewallAccessRulesV1.DeleteAccountAccessRuleParams): Promise<FirewallAccessRulesV1.Response<FirewallAccessRulesV1.DeleteAccountAccessRuleResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['accessruleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'accessrule_identifier': _params.accessruleIdentifier
    };

    const sdkHeaders = getSdkHeaders(FirewallAccessRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteAccountAccessRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/firewall/access_rules/rules/{accessrule_identifier}',
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
   * Get instance level firewall access rule.
   *
   * Get the details of an instance level firewall access rule for a given  service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessruleIdentifier - Identifier of firewall access rule for the given zone.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallAccessRulesV1.Response<FirewallAccessRulesV1.AccountAccessRuleResp>>}
   */
  public getAccountAccessRule(params: FirewallAccessRulesV1.GetAccountAccessRuleParams): Promise<FirewallAccessRulesV1.Response<FirewallAccessRulesV1.AccountAccessRuleResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['accessruleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'accessrule_identifier': _params.accessruleIdentifier
    };

    const sdkHeaders = getSdkHeaders(FirewallAccessRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'getAccountAccessRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/firewall/access_rules/rules/{accessrule_identifier}',
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
   * Update instance level firewall access rule.
   *
   * Update an existing instance level firewall access rule for a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessruleIdentifier - Identifier of firewall access rule.
   * @param {string} [params.mode] - The action to apply to a matched request.
   * @param {string} [params.notes] - A personal note about the rule. Typically used as a reminder or explanation for
   * the rule.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallAccessRulesV1.Response<FirewallAccessRulesV1.AccountAccessRuleResp>>}
   */
  public updateAccountAccessRule(params: FirewallAccessRulesV1.UpdateAccountAccessRuleParams): Promise<FirewallAccessRulesV1.Response<FirewallAccessRulesV1.AccountAccessRuleResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['accessruleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'mode': _params.mode,
      'notes': _params.notes
    };

    const path = {
      'crn': this.crn,
      'accessrule_identifier': _params.accessruleIdentifier
    };

    const sdkHeaders = getSdkHeaders(FirewallAccessRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'updateAccountAccessRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/firewall/access_rules/rules/{accessrule_identifier}',
        method: 'PATCH',
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

namespace FirewallAccessRulesV1 {

  /** Options for the `FirewallAccessRulesV1` constructor. */
  export interface Options extends UserOptions {

    /** Full crn of the service instance. */
    crn: string;
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

  /** Parameters for the `listAllAccountAccessRules` operation. */
  export interface ListAllAccountAccessRulesParams {
    /** Search access rules by note.(Not case sensitive). */
    notes?: string;
    /** Search access rules by mode. */
    mode?: ListAllAccountAccessRulesConstants.Mode | string;
    /** Search access rules by configuration target. */
    configurationTarget?: ListAllAccountAccessRulesConstants.ConfigurationTarget | string;
    /** Search access rules by configuration value which can be IP, IPrange, or country code. */
    configurationValue?: string;
    /** Page number of paginated results. */
    page?: number;
    /** Maximum number of access rules per page. */
    perPage?: number;
    /** Field by which to order list of access rules. */
    order?: ListAllAccountAccessRulesConstants.Order | string;
    /** Direction in which to order results [ascending/descending order]. */
    direction?: ListAllAccountAccessRulesConstants.Direction | string;
    /** Whether to match all (all) or atleast one search parameter (any). */
    match?: ListAllAccountAccessRulesConstants.Match | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listAllAccountAccessRules` operation. */
  export namespace ListAllAccountAccessRulesConstants {
    /** Search access rules by mode. */
    export enum Mode {
      BLOCK = 'block',
      CHALLENGE = 'challenge',
      WHITELIST = 'whitelist',
      JS_CHALLENGE = 'js_challenge',
    }
    /** Search access rules by configuration target. */
    export enum ConfigurationTarget {
      IP = 'ip',
      IP_RANGE = 'ip_range',
      ASN = 'asn',
      COUNTRY = 'country',
    }
    /** Field by which to order list of access rules. */
    export enum Order {
      TARGET = 'target',
      VALUE = 'value',
      MODE = 'mode',
    }
    /** Direction in which to order results [ascending/descending order]. */
    export enum Direction {
      ASC = 'asc',
      DESC = 'desc',
    }
    /** Whether to match all (all) or atleast one search parameter (any). */
    export enum Match {
      ANY = 'any',
      ALL = 'all',
    }
  }

  /** Parameters for the `createAccountAccessRule` operation. */
  export interface CreateAccountAccessRuleParams {
    /** The action to apply to a matched request. */
    mode?: CreateAccountAccessRuleConstants.Mode | string;
    /** A personal note about the rule. Typically used as a reminder or explanation for the rule. */
    notes?: string;
    /** Configuration object specifying access rule. */
    configuration?: AccountAccessRuleInputConfiguration;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createAccountAccessRule` operation. */
  export namespace CreateAccountAccessRuleConstants {
    /** The action to apply to a matched request. */
    export enum Mode {
      BLOCK = 'block',
      CHALLENGE = 'challenge',
      WHITELIST = 'whitelist',
      JS_CHALLENGE = 'js_challenge',
    }
  }

  /** Parameters for the `deleteAccountAccessRule` operation. */
  export interface DeleteAccountAccessRuleParams {
    /** Identifier of the access rule to be deleted. */
    accessruleIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAccountAccessRule` operation. */
  export interface GetAccountAccessRuleParams {
    /** Identifier of firewall access rule for the given zone. */
    accessruleIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAccountAccessRule` operation. */
  export interface UpdateAccountAccessRuleParams {
    /** Identifier of firewall access rule. */
    accessruleIdentifier: string;
    /** The action to apply to a matched request. */
    mode?: UpdateAccountAccessRuleConstants.Mode | string;
    /** A personal note about the rule. Typically used as a reminder or explanation for the rule. */
    notes?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateAccountAccessRule` operation. */
  export namespace UpdateAccountAccessRuleConstants {
    /** The action to apply to a matched request. */
    export enum Mode {
      BLOCK = 'block',
      CHALLENGE = 'challenge',
      WHITELIST = 'whitelist',
      JS_CHALLENGE = 'js_challenge',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** Configuration object specifying access rule. */
  export interface AccountAccessRuleInputConfiguration {
    /** The request property to target. */
    target: string;
    /** The value for the selected target.For ip the value is a valid ip address.For ip_range the value specifies ip
     *  range limited to /16 and /24. For asn the value is an AS number. For country the value is a country code for the
     *  country.
     */
    value: string;
  }

  /** configuration. */
  export interface AccountAccessRuleObjectConfiguration {
    /** target ip address. */
    target: string;
    /** Value for the given target. For ip the value is a valid ip address.For ip_range the value specifies ip range
     *  limited to /16 and /24. For asn the value is an AS number. For country the value is a country code for the
     *  country.
     */
    value: string;
  }

  /** The scope definition of the access rule. */
  export interface AccountAccessRuleObjectScope {
    /** The scope of the access rule. */
    type: string;
  }

  /** Container for response information. */
  export interface DeleteAccountAccessRuleRespResult {
    /** ID. */
    id: string;
  }

  /** Statistics of results. */
  export interface ListAccountAccessRulesRespResultInfo {
    /** Page number. */
    page: number;
    /** Number of results per page. */
    per_page: number;
    /** Number of results. */
    count: number;
    /** Total number of results. */
    total_count: number;
  }

  /** access rule objects. */
  export interface AccountAccessRuleObject {
    /** Identifier of the instance level firewall access rule. */
    id: string;
    /** A personal note about the rule. Typically used as a reminder or explanation for the rule. */
    notes: string;
    /** List of modes that are allowed. */
    allowed_modes: string[];
    /** The action to be applied to a request matching the instance level access rule. */
    mode: string;
    /** The scope definition of the access rule. */
    scope?: AccountAccessRuleObjectScope;
    /** The creation date-time of the instance level firewall access rule. */
    created_on: string;
    /** The modification date-time of the instance level firewall access rule. */
    modified_on: string;
    /** configuration. */
    configuration: AccountAccessRuleObjectConfiguration;
  }

  /** access rule response output. */
  export interface AccountAccessRuleResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages encountered. */
    messages: string[][];
    /** access rule objects. */
    result: AccountAccessRuleObject;
  }

  /** delete access rule response. */
  export interface DeleteAccountAccessRuleResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages encountered. */
    messages: string[][];
    /** Container for response information. */
    result: DeleteAccountAccessRuleRespResult;
  }

  /** access rule list response. */
  export interface ListAccountAccessRulesResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages encountered. */
    messages: string[][];
    /** Container for response information. */
    result: AccountAccessRuleObject[];
    /** Statistics of results. */
    result_info: ListAccountAccessRulesRespResultInfo;
  }

}

export = FirewallAccessRulesV1;
