var swiperData = require("./data.json");

var city = require("./city.json");

var search = require("./hot.json")

var resObj = {
    '/api/list': swiperData,
    '/api/city': city,
    '/api/search': search
}

module.exports = function(url) {
    return resObj[url]
}