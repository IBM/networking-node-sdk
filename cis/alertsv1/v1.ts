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
 * CIS Alert Policies
 *
 * API Version: 1.0.0
 */

class AlertsV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'alerts';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of AlertsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {AlertsV1}
   */

  public static newInstance(options: UserOptions): AlertsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new AlertsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /** Full url-encoded CRN of the service instance. */
  crn: string;

  /**
   * Construct a AlertsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded CRN of the service instance.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {AlertsV1}
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
      this.setServiceUrl(AlertsV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
  }

  /*************************
   * alertPolicies
   ************************/

  /**
   * List alert policies.
   *
   * List configured alert policies for the CIS instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AlertsV1.Response<AlertsV1.ListAlertPoliciesResp>>}
   */
  public getAlertPolicies(
    params?: AlertsV1.GetAlertPoliciesParams
  ): Promise<AlertsV1.Response<AlertsV1.ListAlertPoliciesResp>> {
    const _params = { ...params };

    const path = {
      'crn': this.crn,
    };

    const sdkHeaders = getSdkHeaders(
      AlertsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getAlertPolicies'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/alerting/policies',
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
   * Create an alert policy.
   *
   * Create a new alert policy for the CIS instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - Policy name.
   * @param {boolean} [params.enabled] - Is the alert policy active.
   * @param {string} [params.alertType] - Condition for the alert.
   * @param {CreateAlertPolicyInputMechanisms} [params.mechanisms] - Delivery mechanisms for the alert.
   * @param {string} [params.description] - Policy description.
   * @param {JsonObject} [params.filters] - Optional filters depending for the alert type.
   * @param {JsonObject} [params.conditions] - Conditions depending on the alert type. HTTP DDOS Attack Alerter does not
   * have any conditions. The Load Balancing Pool Enablement Alerter takes conditions that describe for all pools
   * whether the pool is being enabled, disabled, or both. This field is not required when creating a new alert.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AlertsV1.Response<AlertsV1.AlertSuccessResp>>}
   */
  public createAlertPolicy(
    params?: AlertsV1.CreateAlertPolicyParams
  ): Promise<AlertsV1.Response<AlertsV1.AlertSuccessResp>> {
    const _params = { ...params };

    const body = {
      'name': _params.name,
      'enabled': _params.enabled,
      'alert_type': _params.alertType,
      'mechanisms': _params.mechanisms,
      'description': _params.description,
      'filters': _params.filters,
      'conditions': _params.conditions,
    };

    const path = {
      'crn': this.crn,
    };

    const sdkHeaders = getSdkHeaders(
      AlertsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createAlertPolicy'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/alerting/policies',
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
   * Get an alert policy.
   *
   * Get an alert policy for the CIS instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyId - Alert policy identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AlertsV1.Response<AlertsV1.GetAlertPolicyResp>>}
   */
  public getAlertPolicy(
    params: AlertsV1.GetAlertPolicyParams
  ): Promise<AlertsV1.Response<AlertsV1.GetAlertPolicyResp>> {
    const _params = { ...params };
    const requiredParams = ['policyId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'policy_id': _params.policyId,
    };

    const sdkHeaders = getSdkHeaders(
      AlertsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getAlertPolicy'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/alerting/policies/{policy_id}',
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
   * Update an alert policy.
   *
   * Update an existing alert policy for the CIS instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyId - Alert policy identifier.
   * @param {string} [params.name] - Policy name.
   * @param {boolean} [params.enabled] - Is the alert policy active.
   * @param {string} [params.alertType] - Condition for the alert. Use 'dos_attack_l7' to set up an HTTP DDOS Attack
   * Alerter, use 'g6_pool_toggle_alert' to set up Load Balancing Pool Enablement Alerter, use
   * 'clickhouse_alert_fw_anomaly' to set up WAF Alerter and 'clickhouse_alert_fw_ent_anomaly' to set up Advanced
   * Security Alerter.
   * @param {UpdateAlertPolicyInputMechanisms} [params.mechanisms] - Delivery mechanisms for the alert, can include an
   * email, a webhook, or both.
   * @param {JsonObject} [params.conditions] - Conditions depending on the alert type. HTTP DDOS Attack Alerter does not
   * have any conditions. The Load Balancing Pool Enablement Alerter takes conditions that describe for all pools
   * whether the pool is being enabled, disabled, or both.
   * @param {string} [params.description] - Policy description.
   * @param {JsonObject} [params.filters] - Optional filters depending for the alert type. HTTP DDOS Attack Alerter does
   * not require any filters. The Load Balancing Pool Enablement Alerter requires a list of IDs for the pools and their
   * corresponding alert trigger (set whether alerts are recieved on disablement, enablement, or both). The basic WAF
   * Alerter requires a list of zones to be monitored. The Advanced Security Alerter requires a list of zones to be
   * monitored as well as a list of services to monitor.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AlertsV1.Response<AlertsV1.AlertSuccessResp>>}
   */
  public updateAlertPolicy(
    params: AlertsV1.UpdateAlertPolicyParams
  ): Promise<AlertsV1.Response<AlertsV1.AlertSuccessResp>> {
    const _params = { ...params };
    const requiredParams = ['policyId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'enabled': _params.enabled,
      'alert_type': _params.alertType,
      'mechanisms': _params.mechanisms,
      'conditions': _params.conditions,
      'description': _params.description,
      'filters': _params.filters,
    };

    const path = {
      'crn': this.crn,
      'policy_id': _params.policyId,
    };

    const sdkHeaders = getSdkHeaders(
      AlertsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateAlertPolicy'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/alerting/policies/{policy_id}',
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
   * Delete an alert policy.
   *
   * Delete an alert policy for the CIS instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyId - Alert policy identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AlertsV1.Response<AlertsV1.AlertSuccessResp>>}
   */
  public deleteAlertPolicy(
    params: AlertsV1.DeleteAlertPolicyParams
  ): Promise<AlertsV1.Response<AlertsV1.AlertSuccessResp>> {
    const _params = { ...params };
    const requiredParams = ['policyId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'policy_id': _params.policyId,
    };

    const sdkHeaders = getSdkHeaders(
      AlertsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteAlertPolicy'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/alerting/policies/{policy_id}',
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

namespace AlertsV1 {
  /** Options for the `AlertsV1` constructor. */
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

  /** Parameters for the `getAlertPolicies` operation. */
  export interface GetAlertPoliciesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createAlertPolicy` operation. */
  export interface CreateAlertPolicyParams {
    /** Policy name. */
    name?: string;
    /** Is the alert policy active. */
    enabled?: boolean;
    /** Condition for the alert. */
    alertType?: CreateAlertPolicyConstants.AlertType | string;
    /** Delivery mechanisms for the alert. */
    mechanisms?: CreateAlertPolicyInputMechanisms;
    /** Policy description. */
    description?: string;
    /** Optional filters depending for the alert type. */
    filters?: JsonObject;
    /** Conditions depending on the alert type. HTTP DDOS Attack Alerter does not have any conditions. The Load
     *  Balancing Pool Enablement Alerter takes conditions that describe for all pools whether the pool is being
     *  enabled, disabled, or both. This field is not required when creating a new alert.
     */
    conditions?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createAlertPolicy` operation. */
  export namespace CreateAlertPolicyConstants {
    /** Condition for the alert. */
    export enum AlertType {
      DOS_ATTACK_L7 = 'dos_attack_l7',
      G6_POOL_TOGGLE_ALERT = 'g6_pool_toggle_alert',
      CLICKHOUSE_ALERT_FW_ANOMALY = 'clickhouse_alert_fw_anomaly',
      CLICKHOUSE_ALERT_FW_ENT_ANOMALY = 'clickhouse_alert_fw_ent_anomaly',
    }
  }

  /** Parameters for the `getAlertPolicy` operation. */
  export interface GetAlertPolicyParams {
    /** Alert policy identifier. */
    policyId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAlertPolicy` operation. */
  export interface UpdateAlertPolicyParams {
    /** Alert policy identifier. */
    policyId: string;
    /** Policy name. */
    name?: string;
    /** Is the alert policy active. */
    enabled?: boolean;
    /** Condition for the alert. Use 'dos_attack_l7' to set up an HTTP DDOS Attack Alerter, use
     *  'g6_pool_toggle_alert' to set up Load Balancing Pool Enablement Alerter, use 'clickhouse_alert_fw_anomaly' to
     *  set up WAF Alerter and 'clickhouse_alert_fw_ent_anomaly' to set up Advanced Security Alerter.
     */
    alertType?: UpdateAlertPolicyConstants.AlertType | string;
    /** Delivery mechanisms for the alert, can include an email, a webhook, or both. */
    mechanisms?: UpdateAlertPolicyInputMechanisms;
    /** Conditions depending on the alert type. HTTP DDOS Attack Alerter does not have any conditions. The Load
     *  Balancing Pool Enablement Alerter takes conditions that describe for all pools whether the pool is being
     *  enabled, disabled, or both.
     */
    conditions?: JsonObject;
    /** Policy description. */
    description?: string;
    /** Optional filters depending for the alert type. HTTP DDOS Attack Alerter does not require any filters. The
     *  Load Balancing Pool Enablement Alerter requires a list of IDs for the pools and their corresponding alert
     *  trigger (set whether alerts are recieved on disablement, enablement, or both). The basic WAF Alerter requires a
     *  list of zones to be monitored. The Advanced Security Alerter requires a list of zones to be monitored as well as
     *  a list of services to monitor.
     */
    filters?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateAlertPolicy` operation. */
  export namespace UpdateAlertPolicyConstants {
    /** Condition for the alert. Use 'dos_attack_l7' to set up an HTTP DDOS Attack Alerter, use 'g6_pool_toggle_alert' to set up Load Balancing Pool Enablement Alerter, use 'clickhouse_alert_fw_anomaly' to set up WAF Alerter and 'clickhouse_alert_fw_ent_anomaly' to set up Advanced Security Alerter. */
    export enum AlertType {
      DOS_ATTACK_L7 = 'dos_attack_l7',
      G6_POOL_TOGGLE_ALERT = 'g6_pool_toggle_alert',
      CLICKHOUSE_ALERT_FW_ANOMALY = 'clickhouse_alert_fw_anomaly',
      CLICKHOUSE_ALERT_FW_ENT_ANOMALY = 'clickhouse_alert_fw_ent_anomaly',
    }
  }

  /** Parameters for the `deleteAlertPolicy` operation. */
  export interface DeleteAlertPolicyParams {
    /** Alert policy identifier. */
    policyId: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** AlertSuccessRespErrorsItem. */
  export interface AlertSuccessRespErrorsItem {
    id?: string;
  }

  /** AlertSuccessRespMessagesItem. */
  export interface AlertSuccessRespMessagesItem {
    id?: string;
  }

  /** Container for response information. */
  export interface AlertSuccessRespResult {
    /** Policy ID. */
    id: string;
  }

  /** Delivery mechanisms for the alert. */
  export interface CreateAlertPolicyInputMechanisms {
    email?: CreateAlertPolicyInputMechanismsEmailItem[];
    webhooks?: CreateAlertPolicyInputMechanismsWebhooksItem[];
  }

  /** CreateAlertPolicyInputMechanismsEmailItem. */
  export interface CreateAlertPolicyInputMechanismsEmailItem {
    id?: string;
  }

  /** CreateAlertPolicyInputMechanismsWebhooksItem. */
  export interface CreateAlertPolicyInputMechanismsWebhooksItem {
    id?: string;
  }

  /** GetAlertPolicyRespErrorsItem. */
  export interface GetAlertPolicyRespErrorsItem {
    id?: string;
  }

  /** GetAlertPolicyRespMessagesItem. */
  export interface GetAlertPolicyRespMessagesItem {
    id?: string;
  }

  /** Container for response information. */
  export interface GetAlertPolicyRespResult {
    /** Policy ID. */
    id: string;
    /** Policy Name. */
    name: string;
    /** Alert Policy description. */
    description: string;
    /** Is the alert enabled. */
    enabled: boolean;
    /** Condition for the alert. */
    alert_type: string;
    /** Delivery mechanisms for the alert, can include an email, a webhook, or both. */
    mechanisms: GetAlertPolicyRespResultMechanisms;
    /** When was the policy first created. */
    created: string;
    /** When was the policy last modified. */
    modified: string;
    /** Optional conditions depending for the alert type. */
    conditions: JsonObject;
    /** Optional filters depending for the alert type. */
    filters: JsonObject;
  }

  /** Delivery mechanisms for the alert, can include an email, a webhook, or both. */
  export interface GetAlertPolicyRespResultMechanisms {
    email?: GetAlertPolicyRespResultMechanismsEmailItem[];
    webhooks?: GetAlertPolicyRespResultMechanismsWebhooksItem[];
  }

  /** GetAlertPolicyRespResultMechanismsEmailItem. */
  export interface GetAlertPolicyRespResultMechanismsEmailItem {
    id?: string;
  }

  /** GetAlertPolicyRespResultMechanismsWebhooksItem. */
  export interface GetAlertPolicyRespResultMechanismsWebhooksItem {
    id?: string;
  }

  /** ListAlertPoliciesRespErrorsItem. */
  export interface ListAlertPoliciesRespErrorsItem {
    id?: string;
  }

  /** ListAlertPoliciesRespMessagesItem. */
  export interface ListAlertPoliciesRespMessagesItem {
    id?: string;
  }

  /** ListAlertPoliciesRespResultItem. */
  export interface ListAlertPoliciesRespResultItem {
    /** Policy ID. */
    id: string;
    /** Policy Name. */
    name: string;
    /** Alert Policy description. */
    description: string;
    /** Is the alert enabled. */
    enabled: boolean;
    /** Condition for the alert. */
    alert_type: string;
    /** Delivery mechanisms for the alert, can include an email, a webhook, or both. */
    mechanisms: ListAlertPoliciesRespResultItemMechanisms;
    /** When was the policy first created. */
    created: string;
    /** When was the policy last modified. */
    modified: string;
    /** Optional conditions depending for the alert type. */
    conditions: JsonObject;
    /** Optional filters depending for the alert type. */
    filters: JsonObject;
  }

  /** Delivery mechanisms for the alert, can include an email, a webhook, or both. */
  export interface ListAlertPoliciesRespResultItemMechanisms {
    email?: ListAlertPoliciesRespResultItemMechanismsEmailItem[];
    webhooks?: ListAlertPoliciesRespResultItemMechanismsWebhooksItem[];
  }

  /** ListAlertPoliciesRespResultItemMechanismsEmailItem. */
  export interface ListAlertPoliciesRespResultItemMechanismsEmailItem {
    id?: string;
  }

  /** ListAlertPoliciesRespResultItemMechanismsWebhooksItem. */
  export interface ListAlertPoliciesRespResultItemMechanismsWebhooksItem {
    id?: string;
  }

  /** Delivery mechanisms for the alert, can include an email, a webhook, or both. */
  export interface UpdateAlertPolicyInputMechanisms {
    email?: UpdateAlertPolicyInputMechanismsEmailItem[];
    webhooks?: UpdateAlertPolicyInputMechanismsWebhooksItem[];
  }

  /** UpdateAlertPolicyInputMechanismsEmailItem. */
  export interface UpdateAlertPolicyInputMechanismsEmailItem {
    id?: string;
  }

  /** UpdateAlertPolicyInputMechanismsWebhooksItem. */
  export interface UpdateAlertPolicyInputMechanismsWebhooksItem {
    id?: string;
  }

  /** Alert Policies Response. */
  export interface AlertSuccessResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: AlertSuccessRespErrorsItem[];
    /** Array of messages returned. */
    messages: AlertSuccessRespMessagesItem[];
    /** Container for response information. */
    result: AlertSuccessRespResult;
  }

  /** Get Alert Policies Response. */
  export interface GetAlertPolicyResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: GetAlertPolicyRespErrorsItem[];
    /** Array of messages returned. */
    messages: GetAlertPolicyRespMessagesItem[];
    /** Container for response information. */
    result: GetAlertPolicyRespResult;
  }

  /** List Alert Policies Response. */
  export interface ListAlertPoliciesResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: ListAlertPoliciesRespErrorsItem[];
    /** Array of messages returned. */
    messages: ListAlertPoliciesRespMessagesItem[];
    /** Container for response information. */
    result: ListAlertPoliciesRespResultItem[];
  }
}

export = AlertsV1;
