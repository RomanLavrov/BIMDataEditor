/**
 * Forge SDK
 * The Forge Platform contains an expanding collection of web service components that can be used with Autodesk cloud-based products or your own technologies. Take advantage of Autodesk’s expertise in design and engineering.
 *
 * OpenAPI spec version: 0.1.0
 * Contact: forge.help@autodesk.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.export = (function() {
  'use strict';

  var expect = require('expect.js'),
      ForgeSdk = require('../../src'),
      WorkItemResp = require('../../src/model/WorkItemResp');

  describe('DesignAutomationWorkItems', function() {
    it('should create an instance of DesignAutomationWorkItems', function() {
      var instance = new ForgeSdk.DesignAutomationWorkItems();
      expect(instance).to.be.a(ForgeSdk.DesignAutomationWorkItems);
    });
  });

}());
