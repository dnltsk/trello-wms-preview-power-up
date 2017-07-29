TrelloPowerUp.initialize(
    {
        'card-buttons': function (t, options) {
            return [{
                icon: './logo.png',
                text: 'WMS Preview',
                callback: selectTargetPopup
            }];
        }
    });

var selectTargetPopup = function (t) {
    return t.popup({
        title: 'WMS Preview',
        items: [{
            text: 'attach Maps..',
            callback: attachMapPopup
        }, {
            text: 'attach Legend Graphics..',
            callback: attachLegendGraphicPopup
        }]
    });
};


attachMapPopup = function (t, opts) {
    return this.attachGenericPopup(t, opts, 'MAP');
};

attachLegendGraphicPopup = function (t, opts) {
    return this.attachGenericPopup(t, opts, "LEGEND_GRAPHIC");
};

attachGenericPopup = function (t, opts, attachmentMode) {
    var title = attachmentMode === "MAP" ? 'Attach Maps..' : "Attach LegendGraphics..";
    var emptyMessage = 'No Maps found';
    var searchingMessage = 'Searching for Maps...';
    if (attachmentMode === 'LEGEND_GRAPHIC') {
        emptyMessage = 'No Legend Graphics found';
        searchingMessage = 'Searching for Legend Graphics...'
    }

    return t.popup({
        title: title,
        items: function (t, options) {

            console.log('context', t.getContext());

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

            var jQueryPromise = $.ajax({
                url: search,
                dataType: "xml"
            });
            return jQueryPromise.then(
                function (xmlBody) {
                    var wmsCapabilities = new GetCapabilitiesParser().parse(xmlBody);
                    if (wmsCapabilities.version !== '1.3.0') {
                        console.error('The WMS Service must be in Version 1.3.0 but is ' + wmsCapabilities.version);
                        return new Promise(function (resolve) {
                            resolve([]);
                        });
                    }
                    if ((attachmentMode === "MAP" && wmsCapabilities.getMap === undefined)
                        || (attachmentMode === "LEGEND_GRAPHIC" && wmsCapabilities.getLegendGraphic === undefined)) {
                        return new Promise(function (resolve) {
                            resolve([]);
                        });
                    }
                    var items = wmsCapabilities.layers.map(function (layer) {
                        return {
                            text: layer.title,
                            callback: function () {
                                if (attachmentMode === "MAP") {
                                    var getMapUrl = createGetMapUrl(wmsCapabilities, layer);
                                    t.attach({
                                        name: 'Map: ' + layer.title,
                                        url: getMapUrl
                                    });
                                    // Trello.post(
                                    //     '/1/cards/' + t.getContext().card + '/actions/comments?text=Map attached: ' + layer.title + ' ' + getMapUrl,
                                    //     function (data) {
                                    //         console.log('comment success', data);
                                    //     },
                                    //     function (error) {
                                    //         console.log('comment error', data);
                                    //     });
                                } else {
                                    var getLegendGraphicUrl = createGetLegendGraphicUrl(wmsCapabilities, layer);
                                    t.attach({
                                        name: 'LegendGraphic: ' + layer.title,
                                        url: getLegendGraphicUrl
                                    });
                                    Trello.post(
                                        '/1/cards/' + t.getContext().card + '/actions/comments?text=Legend Graphic attached: ' + layer.title + ' ' + getLegendGraphicUrl,
                                        function (data) {
                                            console.log('comment success', data);
                                        },
                                        function (error) {
                                            console.log('comment error', data);
                                        });
                                }
                            }
                        };
                    });
                    return new Promise(function (resolve) {
                        resolve(items);
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
            placeholder: 'Enter a WMS GetCapabilities URL',
            empty: emptyMessage,
            searching: searchingMessage
        }
    })
};


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