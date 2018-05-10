function AttributeExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
}
AttributeExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
AttributeExtension.prototype.constructor = AttributeExtension;

AttributeExtension.prototype.load = function () {
    console.log('AttributeExtension is loaded!');

    var viewer = this.viewer;

    var content = document.createElement('div');
    var mypanel = new SimplePanel(viewer.container, "Attributes", "Attributes List", content, 20, 20);
    mypanel.setVisible(true);

    this.onSelectionBinded = this.onSelectionEvent.bind(this);
    this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.onSelectionBinded);
    this.onSelectionBinded = null;

    return true;
};

AttributeExtension.prototype.onSelectionEvent = function (event) {
    var currentSelection = this.viewer.getSelection();
    var elementID = document.getElementById("elementID");
    this.viewer.fitToView(currentSelection); // Scale screen to selected object!!!!

    //elementID.innerHTML = currentSelection;
    var SelectedId = parseInt(currentSelection);
    httpGet(SelectedId);
}

function getAccessToken() {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/api/forge/token', false /*forge viewer requires SYNC*/);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

//---Get properties from URN
function httpGet(selectedId) {
    var xmlHttpViewID = new XMLHttpRequest();
    xmlHttpViewID.open("GET", "https://developer.api.autodesk.com/modelderivative/v2/designdata/" + urn + "/metadata", false);
    xmlHttpViewID.setRequestHeader("Authorization", "Bearer " + getAccessToken());
    xmlHttpViewID.send();
    //console.log("Request sent");
    //console.log("ViewID: " + xmlHttpViewID.status + " " + xmlHttpViewID.responseText);
    console.log(xmlHttpViewID.responseText);
    var objViewId = JSON.parse(xmlHttpViewID.responseText);
    var GUID = objViewId.data.metadata[0].guid;
    console.log(objViewId.data.metadata[0].guid);

    var xmlHttpProperties = new XMLHttpRequest();
    xmlHttpProperties.open("GET", "https://developer.api.autodesk.com/modelderivative/v2/designdata/" + urn + "/metadata/" + GUID + "/properties?objectid=" + selectedId, false);
    xmlHttpProperties.setRequestHeader("Authorization", "Bearer " + getAccessToken());
    xmlHttpProperties.send();

    var objProperties = JSON.parse(xmlHttpProperties.responseText);
    console.log("Properties: " + xmlHttpProperties.status + " " + xmlHttpProperties.statusText + xmlHttpProperties.responseText);
    
    var propObjectId = document.getElementById("propObjectId");
    propObjectId.innerHTML = objProperties.data.collection[0].objectid;
    var propName = document.getElementById("propName");
    propName.innerHTML = objProperties.data.collection[0].name;
    var propHidden = document.getElementById("propHidden");
    propHidden.innerHTML = objProperties.data.collection[0].properties.Item.Hidden ;
    var propLayer = document.getElementById("propLayer");
    propLayer.innerHTML = objProperties.data.collection[0].properties.Item.Layer;
    var propMaterial = document.getElementById("propMaterial");
    propMaterial.innerHTML = objProperties.data.collection[0].properties.Item.Material;
    var propType = document.getElementById("propType");
    propType.innerHTML = objProperties.data.collection[0].properties.Item.Type;

    // console.log(   objProperties.data.collection[0].objectid + " | "
    //              + objProperties.data.collection[0].name + " | "
    //              + objProperties.data.collection[0].properties.Item.Hidden + " | ");
    return xmlHttpProperties.status;
}

AttributeExtension.prototype.unload = function () {
    alert('AttributeExtension is now unloaded!');
    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('AttributeExtension', AttributeExtension);

//-----Simple Panel
SimplePanel = function (parentContainer, id, title, content, x, y) {
    this.content = content;
    Autodesk.Viewing.UI.DockingPanel.call(this, parentContainer, id, '');

    // Auto-fit to the content and don't allow resize.  Position at the coordinates given.
    //
    this.container.style.height = "auto";
    this.container.style.width = "auto";
    this.container.style.resize = "both";
    this.container.style.left = x + "px";
    this.container.style.top = y + "px";
};

SimplePanel.prototype = Object.create(Autodesk.Viewing.UI.DockingPanel.prototype);
SimplePanel.prototype.constructor = SimplePanel;

SimplePanel.prototype.initialize = function () {

    console.log("Docking panel loaded");

    this.title = this.createTitleBar(this.titleLabel || this.container.id);
    this.container.appendChild(this.title);

    this.container.appendChild(this.content);
    this.initializeMoveHandlers(this.container);

    this.closer = this.createCloseButton();
    this.title.appendChild(this.closer);
    this.initializeCloseHandler(this.closer);

    var scrollContainer = { left: false, heightAdjustment: 45, marginTop: 0 };
    this.scrollcontainer = this.createScrollContainer(scrollContainer);

    var html = [
        '<div class="uicomponent-panel-controls-container">',
        '<div class="panel panel-default">',
        '<table bgcolor="#00FF00" class="table table-bordered table-inverse" id = "clashresultstable">',
        '<thead bgcolor="#323232">',
        '<th>Atrtribute name</th><th>Value in project</th><th>New Value</th>',
        '</thead>',
        '<tbody bgcolor="#323232">'].join('\n');

    //for (var i = 0; i < 10; i++) {
    //    html += ['<tr><td>' + "Attribute" + '</td><td><div id="elementID">Ok</div></td><td><input type="text" name="fname"></td><td><button style="color: black">Save</button></td></tr>'].join('\n');
    //}

    html += ['<tr><td>' + "Object ID" + '</td><td><div id="propObjectId">-</div></td><td><input type="text" name="fname"></td></tr>'].join('\n');
    html += ['<tr><td>' + "Name" + '</td><td><div id="propName">-</div></td><td><input type="text" name="fname"></td></tr>'].join('\n');
    html += ['<tr><td>' + "Hidden" + '</td><td><div id="propHidden">-</div></td><td><input type="text" name="fname"></td></tr>'].join('\n');
    html += ['<tr><td>' + "Layer" + '</td><td><div id="propLayer">-</div></td><td><input type="text" name="fname"></td></tr>'].join('\n');
    html += ['<tr><td>' + "Material" + '</td><td><div id="propMaterial">-</div></td><td><input type="text" name="fname"></td></tr>'].join('\n');
    html += ['<tr><td>' + "Type" + '</td><td><div id="propType">-</div></td><td><input type="text" name="fname"></td></tr>'].join('\n');
    html += ['<tr><td></td><td></td><td style="text-align: center"><button style="color: black; width: 146px"> Save </button></td></tr>'];


    html += ['</tbody>',
        '</table>',
        '</div>',
        '</div>'
    ].join('\n');

    $(this.scrollcontainer).append(html);
};

