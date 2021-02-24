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
 * Firewall API
 */

class FirewallApiV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'firewall_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of FirewallApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {FirewallApiV1}
   */

  public static newInstance(options: UserOptions): FirewallApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new FirewallApiV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** cloud resource name. */
  crn: string;

  /** zone identifier. */
  zoneIdentifier: string;

  /**
   * Construct a FirewallApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - cloud resource name.
   * @param {string} options.zoneIdentifier - zone identifier.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {FirewallApiV1}
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
      this.setServiceUrl(FirewallApiV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * securityLevelSetting
   ************************/

  /**
   * Get security level setting.
   *
   * For a given zone identifier, get security level setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallApiV1.Response<FirewallApiV1.SecurityLevelSettingResp>>}
   */
  public getSecurityLevelSetting(params?: FirewallApiV1.GetSecurityLevelSettingParams): Promise<FirewallApiV1.Response<FirewallApiV1.SecurityLevelSettingResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(FirewallApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getSecurityLevelSetting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/security_level',
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
   * Set security level setting.
   *
   * For a given zone identifier, set security level setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - security level.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallApiV1.Response<FirewallApiV1.SecurityLevelSettingResp>>}
   */
  public setSecurityLevelSetting(params?: FirewallApiV1.SetSecurityLevelSettingParams): Promise<FirewallApiV1.Response<FirewallApiV1.SecurityLevelSettingResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(FirewallApiV1.DEFAULT_SERVICE_NAME, 'v1', 'setSecurityLevelSetting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/security_level',
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

namespace FirewallApiV1 {

  /** Options for the `FirewallApiV1` constructor. */
  export interface Options extends UserOptions {

    /** cloud resource name. */
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

  /** Parameters for the `getSecurityLevelSetting` operation. */
  export interface GetSecurityLevelSettingParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `setSecurityLevelSetting` operation. */
  export interface SetSecurityLevelSettingParams {
    /** security level. */
    value?: SetSecurityLevelSettingConstants.Value | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `setSecurityLevelSetting` operation. */
  export namespace SetSecurityLevelSettingConstants {
    /** security level. */
    export enum Value {
      ESSENTIALLY_OFF = 'essentially_off',
      LOW = 'low',
      MEDIUM = 'medium',
      HIGH = 'high',
      UNDER_ATTACK = 'under_attack',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** SecurityLevelSettingRespMessagesItem. */
  export interface SecurityLevelSettingRespMessagesItem {
    /** messages. */
    status?: string;
  }

  /** result object. */
  export interface SecurityLevelSettingRespResult {
    /** identifier. */
    id: string;
    /** value. */
    value: string;
    /** editable. */
    editable: boolean;
    /** modified date. */
    modified_on: string;
  }

  /** result information. */
  export interface ResultInfo {
    /** output pages. */
    page: number;
    /** output per page. */
    per_page: number;
    /** firewall hit count. */
    count: number;
    /** total count. */
    total_count: number;
  }

  /** security level setting response. */
  export interface SecurityLevelSettingResp {
    /** result object. */
    result: SecurityLevelSettingRespResult;
    /** result information. */
    result_info: ResultInfo;
    /** success response. */
    success: boolean;
    /** array of errors. */
    errors: string[][];
    /** array of messages. */
    messages: SecurityLevelSettingRespMessagesItem[];
  }

}

export = FirewallApiV1;
