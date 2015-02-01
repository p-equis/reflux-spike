var Reflux = require("reflux");
var _ = require("lodash");

var actions = require("app/actions");

var FlightStatusStore = Reflux.createStore({
	init: function() {
		this._allAirports = ['DAL', 'AUS', 'SAT'];
		this.listenToMany(actions);
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
	}
});

module.exports = FlightStatusStore;