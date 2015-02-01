
var _ = require('lodash');
var React = require("react");
var Reflux = require("reflux");

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Redirect      = Router.Redirect;
var Link          = Router.Link;

var FlightStatusActions = require("app/flightStatus/actions");
var FlightStatusStore = require("app/flightStatus/flightStatusStore");
var FlightStatusSearchForm = require("app/flightStatus/flightStatusSearchForm");
var BadFlightStatusSearchRequest = require('app/flightStatus/badFlightStatusSearchRequest');
var FlightStatusSearchResults = require('app/flightStatus/flightStatusSearchResults');

var Login = require("app/login");
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
      <Route name="flightStatusForm" path="flightStatus" handler={ FlightStatusSearchForm }/>
      <Route name="flightStatusSearch" path="flightStatus/:from/:to/:date" handler={ FlightStatusSearchResults } />
      <NotFoundRoute name="notFound" handler={ BadFlightStatusSearchRequest } />
    </Route>
);

Router.run(routes, function(Handler, state) {
    React.render(<Handler params={ state.params } />, document.getElementById('appRoot'));
});