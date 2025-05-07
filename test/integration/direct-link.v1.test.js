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

/*

How to run this test:     

npm run test-integration
    or
jest test/integration/direct-link.v1.test.js

*/

'use strict';

const DirectLinkV1 = require('../../dist/direct-link/v1');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

const currentDate = new Date();
const timestamp = currentDate.getTime().toString();

// Ten seconds
const timeout = 120000;

// Location of our config file.
const configFile = 'directlink.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

// Retrieve the config file as an object.
// We do this because we're going to directly use the
// config properties, rather than let the SDK do it for us.
const config = authHelper.loadConfig();

const poll = async (fn, fnCondition, sec) => {
  let result;
  let timerCount = 0;
  const pollInterval = 5;
  const maxIterations = Math.trunc(sec / pollInterval);

  // eslint-disable-next-line no-constant-condition
  let done = false;
  while (!done) {
    try {
      const response = await fn();
      result = response.result || {};

      if (timerCount >= maxIterations || fnCondition(result)) {
        done = true;
      }
    } catch (err) {
      result = err || {};
      if (timerCount >= maxIterations || fnCondition(result)) {
        done = true;
      }
    }

    if (!done) {
      await wait(pollInterval * 1000); // convert to seconds
      timerCount++;
    }
  }
  return result;
};

