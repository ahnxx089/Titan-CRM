/////////////////////////////////////////////////
// A party info div on Add XX page.
//
// @file:   PartyDiv.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

var React = require('react');
var CurrencyOption = require('./CurrencyOption'); 
var CommonStore = require('../../stores/CommonStore');
var CommonActions = require('../../actions/CommonActions');


var PartyDiv = React.createClass({
    
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
    
    
    
    render: function () {
        
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
                <div className="row">
                    <div className="col-xs-12">
                        <h2>Basic Info [PARTY]</h2>
                    </div>
                </div>
            {/* ent stands for entity, either a lead or account */}
                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="currencyUomId">Currency</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-usd" aria-hidden="true"></i></div>
                                <select id="currencyUomId" className="form-control" onChange={ this.props.onChange } value={this.props.ent.currencyUomId} >
                                    { currenciesJSX }
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                <textarea className="form-control" id="description" rows="4" placeholder="description of a lead/account " onChange={ this.props.onChange } value={this.props.ent.description}></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                {/*<div className="row">
                
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="partyTypeId">Party Type Id *</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                <select id="partyTypeId" className="form-control" required>
                                 <option value="PERSON">PERSON</option>
                                 <option value="ORGANIZATION">Organization</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="statusId">Status *</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                <select id="statusId" className="form-control" onChange={ this.props.onChange} value={this.props.ent.statusId} required >
                                    <option disabled value=''> -- select an option -- </option>
                                    <option value="PARTY_ENABLED">ENABLED</option>
                                    <option value="PARTY_DISABLED">DISABLED</option>
                                    <option value="PTYLEAD_CONVERTED">CONVERTED</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                </div>*/} {/* End of row div */}
            </div>
        );
        /* jshint ignore:end */
    }

});

// It is not okay to use double slash // for comments within the render function, 
// at least not after its return statement, OR at least not with HTML tags
module.exports = PartyDiv;