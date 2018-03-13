/* 
 * Forge SDK
 *
 * The Forge Platform contains an expanding collection of web service components that can be used with Autodesk cloud-based products or your own technologies. Take advantage of Autodesk’s expertise in design and engineering.
 *
 * OpenAPI spec version: 0.1.0
 * Contact: forge.help@autodesk.com
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
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

using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Autodesk.Forge.Model
{
    /// <summary>
    /// provides a link to related resources
    /// </summary>
    [DataContract]
    public partial class JsonApiLinksRelated :  IEquatable<JsonApiLinksRelated>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="JsonApiLinksRelated" /> class.
        /// </summary>
        [JsonConstructorAttribute]
        protected JsonApiLinksRelated() { }
        /// <summary>
        /// Initializes a new instance of the <see cref="JsonApiLinksRelated" /> class.
        /// </summary>
        /// <param name="Related">Related (required).</param>
        public JsonApiLinksRelated(JsonApiLink Related = null)
        {
            // to ensure "Related" is required (not null)
            if (Related == null)
            {
                throw new InvalidDataException("Related is a required property for JsonApiLinksRelated and cannot be null");
            }
            else
            {
                this.Related = Related;
            }
        }
        
        /// <summary>
        /// Gets or Sets Related
        /// </summary>
        [DataMember(Name="related", EmitDefaultValue=false)]
        public JsonApiLink Related { get; set; }
        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append("class JsonApiLinksRelated {\n");
            sb.Append("  Related: ").Append(Related).Append("\n");
            sb.Append("}\n");
            return sb.ToString();
        }
  
        /// <summary>
        /// Returns the JSON string presentation of the object
        /// </summary>
        /// <returns>JSON string presentation of the object</returns>
        public string ToJson()
        {
            return JsonConvert.SerializeObject(this, Formatting.Indented);
        }

        /// <summary>
        /// Returns true if objects are equal
        /// </summary>
        /// <param name="obj">Object to be compared</param>
        /// <returns>Boolean</returns>
        public override bool Equals(object obj)
        {
            // credit: http://stackoverflow.com/a/10454552/677735
            return this.Equals(obj as JsonApiLinksRelated);
        }

        /// <summary>
        /// Returns true if JsonApiLinksRelated instances are equal
        /// </summary>
        /// <param name="other">Instance of JsonApiLinksRelated to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(JsonApiLinksRelated other)
        {
            // credit: http://stackoverflow.com/a/10454552/677735
            if (other == null)
                return false;

            return 
                (
                    this.Related == other.Related ||
                    this.Related != null &&
                    this.Related.Equals(other.Related)
                );
        }

        /// <summary>
        /// Gets the hash code
        /// </summary>
        /// <returns>Hash code</returns>
        public override int GetHashCode()
        {
            // credit: http://stackoverflow.com/a/263416/677735
            unchecked // Overflow is fine, just wrap
            {
                int hash = 41;
                // Suitable nullity checks etc, of course :)
                if (this.Related != null)
                    hash = hash * 59 + this.Related.GetHashCode();
                return hash;
            }
        }
    }

}

