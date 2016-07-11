/////////////////////////////////////////////////
// A contact row on My Contacts page.
//
// @file:   ContactMechRow.js
// @author: William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var Link = require('react-router').Link;

var ContactMechRow = React.createClass({
    formatTelecom: function () {
        /* jshint ignore:start */
        var contactMech = this.props.contactMech;
        var jsxArray = [<span>{ contactMech.contactNumber }</span>];
        
        //Attach country code and area code, if applicable
        if (contactMech.areaCode) {
            jsxArray.unshift(<span>{ contactMech.areaCode }-</span>);
            if (contactMech.countryCode) {
                jsxArray.unshift(<span>{ contactMech.countryCode }-</span>);
            }
        }
        
        //Attach ask-for name, if applicable
        if (contactMech.askForName) {
            jsxArray.push(<span><br />Ask for { contactMech.askForName }</span>);
        }
        /* jshint ignore:end */
        
        return jsxArray;
    },
    formatAddress: function () {
        var contactMech = this.props.contactMech;
        var jsxArray = [];
        
        /* jshint ignore:start */
        if (contactMech.toName) {
            jsxArray.push(<span><strong>To:</strong> { contactMech.toName }<br /></span>);
        }
        
        if (contactMech.attnName) {
            jsxArray.push(<span><strong>Attn:</strong> { contactMech.attnName }<br /></span>);
        }
        
        if (contactMech.address1) {
            jsxArray.push(<span>{ contactMech.address1 }<br /></span>);
        }
        
         if (contactMech.address2) {
            jsxArray.push(<span>{ contactMech.address2 }<br /></span>);
        }
        
        var delimitter = <span></span>;
        
        if (contactMech.city) {
            jsxArray.push(<span>{ contactMech.city }</span>);
            delimitter = <span>, </span>;
        }
        
        if (contactMech.stateProvinceGeoId) {
            jsxArray.push(delimitter);
            jsxArray.push(<span>{ contactMech.stateProvinceGeoId }</span>);
            delimitter = <span>, </span>;
        }
        
        if (contactMech.zipOrPostalCode) {
            jsxArray.push(delimitter);
            jsxArray.push(<span>{ contactMech.zipOrPostalCode }</span>);
        }
        /* jshint ignore:end */
        
        return jsxArray;
    },
    typeDescription: function() {
        var id = this.props.contactMech.contactMechTypeId;
        var typeArray = this.props.types;
        var description = id;
        
        for (var i = 0; i < typeArray.length; i++) {
            if (typeArray[i].contact_mech_type_id === id) {
                description = typeArray[i].description;
                break;
            }
        }
        
        return description;
    },
    purposeTypeDescription: function() {
        var id = this.props.contactMech.contactMechPurposeTypeId;
        var purposeTypeArray = this.props.purposeTypes;
        var description = id;
        
        for (var i = 0; i < purposeTypeArray.length; i++) {
            if (purposeTypeArray[i].contact_mech_purpose_type_id === id) {
                description = purposeTypeArray[i].description;
                break;
            }
        }
        
        return description;
    },
    render: function () {
        /* jshint ignore:start */
        var contactMech = this.props.contactMech;
        var information = null;

        switch (contactMech.contactMechTypeId) {
            case 'TELECOM_NUMBER':
                information = this.formatTelecom();
                break;
            case 'POSTAL_ADDRESS':
                information = this.formatAddress();
                break;
            default:
                information = contactMech.infoString;
        }
        
        return (
            <tr>
                <td>{ this.typeDescription() }</td>
                <td>{ information }</td>
                <td>{ this.purposeTypeDescription() }</td>
                <td>
                    <Link to={ '#' } className="btn btn-primary btn-xs">
                        <span className="fa fa-pencil-square-o"></span> Edit
                    </Link>
                </td>
            </tr>
        );
        /* jshint ignore:end */
    }

});

module.exports = ContactMechRow;