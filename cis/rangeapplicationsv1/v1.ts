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
 * Range Applications
 */

class RangeApplicationsV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'range_applications';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of RangeApplicationsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {RangeApplicationsV1}
   */

  public static newInstance(options: UserOptions): RangeApplicationsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new RangeApplicationsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Full url-encoded cloud resource name (CRN) of resource instance. */
  crn: string;

  /** zone identifier. */
  zoneIdentifier: string;

  /**
   * Construct a RangeApplicationsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} options.zoneIdentifier - zone identifier.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {RangeApplicationsV1}
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
      this.setServiceUrl(RangeApplicationsV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * rangeApplications
   ************************/

  /**
   * List range applications.
   *
   * Get a list of currently existing Range Applications inside a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.page] - Page number of paginated results.
   * @param {number} [params.perPage] - Maximum number of Range applications per page.
   * @param {string} [params.order] - Field by which to order the list of Range applications.
   * @param {string} [params.direction] - Direction in which to order results [ascending/descending order].
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RangeApplicationsV1.Response<RangeApplicationsV1.RangeApplications>>}
   */
  public listRangeApps(params?: RangeApplicationsV1.ListRangeAppsParams): Promise<RangeApplicationsV1.Response<RangeApplicationsV1.RangeApplications>> {
    const _params = Object.assign({}, params);

    const query = {
      'page': _params.page,
      'per_page': _params.perPage,
      'order': _params.order,
      'direction': _params.direction
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(RangeApplicationsV1.DEFAULT_SERVICE_NAME, 'v1', 'listRangeApps');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/range/apps',
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
   * Create Range Application.
   *
   * Create a Range Applications inside a zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.protocol - Defines the protocol and port for this application.
   * @param {RangeAppReqDns} params.dns - Name and type of the DNS record for this application.
   * @param {string[]} [params.originDirect] - IP address and port of the origin for this Range application. If
   * configuring a load balancer, use 'origin_dns' and 'origin_port'. This can not be combined with 'origin_dns' and
   * 'origin_port'.
   * @param {RangeAppReqOriginDns} [params.originDns] - DNS record pointing to the origin for this Range application.
   * This is used for configuring a load balancer. When specifying an individual IP address, use 'origin_direct'. This
   * requires 'origin_port' and can not be combined with 'origin_direct'.
   * @param {number} [params.originPort] - Port at the origin that listens to traffic from this Range application.
   * Requires 'origin_dns' and can not be combined with 'origin_direct'.
   * @param {boolean} [params.ipFirewall] - Enables the IP Firewall for this application. Only available for TCP
   * applications.
   * @param {string} [params.proxyProtocol] - Allows for the true client IP to be passed to the service.
   * @param {RangeAppReqEdgeIps} [params.edgeIps] - Configures IP version for the hostname of this application. Default
   * is {"type":"dynamic", "connectivity":"all"}.
   * @param {string} [params.trafficType] - Configure how traffic is handled at the edge. If set to "direct" traffic is
   * passed through to the service. In the case of "http" or "https" HTTP/s features at the edge are applied ot this
   * traffic.
   * @param {string} [params.tls] - Configure if and how TLS connections are terminated at the edge.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RangeApplicationsV1.Response<RangeApplicationsV1.RangeApplicationResp>>}
   */
  public createRangeApp(params: RangeApplicationsV1.CreateRangeAppParams): Promise<RangeApplicationsV1.Response<RangeApplicationsV1.RangeApplicationResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['protocol', 'dns'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'protocol': _params.protocol,
      'dns': _params.dns,
      'origin_direct': _params.originDirect,
      'origin_dns': _params.originDns,
      'origin_port': _params.originPort,
      'ip_firewall': _params.ipFirewall,
      'proxy_protocol': _params.proxyProtocol,
      'edge_ips': _params.edgeIps,
      'traffic_type': _params.trafficType,
      'tls': _params.tls
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(RangeApplicationsV1.DEFAULT_SERVICE_NAME, 'v1', 'createRangeApp');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/range/apps',
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
   * Get range application a zone.
   *
   * Get the application configuration of a specific application inside a zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.appIdentifier - application identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RangeApplicationsV1.Response<RangeApplicationsV1.RangeApplicationResp>>}
   */
  public getRangeApp(params: RangeApplicationsV1.GetRangeAppParams): Promise<RangeApplicationsV1.Response<RangeApplicationsV1.RangeApplicationResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['appIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'app_identifier': _params.appIdentifier
    };

    const sdkHeaders = getSdkHeaders(RangeApplicationsV1.DEFAULT_SERVICE_NAME, 'v1', 'getRangeApp');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/range/apps/{app_identifier}',
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
   * Update range application.
   *
   * Update a Range Application inside a zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.appIdentifier - application identifier.
   * @param {string} params.protocol - Defines the protocol and port for this application.
   * @param {RangeAppReqDns} params.dns - Name and type of the DNS record for this application.
   * @param {string[]} [params.originDirect] - IP address and port of the origin for this Range application. If
   * configuring a load balancer, use 'origin_dns' and 'origin_port'. This can not be combined with 'origin_dns' and
   * 'origin_port'.
   * @param {RangeAppReqOriginDns} [params.originDns] - DNS record pointing to the origin for this Range application.
   * This is used for configuring a load balancer. When specifying an individual IP address, use 'origin_direct'. This
   * requires 'origin_port' and can not be combined with 'origin_direct'.
   * @param {number} [params.originPort] - Port at the origin that listens to traffic from this Range application.
   * Requires 'origin_dns' and can not be combined with 'origin_direct'.
   * @param {boolean} [params.ipFirewall] - Enables the IP Firewall for this application. Only available for TCP
   * applications.
   * @param {string} [params.proxyProtocol] - Allows for the true client IP to be passed to the service.
   * @param {RangeAppReqEdgeIps} [params.edgeIps] - Configures IP version for the hostname of this application. Default
   * is {"type":"dynamic", "connectivity":"all"}.
   * @param {string} [params.trafficType] - Configure how traffic is handled at the edge. If set to "direct" traffic is
   * passed through to the service. In the case of "http" or "https" HTTP/s features at the edge are applied ot this
   * traffic.
   * @param {string} [params.tls] - Configure if and how TLS connections are terminated at the edge.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RangeApplicationsV1.Response<RangeApplicationsV1.RangeApplicationResp>>}
   */
  public updateRangeApp(params: RangeApplicationsV1.UpdateRangeAppParams): Promise<RangeApplicationsV1.Response<RangeApplicationsV1.RangeApplicationResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['appIdentifier', 'protocol', 'dns'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'protocol': _params.protocol,
      'dns': _params.dns,
      'origin_direct': _params.originDirect,
      'origin_dns': _params.originDns,
      'origin_port': _params.originPort,
      'ip_firewall': _params.ipFirewall,
      'proxy_protocol': _params.proxyProtocol,
      'edge_ips': _params.edgeIps,
      'traffic_type': _params.trafficType,
      'tls': _params.tls
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'app_identifier': _params.appIdentifier
    };

    const sdkHeaders = getSdkHeaders(RangeApplicationsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateRangeApp');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/range/apps/{app_identifier}',
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
   * Delete range application.
   *
   * Delete a specific application configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.appIdentifier - application identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<RangeApplicationsV1.Response<RangeApplicationsV1.RangeApplicationResp>>}
   */
  public deleteRangeApp(params: RangeApplicationsV1.DeleteRangeAppParams): Promise<RangeApplicationsV1.Response<RangeApplicationsV1.RangeApplicationResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['appIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'app_identifier': _params.appIdentifier
    };

    const sdkHeaders = getSdkHeaders(RangeApplicationsV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteRangeApp');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/range/apps/{app_identifier}',
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

}

