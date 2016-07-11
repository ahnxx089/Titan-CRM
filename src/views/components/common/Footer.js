/////////////////////////////////////////////////
// The common footer component.
//
// @file:   Footer.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var React = require('react');

var Footer = React.createClass({
    render: function () {
        /* jshint ignore:start */
        return (
            <footer className="footer">
                <div className="container">
                    <p className="text-muted">
                        &copy; 2016 Team Titan &mdash; All rights reserved
                    </p>
                </div>
            </footer>
        );
        /* jshint ignore:end */
    }
});

module.exports = Footer;