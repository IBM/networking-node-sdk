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
 * Routing
 */

class RoutingV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'routing';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of RoutingV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {RoutingV1}
   */

  public static newInstance(options: UserOptions): RoutingV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new RoutingV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Full url-encoded cloud resource name (CRN) of resource instance. */
  crn: string;

  /** Zone identifier. */
  zoneIdentifier: string;

  /**
   * Construct a RoutingV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} options.zoneIdentifier - Zone identifier.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {RoutingV1}
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
      this.setServiceUrl(RoutingV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * routing
   ************************/

  /**
   * Get Routing feature smart routing setting.
   *
   * Get Routing feature smart routing setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RoutingV1.Response<RoutingV1.SmartRoutingResp>>}
   */
  public getSmartRouting(params?: RoutingV1.GetSmartRoutingParams): Promise<RoutingV1.Response<RoutingV1.SmartRoutingResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(RoutingV1.DEFAULT_SERVICE_NAME, 'v1', 'getSmartRouting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/routing/smart_routing',
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
   * Update Routing feature smart route setting.
   *
   * Update Routing feature smart route setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RoutingV1.Response<RoutingV1.SmartRoutingResp>>}
   */
  public updateSmartRouting(params?: RoutingV1.UpdateSmartRoutingParams): Promise<RoutingV1.Response<RoutingV1.SmartRoutingResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(RoutingV1.DEFAULT_SERVICE_NAME, 'v1', 'updateSmartRouting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/routing/smart_routing',
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

namespace RoutingV1 {

  /** Options for the `RoutingV1` constructor. */
  export interface Options extends UserOptions {

    /** Full url-encoded cloud resource name (CRN) of resource instance. */
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

  /** Parameters for the `getSmartRouting` operation. */
  export interface GetSmartRoutingParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSmartRouting` operation. */
  export interface UpdateSmartRoutingParams {
    /** Value. */
    value?: UpdateSmartRoutingConstants.Value | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateSmartRouting` operation. */
  export namespace UpdateSmartRoutingConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** Container for response information. */
  export interface SmartRoutingRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /** smart routing response. */
  export interface SmartRoutingResp {
    /** Container for response information. */
    result: SmartRoutingRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

}

export = RoutingV1;
