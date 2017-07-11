
function createGetMapUrl(wmsCapabilities, layer) {
    return [
        wmsCapabilities.getMap.resource,
        'SERVICE=WMS',
        'VERSION=1.3.0',
        'REQUEST=GetMap',
        'LAYERS=' + layer.name,
        'STYLES=',
        'CRS=EPSG:4326',
        'BBOX=-90,-180,90,180',
        'width=1024',
        'height=512',
        'format='+wmsCapabilities.getMap.format
    ].join('&');
}

function createGetLegendGraphicUrl(wmsCapabilities, layer) {
    return [
        wmsCapabilities.getLegendGraphic.resource,
        'SERVICE=WMS',
        'VERSION=1.3.0',
        'REQUEST=GetLegendGraphic',
        'LAYER=' + layer.name,
        'STYLE=',
        'CRS=EPSG:4326',
        'BBOX=-90,-180,90,180',
        'width=1024',
        'height=512',
        'format='+wmsCapabilities.getLegendGraphic.format
    ].join('&');
}