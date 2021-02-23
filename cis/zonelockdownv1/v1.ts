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
 * Zone Lockdown
 */

class ZoneLockdownV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'zone_lockdown';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of ZoneLockdownV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {ZoneLockdownV1}
   */

  public static newInstance(options: UserOptions): ZoneLockdownV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new ZoneLockdownV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Full crn of the service instance. */
  crn: string;

  /** Zone identifier (zone id). */
  zoneIdentifier: string;

  /**
   * Construct a ZoneLockdownV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full crn of the service instance.
   * @param {string} options.zoneIdentifier - Zone identifier (zone id).
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ZoneLockdownV1}
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
      this.setServiceUrl(ZoneLockdownV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * zoneLockdownRules
   ************************/

  /**
   * List all lockdown rules.
   *
   * List all lockdown rules for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.page] - Page number of paginated results.
   * @param {number} [params.perPage] - Maximum number of lockdown rules per page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneLockdownV1.Response<ZoneLockdownV1.ListLockdownResp>>}
   */
  public listAllZoneLockownRules(params?: ZoneLockdownV1.ListAllZoneLockownRulesParams): Promise<ZoneLockdownV1.Response<ZoneLockdownV1.ListLockdownResp>> {
    const _params = Object.assign({}, params);

    const query = {
      'page': _params.page,
      'per_page': _params.perPage
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneLockdownV1.DEFAULT_SERVICE_NAME, 'v1', 'listAllZoneLockownRules');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/lockdowns',
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
   * Create lockdown rule.
   *
   * Create a new lockdown rule for a given zone under a service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string[]} [params.urls] - URLs to be included in this rule definition. Wildcards are permitted. The URL
   * pattern entered here will be escaped before use. This limits the URL to just simple wildcard patterns.
   * @param {LockdownInputConfigurationsItem[]} [params.configurations] - List of IP addresses or CIDR ranges to use for
   * this rule. This can include any number of ip or ip_range configurations that can access the provided URLs.
   * @param {string} [params.id] - Lockdown rule identifier.
   * @param {boolean} [params.paused] - Whether this zone lockdown is currently paused.
   * @param {string} [params.description] - A note that you can use to describe the reason for a Lockdown rule.
   * @param {number} [params.priority] - firewall priority.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneLockdownV1.Response<ZoneLockdownV1.LockdownResp>>}
   */
  public createZoneLockdownRule(params?: ZoneLockdownV1.CreateZoneLockdownRuleParams): Promise<ZoneLockdownV1.Response<ZoneLockdownV1.LockdownResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'urls': _params.urls,
      'configurations': _params.configurations,
      'id': _params.id,
      'paused': _params.paused,
      'description': _params.description,
      'priority': _params.priority
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneLockdownV1.DEFAULT_SERVICE_NAME, 'v1', 'createZoneLockdownRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/lockdowns',
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
   * Delete lockdown rule.
   *
   * Delete a lockdown rule for a particular zone, given its id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.lockdownRuleIdentifier - Identifier of the lockdown rule to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneLockdownV1.Response<ZoneLockdownV1.DeleteLockdownResp>>}
   */
  public deleteZoneLockdownRule(params: ZoneLockdownV1.DeleteZoneLockdownRuleParams): Promise<ZoneLockdownV1.Response<ZoneLockdownV1.DeleteLockdownResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['lockdownRuleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'lockdown_rule_identifier': _params.lockdownRuleIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneLockdownV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteZoneLockdownRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/lockdowns/{lockdown_rule_identifier}',
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
   * Get lockdown rule.
   *
   * For a given service instance, zone id and lockdown rule id, get the lockdown rule details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.lockdownRuleIdentifier - Identifier of lockdown rule for the given zone.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneLockdownV1.Response<ZoneLockdownV1.LockdownResp>>}
   */
  public getLockdown(params: ZoneLockdownV1.GetLockdownParams): Promise<ZoneLockdownV1.Response<ZoneLockdownV1.LockdownResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['lockdownRuleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'lockdown_rule_identifier': _params.lockdownRuleIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneLockdownV1.DEFAULT_SERVICE_NAME, 'v1', 'getLockdown');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/lockdowns/{lockdown_rule_identifier}',
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
   * Update lockdown rule.
   *
   * Update an existing lockdown rule for a given zone under a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.lockdownRuleIdentifier - Identifier of lockdown rule.
   * @param {string[]} [params.urls] - URLs to be included in this rule definition. Wildcards are permitted. The URL
   * pattern entered here will be escaped before use. This limits the URL to just simple wildcard patterns.
   * @param {LockdownInputConfigurationsItem[]} [params.configurations] - List of IP addresses or CIDR ranges to use for
   * this rule. This can include any number of ip or ip_range configurations that can access the provided URLs.
   * @param {string} [params.id] - Lockdown rule identifier.
   * @param {boolean} [params.paused] - Whether this zone lockdown is currently paused.
   * @param {string} [params.description] - A note that you can use to describe the reason for a Lockdown rule.
   * @param {number} [params.priority] - firewall priority.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneLockdownV1.Response<ZoneLockdownV1.LockdownResp>>}
   */
  public updateLockdownRule(params: ZoneLockdownV1.UpdateLockdownRuleParams): Promise<ZoneLockdownV1.Response<ZoneLockdownV1.LockdownResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['lockdownRuleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'urls': _params.urls,
      'configurations': _params.configurations,
      'id': _params.id,
      'paused': _params.paused,
      'description': _params.description,
      'priority': _params.priority
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'lockdown_rule_identifier': _params.lockdownRuleIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneLockdownV1.DEFAULT_SERVICE_NAME, 'v1', 'updateLockdownRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/lockdowns/{lockdown_rule_identifier}',
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

namespace ZoneLockdownV1 {

  /** Options for the `ZoneLockdownV1` constructor. */
  export interface Options extends UserOptions {

    /** Full crn of the service instance. */
    crn: string;

    /** Zone identifier (zone id). */
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

  /** Parameters for the `listAllZoneLockownRules` operation. */
  export interface ListAllZoneLockownRulesParams {
    /** Page number of paginated results. */
    page?: number;
    /** Maximum number of lockdown rules per page. */
    perPage?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createZoneLockdownRule` operation. */
  export interface CreateZoneLockdownRuleParams {
    /** URLs to be included in this rule definition. Wildcards are permitted. The URL pattern entered here will be
     *  escaped before use. This limits the URL to just simple wildcard patterns.
     */
    urls?: string[];
    /** List of IP addresses or CIDR ranges to use for this rule. This can include any number of ip or ip_range
     *  configurations that can access the provided URLs.
     */
    configurations?: LockdownInputConfigurationsItem[];
    /** Lockdown rule identifier. */
    id?: string;
    /** Whether this zone lockdown is currently paused. */
    paused?: boolean;
    /** A note that you can use to describe the reason for a Lockdown rule. */
    description?: string;
    /** firewall priority. */
    priority?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteZoneLockdownRule` operation. */
  export interface DeleteZoneLockdownRuleParams {
    /** Identifier of the lockdown rule to be deleted. */
    lockdownRuleIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLockdown` operation. */
  export interface GetLockdownParams {
    /** Identifier of lockdown rule for the given zone. */
    lockdownRuleIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateLockdownRule` operation. */
  export interface UpdateLockdownRuleParams {
    /** Identifier of lockdown rule. */
    lockdownRuleIdentifier: string;
    /** URLs to be included in this rule definition. Wildcards are permitted. The URL pattern entered here will be
     *  escaped before use. This limits the URL to just simple wildcard patterns.
     */
    urls?: string[];
    /** List of IP addresses or CIDR ranges to use for this rule. This can include any number of ip or ip_range
     *  configurations that can access the provided URLs.
     */
    configurations?: LockdownInputConfigurationsItem[];
    /** Lockdown rule identifier. */
    id?: string;
    /** Whether this zone lockdown is currently paused. */
    paused?: boolean;
    /** A note that you can use to describe the reason for a Lockdown rule. */
    description?: string;
    /** firewall priority. */
    priority?: number;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Container for response information. */
  export interface DeleteLockdownRespResult {
    /** ID. */
    id: string;
  }

  /** Statistics of results. */
  export interface ListLockdownRespResultInfo {
    /** Page number. */
    page: number;
    /** Number of results per page. */
    per_page: number;
    /** Number of results. */
    count: number;
    /** Total number of results. */
    total_count: number;
  }

  /** LockdownInputConfigurationsItem. */
  export interface LockdownInputConfigurationsItem {
    /** properties. */
    target: string;
    /** IP addresses or CIDR, if target is "ip", then value should be an IP addresses, otherwise CIDR. */
    value: string;
  }

  /** LockdownObjectConfigurationsItem. */
  export interface LockdownObjectConfigurationsItem {
    /** target. */
    target: string;
    /** IP addresses or CIDR, if target is "ip", then value should be an IP addresses, otherwise CIDR. */
    value: string;
  }

  /** delete lockdown response. */
  export interface DeleteLockdownResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: DeleteLockdownRespResult;
  }

  /** list lockdown response. */
  export interface ListLockdownResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: LockdownObject[];
    /** Statistics of results. */
    result_info: ListLockdownRespResultInfo;
  }

  /** lockdown object. */
  export interface LockdownObject {
    /** Lockdown rule identifier. */
    id: string;
    /** firewall priority. */
    priority?: number;
    /** Whether this zone lockdown is currently paused. */
    paused: boolean;
    /** A note that you can use to describe the reason for a Lockdown rule. */
    description: string;
    /** URLs to be included in this rule definition. Wildcards are permitted. The URL pattern entered here will be
     *  escaped before use. This limits the URL to just simple wildcard patterns.
     */
    urls: string[];
    /** List of IP addresses or CIDR ranges to use for this rule. This can include any number of ip or ip_range
     *  configurations that can access the provided URLs.
     */
    configurations: LockdownObjectConfigurationsItem[];
  }

  /** lockdown response. */
  export interface LockdownResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** lockdown object. */
    result: LockdownObject;
  }

}

export = ZoneLockdownV1;
