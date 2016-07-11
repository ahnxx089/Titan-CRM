/////////////////////////////////////////////////
// Create Lead page component.
//
// @file:   CreateLeadPage.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

var React = require('react');
var withRouter = require('react-router').withRouter;

var AddLeadForm = require('./AddLeadForm');
var LeadsStore = require('../../../stores/LeadsStore'); 
var LeadsActions = require('../../../actions/LeadsActions'); 

// As long as this var (component name) matches the one used in the last line (module.exports), it is good. 
// Since the project is browserified, other components refer this component by its path, not by its component name
var CreateLeadPage = React.createClass({

    getInitialState: function () {
        return {
            emptyLead: {
                partyTypeId: 'PERSON',
                statusId: 'PARTY_ENABLED',
                parentPartyId: '120' /* this is added ad hoc */
                // I (Lucas) am thinking about this. How would a user or a worker know the party id of parent of a lead? That is a party id of a company/organization! 
            },
            dirty: false,
            addedLeadId: ''
        };
    },

    // Look at https://facebook.github.io/react/docs/component-specs.html for lifecycle functions
    
    componentDidMount: function () {
        // Event listener to fire when data retrieved-- 
        // when Store emits,informs this View something happened
        LeadsStore.addedLeadListener(this._onAddedLead);
    },
    
    componentWillUnmount: function() {
        this.setState({ dirty: false }); 
        // Avoids console error
        LeadsStore.removeListener('addedLead', this._onAddedLead);
    },
    
    
    // listener function
    _onAddedLead: function() {

        // ajax call does not return anything. Had to put the value in a variable, then RETRIEVE that variable later
        // This value can be no-permission, validation errors, or success-msg-that-is-the-party-id
        var result = LeadsStore.getAddedLead();

        // User lacks security permission to addLead
        if (result.hasOwnProperty('message')) {
            // still unsure about the error box.
            // Now I get it: error boxes, as well as this page, are children of controlPanel page
            this.props.updateErrorBox(result.message);
        }
        // User has permission, but there were one or more validation errors
        else if (Object.prototype.toString.call(result) === '[object Array]') {
            this.props.updateErrorBox(result);
        }
        // User had permission and no validation errors-- api should return the new partyId. 
        // Note:  the new partyId won't actually get rendered on this page, but I still want
        // it to reach here for diagnostic purposes and to really prove we closed the loop.
        else if (result.hasOwnProperty('partyId')) {
            // setState seems to be async
            this.setState({
                addedLeadId: result.partyId
            });
//            console.log('Success. New added lead id is ' + result.partyId /* addedLeadId wont work here */);
            // for successful post to database, redirect to MyLeadsPage
            this.props.router.replace('/cp/leads/my-leads');
        }
    },
    
    
    
    setLeadState: function(event) {
//        console.log('in set lead state');
        this.setState( { dirty: true } );
        var field = event.target.id;
        var value = event.target.value;
        this.state.emptyLead[ field ] = value;
//        console.log(this.state.emptyLead);
        this.setState( {emptyLead: this.state.emptyLead} );
    },
    
//    _addLead: function() {
//        this.setState({ dirty: false }); 
//        LeadsActions.addLead(this.state.emptyLead); 
//    },
    
    _addLead: function(event) {
        event.preventDefault(); // this line may do its job when not wrapping module.export with a router
        this.setState({ dirty: false }); 
        LeadsActions.addLead(this.state.emptyLead); 
    },

    
    render: function () {
        /* jshint ignore:start */
        return (
            <div>
                <div className="container" >
                    <div className="panel panel-default">
                        <div className="panel-heading panel-heading-custom">
                            <h2>Create Lead</h2>
                        </div>
                        <div className="panel-body">
                            <AddLeadForm lead={this.state.emptyLead} onChange={this.setLeadState} onFormSubmitBSV={this._addLead} />
                        </div>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

//module.exports = CreateLeadPage;
//See LoginPage, Header and CreateContactPage for more detail
module.exports = withRouter(CreateLeadPage);