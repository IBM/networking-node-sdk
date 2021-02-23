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
 * Zone Firewall Access Rules
 */

class ZoneFirewallAccessRulesV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'zone_firewall_access_rules';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of ZoneFirewallAccessRulesV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {ZoneFirewallAccessRulesV1}
   */

  public static newInstance(options: UserOptions): ZoneFirewallAccessRulesV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new ZoneFirewallAccessRulesV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** Full url-encoded cloud resource name (CRN) of resource instance. */
  crn: string;

  /** Zone identifier of the zone for which acess rule is created. */
  zoneIdentifier: string;

  /**
   * Construct a ZoneFirewallAccessRulesV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} options.zoneIdentifier - Zone identifier of the zone for which acess rule is created.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ZoneFirewallAccessRulesV1}
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
      this.setServiceUrl(ZoneFirewallAccessRulesV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * zoneFirewallAccessRules
   ************************/

  /**
   * List all firewall access rules.
   *
   * List all firewall access rules for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.notes] - Search access rules by note.(Not case sensitive).
   * @param {string} [params.mode] - Search access rules by mode.
   * @param {string} [params.configurationTarget] - Search access rules by configuration target.
   * @param {string} [params.configurationValue] - Search access rules by configuration value which can be IP, IPrange,
   * or country code.
   * @param {number} [params.page] - Page number of paginated results.
   * @param {number} [params.perPage] - Maximum number of access rules per page.
   * @param {string} [params.order] - Field by which to order list of access rules.
   * @param {string} [params.direction] - Direction in which to order results [ascending/descending order].
   * @param {string} [params.match] - Whether to match all (all) or atleast one search parameter (any).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneFirewallAccessRulesV1.Response<ZoneFirewallAccessRulesV1.ListZoneAccessRulesResp>>}
   */
  public listAllZoneAccessRules(params?: ZoneFirewallAccessRulesV1.ListAllZoneAccessRulesParams): Promise<ZoneFirewallAccessRulesV1.Response<ZoneFirewallAccessRulesV1.ListZoneAccessRulesResp>> {
    const _params = Object.assign({}, params);

    const query = {
      'notes': _params.notes,
      'mode': _params.mode,
      'configuration.target': _params.configurationTarget,
      'configuration.value': _params.configurationValue,
      'page': _params.page,
      'per_page': _params.perPage,
      'order': _params.order,
      'direction': _params.direction,
      'match': _params.match
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneFirewallAccessRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'listAllZoneAccessRules');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/access_rules/rules',
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
   * Create firewall access rule.
   *
   * Create a new firewall access rule for a given zone under a service instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.mode] - The action to apply to a matched request.
   * @param {string} [params.notes] - A personal note about the rule. Typically used as a reminder or explanation for
   * the rule.
   * @param {ZoneAccessRuleInputConfiguration} [params.configuration] - Configuration object specifying access rule.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneFirewallAccessRulesV1.Response<ZoneFirewallAccessRulesV1.ZoneAccessRuleResp>>}
   */
  public createZoneAccessRule(params?: ZoneFirewallAccessRulesV1.CreateZoneAccessRuleParams): Promise<ZoneFirewallAccessRulesV1.Response<ZoneFirewallAccessRulesV1.ZoneAccessRuleResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'mode': _params.mode,
      'notes': _params.notes,
      'configuration': _params.configuration
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneFirewallAccessRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'createZoneAccessRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/access_rules/rules',
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
   * Delete firewall access rule.
   *
   * Delete an access rule given its id.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessruleIdentifier - Identifier of the access rule to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneFirewallAccessRulesV1.Response<ZoneFirewallAccessRulesV1.DeleteZoneAccessRuleResp>>}
   */
  public deleteZoneAccessRule(params: ZoneFirewallAccessRulesV1.DeleteZoneAccessRuleParams): Promise<ZoneFirewallAccessRulesV1.Response<ZoneFirewallAccessRulesV1.DeleteZoneAccessRuleResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['accessruleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'accessrule_identifier': _params.accessruleIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneFirewallAccessRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteZoneAccessRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/access_rules/rules/{accessrule_identifier}',
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

  /**
   * Get firewall access rule.
   *
   * Get the details of a firewall access rule for a given zone under a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessruleIdentifier - Identifier of firewall access rule for the given zone.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneFirewallAccessRulesV1.Response<ZoneFirewallAccessRulesV1.ZoneAccessRuleResp>>}
   */
  public getZoneAccessRule(params: ZoneFirewallAccessRulesV1.GetZoneAccessRuleParams): Promise<ZoneFirewallAccessRulesV1.Response<ZoneFirewallAccessRulesV1.ZoneAccessRuleResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['accessruleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'accessrule_identifier': _params.accessruleIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneFirewallAccessRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'getZoneAccessRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/access_rules/rules/{accessrule_identifier}',
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
   * Update firewall access rule.
   *
   * Update an existing firewall access rule for a given zone under a given service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessruleIdentifier - Identifier of firewall access rule.
   * @param {string} [params.mode] - The action to apply to a matched request.
   * @param {string} [params.notes] - A personal note about the rule. Typically used as a reminder or explanation for
   * the rule.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZoneFirewallAccessRulesV1.Response<ZoneFirewallAccessRulesV1.ZoneAccessRuleResp>>}
   */
  public updateZoneAccessRule(params: ZoneFirewallAccessRulesV1.UpdateZoneAccessRuleParams): Promise<ZoneFirewallAccessRulesV1.Response<ZoneFirewallAccessRulesV1.ZoneAccessRuleResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['accessruleIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'mode': _params.mode,
      'notes': _params.notes
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'accessrule_identifier': _params.accessruleIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZoneFirewallAccessRulesV1.DEFAULT_SERVICE_NAME, 'v1', 'updateZoneAccessRule');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/firewall/access_rules/rules/{accessrule_identifier}',
        method: 'PATCH',
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

}

