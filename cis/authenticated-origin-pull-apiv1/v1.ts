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
 * IBM OpenAPI SDK Code Generator Version: 3.62.0-a2a22f95-20221115-162524
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  UserOptions,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../../lib/common';

/**
 * Authenticated Origin Pull
 *
 * API Version: 1.0.0
 */

class AuthenticatedOriginPullApiV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'authenticated_origin_pull_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of AuthenticatedOriginPullApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {AuthenticatedOriginPullApiV1}
   */

  public static newInstance(options: UserOptions): AuthenticatedOriginPullApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new AuthenticatedOriginPullApiV1(options);
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
   * Construct a AuthenticatedOriginPullApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - cloud resource name.
   * @param {string} options.zoneIdentifier - zone identifier.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {AuthenticatedOriginPullApiV1}
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
      this.setServiceUrl(AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
    this.zoneIdentifier = options.zoneIdentifier;
  }

  /*************************
   * zoneLevelAuthenticatedOriginPull
   ************************/

  /**
   * Get Zone level Authenticated Origin Pull Settings.
   *
   * Get whether zone-level authenticated origin pulls is enabled or not. It is false by default.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.GetZoneOriginPullSettingsResp>>}
   */
  public getZoneOriginPullSettings(
    params?: AuthenticatedOriginPullApiV1.GetZoneOriginPullSettingsParams
  ): Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.GetZoneOriginPullSettingsResp>> {
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

    const sdkHeaders = getSdkHeaders(
      AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getZoneOriginPullSettings'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/settings',
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
   * Set Zone level Authenticated Origin Pull Settings.
   *
   * Enable or disable zone-level authenticated origin pulls. 'enabled' should be set true either before/after the
   * certificate is uploaded to see the certificate in use.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.enabled] - enabled.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.GetZoneOriginPullSettingsResp>>}
   */
  public setZoneOriginPullSettings(
    params?: AuthenticatedOriginPullApiV1.SetZoneOriginPullSettingsParams
  ): Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.GetZoneOriginPullSettingsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['enabled', 'xCorrelationId', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'setZoneOriginPullSettings'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/settings',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List Zone level Authenticated Origin Pull Certificates.
   *
   * List zone-level authenticated origin pulls certificates.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.ListZoneOriginPullCertificatesResp>>}
   */
  public listZoneOriginPullCertificates(
    params?: AuthenticatedOriginPullApiV1.ListZoneOriginPullCertificatesParams
  ): Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.ListZoneOriginPullCertificatesResp>> {
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

    const sdkHeaders = getSdkHeaders(
      AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listZoneOriginPullCertificates'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth',
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
   * Upload Zone level Authenticated Origin Pull Certificate.
   *
   * Upload your own certificate you want Cloudflare to use for edge-to-origin communication to override the shared
   * certificate Please note that it is important to keep only one certificate active. Also, make sure to enable
   * zone-level authenticated  origin pulls by making a PUT call to settings endpoint to see the uploaded certificate in
   * use.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.certificate] - the zone's leaf certificate.
   * @param {string} [params.privateKey] - the zone's private key.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.ZoneOriginPullCertificateResp>>}
   */
  public uploadZoneOriginPullCertificate(
    params?: AuthenticatedOriginPullApiV1.UploadZoneOriginPullCertificateParams
  ): Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.ZoneOriginPullCertificateResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['certificate', 'privateKey', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'certificate': _params.certificate,
      'private_key': _params.privateKey,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'uploadZoneOriginPullCertificate'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth',
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
   * Get a Zone level Authenticated Origin Pull Certificate.
   *
   * Get a zone-level authenticated origin pulls certificate.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.certIdentifier - cedrtificate identifier.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.ZoneOriginPullCertificateResp>>}
   */
  public getZoneOriginPullCertificate(
    params: AuthenticatedOriginPullApiV1.GetZoneOriginPullCertificateParams
  ): Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.ZoneOriginPullCertificateResp>> {
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

    const sdkHeaders = getSdkHeaders(
      AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getZoneOriginPullCertificate'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/{cert_identifier}',
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
   * Delete a Zone level Authenticated Origin Pull Certificate.
   *
   * Delete a zone-level authenticated origin pulls certificate.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.certIdentifier - cedrtificate identifier.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.ZoneOriginPullCertificateResp>>}
   */
  public deleteZoneOriginPullCertificate(
    params: AuthenticatedOriginPullApiV1.DeleteZoneOriginPullCertificateParams
  ): Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.ZoneOriginPullCertificateResp>> {
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

    const sdkHeaders = getSdkHeaders(
      AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteZoneOriginPullCertificate'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/{cert_identifier}',
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
  /*************************
   * perHostnameAuthenticatedOriginPull
   ************************/

  /**
   * List Per-hostname Authenticated Origin Pull Settings.
   *
   * List all per hostname authenticated origin pull settings.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.ListHostnameOriginPullSettingsResp>>}
   */
  public listAllPerHostnameAuthenticatedOriginPullSettings(
    params?: AuthenticatedOriginPullApiV1.ListAllPerHostnameAuthenticatedOriginPullSettingsParams
  ): Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.ListHostnameOriginPullSettingsResp>> {
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

    const sdkHeaders = getSdkHeaders(
      AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listAllPerHostnameAuthenticatedOriginPullSettings'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/hostnames',
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
   * Set Hostname level Authenticated Origin Pull Settings.
   *
   * Associate a hostname to a certificate and enable, disable or invalidate the association. If disabled, client
   * certificate will not be sent to the hostname even if activated at the zone level. 100 maximum associations on a
   * single certificate are allowed.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {HostnameOriginPullSettings[]} [params.config] - An array with items in the settings request.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.ListHostnameOriginPullSettingsResp>>}
   */
  public setHostnameOriginPullSettings(
    params?: AuthenticatedOriginPullApiV1.SetHostnameOriginPullSettingsParams
  ): Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.ListHostnameOriginPullSettingsResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['config', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'config': _params.config,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'setHostnameOriginPullSettings'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/hostnames',
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
            'X-Correlation-ID': _params.xCorrelationId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get Hostname level Authenticated Origin Pull Settings.
   *
   * Get hostname-level authenticated origin pulls settings.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.hostname - the hostname on the origin for which the client certificate associate.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.GetHostnameOriginPullSettingsResp>>}
   */
  public getHostnameOriginPullSettings(
    params: AuthenticatedOriginPullApiV1.GetHostnameOriginPullSettingsParams
  ): Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.GetHostnameOriginPullSettingsResp>> {
    const _params = { ...params };
    const _requiredParams = ['hostname'];
    const _validParams = ['hostname', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
      'hostname': _params.hostname,
    };

    const sdkHeaders = getSdkHeaders(
      AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getHostnameOriginPullSettings'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/hostnames/{hostname}',
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
   * List Per-hostname Authenticated Origin Pull certificates.
   *
   * List all per hostname authenticated origin pull certificates.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.ListHostnameOriginPullCertificatesResp>>}
   */
  public listAllPerHostnameAuthenticatedOriginPullCertificates(
    params?: AuthenticatedOriginPullApiV1.ListAllPerHostnameAuthenticatedOriginPullCertificatesParams
  ): Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.ListHostnameOriginPullCertificatesResp>> {
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

    const sdkHeaders = getSdkHeaders(
      AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listAllPerHostnameAuthenticatedOriginPullCertificates'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/hostnames/certificates',
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
   * Upload Hostname level Authenticated Origin Pull Certificate.
   *
   * Upload a certificate to be used for client authentication on a hostname. 10 hostname certificates per zone are
   * allowed.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.certificate] - the zone's leaf certificate.
   * @param {string} [params.privateKey] - the zone's private key.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.HostnameOriginPullCertificateResp>>}
   */
  public uploadHostnameOriginPullCertificate(
    params?: AuthenticatedOriginPullApiV1.UploadHostnameOriginPullCertificateParams
  ): Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.HostnameOriginPullCertificateResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['certificate', 'privateKey', 'xCorrelationId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'certificate': _params.certificate,
      'private_key': _params.privateKey,
    };

    const path = {
      'crn': this.crn,
      'zone_identifier': this.zoneIdentifier,
    };

    const sdkHeaders = getSdkHeaders(
      AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'uploadHostnameOriginPullCertificate'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/hostnames/certificates',
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
   * Get a Hostname level Authenticated Origin Pull Certificate.
   *
   * Get the certificate by ID to be used for client authentication on a hostname.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.certIdentifier - cedrtificate identifier.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.HostnameOriginPullCertificateResp>>}
   */
  public getHostnameOriginPullCertificate(
    params: AuthenticatedOriginPullApiV1.GetHostnameOriginPullCertificateParams
  ): Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.HostnameOriginPullCertificateResp>> {
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

    const sdkHeaders = getSdkHeaders(
      AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getHostnameOriginPullCertificate'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/hostnames/certificates/{cert_identifier}',
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
   * Delete a Hostname level Authenticated Origin Pull Certificate.
   *
   * Delete the certificate by ID to be used for client authentication on a hostname.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.certIdentifier - cedrtificate identifier.
   * @param {string} [params.xCorrelationId] - Uniquely identifying a request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.HostnameOriginPullCertificateResp>>}
   */
  public deleteHostnameOriginPullCertificate(
    params: AuthenticatedOriginPullApiV1.DeleteHostnameOriginPullCertificateParams
  ): Promise<AuthenticatedOriginPullApiV1.Response<AuthenticatedOriginPullApiV1.HostnameOriginPullCertificateResp>> {
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

    const sdkHeaders = getSdkHeaders(
      AuthenticatedOriginPullApiV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteHostnameOriginPullCertificate'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_identifier}/origin_tls_client_auth/hostnames/certificates/{cert_identifier}',
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
}

/*************************
 * interfaces
 ************************/

namespace AuthenticatedOriginPullApiV1 {
  /** Options for the `AuthenticatedOriginPullApiV1` constructor. */
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
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `getZoneOriginPullSettings` operation. */
  export interface GetZoneOriginPullSettingsParams {
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `setZoneOriginPullSettings` operation. */
  export interface SetZoneOriginPullSettingsParams {
    /** enabled. */
    enabled?: boolean;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listZoneOriginPullCertificates` operation. */
  export interface ListZoneOriginPullCertificatesParams {
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `uploadZoneOriginPullCertificate` operation. */
  export interface UploadZoneOriginPullCertificateParams {
    /** the zone's leaf certificate. */
    certificate?: string;
    /** the zone's private key. */
    privateKey?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getZoneOriginPullCertificate` operation. */
  export interface GetZoneOriginPullCertificateParams {
    /** cedrtificate identifier. */
    certIdentifier: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteZoneOriginPullCertificate` operation. */
  export interface DeleteZoneOriginPullCertificateParams {
    /** cedrtificate identifier. */
    certIdentifier: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAllPerHostnameAuthenticatedOriginPullSettings` operation. */
  export interface ListAllPerHostnameAuthenticatedOriginPullSettingsParams {
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `setHostnameOriginPullSettings` operation. */
  export interface SetHostnameOriginPullSettingsParams {
    /** An array with items in the settings request. */
    config?: HostnameOriginPullSettings[];
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getHostnameOriginPullSettings` operation. */
  export interface GetHostnameOriginPullSettingsParams {
    /** the hostname on the origin for which the client certificate associate. */
    hostname: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAllPerHostnameAuthenticatedOriginPullCertificates` operation. */
  export interface ListAllPerHostnameAuthenticatedOriginPullCertificatesParams {
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `uploadHostnameOriginPullCertificate` operation. */
  export interface UploadHostnameOriginPullCertificateParams {
    /** the zone's leaf certificate. */
    certificate?: string;
    /** the zone's private key. */
    privateKey?: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getHostnameOriginPullCertificate` operation. */
  export interface GetHostnameOriginPullCertificateParams {
    /** cedrtificate identifier. */
    certIdentifier: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteHostnameOriginPullCertificate` operation. */
  export interface DeleteHostnameOriginPullCertificateParams {
    /** cedrtificate identifier. */
    certIdentifier: string;
    /** Uniquely identifying a request. */
    xCorrelationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** result. */
  export interface GetZoneOriginPullSettingsRespResult {
    /** enabled. */
    enabled: boolean;
  }

  /** certificate pack. */
  export interface CertificatePack {
    /** certificate identifier tag. */
    id?: string;
    /** the zone's leaf certificate. */
    certificate?: string;
    /** the certificate authority that issued the certificate. */
    issuer?: string;
    /** the type of hash used for the certificate. */
    signature?: string;
    /** status of the certificate activation. */
    status?: string;
    /** when the certificate from the authority expires. */
    expires_on?: string;
    /** the time the certificate was uploaded. */
    uploaded_on?: string;
  }

  /** detail of the hostname level authenticated origin pull settings response. */
  export interface GetHostnameOriginPullSettingsResp {
    /** hostname level authenticated origin pull settings response. */
    result?: HostnameSettingsResp;
    /** success. */
    success?: boolean;
    errors?: string[];
    messages?: string[];
  }

  /** zone level authenticated origin pull settings response. */
  export interface GetZoneOriginPullSettingsResp {
    /** result. */
    result?: GetZoneOriginPullSettingsRespResult;
    /** success. */
    success?: boolean;
    errors?: string[];
    messages?: string[];
  }

  /** certificate pack. */
  export interface HostnameCertificatePack {
    /** certificate identifier tag. */
    id?: string;
    /** the zone's leaf certificate. */
    certificate?: string;
    /** the certificate authority that issued the certificate. */
    issuer?: string;
    /** the type of hash used for the certificate. */
    signature?: string;
    /** the serial number on the uploaded certificate. */
    serial_number?: string;
    /** status of the certificate activation. */
    status?: string;
    /** when the certificate from the authority expires. */
    expires_on?: string;
    /** the time the certificate was uploaded. */
    uploaded_on?: string;
  }

  /** certificate response. */
  export interface HostnameOriginPullCertificateResp {
    /** certificate pack. */
    result?: HostnameCertificatePack;
    /** success. */
    success?: boolean;
    errors?: string[];
    messages?: string[];
  }

  /** hostname-level authenticated origin pull settings request. */
  export interface HostnameOriginPullSettings {
    /** the hostname on the origin for which the client certificate uploaded will be used. */
    hostname: string;
    /** certificate identifier tag. */
    cert_id: string;
    /** enabled. */
    enabled: boolean;
  }

  /** hostname level authenticated origin pull settings response. */
  export interface HostnameSettingsResp {
    /** the hostname on the origin for which the client certificate uploaded will be used. */
    hostname?: string;
    /** certificate identifier tag. */
    cert_id?: string;
    /** enabled. */
    enabled?: boolean;
    /** status of the certificate activation. */
    status?: string;
    /** the time when the certificate was created. */
    created_at?: string;
    /** the time when the certificate was updated. */
    updated_at?: string;
    /** status of the certificate or the association. */
    cert_status?: string;
    /** the certificate authority that issued the certificate. */
    issuer?: string;
    /** the type of hash used for the certificate. */
    signature?: string;
    /** the serial number on the uploaded certificate. */
    serial_number?: string;
    /** the zone's leaf certificate. */
    certificate?: string;
    /** the time the certificate was uploaded. */
    cert_uploaded_on?: string;
    /** the time when the certificate was updated. */
    cert_updated_at?: string;
    /** the date when the certificate expires. */
    expires_on?: string;
  }

  /** array of hostname level authenticated origin pull settings response. */
  export interface ListHostnameOriginPullCertificatesResp {
    /** array of hostname certificates response. */
    result?: HostnameCertificatePack[];
    /** success. */
    success?: boolean;
    errors?: string[];
    messages?: string[];
  }

  /** array of hostname level authenticated origin pull settings response. */
  export interface ListHostnameOriginPullSettingsResp {
    /** array of hostname settings response. */
    result?: HostnameSettingsResp[];
    /** success. */
    success?: boolean;
    errors?: string[];
    messages?: string[];
  }

  /** certificate response. */
  export interface ListZoneOriginPullCertificatesResp {
    /** list certificate packs. */
    result?: CertificatePack[];
    /** success. */
    success?: boolean;
    errors?: string[];
    messages?: string[];
  }

  /** zone level authenticated origin pull certificate response. */
  export interface ZoneOriginPullCertificateResp {
    /** certificate pack. */
    result?: CertificatePack;
    /** success. */
    success?: boolean;
    errors?: string[];
    messages?: string[];
  }
}

export = AuthenticatedOriginPullApiV1;
