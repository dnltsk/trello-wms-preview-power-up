# Trello WMS Preview Power-Up

Trello Power-Up to generate a card for every layer of a given Web Map Service (WMS)

[![WMS Preview in action](demo-low.gif)](demo-medium.gif)

## requirements

* WMS in version `1.3.0`
* WMS GetCapabilities accessible via `https://`
* WMS GetCapabilities responds with CORS headers `Access-Control-Allow-Origin: *`
* WMS Layers uses CRS `EPSG:4326` (a.k.a. WGS84)

## samples

* IEM GOES Alaska VIS WMS Service of the Iowa State University<br>
https://mesonet.agron.iastate.edu/cgi-bin/wms/goes/alaska_vis.cgi?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities<br>
=> legend graphic is a blank white image

* IEM WMS Iowa Rainfall of the Iowa State University<br>
https://mesonet.agron.iastate.edu/cgi-bin/wms/iowa/rainfall.cgi?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities<br>
=> responding images do not have a proper mime-type (configuration broken)

* Cached WMS with OpenStreetMap Data of the Uni Heidelberg (it is proxied via Github to be accessible via https:// and with CORS headers)<br>
https://dnltsk.github.io/trello-wms-preview-power-up/test-data/sample-get-capabilities-1.3.0.xml<br>
=> layer "osm_auto:osm_lulc" is not working (configuration broken)

* https://nowcoast.noaa.gov/arcgis/services/nowcoast/obs_meteocean_insitu_sfc_time/MapServer/WMSServer?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities<br>
=> some layers do not have a name (configuration broken)

## references

* Power-Up Tutorial http://tech.trello.com/power-up-tutorial-part-one/
* Power-Up Samples https://github.com/trello/power-up-template
* Trello Client (required to create Lists, Cards, Attachments) https://developers.trello.com/get-started/start-building
* Trello API https://developers.trello.com/advanced-reference
