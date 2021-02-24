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
 * This document describes CIS caching  API.
 */

class CachingApiV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'caching_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of CachingApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {CachingApiV1}
   */

  public static newInstance(options: UserOptions): CachingApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new CachingApiV1(options);
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
   * Construct a CachingApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - cloud resource name.
   * @param {string} options.zoneId - zone id.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {CachingApiV1}
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
      this.setServiceUrl(CachingApiV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneId = options.zoneId;
  }

  /*************************
   * cacheSettings
   ************************/

  /**
   * Purge all.
   *
   * All resources in CDN edge servers' cache should be removed. This may have dramatic affects on your origin server
   * load after performing this action.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CachingApiV1.Response<CachingApiV1.PurgeAllResponse>>}
   */
  public purgeAll(params?: CachingApiV1.PurgeAllParams): Promise<CachingApiV1.Response<CachingApiV1.PurgeAllResponse>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(CachingApiV1.DEFAULT_SERVICE_NAME, 'v1', 'purgeAll');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/purge_cache/purge_all',
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

  /**
   * Purge URLs.
   *
   * Granularly remove one or more files from CDN edge servers' cache either by specifying URLs.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string[]} [params.files] - purge url array.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CachingApiV1.Response<CachingApiV1.PurgeAllResponse>>}
   */
  public purgeByUrls(params?: CachingApiV1.PurgeByUrlsParams): Promise<CachingApiV1.Response<CachingApiV1.PurgeAllResponse>> {
    const _params = Object.assign({}, params);

    const body = {
      'files': _params.files
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(CachingApiV1.DEFAULT_SERVICE_NAME, 'v1', 'purgeByUrls');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/purge_cache/purge_by_urls',
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
   * Purge Cache-Tags.
   *
   * Granularly remove one or more files from CDN edge servers' cache either by specifying the associated Cache-Tags.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string[]} [params.tags] - array of tags.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CachingApiV1.Response<CachingApiV1.PurgeAllResponse>>}
   */
  public purgeByCacheTags(params?: CachingApiV1.PurgeByCacheTagsParams): Promise<CachingApiV1.Response<CachingApiV1.PurgeAllResponse>> {
    const _params = Object.assign({}, params);

    const body = {
      'tags': _params.tags
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(CachingApiV1.DEFAULT_SERVICE_NAME, 'v1', 'purgeByCacheTags');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/purge_cache/purge_by_cache_tags',
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
   * Purge host names.
   *
   * Granularly remove one or more files from CDN edge servers' cache either by specifying the hostnames.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string[]} [params.hosts] - hosts name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CachingApiV1.Response<CachingApiV1.PurgeAllResponse>>}
   */
  public purgeByHosts(params?: CachingApiV1.PurgeByHostsParams): Promise<CachingApiV1.Response<CachingApiV1.PurgeAllResponse>> {
    const _params = Object.assign({}, params);

    const body = {
      'hosts': _params.hosts
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(CachingApiV1.DEFAULT_SERVICE_NAME, 'v1', 'purgeByHosts');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/purge_cache/purge_by_hosts',
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
   * Get browser cache TTL setting.
   *
   * Browser Cache TTL (in seconds) specifies how long CDN edge servers cached resources will remain on your visitors'
   * computers.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CachingApiV1.Response<CachingApiV1.BrowserTTLResponse>>}
   */
  public getBrowserCacheTtl(params?: CachingApiV1.GetBrowserCacheTtlParams): Promise<CachingApiV1.Response<CachingApiV1.BrowserTTLResponse>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(CachingApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getBrowserCacheTtl');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/settings/browser_cache_ttl',
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
   * Change browser cache TTL setting.
   *
   * Browser Cache TTL (in seconds) specifies how long CDN edge servers cached resources will remain on your visitors'
   * computers.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.value] - ttl value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CachingApiV1.Response<CachingApiV1.BrowserTTLResponse>>}
   */
  public updateBrowserCacheTtl(params?: CachingApiV1.UpdateBrowserCacheTtlParams): Promise<CachingApiV1.Response<CachingApiV1.BrowserTTLResponse>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(CachingApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateBrowserCacheTtl');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/settings/browser_cache_ttl',
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
   * Get development mode setting.
   *
   * Get development mode setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CachingApiV1.Response<CachingApiV1.DeveopmentModeResponse>>}
   */
  public getDevelopmentMode(params?: CachingApiV1.GetDevelopmentModeParams): Promise<CachingApiV1.Response<CachingApiV1.DeveopmentModeResponse>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(CachingApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getDevelopmentMode');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/settings/development_mode',
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
   * Change development mode setting.
   *
   * Change development mode setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - on/off value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CachingApiV1.Response<CachingApiV1.DeveopmentModeResponse>>}
   */
  public updateDevelopmentMode(params?: CachingApiV1.UpdateDevelopmentModeParams): Promise<CachingApiV1.Response<CachingApiV1.DeveopmentModeResponse>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(CachingApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateDevelopmentMode');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/settings/development_mode',
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
   * Get Enable Query String Sort setting.
   *
   * Get Enable Query String Sort setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CachingApiV1.Response<CachingApiV1.EnableQueryStringSortResponse>>}
   */
  public getQueryStringSort(params?: CachingApiV1.GetQueryStringSortParams): Promise<CachingApiV1.Response<CachingApiV1.EnableQueryStringSortResponse>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(CachingApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getQueryStringSort');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/settings/sort_query_string_for_cache',
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
   * Change Enable Query String Sort setting.
   *
   * Change Enable Query String Sort setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - on/off property value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CachingApiV1.Response<CachingApiV1.EnableQueryStringSortResponse>>}
   */
  public updateQueryStringSort(params?: CachingApiV1.UpdateQueryStringSortParams): Promise<CachingApiV1.Response<CachingApiV1.EnableQueryStringSortResponse>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(CachingApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateQueryStringSort');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/settings/sort_query_string_for_cache',
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

  /*************************
   * cacheLevel
   ************************/

  /**
   * Get cache level setting.
   *
   * Get cache level setting of a specific zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CachingApiV1.Response<CachingApiV1.CacheLevelResponse>>}
   */
  public getCacheLevel(params?: CachingApiV1.GetCacheLevelParams): Promise<CachingApiV1.Response<CachingApiV1.CacheLevelResponse>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(CachingApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getCacheLevel');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/settings/cache_level',
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
   * Set cache level setting.
   *
   * The `basic` setting will cache most static resources (i.e., css, images, and JavaScript). The `simplified` setting
   * will ignore the query string when delivering a cached resource. The `aggressive` setting will cache all static
   * resources, including ones with a query string.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - cache level.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CachingApiV1.Response<CachingApiV1.CacheLevelResponse>>}
   */
  public updateCacheLevel(params?: CachingApiV1.UpdateCacheLevelParams): Promise<CachingApiV1.Response<CachingApiV1.CacheLevelResponse>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(CachingApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateCacheLevel');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/settings/cache_level',
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

namespace CachingApiV1 {

  /** Options for the `CachingApiV1` constructor. */
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

  /** Parameters for the `purgeAll` operation. */
  export interface PurgeAllParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `purgeByUrls` operation. */
  export interface PurgeByUrlsParams {
    /** purge url array. */
    files?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `purgeByCacheTags` operation. */
  export interface PurgeByCacheTagsParams {
    /** array of tags. */
    tags?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `purgeByHosts` operation. */
  export interface PurgeByHostsParams {
    /** hosts name. */
    hosts?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getBrowserCacheTtl` operation. */
  export interface GetBrowserCacheTtlParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateBrowserCacheTtl` operation. */
  export interface UpdateBrowserCacheTtlParams {
    /** ttl value. */
    value?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDevelopmentMode` operation. */
  export interface GetDevelopmentModeParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDevelopmentMode` operation. */
  export interface UpdateDevelopmentModeParams {
    /** on/off value. */
    value?: UpdateDevelopmentModeConstants.Value | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateDevelopmentMode` operation. */
  export namespace UpdateDevelopmentModeConstants {
    /** on/off value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getQueryStringSort` operation. */
  export interface GetQueryStringSortParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateQueryStringSort` operation. */
  export interface UpdateQueryStringSortParams {
    /** on/off property value. */
    value?: UpdateQueryStringSortConstants.Value | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateQueryStringSort` operation. */
  export namespace UpdateQueryStringSortConstants {
    /** on/off property value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getCacheLevel` operation. */
  export interface GetCacheLevelParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateCacheLevel` operation. */
  export interface UpdateCacheLevelParams {
    /** cache level. */
    value?: UpdateCacheLevelConstants.Value | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateCacheLevel` operation. */
  export namespace UpdateCacheLevelConstants {
    /** cache level. */
    export enum Value {
      BASIC = 'basic',
      SIMPLIFIED = 'simplified',
      AGGRESSIVE = 'aggressive',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** result object. */
  export interface BrowserTTLResponseResult {
    /** ttl type. */
    id?: string;
    /** ttl value. */
    value?: number;
    /** editable. */
    editable?: boolean;
    /** modified date. */
    modified_on?: string;
  }

  /** result. */
  export interface CacheLevelResponseResult {
    /** cache level. */
    id?: string;
    /** cache level. */
    value?: string;
    /** editable value. */
    editable?: boolean;
    /** modified date. */
    modified_on?: string;
  }

  /** result object. */
  export interface DeveopmentModeResponseResult {
    /** object id. */
    id?: string;
    /** on/off value. */
    value?: string;
    /** editable value. */
    editable?: boolean;
    /** modified date. */
    modified_on?: string;
  }

  /** result of sort query string. */
  export interface EnableQueryStringSortResponseResult {
    /** cache id. */
    id?: string;
    /** on/off value. */
    value?: string;
    /** editable propery. */
    editable?: boolean;
    /** modified date. */
    modified_on?: string;
  }

  /** purge object. */
  export interface PurgeAllResponseResult {
    /** purge id. */
    id?: string;
  }

  /** browser ttl response. */
  export interface BrowserTTLResponse {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result object. */
    result: BrowserTTLResponseResult;
  }

  /** cache level response. */
  export interface CacheLevelResponse {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: CacheLevelResponseResult;
  }

  /** development mode response. */
  export interface DeveopmentModeResponse {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result object. */
    result: DeveopmentModeResponseResult;
  }

  /** sort query string response. */
  export interface EnableQueryStringSortResponse {
    /** success response true/false. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result of sort query string. */
    result: EnableQueryStringSortResponseResult;
  }

  /** purge all response. */
  export interface PurgeAllResponse {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** purge object. */
    result: PurgeAllResponseResult;
  }

}

export = CachingApiV1;
