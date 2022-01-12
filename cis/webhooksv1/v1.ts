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
 * CIS Alert Webhooks
 *
 * API Version: 1.0.0
 */

class WebhooksV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'webhooks';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of WebhooksV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {WebhooksV1}
   */

  public static newInstance(options: UserOptions): WebhooksV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new WebhooksV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /** Full url-encoded CRN of the service instance. */
  crn: string;

  /**
   * Construct a WebhooksV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded CRN of the service instance.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {WebhooksV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const requiredParams = ['crn'];
    const missingParams = getMissingParams(options, requiredParams);
    if (missingParams) {
      throw missingParams;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(WebhooksV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
  }

  /*************************
   * alertWebhooks
   ************************/

  /**
   * List alert webhooks.
   *
   * List configured alert webhooks for the CIS instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WebhooksV1.Response<WebhooksV1.ListAlertWebhooksResp>>}
   */
  public getAlertWebhooks(
    params?: WebhooksV1.GetAlertWebhooksParams
  ): Promise<WebhooksV1.Response<WebhooksV1.ListAlertWebhooksResp>> {
    const _params = { ...params };

    const path = {
      'crn': this.crn,
    };

    const sdkHeaders = getSdkHeaders(
      WebhooksV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getAlertWebhooks'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/alerting/destinations/webhooks',
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
   * Create an alert webhook.
   *
   * Create a new alert webhook for the CIS instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - Webhook Name.
   * @param {string} [params.url] - Webhook url.
   * @param {string} [params.secret] - The optional secret or API key needed to use the webhook.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WebhooksV1.Response<WebhooksV1.WebhookSuccessResp>>}
   */
  public createAlertWebhook(
    params?: WebhooksV1.CreateAlertWebhookParams
  ): Promise<WebhooksV1.Response<WebhooksV1.WebhookSuccessResp>> {
    const _params = { ...params };

    const body = {
      'name': _params.name,
      'url': _params.url,
      'secret': _params.secret,
    };

    const path = {
      'crn': this.crn,
    };

    const sdkHeaders = getSdkHeaders(
      WebhooksV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createAlertWebhook'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/alerting/destinations/webhooks',
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
   * Get an alert webhook.
   *
   * Get an alert webhook for the CIS instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.webhookId - Alert webhook identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WebhooksV1.Response<WebhooksV1.GetAlertWebhookResp>>}
   */
  public getAlertWebhook(
    params: WebhooksV1.GetAlertWebhookParams
  ): Promise<WebhooksV1.Response<WebhooksV1.GetAlertWebhookResp>> {
    const _params = { ...params };
    const requiredParams = ['webhookId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'webhook_id': _params.webhookId,
    };

    const sdkHeaders = getSdkHeaders(
      WebhooksV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getAlertWebhook'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/alerting/destinations/webhooks/{webhook_id}',
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
   * Update an alert webhook.
   *
   * Update an existing alert webhook for the CIS instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.webhookId - Alert webhook identifier.
   * @param {string} [params.name] - Webhook Name.
   * @param {string} [params.url] - Webhook url.
   * @param {string} [params.secret] - The optional secret or API key needed to use the webhook.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WebhooksV1.Response<WebhooksV1.WebhookSuccessResp>>}
   */
  public updateAlertWebhook(
    params: WebhooksV1.UpdateAlertWebhookParams
  ): Promise<WebhooksV1.Response<WebhooksV1.WebhookSuccessResp>> {
    const _params = { ...params };
    const requiredParams = ['webhookId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'url': _params.url,
      'secret': _params.secret,
    };

    const path = {
      'crn': this.crn,
      'webhook_id': _params.webhookId,
    };

    const sdkHeaders = getSdkHeaders(
      WebhooksV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateAlertWebhook'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/alerting/destinations/webhooks/{webhook_id}',
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
   * Delete an alert webhook.
   *
   * Delete an alert webhook for the CIS instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.webhookId - Alert webhook identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<WebhooksV1.Response<WebhooksV1.WebhookSuccessResp>>}
   */
  public deleteAlertWebhook(
    params: WebhooksV1.DeleteAlertWebhookParams
  ): Promise<WebhooksV1.Response<WebhooksV1.WebhookSuccessResp>> {
    const _params = { ...params };
    const requiredParams = ['webhookId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'webhook_id': _params.webhookId,
    };

    const sdkHeaders = getSdkHeaders(
      WebhooksV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteAlertWebhook'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/alerting/destinations/webhooks/{webhook_id}',
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
}

/*************************
 * interfaces
 ************************/

namespace WebhooksV1 {
  /** Options for the `WebhooksV1` constructor. */
  export interface Options extends UserOptions {
    /** Full url-encoded CRN of the service instance. */
    crn: string;
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

  /** Parameters for the `getAlertWebhooks` operation. */
  export interface GetAlertWebhooksParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createAlertWebhook` operation. */
  export interface CreateAlertWebhookParams {
    /** Webhook Name. */
    name?: string;
    /** Webhook url. */
    url?: string;
    /** The optional secret or API key needed to use the webhook. */
    secret?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAlertWebhook` operation. */
  export interface GetAlertWebhookParams {
    /** Alert webhook identifier. */
    webhookId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAlertWebhook` operation. */
  export interface UpdateAlertWebhookParams {
    /** Alert webhook identifier. */
    webhookId: string;
    /** Webhook Name. */
    name?: string;
    /** Webhook url. */
    url?: string;
    /** The optional secret or API key needed to use the webhook. */
    secret?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteAlertWebhook` operation. */
  export interface DeleteAlertWebhookParams {
    /** Alert webhook identifier. */
    webhookId: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Container for response information. */
  export interface GetAlertWebhookRespResult {
    /** Webhook ID. */
    id: string;
    /** Webhook Name. */
    name: string;
    /** Webhook url. */
    url: string;
    /** Webhook type. */
    type: string;
    /** When was the webhook created. */
    created_at: string;
    /** When was the webhook last used successfully. */
    last_success: string;
    /** When was the webhook last used and failed. */
    last_failure: string;
  }

  /** ListAlertWebhooksRespResultItem. */
  export interface ListAlertWebhooksRespResultItem {
    /** Webhook ID. */
    id: string;
    /** Webhook Name. */
    name: string;
    /** Webhook url. */
    url: string;
    /** Webhook type. */
    type: string;
    /** When was the webhook created. */
    created_at: string;
    /** When was the webhook last used successfully. */
    last_success: string;
    /** When was the webhook last used and failed. */
    last_failure: string;
  }

  /** Container for response information. */
  export interface WebhookSuccessRespResult {
    /** Webhook ID. */
    id: string;
  }

  /** Get Alert Webhooks Response. */
  export interface GetAlertWebhookResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: GetAlertWebhookRespResult;
  }

  /** List Alert Webhooks Response. */
  export interface ListAlertWebhooksResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: ListAlertWebhooksRespResultItem[];
  }

  /** Alert Webhooks Response. */
  export interface WebhookSuccessResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: WebhookSuccessRespResult;
  }
}

export = WebhooksV1;
