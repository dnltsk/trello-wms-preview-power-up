
function createGetMapUrl(wmsCapabilities, layer) {
    return 'http://129.206.228.72/cached/osm/service?service=wms&version=1.1.1&request=GetMap&layers=' + layer.name + '&styles=&srs=EPSG:4326&bbox=-180,-90,180,90&width=1024&height=512&format=image/png'
}

function createGetLegendGraphicUrl(wmsCapabilities, layer) {
    return 'http://129.206.228.72/cached/osm/service?service=wms&version=1.1.1&request=GetLegendGraphic&layer=' + layer.name + '&format=image/png'
}