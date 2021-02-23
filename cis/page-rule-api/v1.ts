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
 * This document describes CIS Pagerule API.
 */

class PageRuleApiV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'page_rule_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of PageRuleApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {PageRuleApiV1}
   */

  public static newInstance(options: UserOptions): PageRuleApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new PageRuleApiV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** instance id. */
  crn: string;

  /** zone id. */
  zoneId: string;

  /**
   * Construct a PageRuleApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - instance id.
   * @param {string} options.zoneId - zone id.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {PageRuleApiV1}
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
      this.setServiceUrl(PageRuleApiV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneId = options.zoneId;
  }

  /*************************
   * pageRules
   ************************/

  /**
   * Get page rule.
   *
   * Get a page rule details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.ruleId - rule id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PageRuleApiV1.Response<PageRuleApiV1.PageRulesResponseWithoutResultInfo>>}
   */
  public getPageRule(params: PageRuleApiV1.GetPageRuleParams): Promise<PageRuleApiV1.Response<PageRuleApiV1.PageRulesResponseWithoutResultInfo>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['ruleId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'rule_id': _params.ruleId
    };

    const sdkHeaders = getSdkHeaders(PageRuleApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getPageRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/pagerules/{rule_id}',
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
   * Change page rule.
   *
   * Change a page rule.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.ruleId - rule id.
   * @param {TargetsItem[]} [params.targets] - targets.
   * @param {PageRulesBodyActionsItem[]} [params.actions] - actions.
   * @param {number} [params.priority] - priority.
   * @param {string} [params.status] - status.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PageRuleApiV1.Response<PageRuleApiV1.PageRulesResponseWithoutResultInfo>>}
   */
  public changePageRule(params: PageRuleApiV1.ChangePageRuleParams): Promise<PageRuleApiV1.Response<PageRuleApiV1.PageRulesResponseWithoutResultInfo>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['ruleId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'targets': _params.targets,
      'actions': _params.actions,
      'priority': _params.priority,
      'status': _params.status
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'rule_id': _params.ruleId
    };

    const sdkHeaders = getSdkHeaders(PageRuleApiV1.DEFAULT_SERVICE_NAME, 'v1', 'changePageRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/pagerules/{rule_id}',
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

  /**
   * Update page rule.
   *
   * Replace a page rule. The final rule will exactly match the data passed with this request.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.ruleId - rule id.
   * @param {TargetsItem[]} [params.targets] - targets.
   * @param {PageRulesBodyActionsItem[]} [params.actions] - actions.
   * @param {number} [params.priority] - priority.
   * @param {string} [params.status] - status.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PageRuleApiV1.Response<PageRuleApiV1.PageRulesResponseWithoutResultInfo>>}
   */
  public updatePageRule(params: PageRuleApiV1.UpdatePageRuleParams): Promise<PageRuleApiV1.Response<PageRuleApiV1.PageRulesResponseWithoutResultInfo>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['ruleId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'targets': _params.targets,
      'actions': _params.actions,
      'priority': _params.priority,
      'status': _params.status
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'rule_id': _params.ruleId
    };

    const sdkHeaders = getSdkHeaders(PageRuleApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updatePageRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/pagerules/{rule_id}',
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

  /**
   * Delete page rule.
   *
   * Delete a page rule.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.ruleId - rule id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PageRuleApiV1.Response<PageRuleApiV1.PageRulesDeleteResponse>>}
   */
  public deletePageRule(params: PageRuleApiV1.DeletePageRuleParams): Promise<PageRuleApiV1.Response<PageRuleApiV1.PageRulesDeleteResponse>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['ruleId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'rule_id': _params.ruleId
    };

    const sdkHeaders = getSdkHeaders(PageRuleApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deletePageRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/pagerules/{rule_id}',
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
   * List page rules.
   *
   * List page rules.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.status] - default value: disabled. valid values: active, disabled.
   * @param {string} [params.order] - default value: priority. valid values: status, priority.
   * @param {string} [params.direction] - default value: desc. valid values: asc, desc.
   * @param {string} [params.match] - default value: all. valid values: any, all.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PageRuleApiV1.Response<PageRuleApiV1.PageRulesResponseListAll>>}
   */
  public listPageRules(params?: PageRuleApiV1.ListPageRulesParams): Promise<PageRuleApiV1.Response<PageRuleApiV1.PageRulesResponseListAll>> {
    const _params = Object.assign({}, params);

    const query = {
      'status': _params.status,
      'order': _params.order,
      'direction': _params.direction,
      'match': _params.match
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(PageRuleApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listPageRules');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/pagerules',
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
   * Create page rule.
   *
   * Create a page rule.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {TargetsItem[]} [params.targets] - targets.
   * @param {PageRulesBodyActionsItem[]} [params.actions] - actions.
   * @param {number} [params.priority] - priority.
   * @param {string} [params.status] - status.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PageRuleApiV1.Response<PageRuleApiV1.PageRulesResponseWithoutResultInfo>>}
   */
  public createPageRule(params?: PageRuleApiV1.CreatePageRuleParams): Promise<PageRuleApiV1.Response<PageRuleApiV1.PageRulesResponseWithoutResultInfo>> {
    const _params = Object.assign({}, params);

    const body = {
      'targets': _params.targets,
      'actions': _params.actions,
      'priority': _params.priority,
      'status': _params.status
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(PageRuleApiV1.DEFAULT_SERVICE_NAME, 'v1', 'createPageRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/pagerules',
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

}

/*************************
 * interfaces
 ************************/

namespace PageRuleApiV1 {

  /** Options for the `PageRuleApiV1` constructor. */
  export interface Options extends UserOptions {

    /** instance id. */
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

  /** Parameters for the `getPageRule` operation. */
  export interface GetPageRuleParams {
    /** rule id. */
    ruleId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `changePageRule` operation. */
  export interface ChangePageRuleParams {
    /** rule id. */
    ruleId: string;
    /** targets. */
    targets?: TargetsItem[];
    /** actions. */
    actions?: PageRulesBodyActionsItem[];
    /** priority. */
    priority?: number;
    /** status. */
    status?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updatePageRule` operation. */
  export interface UpdatePageRuleParams {
    /** rule id. */
    ruleId: string;
    /** targets. */
    targets?: TargetsItem[];
    /** actions. */
    actions?: PageRulesBodyActionsItem[];
    /** priority. */
    priority?: number;
    /** status. */
    status?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deletePageRule` operation. */
  export interface DeletePageRuleParams {
    /** rule id. */
    ruleId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listPageRules` operation. */
  export interface ListPageRulesParams {
    /** default value: disabled. valid values: active, disabled. */
    status?: string;
    /** default value: priority. valid values: status, priority. */
    order?: string;
    /** default value: desc. valid values: asc, desc. */
    direction?: string;
    /** default value: all. valid values: any, all. */
    match?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createPageRule` operation. */
  export interface CreatePageRuleParams {
    /** targets. */
    targets?: TargetsItem[];
    /** actions. */
    actions?: PageRulesBodyActionsItem[];
    /** priority. */
    priority?: number;
    /** status. */
    status?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** value. */
  export interface ActionsForwardingUrlValue {
    /** url. */
    url?: string;
    /** status code. */
    status_code?: number;
  }

  /** PageRulesBodyActionsItem. */
  export interface PageRulesBodyActionsItem {
    /** " Page rule action field map from UI to API
     *      CF-UI                    map             API,
     *  'Disable Security'           to        'disable_security',
     *  'Browser Integrity Check'    to        'browser_check',
     *  'Server Side Excludes'       to        'server_side_exclude',
     *  'SSL'                        to        'ssl',
     *  'Browser Cache TTL'          to        'browser_cache_ttl',
     *  'Always Online'              to        'always_online',
     *  'Security Level'             to        'security_level',
     *  'Cache Level'                to        'cache_level',
     *  'Edge Cache TTL'             to        'edge_cache_ttl'
     *  'IP Geolocation Header'      to        'ip_geolocation,
     *  'Email Obfuscation'          to        'email_obfuscation',
     *  'Automatic HTTPS Rewrites'   to        'automatic_https_rewrites',
     *  'Opportunistic Encryption'   to        'opportunistic_encryption',
     *  'Forwarding URL'             to        'forwarding_url',
     *  'Always Use HTTPS'           to        'always_use_https',
     *  'Origin Cache Control'       to        'explicit_cache_control',
     *  'Bypass Cache on Cookie'     to        'bypass_cache_on_cookie',
     *  'Cache Deception Armor'      to        'cache_deception_armor',
     *  'WAF'                        to        'waf'
     *
     *                    Page rule conflict list
     *  "forwarding_url"             with     all other settings for the rules
     *  "always_use_https"           with     all other settings for the rules
     *  "disable_security"           with     "email_obfuscation", "server_side_exclude", "waf"
     *  ".
     */
    id: string;
    /** value. */
    value?: any;
  }

  /** result. */
  export interface PageRulesDeleteResponseResult {
    /** identifier. */
    id: string;
  }

  /** items. */
  export interface TargetsItem {
    /** target. */
    target: string;
    /** constraint. */
    constraint: TargetsItemConstraint;
  }

  /** constraint. */
  export interface TargetsItemConstraint {
    /** operator. */
    operator: string;
    /** value. */
    value: string;
  }

  /** page rules delete response. */
  export interface PageRulesDeleteResponse {
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: PageRulesDeleteResponseResult;
  }

  /** page rule response list all. */
  export interface PageRulesResponseListAll {
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: PageRuleResult[];
  }

  /** page rule response without result information. */
  export interface PageRulesResponseWithoutResultInfo {
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** page rule result. */
    result: PageRuleResult;
  }

  /** page rule result. */
  export interface PageRuleResult {
    /** identifier. */
    id: string;
    /** targets. */
    targets: TargetsItem[];
    /** actions. */
    actions: PageRulesBodyActionsItem[];
    /** priority. */
    priority: number;
    /** status. */
    status: string;
    /** modified date. */
    modified_on: string;
    /** created date. */
    created_on: string;
  }

  /** bypass cache on cookie actions. */
  export interface PageRulesBodyActionsItemActionsBypassCacheOnCookie extends PageRulesBodyActionsItem {
    /** identifier. */
    id: string;
    /** value. */
    value?: string;
  }

  /** cache level actions. */
  export interface PageRulesBodyActionsItemActionsCacheLevel extends PageRulesBodyActionsItem {
    /** identifier. */
    id: string;
    /** value. */
    value?: string;
  }

  /** edge cache ttl actions. */
  export interface PageRulesBodyActionsItemActionsEdgeCacheTtl extends PageRulesBodyActionsItem {
    /** identifier. */
    id: string;
    /** ttl value. */
    value?: number;
  }

  /** forwarding url actions. */
  export interface PageRulesBodyActionsItemActionsForwardingUrl extends PageRulesBodyActionsItem {
    /** identifier. */
    id: string;
    /** value. */
    value?: ActionsForwardingUrlValue;
  }

  /** security actions. */
  export interface PageRulesBodyActionsItemActionsSecurity extends PageRulesBodyActionsItem {
    /** identifier. */
    id: string;
  }

  /** security level actions. */
  export interface PageRulesBodyActionsItemActionsSecurityLevel extends PageRulesBodyActionsItem {
    /** identifier. */
    id: string;
    /** value. */
    value?: string;
  }

  /** security options. */
  export interface PageRulesBodyActionsItemActionsSecurityOptions extends PageRulesBodyActionsItem {
    /** identifier. */
    id: string;
    /** value. */
    value?: string;
  }

  /** ssl actions. */
  export interface PageRulesBodyActionsItemActionsSsl extends PageRulesBodyActionsItem {
    /** identifier. */
    id: string;
    /** value. */
    value?: string;
  }

  /** ttl actions. */
  export interface PageRulesBodyActionsItemActionsTtl extends PageRulesBodyActionsItem {
    /** identifier. */
    id: string;
    /** value. */
    value?: number;
  }

}

export = PageRuleApiV1;
