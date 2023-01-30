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
 * MTLS
 *
 * API Version: 1.0.0
 */

class MtlsV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.cis.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'mtls';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of MtlsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {MtlsV1}
   */

  public static newInstance(options: UserOptions): MtlsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new MtlsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /** Cloud resource name. */
  crn: string;

  /**
   * Construct a MtlsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.crn - Cloud resource name.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {MtlsV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const _requiredParams = ['crn'];
    const _validationErrors = validateParams(options, _requiredParams, null);
    if (_validationErrors) {
      throw _validationErrors;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(MtlsV1.DEFAULT_SERVICE_URL);
    }
    this.crn = options.crn;
  }

  /*************************
   * mutualTLS
   ************************/

  /**
   * List access certificates.
   *
   * List access certificates.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.ListAccessCertsResp>>}
   */
  public listAccessCertificates(
    params: MtlsV1.ListAccessCertificatesParams
  ): Promise<MtlsV1.Response<MtlsV1.ListAccessCertsResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId'];
    const _validParams = ['zoneId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listAccessCertificates'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/certificates',
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
   * Create access certificate.
   *
   * Create access certificate.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {string} [params.name] - Access certificate name.
   * @param {string} [params.certificate] - Access certificate.
   * @param {string[]} [params.associatedHostnames] - The hostnames that are prompted for this certificate.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.AccessCertResp>>}
   */
  public createAccessCertificate(
    params: MtlsV1.CreateAccessCertificateParams
  ): Promise<MtlsV1.Response<MtlsV1.AccessCertResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId'];
    const _validParams = ['zoneId', 'name', 'certificate', 'associatedHostnames', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'certificate': _params.certificate,
      'associated_hostnames': _params.associatedHostnames,
    };

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createAccessCertificate'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/certificates',
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
   * Get access certificate.
   *
   * Get access certificate.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {string} params.certId - Access certificate ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.AccessCertResp>>}
   */
  public getAccessCertificate(
    params: MtlsV1.GetAccessCertificateParams
  ): Promise<MtlsV1.Response<MtlsV1.AccessCertResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId', 'certId'];
    const _validParams = ['zoneId', 'certId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
      'cert_id': _params.certId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getAccessCertificate'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/certificates/{cert_id}',
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
   * Update access certificate.
   *
   * Update access certificate.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {string} params.certId - Access certificate ID.
   * @param {string} [params.name] - Access certificate name.
   * @param {string[]} [params.associatedHostnames] - The hostnames that are prompted for this certificate.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.AccessCertResp>>}
   */
  public updateAccessCertificate(
    params: MtlsV1.UpdateAccessCertificateParams
  ): Promise<MtlsV1.Response<MtlsV1.AccessCertResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId', 'certId'];
    const _validParams = ['zoneId', 'certId', 'name', 'associatedHostnames', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'associated_hostnames': _params.associatedHostnames,
    };

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
      'cert_id': _params.certId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateAccessCertificate'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/certificates/{cert_id}',
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
   * Delete access certificate.
   *
   * Delete access certificate.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {string} params.certId - Access certificate ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.DeleteAccessCertResp>>}
   */
  public deleteAccessCertificate(
    params: MtlsV1.DeleteAccessCertificateParams
  ): Promise<MtlsV1.Response<MtlsV1.DeleteAccessCertResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId', 'certId'];
    const _validParams = ['zoneId', 'certId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
      'cert_id': _params.certId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteAccessCertificate'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/certificates/{cert_id}',
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

  /**
   * List access applications.
   *
   * List access applications.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.ListAccessAppsResp>>}
   */
  public listAccessApplications(
    params: MtlsV1.ListAccessApplicationsParams
  ): Promise<MtlsV1.Response<MtlsV1.ListAccessAppsResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId'];
    const _validParams = ['zoneId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listAccessApplications'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/apps',
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
   * Create access application.
   *
   * Create access application.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {string} [params.name] - Application name.
   * @param {string} [params.domain] - The domain and path that Access blocks.
   * @param {string} [params.sessionDuration] - The amount of time that the tokens issued for this application are
   * valid.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.CreateAccessAppResp>>}
   */
  public createAccessApplication(
    params: MtlsV1.CreateAccessApplicationParams
  ): Promise<MtlsV1.Response<MtlsV1.CreateAccessAppResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId'];
    const _validParams = ['zoneId', 'name', 'domain', 'sessionDuration', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'domain': _params.domain,
      'session_duration': _params.sessionDuration,
    };

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createAccessApplication'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/apps',
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
   * Get access application.
   *
   * Get access application.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {string} params.appId - Access application ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.AccessAppResp>>}
   */
  public getAccessApplication(
    params: MtlsV1.GetAccessApplicationParams
  ): Promise<MtlsV1.Response<MtlsV1.AccessAppResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId', 'appId'];
    const _validParams = ['zoneId', 'appId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
      'app_id': _params.appId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getAccessApplication'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}',
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
   * Update access application.
   *
   * Update access application.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {string} params.appId - Access application ID.
   * @param {string} [params.name] - Application name.
   * @param {string} [params.domain] - The domain and path that Access blocks.
   * @param {string} [params.sessionDuration] - The amount of time that the tokens issued for this application are
   * valid.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.AccessAppResp>>}
   */
  public updateAccessApplication(
    params: MtlsV1.UpdateAccessApplicationParams
  ): Promise<MtlsV1.Response<MtlsV1.AccessAppResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId', 'appId'];
    const _validParams = ['zoneId', 'appId', 'name', 'domain', 'sessionDuration', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'domain': _params.domain,
      'session_duration': _params.sessionDuration,
    };

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
      'app_id': _params.appId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateAccessApplication'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}',
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
   * Delete access application.
   *
   * Delete access application.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {string} params.appId - Access application ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.DeleteAccessAppResp>>}
   */
  public deleteAccessApplication(
    params: MtlsV1.DeleteAccessApplicationParams
  ): Promise<MtlsV1.Response<MtlsV1.DeleteAccessAppResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId', 'appId'];
    const _validParams = ['zoneId', 'appId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
      'app_id': _params.appId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteAccessApplication'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}',
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

  /**
   * List access policies.
   *
   * List access policies.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {string} params.appId - Access application ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.ListAccessPoliciesResp>>}
   */
  public listAccessPolicies(
    params: MtlsV1.ListAccessPoliciesParams
  ): Promise<MtlsV1.Response<MtlsV1.ListAccessPoliciesResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId', 'appId'];
    const _validParams = ['zoneId', 'appId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
      'app_id': _params.appId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listAccessPolicies'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}/policies',
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
   * Create access policy.
   *
   * Create access policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {string} params.appId - Access application ID.
   * @param {string} [params.name] - Policy name.
   * @param {string} [params.decision] - Defines the action Access takes if the policy matches the user.
   * @param {PolicyRule[]} [params.include] - The include policy works like an OR logical operator. The user must
   * satisfy one of the rules in includes.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.AccessPolicyResp>>}
   */
  public createAccessPolicy(
    params: MtlsV1.CreateAccessPolicyParams
  ): Promise<MtlsV1.Response<MtlsV1.AccessPolicyResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId', 'appId'];
    const _validParams = ['zoneId', 'appId', 'name', 'decision', 'include', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'decision': _params.decision,
      'include': _params.include,
    };

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
      'app_id': _params.appId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createAccessPolicy'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}/policies',
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
   * Get access policy.
   *
   * Get access policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {string} params.appId - Access application ID.
   * @param {string} params.policyId - Access policy ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.AccessPolicyResp>>}
   */
  public getAccessPolicy(
    params: MtlsV1.GetAccessPolicyParams
  ): Promise<MtlsV1.Response<MtlsV1.AccessPolicyResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId', 'appId', 'policyId'];
    const _validParams = ['zoneId', 'appId', 'policyId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
      'app_id': _params.appId,
      'policy_id': _params.policyId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getAccessPolicy'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}/policies/{policy_id}',
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
   * Update access policy.
   *
   * Update access policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {string} params.appId - Access application ID.
   * @param {string} params.policyId - Access policy ID.
   * @param {string} [params.name] - Policy name.
   * @param {string} [params.decision] - Defines the action Access takes if the policy matches the user.
   * @param {PolicyRule[]} [params.include] - The include policy works like an OR logical operator. The user must
   * satisfy one of the rules in includes.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.AccessPolicyResp>>}
   */
  public updateAccessPolicy(
    params: MtlsV1.UpdateAccessPolicyParams
  ): Promise<MtlsV1.Response<MtlsV1.AccessPolicyResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId', 'appId', 'policyId'];
    const _validParams = ['zoneId', 'appId', 'policyId', 'name', 'decision', 'include', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'decision': _params.decision,
      'include': _params.include,
    };

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
      'app_id': _params.appId,
      'policy_id': _params.policyId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateAccessPolicy'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}/policies/{policy_id}',
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
   * Delete access policy.
   *
   * Delete access policy.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {string} params.appId - Access application ID.
   * @param {string} params.policyId - Access policy ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.DeleteAccessPolicyResp>>}
   */
  public deleteAccessPolicy(
    params: MtlsV1.DeleteAccessPolicyParams
  ): Promise<MtlsV1.Response<MtlsV1.DeleteAccessPolicyResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId', 'appId', 'policyId'];
    const _validParams = ['zoneId', 'appId', 'policyId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
      'app_id': _params.appId,
      'policy_id': _params.policyId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteAccessPolicy'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/apps/{app_id}/policies/{policy_id}',
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

  /**
   * Get access certificates settings.
   *
   * Get access certificates settings.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.AccessCertSettingsResp>>}
   */
  public getAccessCertSettings(
    params: MtlsV1.GetAccessCertSettingsParams
  ): Promise<MtlsV1.Response<MtlsV1.AccessCertSettingsResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId'];
    const _validParams = ['zoneId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getAccessCertSettings'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/certificates/settings',
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
   * Update access certificates settings.
   *
   * Update access certificates settings.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - Zone ID.
   * @param {AccessCertSettingsInputArray[]} [params.settings] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.AccessCertSettingsResp>>}
   */
  public updateAccessCertSettings(
    params: MtlsV1.UpdateAccessCertSettingsParams
  ): Promise<MtlsV1.Response<MtlsV1.AccessCertSettingsResp>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId'];
    const _validParams = ['zoneId', 'settings', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'settings': _params.settings,
    };

    const path = {
      'crn': this.crn,
      'zone_id': _params.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateAccessCertSettings'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/zones/{zone_id}/access/certificates/settings',
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
   * Create access organization.
   *
   * Create access organization.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - Name of the access organization.
   * @param {string} [params.authDomain] - The domain that you are redirected to on Access login attempts.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<MtlsV1.Response<MtlsV1.AccessOrgResp>>}
   */
  public createAccessOrganization(
    params?: MtlsV1.CreateAccessOrganizationParams
  ): Promise<MtlsV1.Response<MtlsV1.AccessOrgResp>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['name', 'authDomain', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'auth_domain': _params.authDomain,
    };

    const path = {
      'crn': this.crn,
    };

    const sdkHeaders = getSdkHeaders(
      MtlsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createAccessOrganization'
    );

    const parameters = {
      options: {
        url: '/v1/{crn}/access/organizations',
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
}

/*************************
 * interfaces
 ************************/

namespace MtlsV1 {
  /** Options for the `MtlsV1` constructor. */
  export interface Options extends UserOptions {
    /** Cloud resource name. */
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
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listAccessCertificates` operation. */
  export interface ListAccessCertificatesParams {
    /** Zone ID. */
    zoneId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createAccessCertificate` operation. */
  export interface CreateAccessCertificateParams {
    /** Zone ID. */
    zoneId: string;
    /** Access certificate name. */
    name?: string;
    /** Access certificate. */
    certificate?: string;
    /** The hostnames that are prompted for this certificate. */
    associatedHostnames?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAccessCertificate` operation. */
  export interface GetAccessCertificateParams {
    /** Zone ID. */
    zoneId: string;
    /** Access certificate ID. */
    certId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAccessCertificate` operation. */
  export interface UpdateAccessCertificateParams {
    /** Zone ID. */
    zoneId: string;
    /** Access certificate ID. */
    certId: string;
    /** Access certificate name. */
    name?: string;
    /** The hostnames that are prompted for this certificate. */
    associatedHostnames?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteAccessCertificate` operation. */
  export interface DeleteAccessCertificateParams {
    /** Zone ID. */
    zoneId: string;
    /** Access certificate ID. */
    certId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAccessApplications` operation. */
  export interface ListAccessApplicationsParams {
    /** Zone ID. */
    zoneId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createAccessApplication` operation. */
  export interface CreateAccessApplicationParams {
    /** Zone ID. */
    zoneId: string;
    /** Application name. */
    name?: string;
    /** The domain and path that Access blocks. */
    domain?: string;
    /** The amount of time that the tokens issued for this application are valid. */
    sessionDuration?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAccessApplication` operation. */
  export interface GetAccessApplicationParams {
    /** Zone ID. */
    zoneId: string;
    /** Access application ID. */
    appId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAccessApplication` operation. */
  export interface UpdateAccessApplicationParams {
    /** Zone ID. */
    zoneId: string;
    /** Access application ID. */
    appId: string;
    /** Application name. */
    name?: string;
    /** The domain and path that Access blocks. */
    domain?: string;
    /** The amount of time that the tokens issued for this application are valid. */
    sessionDuration?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteAccessApplication` operation. */
  export interface DeleteAccessApplicationParams {
    /** Zone ID. */
    zoneId: string;
    /** Access application ID. */
    appId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAccessPolicies` operation. */
  export interface ListAccessPoliciesParams {
    /** Zone ID. */
    zoneId: string;
    /** Access application ID. */
    appId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createAccessPolicy` operation. */
  export interface CreateAccessPolicyParams {
    /** Zone ID. */
    zoneId: string;
    /** Access application ID. */
    appId: string;
    /** Policy name. */
    name?: string;
    /** Defines the action Access takes if the policy matches the user. */
    decision?: CreateAccessPolicyConstants.Decision | string;
    /** The include policy works like an OR logical operator. The user must satisfy one of the rules in includes. */
    include?: PolicyRule[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createAccessPolicy` operation. */
  export namespace CreateAccessPolicyConstants {
    /** Defines the action Access takes if the policy matches the user. */
    export enum Decision {
      NON_IDENTITY = 'non_identity',
    }
  }

  /** Parameters for the `getAccessPolicy` operation. */
  export interface GetAccessPolicyParams {
    /** Zone ID. */
    zoneId: string;
    /** Access application ID. */
    appId: string;
    /** Access policy ID. */
    policyId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAccessPolicy` operation. */
  export interface UpdateAccessPolicyParams {
    /** Zone ID. */
    zoneId: string;
    /** Access application ID. */
    appId: string;
    /** Access policy ID. */
    policyId: string;
    /** Policy name. */
    name?: string;
    /** Defines the action Access takes if the policy matches the user. */
    decision?: UpdateAccessPolicyConstants.Decision | string;
    /** The include policy works like an OR logical operator. The user must satisfy one of the rules in includes. */
    include?: PolicyRule[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateAccessPolicy` operation. */
  export namespace UpdateAccessPolicyConstants {
    /** Defines the action Access takes if the policy matches the user. */
    export enum Decision {
      NON_IDENTITY = 'non_identity',
    }
  }

  /** Parameters for the `deleteAccessPolicy` operation. */
  export interface DeleteAccessPolicyParams {
    /** Zone ID. */
    zoneId: string;
    /** Access application ID. */
    appId: string;
    /** Access policy ID. */
    policyId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAccessCertSettings` operation. */
  export interface GetAccessCertSettingsParams {
    /** Zone ID. */
    zoneId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAccessCertSettings` operation. */
  export interface UpdateAccessCertSettingsParams {
    /** Zone ID. */
    zoneId: string;
    settings?: AccessCertSettingsInputArray[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createAccessOrganization` operation. */
  export interface CreateAccessOrganizationParams {
    /** Name of the access organization. */
    name?: string;
    /** The domain that you are redirected to on Access login attempts. */
    authDomain?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** AccessOrgRespResult. */
  export interface AccessOrgRespResult {
    auth_domain?: string;
    name?: string;
    login_design?: JsonObject;
    created_at?: string;
    updated_at?: string;
  }

  /** Access application details. */
  export interface CreateAccessAppRespResult {
    id?: string;
    name?: string;
    domain?: string;
    aud?: string;
    policies?: JsonObject[];
    allowed_idps?: string[];
    auto_redirect_to_identity?: boolean;
    session_duration?: string;
    type?: string;
    uid?: string;
    created_at?: string;
    updated_at?: string;
  }

  /** DeleteAccessAppRespResult. */
  export interface DeleteAccessAppRespResult {
    /** Application ID. */
    id?: string;
  }

  /** DeleteAccessCertRespResult. */
  export interface DeleteAccessCertRespResult {
    /** Certificate ID. */
    id?: string;
  }

  /** DeleteAccessPolicyRespResult. */
  export interface DeleteAccessPolicyRespResult {
    /** Policy ID. */
    id?: string;
  }

  /** PolicyCnRuleCommonName. */
  export interface PolicyCnRuleCommonName {
    /** Common name of client certificate. */
    common_name: string;
  }

  /** Access application response. */
  export interface AccessAppResp {
    /** Was operation successful. */
    success?: boolean;
    /** Array of errors encountered. */
    errors?: string[][];
    /** Array of messages returned. */
    messages?: string[][];
    /** Access application details. */
    result?: AppResult;
  }

  /** Access certificate response. */
  export interface AccessCertResp {
    /** Was operation successful. */
    success?: boolean;
    /** Array of errors encountered. */
    errors?: string[][];
    /** Array of messages returned. */
    messages?: string[][];
    /** Access certificate details. */
    result?: CertResult;
  }

  /** AccessCertSettingsInputArray. */
  export interface AccessCertSettingsInputArray {
    hostname: string;
    /** Whether to forward the client certificate. */
    client_certificate_forwarding: boolean;
  }

  /** Access certificates settings response. */
  export interface AccessCertSettingsResp {
    /** Was operation successful. */
    success?: boolean;
    /** Array of errors encountered. */
    errors?: string[][];
    /** Array of messages returned. */
    messages?: string[][];
    result?: CertSettingsResult[];
  }

  /** Access organization response. */
  export interface AccessOrgResp {
    /** Was operation successful. */
    success?: boolean;
    /** Array of errors encountered. */
    errors?: string[][];
    /** Array of messages returned. */
    messages?: string[][];
    result?: AccessOrgRespResult;
  }

  /** Access policy response. */
  export interface AccessPolicyResp {
    /** Was operation successful. */
    success?: boolean;
    /** Array of errors encountered. */
    errors?: string[][];
    /** Array of messages returned. */
    messages?: string[][];
    /** Access policies information. */
    result?: PolicyResult;
  }

  /** Access application details. */
  export interface AppResult {
    /** Application ID. */
    id?: string;
    /** Application name. */
    name?: string;
    /** The domain and path that Access blocks. */
    domain?: string;
    aud?: string;
    /** Policies of the application. */
    policies?: PolicyResult[];
    /** The identity providers selected for application. */
    allowed_idps?: string[];
    /** Option to skip identity provider selection if only one is configured in allowed_idps. */
    auto_redirect_to_identity?: boolean;
    /** The amount of time that the tokens issued for this application are valid. */
    session_duration?: string;
    /** Application type. */
    type?: string;
    /** UUID, same as ID. */
    uid?: string;
    /** Created time of the application. */
    created_at?: string;
    /** Updated time of the application. */
    updated_at?: string;
  }

  /** Access certificate details. */
  export interface CertResult {
    /** Access certificate ID. */
    id?: string;
    /** access certificate name. */
    name?: string;
    /** Fingerprint of the certificate. */
    fingerprint?: string;
    /** The hostnames that are prompted for this certificate. */
    associated_hostnames?: string[];
    /** Created time of the access certificate. */
    created_at?: string;
    /** Updated time of the access certificate. */
    updated_at?: string;
    /** Expire time of the access certificate. */
    expires_on?: string;
  }

  /** CertSettingsResult. */
  export interface CertSettingsResult {
    hostname?: string;
    china_network?: boolean;
    client_certificate_forwarding?: boolean;
  }

  /** Create access application response. */
  export interface CreateAccessAppResp {
    /** Was operation successful. */
    success?: boolean;
    /** Array of errors encountered. */
    errors?: string[][];
    /** Array of messages returned. */
    messages?: string[][];
    /** Access application details. */
    result?: CreateAccessAppRespResult;
  }

  /** Delete access application response. */
  export interface DeleteAccessAppResp {
    /** Was operation successful. */
    success?: boolean;
    /** Array of errors encountered. */
    errors?: string[][];
    /** Array of messages returned. */
    messages?: string[][];
    result?: DeleteAccessAppRespResult;
  }

  /** Delete access certificate response. */
  export interface DeleteAccessCertResp {
    /** Was operation successful. */
    success?: boolean;
    /** Array of errors encountered. */
    errors?: string[][];
    /** Array of messages returned. */
    messages?: string[][];
    result?: DeleteAccessCertRespResult;
  }

  /** Delete access policy response. */
  export interface DeleteAccessPolicyResp {
    /** Was operation successful. */
    success?: boolean;
    /** Array of errors encountered. */
    errors?: string[][];
    /** Array of messages returned. */
    messages?: string[][];
    result?: DeleteAccessPolicyRespResult;
  }

  /** List access applications response. */
  export interface ListAccessAppsResp {
    /** Was operation successful. */
    success?: boolean;
    /** Array of errors encountered. */
    errors?: string[][];
    /** Array of messages returned. */
    messages?: string[][];
    result?: AppResult[];
  }

  /** List access certificate response. */
  export interface ListAccessCertsResp {
    /** Was operation successful. */
    success?: boolean;
    /** Array of errors encountered. */
    errors?: string[][];
    /** Array of messages returned. */
    messages?: string[][];
    result?: CertResult[];
  }

  /** List access policies response. */
  export interface ListAccessPoliciesResp {
    /** Was operation successful. */
    success?: boolean;
    /** Array of errors encountered. */
    errors?: string[][];
    /** Array of messages returned. */
    messages?: string[][];
    result?: PolicyResult[];
  }

  /** Access policies information. */
  export interface PolicyResult {
    /** Policy ID. */
    id?: string;
    /** Policy name. */
    name?: string;
    /** The action Access takes if the policy matches the user. */
    decision?: string;
    /** The include policy works like an OR logical operator. */
    include?: PolicyRule[];
    /** The exclude policy works like a NOT logical operator. */
    exclude?: PolicyRule[];
    /** The unique precedence for policies on a single application. */
    precedence?: number;
    /** The require policy works like a AND logical operator. */
    require?: PolicyRule[];
    /** UUID, same as ID. */
    uid?: string;
    /** Created time of the policy. */
    created_at?: string;
    /** Updated time of the policy. */
    updated_at?: string;
  }

  /** Policy rule. */
  export interface PolicyRule {
  }

  /** Policy rule of certificate. */
  export interface PolicyRulePolicyCertRule extends PolicyRule {
    certificate?: JsonObject;
  }

  /** Policy rule of common name. */
  export interface PolicyRulePolicyCnRule extends PolicyRule {
    common_name: PolicyCnRuleCommonName;
  }
}

export = MtlsV1;