/*************************
 * interfaces
 ************************/

namespace ZoneFirewallAccessRulesV1 {

  /** Options for the `ZoneFirewallAccessRulesV1` constructor. */
  export interface Options extends UserOptions {

    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;

    /** Zone identifier of the zone for which acess rule is created. */
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

  /** Parameters for the `listAllZoneAccessRules` operation. */
  export interface ListAllZoneAccessRulesParams {
    /** Search access rules by note.(Not case sensitive). */
    notes?: string;
    /** Search access rules by mode. */
    mode?: ListAllZoneAccessRulesConstants.Mode | string;
    /** Search access rules by configuration target. */
    configurationTarget?: ListAllZoneAccessRulesConstants.ConfigurationTarget | string;
    /** Search access rules by configuration value which can be IP, IPrange, or country code. */
    configurationValue?: string;
    /** Page number of paginated results. */
    page?: number;
    /** Maximum number of access rules per page. */
    perPage?: number;
    /** Field by which to order list of access rules. */
    order?: ListAllZoneAccessRulesConstants.Order | string;
    /** Direction in which to order results [ascending/descending order]. */
    direction?: ListAllZoneAccessRulesConstants.Direction | string;
    /** Whether to match all (all) or atleast one search parameter (any). */
    match?: ListAllZoneAccessRulesConstants.Match | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listAllZoneAccessRules` operation. */
  export namespace ListAllZoneAccessRulesConstants {
    /** Search access rules by mode. */
    export enum Mode {
      BLOCK = 'block',
      CHALLENGE = 'challenge',
      WHITELIST = 'whitelist',
      JS_CHALLENGE = 'js_challenge',
    }
    /** Search access rules by configuration target. */
    export enum ConfigurationTarget {
      IP = 'ip',
      IP_RANGE = 'ip_range',
      ASN = 'asn',
      COUNTRY = 'country',
    }
    /** Field by which to order list of access rules. */
    export enum Order {
      CONFIGURATION_TARGET = 'configuration.target',
      CONFIGURATION_VALUE = 'configuration.value',
      MODE = 'mode',
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

  /** Parameters for the `createZoneAccessRule` operation. */
  export interface CreateZoneAccessRuleParams {
    /** The action to apply to a matched request. */
    mode?: CreateZoneAccessRuleConstants.Mode | string;
    /** A personal note about the rule. Typically used as a reminder or explanation for the rule. */
    notes?: string;
    /** Configuration object specifying access rule. */
    configuration?: ZoneAccessRuleInputConfiguration;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createZoneAccessRule` operation. */
  export namespace CreateZoneAccessRuleConstants {
    /** The action to apply to a matched request. */
    export enum Mode {
      BLOCK = 'block',
      CHALLENGE = 'challenge',
      WHITELIST = 'whitelist',
      JS_CHALLENGE = 'js_challenge',
    }
  }

