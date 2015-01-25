
var _ = require('lodash');
var React = require("react");
var Reflux = require("reflux");

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var Actions = require("./actions");
var FlightStatusStore = require("./flightStatusStore");
var Login = require("./login");
var FlightStatusSearchForm = require("./flightStatusSearchForm");

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

var FlightStatusSearchResults = React.createClass({
	mixins: [
		Router.Navigation,
		Router.State,
		Reflux.listenTo(Actions.checkFlightStatusSucceeded, "onFlightStatusResults")
	],
	componentWillMount: function() {
		Actions.checkFlightStatus({
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

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Header />
        <RouteHandler/>
      </div>
    );
  }
});

var Header = React.createClass({
	render: function() {
		return (
			<div>
				<div className="page-header">
					CompanyName
				</div>
				<Link to="home">Home</Link>
			</div>
		);
	}
});

var Homepage = React.createClass({
	render: function() {
		return (
			<div>
				<Link to="login">Login</Link><br/>
				<Link to="flightStatusForm">Flight Status</Link>
			</div>
		);
	}
});

var routes = (
    <Route handler={ App }>
      <Route name="home" path="/" handler = { Homepage } />
      <Route name="login" path="/login" handler= { Login } />
      <Route name="flightStatusForm" path="/flightStatus" handler={ FlightStatusSearchForm }/>
      <Route name="flightStatusSearch" path="/flightStatus/:from/:to/:date" handler={ FlightStatusSearchResults } />
      <NotFoundRoute name="notFound" handler={ BadFlightStatusSearchRequest } />
    </Route>
);

Router.run(routes, function(Handler, state) {
    React.render(<Handler params={ state.params } />, document.getElementById('appRoot'));
});