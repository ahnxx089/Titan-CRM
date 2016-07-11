/////////////////////////////////////////////////
// Find Account Form component.
//
// @file:   FindAccountForm.js
// @author:  DukJin Ahn (ahnxx089@gmail.com)
/////////////////////////////////////////////////

var React = require('react');
var ReactDOM = require('react-dom');

var FindAccountForm = React.createClass({
     
    componentDidMount: function(){
        $('#tabs').tabs();    // for jquery-ui tabs
    },
    
    render: function () {
        /* jshint ignore:start */
        /*var account = this.state.account;*/
        
        
             return(
                 
            <form onSubmit={ this.props.onFormSubmit } onReset={ this.props.onFormReset }>
                <div id="tabs">
                    <ul>
                        <li><a href="#tabs-1">Find ID #</a></li>
                        <li><a href="#tabs-2">Find AccountName</a></li>
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

module.exports = FindAccountForm;