var countriesJson;

countriesJson = $.getJSON('http://www.nearimprov.com/world-flags-in-context/src/data/ne-v2.0.0-countries-geojson/ne-countries-50m.json', function(json) {
  var get_icon, map, onEachFeature;
  map = L.map('map').setView([51.505, -0.09], 3);
  get_icon = function(iso) {
    var flag_icon, url;
    if (iso !== 'nz') {
      url = "http://www.geonames.org/flags/x/" + iso + ".gif";
    } else {
      url = "http://www.nearimprov.com/world-flags-in-context/src/lockwood.png";
    }
    flag_icon = L.icon({
      iconUrl: url,
      iconSize: [35, 20]
    });
    return flag_icon;
  };
  onEachFeature = function(feature, layer) {
    var cc, flag_icon, flag_location;
    cc = feature.properties.iso_a2.toLowerCase();
    layer.bindPopup("http://www.geonames.org/flags/x/" + cc + ".gif");
    flag_location = turf.centroid(feature).geometry.coordinates;
    if ((flag_location == null) || cc === '-99') {
      return;
    }
    if (cc === 'nz') {
      flag_location[0] += 23;
    } else if (cc === 'us') {
      flag_location[0] += 25;
      flag_location[1] -= 10;
    } else if (cc === 'ca') {
      flag_location[0] -= 15;
      flag_location[1] -= 10;
    } else if (cc === 'hr') {
      flag_location[1] += 0.8;
    } else if (cc === 'nl') {
      flag_location[0] += 7;
      flag_location[1] += 4;
    } else if (cc === 'fr') {
      flag_location[0] += 10;
      flag_location[1] += 12;
    } else if (cc === 'es') {
      flag_location[0] += 1.5;
      flag_location[1] += 1.5;
    } else if (cc === 'th') {
      flag_location[1] += 2;
    } else if (cc === 'la') {
      flag_location[0] -= 1.5;
      flag_location[1] += 2;
    } else if (cc === 'vn') {
      flag_location[1] += 5;
    } else if (cc === 'zm') {
      flag_location[1] -= 2;
      flag_location[0] -= 3;
    } else if (cc === 'mz') {
      flag_location[1] -= 1;
    } else if (cc === 'fj') {
      flag_location[0] += 121;
    } else if (cc === 'ps') {
      flag_location[1] += 0.5;
      flag_location[0] += 0.2;
    } else if (cc === 'il') {
      flag_location[0] -= 0.4;
    }
    flag_icon = get_icon(cc);
    return L.marker([flag_location[1], flag_location[0]], {
      icon: flag_icon,
      opacity: 1
    }).addTo(map).bindPopup(feature.properties.name + " (" + feature.properties.iso_a2 + ")");
  };
  return L.geoJson(json, {
    onEachFeature: onEachFeature,
    color: 'black',
    fillColor: 'grey',
    fillOpacity: 0.7,
    clickable: false,
    weight: 1
  }).addTo(map);
});
