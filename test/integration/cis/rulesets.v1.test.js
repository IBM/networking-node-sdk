/**
 * (C) Copyright IBM Corp. 2025.
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

/* eslint-disable no-console */

const RulesetsV1 = require('../../../dist/cis/rulesets/v1');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const authHelper = require('../../resources/auth-helper.js');

const timeout = 120000; // two minutes

// Location of our config file.
const configFile = 'cis.env';

const describe = authHelper.prepareTests(configFile);

// Retrieve the config file as an object.
// We do this because we're going to directly use the
// config properties, rather than let the SDK do it for us.
const config = authHelper.loadConfig();

describe('RulesetsV1', () => {
  jest.setTimeout(timeout);

  const options = {
    authenticator: new IamAuthenticator({
      apikey: config.RULESETS_APIKEY,
      url: config.RULESETS_AUTH_URL,
    }),
    crn: config.RULESETS_CRN, 
    serviceUrl: config.CIS_SERVICES_URL,
    version: config.CIS_SERVICES_API_VERSION,
    zoneIdentifier: config.ZONE_ID,
  };

  let rulesetsService;
  let entrypointRulesetVersions = {};
  let rulesets = [];
  let specificRuleset;
  let firstCustomRulesetIndex = -1;

  test('Initialize service', () => {
    rulesetsService = RulesetsV1.newInstance(options);
    expect(rulesetsService).not.toBeNull();
  });

  describe('Fetching instance rulesets', () => {
    test('should successfully retrieve instance rulesets', (done) => {
      (async () => {
        try {
          const response = await rulesetsService.getInstanceRulesets();

          expect(response).toBeDefined();
          expect(response.status).toEqual(200);

          const { result } = response || {};
          expect(result).toBeDefined();
          expect(result.result).toBeInstanceOf(Array);

          rulesets = result.result;
          // console.log('rulesets retrieved:', rulesets.length);

          const firstCustom = rulesets.find(
            r => r.phase === 'http_request_firewall_custom' && r.kind === 'custom'
          );
          // console.log('first custom ruleset:', firstCustom);

          done();
        } catch (err) {
          console.error('service returned the following error:', err);
          done(err);
        }
      })();
    });
  });

  describe('Updating an instance ruleset', () => {
    let firstCustomRuleset;

    beforeAll(async () => {
      const response = await rulesetsService.getInstanceRulesets();
      expect(response).toBeDefined();
      expect(response.status).toBe(200);

      rulesets = response.result.result;
      expect(Array.isArray(rulesets)).toBe(true);

      firstCustomRuleset = rulesets.find(
        r => r.phase === 'http_request_firewall_custom' && r.kind === 'custom'
      );

      expect(firstCustomRuleset).toBeDefined();
    });

    test('should successfully update an instance ruleset', (done) => {
      const updateParams = {
        rulesetId: firstCustomRuleset.id,
        description: 'updated description',
      };

      rulesetsService.updateInstanceRuleset(updateParams)
        .then(response => {
          expect(response).toBeDefined();
          expect(response.status).toBe(200);
          expect(response.result).toBeDefined();

          const updatedRuleset = response.result.result;
          expect(updatedRuleset).toBeDefined();
          expect(updatedRuleset.description).toBe('updated description');

          // console.log('updated ruleset:', updatedRuleset);
          done();
        })
        .catch(err => {
          console.error('error updating ruleset:', err);
          done(err);
        });
    });
  });

  describe('Fetching instance ruleset versions', () => {
    let firstCustomRuleset;

    beforeAll(async () => {
      const response = await rulesetsService.getInstanceRulesets();
      expect(response).toBeDefined();
      expect(response.status).toBe(200);

      rulesets = response.result.result;
      expect(Array.isArray(rulesets)).toBe(true);

      firstCustomRuleset = rulesets.find(
        r => r.phase === 'http_request_firewall_custom' && r.kind === 'custom'
      );
      expect(firstCustomRuleset).toBeDefined();
    });

    test('should successfully list versions of a ruleset', (done) => {
      (async () => {
        try {
          const options = {
            rulesetId: firstCustomRuleset.id,
          };

          const response = await rulesetsService.getInstanceRulesetVersions(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          const listRulesetsRespResult = response.result;
          expect(listRulesetsRespResult).toBeDefined();

          const rulesetVersions = listRulesetsRespResult.result;
          expect(rulesetVersions).toBeDefined();
          expect(Array.isArray(rulesetVersions)).toBe(true);

          // console.log('ruleset versions (first 3):', rulesetVersions.slice(0, 3).map(({ id, name, version }) => ({ id, name, version })));

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Fetching a specific instance ruleset version', () => {
    let firstCustomRuleset;
    let rulesetVersions;

    beforeAll(async () => {
      const response = await rulesetsService.getInstanceRulesets();
      expect(response).toBeDefined();
      expect(response.status).toBe(200);

      rulesets = response.result.result;
      expect(Array.isArray(rulesets)).toBe(true);

      firstCustomRuleset = rulesets.find(
        r => r.phase === 'http_request_firewall_custom' && r.kind === 'custom'
      );
      expect(firstCustomRuleset).toBeDefined();

      const versionsResponse = await rulesetsService.getInstanceRulesetVersions({ rulesetId: firstCustomRuleset.id });
      expect(versionsResponse).toBeDefined();
      expect(versionsResponse.status).toBe(200);

      const versionsResult = versionsResponse.result;
      expect(versionsResult).toBeDefined();
      rulesetVersions = versionsResult.result;
      expect(Array.isArray(rulesetVersions)).toBe(true);
    });

    test('should successfully get a specific version of a ruleset', (done) => {
      (async () => {
        try {
          const rulesetId = firstCustomRuleset.id;
          const rulesetVersion = rulesetVersions[0].version;

          const response = await rulesetsService.getInstanceRulesetVersion({
            rulesetId,
            rulesetVersion,
          });

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          const rulesetResp = response.result;
          expect(rulesetResp).toBeDefined();

          specificRuleset = rulesetResp.result;
          expect(specificRuleset).toBeDefined();
          // console.log(`getting version ${rulesetVersion} of ruleset ${rulesetId}:\n`, specificRuleset);
          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Fetching entrypoint rulesets', () => {
    test('should successfully get entrypoint rulesets', (done) => {
      (async () => {
        try {
          const options = {
            rulesetPhase: 'http_request_firewall_custom',
          };

          const response = await rulesetsService.getInstanceEntrypointRuleset(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          const entrypointRuleset = {
            http_request_firewall_custom: response.result.result,
          };

          // console.log('entrypoint ruleset: ', entrypointRuleset);
          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Fetching entrypoint ruleset versions', () => {
    test('should successfully get entrypoint ruleset versions', (done) => {
      (async () => {
        try {
          const options = {
            rulesetPhase: 'http_request_firewall_custom',
          };

          const response = await rulesetsService.getInstanceEntryPointRulesetVersions(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          entrypointRulesetVersions = {
            http_request_firewall_custom: response.result.result,
          };

          // console.log('entrypoint ruleset versions  (first 3):', entrypointRulesetVersions.http_request_firewall_custom.slice(0, 3).map(({ id, name, version }) => ({ id, name, version })));
          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Fetching specific entrypoint ruleset version', () => {
    test('should successfully get a specific entrypoint ruleset version', (done) => {
      (async () => {
        try {
          const rulesetPhase = 'http_request_firewall_custom';
          const rulesetVersion = entrypointRulesetVersions[rulesetPhase][0].version;

          const options = {
            rulesetPhase,
            rulesetVersion,
          };

          const response = await rulesetsService.getInstanceEntryPointRulesetVersion(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          const specificEntrypointRulesetVersion = {};
          specificEntrypointRulesetVersion[rulesetPhase] = response.result.result;

          // console.log('entrypoint ruleset version: ', specificEntrypointRulesetVersion);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Fetching specific ruleset version by tag', () => {
    test('should successfully get a specific entrypoint ruleset version by tag', (done) => {
      (async () => {
        try {
          const selectedRuleset = rulesets[0];

          const options = {
            rulesetId: selectedRuleset.id,
            rulesetVersion: selectedRuleset.version,
            ruleTag: 'wordpress',
          };

          const response = await rulesetsService.getInstanceRulesetVersionByTag(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          // console.log('entrypoint ruleset version by tag: ', response.result);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Updating entrypoint ruleset', () => {
    test('should successfully update an entrypoint ruleset', (done) => {
      (async () => {
        try {
          const rulesetPhase = 'http_request_firewall_custom';

          const actionParameters = {
            id: specificRuleset.id,
          };

          const ruleCreate = {
            action: 'execute',
            action_parameters: actionParameters,
            expression: 'cf.zone.plan eq "ENT"',
          };

          const options = {
            rulesetPhase,
            rules: [ruleCreate],
          };

          const response = await rulesetsService.updateInstanceEntrypointRuleset(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          const updatedEntrypointRuleset = {};
          updatedEntrypointRuleset[rulesetPhase] = response.result.result;

          // console.log('updated entrypoint ruleset: ', updatedEntrypointRuleset);
          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Creating a rule in a ruleset', () => {
    beforeAll(async () => {
      const response = await rulesetsService.getInstanceRulesets();
      const allRulesets = response.result.result;
      ruleset = allRulesets.find(r => r.kind === 'custom' && r.phase === 'http_request_firewall_custom');

      if (!ruleset) {
        throw new Error('No editable custom ruleset found');
      }
    });

    test('should successfully create a rule in the ruleset', (done) => {
      (async () => {
        try {
          const options = {
            rulesetId: ruleset.id,
            expression: 'not http.request.uri.path matches "^/api/.*$"',
            action: 'log',
            description: 'log not /api',
          };

          const response = await rulesetsService.createInstanceRulesetRule(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          ruleset = response.result.result;

          // console.log('new rule in ruleset: ', ruleset);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Updating a rule in a ruleset', () => {
    test('should successfully update a rule in the ruleset', (done) => {
      (async () => {
        try {
          if (!ruleset?.id || !ruleset?.rules?.[0]?.id) {
            throw new Error('Missing valid ruleset or rule for update');
          }

          const options = {
            rulesetId: ruleset.id,
            ruleId: ruleset.rules[0].id,
            expression: 'not http.request.uri.path matches "^/newapi/.*$"',
            action: 'log',
            description: 'log not /newapi',
          };

          const response = await rulesetsService.updateInstanceRulesetRule(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          ruleset = response.result.result;
          // console.log('updated rule in ruleset: ', ruleset);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Deleting a rule in a ruleset', () => {
    test('should successfully delete a rule in the ruleset', (done) => {
      (async () => {
        try {
          const options = {
            rulesetId: ruleset.id,
            ruleId: ruleset.rules[0].id,
          };

          const response = await rulesetsService.deleteInstanceRulesetRule(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Deleting a specific version of a ruleset', () => {
    test('should successfully delete a specific ruleset version', (done) => {
      (async () => {
        try {
          const rulesetId = ruleset.id;
          const rulesetVersion = String(Number(ruleset.version) - 1);

          const options = {
            rulesetId,
            rulesetVersion,
          };

          const response = await rulesetsService.deleteInstanceRulesetVersion(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(204);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Listing zone rulesets', () => {
    test('should successfully list/get zone rulesets', (done) => {
      (async () => {
        try {
          const options = {};
          
          const response = await rulesetsService.getZoneRulesets(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          const listRulesetsRespResult = response.result;
          expect(listRulesetsRespResult).toBeDefined();

          rulesets = listRulesetsRespResult.result;
          // console.log("rulesets list: ", rulesets);

          firstCustomRulesetIndex = rulesets.findIndex(
            (r) => r.phase?.toLowerCase() === 'http_request_firewall_custom' && r.kind?.toLowerCase() === 'zone'
          );

          // console.log("first customruleset index: ", firstCustomRulesetIndex);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Getting a zone ruleset', () => {
    test('should successfully get a ruleset', (done) => {
      (async () => {
        try {
          expect(firstCustomRulesetIndex).toBeGreaterThanOrEqual(0);

          const options = {
            rulesetId: rulesets[firstCustomRulesetIndex].id,
          };

          const response = await rulesetsService.getZoneRuleset(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          const rulesetRespResult = response.result;
          expect(rulesetRespResult).toBeDefined();

          ruleset = rulesetRespResult.result;
          // console.log('ruleset: ', ruleset);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Updating a zone ruleset', () => {
    let updatedRuleset;

    test('should successfully update a ruleset', (done) => {
      (async () => {
        try {
          const options = {
            rulesetId: rulesets[firstCustomRulesetIndex].id,
            description: 'updated description',
          };

          const response = await rulesetsService.updateZoneRuleset(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          const rulesetRespResult = response.result;
          expect(rulesetRespResult).toBeDefined();

          updatedRuleset = rulesetRespResult.result;
          expect(updatedRuleset.description).toBe('updated description');
          // console.log('updated ruleset: ', updatedRuleset);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Listing zone ruleset versions', () => {
    let firstCustomRuleset;

    beforeAll(async () => {
      firstCustomRuleset = rulesets[firstCustomRulesetIndex]; 
    });

    test('should successfully list versions of a ruleset', (done) => {
      (async () => {
        try {
          const options = {
            rulesetId: firstCustomRuleset.id,
          };

          const response = await rulesetsService.getZoneRulesetVersions(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          const listRulesetsRespResult = response.result;
          expect(listRulesetsRespResult).toBeDefined();

          const rulesetVersions = listRulesetsRespResult.result;
          expect(rulesetVersions).toBeDefined();
          expect(Array.isArray(rulesetVersions)).toBe(true);

          // console.log('ruleset versions:', rulesetVersions);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Getting a specific version of a zone ruleset', () => {
    let firstCustomRuleset;
    let rulesetVersions;
    let specificRuleset;

    beforeAll(async () => {
      firstCustomRuleset = rulesets[firstCustomRulesetIndex];
      if (!rulesetVersions) {
        const options = { rulesetId: firstCustomRuleset.id };
        const response = await rulesetsService.getZoneRulesetVersions(options);
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        rulesetVersions = response.result.result;
        expect(Array.isArray(rulesetVersions)).toBe(true);
      }
    });

    test('should successfully get a specific version of a ruleset', (done) => {
      (async () => {
        try {
          const options = {
            rulesetId: firstCustomRuleset.id,
            rulesetVersion: rulesetVersions[0].version,
          };

          const response = await rulesetsService.getZoneRulesetVersion(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          const rulesetResp = response.result;
          expect(rulesetResp).toBeDefined();

          specificRuleset = rulesetResp.result;
          expect(specificRuleset).toBeDefined();

          // console.log(`Got version ${options.rulesetVersion} of ruleset ${options.rulesetId}:\n`, specificRuleset);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Getting entrypoint rulesets for zone', () => {
    let entrypointRuleset = {};

    test('should successfully get entrypoint rulesets', (done) => {
      (async () => {
        try {
          const options = {
            rulesetPhase: 'http_request_firewall_custom',
          };

          const response = await rulesetsService.getZoneEntrypointRuleset(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          entrypointRuleset['http_request_firewall_custom'] = response.result.result;

          // console.log('entrypoint ruleset:', entrypointRuleset);
          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Getting entrypoint ruleset versions for zone', () => {
    test('should successfully get entrypoint ruleset versions', (done) => {
      (async () => {
        try {
          const options = {
            rulesetPhase: 'http_request_firewall_custom',
          };

          const response = await rulesetsService.getZoneEntryPointRulesetVersions(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          entrypointRulesetVersions['http_request_firewall_custom'] = response.result.result;

          // console.log('entrypoint ruleset versions:', entrypointRulesetVersions);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Getting a specific entrypoint ruleset version for zone', () => {
    let specificEntrypointRulesetVersion = {};

    test('should successfully get a specific entrypoint ruleset version', (done) => {
      (async () => {
        try {
          const rulesetPhase = 'http_request_firewall_custom';
          const version = entrypointRulesetVersions[rulesetPhase][0].version;

          const options = {
            rulesetPhase,
            rulesetVersion: version,
          };

          const response = await rulesetsService.getZoneEntryPointRulesetVersion(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          specificEntrypointRulesetVersion[rulesetPhase] = response.result.result;

          // console.log('specific entrypoint ruleset version:', specificEntrypointRulesetVersion);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Updating/Creating zone entrypoint ruleset', () => {
    let updatedEntrypointRuleset = {};

    test('should successfully update/create an entrypoint ruleset', (done) => {
      (async () => {
        try {
          const rulesetPhase = 'http_request_firewall_custom';

          const options = {
            rulesetPhase,
            description: 'updated entrypoint ruleset description!',
          };

          const response = await rulesetsService.updateZoneEntrypointRuleset(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          updatedEntrypointRuleset[rulesetPhase] = response.result.result;

          // console.log('updated entrypoint ruleset:', updatedEntrypointRuleset);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Creating a rule in a zone ruleset', () => {
    test('should successfully create a rule in the ruleset', (done) => {
      (async () => {
        try {
          const options = {
            rulesetId: ruleset.id,
            expression: 'not http.request.uri.path matches "^/api/.*$"',
            action: 'log',
            description: 'log not /api',
          };

          const response = await rulesetsService.createZoneRulesetRule(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          ruleset = response.result.result;

          // console.log('new rule in ruleset: ', ruleset);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Updating a rule in a zone ruleset', () => {
    test('should successfully update a rule in the ruleset', (done) => {
      (async () => {
        try {
          const options = {
            rulesetId: ruleset.id,
            ruleId: ruleset.rules[0].id,
            expression: 'not http.request.uri.path matches "^/newapi/.*$"',
            action: 'log',
            description: 'log not /newapi',
          };

          const response = await rulesetsService.updateZoneRulesetRule(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          ruleset = response.result.result;

          // console.log('updated rule in ruleset ===>', ruleset);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Deleting a rule in zone ruleset', () => {
    test('should successfully delete a rule in the ruleset', (done) => {
      (async () => {
        try {
          const options = {
            rulesetId: ruleset.id,
            ruleId: ruleset.rules[0].id,
          };

          const response = await rulesetsService.deleteZoneRulesetRule(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(200);

          // console.log('deleted rule response ===>', response.result);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Deleting a specific version of a zone ruleset', () => {
    test('should successfully delete a specific ruleset version', (done) => {
      (async () => {
        try {
          const rulesetId = ruleset.id;
          const rulesetVersion = (parseInt(ruleset.version, 10) - 1).toString();

          const options = {
            rulesetId,
            rulesetVersion,
          };

          const response = await rulesetsService.deleteZoneRulesetVersion(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(204);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('Deleting a zone ruleset', () => {
    test('should successfully delete a zone ruleset', (done) => {
      (async () => {
        try {
          const options = {
            rulesetId: ruleset.id,
          };

          const response = await rulesetsService.deleteZoneRuleset(options);

          expect(response).toBeDefined();
          expect(response.status).toBe(204);

          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

});
