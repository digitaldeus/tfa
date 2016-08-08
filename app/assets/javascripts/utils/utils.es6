/**
 * Compute distance between a given lat and long
 */
const distance = function (lat1, lon1, lat2, lon2) {
    const l1 = new google.maps.LatLng(lat1, lon1);
    const l2 = new google.maps.LatLng(lat2, lon2);
  return google.maps.geometry.spherical.computeDistanceBetween(l1, l2) * 0.000621371; // convert meters to miles
};

const parseQueryString = function (variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return decodeURIComponent(pair[1]);
		}
	}

	return null;
};

/**
 * Used for getting children of object when there
 * is no evidence if those children exists
 *
 * Example:
 *
 * getChildStr({a: {b: {c: 2}}}, "a.b.c") == 2
 * 
 * @param  {object} obj  Object on which to search
 * @param  {string} path String interpretation of path
 * @return {mixed}       Return false if no ancestors exists or value
 */
const getChild = function(obj, path) {
  return path.split(".").reduce((a, b) => {
    return a && (a[b] || false);
  }, obj);
};


/**
 * Pseudo uniq string generator
 * @return {string} uniq indentifier
 */
const getUniqId = function() {
  return '_' + Math.random().toString(36).substr(2, 9);
};