/*************************
 * interfaces
 ************************/

namespace RangeApplicationsV1 {

  /** Options for the `RangeApplicationsV1` constructor. */
  export interface Options extends UserOptions {

    /** Full url-encoded cloud resource name (CRN) of resource instance. */
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

  /** Parameters for the `listRangeApps` operation. */
  export interface ListRangeAppsParams {
    /** Page number of paginated results. */
    page?: number;
    /** Maximum number of Range applications per page. */
    perPage?: number;
    /** Field by which to order the list of Range applications. */
    order?: ListRangeAppsConstants.Order | string;
    /** Direction in which to order results [ascending/descending order]. */
    direction?: ListRangeAppsConstants.Direction | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listRangeApps` operation. */
  export namespace ListRangeAppsConstants {
    /** Field by which to order the list of Range applications. */
    export enum Order {
      PROTOCOL = 'protocol',
      APP_ID = 'app_id',
      CREATED_ON = 'created_on',
      MODIFIED_ON = 'modified_on',
      DNS = 'dns',
    }
    /** Direction in which to order results [ascending/descending order]. */
    export enum Direction {
      ASC = 'asc',
      DESC = 'desc',
    }
  }

  /** Parameters for the `createRangeApp` operation. */
  export interface CreateRangeAppParams {
    /** Defines the protocol and port for this application. */
    protocol: string;
    /** Name and type of the DNS record for this application. */
    dns: RangeAppReqDns;
    /** IP address and port of the origin for this Range application. If configuring a load balancer, use
     *  'origin_dns' and 'origin_port'. This can not be combined with 'origin_dns' and 'origin_port'.
     */
    originDirect?: string[];
    /** DNS record pointing to the origin for this Range application. This is used for configuring a load balancer.
     *  When specifying an individual IP address, use 'origin_direct'. This requires 'origin_port' and can not be
     *  combined with 'origin_direct'.
     */
    originDns?: RangeAppReqOriginDns;
    /** Port at the origin that listens to traffic from this Range application. Requires 'origin_dns' and can not be
     *  combined with 'origin_direct'.
     */
    originPort?: number;
    /** Enables the IP Firewall for this application. Only available for TCP applications. */
    ipFirewall?: boolean;
    /** Allows for the true client IP to be passed to the service. */
    proxyProtocol?: CreateRangeAppConstants.ProxyProtocol | string;
    /** Configures IP version for the hostname of this application. Default is {"type":"dynamic",
     *  "connectivity":"all"}.
     */
    edgeIps?: RangeAppReqEdgeIps;
    /** Configure how traffic is handled at the edge. If set to "direct" traffic is passed through to the service.
     *  In the case of "http" or "https" HTTP/s features at the edge are applied ot this traffic.
     */
    trafficType?: CreateRangeAppConstants.TrafficType | string;
    /** Configure if and how TLS connections are terminated at the edge. */
    tls?: CreateRangeAppConstants.Tls | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createRangeApp` operation. */
  export namespace CreateRangeAppConstants {
    /** Allows for the true client IP to be passed to the service. */
    export enum ProxyProtocol {
      OFF = 'off',
      V1 = 'v1',
      V2 = 'v2',
      SIMPLE = 'simple',
    }
    /** Configure how traffic is handled at the edge. If set to "direct" traffic is passed through to the service. In the case of "http" or "https" HTTP/s features at the edge are applied ot this traffic. */
    export enum TrafficType {
      DIRECT = 'direct',
      HTTP = 'http',
      HTTPS = 'https',
    }
    /** Configure if and how TLS connections are terminated at the edge. */
    export enum Tls {
      OFF = 'off',
      FLEXIBLE = 'flexible',
      FULL = 'full',
      STRICT = 'strict',
    }
  }

