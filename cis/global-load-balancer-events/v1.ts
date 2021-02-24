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
 * Global Load Balancer Healthcheck Events
 */

class GlobalLoadBalancerEventsV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'global_load_balancer_events';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of GlobalLoadBalancerEventsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {GlobalLoadBalancerEventsV1}
   */

  public static newInstance(options: UserOptions): GlobalLoadBalancerEventsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new GlobalLoadBalancerEventsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Full url-encoded cloud resource name (CRN) of resource instance. */
  crn: string;

  /**
   * Construct a GlobalLoadBalancerEventsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {GlobalLoadBalancerEventsV1}
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
      this.setServiceUrl(GlobalLoadBalancerEventsV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
  }

  /*************************
   * globalLoadBalancerEvents
   ************************/

  /**
   * List all load balancer events.
   *
   * Get load balancer events for all origins.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerEventsV1.Response<GlobalLoadBalancerEventsV1.ListEventsResp>>}
   */
  public getLoadBalancerEvents(params?: GlobalLoadBalancerEventsV1.GetLoadBalancerEventsParams): Promise<GlobalLoadBalancerEventsV1.Response<GlobalLoadBalancerEventsV1.ListEventsResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerEventsV1.DEFAULT_SERVICE_NAME, 'v1', 'getLoadBalancerEvents');

    const parameters = {
      options: {
        url: '/v1/{crn}/load_balancers/events',
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

namespace GlobalLoadBalancerEventsV1 {

  /** Options for the `GlobalLoadBalancerEventsV1` constructor. */
  export interface Options extends UserOptions {

    /** Full url-encoded cloud resource name (CRN) of resource instance. */
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

  /** Parameters for the `getLoadBalancerEvents` operation. */
  export interface GetLoadBalancerEventsParams {
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** result information. */
  export interface ListEventsRespResultInfo {
    /** Page number. */
    page: number;
    /** Number of results per page. */
    per_page: number;
    /** Number of results. */
    count: number;
    /** Total number of results. */
    total_count: number;
  }

  /** ListEventsRespResultItem. */
  export interface ListEventsRespResultItem {
    /** ID of the event. */
    id?: string;
    /** Time of the event. */
    timestamp?: string;
    /** Pool information. */
    pool?: ListEventsRespResultItemPoolItem[];
    /** Load balancer origins. */
    origins?: ListEventsRespResultItemOriginsItem[];
  }

  /** ListEventsRespResultItemOriginsItem. */
  export interface ListEventsRespResultItemOriginsItem {
    /** Origin name. */
    name?: string;
    /** Origin address. */
    address?: string;
    /** Origin id. */
    ip?: string;
    /** Origin enabled. */
    enabled?: boolean;
    /** Origin healthy. */
    healthy?: boolean;
    /** Origin failure reason. */
    failure_reason?: string;
    /** Origin changed. */
    changed?: boolean;
  }

  /** ListEventsRespResultItemPoolItem. */
  export interface ListEventsRespResultItemPoolItem {
    /** Pool id. */
    id?: string;
    /** Pool name. */
    name?: string;
    /** Pool is healthy. */
    healthy?: boolean;
    /** Pool changed. */
    changed?: boolean;
    /** Minimum origins. */
    minimum_origins?: number;
  }

  /** events list response object. */
  export interface ListEventsResp {
    /** Was the get successful. */
    success: boolean;
    /** Result of the operation. */
    result: ListEventsRespResultItem[];
    /** result information. */
    result_info: ListEventsRespResultInfo;
    /** Array of errors returned. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

}

export = GlobalLoadBalancerEventsV1;
