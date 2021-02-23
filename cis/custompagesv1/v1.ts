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
 * Custom Pages
 */

class CustomPagesV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'custom_pages';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of CustomPagesV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {CustomPagesV1}
   */

  public static newInstance(options: UserOptions): CustomPagesV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new CustomPagesV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Full crn of the service instance. */
  crn: string;

  /** Zone identifier. */
  zoneIdentifier: string;

  /**
   * Construct a CustomPagesV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full crn of the service instance.
   * @param {string} options.zoneIdentifier - Zone identifier.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {CustomPagesV1}
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
      this.setServiceUrl(CustomPagesV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * customPages
   ************************/

  /**
   * List all custom pages for a given instance.
   *
   * List all custom pages for a given instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CustomPagesV1.Response<CustomPagesV1.ListCustomPagesResp>>}
   */
  public listInstanceCustomPages(params?: CustomPagesV1.ListInstanceCustomPagesParams): Promise<CustomPagesV1.Response<CustomPagesV1.ListCustomPagesResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn
    };

    const sdkHeaders = getSdkHeaders(CustomPagesV1.DEFAULT_SERVICE_NAME, 'v1', 'listInstanceCustomPages');

    const parameters = {
      options: {
        url: '/v1/{crn}/custom_pages',
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
   * Get a custom page for a given instance.
   *
   * Get a specific custom page for a given instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pageIdentifier - Custom page identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CustomPagesV1.Response<CustomPagesV1.CustomPageSpecificResp>>}
   */
  public getInstanceCustomPage(params: CustomPagesV1.GetInstanceCustomPageParams): Promise<CustomPagesV1.Response<CustomPagesV1.CustomPageSpecificResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['pageIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'page_identifier': _params.pageIdentifier
    };

    const sdkHeaders = getSdkHeaders(CustomPagesV1.DEFAULT_SERVICE_NAME, 'v1', 'getInstanceCustomPage');

    const parameters = {
      options: {
        url: '/v1/{crn}/custom_pages/{page_identifier}',
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
   * Update a custom page for a given instance.
   *
   * Update a specific custom page for a given instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pageIdentifier - Custom page identifier.
   * @param {string} [params.url] - A URL that is associated with the Custom Page.
   * @param {string} [params.state] - The Custom Page state.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CustomPagesV1.Response<CustomPagesV1.CustomPageSpecificResp>>}
   */
  public updateInstanceCustomPage(params: CustomPagesV1.UpdateInstanceCustomPageParams): Promise<CustomPagesV1.Response<CustomPagesV1.CustomPageSpecificResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['pageIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'url': _params.url,
      'state': _params.state
    };

    const path = {
      'crn': this.crn,
      'page_identifier': _params.pageIdentifier
    };

    const sdkHeaders = getSdkHeaders(CustomPagesV1.DEFAULT_SERVICE_NAME, 'v1', 'updateInstanceCustomPage');

    const parameters = {
      options: {
        url: '/v1/{crn}/custom_pages/{page_identifier}',
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
   * List all custom pages for a given zone.
   *
   * List all custom pages for a given zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CustomPagesV1.Response<CustomPagesV1.ListCustomPagesResp>>}
   */
  public listZoneCustomPages(params?: CustomPagesV1.ListZoneCustomPagesParams): Promise<CustomPagesV1.Response<CustomPagesV1.ListCustomPagesResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(CustomPagesV1.DEFAULT_SERVICE_NAME, 'v1', 'listZoneCustomPages');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/custom_pages',
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
   * Get a custom page for a given zone.
   *
   * Get a specific custom page for a given zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pageIdentifier - Custom page identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CustomPagesV1.Response<CustomPagesV1.CustomPageSpecificResp>>}
   */
  public getZoneCustomPage(params: CustomPagesV1.GetZoneCustomPageParams): Promise<CustomPagesV1.Response<CustomPagesV1.CustomPageSpecificResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['pageIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'page_identifier': _params.pageIdentifier
    };

    const sdkHeaders = getSdkHeaders(CustomPagesV1.DEFAULT_SERVICE_NAME, 'v1', 'getZoneCustomPage');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/custom_pages/{page_identifier}',
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
   * Update a custom page for a given zone.
   *
   * Update a specific custom page for a given zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.pageIdentifier - Custom page identifier.
   * @param {string} [params.url] - A URL that is associated with the Custom Page.
   * @param {string} [params.state] - The Custom Page state.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CustomPagesV1.Response<CustomPagesV1.CustomPageSpecificResp>>}
   */
  public updateZoneCustomPage(params: CustomPagesV1.UpdateZoneCustomPageParams): Promise<CustomPagesV1.Response<CustomPagesV1.CustomPageSpecificResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['pageIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'url': _params.url,
      'state': _params.state
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'page_identifier': _params.pageIdentifier
    };

    const sdkHeaders = getSdkHeaders(CustomPagesV1.DEFAULT_SERVICE_NAME, 'v1', 'updateZoneCustomPage');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/custom_pages/{page_identifier}',
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

namespace CustomPagesV1 {

  /** Options for the `CustomPagesV1` constructor. */
  export interface Options extends UserOptions {

    /** Full crn of the service instance. */
    crn: string;

    /** Zone identifier. */
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

  /** Parameters for the `listInstanceCustomPages` operation. */
  export interface ListInstanceCustomPagesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getInstanceCustomPage` operation. */
  export interface GetInstanceCustomPageParams {
    /** Custom page identifier. */
    pageIdentifier: GetInstanceCustomPageConstants.PageIdentifier | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getInstanceCustomPage` operation. */
  export namespace GetInstanceCustomPageConstants {
    /** Custom page identifier. */
    export enum PageIdentifier {
      BASIC_CHALLENGE = 'basic_challenge',
      WAF_CHALLENGE = 'waf_challenge',
      WAF_BLOCK = 'waf_block',
      RATELIMIT_BLOCK = 'ratelimit_block',
      COUNTRY_CHALLENGE = 'country_challenge',
      IP_BLOCK = 'ip_block',
      UNDER_ATTACK = 'under_attack',
      ALWAYS_ONLINE = 'always_online',
    }
  }

  /** Parameters for the `updateInstanceCustomPage` operation. */
  export interface UpdateInstanceCustomPageParams {
    /** Custom page identifier. */
    pageIdentifier: UpdateInstanceCustomPageConstants.PageIdentifier | string;
    /** A URL that is associated with the Custom Page. */
    url?: string;
    /** The Custom Page state. */
    state?: UpdateInstanceCustomPageConstants.State | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateInstanceCustomPage` operation. */
  export namespace UpdateInstanceCustomPageConstants {
    /** Custom page identifier. */
    export enum PageIdentifier {
      BASIC_CHALLENGE = 'basic_challenge',
      WAF_CHALLENGE = 'waf_challenge',
      WAF_BLOCK = 'waf_block',
      RATELIMIT_BLOCK = 'ratelimit_block',
      COUNTRY_CHALLENGE = 'country_challenge',
      IP_BLOCK = 'ip_block',
      UNDER_ATTACK = 'under_attack',
      ALWAYS_ONLINE = 'always_online',
    }
    /** The Custom Page state. */
    export enum State {
      DEFAULT = 'default',
      CUSTOMIZED = 'customized',
    }
  }

  /** Parameters for the `listZoneCustomPages` operation. */
  export interface ListZoneCustomPagesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getZoneCustomPage` operation. */
  export interface GetZoneCustomPageParams {
    /** Custom page identifier. */
    pageIdentifier: GetZoneCustomPageConstants.PageIdentifier | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getZoneCustomPage` operation. */
  export namespace GetZoneCustomPageConstants {
    /** Custom page identifier. */
    export enum PageIdentifier {
      BASIC_CHALLENGE = 'basic_challenge',
      WAF_CHALLENGE = 'waf_challenge',
      WAF_BLOCK = 'waf_block',
      RATELIMIT_BLOCK = 'ratelimit_block',
      COUNTRY_CHALLENGE = 'country_challenge',
      IP_BLOCK = 'ip_block',
      UNDER_ATTACK = 'under_attack',
      ALWAYS_ONLINE = 'always_online',
    }
  }

  /** Parameters for the `updateZoneCustomPage` operation. */
  export interface UpdateZoneCustomPageParams {
    /** Custom page identifier. */
    pageIdentifier: UpdateZoneCustomPageConstants.PageIdentifier | string;
    /** A URL that is associated with the Custom Page. */
    url?: string;
    /** The Custom Page state. */
    state?: UpdateZoneCustomPageConstants.State | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateZoneCustomPage` operation. */
  export namespace UpdateZoneCustomPageConstants {
    /** Custom page identifier. */
    export enum PageIdentifier {
      BASIC_CHALLENGE = 'basic_challenge',
      WAF_CHALLENGE = 'waf_challenge',
      WAF_BLOCK = 'waf_block',
      RATELIMIT_BLOCK = 'ratelimit_block',
      COUNTRY_CHALLENGE = 'country_challenge',
      IP_BLOCK = 'ip_block',
      UNDER_ATTACK = 'under_attack',
      ALWAYS_ONLINE = 'always_online',
    }
    /** The Custom Page state. */
    export enum State {
      DEFAULT = 'default',
      CUSTOMIZED = 'customized',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** Statistics of results. */
  export interface ListCustomPagesRespResultInfo {
    /** Page number. */
    page: number;
    /** Number of results per page. */
    per_page: number;
    /** Number of total pages. */
    total_pages: number;
    /** Number of results. */
    count: number;
    /** Total number of results. */
    total_count: number;
  }

  /** custom page object. */
  export interface CustomPageObject {
    /** Custom page identifier. */
    id: string;
    /** Description of custom page. */
    description: string;
    /** array of page tokens. */
    required_tokens: string[];
    /** Preview target. */
    preview_target: string;
    /** Created date. */
    created_on: string;
    /** Modified date. */
    modified_on: string;
    /** A URL that is associated with the Custom Page. */
    url: string;
    /** The Custom Page state. */
    state: string;
  }

  /** custom page specific response. */
  export interface CustomPageSpecificResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** custom page object. */
    result: CustomPageObject;
  }

  /** list of custom pages response. */
  export interface ListCustomPagesResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** custom pages array. */
    result: CustomPageObject[];
    /** Statistics of results. */
    result_info: ListCustomPagesRespResultInfo;
  }

}

export = CustomPagesV1;
