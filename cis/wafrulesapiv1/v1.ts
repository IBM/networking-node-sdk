/**
 * (C) Copyright IBM Corp. 2020.
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
 * This document describes CIS WAF Rules API.
 */

class WafRulesApiV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'waf_rules_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of WafRulesApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {WafRulesApiV1}
   */

  public static newInstance(options: UserOptions): WafRulesApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new WafRulesApiV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** cloud resource name. */
  crn: string;

  /** zone id. */
  zoneId: string;

  /**
   * Construct a WafRulesApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - cloud resource name.
   * @param {string} options.zoneId - zone id.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {WafRulesApiV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const requiredParams = ['crn','zoneId'];
    const missingParams = getMissingParams(options, requiredParams);
    if (missingParams) {
      throw missingParams;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(WafRulesApiV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneId = options.zoneId;
  }

  /*************************
   * wAFRules
   ************************/

  /**
   * List all WAF rules.
   *
   * List all Web Application Firewall (WAF) rules.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.packageId - package id.
   * @param {string} [params.mode] - The Rule Mode.
   * @param {string} [params.priority] - The order in which the individual rule is executed within the related group.
   * @param {string} [params.match] - Whether to match all search requirements or at least one. default value: all.
   * valid values: any, all.
   * @param {string} [params.order] - Field to order rules by. valid values: priority, group_id, description.
   * @param {string} [params.groupId] - WAF group identifier tag. max length: 32; Read-only.
   * @param {string} [params.description] - Public description of the rule.
   * @param {string} [params.direction] - Direction to order rules. valid values: asc, desc.
   * @param {number} [params.page] - Page number of paginated results. default value: 1; min value:1.
   * @param {number} [params.perPage] - Number of rules per page. default value: 50; min value:5; max value:100.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WafRulesApiV1.Response<WafRulesApiV1.WafRulesResponse>>}
   */
  public listWafRules(params: WafRulesApiV1.ListWafRulesParams): Promise<WafRulesApiV1.Response<WafRulesApiV1.WafRulesResponse>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['packageId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'mode': _params.mode,
      'priority': _params.priority,
      'match': _params.match,
      'order': _params.order,
      'group_id': _params.groupId,
      'description': _params.description,
      'direction': _params.direction,
      'page': _params.page,
      'per_page': _params.perPage
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'package_id': _params.packageId
    };

    const sdkHeaders = getSdkHeaders(WafRulesApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listWafRules');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/firewall/waf/packages/{package_id}/rules',
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
   * Get WAF rule.
   *
   * Get individual information about a rule.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.packageId - package id.
   * @param {string} params.identifier - rule identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WafRulesApiV1.Response<WafRulesApiV1.WafRuleResponse>>}
   */
  public getWafRule(params: WafRulesApiV1.GetWafRuleParams): Promise<WafRulesApiV1.Response<WafRulesApiV1.WafRuleResponse>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['packageId', 'identifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'package_id': _params.packageId,
      'identifier': _params.identifier
    };

    const sdkHeaders = getSdkHeaders(WafRulesApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getWafRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/firewall/waf/packages/{package_id}/rules/{identifier}',
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
   * Update WAF rule.
   *
   * Update the action the rule will perform if triggered on the zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.packageId - package id.
   * @param {string} params.identifier - rule identifier.
   * @param {WafRuleBodyCis} [params.cis] - cis package.
   * @param {WafRuleBodyOwasp} [params.owasp] - owasp package.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WafRulesApiV1.Response<WafRulesApiV1.WafRuleResponse>>}
   */
  public updateWafRule(params: WafRulesApiV1.UpdateWafRuleParams): Promise<WafRulesApiV1.Response<WafRulesApiV1.WafRuleResponse>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['packageId', 'identifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'cis': _params.cis,
      'owasp': _params.owasp
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'package_id': _params.packageId,
      'identifier': _params.identifier
    };

    const sdkHeaders = getSdkHeaders(WafRulesApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateWafRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/firewall/waf/packages/{package_id}/rules/{identifier}',
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

namespace WafRulesApiV1 {

  /** Options for the `WafRulesApiV1` constructor. */
  export interface Options extends UserOptions {

    /** cloud resource name. */
    crn: string;

    /** zone id. */
    zoneId: string;
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

  /** Parameters for the `listWafRules` operation. */
  export interface ListWafRulesParams {
    /** package id. */
    packageId: string;
    /** The Rule Mode. */
    mode?: ListWafRulesConstants.Mode | string;
    /** The order in which the individual rule is executed within the related group. */
    priority?: string;
    /** Whether to match all search requirements or at least one. default value: all. valid values: any, all. */
    match?: string;
    /** Field to order rules by. valid values: priority, group_id, description. */
    order?: string;
    /** WAF group identifier tag. max length: 32; Read-only. */
    groupId?: string;
    /** Public description of the rule. */
    description?: string;
    /** Direction to order rules. valid values: asc, desc. */
    direction?: string;
    /** Page number of paginated results. default value: 1; min value:1. */
    page?: number;
    /** Number of rules per page. default value: 50; min value:5; max value:100. */
    perPage?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listWafRules` operation. */
  export namespace ListWafRulesConstants {
    /** The Rule Mode. */
    export enum Mode {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getWafRule` operation. */
  export interface GetWafRuleParams {
    /** package id. */
    packageId: string;
    /** rule identifier. */
    identifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateWafRule` operation. */
  export interface UpdateWafRuleParams {
    /** package id. */
    packageId: string;
    /** rule identifier. */
    identifier: string;
    /** cis package. */
    cis?: WafRuleBodyCis;
    /** owasp package. */
    owasp?: WafRuleBodyOwasp;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** cis package. */
  export interface WafRuleBodyCis {
    /** mode to choose from. */
    mode: string;
  }

  /** owasp package. */
  export interface WafRuleBodyOwasp {
    /** mode to choose from. 'owasp' limited modes - on and off. */
    mode: string;
  }

  /** Information about a Rule. */
  export interface WafRuleResponseResult {
    /** ID. */
    id?: string;
    /** description. */
    description?: string;
    /** priority. */
    priority?: string;
    /** group definition. */
    group?: WafRuleResponseResultGroup;
    /** package id. */
    package_id?: string;
    /** allowed modes. */
    allowed_modes?: string[];
    /** mode. */
    mode?: string;
  }

  /** group definition. */
  export interface WafRuleResponseResultGroup {
    /** group id. */
    id?: string;
    /** group name. */
    name?: string;
  }

  /** result information. */
  export interface WafRulesResponseResultInfo {
    /** current page. */
    page?: number;
    /** number of data per page. */
    per_page?: number;
    /** count. */
    count?: number;
    /** total count of data. */
    total_count?: number;
  }

  /** WafRulesResponseResultItem. */
  export interface WafRulesResponseResultItem {
    /** ID. */
    id?: string;
    /** description. */
    description?: string;
    /** priority. */
    priority?: string;
    /** group definition. */
    group?: WafRulesResponseResultItemGroup;
    /** package id. */
    package_id?: string;
    /** allowed modes. */
    allowed_modes?: string[];
    /** mode. */
    mode?: string;
  }

  /** group definition. */
  export interface WafRulesResponseResultItemGroup {
    /** group id. */
    id?: string;
    /** group name. */
    name?: string;
  }

  /** waf rule response. */
  export interface WafRuleResponse {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Information about a Rule. */
    result: WafRuleResponseResult;
  }

  /** waf rule response. */
  export interface WafRulesResponse {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Array of Rules. */
    result: WafRulesResponseResultItem[];
    /** result information. */
    result_info?: WafRulesResponseResultInfo;
  }

}

export = WafRulesApiV1;
