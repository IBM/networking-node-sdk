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
 * Firewall Event Analytics API
 */

class FirewallEventAnalyticsApiV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'firewall_event_analytics_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of FirewallEventAnalyticsApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {FirewallEventAnalyticsApiV1}
   */

  public static newInstance(options: UserOptions): FirewallEventAnalyticsApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new FirewallEventAnalyticsApiV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Full url-encoded cloud resource name (CRN) of resource instance. */
  crn: string;

  /** zone identifier. */
  zoneId: string;

  /**
   * Construct a FirewallEventAnalyticsApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} options.zoneId - zone identifier.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {FirewallEventAnalyticsApiV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const requiredParams = ['crn','zoneId'];
    const missingParams = getMissingParams(options, requiredParams);
    if (missingParams) {
      throw missingParams;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(FirewallEventAnalyticsApiV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneId = options.zoneId;
  }

  /*************************
   * firewallEventAnalytics
   ************************/

  /**
   * Firewall event analytics data.
   *
   * Provides a full log of the mitigations performed by the CIS Firewall features including; Firewall Rules, Rate
   * Limiting, Security Level, Access Rules (IP, IP Range, ASN, and Country), WAF (Web Application Firewall), User Agent
   * Blocking, Zone Lockdown, and Advanced DDoS Protection.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.dataset] - The dataset of analytics data.
   * @param {string} [params.filter] - The 'datetime' is a filter base on time range. This filter can combine with
   * operators ('gt', 'lt', 'geq', 'leq', 'neq', and 'in') to filter data by specified time range, e.g.,
   * `filter=datetime_geq:2020-06-28T00:00:00Z&filter=datetime_leq:2020-06-29T00:00:00Z`.
   * @param {number} [params.limit] - The number of events to return. (minimum is 1 and maximum is 10000).
   * @param {string} [params.orderBy] - Output order of the events.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<FirewallEventAnalyticsApiV1.Response<FirewallEventAnalyticsApiV1.FirewallEventAnalytics>>}
   */
  public firewallEventAnalytics(params?: FirewallEventAnalyticsApiV1.FirewallEventAnalyticsParams): Promise<FirewallEventAnalyticsApiV1.Response<FirewallEventAnalyticsApiV1.FirewallEventAnalytics>> {
    const _params = Object.assign({}, params);

    const query = {
      'dataset': _params.dataset,
      'filter': _params.filter,
      'limit': _params.limit,
      'orderBy': _params.orderBy
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(FirewallEventAnalyticsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'firewallEventAnalytics');

    const parameters = {
      options: {
        url: '/v2/{crn}/zones/{zone_id}/analytics/firewall_events',
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

}

/*************************
 * interfaces
 ************************/

namespace FirewallEventAnalyticsApiV1 {

  /** Options for the `FirewallEventAnalyticsApiV1` constructor. */
  export interface Options extends UserOptions {

    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;

    /** zone identifier. */
    zoneId: string;
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

  /** Parameters for the `firewallEventAnalytics` operation. */
  export interface FirewallEventAnalyticsParams {
    /** The dataset of analytics data. */
    dataset?: FirewallEventAnalyticsConstants.Dataset | string;
    /** The 'datetime' is a filter base on time range. This filter can combine with operators ('gt', 'lt', 'geq',
     *  'leq', 'neq', and 'in') to filter data by specified time range, e.g.,
     *  `filter=datetime_geq:2020-06-28T00:00:00Z&filter=datetime_leq:2020-06-29T00:00:00Z`.
     */
    filter?: string;
    /** The number of events to return. (minimum is 1 and maximum is 10000). */
    limit?: number;
    /** Output order of the events. */
    orderBy?: FirewallEventAnalyticsConstants.OrderBy | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `firewallEventAnalytics` operation. */
  export namespace FirewallEventAnalyticsConstants {
    /** The dataset of analytics data. */
    export enum Dataset {
      FIREWALLEVENTSADAPTIVEGROUPS = 'firewallEventsAdaptiveGroups',
    }
    /** Output order of the events. */
    export enum OrderBy {
      DATETIME_ASC = 'datetime_ASC',
      DATETIME_DESC = 'datetime_DESC',
      DATETIMEFIFTEENMINUTES_ASC = 'datetimeFifteenMinutes_ASC',
      DATETIMEFIFTEENMINUTES_DESC = 'datetimeFifteenMinutes_DESC',
      DATETIMEHOUR_ASC = 'datetimeHour_ASC',
      DATETIMEHOUR_DESC = 'datetimeHour_DESC',
      DATETIMEFIVEMINUTES_ASC = 'datetimeFiveMinutes_ASC',
      DATETIMEFIVEMINUTES_DESC = 'datetimeFiveMinutes_DESC',
      DATETIMEMINUTE_ASC = 'datetimeMinute_ASC',
      DATETIMEMINUTE_DESC = 'datetimeMinute_DESC',
      ACTION_ASC = 'action_ASC',
      ACTION_DESC = 'action_DESC',
      AVG_SAMPLEINTERVAL_ASC = 'avg_sampleInterval_ASC',
      AVG_SAMPLEINTERVAL_DESC = 'avg_sampleInterval_DESC',
      CLIENTASNDESCRIPTION_ASC = 'clientASNDescription_ASC',
      CLIENTASNDESCRIPTION_DESC = 'clientASNDescription_DESC',
      CLIENTASN_ASC = 'clientAsn_ASC',
      CLIENTASN_DESC = 'clientAsn_DESC',
      CLIENTCOUNTRYNAME_ASC = 'clientCountryName_ASC',
      CLIENTCOUNTRYNAME_DESC = 'clientCountryName_DESC',
      CLIENTIPCLASS_ASC = 'clientIPClass_ASC',
      CLIENTIPCLASS_DESC = 'clientIPClass_DESC',
      CLIENTIP_ASC = 'clientIP_ASC',
      CLIENTIP_DESC = 'clientIP_DESC',
      CLIENTREFERERHOST_ASC = 'clientRefererHost_ASC',
      CLIENTREFERERHOST_DESC = 'clientRefererHost_DESC',
      CLIENTREFERERPATH_ASC = 'clientRefererPath_ASC',
      CLIENTREFERERPATH_DESC = 'clientRefererPath_DESC',
      CLIENTREFERERQUERY_ASC = 'clientRefererQuery_ASC',
      CLIENTREFERERQUERY_DESC = 'clientRefererQuery_DESC',
      CLIENTREFERERSCHEME_ASC = 'clientRefererScheme_ASC',
      CLIENTREFERERSCHEME_DESC = 'clientRefererScheme_DESC',
      CLIENTREQUESTHTTPHOST_ASC = 'clientRequestHTTPHost_ASC',
      CLIENTREQUESTHTTPHOST_DESC = 'clientRequestHTTPHost_DESC',
      CLIENTREQUESTHTTPMETHODNAME_ASC = 'clientRequestHTTPMethodName_ASC',
      CLIENTREQUESTHTTPMETHODNAME_DESC = 'clientRequestHTTPMethodName_DESC',
      CLIENTREQUESTHTTPPROTOCOL_ASC = 'clientRequestHTTPProtocol_ASC',
      CLIENTREQUESTHTTPPROTOCOL_DESC = 'clientRequestHTTPProtocol_DESC',
      CLIENTREQUESTPATH_ASC = 'clientRequestPath_ASC',
      CLIENTREQUESTPATH_DESC = 'clientRequestPath_DESC',
      CLIENTREQUESTQUERY_ASC = 'clientRequestQuery_ASC',
      CLIENTREQUESTQUERY_DESC = 'clientRequestQuery_DESC',
      CLIENTREQUESTSCHEME_ASC = 'clientRequestScheme_ASC',
      CLIENTREQUESTSCHEME_DESC = 'clientRequestScheme_DESC',
      COUNT_ASC = 'count_ASC',
      COUNT_DESC = 'count_DESC',
      EDGECOLONAME_ASC = 'edgeColoName_ASC',
      EDGECOLONAME_DESC = 'edgeColoName_DESC',
      EDGERESPONSESTATUS_ASC = 'edgeResponseStatus_ASC',
      EDGERESPONSESTATUS_DESC = 'edgeResponseStatus_DESC',
      KIND_ASC = 'kind_ASC',
      KIND_DESC = 'kind_DESC',
      MATCHINDEX_ASC = 'matchIndex_ASC',
      MATCHINDEX_DESC = 'matchIndex_DESC',
      ORIGINRESPONSESTATUS_ASC = 'originResponseStatus_ASC',
      ORIGINRESPONSESTATUS_DESC = 'originResponseStatus_DESC',
      ORIGINATORRAYNAME_ASC = 'originatorRayName_ASC',
      ORIGINATORRAYNAME_DESC = 'originatorRayName_DESC',
      RAYNAME_ASC = 'rayName_ASC',
      RAYNAME_DESC = 'rayName_DESC',
      REF_ASC = 'ref_ASC',
      REF_DESC = 'ref_DESC',
      RULEID_ASC = 'ruleId_ASC',
      RULEID_DESC = 'ruleId_DESC',
      SAMPLEINTERVAL_ASC = 'sampleInterval_ASC',
      SAMPLEINTERVAL_DESC = 'sampleInterval_DESC',
      SOURCE_ASC = 'source_ASC',
      SOURCE_DESC = 'source_DESC',
      USERAGENT_ASC = 'userAgent_ASC',
      USERAGENT_DESC = 'userAgent_DESC',
      VISIBILITY_ASC = 'visibility_ASC',
      VISIBILITY_DESC = 'visibility_DESC',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** Dimensions of firewall events analytics data. */
  export interface FirewallEventAdaptiveGroupsDimension {
    /** Firewall action. */
    action?: string;
    /** Client country. */
    clientCountryName?: string;
    /** Client IP address. */
    clientIP?: string;
    /** Client request HTTP hostname. */
    clientRequestHTTPHost?: string;
    /** Client request HTTP method. */
    clientRequestHTTPMethodName?: string;
    /** Client request HTTP protocol version. */
    clientRequestHTTPProtocol?: string;
    /** Client request path. */
    clientRequestPath?: string;
    /** Date time of the firewall analytics event. */
    datetime?: string;
    /** Edge colocation name. */
    edgeColoName?: string;
    /** Kind of fireall analytic event. */
    kind?: string;
    /** Ray ID. */
    rayName?: string;
    /** Rule ID. */
    ruleId?: string;
    /** User agent. */
    userAgent?: string;
  }

  /** Containers for firewall events analytics data of the given zone. */
  export interface FirewallEventAdaptiveGroupsDimensions {
    /** Dimensions of firewall events analytics data. */
    dimensions: FirewallEventAdaptiveGroupsDimension;
  }

  /** Firewall event analytics objects. */
  export interface FirewallEventAnalytics {
    /** Firewall event analytics data. */
    data: FirewallEventAnalyticsData;
  }

  /** Firewall event analytics data. */
  export interface FirewallEventAnalyticsData {
    /** Viewer of the firewall events analytics data. */
    viewer: FirewallEventAnalyticsViewer;
  }

  /** Viewer of the firewall events analytics data. */
  export interface FirewallEventAnalyticsViewer {
    /** Container of the firewall events analytics data for zones. */
    zones: FirewallEventAnalyticsZone[];
  }

  /** firewall events analytics datasets of the given zone. */
  export interface FirewallEventAnalyticsZone {
    /** firewallEventsAdaptiveGroups dataset. */
    firewallEventsAdaptiveGroups: FirewallEventAdaptiveGroupsDimensions[];
  }

}

export = FirewallEventAnalyticsApiV1;
