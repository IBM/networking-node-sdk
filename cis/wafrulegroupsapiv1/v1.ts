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
 * This document describes CIS WAF Rule Groups API.
 */

class WafRuleGroupsApiV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'waf_rule_groups_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of WafRuleGroupsApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {WafRuleGroupsApiV1}
   */

  public static newInstance(options: UserOptions): WafRuleGroupsApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new WafRuleGroupsApiV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** cloud resource name. */
  crn: string;

  /** Zone ID. */
  zoneId: string;

  /**
   * Construct a WafRuleGroupsApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - cloud resource name.
   * @param {string} options.zoneId - Zone ID.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {WafRuleGroupsApiV1}
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
      this.setServiceUrl(WafRuleGroupsApiV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneId = options.zoneId;
  }

  /*************************
   * wAFRuleGroups
   ************************/

  /**
   * List all WAF rule groups.
   *
   * List all WAF rule groups contained within a package.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pkgId - Package ID.
   * @param {string} [params.name] - Name of the firewall package.
   * @param {string} [params.mode] - Whether or not the rules contained within this group are configurable/usable.
   * @param {string} [params.rulesCount] - How many rules are contained within this group.
   * @param {number} [params.page] - Page number of paginated results.
   * @param {number} [params.perPage] - Number of packages per page.
   * @param {string} [params.order] - Field to order packages by.
   * @param {string} [params.direction] - Direction to order packages.
   * @param {string} [params.match] - Whether to match all search requirements or at least one (any).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WafRuleGroupsApiV1.Response<WafRuleGroupsApiV1.WafGroupsResponse>>}
   */
  public listWafRuleGroups(params: WafRuleGroupsApiV1.ListWafRuleGroupsParams): Promise<WafRuleGroupsApiV1.Response<WafRuleGroupsApiV1.WafGroupsResponse>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['pkgId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'name': _params.name,
      'mode': _params.mode,
      'rules_count': _params.rulesCount,
      'page': _params.page,
      'per_page': _params.perPage,
      'order': _params.order,
      'direction': _params.direction,
      'match': _params.match
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'pkg_id': _params.pkgId
    };

    const sdkHeaders = getSdkHeaders(WafRuleGroupsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listWafRuleGroups');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/firewall/waf/packages/{pkg_id}/groups',
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
   * Get WAF rule group.
   *
   * Get a single WAF rule group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pkgId - Package ID.
   * @param {string} params.groupId - Group ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WafRuleGroupsApiV1.Response<WafRuleGroupsApiV1.WafGroupResponse>>}
   */
  public getWafRuleGroup(params: WafRuleGroupsApiV1.GetWafRuleGroupParams): Promise<WafRuleGroupsApiV1.Response<WafRuleGroupsApiV1.WafGroupResponse>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['pkgId', 'groupId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'pkg_id': _params.pkgId,
      'group_id': _params.groupId
    };

    const sdkHeaders = getSdkHeaders(WafRuleGroupsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getWafRuleGroup');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/firewall/waf/packages/{pkg_id}/groups/{group_id}',
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
   * Update WAF rule group.
   *
   * Update the state of a WAF rule group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pkgId - Package ID.
   * @param {string} params.groupId - Group ID.
   * @param {string} [params.mode] - Whether or not the rules contained within this group are configurable/usable.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WafRuleGroupsApiV1.Response<WafRuleGroupsApiV1.WafGroupResponse>>}
   */
  public updateWafRuleGroup(params: WafRuleGroupsApiV1.UpdateWafRuleGroupParams): Promise<WafRuleGroupsApiV1.Response<WafRuleGroupsApiV1.WafGroupResponse>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['pkgId', 'groupId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'mode': _params.mode
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'pkg_id': _params.pkgId,
      'group_id': _params.groupId
    };

    const sdkHeaders = getSdkHeaders(WafRuleGroupsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateWafRuleGroup');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/firewall/waf/packages/{pkg_id}/groups/{group_id}',
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

namespace WafRuleGroupsApiV1 {

  /** Options for the `WafRuleGroupsApiV1` constructor. */
  export interface Options extends UserOptions {

    /** cloud resource name. */
    crn: string;

    /** Zone ID. */
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

  /** Parameters for the `listWafRuleGroups` operation. */
  export interface ListWafRuleGroupsParams {
    /** Package ID. */
    pkgId: string;
    /** Name of the firewall package. */
    name?: string;
    /** Whether or not the rules contained within this group are configurable/usable. */
    mode?: ListWafRuleGroupsConstants.Mode | string;
    /** How many rules are contained within this group. */
    rulesCount?: string;
    /** Page number of paginated results. */
    page?: number;
    /** Number of packages per page. */
    perPage?: number;
    /** Field to order packages by. */
    order?: string;
    /** Direction to order packages. */
    direction?: ListWafRuleGroupsConstants.Direction | string;
    /** Whether to match all search requirements or at least one (any). */
    match?: ListWafRuleGroupsConstants.Match | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listWafRuleGroups` operation. */
  export namespace ListWafRuleGroupsConstants {
    /** Whether or not the rules contained within this group are configurable/usable. */
    export enum Mode {
      ON = 'on',
      OFF = 'off',
    }
    /** Direction to order packages. */
    export enum Direction {
      DESC = 'desc',
      ASC = 'asc',
    }
    /** Whether to match all search requirements or at least one (any). */
    export enum Match {
      ALL = 'all',
      ANY = 'any',
    }
  }

  /** Parameters for the `getWafRuleGroup` operation. */
  export interface GetWafRuleGroupParams {
    /** Package ID. */
    pkgId: string;
    /** Group ID. */
    groupId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateWafRuleGroup` operation. */
  export interface UpdateWafRuleGroupParams {
    /** Package ID. */
    pkgId: string;
    /** Group ID. */
    groupId: string;
    /** Whether or not the rules contained within this group are configurable/usable. */
    mode?: UpdateWafRuleGroupConstants.Mode | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateWafRuleGroup` operation. */
  export namespace UpdateWafRuleGroupConstants {
    /** Whether or not the rules contained within this group are configurable/usable. */
    export enum Mode {
      ON = 'on',
      OFF = 'off',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** Statistics of results. */
  export interface WafGroupResponseResultInfo {
    /** Page number. */
    page: number;
    /** Number of results per page. */
    per_page: number;
    /** Number of results. */
    count: number;
    /** Total number of results. */
    total_count: number;
  }

  /** Statistics of results. */
  export interface WafGroupsResponseResultInfo {
    /** Page number. */
    page: number;
    /** Number of results per page. */
    per_page: number;
    /** Number of results. */
    count: number;
    /** Total number of results. */
    total_count: number;
  }

  /** waf group response. */
  export interface WafGroupResponse {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** waf rule properties. */
    result: WafRuleProperties;
    /** Statistics of results. */
    result_info: WafGroupResponseResultInfo;
  }

  /** waf groups response. */
  export interface WafGroupsResponse {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: WafRuleProperties[];
    /** Statistics of results. */
    result_info: WafGroupsResponseResultInfo;
  }

  /** waf rule properties. */
  export interface WafRuleProperties {
    /** ID. */
    id?: string;
    /** Name. */
    name?: string;
    /** Description. */
    description?: string;
    /** Number of rules. */
    rules_count?: number;
    /** Number of modified rules. */
    modified_rules_count?: number;
    /** Package ID. */
    package_id?: string;
    /** Mode. */
    mode?: string;
    /** Allowed Modes. */
    allowed_modes?: string[];
  }

}

export = WafRuleGroupsApiV1;
