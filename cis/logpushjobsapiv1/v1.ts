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
 * CIS Logpush Jobs
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
   * @param {string} [options.serviceUrl] - The base URL for the service
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

  /** Full URL-encoded CRN of the service instance. */
  crn: string;

  /** The dataset. */
  dataset: string;

  /** Zone identifier. */
  zoneId: string;

  /**
   * Construct a LogpushJobsApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full URL-encoded CRN of the service instance.
   * @param {string} options.dataset - The dataset.
   * @param {string} options.zoneId - Zone identifier.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {LogpushJobsApiV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const _requiredParams = ['crn','dataset','zoneId'];
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
    this.dataset = options.dataset;
    this.zoneId = options.zoneId;
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
  public getLogpushJobsV2(
    params?: LogpushJobsApiV1.GetLogpushJobsV2Params
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.ListLogpushJobsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
    };

    const sdkHeaders = getSdkHeaders(LogpushJobsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getLogpushJobsV2');

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
    const _validParams = ['createLogpushJobV2Request', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.createLogpushJobV2Request;
    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
    };

    const sdkHeaders = getSdkHeaders(LogpushJobsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'createLogpushJobV2');

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
   * Get a logpush job.
   *
   * Get a logpush job  for a given zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.jobId - logpush job identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>>}
   */
  public getLogpushJobV2(
    params: LogpushJobsApiV1.GetLogpushJobV2Params
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>> {
    const _params = { ...params };
    const _requiredParams = ['jobId'];
    const _validParams = ['jobId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'job_id': _params.jobId,
    };

    const sdkHeaders = getSdkHeaders(LogpushJobsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getLogpushJobV2');

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
   * Update a logpush job.
   *
   * Update an existing logpush job for a given zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.jobId - logpush job identifier.
   * @param {UpdateLogpushJobV2Request} [params.updateLogpushJobV2Request] - Update logpush job.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>>}
   */
  public updateLogpushJobV2(
    params: LogpushJobsApiV1.UpdateLogpushJobV2Params
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogpushJobsResp>> {
    const _params = { ...params };
    const _requiredParams = ['jobId'];
    const _validParams = ['jobId', 'updateLogpushJobV2Request', 'signal', 'headers'];
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

    const sdkHeaders = getSdkHeaders(LogpushJobsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateLogpushJobV2');

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
   * Delete a logpush job.
   *
   * Delete a logpush job for a zone.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.jobId - logpush job identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.DeleteLogpushJobResp>>}
   */
  public deleteLogpushJobV2(
    params: LogpushJobsApiV1.DeleteLogpushJobV2Params
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.DeleteLogpushJobResp>> {
    const _params = { ...params };
    const _requiredParams = ['jobId'];
    const _validParams = ['jobId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'job_id': _params.jobId,
    };

    const sdkHeaders = getSdkHeaders(LogpushJobsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteLogpushJobV2');

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
    const _validParams = ['cos', 'signal', 'headers'];
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

    const sdkHeaders = getSdkHeaders(LogpushJobsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getLogpushOwnershipV2');

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
    const _validParams = ['cos', 'ownershipChallenge', 'signal', 'headers'];
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

    const sdkHeaders = getSdkHeaders(LogpushJobsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'validateLogpushOwnershipChallengeV2');

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
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'dataset': this.dataset,
    };

    const sdkHeaders = getSdkHeaders(LogpushJobsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listFieldsForDatasetV2');

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
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
      'dataset': this.dataset,
    };

    const sdkHeaders = getSdkHeaders(LogpushJobsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listLogpushJobsForDatasetV2');

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
   * Get log retention.
   *
   * Get log retention setting for Logpull/Logpush on your domain.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogRetentionResp>>}
   */
  public getLogsRetention(
    params?: LogpushJobsApiV1.GetLogsRetentionParams
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogRetentionResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
    };

    const sdkHeaders = getSdkHeaders(LogpushJobsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getLogsRetention');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/logs/retention',
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
   * Update log retention.
   *
   * Update log retention flag for Logpull/Logpush.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.flag] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogRetentionResp>>}
   */
  public createLogRetention(
    params?: LogpushJobsApiV1.CreateLogRetentionParams
  ): Promise<LogpushJobsApiV1.Response<LogpushJobsApiV1.LogRetentionResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['flag', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'flag': _params.flag,
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId,
    };

    const sdkHeaders = getSdkHeaders(LogpushJobsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'createLogRetention');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/logs/retention',
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

namespace LogpushJobsApiV1 {
  /** Options for the `LogpushJobsApiV1` constructor. */
  export interface Options extends UserOptions {
    /** Full URL-encoded CRN of the service instance. */
    crn: string;
    /** The dataset. */
    dataset: string;
    /** Zone identifier. */
    zoneId: string;
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

  /** Parameters for the `getLogpushJobsV2` operation. */
  export interface GetLogpushJobsV2Params extends DefaultParams {
  }

  /** Parameters for the `createLogpushJobV2` operation. */
  export interface CreateLogpushJobV2Params extends DefaultParams {
    /** Create logpush job body. */
    createLogpushJobV2Request?: CreateLogpushJobV2Request;
  }

  /** Parameters for the `getLogpushJobV2` operation. */
  export interface GetLogpushJobV2Params extends DefaultParams {
    /** logpush job identifier. */
    jobId: string;
  }

  /** Parameters for the `updateLogpushJobV2` operation. */
  export interface UpdateLogpushJobV2Params extends DefaultParams {
    /** logpush job identifier. */
    jobId: string;
    /** Update logpush job. */
    updateLogpushJobV2Request?: UpdateLogpushJobV2Request;
  }

  /** Parameters for the `deleteLogpushJobV2` operation. */
  export interface DeleteLogpushJobV2Params extends DefaultParams {
    /** logpush job identifier. */
    jobId: string;
  }

  /** Parameters for the `getLogpushOwnershipV2` operation. */
  export interface GetLogpushOwnershipV2Params extends DefaultParams {
    /** Information to identify the COS bucket where the data will be pushed. */
    cos?: JsonObject;
  }

  /** Parameters for the `validateLogpushOwnershipChallengeV2` operation. */
  export interface ValidateLogpushOwnershipChallengeV2Params extends DefaultParams {
    /** Information to identify the COS bucket where the data will be pushed. */
    cos?: JsonObject;
    /** Ownership challenge token to prove destination ownership. */
    ownershipChallenge?: string;
  }

  /** Parameters for the `listFieldsForDatasetV2` operation. */
  export interface ListFieldsForDatasetV2Params extends DefaultParams {
  }

  /** Parameters for the `listLogpushJobsForDatasetV2` operation. */
  export interface ListLogpushJobsForDatasetV2Params extends DefaultParams {
  }

  /** Parameters for the `getLogsRetention` operation. */
  export interface GetLogsRetentionParams extends DefaultParams {
  }

  /** Parameters for the `createLogRetention` operation. */
  export interface CreateLogRetentionParams extends DefaultParams {
    flag?: boolean;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * CreateLogpushJobV2Request.
   */
  export interface CreateLogpushJobV2Request {
  }

  /**
   * LogRetentionRespResult.
   */
  export interface LogRetentionRespResult {
    flag?: boolean;
  }

  /**
   * Required information to push logs to your Cloud Logs instance.
   */
  export interface LogpushJobIbmclReqIbmcl {
    /** GUID of the IBM Cloud Logs instance where you want to send logs. */
    instance_id: string;
    /** Region where the IBM Cloud Logs instance is located. */
    region: string;
    /** IBM Cloud API key used to generate a token for pushing to your Cloud Logs instance. */
    api_key: string;
  }

  /**
   * Required information to push logs to your Cloud Logs instance.
   */
  export interface LogpushJobsUpdateIbmclReqIbmcl {
    /** GUID of the IBM Cloud Logs instance where you want to send logs. */
    instance_id?: string;
    /** Region where the IBM Cloud Logs instance is located. */
    region?: string;
    /** IBM Cloud API key used to generate a token for pushing to your Cloud Logs instance. */
    api_key?: string;
  }

  /**
   * UpdateLogpushJobV2Request.
   */
  export interface UpdateLogpushJobV2Request {
  }

  /**
   * delete logpush job response.
   */
  export interface DeleteLogpushJobResp {
    /** success response. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: string[][];
    /** result. */
    result: JsonObject;
  }

  /**
   * list fields response.
   */
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

  /**
   * List Logpush Jobs Response.
   */
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

  /**
   * log retention result.
   */
  export interface LogRetentionResp {
    result?: LogRetentionRespResult;
    /** success response. */
    success?: boolean;
    /** errors. */
    errors?: string[][];
    /** messages. */
    messages?: string[][];
  }

  /**
   * logpush job pack.
   */
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
    last_complete?: string;
    /** Records the last time the job failed. */
    last_error?: string;
    /** The last failure. */
    error_message?: string;
  }

  /**
   * logpush job response.
   */
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

  /**
   * Get Logpush Ownership Challenge Response.
   */
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

  /**
   * ownership challenge result.
   */
  export interface OwnershipChallengeResult {
    /** file name. */
    filename: string;
    /** valid. */
    valid: boolean;
    /** message. */
    messages?: string;
  }

  /**
   * ownership challenge validate result.
   */
  export interface OwnershipChallengeValidateResult {
    /** valid. */
    valid: boolean;
  }

  /**
   * Create COS logpush job input.
   */
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
    dataset?: CreateLogpushJobV2RequestLogpushJobCosReq.Constants.Dataset | string;
    /** The frequency at which CIS sends batches of logs to your destination. */
    frequency?: CreateLogpushJobV2RequestLogpushJobCosReq.Constants.Frequency | string;
  }
  export namespace CreateLogpushJobV2RequestLogpushJobCosReq {
    export namespace Constants {
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
  }

  /**
   * Create logpush job for a generic destination.
   */
  export interface CreateLogpushJobV2RequestLogpushJobGenericReq extends CreateLogpushJobV2Request {
    /** Logpush Job Name. */
    name?: string;
    /** Whether the logpush job is enabled or not. */
    enabled?: boolean;
    /** Configuration string. */
    logpull_options?: string;
    /** Uniquely identifies a resource where data will be pushed. Additional configuration parameters supported by
     *  the destination may be included.
     */
    destination_conf: string;
    /** Dataset to be pulled. */
    dataset?: CreateLogpushJobV2RequestLogpushJobGenericReq.Constants.Dataset | string;
    /** The frequency at which CIS sends batches of logs to your destination. */
    frequency?: CreateLogpushJobV2RequestLogpushJobGenericReq.Constants.Frequency | string;
  }
  export namespace CreateLogpushJobV2RequestLogpushJobGenericReq {
    export namespace Constants {
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
  }

  /**
   * Create IBM Cloud Logs logpush job input.
   */
  export interface CreateLogpushJobV2RequestLogpushJobIbmclReq extends CreateLogpushJobV2Request {
    /** Logpush Job Name. */
    name?: string;
    /** Whether the logpush job is enabled or not. */
    enabled?: boolean;
    /** Configuration string. */
    logpull_options?: string;
    /** Required information to push logs to your Cloud Logs instance. */
    ibmcl: LogpushJobIbmclReqIbmcl;
    /** Dataset to be pulled. */
    dataset?: CreateLogpushJobV2RequestLogpushJobIbmclReq.Constants.Dataset | string;
    /** The frequency at which CIS sends batches of logs to your destination. */
    frequency?: CreateLogpushJobV2RequestLogpushJobIbmclReq.Constants.Frequency | string;
  }
  export namespace CreateLogpushJobV2RequestLogpushJobIbmclReq {
    export namespace Constants {
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
  }

  /**
   * Create LogDNA logpush job input.
   */
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
    dataset?: CreateLogpushJobV2RequestLogpushJobLogdnaReq.Constants.Dataset | string;
    /** The frequency at which CIS sends batches of logs to your destination. */
    frequency?: CreateLogpushJobV2RequestLogpushJobLogdnaReq.Constants.Frequency | string;
  }
  export namespace CreateLogpushJobV2RequestLogpushJobLogdnaReq {
    export namespace Constants {
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
  }

  /**
   * Update COS logpush job input.
   */
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
    frequency?: UpdateLogpushJobV2RequestLogpushJobsUpdateCosReq.Constants.Frequency | string;
  }
  export namespace UpdateLogpushJobV2RequestLogpushJobsUpdateCosReq {
    export namespace Constants {
      /** The frequency at which CIS sends batches of logs to your destination. */
      export enum Frequency {
        HIGH = 'high',
        LOW = 'low',
      }
    }
  }

  /**
   * Create logpush job for a generic destination.
   */
  export interface UpdateLogpushJobV2RequestLogpushJobsUpdateGenericReq extends UpdateLogpushJobV2Request {
    /** Logpush Job Name. */
    name?: string;
    /** Whether the logpush job is enabled or not. */
    enabled?: boolean;
    /** Configuration string. */
    logpull_options?: string;
    /** Uniquely identifies a resource where data will be pushed. Additional configuration parameters supported by
     *  the destination may be included.
     */
    destination_conf?: string;
    /** Dataset to be pulled. */
    dataset?: UpdateLogpushJobV2RequestLogpushJobsUpdateGenericReq.Constants.Dataset | string;
    /** The frequency at which CIS sends batches of logs to your destination. */
    frequency?: UpdateLogpushJobV2RequestLogpushJobsUpdateGenericReq.Constants.Frequency | string;
  }
  export namespace UpdateLogpushJobV2RequestLogpushJobsUpdateGenericReq {
    export namespace Constants {
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
  }

  /**
   * Update IBM Cloud Logs logpush job input.
   */
  export interface UpdateLogpushJobV2RequestLogpushJobsUpdateIbmclReq extends UpdateLogpushJobV2Request {
    /** Whether the logpush job enabled or not. */
    enabled?: boolean;
    /** Configuration string. */
    logpull_options?: string;
    /** Required information to push logs to your Cloud Logs instance. */
    ibmcl?: LogpushJobsUpdateIbmclReqIbmcl;
    /** The frequency at which CIS sends batches of logs to your destination. */
    frequency?: UpdateLogpushJobV2RequestLogpushJobsUpdateIbmclReq.Constants.Frequency | string;
  }
  export namespace UpdateLogpushJobV2RequestLogpushJobsUpdateIbmclReq {
    export namespace Constants {
      /** The frequency at which CIS sends batches of logs to your destination. */
      export enum Frequency {
        HIGH = 'high',
        LOW = 'low',
      }
    }
  }

  /**
   * Update LogDNA logpush job input.
   */
  export interface UpdateLogpushJobV2RequestLogpushJobsUpdateLogdnaReq extends UpdateLogpushJobV2Request {
    /** Whether the logpush job enabled or not. */
    enabled?: boolean;
    /** Configuration string. */
    logpull_options?: string;
    /** Information to identify the LogDNA instance the data will be pushed. */
    logdna?: JsonObject;
    /** The frequency at which CIS sends batches of logs to your destination. */
    frequency?: UpdateLogpushJobV2RequestLogpushJobsUpdateLogdnaReq.Constants.Frequency | string;
  }
  export namespace UpdateLogpushJobV2RequestLogpushJobsUpdateLogdnaReq {
    export namespace Constants {
      /** The frequency at which CIS sends batches of logs to your destination. */
      export enum Frequency {
        HIGH = 'high',
        LOW = 'low',
      }
    }
  }
}

export = LogpushJobsApiV1;
