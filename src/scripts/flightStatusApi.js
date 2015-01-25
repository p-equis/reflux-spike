var Q = require('q');

var FlightStatusApi = {
	getSummaries: function(flightStatusRequest) {
		var from = flightStatusRequest.from,
		    to = flightStatusRequest.to,
		    date = flightStatusRequest.date;

	    return Q({
	    	summaries: [
	    		{
	    			departureTime: '1pm',
	    			flightNumber: '15'
	    		},
	    		{
	    			departureTime: '5pm',
	    			flightNumber: '1029'
	    		}
	    	]
    	})
    	.delay(2000);
	}
};

module.exports = FlightStatusApi;