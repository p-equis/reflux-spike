
var _ = require('lodash');
var React = require("react");
var Reflux = require("reflux");

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var Input = require("react-bootstrap").Input;
var ReactRouterBootstrap = require('react-router-bootstrap')
  , ButtonLink = ReactRouterBootstrap.ButtonLink;

var actions = require("./actions");
var FlightStatusStore = require("./flightStatusStore");

var FlightStatusSearchForm = React.createClass({
	mixins: [
		Router.Navigation, 
		Reflux.listenTo(FlightStatusStore, "onStateChange")
	],
	getInitialState: function() {
		return FlightStatusStore.getFormValues();
	},
	onStateChange: function(state) {
		this.setState(FlightStatusStore.getFormValues());
	},
	render: function() {
		return (
			<form>
			 <AirportSelection
			 	selection={this.state.from}
			 	airports={this.state.fromAirports}
			 	selectionAction={actions.departureCitySelected} />
			 <AirportSelection 
			 	selection={this.state.to} 
			 	airports={this.state.toAirports}
			 	selectionAction={actions.arrivalCitySelected} />
			  <ButtonLink to='flightStatusSearch' params={this.state}>Search</ButtonLink>
			</form>
		);
	}
});

var AirportSelection = React.createClass({
	render: function() {
		return (
			<Input type="text" placeholder={this.props.selection} onChange={this._onSelect} />
		);
	},
	_onSelect: function(event) {
		var action = this.props.selectionAction;
		action(event.target.value);
	}
});

module.exports = FlightStatusSearchForm;