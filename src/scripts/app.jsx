
var React = require("react");
var Reflux = require("reflux");

var actions = Reflux.createActions([
	"checkFlightStatus"
]);

actions.checkFlightStatus.preEmit = function(searchRequest) {
  alert(searchRequest.departureCity);
};

var FlightStatusSearch = React.createClass({
	render: function() {
		return (
			<div>
			  <div>
			    <label>Departure City</label>
			    <input ref='departureCity'/>
			  </div>
			  <div>
			    <label>Arrival City</label>
			    <input ref='arrivalCity'/>
			  </div>
			  <button onClick={this._checkFlightStatus}>Check status</button>
			</div>
		);
	},
	_checkFlightStatus: function() {
		actions.checkFlightStatus({ 
			departureCity: this.refs['departureCity'].getDOMNode().value 
		});
	}
});

React.render(<FlightStatusSearch />, document.getElementById('appRoot'))