  /** Parameters for the `getRangeApp` operation. */
  export interface GetRangeAppParams {
    /** application identifier. */
    appIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateRangeApp` operation. */
  export interface UpdateRangeAppParams {
    /** application identifier. */
    appIdentifier: string;
    /** Defines the protocol and port for this application. */
    protocol: string;
    /** Name and type of the DNS record for this application. */
    dns: RangeAppReqDns;
    /** IP address and port of the origin for this Range application. If configuring a load balancer, use
     *  'origin_dns' and 'origin_port'. This can not be combined with 'origin_dns' and 'origin_port'.
     */
    originDirect?: string[];
    /** DNS record pointing to the origin for this Range application. This is used for configuring a load balancer.
     *  When specifying an individual IP address, use 'origin_direct'. This requires 'origin_port' and can not be
     *  combined with 'origin_direct'.
     */
    originDns?: RangeAppReqOriginDns;
    /** Port at the origin that listens to traffic from this Range application. Requires 'origin_dns' and can not be
     *  combined with 'origin_direct'.
     */
    originPort?: number;
    /** Enables the IP Firewall for this application. Only available for TCP applications. */
    ipFirewall?: boolean;
    /** Allows for the true client IP to be passed to the service. */
    proxyProtocol?: UpdateRangeAppConstants.ProxyProtocol | string;
    /** Configures IP version for the hostname of this application. Default is {"type":"dynamic",
     *  "connectivity":"all"}.
     */
    edgeIps?: RangeAppReqEdgeIps;
    /** Configure how traffic is handled at the edge. If set to "direct" traffic is passed through to the service.
     *  In the case of "http" or "https" HTTP/s features at the edge are applied ot this traffic.
     */
    trafficType?: UpdateRangeAppConstants.TrafficType | string;
    /** Configure if and how TLS connections are terminated at the edge. */
    tls?: UpdateRangeAppConstants.Tls | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateRangeApp` operation. */
  export namespace UpdateRangeAppConstants {
    /** Allows for the true client IP to be passed to the service. */
    export enum ProxyProtocol {
      OFF = 'off',
      V1 = 'v1',
      V2 = 'v2',
      SIMPLE = 'simple',
    }
    /** Configure how traffic is handled at the edge. If set to "direct" traffic is passed through to the service. In the case of "http" or "https" HTTP/s features at the edge are applied ot this traffic. */
    export enum TrafficType {
      DIRECT = 'direct',
      HTTP = 'http',
      HTTPS = 'https',
    }
    /** Configure if and how TLS connections are terminated at the edge. */
    export enum Tls {
      OFF = 'off',
      FLEXIBLE = 'flexible',
      FULL = 'full',
      STRICT = 'strict',
    }
  }

