/**
 * (C) Copyright IBM Corp. 2026.
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
 * IBM OpenAPI SDK Code Generator Version: 3.114.0-a902401e-20260427-192904
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  AbortSignal,
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../../lib/common';

/**
 * CIS Lists
 *
 * API Version: 1.0.0
 */

class ListsApiV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'lists_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of ListsApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {ListsApiV1}
   */

  public static newInstance(options: UserOptions): ListsApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new ListsApiV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /** Full URL-encoded CRN of the service instance. */
  crn: string;

  /** List item identifier. */
  itemId: string;

  /** List identifier. */
  listId: string;

  /** List operation identifier. */
  operationId: string;

  /**
   * Construct a ListsApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full URL-encoded CRN of the service instance.
   * @param {string} options.itemId - List item identifier.
   * @param {string} options.listId - List identifier.
   * @param {string} options.operationId - List operation identifier.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ListsApiV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const _requiredParams = ['crn','itemId','listId','operationId'];
    const _validationErrors = validateParams(options, _requiredParams, null);
    if (_validationErrors) {
      throw _validationErrors;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(ListsApiV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.itemId = options.itemId;
    this.listId = options.listId;
    this.operationId = options.operationId;
  }

  /*************************
   * lists
   ************************/

  /**
   * List Managed Lists.
   *
   * List available managed lists for your instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ListsApiV1.Response<ListsApiV1.ManagedListsResp>>}
   */
  public getManagedLists(
    params?: ListsApiV1.GetManagedListsParams
  ): Promise<ListsApiV1.Response<ListsApiV1.ManagedListsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
    };

    const sdkHeaders = getSdkHeaders(ListsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getManagedLists');

    const parameters = {
      options: {
        url: '/v1/{crn}/rules/managed_lists',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List Custom Lists.
   *
   * List the custom lists for your instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ListsApiV1.Response<ListsApiV1.CustomListsResp>>}
   */
  public getCustomLists(
    params?: ListsApiV1.GetCustomListsParams
  ): Promise<ListsApiV1.Response<ListsApiV1.CustomListsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
    };

    const sdkHeaders = getSdkHeaders(ListsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getCustomLists');

    const parameters = {
      options: {
        url: '/v1/{crn}/rules/lists',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create Custom List.
   *
   * Create a custom list for your instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.kind] - The type of list. Each type supports specific list items (IP addresses, ASNs,
   * hostnames or redirects).
   * @param {string} [params.name] - An informative name for the list. Use this name in rule expressions.
   * @param {string} [params.description] - An informative summary of the list.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ListsApiV1.Response<ListsApiV1.CustomListResp>>}
   */
  public createCustomLists(
    params?: ListsApiV1.CreateCustomListsParams
  ): Promise<ListsApiV1.Response<ListsApiV1.CustomListResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['kind', 'name', 'description', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'kind': _params.kind,
      'name': _params.name,
      'description': _params.description,
    };

    const path = {
      'crn': this.crn,
    };

    const sdkHeaders = getSdkHeaders(ListsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'createCustomLists');

    const parameters = {
      options: {
        url: '/v1/{crn}/rules/lists',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get Custom List.
   *
   * Get a custom list for your instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ListsApiV1.Response<ListsApiV1.CustomListResp>>}
   */
  public getCustomList(
    params?: ListsApiV1.GetCustomListParams
  ): Promise<ListsApiV1.Response<ListsApiV1.CustomListResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'list_id': this.listId,
    };

    const sdkHeaders = getSdkHeaders(ListsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getCustomList');

    const parameters = {
      options: {
        url: '/v1/{crn}/rules/lists/{list_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update Custom List.
   *
   * Update the description of a custom list.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.description] - An informative summary of the list.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ListsApiV1.Response<ListsApiV1.CustomListResp>>}
   */
  public updateCustomList(
    params?: ListsApiV1.UpdateCustomListParams
  ): Promise<ListsApiV1.Response<ListsApiV1.CustomListResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['description', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
    };

    const path = {
      'crn': this.crn,
      'list_id': this.listId,
    };

    const sdkHeaders = getSdkHeaders(ListsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateCustomList');

    const parameters = {
      options: {
        url: '/v1/{crn}/rules/lists/{list_id}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete Custom List.
   *
   * Delete a custom list for your instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ListsApiV1.Response<ListsApiV1.DeleteResourceResp>>}
   */
  public deleteCustomList(
    params?: ListsApiV1.DeleteCustomListParams
  ): Promise<ListsApiV1.Response<ListsApiV1.DeleteResourceResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'list_id': this.listId,
    };

    const sdkHeaders = getSdkHeaders(ListsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteCustomList');

    const parameters = {
      options: {
        url: '/v1/{crn}/rules/lists/{list_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get List Items.
   *
   * Get the list items for a custom list.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.cursor] - The pagination cursor. An opaque string token indicating the position from which
   * to continue when requesting the next/previous set of records. Cursor values are provided under result_info.cursors
   * in the response.
   * @param {number} [params.perPage] - Amount of results to include in each paginated response. A non-negative 32 bit
   * integer. Minimum 1, maximum 500.
   * @param {string} [params.search] - A search query to filter returned items. Its meaning depends on the list type: IP
   * addresses must start with the provided string, hostnames and bulk redirects must contain the string, and ASNs must
   * match the string exactly.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ListsApiV1.Response<ListsApiV1.ListItemsResp>>}
   */
  public getListItems(
    params?: ListsApiV1.GetListItemsParams
  ): Promise<ListsApiV1.Response<ListsApiV1.ListItemsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['cursor', 'perPage', 'search', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'cursor': _params.cursor,
      'per_page': _params.perPage,
      'search': _params.search,
    };

    const path = {
      'crn': this.crn,
      'list_id': this.listId,
    };

    const sdkHeaders = getSdkHeaders(ListsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getListItems');

    const parameters = {
      options: {
        url: '/v1/{crn}/rules/lists/{list_id}/items',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create List Items.
   *
   * Create list items for your custom list. This operation is asynchronous. To get current the operation status, use
   * the get operation status API.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {CreateListItemsReqItem[]} [params.createListItemsReqItem] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ListsApiV1.Response<ListsApiV1.ListOperationResp>>}
   */
  public createListItems(
    params?: ListsApiV1.CreateListItemsParams
  ): Promise<ListsApiV1.Response<ListsApiV1.ListOperationResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['createListItemsReqItem', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.createListItemsReqItem;
    const path = {
      'crn': this.crn,
      'list_id': this.listId,
    };

    const sdkHeaders = getSdkHeaders(ListsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'createListItems');

    const parameters = {
      options: {
        url: '/v1/{crn}/rules/lists/{list_id}/items',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete List Items.
   *
   * Remove one or more list items from your custom list. This operation is asynchronous. To get current the operation
   * status, use the get operation status API.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {DeleteListItemsReqItemsItem[]} [params.items] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ListsApiV1.Response<ListsApiV1.ListOperationResp>>}
   */
  public deleteListItems(
    params?: ListsApiV1.DeleteListItemsParams
  ): Promise<ListsApiV1.Response<ListsApiV1.ListOperationResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['items', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'items': _params.items,
    };

    const path = {
      'crn': this.crn,
      'list_id': this.listId,
    };

    const sdkHeaders = getSdkHeaders(ListsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteListItems');

    const parameters = {
      options: {
        url: '/v1/{crn}/rules/lists/{list_id}/items',
        method: 'DELETE',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update All List Items.
   *
   * Update all list items for your custom list. This removes existing items from the list. This operation is
   * asynchronous. To get current the operation status, use the get operation status API.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {CreateListItemsReqItem[]} [params.createListItemsReqItem] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ListsApiV1.Response<ListsApiV1.ListOperationResp>>}
   */
  public updateListItems(
    params?: ListsApiV1.UpdateListItemsParams
  ): Promise<ListsApiV1.Response<ListsApiV1.ListOperationResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['createListItemsReqItem', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.createListItemsReqItem;
    const path = {
      'crn': this.crn,
      'list_id': this.listId,
    };

    const sdkHeaders = getSdkHeaders(ListsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateListItems');

    const parameters = {
      options: {
        url: '/v1/{crn}/rules/lists/{list_id}/items',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get List Item.
   *
   * Get a specific list item.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ListsApiV1.Response<ListsApiV1.ListItemResp>>}
   */
  public getListItem(
    params?: ListsApiV1.GetListItemParams
  ): Promise<ListsApiV1.Response<ListsApiV1.ListItemResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'list_id': this.listId,
      'item_id': this.itemId,
    };

    const sdkHeaders = getSdkHeaders(ListsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getListItem');

    const parameters = {
      options: {
        url: '/v1/{crn}/rules/lists/{list_id}/items/{item_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get List Operation Status.
   *
   * Get the operation status for a custom list operation.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ListsApiV1.Response<ListsApiV1.OperationStatusResp>>}
   */
  public getOperationStatus(
    params?: ListsApiV1.GetOperationStatusParams
  ): Promise<ListsApiV1.Response<ListsApiV1.OperationStatusResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'operation_id': this.operationId,
    };

    const sdkHeaders = getSdkHeaders(ListsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getOperationStatus');

    const parameters = {
      options: {
        url: '/v1/{crn}/rules/lists/bulk_operations/{operation_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace ListsApiV1 {
  /** Options for the `ListsApiV1` constructor. */
  export interface Options extends UserOptions {
    /** Full URL-encoded CRN of the service instance. */
    crn: string;
    /** List item identifier. */
    itemId: string;
    /** List identifier. */
    listId: string;
    /** List operation identifier. */
    operationId: string;
  }

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
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

   interface DefaultParams {
     headers?: OutgoingHttpHeaders;
     signal?: AbortSignal;
   }

  /** Parameters for the `getManagedLists` operation. */
  export interface GetManagedListsParams extends DefaultParams {
  }

  /** Parameters for the `getCustomLists` operation. */
  export interface GetCustomListsParams extends DefaultParams {
  }

  /** Parameters for the `createCustomLists` operation. */
  export interface CreateCustomListsParams extends DefaultParams {
    /** The type of list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects). */
    kind?: CreateCustomListsConstants.Kind | string;
    /** An informative name for the list. Use this name in rule expressions. */
    name?: string;
    /** An informative summary of the list. */
    description?: string;
  }

  /** Constants for the `createCustomLists` operation. */
  export namespace CreateCustomListsConstants {
    /** The type of list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects). */
    export enum Kind {
      IP = 'ip',
      REDIRECT = 'redirect',
      HOSTNAME = 'hostname',
      ASN = 'asn',
    }
  }

  /** Parameters for the `getCustomList` operation. */
  export interface GetCustomListParams extends DefaultParams {
  }

  /** Parameters for the `updateCustomList` operation. */
  export interface UpdateCustomListParams extends DefaultParams {
    /** An informative summary of the list. */
    description?: string;
  }

  /** Parameters for the `deleteCustomList` operation. */
  export interface DeleteCustomListParams extends DefaultParams {
  }

  /** Parameters for the `getListItems` operation. */
  export interface GetListItemsParams extends DefaultParams {
    /** The pagination cursor. An opaque string token indicating the position from which to continue when requesting
     *  the next/previous set of records. Cursor values are provided under result_info.cursors in the response.
     */
    cursor?: string;
    /** Amount of results to include in each paginated response. A non-negative 32 bit integer. Minimum 1, maximum
     *  500.
     */
    perPage?: number;
    /** A search query to filter returned items. Its meaning depends on the list type: IP addresses must start with
     *  the provided string, hostnames and bulk redirects must contain the string, and ASNs must match the string
     *  exactly.
     */
    search?: string;
  }

  /** Parameters for the `createListItems` operation. */
  export interface CreateListItemsParams extends DefaultParams {
    createListItemsReqItem?: CreateListItemsReqItem[];
  }

  /** Parameters for the `deleteListItems` operation. */
  export interface DeleteListItemsParams extends DefaultParams {
    items?: DeleteListItemsReqItemsItem[];
  }

  /** Parameters for the `updateListItems` operation. */
  export interface UpdateListItemsParams extends DefaultParams {
    createListItemsReqItem?: CreateListItemsReqItem[];
  }

  /** Parameters for the `getListItem` operation. */
  export interface GetListItemParams extends DefaultParams {
  }

  /** Parameters for the `getOperationStatus` operation. */
  export interface GetOperationStatusParams extends DefaultParams {
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * CreateListItemsReqItem.
   */
  export interface CreateListItemsReqItem {
    /** An autonomous system number. */
    asn?: number;
    /** An informative summary of the list item. */
    comment?: string;
    /** Valid characters for hostnames are ASCII(7) letters from a to z, the digits from 0 to 9, wildcards (*), and
     *  the hyphen (-).
     */
    hostname?: string;
    /** An IPv4 address, an IPv4 CIDR, or an IPv6 CIDR. IPv6 CIDRs are limited to a maximum of /64. */
    ip?: string;
  }

  /**
   * DeleteListItemsReqItemsItem.
   */
  export interface DeleteListItemsReqItemsItem {
    id?: string;
  }

  /**
   * DeleteResourceRespResult.
   */
  export interface DeleteResourceRespResult {
    id?: string;
  }

  /**
   * ListOperationRespResult.
   */
  export interface ListOperationRespResult {
    operation_id?: string;
  }

  /**
   * ManagedListsResultItem.
   */
  export interface ManagedListsResultItem {
    /** The name of the list to be referenced by rule expressions. */
    name?: string;
    /** Describes the contents of the managed list. */
    description?: string;
    /** The type of resource this list contains. */
    kind?: string;
  }

  /**
   * OperationStatusRespResult.
   */
  export interface OperationStatusRespResult {
    id?: string;
    status?: OperationStatusRespResult.Constants.Status | string;
    completed?: string;
    /** A message describing the error when the status is failed. */
    error?: string;
  }
  export namespace OperationStatusRespResult {
    export namespace Constants {
      /** Status */
      export enum Status {
        PENDING = 'pending',
        RUNNING = 'running',
        COMPLETED = 'completed',
        FAILED = 'failed',
      }
    }
  }

  /**
   * Create Custom List Response.
   */
  export interface CustomListResp {
    /** Was operation successful. */
    success: boolean;
    /** Errors. */
    errors: string[][];
    /** Messages. */
    messages: string[][];
    result: CustomListResult;
  }

  /**
   * CustomListResult.
   */
  export interface CustomListResult {
    /** The name of the list to be referenced by rule expressions. */
    name?: string;
    /** The unique ID of the list. */
    id?: string;
    /** Describes the contents of the list. */
    description?: string;
    /** The type of resource this list contains. */
    kind?: string;
    /** How many items the list contains. */
    num_items?: number;
    /** How many times the list is used by rule expressions. */
    num_referencing_filters?: number;
  }

  /**
   * List Custom Lists Response.
   */
  export interface CustomListsResp {
    /** Was operation successful. */
    success: boolean;
    /** Errors. */
    errors: string[][];
    /** Messages. */
    messages: string[][];
    result: CustomListResult[];
  }

  /**
   * DeleteResourceResp.
   */
  export interface DeleteResourceResp {
    /** Was operation successful. */
    success: boolean;
    /** Errors. */
    errors: string[][];
    /** Messages. */
    messages: string[][];
    result: DeleteResourceRespResult;
  }

  /**
   * ListCursor.
   */
  export interface ListCursor {
    /** The cursor token to fetch the next page of results. */
    after?: string;
    /** The cursor token to fetch the previous page of results. */
    before?: string;
  }

  /**
   * ListItem.
   */
  export interface ListItem {
    id?: string;
    /** An autonomous system number. */
    asn?: number;
    /** An informative summary of the list item. */
    comment?: string;
    /** Valid characters for hostnames are ASCII(7) letters from a to z, the digits from 0 to 9, wildcards (*), and
     *  the hyphen (-).
     */
    hostname?: string;
    /** An IPv4 address, an IPv4 CIDR, or an IPv6 CIDR. IPv6 CIDRs are limited to a maximum of /64. */
    ip?: string;
    created_on?: string;
    modified_on?: string;
  }

  /**
   * ListItemResp.
   */
  export interface ListItemResp {
    /** Was operation successful. */
    success: boolean;
    /** Errors. */
    errors: string[][];
    /** Messages. */
    messages: string[][];
    result: ListItem;
  }

  /**
   * ListItemsResp.
   */
  export interface ListItemsResp {
    /** Was operation successful. */
    success: boolean;
    /** Errors. */
    errors: string[][];
    /** Messages. */
    messages: string[][];
    result: ListItem[];
    result_info?: ListItemsResultInfo;
  }

  /**
   * ListItemsResultInfo.
   */
  export interface ListItemsResultInfo {
    cursors?: ListCursor;
  }

  /**
   * ListOperationResp.
   */
  export interface ListOperationResp {
    /** Was operation successful. */
    success: boolean;
    /** Errors. */
    errors: string[][];
    /** Messages. */
    messages: string[][];
    result: ListOperationRespResult;
  }

  /**
   * List Managed Lists Response.
   */
  export interface ManagedListsResp {
    /** Was operation successful. */
    success: boolean;
    /** Errors. */
    errors: string[][];
    /** Messages. */
    messages: string[][];
    result: ManagedListsResultItem[];
  }

  /**
   * OperationStatusResp.
   */
  export interface OperationStatusResp {
    /** Was operation successful. */
    success: boolean;
    /** Errors. */
    errors: string[][];
    /** Messages. */
    messages: string[][];
    result: OperationStatusRespResult;
  }
}

export = ListsApiV1;
