/////////////////////////////////////////////////
// Add Contact Mech form component.
//
// @file:   AddContactMech.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var StateProvinceOption = require('./StateProvinceOption');
var CountryOption = require('./CountryOption');
var CommonStore = require('../../stores/CommonStore');
var CommonActions = require('../../actions/CommonActions');

var AddContactMech = React.createClass({

    getInitialState: function () {
        return {
            stateProvinceObjArray: [],
            countriesObjArray: []
        };
    },

    componentDidMount: function () {
        CommonStore.addGetAllStatesOrProvincesListener(this._onGetData);  // register as listener with Store
        CommonStore.addGetAllCountriesListener(this._onGetData);  // register as listener with Store
        CommonActions.getAllStatesOrProvinces();    // initiate Flux unidirectional flow
        CommonActions.getAllCountries();    // initiate Flux unidirectional flow
    },

    componentWillUnmount: function() {
        CommonStore.removeListener('getAllStatesOrProvinces', this._onGetData);
        CommonStore.removeListener('getAllCountries', this._onGetData);
    },

    _onGetData: function () {
        this.setState({
            stateProvinceObjArray: CommonStore.getStatesOrProvincesObjArray()
        });
        this.setState({
            countriesObjArray: CommonStore.getCountriesObjArray()
        });
    },

    render: function(){

        /* jshint ignore:start */

        var statesProvinces = this.state.stateProvinceObjArray;
        var statesProvincesJSX = [];

        var noStateProvince = { geo_id: null, abbreviation: '', geo_name:'' };

        // push one blank row onto currenciesJSX first, since the db allows null for party.preferred_currency_uom_id
        statesProvincesJSX.push(<StateProvinceOption key={ 'stateProvince_' } stateProvince={ noStateProvince }/>);

        for (var i = 0; i < statesProvinces.length; i++) {
            // See https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
            // for an explanation for passing a "key" prop to a child component in for loop
            statesProvincesJSX.push(<StateProvinceOption key={ 'stateProvince_' + i } stateProvince={ statesProvinces[i] }/>);
        }

        var countries = this.state.countriesObjArray;
        var countriesJSX = [];

        var noCountry = { geo_id: null, abbreviation: '', geo_name:'' };

        // push one blank row onto currenciesJSX first, since the db allows null for party.preferred_currency_uom_id
        countriesJSX.push(<CountryOption key={ 'country_' } country={ noCountry }/>);

        for (var i = 0; i < countries.length; i++) {
            // See https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
            // for an explanation for passing a "key" prop to a child component in for loop
            countriesJSX.push(<CountryOption key={ 'country_' + i } country={ countries[i] }/>);
        }

        return (
            <div>

                {/* Regex notes for validations used below:  We use regex to specify number and
                    type of characters permitted in many of the input type="text" field below.
                    [\x20-\x7E] gets us any visible character and a space.
                    [\u00C0-\u00FC] includes many accented characters including é ô ò ñ ö ç Ç ß å Å
                    See e.g., http://www.regular-expressions.info/posixbrackets.html
                    A good tester to use for trying out regexs is:  http://regexr.com/   */}

                {/* E-CONTACT INFO heading */}
                <div className="row">
                    <div className="col-xs-12">
                        <h2>Electronic Contact Info</h2>
                    </div>
                </div>

                {/* E-CONTACT INFO form fields:  1 className="row" div */}
                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="emailAddress">Email</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-envelope-o" aria-hidden="true"></i></div>
                                <input type="email"
                                    className="form-control"
                                    id="emailAddress"
                                    placeholder="janedoe@gmail.com"
                                    data-error="Invalid email address"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.emailAddress } />
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="webAddress">Web Address</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-globe" aria-hidden="true"></i>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    id="webAddress"
                                    placeholder="www.google.com"
                                    pattern="^[._-=+A-z0-9]{1,255}$"
                                    maxlength="255"
                                    data-error="(max length 255 characters)"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.webAddress } />
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                </div>

                {/* PHONE CONTACT INFO heading */}
                <div className="row">
                    <div className="col-xs-12">
                        <h2>Phone Number</h2>
                    </div>
                </div>

                {/* PHONE CONTACT INFO form fields:  2 className="row" divs */}
                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="countryCode">Country Code</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                </div>
                                <input type="number"
                                    className="form-control"
                                    id="countryCode"
                                    placeholder="1"
                                    max="9999999999"
                                    data-error="(max length 10 digits)"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.countryCode } />
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="areaCode">Area Code</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                </div>
                                <input type="number"
                                    className="form-control"
                                    id="areaCode"
                                    placeholder="202"
                                    max="9999999999"
                                    data-error="(max length 10 digits)"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.areaCode } />
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="contactNumber">Phone Number</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                </div>

                                <input type="text"
                                    className="form-control"
                                    id="contactNumber"
                                    placeholder="555-1234"
                                    pattern="^[-\d ]{1,60}$"
                                    data-error="Max 60 digits, dashes, spaces only"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.contactNumber }/>
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="askForName">Ask For Name</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    id="askForName"
                                    placeholder="Jane"
                                    pattern="^[\x20-\x7E\u00C0-\u00FC]{1,100}$"
                                    data-error="Max length 100 characters, alphanumeric including accents"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.askForName }/>
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                </div>

                {/* POSTAL ADDRESS heading */}
                <div className="row">
                    <div className="col-xs-12">
                        <h2>Primary Postal Address</h2>
                    </div>
                </div>

                {/* POSTAL ADDRESS form fields:  5 className="row" divs */}
                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="toName">To Name</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    id="toName"
                                    placeholder="Jane Doe"
                                    pattern="^[\x20-\x7E\u00C0-\u00FC]{1,100}$"
                                    data-error="(max length 100 characters)"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.toName }/>
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="attnName">Attention Name</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    id="attnName"
                                    placeholder="Jane Doe"
                                    pattern="^[\x20-\x7E\u00C0-\u00FC]{1,100}$"
                                    data-error="(max length 100 characters)"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.attnName }/>
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="address1">Address Line 1</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    id="address1"
                                    placeholder="123 Anywhere Lane"
                                    pattern="^[\x20-\x7E\u00C0-\u00FC]{1,255}$"
                                    data-error="(max length 255 characters)"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.address1 }/>
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="address2">Address Line 2</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    id="address2"
                                    placeholder="Suite #100"
                                    pattern="^[\x20-\x7E\u00C0-\u00FC]{1,255}$"
                                    data-error="(max length 255 characters)"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.address2 }/>
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    id="city"
                                    placeholder="My Town"
                                    pattern="^[\x20-\x7E\u00C0-\u00FC]{1,100}$"
                                    maxlength="100" data-error="(max length 100 characters)"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.city }/>
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="stateOrProvinceGeoId">State or Province</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-globe" aria-hidden="true"></i>
                                </div>
                                <select
                                    className="form-control"
                                    id="stateProvinceGeoId"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.stateProvinceGeoId }>
                                    { statesProvincesJSX }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="zipOrPostalCode">ZIP or Postal Code</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    id="zipOrPostalCode"
                                    placeholder="12345-6789"
                                    pattern="^[-\d ]{1,20}$"
                                    data-error="(max length 20 digits)"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.zipOrPostalCode }/>
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="countryGeoId">Country</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-globe" aria-hidden="true"></i>
                                </div>
                                <select
                                    className="form-control"
                                    id="countryGeoId"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.countryGeoId }>
                                    { countriesJSX }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-group">
                            <label htmlFor="directions">Directions</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-compass" aria-hidden="true"></i>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    id="directions"
                                    placeholder=""
                                    pattern="^[\x20-\x7E\u00C0-\u00FC]{1,255}$"
                                    data-error="(max length 255 characters)"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.directions }/>
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                </div>

            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = AddContactMech;