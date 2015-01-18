
var React = require("react");
var Reflux = require("reflux");

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
// var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var actions = Reflux.createActions([
	"checkFlightStatus"
]);

var FlightStatusSearchForm = React.createClass({
	mixins: [Router.Navigation],
	getInitialState: function() {
		return {
			from: 'departure',
			to: 'arrival',
			date: '2015-01-25'
		}
	},
	render: function() {
		return (
			<div>
			  <div>
			    <input ref='departureCity' placeholder={this.state.from}/>
			  </div>
			  <div>
			    <input ref='arrivalCity' placeholder={this.state.to}/>
			  </div>
			  <Link to='flightStatusSearch' params={this.state}>Search</Link>
			</div>
		);
	}
});

var FlightStatusStore = Reflux.createStore({
	init: function() {
		this.listenTo(actions.checkFlightStatus, "checkFlightStatus");
	},
	getStatuses: function() {
		return [{

		}];
	},
	checkFlightStatus: function() {
		this.trigger();
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
    </Route>
);

Router.run(routes, function(Handler, state) {
    React.render(<Handler params={ state.params } />, document.getElementById('appRoot'));
});