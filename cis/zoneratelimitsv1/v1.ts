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
 * Zone Rate Limits
 */

class ZoneRateLimitsV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'zone_rate_limits';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of ZoneRateLimitsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {ZoneRateLimitsV1}
   */

  public static newInstance(options: UserOptions): ZoneRateLimitsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new ZoneRateLimitsV1(options);
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
   * Construct a ZoneRateLimitsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full crn of the service instance.
   * @param {string} options.zoneIdentifier - Zone identifier (zone id).
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ZoneRateLimitsV1}
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
      this.setServiceUrl(ZoneRateLimitsV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * zoneRateLimits
   ************************/

  /**
   * List all rate limits.
   *
   * The details of Rate Limit for a given zone under a given service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.page] - Page number of paginated results.
   * @param {number} [params.perPage] - Maximum number of rate limits per page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneRateLimitsV1.Response<ZoneRateLimitsV1.ListRatelimitResp>>}
   */
  public listAllZoneRateLimits(params?: ZoneRateLimitsV1.ListAllZoneRateLimitsParams): Promise<ZoneRateLimitsV1.Response<ZoneRateLimitsV1.ListRatelimitResp>> {
    const _params = Object.assign({}, params);

    const query = {
      'page': _params.page,
      'per_page': _params.perPage
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneRateLimitsV1.DEFAULT_SERVICE_NAME, 'v1', 'listAllZoneRateLimits');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rate_limits',
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
   * Create rate limit.
   *
   * Create a new rate limit for a given zone under a service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.threshold] - The threshold that triggers the rate limit mitigations, combine with period.
   * i.e. threshold per period.
   * @param {number} [params.period] - The time in seconds to count matching traffic. If the count exceeds threshold
   * within this period the action will be performed.
   * @param {RatelimitInputAction} [params.action] - action.
   * @param {RatelimitInputMatch} [params.match] - Determines which traffic the rate limit counts towards the threshold.
   * Needs to be one of "request" or "response" objects.
   * @param {boolean} [params.disabled] - Whether this ratelimit is currently disabled.
   * @param {string} [params.description] - A note that you can use to describe the reason for a rate limit.
   * @param {RatelimitInputBypassItem[]} [params.bypass] - Criteria that would allow the rate limit to be bypassed, for
   * example to express that you shouldn't apply a rate limit to a given set of URLs.
   * @param {RatelimitInputCorrelate} [params.correlate] - Enable NAT based rate limits.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneRateLimitsV1.Response<ZoneRateLimitsV1.RatelimitResp>>}
   */
  public createZoneRateLimits(params?: ZoneRateLimitsV1.CreateZoneRateLimitsParams): Promise<ZoneRateLimitsV1.Response<ZoneRateLimitsV1.RatelimitResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'threshold': _params.threshold,
      'period': _params.period,
      'action': _params.action,
      'match': _params.match,
      'disabled': _params.disabled,
      'description': _params.description,
      'bypass': _params.bypass,
      'correlate': _params.correlate
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneRateLimitsV1.DEFAULT_SERVICE_NAME, 'v1', 'createZoneRateLimits');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rate_limits',
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
   * Delete rate limit.
   *
   * Delete a rate limit given its id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rateLimitIdentifier - Identifier of the rate limit to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneRateLimitsV1.Response<ZoneRateLimitsV1.DeleteRateLimitResp>>}
   */
  public deleteZoneRateLimit(params: ZoneRateLimitsV1.DeleteZoneRateLimitParams): Promise<ZoneRateLimitsV1.Response<ZoneRateLimitsV1.DeleteRateLimitResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['rateLimitIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'rate_limit_identifier': _params.rateLimitIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneRateLimitsV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteZoneRateLimit');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rate_limits/{rate_limit_identifier}',
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
   * Get a rate limit.
   *
   * Get the details of a rate limit for a given zone under a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rateLimitIdentifier - Identifier of rate limit for the given zone.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneRateLimitsV1.Response<ZoneRateLimitsV1.RatelimitResp>>}
   */
  public getRateLimit(params: ZoneRateLimitsV1.GetRateLimitParams): Promise<ZoneRateLimitsV1.Response<ZoneRateLimitsV1.RatelimitResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['rateLimitIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'rate_limit_identifier': _params.rateLimitIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneRateLimitsV1.DEFAULT_SERVICE_NAME, 'v1', 'getRateLimit');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rate_limits/{rate_limit_identifier}',
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
   * Update rate limit.
   *
   * Update an existing rate limit for a given zone under a service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.rateLimitIdentifier - Identifier of rate limit.
   * @param {number} [params.threshold] - The threshold that triggers the rate limit mitigations, combine with period.
   * i.e. threshold per period.
   * @param {number} [params.period] - The time in seconds to count matching traffic. If the count exceeds threshold
   * within this period the action will be performed.
   * @param {RatelimitInputAction} [params.action] - action.
   * @param {RatelimitInputMatch} [params.match] - Determines which traffic the rate limit counts towards the threshold.
   * Needs to be one of "request" or "response" objects.
   * @param {boolean} [params.disabled] - Whether this ratelimit is currently disabled.
   * @param {string} [params.description] - A note that you can use to describe the reason for a rate limit.
   * @param {RatelimitInputBypassItem[]} [params.bypass] - Criteria that would allow the rate limit to be bypassed, for
   * example to express that you shouldn't apply a rate limit to a given set of URLs.
   * @param {RatelimitInputCorrelate} [params.correlate] - Enable NAT based rate limits.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneRateLimitsV1.Response<ZoneRateLimitsV1.RatelimitResp>>}
   */
  public updateRateLimit(params: ZoneRateLimitsV1.UpdateRateLimitParams): Promise<ZoneRateLimitsV1.Response<ZoneRateLimitsV1.RatelimitResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['rateLimitIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'threshold': _params.threshold,
      'period': _params.period,
      'action': _params.action,
      'match': _params.match,
      'disabled': _params.disabled,
      'description': _params.description,
      'bypass': _params.bypass,
      'correlate': _params.correlate
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'rate_limit_identifier': _params.rateLimitIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneRateLimitsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateRateLimit');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/rate_limits/{rate_limit_identifier}',
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

namespace ZoneRateLimitsV1 {

  /** Options for the `ZoneRateLimitsV1` constructor. */
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

  /** Parameters for the `listAllZoneRateLimits` operation. */
  export interface ListAllZoneRateLimitsParams {
    /** Page number of paginated results. */
    page?: number;
    /** Maximum number of rate limits per page. */
    perPage?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createZoneRateLimits` operation. */
  export interface CreateZoneRateLimitsParams {
    /** The threshold that triggers the rate limit mitigations, combine with period. i.e. threshold per period. */
    threshold?: number;
    /** The time in seconds to count matching traffic. If the count exceeds threshold within this period the action
     *  will be performed.
     */
    period?: number;
    /** action. */
    action?: RatelimitInputAction;
    /** Determines which traffic the rate limit counts towards the threshold. Needs to be one of "request" or
     *  "response" objects.
     */
    match?: RatelimitInputMatch;
    /** Whether this ratelimit is currently disabled. */
    disabled?: boolean;
    /** A note that you can use to describe the reason for a rate limit. */
    description?: string;
    /** Criteria that would allow the rate limit to be bypassed, for example to express that you shouldn't apply a
     *  rate limit to a given set of URLs.
     */
    bypass?: RatelimitInputBypassItem[];
    /** Enable NAT based rate limits. */
    correlate?: RatelimitInputCorrelate;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteZoneRateLimit` operation. */
  export interface DeleteZoneRateLimitParams {
    /** Identifier of the rate limit to be deleted. */
    rateLimitIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getRateLimit` operation. */
  export interface GetRateLimitParams {
    /** Identifier of rate limit for the given zone. */
    rateLimitIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateRateLimit` operation. */
  export interface UpdateRateLimitParams {
    /** Identifier of rate limit. */
    rateLimitIdentifier: string;
    /** The threshold that triggers the rate limit mitigations, combine with period. i.e. threshold per period. */
    threshold?: number;
    /** The time in seconds to count matching traffic. If the count exceeds threshold within this period the action
     *  will be performed.
     */
    period?: number;
    /** action. */
    action?: RatelimitInputAction;
    /** Determines which traffic the rate limit counts towards the threshold. Needs to be one of "request" or
     *  "response" objects.
     */
    match?: RatelimitInputMatch;
    /** Whether this ratelimit is currently disabled. */
    disabled?: boolean;
    /** A note that you can use to describe the reason for a rate limit. */
    description?: string;
    /** Criteria that would allow the rate limit to be bypassed, for example to express that you shouldn't apply a
     *  rate limit to a given set of URLs.
     */
    bypass?: RatelimitInputBypassItem[];
    /** Enable NAT based rate limits. */
    correlate?: RatelimitInputCorrelate;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Container for response information. */
  export interface DeleteRateLimitRespResult {
    /** ID. */
    id: string;
  }

  /** Statistics of results. */
  export interface ListRatelimitRespResultInfo {
    /** Page number. */
    page: number;
    /** Number of results per page. */
    per_page: number;
    /** Number of results. */
    count: number;
    /** Total number of results. */
    total_count: number;
  }

  /** action. */
  export interface RatelimitInputAction {
    /** The type of action to perform. */
    mode: string;
    /** The time in seconds as an integer to perform the mitigation action. Must be the same or greater than the
     *  period. This field is valid only when mode is "simulate" or "ban".
     */
    timeout?: number;
    /** Custom content-type and body to return, this overrides the custom error for the zone. This field is not
     *  required. Omission will result in default HTML error page.This field is valid only when mode is "simulate" or
     *  "ban".
     */
    response?: RatelimitInputActionResponse;
  }

  /** Custom content-type and body to return, this overrides the custom error for the zone. This field is not required. Omission will result in default HTML error page.This field is valid only when mode is "simulate" or "ban". */
  export interface RatelimitInputActionResponse {
    /** The content type of the body. */
    content_type?: string;
    /** The body to return, the content here should conform to the content_type. */
    body?: string;
  }

  /** RatelimitInputBypassItem. */
  export interface RatelimitInputBypassItem {
    /** Rate limit name. */
    name: string;
    /** The url to bypass. */
    value: string;
  }

  /** Enable NAT based rate limits. */
  export interface RatelimitInputCorrelate {
    /** NAT rate limits by. */
    by: string;
  }

  /** Determines which traffic the rate limit counts towards the threshold. Needs to be one of "request" or "response" objects. */
  export interface RatelimitInputMatch {
    /** request. */
    request?: RatelimitInputMatchRequest;
    /** response. */
    response?: RatelimitInputMatchResponse;
  }

  /** request. */
  export interface RatelimitInputMatchRequest {
    /** A subset of the list HTTP methods, or ["_ALL_"] for selecting all methods. */
    methods?: string[];
    /** HTTP schemes list, or ["_ALL_"] for selecting all schemes. */
    schemes?: string[];
    /** The URL pattern to match comprised of the host and path, i.e. example.org/path. Wildcard are expanded to
     *  match applicable traffic, query strings are not matched. Use * for all traffic to your zone.
     */
    url: string;
  }

  /** response. */
  export interface RatelimitInputMatchResponse {
    /** HTTP Status codes, can be one [403], many [401,403] or indicate all by not providing this value. This field
     *  is not required.
     */
    status?: number[];
    /** Array of response headers to match. If a response does not meet the header criteria then the request will
     *  not be counted towards the rate limit.
     */
    headers?: RatelimitInputMatchResponseHeadersItem[];
    /** Deprecated, please use response headers instead and also provide "origin_traffic:false" to avoid legacy
     *  behaviour interacting with the response.headers property.
     */
    origin_traffic?: boolean;
  }

  /** RatelimitInputMatchResponseHeadersItem. */
  export interface RatelimitInputMatchResponseHeadersItem {
    /** The name of the response header to match. */
    name: string;
    /** The operator when matchin, eq means equals, ne means not equals. */
    op: string;
    /** The value of the header, which will be exactly matched. */
    value: string;
  }

  /** action. */
  export interface RatelimitObjectAction {
    /** The type of action to perform. */
    mode: string;
    /** The time in seconds as an integer to perform the mitigation action. Must be the same or greater than the
     *  period. This field is valid only when mode is "simulate" or "ban".
     */
    timeout?: number;
    /** Custom content-type and body to return, this overrides the custom error for the zone. This field is not
     *  required. Omission will result in default HTML error page.This field is valid only when mode is "simulate" or
     *  "ban".
     */
    response?: RatelimitObjectActionResponse;
  }

  /** Custom content-type and body to return, this overrides the custom error for the zone. This field is not required. Omission will result in default HTML error page.This field is valid only when mode is "simulate" or "ban". */
  export interface RatelimitObjectActionResponse {
    /** The content type of the body. */
    content_type: string;
    /** The body to return, the content here should conform to the content_type. */
    body: string;
  }

  /** RatelimitObjectBypassItem. */
  export interface RatelimitObjectBypassItem {
    /** rate limit name. */
    name: string;
    /** The url to bypass. */
    value: string;
  }

  /** Enable NAT based rate limits. */
  export interface RatelimitObjectCorrelate {
    /** rate limit enabled by. */
    by: string;
  }

  /** Determines which traffic the rate limit counts towards the threshold. Needs to be one of "request" or "response" objects. */
  export interface RatelimitObjectMatch {
    /** request. */
    request?: RatelimitObjectMatchRequest;
    /** response. */
    response?: RatelimitObjectMatchResponse;
  }

  /** request. */
  export interface RatelimitObjectMatchRequest {
    /** A subset of the list HTTP methods, or ["_ALL_"] for selecting all methods. */
    methods?: string[];
    /** HTTP schemes list, or ["_ALL_"] for selecting all schemes. */
    schemes?: string[];
    /** The URL pattern to match comprised of the host and path, i.e. example.org/path. Wildcard are expanded to
     *  match applicable traffic, query strings are not matched. Use * for all traffic to your zone.
     */
    url: string;
  }

  /** response. */
  export interface RatelimitObjectMatchResponse {
    /** HTTP Status codes, can be one [403], many [401,403] or indicate all by not providing this value. This field
     *  is not required.
     */
    status?: number[];
    /** Array of response headers to match. If a response does not meet the header criteria then the request will
     *  not be counted towards the rate limit.
     */
    headers?: RatelimitObjectMatchResponseHeadersItem[];
    /** Deprecated, please use response headers instead and also provide "origin_traffic:false" to avoid legacy
     *  behaviour interacting with the response.headers property.
     */
    origin_traffic?: boolean;
  }

  /** RatelimitObjectMatchResponseHeadersItem. */
  export interface RatelimitObjectMatchResponseHeadersItem {
    /** The name of the response header to match. */
    name: string;
    /** The operator when matchin, eq means equals, ne means not equals. */
    op: string;
    /** The value of the header, which will be exactly matched. */
    value: string;
  }

  /** rate limit delete response. */
  export interface DeleteRateLimitResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: DeleteRateLimitRespResult;
  }

  /** rate limit list response. */
  export interface ListRatelimitResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: RatelimitObject[];
    /** Statistics of results. */
    result_info: ListRatelimitRespResultInfo;
  }

  /** rate limit object. */
  export interface RatelimitObject {
    /** Identifier of the rate limit. */
    id: string;
    /** Whether this ratelimit is currently disabled. */
    disabled: boolean;
    /** A note that you can use to describe the reason for a rate limit. */
    description: string;
    /** Criteria that would allow the rate limit to be bypassed, for example to express that you shouldn't apply a
     *  rate limit to a given set of URLs.
     */
    bypass: RatelimitObjectBypassItem[];
    /** The threshold that triggers the rate limit mitigations, combine with period. i.e. threshold per period. */
    threshold: number;
    /** The time in seconds to count matching traffic. If the count exceeds threshold within this period the action
     *  will be performed.
     */
    period: number;
    /** Enable NAT based rate limits. */
    correlate?: RatelimitObjectCorrelate;
    /** action. */
    action: RatelimitObjectAction;
    /** Determines which traffic the rate limit counts towards the threshold. Needs to be one of "request" or
     *  "response" objects.
     */
    match: RatelimitObjectMatch;
  }

  /** rate limit response. */
  export interface RatelimitResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** rate limit object. */
    result: RatelimitObject;
  }

}

export = ZoneRateLimitsV1;
