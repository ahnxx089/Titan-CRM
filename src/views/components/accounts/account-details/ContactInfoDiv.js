/////////////////////////////////////////////////
// The second large content subcomponent of the 
// Account Details page, containing the table of 
// contact mechanisms listed for the account.
// 
// 
//
// @file:   ContactInfoDiv.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var ContactMechRow = require('../../common/ContactMechRow');

var ContactInfoDiv = React.createClass({
    
    render: function () {
        
        var contactMechs = this.props.contactMechs;        
        var contactMechsJSX = [];
        /* jshint ignore: start */
        for (var i = 0; i < contactMechs.length; i++) {
            contactMechsJSX.push(<ContactMechRow key={'contact_mech_' + i} contactMech={ contactMechs[i] } />); 
        }
        
        return (
            <div>
            <div className="row">
                <div className="h2">
                    <div className="btn-toolbar pull-right">
                        <div className="btn-group dropdown dropdown-menu-right">
                            <button type="button" className="btn btn-secondary btn-custom dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                Add New
                                <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li><a href="#">Address</a></li>
                                <li><a href="#">Phone Number</a></li>
                                <li><a href="#">Email</a></li>
                                <li role="separator" className="divider"></li>
                                <li><a href="#">Web URL</a></li>
                            </ul>
                        </div>
                    </div>
                    <h2>Contact Information</h2>
                    
                </div>

            </div>
            <div className="row">
                <table id="contactMechsTable" className='table'>
                    <thead>
                        <tr>
                            <th>Contact Type</th>
                            <th>Contact Information</th>
                            <th>Purpose</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { contactMechsJSX }
                    </tbody>
                </table>
            </div>
            </div>

        );
        /* jshint ignore: end */
    }
});

module.exports = ContactInfoDiv;