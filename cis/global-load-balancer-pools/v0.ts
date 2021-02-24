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
 * GLB Pools
 */

class GlobalLoadBalancerPoolsV0 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'global_load_balancer_pools';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of GlobalLoadBalancerPoolsV0 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {GlobalLoadBalancerPoolsV0}
   */

  public static newInstance(options: UserOptions): GlobalLoadBalancerPoolsV0 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new GlobalLoadBalancerPoolsV0(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Full CRN of the service instance. */
  crn: string;

  /**
   * Construct a GlobalLoadBalancerPoolsV0 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full CRN of the service instance.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {GlobalLoadBalancerPoolsV0}
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
      this.setServiceUrl(GlobalLoadBalancerPoolsV0.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
  }

  /*************************
   * globalLoadBalancerPool
   ************************/

  /**
   * List all pools.
   *
   * List all configured load balancer pools.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerPoolsV0.Response<GlobalLoadBalancerPoolsV0.ListLoadBalancerPoolsResp>>}
   */
  public listAllLoadBalancerPools(params?: GlobalLoadBalancerPoolsV0.ListAllLoadBalancerPoolsParams): Promise<GlobalLoadBalancerPoolsV0.Response<GlobalLoadBalancerPoolsV0.ListLoadBalancerPoolsResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerPoolsV0.DEFAULT_SERVICE_NAME, 'v0', 'listAllLoadBalancerPools');

    const parameters = {
      options: {
        url: '/v1/{crn}/load_balancers/pools',
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
   * Create pool.
   *
   * Create a new load balancer pool.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - name.
   * @param {string[]} [params.checkRegions] - regions check.
   * @param {LoadBalancerPoolReqOriginsItem[]} [params.origins] - origins.
   * @param {string} [params.description] - desc.
   * @param {number} [params.minimumOrigins] - The minimum number of origins that must be healthy for this pool to serve
   * traffic.
   * @param {boolean} [params.enabled] - enabled/disabled.
   * @param {string} [params.monitor] - monitor.
   * @param {string} [params.notificationEmail] - notification email.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerPoolsV0.Response<GlobalLoadBalancerPoolsV0.LoadBalancerPoolResp>>}
   */
  public createLoadBalancerPool(params?: GlobalLoadBalancerPoolsV0.CreateLoadBalancerPoolParams): Promise<GlobalLoadBalancerPoolsV0.Response<GlobalLoadBalancerPoolsV0.LoadBalancerPoolResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'name': _params.name,
      'check_regions': _params.checkRegions,
      'origins': _params.origins,
      'description': _params.description,
      'minimum_origins': _params.minimumOrigins,
      'enabled': _params.enabled,
      'monitor': _params.monitor,
      'notification_email': _params.notificationEmail
    };

    const path = {
      'crn': this.crn
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerPoolsV0.DEFAULT_SERVICE_NAME, 'v0', 'createLoadBalancerPool');

    const parameters = {
      options: {
        url: '/v1/{crn}/load_balancers/pools',
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
   * Get pool.
   *
   * Get a single configured load balancer pool.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.poolIdentifier - pool identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerPoolsV0.Response<GlobalLoadBalancerPoolsV0.LoadBalancerPoolResp>>}
   */
  public getLoadBalancerPool(params: GlobalLoadBalancerPoolsV0.GetLoadBalancerPoolParams): Promise<GlobalLoadBalancerPoolsV0.Response<GlobalLoadBalancerPoolsV0.LoadBalancerPoolResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['poolIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'pool_identifier': _params.poolIdentifier
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerPoolsV0.DEFAULT_SERVICE_NAME, 'v0', 'getLoadBalancerPool');

    const parameters = {
      options: {
        url: '/v1/{crn}/load_balancers/pools/{pool_identifier}',
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
   * Delete pool.
   *
   * Delete a specific configured load balancer pool.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.poolIdentifier - pool identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerPoolsV0.Response<GlobalLoadBalancerPoolsV0.DeleteLoadBalancerPoolResp>>}
   */
  public deleteLoadBalancerPool(params: GlobalLoadBalancerPoolsV0.DeleteLoadBalancerPoolParams): Promise<GlobalLoadBalancerPoolsV0.Response<GlobalLoadBalancerPoolsV0.DeleteLoadBalancerPoolResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['poolIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'pool_identifier': _params.poolIdentifier
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerPoolsV0.DEFAULT_SERVICE_NAME, 'v0', 'deleteLoadBalancerPool');

    const parameters = {
      options: {
        url: '/v1/{crn}/load_balancers/pools/{pool_identifier}',
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
   * Edit pool.
   *
   * Edit a specific configured load balancer pool.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.poolIdentifier - pool identifier.
   * @param {string} [params.name] - name.
   * @param {string[]} [params.checkRegions] - regions check.
   * @param {LoadBalancerPoolReqOriginsItem[]} [params.origins] - origins.
   * @param {string} [params.description] - desc.
   * @param {number} [params.minimumOrigins] - The minimum number of origins that must be healthy for this pool to serve
   * traffic.
   * @param {boolean} [params.enabled] - enabled/disabled.
   * @param {string} [params.monitor] - monitor.
   * @param {string} [params.notificationEmail] - notification email.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerPoolsV0.Response<GlobalLoadBalancerPoolsV0.LoadBalancerPoolResp>>}
   */
  public editLoadBalancerPool(params: GlobalLoadBalancerPoolsV0.EditLoadBalancerPoolParams): Promise<GlobalLoadBalancerPoolsV0.Response<GlobalLoadBalancerPoolsV0.LoadBalancerPoolResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['poolIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'check_regions': _params.checkRegions,
      'origins': _params.origins,
      'description': _params.description,
      'minimum_origins': _params.minimumOrigins,
      'enabled': _params.enabled,
      'monitor': _params.monitor,
      'notification_email': _params.notificationEmail
    };

    const path = {
      'crn': this.crn,
      'pool_identifier': _params.poolIdentifier
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerPoolsV0.DEFAULT_SERVICE_NAME, 'v0', 'editLoadBalancerPool');

    const parameters = {
      options: {
        url: '/v1/{crn}/load_balancers/pools/{pool_identifier}',
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

namespace GlobalLoadBalancerPoolsV0 {

  /** Options for the `GlobalLoadBalancerPoolsV0` constructor. */
  export interface Options extends UserOptions {

    /** Full CRN of the service instance. */
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

  /** Parameters for the `listAllLoadBalancerPools` operation. */
  export interface ListAllLoadBalancerPoolsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLoadBalancerPool` operation. */
  export interface CreateLoadBalancerPoolParams {
    /** name. */
    name?: string;
    /** regions check. */
    checkRegions?: string[];
    /** origins. */
    origins?: LoadBalancerPoolReqOriginsItem[];
    /** desc. */
    description?: string;
    /** The minimum number of origins that must be healthy for this pool to serve traffic. */
    minimumOrigins?: number;
    /** enabled/disabled. */
    enabled?: boolean;
    /** monitor. */
    monitor?: string;
    /** notification email. */
    notificationEmail?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLoadBalancerPool` operation. */
  export interface GetLoadBalancerPoolParams {
    /** pool identifier. */
    poolIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteLoadBalancerPool` operation. */
  export interface DeleteLoadBalancerPoolParams {
    /** pool identifier. */
    poolIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `editLoadBalancerPool` operation. */
  export interface EditLoadBalancerPoolParams {
    /** pool identifier. */
    poolIdentifier: string;
    /** name. */
    name?: string;
    /** regions check. */
    checkRegions?: string[];
    /** origins. */
    origins?: LoadBalancerPoolReqOriginsItem[];
    /** desc. */
    description?: string;
    /** The minimum number of origins that must be healthy for this pool to serve traffic. */
    minimumOrigins?: number;
    /** enabled/disabled. */
    enabled?: boolean;
    /** monitor. */
    monitor?: string;
    /** notification email. */
    notificationEmail?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** result. */
  export interface DeleteLoadBalancerPoolRespResult {
    /** identifier. */
    id: string;
  }

  /** LoadBalancerPoolPackOriginsItem. */
  export interface LoadBalancerPoolPackOriginsItem {
    /** name. */
    name?: string;
    /** address. */
    address?: string;
    /** enabled/disabled. */
    enabled?: boolean;
    /** healthy. */
    healthy?: boolean;
    /** weight. */
    weight?: number;
    /** Pool origin disabled date. */
    disabled_at?: string;
    /** Reason for failure. */
    failure_reason?: string;
  }

  /** items. */
  export interface LoadBalancerPoolReqOriginsItem {
    /** name. */
    name?: string;
    /** address. */
    address?: string;
    /** enabled/disabled. */
    enabled?: boolean;
    /** weight. */
    weight?: number;
  }

  /** load balancer pool delete response. */
  export interface DeleteLoadBalancerPoolResp {
    /** succcess response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: DeleteLoadBalancerPoolRespResult;
  }

  /** list load balancer pools response. */
  export interface ListLoadBalancerPoolsResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: LoadBalancerPoolPack[];
    /** result information. */
    result_info: ResultInfo;
  }

  /** load balancer pool pack. */
  export interface LoadBalancerPoolPack {
    /** identifier. */
    id?: string;
    /** created date. */
    created_on?: string;
    /** modified date. */
    modified_on?: string;
    /** desc. */
    description?: string;
    /** name. */
    name: string;
    /** enabled/disabled. */
    enabled?: boolean;
    /** healthy. */
    healthy?: boolean;
    /** monitor. */
    monitor?: string;
    /** Minimum origin count. */
    minimum_origins?: number;
    /** regions check. */
    check_regions?: string[];
    /** original. */
    origins: LoadBalancerPoolPackOriginsItem[];
    /** notification email. */
    notification_email?: string;
  }

  /** get load balancer pool response. */
  export interface LoadBalancerPoolResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** load balancer pool pack. */
    result: LoadBalancerPoolPack;
    /** result information. */
    result_info: ResultInfo;
  }

  /** result information. */
  export interface ResultInfo {
    /** page number. */
    page: number;
    /** per page count. */
    per_page: number;
    /** count. */
    count: number;
    /** total count. */
    total_count: number;
  }

}

export = GlobalLoadBalancerPoolsV0;
