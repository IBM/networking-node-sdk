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
 * Global Load Balancer
 */

class GlobalLoadBalancerV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'global_load_balancer';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of GlobalLoadBalancerV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {GlobalLoadBalancerV1}
   */

  public static newInstance(options: UserOptions): GlobalLoadBalancerV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new GlobalLoadBalancerV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Full CRN of the service instance. */
  crn: string;

  /** zone identifier. */
  zoneIdentifier: string;

  /**
   * Construct a GlobalLoadBalancerV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full CRN of the service instance.
   * @param {string} options.zoneIdentifier - zone identifier.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {GlobalLoadBalancerV1}
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
      this.setServiceUrl(GlobalLoadBalancerV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * globalLoadBalancer
   ************************/

  /**
   * List all load balancers.
   *
   * List configured load balancers.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerV1.Response<GlobalLoadBalancerV1.ListLoadBalancersResp>>}
   */
  public listAllLoadBalancers(params?: GlobalLoadBalancerV1.ListAllLoadBalancersParams): Promise<GlobalLoadBalancerV1.Response<GlobalLoadBalancerV1.ListLoadBalancersResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerV1.DEFAULT_SERVICE_NAME, 'v1', 'listAllLoadBalancers');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/load_balancers',
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
   * Create load balancer.
   *
   * Create a load balancer for a given zone. The zone should be active before placing an order of a load balancer.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - name.
   * @param {string} [params.fallbackPool] - fallback pool.
   * @param {string[]} [params.defaultPools] - default pools.
   * @param {string} [params.description] - desc.
   * @param {number} [params.ttl] - ttl.
   * @param {JsonObject} [params.regionPools] - region pools.
   * @param {JsonObject} [params.popPools] - pop pools.
   * @param {boolean} [params.proxied] - proxied.
   * @param {boolean} [params.enabled] - enabled/disabled.
   * @param {string} [params.sessionAffinity] - session affinity.
   * @param {string} [params.steeringPolicy] - steering policy.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerV1.Response<GlobalLoadBalancerV1.LoadBalancersResp>>}
   */
  public createLoadBalancer(params?: GlobalLoadBalancerV1.CreateLoadBalancerParams): Promise<GlobalLoadBalancerV1.Response<GlobalLoadBalancerV1.LoadBalancersResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'name': _params.name,
      'fallback_pool': _params.fallbackPool,
      'default_pools': _params.defaultPools,
      'description': _params.description,
      'ttl': _params.ttl,
      'region_pools': _params.regionPools,
      'pop_pools': _params.popPools,
      'proxied': _params.proxied,
      'enabled': _params.enabled,
      'session_affinity': _params.sessionAffinity,
      'steering_policy': _params.steeringPolicy
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerV1.DEFAULT_SERVICE_NAME, 'v1', 'createLoadBalancer');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/load_balancers',
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
   * Edit load balancer.
   *
   * Edit porperties of an existing load balancer.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerIdentifier - load balancer identifier.
   * @param {string} [params.name] - name.
   * @param {string} [params.fallbackPool] - fallback pool.
   * @param {string[]} [params.defaultPools] - default pools.
   * @param {string} [params.description] - desc.
   * @param {number} [params.ttl] - ttl.
   * @param {JsonObject} [params.regionPools] - region pools.
   * @param {JsonObject} [params.popPools] - pop pools.
   * @param {boolean} [params.proxied] - proxied.
   * @param {boolean} [params.enabled] - enabled/disabled.
   * @param {string} [params.sessionAffinity] - session affinity.
   * @param {string} [params.steeringPolicy] - steering policy.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerV1.Response<GlobalLoadBalancerV1.LoadBalancersResp>>}
   */
  public editLoadBalancer(params: GlobalLoadBalancerV1.EditLoadBalancerParams): Promise<GlobalLoadBalancerV1.Response<GlobalLoadBalancerV1.LoadBalancersResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'fallback_pool': _params.fallbackPool,
      'default_pools': _params.defaultPools,
      'description': _params.description,
      'ttl': _params.ttl,
      'region_pools': _params.regionPools,
      'pop_pools': _params.popPools,
      'proxied': _params.proxied,
      'enabled': _params.enabled,
      'session_affinity': _params.sessionAffinity,
      'steering_policy': _params.steeringPolicy
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'load_balancer_identifier': _params.loadBalancerIdentifier
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerV1.DEFAULT_SERVICE_NAME, 'v1', 'editLoadBalancer');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/load_balancers/{load_balancer_identifier}',
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
   * Delete load balancer.
   *
   * Delete a load balancer.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerIdentifier - load balancer identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerV1.Response<GlobalLoadBalancerV1.DeleteLoadBalancersResp>>}
   */
  public deleteLoadBalancer(params: GlobalLoadBalancerV1.DeleteLoadBalancerParams): Promise<GlobalLoadBalancerV1.Response<GlobalLoadBalancerV1.DeleteLoadBalancersResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'load_balancer_identifier': _params.loadBalancerIdentifier
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteLoadBalancer');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/load_balancers/{load_balancer_identifier}',
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
   * Get load balancer.
   *
   * For a given zone identifier and load balancer id, get the load balancer settings.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.loadBalancerIdentifier - load balancer identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerV1.Response<GlobalLoadBalancerV1.LoadBalancersResp>>}
   */
  public getLoadBalancerSettings(params: GlobalLoadBalancerV1.GetLoadBalancerSettingsParams): Promise<GlobalLoadBalancerV1.Response<GlobalLoadBalancerV1.LoadBalancersResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['loadBalancerIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'load_balancer_identifier': _params.loadBalancerIdentifier
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerV1.DEFAULT_SERVICE_NAME, 'v1', 'getLoadBalancerSettings');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/load_balancers/{load_balancer_identifier}',
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

}

