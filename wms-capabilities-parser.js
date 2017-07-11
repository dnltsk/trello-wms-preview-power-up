var GetCapabilitiesParser = function () {

    this.parse = function (xmlBody) {
        return {
            name: $(xmlBody).find('Service').find('Name').text(),
            title: $(xmlBody).find('Service').find('Title').text(),
            getMap: parseGetMapCapabilities(xmlBody),
            getLegendGraphic: parseGetLegendGraphicCapabilities(xmlBody),
            layers: parseLayers(xmlBody)
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
        console.log('GetLegendGraphic', $(xmlBody).find('Capability Request GetLegendGraphic, Capability Request sld\\:GetLegendGraphic'));
        console.log('GetLegendGraphic length', $(xmlBody).find('Capability Request GetLegendGraphic, Capability Request sld\\:GetLegendGraphic').length);
        if ($(xmlBody).find('Capability Request GetLegendGraphic, Capability Request sld\\:GetLegendGraphic') === undefined) {
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
                name: $(this).find("Name").text(),
                title: $(this).find("Title").text()
            })
        });
        return layers;
    }


};