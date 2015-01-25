var React = require("react");
var Input = require("react-bootstrap").Input;
var ReactRouterBootstrap = require('react-router-bootstrap')
  , ButtonLink = ReactRouterBootstrap.ButtonLink;

var Login = React.createClass({
	render: function() {
		return (
			<form>
		      <Input type="text" placeholder="user name"/>
		      <Input type="password" placeholder="password"/>
		      <ButtonLink to="home">Log In</ButtonLink>
	      </form>
		);
	}
});

module.exports = Login;