const wait = (ms = 5000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const get_port = (ports) => {
  const providerToBeUsed = 'DL2-TEST';
  const port = ports.find((port) => port.provider_name === providerToBeUsed);
  return port;
};

describe('DirectLinkV1', () => {
  const options = {
    authenticator: new IamAuthenticator({
      apikey: config.IAMAPIKEY,
      url: config.IAMURL,
    }),
    serviceUrl: config.SERVICE_URL,
    version: '2022-11-14',
  };

  // Initialize the service client.
  const dlService = new DirectLinkV1(options);

  describe.skip('Create/verify a dedicated gateway', () => {
    jest.setTimeout(timeout);

    // GatewayTemplate for dedicated gateway
    const gatewayTemplate = {
      name: 'NODE-INT-SDK-DEDICATED-' + timestamp,
      type: 'dedicated',
      speed_mbps: 1000,
      global: true,
      bgp_asn: 64999,
      bgp_base_cidr: '169.254.0.0/16',
      metered: false,
      carrier_name: 'myCarrierName',
      customer_name: 'newCustomerName',
      cross_connect_router: 'LAB-xcr01.dal09',
      location_name: config.LOCATION_NAME,
      vlan: 10,
    };

    // Save the gateway ID for deletion
    let gatewayId = '';

    // create a dedicated gateway and verify the results
    it('Successfully create a dedicated gateway', (done) => {
      const params = {
        gatewayTemplate: gatewayTemplate,
      };
      try {
        dlService.createGateway(params).then((response) => {
          expect(response.hasOwn('status')).toBe(true);
          expect(response.status).toBe(201);
          if (null != response && null != response.result && null != response.result.id) {
            gatewayId = response.result.id;
          }

          expect(response.result.id).toBeDefined();
          expect(response.result.name).toBe(gatewayTemplate.name);
          expect(response.result.type).toBe(gatewayTemplate.type);
          expect(response.result.speed_mbps).toBe(gatewayTemplate.speed_mbps);
          expect(response.result.global).toBe(gatewayTemplate.global);
          expect(response.result.bgp_asn).toBe(gatewayTemplate.bgp_asn);
          expect(response.result.bgp_cer_cidr).toBeDefined();
          expect(response.result.bgp_ibm_cidr).toBeDefined();
          expect(response.result.metered).toBe(gatewayTemplate.metered);
          expect(response.result.cross_connect_router).toBe(gatewayTemplate.cross_connect_router);
          expect(response.result.location_name).toBe(gatewayTemplate.location_name);
          expect(response.result.created_at).toBeDefined();
          expect(response.result.link_status).toBe('down');
          expect(response.result.operational_status).toBe('awaiting_loa');
          expect(response.result.resource_group).toBeDefined();
          expect(response.result.vlan).toBe(10);
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // get the dedicated gateway and verify name/id
    it('Successfully get a dedicated gateway', (done) => {
      const params = {
        id: gatewayId,
      };

      try {
        dlService.getGateway(params).then((response) => {
          expect(response.status).toBe(200);
          expect(response.result.name).toBe(gatewayTemplate.name);
          expect(response.result.id).toBe(gatewayId);

          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // List the gateways and verify the gateway created is in the list
    it('Successfully list all gateways', (done) => {
      try {
        return dlService.listGateways({}).then((response) => {
          expect(response.status).toBe(200);
          if (null != response && null != response.result && null != response.result.gateways) {
            // loop through the list of gateways.  If we find the id of the gateway created, verify the name is correct.
            for (const gw of response.result.gateways) {
              if (gw.id == gatewayId) {
                expect(gw.name).toBe(gatewayTemplate.name);
              }
            }
          }

          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // update a dedicated gateway and verify the results
    it('Successfully update a gateway', (done) => {
      // Gateway prams for patching dedicated gateway
      const params = {
        id: gatewayId,
        name: 'NODE-INT-SDK-DEDICATED-PATCH-' + timestamp,
        speedMbps: 1000,
        global: false,
        metered: true,
        loaRejectReason: 'testing patch',
        vlan: 99,
      };
      try {
        dlService.updateGateway(params).then((response) => {
          expect(response.status).toBe(200);
          expect(response.result.id).toBe(gatewayId);
          expect(response.result.name).toBe(params.name);
          expect(response.result.type).toBe(gatewayTemplate.type);
          expect(response.result.speed_mbps).toBe(params.speedMbps);
          expect(response.result.global).toBe(params.global);
          expect(response.result.bgp_asn).toBe(gatewayTemplate.bgp_asn);
          expect(response.result.bgp_cer_cidr).toBeDefined();
          expect(response.result.bgp_ibm_cidr).toBeDefined();
          expect(response.result.cross_connect_router).toBe(gatewayTemplate.cross_connect_router);
          expect(response.result.location_name).toBe(gatewayTemplate.location_name);
          expect(response.result.created_at).toBeDefined();
          expect(response.result.link_status).toBe('down');
          expect(response.result.resource_group).toBeDefined();
          expect(response.result.type).toBe(gatewayTemplate.type);
          expect(response.result.vlan).toBe(99);
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // update a dedicated gateway and verify the vlan with null
    it('Successfully update a gateway with vlan cleared', (done) => {
      // Gateway prams for vlan clearing in dedicated gateway
      const params = {
        id: gatewayId,
        name: 'NODE-INT-SDK-DEDICATED-NULL-VLAN-' + timestamp,
        speedMbps: 1000,
        vlan: null,
      };
      try {
        dlService.updateGateway(params).then((response) => {
          expect(response.status).toBe(200);
          expect(response.result.id).toBe(gatewayId);
          expect(response.result.name).toBe(params.name);
          expect(response.result.type).toBe(gatewayTemplate.type);
          expect(response.result.speed_mbps).toBe(params.speedMbps);
          expect(response.result.vlan).toBeUndefined();
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // delete the dedicated gateway
    it('Successfully delete the gateway', (done) => {
      const params = {
        id: gatewayId,
      };

      try {
        dlService.deleteGateway(params).then((response) => {
          expect(response.status).toBe(204);
          done();
        });
      } catch (err) {
        done(err);
      }
    });
  });

  describe.skip('Create/verify a connect gateway', () => {
    jest.setTimeout(timeout);

    let port = null;
    let gatewayId = '';

    it('List ports and save the id of the first port', (done) => {
      try {
        dlService.listPorts({}).then((response) => {
          expect(response.status).toBe(200);
          if (null != response && null != response.result && null != response.result.ports) {
            port = get_port(response.result.ports);
          }
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // create a connect gateway and verify the results
    it('Successfully create a connect gateway', (done) => {
      const gatewayTemplate = {
        name: 'NODE-INT-SDK-CONNECT-' + timestamp,
        type: 'connect',
        speed_mbps: 1000,
        bgp_asn: 64999,
        global: false,
        metered: false,
        port: { id: port.id },
      };
      const params = {
        gatewayTemplate: gatewayTemplate,
      };
      try {
        dlService.createGateway(params).then((response) => {
          expect(response.status).toBe(201);
          expect(response.result.id).toBeDefined();
          if (null != response && null != response.result && null != response.result.id) {
            gatewayId = response.result.id;
          }

          // make sure all the expected fields are present
          expect(response.result.resource_group).toBeDefined();
          expect(response.result.bgp_asn).toBe(gatewayTemplate.bgp_asn);
          expect(response.result.bgp_cer_cidr).toBeDefined();
          expect(response.result.bgp_ibm_cidr).toBeDefined();
          expect(response.result.global).toBe(gatewayTemplate.global);
          expect(response.result.location_name).toBeDefined();
          expect(response.result.name).toBe(gatewayTemplate.name);
          expect(response.result.speed_mbps).toBe(gatewayTemplate.speed_mbps);
          expect(response.result.operational_status).toBeDefined();
          expect(response.result.bgp_status).toBeDefined();
          expect(response.result.type).toBe(gatewayTemplate.type);
          expect(response.result.crn).toBeDefined();
          expect(response.result.created_at).toBeDefined();
          expect(response.result.metered).toBe(gatewayTemplate.metered);
          expect(response.result.location_display_name).toBeDefined();
          expect(response.result.bgp_ibm_asn).toBeDefined();
          expect(response.result.port.id).toBe(port.id);
          expect(response.result.provider_api_managed).toBe(false);
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // Before we can delete the connect gateway, it need to be in provisioned state.  Wait for that to happen
    it('should successfully wait for gateway to be provisioned', async (done) => {
      try {
        const result = await poll(
          () => dlService.getGateway({ id: gatewayId }),
          (result) => result.operational_status === 'provisioned',
          50
        );

        expect(result).toBeDefined();
        expect(result.operational_status).toEqual('provisioned');
        done();
      } catch (err) {
        done(err);
      }
    });

    // delete the connect gateway
    it('Successfully delete the connect gateway', (done) => {
      const params = {
        id: gatewayId,
      };

      try {
        dlService.deleteGateway(params).then((response) => {
          expect(response.status).toBe(204);
          done();
        });
      } catch (err) {
        done(err);
      }
    });
  });

  describe.skip('Gateway AS Prepends', () => {
    jest.setTimeout(timeout);

    // AsPrependTemplate
    const asPrependTemplate = {
      length: 4,
      policy: 'import',
      prefix: '172.17.0.0/16',
    };

    // AsPrependPrefixArrayTemplate
    const asPrependPrefixArrayTemplate = {
      length: 4,
      policy: 'import',
      specific_prefixes: ['192.168.3.0/24'],
    };

    // GatewayTemplate for dedicated gateway
    const gatewayTemplate = {
      as_prepends: [asPrependTemplate],
      name: 'NODE-INT-SDK-DEDICATED-ASP' + timestamp,
      type: 'dedicated',
      speed_mbps: 1000,
      global: true,
      bgp_asn: 64999,
      bgp_base_cidr: '169.254.0.0/16',
      metered: false,
      carrier_name: 'myCarrierName',
      customer_name: 'newCustomerName',
      cross_connect_router: 'LAB-xcr01.dal09',
      location_name: config.LOCATION_NAME,
    };

    // Save the ID for list as_prepends and deletion
    let gatewayId = '';

    // create a dedicated gateway and verify the results
    it('Successfully create a dedicated gateway', (done) => {
      const params = {
        gatewayTemplate: gatewayTemplate,
      };
      try {
        dlService.createGateway(params).then((response) => {
          expect(response.status).toBe(201);
          expect(response.result.id).toBeDefined();
          if (null != response && null != response.result && null != response.result.id) {
            gatewayId = response.result.id;
          }
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    let eTag = '';

    it('Successfully get the list of AS prepends for the gateway', (done) => {
      try {
        dlService.listGatewayAsPrepends({ gatewayId }).then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(200);
          expect(Object.keys(response.result.as_prepends).length).toBe(1);
          eTag = response.headers['etag'];
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    const asPrepends = [asPrependPrefixArrayTemplate];

    it('Successfully replace the given set of AS prepends on the gateway', (done) => {
      try {
        dlService
          .replaceGatewayAsPrepends({
            gatewayId,
            ifMatch: eTag,
            asPrepends,
          })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(201);
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    // delete the gateway
    it('Successfully delete the gateway', (done) => {
      try {
        dlService.deleteGateway({ id: gatewayId }).then((response) => {
          expect(response.status).toBe(204);
          done();
        });
      } catch (err) {
        done(err);
      }
    });
  });

  describe.skip('DirectLink virtual connections', () => {
    jest.setTimeout(timeout);

    // GatewayTemplate for dedicated gateway
    const gatewayTemplate = {
      name: 'NODE-INT-SDK-DEDICATED-VC' + timestamp,
      type: 'dedicated',
      speed_mbps: 1000,
      global: true,
      bgp_asn: 64999,
      bgp_base_cidr: '169.254.0.0/16',
      metered: false,
      carrier_name: 'myCarrierName',
      customer_name: 'newCustomerName',
      cross_connect_router: 'LAB-xcr01.dal09',
      location_name: config.LOCATION_NAME,
    };
    // Save the IDs for deletion
    let gatewayId = '';
    let classicVcId = '';
    let genTwoVcId = '';

    const classicVcName = 'NODE-INT-CLASSIC-VC-SDK-' + timestamp;
    const genTwoVcName = 'NODE-INT-GEN-TWO-VC-SDK-' + timestamp;

    // create a dedicated gateway and verify the results
    it('Successfully create a dedicated gateway', (done) => {
      const params = {
        gatewayTemplate: gatewayTemplate,
      };
      try {
        dlService.createGateway(params).then((response) => {
          expect(response.status).toBe(201);
          expect(response.result.id).toBeDefined();
          if (null != response && null != response.result && null != response.result.id) {
            gatewayId = response.result.id;
          }
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully create a CLASSIC virtual connection', (done) => {
      try {
        const paramsClassicVc = {
          gatewayId: gatewayId,
          name: classicVcName,
          type: 'classic',
        };

        dlService.createGatewayVirtualConnection(paramsClassicVc).then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(201);
          expect(response.result.id).toBeDefined();
          if (null != response && null != response.result && null != response.result.id) {
            classicVcId = response.result.id;
          }
          expect(response.result.type).toBe(paramsClassicVc.type);
          expect(response.result.name).toBe(paramsClassicVc.name);
          expect(response.result.status).toBeDefined();
          expect(response.result.created_at).toBeDefined();
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully get the CLASSIC virtual connection', (done) => {
      try {
        dlService
          .getGatewayVirtualConnection({ gatewayId: gatewayId, id: classicVcId })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(200);
            expect(response.result.id).toBe(classicVcId);
            expect(response.result.type).toBe('classic');
            expect(response.result.name).toBe(classicVcName);
            expect(response.result.status).toBeDefined();
            expect(response.result.created_at).toBeDefined();
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully create a GEN 2 VPC virtual connection', (done) => {
      try {
        const paramsGenTwoVc = {
          gatewayId: gatewayId,
          name: genTwoVcName,
          type: 'vpc',
          networkId: config.GEN2_VPC_CRN,
        };

        dlService.createGatewayVirtualConnection(paramsGenTwoVc).then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(201);
          expect(response.result.id).toBeDefined();
          if (null != response && null != response.result && null != response.result.id) {
            genTwoVcId = response.result.id;
          }
          expect(response.result.type).toBe(paramsGenTwoVc.type);
          expect(response.result.name).toBe(genTwoVcName);
          expect(response.result.network_id).toBe(paramsGenTwoVc.networkId);
          expect(response.result.status).toBeDefined();
          expect(response.result.created_at).toBeDefined();
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully get the GEN 2 VPC virtual connection', (done) => {
      try {
        dlService
          .getGatewayVirtualConnection({ gatewayId: gatewayId, id: genTwoVcId })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(200);
            expect(response.result.id).toBe(genTwoVcId);
            expect(response.result.type).toBe('vpc');
            expect(response.result.name).toBe(genTwoVcName);
            expect(response.result.network_id).toBe(config.GEN2_VPC_CRN);
            expect(response.result.status).toBeDefined();
            expect(response.result.created_at).toBeDefined();
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully update a GEN 2 VPC virtual connection name', (done) => {
      try {
        dlService
          .updateGatewayVirtualConnection({
            gatewayId: gatewayId,
            id: genTwoVcId,
            name: genTwoVcName + 'PATCH',
          })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(200);
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    // Test virtual connection status update parameter; expect a failed test
    it('Fail update a GEN 2 VPC virtual connection status', (done) => {
      try {
        dlService
          .updateGatewayVirtualConnection({
            gatewayId: gatewayId,
            id: genTwoVcId,
            status: 'attached',
          })
          .then(
            () => {
              // status update will fail due to VC state.
              done();
            },
            (reason) => {
              expect(reason.status).toBe(400);
              const errObj = JSON.parse(reason.body);
              expect(errObj.errors[0].message).toBe("gateway owner can't patch vc status.");
              done();
            }
          );
      } catch (err) {
        done(err);
      }
    });

    it('Successfully get the list of virtual connections for the gateway', (done) => {
      try {
        dlService.listGatewayVirtualConnections({ gatewayId: gatewayId }).then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(200);
          // two virtual connectins were created for the gateway, make sure the list has two
          expect(Object.keys(response.result.virtual_connections).length).toBe(2);
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully delete the GEN 2 VPC virtual connection', (done) => {
      try {
        dlService
          .deleteGatewayVirtualConnection({ gatewayId: gatewayId, id: genTwoVcId })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(204);
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for GEN 2 VPC virtual connection to be deleted', async (done) => {
      try {
        const result = await poll(
          () => dlService.getGatewayVirtualConnection({ gatewayId: gatewayId, id: genTwoVcId }),
          (result) => result.status === 404,
          50
        );

        expect(result).toBeDefined();
        expect(result.status).toBe(404);
        done();
      } catch (err) {
        done(err);
      }
    });

    it('Successfully delete the CLASSIC virtual connection', (done) => {
      try {
        dlService
          .deleteGatewayVirtualConnection({ gatewayId: gatewayId, id: classicVcId })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(204);
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for CLASSIC virtual connection to be deleted', async (done) => {
      try {
        const result = await poll(
          () => dlService.getGatewayVirtualConnection({ gatewayId: gatewayId, id: classicVcId }),
          (result) => result.status === 404,
          50
        );

        expect(result).toBeDefined();
        expect(result.status).toBe(404);
        done();
      } catch (err) {
        done(err);
      }
    });

    // delete the gateway
    it('Successfully delete the gateway', (done) => {
      try {
        dlService.deleteGateway({ id: gatewayId }).then((response) => {
          expect(response.status).toBe(204);
          done();
        });
      } catch (err) {
        done(err);
      }
    });
  });

  // notes about LOA and CN testing.  When a GW is created, a github issue is also created by dl-rest.  The issue is used for managing the LOA and CN.  In normal operation,
  // an LOA is added to the issue via manual GH interaction.  After that occurs and the GH label changed, then CN upload is allowed.  Since we do not have the ability to
  // do the manual steps for integration testing, the test will only do the following
  //	- Issue GET LOA for a gateway.  It will expect a 404 error since no one has added the LOA to the GH issue
  //  - PUT a completion notice to the gw.  It will fail with a 412 error because the GH issue and GW status are in the wrong state due to no manual interaction
  //  - GET CN for a gw.  It will expect a 404 since the CN could not be uploaded
  //
  describe.skip('LOA and Completion notice', () => {
    jest.setTimeout(timeout);

    // GatewayTemplate for dedicated gateway
    const gatewayTemplate = {
      name: 'NODE-INT-SDK-DEDICATED-LOA' + timestamp,
      type: 'dedicated',
      speed_mbps: 1000,
      global: true,
      bgp_asn: 64999,
      bgp_base_cidr: '169.254.0.0/16',
      metered: false,
      carrier_name: 'myCarrierName',
      customer_name: 'newCustomerName',
      cross_connect_router: 'LAB-xcr01.dal09',
      location_name: config.LOCATION_NAME,
    };
    // Save the gateway ID for deletion
    let gatewayId = '';

    // create a dedicated gateway and verify the results
    it('Successfully create a dedicated gateway', (done) => {
      const params = {
        gatewayTemplate: gatewayTemplate,
      };
      try {
        dlService.createGateway(params).then((response) => {
          expect(response.status).toBe(201);
          expect(response.result.id).toBeDefined();
          if (null != response && null != response.result && null != response.result.id) {
            gatewayId = response.result.id;
          }
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully call loa', (done) => {
      try {
        dlService.listGatewayLetterOfAuthorization({ id: gatewayId }).then(
          // this should fail, so we don't expect a response
          () => {
            // throw an error if we get here.
            expect(false).toBe(true);
            done();
          },
          (reason) => {
            expect(reason.status).toBe(404);
            expect(reason.statusText).toBe('Not Found');
            done();
          }
        );
      } catch (err) {
        done(err);
      }
    });

    it('Successfully PUT completion notice', (done) => {
      try {
        const path = require('path');
        const fs = require('fs');
        const cnPdf = fs.readFileSync(path.join(__dirname, '../resources/completion_notice.pdf'));

        dlService
          .createGatewayCompletionNotice({
            id: gatewayId,
            upload: cnPdf,
            uploadcontentType: 'appliation/pdf',
          })
          .then(
            () => {
              // should fail since GH issue is in wrong state, so no expected response object
              // throw an error if we get here.
              expect(false).toBe(true);
              done();
            },
            (reason) => {
              expect(reason.status).toBe(412);
              expect(reason.statusText).toBe('Precondition Failed');
              done();
            }
          );
      } catch (err) {
        done(err);
      }
    });

    it('Successfully call completion notice', (done) => {
      try {
        dlService.listGatewayCompletionNotice({ id: gatewayId }).then(
          () => {
            // This should fail since cn pdf could not be uloaded.  No response expected
            // throw an error if we get here.
            expect(false).toBe(true);
            done();
          },
          (reason) => {
            expect(reason.status).toBe(404);
            expect(reason.statusText).toBe('Not Found');
            done();
          }
        );
      } catch (err) {
        done(err);
      }
    });

    // delete the gateway
    it('Successfully delete the gateway', (done) => {
      try {
        dlService.deleteGateway({ id: gatewayId }).then((response) => {
          expect(response.status).toBe(204);
          done();
        });
      } catch (err) {
        done(err);
      }
    });
  });

  describe.skip('Offering Types', () => {
    jest.setTimeout(timeout);
    let firstDedicatedOT = null;
    let firstConnectOT = null;
    it('Successfully get locations for type dedicated', (done) => {
      try {
        dlService
          .listOfferingTypeLocations({
            offeringType: 'dedicated',
          })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(200);

            expect(Object.keys(response.result.locations).length > 0).toBe(true);
            firstDedicatedOT = response.result.locations[0];

            expect(firstDedicatedOT.billing_location).toBeDefined();
            expect(firstDedicatedOT.building_colocation_owner).toBeDefined();
            expect(firstDedicatedOT.display_name).toBeDefined();
            expect(firstDedicatedOT.location_type).toBeDefined();
            // expect(firstDedicatedOT.market).toBeDefined();
            expect(firstDedicatedOT.market_geography).toBeDefined();
            expect(firstDedicatedOT.mzr).toBeDefined();
            expect(firstDedicatedOT.name).toBeDefined();
            expect(firstDedicatedOT.offering_type).toBe('dedicated');
            expect(firstDedicatedOT.vpc_region).toBeDefined();
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully get locations for type connect', (done) => {
      try {
        dlService
          .listOfferingTypeLocations({
            offeringType: 'connect',
          })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(200);
            expect(Object.keys(response.result.locations).length > 0).toBe(true);

            firstConnectOT = response.result.locations[0];
            expect(firstConnectOT.billing_location).toBeDefined();
            expect(firstConnectOT.name).toBeDefined();
            expect(firstConnectOT.display_name).toBeDefined();
            // expect(firstConnectOT.market).toBeDefined();
            expect(firstConnectOT.market_geography).toBeDefined();
            expect(firstConnectOT.mzr).toBeDefined();
            expect(firstConnectOT.offering_type).toBe('connect');
            expect(firstConnectOT.vpc_region).toBeDefined();
            expect(firstConnectOT.location_type).toBeDefined();
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully get dedicated cross connect routers using short name', (done) => {
      try {
        dlService
          .listOfferingTypeLocationCrossConnectRouters({
            offeringType: 'dedicated',
            locationName: firstDedicatedOT.name,
          })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(200);
            expect(Object.keys(response.result.cross_connect_routers).length > 0).toBe(true);

            expect(response.result.cross_connect_routers[0].router_name).toBeDefined();
            expect(response.result.cross_connect_routers[0].total_connections).toBeDefined();
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully get dedicated cross connect routers using display name', (done) => {
      try {
        dlService
          .listOfferingTypeLocationCrossConnectRouters({
            offeringType: 'dedicated',
            locationName: firstDedicatedOT.display_name,
          })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(200);
            expect(Object.keys(response.result.cross_connect_routers).length > 0).toBe(true);

            expect(response.result.cross_connect_routers[0].router_name).toBeDefined();
            expect(response.result.cross_connect_routers[0].total_connections).toBeDefined();
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully get dedicated cross connect routers using display name', (done) => {
      try {
        dlService
          .listOfferingTypeLocationCrossConnectRouters({
            offeringType: 'dedicated',
            locationName: firstDedicatedOT.display_name,
          })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(200);
            expect(Object.keys(response.result.cross_connect_routers).length > 0).toBe(true);

            expect(response.result.cross_connect_routers[0].router_name).toBeDefined();
            expect(response.result.cross_connect_routers[0].total_connections).toBeDefined();
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully list dedicate offering speeds', (done) => {
      try {
        dlService.listOfferingTypeSpeeds({ offeringType: 'dedicated' }).then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(200);
          expect(Object.keys(response.result.speeds).length > 0).toBe(true);
          expect(response.result.speeds[0].link_speed).toBeDefined();
          expect(response.result.speeds[0].capabilities).toBeDefined();
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully list connect offering speeds', (done) => {
      try {
        dlService.listOfferingTypeSpeeds({ offeringType: 'connect' }).then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(200);
          expect(Object.keys(response.result.speeds).length > 0).toBe(true);
          expect(response.result.speeds[0].link_speed).toBeDefined();
          done();
        });
      } catch (err) {
        done(err);
      }
    });
  });

  describe.skip('Ports', () => {
    jest.setTimeout(timeout);
    let firstPort = null;

    it('Successfully list ports', (done) => {
      try {
        dlService.listPorts({}).then((response) => {
          expect(response.status).toBe(200);

          firstPort = response.result.ports[0];
          expect(Object.keys(firstPort).length > 0).toBe(true);
          expect(firstPort.direct_link_count).toBeDefined();
          expect(firstPort.id).toBeDefined();
          expect(firstPort.label).toBeDefined();
          expect(firstPort.location_display_name).toBeDefined();
          expect(firstPort.location_name).toBeDefined();
          expect(firstPort.provider_name).toBeDefined();
          expect(firstPort.supported_link_speeds).toBeDefined();

          done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully get a port by id', (done) => {
      try {
        dlService.getPort({ id: firstPort.id }).then((response) => {
          expect(response.status).toBe(200);

          expect(firstPort.direct_link_count).toBeDefined();
          expect(firstPort.id).toBe(firstPort.id);
          expect(firstPort.label).toBeDefined();
          expect(firstPort.location_display_name).toBeDefined();
          expect(firstPort.location_name).toBeDefined();
          expect(firstPort.provider_name).toBeDefined();
          expect(firstPort.supported_link_speeds).toBeDefined();

          done();
        });
      } catch (err) {
        done(err);
      }
    });
  });

  describe.skip('Create MD5 enabled gateway', () => {
    // Save the gateway ID for update/delete
    let gatewayId = '';
    const time = currentDate.getTime().toString();

    // GatewayTemplate for dedicated gateway
    const gatewayTemplate = {
      name: 'NODE-INT-SDK-DEDICATED-MD5' + time,
      type: 'dedicated',
      speed_mbps: 1000,
      global: true,
      bgp_asn: 64999,
      metered: false,
      carrier_name: 'myCarrierName',
      customer_name: 'newCustomerName',
      cross_connect_router: 'LAB-xcr01.dal09',
      location_name: config.LOCATION_NAME,
      authentication_key: {
        crn: config.AUTHENTICATION_KEY,
      },
    };

    it('should successfully create a gateway with authentication key', async (done) => {
      jest.setTimeout(timeout);

      const params = {
        gatewayTemplate: gatewayTemplate,
      };

      try {
        dlService.createGateway(params).then((response) => {
          expect(response.hasOwn('status')).toBe(true);
          expect(response.status).toBe(201);
          if (null != response && null != response.result && null != response.result.id) {
            gatewayId = response.result.id;
          }

          expect(response.result.id).toBeDefined();
          expect(response.result.name).toBe(gatewayTemplate.name);
          expect(response.result.type).toBe(gatewayTemplate.type);
          expect(response.result.speed_mbps).toBe(gatewayTemplate.speed_mbps);
          expect(response.result.global).toBe(gatewayTemplate.global);
          expect(response.result.bgp_asn).toBe(gatewayTemplate.bgp_asn);
          expect(response.result.bgp_cer_cidr).toBeDefined();
          expect(response.result.bgp_ibm_cidr).toBeDefined();
          expect(response.result.metered).toBe(gatewayTemplate.metered);
          expect(response.result.cross_connect_router).toBe(gatewayTemplate.cross_connect_router);
          expect(response.result.location_name).toBe(gatewayTemplate.location_name);
          expect(response.result.location_display_name).toBe(config.LOCATION_DISPLAY_NAME);
          expect(response.result.created_at).toBeDefined();
          expect(response.result.link_status).toBe('down');
          expect(response.result.operational_status).toBe('awaiting_loa');
          expect(response.result.resource_group).toBeDefined();
          expect(response.result.authentication_key.crn).toBe(config.AUTHENTICATION_KEY);
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('should successfully clear/update the authentication key', async (done) => {
      const params = {
        id: gatewayId,
        authenticationKey: {
          crn: '',
        },
      };

      try {
        dlService.updateGateway(params).then((response) => {
          expect(response.status).toBe(200);
          expect(response.result.id).toBe(gatewayId);
          expect(response.result.name).toBe(gatewayTemplate.name);
          expect(response.result.type).toBe(gatewayTemplate.type);
          expect(response.result.authentication_key).toBeUndefined();
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // delete the dedicated gateway
    it('Successfully delete the gateway', (done) => {
      const params = {
        id: gatewayId,
      };

      try {
        dlService.deleteGateway(params).then((response) => {
          expect(response.status).toBe(204);
          done();
        });
      } catch (err) {
        done(err);
      }
    });
  });

  describe.skip('DLAAS', () => {
    // Save the gateway ID for update/delete
    let gatewayId = '';
    const time = currentDate.getTime().toString();

    describe('Create/verify/update a dedicated Gateway', () => {
      // GatewayTemplate for dedicated gateway
      const gatewayTemplate = {
        name: 'NODE-INT-SDK-DEDICATED-DLAAS-' + time,
        type: 'dedicated',
        speed_mbps: 1000,
        global: true,
        bgp_asn: 64999,
        metered: false,
        carrier_name: 'myCarrierName',
        customer_name: 'newCustomerName',
        cross_connect_router: 'LAB-xcr01.dal09',
        location_name: config.LOCATION_NAME,
        connection_mode: 'direct',
      };

      it('should successfully create a dedicated gateway with connection mode as direct', async (done) => {
        jest.setTimeout(timeout);

        const params = {
          gatewayTemplate: gatewayTemplate,
        };

        try {
          dlService.createGateway(params).then((response) => {
            expect(response.hasOwn('status')).toBe(true);
            expect(response.status).toBe(201);
            if (null != response && null != response.result && null != response.result.id) {
              gatewayId = response.result.id;
            }

            expect(response.result.id).toBeDefined();
            expect(response.result.name).toBe(gatewayTemplate.name);
            expect(response.result.type).toBe(gatewayTemplate.type);
            expect(response.result.speed_mbps).toBe(gatewayTemplate.speed_mbps);
            expect(response.result.global).toBe(gatewayTemplate.global);
            expect(response.result.bgp_asn).toBe(gatewayTemplate.bgp_asn);
            expect(response.result.bgp_cer_cidr).toBeDefined();
            expect(response.result.bgp_ibm_cidr).toBeDefined();
            expect(response.result.metered).toBe(gatewayTemplate.metered);
            expect(response.result.cross_connect_router).toBe(gatewayTemplate.cross_connect_router);
            expect(response.result.location_name).toBe(gatewayTemplate.location_name);
            expect(response.result.location_display_name).toBe(config.LOCATION_DISPLAY_NAME);
            expect(response.result.created_at).toBeDefined();
            expect(response.result.link_status).toBe('down');
            expect(response.result.operational_status).toBe('awaiting_loa');
            expect(response.result.resource_group).toBeDefined();
            expect(response.result.connection_mode).toBe('direct');
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      it('should successfully update the connection_mode to transit', async (done) => {
        const params = {
          id: gatewayId,
          connectionMode: 'transit',
        };

        try {
          dlService.updateGateway(params).then((response) => {
            expect(response.status).toBe(200);
            expect(response.result.id).toBe(gatewayId);
            expect(response.result.name).toBe(gatewayTemplate.name);
            expect(response.result.type).toBe(gatewayTemplate.type);
            expect(response.result.connection_mode).toBe('transit');
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      // delete the dedicated gateway
      it('Successfully delete the gateway', (done) => {
        const params = {
          id: gatewayId,
        };

        try {
          dlService.deleteGateway(params).then((response) => {
            expect(response.status).toBe(204);
            done();
          });
        } catch (err) {
          done(err);
        }
      });
    });

    describe('Create/verify/update a connect gateway', () => {
      jest.setTimeout(timeout);

      let port = null;
      let gatewayId = '';
      const gatewayTemplate = {
        name: 'NODE-INT-SDK-CONNECT-DLAAS-' + timestamp,
        type: 'connect',
        speed_mbps: 1000,
        bgp_asn: 64999,
        global: false,
        metered: false,
        connection_mode: 'transit',
      };

      it('should list ports and save the id of the first port', (done) => {
        try {
          dlService.listPorts({}).then((response) => {
            expect(response.status).toBe(200);
            if (null != response && null != response.result && null != response.result.ports) {
              port = get_port(response.result.ports);
            }
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      it('should successfully create a connect gateway with connection mode as transit', (done) => {
        const params = {
          gatewayTemplate: { ...gatewayTemplate, port: { id: port.id } },
        };
        try {
          dlService.createGateway(params).then((response) => {
            expect(response.status).toBe(201);
            expect(response.result.id).toBeDefined();
            if (null != response && null != response.result && null != response.result.id) {
              gatewayId = response.result.id;
            }

            // make sure all the expected fields are present
            expect(response.result.bgp_asn).toBe(gatewayTemplate.bgp_asn);
            expect(response.result.global).toBe(gatewayTemplate.global);
            expect(response.result.name).toBe(gatewayTemplate.name);
            expect(response.result.speed_mbps).toBe(gatewayTemplate.speed_mbps);
            expect(response.result.bgp_status).toBeDefined();
            expect(response.result.type).toBe(gatewayTemplate.type);
            expect(response.result.crn).toBeDefined();
            expect(response.result.metered).toBe(gatewayTemplate.metered);
            expect(response.result.location_display_name).toBeDefined();
            expect(response.result.port.id).toBe(port.id);
            expect(response.result.connection_mode).toBe('transit');
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      // Before we can delete the connect gateway, it need to be in provisioned state.  Wait for that to happen
      it('should successfully wait for gateway to be provisioned', async (done) => {
        try {
          const result = await poll(
            () => dlService.getGateway({ id: gatewayId }),
            (result) => result.operational_status === 'provisioned',
            50
          );

          expect(result).toBeDefined();
          expect(result.operational_status).toEqual('provisioned');
          done();
        } catch (err) {
          done(err);
        }
      });

      it('should successfully update the connection_mode to direct', async (done) => {
        const params = {
          id: gatewayId,
          connectionMode: 'direct',
        };

        try {
          dlService.updateGateway(params).then((response) => {
            expect(response.status).toBe(200);
            expect(response.result.id).toBe(gatewayId);
            expect(response.result.name).toBe(gatewayTemplate.name);
            expect(response.result.type).toBe(gatewayTemplate.type);
            expect(response.result.connection_mode).toBe('direct');
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      // Before we can delete the connect gateway, it need to be in provisioned state.  Wait for that to happen
      it('should successfully wait for gateway to be provisioned', async (done) => {
        try {
          const result = await poll(
            () => dlService.getGateway({ id: gatewayId }),
            (result) => result.operational_status === 'provisioned',
            50
          );

          expect(result).toBeDefined();
          expect(result.operational_status).toEqual('provisioned');
          done();
        } catch (err) {
          done(err);
        }
      });

      // delete the connect gateway
      it('Successfully delete the connect gateway', (done) => {
        const params = {
          id: gatewayId,
        };

        try {
          dlService.deleteGateway(params).then((response) => {
            expect(response.status).toBe(204);
            done();
          });
        } catch (err) {
          done(err);
        }
      });
    });
  });

  describe.skip('BGP IP Update', () => {
    // Save the gateway ID for update/delete
    let gatewayId = '';
    const time = currentDate.getTime().toString();

    describe('Create/verify/update a dedicated Gateway', () => {
      // GatewayTemplate for dedicated gateway
      const gatewayTemplate = {
        name: 'NODE-INT-SDK-DEDICATED-BGP-IP-' + time,
        type: 'dedicated',
        speed_mbps: 1000,
        global: true,
        bgp_asn: 64999,
        metered: false,
        carrier_name: 'myCarrierName',
        customer_name: 'newCustomerName',
        cross_connect_router: 'LAB-xcr01.dal09',
        location_name: config.LOCATION_NAME,
      };

      it('should successfully create a dedicated gateway', async (done) => {
        jest.setTimeout(timeout);

        const params = {
          gatewayTemplate: gatewayTemplate,
        };

        try {
          dlService.createGateway(params).then((response) => {
            expect(response.hasOwn('status')).toBe(true);
            expect(response.status).toBe(201);
            if (null != response && null != response.result && null != response.result.id) {
              gatewayId = response.result.id;
            }

            expect(response.result.id).toBeDefined();
            expect(response.result.name).toBe(gatewayTemplate.name);
            expect(response.result.type).toBe(gatewayTemplate.type);
            expect(response.result.speed_mbps).toBe(gatewayTemplate.speed_mbps);
            expect(response.result.global).toBe(gatewayTemplate.global);
            expect(response.result.bgp_asn).toBe(gatewayTemplate.bgp_asn);
            expect(response.result.bgp_cer_cidr).toBeDefined();
            expect(response.result.bgp_ibm_cidr).toBeDefined();
            expect(response.result.metered).toBe(gatewayTemplate.metered);
            expect(response.result.cross_connect_router).toBe(gatewayTemplate.cross_connect_router);
            expect(response.result.location_name).toBe(gatewayTemplate.location_name);
            expect(response.result.location_display_name).toBe(config.LOCATION_DISPLAY_NAME);
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      it('should successfully update the bgp_asn', async (done) => {
        const params = {
          id: gatewayId,
          bgpAsn: 63999,
        };

        try {
          dlService.updateGateway(params).then((response) => {
            expect(response.status).toBe(200);
            expect(response.result.id).toBe(gatewayId);
            expect(response.result.name).toBe(gatewayTemplate.name);
            expect(response.result.bgp_asn).toBe(63999);
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      it('should successfully update the bgp_cer_cidr and bgp_ibm_cidr', async (done) => {
        const params = {
          id: gatewayId,
          bgpCerCidr: '172.17.252.2/29',
          bgpIbmCidr: '172.17.252.1/29',
        };

        try {
          dlService.updateGateway(params).then((response) => {
            expect(response.status).toBe(200);
            expect(response.result.id).toBe(gatewayId);
            expect(response.result.name).toBe(gatewayTemplate.name);
            expect(response.result.bgp_cer_cidr).toBe(params.bgpCerCidr);
            expect(response.result.bgp_ibm_cidr).toBe(params.bgpIbmCidr);
            done();
          });
        } catch (err) {
          expect(err.status).toBe(400);
          expect(err.message).toBe('Please make sure localIP and remoteIP are not in use');
          done();
        }
      });

      // delete the dedicated gateway
      it('Successfully delete the gateway', (done) => {
        const params = {
          id: gatewayId,
        };

        try {
          dlService.deleteGateway(params).then((response) => {
            expect(response.status).toBe(204);
            done();
          });
        } catch (err) {
          done(err);
        }
      });
    });

    describe('Create/verify/update a connect gateway', () => {
      jest.setTimeout(timeout);

      let port = null;
      let gatewayId = '';
      const gatewayTemplate = {
        name: 'NODE-INT-SDK-CONNECT-BGP-IP-' + timestamp,
        type: 'connect',
        speed_mbps: 1000,
        bgp_asn: 64999,
        global: false,
        metered: false,
      };

      it('should list ports and save the id of the first port', (done) => {
        try {
          dlService.listPorts({}).then((response) => {
            expect(response.status).toBe(200);
            if (null != response && null != response.result && null != response.result.ports) {
              port = get_port(response.result.ports);
            }
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      it('should successfully create a connect gateway with connection mode as transit', (done) => {
        const params = {
          gatewayTemplate: { ...gatewayTemplate, port: { id: port.id } },
        };
        try {
          dlService.createGateway(params).then((response) => {
            expect(response.status).toBe(201);
            expect(response.result.id).toBeDefined();
            if (null != response && null != response.result && null != response.result.id) {
              gatewayId = response.result.id;
            }

            // make sure all the expected fields are present
            expect(response.result.bgp_asn).toBe(gatewayTemplate.bgp_asn);
            expect(response.result.global).toBe(gatewayTemplate.global);
            expect(response.result.name).toBe(gatewayTemplate.name);
            expect(response.result.speed_mbps).toBe(gatewayTemplate.speed_mbps);
            expect(response.result.type).toBe(gatewayTemplate.type);
            expect(response.result.metered).toBe(gatewayTemplate.metered);
            expect(response.result.port.id).toBe(port.id);
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      // Wait for the gateway to move to provisioned state
      it('should successfully wait for gateway to be provisioned', async (done) => {
        try {
          const result = await poll(
            () => dlService.getGateway({ id: gatewayId }),
            (result) => result.operational_status === 'provisioned',
            50
          );

          expect(result).toBeDefined();
          expect(result.operational_status).toEqual('provisioned');
          done();
        } catch (err) {
          done(err);
        }
      });

      it('should successfully update the bgp_asn', async (done) => {
        const params = {
          id: gatewayId,
          bgpAsn: 63999,
        };

        try {
          dlService.updateGateway(params).then((response) => {
            expect(response.status).toBe(200);
            expect(response.result.id).toBe(gatewayId);
            expect(response.result.name).toBe(gatewayTemplate.name);
            expect(response.result.type).toBe(gatewayTemplate.type);
            expect(response.result.bgp_asn).toBe(63999);
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      // Wait for the gateway to move to provisioned state
      it('should successfully wait for gateway to be provisioned', async (done) => {
        try {
          const result = await poll(
            () => dlService.getGateway({ id: gatewayId }),
            (result) => result.operational_status === 'provisioned',
            50
          );

          expect(result).toBeDefined();
          expect(result.operational_status).toEqual('provisioned');
          done();
        } catch (err) {
          done(err);
        }
      });

      it('should successfully update the bgp_cer_cidr and bgp_ibm_cidr', async (done) => {
        const params = {
          id: gatewayId,
          bgpCerCidr: '172.17.252.2/29',
          bgpIbmCidr: '172.17.252.1/29',
        };

        try {
          dlService.updateGateway(params).then((response) => {
            expect(response.status).toBe(200);
            expect(response.result.id).toBe(gatewayId);
            expect(response.result.name).toBe(gatewayTemplate.name);
            expect(response.result.bgp_cer_cidr).toBe(params.bgpCerCidr);
            expect(response.result.bgp_ibm_cidr).toBe(params.bgpIbmCidr);
            done();
          });
        } catch (err) {
          expect(err.status).toBe(400);
          expect(err.message).toBe('Please make sure localIP and remoteIP are not in use');
          done();
        }
      });

      // Wait for the gateway to move to provisioned state
      it('should successfully wait for gateway to be provisioned', async (done) => {
        try {
          const result = await poll(
            () => dlService.getGateway({ id: gatewayId }),
            (result) => result.operational_status === 'provisioned',
            50
          );

          expect(result).toBeDefined();
          expect(result.operational_status).toEqual('provisioned');
          done();
        } catch (err) {
          done(err);
        }
      });

      // delete the connect gateway
      it('Successfully delete the connect gateway', (done) => {
        const params = {
          id: gatewayId,
        };

        try {
          dlService.deleteGateway(params).then((response) => {
            expect(response.status).toBe(204);
            done();
          });
        } catch (err) {
          done(err);
        }
      });
    });
  });

  describe.skip('BFD Config and Gateway Status', () => {
    // Save the gateway ID for update/delete
    let gatewayId = '';
    const time = currentDate.getTime().toString();

    describe('Create/verify/update a dedicated Gateway', () => {
      const bfdConfig = {
        interval: 1000,
        multiplier: 2,
      };

      // GatewayTemplate for dedicated gateway
      const gatewayTemplate = {
        name: 'NODE-INT-SDK-DEDICATED-BFD-' + time,
        type: 'dedicated',
        speed_mbps: 1000,
        global: true,
        bgp_asn: 64999,
        metered: false,
        carrier_name: 'myCarrierName',
        customer_name: 'newCustomerName',
        cross_connect_router: 'LAB-xcr01.dal09',
        location_name: config.LOCATION_NAME,
        bfd_config: bfdConfig,
      };

      it('should successfully create a dedicated gateway', async (done) => {
        jest.setTimeout(timeout);

        const params = {
          gatewayTemplate: gatewayTemplate,
        };

        try {
          dlService.createGateway(params).then((response) => {
            expect(response.hasOwn('status')).toBe(true);
            expect(response.status).toBe(201);
            if (null != response && null != response.result && null != response.result.id) {
              gatewayId = response.result.id;
            }

            expect(response.result.id).toBeDefined();
            expect(response.result.name).toBe(gatewayTemplate.name);
            expect(response.result.type).toBe(gatewayTemplate.type);
            expect(response.result.speed_mbps).toBe(gatewayTemplate.speed_mbps);
            expect(response.result.global).toBe(gatewayTemplate.global);
            expect(response.result.bgp_asn).toBe(gatewayTemplate.bgp_asn);
            expect(response.result.bgp_cer_cidr).toBeDefined();
            expect(response.result.bgp_ibm_cidr).toBeDefined();
            expect(response.result.metered).toBe(gatewayTemplate.metered);
            expect(response.result.cross_connect_router).toBe(gatewayTemplate.cross_connect_router);
            expect(response.result.location_name).toBe(gatewayTemplate.location_name);
            expect(response.result.location_display_name).toBe(config.LOCATION_DISPLAY_NAME);
            expect(response.result.bfd_config).toBeDefined();
            expect(response.result.bfd_config.interval).toBe(bfdConfig.interval);
            expect(response.result.bfd_config.multiplier).toBe(bfdConfig.multiplier);
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      it('should successfully update the bfd_config', async (done) => {
        const updatedBfdConfig = {
          interval: 500,
          multiplier: 100,
        };

        const params = {
          id: gatewayId,
          bfdConfig: updatedBfdConfig,
        };

        try {
          dlService.updateGateway(params).then((response) => {
            expect(response.status).toBe(200);
            expect(response.result.id).toBe(gatewayId);
            expect(response.result.name).toBe(gatewayTemplate.name);
            expect(response.result.bfd_config).toBeDefined();
            expect(response.result.bfd_config.interval).toBe(updatedBfdConfig.interval);
            expect(response.result.bfd_config.multiplier).toBe(updatedBfdConfig.multiplier);
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      it('should successfully get the gateway status', async (done) => {
        const params = {
          id: gatewayId,
          type: 'link',
        };
        try {
          dlService.getGatewayStatus(params).then((response) => {
            expect(response.status).toBe(200);
            expect(response.result.status).toBeDefined();
            expect(response.result.status.length).toBeGreaterThanOrEqual(1);
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      // delete the dedicated gateway
      it('Successfully delete the gateway', (done) => {
        const params = {
          id: gatewayId,
        };

        try {
          dlService.deleteGateway(params).then((response) => {
            expect(response.status).toBe(204);
            done();
          });
        } catch (err) {
          done(err);
        }
      });
    });

    describe('Create/verify/update a connect gateway', () => {
      jest.setTimeout(timeout);

      let port = null;
      let gatewayId = '';
      const bfdConfig = {
        interval: 1000,
        multiplier: 2,
      };
      const gatewayTemplate = {
        name: 'NODE-INT-SDK-CONNECT-BFD-' + timestamp,
        type: 'connect',
        speed_mbps: 1000,
        bgp_asn: 64999,
        global: false,
        metered: false,
        bfd_config: bfdConfig,
      };

      it('should list ports and save the id of the first port', (done) => {
        try {
          dlService.listPorts({}).then((response) => {
            expect(response.status).toBe(200);
            if (null != response && null != response.result && null != response.result.ports) {
              port = get_port(response.result.ports);
            }
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      it('should successfully create a connect gateway', (done) => {
        const params = {
          gatewayTemplate: { ...gatewayTemplate, port: { id: port.id } },
        };
        try {
          dlService.createGateway(params).then((response) => {
            expect(response.status).toBe(201);
            expect(response.result.id).toBeDefined();
            if (null != response && null != response.result && null != response.result.id) {
              gatewayId = response.result.id;
            }

            // make sure all the expected fields are present
            expect(response.result.bgp_asn).toBe(gatewayTemplate.bgp_asn);
            expect(response.result.global).toBe(gatewayTemplate.global);
            expect(response.result.name).toBe(gatewayTemplate.name);
            expect(response.result.speed_mbps).toBe(gatewayTemplate.speed_mbps);
            expect(response.result.type).toBe(gatewayTemplate.type);
            expect(response.result.metered).toBe(gatewayTemplate.metered);
            expect(response.result.port.id).toBe(port.id);
            expect(response.result.bfd_config).toBeDefined();
            expect(response.result.bfd_config.interval).toBe(bfdConfig.interval);
            expect(response.result.bfd_config.multiplier).toBe(bfdConfig.multiplier);
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      // Wait for the gateway to move to provisioned state
      it('should successfully wait for gateway to be provisioned', async (done) => {
        try {
          const result = await poll(
            () => dlService.getGateway({ id: gatewayId }),
            (result) => result.operational_status === 'provisioned',
            50
          );

          expect(result).toBeDefined();
          expect(result.operational_status).toEqual('provisioned');
          done();
        } catch (err) {
          done(err);
        }
      });

      it('should successfully update the bfd_config', async (done) => {
        const updatedBfdConfig = {
          interval: 500,
          multiplier: 100,
        };
        const params = {
          id: gatewayId,
          bfdConfig: updatedBfdConfig,
        };

        try {
          dlService.updateGateway(params).then((response) => {
            expect(response.status).toBe(200);
            expect(response.result.id).toBe(gatewayId);
            expect(response.result.name).toBe(gatewayTemplate.name);
            expect(response.result.type).toBe(gatewayTemplate.type);
            expect(response.result.bfd_config).toBeDefined();
            expect(response.result.bfd_config.interval).toBe(updatedBfdConfig.interval);
            expect(response.result.bfd_config.multiplier).toBe(updatedBfdConfig.multiplier);
            done();
          });
        } catch (err) {
          done(err);
        }
      });

      // Wait for the gateway to move to provisioned state
      it('should successfully wait for gateway to be provisioned', async (done) => {
        try {
          const result = await poll(
            () => dlService.getGateway({ id: gatewayId }),
            (result) => result.operational_status === 'provisioned',
            50
          );

          expect(result).toBeDefined();
          expect(result.operational_status).toEqual('provisioned');
          done();
        } catch (err) {
          done(err);
        }
      });

      // delete the connect gateway
      it('Successfully delete the connect gateway', (done) => {
        const params = {
          id: gatewayId,
        };

        try {
          dlService.deleteGateway(params).then((response) => {
            expect(response.status).toBe(204);
            done();
          });
        } catch (err) {
          done(err);
        }
      });
    });
  });

  describe.skip('Gateway Export Route Filters', () => {
    jest.setTimeout(timeout);

    const gatewayTemplateModel = {
      bgp_asn: 64999,
      global: true,
      metered: false,
      name: 'NODE-SDK-IT-ERF-' + timestamp,
      speed_mbps: 1000,
      type: 'connect',
      port: { id: 'dc7fdcf4-7d0e-461f-ba48-b67c174034be' },
    };

    let gatewayId = '';

    // create a connect gateway and verify the results
    it('Successfully create a connect gateway', (done) => {
      const gatewayTemplate = gatewayTemplateModel;
      const params = {
        gatewayTemplate,
      };
      try {
        dlService.createGateway(params).then((response) => {
          expect(response.status).toBe(201);
          expect(response.result.id).toBeDefined();
          if (null != response && null != response.result && null != response.result.id) {
            gatewayId = response.result.id;
          }
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for gateway to be provisioned', async (done) => {
      try {
        const result = await poll(
          () => dlService.getGateway({ id: gatewayId }),
          (result) => result.operational_status === 'provisioned',
          50
        );

        expect(result).toBeDefined();
        expect(result.operational_status).toEqual('provisioned');
        done();
      } catch (err) {
        done(err);
      }
    });

    it('Successfully create Export Route Filter for the gateway', (done) => {
      jest.setTimeout(timeout);
      const action = 'permit';
      const prefix = '192.168.100.0/24';
      const createGatewayExportRouteFilterParams = {
        gatewayId,
        action,
        prefix,
      };
      try {
        dlService
          .createGatewayExportRouteFilter(createGatewayExportRouteFilterParams)
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(201);
            expect(response.result).toBeDefined();
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    let gatewayExportRouterFilterId = '';
    let eTag = '';

    it('Successfully get the list of Export Route Filters for the gateway', (done) => {
      try {
        dlService.listGatewayExportRouteFilters({ gatewayId }).then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(200);
          expect(Object.keys(response.result.export_route_filters).length).toBe(1);
          gatewayExportRouterFilterId = response.result.export_route_filters[0].id;
          eTag = response.headers['etag'];
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully get Export Route Filter for the gateway using its id', (done) => {
      try {
        dlService
          .getGatewayExportRouteFilter({ gatewayId, id: gatewayExportRouterFilterId })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(200);
            expect(response.result).toBeDefined();
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for gateway to be provisioned', async (done) => {
      try {
        const result = await poll(
          () => dlService.getGateway({ id: gatewayId }),
          (result) => result.operational_status === 'provisioned',
          50
        );

        expect(result).toBeDefined();
        expect(result.operational_status).toEqual('provisioned');
        done();
      } catch (err) {
        done(err);
      }
    });

    it('Successfully replace Export Route Filter for the gateway', async (done) => {
      const exportRouteFilters = [
        {
          action: 'permit',
          ge: 25,
          le: 30,
          prefix: '192.168.100.0/24',
        },
      ];
      try {
        dlService
          .replaceGatewayExportRouteFilters({ gatewayId, ifMatch: eTag, exportRouteFilters })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(201);
            expect(Object.keys(response.result.export_route_filters).length).toBe(1);
            gatewayExportRouterFilterId = response.result.export_route_filters[0].id;
            eTag = response.headers['etag'];
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully update Export Route Filter for the gateway using its id', async (done) => {
      try {
        await new Promise((r) => setTimeout(r, 30000));
        const updateGatewayExportRouteFilterParams = {
          gatewayId,
          id: gatewayExportRouterFilterId,
          action: 'permit',
          ge: 25,
          le: 30,
          prefix: '192.168.100.0/25',
        };
        dlService
          .updateGatewayExportRouteFilter(updateGatewayExportRouteFilterParams)
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(200);
            expect(response.result).toBeDefined();
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for gateway to be provisioned', async (done) => {
      try {
        const result = await poll(
          () => dlService.getGateway({ id: gatewayId }),
          (result) => result.operational_status === 'provisioned',
          50
        );

        expect(result).toBeDefined();
        expect(result.operational_status).toEqual('provisioned');
        done();
      } catch (err) {
        done(err);
      }
    });

    // delete the gateway
    it('Successfully delete the gateway', async (done) => {
      try {
        await new Promise((r) => setTimeout(r, 30000));
        dlService.deleteGateway({ id: gatewayId }).then((response) => {
          expect(response.status).toBe(204);
          done();
        });
      } catch (err) {
        done(err);
      }
    });
  });

  describe.skip('Gateway Import Route Filters', () => {
    jest.setTimeout(timeout);

    const gatewayTemplateModel = {
      bgp_asn: 64999,
      global: true,
      metered: false,
      name: 'NODE-SDK-IT-IRF-' + timestamp,
      speed_mbps: 1000,
      type: 'connect',
      port: { id: 'dc7fdcf4-7d0e-461f-ba48-b67c174034be' },
    };

    let gatewayId = '';

    // create a connect gateway and verify the results
    it('Successfully create a connect gateway', (done) => {
      const gatewayTemplate = gatewayTemplateModel;
      const params = {
        gatewayTemplate,
      };
      try {
        dlService.createGateway(params).then((response) => {
          expect(response.status).toBe(201);
          expect(response.result.id).toBeDefined();
          if (null != response && null != response.result && null != response.result.id) {
            gatewayId = response.result.id;
          }
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for gateway to be provisioned', async (done) => {
      try {
        const result = await poll(
          () => dlService.getGateway({ id: gatewayId }),
          (result) => result.operational_status === 'provisioned',
          50
        );

        expect(result).toBeDefined();
        expect(result.operational_status).toEqual('provisioned');
        done();
      } catch (err) {
        done(err);
      }
    });

    it('Successfully create Import Route Filter for the gateway', (done) => {
      jest.setTimeout(timeout);
      const action = 'permit';
      const prefix = '192.168.100.0/24';
      const createGatewayImportRouteFilterParams = {
        gatewayId,
        action,
        prefix,
      };
      try {
        dlService
          .createGatewayImportRouteFilter(createGatewayImportRouteFilterParams)
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(201);
            expect(response.result).toBeDefined();
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    let gatewayImportRouterFilterId = '';
    let eTag = '';

    it('Successfully get the list of Import Route Filters for the gateway', (done) => {
      try {
        dlService.listGatewayImportRouteFilters({ gatewayId }).then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(200);
          expect(Object.keys(response.result.import_route_filters).length).toBe(1);
          gatewayImportRouterFilterId = response.result.import_route_filters[0].id;
          eTag = response.headers['etag'];
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('Successfully get Import Route Filter for the gateway using its id', (done) => {
      try {
        dlService
          .getGatewayImportRouteFilter({ gatewayId, id: gatewayImportRouterFilterId })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(200);
            expect(response.result).toBeDefined();
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for gateway to be provisioned', async (done) => {
      try {
        const result = await poll(
          () => dlService.getGateway({ id: gatewayId }),
          (result) => result.operational_status === 'provisioned',
          50
        );

        expect(result).toBeDefined();
        expect(result.operational_status).toEqual('provisioned');
        done();
      } catch (err) {
        done(err);
      }
    });

    it('Successfully replace Import Route Filter for the gateway', async (done) => {
      const importRouteFilters = [
        {
          action: 'permit',
          ge: 25,
          le: 30,
          prefix: '192.168.100.0/24',
        },
      ];
      try {
        dlService
          .replaceGatewayImportRouteFilters({ gatewayId, ifMatch: eTag, importRouteFilters })
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(201);
            expect(Object.keys(response.result.import_route_filters).length).toBe(1);
            gatewayImportRouterFilterId = response.result.import_route_filters[0].id;
            eTag = response.headers['etag'];
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for gateway to be provisioned', async (done) => {
      try {
        const result = await poll(
          () => dlService.getGateway({ id: gatewayId }),
          (result) => result.operational_status === 'provisioned',
          50
        );

        expect(result).toBeDefined();
        expect(result.operational_status).toEqual('provisioned');
        done();
      } catch (err) {
        done(err);
      }
    });

    it('Successfully update Import Route Filter for the gateway using its id', async (done) => {
      try {
        const updateGatewayImportRouteFilterParams = {
          gatewayId,
          id: gatewayImportRouterFilterId,
          action: 'permit',
          ge: 25,
          le: 30,
          prefix: '192.168.100.0/25',
        };
        dlService
          .updateGatewayImportRouteFilter(updateGatewayImportRouteFilterParams)
          .then((response) => {
            expect(response).toBeDefined();
            expect(response.status).toBe(200);
            expect(response.result).toBeDefined();
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for gateway to be provisioned', async (done) => {
      try {
        const result = await poll(
          () => dlService.getGateway({ id: gatewayId }),
          (result) => result.operational_status === 'provisioned',
          50
        );

        expect(result).toBeDefined();
        expect(result.operational_status).toEqual('provisioned');
        done();
      } catch (err) {
        done(err);
      }
    });

    // delete the gateway
    it('Successfully delete the gateway', async (done) => {
      try {
        await new Promise((r) => setTimeout(r, 30000));
        dlService.deleteGateway({ id: gatewayId }).then((response) => {
          expect(response.status).toBe(204);
          done();
        });
      } catch (err) {
        done(err);
      }
    });
  });

  describe.skip('Gateway MACsec', () => {
    jest.setTimeout(timeout);

    const gatewayTemplateModel = {
      bgp_asn: 64999,
      global: true,
      metered: false,
      name: 'NODE-SDK-IT-MACSEC-' + timestamp,
      speed_mbps: 1000,
      type: 'connect',
      port: { id: 'dc7fdcf4-7d0e-461f-ba48-b67c174034be' },
    };

    let gatewayId = '';

    // create a connect gateway and verify the results
    it('Successfully create a connect gateway', async () => {
      const gatewayTemplate = gatewayTemplateModel;
      const params = {
        gatewayTemplate,
      };

      dlService
        .createGateway(params)
        .then((response) => {
          expect(response.status).toBe(201);
          expect(response.result.id).toBeDefined();
          if (null != response && null != response.result && null != response.result.id) {
            gatewayId = response.result.id;
          }
        })
        .catch((err) => {
          return err;
        });
    });

    // HpcsKeyIdentity
    const hpcsKeyIdentity = {
      crn: 'crn:v1:staging:public:hs-crypto:us-south:a/3f455c4c574447adbc14bda52f80e62f:b2044455-b89e-4c57-96ae-3f17c092dd31:key:ebc0fbe6-fd7c-4971-b127-71a385c8f602',
    };

    // GatewayMacsecCakPrototype
    const gatewayMacsecCakPrototype = {
      key: hpcsKeyIdentity,
      name: 'AA01',
      session: 'primary',
    };

    // SakRekeyPrototypeSakRekeyTimerModePrototype
    const sakRekeyCreate = {
      interval: 76,
      mode: 'timer',
    };

    const active = true;
    const caks = [gatewayMacsecCakPrototype];
    const sakRekey = sakRekeyCreate;
    const securityPolicy = 'must_secure';
    const windowSize = 522;

    // Test set MACsec configuration for Gateway
    it('Successfully set MACsec for the gateway', async () => {
      await wait(15000);
      const setGatewayMacsecParams = {
        id: gatewayId,
        active,
        caks,
        sakRekey,
        securityPolicy,
        windowSize,
      };

      dlService
        .setGatewayMacsec(setGatewayMacsecParams)
        .then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(200);
          expect(response.result).toBeDefined();
          const macsecResponseResult = response.result;
          expect(macsecResponseResult.active).toEqual(active);
          expect(macsecResponseResult.caks).toEqual(caks);
          expect(macsecResponseResult.sak_rekey).toEqual(sakRekey);
          expect(macsecResponseResult.security_policy).toEqual(securityPolicy);
          expect(macsecResponseResult.window_size).toEqual(windowSize);
        })
        .catch((err) => {
          return err;
        });
    });

    // Test get MACsec configuration for Gateway
    it('Successfully get MACsec for the gateway', async () => {
      await wait(15000);
      const getGatewayMacsecParams = {
        id: gatewayId,
      };

      dlService
        .getGatewayMacsec(getGatewayMacsecParams)
        .then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(200);
          expect(response.result).toBeDefined();
          const macsecResponseResult = response.result;
          expect(macsecResponseResult.active).toEqual(active);
          expect(macsecResponseResult.sak_rekey).toEqual(sakRekey);
          expect(macsecResponseResult.security_policy).toEqual(securityPolicy);
          expect(macsecResponseResult.window_size).toEqual(windowSize);
        })
        .catch((err) => {
          return err;
        });
    });

    // Test list MACsec CAKs for Gateway
    it('Successfully list MACsec CAKs for the gateway', async () => {
      await wait(15000);
      const listGatewayMacsecCaksParams = {
        id: gatewayId,
      };

      dlService
        .listGatewayMacsecCaks(listGatewayMacsecCaksParams)
        .then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(200);
          expect(response.result).toBeDefined();
          expect(response.result.caks.length).toEqual(1);
        })
        .catch((err) => {
          return err;
        });
    });

    let cakId = '';

    const createCakHpcsKeyIdentity = {
      crn: 'crn:v1:staging:public:hs-crypto:us-south:a/3f455c4c574447adbc14bda52f80e62f:b2044455-b89e-4c57-96ae-3f17c092dd31:key:6f79b964-229c-45ab-b1d9-47e111cd03f6',
    };

    // Test create MACsec CAK for Gateway
    it('Successfully create MACsec CAKs for the gateway', async () => {
      await wait(15000);
      const createGatewayMacsecCakParams = {
        id: gatewayId,
        key: createCakHpcsKeyIdentity,
        name: 'BB02',
        session: 'fallback',
      };

      dlService
        .createGatewayMacsecCak(createGatewayMacsecCakParams)
        .then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(201);
          expect(response.result).toBeDefined();
          expect(response.result.id).toBeDefined();
          expect(response.result.name).toEqual('BB02');
          expect(response.result.session).toEqual('fallback');
          cakId = response.result.id; // set CAK from response
        })
        .catch((err) => {
          return err;
        });
    });

    // Test get MACsec CAK for Gateway
    it('Successfully get MACsec CAK for the gateway', async () => {
      await wait(15000);
      const getGatewayMacsecCakParams = {
        id: gatewayId,
        cakId,
      };

      dlService
        .getGatewayMacsecCak(getGatewayMacsecCakParams)
        .then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(200);
          expect(response.result).toBeDefined();
          expect(response.result.id).toEqual(cakId);
        })
        .catch((err) => {
          return err;
        });
    });

    const updateCakHpcsKeyIdentity = {
      crn: 'crn:v1:staging:public:hs-crypto:us-south:a/3f455c4c574447adbc14bda52f80e62f:b2044455-b89e-4c57-96ae-3f17c092dd31:key:6f79b964-229c-45ab-b1d9-47e111cd03f6',
    };

    // Test update MACsec CAK for Gateway
    it('Successfully update MACsec CAKs for the gateway', async () => {
      await wait(15000);
      const updateGatewayMacsecCakParams = {
        id: gatewayId,
        cakId,
        key: updateCakHpcsKeyIdentity,
        name: 'AA02',
      };

      dlService
        .updateGatewayMacsecCak(updateGatewayMacsecCakParams)
        .then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(200);
          expect(response.result).toBeDefined();
          expect(response.result.name).toEqual('AA02');
        })
        .catch((err) => {
          return err;
        });
    });

    // Test delete MACsec CAK for Gateway
    it('Successfully delete MACsec CAK for the gateway', async () => {
      await wait(15000);
      const deleteGatewayMacsecCakParams = {
        id: gatewayId,
        cakId,
      };

      dlService
        .deleteGatewayMacsecCak(deleteGatewayMacsecCakParams)
        .then((response) => {
          expect(response.status).toBe(204);
        })
        .catch((err) => {
          return err;
        });
    });

    // SakRekeyPatchSakRekeyTimerModePatch
    const sakRekeyPatch = {
      interval: 3601,
      mode: 'timer',
    };

    // Test update MACsec configuration for Gateway
    it('Successfully update MACsec for the gateway', async () => {
      await wait(15000);
      const updateGatewayMacsecParams = {
        id: gatewayId,
        active,
        sakRekey: sakRekeyPatch,
        securityPolicy,
        windowSize: 74,
      };

      dlService
        .updateGatewayMacsec(updateGatewayMacsecParams)
        .then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(200);
          expect(response.result).toBeDefined();
          const macsecResponseResult = response.result;
          expect(macsecResponseResult.active).toEqual(active);
          expect(macsecResponseResult.security_policy).toEqual(securityPolicy);
          expect(macsecResponseResult.window_size).toEqual(74);
        })
        .catch((err) => {
          return err;
        });
    });

    // Test unset MACsec configuration for Gateway
    it('Successfully unset MACsec for the gateway', async () => {
      await wait(15000);
      const unsetGatewayMacsecParams = {
        id: gatewayId,
      };

      dlService
        .unsetGatewayMacsec(unsetGatewayMacsecParams)
        .then((response) => {
          expect(response.status).toBe(204);
        })
        .catch((err) => {
          return err;
        });
    });

    // delete the gateway
    it('Successfully delete the gateway', async () => {
      await wait(15000);
      dlService
        .deleteGateway({ id: gatewayId })
        .then((response) => {
          expect(response.status).toBe(204);
        })
        .catch((err) => {
          return err;
        });
    });
  });

  describe.skip('Gateway Route Reports', () => {
    jest.setTimeout(timeout);

    const gatewayTemplateModel = {
      bgp_asn: 64999,
      global: true,
      metered: false,
      name: 'NODE-SDK-IT-RR-' + timestamp,
      speed_mbps: 1000,
      type: 'connect',
      port: { id: 'dc7fdcf4-7d0e-461f-ba48-b67c174034be' },
    };
    const classicVCName = 'NODE-SDK-IT-RR-VC-' + timestamp;

    let gatewayId = '';
    let classicVCId = '';
    let routeReportId = '';

    // create a connect gateway and verify the results
    it('Successfully create a connect gateway', (done) => {
      const gatewayTemplate = gatewayTemplateModel;
      const params = {
        gatewayTemplate,
      };
      try {
        dlService.createGateway(params).then((response) => {
          expect(response.status).toBe(201);
          expect(response.result.id).toBeDefined();
          if (null != response && null != response.result && null != response.result.id) {
            gatewayId = response.result.id;
          }
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for gateway to be provisioned', async (done) => {
      try {
        await new Promise((r) => setTimeout(r, 30000));
        const result = await poll(
          () => dlService.getGateway({ id: gatewayId }),
          (result) => result.operational_status === 'provisioned',
          60
        );

        expect(result).toBeDefined();
        expect(result.operational_status).toEqual('provisioned');
        done();
      } catch (err) {
        done(err);
      }
    });

    it('Successfully create a classic virtual connection', (done) => {
      try {
        const paramsClassicVC = {
          gatewayId: gatewayId,
          name: classicVCName,
          type: 'classic',
        };

        dlService.createGatewayVirtualConnection(paramsClassicVC).then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(201);
          expect(response.result.id).toBeDefined();
          classicVCId = response.result.id;
          expect(response.result.type).toBe(paramsClassicVC.type);
          expect(response.result.name).toBe(paramsClassicVC.name);
          expect(response.result.status).toBeDefined();
          expect(response.result.created_at).toBeDefined();
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for virtual connection to be active', async (done) => {
      try {
        await new Promise((r) => setTimeout(r, 30000));
        const result = await poll(
          () => dlService.getGatewayVirtualConnection({ gatewayId: gatewayId, id: classicVCId }),
          (result) => result.status === 'active',
          60
        );

        expect(result).toBeDefined();
        expect(result.status).toEqual('active');
        done();
      } catch (err) {
        done(err);
      }
    });

    // create the gateway route reports and verify the results
    it('Successfully create the gateway route reports', (done) => {
      const createGatewayRouteReportParams = {
        gatewayId,
      };
      try {
        dlService.createGatewayRouteReport(createGatewayRouteReportParams).then((response) => {
          expect(response.status).toBe(202);
          expect(response.result.id).toBeDefined();
          expect(response.result.gateway_routes).toBeDefined();
          expect(response.result.virtual_connection_routes).toBeDefined();
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // list all the gateway route report and verify the results
    it('Successfully list the gateway route reports', (done) => {
      const listGatewayRouteReportsParams = {
        gatewayId,
      };
      try {
        dlService.listGatewayRouteReports(listGatewayRouteReportsParams).then((response) => {
          expect(response.status).toBe(200);
          expect(response.result.route_reports).toBeDefined();
          expect(response.result.route_reports.length).toBe(1);
          routeReportId = response.result.route_reports[0].id;
          expect(routeReportId).toBeDefined();
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // get the gateway route report and verify the results
    it('Successfully get the gateway route report', (done) => {
      const getGatewayRouteReportParams = {
        gatewayId,
        id: routeReportId,
      };
      try {
        dlService.getGatewayRouteReport(getGatewayRouteReportParams).then((response) => {
          expect(response.status).toBe(200);
          expect(response.result.id).toBeDefined();
          expect(response.result.gateway_routes).toBeDefined();
          expect(response.result.virtual_connection_routes).toBeDefined();
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // delete the gateway route report
    it('Successfully delete the gateway route report', async (done) => {
      const deleteGatewayRouteReportParams = {
        gatewayId,
        id: routeReportId,
      };
      try {
        await new Promise((r) => setTimeout(r, 30000));
        dlService.deleteGatewayRouteReport(deleteGatewayRouteReportParams).then((response) => {
          expect(response.status).toBe(204);
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // delete the virtual connection
    it('Successfully delete the virtual connection', async (done) => {
      try {
        await new Promise((r) => setTimeout(r, 30000));
        dlService
          .deleteGatewayVirtualConnection({ gatewayId: gatewayId, id: classicVCId })
          .then((response) => {
            expect(response.status).toBe(204);
            done();
          });
      } catch (err) {
        done(err);
      }
    });
    // delete the gateway
    it('Successfully delete the gateway', async (done) => {
      try {
        await new Promise((r) => setTimeout(r, 30000));
        dlService.deleteGateway({ id: gatewayId }).then((response) => {
          expect(response.status).toBe(204);
          done();
        });
      } catch (err) {
        done(err);
      }
    });
  });
});