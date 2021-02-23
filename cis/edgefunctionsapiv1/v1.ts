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
 * Edge Functions
 */

class EdgeFunctionsApiV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'edge_functions_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of EdgeFunctionsApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {EdgeFunctionsApiV1}
   */

  public static newInstance(options: UserOptions): EdgeFunctionsApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new EdgeFunctionsApiV1(options);
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
   * Construct a EdgeFunctionsApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - cloud resource name.
   * @param {string} options.zoneIdentifier - zone identifier.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {EdgeFunctionsApiV1}
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
      this.setServiceUrl(EdgeFunctionsApiV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * edgeFunctionsActions
   ************************/

  /**
   * Get all edge functions scripts for a given instance.
   *
   * Get all edge functions scripts for a given instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.ListEdgeFunctionsActionsResp>>}
   */
  public listEdgeFunctionsActions(params?: EdgeFunctionsApiV1.ListEdgeFunctionsActionsParams): Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.ListEdgeFunctionsActionsResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn
    };

    const sdkHeaders = getSdkHeaders(EdgeFunctionsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listEdgeFunctionsActions');

    const parameters = {
      options: {
        url: '/v1/{crn}/workers/scripts',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'X-Correlation-ID': _params.xCorrelationId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Upload or replace an edge functions action for a given instance.
   *
   * Upload or replace an exitsing edge functions action for a given instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.scriptName - the edge function action name.
   * @param {string|NodeJS.ReadableStream|Buffer} [params.edgeFunctionsAction] - upload or replace an edge functions
   * action.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.GetEdgeFunctionsActionResp>>}
   */
  public updateEdgeFunctionsAction(params: EdgeFunctionsApiV1.UpdateEdgeFunctionsActionParams): Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.GetEdgeFunctionsActionResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['scriptName'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.edgeFunctionsAction;
    const path = {
      'crn': this.crn,
      'script_name': _params.scriptName
    };

    const sdkHeaders = getSdkHeaders(EdgeFunctionsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateEdgeFunctionsAction');

    const parameters = {
      options: {
        url: '/v1/{crn}/workers/scripts/{script_name}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/javascript',
          'X-Correlation-ID': _params.xCorrelationId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Download a edge functions action for a given instance.
   *
   * Fetch raw script content for your worker. Note this is the original script content, not JSON encoded.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.scriptName - the edge function action name.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<EdgeFunctionsApiV1.Response<NodeJS.ReadableStream|Buffer>>}
   */
  public getEdgeFunctionsAction(params: EdgeFunctionsApiV1.GetEdgeFunctionsActionParams): Promise<EdgeFunctionsApiV1.Response<NodeJS.ReadableStream|Buffer>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['scriptName'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'script_name': _params.scriptName
    };

    const sdkHeaders = getSdkHeaders(EdgeFunctionsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getEdgeFunctionsAction');

    const parameters = {
      options: {
        url: '/v1/{crn}/workers/scripts/{script_name}',
        method: 'GET',
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/javascript',
          'X-Correlation-ID': _params.xCorrelationId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a edge functions action for a given instance.
   *
   * Delete an edge functions action for a given instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.scriptName - the edge function action name.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.DeleteEdgeFunctionsActionResp>>}
   */
  public deleteEdgeFunctionsAction(params: EdgeFunctionsApiV1.DeleteEdgeFunctionsActionParams): Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.DeleteEdgeFunctionsActionResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['scriptName'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'script_name': _params.scriptName
    };

    const sdkHeaders = getSdkHeaders(EdgeFunctionsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteEdgeFunctionsAction');

    const parameters = {
      options: {
        url: '/v1/{crn}/workers/scripts/{script_name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'X-Correlation-ID': _params.xCorrelationId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * edgeFunctionsTriggers
   ************************/

  /**
   * Create an edge functions trigger on a given zone.
   *
   * Create an edge functions trigger on a given zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.pattern] - a string pattern.
   * @param {string} [params.script] - Name of the script to apply when the route is matched. The route is skipped when
   * this is blank/missing.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.CreateEdgeFunctionsTriggerResp>>}
   */
  public createEdgeFunctionsTrigger(params?: EdgeFunctionsApiV1.CreateEdgeFunctionsTriggerParams): Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.CreateEdgeFunctionsTriggerResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'pattern': _params.pattern,
      'script': _params.script
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(EdgeFunctionsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'createEdgeFunctionsTrigger');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/workers/routes',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Correlation-ID': _params.xCorrelationId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all edge functions triggers on a given zone.
   *
   * List all edge functions triggers on a given zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.ListEdgeFunctionsTriggersResp>>}
   */
  public listEdgeFunctionsTriggers(params?: EdgeFunctionsApiV1.ListEdgeFunctionsTriggersParams): Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.ListEdgeFunctionsTriggersResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(EdgeFunctionsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listEdgeFunctionsTriggers');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/workers/routes',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'X-Correlation-ID': _params.xCorrelationId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get an edge functions trigger on a given zone.
   *
   * Get an edge functions trigger on a given zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.routeId - trigger identifier.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.GetEdgeFunctionsTriggerResp>>}
   */
  public getEdgeFunctionsTrigger(params: EdgeFunctionsApiV1.GetEdgeFunctionsTriggerParams): Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.GetEdgeFunctionsTriggerResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['routeId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'route_id': _params.routeId
    };

    const sdkHeaders = getSdkHeaders(EdgeFunctionsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getEdgeFunctionsTrigger');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/workers/routes/{route_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'X-Correlation-ID': _params.xCorrelationId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update an edge functions trigger on a given zone.
   *
   * Update an edge functions trigger on a given zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.routeId - trigger identifier.
   * @param {string} [params.pattern] - a string pattern.
   * @param {string} [params.script] - Name of the script to apply when the route is matched. The route is skipped when
   * this is blank/missing.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.GetEdgeFunctionsTriggerResp>>}
   */
  public updateEdgeFunctionsTrigger(params: EdgeFunctionsApiV1.UpdateEdgeFunctionsTriggerParams): Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.GetEdgeFunctionsTriggerResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['routeId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'pattern': _params.pattern,
      'script': _params.script
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'route_id': _params.routeId
    };

    const sdkHeaders = getSdkHeaders(EdgeFunctionsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateEdgeFunctionsTrigger');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/workers/routes/{route_id}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Correlation-ID': _params.xCorrelationId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete an edge functions trigger on a given zone.
   *
   * Delete an edge functions trigger on a given zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.routeId - trigger identifier.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.CreateEdgeFunctionsTriggerResp>>}
   */
  public deleteEdgeFunctionsTrigger(params: EdgeFunctionsApiV1.DeleteEdgeFunctionsTriggerParams): Promise<EdgeFunctionsApiV1.Response<EdgeFunctionsApiV1.CreateEdgeFunctionsTriggerResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['routeId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'route_id': _params.routeId
    };

    const sdkHeaders = getSdkHeaders(EdgeFunctionsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteEdgeFunctionsTrigger');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/workers/routes/{route_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'X-Correlation-ID': _params.xCorrelationId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

}

/*************************
 * interfaces
 ************************/

namespace EdgeFunctionsApiV1 {

  /** Options for the `EdgeFunctionsApiV1` constructor. */
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

  /** Parameters for the `listEdgeFunctionsActions` operation. */
  export interface ListEdgeFunctionsActionsParams {
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateEdgeFunctionsAction` operation. */
  export interface UpdateEdgeFunctionsActionParams {
    /** the edge function action name. */
    scriptName: string;
    /** upload or replace an edge functions action. */
    edgeFunctionsAction?: string|NodeJS.ReadableStream|Buffer;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getEdgeFunctionsAction` operation. */
  export interface GetEdgeFunctionsActionParams {
    /** the edge function action name. */
    scriptName: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteEdgeFunctionsAction` operation. */
  export interface DeleteEdgeFunctionsActionParams {
    /** the edge function action name. */
    scriptName: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createEdgeFunctionsTrigger` operation. */
  export interface CreateEdgeFunctionsTriggerParams {
    /** a string pattern. */
    pattern?: string;
    /** Name of the script to apply when the route is matched. The route is skipped when this is blank/missing. */
    script?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listEdgeFunctionsTriggers` operation. */
  export interface ListEdgeFunctionsTriggersParams {
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getEdgeFunctionsTrigger` operation. */
  export interface GetEdgeFunctionsTriggerParams {
    /** trigger identifier. */
    routeId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateEdgeFunctionsTrigger` operation. */
  export interface UpdateEdgeFunctionsTriggerParams {
    /** trigger identifier. */
    routeId: string;
    /** a string pattern. */
    pattern?: string;
    /** Name of the script to apply when the route is matched. The route is skipped when this is blank/missing. */
    script?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteEdgeFunctionsTrigger` operation. */
  export interface DeleteEdgeFunctionsTriggerParams {
    /** trigger identifier. */
    routeId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** create an edge funtions trigger response. */
  export interface CreateEdgeFunctionsTriggerResp {
    /** edge function trigger id. */
    result?: EdgeFunctionsTriggerId;
    /** success. */
    success?: boolean;
    /** An array with errors. */
    errors?: string[];
    /** An array with messages. */
    messages?: string[];
  }

  /** create an edge funtions trigger response. */
  export interface DeleteEdgeFunctionsActionResp {
    /** edge function action id. */
    result?: EdgeFunctionsActionId;
    /** success. */
    success?: boolean;
    /** An array with errors. */
    errors?: string[];
    /** An array with messages. */
    messages?: string[];
  }

  /** edge function action id. */
  export interface EdgeFunctionsActionId {
    /** edge functions action identifier tag. */
    id?: string;
  }

  /** edge function script. */
  export interface EdgeFunctionsActionResp {
    /** Raw script content, as a string. */
    script?: string;
    /** Hashed script content, can be used in a If-None-Match header when updating. */
    etag?: string;
    /** handlers. */
    handlers?: string[];
    /** The time when the script was last modified. */
    modified_on?: string;
    /** The time when the script was last created. */
    created_on?: string;
    /** An array with items in the list response. */
    routes?: EdgeFunctionsTriggerResp[];
  }

  /** edge function trigger id. */
  export interface EdgeFunctionsTriggerId {
    /** edge functions trigger identifier tag. */
    id?: string;
  }

  /** edge function trigger id. */
  export interface EdgeFunctionsTriggerResp {
    /** edge functions trigger identifier tag. */
    id?: string;
    /** a string pattern. */
    pattern?: string;
    /** Name of the script to apply when the route is matched. The route is skipped when this is blank/missing. */
    script?: string;
    /** request limit fail open or not. */
    request_limit_fail_open?: boolean;
  }

  /** edge funtions action response. */
  export interface GetEdgeFunctionsActionResp {
    /** edge function script. */
    result?: EdgeFunctionsActionResp;
    /** success. */
    success?: boolean;
    /** An array with errors. */
    errors?: string[];
    /** An array with messages. */
    messages?: string[];
  }

  /** edge funtions trigger response. */
  export interface GetEdgeFunctionsTriggerResp {
    /** edge function trigger id. */
    result?: EdgeFunctionsTriggerResp;
    /** success. */
    success?: boolean;
    /** An array with errors. */
    errors?: string[];
    /** An array with messages. */
    messages?: string[];
  }

  /** edge funtions actions response. */
  export interface ListEdgeFunctionsActionsResp {
    /** An array with items in the list response. */
    result?: EdgeFunctionsActionResp[];
    /** success. */
    success?: boolean;
    /** An array with errors. */
    errors?: string[];
    /** An array with messages. */
    messages?: string[];
  }

  /** edge funtions triggers response. */
  export interface ListEdgeFunctionsTriggersResp {
    /** An array with items in the list response. */
    result?: EdgeFunctionsTriggerResp[];
    /** success. */
    success?: boolean;
    /** An array with errors. */
    errors?: string[];
    /** An array with messages. */
    messages?: string[];
  }

}

export = EdgeFunctionsApiV1;
