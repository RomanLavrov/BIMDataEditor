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


module.exports = (function() {
   'use strict';

   var ApiClient = require('../ApiClient'),
       DesignAutomationWorkItems = require('../model/DesignAutomationWorkItems'),
       WorkItem = require('../model/WorkItem'),
       WorkItemResp = require('../model/WorkItemResp');

  /**
   * WorkItems service.
   * @module api/WorkItemsApi
   * @version 0.4.1
   */

  /**
   * Constructs a new WorkItemsApi.
   * @alias module:api/WorkItemsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;



    /**
     * Creates a new WorkItem.
     * @param {module:model/WorkItem} workItem
     * data is of type: {module:model/WorkItemResp}
     * @param {Object} oauth2client oauth2client for the call
     * @param {Object} credentials credentials for the call
     */
    this.createWorkItem = function(workItem, oauth2client, credentials) {
      var postBody = workItem;

      // verify the required parameter 'workItem' is set
      if (workItem == undefined || workItem == null) {
        return Promise.reject("Missing the required parameter 'workItem' when calling createWorkItem");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['application/vnd.api+json', 'application/json'];
      var returnType = WorkItemResp;

      return this.apiClient.callApi(
        '/autocad.io/us-east/v2/WorkItems', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, oauth2client, credentials
      );
    };


    /**
     * Removes a specific WorkItem.
     * @param {String} id
     * @param {Object} oauth2client oauth2client for the call
     * @param {Object} credentials credentials for the call
     */
    this.deleteWorkItem = function(id, oauth2client, credentials) {
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        return Promise.reject("Missing the required parameter 'id' when calling deleteWorkItem");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['application/vnd.api+json', 'application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/autocad.io/us-east/v2/WorkItems(%27{id}%27)', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, oauth2client, credentials
      );
    };


    /**
     * Returns the details of all WorkItems.
     * @param {Object} opts Optional parameters
     * @param {Integer} opts.skip
     * data is of type: {module:model/DesignAutomationWorkItems}
     * @param {Object} oauth2client oauth2client for the call
     * @param {Object} credentials credentials for the call
     */
    this.getAllWorkItems = function(opts, oauth2client, credentials) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        '$skip': opts['skip']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['application/vnd.api+json', 'application/json'];
      var returnType = DesignAutomationWorkItems;

      return this.apiClient.callApi(
        '/autocad.io/us-east/v2/WorkItems', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, oauth2client, credentials
      );
    };


    /**
     * Returns the details of a specific WorkItem.
     * @param {String} id
     * data is of type: {module:model/WorkItemResp}
     * @param {Object} oauth2client oauth2client for the call
     * @param {Object} credentials credentials for the call
     */
    this.getWorkItem = function(id, oauth2client, credentials) {
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        return Promise.reject("Missing the required parameter 'id' when calling getWorkItem");
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var contentTypes = ['application/json'];
      var accepts = ['application/vnd.api+json', 'application/json'];
      var returnType = WorkItemResp;

      return this.apiClient.callApi(
        '/autocad.io/us-east/v2/WorkItems(%27{id}%27)', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        contentTypes, accepts, returnType, oauth2client, credentials
      );
    };
  };

  return exports;
}());
