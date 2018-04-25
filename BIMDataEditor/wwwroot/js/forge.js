var viewerApp;
var model;

function showModel(urn) {
    console.log("PROJECT URN: " + urn);
    if (urn === '') {
        runUpload();
    }

     function runUpload() {
        var UploadButton = document.getElementById("Upload");
        var SelectedFile = document.getElementById("FileName");
        SelectedFile.value = 'default';
        UploadButton.click();
    }

    var options = {
        env: 'AutodeskProduction',
        getAccessToken: getAccessToken,
        refreshToken: getAccessToken
    };
    
    var documentId = 'urn:' + urn;
    
    console.log("BEAREAR: " + getAccessToken());

    window.Autodesk.Viewing.Initializer(options, function onInitialized() {

        viewerApp = new window.Autodesk.Viewing.ViewingApplication('MyViewerDiv');

        //Configure the extension
        var config3D = {
            extensions: ["AttributeExtension"]
        };

        viewerApp.registerViewer(viewerApp.k3D, window.Autodesk.Viewing.Private.GuiViewer3D, config3D);
        viewerApp.loadDocument(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}

function onDocumentLoadSuccess(doc) {
   
    var viewables = viewerApp.bubble.search({ 'type': 'geometry' });
    if (viewables.length === 0) {
        console.error('Document contains no viewables.');
        return;
    }

    document = doc;
    viewerApp.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFail);
}

function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onItemLoadSuccess(viewer, item) {
    //console.log('onItemLoadSuccess()!');
    //console.log(viewer);
    //console.log(item);
    //console.log('Viewers are equal: ' + (viewer === viewerApp.getCurrentViewer()));
    model = viewer.model;
}

function onItemLoadFail(errorCode) {
    console.error('onItemLoadFail() - errorCode:' + errorCode);
}

/**
* the JavaScript getAccessToken on client-side. 
* To retrive viewer token
*/
function getAccessToken() {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/api/forge/token', false /*forge viewer requires SYNC*/);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}