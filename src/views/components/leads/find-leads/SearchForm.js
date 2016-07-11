/////////////////////////////////////////////////
// Search form component in FindLeadsPage.
//
// @file:   SearchForm.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

var React = require('React');
//var ReactDOM = require('react-dom');

var SearchForm = React.createClass({
    
    componentDidMount: function() {
        $('#tabs').tabs();    // for jquery-ui tabs
    },
    
    render: function() {
        /* jshint ignore: start */

        return (
            <div>
                {/*<form method="GET" action="/api/leads/" onReset={ this.props.onFormReset }>*/}
                <form onSubmit={ this.props.onFormSubmit } onReset={ this.props.onFormReset }>
                    <div id="tabs">
                    {/*<i>Bear with the style, for some days</i>*/}
                      <ul>
                        <li><a href="#tabs-1">Search By ID</a></li>
                        <li><a href="#tabs-2">Search By Identity</a></li>
                        <li><a href="#tabs-3">Search By Phone</a></li>
                      </ul>

                      <div id="tabs-1">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="partyId">ID No.</label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                        </div>
                                        <input type="number" 
                                            className="form-control" 
                                            id="partyId" 
                                            name="partyId"
                                            placeholder="Party id: 123" 
                                            onChange={ this.props.onChange } 
                                            value={ this.props.searchBy.partyId } />
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>

                      <div id="tabs-2">
                        <h3>Coming soon.</h3>
                      </div>

                      <div id="tabs-3">
                        <h3>Coming soon.</h3>
                      </div>
                    </div>

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
            </div>
                
            
        );
        
        /* jshint ignore:end */

    }
    
});
module.exports = SearchForm;