
var _ = require('lodash');
var React = require("react");
var Reflux = require("reflux");

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var actions = require("./actions");
var FlightStatusStore = require("./flightStatusStore");

var FlightStatusSearchForm = React.createClass({
	mixins: [Router.Navigation, Reflux.listenTo(FlightStatusStore, "onStateChange")],
	getInitialState: function() {
		return FlightStatusStore.getFormValues();
	},
	onStateChange: function(state) {
		this.setState(FlightStatusStore.getFormValues());
	},
	render: function() {
		return (
			<div>
			 <AirportSelection
			 	selection={this.state.from}
			 	airports={this.state.fromAirports}
			 	selectionAction={actions.departureCitySelected} />
			 <AirportSelection 
			 	selection={this.state.to} 
			 	airports={this.state.toAirports}
			 	selectionAction={actions.arrivalCitySelected} />
			  <Link to='flightStatusSearch' params={this.state}>Search</Link>
			</div>
		);
	}
});

var AirportSelection = React.createClass({
	render: function() {
		return (
			<select defaultValue={this.props.selection} onChange={this._onSelect}>
				{ 
					this.props.airports.map(function(airport) {
						return <option key={airport} value={airport}>{airport}</option>
					})
				}
			</select>
		);
	},
	_onSelect: function(event) {
		var action = this.props.selectionAction;
		action(event.target.value);
	}
});

var BadFlightStatusSearchRequest = React.createClass({
	render: function() {
		return (
			<div>
			  <div class="error">
			    You must provide the departure city, arrival city, and date of travel.
			  </div>
			  <FlightStatusSearchForm />
			</div>
		);
	}
});

var FlightStatusSearchResults = React.createClass({
	mixins: [
		Router.Navigation
	],
	render: function() {
		return (
			<div>
			  It works!
			</div>
		);
	}
});

var App = React.createClass({
  render: function () {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
    <Route handler={ App }>
      <Route name="flightStatusForm" path="/" handler={ FlightStatusSearchForm }/>
      <Route name="flightStatusSearch" path="/:from/:to/:date" handler={ FlightStatusSearchResults } />
      <NotFoundRoute name="notFound" path="/" handler={ BadFlightStatusSearchRequest } />
    </Route>
);

Router.run(routes, function(Handler, state) {
    React.render(<Handler params={ state.params } />, document.getElementById('appRoot'));
});