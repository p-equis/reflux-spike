var Reflux = require("reflux");
var FlightStatusApi = require("app/flightStatus/flightStatusApi");

var Actions = Reflux.createActions([
	"checkFlightStatus",
	"departureCitySelected",
	"arrivalCitySelected",
	"checkFlightStatusSucceeded"
]);

Actions.checkFlightStatus.listen(function(flightStatusRequest) {
	FlightStatusApi
		.getSummaries(flightStatusRequest)
		.then(Actions.checkFlightStatusSucceeded);
});

module.exports = Actions;