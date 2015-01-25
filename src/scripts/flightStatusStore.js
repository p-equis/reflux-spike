var Reflux = require("reflux");
var _ = require("lodash");

var actions = require("./actions");

var FlightStatusStore = Reflux.createStore({
	init: function() {
		this._allAirports = ['DAL', 'AUS', 'SAT'];
		this.listenToMany(actions);
		this.from = 'departure';
		this.to = 'arrival';
		this.date = '2015-01-25';
		this.fromAirports = this._allAirports;
		this.toAirports = this._allAirports;
	},
	getFormValues: function() {
		return {
			from: this.from,
			to: this.to,
			date: this.date,
			fromAirports: this.fromAirports,
			toAirports: this.toAirports
		};
	},
	onCheckFlightStatus: function() {
		this.trigger();
	},
	onDepartureCitySelected: function(city) {
		this.from = city;
		this.toAirports = _.difference(this._allAirports, [city]);
		this.trigger();
	},
	onArrivalCitySelected: function(city) {
		this.to = city;
		this.fromAirports = _.difference(this._allAirports, [city]);
		this.trigger();
	}
});

module.exports = FlightStatusStore;