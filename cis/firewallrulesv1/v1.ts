/**
 * (C) Copyright IBM Corp. 2022.
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
 * IBM OpenAPI SDK Code Generator Version: 3.43.0-49eab5c7-20211117-152138
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  getMissingParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../../lib/common';

/**
 * Firewall rules
 *
 * API Version: 1.0.1
 */

class FirewallRulesV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'firewall_rules';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of FirewallRulesV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {FirewallRulesV1}
   */

  public static newInstance(options: UserOptions): FirewallRulesV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new FirewallRulesV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a FirewallRulesV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {FirewallRulesV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(FirewallRulesV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * firewallRules
   ************************/

  /**
   * List all firewall rules for a zone.
   *
   * List all firewall rules for a zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthUserToken - IBM Cloud user IAM token.
   * @param {string} params.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} params.zoneIdentifier - Zone identifier of the zone for which firewall rules are listed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallRulesV1.Response<FirewallRulesV1.ListFirewallRulesResp>>}
   */
  public listAllFirewallRules(
    params: FirewallRulesV1.ListAllFirewallRulesParams
  ): Promise<FirewallRulesV1.Response<FirewallRulesV1.ListFirewallRulesResp>> {
    const _params = { ...params };
    const requiredParams = ['xAuthUserToken', 'crn', 'zoneIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      FirewallRulesV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listAllFirewallRules'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/rules',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Auth-User-Token': _params.xAuthUserToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create firewall rules for a zone.
   *
   * Create new firewall rules for a given zone under a service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthUserToken - IBM Cloud user IAM token.
   * @param {string} params.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} params.zoneIdentifier - Zone identifier of the zone for which firewall rules are created.
   * @param {FirewallRuleInputWithFilterId[]} [params.firewallRuleInputWithFilterId] - Json objects which are used to
   * create firewall rules.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallRulesV1.Response<FirewallRulesV1.FirewallRulesResp>>}
   */
  public createFirewallRules(
    params: FirewallRulesV1.CreateFirewallRulesParams
  ): Promise<FirewallRulesV1.Response<FirewallRulesV1.FirewallRulesResp>> {
    const _params = { ...params };
    const requiredParams = ['xAuthUserToken', 'crn', 'zoneIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.firewallRuleInputWithFilterId;
    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      FirewallRulesV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createFirewallRules'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/rules',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-User-Token': _params.xAuthUserToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update firewall rules.
   *
   * Update existing firewall rules for a given zone under a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthUserToken - IBM Cloud user IAM token.
   * @param {string} params.crn - Full crn of the service instance.
   * @param {string} params.zoneIdentifier - Zone identifier (zone id).
   * @param {FirewallRulesUpdateInputItem[]} [params.firewallRulesUpdateInputItem] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallRulesV1.Response<FirewallRulesV1.FirewallRulesResp>>}
   */
  public updateFirewllRules(
    params: FirewallRulesV1.UpdateFirewllRulesParams
  ): Promise<FirewallRulesV1.Response<FirewallRulesV1.FirewallRulesResp>> {
    const _params = { ...params };
    const requiredParams = ['xAuthUserToken', 'crn', 'zoneIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.firewallRulesUpdateInputItem;
    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      FirewallRulesV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateFirewllRules'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/rules',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-User-Token': _params.xAuthUserToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete firewall rules.
   *
   * Delete firewall rules by filter ids.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthUserToken - IBM Cloud user IAM token.
   * @param {string} params.crn - Full crn of the service instance.
   * @param {string} params.zoneIdentifier - Identifier of zone whose firewall rules are to be deleted.
   * @param {string} params.id - ids of firewall rules which will be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallRulesV1.Response<FirewallRulesV1.DeleteFirewallRulesResp>>}
   */
  public deleteFirewallRules(
    params: FirewallRulesV1.DeleteFirewallRulesParams
  ): Promise<FirewallRulesV1.Response<FirewallRulesV1.DeleteFirewallRulesResp>> {
    const _params = { ...params };
    const requiredParams = ['xAuthUserToken', 'crn', 'zoneIdentifier', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'id': _params.id,
    };

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      FirewallRulesV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteFirewallRules'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/rules',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Auth-User-Token': _params.xAuthUserToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a firewall rule.
   *
   * Delete a firewall rule given its id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthUserToken - IBM Cloud user IAM token.
   * @param {string} params.crn - Full crn of the service instance.
   * @param {string} params.zoneIdentifier - Identifier of zone whose firewall rule is to be deleted.
   * @param {string} params.firewallRuleIdentifier - Identifier of the firewall rule to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallRulesV1.Response<FirewallRulesV1.DeleteFirewallRuleResp>>}
   */
  public deleteFirewallRule(
    params: FirewallRulesV1.DeleteFirewallRuleParams
  ): Promise<FirewallRulesV1.Response<FirewallRulesV1.DeleteFirewallRuleResp>> {
    const _params = { ...params };
    const requiredParams = ['xAuthUserToken', 'crn', 'zoneIdentifier', 'firewallRuleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
      'firewall_rule_identifier': _params.firewallRuleIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      FirewallRulesV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteFirewallRule'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/rules/{firewall_rule_identifier}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Auth-User-Token': _params.xAuthUserToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get firewall rule details by id.
   *
   * Get the details of a firewall rule for a given zone under a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthUserToken - IBM Cloud user IAM token.
   * @param {string} params.crn - Full crn of the service instance.
   * @param {string} params.zoneIdentifier - Zone identifier (zone id).
   * @param {string} params.firewallRuleIdentifier - Identifier of firewall rule for the given zone.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallRulesV1.Response<FirewallRulesV1.FirewallRuleResp>>}
   */
  public getFirewallRule(
    params: FirewallRulesV1.GetFirewallRuleParams
  ): Promise<FirewallRulesV1.Response<FirewallRulesV1.FirewallRuleResp>> {
    const _params = { ...params };
    const requiredParams = ['xAuthUserToken', 'crn', 'zoneIdentifier', 'firewallRuleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
      'firewall_rule_identifier': _params.firewallRuleIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      FirewallRulesV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getFirewallRule'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/rules/{firewall_rule_identifier}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Auth-User-Token': _params.xAuthUserToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a firewall rule.
   *
   * Update an existing firewall rule for a given zone under a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthUserToken - IBM Cloud user IAM token.
   * @param {string} params.crn - Full crn of the service instance.
   * @param {string} params.zoneIdentifier - Zone identifier (zone id).
   * @param {string} params.firewallRuleIdentifier - Identifier of firewall rule.
   * @param {string} [params.action] - The firewall action to perform, "log" action is only available for enterprise
   * plan instances.
   * @param {boolean} [params.paused] - Indicates if the firewall rule is active.
   * @param {string} [params.description] - To briefly describe the firewall rule, omitted from object if empty.
   * @param {FirewallRuleUpdateInputFilter} [params.filter] - An existing filter.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallRulesV1.Response<FirewallRulesV1.FirewallRuleResp>>}
   */
  public updateFirewallRule(
    params: FirewallRulesV1.UpdateFirewallRuleParams
  ): Promise<FirewallRulesV1.Response<FirewallRulesV1.FirewallRuleResp>> {
    const _params = { ...params };
    const requiredParams = ['xAuthUserToken', 'crn', 'zoneIdentifier', 'firewallRuleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'action': _params.action,
      'paused': _params.paused,
      'description': _params.description,
      'filter': _params.filter,
    };

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
      'firewall_rule_identifier': _params.firewallRuleIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      FirewallRulesV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateFirewallRule'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/rules/{firewall_rule_identifier}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-User-Token': _params.xAuthUserToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace FirewallRulesV1 {
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
  export interface Empty {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listAllFirewallRules` operation. */
  export interface ListAllFirewallRulesParams {
    /** IBM Cloud user IAM token. */
    xAuthUserToken: string;
    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;
    /** Zone identifier of the zone for which firewall rules are listed. */
    zoneIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createFirewallRules` operation. */
  export interface CreateFirewallRulesParams {
    /** IBM Cloud user IAM token. */
    xAuthUserToken: string;
    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;
    /** Zone identifier of the zone for which firewall rules are created. */
    zoneIdentifier: string;
    /** Json objects which are used to create firewall rules. */
    firewallRuleInputWithFilterId?: FirewallRuleInputWithFilterId[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateFirewllRules` operation. */
  export interface UpdateFirewllRulesParams {
    /** IBM Cloud user IAM token. */
    xAuthUserToken: string;
    /** Full crn of the service instance. */
    crn: string;
    /** Zone identifier (zone id). */
    zoneIdentifier: string;
    firewallRulesUpdateInputItem?: FirewallRulesUpdateInputItem[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteFirewallRules` operation. */
  export interface DeleteFirewallRulesParams {
    /** IBM Cloud user IAM token. */
    xAuthUserToken: string;
    /** Full crn of the service instance. */
    crn: string;
    /** Identifier of zone whose firewall rules are to be deleted. */
    zoneIdentifier: string;
    /** ids of firewall rules which will be deleted. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteFirewallRule` operation. */
  export interface DeleteFirewallRuleParams {
    /** IBM Cloud user IAM token. */
    xAuthUserToken: string;
    /** Full crn of the service instance. */
    crn: string;
    /** Identifier of zone whose firewall rule is to be deleted. */
    zoneIdentifier: string;
    /** Identifier of the firewall rule to be deleted. */
    firewallRuleIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getFirewallRule` operation. */
  export interface GetFirewallRuleParams {
    /** IBM Cloud user IAM token. */
    xAuthUserToken: string;
    /** Full crn of the service instance. */
    crn: string;
    /** Zone identifier (zone id). */
    zoneIdentifier: string;
    /** Identifier of firewall rule for the given zone. */
    firewallRuleIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateFirewallRule` operation. */
  export interface UpdateFirewallRuleParams {
    /** IBM Cloud user IAM token. */
    xAuthUserToken: string;
    /** Full crn of the service instance. */
    crn: string;
    /** Zone identifier (zone id). */
    zoneIdentifier: string;
    /** Identifier of firewall rule. */
    firewallRuleIdentifier: string;
    /** The firewall action to perform, "log" action is only available for enterprise plan instances. */
    action?: UpdateFirewallRuleConstants.Action | string;
    /** Indicates if the firewall rule is active. */
    paused?: boolean;
    /** To briefly describe the firewall rule, omitted from object if empty. */
    description?: string;
    /** An existing filter. */
    filter?: FirewallRuleUpdateInputFilter;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateFirewallRule` operation. */
  export namespace UpdateFirewallRuleConstants {
    /** The firewall action to perform, "log" action is only available for enterprise plan instances. */
    export enum Action {
      LOG = 'log',
      ALLOW = 'allow',
      CHALLENGE = 'challenge',
      JS_CHALLENGE = 'js_challenge',
      BLOCK = 'block',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** Container for response information. */
  export interface DeleteFirewallRuleRespResult {
    /** Identifier of the firewall rule. */
    id: string;
  }

  /** DeleteFirewallRulesRespResultItem. */
  export interface DeleteFirewallRulesRespResultItem {
    /** Identifier of firewall rules. */
    id: string;
  }

  /** An existing filter. */
  export interface FirewallRuleInputWithFilterIdFilter {
    /** Identifier of the filter. */
    id: string;
  }

  /** An existing filter. */
  export interface FirewallRuleObjectFilter {
    /** Identifier of the filter. */
    id: string;
    /** Indicates if the filter is active. */
    paused: boolean;
    /** To briefly describe the filter, omitted from object if empty. */
    description: string;
    /** A filter expression. */
    expression: string;
  }

  /** An existing filter. */
  export interface FirewallRuleUpdateInputFilter {
    /** Identifier of the filter. */
    id: string;
  }

  /** FirewallRulesUpdateInputItem. */
  export interface FirewallRulesUpdateInputItem {
    /** Identifier of the firewall rule. */
    id: string;
    /** The firewall action to perform, "log" action is only available for enterprise plan instances. */
    action: string;
    /** Indicates if the firewall rule is active. */
    paused?: boolean;
    /** To briefly describe the firewall rule, omitted from object if empty. */
    description?: string;
    /** An existing filter. */
    filter?: FirewallRulesUpdateInputItemFilter;
  }

  /** An existing filter. */
  export interface FirewallRulesUpdateInputItemFilter {
    /** Identifier of the filter. */
    id: string;
  }

  /** Statistics of results. */
  export interface ListFirewallRulesRespResultInfo {
    /** Page number. */
    page: number;
    /** Number of results per page. */
    per_page: number;
    /** Number of results. */
    count: number;
    /** Total number of results. */
    total_count: number;
  }

  /** DeleteFirewallRuleResp. */
  export interface DeleteFirewallRuleResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: DeleteFirewallRuleRespResult;
  }

  /** DeleteFirewallRulesResp. */
  export interface DeleteFirewallRulesResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: DeleteFirewallRulesRespResultItem[];
  }

  /** Json objects which are used to create firewall rule. */
  export interface FirewallRuleInputWithFilterId {
    /** An existing filter. */
    filter: FirewallRuleInputWithFilterIdFilter;
    /** The firewall action to perform, "log" action is only available for enterprise plan instances. */
    action: string;
    /** To briefly describe the firewall rule, omitted from object if empty. */
    description?: string;
  }

  /** FirewallRuleObject. */
  export interface FirewallRuleObject {
    /** Identifier of the firewall rule. */
    id: string;
    /** Indicates if the firewall rule is active. */
    paused: boolean;
    /** To briefly describe the firewall rule, omitted from object if empty. */
    description: string;
    /** The firewall action to perform, "log" action is only available for enterprise plan instances. */
    action: string;
    /** An existing filter. */
    filter: FirewallRuleObjectFilter;
    /** The creation date-time of the filter. */
    created_on: string;
    /** The modification date-time of the filter. */
    modified_on: string;
  }

  /** FirewallRuleResp. */
  export interface FirewallRuleResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    result: FirewallRuleObject;
  }

  /** FirewallRulesResp. */
  export interface FirewallRulesResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: FirewallRuleObject[];
  }

  /** ListFirewallRulesResp. */
  export interface ListFirewallRulesResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: FirewallRuleObject[];
    /** Statistics of results. */
    result_info: ListFirewallRulesRespResultInfo;
  }
}

export = FirewallRulesV1;
