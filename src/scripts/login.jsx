var React = require("react");
var Input = require("react-bootstrap").Input;

var Login = React.createClass({
	render: function() {
		return (
			<form className="form-horizontal">
		      <Input type="text" placeholder="user name" wrapperClassName="col-xs-offset-1 col-xs-10" />
		      <Input type="password" placeholder="password" wrapperClassName="col-xs-offset-1 col-xs-10" />
		      <Input type="submit" value="Log In" wrapperClassName="col-xs-offset-1 col-xs-10" />
	      </form>
		);
	}
});

module.exports = Login;