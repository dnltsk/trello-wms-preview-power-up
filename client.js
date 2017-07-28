var attachMapPopup = function (t, opts) {
    return t.popup({
        title: 'Attach Map..',
        items: function (t, options) {
            var search = options.search;
            if (!search || search.length === 0) {
                //no input
                return new Promise(function (resolve) {
                    resolve([])
                });
            }
            if (search.trim().indexOf("https://") === -1) {
                //input does not start with https://
                return new Promise(function (resolve) {
                    resolve([]);
                });
            }

            var promise = $.ajax({
                url: search,
                dataType: "xml"
            });
            return promise.then(
                function (xmlBody) {
                    var wmsCapabilities = new GetCapabilitiesParser().parse(xmlBody);
                    if (wmsCapabilities.version !== '1.3.0') {
                        console.error('The WMS Service must be in Version 1.3.0 but is ' + wmsCapabilities.version);
                        return new Promise(function (resolve) {
                            resolve([]);
                        });
                    }
                    console.log('fine', wmsCapabilities);
                    return new Promise(function (resolve) {
                        resolve([]);
                    });
                },
                function (error) {
                    console.error('Unable to load GetCapabilities document: Does the resource contain CORS headers?');
                    return new Promise(function (resolve) {
                        resolve([]);
                    });
                })

        },
        search: {
            // optional # of ms to debounce search to
            // defaults to 300, override must be larger than 300
            debounce: 300,
            placeholder: 'Enter WMS GetCapabilities URL',
            empty: 'No Map Layers found',
            searching: 'Searching for Map Layers...'
        }
    })
};

var enterGetCapabilitiesUrl = function (t) {
    return t.popup({
        title: 'WMS Preview',
        items: [{
            text: 'attach Map..',
            callback: attachMapPopup
        }, {
            text: 'attach LegendGraphic..',
            callback: attachMapPopup

        }]
    });
};

TrelloPowerUp.initialize(
    {
        'card-buttons': function (t, options) {
            return [{
                icon: './logo.png',
                text: 'WMS Preview',
                callback: enterGetCapabilitiesUrl
            }];
        }
    });

/**
 *
 * @constructor
 */
var GetCapabilitiesParser = function () {

    this.parse = function (xmlBody) {
        return {
            version: $(xmlBody).find('Service').parent().attr('version'),
            name: $(xmlBody).find('Service').find('> Name').text(),
            title: $(xmlBody).find('Service').find('> Title').text(),
            getMap: parseGetMapCapabilities(xmlBody),
            getLegendGraphic: parseGetLegendGraphicCapabilities(xmlBody),
            layers: parseLayers(xmlBody)
        };
    };

    function parseGetMapCapabilities(xmlBody) {
        if ($(xmlBody).find('Capability Request GetMap').length === 0) {
            return undefined;
        }
        return {
            resource: $(xmlBody).find('Capability Request GetMap Get OnlineResource').attr('xlink:href'),
            format: $(xmlBody).find('Capability Request GetMap Format:first').text(),
            crs: $(xmlBody).find('Capability Layer:first CRS:first').text()
        }
    }

    function parseGetLegendGraphicCapabilities(xmlBody) {
        if ($(xmlBody).find('Capability Request GetLegendGraphic, Capability Request sld\\:GetLegendGraphic').length === 0) {
            return undefined
        }
        var getLegendGraphic = $(xmlBody).find('Capability Request GetLegendGraphic, Capability Request sld\\:GetLegendGraphic');
        return {
            resource: getLegendGraphic.find('Get OnlineResource').attr('xlink:href'),
            format: getLegendGraphic.find('Format:first').text()
        }
    }

    function parseLayers(xmlBody) {
        var layers = [];
        $(xmlBody).find('Layer Layer').each(function () {
            layers.push({
                name: $(this).find("> Name").text(),
                title: $(this).find("> Title").text()
            })
        });
        return layers;
    }

};

/**
 *
 */
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
        'format=' + wmsCapabilities.getMap.format
    ].join('&');
}

/**
 *
 */
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
        'format=' + wmsCapabilities.getLegendGraphic.format
    ].join('&');
}