  /** Parameters for the `deleteRangeApp` operation. */
  export interface DeleteRangeAppParams {
    /** application identifier. */
    appIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Name and type of the DNS record for this application. */
  export interface RangeAppReqDns {
    /** DNS record type. */
    type?: string;
    /** DNS record name. */
    name?: string;
  }

  /** Configures IP version for the hostname of this application. Default is {"type":"dynamic", "connectivity":"all"}. */
  export interface RangeAppReqEdgeIps {
    /** The type of edge IP configuration. */
    type?: string;
    /** Specifies the IP version (or all). */
    connectivity?: string;
  }

  /** DNS record pointing to the origin for this Range application. This is used for configuring a load balancer. When specifying an individual IP address, use 'origin_direct'. This requires 'origin_port' and can not be combined with 'origin_direct'. */
  export interface RangeAppReqOriginDns {
    /** Name of the origin. */
    name: string;
  }

  /** The name and type of DNS record for the Range application. */
  export interface RangeApplicationObjectDns {
    /** The type of DNS record associated with the application. */
    type?: string;
    /** The name of the DNS record associated with the application. */
    name?: string;
  }

  /** Configures IP version for the hostname of this application. */
  export interface RangeApplicationObjectEdgeIps {
    /** The type of edge IP configuration. */
    type?: string;
    /** Specifies the IP version (or all). */
    connectivity?: string;
  }

  /** range application object. */
  export interface RangeApplicationObject {
    /** Application identifier. */
    id?: string;
    /** Port configuration. */
    protocol?: string;
    /** The name and type of DNS record for the Range application. */
    dns?: RangeApplicationObjectDns;
    /** A list of destination addresses to the origin. */
    origin_direct?: string[];
    /** Enables the IP Firewall for this application. */
    ip_firewall?: boolean;
    /** Allows for the true client IP to be passed to the service. */
    proxy_protocol?: string;
    /** Configures IP version for the hostname of this application. */
    edge_ips?: RangeApplicationObjectEdgeIps;
    /** Specifies the TLS termination at the edge. */
    tls?: string;
    /** Configure how traffic is handled at the edge. If set to "direct" traffic is passed through to the service.
     *  In the case of "http" or "https" HTTP/s features at the edge are applied ot this traffic.
     */
    traffic_type?: string;
    /** When the Application was created. */
    created_on?: string;
    /** When the Application was last modified. */
    modified_on?: string;
  }

  /** range application response. */
  export interface RangeApplicationResp {
    /** Was the get successful. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** range application object. */
    result: RangeApplicationObject;
  }

  /** range application. */
  export interface RangeApplications {
    /** Was the get successful. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** Container for Range application objects. */
    result: RangeApplicationObject[];
  }

}

export = RangeApplicationsV1;
