/////////////////////////////////////////////////
// My Leads page component.
//
// @file:   MyLeadsPage.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

var React = require('react');
var LeadRow = require('./LeadRow');
var LeadsStore = require('../../../stores/LeadsStore'); 
var LeadsActions = require('../../../actions/LeadsActions'); 

var MyLeadsPage = React.createClass({

    getInitialState: function () {
        return {
            leadsOwned: []
        };
    },
    
    componentDidMount: function () {
        // Event listener to fire when data retrieved-- 
        // when Store emits,informs this View something happened
        LeadsStore.addGetDataListener(this._onGetByOwner);
        
        // Call the async function to get my leads
        LeadsActions.getLeadsByOwner();
    },

    componentWillUnmount: function() {
        // Avoids console error
        LeadsStore.removeListener('getData', this._onGetByOwner);
    },

    // An event registered with the store-- fires when emitGet()
    // is called inside getLeadsByOwner's success callback
    _onGetByOwner: function () {
        this.setState({
            leadsOwned: LeadsStore.getLeadsOwned()
        });
        // Convert the My Leads HTML table into a nice looking jQuery DataTable
        $('#myLeadsTable').DataTable();
    },

    render: function () {

        /* jshint ignore:start */        
        var leads = this.state.leadsOwned;        
        var leadsJSX = [];

        for (var i = 0; i < leads.length; i++) {
            // See https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
            // for an explanation for passing a "key" prop to a child component in for loop
            leadsJSX.push(<LeadRow key={ 'lead_' + i } lead={ leads[i] }/>);
        }

        return (
            <div>
                <div className="container" >
                    <div className="panel panel-default">
                        <div className="panel-heading panel-heading-custom">
                            <h2>My Leads</h2>
                        </div>
                        <div className="panel-body">
                            <table id="myLeadsTable" className='table'>
                                <thead>
                                    <tr>
                                        <th>Lead ID</th>
                                        <th>Salutation</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Description</th>
                                        <th>Parent Party ID</th>
                                        <th>Created Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { leadsJSX }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = MyLeadsPage;