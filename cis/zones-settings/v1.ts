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
 * CIS Zones Settings
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
   * @param {string} [options.serviceUrl] - The URL for the service
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
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ZonesSettingsV1}
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
  public getZoneDnssec(params?: ZonesSettingsV1.GetZoneDnssecParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ZonesDnssecResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getZoneDnssec');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/dnssec',
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
   * Update zone DNSSEC.
   *
   * Update DNSSEC setting for given zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.status] - Status.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ZonesDnssecResp>>}
   */
  public updateZoneDnssec(params?: ZonesSettingsV1.UpdateZoneDnssecParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ZonesDnssecResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'status': _params.status
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get zone CNAME flattening.
   *
   * Get CNAME flattening setting for a given zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ZonesCnameFlatteningResp>>}
   */
  public getZoneCnameFlattening(params?: ZonesSettingsV1.GetZoneCnameFlatteningParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ZonesCnameFlatteningResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getZoneCnameFlattening');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/cname_flattening',
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
  public updateZoneCnameFlattening(params?: ZonesSettingsV1.UpdateZoneCnameFlatteningParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ZonesCnameFlatteningResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get opportunistic encryption setting.
   *
   * Get opportunistic encryption setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OpportunisticEncryptionResp>>}
   */
  public getOpportunisticEncryption(params?: ZonesSettingsV1.GetOpportunisticEncryptionParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OpportunisticEncryptionResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getOpportunisticEncryption');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/opportunistic_encryption',
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
   * Update opportunistic encryption setting.
   *
   * Update opportunistic encryption setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OpportunisticEncryptionResp>>}
   */
  public updateOpportunisticEncryption(params?: ZonesSettingsV1.UpdateOpportunisticEncryptionParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OpportunisticEncryptionResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get challenge TTL setting.
   *
   * Get challenge TTL setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ChallengeTtlResp>>}
   */
  public getChallengeTtl(params?: ZonesSettingsV1.GetChallengeTtlParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ChallengeTtlResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getChallengeTtl');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/challenge_ttl',
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
   * Update challenge TTL setting.
   *
   * Update challenge TTL setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ChallengeTtlResp>>}
   */
  public updateChallengeTtl(params?: ZonesSettingsV1.UpdateChallengeTtlParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ChallengeTtlResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get automatic https rewrites setting.
   *
   * Get automatic https rewrites setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AutomaticHttpsRewritesResp>>}
   */
  public getAutomaticHttpsRewrites(params?: ZonesSettingsV1.GetAutomaticHttpsRewritesParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AutomaticHttpsRewritesResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getAutomaticHttpsRewrites');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/automatic_https_rewrites',
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
   * Update automatic https rewrites setting.
   *
   * Update automatic https rewrites setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AutomaticHttpsRewritesResp>>}
   */
  public updateAutomaticHttpsRewrites(params?: ZonesSettingsV1.UpdateAutomaticHttpsRewritesParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AutomaticHttpsRewritesResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get true client IP setting.
   *
   * Get true client IP setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TrueClientIpResp>>}
   */
  public getTrueClientIp(params?: ZonesSettingsV1.GetTrueClientIpParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TrueClientIpResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getTrueClientIp');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/true_client_ip_header',
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
   * Update true client IP setting.
   *
   * Update true client IP setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TrueClientIpResp>>}
   */
  public updateTrueClientIp(params?: ZonesSettingsV1.UpdateTrueClientIpParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TrueClientIpResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get always use https setting.
   *
   * Get always use https setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AlwaysUseHttpsResp>>}
   */
  public getAlwaysUseHttps(params?: ZonesSettingsV1.GetAlwaysUseHttpsParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AlwaysUseHttpsResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getAlwaysUseHttps');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/always_use_https',
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
   * Update always use https setting.
   *
   * Update always use https setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AlwaysUseHttpsResp>>}
   */
  public updateAlwaysUseHttps(params?: ZonesSettingsV1.UpdateAlwaysUseHttpsParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.AlwaysUseHttpsResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get image size optimization setting.
   *
   * Get image size optimization setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageSizeOptimizationResp>>}
   */
  public getImageSizeOptimization(params?: ZonesSettingsV1.GetImageSizeOptimizationParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageSizeOptimizationResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getImageSizeOptimization');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/image_size_optimization',
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
  public updateImageSizeOptimization(params?: ZonesSettingsV1.UpdateImageSizeOptimizationParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageSizeOptimizationResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get script load optimization setting.
   *
   * Get script load optimization setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ScriptLoadOptimizationResp>>}
   */
  public getScriptLoadOptimization(params?: ZonesSettingsV1.GetScriptLoadOptimizationParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ScriptLoadOptimizationResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getScriptLoadOptimization');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/script_load_optimization',
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
   * Update script load optimization setting.
   *
   * Update script load optimization setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ScriptLoadOptimizationResp>>}
   */
  public updateScriptLoadOptimization(params?: ZonesSettingsV1.UpdateScriptLoadOptimizationParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ScriptLoadOptimizationResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get image load optimizationn setting.
   *
   * Get image load optimizationn setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageLoadOptimizationResp>>}
   */
  public getImageLoadOptimization(params?: ZonesSettingsV1.GetImageLoadOptimizationParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageLoadOptimizationResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getImageLoadOptimization');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/image_load_optimization',
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
   * Update image load optimizationn setting.
   *
   * Update image load optimizationn setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageLoadOptimizationResp>>}
   */
  public updateImageLoadOptimization(params?: ZonesSettingsV1.UpdateImageLoadOptimizationParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ImageLoadOptimizationResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get minify setting.
   *
   * Get minify setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinifyResp>>}
   */
  public getMinify(params?: ZonesSettingsV1.GetMinifyParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinifyResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getMinify');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/minify',
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
   * Update minify setting.
   *
   * Update minify setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {MinifySettingValue} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinifyResp>>}
   */
  public updateMinify(params?: ZonesSettingsV1.UpdateMinifyParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinifyResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get minimum TLS version setting.
   *
   * Get minimum TLS version setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinTlsVersionResp>>}
   */
  public getMinTlsVersion(params?: ZonesSettingsV1.GetMinTlsVersionParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinTlsVersionResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getMinTlsVersion');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/min_tls_version',
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
   * Update minimum TLS version setting.
   *
   * Update minimum TLS version setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinTlsVersionResp>>}
   */
  public updateMinTlsVersion(params?: ZonesSettingsV1.UpdateMinTlsVersionParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MinTlsVersionResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get IP geolocation setting.
   *
   * Get IP geolocation setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.IpGeolocationResp>>}
   */
  public getIpGeolocation(params?: ZonesSettingsV1.GetIpGeolocationParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.IpGeolocationResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getIpGeolocation');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/ip_geolocation',
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
   * Update IP geolocation setting.
   *
   * Update IP geolocation setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.IpGeolocationResp>>}
   */
  public updateIpGeolocation(params?: ZonesSettingsV1.UpdateIpGeolocationParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.IpGeolocationResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get server side exclude setting.
   *
   * Get server side exclude setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ServerSideExcludeResp>>}
   */
  public getServerSideExclude(params?: ZonesSettingsV1.GetServerSideExcludeParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ServerSideExcludeResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getServerSideExclude');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/server_side_exclude',
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
   * Update server side exclude setting.
   *
   * Update server side exclude setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ServerSideExcludeResp>>}
   */
  public updateServerSideExclude(params?: ZonesSettingsV1.UpdateServerSideExcludeParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ServerSideExcludeResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get HTTP strict transport security setting.
   *
   * Get HTTP strict transport security setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.SecurityHeaderResp>>}
   */
  public getSecurityHeader(params?: ZonesSettingsV1.GetSecurityHeaderParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.SecurityHeaderResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getSecurityHeader');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/security_header',
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
   * Update HTTP strict transport security setting.
   *
   * Update HTTP strict transport security setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {SecurityHeaderSettingValue} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.SecurityHeaderResp>>}
   */
  public updateSecurityHeader(params?: ZonesSettingsV1.UpdateSecurityHeaderParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.SecurityHeaderResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get mobile redirect setting.
   *
   * Get mobile redirect setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MobileRedirectResp>>}
   */
  public getMobileRedirect(params?: ZonesSettingsV1.GetMobileRedirectParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MobileRedirectResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getMobileRedirect');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/mobile_redirect',
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
   * Update mobile redirect setting.
   *
   * Update mobile redirect setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {MobileRedirecSettingValue} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MobileRedirectResp>>}
   */
  public updateMobileRedirect(params?: ZonesSettingsV1.UpdateMobileRedirectParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MobileRedirectResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get prefetch URLs from header setting.
   *
   * Get prefetch URLs from header setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PrefetchPreloadResp>>}
   */
  public getPrefetchPreload(params?: ZonesSettingsV1.GetPrefetchPreloadParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PrefetchPreloadResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getPrefetchPreload');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/prefetch_preload',
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
   * Update prefetch URLs from header setting.
   *
   * Update prefetch URLs from header setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PrefetchPreloadResp>>}
   */
  public updatePrefetchPreload(params?: ZonesSettingsV1.UpdatePrefetchPreloadParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PrefetchPreloadResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get http/2 setting.
   *
   * Get http/2 setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Http2Resp>>}
   */
  public getHttp2(params?: ZonesSettingsV1.GetHttp2Params): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Http2Resp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getHttp2');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/http2',
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
   * Update http/2 setting.
   *
   * Update http/2 setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Http2Resp>>}
   */
  public updateHttp2(params?: ZonesSettingsV1.UpdateHttp2Params): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Http2Resp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get IPv6 compatibility setting.
   *
   * Get IPv6 compatibility setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Ipv6Resp>>}
   */
  public getIpv6(params?: ZonesSettingsV1.GetIpv6Params): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Ipv6Resp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getIpv6');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/ipv6',
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
   * Update IPv6 compatibility setting.
   *
   * Update IPv6 compatibility setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Ipv6Resp>>}
   */
  public updateIpv6(params?: ZonesSettingsV1.UpdateIpv6Params): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.Ipv6Resp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get web sockets setting.
   *
   * Get web sockets setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WebsocketsResp>>}
   */
  public getWebSockets(params?: ZonesSettingsV1.GetWebSocketsParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WebsocketsResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getWebSockets');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/websockets',
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
   * Update web sockets setting.
   *
   * Update web sockets setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WebsocketsResp>>}
   */
  public updateWebSockets(params?: ZonesSettingsV1.UpdateWebSocketsParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WebsocketsResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get pseudo IPv4 setting.
   *
   * Get pseudo IPv4 setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PseudoIpv4Resp>>}
   */
  public getPseudoIpv4(params?: ZonesSettingsV1.GetPseudoIpv4Params): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PseudoIpv4Resp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getPseudoIpv4');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/pseudo_ipv4',
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
   * Update pseudo IPv4 setting.
   *
   * Update pseudo IPv4 setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PseudoIpv4Resp>>}
   */
  public updatePseudoIpv4(params?: ZonesSettingsV1.UpdatePseudoIpv4Params): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.PseudoIpv4Resp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get response buffering setting.
   *
   * Get response buffering setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ResponseBufferingResp>>}
   */
  public getResponseBuffering(params?: ZonesSettingsV1.GetResponseBufferingParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ResponseBufferingResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getResponseBuffering');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/response_buffering',
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
   * Update response buffering setting.
   *
   * Update response buffering setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ResponseBufferingResp>>}
   */
  public updateResponseBuffering(params?: ZonesSettingsV1.UpdateResponseBufferingParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.ResponseBufferingResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get hotlink protection setting.
   *
   * Get hotlink protection setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.HotlinkProtectionResp>>}
   */
  public getHotlinkProtection(params?: ZonesSettingsV1.GetHotlinkProtectionParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.HotlinkProtectionResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getHotlinkProtection');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/hotlink_protection',
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
   * Update hotlink protection setting.
   *
   * Update hotlink protection setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.HotlinkProtectionResp>>}
   */
  public updateHotlinkProtection(params?: ZonesSettingsV1.UpdateHotlinkProtectionParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.HotlinkProtectionResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get maximum upload size setting.
   *
   * Get maximum upload size setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MaxUploadResp>>}
   */
  public getMaxUpload(params?: ZonesSettingsV1.GetMaxUploadParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MaxUploadResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getMaxUpload');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/max_upload',
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
  public updateMaxUpload(params?: ZonesSettingsV1.UpdateMaxUploadParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.MaxUploadResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get TLS Client Auth setting.
   *
   * Get TLS Client Auth setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TlsClientAuthResp>>}
   */
  public getTlsClientAuth(params?: ZonesSettingsV1.GetTlsClientAuthParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TlsClientAuthResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getTlsClientAuth');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/tls_client_auth',
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
   * Update TLS Client Auth setting.
   *
   * Update TLS Client Auth setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TlsClientAuthResp>>}
   */
  public updateTlsClientAuth(params?: ZonesSettingsV1.UpdateTlsClientAuthParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.TlsClientAuthResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get browser check setting.
   *
   * Get browser check setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BrowserCheckResp>>}
   */
  public getBrowserCheck(params?: ZonesSettingsV1.GetBrowserCheckParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BrowserCheckResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getBrowserCheck');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/browser_check',
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
   * Update browser check setting.
   *
   * Update browser check setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BrowserCheckResp>>}
   */
  public updateBrowserCheck(params?: ZonesSettingsV1.UpdateBrowserCheckParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.BrowserCheckResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get enable error pages on setting.
   *
   * Get enable error pages on setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginErrorPagePassThruResp>>}
   */
  public getEnableErrorPagesOn(params?: ZonesSettingsV1.GetEnableErrorPagesOnParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginErrorPagePassThruResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getEnableErrorPagesOn');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/origin_error_page_pass_thru',
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
   * Update enable error pages on setting.
   *
   * Update enable error pages on setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginErrorPagePassThruResp>>}
   */
  public updateEnableErrorPagesOn(params?: ZonesSettingsV1.UpdateEnableErrorPagesOnParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.OriginErrorPagePassThruResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get web application firewall setting.
   *
   * Get web application firewall setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WafResp>>}
   */
  public getWebApplicationFirewall(params?: ZonesSettingsV1.GetWebApplicationFirewallParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WafResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getWebApplicationFirewall');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/waf',
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
   * Update web application firewall setting.
   *
   * A Web Application Firewall (WAF) blocks requests that contain malicious content.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WafResp>>}
   */
  public updateWebApplicationFirewall(params?: ZonesSettingsV1.UpdateWebApplicationFirewallParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.WafResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get ciphers setting.
   *
   * Get ciphers setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.CiphersResp>>}
   */
  public getCiphers(params?: ZonesSettingsV1.GetCiphersParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.CiphersResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(ZonesSettingsV1.DEFAULT_SERVICE_NAME, 'v1', 'getCiphers');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/ciphers',
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
   * Update ciphers setting.
   *
   * Update ciphers setting for a zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string[]} [params.value] - Value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ZonesSettingsV1.Response<ZonesSettingsV1.CiphersResp>>}
   */
  public updateCiphers(params?: ZonesSettingsV1.UpdateCiphersParams): Promise<ZonesSettingsV1.Response<ZonesSettingsV1.CiphersResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
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