/*************************
 * interfaces
 ************************/

namespace GlobalLoadBalancerV1 {

  /** Options for the `GlobalLoadBalancerV1` constructor. */
  export interface Options extends UserOptions {

    /** Full CRN of the service instance. */
    crn: string;

    /** zone identifier. */
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

  /** Parameters for the `listAllLoadBalancers` operation. */
  export interface ListAllLoadBalancersParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLoadBalancer` operation. */
  export interface CreateLoadBalancerParams {
    /** name. */
    name?: string;
    /** fallback pool. */
    fallbackPool?: string;
    /** default pools. */
    defaultPools?: string[];
    /** desc. */
    description?: string;
    /** ttl. */
    ttl?: number;
    /** region pools. */
    regionPools?: JsonObject;
    /** pop pools. */
    popPools?: JsonObject;
    /** proxied. */
    proxied?: boolean;
    /** enabled/disabled. */
    enabled?: boolean;
    /** session affinity. */
    sessionAffinity?: CreateLoadBalancerConstants.SessionAffinity | string;
    /** steering policy. */
    steeringPolicy?: CreateLoadBalancerConstants.SteeringPolicy | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createLoadBalancer` operation. */
  export namespace CreateLoadBalancerConstants {
    /** session affinity. */
    export enum SessionAffinity {
      NONE = 'none',
      COOKIE = 'cookie',
      IP_COOKIE = 'ip_cookie',
    }
    /** steering policy. */
    export enum SteeringPolicy {
      OFF = 'off',
      GEO = 'geo',
      RANDOM = 'random',
      DYNAMIC_LATENCY = 'dynamic_latency',
    }
  }

  /** Parameters for the `editLoadBalancer` operation. */
  export interface EditLoadBalancerParams {
    /** load balancer identifier. */
    loadBalancerIdentifier: string;
    /** name. */
    name?: string;
    /** fallback pool. */
    fallbackPool?: string;
    /** default pools. */
    defaultPools?: string[];
    /** desc. */
    description?: string;
    /** ttl. */
    ttl?: number;
    /** region pools. */
    regionPools?: JsonObject;
    /** pop pools. */
    popPools?: JsonObject;
    /** proxied. */
    proxied?: boolean;
    /** enabled/disabled. */
    enabled?: boolean;
    /** session affinity. */
    sessionAffinity?: EditLoadBalancerConstants.SessionAffinity | string;
    /** steering policy. */
    steeringPolicy?: EditLoadBalancerConstants.SteeringPolicy | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `editLoadBalancer` operation. */
  export namespace EditLoadBalancerConstants {
    /** session affinity. */
    export enum SessionAffinity {
      NONE = 'none',
      COOKIE = 'cookie',
      IP_COOKIE = 'ip_cookie',
    }
    /** steering policy. */
    export enum SteeringPolicy {
      OFF = 'off',
      GEO = 'geo',
      RANDOM = 'random',
      DYNAMIC_LATENCY = 'dynamic_latency',
    }
  }

  /** Parameters for the `deleteLoadBalancer` operation. */
  export interface DeleteLoadBalancerParams {
    /** load balancer identifier. */
    loadBalancerIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLoadBalancerSettings` operation. */
  export interface GetLoadBalancerSettingsParams {
    /** load balancer identifier. */
    loadBalancerIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** result. */
  export interface DeleteLoadBalancersRespResult {
    /** identifier. */
    id: string;
  }

  /** delete load balancers response. */
  export interface DeleteLoadBalancersResp {
    /** success respose. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: DeleteLoadBalancersRespResult;
  }

  /** load balancer list response. */
  export interface ListLoadBalancersResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: LoadBalancerPack[];
    /** result information. */
    result_info: ResultInfo;
  }

  /** loadbalancer pack. */
  export interface LoadBalancerPack {
    /** identifier. */
    id: string;
    /** created date. */
    created_on: string;
    /** modified date. */
    modified_on: string;
    /** desc. */
    description: string;
    /** name. */
    name: string;
    /** ttl. */
    ttl: number;
    /** fallback pool. */
    fallback_pool: string;
    /** default pools. */
    default_pools: string[];
    /** region pools. */
    region_pools: JsonObject;
    /** pop pools. */
    pop_pools: JsonObject;
    /** proxied. */
    proxied: boolean;
    /** enabled/disabled. */
    enabled: boolean;
    /** session affinity. */
    session_affinity: string;
    /** steering policy. */
    steering_policy: string;
  }

  /** load balancer response. */
  export interface LoadBalancersResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** loadbalancer pack. */
    result: LoadBalancerPack;
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

export = GlobalLoadBalancerV1;
