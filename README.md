# Trello WMS Preview Power-Up

Trello Power-Up to generate a card for every layer of a given Web Map Service (WMS)

[![WMS Preview in action](demo-low.gif)](demo-medium.gif)

## requirements

* WMS in version `1.3.0`
* WMS GetCapabilities accessible via `https://`
* WMS GetCapabilities responds with CORS headers `Access-Control-Allow-Origin: *`
* WMS Layers uses CRS `EPSG:4326` (a.k.a. WGS84)

## references

* Power-Up Tutorial http://tech.trello.com/power-up-tutorial-part-one/
* Power-Up Samples https://github.com/trello/power-up-template
* Trello Client (required to create Lists, Cards, Attachments) https://developers.trello.com/get-started/start-building
* Trello API https://developers.trello.com/advanced-reference
