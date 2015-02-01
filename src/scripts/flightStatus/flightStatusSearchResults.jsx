var _ = require('lodash');
var React = require("react");
var Reflux = require("reflux");

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var FlightStatusActions = require("app/flightStatus/actions");

var FlightStatusSearchResults = React.createClass({
	mixins: [
		Router.Navigation,
		Router.State,
		Reflux.listenTo(FlightStatusActions.checkFlightStatusSucceeded, "onFlightStatusResults")
	],
	componentWillMount: function() {
		FlightStatusActions.checkFlightStatus({
			from: this.getParams().from,
			to: this.getParams().to,
			date: this.getParams().date
		});
	},
	getInitialState: function() {
		return {
			isLoaded: false,
			summaries: []
		}
	},
	render: function() {
		return this.state.isLoaded 
			? this.renderLoaded()
			: this.renderLoading();
	},
	renderLoaded: function() {
		return (
			<div>
				<h3>Flights from {this.getParams().from} to {this.getParams().to} on {this.getParams().date}: </h3>
				<ul>
					{
						this.state.summaries.map(function(summary) {
							return (
								<li>Leaving at {summary.departureTime} on flight number {summary.flightNumber}</li>
							);
						})
					}
				</ul>
			</div>
		);
	},
	renderLoading: function() {
		return (
			<div>
				Loading...
			</div>
		);
	},
	onFlightStatusResults: function(flightStatusResults) {
		this.setState({
			isLoaded: true,
			summaries: flightStatusResults.summaries
		});
	}
});

module.exports = FlightStatusSearchResults;
