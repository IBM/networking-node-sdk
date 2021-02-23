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
 * CIS Zones
 */

class ZonesV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'zones';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of ZonesV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {ZonesV1}
   */

  public static newInstance(options: UserOptions): ZonesV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new ZonesV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Full url-encoded CRN of the service instance. */
  crn: string;

  /**
   * Construct a ZonesV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded CRN of the service instance.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ZonesV1}
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
      this.setServiceUrl(ZonesV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
  }

  /*************************
   * cISZones
   ************************/

  /**
   * List all zones.
   *
   * List all zones for a service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.page] - Page number of paginated results.
   * @param {number} [params.perPage] - Maximum number of zones per page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesV1.Response<ZonesV1.ListZonesResp>>}
   */
  public listZones(params?: ZonesV1.ListZonesParams): Promise<ZonesV1.Response<ZonesV1.ListZonesResp>> {
    const _params = Object.assign({}, params);

    const query = {
      'page': _params.page,
      'per_page': _params.perPage
    };

    const path = {
      'crn': this.crn
    };

    const sdkHeaders = getSdkHeaders(ZonesV1.DEFAULT_SERVICE_NAME, 'v1', 'listZones');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones',
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
   * Create zone.
   *
   * Add a new zone for a given service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesV1.Response<ZonesV1.ZoneResp>>}
   */
  public createZone(params?: ZonesV1.CreateZoneParams): Promise<ZonesV1.Response<ZonesV1.ZoneResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'name': _params.name
    };

    const path = {
      'crn': this.crn
    };

    const sdkHeaders = getSdkHeaders(ZonesV1.DEFAULT_SERVICE_NAME, 'v1', 'createZone');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones',
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
   * Delete zone.
   *
   * Delete a zone given its id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneIdentifier - Identifier of zone.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesV1.Response<ZonesV1.DeleteZoneResp>>}
   */
  public deleteZone(params: ZonesV1.DeleteZoneParams): Promise<ZonesV1.Response<ZonesV1.DeleteZoneResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['zoneIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': _params.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteZone');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}',
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
   * Get zone.
   *
   * Get the details of a zone for a given service instance and given zone id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneIdentifier - Zone identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesV1.Response<ZonesV1.ZoneResp>>}
   */
  public getZone(params: ZonesV1.GetZoneParams): Promise<ZonesV1.Response<ZonesV1.ZoneResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['zoneIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': _params.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesV1.DEFAULT_SERVICE_NAME, 'v1', 'getZone');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}',
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
   * Update zone.
   *
   * Update the paused field of the zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneIdentifier - Zone identifier.
   * @param {boolean} [params.paused] - paused.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesV1.Response<ZonesV1.ZoneResp>>}
   */
  public updateZone(params: ZonesV1.UpdateZoneParams): Promise<ZonesV1.Response<ZonesV1.ZoneResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['zoneIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'paused': _params.paused
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': _params.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesV1.DEFAULT_SERVICE_NAME, 'v1', 'updateZone');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}',
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

  /**
   * Check zone.
   *
   * Perform activation check on zone for status.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneIdentifier - Identifier of zone.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesV1.Response<ZonesV1.ZoneActivationcheckResp>>}
   */
  public zoneActivationCheck(params: ZonesV1.ZoneActivationCheckParams): Promise<ZonesV1.Response<ZonesV1.ZoneActivationcheckResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['zoneIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': _params.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesV1.DEFAULT_SERVICE_NAME, 'v1', 'zoneActivationCheck');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/activation_check',
        method: 'PUT',
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

namespace ZonesV1 {

  /** Options for the `ZonesV1` constructor. */
  export interface Options extends UserOptions {

    /** Full url-encoded CRN of the service instance. */
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

  /** Parameters for the `listZones` operation. */
  export interface ListZonesParams {
    /** Page number of paginated results. */
    page?: number;
    /** Maximum number of zones per page. */
    perPage?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createZone` operation. */
  export interface CreateZoneParams {
    /** name. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteZone` operation. */
  export interface DeleteZoneParams {
    /** Identifier of zone. */
    zoneIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getZone` operation. */
  export interface GetZoneParams {
    /** Zone identifier. */
    zoneIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateZone` operation. */
  export interface UpdateZoneParams {
    /** Zone identifier. */
    zoneIdentifier: string;
    /** paused. */
    paused?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `zoneActivationCheck` operation. */
  export interface ZoneActivationCheckParams {
    /** Identifier of zone. */
    zoneIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** result. */
  export interface DeleteZoneRespResult {
    /** id. */
    id: string;
  }

  /** result. */
  export interface ZoneActivationcheckRespResult {
    /** id. */
    id: string;
  }

  /** delete zone response. */
  export interface DeleteZoneResp {
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: DeleteZoneRespResult;
  }

  /** list zones response. */
  export interface ListZonesResp {
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** zone list. */
    result: ZoneDetails[];
    /** result information. */
    result_info: ResultInfo;
  }

  /** result information. */
  export interface ResultInfo {
    /** page. */
    page: number;
    /** per page. */
    per_page: number;
    /** count. */
    count: number;
    /** total count. */
    total_count: number;
  }

  /** zone activation check response. */
  export interface ZoneActivationcheckResp {
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: ZoneActivationcheckRespResult;
  }

  /** zone details. */
  export interface ZoneDetails {
    /** id. */
    id?: string;
    /** created date. */
    created_on?: string;
    /** modified date. */
    modified_on?: string;
    /** name. */
    name?: string;
    /** original registrar. */
    original_registrar?: string;
    /** orginal dns host. */
    original_dnshost?: string;
    /** status. */
    status?: string;
    /** paused. */
    paused?: boolean;
    /** orginal name servers. */
    original_name_servers?: string[];
    /** name servers. */
    name_servers?: string[];
  }

  /** zone response. */
  export interface ZoneResp {
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** zone details. */
    result: ZoneDetails;
  }

}

export = ZonesV1;
