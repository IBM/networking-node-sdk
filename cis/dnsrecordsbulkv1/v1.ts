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
 * Import/Export zone files
 */

class DnsRecordBulkV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'dns_record_bulk';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of DnsRecordBulkV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {DnsRecordBulkV1}
   */

  public static newInstance(options: UserOptions): DnsRecordBulkV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new DnsRecordBulkV1(options);
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
   * Construct a DnsRecordBulkV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded CRN of the service instance.
   * @param {string} options.zoneIdentifier - Identifier of zone.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {DnsRecordBulkV1}
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
      this.setServiceUrl(DnsRecordBulkV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * dNSRecords
   ************************/

  /**
   * Export zone file.
   *
   * Export zone file.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsRecordBulkV1.Response<NodeJS.ReadableStream|Buffer>>}
   */
  public getDnsRecordsBulk(params?: DnsRecordBulkV1.GetDnsRecordsBulkParams): Promise<DnsRecordBulkV1.Response<NodeJS.ReadableStream|Buffer>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(DnsRecordBulkV1.DEFAULT_SERVICE_NAME, 'v1', 'getDnsRecordsBulk');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/dns_records_bulk',
        method: 'GET',
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'text/plain; charset=utf-8',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Import zone file.
   *
   * Import zone file.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|Buffer} [params.file] - file to upload.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsRecordBulkV1.Response<DnsRecordBulkV1.DnsRecordsObject>>}
   */
  public postDnsRecordsBulk(params?: DnsRecordBulkV1.PostDnsRecordsBulkParams): Promise<DnsRecordBulkV1.Response<DnsRecordBulkV1.DnsRecordsObject>> {
    const _params = Object.assign({}, params);

    const formData = {
      'file': {
        data: _params.file,
        contentType: _params.fileContentType
      }
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(DnsRecordBulkV1.DEFAULT_SERVICE_NAME, 'v1', 'postDnsRecordsBulk');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/dns_records_bulk',
        method: 'POST',
        path,
        formData
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

}

/*************************
 * interfaces
 ************************/

namespace DnsRecordBulkV1 {

  /** Options for the `DnsRecordBulkV1` constructor. */
  export interface Options extends UserOptions {

    /** Full url-encoded CRN of the service instance. */
    crn: string;

    /** Identifier of zone. */
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

  /** Parameters for the `getDnsRecordsBulk` operation. */
  export interface GetDnsRecordsBulkParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postDnsRecordsBulk` operation. */
  export interface PostDnsRecordsBulkParams {
    /** file to upload. */
    file?: NodeJS.ReadableStream|Buffer;
    /** The content type of file. */
    fileContentType?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** DnsRecordsObjectMessagesItem. */
  export interface DnsRecordsObjectMessagesItem {
    /** Message code. */
    code?: number;
    /** Message corresponding to the code. */
    message?: string;
  }

  /** DNS record. */
  export interface DnsRecordsObjectResult {
    /** total records added. */
    recs_added: number;
    /** total records parsed. */
    total_records_parsed: number;
  }

  /** timing object. */
  export interface DnsRecordsObjectTiming {
    /** start time. */
    start_time?: string;
    /** end time. */
    end_time?: string;
    /** process time. */
    process_time?: number;
  }

  /** dns records objects. */
  export interface DnsRecordsObject {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: DnsRecordsObjectMessagesItem[];
    /** DNS record. */
    result: DnsRecordsObjectResult;
    /** timing object. */
    timing?: DnsRecordsObjectTiming;
  }

}

export = DnsRecordBulkV1;
