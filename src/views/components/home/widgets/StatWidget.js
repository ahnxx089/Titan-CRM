/////////////////////////////////////////////////
// Dashboard widget component for displaying
// statistics to the user. Inspired by the SB-Admin
// -React admin dashboard library.
//
// @file:   StatWidget.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////
var React = require('react');
var StatIcon = require('./StatIcon');
var StatQuantity = require('./StatQuantity');
var StatWidget = React.createClass({
    
    /* this.props.color can be one of 6 color choices:
    cyan, purple, pink, red, orange, or green. I have
    not yet worked out how to do validation for this. */
    render: function () {
        /* jshint ignore: start */
        return (

            <div className="col-lg-3 col-md-6">
                <div className={"panel panel-default panel-" + this.props.color }>
                    <div className="panel-heading">
                        <div className="row">

                            <div className="panel-title">

                                <StatIcon icon={this.props.icon} />
                                <StatQuantity amount={this.props.amount} unit={this.props.unit} />
                                {/* Alternatively: append  &#10;&nbsp;  after StatQuantity element. 
                                Use a condition check to make sure this only happen with shorter unit */}

                            </div>

                        </div>

                    </div>
                    <div className="panel-body">
                        <p>See details <span className="text-right glyphicon glyphicon-circle-arrow-right"></span></p>
                    </div>

                </div>
            </div>
        );
        /* jshint ignore: end */
    }
});

module.exports = StatWidget;
