/////////////////////////////////////////////////
// Create Contact page component.
//
// @file:   ContactDetailsPage.js
// @author: William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var ReactRouter = require('react-router');
var Link = require('react-router').Link;
var withRouter = require('react-router').withRouter;
var ContactMechRow = require('./ContactMechRow');
var CommonStore = require('../../stores/CommonStore');

var ContactMechTable = React.createClass({
    getInitialState: function () {
        return {
            types: [],
            purposeTypes: [],
        };
    },
    componentDidMount: function () {
        //get types crossref table
        CommonStore.addGetContactMechTypesListener(this._onGetTypes);
        CommonStore.getContactMechTypes();
        
        //get purpose types crossref table
        CommonStore.addGetContactMechPurposeTypesListener(this._onGetPurposeTypes);
        CommonStore.getContactMechPurposeTypes();
    },
    componentWillUnmount: function () {
        CommonStore.removeListener('getContactMechTypes', this._onGetTypes);
        CommonStore.removeListener('getContactMechPurposeTypes', this._onGetPurposeTypes);
    },
    _onGetTypes: function (event) {
        return this.setState({
            types: CommonStore.getTypeArray()
        });
    },
    _onGetPurposeTypes: function (event) {
        return this.setState({
            purposeTypes: CommonStore.getPurposeTypeArray()
        });
    },
    render: function () {
        var contactMechs = this.props.contactMechs || [];
        var contactMechsJSX = [];
        
         /* jshint ignore:start */
        for (var i = 0; i < contactMechs.length; i++) {
            contactMechsJSX.push(<ContactMechRow key={ 'contact_mech_' + i } contactMech={ contactMechs[i]} types={this.state.types} purposeTypes={this.state.purposeTypes} />);
        }
       
        return (
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
        );
        /* jshint ignore:end */
    }
});

module.exports = withRouter(ContactMechTable);