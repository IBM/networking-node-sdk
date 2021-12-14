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
 * IBM OpenAPI SDK Code Generator Version: 3.43.0-49eab5c7-20211117-152138
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  getMissingParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../../lib/common';

/**
 * Filters
 *
 * API Version: 1.0.1
 */

class FiltersV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'filters';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of FiltersV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {FiltersV1}
   */

  public static newInstance(options: UserOptions): FiltersV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new FiltersV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a FiltersV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {FiltersV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(FiltersV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * filters
   ************************/

  /**
   * List all filters for a zone.
   *
   * List all filters for a zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthUserToken - IBM Cloud user IAM token.
   * @param {string} params.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} params.zoneIdentifier - Zone identifier of the zone for which filters are listed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FiltersV1.Response<FiltersV1.ListFiltersResp>>}
   */
  public listAllFilters(
    params: FiltersV1.ListAllFiltersParams
  ): Promise<FiltersV1.Response<FiltersV1.ListFiltersResp>> {
    const _params = { ...params };
    const requiredParams = ['xAuthUserToken', 'crn', 'zoneIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      FiltersV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listAllFilters'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/filters',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Auth-User-Token': _params.xAuthUserToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create filters for a zone.
   *
   * Create new filters for a given zone under a service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthUserToken - IBM Cloud user IAM token.
   * @param {string} params.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} params.zoneIdentifier - Zone identifier of the zone for which filters are created.
   * @param {FilterInput[]} [params.filterInput] - Json objects which are used to create filters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FiltersV1.Response<FiltersV1.FiltersResp>>}
   */
  public createFilter(
    params: FiltersV1.CreateFilterParams
  ): Promise<FiltersV1.Response<FiltersV1.FiltersResp>> {
    const _params = { ...params };
    const requiredParams = ['xAuthUserToken', 'crn', 'zoneIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.filterInput;
    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      FiltersV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createFilter'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/filters',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-User-Token': _params.xAuthUserToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update filters.
   *
   * Update existing filters for a given zone under a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthUserToken - IBM Cloud user IAM token.
   * @param {string} params.crn - Full crn of the service instance.
   * @param {string} params.zoneIdentifier - Zone identifier (zone id).
   * @param {FilterUpdateInput[]} [params.filterUpdateInput] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FiltersV1.Response<FiltersV1.FiltersResp>>}
   */
  public updateFilters(
    params: FiltersV1.UpdateFiltersParams
  ): Promise<FiltersV1.Response<FiltersV1.FiltersResp>> {
    const _params = { ...params };
    const requiredParams = ['xAuthUserToken', 'crn', 'zoneIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.filterUpdateInput;
    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      FiltersV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateFilters'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/filters',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-User-Token': _params.xAuthUserToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete filters.
   *
   * Delete filters by filter ids.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthUserToken - IBM Cloud user IAM token.
   * @param {string} params.crn - Full crn of the service instance.
   * @param {string} params.zoneIdentifier - Identifier of zone whose filters are to be deleted.
   * @param {string} params.id - ids of filters which will be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FiltersV1.Response<FiltersV1.DeleteFiltersResp>>}
   */
  public deleteFilters(
    params: FiltersV1.DeleteFiltersParams
  ): Promise<FiltersV1.Response<FiltersV1.DeleteFiltersResp>> {
    const _params = { ...params };
    const requiredParams = ['xAuthUserToken', 'crn', 'zoneIdentifier', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'id': _params.id,
    };

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      FiltersV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteFilters'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/filters',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Auth-User-Token': _params.xAuthUserToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a filter.
   *
   * Delete a filter given its id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthUserToken - IBM Cloud user IAM token.
   * @param {string} params.crn - Full crn of the service instance.
   * @param {string} params.zoneIdentifier - Identifier of zone whose filter is to be deleted.
   * @param {string} params.filterIdentifier - Identifier of the filter to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FiltersV1.Response<FiltersV1.DeleteFilterResp>>}
   */
  public deleteFilter(
    params: FiltersV1.DeleteFilterParams
  ): Promise<FiltersV1.Response<FiltersV1.DeleteFilterResp>> {
    const _params = { ...params };
    const requiredParams = ['xAuthUserToken', 'crn', 'zoneIdentifier', 'filterIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
      'filter_identifier': _params.filterIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      FiltersV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteFilter'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/filters/{filter_identifier}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Auth-User-Token': _params.xAuthUserToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get filter details by id.
   *
   * Get the details of a filter for a given zone under a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthUserToken - IBM Cloud user IAM token.
   * @param {string} params.crn - Full crn of the service instance.
   * @param {string} params.zoneIdentifier - Zone identifier (zone id).
   * @param {string} params.filterIdentifier - Identifier of filter for the given zone.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FiltersV1.Response<FiltersV1.FilterResp>>}
   */
  public getFilter(
    params: FiltersV1.GetFilterParams
  ): Promise<FiltersV1.Response<FiltersV1.FilterResp>> {
    const _params = { ...params };
    const requiredParams = ['xAuthUserToken', 'crn', 'zoneIdentifier', 'filterIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
      'filter_identifier': _params.filterIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      FiltersV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getFilter'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/filters/{filter_identifier}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Auth-User-Token': _params.xAuthUserToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a filter.
   *
   * Update an existing filter for a given zone under a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthUserToken - IBM Cloud user IAM token.
   * @param {string} params.crn - Full crn of the service instance.
   * @param {string} params.zoneIdentifier - Zone identifier (zone id).
   * @param {string} params.filterIdentifier - Identifier of filter.
   * @param {string} [params.id] - Identifier of the filter.
   * @param {string} [params.expression] - A filter expression.
   * @param {string} [params.description] - To briefly describe the filter.
   * @param {boolean} [params.paused] - Indicates if the filter is active.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FiltersV1.Response<FiltersV1.FilterResp>>}
   */
  public updateFilter(
    params: FiltersV1.UpdateFilterParams
  ): Promise<FiltersV1.Response<FiltersV1.FilterResp>> {
    const _params = { ...params };
    const requiredParams = ['xAuthUserToken', 'crn', 'zoneIdentifier', 'filterIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'id': _params.id,
      'expression': _params.expression,
      'description': _params.description,
      'paused': _params.paused,
    };

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
      'filter_identifier': _params.filterIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      FiltersV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateFilter'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/filters/{filter_identifier}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-User-Token': _params.xAuthUserToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace FiltersV1 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listAllFilters` operation. */
  export interface ListAllFiltersParams {
    /** IBM Cloud user IAM token. */
    xAuthUserToken: string;
    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;
    /** Zone identifier of the zone for which filters are listed. */
    zoneIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createFilter` operation. */
  export interface CreateFilterParams {
    /** IBM Cloud user IAM token. */
    xAuthUserToken: string;
    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;
    /** Zone identifier of the zone for which filters are created. */
    zoneIdentifier: string;
    /** Json objects which are used to create filters. */
    filterInput?: FilterInput[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateFilters` operation. */
  export interface UpdateFiltersParams {
    /** IBM Cloud user IAM token. */
    xAuthUserToken: string;
    /** Full crn of the service instance. */
    crn: string;
    /** Zone identifier (zone id). */
    zoneIdentifier: string;
    filterUpdateInput?: FilterUpdateInput[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteFilters` operation. */
  export interface DeleteFiltersParams {
    /** IBM Cloud user IAM token. */
    xAuthUserToken: string;
    /** Full crn of the service instance. */
    crn: string;
    /** Identifier of zone whose filters are to be deleted. */
    zoneIdentifier: string;
    /** ids of filters which will be deleted. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteFilter` operation. */
  export interface DeleteFilterParams {
    /** IBM Cloud user IAM token. */
    xAuthUserToken: string;
    /** Full crn of the service instance. */
    crn: string;
    /** Identifier of zone whose filter is to be deleted. */
    zoneIdentifier: string;
    /** Identifier of the filter to be deleted. */
    filterIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getFilter` operation. */
  export interface GetFilterParams {
    /** IBM Cloud user IAM token. */
    xAuthUserToken: string;
    /** Full crn of the service instance. */
    crn: string;
    /** Zone identifier (zone id). */
    zoneIdentifier: string;
    /** Identifier of filter for the given zone. */
    filterIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateFilter` operation. */
  export interface UpdateFilterParams {
    /** IBM Cloud user IAM token. */
    xAuthUserToken: string;
    /** Full crn of the service instance. */
    crn: string;
    /** Zone identifier (zone id). */
    zoneIdentifier: string;
    /** Identifier of filter. */
    filterIdentifier: string;
    /** Identifier of the filter. */
    id?: string;
    /** A filter expression. */
    expression?: string;
    /** To briefly describe the filter. */
    description?: string;
    /** Indicates if the filter is active. */
    paused?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Container for response information. */
  export interface DeleteFilterRespResult {
    /** Identifier of the filter. */
    id: string;
  }

  /** DeleteFiltersRespResultItem. */
  export interface DeleteFiltersRespResultItem {
    /** Identifier of the filter. */
    id: string;
  }

  /** Statistics of results. */
  export interface ListFiltersRespResultInfo {
    /** Page number. */
    page: number;
    /** Number of results per page. */
    per_page: number;
    /** Number of results. */
    count: number;
    /** Total number of results. */
    total_count: number;
  }

  /** DeleteFilterResp. */
  export interface DeleteFilterResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: DeleteFilterRespResult;
  }

  /** DeleteFiltersResp. */
  export interface DeleteFiltersResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: DeleteFiltersRespResultItem[];
  }

  /** Json objects which are used to create filters. */
  export interface FilterInput {
    /** A filter expression. */
    expression: string;
    /** Indicates if the filter is active. */
    paused?: boolean;
    /** To briefly describe the filter, omitted from object if empty. */
    description?: string;
  }

  /** FilterObject. */
  export interface FilterObject {
    /** Identifier of the filter. */
    id: string;
    /** Indicates if the filter is active. */
    paused: boolean;
    /** To briefly describe the filter, omitted from object if empty. */
    description: string;
    /** A filter expression. */
    expression: string;
    /** The creation date-time of the filter. */
    created_on: string;
    /** The modification date-time of the filter. */
    modified_on: string;
  }

  /** FilterResp. */
  export interface FilterResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    result: FilterObject;
  }

  /** FilterUpdateInput. */
  export interface FilterUpdateInput {
    /** Identifier of the filter. */
    id: string;
    /** A filter expression. */
    expression: string;
    /** To briefly describe the filter. */
    description?: string;
    /** Indicates if the filter is active. */
    paused?: boolean;
  }

  /** FiltersResp. */
  export interface FiltersResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: FilterObject[];
  }

  /** ListFiltersResp. */
  export interface ListFiltersResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: FilterObject[];
    /** Statistics of results. */
    result_info: ListFiltersRespResultInfo;
  }
}

export = FiltersV1;
