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
 * Security Events API
 */

class SecurityEventsApiV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'security_events_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of SecurityEventsApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {SecurityEventsApiV1}
   */

  public static newInstance(options: UserOptions): SecurityEventsApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new SecurityEventsApiV1(options);
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
   * Construct a SecurityEventsApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} options.zoneId - zone identifier.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {SecurityEventsApiV1}
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
      this.setServiceUrl(SecurityEventsApiV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneId = options.zoneId;
  }

  /*************************
   * securityEventsDEPRECATED
   ************************/

  /**
   * Logs of the mitigations performed by Firewall features.
   *
   * Provides a full log of the mitigations performed by the CIS Firewall features including; Firewall Rules, Rate
   * Limiting, Security Level, Access Rules (IP, IP Range, ASN, and Country), WAF (Web Application Firewall), User Agent
   * Blocking, Zone Lockdown, and Advanced DDoS Protection. (DEPRECATED: use Firewall Event Analytics API instead).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.ipClass] - IP class is a map of client IP to visitor classification.
   * @param {string} [params.method] - The HTTP method of the request.
   * @param {string} [params.scheme] - The scheme of the uri.
   * @param {string} [params.ip] - The IPv4 or IPv6 address from which the request originated.
   * @param {string} [params.host] - The hostname the request attempted to access.
   * @param {string} [params.proto] - The protocol of the request.
   * @param {string} [params.uri] - The URI requested from the hostname.
   * @param {string} [params.ua] - The client user agent that initiated the request.
   * @param {string} [params.colo] - The 3-letter CF PoP code.
   * @param {string} [params.rayId] - Ray ID of the request.
   * @param {string} [params.kind] - Kind of events. Now it is only firewall.
   * @param {string} [params.action] - What type of action was taken.
   * @param {string} [params.cursor] - Cursor position and direction for requesting next set of records when amount of
   * results was limited by the limit parameter. A valid value for the cursor can be obtained from the cursors object in
   * the result_info structure.
   * @param {string} [params.country] - The 2-digit country code in which the request originated.
   * @param {string} [params.since] - Start date and time of requesting data period in the ISO8601 format. Can't go back
   * more than a year.
   * @param {string} [params.source] - Source of the event.
   * @param {number} [params.limit] - The number of events to return.
   * @param {string} [params.ruleId] - The ID of the rule that triggered the event, should be considered in the context
   * of source.
   * @param {string} [params.until] - End date and time of requesting data period in the ISO8601 format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecurityEventsApiV1.Response<SecurityEventsApiV1.SecurityEvents>>}
   */
  public securityEvents(params?: SecurityEventsApiV1.SecurityEventsParams): Promise<SecurityEventsApiV1.Response<SecurityEventsApiV1.SecurityEvents>> {
    const _params = Object.assign({}, params);

    const query = {
      'ip_class': _params.ipClass,
      'method': _params.method,
      'scheme': _params.scheme,
      'ip': _params.ip,
      'host': _params.host,
      'proto': _params.proto,
      'uri': _params.uri,
      'ua': _params.ua,
      'colo': _params.colo,
      'ray_id': _params.rayId,
      'kind': _params.kind,
      'action': _params.action,
      'cursor': _params.cursor,
      'country': _params.country,
      'since': _params.since,
      'source': _params.source,
      'limit': _params.limit,
      'rule_id': _params.ruleId,
      'until': _params.until
    };

    const path = {
      'crn': this.crn,
      'zone_id': this.zoneId
    };

    const sdkHeaders = getSdkHeaders(SecurityEventsApiV1.DEFAULT_SERVICE_NAME, 'v1', 'securityEvents');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/security/events',
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

namespace SecurityEventsApiV1 {

  /** Options for the `SecurityEventsApiV1` constructor. */
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

  /** Parameters for the `securityEvents` operation. */
  export interface SecurityEventsParams {
    /** IP class is a map of client IP to visitor classification. */
    ipClass?: SecurityEventsConstants.IpClass | string;
    /** The HTTP method of the request. */
    method?: SecurityEventsConstants.Method | string;
    /** The scheme of the uri. */
    scheme?: SecurityEventsConstants.Scheme | string;
    /** The IPv4 or IPv6 address from which the request originated. */
    ip?: string;
    /** The hostname the request attempted to access. */
    host?: string;
    /** The protocol of the request. */
    proto?: SecurityEventsConstants.Proto | string;
    /** The URI requested from the hostname. */
    uri?: string;
    /** The client user agent that initiated the request. */
    ua?: string;
    /** The 3-letter CF PoP code. */
    colo?: string;
    /** Ray ID of the request. */
    rayId?: string;
    /** Kind of events. Now it is only firewall. */
    kind?: SecurityEventsConstants.Kind | string;
    /** What type of action was taken. */
    action?: SecurityEventsConstants.Action | string;
    /** Cursor position and direction for requesting next set of records when amount of results was limited by the
     *  limit parameter. A valid value for the cursor can be obtained from the cursors object in the result_info
     *  structure.
     */
    cursor?: string;
    /** The 2-digit country code in which the request originated. */
    country?: string;
    /** Start date and time of requesting data period in the ISO8601 format. Can't go back more than a year. */
    since?: string;
    /** Source of the event. */
    source?: SecurityEventsConstants.Source | string;
    /** The number of events to return. */
    limit?: number;
    /** The ID of the rule that triggered the event, should be considered in the context of source. */
    ruleId?: string;
    /** End date and time of requesting data period in the ISO8601 format. */
    until?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `securityEvents` operation. */
  export namespace SecurityEventsConstants {
    /** IP class is a map of client IP to visitor classification. */
    export enum IpClass {
      UNKNOWN = 'unknown',
      CLEAN = 'clean',
      BADHOST = 'badHost',
      SEARCHENGINE = 'searchEngine',
      WHITELIST = 'whitelist',
      GREYLIST = 'greylist',
      MONITORINGSERVICE = 'monitoringService',
      SECURITYSCANNER = 'securityScanner',
      NORECORD = 'noRecord',
      SCAN = 'scan',
      BACKUPSERVICE = 'backupService',
      MOBILEPLATFORM = 'mobilePlatform',
      TOR = 'tor',
    }
    /** The HTTP method of the request. */
    export enum Method {
      GET = 'GET',
      POST = 'POST',
      DELETE = 'DELETE',
      PUT = 'PUT',
      HEAD = 'HEAD',
      PURGE = 'PURGE',
      OPTIONS = 'OPTIONS',
      PROPFIND = 'PROPFIND',
      MKCOL = 'MKCOL',
      PATCH = 'PATCH',
      ACL = 'ACL',
      BCOPY = 'BCOPY',
      BDELETE = 'BDELETE',
      BMOVE = 'BMOVE',
      BPROPFIND = 'BPROPFIND',
      BPROPPATCH = 'BPROPPATCH',
      CHECKIN = 'CHECKIN',
      CHECKOUT = 'CHECKOUT',
      CONNECT = 'CONNECT',
      COPY = 'COPY',
      LABEL = 'LABEL',
      LOCK = 'LOCK',
      MERGE = 'MERGE',
      MKACTIVITY = 'MKACTIVITY',
      MKWORKSPACE = 'MKWORKSPACE',
      MOVE = 'MOVE',
      NOTIFY = 'NOTIFY',
      ORDERPATCH = 'ORDERPATCH',
      POLL = 'POLL',
      PROPPATCH = 'PROPPATCH',
      REPORT = 'REPORT',
      SEARCH = 'SEARCH',
      SUBSCRIBE = 'SUBSCRIBE',
      TRACE = 'TRACE',
      UNCHECKOUT = 'UNCHECKOUT',
      UNLOCK = 'UNLOCK',
      UNSUBSCRIBE = 'UNSUBSCRIBE',
      UPDATE = 'UPDATE',
      VERSION_CONTROL = 'VERSION-CONTROL',
      BASELINE_CONTROL = 'BASELINE-CONTROL',
      X_MS_ENUMATTS = 'X-MS-ENUMATTS',
      RPC_OUT_DATA = 'RPC_OUT_DATA',
      RPC_IN_DATA = 'RPC_IN_DATA',
      JSON = 'JSON',
      COOK = 'COOK',
      TRACK = 'TRACK',
    }
    /** The scheme of the uri. */
    export enum Scheme {
      UNKNOWN = 'unknown',
      HTTP = 'http',
      HTTPS = 'https',
    }
    /** The protocol of the request. */
    export enum Proto {
      UNK = 'UNK',
      HTTP_1_0 = 'HTTP/1.0',
      HTTP_1_1 = 'HTTP/1.1',
      HTTP_1_2 = 'HTTP/1.2',
      HTTP_2 = 'HTTP/2',
      SPDY_3_1 = 'SPDY/3.1',
    }
    /** Kind of events. Now it is only firewall. */
    export enum Kind {
      FIREWALL = 'firewall',
    }
    /** What type of action was taken. */
    export enum Action {
      UNKNOWN = 'unknown',
      ALLOW = 'allow',
      DROP = 'drop',
      CHALLENGE = 'challenge',
      JSCHALLENGE = 'jschallenge',
      SIMULATE = 'simulate',
      CONNECTIONCLOSE = 'connectionClose',
      LOG = 'log',
    }
    /** Source of the event. */
    export enum Source {
      UNKNOWN = 'unknown',
      ASN = 'asn',
      COUNTRY = 'country',
      IP = 'ip',
      IPRANGE = 'ipRange',
      SECURITYLEVEL = 'securityLevel',
      ZONELOCKDOWN = 'zoneLockdown',
      WAF = 'waf',
      UABLOCK = 'uaBlock',
      RATELIMIT = 'rateLimit',
      FIREWALLRULES = 'firewallRules',
      BIC = 'bic',
      HOT = 'hot',
      L7DDOS = 'l7ddos',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** Cursor positions of the security events. */
  export interface ResultInfoCursors {
    /** The events in the response is after this cursor position. */
    after: string;
    /** The events in the response is before this cursor position. */
    before: string;
  }

  /** The time window of the events. */
  export interface ResultInfoScannedRange {
    /** Start date and time of the events. */
    since: string;
    /** End date and time of the events. */
    until: string;
  }

  /** SecurityEventObjectMatchesItem. */
  export interface SecurityEventObjectMatchesItem {
    /** The ID of the rule that triggered the event, should be considered in the context of source. */
    rule_id: string;
    /** Source of the event. */
    source: string;
    /** What type of action was taken. */
    action: string;
    /** metadata. */
    metadata: JsonObject;
  }

  /** Statistics of results. */
  export interface ResultInfo {
    /** Cursor positions of the security events. */
    cursors: ResultInfoCursors;
    /** The time window of the events. */
    scanned_range: ResultInfoScannedRange;
  }

  /** Security event object. */
  export interface SecurityEventObject {
    /** Ray ID of the request. */
    ray_id: string;
    /** Kind of events. Now it is only firewall. */
    kind: string;
    /** Source of the event. */
    source: string;
    /** What type of action was taken. */
    action: string;
    /** The ID of the rule that triggered the event, should be considered in the context of source. */
    rule_id: string;
    /** The IPv4 or IPv6 address from which the request originated. */
    ip: string;
    /** IP class is a map of client IP to visitor classification. */
    ip_class: string;
    /** The 2-digit country code in which the request originated. */
    country: string;
    /** The 3-letter CF PoP code. */
    colo: string;
    /** The hostname the request attempted to access. */
    host: string;
    /** The HTTP method of the request. */
    method: string;
    /** The protocol of the request. */
    proto: string;
    /** The scheme of the uri. */
    scheme: string;
    /** The client user agent that initiated the request. */
    ua: string;
    /** The URI requested from the hostname. */
    uri: string;
    /** The time that the event occurred. */
    occurred_at: string;
    /** The firewall rules those the event matches. */
    matches: SecurityEventObjectMatchesItem[];
  }

  /** security events objects. */
  export interface SecurityEvents {
    /** Container for response information. */
    result: SecurityEventObject[];
    /** Statistics of results. */
    result_info: ResultInfo;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

}

export = SecurityEventsApiV1;
