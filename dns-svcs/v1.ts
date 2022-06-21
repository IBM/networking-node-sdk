/**
 * (C) Copyright IBM Corp. 2022.
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
 * IBM OpenAPI SDK Code Generator Version: 3.47.1-be944570-20220406-170244
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  UserOptions,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * DNS Services API
 *
 * API Version: 1.0.0
 */

class DnsSvcsV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.dns-svcs.cloud.ibm.com/v1';

  static DEFAULT_SERVICE_NAME: string = 'dns_svcs';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of DnsSvcsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {DnsSvcsV1}
   */

  public static newInstance(options: UserOptions): DnsSvcsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new DnsSvcsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a DnsSvcsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {DnsSvcsV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(DnsSvcsV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * dNSZones
   ************************/

  /**
   * List DNS zones.
   *
   * List the DNS zones for a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {number} [params.offset] - Specify how many resources to skip over, the default value is 0.
   * @param {number} [params.limit] - Specify maximum resources might be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ListDnszones>>}
   */
  public listDnszones(
    params: DnsSvcsV1.ListDnszonesParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ListDnszones>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'xCorrelationId', 'offset', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'offset': _params.offset,
      'limit': _params.limit,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listDnszones'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create DNS zone.
   *
   * Create a DNS zone for a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} [params.name] - Name of DNS zone.
   * @param {string} [params.description] - The text describing the purpose of a DNS zone.
   * @param {string} [params.label] - The label of a DNS zone.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Dnszone>>}
   */
  public createDnszone(
    params: DnsSvcsV1.CreateDnszoneParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Dnszone>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'name', 'description', 'label', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'label': _params.label,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createDnszone'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete DNS zone.
   *
   * Delete a DNS zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>>}
   */
  public deleteDnszone(
    params: DnsSvcsV1.DeleteDnszoneParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId'];
    const _validParams = ['instanceId', 'dnszoneId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteDnszone'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get DNS zone.
   *
   * Get details of a DNS zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Dnszone>>}
   */
  public getDnszone(
    params: DnsSvcsV1.GetDnszoneParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Dnszone>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId'];
    const _validParams = ['instanceId', 'dnszoneId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDnszone'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update DNS zone.
   *
   * Update the properties of a DNS zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} [params.description] - The text describing the purpose of a DNS zone.
   * @param {string} [params.label] - The label of a DNS zone.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Dnszone>>}
   */
  public updateDnszone(
    params: DnsSvcsV1.UpdateDnszoneParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Dnszone>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId'];
    const _validParams = ['instanceId', 'dnszoneId', 'description', 'label', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'label': _params.label,
    };

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateDnszone'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}',
        method: 'PATCH',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * resourceRecords
   ************************/

  /**
   * List resource records.
   *
   * List the Resource Records for a given DNS zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {number} [params.offset] - Specify how many resources to skip over, the default value is 0.
   * @param {number} [params.limit] - Specify maximum resources might be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ListResourceRecords>>}
   */
  public listResourceRecords(
    params: DnsSvcsV1.ListResourceRecordsParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ListResourceRecords>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId'];
    const _validParams = ['instanceId', 'dnszoneId', 'xCorrelationId', 'offset', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'offset': _params.offset,
      'limit': _params.limit,
    };

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listResourceRecords'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/resource_records',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create resource record.
   *
   * Create a resource record for a given DNS zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} [params.type] - Type of the resource record.
   * @param {string} [params.name] - Name of the resource record.
   * @param {ResourceRecordInputRdata} [params.rdata] - Content of the resource record.
   * @param {number} [params.ttl] - Time to live in second.
   * @param {string} [params.service] - Only used for SRV record.
   * @param {string} [params.protocol] - Only used for SRV record.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ResourceRecord>>}
   */
  public createResourceRecord(
    params: DnsSvcsV1.CreateResourceRecordParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ResourceRecord>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId'];
    const _validParams = ['instanceId', 'dnszoneId', 'type', 'name', 'rdata', 'ttl', 'service', 'protocol', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'name': _params.name,
      'rdata': _params.rdata,
      'ttl': _params.ttl,
      'service': _params.service,
      'protocol': _params.protocol,
    };

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createResourceRecord'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/resource_records',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete resource record.
   *
   * Delete a resource record.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} params.recordId - The unique identifier of a resource record.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>>}
   */
  public deleteResourceRecord(
    params: DnsSvcsV1.DeleteResourceRecordParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId', 'recordId'];
    const _validParams = ['instanceId', 'dnszoneId', 'recordId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
      'record_id': _params.recordId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteResourceRecord'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/resource_records/{record_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get resource record.
   *
   * Get details of a resource record.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} params.recordId - The unique identifier of a resource record.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ResourceRecord>>}
   */
  public getResourceRecord(
    params: DnsSvcsV1.GetResourceRecordParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ResourceRecord>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId', 'recordId'];
    const _validParams = ['instanceId', 'dnszoneId', 'recordId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
      'record_id': _params.recordId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getResourceRecord'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/resource_records/{record_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update resource record.
   *
   * Update the properties of a resource record.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} params.recordId - The unique identifier of a resource record.
   * @param {string} [params.name] - Name of the resource record.
   * @param {ResourceRecordUpdateInputRdata} [params.rdata] - Content of the resource record.
   * @param {number} [params.ttl] - Time to live in second.
   * @param {string} [params.service] - Only used for SRV record.
   * @param {string} [params.protocol] - Only used for SRV record.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ResourceRecord>>}
   */
  public updateResourceRecord(
    params: DnsSvcsV1.UpdateResourceRecordParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ResourceRecord>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId', 'recordId'];
    const _validParams = ['instanceId', 'dnszoneId', 'recordId', 'name', 'rdata', 'ttl', 'service', 'protocol', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'rdata': _params.rdata,
      'ttl': _params.ttl,
      'service': _params.service,
      'protocol': _params.protocol,
    };

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
      'record_id': _params.recordId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateResourceRecord'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/resource_records/{record_id}',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Export resource records to a zone file.
   *
   * Export resource records to a zone file.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<NodeJS.ReadableStream>>}
   */
  public exportResourceRecords(
    params: DnsSvcsV1.ExportResourceRecordsParams
  ): Promise<DnsSvcsV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId'];
    const _validParams = ['instanceId', 'dnszoneId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'exportResourceRecords'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/export_resource_records',
        method: 'GET',
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'text/plain; charset=utf-8',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Import resource records from a zone file.
   *
   * Import resource records from a zone file. The maximum size of a zone file is 8MB.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {NodeJS.ReadableStream | Buffer} [params.file] - file to upload.
   * @param {string} [params.fileContentType] - The content type of file.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ImportResourceRecordsResp>>}
   */
  public importResourceRecords(
    params: DnsSvcsV1.ImportResourceRecordsParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ImportResourceRecordsResp>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId'];
    const _validParams = ['instanceId', 'dnszoneId', 'file', 'fileContentType', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const formData = {
      'file': {
        data: _params.file,
        contentType: _params.fileContentType,
      },
    };

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'importResourceRecords'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/import_resource_records',
        method: 'POST',
        path,
        formData
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * permittedNetwork
   ************************/

  /**
   * List permitted networks.
   *
   * List the permitted networks for a given DNS zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ListPermittedNetworks>>}
   */
  public listPermittedNetworks(
    params: DnsSvcsV1.ListPermittedNetworksParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ListPermittedNetworks>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId'];
    const _validParams = ['instanceId', 'dnszoneId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listPermittedNetworks'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/permitted_networks',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create permitted network.
   *
   * Create a permitted network for a given DNS zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} [params.type] - The type of a permitted network.
   * @param {PermittedNetworkVpc} [params.permittedNetwork] - Permitted network data for VPC.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.PermittedNetwork>>}
   */
  public createPermittedNetwork(
    params: DnsSvcsV1.CreatePermittedNetworkParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.PermittedNetwork>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId'];
    const _validParams = ['instanceId', 'dnszoneId', 'type', 'permittedNetwork', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'permitted_network': _params.permittedNetwork,
    };

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createPermittedNetwork'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/permitted_networks',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Remove permitted network.
   *
   * Remove a permitted network.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} params.permittedNetworkId - The unique identifier of a permitted network.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.PermittedNetwork>>}
   */
  public deletePermittedNetwork(
    params: DnsSvcsV1.DeletePermittedNetworkParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.PermittedNetwork>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId', 'permittedNetworkId'];
    const _validParams = ['instanceId', 'dnszoneId', 'permittedNetworkId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
      'permitted_network_id': _params.permittedNetworkId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deletePermittedNetwork'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/permitted_networks/{permitted_network_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get permitted network.
   *
   * Get details of a permitted network.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} params.permittedNetworkId - The unique identifier of a permitted network.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.PermittedNetwork>>}
   */
  public getPermittedNetwork(
    params: DnsSvcsV1.GetPermittedNetworkParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.PermittedNetwork>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId', 'permittedNetworkId'];
    const _validParams = ['instanceId', 'dnszoneId', 'permittedNetworkId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
      'permitted_network_id': _params.permittedNetworkId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getPermittedNetwork'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/permitted_networks/{permitted_network_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * globalLoadBalancers
   ************************/

  /**
   * List load balancers.
   *
   * List the Global Load Balancers for a given DNS zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {number} [params.offset] - Specify how many resources to skip over, the default value is 0.
   * @param {number} [params.limit] - Specify maximum resources might be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ListLoadBalancers>>}
   */
  public listLoadBalancers(
    params: DnsSvcsV1.ListLoadBalancersParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ListLoadBalancers>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId'];
    const _validParams = ['instanceId', 'dnszoneId', 'xCorrelationId', 'offset', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'offset': _params.offset,
      'limit': _params.limit,
    };

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listLoadBalancers'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/load_balancers',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create load balancer.
   *
   * Create a load balancer for a given DNS zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} [params.name] - Name of the load balancer.
   * @param {string} [params.fallbackPool] - The pool ID to use when all other pools are detected as unhealthy.
   * @param {string[]} [params.defaultPools] - A list of pool IDs ordered by their failover priority. Pools defined here
   * are used by default, or when region_pools are not configured for a given region.
   * @param {string} [params.description] - Descriptive text of the load balancer.
   * @param {boolean} [params.enabled] - Whether the load balancer is enabled.
   * @param {number} [params.ttl] - Time to live in second.
   * @param {LoadBalancerAzPoolsItem[]} [params.azPools] - Map availability zones to pool IDs.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.LoadBalancer>>}
   */
  public createLoadBalancer(
    params: DnsSvcsV1.CreateLoadBalancerParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.LoadBalancer>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId'];
    const _validParams = ['instanceId', 'dnszoneId', 'name', 'fallbackPool', 'defaultPools', 'description', 'enabled', 'ttl', 'azPools', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'fallback_pool': _params.fallbackPool,
      'default_pools': _params.defaultPools,
      'description': _params.description,
      'enabled': _params.enabled,
      'ttl': _params.ttl,
      'az_pools': _params.azPools,
    };

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createLoadBalancer'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/load_balancers',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete load balancer.
   *
   * Delete a load balancer.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} params.lbId - The unique identifier of a load balancer.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>>}
   */
  public deleteLoadBalancer(
    params: DnsSvcsV1.DeleteLoadBalancerParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId', 'lbId'];
    const _validParams = ['instanceId', 'dnszoneId', 'lbId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
      'lb_id': _params.lbId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteLoadBalancer'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/load_balancers/{lb_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get load balancer.
   *
   * Get details of a load balancer.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} params.lbId - The unique identifier of a load balancer.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.LoadBalancer>>}
   */
  public getLoadBalancer(
    params: DnsSvcsV1.GetLoadBalancerParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.LoadBalancer>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId', 'lbId'];
    const _validParams = ['instanceId', 'dnszoneId', 'lbId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
      'lb_id': _params.lbId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getLoadBalancer'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/load_balancers/{lb_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update load balancer.
   *
   * Update the properties of a load balancer.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} params.lbId - The unique identifier of a load balancer.
   * @param {string} [params.name] - Name of the load balancer.
   * @param {string} [params.description] - Descriptive text of the load balancer.
   * @param {boolean} [params.enabled] - Whether the load balancer is enabled.
   * @param {number} [params.ttl] - Time to live in second.
   * @param {string} [params.fallbackPool] - The pool ID to use when all other pools are detected as unhealthy.
   * @param {string[]} [params.defaultPools] - A list of pool IDs ordered by their failover priority. Pools defined here
   * are used by default, or when region_pools are not configured for a given region.
   * @param {LoadBalancerAzPoolsItem[]} [params.azPools] - Map availability zones to pool IDs.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.LoadBalancer>>}
   */
  public updateLoadBalancer(
    params: DnsSvcsV1.UpdateLoadBalancerParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.LoadBalancer>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId', 'lbId'];
    const _validParams = ['instanceId', 'dnszoneId', 'lbId', 'name', 'description', 'enabled', 'ttl', 'fallbackPool', 'defaultPools', 'azPools', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'enabled': _params.enabled,
      'ttl': _params.ttl,
      'fallback_pool': _params.fallbackPool,
      'default_pools': _params.defaultPools,
      'az_pools': _params.azPools,
    };

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
      'lb_id': _params.lbId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateLoadBalancer'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/load_balancers/{lb_id}',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * pools
   ************************/

  /**
   * List load balancer pools.
   *
   * List the load balancer pools.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {number} [params.offset] - Specify how many resources to skip over, the default value is 0.
   * @param {number} [params.limit] - Specify maximum resources might be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ListPools>>}
   */
  public listPools(
    params: DnsSvcsV1.ListPoolsParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ListPools>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'xCorrelationId', 'offset', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'offset': _params.offset,
      'limit': _params.limit,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listPools'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/pools',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create load balancer pool.
   *
   * Create a load balancer pool.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} [params.name] - Name of the load balancer pool.
   * @param {OriginInput[]} [params.origins] - The list of origins within this pool. Traffic directed at this pool is
   * balanced across all currently healthy origins, provided the pool itself is healthy.
   * @param {string} [params.description] - Descriptive text of the load balancer pool.
   * @param {boolean} [params.enabled] - Whether the load balancer pool is enabled.
   * @param {number} [params.healthyOriginsThreshold] - The minimum number of origins that must be healthy for this pool
   * to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and
   * we will failover to the next available pool.
   * @param {string} [params.monitor] - The ID of the load balancer monitor to be associated to this pool.
   * @param {string} [params.notificationChannel] - The notification channel.
   * @param {string} [params.healthcheckRegion] - Health check region of VSIs.
   * @param {string[]} [params.healthcheckSubnets] - Health check subnet CRN.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Pool>>}
   */
  public createPool(
    params: DnsSvcsV1.CreatePoolParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Pool>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'name', 'origins', 'description', 'enabled', 'healthyOriginsThreshold', 'monitor', 'notificationChannel', 'healthcheckRegion', 'healthcheckSubnets', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'origins': _params.origins,
      'description': _params.description,
      'enabled': _params.enabled,
      'healthy_origins_threshold': _params.healthyOriginsThreshold,
      'monitor': _params.monitor,
      'notification_channel': _params.notificationChannel,
      'healthcheck_region': _params.healthcheckRegion,
      'healthcheck_subnets': _params.healthcheckSubnets,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createPool'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/pools',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete load balancer pool.
   *
   * Delete a load balancer pool.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.poolId - The unique identifier of a load balancer pool.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>>}
   */
  public deletePool(
    params: DnsSvcsV1.DeletePoolParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'poolId'];
    const _validParams = ['instanceId', 'poolId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'pool_id': _params.poolId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deletePool'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/pools/{pool_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get load balancer pool.
   *
   * Get details of a load balancer pool.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.poolId - The unique identifier of a load balancer pool.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Pool>>}
   */
  public getPool(
    params: DnsSvcsV1.GetPoolParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Pool>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'poolId'];
    const _validParams = ['instanceId', 'poolId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'pool_id': _params.poolId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getPool'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/pools/{pool_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update load balancer pool.
   *
   * Update the properties of a load balancer pool.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.poolId - The unique identifier of a load balancer pool.
   * @param {string} [params.name] - Name of the load balancer pool.
   * @param {string} [params.description] - Descriptive text of the load balancer pool.
   * @param {boolean} [params.enabled] - Whether the load balancer pool is enabled.
   * @param {number} [params.healthyOriginsThreshold] - The minimum number of origins that must be healthy for this pool
   * to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and
   * we will failover to the next available pool.
   * @param {OriginInput[]} [params.origins] - The list of origins within this pool. Traffic directed at this pool is
   * balanced across all currently healthy origins, provided the pool itself is healthy.
   * @param {string} [params.monitor] - The ID of the load balancer monitor to be associated to this pool.
   * @param {string} [params.notificationChannel] - The notification channel.
   * @param {string} [params.healthcheckRegion] - Health check region of VSIs.
   * @param {string[]} [params.healthcheckSubnets] - Health check subnet CRNs.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Pool>>}
   */
  public updatePool(
    params: DnsSvcsV1.UpdatePoolParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Pool>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'poolId'];
    const _validParams = ['instanceId', 'poolId', 'name', 'description', 'enabled', 'healthyOriginsThreshold', 'origins', 'monitor', 'notificationChannel', 'healthcheckRegion', 'healthcheckSubnets', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'enabled': _params.enabled,
      'healthy_origins_threshold': _params.healthyOriginsThreshold,
      'origins': _params.origins,
      'monitor': _params.monitor,
      'notification_channel': _params.notificationChannel,
      'healthcheck_region': _params.healthcheckRegion,
      'healthcheck_subnets': _params.healthcheckSubnets,
    };

    const path = {
      'instance_id': _params.instanceId,
      'pool_id': _params.poolId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updatePool'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/pools/{pool_id}',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * monitors
   ************************/

  /**
   * List load balancer monitors.
   *
   * List the load balancer monitors.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {number} [params.offset] - Specify how many resources to skip over, the default value is 0.
   * @param {number} [params.limit] - Specify maximum resources might be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ListMonitors>>}
   */
  public listMonitors(
    params: DnsSvcsV1.ListMonitorsParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ListMonitors>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'xCorrelationId', 'offset', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'offset': _params.offset,
      'limit': _params.limit,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listMonitors'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/monitors',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create load balancer monitor.
   *
   * Create a load balancer monitor.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} [params.name] - The name of the load balancer monitor.
   * @param {string} [params.type] - The protocol to use for the health check. Currently supported protocols are
   * 'HTTP','HTTPS' and 'TCP'.
   * @param {string} [params.description] - Descriptive text of the load balancer monitor.
   * @param {number} [params.port] - Port number to connect to for the health check. Required for TCP checks. HTTP and
   * HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: default 443).
   * @param {number} [params.interval] - The interval between each health check. Shorter intervals may improve failover
   * time, but will increase load on the origins as we check from multiple locations.
   * @param {number} [params.retries] - The number of retries to attempt in case of a timeout before marking the origin
   * as unhealthy. Retries are attempted immediately.
   * @param {number} [params.timeout] - The timeout (in seconds) before marking the health check as failed.
   * @param {string} [params.method] - The method to use for the health check applicable to HTTP/HTTPS based checks, the
   * default value is 'GET'.
   * @param {string} [params.path] - The endpoint path to health check against. This parameter is only valid for HTTP
   * and HTTPS monitors.
   * @param {HealthcheckHeader[]} [params._headers] - The HTTP request headers to send in the health check. It is
   * recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only
   * valid for HTTP and HTTPS monitors.
   * @param {boolean} [params.allowInsecure] - Do not validate the certificate when monitor use HTTPS. This parameter is
   * currently only valid for HTTPS monitors.
   * @param {string} [params.expectedCodes] - The expected HTTP response code or code range of the health check. This
   * parameter is only valid for HTTP and HTTPS monitors.
   * @param {string} [params.expectedBody] - A case-insensitive sub-string to look for in the response body. If this
   * string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS
   * monitors.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Monitor>>}
   */
  public createMonitor(
    params: DnsSvcsV1.CreateMonitorParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Monitor>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'name', 'type', 'description', 'port', 'interval', 'retries', 'timeout', 'method', 'path', '_headers', 'allowInsecure', 'expectedCodes', 'expectedBody', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'type': _params.type,
      'description': _params.description,
      'port': _params.port,
      'interval': _params.interval,
      'retries': _params.retries,
      'timeout': _params.timeout,
      'method': _params.method,
      'path': _params.path,
      'headers': _params._headers,
      'allow_insecure': _params.allowInsecure,
      'expected_codes': _params.expectedCodes,
      'expected_body': _params.expectedBody,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createMonitor'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/monitors',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete load balancer monitor.
   *
   * Delete a load balancer monitor.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.monitorId - The unique identifier of a load balancer monitor.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>>}
   */
  public deleteMonitor(
    params: DnsSvcsV1.DeleteMonitorParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'monitorId'];
    const _validParams = ['instanceId', 'monitorId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'monitor_id': _params.monitorId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteMonitor'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/monitors/{monitor_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get load balancer monitor.
   *
   * Get details of a load balancer monitor.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.monitorId - The unique identifier of a load balancer monitor.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Monitor>>}
   */
  public getMonitor(
    params: DnsSvcsV1.GetMonitorParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Monitor>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'monitorId'];
    const _validParams = ['instanceId', 'monitorId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'monitor_id': _params.monitorId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getMonitor'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/monitors/{monitor_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update load balancer monitor.
   *
   * Update the properties of a load balancer monitor.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.monitorId - The unique identifier of a load balancer monitor.
   * @param {string} [params.name] - The name of the load balancer monitor.
   * @param {string} [params.description] - Descriptive text of the load balancer monitor.
   * @param {string} [params.type] - The protocol to use for the health check. Currently supported protocols are
   * 'HTTP','HTTPS' and 'TCP'.
   * @param {number} [params.port] - Port number to connect to for the health check. Required for TCP checks. HTTP and
   * HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: default 443).
   * @param {number} [params.interval] - The interval between each health check. Shorter intervals may improve failover
   * time, but will increase load on the origins as we check from multiple locations.
   * @param {number} [params.retries] - The number of retries to attempt in case of a timeout before marking the origin
   * as unhealthy. Retries are attempted immediately.
   * @param {number} [params.timeout] - The timeout (in seconds) before marking the health check as failed.
   * @param {string} [params.method] - The method to use for the health check applicable to HTTP/HTTPS based checks, the
   * default value is 'GET'.
   * @param {string} [params.path] - The endpoint path to health check against. This parameter is only valid for HTTP
   * and HTTPS monitors.
   * @param {HealthcheckHeader[]} [params._headers] - The HTTP request headers to send in the health check. It is
   * recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only
   * valid for HTTP and HTTPS monitors.
   * @param {boolean} [params.allowInsecure] - Do not validate the certificate when monitor use HTTPS. This parameter is
   * currently only valid for HTTP and HTTPS monitors.
   * @param {string} [params.expectedCodes] - The expected HTTP response code or code range of the health check. This
   * parameter is only valid for HTTP and HTTPS monitors.
   * @param {string} [params.expectedBody] - A case-insensitive sub-string to look for in the response body. If this
   * string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS
   * monitors.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Monitor>>}
   */
  public updateMonitor(
    params: DnsSvcsV1.UpdateMonitorParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Monitor>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'monitorId'];
    const _validParams = ['instanceId', 'monitorId', 'name', 'description', 'type', 'port', 'interval', 'retries', 'timeout', 'method', 'path', '_headers', 'allowInsecure', 'expectedCodes', 'expectedBody', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'type': _params.type,
      'port': _params.port,
      'interval': _params.interval,
      'retries': _params.retries,
      'timeout': _params.timeout,
      'method': _params.method,
      'path': _params.path,
      'headers': _params._headers,
      'allow_insecure': _params.allowInsecure,
      'expected_codes': _params.expectedCodes,
      'expected_body': _params.expectedBody,
    };

    const path = {
      'instance_id': _params.instanceId,
      'monitor_id': _params.monitorId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateMonitor'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/monitors/{monitor_id}',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * customResolvers
   ************************/

  /**
   * List custom resolvers.
   *
   * List the custom resolvers.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.CustomResolverList>>}
   */
  public listCustomResolvers(
    params: DnsSvcsV1.ListCustomResolversParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.CustomResolverList>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listCustomResolvers'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/custom_resolvers',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a custom resolver.
   *
   * Create a custom resolver.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} [params.name] - Name of the custom resolver.
   * @param {string} [params.description] - Descriptive text of the custom resolver.
   * @param {LocationInput[]} [params.locations] - Locations on which the custom resolver will be running.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.CustomResolver>>}
   */
  public createCustomResolver(
    params: DnsSvcsV1.CreateCustomResolverParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.CustomResolver>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'name', 'description', 'locations', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'locations': _params.locations,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createCustomResolver'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/custom_resolvers',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a custom resolver.
   *
   * Delete a custom resolver.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.resolverId - The unique identifier of a custom resolver.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>>}
   */
  public deleteCustomResolver(
    params: DnsSvcsV1.DeleteCustomResolverParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'resolverId'];
    const _validParams = ['instanceId', 'resolverId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'resolver_id': _params.resolverId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteCustomResolver'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/custom_resolvers/{resolver_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a custom resolver.
   *
   * Get details of a custom resolver.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.resolverId - The unique identifier of a custom resolver.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.CustomResolver>>}
   */
  public getCustomResolver(
    params: DnsSvcsV1.GetCustomResolverParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.CustomResolver>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'resolverId'];
    const _validParams = ['instanceId', 'resolverId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'resolver_id': _params.resolverId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getCustomResolver'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/custom_resolvers/{resolver_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a custom resolver.
   *
   * Update the properties of a custom resolver.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.resolverId - The unique identifier of a custom resolver.
   * @param {string} [params.name] - Name of the custom resolver.
   * @param {string} [params.description] - Descriptive text of the custom resolver.
   * @param {boolean} [params.enabled] - Whether the custom resolver is enabled.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.CustomResolver>>}
   */
  public updateCustomResolver(
    params: DnsSvcsV1.UpdateCustomResolverParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.CustomResolver>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'resolverId'];
    const _validParams = ['instanceId', 'resolverId', 'name', 'description', 'enabled', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'enabled': _params.enabled,
    };

    const path = {
      'instance_id': _params.instanceId,
      'resolver_id': _params.resolverId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateCustomResolver'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/custom_resolvers/{resolver_id}',
        method: 'PATCH',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update the locations order of a custom resolver.
   *
   * Update the locations order of a custom resolver.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.resolverId - The unique identifier of a custom resolver.
   * @param {string[]} [params.locations] - Array of custom resolver location ID.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.CustomResolver>>}
   */
  public updateCrLocationsOrder(
    params: DnsSvcsV1.UpdateCrLocationsOrderParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.CustomResolver>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'resolverId'];
    const _validParams = ['instanceId', 'resolverId', 'locations', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'locations': _params.locations,
    };

    const path = {
      'instance_id': _params.instanceId,
      'resolver_id': _params.resolverId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateCrLocationsOrder'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/custom_resolvers/{resolver_id}/locations_order',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * customResolverLocations
   ************************/

  /**
   * Add custom resolver location.
   *
   * Add custom resolver location.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.resolverId - The unique identifier of a custom resolver.
   * @param {string} [params.subnetCrn] - Custom resolver location, subnet CRN.
   * @param {boolean} [params.enabled] - Enable/Disable custom resolver location.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Location>>}
   */
  public addCustomResolverLocation(
    params: DnsSvcsV1.AddCustomResolverLocationParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Location>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'resolverId'];
    const _validParams = ['instanceId', 'resolverId', 'subnetCrn', 'enabled', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'subnet_crn': _params.subnetCrn,
      'enabled': _params.enabled,
    };

    const path = {
      'instance_id': _params.instanceId,
      'resolver_id': _params.resolverId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'addCustomResolverLocation'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/custom_resolvers/{resolver_id}/locations',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update custom resolver location.
   *
   * Update custom resolver location.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.resolverId - The unique identifier of a custom resolver.
   * @param {string} params.locationId - Custom resolver location ID.
   * @param {boolean} [params.enabled] - Enable/Disable custom resolver location.
   * @param {string} [params.subnetCrn] - Subnet CRN.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Location>>}
   */
  public updateCustomResolverLocation(
    params: DnsSvcsV1.UpdateCustomResolverLocationParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Location>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'resolverId', 'locationId'];
    const _validParams = ['instanceId', 'resolverId', 'locationId', 'enabled', 'subnetCrn', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'enabled': _params.enabled,
      'subnet_crn': _params.subnetCrn,
    };

    const path = {
      'instance_id': _params.instanceId,
      'resolver_id': _params.resolverId,
      'location_id': _params.locationId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateCustomResolverLocation'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/custom_resolvers/{resolver_id}/locations/{location_id}',
        method: 'PATCH',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete custom resolver location.
   *
   * Delete custom resolver location.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.resolverId - The unique identifier of a custom resolver.
   * @param {string} params.locationId - Custom resolver location ID.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>>}
   */
  public deleteCustomResolverLocation(
    params: DnsSvcsV1.DeleteCustomResolverLocationParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'resolverId', 'locationId'];
    const _validParams = ['instanceId', 'resolverId', 'locationId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'resolver_id': _params.resolverId,
      'location_id': _params.locationId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteCustomResolverLocation'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/custom_resolvers/{resolver_id}/locations/{location_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * forwardingRules
   ************************/

  /**
   * List forwarding rules.
   *
   * List the forwarding rules of the given custom resolver.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.resolverId - The unique identifier of a custom resolver.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ForwardingRuleList>>}
   */
  public listForwardingRules(
    params: DnsSvcsV1.ListForwardingRulesParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ForwardingRuleList>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'resolverId'];
    const _validParams = ['instanceId', 'resolverId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'resolver_id': _params.resolverId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listForwardingRules'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/custom_resolvers/{resolver_id}/forwarding_rules',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a forwarding rule.
   *
   * Create a forwarding rule for the given custom resolver.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.resolverId - The unique identifier of a custom resolver.
   * @param {string} [params.type] - Type of the forwarding rule.
   * @param {string} [params.match] - The matching zone or hostname.
   * @param {string[]} [params.forwardTo] - The upstream DNS servers will be forwarded to.
   * @param {string} [params.description] - Descriptive text of the forwarding rule.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ForwardingRule>>}
   */
  public createForwardingRule(
    params: DnsSvcsV1.CreateForwardingRuleParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ForwardingRule>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'resolverId'];
    const _validParams = ['instanceId', 'resolverId', 'type', 'match', 'forwardTo', 'description', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'match': _params.match,
      'forward_to': _params.forwardTo,
      'description': _params.description,
    };

    const path = {
      'instance_id': _params.instanceId,
      'resolver_id': _params.resolverId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createForwardingRule'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/custom_resolvers/{resolver_id}/forwarding_rules',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a forwarding rule.
   *
   * Delete a forwarding rule on the given custom resolver.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.resolverId - The unique identifier of a custom resolver.
   * @param {string} params.ruleId - The unique identifier of a rule.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>>}
   */
  public deleteForwardingRule(
    params: DnsSvcsV1.DeleteForwardingRuleParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'resolverId', 'ruleId'];
    const _validParams = ['instanceId', 'resolverId', 'ruleId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'resolver_id': _params.resolverId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteForwardingRule'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/custom_resolvers/{resolver_id}/forwarding_rules/{rule_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a forwarding rule.
   *
   * Get details of a forwarding rule on the given custom resolver.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.resolverId - The unique identifier of a custom resolver.
   * @param {string} params.ruleId - The unique identifier of a rule.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ForwardingRule>>}
   */
  public getForwardingRule(
    params: DnsSvcsV1.GetForwardingRuleParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ForwardingRule>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'resolverId', 'ruleId'];
    const _validParams = ['instanceId', 'resolverId', 'ruleId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'resolver_id': _params.resolverId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getForwardingRule'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/custom_resolvers/{resolver_id}/forwarding_rules/{rule_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a forwarding rule.
   *
   * Update the properties of a forwarding rule on the given custom resolver.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.resolverId - The unique identifier of a custom resolver.
   * @param {string} params.ruleId - The unique identifier of a rule.
   * @param {string} [params.description] - Descriptive text of the forwarding rule.
   * @param {string} [params.match] - The matching zone or hostname.
   * @param {string[]} [params.forwardTo] - The upstream DNS servers will be forwarded to.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ForwardingRule>>}
   */
  public updateForwardingRule(
    params: DnsSvcsV1.UpdateForwardingRuleParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ForwardingRule>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'resolverId', 'ruleId'];
    const _validParams = ['instanceId', 'resolverId', 'ruleId', 'description', 'match', 'forwardTo', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'match': _params.match,
      'forward_to': _params.forwardTo,
    };

    const path = {
      'instance_id': _params.instanceId,
      'resolver_id': _params.resolverId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateForwardingRule'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/custom_resolvers/{resolver_id}/forwarding_rules/{rule_id}',
        method: 'PATCH',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * linkedZones
   ************************/

  /**
   * List linked zones.
   *
   * List linked zones in requestor's instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {number} [params.offset] - Specify how many resources to skip over, the default value is 0.
   * @param {number} [params.limit] - Specify maximum resources might be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.LinkedDnszonesList>>}
   */
  public listLinkedZones(
    params: DnsSvcsV1.ListLinkedZonesParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.LinkedDnszonesList>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'xCorrelationId', 'offset', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'offset': _params.offset,
      'limit': _params.limit,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listLinkedZones'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/linked_dnszones',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a linked zone.
   *
   * Create a linked zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} [params.ownerInstanceId] - Owner's instance ID.
   * @param {string} [params.ownerZoneId] - Owner's DNS zone ID.
   * @param {string} [params.description] - Descriptive text of the linked zone.
   * @param {string} [params.label] - The label of linked zone.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.LinkedDnszone>>}
   */
  public createLinkedZone(
    params: DnsSvcsV1.CreateLinkedZoneParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.LinkedDnszone>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'ownerInstanceId', 'ownerZoneId', 'description', 'label', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'owner_instance_id': _params.ownerInstanceId,
      'owner_zone_id': _params.ownerZoneId,
      'description': _params.description,
      'label': _params.label,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createLinkedZone'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/linked_dnszones',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a linked zone.
   *
   * Get details of a linked zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.linkedDnszoneId - The unique identifier of a linked zone.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.LinkedDnszone>>}
   */
  public getLinkedZone(
    params: DnsSvcsV1.GetLinkedZoneParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.LinkedDnszone>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'linkedDnszoneId'];
    const _validParams = ['instanceId', 'linkedDnszoneId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'linked_dnszone_id': _params.linkedDnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getLinkedZone'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/linked_dnszones/{linked_dnszone_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update the properties of a linked zone.
   *
   * Update the properties of a linked zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.linkedDnszoneId - The unique identifier of a linked zone.
   * @param {string} [params.description] - Descriptive text of the linked zone.
   * @param {string} [params.label] - The label of linked zone.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.LinkedDnszone>>}
   */
  public updateLinkedZone(
    params: DnsSvcsV1.UpdateLinkedZoneParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.LinkedDnszone>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'linkedDnszoneId'];
    const _validParams = ['instanceId', 'linkedDnszoneId', 'description', 'label', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'label': _params.label,
    };

    const path = {
      'instance_id': _params.instanceId,
      'linked_dnszone_id': _params.linkedDnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateLinkedZone'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/linked_dnszones/{linked_dnszone_id}',
        method: 'PATCH',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a linked zone.
   *
   * Delete a linked zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.linkedDnszoneId - The unique identifier of a linked zone.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>>}
   */
  public deleteLinkedZone(
    params: DnsSvcsV1.DeleteLinkedZoneParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'linkedDnszoneId'];
    const _validParams = ['instanceId', 'linkedDnszoneId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'linked_dnszone_id': _params.linkedDnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteLinkedZone'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/linked_dnszones/{linked_dnszone_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * accessRequests
   ************************/

  /**
   * List Access Requests.
   *
   * List access requests in owner's instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {number} [params.offset] - Specify how many resources to skip over, the default value is 0.
   * @param {number} [params.limit] - Specify maximum resources might be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.AccessRequestsList>>}
   */
  public listDnszoneAccessRequests(
    params: DnsSvcsV1.ListDnszoneAccessRequestsParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.AccessRequestsList>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId'];
    const _validParams = ['instanceId', 'dnszoneId', 'xCorrelationId', 'offset', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'offset': _params.offset,
      'limit': _params.limit,
    };

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listDnszoneAccessRequests'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/access_requests',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get an access request.
   *
   * Get details of an access request.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} params.requestId - The unique identifier of an access request.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.AccessRequest>>}
   */
  public getDnszoneAccessRequest(
    params: DnsSvcsV1.GetDnszoneAccessRequestParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.AccessRequest>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId', 'requestId'];
    const _validParams = ['instanceId', 'dnszoneId', 'requestId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
      'request_id': _params.requestId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDnszoneAccessRequest'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/access_requests/{request_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update an access request.
   *
   * Update the state of an access request.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.dnszoneId - The unique identifier of a DNS zone.
   * @param {string} params.requestId - The unique identifier of an access request.
   * @param {string} [params.action] - The action applies to the access request.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.AccessRequest>>}
   */
  public updateDnszoneAccessRequest(
    params: DnsSvcsV1.UpdateDnszoneAccessRequestParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.AccessRequest>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'dnszoneId', 'requestId'];
    const _validParams = ['instanceId', 'dnszoneId', 'requestId', 'action', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'action': _params.action,
    };

    const path = {
      'instance_id': _params.instanceId,
      'dnszone_id': _params.dnszoneId,
      'request_id': _params.requestId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateDnszoneAccessRequest'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/dnszones/{dnszone_id}/access_requests/{request_id}',
        method: 'PATCH',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * permittedNetworkForLinkedZone
   ************************/

  /**
   * List permitted networks.
   *
   * List the permitted networks for a linked zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.linkedDnszoneId - The unique identifier of a linked zone.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.ListPermittedNetworks>>}
   */
  public listLinkedPermittedNetworks(
    params: DnsSvcsV1.ListLinkedPermittedNetworksParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.ListPermittedNetworks>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'linkedDnszoneId'];
    const _validParams = ['instanceId', 'linkedDnszoneId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'linked_dnszone_id': _params.linkedDnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listLinkedPermittedNetworks'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/linked_dnszones/{linked_dnszone_id}/permitted_networks',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a permitted network.
   *
   * Create a permitted network for a linked zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.linkedDnszoneId - The unique identifier of a linked zone.
   * @param {string} [params.type] - The type of a permitted network.
   * @param {PermittedNetworkVpc} [params.permittedNetwork] - Permitted network data for VPC.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.PermittedNetwork>>}
   */
  public createLzPermittedNetwork(
    params: DnsSvcsV1.CreateLzPermittedNetworkParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.PermittedNetwork>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'linkedDnszoneId'];
    const _validParams = ['instanceId', 'linkedDnszoneId', 'type', 'permittedNetwork', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'permitted_network': _params.permittedNetwork,
    };

    const path = {
      'instance_id': _params.instanceId,
      'linked_dnszone_id': _params.linkedDnszoneId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createLzPermittedNetwork'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/linked_dnszones/{linked_dnszone_id}/permitted_networks',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Remove a permitted network.
   *
   * Remove a permitted network from a linked zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.linkedDnszoneId - The unique identifier of a linked zone.
   * @param {string} params.permittedNetworkId - The unique identifier of a permitted network.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.PermittedNetwork>>}
   */
  public deleteLzPermittedNetwork(
    params: DnsSvcsV1.DeleteLzPermittedNetworkParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.PermittedNetwork>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'linkedDnszoneId', 'permittedNetworkId'];
    const _validParams = ['instanceId', 'linkedDnszoneId', 'permittedNetworkId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'linked_dnszone_id': _params.linkedDnszoneId,
      'permitted_network_id': _params.permittedNetworkId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteLzPermittedNetwork'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/linked_dnszones/{linked_dnszone_id}/permitted_networks/{permitted_network_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a permitted network.
   *
   * Get a permitted network of a linked zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique identifier of a service instance.
   * @param {string} params.linkedDnszoneId - The unique identifier of a linked zone.
   * @param {string} params.permittedNetworkId - The unique identifier of a permitted network.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DnsSvcsV1.Response<DnsSvcsV1.PermittedNetwork>>}
   */
  public getLinkedPermittedNetwork(
    params: DnsSvcsV1.GetLinkedPermittedNetworkParams
  ): Promise<DnsSvcsV1.Response<DnsSvcsV1.PermittedNetwork>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'linkedDnszoneId', 'permittedNetworkId'];
    const _validParams = ['instanceId', 'linkedDnszoneId', 'permittedNetworkId', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'linked_dnszone_id': _params.linkedDnszoneId,
      'permitted_network_id': _params.permittedNetworkId,
    };

    const sdkHeaders = getSdkHeaders(
      DnsSvcsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getLinkedPermittedNetwork'
    );

    const parameters = {
      options: {
        url: '/instances/{instance_id}/linked_dnszones/{linked_dnszone_id}/permitted_networks/{permitted_network_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
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

namespace DnsSvcsV1 {
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

  /** Parameters for the `listDnszones` operation. */
  export interface ListDnszonesParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    /** Specify how many resources to skip over, the default value is 0. */
    offset?: number;
    /** Specify maximum resources might be returned. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createDnszone` operation. */
  export interface CreateDnszoneParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** Name of DNS zone. */
    name?: string;
    /** The text describing the purpose of a DNS zone. */
    description?: string;
    /** The label of a DNS zone. */
    label?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDnszone` operation. */
  export interface DeleteDnszoneParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDnszone` operation. */
  export interface GetDnszoneParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDnszone` operation. */
  export interface UpdateDnszoneParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** The text describing the purpose of a DNS zone. */
    description?: string;
    /** The label of a DNS zone. */
    label?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listResourceRecords` operation. */
  export interface ListResourceRecordsParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    /** Specify how many resources to skip over, the default value is 0. */
    offset?: number;
    /** Specify maximum resources might be returned. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createResourceRecord` operation. */
  export interface CreateResourceRecordParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** Type of the resource record. */
    type?: CreateResourceRecordConstants.Type | string;
    /** Name of the resource record. */
    name?: string;
    /** Content of the resource record. */
    rdata?: ResourceRecordInputRdata;
    /** Time to live in second. */
    ttl?: number;
    /** Only used for SRV record. */
    service?: string;
    /** Only used for SRV record. */
    protocol?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createResourceRecord` operation. */
  export namespace CreateResourceRecordConstants {
    /** Type of the resource record. */
    export enum Type {
      A = 'A',
      AAAA = 'AAAA',
      CNAME = 'CNAME',
      MX = 'MX',
      SRV = 'SRV',
      TXT = 'TXT',
      PTR = 'PTR',
    }
  }

  /** Parameters for the `deleteResourceRecord` operation. */
  export interface DeleteResourceRecordParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** The unique identifier of a resource record. */
    recordId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getResourceRecord` operation. */
  export interface GetResourceRecordParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** The unique identifier of a resource record. */
    recordId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateResourceRecord` operation. */
  export interface UpdateResourceRecordParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** The unique identifier of a resource record. */
    recordId: string;
    /** Name of the resource record. */
    name?: string;
    /** Content of the resource record. */
    rdata?: ResourceRecordUpdateInputRdata;
    /** Time to live in second. */
    ttl?: number;
    /** Only used for SRV record. */
    service?: string;
    /** Only used for SRV record. */
    protocol?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `exportResourceRecords` operation. */
  export interface ExportResourceRecordsParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `importResourceRecords` operation. */
  export interface ImportResourceRecordsParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** file to upload. */
    file?: NodeJS.ReadableStream | Buffer;
    /** The content type of file. */
    fileContentType?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listPermittedNetworks` operation. */
  export interface ListPermittedNetworksParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createPermittedNetwork` operation. */
  export interface CreatePermittedNetworkParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** The type of a permitted network. */
    type?: CreatePermittedNetworkConstants.Type | string;
    /** Permitted network data for VPC. */
    permittedNetwork?: PermittedNetworkVpc;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createPermittedNetwork` operation. */
  export namespace CreatePermittedNetworkConstants {
    /** The type of a permitted network. */
    export enum Type {
      VPC = 'vpc',
    }
  }

  /** Parameters for the `deletePermittedNetwork` operation. */
  export interface DeletePermittedNetworkParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** The unique identifier of a permitted network. */
    permittedNetworkId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getPermittedNetwork` operation. */
  export interface GetPermittedNetworkParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** The unique identifier of a permitted network. */
    permittedNetworkId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listLoadBalancers` operation. */
  export interface ListLoadBalancersParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    /** Specify how many resources to skip over, the default value is 0. */
    offset?: number;
    /** Specify maximum resources might be returned. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLoadBalancer` operation. */
  export interface CreateLoadBalancerParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** Name of the load balancer. */
    name?: string;
    /** The pool ID to use when all other pools are detected as unhealthy. */
    fallbackPool?: string;
    /** A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when
     *  region_pools are not configured for a given region.
     */
    defaultPools?: string[];
    /** Descriptive text of the load balancer. */
    description?: string;
    /** Whether the load balancer is enabled. */
    enabled?: boolean;
    /** Time to live in second. */
    ttl?: number;
    /** Map availability zones to pool IDs. */
    azPools?: LoadBalancerAzPoolsItem[];
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteLoadBalancer` operation. */
  export interface DeleteLoadBalancerParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** The unique identifier of a load balancer. */
    lbId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLoadBalancer` operation. */
  export interface GetLoadBalancerParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** The unique identifier of a load balancer. */
    lbId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateLoadBalancer` operation. */
  export interface UpdateLoadBalancerParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** The unique identifier of a load balancer. */
    lbId: string;
    /** Name of the load balancer. */
    name?: string;
    /** Descriptive text of the load balancer. */
    description?: string;
    /** Whether the load balancer is enabled. */
    enabled?: boolean;
    /** Time to live in second. */
    ttl?: number;
    /** The pool ID to use when all other pools are detected as unhealthy. */
    fallbackPool?: string;
    /** A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when
     *  region_pools are not configured for a given region.
     */
    defaultPools?: string[];
    /** Map availability zones to pool IDs. */
    azPools?: LoadBalancerAzPoolsItem[];
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listPools` operation. */
  export interface ListPoolsParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    /** Specify how many resources to skip over, the default value is 0. */
    offset?: number;
    /** Specify maximum resources might be returned. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createPool` operation. */
  export interface CreatePoolParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** Name of the load balancer pool. */
    name?: string;
    /** The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy
     *  origins, provided the pool itself is healthy.
     */
    origins?: OriginInput[];
    /** Descriptive text of the load balancer pool. */
    description?: string;
    /** Whether the load balancer pool is enabled. */
    enabled?: boolean;
    /** The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy
     *  origins falls below this number, the pool will be marked unhealthy and we will failover to the next available
     *  pool.
     */
    healthyOriginsThreshold?: number;
    /** The ID of the load balancer monitor to be associated to this pool. */
    monitor?: string;
    /** The notification channel. */
    notificationChannel?: string;
    /** Health check region of VSIs. */
    healthcheckRegion?: CreatePoolConstants.HealthcheckRegion | string;
    /** Health check subnet CRN. */
    healthcheckSubnets?: string[];
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createPool` operation. */
  export namespace CreatePoolConstants {
    /** Health check region of VSIs. */
    export enum HealthcheckRegion {
      US_SOUTH = 'us-south',
      US_EAST = 'us-east',
      EU_GB = 'eu-gb',
      EU_DU = 'eu-du',
      AU_SYD = 'au-syd',
      JP_TOK = 'jp-tok',
    }
  }

  /** Parameters for the `deletePool` operation. */
  export interface DeletePoolParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a load balancer pool. */
    poolId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getPool` operation. */
  export interface GetPoolParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a load balancer pool. */
    poolId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updatePool` operation. */
  export interface UpdatePoolParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a load balancer pool. */
    poolId: string;
    /** Name of the load balancer pool. */
    name?: string;
    /** Descriptive text of the load balancer pool. */
    description?: string;
    /** Whether the load balancer pool is enabled. */
    enabled?: boolean;
    /** The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy
     *  origins falls below this number, the pool will be marked unhealthy and we will failover to the next available
     *  pool.
     */
    healthyOriginsThreshold?: number;
    /** The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy
     *  origins, provided the pool itself is healthy.
     */
    origins?: OriginInput[];
    /** The ID of the load balancer monitor to be associated to this pool. */
    monitor?: string;
    /** The notification channel. */
    notificationChannel?: string;
    /** Health check region of VSIs. */
    healthcheckRegion?: UpdatePoolConstants.HealthcheckRegion | string;
    /** Health check subnet CRNs. */
    healthcheckSubnets?: string[];
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updatePool` operation. */
  export namespace UpdatePoolConstants {
    /** Health check region of VSIs. */
    export enum HealthcheckRegion {
      US_SOUTH = 'us-south',
      US_EAST = 'us-east',
      EU_GB = 'eu-gb',
      EU_DU = 'eu-du',
      AU_SYD = 'au-syd',
      JP_TOK = 'jp-tok',
    }
  }

  /** Parameters for the `listMonitors` operation. */
  export interface ListMonitorsParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    /** Specify how many resources to skip over, the default value is 0. */
    offset?: number;
    /** Specify maximum resources might be returned. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createMonitor` operation. */
  export interface CreateMonitorParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The name of the load balancer monitor. */
    name?: string;
    /** The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS' and 'TCP'. */
    type?: CreateMonitorConstants.Type | string;
    /** Descriptive text of the load balancer monitor. */
    description?: string;
    /** Port number to connect to for the health check. Required for TCP checks. HTTP and HTTPS checks should only
     *  define the port when using a non-standard port (HTTP: default 80, HTTPS: default 443).
     */
    port?: number;
    /** The interval between each health check. Shorter intervals may improve failover time, but will increase load
     *  on the origins as we check from multiple locations.
     */
    interval?: number;
    /** The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are
     *  attempted immediately.
     */
    retries?: number;
    /** The timeout (in seconds) before marking the health check as failed. */
    timeout?: number;
    /** The method to use for the health check applicable to HTTP/HTTPS based checks, the default value is 'GET'. */
    method?: CreateMonitorConstants.Method | string;
    /** The endpoint path to health check against. This parameter is only valid for HTTP and HTTPS monitors. */
    path?: string;
    /** The HTTP request headers to send in the health check. It is recommended you set a Host header by default.
     *  The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.
     */
    _headers?: HealthcheckHeader[];
    /** Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTPS
     *  monitors.
     */
    allowInsecure?: boolean;
    /** The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and
     *  HTTPS monitors.
     */
    expectedCodes?: string;
    /** A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will
     *  be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors.
     */
    expectedBody?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createMonitor` operation. */
  export namespace CreateMonitorConstants {
    /** The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS' and 'TCP'. */
    export enum Type {
      HTTP = 'HTTP',
      HTTPS = 'HTTPS',
      TCP = 'TCP',
    }
    /** The method to use for the health check applicable to HTTP/HTTPS based checks, the default value is 'GET'. */
    export enum Method {
      GET = 'GET',
      HEAD = 'HEAD',
    }
  }

  /** Parameters for the `deleteMonitor` operation. */
  export interface DeleteMonitorParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a load balancer monitor. */
    monitorId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getMonitor` operation. */
  export interface GetMonitorParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a load balancer monitor. */
    monitorId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateMonitor` operation. */
  export interface UpdateMonitorParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a load balancer monitor. */
    monitorId: string;
    /** The name of the load balancer monitor. */
    name?: string;
    /** Descriptive text of the load balancer monitor. */
    description?: string;
    /** The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS' and 'TCP'. */
    type?: UpdateMonitorConstants.Type | string;
    /** Port number to connect to for the health check. Required for TCP checks. HTTP and HTTPS checks should only
     *  define the port when using a non-standard port (HTTP: default 80, HTTPS: default 443).
     */
    port?: number;
    /** The interval between each health check. Shorter intervals may improve failover time, but will increase load
     *  on the origins as we check from multiple locations.
     */
    interval?: number;
    /** The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are
     *  attempted immediately.
     */
    retries?: number;
    /** The timeout (in seconds) before marking the health check as failed. */
    timeout?: number;
    /** The method to use for the health check applicable to HTTP/HTTPS based checks, the default value is 'GET'. */
    method?: UpdateMonitorConstants.Method | string;
    /** The endpoint path to health check against. This parameter is only valid for HTTP and HTTPS monitors. */
    path?: string;
    /** The HTTP request headers to send in the health check. It is recommended you set a Host header by default.
     *  The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.
     */
    _headers?: HealthcheckHeader[];
    /** Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and
     *  HTTPS monitors.
     */
    allowInsecure?: boolean;
    /** The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and
     *  HTTPS monitors.
     */
    expectedCodes?: string;
    /** A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will
     *  be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors.
     */
    expectedBody?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateMonitor` operation. */
  export namespace UpdateMonitorConstants {
    /** The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS' and 'TCP'. */
    export enum Type {
      HTTP = 'HTTP',
      HTTPS = 'HTTPS',
      TCP = 'TCP',
    }
    /** The method to use for the health check applicable to HTTP/HTTPS based checks, the default value is 'GET'. */
    export enum Method {
      GET = 'GET',
      HEAD = 'HEAD',
    }
  }

  /** Parameters for the `listCustomResolvers` operation. */
  export interface ListCustomResolversParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createCustomResolver` operation. */
  export interface CreateCustomResolverParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** Name of the custom resolver. */
    name?: string;
    /** Descriptive text of the custom resolver. */
    description?: string;
    /** Locations on which the custom resolver will be running. */
    locations?: LocationInput[];
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCustomResolver` operation. */
  export interface DeleteCustomResolverParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a custom resolver. */
    resolverId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCustomResolver` operation. */
  export interface GetCustomResolverParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a custom resolver. */
    resolverId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateCustomResolver` operation. */
  export interface UpdateCustomResolverParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a custom resolver. */
    resolverId: string;
    /** Name of the custom resolver. */
    name?: string;
    /** Descriptive text of the custom resolver. */
    description?: string;
    /** Whether the custom resolver is enabled. */
    enabled?: boolean;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateCrLocationsOrder` operation. */
  export interface UpdateCrLocationsOrderParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a custom resolver. */
    resolverId: string;
    /** Array of custom resolver location ID. */
    locations?: string[];
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addCustomResolverLocation` operation. */
  export interface AddCustomResolverLocationParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a custom resolver. */
    resolverId: string;
    /** Custom resolver location, subnet CRN. */
    subnetCrn?: string;
    /** Enable/Disable custom resolver location. */
    enabled?: boolean;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateCustomResolverLocation` operation. */
  export interface UpdateCustomResolverLocationParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a custom resolver. */
    resolverId: string;
    /** Custom resolver location ID. */
    locationId: string;
    /** Enable/Disable custom resolver location. */
    enabled?: boolean;
    /** Subnet CRN. */
    subnetCrn?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCustomResolverLocation` operation. */
  export interface DeleteCustomResolverLocationParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a custom resolver. */
    resolverId: string;
    /** Custom resolver location ID. */
    locationId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listForwardingRules` operation. */
  export interface ListForwardingRulesParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a custom resolver. */
    resolverId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createForwardingRule` operation. */
  export interface CreateForwardingRuleParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a custom resolver. */
    resolverId: string;
    /** Type of the forwarding rule. */
    type?: CreateForwardingRuleConstants.Type | string;
    /** The matching zone or hostname. */
    match?: string;
    /** The upstream DNS servers will be forwarded to. */
    forwardTo?: string[];
    /** Descriptive text of the forwarding rule. */
    description?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createForwardingRule` operation. */
  export namespace CreateForwardingRuleConstants {
    /** Type of the forwarding rule. */
    export enum Type {
      ZONE = 'zone',
    }
  }

  /** Parameters for the `deleteForwardingRule` operation. */
  export interface DeleteForwardingRuleParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a custom resolver. */
    resolverId: string;
    /** The unique identifier of a rule. */
    ruleId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getForwardingRule` operation. */
  export interface GetForwardingRuleParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a custom resolver. */
    resolverId: string;
    /** The unique identifier of a rule. */
    ruleId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateForwardingRule` operation. */
  export interface UpdateForwardingRuleParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a custom resolver. */
    resolverId: string;
    /** The unique identifier of a rule. */
    ruleId: string;
    /** Descriptive text of the forwarding rule. */
    description?: string;
    /** The matching zone or hostname. */
    match?: string;
    /** The upstream DNS servers will be forwarded to. */
    forwardTo?: string[];
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listLinkedZones` operation. */
  export interface ListLinkedZonesParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    /** Specify how many resources to skip over, the default value is 0. */
    offset?: number;
    /** Specify maximum resources might be returned. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLinkedZone` operation. */
  export interface CreateLinkedZoneParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** Owner's instance ID. */
    ownerInstanceId?: string;
    /** Owner's DNS zone ID. */
    ownerZoneId?: string;
    /** Descriptive text of the linked zone. */
    description?: string;
    /** The label of linked zone. */
    label?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLinkedZone` operation. */
  export interface GetLinkedZoneParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a linked zone. */
    linkedDnszoneId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateLinkedZone` operation. */
  export interface UpdateLinkedZoneParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a linked zone. */
    linkedDnszoneId: string;
    /** Descriptive text of the linked zone. */
    description?: string;
    /** The label of linked zone. */
    label?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteLinkedZone` operation. */
  export interface DeleteLinkedZoneParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a linked zone. */
    linkedDnszoneId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDnszoneAccessRequests` operation. */
  export interface ListDnszoneAccessRequestsParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    /** Specify how many resources to skip over, the default value is 0. */
    offset?: number;
    /** Specify maximum resources might be returned. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getDnszoneAccessRequest` operation. */
  export interface GetDnszoneAccessRequestParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** The unique identifier of an access request. */
    requestId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDnszoneAccessRequest` operation. */
  export interface UpdateDnszoneAccessRequestParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a DNS zone. */
    dnszoneId: string;
    /** The unique identifier of an access request. */
    requestId: string;
    /** The action applies to the access request. */
    action?: UpdateDnszoneAccessRequestConstants.Action | string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateDnszoneAccessRequest` operation. */
  export namespace UpdateDnszoneAccessRequestConstants {
    /** The action applies to the access request. */
    export enum Action {
      APPROVE = 'APPROVE',
      REJECT = 'REJECT',
      REVOKE = 'REVOKE',
    }
  }

  /** Parameters for the `listLinkedPermittedNetworks` operation. */
  export interface ListLinkedPermittedNetworksParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a linked zone. */
    linkedDnszoneId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLzPermittedNetwork` operation. */
  export interface CreateLzPermittedNetworkParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a linked zone. */
    linkedDnszoneId: string;
    /** The type of a permitted network. */
    type?: CreateLzPermittedNetworkConstants.Type | string;
    /** Permitted network data for VPC. */
    permittedNetwork?: PermittedNetworkVpc;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createLzPermittedNetwork` operation. */
  export namespace CreateLzPermittedNetworkConstants {
    /** The type of a permitted network. */
    export enum Type {
      VPC = 'vpc',
    }
  }

  /** Parameters for the `deleteLzPermittedNetwork` operation. */
  export interface DeleteLzPermittedNetworkParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a linked zone. */
    linkedDnszoneId: string;
    /** The unique identifier of a permitted network. */
    permittedNetworkId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLinkedPermittedNetwork` operation. */
  export interface GetLinkedPermittedNetworkParams {
    /** The unique identifier of a service instance. */
    instanceId: string;
    /** The unique identifier of a linked zone. */
    linkedDnszoneId: string;
    /** The unique identifier of a permitted network. */
    permittedNetworkId: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** The information of requestor. */
  export interface AccessRequestRequestor {
    /** The account ID of requestor. */
    account_id?: string;
    /** The requestor's DNS service instance ID. */
    instance_id?: string;
    /** The requestor's linked zone ID. */
    linked_zone_id?: string;
  }

  /** The owner's instance and zone that the zone is linked to. */
  export interface LinkedDnszoneLinkedTo {
    /** The owner's instance CRN. */
    instance_crn?: string;
    /** The owner's DNS zone. */
    zone_id?: string;
  }

  /** LoadBalancerAzPoolsItem. */
  export interface LoadBalancerAzPoolsItem {
    /** Availability zone. */
    availability_zone?: string;
    /** List of load balancer pools. */
    pools?: string[];
  }

  /** PoolHealthcheckVsisItem. */
  export interface PoolHealthcheckVsisItem {
    /** Health check VSI subnet CRN. */
    subnet?: string;
    /** healthcheck VSI ip address. */
    ipv4_address?: string;
    /** ipv4 cidr block. */
    ipv4_cidr_block?: string;
    /** vpc crn. */
    vpc?: string;
  }

  /** Error container. */
  export interface RecordsImportErrorModelError {
    /** Internal service error when DNS resource created fails by internal error. */
    code: string;
    /** An internal error occurred. Try again later. */
    message: string;
  }

  /** Content of the resource record. */
  export interface ResourceRecordInputRdata {
  }

  /** Content of the resource record. */
  export interface ResourceRecordUpdateInputRdata {
  }

  /** Access request. */
  export interface AccessRequest {
    /** Access request ID. */
    id: string;
    /** The information of requestor. */
    requestor: AccessRequestRequestor;
    /** The zone ID that requestor requests access for. */
    zone_id: string;
    /** The zone name that requestor requests access for. */
    zone_name: string;
    /** The state of the access request. */
    state: string;
    /** The expired time of access request with state `pending`. */
    pending_expires_at?: string;
    /** The time when the linked zone is created. */
    created_on?: string;
    /** The recent time when the linked zone is modified. */
    modified_on?: string;
  }

  /** The list of access requests. */
  export interface AccessRequestsList {
    /** The list of access requests. */
    access_requests: AccessRequest[];
    /** The number of resources to skip over. */
    offset: number;
    /** The maximum number of resources might be returned. */
    limit: number;
    /** The number of resources are returned. */
    count: number;
    /** Total number of resources. */
    total_count: number;
    /** href. */
    first?: PaginationRef;
    /** href. */
    last?: PaginationRef;
    /** href. */
    previous?: PaginationRef;
    /** href. */
    next?: PaginationRef;
  }

  /** custom resolver details. */
  export interface CustomResolver {
    /** Identifier of the custom resolver. */
    id?: string;
    /** Name of the custom resolver. */
    name?: string;
    /** Descriptive text of the custom resolver. */
    description?: string;
    /** Whether the custom resolver is enabled. */
    enabled?: boolean;
    /** Healthy state of the custom resolver. */
    health?: string;
    /** Locations on which the custom resolver will be running. */
    locations?: Location[];
    /** the time when a custom resolver is created, RFC3339 format. */
    created_on?: string;
    /** the recent time when a custom resolver is modified, RFC3339 format. */
    modified_on?: string;
  }

  /** List custom resolvers response. */
  export interface CustomResolverList {
    /** An array of custom resolvers. */
    custom_resolvers?: CustomResolver[];
  }

  /** DNS zone details. */
  export interface Dnszone {
    /** Unique identifier of a DNS zone. */
    id?: string;
    /** the time when a DNS zone is created. */
    created_on?: string;
    /** the recent time when a DNS zone is modified. */
    modified_on?: string;
    /** Unique identifier of a service instance. */
    instance_id?: string;
    /** Name of DNS zone. */
    name?: string;
    /** The text describing the purpose of a DNS zone. */
    description?: string;
    /** State of DNS zone. */
    state?: string;
    /** The label of a DNS zone. */
    label?: string;
  }

  /** forwarding rule details. */
  export interface ForwardingRule {
    /** Identifier of the forwarding rule. */
    id?: string;
    /** Descriptive text of the forwarding rule. */
    description?: string;
    /** Type of the forwarding rule. */
    type?: string;
    /** The matching zone or hostname. */
    match?: string;
    /** The upstream DNS servers will be forwarded to. */
    forward_to?: string[];
    /** the time when a forwarding rule is created, RFC3339 format. */
    created_on?: string;
    /** the recent time when a forwarding rule is modified, RFC3339 format. */
    modified_on?: string;
  }

  /** List of forwarding rules. */
  export interface ForwardingRuleList {
    /** An array of forwarding rules. */
    forwarding_rules?: ForwardingRule[];
  }

  /** The HTTP header of health check request. */
  export interface HealthcheckHeader {
    /** The name of HTTP request header. */
    name: string;
    /** The value of HTTP request header. */
    value: string[];
  }

  /** Import DNS records response. */
  export interface ImportResourceRecordsResp {
    /** Number of records parsed from the zone file. */
    total_records_parsed: number;
    /** Number of records imported successfully. */
    records_added: number;
    /** Number of records failed import. */
    records_failed: number;
    /** Number of records classified by type. */
    records_added_by_type: RecordStatsByType;
    /** Number of records classified by type. */
    records_failed_by_type: RecordStatsByType;
    /** Error messages. */
    messages?: RecordsImportMessageModel[];
    /** Number of records parsed from the zone file. */
    errors?: RecordsImportErrorModel[];
  }

  /** linked zone details. */
  export interface LinkedDnszone {
    /** Identifier of the linked zone. */
    id: string;
    /** Unique identifier of a service instance. */
    instance_id: string;
    /** Name of owner's DNS zone. */
    name: string;
    /** Descriptive text of the linked zone. */
    description?: string;
    /** The owner's instance and zone that the zone is linked to. */
    linked_to: LinkedDnszoneLinkedTo;
    /** The state of linked zone. */
    state: string;
    /** The label of linked zone. */
    label?: string;
    /** The expired time of linked zone with state `approval pending`. */
    approval_required_before?: string;
    /** The time when the linked zone is created. */
    created_on?: string;
    /** The recent time when the linked zone is modified. */
    modified_on?: string;
  }

  /** The list of linked zones. */
  export interface LinkedDnszonesList {
    /** The list of linked zones. */
    linked_dnszones: LinkedDnszone[];
    /** The number of resources to skip over. */
    offset: number;
    /** The maximum number of resources might be returned. */
    limit: number;
    /** The number of resources are returned. */
    count: number;
    /** Total number of resources. */
    total_count: number;
    /** href. */
    first?: PaginationRef;
    /** href. */
    last?: PaginationRef;
    /** href. */
    previous?: PaginationRef;
    /** href. */
    next?: PaginationRef;
  }

  /** List DNS zones response. */
  export interface ListDnszones {
    /** An array of DNS zones. */
    dnszones: Dnszone[];
    /** The number of resources to skip over. */
    offset: number;
    /** The maximum number of resources might be returned. */
    limit: number;
    /** The number of resources are returned. */
    count: number;
    /** Total number of resources. */
    total_count: number;
    /** href. */
    first: PaginationRef;
    /** href. */
    last: PaginationRef;
    /** href. */
    previous?: PaginationRef;
    /** href. */
    next?: PaginationRef;
  }

  /** List Global Load Balancers response. */
  export interface ListLoadBalancers {
    /** An array of Global Load Balancers. */
    load_balancers: LoadBalancer[];
    /** The number of resources to skip over. */
    offset: number;
    /** The maximum number of resources might be returned. */
    limit: number;
    /** The number of resources are returned. */
    count: number;
    /** Total number of resources. */
    total_count: number;
    /** href. */
    first: PaginationRef;
    /** href. */
    last: PaginationRef;
    /** href. */
    previous?: PaginationRef;
    /** href. */
    next?: PaginationRef;
  }

  /** List load balancer monitors response. */
  export interface ListMonitors {
    /** An array of load balancer monitors. */
    monitors: Monitor[];
    /** The number of resources to skip over. */
    offset: number;
    /** The maximum number of resources might be returned. */
    limit: number;
    /** The number of resources are returned. */
    count: number;
    /** Total number of resources. */
    total_count: number;
    /** href. */
    first: PaginationRef;
    /** href. */
    last: PaginationRef;
    /** href. */
    previous?: PaginationRef;
    /** href. */
    next?: PaginationRef;
  }

  /** List permitted networks response. */
  export interface ListPermittedNetworks {
    /** An array of permitted networks. */
    permitted_networks: PermittedNetwork[];
  }

  /** List load balancer pools response. */
  export interface ListPools {
    /** An array of load balancer pools. */
    pools: Pool[];
    /** The number of resources to skip over. */
    offset: number;
    /** The maximum number of resources might be returned. */
    limit: number;
    /** The number of resources are returned. */
    count: number;
    /** Total number of resources. */
    total_count: number;
    /** href. */
    first: PaginationRef;
    /** href. */
    last: PaginationRef;
    /** href. */
    previous?: PaginationRef;
    /** href. */
    next?: PaginationRef;
  }

  /** List Resource Records response. */
  export interface ListResourceRecords {
    /** An array of resource records. */
    resource_records: ResourceRecord[];
    /** The number of resources to skip over. */
    offset: number;
    /** The maximum number of resources might be returned. */
    limit: number;
    /** The number of resources are returned. */
    count: number;
    /** Total number of resources. */
    total_count: number;
    /** href. */
    first: PaginationRef;
    /** href. */
    last: PaginationRef;
    /** href. */
    previous?: PaginationRef;
    /** href. */
    next?: PaginationRef;
  }

  /** Load balancer details. */
  export interface LoadBalancer {
    /** Identifier of the load balancer. */
    id?: string;
    /** Name of the load balancer. */
    name?: string;
    /** Descriptive text of the load balancer. */
    description?: string;
    /** Whether the load balancer is enabled. */
    enabled?: boolean;
    /** Time to live in second. */
    ttl?: number;
    /** Healthy state of the load balancer. */
    health?: string;
    /** The pool ID to use when all other pools are detected as unhealthy. */
    fallback_pool?: string;
    /** A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when
     *  region_pools are not configured for a given region.
     */
    default_pools?: string[];
    /** Map availability zones to pool IDs. */
    az_pools?: LoadBalancerAzPoolsItem[];
    /** The time when a load balancer is created. */
    created_on?: string;
    /** The recent time when a load balancer is modified. */
    modified_on?: string;
  }

  /** Custom resolver location. */
  export interface Location {
    /** Location ID. */
    id?: string;
    /** Subnet CRN. */
    subnet_crn?: string;
    /** Whether the location is enabled for the custom resolver. */
    enabled?: boolean;
    /** Whether the DNS server in this location is healthy or not. */
    healthy?: boolean;
    /** The ip address of this dns server. */
    dns_server_ip?: string;
  }

  /** Request to add custom resolver location. */
  export interface LocationInput {
    /** Custom resolver location, subnet CRN. */
    subnet_crn: string;
    /** Enable/Disable custom resolver location. */
    enabled?: boolean;
  }

  /** Load balancer monitor details. */
  export interface Monitor {
    /** Identifier of the load balancer monitor. */
    id?: string;
    /** The name of the load balancer monitor. */
    name?: string;
    /** Descriptive text of the load balancer monitor. */
    description?: string;
    /** The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS' and 'TCP'. */
    type?: string;
    /** Port number to connect to for the health check. Required for TCP checks. HTTP and HTTPS checks should only
     *  define the port when using a non-standard port (HTTP: default 80, HTTPS: default 443).
     */
    port?: number;
    /** The interval between each health check. Shorter intervals may improve failover time, but will increase load
     *  on the origins as we check from multiple locations.
     */
    interval?: number;
    /** The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are
     *  attempted immediately.
     */
    retries?: number;
    /** The timeout (in seconds) before marking the health check as failed. */
    timeout?: number;
    /** The method to use for the health check applicable to HTTP/HTTPS based checks, the default value is 'GET'. */
    method?: string;
    /** The endpoint path to health check against. This parameter is only valid for HTTP and HTTPS monitors. */
    path?: string;
    /** The HTTP request headers to send in the health check. It is recommended you set a Host header by default.
     *  The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.
     */
    headers?: HealthcheckHeader[];
    /** Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTPS
     *  monitors.
     */
    allow_insecure?: boolean;
    /** The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and
     *  HTTPS monitors.
     */
    expected_codes?: string;
    /** A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will
     *  be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors.
     */
    expected_body?: string;
    /** the time when a load balancer monitor is created. */
    created_on?: string;
    /** the recent time when a load balancer monitor is modified. */
    modified_on?: string;
  }

  /** Origin server. */
  export interface Origin {
    /** The name of the origin server. */
    name?: string;
    /** Description of the origin server. */
    description?: string;
    /** The address of the origin server. It can be a hostname or an IP address. */
    address?: string;
    /** Whether the origin server is enabled. */
    enabled?: boolean;
    /** The health state of the origin server. */
    health?: boolean;
    /** The failure reason of the origin server if it is unhealthy. */
    health_failure_reason?: string;
  }

  /** The request data of origin server. */
  export interface OriginInput {
    /** The name of the origin server. */
    name?: string;
    /** Description of the origin server. */
    description?: string;
    /** The address of the origin server. It can be a hostname or an IP address. */
    address?: string;
    /** Whether the origin server is enabled. */
    enabled?: boolean;
  }

  /** href. */
  export interface PaginationRef {
    /** href. */
    href?: string;
  }

  /** Permitted network details. */
  export interface PermittedNetwork {
    /** Unique identifier of a permitted network. */
    id?: string;
    /** The time when a permitted network is created. */
    created_on?: string;
    /** The recent time when a permitted network is modified. */
    modified_on?: string;
    /** Permitted network data for VPC. */
    permitted_network?: PermittedNetworkVpc;
    /** The type of a permitted network. */
    type?: string;
    /** The state of a permitted network. */
    state?: string;
  }

  /** Permitted network data for VPC. */
  export interface PermittedNetworkVpc {
    /** CRN string uniquely identifies a VPC. */
    vpc_crn: string;
  }

  /** Load balancer pool details. */
  export interface Pool {
    /** Identifier of the load balancer pool. */
    id?: string;
    /** Name of the load balancer pool. */
    name?: string;
    /** Descriptive text of the load balancer pool. */
    description?: string;
    /** Whether the load balancer pool is enabled. */
    enabled?: boolean;
    /** The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy
     *  origins falls below this number, the pool will be marked unhealthy and we will failover to the next available
     *  pool.
     */
    healthy_origins_threshold?: number;
    /** The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy
     *  origins, provided the pool itself is healthy.
     */
    origins?: Origin[];
    /** The ID of the load balancer monitor to be associated to this pool. */
    monitor?: string;
    /** The notification channel. */
    notification_channel?: string;
    /** Healthy state of the load balancer pool. */
    health?: string;
    /** Health check region of VSIs. */
    healthcheck_region?: string;
    /** Health check subnet CRNs. */
    healthcheck_subnets?: string[];
    /** Health check VSI information. */
    healthcheck_vsis?: PoolHealthcheckVsisItem[];
    /** the time when a load balancer pool is created. */
    created_on?: string;
    /** the recent time when a load balancer pool is modified. */
    modified_on?: string;
  }

  /** Number of records classified by type. */
  export interface RecordStatsByType {
    /** Number of records, type A. */
    A: number;
    /** Number of records, type AAAA. */
    AAAA: number;
    /** Number of records, type CNAME. */
    CNAME: number;
    /** Number of records, type SRV. */
    SRV: number;
    /** Number of records, type TXT. */
    TXT: number;
    /** Number of records, type MX. */
    MX: number;
    /** Number of records, type PTR. */
    PTR: number;
  }

  /** RecordsImportErrorModel. */
  export interface RecordsImportErrorModel {
    /** resource record content in zone file. */
    resource_record: string;
    /** Error container. */
    error: RecordsImportErrorModelError;
  }

  /** RecordsImportMessageModel. */
  export interface RecordsImportMessageModel {
    /** Code to classify import DNS records error. */
    code: string;
    /** Message to describe import DNS records error. */
    message: string;
  }

  /** Resource record details. */
  export interface ResourceRecord {
    /** Identifier of the resource record. */
    id?: string;
    /** the time when a resource record is created. */
    created_on?: string;
    /** the recent time when a resource record is modified. */
    modified_on?: string;
    /** Name of the resource record. */
    name?: string;
    /** Type of the resource record. */
    type?: string;
    /** Time to live in second. */
    ttl?: number;
    /** Content of the resource record. */
    rdata?: JsonObject;
    /** Only used for SRV record. */
    service?: string;
    /** Only used for SRV record. */
    protocol?: string;
  }

  /** The content of type-A resource record. */
  export interface ResourceRecordInputRdataRdataARecord extends ResourceRecordInputRdata {
    /** IPv4 address. */
    ip: string;
  }

  /** The content of type-AAAA resource record. */
  export interface ResourceRecordInputRdataRdataAaaaRecord extends ResourceRecordInputRdata {
    /** IPv6 address. */
    ip: string;
  }

  /** The content of type-CNAME resource record. */
  export interface ResourceRecordInputRdataRdataCnameRecord extends ResourceRecordInputRdata {
    /** Canonical name. */
    cname: string;
  }

  /** The content of type-MX resource record. */
  export interface ResourceRecordInputRdataRdataMxRecord extends ResourceRecordInputRdata {
    /** Hostname of Exchange server. */
    exchange: string;
    /** Preference of the MX record. */
    preference: number;
  }

  /** The content of type-PTR resource record. */
  export interface ResourceRecordInputRdataRdataPtrRecord extends ResourceRecordInputRdata {
    /** Hostname of the relevant A or AAAA record. */
    ptrdname: string;
  }

  /** The content of type-SRV resource record. */
  export interface ResourceRecordInputRdataRdataSrvRecord extends ResourceRecordInputRdata {
    /** Port number of the target server. */
    port: number;
    /** Priority of the SRV record. */
    priority: number;
    /** Hostname of the target server. */
    target: string;
    /** Weight of distributing queries among multiple target servers. */
    weight: number;
  }

  /** The content of type-TXT resource record. */
  export interface ResourceRecordInputRdataRdataTxtRecord extends ResourceRecordInputRdata {
    /** Human readable text. */
    text: string;
  }

  /** The content of type-A resource record. */
  export interface ResourceRecordUpdateInputRdataRdataARecord extends ResourceRecordUpdateInputRdata {
    /** IPv4 address. */
    ip: string;
  }

  /** The content of type-AAAA resource record. */
  export interface ResourceRecordUpdateInputRdataRdataAaaaRecord extends ResourceRecordUpdateInputRdata {
    /** IPv6 address. */
    ip: string;
  }

  /** The content of type-CNAME resource record. */
  export interface ResourceRecordUpdateInputRdataRdataCnameRecord extends ResourceRecordUpdateInputRdata {
    /** Canonical name. */
    cname: string;
  }

  /** The content of type-MX resource record. */
  export interface ResourceRecordUpdateInputRdataRdataMxRecord extends ResourceRecordUpdateInputRdata {
    /** Hostname of Exchange server. */
    exchange: string;
    /** Preference of the MX record. */
    preference: number;
  }

  /** The content of type-PTR resource record. */
  export interface ResourceRecordUpdateInputRdataRdataPtrRecord extends ResourceRecordUpdateInputRdata {
    /** Hostname of the relevant A or AAAA record. */
    ptrdname: string;
  }

  /** The content of type-SRV resource record. */
  export interface ResourceRecordUpdateInputRdataRdataSrvRecord extends ResourceRecordUpdateInputRdata {
    /** Port number of the target server. */
    port: number;
    /** Priority of the SRV record. */
    priority: number;
    /** Hostname of the target server. */
    target: string;
    /** Weight of distributing queries among multiple target servers. */
    weight: number;
  }

  /** The content of type-TXT resource record. */
  export interface ResourceRecordUpdateInputRdataRdataTxtRecord extends ResourceRecordUpdateInputRdata {
    /** Human readable text. */
    text: string;
  }
}

export = DnsSvcsV1;
