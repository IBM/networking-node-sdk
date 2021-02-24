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
 * Global Load Balancer Monitor
 */

class GlobalLoadBalancerMonitorV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'global_load_balancer_monitor';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of GlobalLoadBalancerMonitorV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {GlobalLoadBalancerMonitorV1}
   */

  public static newInstance(options: UserOptions): GlobalLoadBalancerMonitorV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new GlobalLoadBalancerMonitorV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Full CRN of the service instance. */
  crn: string;

  /**
   * Construct a GlobalLoadBalancerMonitorV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full CRN of the service instance.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {GlobalLoadBalancerMonitorV1}
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
      this.setServiceUrl(GlobalLoadBalancerMonitorV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
  }

  /*************************
   * globalLoadBalancerMonitor
   ************************/

  /**
   * List all load balancer monitors.
   *
   * List configured load balancer monitors for a user.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerMonitorV1.Response<GlobalLoadBalancerMonitorV1.ListMonitorResp>>}
   */
  public listAllLoadBalancerMonitors(params?: GlobalLoadBalancerMonitorV1.ListAllLoadBalancerMonitorsParams): Promise<GlobalLoadBalancerMonitorV1.Response<GlobalLoadBalancerMonitorV1.ListMonitorResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerMonitorV1.DEFAULT_SERVICE_NAME, 'v1', 'listAllLoadBalancerMonitors');

    const parameters = {
      options: {
        url: '/v1/{crn}/load_balancers/monitors',
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
   * Create load balancer monitor.
   *
   * Create a load balancer monitor for a given service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.expectedCodes] - expected codes.
   * @param {string} [params.type] - http type.
   * @param {string} [params.description] - login page monitor.
   * @param {string} [params.method] - method.
   * @param {number} [params.port] - port number.
   * @param {string} [params.path] - path.
   * @param {number} [params.timeout] - timeout count.
   * @param {number} [params.retries] - retry count.
   * @param {number} [params.interval] - interval.
   * @param {boolean} [params.followRedirects] - follow redirects.
   * @param {string} [params.expectedBody] - expected body.
   * @param {boolean} [params.allowInsecure] - allow insecure.
   * @param {JsonObject} [params.header] - header.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerMonitorV1.Response<GlobalLoadBalancerMonitorV1.MonitorResp>>}
   */
  public createLoadBalancerMonitor(params?: GlobalLoadBalancerMonitorV1.CreateLoadBalancerMonitorParams): Promise<GlobalLoadBalancerMonitorV1.Response<GlobalLoadBalancerMonitorV1.MonitorResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'expected_codes': _params.expectedCodes,
      'type': _params.type,
      'description': _params.description,
      'method': _params.method,
      'port': _params.port,
      'path': _params.path,
      'timeout': _params.timeout,
      'retries': _params.retries,
      'interval': _params.interval,
      'follow_redirects': _params.followRedirects,
      'expected_body': _params.expectedBody,
      'allow_insecure': _params.allowInsecure,
      'header': _params.header
    };

    const path = {
      'crn': this.crn
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerMonitorV1.DEFAULT_SERVICE_NAME, 'v1', 'createLoadBalancerMonitor');

    const parameters = {
      options: {
        url: '/v1/{crn}/load_balancers/monitors',
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
   * Edit load balancer monitor.
   *
   * Edit porperties of an existing load balancer monitor.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.monitorIdentifier - monitor identifier.
   * @param {string} [params.expectedCodes] - expected codes.
   * @param {string} [params.type] - http type.
   * @param {string} [params.description] - login page monitor.
   * @param {string} [params.method] - method.
   * @param {number} [params.port] - port number.
   * @param {string} [params.path] - path.
   * @param {number} [params.timeout] - timeout count.
   * @param {number} [params.retries] - retry count.
   * @param {number} [params.interval] - interval.
   * @param {boolean} [params.followRedirects] - follow redirects.
   * @param {string} [params.expectedBody] - expected body.
   * @param {boolean} [params.allowInsecure] - allow insecure.
   * @param {JsonObject} [params.header] - header.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerMonitorV1.Response<GlobalLoadBalancerMonitorV1.MonitorResp>>}
   */
  public editLoadBalancerMonitor(params: GlobalLoadBalancerMonitorV1.EditLoadBalancerMonitorParams): Promise<GlobalLoadBalancerMonitorV1.Response<GlobalLoadBalancerMonitorV1.MonitorResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['monitorIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'expected_codes': _params.expectedCodes,
      'type': _params.type,
      'description': _params.description,
      'method': _params.method,
      'port': _params.port,
      'path': _params.path,
      'timeout': _params.timeout,
      'retries': _params.retries,
      'interval': _params.interval,
      'follow_redirects': _params.followRedirects,
      'expected_body': _params.expectedBody,
      'allow_insecure': _params.allowInsecure,
      'header': _params.header
    };

    const path = {
      'crn': this.crn,
      'monitor_identifier': _params.monitorIdentifier
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerMonitorV1.DEFAULT_SERVICE_NAME, 'v1', 'editLoadBalancerMonitor');

    const parameters = {
      options: {
        url: '/v1/{crn}/load_balancers/monitors/{monitor_identifier}',
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
   * Delete load balancer monitor.
   *
   * Delete a load balancer monitor.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.monitorIdentifier - monitor identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerMonitorV1.Response<GlobalLoadBalancerMonitorV1.DeleteMonitorResp>>}
   */
  public deleteLoadBalancerMonitor(params: GlobalLoadBalancerMonitorV1.DeleteLoadBalancerMonitorParams): Promise<GlobalLoadBalancerMonitorV1.Response<GlobalLoadBalancerMonitorV1.DeleteMonitorResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['monitorIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'monitor_identifier': _params.monitorIdentifier
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerMonitorV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteLoadBalancerMonitor');

    const parameters = {
      options: {
        url: '/v1/{crn}/load_balancers/monitors/{monitor_identifier}',
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
   * Get load balancer monitor.
   *
   * For a given service instance and load balancer monitor id, get the monitor details.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.monitorIdentifier - monitor identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalLoadBalancerMonitorV1.Response<GlobalLoadBalancerMonitorV1.MonitorResp>>}
   */
  public getLoadBalancerMonitor(params: GlobalLoadBalancerMonitorV1.GetLoadBalancerMonitorParams): Promise<GlobalLoadBalancerMonitorV1.Response<GlobalLoadBalancerMonitorV1.MonitorResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['monitorIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'monitor_identifier': _params.monitorIdentifier
    };

    const sdkHeaders = getSdkHeaders(GlobalLoadBalancerMonitorV1.DEFAULT_SERVICE_NAME, 'v1', 'getLoadBalancerMonitor');

    const parameters = {
      options: {
        url: '/v1/{crn}/load_balancers/monitors/{monitor_identifier}',
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

namespace GlobalLoadBalancerMonitorV1 {

  /** Options for the `GlobalLoadBalancerMonitorV1` constructor. */
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

  /** Parameters for the `listAllLoadBalancerMonitors` operation. */
  export interface ListAllLoadBalancerMonitorsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLoadBalancerMonitor` operation. */
  export interface CreateLoadBalancerMonitorParams {
    /** expected codes. */
    expectedCodes?: string;
    /** http type. */
    type?: string;
    /** login page monitor. */
    description?: string;
    /** method. */
    method?: string;
    /** port number. */
    port?: number;
    /** path. */
    path?: string;
    /** timeout count. */
    timeout?: number;
    /** retry count. */
    retries?: number;
    /** interval. */
    interval?: number;
    /** follow redirects. */
    followRedirects?: boolean;
    /** expected body. */
    expectedBody?: string;
    /** allow insecure. */
    allowInsecure?: boolean;
    /** header. */
    header?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `editLoadBalancerMonitor` operation. */
  export interface EditLoadBalancerMonitorParams {
    /** monitor identifier. */
    monitorIdentifier: string;
    /** expected codes. */
    expectedCodes?: string;
    /** http type. */
    type?: string;
    /** login page monitor. */
    description?: string;
    /** method. */
    method?: string;
    /** port number. */
    port?: number;
    /** path. */
    path?: string;
    /** timeout count. */
    timeout?: number;
    /** retry count. */
    retries?: number;
    /** interval. */
    interval?: number;
    /** follow redirects. */
    followRedirects?: boolean;
    /** expected body. */
    expectedBody?: string;
    /** allow insecure. */
    allowInsecure?: boolean;
    /** header. */
    header?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteLoadBalancerMonitor` operation. */
  export interface DeleteLoadBalancerMonitorParams {
    /** monitor identifier. */
    monitorIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLoadBalancerMonitor` operation. */
  export interface GetLoadBalancerMonitorParams {
    /** monitor identifier. */
    monitorIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** result. */
  export interface DeleteMonitorRespResult {
    /** identifier. */
    id: string;
  }

  /** delete monitor response object. */
  export interface DeleteMonitorResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: DeleteMonitorRespResult;
  }

  /** monitor list response. */
  export interface ListMonitorResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: MonitorPack[];
    /** result information. */
    result_info: ResultInfo;
  }

  /** monitor package. */
  export interface MonitorPack {
    /** identifier. */
    id?: string;
    /** created date. */
    created_on?: string;
    /** modified date. */
    modified_on?: string;
    /** type. */
    type?: string;
    /** login page. */
    description?: string;
    /** method name. */
    method?: string;
    /** port number. */
    port?: number;
    /** path. */
    path?: string;
    /** timeout count. */
    timeout?: number;
    /** retries count. */
    retries?: number;
    /** interval. */
    interval?: number;
    /** expected body. */
    expected_body: string;
    /** expected codes. */
    expected_codes: string;
    /** follow redirects. */
    follow_redirects?: boolean;
    /** allow insecure. */
    allow_insecure?: boolean;
    /** header. */
    header?: JsonObject;
  }

  /** monitor response. */
  export interface MonitorResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** monitor package. */
    result: MonitorPack;
  }

  /** result information. */
  export interface ResultInfo {
    /** page number. */
    page: number;
    /** per page number. */
    per_page: number;
    /** count. */
    count: number;
    /** total count. */
    total_count: number;
  }

}

export = GlobalLoadBalancerMonitorV1;