namespace ZonesSettingsV1 {

  /** Options for the `ZonesSettingsV1` constructor. */
  export interface Options extends UserOptions {

    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;

    /** Zone identifier. */
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

  /** Parameters for the `getZoneDnssec` operation. */
  export interface GetZoneDnssecParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateZoneDnssec` operation. */
  export interface UpdateZoneDnssecParams {
    /** Status. */
    status?: UpdateZoneDnssecConstants.Status | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetZoneCnameFlatteningParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateZoneCnameFlattening` operation. */
  export interface UpdateZoneCnameFlatteningParams {
    /** Valid values are "flatten_at_root", "flatten_all". "flatten_at_root" - Flatten CNAME at root domain. This is
     *  the default value. "flatten_all" - Flatten all CNAME records under your domain.
     */
    value?: UpdateZoneCnameFlatteningConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetOpportunisticEncryptionParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateOpportunisticEncryption` operation. */
  export interface UpdateOpportunisticEncryptionParams {
    /** Value. */
    value?: UpdateOpportunisticEncryptionConstants.Value | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateOpportunisticEncryption` operation. */
  export namespace UpdateOpportunisticEncryptionConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getChallengeTtl` operation. */
  export interface GetChallengeTtlParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateChallengeTtl` operation. */
  export interface UpdateChallengeTtlParams {
    /** Value. */
    value?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAutomaticHttpsRewrites` operation. */
  export interface GetAutomaticHttpsRewritesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAutomaticHttpsRewrites` operation. */
  export interface UpdateAutomaticHttpsRewritesParams {
    /** Value. */
    value?: UpdateAutomaticHttpsRewritesConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetTrueClientIpParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateTrueClientIp` operation. */
  export interface UpdateTrueClientIpParams {
    /** Value. */
    value?: UpdateTrueClientIpConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetAlwaysUseHttpsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAlwaysUseHttps` operation. */
  export interface UpdateAlwaysUseHttpsParams {
    /** Value. */
    value?: UpdateAlwaysUseHttpsConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetImageSizeOptimizationParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateImageSizeOptimization` operation. */
  export interface UpdateImageSizeOptimizationParams {
    /** Valid values are "lossy", "off", "lossless". "lossy" - The file size of JPEG images is reduced using lossy
     *  compression, which may reduce visual quality. "off" - Disable Image Size Optimization. "lossless" - Reduce the
     *  size of image files without impacting visual quality.
     */
    value?: UpdateImageSizeOptimizationConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetScriptLoadOptimizationParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateScriptLoadOptimization` operation. */
  export interface UpdateScriptLoadOptimizationParams {
    /** Value. */
    value?: UpdateScriptLoadOptimizationConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetImageLoadOptimizationParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateImageLoadOptimization` operation. */
  export interface UpdateImageLoadOptimizationParams {
    /** Value. */
    value?: UpdateImageLoadOptimizationConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetMinifyParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateMinify` operation. */
  export interface UpdateMinifyParams {
    /** Value. */
    value?: MinifySettingValue;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getMinTlsVersion` operation. */
  export interface GetMinTlsVersionParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateMinTlsVersion` operation. */
  export interface UpdateMinTlsVersionParams {
    /** Value. */
    value?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getIpGeolocation` operation. */
  export interface GetIpGeolocationParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateIpGeolocation` operation. */
  export interface UpdateIpGeolocationParams {
    /** Value. */
    value?: UpdateIpGeolocationConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetServerSideExcludeParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateServerSideExclude` operation. */
  export interface UpdateServerSideExcludeParams {
    /** Value. */
    value?: UpdateServerSideExcludeConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetSecurityHeaderParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSecurityHeader` operation. */
  export interface UpdateSecurityHeaderParams {
    /** Value. */
    value?: SecurityHeaderSettingValue;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getMobileRedirect` operation. */
  export interface GetMobileRedirectParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateMobileRedirect` operation. */
  export interface UpdateMobileRedirectParams {
    /** Value. */
    value?: MobileRedirecSettingValue;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getPrefetchPreload` operation. */
  export interface GetPrefetchPreloadParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updatePrefetchPreload` operation. */
  export interface UpdatePrefetchPreloadParams {
    /** Value. */
    value?: UpdatePrefetchPreloadConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetHttp2Params {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateHttp2` operation. */
  export interface UpdateHttp2Params {
    /** Value. */
    value?: UpdateHttp2Constants.Value | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateHttp2` operation. */
  export namespace UpdateHttp2Constants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getIpv6` operation. */
  export interface GetIpv6Params {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateIpv6` operation. */
  export interface UpdateIpv6Params {
    /** Value. */
    value?: UpdateIpv6Constants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetWebSocketsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateWebSockets` operation. */
  export interface UpdateWebSocketsParams {
    /** Value. */
    value?: UpdateWebSocketsConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetPseudoIpv4Params {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updatePseudoIpv4` operation. */
  export interface UpdatePseudoIpv4Params {
    /** Value. */
    value?: UpdatePseudoIpv4Constants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetResponseBufferingParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateResponseBuffering` operation. */
  export interface UpdateResponseBufferingParams {
    /** Value. */
    value?: UpdateResponseBufferingConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetHotlinkProtectionParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateHotlinkProtection` operation. */
  export interface UpdateHotlinkProtectionParams {
    /** Value. */
    value?: UpdateHotlinkProtectionConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetMaxUploadParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateMaxUpload` operation. */
  export interface UpdateMaxUploadParams {
    /** Valid values(in MB) for "max_upload" are 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400,
     *  425, 450, 475, 500. Values 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500 are only for Enterprise
     *  Plan.
     */
    value?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTlsClientAuth` operation. */
  export interface GetTlsClientAuthParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateTlsClientAuth` operation. */
  export interface UpdateTlsClientAuthParams {
    /** Value. */
    value?: UpdateTlsClientAuthConstants.Value | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateTlsClientAuth` operation. */
  export namespace UpdateTlsClientAuthConstants {
    /** Value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getBrowserCheck` operation. */
  export interface GetBrowserCheckParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateBrowserCheck` operation. */
  export interface UpdateBrowserCheckParams {
    /** Value. */
    value?: UpdateBrowserCheckConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetEnableErrorPagesOnParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateEnableErrorPagesOn` operation. */
  export interface UpdateEnableErrorPagesOnParams {
    /** Value. */
    value?: UpdateEnableErrorPagesOnConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetWebApplicationFirewallParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateWebApplicationFirewall` operation. */
  export interface UpdateWebApplicationFirewallParams {
    /** Value. */
    value?: UpdateWebApplicationFirewallConstants.Value | string;
    headers?: OutgoingHttpHeaders;
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
  export interface GetCiphersParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateCiphers` operation. */
  export interface UpdateCiphersParams {
    /** Value. */
    value?: UpdateCiphersConstants.Value | string[];
    headers?: OutgoingHttpHeaders;
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

  /*************************
   * model interfaces
   ************************/

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Value. */
  export interface MinifyRespResultValue {
    /** css. */
    css: string;
    /** html. */
    html: string;
    /** js. */
    js: string;
  }

  /** Value. */
  export interface MinifySettingValue {
    /** Automatically minify all CSS for your website. */
    css: string;
    /** Automatically minify all HTML for your website. */
    html: string;
    /** Automatically minify all JavaScript for your website. */
    js: string;
  }

  /** Value. */
  export interface MobileRedirecSettingValue {
    /** Whether or not the mobile redirection is enabled. */
    status: string;
    /** Which subdomain prefix you wish to redirect visitors on mobile devices to. */
    mobile_subdomain: string;
    /** Whether to drop the current page path and redirect to the mobile subdomain URL root or to keep the path and
     *  redirect to the same page on the mobile subdomain.
     */
    strip_uri: boolean;
  }

  /** Container for response information. */
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

  /** Value. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Value. */
  export interface SecurityHeaderRespResultValue {
    /** Strict transport security. */
    strict_transport_security: SecurityHeaderRespResultValueStrictTransportSecurity;
  }

  /** Strict transport security. */
  export interface SecurityHeaderRespResultValueStrictTransportSecurity {
    /** Whether or not security header is enabled. */
    enabled: boolean;
    /** Max age in seconds. */
    max_age: number;
    /** Include all subdomains. */
    include_subdomains: boolean;
    /** Whether or not to include 'X-Content-Type-Options:nosniff' header. */
    nosniff: boolean;
  }

  /** Value. */
  export interface SecurityHeaderSettingValue {
    /** Strict transport security. */
    strict_transport_security: SecurityHeaderSettingValueStrictTransportSecurity;
  }

  /** Strict transport security. */
  export interface SecurityHeaderSettingValueStrictTransportSecurity {
    /** Whether or not security header is enabled. */
    enabled: boolean;
    /** Max age in seconds. */
    max_age: number;
    /** Include all subdomains. */
    include_subdomains: boolean;
    /** Whether or not to include 'X-Content-Type-Options:nosniff' header. */
    nosniff: boolean;
  }

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
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

  /** Container for response information. */
  export interface ZonesDnssecRespResult {
    /** Status. */
    status?: string;
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

  /** Always use http response. */
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

  /** automatic https rewrite response. */
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

  /** Browser Check response. */
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

  /** challenge TTL response. */
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

  /** Ciphers response. */
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

  /** CNAME Flattening response. */
  export interface CnameFlatteningResponse {
    /** id. */
    id?: string;
    /** value. */
    value?: string;
    /** Date when it is modified. */
    modified_on?: string;
    /** editable. */
    editable?: boolean;
  }

  /** Hotlink Protection response. */
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

  /** HTTP2 Response. */
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

  /** Image Load Optimization response. */
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

  /** Image size optimization response. */
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

  /** IP Geolocation response. */
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

  /** IPv6 Response. */
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

  /** Maximum upload response. */
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

  /** Minimum TLS Version response. */
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

  /** Minify response. */
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

  /** Mobile Redirect Response. */
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

  /** Oppertunistic encryption response. */
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

  /** origin error page pass through response. */
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

  /** Prefetch & Preload Response. */
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

  /** Pseudo ipv4 response. */
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

  /** Buffering response. */
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

  /** Script load optimization response. */
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

  /** Response of Security Header. */
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

  /** Response of server side exclude. */
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

  /** TLS Client authentication response. */
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

  /** true client IP response. */
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

  /** WAF Response. */
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

  /** Websocket Response. */
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

  /** Zones CNAME flattening response. */
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

  /** Zones DNS Sec Response. */
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
