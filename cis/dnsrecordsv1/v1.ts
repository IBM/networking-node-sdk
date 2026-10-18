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
 * IBM OpenAPI SDK Code Generator Version: 3.106.0-09823488-20250707-071701
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
 * DNS records
 *
 * API Version: 1.0.1
 */

class DnsRecordsV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'dns_records';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of DnsRecordsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {DnsRecordsV1}
   */

  public static newInstance(options: UserOptions): DnsRecordsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new DnsRecordsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /** Full url-encoded CRN of the service instance. */
  crn: string;

  /** Identifier of zone. */
  zoneIdentifier: string;

  /**
   * Construct a DnsRecordsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded CRN of the service instance.
   * @param {string} options.zoneIdentifier - Identifier of zone.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {DnsRecordsV1}
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
      this.setServiceUrl(DnsRecordsV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * dNSRecords
   ************************/

  /**
   * List all DNS records.
   *
   * List all DNS records for a given zone of a service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.type] - Type of DNS records to display.
   * @param {string} [params.name] - Value of name field to filter by.
   * @param {string} [params.content] - Value of content field to filter by.
   * @param {number} [params.page] - Page number of paginated results.
   * @param {number} [params.perPage] - Maximum number of DNS records per page.
   * @param {string} [params.order] - Field by which to order list of DNS records.
   * @param {string} [params.direction] - Direction in which to order results [ascending/descending order].
   * @param {string} [params.match] - Whether to match all (all) or atleast one search parameter (any).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsRecordsV1.Response<DnsRecordsV1.ListDnsrecordsResp>>}
   */
  public listAllDnsRecords(
    params?: DnsRecordsV1.ListAllDnsRecordsParams
  ): Promise<DnsRecordsV1.Response<DnsRecordsV1.ListDnsrecordsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['type', 'name', 'content', 'page', 'perPage', 'order', 'direction', 'match', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'type': _params.type,
      'name': _params.name,
      'content': _params.content,
      'page': _params.page,
      'per_page': _params.perPage,
      'order': _params.order,
      'direction': _params.direction,
      'match': _params.match,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(DnsRecordsV1.DEFAULT_SERVICE_NAME, 'v1', 'listAllDnsRecords');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/dns_records',
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
   * Create DNS record.
   *
   * Add a new DNS record for a given zone for a given service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.type] - dns record type.
   * @param {string} [params.name] - Required for all record types except SRV.
   * @param {number} [params.ttl] - dns record ttl value.
   * @param {string} [params.content] - dns record content.
   * @param {number} [params.priority] - For MX records only.
   * @param {boolean} [params.proxied] - proxied.
   * @param {JsonObject} [params.data] - For LOC, SRV, CAA, DS records only.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsRecordsV1.Response<DnsRecordsV1.DnsrecordResp>>}
   */
  public createDnsRecord(
    params?: DnsRecordsV1.CreateDnsRecordParams
  ): Promise<DnsRecordsV1.Response<DnsRecordsV1.DnsrecordResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['type', 'name', 'ttl', 'content', 'priority', 'proxied', 'data', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'name': _params.name,
      'ttl': _params.ttl,
      'content': _params.content,
      'priority': _params.priority,
      'proxied': _params.proxied,
      'data': _params.data,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(DnsRecordsV1.DEFAULT_SERVICE_NAME, 'v1', 'createDnsRecord');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/dns_records',
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
   * Delete DNS record.
   *
   * Delete a DNS record given its id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dnsrecordIdentifier - Identifier of DNS record.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsRecordsV1.Response<DnsRecordsV1.DeleteDnsrecordResp>>}
   */
  public deleteDnsRecord(
    params: DnsRecordsV1.DeleteDnsRecordParams
  ): Promise<DnsRecordsV1.Response<DnsRecordsV1.DeleteDnsrecordResp>> {
    const _params = { ...params };
    const _requiredParams = ['dnsrecordIdentifier'];
    const _validParams = ['dnsrecordIdentifier', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'dnsrecord_identifier': _params.dnsrecordIdentifier,
    };

    const sdkHeaders = getSdkHeaders(DnsRecordsV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteDnsRecord');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/dns_records/{dnsrecord_identifier}',
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
   * Get DNS record.
   *
   * Get the details of a DNS record for a given zone under a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dnsrecordIdentifier - Identifier of DNS record.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsRecordsV1.Response<DnsRecordsV1.DnsrecordResp>>}
   */
  public getDnsRecord(
    params: DnsRecordsV1.GetDnsRecordParams
  ): Promise<DnsRecordsV1.Response<DnsRecordsV1.DnsrecordResp>> {
    const _params = { ...params };
    const _requiredParams = ['dnsrecordIdentifier'];
    const _validParams = ['dnsrecordIdentifier', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'dnsrecord_identifier': _params.dnsrecordIdentifier,
    };

    const sdkHeaders = getSdkHeaders(DnsRecordsV1.DEFAULT_SERVICE_NAME, 'v1', 'getDnsRecord');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/dns_records/{dnsrecord_identifier}',
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
   * Update DNS record.
   *
   * Update an existing DNS record for a given zone under a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dnsrecordIdentifier - Identifier of DNS record.
   * @param {string} [params.type] - dns record type.
   * @param {string} [params.name] - Required for all record types except SRV.
   * @param {number} [params.ttl] - dns record ttl value.
   * @param {string} [params.content] - content of dns record.
   * @param {number} [params.priority] - For MX records only.
   * @param {boolean} [params.proxied] - proxied.
   * @param {JsonObject} [params.data] - For LOC, SRV, CAA, DS records only.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsRecordsV1.Response<DnsRecordsV1.DnsrecordResp>>}
   */
  public updateDnsRecord(
    params: DnsRecordsV1.UpdateDnsRecordParams
  ): Promise<DnsRecordsV1.Response<DnsRecordsV1.DnsrecordResp>> {
    const _params = { ...params };
    const _requiredParams = ['dnsrecordIdentifier'];
    const _validParams = ['dnsrecordIdentifier', 'type', 'name', 'ttl', 'content', 'priority', 'proxied', 'data', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'name': _params.name,
      'ttl': _params.ttl,
      'content': _params.content,
      'priority': _params.priority,
      'proxied': _params.proxied,
      'data': _params.data,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'dnsrecord_identifier': _params.dnsrecordIdentifier,
    };

    const sdkHeaders = getSdkHeaders(DnsRecordsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateDnsRecord');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/dns_records/{dnsrecord_identifier}',
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
   * Batch DNS records.
   *
   * Send a Batch of DNS Record API calls to be executed together. The operations you specify within the /batch request
   * body are always executed in the following order: deletes, patches, puts, posts.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {BatchDnsRecordsRequestDeletesItem[]} [params.deletes] -
   * @param {BatchDnsRecordsRequestPatchesItem[]} [params.patches] -
   * @param {DnsrecordInput[]} [params.posts] -
   * @param {BatchDnsRecordsRequestPutsItem[]} [params.puts] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsRecordsV1.Response<DnsRecordsV1.BatchDnsRecordsResponse>>}
   */
  public batchDnsRecords(
    params?: DnsRecordsV1.BatchDnsRecordsParams
  ): Promise<DnsRecordsV1.Response<DnsRecordsV1.BatchDnsRecordsResponse>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['deletes', 'patches', 'posts', 'puts', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'deletes': _params.deletes,
      'patches': _params.patches,
      'posts': _params.posts,
      'puts': _params.puts,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(DnsRecordsV1.DEFAULT_SERVICE_NAME, 'v1', 'batchDnsRecords');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/dns_records/batch',
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
}

/*************************
 * interfaces
 ************************/

namespace DnsRecordsV1 {
  /** Options for the `DnsRecordsV1` constructor. */
  export interface Options extends UserOptions {
    /** Full url-encoded CRN of the service instance. */
    crn: string;
    /** Identifier of zone. */
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

  /** Parameters for the `listAllDnsRecords` operation. */
  export interface ListAllDnsRecordsParams extends DefaultParams {
    /** Type of DNS records to display. */
    type?: string;
    /** Value of name field to filter by. */
    name?: string;
    /** Value of content field to filter by. */
    content?: string;
    /** Page number of paginated results. */
    page?: number;
    /** Maximum number of DNS records per page. */
    perPage?: number;
    /** Field by which to order list of DNS records. */
    order?: ListAllDnsRecordsConstants.Order | string;
    /** Direction in which to order results [ascending/descending order]. */
    direction?: ListAllDnsRecordsConstants.Direction | string;
    /** Whether to match all (all) or atleast one search parameter (any). */
    match?: ListAllDnsRecordsConstants.Match | string;
  }

  /** Constants for the `listAllDnsRecords` operation. */
  export namespace ListAllDnsRecordsConstants {
    /** Field by which to order list of DNS records. */
    export enum Order {
      TYPE = 'type',
      NAME = 'name',
      CONTENT = 'content',
      TTL = 'ttl',
      PROXIED = 'proxied',
    }
    /** Direction in which to order results [ascending/descending order]. */
    export enum Direction {
      ASC = 'asc',
      DESC = 'desc',
    }
    /** Whether to match all (all) or atleast one search parameter (any). */
    export enum Match {
      ANY = 'any',
      ALL = 'all',
    }
  }

  /** Parameters for the `createDnsRecord` operation. */
  export interface CreateDnsRecordParams extends DefaultParams {
    /** dns record type. */
    type?: CreateDnsRecordConstants.Type | string;
    /** Required for all record types except SRV. */
    name?: string;
    /** dns record ttl value. */
    ttl?: number;
    /** dns record content. */
    content?: string;
    /** For MX records only. */
    priority?: number;
    /** proxied. */
    proxied?: boolean;
    /** For LOC, SRV, CAA, DS records only. */
    data?: JsonObject;
  }

  /** Constants for the `createDnsRecord` operation. */
  export namespace CreateDnsRecordConstants {
    /** dns record type. */
    export enum Type {
      A = 'A',
      AAAA = 'AAAA',
      CNAME = 'CNAME',
      NS = 'NS',
      MX = 'MX',
      TXT = 'TXT',
      LOC = 'LOC',
      SRV = 'SRV',
      PTR = 'PTR',
      CAA = 'CAA',
      DS = 'DS',
    }
  }

  /** Parameters for the `deleteDnsRecord` operation. */
  export interface DeleteDnsRecordParams extends DefaultParams {
    /** Identifier of DNS record. */
    dnsrecordIdentifier: string;
  }

  /** Parameters for the `getDnsRecord` operation. */
  export interface GetDnsRecordParams extends DefaultParams {
    /** Identifier of DNS record. */
    dnsrecordIdentifier: string;
  }

  /** Parameters for the `updateDnsRecord` operation. */
  export interface UpdateDnsRecordParams extends DefaultParams {
    /** Identifier of DNS record. */
    dnsrecordIdentifier: string;
    /** dns record type. */
    type?: UpdateDnsRecordConstants.Type | string;
    /** Required for all record types except SRV. */
    name?: string;
    /** dns record ttl value. */
    ttl?: number;
    /** content of dns record. */
    content?: string;
    /** For MX records only. */
    priority?: number;
    /** proxied. */
    proxied?: boolean;
    /** For LOC, SRV, CAA, DS records only. */
    data?: JsonObject;
  }

  /** Constants for the `updateDnsRecord` operation. */
  export namespace UpdateDnsRecordConstants {
    /** dns record type. */
    export enum Type {
      A = 'A',
      AAAA = 'AAAA',
      CNAME = 'CNAME',
      NS = 'NS',
      MX = 'MX',
      TXT = 'TXT',
      LOC = 'LOC',
      SRV = 'SRV',
      PTR = 'PTR',
      CAA = 'CAA',
      DS = 'DS',
    }
  }

  /** Parameters for the `batchDnsRecords` operation. */
  export interface BatchDnsRecordsParams extends DefaultParams {
    deletes?: BatchDnsRecordsRequestDeletesItem[];
    patches?: BatchDnsRecordsRequestPatchesItem[];
    posts?: DnsrecordInput[];
    puts?: BatchDnsRecordsRequestPutsItem[];
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * BatchDnsRecordsRequestDeletesItem.
   */
  export interface BatchDnsRecordsRequestDeletesItem {
    /** DNS record ID to delete. */
    id: string;
  }

  /**
   * BatchDnsRecordsRequestPatchesItem.
   */
  export interface BatchDnsRecordsRequestPatchesItem {
    /** DNS record ID to patch. */
    id: string;
    /** Required for all record types except SRV. */
    name?: string;
    /** dns record type. */
    type?: BatchDnsRecordsRequestPatchesItem.Constants.Type | string;
    /** dns record ttl value. */
    ttl?: number;
    /** content of dns record. */
    content?: string;
    /** For MX records only. */
    priority?: number;
    /** proxied. */
    proxied?: boolean;
    /** For LOC, SRV, CAA, DS records only. */
    data?: JsonObject;
  }
  export namespace BatchDnsRecordsRequestPatchesItem {
    export namespace Constants {
      /** dns record type. */
      export enum Type {
        A = 'A',
        AAAA = 'AAAA',
        CNAME = 'CNAME',
        NS = 'NS',
        MX = 'MX',
        TXT = 'TXT',
        LOC = 'LOC',
        SRV = 'SRV',
        PTR = 'PTR',
        CAA = 'CAA',
        DS = 'DS',
      }
    }
  }

  /**
   * BatchDnsRecordsRequestPutsItem.
   */
  export interface BatchDnsRecordsRequestPutsItem {
    /** DNS record ID to update. */
    id: string;
    /** Required for all record types except SRV. */
    name: string;
    /** dns record type. */
    type: BatchDnsRecordsRequestPutsItem.Constants.Type | string;
    /** dns record ttl value. */
    ttl: number;
    /** dns record content. */
    content: string;
    /** For MX records only. */
    priority?: number;
    /** proxied. */
    proxied?: boolean;
    /** For LOC, SRV, CAA, DS records only. */
    data?: JsonObject;
  }
  export namespace BatchDnsRecordsRequestPutsItem {
    export namespace Constants {
      /** dns record type. */
      export enum Type {
        A = 'A',
        AAAA = 'AAAA',
        CNAME = 'CNAME',
        NS = 'NS',
        MX = 'MX',
        TXT = 'TXT',
        LOC = 'LOC',
        SRV = 'SRV',
        PTR = 'PTR',
        CAA = 'CAA',
        DS = 'DS',
      }
    }
  }

  /**
   * BatchDnsRecordsResponseResult.
   */
  export interface BatchDnsRecordsResponseResult {
    deletes?: BatchDnsRecordDetails[];
    patches?: BatchDnsRecordDetails[];
    posts?: BatchDnsRecordDetails[];
    puts?: BatchDnsRecordDetails[];
  }

  /**
   * result.
   */
  export interface DeleteDnsrecordRespResult {
    /** dns record id. */
    id: string;
  }

  /**
   * dns record details as returned by the batch API.
   */
  export interface BatchDnsRecordDetails {
    /** dns record identifier. */
    id?: string;
    /** created on. */
    created_on?: string;
    /** modified date. */
    modified_on?: string;
    /** dns record name. */
    name?: string;
    /** dns record type. */
    type?: BatchDnsRecordDetails.Constants.Type | string;
    /** dns record content. */
    content?: string;
    /** proxiable. */
    proxiable?: boolean;
    /** proxied. */
    proxied?: boolean;
    /** dns record ttl value. */
    ttl?: number;
    /** Relevant only to MX type records. */
    priority?: number;
    /** Data details for the DNS record. Only for LOC, SRV, CAA records. */
    data?: JsonObject;
    /** DNS record settings. */
    settings?: JsonObject;
    /** DNS record metadata. */
    meta?: JsonObject;
    /** Optional comment for the DNS record. */
    comment?: string;
    /** Tags associated with the DNS record. */
    tags?: string[];
  }
  export namespace BatchDnsRecordDetails {
    export namespace Constants {
      /** dns record type. */
      export enum Type {
        A = 'A',
        AAAA = 'AAAA',
        CNAME = 'CNAME',
        NS = 'NS',
        MX = 'MX',
        TXT = 'TXT',
        LOC = 'LOC',
        SRV = 'SRV',
        PTR = 'PTR',
        CAA = 'CAA',
        DS = 'DS',
      }
    }
  }

  /**
   * Batch DNS records response.
   */
  export interface BatchDnsRecordsResponse {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    result: BatchDnsRecordsResponseResult;
  }

  /**
   * dns record delete response.
   */
  export interface DeleteDnsrecordResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: DeleteDnsrecordRespResult;
  }

  /**
   * dns record details.
   */
  export interface DnsrecordDetails {
    /** dns record identifier. */
    id?: string;
    /** created on. */
    created_on?: string;
    /** modified date. */
    modified_on?: string;
    /** dns record name. */
    name?: string;
    /** dns record type. */
    type?: DnsrecordDetails.Constants.Type | string;
    /** dns record content. */
    content?: string;
    /** zone identifier. */
    zone_id?: string;
    /** zone name. */
    zone_name?: string;
    /** proxiable. */
    proxiable?: boolean;
    /** proxied. */
    proxied?: boolean;
    /** dns record ttl value. */
    ttl?: number;
    /** Relevant only to MX type records. */
    priority?: number;
    /** Data details for the DNS record. Only for LOC, SRV, CAA records. */
    data?: JsonObject;
  }
  export namespace DnsrecordDetails {
    export namespace Constants {
      /** dns record type. */
      export enum Type {
        A = 'A',
        AAAA = 'AAAA',
        CNAME = 'CNAME',
        NS = 'NS',
        MX = 'MX',
        TXT = 'TXT',
        LOC = 'LOC',
        SRV = 'SRV',
        PTR = 'PTR',
        CAA = 'CAA',
        DS = 'DS',
      }
    }
  }

  /**
   * dns record input.
   */
  export interface DnsrecordInput {
    /** Required for all record types except SRV. */
    name?: string;
    /** dns record type. */
    type: DnsrecordInput.Constants.Type | string;
    /** dns record ttl value. */
    ttl?: number;
    /** dns record content. */
    content?: string;
    /** For MX records only. */
    priority?: number;
    /** proxied. */
    proxied?: boolean;
    /** For LOC, SRV, CAA, DS records only. */
    data?: JsonObject;
  }
  export namespace DnsrecordInput {
    export namespace Constants {
      /** dns record type. */
      export enum Type {
        A = 'A',
        AAAA = 'AAAA',
        CNAME = 'CNAME',
        NS = 'NS',
        MX = 'MX',
        TXT = 'TXT',
        LOC = 'LOC',
        SRV = 'SRV',
        PTR = 'PTR',
        CAA = 'CAA',
        DS = 'DS',
      }
    }
  }

  /**
   * dns record response.
   */
  export interface DnsrecordResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** dns record details. */
    result: DnsrecordDetails;
  }

  /**
   * dns records list response.
   */
  export interface ListDnsrecordsResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** dns record list. */
    result: DnsrecordDetails[];
    /** result information. */
    result_info: ResultInfo;
  }

  /**
   * result information.
   */
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
}

export = DnsRecordsV1;
