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
 * IBM OpenAPI SDK Code Generator Version: 3.117.0-7f07c563-20260915-094553
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
 * AI Security for Apps
 *
 * API Version: 1.0.0
 */

class AiSecurityForAppsV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'ai_security_for_apps';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of AiSecurityForAppsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {AiSecurityForAppsV1}
   */

  public static newInstance(options: UserOptions): AiSecurityForAppsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new AiSecurityForAppsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /** Full url-encoded CRN of the service instance. */
  crn: string;

  /** Zone identifier to identify the zone. */
  zoneIdentifier: string;

  /**
   * Construct a AiSecurityForAppsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded CRN of the service instance.
   * @param {string} options.zoneIdentifier - Zone identifier to identify the zone.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {AiSecurityForAppsV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const _requiredParams = ['crn','zoneIdentifier'];
    const _validationErrors = validateParams(options, _requiredParams, null);
    if (_validationErrors) {
      throw _validationErrors;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(AiSecurityForAppsV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * aISecuritySettings
   ************************/

  /**
   * Get AI Security for Apps settings.
   *
   * Get AI Security for Apps enabled/disabled setting for a given zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.AiSecuritySettingsResp>>}
   */
  public getAiSecuritySettings(
    params?: AiSecurityForAppsV1.GetAiSecuritySettingsParams
  ): Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.AiSecuritySettingsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(AiSecurityForAppsV1.DEFAULT_SERVICE_NAME, 'v1', 'getAiSecuritySettings');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/ai_security/settings',
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
   * Update AI Security for Apps settings.
   *
   * Enable or disable AI Security for Apps for a given zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.enabled] - Set to true to enable AI Security for Apps, false to disable.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.AiSecuritySettingsResp>>}
   */
  public replaceZoneAiSecuritySettings(
    params?: AiSecurityForAppsV1.ReplaceZoneAiSecuritySettingsParams
  ): Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.AiSecuritySettingsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['enabled', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'enabled': _params.enabled,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(AiSecurityForAppsV1.DEFAULT_SERVICE_NAME, 'v1', 'replaceZoneAiSecuritySettings');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/ai_security/settings',
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
  /*************************
   * aPIGatewayDiscovery
   ************************/

  /**
   * Get API Gateway discovery.
   *
   * Retrieve discovered operations for a zone rendered as OpenAPI schemas. Use this to identify AI-powered endpoints,
   * save them to Endpoint Management, and label them to enable AI Security for Apps scanning.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.ApiGatewayDiscoveryResp>>}
   */
  public getApiGatewayDiscovery(
    params?: AiSecurityForAppsV1.GetApiGatewayDiscoveryParams
  ): Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.ApiGatewayDiscoveryResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(AiSecurityForAppsV1.DEFAULT_SERVICE_NAME, 'v1', 'getApiGatewayDiscovery');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/api_gateway/discovery',
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
  /*************************
   * aPIGatewayDiscoveryOperations
   ************************/

  /**
   * List API Gateway discovery operations.
   *
   * Retrieve the most up-to-date list of discovered operations for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.diff] - When true, only return operations not yet saved into API Shield Endpoint
   * Management.
   * @param {string} [params.direction] - Direction to order results.
   * @param {string} [params.endpoint] - Filter results to only include endpoints containing this pattern.
   * @param {string[]} [params.host] - Filter results to only include the specified hosts.
   * @param {string[]} [params.method] - Filter results to only include the specified HTTP methods.
   * @param {string} [params.order] - Field to order results by.
   * @param {string} [params.origin] - Filter by discovery engine source.
   * @param {string} [params.state] - Filter results by discovery state (review/saved/ignored).
   * @param {number} [params.page] - Page number of paginated results.
   * @param {number} [params.perPage] - Maximum number of results per page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.DiscoveryOperationsListResp>>}
   */
  public listApiGatewayDiscoveryOperations(
    params?: AiSecurityForAppsV1.ListApiGatewayDiscoveryOperationsParams
  ): Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.DiscoveryOperationsListResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['diff', 'direction', 'endpoint', 'host', 'method', 'order', 'origin', 'state', 'page', 'perPage', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'diff': _params.diff,
      'direction': _params.direction,
      'endpoint': _params.endpoint,
      'host': _params.host,
      'method': _params.method,
      'order': _params.order,
      'origin': _params.origin,
      'state': _params.state,
      'page': _params.page,
      'per_page': _params.perPage,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(AiSecurityForAppsV1.DEFAULT_SERVICE_NAME, 'v1', 'listApiGatewayDiscoveryOperations');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/api_gateway/discovery/operations',
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
   * Bulk update discovered operation states.
   *
   * Bulk update the state of one or more discovered operations. Use to mark operations as saved (promoting to Endpoint
   * Management) or ignored.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {JsonObject} [params.requestBody] - List of operation state updates.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.DiscoveryOperationsPatchResp>>}
   */
  public updateZoneApiGatewayDiscoveryOperation(
    params?: AiSecurityForAppsV1.UpdateZoneApiGatewayDiscoveryOperationParams
  ): Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.DiscoveryOperationsPatchResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['requestBody', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.requestBody;
    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(AiSecurityForAppsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateZoneApiGatewayDiscoveryOperation');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/api_gateway/discovery/operations',
        method: 'PATCH',
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
  /*************************
   * aPIGatewayOperations
   ************************/

  /**
   * Create API Gateway operations in bulk.
   *
   * Create API Gateway operations in bulk for a zone, saving them to Endpoint Management.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {ApiGatewayOperation[]} [params.apiGatewayOperation] - List of operations to create.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.ApiGatewayOperationsResp>>}
   */
  public createZoneApiGatewayOperation(
    params?: AiSecurityForAppsV1.CreateZoneApiGatewayOperationParams
  ): Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.ApiGatewayOperationsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['apiGatewayOperation', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.apiGatewayOperation;
    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(AiSecurityForAppsV1.DEFAULT_SERVICE_NAME, 'v1', 'createZoneApiGatewayOperation');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations',
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
   * Create a single API Gateway operation.
   *
   * Create a single API Gateway operation for a zone, saving it to Endpoint Management.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.method] - The HTTP method for the operation.
   * @param {string} [params.host] - RFC3986-compliant host.
   * @param {string} [params.endpoint] - The endpoint path. Must start with /.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.ApiGatewayOperationItemResp>>}
   */
  public createApiGatewayOperationItem(
    params?: AiSecurityForAppsV1.CreateApiGatewayOperationItemParams
  ): Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.ApiGatewayOperationItemResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['method', 'host', 'endpoint', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'method': _params.method,
      'host': _params.host,
      'endpoint': _params.endpoint,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(AiSecurityForAppsV1.DEFAULT_SERVICE_NAME, 'v1', 'createApiGatewayOperationItem');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations/item',
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
   * Add or remove labels from API Gateway operations.
   *
   * Add or remove labels from one or more API Gateway operations. Apply the built-in LLM label to endpoints that
   * receive LLM traffic to enable IBM AI Security for Apps to scan those endpoints for prompt injection, PII, and
   * unsafe topics.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {ApiGatewayOperationsLabelsInputSelector} [params.selector] - Selector specifying which operations to label.
   * @param {ApiGatewayOperationsLabelsInputUser} [params.user] - User-defined labels to apply.
   * @param {ApiGatewayOperationsLabelsInputManaged} [params.managed] - Managed labels to apply (e.g. cf-llm).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.ApiGatewayOperationsLabelsResp>>}
   */
  public updateApiGatewayOperationLabels(
    params?: AiSecurityForAppsV1.UpdateApiGatewayOperationLabelsParams
  ): Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.ApiGatewayOperationsLabelsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['selector', 'user', 'managed', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'selector': _params.selector,
      'user': _params.user,
      'managed': _params.managed,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(AiSecurityForAppsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateApiGatewayOperationLabels');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations/labels',
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
   * Retrieve information about an operation.
   *
   * Retrieve information about a specific operation on a zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.operationId - UUID of the API Gateway operation.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.ApiGatewayOperationItemResp>>}
   */
  public getZoneApiGatewayOperation(
    params: AiSecurityForAppsV1.GetZoneApiGatewayOperationParams
  ): Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.ApiGatewayOperationItemResp>> {
    const _params = { ...params };
    const _requiredParams = ['operationId'];
    const _validParams = ['operationId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'operation_id': _params.operationId,
    };

    const sdkHeaders = getSdkHeaders(AiSecurityForAppsV1.DEFAULT_SERVICE_NAME, 'v1', 'getZoneApiGatewayOperation');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations/{operation_id}',
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
   * Delete an operation.
   *
   * Delete an operation from a zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.operationId - UUID of the API Gateway operation.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.EmptyObject>>}
   */
  public deleteZoneApiGatewayOperation(
    params: AiSecurityForAppsV1.DeleteZoneApiGatewayOperationParams
  ): Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['operationId'];
    const _validParams = ['operationId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'operation_id': _params.operationId,
    };

    const sdkHeaders = getSdkHeaders(AiSecurityForAppsV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteZoneApiGatewayOperation');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/api_gateway/operations/{operation_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
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
  /*************************
   * aPIGatewaySchemas
   ************************/

  /**
   * Get API Gateway schemas.
   *
   * Retrieve API Gateway schemas for a specified zone rendered as OpenAPI schemas.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.ApiGatewaySchemasResp>>}
   */
  public getApiGatewaySchemas(
    params?: AiSecurityForAppsV1.GetApiGatewaySchemasParams
  ): Promise<AiSecurityForAppsV1.Response<AiSecurityForAppsV1.ApiGatewaySchemasResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(AiSecurityForAppsV1.DEFAULT_SERVICE_NAME, 'v1', 'getApiGatewaySchemas');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/api_gateway/schemas',
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

namespace AiSecurityForAppsV1 {
  /** Options for the `AiSecurityForAppsV1` constructor. */
  export interface Options extends UserOptions {
    /** Full url-encoded CRN of the service instance. */
    crn: string;
    /** Zone identifier to identify the zone. */
    zoneIdentifier: string;
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

  /** Parameters for the `getAiSecuritySettings` operation. */
  export interface GetAiSecuritySettingsParams extends DefaultParams {
  }

  /** Parameters for the `replaceZoneAiSecuritySettings` operation. */
  export interface ReplaceZoneAiSecuritySettingsParams extends DefaultParams {
    /** Set to true to enable AI Security for Apps, false to disable. */
    enabled?: boolean;
  }

  /** Parameters for the `getApiGatewayDiscovery` operation. */
  export interface GetApiGatewayDiscoveryParams extends DefaultParams {
  }

  /** Parameters for the `listApiGatewayDiscoveryOperations` operation. */
  export interface ListApiGatewayDiscoveryOperationsParams extends DefaultParams {
    /** When true, only return operations not yet saved into API Shield Endpoint Management. */
    diff?: boolean;
    /** Direction to order results. */
    direction?: ListApiGatewayDiscoveryOperationsConstants.Direction | string;
    /** Filter results to only include endpoints containing this pattern. */
    endpoint?: string;
    /** Filter results to only include the specified hosts. */
    host?: string[];
    /** Filter results to only include the specified HTTP methods. */
    method?: string[];
    /** Field to order results by. */
    order?: ListApiGatewayDiscoveryOperationsConstants.Order | string;
    /** Filter by discovery engine source. */
    origin?: ListApiGatewayDiscoveryOperationsConstants.Origin | string;
    /** Filter results by discovery state (review/saved/ignored). */
    state?: ListApiGatewayDiscoveryOperationsConstants.State | string;
    /** Page number of paginated results. */
    page?: number;
    /** Maximum number of results per page. */
    perPage?: number;
  }

  /** Constants for the `listApiGatewayDiscoveryOperations` operation. */
  export namespace ListApiGatewayDiscoveryOperationsConstants {
    /** Direction to order results. */
    export enum Direction {
      ASC = 'asc',
      DESC = 'desc',
    }
    /** Field to order results by. */
    export enum Order {
      HOST = 'host',
      METHOD = 'method',
      ENDPOINT = 'endpoint',
      TRAFFIC_STATS_REQUESTS = 'traffic_stats.requests',
      TRAFFIC_STATS_LAST_UPDATED = 'traffic_stats.last_updated',
    }
    /** Filter by discovery engine source. */
    export enum Origin {
      ML = 'ML',
      SESSIONIDENTIFIER = 'SessionIdentifier',
      LABELDISCOVERY = 'LabelDiscovery',
    }
    /** Filter results by discovery state (review/saved/ignored). */
    export enum State {
      REVIEW = 'review',
      SAVED = 'saved',
      IGNORED = 'ignored',
    }
  }

  /** Parameters for the `updateZoneApiGatewayDiscoveryOperation` operation. */
  export interface UpdateZoneApiGatewayDiscoveryOperationParams extends DefaultParams {
    /** List of operation state updates. */
    requestBody?: JsonObject;
  }

  /** Parameters for the `createZoneApiGatewayOperation` operation. */
  export interface CreateZoneApiGatewayOperationParams extends DefaultParams {
    /** List of operations to create. */
    apiGatewayOperation?: ApiGatewayOperation[];
  }

  /** Parameters for the `createApiGatewayOperationItem` operation. */
  export interface CreateApiGatewayOperationItemParams extends DefaultParams {
    /** The HTTP method for the operation. */
    method?: CreateApiGatewayOperationItemConstants.Method | string;
    /** RFC3986-compliant host. */
    host?: string;
    /** The endpoint path. Must start with /. */
    endpoint?: string;
  }

  /** Constants for the `createApiGatewayOperationItem` operation. */
  export namespace CreateApiGatewayOperationItemConstants {
    /** The HTTP method for the operation. */
    export enum Method {
      GET = 'GET',
      POST = 'POST',
      PUT = 'PUT',
      PATCH = 'PATCH',
      DELETE = 'DELETE',
      HEAD = 'HEAD',
      OPTIONS = 'OPTIONS',
    }
  }

  /** Parameters for the `updateApiGatewayOperationLabels` operation. */
  export interface UpdateApiGatewayOperationLabelsParams extends DefaultParams {
    /** Selector specifying which operations to label. */
    selector?: ApiGatewayOperationsLabelsInputSelector;
    /** User-defined labels to apply. */
    user?: ApiGatewayOperationsLabelsInputUser;
    /** Managed labels to apply (e.g. cf-llm). */
    managed?: ApiGatewayOperationsLabelsInputManaged;
  }

  /** Parameters for the `getZoneApiGatewayOperation` operation. */
  export interface GetZoneApiGatewayOperationParams extends DefaultParams {
    /** UUID of the API Gateway operation. */
    operationId: string;
  }

  /** Parameters for the `deleteZoneApiGatewayOperation` operation. */
  export interface DeleteZoneApiGatewayOperationParams extends DefaultParams {
    /** UUID of the API Gateway operation. */
    operationId: string;
  }

  /** Parameters for the `getApiGatewaySchemas` operation. */
  export interface GetApiGatewaySchemasParams extends DefaultParams {
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * Container for response information.
   */
  export interface AiSecuritySettingsRespResult {
    /** Whether AI Security for Apps is enabled on the zone. */
    enabled?: boolean;
  }

  /**
   * ApiGatewayOperationItemRespResult.
   */
  export interface ApiGatewayOperationItemRespResult {
    /** UUID of the created operation. */
    operation_id?: string;
    method?: string;
    host?: string;
    endpoint?: string;
  }

  /**
   * Managed labels to apply (e.g. cf-llm).
   */
  export interface ApiGatewayOperationsLabelsInputManaged {
    /** Array of managed label strings. */
    labels?: string[];
  }

  /**
   * Selector specifying which operations to label.
   */
  export interface ApiGatewayOperationsLabelsInputSelector {
    /** Operations to include in the label operation. */
    include: ApiGatewayOperationsLabelsInputSelectorInclude;
  }

  /**
   * Operations to include in the label operation.
   */
  export interface ApiGatewayOperationsLabelsInputSelectorInclude {
    /** Array of operation UUIDs to label. */
    operation_ids?: string[];
  }

  /**
   * User-defined labels to apply.
   */
  export interface ApiGatewayOperationsLabelsInputUser {
    /** Array of user-defined label strings. */
    labels?: string[];
  }

  /**
   * ApiGatewayOperationsLabelsRespResultItem.
   */
  export interface ApiGatewayOperationsLabelsRespResultItem {
    operation_id?: string;
    labels?: string[];
  }

  /**
   * ApiGatewayOperationsRespResultItem.
   */
  export interface ApiGatewayOperationsRespResultItem {
    /** UUID of the created operation. */
    operation_id?: string;
    method?: string;
    host?: string;
    endpoint?: string;
  }

  /**
   * DiscoveryOperationFeatures.
   */
  export interface DiscoveryOperationFeatures {
    traffic_stats?: DiscoveryOperationFeaturesTrafficStats;
  }

  /**
   * DiscoveryOperationFeaturesTrafficStats.
   */
  export interface DiscoveryOperationFeaturesTrafficStats {
    last_updated?: string;
    /** The period in seconds over which statistics were computed. */
    period_seconds?: number;
    /** The average number of requests seen during this period. */
    requests?: number;
  }

  /**
   * AI Security for Apps settings response.
   */
  export interface AiSecuritySettingsResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: AiSecuritySettingsRespResult;
  }

  /**
   * API Gateway discovery response (OpenAPI schema format).
   */
  export interface ApiGatewayDiscoveryResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Discovered operations rendered as an OpenAPI schema document. */
    result: JsonObject;
  }

  /**
   * An API Gateway operation definition.
   */
  export interface ApiGatewayOperation {
    /** The HTTP method for the operation. */
    method: ApiGatewayOperation.Constants.Method | string;
    /** RFC3986-compliant host. */
    host: string;
    /** The endpoint path. Must start with /. */
    endpoint: string;
  }
  export namespace ApiGatewayOperation {
    export namespace Constants {
      /** The HTTP method for the operation. */
      export enum Method {
        GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        PATCH = 'PATCH',
        DELETE = 'DELETE',
        HEAD = 'HEAD',
        OPTIONS = 'OPTIONS',
      }
    }
  }

  /**
   * Single API Gateway operation create response.
   */
  export interface ApiGatewayOperationItemResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    result: ApiGatewayOperationItemRespResult;
  }

  /**
   * API Gateway operations labels update response.
   */
  export interface ApiGatewayOperationsLabelsResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** List of operations with their updated label sets. */
    result: ApiGatewayOperationsLabelsRespResultItem[];
  }

  /**
   * API Gateway bulk operations create response.
   */
  export interface ApiGatewayOperationsResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** List of created operations. */
    result: ApiGatewayOperationsRespResultItem[];
  }

  /**
   * API Gateway schemas response (OpenAPI schema format).
   */
  export interface ApiGatewaySchemasResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** API Gateway schemas rendered as an OpenAPI schema document. */
    result: JsonObject;
  }

  /**
   * A discovered API operation.
   */
  export interface DiscoveryOperation {
    /** UUID of the discovered operation. */
    id?: string;
    /** The endpoint path. May contain path parameter templates in curly braces (e.g. /api/user/{var1}/details). */
    endpoint?: string;
    /** RFC3986-compliant host. */
    host?: string;
    /** The HTTP method used to access the endpoint. */
    method?: DiscoveryOperation.Constants.Method | string;
    last_updated?: string;
    /** API discovery engine(s) that discovered this operation. */
    origin?: DiscoveryOperation.Constants.Origin[] | string[];
    /** State of the operation in API Discovery. review - not yet saved to Endpoint Management; saved - saved to
     *  Endpoint Management; ignored - marked as ignored.
     */
    state?: DiscoveryOperation.Constants.State | string;
    features?: DiscoveryOperationFeatures;
  }
  export namespace DiscoveryOperation {
    export namespace Constants {
      /** The HTTP method used to access the endpoint. */
      export enum Method {
        GET = 'GET',
        POST = 'POST',
        HEAD = 'HEAD',
        OPTIONS = 'OPTIONS',
        PUT = 'PUT',
        DELETE = 'DELETE',
        CONNECT = 'CONNECT',
        PATCH = 'PATCH',
        TRACE = 'TRACE',
      }
      /** API discovery engine(s) that discovered this operation. */
      export enum Origin {
        ML = 'ML',
        SESSIONIDENTIFIER = 'SessionIdentifier',
        LABELDISCOVERY = 'LabelDiscovery',
      }
      /** State of the operation in API Discovery. review - not yet saved to Endpoint Management; saved - saved to Endpoint Management; ignored - marked as ignored. */
      export enum State {
        REVIEW = 'review',
        SAVED = 'saved',
        IGNORED = 'ignored',
      }
    }
  }

  /**
   * API Gateway discovery operations list response.
   */
  export interface DiscoveryOperationsListResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    result: DiscoveryOperation[];
    result_info?: ResultInfo;
  }

  /**
   * API Gateway discovery operations bulk patch response.
   */
  export interface DiscoveryOperationsPatchResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    result: DiscoveryOperation[];
  }

  /**
   * ResultInfo.
   */
  export interface ResultInfo {
    /** Total number of results for the requested service. */
    count?: number;
    /** Current page within paginated list of results. */
    page?: number;
    /** Number of results per page. */
    per_page?: number;
    /** Total number of results. */
    total_count?: number;
  }
}

export = AiSecurityForAppsV1;
