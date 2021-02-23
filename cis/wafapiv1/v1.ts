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
 * This document describes CIS WAF API.
 */

class WafApiV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'waf_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of WafApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {WafApiV1}
   */

  public static newInstance(options: UserOptions): WafApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new WafApiV1(options);
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
   * Construct a WafApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - cloud resource name.
   * @param {string} options.zoneId - zone id.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {WafApiV1}
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
      this.setServiceUrl(WafApiV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneId = options.zoneId;
  }

  /*************************
   * wAF
   ************************/

  /**
   * Get WAF setting.
   *
   * Get WAF of a specific zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WafApiV1.Response<WafApiV1.WafResponse>>}
   */
  public getWafSettings(params?: WafApiV1.GetWafSettingsParams): Promise<WafApiV1.Response<WafApiV1.WafResponse>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(WafApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getWafSettings');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/settings/waf',
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
   * Set WAF setting.
   *
   * Set WAF (on | off) for a specific zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WafApiV1.Response<WafApiV1.WafResponse>>}
   */
  public updateWafSettings(params?: WafApiV1.UpdateWafSettingsParams): Promise<WafApiV1.Response<WafApiV1.WafResponse>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(WafApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateWafSettings');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/settings/waf',
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

namespace WafApiV1 {

  /** Options for the `WafApiV1` constructor. */
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

  /** Parameters for the `getWafSettings` operation. */
  export interface GetWafSettingsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateWafSettings` operation. */
  export interface UpdateWafSettingsParams {
    /** value. */
    value?: UpdateWafSettingsConstants.Value | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateWafSettings` operation. */
  export namespace UpdateWafSettingsConstants {
    /** value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** result. */
  export interface WafResponseResult {
    /** id. */
    id?: string;
    /** value. */
    value?: string;
    /** editable. */
    editable?: boolean;
    /** modified date. */
    modified_on?: string;
  }

  /** waf response. */
  export interface WafResponse {
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: WafResponseResult;
  }

}

export = WafApiV1;
