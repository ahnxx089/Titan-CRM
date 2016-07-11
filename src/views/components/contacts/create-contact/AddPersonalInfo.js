/////////////////////////////////////////////////
// Add Personal Info form component.
//
// @file:   AddPersonalInfo.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var CurrencyOption = require('../../common/CurrencyOption');
var CommonStore = require('../../../stores/CommonStore');
var CommonActions = require('../../../actions/CommonActions');

var AddPersonalInfo = React.createClass({

    getInitialState: function () {
        return {
            currenciesObjArray: []
        };
    },

    componentDidMount: function () {
        // Event listener to fire when data retrieved--
        // when Store emits, informs this View something happened
        CommonStore.addGetAllCurrenciesListener(this._onGetData);

        // Call the async function to get all currencies
        CommonActions.getAllCurrencies();
    },

    componentWillUnmount: function() {
        // Avoids console error
        CommonStore.removeListener('getAllCurrencies', this._onGetData);
    },

    // An event registered with the store-- fires when emitGet()
    // is called inside getContactsByOwner's success callback
    _onGetData: function () {
        this.setState({
            currenciesObjArray: CommonStore.getCurrenciesObjArray()
        });
    },

    render: function(){

        /* jshint ignore:start */

        var currencies = this.state.currenciesObjArray;
        var currenciesJSX = [];

        var noCurrency = { uom_id: null, abbreviation: '', description:'' };

        // push one blank row onto currenciesJSX first, since the db allows null for party.preferred_currency_uom_id
        currenciesJSX.push(<CurrencyOption key={ 'currency_' } currency={ noCurrency }/>);

        for (var i = 0; i < currencies.length; i++) {
            // See https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
            // for an explanation for passing a "key" prop to a child component in for loop
            currenciesJSX.push(<CurrencyOption key={ 'currency_' + i } currency={ currencies[i] }/>);
        }

        return (
            <div>

                {/* Personal Info section heading */}
                <div className="row">
                    <div className="col-xs-12">
                        <h2>Personal Info</h2>
                    </div>
                </div>

                {/* Personal Info fields (4 rows) */}
                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    id="firstName"
                                    placeholder="Jane"
                                    pattern="^[\x20-\x7E\u00C0-\u00FC]{1,100}$"
                                    data-error="(max length 100 characters)"
                                    required
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.firstName } />
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="middleName">Middle Name</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                <input type="text"
                                    className="form-control"
                                    id="middleName"
                                    placeholder="Anne"
                                    pattern="^[\x20-\x7E\u00C0-\u00FC]{1,100}$"
                                    data-error="(max length 100 characters)"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.middleName } />
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                </div>

                <div className="row">
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
                                    pattern="^[\x20-\x7E\u00C0-\u00FC]{1,100}$"
                                    data-error="(max length 100 characters)"
                                    required
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.lastName } />
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="salutation">Salutation</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                </div>
                                <input type="text"
                                    className="form-control"
                                    id="salutation"
                                    placeholder="Mr., Ms., etc."
                                    pattern="^[\x20-\x7E\u00C0-\u00FC]{1,100}$"
                                    data-error="(max length 100 characters)"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.salutation } />
                            </div>
                            <div className="help-block with-errors"></div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="currency">Currency</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-usd" aria-hidden="true"></i>
                                </div>
                                <select
                                    className="form-control"
                                    id="preferredCurrencyUomId"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.preferredCurrencyUomId }>
                                    { currenciesJSX }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="birthDate">Birth Date</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                </div>
                                <input type="date"
                                    className="form-control"
                                    id="birthDate"
                                    placeholder="Birth Date"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.birthDate }/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                </div>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    rows="4"
                                    placeholder="(1000 characters or less)"
                                    pattern="^[\x20-\x7E\u00C0-\u00FC]{1,1000}$"
                                    data-error="(max length 1000 characters)"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.description } ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="comments">Comments</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                </div>
                                <textarea
                                    className="form-control"
                                    id="comments"
                                    rows="4"
                                    placeholder="(255 characters or less)"
                                    pattern="^[\x20-\x7E\u00C0-\u00FC]{1,255}$"
                                    data-error="(max length 255 characters)"
                                    onChange={ this.props.onChange }
                                    value={ this.props.contact.comments } ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = AddPersonalInfo;