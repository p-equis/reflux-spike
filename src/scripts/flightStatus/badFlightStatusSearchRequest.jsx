var React = require('react');
var FlightStatusSearchForm = require('app/flightStatus/flightStatusSearchForm');

var BadFlightStatusSearchRequest = React.createClass({
	render: function() {
		return (
			<div>
			  <div className="alert alert-danger">
			  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
			    You must provide the departure city, arrival city, and date of travel.
			  </div>
			  <FlightStatusSearchForm />
			</div>
		);
	}
});

module.exports = BadFlightStatusSearchRequest;