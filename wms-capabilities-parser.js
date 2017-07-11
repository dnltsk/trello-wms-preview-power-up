var GetCapabilitiesParser = function () {

    this.parse = function (xmlBody) {
        return {
            service: {
                name: $(xmlBody).find('Service').find('Name').text(),
                title: $(xmlBody).find('Service').find('Title').text(),
                getMap: parseGetMapCapabilities(xmlBody),
                getLegendGraphic: parseGetLegendGraphicCapabilities(xmlBody),
                layers: parseLayers(xmlBody)
            }
        };
    };

    function parseGetMapCapabilities(xmlBody) {
        if ($(xmlBody).find('Capability Request GetMap') === undefined) {
            return undefined;
        }
        return {
            resource: $(xmlBody).find('Capability Request GetMap Get OnlineResource').attr('xlink:href'),
            format: $(xmlBody).find('Capability Request GetMap Format:first').text(),
            crs: $(xmlBody).find('Capability Layer:first CRS:first').text()
        }
    }

    function parseGetLegendGraphicCapabilities(xmlBody) {
        if ($(xmlBody).find('Capability Request GetLegendGraphic') === undefined) {
            return undefined
        }
        return {
            resource: $(xmlBody).find('Capability Request GetLegendGraphic Get OnlineResource').attr('xlink:href'),
            format: $(xmlBody).find('Capability Request GetLegendGraphic Format:first').text()
        }
    }

    function parseLayers(xmlBody) {
        var layers = [];
        $(xmlBody).find('Layer Layer').each(function () {
            layers.push({
                name: $(this).find("Name").text(),
                title: $(this).find("Title").text()
            })
        });
        return layers;
    }


};