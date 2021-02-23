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
 * SSL Certificate
 */

class SslCertificateApiV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'ssl_certificate_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of SslCertificateApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {SslCertificateApiV1}
   */

  public static newInstance(options: UserOptions): SslCertificateApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new SslCertificateApiV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /** cloud resource name. */
  crn: string;

  /** zone identifier. */
  zoneIdentifier: string;

  /**
   * Construct a SslCertificateApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - cloud resource name.
   * @param {string} options.zoneIdentifier - zone identifier.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {SslCertificateApiV1}
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
      this.setServiceUrl(SslCertificateApiV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * sSLCertificate
   ************************/

  /**
   * List all certificates.
   *
   * CIS automatically add an active DNS zone to a universal SSL certificate, shared among multiple customers. Customer
   * may order dedicated certificates for the owning zones. This API list all certificates for a given zone, including
   * shared and dedicated certificates.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - uuid, identify a session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.ListCertificateResp>>}
   */
  public listCertificates(params?: SslCertificateApiV1.ListCertificatesParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.ListCertificateResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listCertificates');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/ssl/certificate_packs',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'X-Correlation-ID': _params.xCorrelationId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Order dedicated certificate.
   *
   * Order a dedicated certificate for a given zone. The zone should be active before placing an order of a dedicated
   * certificate.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.type] - priorities.
   * @param {string[]} [params.hosts] - host name.
   * @param {string} [params.xCorrelationId] - uuid, identify a session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.DedicatedCertificateResp>>}
   */
  public orderCertificate(params?: SslCertificateApiV1.OrderCertificateParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.DedicatedCertificateResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'type': _params.type,
      'hosts': _params.hosts
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'orderCertificate');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/ssl/certificate_packs',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Correlation-ID': _params.xCorrelationId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a certificate.
   *
   * Delete a given certificate.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.certIdentifier - cedrtificate identifier.
   * @param {string} [params.xCorrelationId] - uuid, identify a session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Empty>>}
   */
  public deleteCertificate(params: SslCertificateApiV1.DeleteCertificateParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['certIdentifier'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'cert_identifier': _params.certIdentifier
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteCertificate');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/ssl/certificate_packs/{cert_identifier}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'X-Correlation-ID': _params.xCorrelationId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get SSL setting.
   *
   * For a given zone identifier, get SSL setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.SslSettingResp>>}
   */
  public getSslSetting(params?: SslCertificateApiV1.GetSslSettingParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.SslSettingResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getSslSetting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/ssl',
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
   * Change SSL setting.
   *
   * For a given zone identifier, change SSL setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.SslSettingResp>>}
   */
  public changeSslSetting(params?: SslCertificateApiV1.ChangeSslSettingParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.SslSettingResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'changeSslSetting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/ssl',
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
   * List all custom certificates.
   *
   * For a given zone identifier, list all custom certificates.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.ListCustomCertsResp>>}
   */
  public listCustomCertificates(params?: SslCertificateApiV1.ListCustomCertificatesParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.ListCustomCertsResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listCustomCertificates');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/custom_certificates',
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
   * Upload a custom certificate.
   *
   * For a given zone identifier, upload a custom certificates.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.certificate] - certificates.
   * @param {string} [params.privateKey] - private key.
   * @param {string} [params.bundleMethod] - Methods shown in UI mapping to API: Compatible(ubiquitous),
   * Modern(optimal), User Defined(force).
   * @param {CustomCertReqGeoRestrictions} [params.geoRestrictions] - geo restrictions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.CustomCertResp>>}
   */
  public uploadCustomCertificate(params?: SslCertificateApiV1.UploadCustomCertificateParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.CustomCertResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'certificate': _params.certificate,
      'private_key': _params.privateKey,
      'bundle_method': _params.bundleMethod,
      'geo_restrictions': _params.geoRestrictions
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'uploadCustomCertificate');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/custom_certificates',
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
   * Get custom certificate.
   *
   * For a given zone identifier, get a custom certificates.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customCertId - custom certificate id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.CustomCertResp>>}
   */
  public getCustomCertificate(params: SslCertificateApiV1.GetCustomCertificateParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.CustomCertResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['customCertId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'custom_cert_id': _params.customCertId
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getCustomCertificate');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/custom_certificates/{custom_cert_id}',
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
   * Update custom certificate.
   *
   * For a given zone identifier, update a custom certificates.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customCertId - custom certificate id.
   * @param {string} [params.certificate] - certificates.
   * @param {string} [params.privateKey] - private key.
   * @param {string} [params.bundleMethod] - Methods shown in UI mapping to API: Compatible(ubiquitous),
   * Modern(optimal), User Defined(force).
   * @param {CustomCertReqGeoRestrictions} [params.geoRestrictions] - geo restrictions.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.CustomCertResp>>}
   */
  public updateCustomCertificate(params: SslCertificateApiV1.UpdateCustomCertificateParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.CustomCertResp>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['customCertId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'certificate': _params.certificate,
      'private_key': _params.privateKey,
      'bundle_method': _params.bundleMethod,
      'geo_restrictions': _params.geoRestrictions
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'custom_cert_id': _params.customCertId
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateCustomCertificate');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/custom_certificates/{custom_cert_id}',
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
   * Delete custom certificate.
   *
   * For a given zone identifier, delete a custom certificates.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customCertId - custom certificate id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Empty>>}
   */
  public deleteCustomCertificate(params: SslCertificateApiV1.DeleteCustomCertificateParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['customCertId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'custom_cert_id': _params.customCertId
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteCustomCertificate');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/custom_certificates/{custom_cert_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Set certificate priority.
   *
   * For a given zone identifier, set priority of certificates.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {CertPriorityReqCertificatesItem[]} [params.certificates] - certificates array.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Empty>>}
   */
  public changeCertificatePriority(params?: SslCertificateApiV1.ChangeCertificatePriorityParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Empty>> {
    const _params = Object.assign({}, params);

    const body = {
      'certificates': _params.certificates
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'changeCertificatePriority');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/custom_certificates/prioritize',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get details of universal certificate.
   *
   * For a given zone identifier, get universal certificate.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.UniversalSettingResp>>}
   */
  public getUniversalCertificateSetting(params?: SslCertificateApiV1.GetUniversalCertificateSettingParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.UniversalSettingResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getUniversalCertificateSetting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/ssl/universal/settings',
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
   * Enable or Disable universal certificate.
   *
   * change universal certificate setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.enabled] - enabled.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Empty>>}
   */
  public changeUniversalCertificateSetting(params?: SslCertificateApiV1.ChangeUniversalCertificateSettingParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Empty>> {
    const _params = Object.assign({}, params);

    const body = {
      'enabled': _params.enabled
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'changeUniversalCertificateSetting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/ssl/universal/settings',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get TLS 1.2 only setting.
   *
   * For a given zone identifier, get TLS 1.2 only setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls12SettingResp>>}
   */
  public getTls12Setting(params?: SslCertificateApiV1.GetTls12SettingParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls12SettingResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getTls12Setting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_2_only',
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
   * Set TLS 1.2 setting.
   *
   * For a given zone identifier, set TLS 1.2 setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls12SettingResp>>}
   */
  public changeTls12Setting(params?: SslCertificateApiV1.ChangeTls12SettingParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls12SettingResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'changeTls12Setting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_2_only',
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
   * Get TLS 1.3 setting.
   *
   * For a given zone identifier, get TLS 1.3 setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls13SettingResp>>}
   */
  public getTls13Setting(params?: SslCertificateApiV1.GetTls13SettingParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls13SettingResp>> {
    const _params = Object.assign({}, params);

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getTls13Setting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_3',
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
   * Set TLS 1.3 setting.
   *
   * For a given zone identifier, set TLS 1.3 setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls13SettingResp>>}
   */
  public changeTls13Setting(params?: SslCertificateApiV1.ChangeTls13SettingParams): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls13SettingResp>> {
    const _params = Object.assign({}, params);

    const body = {
      'value': _params.value
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'changeTls13Setting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_3',
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

namespace SslCertificateApiV1 {

  /** Options for the `SslCertificateApiV1` constructor. */
  export interface Options extends UserOptions {

    /** cloud resource name. */
    crn: string;

    /** zone identifier. */
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

  /** Parameters for the `listCertificates` operation. */
  export interface ListCertificatesParams {
    /** uuid, identify a session. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `orderCertificate` operation. */
  export interface OrderCertificateParams {
    /** priorities. */
    type?: OrderCertificateConstants.Type | string;
    /** host name. */
    hosts?: string[];
    /** uuid, identify a session. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `orderCertificate` operation. */
  export namespace OrderCertificateConstants {
    /** priorities. */
    export enum Type {
      DEDICATED = 'dedicated',
    }
  }

  /** Parameters for the `deleteCertificate` operation. */
  export interface DeleteCertificateParams {
    /** cedrtificate identifier. */
    certIdentifier: string;
    /** uuid, identify a session. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSslSetting` operation. */
  export interface GetSslSettingParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `changeSslSetting` operation. */
  export interface ChangeSslSettingParams {
    /** value. */
    value?: ChangeSslSettingConstants.Value | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `changeSslSetting` operation. */
  export namespace ChangeSslSettingConstants {
    /** value. */
    export enum Value {
      OFF = 'off',
      FLEXIBLE = 'flexible',
      FULL = 'full',
      STRICT = 'strict',
    }
  }

  /** Parameters for the `listCustomCertificates` operation. */
  export interface ListCustomCertificatesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `uploadCustomCertificate` operation. */
  export interface UploadCustomCertificateParams {
    /** certificates. */
    certificate?: string;
    /** private key. */
    privateKey?: string;
    /** Methods shown in UI mapping to API: Compatible(ubiquitous), Modern(optimal), User Defined(force). */
    bundleMethod?: UploadCustomCertificateConstants.BundleMethod | string;
    /** geo restrictions. */
    geoRestrictions?: CustomCertReqGeoRestrictions;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `uploadCustomCertificate` operation. */
  export namespace UploadCustomCertificateConstants {
    /** Methods shown in UI mapping to API: Compatible(ubiquitous), Modern(optimal), User Defined(force). */
    export enum BundleMethod {
      UBIQUITOUS = 'ubiquitous',
      OPTIMAL = 'optimal',
      FORCE = 'force',
    }
  }

  /** Parameters for the `getCustomCertificate` operation. */
  export interface GetCustomCertificateParams {
    /** custom certificate id. */
    customCertId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateCustomCertificate` operation. */
  export interface UpdateCustomCertificateParams {
    /** custom certificate id. */
    customCertId: string;
    /** certificates. */
    certificate?: string;
    /** private key. */
    privateKey?: string;
    /** Methods shown in UI mapping to API: Compatible(ubiquitous), Modern(optimal), User Defined(force). */
    bundleMethod?: UpdateCustomCertificateConstants.BundleMethod | string;
    /** geo restrictions. */
    geoRestrictions?: CustomCertReqGeoRestrictions;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateCustomCertificate` operation. */
  export namespace UpdateCustomCertificateConstants {
    /** Methods shown in UI mapping to API: Compatible(ubiquitous), Modern(optimal), User Defined(force). */
    export enum BundleMethod {
      UBIQUITOUS = 'ubiquitous',
      OPTIMAL = 'optimal',
      FORCE = 'force',
    }
  }

  /** Parameters for the `deleteCustomCertificate` operation. */
  export interface DeleteCustomCertificateParams {
    /** custom certificate id. */
    customCertId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `changeCertificatePriority` operation. */
  export interface ChangeCertificatePriorityParams {
    /** certificates array. */
    certificates?: CertPriorityReqCertificatesItem[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getUniversalCertificateSetting` operation. */
  export interface GetUniversalCertificateSettingParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `changeUniversalCertificateSetting` operation. */
  export interface ChangeUniversalCertificateSettingParams {
    /** enabled. */
    enabled?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTls12Setting` operation. */
  export interface GetTls12SettingParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `changeTls12Setting` operation. */
  export interface ChangeTls12SettingParams {
    /** value. */
    value?: ChangeTls12SettingConstants.Value | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `changeTls12Setting` operation. */
  export namespace ChangeTls12SettingConstants {
    /** value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /** Parameters for the `getTls13Setting` operation. */
  export interface GetTls13SettingParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `changeTls13Setting` operation. */
  export interface ChangeTls13SettingParams {
    /** value. */
    value?: ChangeTls13SettingConstants.Value | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `changeTls13Setting` operation. */
  export namespace ChangeTls13SettingConstants {
    /** value. */
    export enum Value {
      ON = 'on',
      OFF = 'off',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** certificate items. */
  export interface CertPriorityReqCertificatesItem {
    /** identifier. */
    id: string;
    /** certificate priority. */
    priority: number;
  }

  /** geo restrictions. */
  export interface CustomCertReqGeoRestrictions {
    /** properties. */
    label: string;
  }

  /** Tls12SettingRespMessagesItem. */
  export interface Tls12SettingRespMessagesItem {
    /** status. */
    status?: string;
  }

  /** result. */
  export interface Tls12SettingRespResult {
    /** identifier. */
    id: string;
    /** value. */
    value: string;
    /** editable. */
    editable: boolean;
    /** modified date. */
    modified_on: string;
  }

  /** result. */
  export interface Tls13SettingRespResult {
    /** identifier. */
    id: string;
    /** value. */
    value: string;
    /** editable. */
    editable: boolean;
    /** modified date. */
    modified_on: string;
  }

  /** result. */
  export interface UniversalSettingRespResult {
    /** enabled. */
    enabled: boolean;
  }

  /** certificate. */
  export interface Certificate {
    /** identifier. */
    id: JsonObject;
    /** host name. */
    hosts: string[];
    /** status. */
    status: string;
  }

  /** custom certificate pack. */
  export interface CustomCertPack {
    /** identifier. */
    id: string;
    /** host name. */
    hosts: string[];
    /** issuer. */
    issuer: string;
    /** signature. */
    signature: string;
    /** status. */
    status: string;
    /** bundle method. */
    bundle_method: string;
    /** zone identifier. */
    zone_id: string;
    /** uploaded date. */
    uploaded_on: string;
    /** modified date. */
    modified_on: string;
    /** expire date. */
    expires_on: string;
    /** priority. */
    priority: number;
  }

  /** custom certificate response. */
  export interface CustomCertResp {
    /** custom certificate pack. */
    result: CustomCertPack;
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: Tls12SettingRespMessagesItem[];
  }

  /** dedicated certificate packs. */
  export interface DedicatedCertificatePack {
    /** identifier. */
    id: string;
    /** certificate type. */
    type: string;
    /** host name. */
    hosts: string[];
    /** certificates. */
    certificates: Certificate[];
    /** primary certificate. */
    primary_certificate: JsonObject;
    /** status. */
    status: string;
  }

  /** certificate response. */
  export interface DedicatedCertificateResp {
    /** dedicated certificate packs. */
    result: DedicatedCertificatePack;
    /** result information. */
    result_info: ResultInfo;
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: Tls12SettingRespMessagesItem[];
  }

  /** certificate response. */
  export interface ListCertificateResp {
    /** certificate packs. */
    result: DedicatedCertificatePack[];
    /** result information. */
    result_info: ResultInfo;
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: Tls12SettingRespMessagesItem[];
  }

  /** custom certificate response. */
  export interface ListCustomCertsResp {
    /** custom certificate packs. */
    result: CustomCertPack[];
    /** result information. */
    result_info: ResultInfo;
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: Tls12SettingRespMessagesItem[];
  }

  /** result information. */
  export interface ResultInfo {
    /** page number. */
    page: number;
    /** per page count. */
    per_page: number;
    /** count. */
    count: number;
    /** total count. */
    total_count: number;
  }

  /** ssl setting. */
  export interface SslSetting {
    /** identifier. */
    id: string;
    /** value. */
    value: string;
    /** editable. */
    editable: boolean;
    /** modified date. */
    modified_on: string;
  }

  /** ssl setting response. */
  export interface SslSettingResp {
    /** success. */
    success: boolean;
    /** ssl setting. */
    result: SslSetting;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: Tls12SettingRespMessagesItem[];
  }

  /** tls 1.2 setting response. */
  export interface Tls12SettingResp {
    /** result. */
    result: Tls12SettingRespResult;
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: Tls12SettingRespMessagesItem[];
  }

  /** tls 1.3 setting response. */
  export interface Tls13SettingResp {
    /** result. */
    result: Tls13SettingRespResult;
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: Tls12SettingRespMessagesItem[];
  }

  /** universal setting response. */
  export interface UniversalSettingResp {
    /** result. */
    result: UniversalSettingRespResult;
    /** success. */
    success: boolean;
    /** errors. */
    errors: string[][];
    /** messages. */
    messages: Tls12SettingRespMessagesItem[];
  }

}

export = SslCertificateApiV1;
