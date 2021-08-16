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
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const options = {
  authenticator: new IamAuthenticator({
    apikey: config.IAMAPIKEY,
    url: config.IAMURL,
  }),
  serviceUrl: config.SERVICE_URL,
  version: '2020-06-01',
};

// Initialize the service client.
const dlService = new DirectLinkV1(options);

describe('DirectLinkV1', () => {
  describe('Create/verify a dedicated gateway', () => {
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
    };

    // Save the gateway ID for deletion
    let gatewayId = '';

    // create a dedicated gateway and verify the results
    it('Successfully create a dedicated gateway', done => {
      const params = {
        gatewayTemplate: gatewayTemplate,
      };
      try {
        dlService.createGateway(params).then(response => {
          expect(response.hasOwnProperty('status')).toBe(true);
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
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // get the dedicated gateway and verify name/id
    it('Successfully get a dedicated gateway', done => {
      const params = {
        id: gatewayId,
      };

      try {
        dlService.getGateway(params).then(response => {
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
    it('Successfully list all gateways', done => {
      try {
        return dlService.listGateways({}).then(response => {
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
    it('Successfully update a gateway', done => {
      // Gateway prams for patching dedicated gateway
      const params = {
        id: gatewayId,
        name: 'NODE-INT-SDK-DEDICATED-PATCH-' + timestamp,
        speedMbps: 1000,
        global: false,
        metered: true,
        loaRejectReason: 'testing patch',
      };
      try {
        dlService.updateGateway(params).then(response => {
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
          expect(response.result.location_display_name).toBe(config.LOCATION_DISPLAY_NAME);
          expect(response.result.created_at).toBeDefined();
          expect(response.result.link_status).toBe('down');
          expect(response.result.resource_group).toBeDefined();
          expect(response.result.type).toBe(gatewayTemplate.type);
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // delete the dedicated gateway
    it('Successfully delete the gateway', done => {
      const params = {
        id: gatewayId,
      };

      try {
        dlService.deleteGateway(params).then(response => {
          expect(response.status).toBe(204);
          done();
        });
      } catch (err) {
        done(err);
      }
    });
  });

  // describe('Create/verify a macsec enabled dedicated gateway', () => {
  //   jest.setTimeout(timeout);

  //   // GatewayTemplate for dedicated gateway
  //   const gatewayTemplate = {
  //     name: 'NODE-INT-SDK-MACSEC-' + timestamp,
  //     type: 'dedicated',
  //     speed_mbps: 50,
  //     global: true,
  //     bgp_asn: 64999,
  //     bgp_base_cidr: '169.254.0.0/16',
  //     metered: false,
  //     carrier_name: 'myCarrierName',
  //     customer_name: 'newCustomerName',
  //     cross_connect_router: 'xcr04.wdc02',
  //     location_name: 'wdc02',
  //     macsec_config: {
  //       active: true,
  //       primary_cak: {
  //         crn: config.MACSEC_PRIMARY_CAK,
  //       },
  //     },
  //   };

  //   // Save the gateway ID for deletion
  //   let gatewayId = '';

  //   // create a macsec enabled dedicated gateway and verify the results
  //   it('Successfully create a macsec enabled dedicated gateway', done => {
  //     const params = {
  //       gatewayTemplate: gatewayTemplate,
  //     };
  //     try {
  //       dlService.createGateway(params).then(response => {
  //         expect(response.hasOwnProperty('status')).toBe(true);
  //         expect(response.status).toBe(201);
  //         if (null != response && null != response.result && null != response.result.id) {
  //           gatewayId = response.result.id;
  //         }

  //         expect(response.result.id).toBeDefined();
  //         expect(response.result.name).toBe(gatewayTemplate.name);
  //         expect(response.result.type).toBe(gatewayTemplate.type);
  //         expect(response.result.speed_mbps).toBe(gatewayTemplate.speed_mbps);
  //         expect(response.result.global).toBe(gatewayTemplate.global);
  //         expect(response.result.bgp_asn).toBe(gatewayTemplate.bgp_asn);
  //         expect(response.result.bgp_cer_cidr).toBeDefined();
  //         expect(response.result.bgp_ibm_cidr).toBeDefined();
  //         expect(response.result.metered).toBe(gatewayTemplate.metered);
  //         expect(response.result.cross_connect_router).toBe(gatewayTemplate.cross_connect_router);
  //         expect(response.result.location_name).toBe(gatewayTemplate.location_name);
  //         expect(response.result.location_display_name).toBe('Washington 2');
  //         expect(response.result.created_at).toBeDefined();
  //         expect(response.result.link_status).toBe('down');
  //         expect(response.result.operational_status).toBe('awaiting_loa');
  //         expect(response.result.resource_group).toBeDefined();
  //         expect(response.result.macsec_config).toBeDefined();
  //         expect(response.result.macsec_config.active).toBeTruthy();
  //         expect(response.result.macsec_config.primary_cak.crn).toBe(config.MACSEC_PRIMARY_CAK);
  //         done();
  //       });
  //     } catch (err) {
  //       done(err);
  //     }
  //   });

  //   // update a dedicated gateway and verify the results
  //   it('Successfully update a macsec enabled gateway', done => {
  //     // Gateway prams for patching dedicated gateway
  //     const params = {
  //       id: gatewayId,
  //       macsecConfig: {
  //         fallback_cak: {
  //           crn: config.MACSEC_FALLBACK_CAK,
  //         },
  //       },
  //     };

  //     try {
  //       dlService.updateGateway(params).then(response => {
  //         expect(response.status).toBe(200);
  //         expect(response.result.id).toBe(gatewayId);
  //         expect(response.result.macsec_config).toBeDefined();
  //         expect(response.result.macsec_config.active).toBeTruthy();
  //         expect(response.result.macsec_config.primary_cak.crn).toBe(config.MACSEC_PRIMARY_CAK);
  //         expect(response.result.macsec_config.fallback_cak.crn).toBe(config.MACSEC_FALLBACK_CAK);
  //         done();
  //       });
  //     } catch (err) {
  //       done(err);
  //     }
  //   });

  //   // delete the dedicated gateway
  //   it('Successfully delete the gateway', done => {
  //     const params = {
  //       id: gatewayId,
  //     };

  //     try {
  //       dlService.deleteGateway(params).then(response => {
  //         expect(response.status).toBe(204);
  //         done();
  //       });
  //     } catch (err) {
  //       done(err);
  //     }
  //   });
  // });

  describe('Create/verify a connect gateway', () => {
    jest.setTimeout(timeout);

    let port = null;
    let gatewayId = '';

    it('List ports and save the id of the first port', done => {
      try {
        dlService.listPorts({}).then(response => {
          expect(response.status).toBe(200);
          if (null != response && null != response.result && null != response.result.ports) {
            port = response.result.ports[0];
          }
          done();
        });
      } catch (err) {
        done(err);
      }
    });

    // create a connect gateway and verify the results
    it('Successfully create a connect gateway', done => {
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
        dlService.createGateway(params).then(response => {
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
    it('should successfully wait for gateway to be provisioned', async done => {
      try {
        const result = await poll(
          () => dlService.getGateway({ id: gatewayId }),
          result => result.operational_status === 'provisioned',
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
    it('Successfully delete the connect gateway', done => {
      const params = {
        id: gatewayId,
      };

      try {
        dlService.deleteGateway(params).then(response => {
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
    it('Successfully create a dedicated gateway', done => {
      const params = {
        gatewayTemplate: gatewayTemplate,
      };
      try {
        dlService.createGateway(params).then(response => {
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

    it('Successfully create a CLASSIC virtual connection', done => {
      try {
        const paramsClassicVc = {
          gatewayId: gatewayId,
          name: classicVcName,
          type: 'classic',
        };

        dlService.createGatewayVirtualConnection(paramsClassicVc).then(response => {
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

    it('Successfully get the CLASSIC virtual connection', done => {
      try {
        dlService
          .getGatewayVirtualConnection({ gatewayId: gatewayId, id: classicVcId })
          .then(response => {
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

    it('Successfully create a GEN 2 VPC virtual connection', done => {
      try {
        const paramsGenTwoVc = {
          gatewayId: gatewayId,
          name: genTwoVcName,
          type: 'vpc',
          networkId: config.GEN2_VPC_CRN,
        };

        dlService.createGatewayVirtualConnection(paramsGenTwoVc).then(response => {
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

    it('Successfully get the GEN 2 VPC virtual connection', done => {
      try {
        dlService
          .getGatewayVirtualConnection({ gatewayId: gatewayId, id: genTwoVcId })
          .then(response => {
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

    it('Successfully update a GEN 2 VPC virtual connection name', done => {
      try {
        dlService
          .updateGatewayVirtualConnection({
            gatewayId: gatewayId,
            id: genTwoVcId,
            name: genTwoVcName + 'PATCH',
          })
          .then(response => {
            expect(response).toBeDefined();
            expect(response.status).toBe(200);
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    // Test virtual connection status update parameter; expect a failed test
    it('Fail update a GEN 2 VPC virtual connection status', done => {
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
            reason => {
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

    it('Successfully get the list of virtual connections for the gateway', done => {
      try {
        dlService.listGatewayVirtualConnections({ gatewayId: gatewayId }).then(response => {
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

    it('Successfully delete the GEN 2 VPC virtual connection', done => {
      try {
        dlService
          .deleteGatewayVirtualConnection({ gatewayId: gatewayId, id: genTwoVcId })
          .then(response => {
            expect(response).toBeDefined();
            expect(response.status).toBe(204);
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for GEN 2 VPC virtual connection to be deleted', async done => {
      try {
        const result = await poll(
          () => dlService.getGatewayVirtualConnection({ gatewayId: gatewayId, id: genTwoVcId }),
          result => result.status === 404,
          50
        );

        expect(result).toBeDefined();
        expect(result.status).toBe(404);
        done();
      } catch (err) {
        done(err);
      }
    });

    it('Successfully delete the CLASSIC virtual connection', done => {
      try {
        dlService
          .deleteGatewayVirtualConnection({ gatewayId: gatewayId, id: classicVcId })
          .then(response => {
            expect(response).toBeDefined();
            expect(response.status).toBe(204);
            done();
          });
      } catch (err) {
        done(err);
      }
    });

    it('should successfully wait for CLASSIC virtual connection to be deleted', async done => {
      try {
        const result = await poll(
          () => dlService.getGatewayVirtualConnection({ gatewayId: gatewayId, id: classicVcId }),
          result => result.status === 404,
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
    it('Successfully delete the gateway', done => {
      try {
        dlService.deleteGateway({ id: gatewayId }).then(response => {
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
    it('Successfully create a dedicated gateway', done => {
      const params = {
        gatewayTemplate: gatewayTemplate,
      };
      try {
        dlService.createGateway(params).then(response => {
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

    it('Successfully call loa', done => {
      try {
        dlService.listGatewayLetterOfAuthorization({ id: gatewayId }).then(
          // this should fail, so we don't expect a response
          () => {
            // throw an error if we get here.
            expect(false).toBe(true);
            done();
          },
          reason => {
            expect(reason.status).toBe(404);
            expect(reason.statusText).toBe('Not Found');
            done();
          }
        );
      } catch (err) {
        done(err);
      }
    });

    it('Successfully PUT completion notice', done => {
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
            reason => {
              expect(reason.status).toBe(412);
              expect(reason.statusText).toBe('Precondition Failed');
              done();
            }
          );
      } catch (err) {
        done(err);
      }
    });

    it('Successfully call completion notice', done => {
      try {
        dlService.listGatewayCompletionNotice({ id: gatewayId }).then(
          () => {
            // This should fail since cn pdf could not be uloaded.  No response expected
            // throw an error if we get here.
            expect(false).toBe(true);
            done();
          },
          reason => {
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
    it('Successfully delete the gateway', done => {
      try {
        dlService.deleteGateway({ id: gatewayId }).then(response => {
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
    it('Successfully get locations for type dedicated', done => {
      try {
        dlService
          .listOfferingTypeLocations({
            offeringType: 'dedicated',
          })
          .then(response => {
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

    it('Successfully get locations for type connect', done => {
      try {
        dlService
          .listOfferingTypeLocations({
            offeringType: 'connect',
          })
          .then(response => {
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

    it('Successfully get dedicated cross connect routers using short name', done => {
      try {
        dlService
          .listOfferingTypeLocationCrossConnectRouters({
            offeringType: 'dedicated',
            locationName: firstDedicatedOT.name,
          })
          .then(response => {
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

    it('Successfully get dedicated cross connect routers using display name', done => {
      try {
        dlService
          .listOfferingTypeLocationCrossConnectRouters({
            offeringType: 'dedicated',
            locationName: firstDedicatedOT.display_name,
          })
          .then(response => {
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

    it('Successfully get dedicated cross connect routers using display name', done => {
      try {
        dlService
          .listOfferingTypeLocationCrossConnectRouters({
            offeringType: 'dedicated',
            locationName: firstDedicatedOT.display_name,
          })
          .then(response => {
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

    it('Successfully list dedicate offering speeds', done => {
      try {
        dlService.listOfferingTypeSpeeds({ offeringType: 'dedicated' }).then(response => {
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

    it('Successfully list connect offering speeds', done => {
      try {
        dlService.listOfferingTypeSpeeds({ offeringType: 'connect' }).then(response => {
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

    it('Successfully list ports', done => {
      try {
        dlService.listPorts({}).then(response => {
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

    it('Successfully get a port by id', done => {
      try {
        dlService.getPort({ id: firstPort.id }).then(response => {
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

    it('should successfully create a gateway with authentication key', async done => {
      jest.setTimeout(timeout);

      const params = {
        gatewayTemplate: gatewayTemplate,
      };

      try {
        dlService.createGateway(params).then(response => {
          expect(response.hasOwnProperty('status')).toBe(true);
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

    it('should successfully clear/update the authentication key', async done => {
      const params = {
        id: gatewayId,
        authenticationKey: {
          crn: '',
        },
      };

      try {
        dlService.updateGateway(params).then(response => {
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
    it('Successfully delete the gateway', done => {
      const params = {
        id: gatewayId,
      };

      try {
        dlService.deleteGateway(params).then(response => {
          expect(response.status).toBe(204);
          done();
        });
      } catch (err) {
        done(err);
      }
    });
  });
});
