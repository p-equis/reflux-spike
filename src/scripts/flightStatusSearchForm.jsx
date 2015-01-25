
var _ = require('lodash');
var React = require("react");
var Reflux = require("reflux");

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var ReactBootstrap = require("react-bootstrap");
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;

var actions = require("./actions");
var FlightStatusStore = require("./flightStatusStore");

var FlightStatusSearchForm = React.createClass({
	mixins: [
		Router.Navigation
	],
	getInitialState: function() {
		return {
			from: 'departure',
			to: 'arrival',
			date: new Date()
		};
	},
	render: function() {
		return (
			<form>
			 <AirportSelection
			 	selection={this.state.from}
			 	onChange={this.onDepartureCitySelected} />
			 <AirportSelection 
			 	selection={this.state.to} 
			 	onChange={this.onArrivalCitySelected} />
			  <Button onClick={this.onSearchClick}>Search</Button>
			</form>
		);
	},
	onDepartureCitySelected: function(city) {
		this.setState({ from: city });
	},
	onArrivalCitySelected: function(city) {
		this.setState({ to: city });
	},
	onSearchClick: function() {
		this.transitionTo("flightStatusSearch", {
			from: this.state.from,
			to: this.state.to,
			date: this.state.date
		});
	}
});

var AirportSelection = React.createClass({
	propTypes: {
		selection: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired
	},
	render: function() {
		return (
			<Input type="text" placeholder={this.props.selection} onChange={this.onChange} />
		);
	},
	onChange: function(event) {
		var action = this.props.onChange;
		action(event.target.value);
	}
});

module.exports = FlightStatusSearchForm;