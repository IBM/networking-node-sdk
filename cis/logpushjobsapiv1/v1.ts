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
 * IBM OpenAPI SDK Code Generator Version: 3.48.0-e80b60a1-20220414-145125
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
import { getSdkHeaders } from '../../lib/common';

/**
 * CIS Loupush Jobs
 *
 * API Version: 1.0.0
 */

class LogpushJobsApiV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'logpush_jobs_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of LogpushJobsApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {LogpushJobsApiV1}
   */

  public static newInstance(options: UserOptions): LogpushJobsApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new LogpushJobsApiV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /** Full url-encoded CRN of the service instance. */
  crn: string;

  /** The domain id. */
  zoneId: string;

  /** The dataset. */
  dataset: string;

  /**
   * Construct a LogpushJobsApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded CRN of the service instance.
   * @param {string} options.zoneId - The domain id.
   * @param {string} options.dataset - The dataset.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {LogpushJobsApiV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const _requiredParams = ['crn','zoneId','dataset'];
    const _validationErrors = validateParams(options, _requiredParams, null);
    if (_validationErrors) {
      throw _validationErrors;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(LogpushJobsApiV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneId = options.zoneId;
    this.dataset = options.dataset;
  }

  /*************************
   * logpushJobs
   ************************/

  /**
   * List logpush jobs.
   *
   * List configured logpush jobs for your domain.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.ListLogpushJobsResp>>}
   */
  public getLogpushJobs(
    params?: LogpushJobsApiV1.GetLogpushJobsParams
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.ListLogpushJobsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getLogpushJobs'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/logpush/jobs',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a logpush jobs.
   *
   * Create a new logpush job for the domain.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.destinationConf] - Uniquely identifies a resource (such as an s3 bucket) where data will be
   * pushed.
   * @param {string} [params.ownershipChallenge] - Ownership challenge token to prove destination ownership.
   * @param {string} [params.name] - Logpush Job Name.
   * @param {boolean} [params.enabled] - Whether the logpush job enabled or not.
   * @param {string} [params.logpullOptions] - Configuration string.
   * @param {string} [params.dataset] - Dataset to be pulled.
   * @param {string} [params.frequency] - The frequency at which CIS sends batches of logs to your destination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>>}
   */
  public createLogpushJob(
    params?: LogpushJobsApiV1.CreateLogpushJobParams
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['destinationConf', 'ownershipChallenge', 'name', 'enabled', 'logpullOptions', 'dataset', 'frequency', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'destination_conf': _params.destinationConf,
      'ownership_challenge': _params.ownershipChallenge,
      'name': _params.name,
      'enabled': _params.enabled,
      'logpull_options': _params.logpullOptions,
      'dataset': _params.dataset,
      'frequency': _params.frequency,
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createLogpushJob'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/logpush/jobs',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a logpush job.
   *
   * Get a logpush job  for a given zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {number} params.jobId - logpush job identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>>}
   */
  public getLogpushJob(
    params: LogpushJobsApiV1.GetLogpushJobParams
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>> {
    const _params = { ...params };
    const _requiredParams = ['jobId'];
    const _validParams = ['jobId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'job_id': _params.jobId,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getLogpushJob'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/logpush/jobs/{job_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a logpush job.
   *
   * Update an existing logpush job for a given zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {number} params.jobId - logpush job identifier.
   * @param {boolean} [params.enabled] - Whether the logpush job enabled or not.
   * @param {string} [params.logpullOptions] - Configuration string.
   * @param {string} [params.destinationConf] - Uniquely identifies a resource (such as an s3 bucket) where data will be
   * pushed.
   * @param {string} [params.ownershipChallenge] - Ownership challenge token to prove destination ownership.
   * @param {string} [params.frequency] - The frequency at which CIS sends batches of logs to your destination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>>}
   */
  public updateLogpushJob(
    params: LogpushJobsApiV1.UpdateLogpushJobParams
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>> {
    const _params = { ...params };
    const _requiredParams = ['jobId'];
    const _validParams = ['jobId', 'enabled', 'logpullOptions', 'destinationConf', 'ownershipChallenge', 'frequency', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'enabled': _params.enabled,
      'logpull_options': _params.logpullOptions,
      'destination_conf': _params.destinationConf,
      'ownership_challenge': _params.ownershipChallenge,
      'frequency': _params.frequency,
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'job_id': _params.jobId,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateLogpushJob'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/logpush/jobs/{job_id}',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a logpush job.
   *
   * Delete a logpush job for a zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {number} params.jobId - logpush job identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.DeleteLogpushJobResp>>}
   */
  public deleteLogpushJob(
    params: LogpushJobsApiV1.DeleteLogpushJobParams
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.DeleteLogpushJobResp>> {
    const _params = { ...params };
    const _requiredParams = ['jobId'];
    const _validParams = ['jobId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'job_id': _params.jobId,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteLogpushJob'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/logpush/jobs/{job_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List all fields available for a dataset.
   *
   * The list of all fields available for a given dataset.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.ListFieldsResp>>}
   */
  public listFieldsForDataset(
    params?: LogpushJobsApiV1.ListFieldsForDatasetParams
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.ListFieldsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'dataset': this.dataset,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listFieldsForDataset'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/logpush/datasets/{dataset}/fields',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List logpush jobs for a dataset.
   *
   * List configured logpush jobs for a dataset.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>>}
   */
  public listLogpushJobsForDataset(
    params?: LogpushJobsApiV1.ListLogpushJobsForDatasetParams
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'dataset': this.dataset,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listLogpushJobsForDataset'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/logpush/datasets/{dataset}/jobs',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a new ownership challenge sent to your destination.
   *
   * Get a new ownership challenge.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.destinationConf] - Uniquely identifies a resource (such as an s3 bucket) where data will be
   * pushed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.OwnershipChallengeResp>>}
   */
  public getLogpushOwnership(
    params?: LogpushJobsApiV1.GetLogpushOwnershipParams
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.OwnershipChallengeResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['destinationConf', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'destination_conf': _params.destinationConf,
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getLogpushOwnership'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/logpush/ownership',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Validate ownership challenge of the destination.
   *
   * Validate ownership challenge of the destination.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.destinationConf] - Uniquely identifies a resource (such as an s3 bucket) where data will be
   * pushed.
   * @param {string} [params.ownershipChallenge] - Ownership challenge token to prove destination ownership.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.OwnershipChallengeValidateResult>>}
   */
  public validateLogpushOwnershipChallenge(
    params?: LogpushJobsApiV1.ValidateLogpushOwnershipChallengeParams
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.OwnershipChallengeValidateResult>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['destinationConf', 'ownershipChallenge', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'destination_conf': _params.destinationConf,
      'ownership_challenge': _params.ownershipChallenge,
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'validateLogpushOwnershipChallenge'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/logpush/ownership/validate',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List logpush jobs.
   *
   * List configured logpush jobs for your domain.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.ListLogpushJobsResp>>}
   */
  public getLogpushJobsV2(
    params?: LogpushJobsApiV1.GetLogpushJobsV2Params
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.ListLogpushJobsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getLogpushJobsV2'
    );

    const parameters = {
      options: {
        url: '/v2/{crn}/zones/{zone_id}/logpush/jobs',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a logpush jobs.
   *
   * Create a new logpush job for the domain.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {CreateLogpushJobV2Request} [params.createLogpushJobV2Request] - Create logpush job body.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>>}
   */
  public createLogpushJobV2(
    params?: LogpushJobsApiV1.CreateLogpushJobV2Params
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['createLogpushJobV2Request', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.createLogpushJobV2Request;
    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createLogpushJobV2'
    );

    const parameters = {
      options: {
        url: '/v2/{crn}/zones/{zone_id}/logpush/jobs',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a logpush job.
   *
   * Get a logpush job  for a given zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {number} params.jobId - logpush job identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>>}
   */
  public getLogpushJobV2(
    params: LogpushJobsApiV1.GetLogpushJobV2Params
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>> {
    const _params = { ...params };
    const _requiredParams = ['jobId'];
    const _validParams = ['jobId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'job_id': _params.jobId,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getLogpushJobV2'
    );

    const parameters = {
      options: {
        url: '/v2/{crn}/zones/{zone_id}/logpush/jobs/{job_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a logpush job.
   *
   * Update an existing logpush job for a given zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {number} params.jobId - logpush job identifier.
   * @param {UpdateLogpushJobV2Request} [params.updateLogpushJobV2Request] - Update logpush job.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>>}
   */
  public updateLogpushJobV2(
    params: LogpushJobsApiV1.UpdateLogpushJobV2Params
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>> {
    const _params = { ...params };
    const _requiredParams = ['jobId'];
    const _validParams = ['jobId', 'updateLogpushJobV2Request', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.updateLogpushJobV2Request;
    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'job_id': _params.jobId,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateLogpushJobV2'
    );

    const parameters = {
      options: {
        url: '/v2/{crn}/zones/{zone_id}/logpush/jobs/{job_id}',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a logpush job.
   *
   * Delete a logpush job for a zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {number} params.jobId - logpush job identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.DeleteLogpushJobResp>>}
   */
  public deleteLogpushJobV2(
    params: LogpushJobsApiV1.DeleteLogpushJobV2Params
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.DeleteLogpushJobResp>> {
    const _params = { ...params };
    const _requiredParams = ['jobId'];
    const _validParams = ['jobId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'job_id': _params.jobId,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteLogpushJobV2'
    );

    const parameters = {
      options: {
        url: '/v2/{crn}/zones/{zone_id}/logpush/jobs/{job_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a new ownership challenge sent to your destination.
   *
   * Get a new ownership challenge.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {JsonObject} [params.cos] - Information to identify the COS bucket where the data will be pushed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.OwnershipChallengeResp>>}
   */
  public getLogpushOwnershipV2(
    params?: LogpushJobsApiV1.GetLogpushOwnershipV2Params
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.OwnershipChallengeResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['cos', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'cos': _params.cos,
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getLogpushOwnershipV2'
    );

    const parameters = {
      options: {
        url: '/v2/{crn}/zones/{zone_id}/logpush/ownership',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Validate ownership challenge of the destination.
   *
   * Validate ownership challenge of the destination.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {JsonObject} [params.cos] - Information to identify the COS bucket where the data will be pushed.
   * @param {string} [params.ownershipChallenge] - Ownership challenge token to prove destination ownership.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.OwnershipChallengeValidateResult>>}
   */
  public validateLogpushOwnershipChallengeV2(
    params?: LogpushJobsApiV1.ValidateLogpushOwnershipChallengeV2Params
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.OwnershipChallengeValidateResult>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['cos', 'ownershipChallenge', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'cos': _params.cos,
      'ownership_challenge': _params.ownershipChallenge,
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'validateLogpushOwnershipChallengeV2'
    );

    const parameters = {
      options: {
        url: '/v2/{crn}/zones/{zone_id}/logpush/ownership/validate',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * The list of all fields available for a dataset.
   *
   * The list of all fields available for a dataset.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.ListFieldsResp>>}
   */
  public listFieldsForDatasetV2(
    params?: LogpushJobsApiV1.ListFieldsForDatasetV2Params
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.ListFieldsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'dataset': this.dataset,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listFieldsForDatasetV2'
    );

    const parameters = {
      options: {
        url: '/v2/{crn}/zones/{zone_id}/logpush/datasets/{dataset}/fields',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List logpush jobs for dataset.
   *
   * List configured logpush jobs for a dataset.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>>}
   */
  public listLogpushJobsForDatasetV2(
    params?: LogpushJobsApiV1.ListLogpushJobsForDatasetV2Params
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'dataset': this.dataset,
    };

    const sdkHeaders = getSdkHeaders(
      LogpushJobsApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listLogpushJobsForDatasetV2'
    );

    const parameters = {
      options: {
        url: '/v2/{crn}/zones/{zone_id}/logpush/datasets/{dataset}/jobs',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
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

namespace LogpushJobsApiV1 {
  /** Options for the `LogpushJobsApiV1` constructor. */
  export interface Options extends UserOptions {
    /** Full url-encoded CRN of the service instance. */
    crn: string;
    /** The domain id. */
    zoneId: string;
    /** The dataset. */
    dataset: string;
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
  export interface Empty {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `getLogpushJobs` operation. */
  export interface GetLogpushJobsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLogpushJob` operation. */
  export interface CreateLogpushJobParams {
    /** Uniquely identifies a resource (such as an s3 bucket) where data will be pushed. */
    destinationConf?: string;
    /** Ownership challenge token to prove destination ownership. */
    ownershipChallenge?: string;
    /** Logpush Job Name. */
    name?: string;
    /** Whether the logpush job enabled or not. */
    enabled?: boolean;
    /** Configuration string. */
    logpullOptions?: string;
    /** Dataset to be pulled. */
    dataset?: CreateLogpushJobConstants.Dataset | string;
    /** The frequency at which CIS sends batches of logs to your destination. */
    frequency?: CreateLogpushJobConstants.Frequency | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createLogpushJob` operation. */
  export namespace CreateLogpushJobConstants {
    /** Dataset to be pulled. */
    export enum Dataset {
      HTTP_REQUESTS = 'http_requests',
      RANGE_EVENTS = 'range_events',
      FIREWALL_EVENTS = 'firewall_events',
    }
    /** The frequency at which CIS sends batches of logs to your destination. */
    export enum Frequency {
      HIGH = 'high',
      LOW = 'low',
    }
  }

  /** Parameters for the `getLogpushJob` operation. */
  export interface GetLogpushJobParams {
    /** logpush job identifier. */
    jobId: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateLogpushJob` operation. */
  export interface UpdateLogpushJobParams {
    /** logpush job identifier. */
    jobId: number;
    /** Whether the logpush job enabled or not. */
    enabled?: boolean;
    /** Configuration string. */
    logpullOptions?: string;
    /** Uniquely identifies a resource (such as an s3 bucket) where data will be pushed. */
    destinationConf?: string;
    /** Ownership challenge token to prove destination ownership. */
    ownershipChallenge?: string;
    /** The frequency at which CIS sends batches of logs to your destination. */
    frequency?: UpdateLogpushJobConstants.Frequency | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateLogpushJob` operation. */
  export namespace UpdateLogpushJobConstants {
    /** The frequency at which CIS sends batches of logs to your destination. */
    export enum Frequency {
      HIGH = 'high',
      LOW = 'low',
    }
  }

  /** Parameters for the `deleteLogpushJob` operation. */
  export interface DeleteLogpushJobParams {
    /** logpush job identifier. */
    jobId: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listFieldsForDataset` operation. */
  export interface ListFieldsForDatasetParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listFieldsForDataset` operation. */
  export namespace ListFieldsForDatasetConstants {
  }

  /** Parameters for the `listLogpushJobsForDataset` operation. */
  export interface ListLogpushJobsForDatasetParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listLogpushJobsForDataset` operation. */
  export namespace ListLogpushJobsForDatasetConstants {
  }

  /** Parameters for the `getLogpushOwnership` operation. */
  export interface GetLogpushOwnershipParams {
    /** Uniquely identifies a resource (such as an s3 bucket) where data will be pushed. */
    destinationConf?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `validateLogpushOwnershipChallenge` operation. */
  export interface ValidateLogpushOwnershipChallengeParams {
    /** Uniquely identifies a resource (such as an s3 bucket) where data will be pushed. */
    destinationConf?: string;
    /** Ownership challenge token to prove destination ownership. */
    ownershipChallenge?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLogpushJobsV2` operation. */
  export interface GetLogpushJobsV2Params {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLogpushJobV2` operation. */
  export interface CreateLogpushJobV2Params {
    /** Create logpush job body. */
    createLogpushJobV2Request?: CreateLogpushJobV2Request;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLogpushJobV2` operation. */
  export interface GetLogpushJobV2Params {
    /** logpush job identifier. */
    jobId: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateLogpushJobV2` operation. */
  export interface UpdateLogpushJobV2Params {
    /** logpush job identifier. */
    jobId: number;
    /** Update logpush job. */
    updateLogpushJobV2Request?: UpdateLogpushJobV2Request;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteLogpushJobV2` operation. */
  export interface DeleteLogpushJobV2Params {
    /** logpush job identifier. */
    jobId: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLogpushOwnershipV2` operation. */
  export interface GetLogpushOwnershipV2Params {
    /** Information to identify the COS bucket where the data will be pushed. */
    cos?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `validateLogpushOwnershipChallengeV2` operation. */
  export interface ValidateLogpushOwnershipChallengeV2Params {
    /** Information to identify the COS bucket where the data will be pushed. */
    cos?: JsonObject;
    /** Ownership challenge token to prove destination ownership. */
    ownershipChallenge?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listFieldsForDatasetV2` operation. */
  export interface ListFieldsForDatasetV2Params {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listLogpushJobsForDatasetV2` operation. */
  export interface ListLogpushJobsForDatasetV2Params {
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** CreateLogpushJobV2Request. */
  export interface CreateLogpushJobV2Request {
  }

  /** UpdateLogpushJobV2Request. */
  export interface UpdateLogpushJobV2Request {
  }

  /** delete logpush job response. */
  export interface DeleteLogpushJobResp {
    /** success respose. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: JsonObject;
  }

  /** list fields response. */
  export interface ListFieldsResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result?: JsonObject;
  }

  /** List Logpush Jobs Response. */
  export interface ListLogpushJobsResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: LogpushJobPack[];
  }

  /** logpush job pack. */
  export interface LogpushJobPack {
    /** Logpush Job ID. */
    id: number;
    /** Logpush Job Name. */
    name: string;
    /** Whether the logpush job enabled or not. */
    enabled: boolean;
    /** Dataset to be pulled. */
    dataset: string;
    /** The frequency at which CIS sends batches of logs to your destination. */
    frequency: string;
    /** Configuration string. */
    logpull_options: string;
    /** Uniquely identifies a resource (such as an s3 bucket) where data will be pushed. */
    destination_conf: string;
    /** Records the last time for which logs have been successfully pushed. */
    last_complete: string;
    /** Records the last time the job failed. */
    last_error: string;
    /** The last failure. */
    error_message: string;
  }

  /** logpush job response. */
  export interface LogpushJobsResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** logpush job pack. */
    result: LogpushJobPack;
  }

  /** Get Logpush Ownership Challenge Response. */
  export interface OwnershipChallengeResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** ownership challenge result. */
    result: OwnershipChallengeResult;
  }

  /** ownership challenge result. */
  export interface OwnershipChallengeResult {
    /** file name. */
    filename: string;
    /** valid. */
    valid: boolean;
    /** message. */
    messages?: string;
  }

  /** ownership challenge validate result. */
  export interface OwnershipChallengeValidateResult {
    /** valid. */
    valid: boolean;
  }

  /** Create COS logpush job input. */
  export interface CreateLogpushJobV2RequestLogpushJobCosReq extends CreateLogpushJobV2Request {
    /** Logpush Job Name. */
    name?: string;
    /** Whether the logpush job enabled or not. */
    enabled?: boolean;
    /** Configuration string. */
    logpull_options?: string;
    /** Information to identify the COS bucket where the data will be pushed. */
    cos: JsonObject;
    /** Ownership challenge token to prove destination ownership. */
    ownership_challenge: string;
    /** Dataset to be pulled. */
    dataset?: string;
    /** The frequency at which CIS sends batches of logs to your destination. */
    frequency?: string;
  }

  /** Create LogDNA logpush job input. */
  export interface CreateLogpushJobV2RequestLogpushJobLogdnaReq extends CreateLogpushJobV2Request {
    /** Logpush Job Name. */
    name?: string;
    /** Whether the logpush job enabled or not. */
    enabled?: boolean;
    /** Configuration string. */
    logpull_options?: string;
    /** Information to identify the LogDNA instance the data will be pushed. */
    logdna: JsonObject;
    /** Dataset to be pulled. */
    dataset?: string;
    /** The frequency at which CIS sends batches of logs to your destination. */
    frequency?: string;
  }

  /** Update COS logpush job input. */
  export interface UpdateLogpushJobV2RequestLogpushJobsUpdateCosReq extends UpdateLogpushJobV2Request {
    /** Whether the logpush job enabled or not. */
    enabled?: boolean;
    /** Configuration string. */
    logpull_options?: string;
    /** Information to identify the COS bucket where the data will be pushed. */
    cos?: JsonObject;
    /** Ownership challenge token to prove destination ownership. */
    ownership_challenge?: string;
    /** The frequency at which CIS sends batches of logs to your destination. */
    frequency?: string;
  }

  /** Update LogDNA logpush job input. */
  export interface UpdateLogpushJobV2RequestLogpushJobsUpdateLogdnaReq extends UpdateLogpushJobV2Request {
    /** Whether the logpush job enabled or not. */
    enabled?: boolean;
    /** Configuration string. */
    logpull_options?: string;
    /** Information to identify the LogDNA instance the data will be pushed. */
    logdna?: JsonObject;
    /** The frequency at which CIS sends batches of logs to your destination. */
    frequency?: string;
  }
}

export = LogpushJobsApiV1;
