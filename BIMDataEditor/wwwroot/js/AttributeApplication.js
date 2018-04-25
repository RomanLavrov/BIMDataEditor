var viewerApp;
var viewables;
var indexVieable;

console.log('Attribute application');

var options = {
    env: 'AutodeskProduction',
    getAccessTocken: getAccessToken,
    refreshTocken: getAccessToken
};

function getAccessToken() {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("Get", 'api/forge/token', false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function initApplication(urn) {
    console.log('Init Application Annotation');
    var documentId = 'urn: ' + urn;
    var config3d = { extensions: ['AttributeExtension'] };
    Autodesk.Viewing.Initializer(option,
        function onInitialized() {
            viewerApp = new Autodesk.Viewing.ViewingApplication('MyViewerDiv');
            viewerApp.registerViewer(viewerApp.k3D, Autodesk.Vieweing.Private.GuiViewer3D, config3d);
            viewerApp.loadDocument(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
        });
}

function onDocumentLoadSuccess(doc) {
    viewables = viewerApp.bubble.search({ 'type': 'geometry' });
    if (viewables.length === 0) {
        console.error('Document contains no viewables');
        return;
    }
    viewerApp.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFail);
}

function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentloadFailure() - errorCode: ' + viewerErrorCode);
}
function onItemLoadSuccess(viewer, item) {
    console.log('onItemLoadSuccess()');
    console.log(viewer);
    console.log(item);

    console.log('Viewers are equal: ' + (viewer === viewerApp.getCurrentViewer()));
}

function onItemLoadFail(errorCode) {
    console.error('onItemLoadFail - errorCode: ' + errorCode );
}