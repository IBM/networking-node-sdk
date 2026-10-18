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
 * CIS Zones Settings
 *
 * API Version: 1.0.1
 */

class ZonesSettingsV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'zones_settings';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of ZonesSettingsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {ZonesSettingsV1}
   */

  public static newInstance(options: UserOptions): ZonesSettingsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new ZonesSettingsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /** Full url-encoded cloud resource name (CRN) of resource instance. */
  crn: string;

  /** Zone identifier. */
  zoneIdentifier: string;

  /**
   * Construct a ZonesSettingsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} options.zoneIdentifier - Zone identifier.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ZonesSettingsV1}
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
      this.setServiceUrl(ZonesSettingsV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * zonesSettings
   ************************/

  /**
   * Get zone DNSSEC.
   *
   * Get DNSSEC setting for a given zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ZonesDnssecResp>>}
   */
  public getZoneDnssec(
    params?: ZonesSettingsV1.GetZoneDnssecParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ZonesDnssecResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getZoneDnssec');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/dnssec',
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
   * Update zone DNSSEC.
   *
   * Update DNSSEC setting for given zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.status] - Status.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ZonesDnssecResp>>}
   */
  public updateZoneDnssec(
    params?: ZonesSettingsV1.UpdateZoneDnssecParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ZonesDnssecResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['status', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'status': _params.status,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateZoneDnssec');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/dnssec',
        method: 'PATCH',
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
   * Get zone CNAME flattening.
   *
   * Get CNAME flattening setting for a given zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ZonesCnameFlatteningResp>>}
   */
  public getZoneCnameFlattening(
    params?: ZonesSettingsV1.GetZoneCnameFlatteningParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ZonesCnameFlatteningResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getZoneCnameFlattening');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/cname_flattening',
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
   * Update zone CNAME flattening.
   *
   * Update CNAME flattening setting for given zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Valid values are "flatten_at_root", "flatten_all". "flatten_at_root" - Flatten
   * CNAME at root domain. This is the default value. "flatten_all" - Flatten all CNAME records under your domain.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ZonesCnameFlatteningResp>>}
   */
  public updateZoneCnameFlattening(
    params?: ZonesSettingsV1.UpdateZoneCnameFlatteningParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ZonesCnameFlatteningResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateZoneCnameFlattening');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/cname_flattening',
        method: 'PATCH',
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
   * Get opportunistic encryption setting.
   *
   * Get opportunistic encryption setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OpportunisticEncryptionResp>>}
   */
  public getOpportunisticEncryption(
    params?: ZonesSettingsV1.GetOpportunisticEncryptionParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OpportunisticEncryptionResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getOpportunisticEncryption');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/opportunistic_encryption',
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
   * Update opportunistic encryption setting.
   *
   * Update opportunistic encryption setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OpportunisticEncryptionResp>>}
   */
  public updateOpportunisticEncryption(
    params?: ZonesSettingsV1.UpdateOpportunisticEncryptionParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OpportunisticEncryptionResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateOpportunisticEncryption');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/opportunistic_encryption',
        method: 'PATCH',
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
   * Get opportunistic onion setting.
   *
   * Get opportunistic onion setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OpportunisticOnionResp>>}
   */
  public getOpportunisticOnion(
    params?: ZonesSettingsV1.GetOpportunisticOnionParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OpportunisticOnionResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getOpportunisticOnion');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/opportunistic_onion',
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
   * Update opportunistic onion setting.
   *
   * Update opportunistic onion setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OpportunisticOnionResp>>}
   */
  public updateOpportunisticOnion(
    params?: ZonesSettingsV1.UpdateOpportunisticOnionParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OpportunisticOnionResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateOpportunisticOnion');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/opportunistic_onion',
        method: 'PATCH',
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
   * Get challenge TTL setting.
   *
   * Get challenge TTL setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ChallengeTtlResp>>}
   */
  public getChallengeTtl(
    params?: ZonesSettingsV1.GetChallengeTtlParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ChallengeTtlResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getChallengeTtl');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/challenge_ttl',
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
   * Update challenge TTL setting.
   *
   * Update challenge TTL setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ChallengeTtlResp>>}
   */
  public updateChallengeTtl(
    params?: ZonesSettingsV1.UpdateChallengeTtlParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ChallengeTtlResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateChallengeTtl');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/challenge_ttl',
        method: 'PATCH',
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
   * Get automatic https rewrites setting.
   *
   * Get automatic https rewrites setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AutomaticHttpsRewritesResp>>}
   */
  public getAutomaticHttpsRewrites(
    params?: ZonesSettingsV1.GetAutomaticHttpsRewritesParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AutomaticHttpsRewritesResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getAutomaticHttpsRewrites');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/automatic_https_rewrites',
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
   * Update automatic https rewrites setting.
   *
   * Update automatic https rewrites setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AutomaticHttpsRewritesResp>>}
   */
  public updateAutomaticHttpsRewrites(
    params?: ZonesSettingsV1.UpdateAutomaticHttpsRewritesParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AutomaticHttpsRewritesResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateAutomaticHttpsRewrites');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/automatic_https_rewrites',
        method: 'PATCH',
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
   * Get true client IP setting.
   *
   * Get true client IP setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TrueClientIpResp>>}
   */
  public getTrueClientIp(
    params?: ZonesSettingsV1.GetTrueClientIpParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TrueClientIpResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getTrueClientIp');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/true_client_ip_header',
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
   * Update true client IP setting.
   *
   * Update true client IP setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TrueClientIpResp>>}
   */
  public updateTrueClientIp(
    params?: ZonesSettingsV1.UpdateTrueClientIpParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TrueClientIpResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateTrueClientIp');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/true_client_ip_header',
        method: 'PATCH',
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
   * Get always use https setting.
   *
   * Get always use https setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AlwaysUseHttpsResp>>}
   */
  public getAlwaysUseHttps(
    params?: ZonesSettingsV1.GetAlwaysUseHttpsParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AlwaysUseHttpsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getAlwaysUseHttps');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/always_use_https',
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
   * Update always use https setting.
   *
   * Update always use https setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AlwaysUseHttpsResp>>}
   */
  public updateAlwaysUseHttps(
    params?: ZonesSettingsV1.UpdateAlwaysUseHttpsParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AlwaysUseHttpsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateAlwaysUseHttps');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/always_use_https',
        method: 'PATCH',
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
   * Get image size optimization setting.
   *
   * Get image size optimization setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageSizeOptimizationResp>>}
   */
  public getImageSizeOptimization(
    params?: ZonesSettingsV1.GetImageSizeOptimizationParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageSizeOptimizationResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getImageSizeOptimization');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/image_size_optimization',
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
   * Update image size optimization setting.
   *
   * Update image size optimization setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Valid values are "lossy", "off", "lossless". "lossy" - The file size of JPEG
   * images is reduced using lossy compression, which may reduce visual quality. "off" - Disable Image Size
   * Optimization. "lossless" - Reduce the size of image files without impacting visual quality.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageSizeOptimizationResp>>}
   */
  public updateImageSizeOptimization(
    params?: ZonesSettingsV1.UpdateImageSizeOptimizationParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageSizeOptimizationResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateImageSizeOptimization');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/image_size_optimization',
        method: 'PATCH',
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
   * Get script load optimization setting.
   *
   * Get script load optimization setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ScriptLoadOptimizationResp>>}
   */
  public getScriptLoadOptimization(
    params?: ZonesSettingsV1.GetScriptLoadOptimizationParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ScriptLoadOptimizationResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getScriptLoadOptimization');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/script_load_optimization',
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
   * Update script load optimization setting.
   *
   * Update script load optimization setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ScriptLoadOptimizationResp>>}
   */
  public updateScriptLoadOptimization(
    params?: ZonesSettingsV1.UpdateScriptLoadOptimizationParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ScriptLoadOptimizationResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateScriptLoadOptimization');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/script_load_optimization',
        method: 'PATCH',
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
   * Get image load optimizationn setting.
   *
   * Get image load optimizationn setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageLoadOptimizationResp>>}
   */
  public getImageLoadOptimization(
    params?: ZonesSettingsV1.GetImageLoadOptimizationParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageLoadOptimizationResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getImageLoadOptimization');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/image_load_optimization',
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
   * Update image load optimizationn setting.
   *
   * Update image load optimizationn setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageLoadOptimizationResp>>}
   */
  public updateImageLoadOptimization(
    params?: ZonesSettingsV1.UpdateImageLoadOptimizationParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageLoadOptimizationResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateImageLoadOptimization');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/image_load_optimization',
        method: 'PATCH',
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
   * Get minify setting.
   *
   * Get minify setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinifyResp>>}
   */
  public getMinify(
    params?: ZonesSettingsV1.GetMinifyParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinifyResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getMinify');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/minify',
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
   * Update minify setting.
   *
   * Update minify setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {MinifySettingValue} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinifyResp>>}
   */
  public updateMinify(
    params?: ZonesSettingsV1.UpdateMinifyParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinifyResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateMinify');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/minify',
        method: 'PATCH',
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
   * Get minimum TLS version setting.
   *
   * Get minimum TLS version setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinTlsVersionResp>>}
   */
  public getMinTlsVersion(
    params?: ZonesSettingsV1.GetMinTlsVersionParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinTlsVersionResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getMinTlsVersion');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/min_tls_version',
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
   * Update minimum TLS version setting.
   *
   * Update minimum TLS version setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinTlsVersionResp>>}
   */
  public updateMinTlsVersion(
    params?: ZonesSettingsV1.UpdateMinTlsVersionParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinTlsVersionResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateMinTlsVersion');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/min_tls_version',
        method: 'PATCH',
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
   * Get IP geolocation setting.
   *
   * Get IP geolocation setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.IpGeolocationResp>>}
   */
  public getIpGeolocation(
    params?: ZonesSettingsV1.GetIpGeolocationParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.IpGeolocationResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getIpGeolocation');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/ip_geolocation',
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
   * Update IP geolocation setting.
   *
   * Update IP geolocation setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.IpGeolocationResp>>}
   */
  public updateIpGeolocation(
    params?: ZonesSettingsV1.UpdateIpGeolocationParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.IpGeolocationResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateIpGeolocation');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/ip_geolocation',
        method: 'PATCH',
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
   * Get server side exclude setting.
   *
   * Get server side exclude setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ServerSideExcludeResp>>}
   */
  public getServerSideExclude(
    params?: ZonesSettingsV1.GetServerSideExcludeParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ServerSideExcludeResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getServerSideExclude');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/server_side_exclude',
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
   * Update server side exclude setting.
   *
   * Update server side exclude setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ServerSideExcludeResp>>}
   */
  public updateServerSideExclude(
    params?: ZonesSettingsV1.UpdateServerSideExcludeParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ServerSideExcludeResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateServerSideExclude');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/server_side_exclude',
        method: 'PATCH',
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
   * Get HTTP strict transport security setting.
   *
   * Get HTTP strict transport security setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.SecurityHeaderResp>>}
   */
  public getSecurityHeader(
    params?: ZonesSettingsV1.GetSecurityHeaderParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.SecurityHeaderResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getSecurityHeader');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/security_header',
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
   * Update HTTP strict transport security setting.
   *
   * Update HTTP strict transport security setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {SecurityHeaderSettingValue} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.SecurityHeaderResp>>}
   */
  public updateSecurityHeader(
    params?: ZonesSettingsV1.UpdateSecurityHeaderParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.SecurityHeaderResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateSecurityHeader');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/security_header',
        method: 'PATCH',
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
   * Get mobile redirect setting.
   *
   * Get mobile redirect setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MobileRedirectResp>>}
   */
  public getMobileRedirect(
    params?: ZonesSettingsV1.GetMobileRedirectParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MobileRedirectResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getMobileRedirect');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/mobile_redirect',
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
   * Update mobile redirect setting.
   *
   * Update mobile redirect setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {MobileRedirecSettingValue} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MobileRedirectResp>>}
   */
  public updateMobileRedirect(
    params?: ZonesSettingsV1.UpdateMobileRedirectParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MobileRedirectResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateMobileRedirect');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/mobile_redirect',
        method: 'PATCH',
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
   * Get prefetch URLs from header setting.
   *
   * Get prefetch URLs from header setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PrefetchPreloadResp>>}
   */
  public getPrefetchPreload(
    params?: ZonesSettingsV1.GetPrefetchPreloadParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PrefetchPreloadResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getPrefetchPreload');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/prefetch_preload',
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
   * Update prefetch URLs from header setting.
   *
   * Update prefetch URLs from header setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PrefetchPreloadResp>>}
   */
  public updatePrefetchPreload(
    params?: ZonesSettingsV1.UpdatePrefetchPreloadParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PrefetchPreloadResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updatePrefetchPreload');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/prefetch_preload',
        method: 'PATCH',
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
   * Get http/2 setting.
   *
   * Get http/2 setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Http2Resp>>}
   */
  public getHttp2(
    params?: ZonesSettingsV1.GetHttp2Params
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Http2Resp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getHttp2');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/http2',
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
   * Update http/2 setting.
   *
   * Update http/2 setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Http2Resp>>}
   */
  public updateHttp2(
    params?: ZonesSettingsV1.UpdateHttp2Params
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Http2Resp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateHttp2');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/http2',
        method: 'PATCH',
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
   * Get http/3 setting.
   *
   * Get http/3 setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Http3Resp>>}
   */
  public getHttp3(
    params?: ZonesSettingsV1.GetHttp3Params
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Http3Resp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getHttp3');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/http3',
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
   * Update http/3 setting.
   *
   * Update http/3 setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Http3Resp>>}
   */
  public updateHttp3(
    params?: ZonesSettingsV1.UpdateHttp3Params
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Http3Resp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateHttp3');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/http3',
        method: 'PATCH',
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
   * Get IPv6 compatibility setting.
   *
   * Get IPv6 compatibility setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Ipv6Resp>>}
   */
  public getIpv6(
    params?: ZonesSettingsV1.GetIpv6Params
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Ipv6Resp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getIpv6');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/ipv6',
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
   * Update IPv6 compatibility setting.
   *
   * Update IPv6 compatibility setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Ipv6Resp>>}
   */
  public updateIpv6(
    params?: ZonesSettingsV1.UpdateIpv6Params
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Ipv6Resp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateIpv6');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/ipv6',
        method: 'PATCH',
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
   * Get web sockets setting.
   *
   * Get web sockets setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WebsocketsResp>>}
   */
  public getWebSockets(
    params?: ZonesSettingsV1.GetWebSocketsParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WebsocketsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getWebSockets');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/websockets',
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
   * Update web sockets setting.
   *
   * Update web sockets setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WebsocketsResp>>}
   */
  public updateWebSockets(
    params?: ZonesSettingsV1.UpdateWebSocketsParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WebsocketsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateWebSockets');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/websockets',
        method: 'PATCH',
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
   * Get pseudo IPv4 setting.
   *
   * Get pseudo IPv4 setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PseudoIpv4Resp>>}
   */
  public getPseudoIpv4(
    params?: ZonesSettingsV1.GetPseudoIpv4Params
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PseudoIpv4Resp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getPseudoIpv4');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/pseudo_ipv4',
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
   * Update pseudo IPv4 setting.
   *
   * Update pseudo IPv4 setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PseudoIpv4Resp>>}
   */
  public updatePseudoIpv4(
    params?: ZonesSettingsV1.UpdatePseudoIpv4Params
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PseudoIpv4Resp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updatePseudoIpv4');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/pseudo_ipv4',
        method: 'PATCH',
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
   * Get response buffering setting.
   *
   * Get response buffering setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ResponseBufferingResp>>}
   */
  public getResponseBuffering(
    params?: ZonesSettingsV1.GetResponseBufferingParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ResponseBufferingResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getResponseBuffering');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/response_buffering',
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
   * Update response buffering setting.
   *
   * Update response buffering setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ResponseBufferingResp>>}
   */
  public updateResponseBuffering(
    params?: ZonesSettingsV1.UpdateResponseBufferingParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ResponseBufferingResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateResponseBuffering');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/response_buffering',
        method: 'PATCH',
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
   * Get hotlink protection setting.
   *
   * Get hotlink protection setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.HotlinkProtectionResp>>}
   */
  public getHotlinkProtection(
    params?: ZonesSettingsV1.GetHotlinkProtectionParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.HotlinkProtectionResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getHotlinkProtection');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/hotlink_protection',
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
   * Update hotlink protection setting.
   *
   * Update hotlink protection setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.HotlinkProtectionResp>>}
   */
  public updateHotlinkProtection(
    params?: ZonesSettingsV1.UpdateHotlinkProtectionParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.HotlinkProtectionResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateHotlinkProtection');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/hotlink_protection',
        method: 'PATCH',
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
   * Get maximum upload size setting.
   *
   * Get maximum upload size setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MaxUploadResp>>}
   */
  public getMaxUpload(
    params?: ZonesSettingsV1.GetMaxUploadParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MaxUploadResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getMaxUpload');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/max_upload',
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
   * Update maximum upload size setting.
   *
   * Update maximum upload size setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.value] - Valid values(in MB) for "max_upload" are 100, 125, 150, 175, 200, 225, 250, 275,
   * 300, 325, 350, 375, 400, 425, 450, 475, 500. Values 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500 are
   * only for Enterprise Plan.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MaxUploadResp>>}
   */
  public updateMaxUpload(
    params?: ZonesSettingsV1.UpdateMaxUploadParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MaxUploadResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateMaxUpload');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/max_upload',
        method: 'PATCH',
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
   * Get TLS Client Auth setting.
   *
   * Get TLS Client Auth setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TlsClientAuthResp>>}
   */
  public getTlsClientAuth(
    params?: ZonesSettingsV1.GetTlsClientAuthParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TlsClientAuthResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getTlsClientAuth');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/tls_client_auth',
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
   * Update TLS Client Auth setting.
   *
   * Update TLS Client Auth setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TlsClientAuthResp>>}
   */
  public updateTlsClientAuth(
    params?: ZonesSettingsV1.UpdateTlsClientAuthParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TlsClientAuthResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateTlsClientAuth');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/tls_client_auth',
        method: 'PATCH',
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
   * Get brotli setting.
   *
   * Get brotli setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BrotliResp>>}
   */
  public getBrotli(
    params?: ZonesSettingsV1.GetBrotliParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BrotliResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getBrotli');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/brotli',
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
   * Update brotli setting.
   *
   * Update brotli setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BrotliResp>>}
   */
  public updateBrotli(
    params?: ZonesSettingsV1.UpdateBrotliParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BrotliResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateBrotli');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/brotli',
        method: 'PATCH',
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
   * Get proxy read timeout setting.
   *
   * Get proxy read timeout setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ProxyReadTimeoutResp>>}
   */
  public getProxyReadTimeout(
    params?: ZonesSettingsV1.GetProxyReadTimeoutParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ProxyReadTimeoutResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getProxyReadTimeout');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/proxy_read_timeout',
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
   * Update proxy read timeout setting.
   *
   * Update proxy read timeout setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ProxyReadTimeoutResp>>}
   */
  public updateProxyReadTimeout(
    params?: ZonesSettingsV1.UpdateProxyReadTimeoutParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ProxyReadTimeoutResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateProxyReadTimeout');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/proxy_read_timeout',
        method: 'PATCH',
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
   * Get browser check setting.
   *
   * Get browser check setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BrowserCheckResp>>}
   */
  public getBrowserCheck(
    params?: ZonesSettingsV1.GetBrowserCheckParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BrowserCheckResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getBrowserCheck');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/browser_check',
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
   * Update browser check setting.
   *
   * Update browser check setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BrowserCheckResp>>}
   */
  public updateBrowserCheck(
    params?: ZonesSettingsV1.UpdateBrowserCheckParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BrowserCheckResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateBrowserCheck');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/browser_check',
        method: 'PATCH',
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
   * Get enable error pages on setting.
   *
   * Get enable error pages on setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginErrorPagePassThruResp>>}
   */
  public getEnableErrorPagesOn(
    params?: ZonesSettingsV1.GetEnableErrorPagesOnParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginErrorPagePassThruResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getEnableErrorPagesOn');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/origin_error_page_pass_thru',
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
   * Update enable error pages on setting.
   *
   * Update enable error pages on setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginErrorPagePassThruResp>>}
   */
  public updateEnableErrorPagesOn(
    params?: ZonesSettingsV1.UpdateEnableErrorPagesOnParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginErrorPagePassThruResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateEnableErrorPagesOn');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/origin_error_page_pass_thru',
        method: 'PATCH',
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
   * Get web application firewall setting.
   *
   * Get web application firewall setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WafResp>>}
   */
  public getWebApplicationFirewall(
    params?: ZonesSettingsV1.GetWebApplicationFirewallParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WafResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getWebApplicationFirewall');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/waf',
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
   * Update web application firewall setting.
   *
   * A Web Application Firewall (WAF) blocks requests that contain malicious content.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WafResp>>}
   */
  public updateWebApplicationFirewall(
    params?: ZonesSettingsV1.UpdateWebApplicationFirewallParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WafResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateWebApplicationFirewall');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/waf',
        method: 'PATCH',
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
   * Get ciphers setting.
   *
   * Get ciphers setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.CiphersResp>>}
   */
  public getCiphers(
    params?: ZonesSettingsV1.GetCiphersParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.CiphersResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getCiphers');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/ciphers',
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
   * Update ciphers setting.
   *
   * Update ciphers setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string[]} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.CiphersResp>>}
   */
  public updateCiphers(
    params?: ZonesSettingsV1.UpdateCiphersParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.CiphersResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateCiphers');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/ciphers',
        method: 'PATCH',
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
   * Get origin max http version setting.
   *
   * Get origin max http version setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginMaxHttpVersionResp>>}
   */
  public getOriginMaxHttpVersion(
    params?: ZonesSettingsV1.GetOriginMaxHttpVersionParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginMaxHttpVersionResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getOriginMaxHttpVersion');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/origin_max_http_version',
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
   * Update origin max http version setting.
   *
   * Update origin max http version setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginMaxHttpVersionResp>>}
   */
  public updateOriginMaxHttpVersion(
    params?: ZonesSettingsV1.UpdateOriginMaxHttpVersionParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginMaxHttpVersionResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateOriginMaxHttpVersion');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/origin_max_http_version',
        method: 'PATCH',
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
   * Get origin post quantum encryption setting.
   *
   * Get origin post quantum encryption setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginPostQuantumEncryptionResp>>}
   */
  public getOriginPostQuantumEncryption(
    params?: ZonesSettingsV1.GetOriginPostQuantumEncryptionParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginPostQuantumEncryptionResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getOriginPostQuantumEncryption');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/cache/origin_post_quantum_encryption',
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
   * Update origin post quantum encryption setting.
   *
   * Update origin post quantum encryption setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Instructs CIS to use Post-Quantum (PQ) key agreement algorithms when connecting to
   * your origin.
   * - `preferred`: Instructs CIS to opportunistically send a Post-Quantum keyshare in the first message to the origin
   * for fastest connections when the origin supports and prefers PQ.
   * - `supported`: The PQ algorithms are advertised but used only when requested by the origin.
   * - `off`: The PQ algorithms are not advertised.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginPostQuantumEncryptionResp>>}
   */
  public updateOriginPostQuantumEncryption(
    params?: ZonesSettingsV1.UpdateOriginPostQuantumEncryptionParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginPostQuantumEncryptionResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateOriginPostQuantumEncryption');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/cache/origin_post_quantum_encryption',
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
   * Retrieves the current setting for log retention.
   *
   * Get the current setting for log retention. This setting is available for Enterprise plans only. If this setting is
   * turned on, then logs from the cloud edge are retained for the customers domain. Otherwise they will be discarded.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} params.zoneIdentifier - Zone identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.LogRetentionResp>>}
   */
  public getLogRetention(
    params: ZonesSettingsV1.GetLogRetentionParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.LogRetentionResp>> {
    const _params = { ...params };
    const _requiredParams = ['crn', 'zoneIdentifier'];
    const _validParams = ['crn', 'zoneIdentifier', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getLogRetention');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/logs/retention',
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
   * Toggles the current setting for log retention.
   *
   * Toggles the current setting for log retention.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} params.zoneIdentifier - Zone identifier.
   * @param {boolean} [params.flag] - True/false value to turn log retention on/off respectively.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.LogRetentionResp>>}
   */
  public updateLogRetention(
    params: ZonesSettingsV1.UpdateLogRetentionParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.LogRetentionResp>> {
    const _params = { ...params };
    const _requiredParams = ['crn', 'zoneIdentifier'];
    const _validParams = ['crn', 'zoneIdentifier', 'flag', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'flag': _params.flag,
    };

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateLogRetention');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/logs/retention',
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
   * Get Bot management settings.
   *
   * Get Bot management settings for a given zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BotMgtResp>>}
   */
  public getBotManagement(
    params?: ZonesSettingsV1.GetBotManagementParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BotMgtResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getBotManagement');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/bot_management',
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
   * Update Bot management settings.
   *
   * Update Bot management settings for given zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.sessionScore] - Set to disable tracking the max bot score during a session using the Bot
   * Management cookie.
   * @param {boolean} [params.enableJs] - Use JavaScript detections to improve bot detection.
   * @param {boolean} [params.useLatestModel] - Automatically update to the newest bot detection models as they are
   * released.
   * @param {string} [params.aiBotsProtection] - Block scrapers and crawlers known to be feeding AI training data.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BotMgtResp>>}
   */
  public updateBotManagement(
    params?: ZonesSettingsV1.UpdateBotManagementParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BotMgtResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['sessionScore', 'enableJs', 'useLatestModel', 'aiBotsProtection', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'session_score': _params.sessionScore,
      'enable_js': _params.enableJs,
      'use_latest_model': _params.useLatestModel,
      'ai_bots_protection': _params.aiBotsProtection,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateBotManagement');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/bot_management',
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
   * Get replace insecure Javascript setting.
   *
   * Get replace insecure Javascript for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ReplaceInsecureJsResp>>}
   */
  public getReplaceInsecureJs(
    params?: ZonesSettingsV1.GetReplaceInsecureJsParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ReplaceInsecureJsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getReplaceInsecureJs');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/replace_insecure_js',
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
   * Update replace insecure Javascript setting.
   *
   * Update replace insecure Javascript setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ReplaceInsecureJsResp>>}
   */
  public updateReplaceInsecureJs(
    params?: ZonesSettingsV1.UpdateReplaceInsecureJsParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ReplaceInsecureJsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateReplaceInsecureJs');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/replace_insecure_js',
        method: 'PATCH',
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
   * Get email address obfuscation setting.
   *
   * Get email address obfuscation for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.EmailObfuscationResp>>}
   */
  public getEmailObfuscation(
    params?: ZonesSettingsV1.GetEmailObfuscationParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.EmailObfuscationResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getEmailObfuscation');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/email_obfuscation',
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
   * Update email address obfuscation setting.
   *
   * Update email address obfuscation setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.EmailObfuscationResp>>}
   */
  public updateEmailObfuscation(
    params?: ZonesSettingsV1.UpdateEmailObfuscationParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.EmailObfuscationResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateEmailObfuscation');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/email_obfuscation',
        method: 'PATCH',
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
   * Get security level setting.
   *
   * Get security level for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.SecurityLevelResp>>}
   */
  public getSecurityLevel(
    params?: ZonesSettingsV1.GetSecurityLevelParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.SecurityLevelResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getSecurityLevel');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/security_level',
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
   * Update security level setting.
   *
   * Update security level setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.SecurityLevelResp>>}
   */
  public updateSecurityLevel(
    params?: ZonesSettingsV1.UpdateSecurityLevelParams
  ): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.SecurityLevelResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'value': _params.value,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'updateSecurityLevel');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/security_level',
        method: 'PATCH',
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

namespace ZonesSettingsV1 {
  /** Options for the `ZonesSettingsV1` constructor. */
  export interface Options extends UserOptions {
    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;
    /** Zone identifier. */
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

  /** Parameters for the `getZoneDnssec` operation. */
  export interface GetZoneDnssecParams extends DefaultParams {
  }

  /** Parameters for the `updateZoneDnssec` operation. */
  export interface UpdateZoneDnssecParams extends DefaultParams {
    /** Status. */
    status?: UpdateZoneDnssecConstants.Status | string;
  }

  /** Constants for the `updateZoneDnssec` operation. */
  export namespace UpdateZoneDnssecConstants {
    /** Status. */
    export enum Status {
      ACTIVE = 'active',
      DISABLED = 'disabled',
    }
  }

  /** Parameters for the `getZoneCnameFlattening` operation. */
  export interface GetZoneCnameFlatteningParams extends DefaultParams {
  }

  /** Parameters for the `updateZoneCnameFlattening` operation. */
  export interface UpdateZoneCnameFlatteningParams extends DefaultParams {
    /** Valid values are "flatten_at_root", "flatten_all". "flatten_at_root" - Flatten CNAME at root domain. This is
     *  the default value. "flatten_all" - Flatten all CNAME records under your domain.
     */
    value?: UpdateZoneCnameFlatteningConstants.Value | string;
  }

  /** Constants for the `updateZoneCnameFlattening` operation. */
  export namespace UpdateZoneCnameFlatteningConstants {
    /** Valid values are "flatten_at_root", "flatten_all". "flatten_at_root" - Flatten CNAME at root domain. This is the default value. "flatten_all" - Flatten all CNAME records under your domain. */
    export enum Value {
      FLATTEN_AT_ROOT = 'flatten_at_root',
      FLATTEN_ALL = 'flatten_all',
    }
  }

  /** Parameters for the `getOpportunisticEncryption` operation. */
  export interface GetOpportunisticEncryptionParams extends DefaultParams {
  }

  /** Parameters for the `updateOpportunisticEncryption` operation. */
  export interface UpdateOpportunisticEncryptionParams extends DefaultParams {
    /** Value. */
    value?: UpdateOpportunisticEncryptionConstants.Value | string;
  }

  /** Constants for the `updateOpportunisticEncryption` operation. */
  export namespace UpdateOpportunisticEncryptionConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getOpportunisticOnion` operation. */
  export interface GetOpportunisticOnionParams extends DefaultParams {
  }

  /** Parameters for the `updateOpportunisticOnion` operation. */
  export interface UpdateOpportunisticOnionParams extends DefaultParams {
    /** Value. */
    value?: UpdateOpportunisticOnionConstants.Value | string;
  }

  /** Constants for the `updateOpportunisticOnion` operation. */
  export namespace UpdateOpportunisticOnionConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getChallengeTtl` operation. */
  export interface GetChallengeTtlParams extends DefaultParams {
  }

  /** Parameters for the `updateChallengeTtl` operation. */
  export interface UpdateChallengeTtlParams extends DefaultParams {
    /** Value. */
    value?: number;
  }

  /** Parameters for the `getAutomaticHttpsRewrites` operation. */
  export interface GetAutomaticHttpsRewritesParams extends DefaultParams {
  }

  /** Parameters for the `updateAutomaticHttpsRewrites` operation. */
  export interface UpdateAutomaticHttpsRewritesParams extends DefaultParams {
    /** Value. */
    value?: UpdateAutomaticHttpsRewritesConstants.Value | string;
  }

  /** Constants for the `updateAutomaticHttpsRewrites` operation. */
  export namespace UpdateAutomaticHttpsRewritesConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getTrueClientIp` operation. */
  export interface GetTrueClientIpParams extends DefaultParams {
  }

  /** Parameters for the `updateTrueClientIp` operation. */
  export interface UpdateTrueClientIpParams extends DefaultParams {
    /** Value. */
    value?: UpdateTrueClientIpConstants.Value | string;
  }

  /** Constants for the `updateTrueClientIp` operation. */
  export namespace UpdateTrueClientIpConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getAlwaysUseHttps` operation. */
  export interface GetAlwaysUseHttpsParams extends DefaultParams {
  }

  /** Parameters for the `updateAlwaysUseHttps` operation. */
  export interface UpdateAlwaysUseHttpsParams extends DefaultParams {
    /** Value. */
    value?: UpdateAlwaysUseHttpsConstants.Value | string;
  }

  /** Constants for the `updateAlwaysUseHttps` operation. */
  export namespace UpdateAlwaysUseHttpsConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getImageSizeOptimization` operation. */
  export interface GetImageSizeOptimizationParams extends DefaultParams {
  }

  /** Parameters for the `updateImageSizeOptimization` operation. */
  export interface UpdateImageSizeOptimizationParams extends DefaultParams {
    /** Valid values are "lossy", "off", "lossless". "lossy" - The file size of JPEG images is reduced using lossy
     *  compression, which may reduce visual quality. "off" - Disable Image Size Optimization. "lossless" - Reduce the
     *  size of image files without impacting visual quality.
     */
    value?: UpdateImageSizeOptimizationConstants.Value | string;
  }

  /** Constants for the `updateImageSizeOptimization` operation. */
  export namespace UpdateImageSizeOptimizationConstants {
    /** Valid values are "lossy", "off", "lossless". "lossy" - The file size of JPEG images is reduced using lossy compression, which may reduce visual quality. "off" - Disable Image Size Optimization. "lossless" - Reduce the size of image files without impacting visual quality. */
    export enum Value {
      OFF = 'off',
      LOSSLESS = 'lossless',
      LOSSY = 'lossy',
    }
  }

  /** Parameters for the `getScriptLoadOptimization` operation. */
  export interface GetScriptLoadOptimizationParams extends DefaultParams {
  }

  /** Parameters for the `updateScriptLoadOptimization` operation. */
  export interface UpdateScriptLoadOptimizationParams extends DefaultParams {
    /** Value. */
    value?: UpdateScriptLoadOptimizationConstants.Value | string;
  }

  /** Constants for the `updateScriptLoadOptimization` operation. */
  export namespace UpdateScriptLoadOptimizationConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getImageLoadOptimization` operation. */
  export interface GetImageLoadOptimizationParams extends DefaultParams {
  }

  /** Parameters for the `updateImageLoadOptimization` operation. */
  export interface UpdateImageLoadOptimizationParams extends DefaultParams {
    /** Value. */
    value?: UpdateImageLoadOptimizationConstants.Value | string;
  }

  /** Constants for the `updateImageLoadOptimization` operation. */
  export namespace UpdateImageLoadOptimizationConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getMinify` operation. */
  export interface GetMinifyParams extends DefaultParams {
  }

  /** Parameters for the `updateMinify` operation. */
  export interface UpdateMinifyParams extends DefaultParams {
    /** Value. */
    value?: MinifySettingValue;
  }

  /** Parameters for the `getMinTlsVersion` operation. */
  export interface GetMinTlsVersionParams extends DefaultParams {
  }

  /** Parameters for the `updateMinTlsVersion` operation. */
  export interface UpdateMinTlsVersionParams extends DefaultParams {
    /** Value. */
    value?: string;
  }

  /** Parameters for the `getIpGeolocation` operation. */
  export interface GetIpGeolocationParams extends DefaultParams {
  }

  /** Parameters for the `updateIpGeolocation` operation. */
  export interface UpdateIpGeolocationParams extends DefaultParams {
    /** Value. */
    value?: UpdateIpGeolocationConstants.Value | string;
  }

  /** Constants for the `updateIpGeolocation` operation. */
  export namespace UpdateIpGeolocationConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getServerSideExclude` operation. */
  export interface GetServerSideExcludeParams extends DefaultParams {
  }

  /** Parameters for the `updateServerSideExclude` operation. */
  export interface UpdateServerSideExcludeParams extends DefaultParams {
    /** Value. */
    value?: UpdateServerSideExcludeConstants.Value | string;
  }

  /** Constants for the `updateServerSideExclude` operation. */
  export namespace UpdateServerSideExcludeConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getSecurityHeader` operation. */
  export interface GetSecurityHeaderParams extends DefaultParams {
  }

  /** Parameters for the `updateSecurityHeader` operation. */
  export interface UpdateSecurityHeaderParams extends DefaultParams {
    /** Value. */
    value?: SecurityHeaderSettingValue;
  }

  /** Parameters for the `getMobileRedirect` operation. */
  export interface GetMobileRedirectParams extends DefaultParams {
  }

  /** Parameters for the `updateMobileRedirect` operation. */
  export interface UpdateMobileRedirectParams extends DefaultParams {
    /** Value. */
    value?: MobileRedirecSettingValue;
  }

  /** Parameters for the `getPrefetchPreload` operation. */
  export interface GetPrefetchPreloadParams extends DefaultParams {
  }

  /** Parameters for the `updatePrefetchPreload` operation. */
  export interface UpdatePrefetchPreloadParams extends DefaultParams {
    /** Value. */
    value?: UpdatePrefetchPreloadConstants.Value | string;
  }

  /** Constants for the `updatePrefetchPreload` operation. */
  export namespace UpdatePrefetchPreloadConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getHttp2` operation. */
  export interface GetHttp2Params extends DefaultParams {
  }

  /** Parameters for the `updateHttp2` operation. */
  export interface UpdateHttp2Params extends DefaultParams {
    /** Value. */
    value?: UpdateHttp2Constants.Value | string;
  }

  /** Constants for the `updateHttp2` operation. */
  export namespace UpdateHttp2Constants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getHttp3` operation. */
  export interface GetHttp3Params extends DefaultParams {
  }

  /** Parameters for the `updateHttp3` operation. */
  export interface UpdateHttp3Params extends DefaultParams {
    /** Value. */
    value?: UpdateHttp3Constants.Value | string;
  }

  /** Constants for the `updateHttp3` operation. */
  export namespace UpdateHttp3Constants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getIpv6` operation. */
  export interface GetIpv6Params extends DefaultParams {
  }

  /** Parameters for the `updateIpv6` operation. */
  export interface UpdateIpv6Params extends DefaultParams {
    /** Value. */
    value?: UpdateIpv6Constants.Value | string;
  }

  /** Constants for the `updateIpv6` operation. */
  export namespace UpdateIpv6Constants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getWebSockets` operation. */
  export interface GetWebSocketsParams extends DefaultParams {
  }

  /** Parameters for the `updateWebSockets` operation. */
  export interface UpdateWebSocketsParams extends DefaultParams {
    /** Value. */
    value?: UpdateWebSocketsConstants.Value | string;
  }

  /** Constants for the `updateWebSockets` operation. */
  export namespace UpdateWebSocketsConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getPseudoIpv4` operation. */
  export interface GetPseudoIpv4Params extends DefaultParams {
  }

  /** Parameters for the `updatePseudoIpv4` operation. */
  export interface UpdatePseudoIpv4Params extends DefaultParams {
    /** Value. */
    value?: UpdatePseudoIpv4Constants.Value | string;
  }

  /** Constants for the `updatePseudoIpv4` operation. */
  export namespace UpdatePseudoIpv4Constants {
    /** Value. */
    export enum Value {
      OFF = 'off',
      ADD_HEADER = 'add_header',
      OVERWRITE_HEADER = 'overwrite_header',
    }
  }

  /** Parameters for the `getResponseBuffering` operation. */
  export interface GetResponseBufferingParams extends DefaultParams {
  }

  /** Parameters for the `updateResponseBuffering` operation. */
  export interface UpdateResponseBufferingParams extends DefaultParams {
    /** Value. */
    value?: UpdateResponseBufferingConstants.Value | string;
  }

  /** Constants for the `updateResponseBuffering` operation. */
  export namespace UpdateResponseBufferingConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getHotlinkProtection` operation. */
  export interface GetHotlinkProtectionParams extends DefaultParams {
  }

  /** Parameters for the `updateHotlinkProtection` operation. */
  export interface UpdateHotlinkProtectionParams extends DefaultParams {
    /** Value. */
    value?: UpdateHotlinkProtectionConstants.Value | string;
  }

  /** Constants for the `updateHotlinkProtection` operation. */
  export namespace UpdateHotlinkProtectionConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getMaxUpload` operation. */
  export interface GetMaxUploadParams extends DefaultParams {
  }

  /** Parameters for the `updateMaxUpload` operation. */
  export interface UpdateMaxUploadParams extends DefaultParams {
    /** Valid values(in MB) for "max_upload" are 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400,
     *  425, 450, 475, 500. Values 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500 are only for Enterprise
     *  Plan.
     */
    value?: number;
  }

  /** Parameters for the `getTlsClientAuth` operation. */
  export interface GetTlsClientAuthParams extends DefaultParams {
  }

  /** Parameters for the `updateTlsClientAuth` operation. */
  export interface UpdateTlsClientAuthParams extends DefaultParams {
    /** Value. */
    value?: UpdateTlsClientAuthConstants.Value | string;
  }

  /** Constants for the `updateTlsClientAuth` operation. */
  export namespace UpdateTlsClientAuthConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getBrotli` operation. */
  export interface GetBrotliParams extends DefaultParams {
  }

  /** Parameters for the `updateBrotli` operation. */
  export interface UpdateBrotliParams extends DefaultParams {
    /** Value. */
    value?: UpdateBrotliConstants.Value | string;
  }

  /** Constants for the `updateBrotli` operation. */
  export namespace UpdateBrotliConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getProxyReadTimeout` operation. */
  export interface GetProxyReadTimeoutParams extends DefaultParams {
  }

  /** Parameters for the `updateProxyReadTimeout` operation. */
  export interface UpdateProxyReadTimeoutParams extends DefaultParams {
    /** Value. */
    value?: number;
  }

  /** Parameters for the `getBrowserCheck` operation. */
  export interface GetBrowserCheckParams extends DefaultParams {
  }

  /** Parameters for the `updateBrowserCheck` operation. */
  export interface UpdateBrowserCheckParams extends DefaultParams {
    /** Value. */
    value?: UpdateBrowserCheckConstants.Value | string;
  }

  /** Constants for the `updateBrowserCheck` operation. */
  export namespace UpdateBrowserCheckConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getEnableErrorPagesOn` operation. */
  export interface GetEnableErrorPagesOnParams extends DefaultParams {
  }

  /** Parameters for the `updateEnableErrorPagesOn` operation. */
  export interface UpdateEnableErrorPagesOnParams extends DefaultParams {
    /** Value. */
    value?: UpdateEnableErrorPagesOnConstants.Value | string;
  }

  /** Constants for the `updateEnableErrorPagesOn` operation. */
  export namespace UpdateEnableErrorPagesOnConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getWebApplicationFirewall` operation. */
  export interface GetWebApplicationFirewallParams extends DefaultParams {
  }

  /** Parameters for the `updateWebApplicationFirewall` operation. */
  export interface UpdateWebApplicationFirewallParams extends DefaultParams {
    /** Value. */
    value?: UpdateWebApplicationFirewallConstants.Value | string;
  }

  /** Constants for the `updateWebApplicationFirewall` operation. */
  export namespace UpdateWebApplicationFirewallConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getCiphers` operation. */
  export interface GetCiphersParams extends DefaultParams {
  }

  /** Parameters for the `updateCiphers` operation. */
  export interface UpdateCiphersParams extends DefaultParams {
    /** Value. */
    value?: UpdateCiphersConstants.Value[] | string[];
  }

  /** Constants for the `updateCiphers` operation. */
  export namespace UpdateCiphersConstants {
    /** Value */
    export enum Value {
      ECDHE_ECDSA_AES128_GCM_SHA256 = 'ECDHE-ECDSA-AES128-GCM-SHA256',
      ECDHE_ECDSA_CHACHA20_POLY1305 = 'ECDHE-ECDSA-CHACHA20-POLY1305',
      ECDHE_RSA_AES128_GCM_SHA256 = 'ECDHE-RSA-AES128-GCM-SHA256',
      ECDHE_RSA_CHACHA20_POLY1305 = 'ECDHE-RSA-CHACHA20-POLY1305',
      ECDHE_ECDSA_AES128_SHA256 = 'ECDHE-ECDSA-AES128-SHA256',
      ECDHE_ECDSA_AES128_SHA = 'ECDHE-ECDSA-AES128-SHA',
      ECDHE_RSA_AES128_SHA256 = 'ECDHE-RSA-AES128-SHA256',
      ECDHE_RSA_AES128_SHA = 'ECDHE-RSA-AES128-SHA',
      AES128_GCM_SHA256 = 'AES128-GCM-SHA256',
      AES128_SHA256 = 'AES128-SHA256',
      AES128_SHA = 'AES128-SHA',
      ECDHE_ECDSA_AES256_GCM_SHA384 = 'ECDHE-ECDSA-AES256-GCM-SHA384',
      ECDHE_ECDSA_AES256_SHA384 = 'ECDHE-ECDSA-AES256-SHA384',
      ECDHE_RSA_AES256_GCM_SHA384 = 'ECDHE-RSA-AES256-GCM-SHA384',
      ECDHE_RSA_AES256_SHA384 = 'ECDHE-RSA-AES256-SHA384',
      ECDHE_RSA_AES256_SHA = 'ECDHE-RSA-AES256-SHA',
      AES256_GCM_SHA384 = 'AES256-GCM-SHA384',
      AES256_SHA256 = 'AES256-SHA256',
      AES256_SHA = 'AES256-SHA',
      DES_CBC3_SHA = 'DES-CBC3-SHA',
    }
  }

  /** Parameters for the `getOriginMaxHttpVersion` operation. */
  export interface GetOriginMaxHttpVersionParams extends DefaultParams {
  }

  /** Parameters for the `updateOriginMaxHttpVersion` operation. */
  export interface UpdateOriginMaxHttpVersionParams extends DefaultParams {
    /** Value. */
    value?: string;
  }

  /** Parameters for the `getOriginPostQuantumEncryption` operation. */
  export interface GetOriginPostQuantumEncryptionParams extends DefaultParams {
  }

  /** Parameters for the `updateOriginPostQuantumEncryption` operation. */
  export interface UpdateOriginPostQuantumEncryptionParams extends DefaultParams {
    /** Instructs CIS to use Post-Quantum (PQ) key agreement algorithms when connecting to your origin.
     *  - `preferred`: Instructs CIS to opportunistically send a Post-Quantum keyshare in the first message to the
     *  origin for fastest connections when the origin supports and prefers PQ.
     *  - `supported`: The PQ algorithms are advertised but used only when requested by the origin.
     *  - `off`: The PQ algorithms are not advertised.
     */
    value?: UpdateOriginPostQuantumEncryptionConstants.Value | string;
  }

  /** Constants for the `updateOriginPostQuantumEncryption` operation. */
  export namespace UpdateOriginPostQuantumEncryptionConstants {
    /** Instructs CIS to use Post-Quantum (PQ) key agreement algorithms when connecting to your origin. - `preferred`: Instructs CIS to opportunistically send a Post-Quantum keyshare in the first message to the origin for fastest connections when the origin supports and prefers PQ. - `supported`: The PQ algorithms are advertised but used only when requested by the origin. - `off`: The PQ algorithms are not advertised. */
    export enum Value {
      PREFERRED = 'preferred',
      SUPPORTED = 'supported',
      OFF = 'off',
    }
  }

  /** Parameters for the `getLogRetention` operation. */
  export interface GetLogRetentionParams extends DefaultParams {
    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;
    /** Zone identifier. */
    zoneIdentifier: string;
  }

  /** Parameters for the `updateLogRetention` operation. */
  export interface UpdateLogRetentionParams extends DefaultParams {
    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;
    /** Zone identifier. */
    zoneIdentifier: string;
    /** True/false value to turn log retention on/off respectively. */
    flag?: boolean;
  }

  /** Parameters for the `getBotManagement` operation. */
  export interface GetBotManagementParams extends DefaultParams {
  }

  /** Parameters for the `updateBotManagement` operation. */
  export interface UpdateBotManagementParams extends DefaultParams {
    /** Set to disable tracking the max bot score during a session using the Bot Management cookie. */
    sessionScore?: boolean;
    /** Use JavaScript detections to improve bot detection. */
    enableJs?: boolean;
    /** Automatically update to the newest bot detection models as they are released. */
    useLatestModel?: boolean;
    /** Block scrapers and crawlers known to be feeding AI training data. */
    aiBotsProtection?: UpdateBotManagementConstants.AiBotsProtection | string;
  }

  /** Constants for the `updateBotManagement` operation. */
  export namespace UpdateBotManagementConstants {
    /** Block scrapers and crawlers known to be feeding AI training data. */
    export enum AiBotsProtection {
      BLOCK = 'block',
      DISABLED = 'disabled',
    }
  }

  /** Parameters for the `getReplaceInsecureJs` operation. */
  export interface GetReplaceInsecureJsParams extends DefaultParams {
  }

  /** Parameters for the `updateReplaceInsecureJs` operation. */
  export interface UpdateReplaceInsecureJsParams extends DefaultParams {
    /** Value. */
    value?: UpdateReplaceInsecureJsConstants.Value | string;
  }

  /** Constants for the `updateReplaceInsecureJs` operation. */
  export namespace UpdateReplaceInsecureJsConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getEmailObfuscation` operation. */
  export interface GetEmailObfuscationParams extends DefaultParams {
  }

  /** Parameters for the `updateEmailObfuscation` operation. */
  export interface UpdateEmailObfuscationParams extends DefaultParams {
    /** Value. */
    value?: UpdateEmailObfuscationConstants.Value | string;
  }

  /** Constants for the `updateEmailObfuscation` operation. */
  export namespace UpdateEmailObfuscationConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getSecurityLevel` operation. */
  export interface GetSecurityLevelParams extends DefaultParams {
  }

  /** Parameters for the `updateSecurityLevel` operation. */
  export interface UpdateSecurityLevelParams extends DefaultParams {
    /** Value. */
    value?: UpdateSecurityLevelConstants.Value | string;
  }

  /** Constants for the `updateSecurityLevel` operation. */
  export namespace UpdateSecurityLevelConstants {
    /** Value. */
    export enum Value {
      ESSENTIALLY_OFF = 'essentially_off',
      LOW = 'low',
      MEDIUM = 'medium',
      HIGH = 'high',
      UNDER_ATTACK = 'under_attack',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * Container for response information.
   */
  export interface AlwaysUseHttpsRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface AutomaticHttpsRewritesRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface BrotliRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface BrowserCheckRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface ChallengeTtlRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: number;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface CiphersRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string[];
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface EmailObfuscationRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on?: string;
  }

  /**
   * Container for response information.
   */
  export interface HotlinkProtectionRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface Http2RespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface Http3RespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface ImageLoadOptimizationRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface ImageSizeOptimizationRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface IpGeolocationRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface Ipv6RespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * LogRetentionRespResult.
   */
  export interface LogRetentionRespResult {
    /** Boolean flag indicating whether or not log retention is turned on or off. */
    flag: boolean;
  }

  /**
   * Container for response information.
   */
  export interface MaxUploadRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: number;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface MinTlsVersionRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface MinifyRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: MinifyRespResultValue;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Value.
   */
  export interface MinifyRespResultValue {
    /** css. */
    css: string;
    /** html. */
    html: string;
    /** js. */
    js: string;
  }

  /**
   * Value.
   */
  export interface MinifySettingValue {
    /** Automatically minify all CSS for your website. */
    css: MinifySettingValue.Constants.Css | string;
    /** Automatically minify all HTML for your website. */
    html: MinifySettingValue.Constants.Html | string;
    /** Automatically minify all JavaScript for your website. */
    js: MinifySettingValue.Constants.Js | string;
  }
  export namespace MinifySettingValue {
    export namespace Constants {
      /** Automatically minify all CSS for your website. */
      export enum Css {
        ON = 'on',
        OFF = 'off',
      }
      /** Automatically minify all HTML for your website. */
      export enum Html {
        ON = 'on',
        OFF = 'off',
      }
      /** Automatically minify all JavaScript for your website. */
      export enum Js {
        ON = 'on',
        OFF = 'off',
      }
    }
  }

  /**
   * Value.
   */
  export interface MobileRedirecSettingValue {
    /** Whether or not the mobile redirection is enabled. */
    status: MobileRedirecSettingValue.Constants.Status | string;
    /** Which subdomain prefix you wish to redirect visitors on mobile devices to. */
    mobile_subdomain: string;
    /** Whether to drop the current page path and redirect to the mobile subdomain URL root or to keep the path and
     *  redirect to the same page on the mobile subdomain.
     */
    strip_uri: boolean;
  }
  export namespace MobileRedirecSettingValue {
    export namespace Constants {
      /** Whether or not the mobile redirection is enabled. */
      export enum Status {
        ON = 'on',
        OFF = 'off',
      }
    }
  }

  /**
   * Container for response information.
   */
  export interface MobileRedirectRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: MobileRedirectRespResultValue;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Value.
   */
  export interface MobileRedirectRespResultValue {
    /** Whether or not the mobile redirection is enabled. */
    status: string;
    /** Which subdomain prefix you wish to redirect visitors on mobile devices to. */
    mobile_subdomain: string;
    /** Whether to drop the current page path and redirect to the mobile subdomain URL root or to keep the path and
     *  redirect to the same page on the mobile subdomain.
     */
    strip_uri: boolean;
  }

  /**
   * Container for response information.
   */
  export interface OpportunisticEncryptionRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface OpportunisticOnionRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface OriginErrorPagePassThruRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface OriginMaxHttpVersionRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface OriginPostQuantumEncryptionRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: OriginPostQuantumEncryptionRespResult.Constants.Value | string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }
  export namespace OriginPostQuantumEncryptionRespResult {
    export namespace Constants {
      /** Value. */
      export enum Value {
        PREFERRED = 'preferred',
        SUPPORTED = 'supported',
        OFF = 'off',
      }
    }
  }

  /**
   * Container for response information.
   */
  export interface PrefetchPreloadRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface ProxyReadTimeoutRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: number;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface PseudoIpv4RespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface ReplaceInsecureJsRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on?: string;
  }

  /**
   * Container for response information.
   */
  export interface ResponseBufferingRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface ScriptLoadOptimizationRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface SecurityHeaderRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: SecurityHeaderRespResultValue;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Value.
   */
  export interface SecurityHeaderRespResultValue {
    /** Strict transport security. */
    strict_transport_security: SecurityHeaderRespResultValueStrictTransportSecurity;
  }

  /**
   * Strict transport security.
   */
  export interface SecurityHeaderRespResultValueStrictTransportSecurity {
    /** Whether or not security header is enabled. */
    enabled: boolean;
    /** Max age in seconds. */
    max_age: number;
    /** Include all subdomains. */
    include_subdomains: boolean;
    /** Whether or not to permit browsers to preload security_header config. */
    preload: boolean;
    /** Whether or not to include 'X-Content-Type-Options:nosniff' header. */
    nosniff: boolean;
  }

  /**
   * Value.
   */
  export interface SecurityHeaderSettingValue {
    /** Strict transport security. */
    strict_transport_security: SecurityHeaderSettingValueStrictTransportSecurity;
  }

  /**
   * Strict transport security.
   */
  export interface SecurityHeaderSettingValueStrictTransportSecurity {
    /** Whether or not security header is enabled. */
    enabled: boolean;
    /** Max age in seconds. */
    max_age: number;
    /** Include all subdomains. */
    include_subdomains: boolean;
    /** Whether or not to permit browsers to preload security_header config. */
    preload: boolean;
    /** Whether or not to include 'X-Content-Type-Options:nosniff' header. */
    nosniff: boolean;
  }

  /**
   * Container for response information.
   */
  export interface SecurityLevelRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on?: string;
  }

  /**
   * Container for response information.
   */
  export interface ServerSideExcludeRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface TlsClientAuthRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface TrueClientIpRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface WafRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface WebsocketsRespResult {
    /** ID. */
    id: string;
    /** Value. */
    value: string;
    /** Editable. */
    editable: boolean;
    /** Modified date. */
    modified_on: string;
  }

  /**
   * Container for response information.
   */
  export interface ZonesDnssecRespResult {
    /** Status. */
    status?: ZonesDnssecRespResult.Constants.Status | string;
    /** Flags. */
    flags?: number;
    /** Algorithm. */
    algorithm?: string;
    /** Key type. */
    key_type?: string;
    /** Digest type. */
    digest_type?: string;
    /** Digest algorithm. */
    digest_algorithm?: string;
    /** Digest. */
    digest?: string;
    /** DS. */
    ds?: string;
    /** Key tag. */
    key_tag?: number;
    /** Public key. */
    public_key?: string;
  }
  export namespace ZonesDnssecRespResult {
    export namespace Constants {
      /** Status. */
      export enum Status {
        ACTIVE = 'active',
        DISABLED = 'disabled',
        PENDING = 'pending',
        PENDING_DISABLED = 'pending-disabled',
        ERROR = 'error',
      }
    }
  }

  /**
   * Always use http response.
   */
  export interface AlwaysUseHttpsResp {
    /** Container for response information. */
    result: AlwaysUseHttpsRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * automatic https rewrite response.
   */
  export interface AutomaticHttpsRewritesResp {
    /** Container for response information. */
    result: AutomaticHttpsRewritesRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Bot Management Response.
   */
  export interface BotMgtResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Bot Management settings. */
    result: BotMgtSettings;
  }

  /**
   * Bot Management settings.
   */
  export interface BotMgtSettings {
    /** Set to disable tracking the max bot score during a session using the Bot Management cookie. */
    session_score?: boolean;
    /** Use JavaScript detections to improve bot detection. */
    enable_js?: boolean;
    /** Automatically update to the newest bot detection models as they are released. */
    use_latest_model?: boolean;
    /** Block scrapers and crawlers known to be feeding AI training data. */
    ai_bots_protection?: BotMgtSettings.Constants.AiBotsProtection | string;
  }
  export namespace BotMgtSettings {
    export namespace Constants {
      /** Block scrapers and crawlers known to be feeding AI training data. */
      export enum AiBotsProtection {
        BLOCK = 'block',
        DISABLED = 'disabled',
      }
    }
  }

  /**
   * Brotli response.
   */
  export interface BrotliResp {
    /** Container for response information. */
    result: BrotliRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Browser Check response.
   */
  export interface BrowserCheckResp {
    /** Container for response information. */
    result: BrowserCheckRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * challenge TTL response.
   */
  export interface ChallengeTtlResp {
    /** Container for response information. */
    result: ChallengeTtlRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Ciphers response.
   */
  export interface CiphersResp {
    /** Container for response information. */
    result: CiphersRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * CNAME Flattening response.
   */
  export interface CnameFlatteningResponse {
    /** id. */
    id?: string;
    /** value. */
    value?: CnameFlatteningResponse.Constants.Value | string;
    /** Date when it is modified. */
    modified_on?: string;
    /** editable. */
    editable?: boolean;
  }
  export namespace CnameFlatteningResponse {
    export namespace Constants {
      /** value. */
      export enum Value {
        FLATTEN_ALL = 'flatten_all',
        FLATTEN_AT_ROOT = 'flatten_at_root',
      }
    }
  }

  /**
   * email address obfuscation response.
   */
  export interface EmailObfuscationResp {
    /** Container for response information. */
    result: EmailObfuscationRespResult;
    /** Result information. */
    result_info?: JsonObject;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Hotlink Protection response.
   */
  export interface HotlinkProtectionResp {
    /** Container for response information. */
    result: HotlinkProtectionRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * HTTP2 Response.
   */
  export interface Http2Resp {
    /** Container for response information. */
    result: Http2RespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * HTTP3 Response.
   */
  export interface Http3Resp {
    /** Container for response information. */
    result: Http3RespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Image Load Optimization response.
   */
  export interface ImageLoadOptimizationResp {
    /** Container for response information. */
    result: ImageLoadOptimizationRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Image size optimization response.
   */
  export interface ImageSizeOptimizationResp {
    /** Container for response information. */
    result: ImageSizeOptimizationRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * IP Geolocation response.
   */
  export interface IpGeolocationResp {
    /** Container for response information. */
    result: IpGeolocationRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * IPv6 Response.
   */
  export interface Ipv6Resp {
    /** Container for response information. */
    result: Ipv6RespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Schema for the response to a GET call for the log retention setting.
   */
  export interface LogRetentionResp {
    /** Boolean flag indicating whether hte API call was successful in retrieving the requested data. */
    success: boolean;
    result: LogRetentionRespResult;
    /** Array of errors messages. */
    errors: string[];
    /** Array of additional messages. */
    messages: string[];
  }

  /**
   * Maximum upload response.
   */
  export interface MaxUploadResp {
    /** Container for response information. */
    result: MaxUploadRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Minimum TLS Version response.
   */
  export interface MinTlsVersionResp {
    /** Container for response information. */
    result: MinTlsVersionRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Minify response.
   */
  export interface MinifyResp {
    /** Container for response information. */
    result: MinifyRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Mobile Redirect Response.
   */
  export interface MobileRedirectResp {
    /** Container for response information. */
    result: MobileRedirectRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Opportunistic encryption response.
   */
  export interface OpportunisticEncryptionResp {
    /** Container for response information. */
    result: OpportunisticEncryptionRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Opportunistic onion response.
   */
  export interface OpportunisticOnionResp {
    /** Container for response information. */
    result: OpportunisticOnionRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * origin error page pass through response.
   */
  export interface OriginErrorPagePassThruResp {
    /** Container for response information. */
    result: OriginErrorPagePassThruRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Origin max http version response.
   */
  export interface OriginMaxHttpVersionResp {
    /** Container for response information. */
    result: OriginMaxHttpVersionRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Origin post quantum encryption response.
   */
  export interface OriginPostQuantumEncryptionResp {
    /** Container for response information. */
    result: OriginPostQuantumEncryptionRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Prefetch & Preload Response.
   */
  export interface PrefetchPreloadResp {
    /** Container for response information. */
    result: PrefetchPreloadRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Proxy read timeout response.
   */
  export interface ProxyReadTimeoutResp {
    /** Container for response information. */
    result: ProxyReadTimeoutRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Pseudo ipv4 response.
   */
  export interface PseudoIpv4Resp {
    /** Container for response information. */
    result: PseudoIpv4RespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Replace insecure Javascript response.
   */
  export interface ReplaceInsecureJsResp {
    /** Container for response information. */
    result: ReplaceInsecureJsRespResult;
    /** Result information. */
    result_info?: JsonObject;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Buffering response.
   */
  export interface ResponseBufferingResp {
    /** Container for response information. */
    result: ResponseBufferingRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Script load optimization response.
   */
  export interface ScriptLoadOptimizationResp {
    /** Container for response information. */
    result: ScriptLoadOptimizationRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Response of Security Header.
   */
  export interface SecurityHeaderResp {
    /** Container for response information. */
    result: SecurityHeaderRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Security level response.
   */
  export interface SecurityLevelResp {
    /** Container for response information. */
    result: SecurityLevelRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Response of server side exclude.
   */
  export interface ServerSideExcludeResp {
    /** Container for response information. */
    result: ServerSideExcludeRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * TLS Client authentication response.
   */
  export interface TlsClientAuthResp {
    /** Container for response information. */
    result: TlsClientAuthRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * true client IP response.
   */
  export interface TrueClientIpResp {
    /** Container for response information. */
    result: TrueClientIpRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * WAF Response.
   */
  export interface WafResp {
    /** Container for response information. */
    result: WafRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Websocket Response.
   */
  export interface WebsocketsResp {
    /** Container for response information. */
    result: WebsocketsRespResult;
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /**
   * Zones CNAME flattening response.
   */
  export interface ZonesCnameFlatteningResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** CNAME Flattening response. */
    result: CnameFlatteningResponse;
  }

  /**
   * Zones DNS Sec Response.
   */
  export interface ZonesDnssecResp {
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: ZonesDnssecRespResult;
  }
}

export = ZonesSettingsV1;
