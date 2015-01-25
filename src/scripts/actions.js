var Reflux = require("reflux");

var actions = Reflux.createActions([
	"checkFlightStatus",
	"departureCitySelected",
	"arrivalCitySelected"
]);

module.exports = actions;