/**
 * (C) Copyright IBM Corp. 2023.
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
 * IBM OpenAPI SDK Code Generator Version: 3.82.1-2082d402-20231115-195014
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  SDKLogger,
  UserOptions,
  getAuthenticatorFromEnvironment,
  getNewLogger,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../../lib/common';

/**
 * SSL Certificate
 *
 * API Version: 1.0.0
 */

class SslCertificateApiV1 extends BaseService {
  static _logger: SDKLogger = getNewLogger('SslCertificateApiV1');

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
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {SslCertificateApiV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const _requiredParams = ['crn', 'zoneIdentifier'];
    const _validationErrors = validateParams(options, _requiredParams, null);
    if (_validationErrors) {
      throw _validationErrors;
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
  public listCertificates(
    params?: SslCertificateApiV1.ListCertificatesParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.ListCertificateResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listCertificates');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/ssl/certificate_packs',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Order dedicated certificate.
   *
   * Order a dedicated certificate for a given zone. The zone should be active before placing an order of a dedicated
   * certificate. Deprecated, please use Advanced Certificate Pack.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.type] - priorities.
   * @param {string[]} [params.hosts] - host name.
   * @param {string} [params.xCorrelationId] - uuid, identify a session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.DedicatedCertificateResp>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public orderCertificate(
    params?: SslCertificateApiV1.OrderCertificateParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.DedicatedCertificateResp>> {
    SslCertificateApiV1._logger.warn('A deprecated operation has been invoked: orderCertificate');
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['type', 'hosts', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'hosts': _params.hosts,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
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
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a certificate.
   *
   * Delete a given certificate. Deprecated, please use Advanced Certificate Pack.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.certIdentifier - cedrtificate identifier.
   * @param {string} [params.xCorrelationId] - uuid, identify a session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.EmptyObject>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public deleteCertificate(
    params: SslCertificateApiV1.DeleteCertificateParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.EmptyObject>> {
    SslCertificateApiV1._logger.warn('A deprecated operation has been invoked: deleteCertificate');
    const _params = { ...params };
    const _requiredParams = ['certIdentifier'];
    const _validParams = ['certIdentifier', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'cert_identifier': _params.certIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteCertificate');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/ssl/certificate_packs/{cert_identifier}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get SSL setting.
   *
   * For a given zone identifier, get SSL setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.SslSettingResp>>}
   */
  public getSslSetting(
    params?: SslCertificateApiV1.GetSslSettingParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.SslSettingResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getSslSetting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/ssl',
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
   * Change SSL setting.
   *
   * For a given zone identifier, change SSL setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.SslSettingResp>>}
   */
  public changeSslSetting(
    params?: SslCertificateApiV1.ChangeSslSettingParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.SslSettingResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'headers'];
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

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'changeSslSetting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/ssl',
        method: 'PATCH',
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
   * List all custom certificates.
   *
   * For a given zone identifier, list all custom certificates.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.ListCustomCertsResp>>}
   */
  public listCustomCertificates(
    params?: SslCertificateApiV1.ListCustomCertificatesParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.ListCustomCertsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listCustomCertificates');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/custom_certificates',
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
  public uploadCustomCertificate(
    params?: SslCertificateApiV1.UploadCustomCertificateParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.CustomCertResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['certificate', 'privateKey', 'bundleMethod', 'geoRestrictions', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'certificate': _params.certificate,
      'private_key': _params.privateKey,
      'bundle_method': _params.bundleMethod,
      'geo_restrictions': _params.geoRestrictions,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
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
   * Get custom certificate.
   *
   * For a given zone identifier, get a custom certificates.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customCertId - custom certificate id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.CustomCertResp>>}
   */
  public getCustomCertificate(
    params: SslCertificateApiV1.GetCustomCertificateParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.CustomCertResp>> {
    const _params = { ...params };
    const _requiredParams = ['customCertId'];
    const _validParams = ['customCertId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'custom_cert_id': _params.customCertId,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getCustomCertificate');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/custom_certificates/{custom_cert_id}',
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
  public updateCustomCertificate(
    params: SslCertificateApiV1.UpdateCustomCertificateParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.CustomCertResp>> {
    const _params = { ...params };
    const _requiredParams = ['customCertId'];
    const _validParams = ['customCertId', 'certificate', 'privateKey', 'bundleMethod', 'geoRestrictions', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'certificate': _params.certificate,
      'private_key': _params.privateKey,
      'bundle_method': _params.bundleMethod,
      'geo_restrictions': _params.geoRestrictions,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'custom_cert_id': _params.customCertId,
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
   * Delete custom certificate.
   *
   * For a given zone identifier, delete a custom certificates.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customCertId - custom certificate id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.EmptyObject>>}
   */
  public deleteCustomCertificate(
    params: SslCertificateApiV1.DeleteCustomCertificateParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['customCertId'];
    const _validParams = ['customCertId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'custom_cert_id': _params.customCertId,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteCustomCertificate');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/custom_certificates/{custom_cert_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Set certificate priority.
   *
   * For a given zone identifier, set priority of certificates.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {CertPriorityReqCertificatesItem[]} [params.certificates] - certificates array.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.EmptyObject>>}
   */
  public changeCertificatePriority(
    params?: SslCertificateApiV1.ChangeCertificatePriorityParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['certificates', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'certificates': _params.certificates,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
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
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get details of universal certificate.
   *
   * For a given zone identifier, get universal certificate.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.UniversalSettingResp>>}
   */
  public getUniversalCertificateSetting(
    params?: SslCertificateApiV1.GetUniversalCertificateSettingParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.UniversalSettingResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getUniversalCertificateSetting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/ssl/universal/settings',
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
   * Enable or Disable universal certificate.
   *
   * change universal certificate setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.enabled] - enabled.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.EmptyObject>>}
   */
  public changeUniversalCertificateSetting(
    params?: SslCertificateApiV1.ChangeUniversalCertificateSettingParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['enabled', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'enabled': _params.enabled,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
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
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get TLS 1.2 only setting.
   *
   * For a given zone identifier, get TLS 1.2 only setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls12SettingResp>>}
   */
  public getTls12Setting(
    params?: SslCertificateApiV1.GetTls12SettingParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls12SettingResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getTls12Setting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_2_only',
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
   * Set TLS 1.2 setting.
   *
   * For a given zone identifier, set TLS 1.2 setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls12SettingResp>>}
   */
  public changeTls12Setting(
    params?: SslCertificateApiV1.ChangeTls12SettingParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls12SettingResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'headers'];
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

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'changeTls12Setting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_2_only',
        method: 'PATCH',
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
   * Get TLS 1.3 setting.
   *
   * For a given zone identifier, get TLS 1.3 setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls13SettingResp>>}
   */
  public getTls13Setting(
    params?: SslCertificateApiV1.GetTls13SettingParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls13SettingResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getTls13Setting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_3',
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
   * Set TLS 1.3 setting.
   *
   * For a given zone identifier, set TLS 1.3 setting.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.value] - value.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls13SettingResp>>}
   */
  public changeTls13Setting(
    params?: SslCertificateApiV1.ChangeTls13SettingParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.Tls13SettingResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['value', 'headers'];
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

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'changeTls13Setting');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/settings/tls_1_3',
        method: 'PATCH',
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
  /*************************
   * advancedCertificatePack
   ************************/

  /**
   * Order advanced certificate.
   *
   * Order an advanced certificate pack for a given zone. The zone should be active before ordering of an advanced
   * certificate pack.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.type] - certificate type.
   * @param {string[]} [params.hosts] - host name.
   * @param {string} [params.validationMethod] - validation Method selected for the order.
   * @param {number} [params.validityDays] - validity Days selected for the order.
   * @param {string} [params.certificateAuthority] - Certificate Authority selected for the order. Selecting Let's
   * Encrypt will reduce customization of other fields: validation_method must be 'txt', validity_days must be 90,
   * cloudflare_branding must be omitted, and hosts must contain only 2 entries, one for the zone name and one for the
   * subdomain wildcard of the zone name (e.g. example.com, *.example.com).
   * @param {boolean} [params.cloudflareBranding] - Whether or not to add Cloudflare Branding for the order. This will
   * add sni.cloudflaressl.com as the Common Name if set true.
   * @param {string} [params.xCorrelationId] - uuid, identify a session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.AdvancedCertInitResp>>}
   */
  public orderAdvancedCertificate(
    params?: SslCertificateApiV1.OrderAdvancedCertificateParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.AdvancedCertInitResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['type', 'hosts', 'validationMethod', 'validityDays', 'certificateAuthority', 'cloudflareBranding', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'hosts': _params.hosts,
      'validation_method': _params.validationMethod,
      'validity_days': _params.validityDays,
      'certificate_authority': _params.certificateAuthority,
      'cloudflare_branding': _params.cloudflareBranding,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'orderAdvancedCertificate');

    const parameters = {
      options: {
        url: '/v2/{crn}/zones/{zone_identifier}/ssl/certificate_packs/order',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Restart validation for an advanced certificate pack.
   *
   * Restart validation for an advanced certificate pack. This is only a validation operation for a Certificate Pack in
   * a validation_timed_out status.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.certIdentifier - cedrtificate identifier.
   * @param {string} [params.xCorrelationId] - uuid, identify a session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.AdvancedCertInitResp>>}
   */
  public patchCertificate(
    params: SslCertificateApiV1.PatchCertificateParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.AdvancedCertInitResp>> {
    const _params = { ...params };
    const _requiredParams = ['certIdentifier'];
    const _validParams = ['certIdentifier', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'cert_identifier': _params.certIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'patchCertificate');

    const parameters = {
      options: {
        url: '/v2/{crn}/zones/{zone_identifier}/ssl/certificate_packs/{cert_identifier}',
        method: 'PATCH',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a certificate.
   *
   * Delete an advanced certificate pack.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.certIdentifier - cedrtificate identifier.
   * @param {string} [params.xCorrelationId] - uuid, identify a session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.EmptyObject>>}
   */
  public deleteCertificateV2(
    params: SslCertificateApiV1.DeleteCertificateV2Params
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['certIdentifier'];
    const _validParams = ['certIdentifier', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'cert_identifier': _params.certIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteCertificateV2');

    const parameters = {
      options: {
        url: '/v2/{crn}/zones/{zone_identifier}/ssl/certificate_packs/{cert_identifier}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get SSL Verification Info for a Zone.
   *
   * Get SSL Verification Info for a Zone.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - uuid, identify a session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.SslVerificationResp>>}
   */
  public getSslVerification(
    params?: SslCertificateApiV1.GetSslVerificationParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.SslVerificationResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getSslVerification');

    const parameters = {
      options: {
        url: '/v2/{crn}/zones/{zone_identifier}/ssl/verification',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * originCertificate
   ************************/

  /**
   * List all Origin Certificates.
   *
   * List all existing CIS-issued Certificates for a given domain.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} params.zoneIdentifier - zone identifier.
   * @param {string} [params.xCorrelationId] - uuid, identify a session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.ListOriginCertificatesResp>>}
   */
  public listOriginCertificates(
    params: SslCertificateApiV1.ListOriginCertificatesParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.ListOriginCertificatesResp>> {
    const _params = { ...params };
    const _requiredParams = ['crn', 'zoneIdentifier'];
    const _validParams = ['crn', 'zoneIdentifier', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listOriginCertificates');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_certificates',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a CIS-signed certificate.
   *
   * Create a CIS-signed certificate.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} params.zoneIdentifier - zone identifier.
   * @param {string[]} [params.hostnames] - Array of hostnames or wildcard names (e.g., *.example.com) bound to the
   * certificate.
   * @param {string} [params.requestType] - Signature type desired on certificate.
   * @param {number} [params.requestedValidity] - The number of days for which the certificate should be valid.
   * @param {string} [params.csr] - The Certificate Signing Request (CSR).
   * @param {string} [params.xCorrelationId] - uuid, identify a session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.OriginCertificateResp>>}
   */
  public createOriginCertificate(
    params: SslCertificateApiV1.CreateOriginCertificateParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.OriginCertificateResp>> {
    const _params = { ...params };
    const _requiredParams = ['crn', 'zoneIdentifier'];
    const _validParams = ['crn', 'zoneIdentifier', 'hostnames', 'requestType', 'requestedValidity', 'csr', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'hostnames': _params.hostnames,
      'request_type': _params.requestType,
      'requested_validity': _params.requestedValidity,
      'csr': _params.csr,
    };

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'createOriginCertificate');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_certificates',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Revoke a created Origin Certificate for a domain.
   *
   * Revoke a created Origin certificate.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} params.zoneIdentifier - zone identifier.
   * @param {string} params.certIdentifier - cedrtificate identifier.
   * @param {string} [params.xCorrelationId] - uuid, identify a session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.RevokeOriginCertificateResp>>}
   */
  public revokeOriginCertificate(
    params: SslCertificateApiV1.RevokeOriginCertificateParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.RevokeOriginCertificateResp>> {
    const _params = { ...params };
    const _requiredParams = ['crn', 'zoneIdentifier', 'certIdentifier'];
    const _validParams = ['crn', 'zoneIdentifier', 'certIdentifier', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
      'cert_identifier': _params.certIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'revokeOriginCertificate');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_certificates/{cert_identifier}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get an existing Origin certificate.
   *
   * Get an existing Origin certificate by its serial number.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.crn - Full url-encoded cloud resource name (CRN) of resource instance.
   * @param {string} params.zoneIdentifier - zone identifier.
   * @param {string} params.certIdentifier - cedrtificate identifier.
   * @param {string} [params.xCorrelationId] - uuid, identify a session.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SslCertificateApiV1.Response<SslCertificateApiV1.OriginCertificateResp>>}
   */
  public getOriginCertificate(
    params: SslCertificateApiV1.GetOriginCertificateParams
  ): Promise<SslCertificateApiV1.Response<SslCertificateApiV1.OriginCertificateResp>> {
    const _params = { ...params };
    const _requiredParams = ['crn', 'zoneIdentifier', 'certIdentifier'];
    const _validParams = ['crn', 'zoneIdentifier', 'certIdentifier', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': _params.crn,
      'zone_identifier': _params.zoneIdentifier,
      'cert_identifier': _params.certIdentifier,
    };

    const sdkHeaders = getSdkHeaders(SslCertificateApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getOriginCertificate');

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_certificates/{cert_identifier}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-ID': _params.xCorrelationId,
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

namespace SslCertificateApiV1 {
  /** Options for the `SslCertificateApiV1` constructor. */
  export interface Options extends UserOptions {
    /** cloud resource name. */
    crn: string;
    /** zone identifier. */
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
  export interface EmptyObject { }

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

  /** Parameters for the `orderAdvancedCertificate` operation. */
  export interface OrderAdvancedCertificateParams {
    /** certificate type. */
    type?: OrderAdvancedCertificateConstants.Type | string;
    /** host name. */
    hosts?: string[];
    /** validation Method selected for the order. */
    validationMethod?: OrderAdvancedCertificateConstants.ValidationMethod | string;
    /** validity Days selected for the order. */
    validityDays?: number;
    /** Certificate Authority selected for the order. Selecting Let's Encrypt will reduce customization of other
     *  fields: validation_method must be 'txt', validity_days must be 90, cloudflare_branding must be omitted, and
     *  hosts must contain only 2 entries, one for the zone name and one for the subdomain wildcard of the zone name
     *  (e.g. example.com, *.example.com).
     */
    certificateAuthority?: OrderAdvancedCertificateConstants.CertificateAuthority | string;
    /** Whether or not to add Cloudflare Branding for the order. This will add sni.cloudflaressl.com as the Common
     *  Name if set true.
     */
    cloudflareBranding?: boolean;
    /** uuid, identify a session. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `orderAdvancedCertificate` operation. */
  export namespace OrderAdvancedCertificateConstants {
    /** certificate type. */
    export enum Type {
      ADVANCED = 'advanced',
    }
    /** validation Method selected for the order. */
    export enum ValidationMethod {
      TXT = 'txt',
      HTTP = 'http',
      EMAIL = 'email',
    }
    /** Certificate Authority selected for the order. Selecting Let's Encrypt will reduce customization of other fields: validation_method must be 'txt', validity_days must be 90, cloudflare_branding must be omitted, and hosts must contain only 2 entries, one for the zone name and one for the subdomain wildcard of the zone name (e.g. example.com, *.example.com). */
    export enum CertificateAuthority {
      LETS_ENCRYPT = 'lets_encrypt',
      GOOGLE = 'google',
    }
  }

  /** Parameters for the `patchCertificate` operation. */
  export interface PatchCertificateParams {
    /** cedrtificate identifier. */
    certIdentifier: string;
    /** uuid, identify a session. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCertificateV2` operation. */
  export interface DeleteCertificateV2Params {
    /** cedrtificate identifier. */
    certIdentifier: string;
    /** uuid, identify a session. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSslVerification` operation. */
  export interface GetSslVerificationParams {
    /** uuid, identify a session. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listOriginCertificates` operation. */
  export interface ListOriginCertificatesParams {
    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;
    /** zone identifier. */
    zoneIdentifier: string;
    /** uuid, identify a session. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createOriginCertificate` operation. */
  export interface CreateOriginCertificateParams {
    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;
    /** zone identifier. */
    zoneIdentifier: string;
    /** Array of hostnames or wildcard names (e.g., *.example.com) bound to the certificate. */
    hostnames?: string[];
    /** Signature type desired on certificate. */
    requestType?: CreateOriginCertificateConstants.RequestType | string;
    /** The number of days for which the certificate should be valid. */
    requestedValidity?: number;
    /** The Certificate Signing Request (CSR). */
    csr?: string;
    /** uuid, identify a session. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createOriginCertificate` operation. */
  export namespace CreateOriginCertificateConstants {
    /** Signature type desired on certificate. */
    export enum RequestType {
      ORIGIN_RSA = 'origin-rsa',
      ORIGIN_ECC = 'origin-ecc',
    }
  }

  /** Parameters for the `revokeOriginCertificate` operation. */
  export interface RevokeOriginCertificateParams {
    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;
    /** zone identifier. */
    zoneIdentifier: string;
    /** cedrtificate identifier. */
    certIdentifier: string;
    /** uuid, identify a session. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOriginCertificate` operation. */
  export interface GetOriginCertificateParams {
    /** Full url-encoded cloud resource name (CRN) of resource instance. */
    crn: string;
    /** zone identifier. */
    zoneIdentifier: string;
    /** cedrtificate identifier. */
    certIdentifier: string;
    /** uuid, identify a session. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** result of ordering advanced certificate pack. */
  export interface AdvancedCertInitRespResult {
    /** advanced certificate pack ID. */
    id?: string;
    /** certificate type. */
    type?: string;
    /** host name. */
    hosts?: string[];
    /** validation Method selected for the order. */
    validation_method?: string;
    /** validity Days selected for the order. */
    validity_days?: number;
    /** Certificate Authority selected for the order. */
    certificate_authority?: string;
    /** whether or not to add Cloudflare Branding for the order. */
    cloudflare_branding?: boolean;
    /** certificate status. */
    status?: string;
  }

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
    label: CustomCertReqGeoRestrictions.Constants.Label | string;
  }
  export namespace CustomCertReqGeoRestrictions {
    export namespace Constants {
      /** properties. */
      export enum Label {
        US = 'us',
        EU = 'eu',
        HIGHEST_SECURITY = 'highest_security',
      }
    }
  }

  /** Statistics of results. */
  export interface ListOriginCertificatesRespResultInfo {
    /** Page number. */
    page: number;
    /** Number of results per page. */
    per_page: number;
    /** Number of results. */
    count: number;
    /** Total number of results. */
    total_count: number;
  }

  /** Container for response information. */
  export interface RevokeOriginCertificateRespResult {
    /** ID. */
    id: string;
  }

  /** certificate's required verification information. */
  export interface SslVerificationInfoVerificationInfo {
    /** name of CNAME record. */
    record_name?: string;
    /** target of CNAME record. */
    record_target?: string;
  }

  /** result. */
  export interface Tls12SettingRespResult {
    /** identifier. */
    id: Tls12SettingRespResult.Constants.Id | string;
    /** value. */
    value: string;
    /** editable. */
    editable: boolean;
    /** modified date. */
    modified_on: string;
  }
  export namespace Tls12SettingRespResult {
    export namespace Constants {
      /** identifier. */
      export enum Id {
        TLS_1_2_ONLY = 'tls_1_2_only',
      }
    }
  }

  /** result. */
  export interface Tls13SettingRespResult {
    /** identifier. */
    id: Tls13SettingRespResult.Constants.Id | string;
    /** value. */
    value: string;
    /** editable. */
    editable: boolean;
    /** modified date. */
    modified_on: string;
  }
  export namespace Tls13SettingRespResult {
    export namespace Constants {
      /** identifier. */
      export enum Id {
        TLS_1_3 = 'tls_1_3',
      }
    }
  }

  /** result. */
  export interface UniversalSettingRespResult {
    /** enabled. */
    enabled: boolean;
  }

  /** certificate response. */
  export interface AdvancedCertInitResp {
    /** result of ordering advanced certificate pack. */
    result: AdvancedCertInitRespResult;
    /** success. */
    success: boolean;
    /** errors. */
    errors: JsonObject[];
    /** messages. */
    messages: JsonObject[];
  }

  /** certificate. */
  export interface Certificate {
    /** identifier. */
    id: string;
    /** host name. */
    hosts: string[];
    /** status. */
    status: string;
    /** issuer. */
    issuer: string;
    /** signature. */
    signature: string;
    /** bundle method. */
    bundle_method: string;
    /** zone ID. */
    zone_id: string;
    /** uploaded time. */
    uploaded_on: string;
    /** modified time. */
    modified_on: string;
    /** expire time. */
    expires_on: string;
    /** certificate priority. */
    priority?: number;
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
    errors: JsonObject[];
    /** messages. */
    messages: JsonObject[];
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
    errors: JsonObject[];
    /** messages. */
    messages: JsonObject[];
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
    errors: JsonObject[];
    /** messages. */
    messages: JsonObject[];
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
    errors: JsonObject[];
    /** messages. */
    messages: JsonObject[];
  }

  /** response of list origin certificates. */
  export interface ListOriginCertificatesResp {
    /** Container for response information. */
    result: OriginCertificate[];
    /** Statistics of results. */
    result_info: ListOriginCertificatesRespResultInfo;
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /** origin certificate. */
  export interface OriginCertificate {
    /** ID. */
    id: string;
    /** a CIS-signed certificatece. */
    certificate: string;
    /** Array of hostnames or wildcard names (e.g., *.example.com) bound to the certificate. */
    hostnames: string[];
    /** The expires date for this certificate. */
    expires_on: string;
    /** Signature type desired on certificate. */
    request_type: OriginCertificate.Constants.RequestType | string;
    /** The number of days for which the certificate should be valid. */
    requested_validity: number;
    /** The Certificate Signing Request (CSR). */
    csr: string;
    /** The private key. */
    private_key?: string;
  }
  export namespace OriginCertificate {
    export namespace Constants {
      /** Signature type desired on certificate. */
      export enum RequestType {
        ORIGIN_RSA = 'origin-rsa',
        ORIGIN_ECC = 'origin-ecc',
      }
    }
  }

  /** response of origin certificate. */
  export interface OriginCertificateResp {
    /** origin certificate. */
    result: OriginCertificate;
    /** Was operation successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
  }

  /** result information. */
  export interface ResultInfo {
    /** page number. */
    page: number;
    /** per page count. */
    per_page: number;
    /** total pages. */
    total_pages: number;
    /** count. */
    count: number;
    /** total count. */
    total_count: number;
  }

  /** response of revoke origin certificate. */
  export interface RevokeOriginCertificateResp {
    /** Was the get successful. */
    success: boolean;
    /** Array of errors encountered. */
    errors: string[][];
    /** Array of messages returned. */
    messages: string[][];
    /** Container for response information. */
    result: RevokeOriginCertificateRespResult;
  }

  /** ssl setting. */
  export interface SslSetting {
    /** identifier. */
    id: string;
    /** value. */
    value: SslSetting.Constants.Value | string;
    /** editable. */
    editable: boolean;
    /** modified date. */
    modified_on: string;
  }
  export namespace SslSetting {
    export namespace Constants {
      /** value. */
      export enum Value {
        FALSE = 'false',
        FLEXIBLE = 'flexible',
        FULL = 'full',
        STRICT = 'strict',
      }
    }
  }

  /** ssl setting response. */
  export interface SslSettingResp {
    /** success. */
    success: boolean;
    /** ssl setting. */
    result: SslSetting;
    /** errors. */
    errors: JsonObject[];
    /** messages. */
    messages: JsonObject[];
  }

  /** ssl verification details. */
  export interface SslVerificationInfo {
    /** current status of certificate. */
    certificate_status?: string;
    /** validation method in use for a certificate pack order. */
    validation_method?: string;
    /** method of certificate verification. */
    verification_type?: string;
    /** certificate pack identifier. */
    cert_pack_uuid?: string;
    /** status of the required verification information. */
    verification_status?: boolean;
    /** certificate's required verification information. */
    verification_info?: SslVerificationInfoVerificationInfo;
    /** Wether or not Certificate Authority is manually reviewing the order. */
    brand_check?: boolean;
  }

  /** ssl verification response. */
  export interface SslVerificationResp {
    /** ssl verification result. */
    result: SslVerificationInfo[];
    /** success. */
    success: boolean;
    /** errors. */
    errors: JsonObject[];
    /** messages. */
    messages: JsonObject[];
  }

  /** tls 1.2 setting response. */
  export interface Tls12SettingResp {
    /** result. */
    result: Tls12SettingRespResult;
    /** success. */
    success: boolean;
    /** errors. */
    errors: JsonObject[];
    /** messages. */
    messages: JsonObject[];
  }

  /** tls 1.3 setting response. */
  export interface Tls13SettingResp {
    /** result. */
    result: Tls13SettingRespResult;
    /** success. */
    success: boolean;
    /** errors. */
    errors: JsonObject[];
    /** messages. */
    messages: JsonObject[];
  }

  /** universal setting response. */
  export interface UniversalSettingResp {
    /** result. */
    result: UniversalSettingRespResult;
    /** success. */
    success: boolean;
    /** errors. */
    errors: JsonObject[];
    /** messages. */
    messages: JsonObject[];
  }
}

export = SslCertificateApiV1;
