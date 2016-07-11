/////////////////////////////////////////////////
// Search form component
//
// @file:   SearchForm.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var ReactDOM = require('react-dom');

var SearchForm = React.createClass({

    componentDidMount: function(){
        $('#tabs').tabs();    // for jquery-ui tabs
    },

    render: function(){

        /* jshint ignore:start */
        return(
            <form onSubmit={ this.props.onFormSubmit } onReset={ this.props.onFormReset }>
                <div id="tabs">
                    <ul>
                        <li><a href="#tabs-1">Find By ID #</a></li>
                        <li><a href="#tabs-2">Find By Name</a></li>
                        <li><a href="#tabs-3">Find By Phone Number</a></li>
                    </ul>

                    <div id="tabs-1">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="partyId">ID #</label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                        </div>
                                        <input type="number"
                                            className="form-control"
                                            id="partyId"
                                            placeholder="123"
                                            onChange={ this.props.onIdFieldChange }
                                            value={ this.props.idField.partyId } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="tabs-2">
                        <div className="row">
                            <div className="col-lg-6 col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                        <input type="text"
                                            className="form-control"
                                            id="firstName"
                                            placeholder="Jane"
                                            onChange={ this.props.onNameFieldChange }
                                            value={ this.props.nameField.firstName } />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                        </div>
                                        <input type="text"
                                            className="form-control"
                                            id="lastName"
                                            placeholder="Doe"
                                            onChange={ this.props.onNameFieldChange }
                                            value={ this.props.nameField.lastName } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="tabs-3">
                        <div className="row">
                            <div className="col-lg-3 col-xs-6">
                                <div className="form-group">
                                    <label htmlFor="countryCode">Country Code</label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                        <input type="text"
                                            className="form-control"
                                            id="countryCode"
                                            placeholder="1"
                                            onChange={ this.props.onPhoneFieldChange }
                                            value={ this.props.phoneField.countryCode } />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-xs-6">
                                <div className="form-group">
                                    <label htmlFor="areaCode">Area Code</label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                        <input type="text"
                                            className="form-control"
                                            id="areaCode"
                                            placeholder="212"
                                            onChange={ this.props.onPhoneFieldChange }
                                            value={ this.props.phoneField.areaCode } />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="contactNumber">Contact Number</label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                        <input type="text"
                                            className="form-control"
                                            id="contactNumber"
                                            placeholder="555-0123"
                                            onChange={ this.props.onPhoneFieldChange }
                                            value={ this.props.phoneField.contactNumber } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Submit button is outside the on row below search boxes */}
                <div className="row">
                    <div className="col-lg-1 col-xs-6">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                    <div className="col-lg-10 "></div>
                    <div className="col-lg-1 col-xs-6">
                        <button className="btn btn-primary" type="reset">Reset</button>
                    </div>
                </div>

            </form>
        );
        /* jshint ignore:end */
    }
});

module.exports = SearchForm;