  /** Parameters for the `deleteZoneAccessRule` operation. */
  export interface DeleteZoneAccessRuleParams {
    /** Identifier of the access rule to be deleted. */
    accessruleIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getZoneAccessRule` operation. */
  export interface GetZoneAccessRuleParams {
    /** Identifier of firewall access rule for the given zone. */
    accessruleIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateZoneAccessRule` operation. */
  export interface UpdateZoneAccessRuleParams {
    /** Identifier of firewall access rule. */
    accessruleIdentifier: string;
    /** The action to apply to a matched request. */
    mode?: UpdateZoneAccessRuleConstants.Mode | string;
    /** A personal note about the rule. Typically used as a reminder or explanation for the rule. */
    notes?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateZoneAccessRule` operation. */
  export namespace UpdateZoneAccessRuleConstants {
    /** The action to apply to a matched request. */
    export enum Mode {
      BLOCK = 'block',
      CHALLENGE = 'challenge',
      WHITELIST = 'whitelist',
      JS_CHALLENGE = 'js_challenge',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** Container for response information. */
  export interface DeleteZoneAccessRuleRespResult {
    /** ID. */
    id: string;
  }

  /** Statistics of results. */
  export interface ListZoneAccessRulesRespResultInfo {
    /** Page number. */
    page: number;
    /** Number of results per page. */
    per_page: number;
    /** Number of results. */
    count: number;
    /** Total number of results. */
    total_count: number;
  }

  /** Configuration object specifying access rule. */
  export interface ZoneAccessRuleInputConfiguration {
    /** The request property to target. */
    target: string;
    /** The value for the selected target.For ip the value is a valid ip address.For ip_range the value specifies ip
     *  range limited to /16 and /24. For asn the value is an AS number. For country the value is a country code for the
     *  country.
     */
    value: string;
  }

  /** configuration. */
  export interface ZoneAccessRuleObjectConfiguration {
    /** target. */
    target: string;
    /** Value for the given target. For ip the value is a valid ip address.For ip_range the value specifies ip range
     *  limited to /16 and /24. For asn the value is an AS number. For country the value is a country code for the
     *  country.
     */
    value: string;
  }

  /** The scope definition of the access rule. */
  export interface ZoneAccessRuleObjectScope {
    /** The scope of the access rule, indicating if its applicable at zone level("zone") or inherited from instance
     *  level("account").
     */
    type: string;
  }

  /** delete access rule response. */
  export interface DeleteZoneAccessRuleResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: DeleteZoneAccessRuleRespResult;
  }

  /** list access rules response. */
  export interface ListZoneAccessRulesResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: ZoneAccessRuleObject[];
    /** Statistics of results. */
    result_info: ListZoneAccessRulesRespResultInfo;
  }

  /** access rule object. */
  export interface ZoneAccessRuleObject {
    /** Identifier of the firewall access rule. */
    id: string;
    /** A personal note about the rule. Typically used as a reminder or explanation for the rule. */
    notes: string;
    /** List of modes that are allowed. */
    allowed_modes: string[];
    /** The action to be applied to a request matching the access rule. */
    mode: string;
    /** The scope definition of the access rule. */
    scope?: ZoneAccessRuleObjectScope;
    /** The creation date-time of the firewall access rule. */
    created_on: string;
    /** The modification date-time of the firewall access rule. */
    modified_on: string;
    /** configuration. */
    configuration: ZoneAccessRuleObjectConfiguration;
  }

  /** access rule response. */
  export interface ZoneAccessRuleResp {
    /** Operation success flag. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** access rule object. */
    result: ZoneAccessRuleObject;
  }

}

export = ZoneFirewallAccessRulesV1;
