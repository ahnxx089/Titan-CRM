/////////////////////////////////////////////////
// Lead Details component.
//
// @file:   LeadDetailPage.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

var React = require('react');
var Link = require('react-router').Link;
var withRouter = require('react-router').withRouter;

var LeadsActions = require('../../../actions/LeadsActions');
var LeadsStore = require('../../../stores/LeadsStore');
var ContactMechEntry = require('../../common/ContactMechRow');
var CommonStore = require('../../../stores/CommonStore');

const timezoneOffset = new Date().getTimezoneOffset(); // 300 in CDT

var LeadDetailPage = React.createClass({
    getInitialState: function () {
        return {
            leadId: this.props.params.id,
            leadDetails: {},
            types: [],
            purposeTypes: []
        };
    },
    
    componentDidMount: function () {
        // Event listener to fire when data retrieved-- 
        // when Store emits,informs this View something happened
        LeadsStore.addGetDataListener(this._onGetOneLead);
        // Call the async function to get my leads
        LeadsActions.getLeadById(this.state.leadId);
        
        //get types and purpose types crossref table
        CommonStore.addGetContactMechTypesListener(this._onGetTypes);
        CommonStore.getContactMechTypes();
        CommonStore.addGetContactMechPurposeTypesListener(this._onGetPurposeTypes);
        CommonStore.getContactMechPurposeTypes();
    },

    componentWillUnmount: function() {
        // Avoids console error
        LeadsStore.removeListener('getData', this._onGetOneLead);
        CommonStore.removeListener('getContactMechTypes', this._onGetTypes);
        CommonStore.removeListener('getContactMechPurposeTypes', this._onGetPurposeTypes);
    },
    
//    _getLeadDetails: function() {
//        var leadId = this.state.leadId;
//        LeadsActions.getLeadById(leadId);
//    },
    
    // Listener to Store's getDate event. Once received, re-render
    // No need to check validation or update error box
    _onGetOneLead: function() {
        var result = LeadsStore.getLeadFound();
        this.setState({
            leadDetails: result
        });
    },
    
    _onGetTypes: function (event) {
        this.setState({
            types: CommonStore.getTypeArray()
        });
    },
    _onGetPurposeTypes: function (event) {
        this.setState({
            purposeTypes: CommonStore.getPurposeTypeArray()
        });
    },
    
    render: function() {
        /* jshint ignore:start */
        
//        console.log("location is " + window.location); // something hard to use
//        var allProps = this.props;
        var leadDetails = this.state.leadDetails;
        
        // TODO: re-modify this time in LeadsStore when first GET them
        // DONT forget line updated_at time
        var alreadyChanged = leadDetails.createdDate;
        var originalInLocal = new Date(alreadyChanged); // Date Object
        originalInLocal.setMinutes(originalInLocal.getMinutes() - timezoneOffset);
        
        var contactMechs = leadDetails.partyContactMechs || [];
//        console.log(leadDetails.partyContactMechs);
//        console.log(contactMechs.length + "contactMechs.length");
        var contactMechsJSX = [];
        for (var i = 0; i < contactMechs.length; i++) {
            contactMechsJSX.push(<ContactMechEntry key={ 'contact_mech_' + i } contactMech={ contactMechs[i]} types={this.state.types} purposeTypes={this.state.purposeTypes} />);
        }
//        console.log(contactMechsJSX.length);

        // The reason it renders differently from ContactDetailPage's render (load empty types and purposeTypes array), 
        // is the difference between getXById in contactController and leadController
        return (
            <div>
                <Link to="/cp/leads/my-leads" className="btn btn-primary">
                    <span className="fa fa-arrow-left"></span> Back
                </Link>
                
                <div className="panel panel-default">
                    <div className="panel-heading panel-heading-custom">
                            <h1>View Lead</h1>
                    </div>

                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Lead</h3>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Party Id</span>&nbsp;
                                    { leadDetails.partyId }
                                </div>
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Party Type (Role) </span>&nbsp;
                                    { leadDetails.partyTypeId } ({ leadDetails.roleTypeId })
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">First Name</span>&nbsp;
                                    { leadDetails.salutation ? leadDetails.salutation + ' ' : ' ' }
                                    { leadDetails.firstName + ' ' }
                                    { leadDetails.middleName ? leadDetails.middleName + ' ' : ' ' }

                                </div>
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Last Name</span>&nbsp;
                                    { leadDetails.lastName }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Created By</span>&nbsp;
                                    { leadDetails.createdBy }
                                </div>

                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Status</span>&nbsp;
                                    { leadDetails.statusId }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-lg-12">
                                    <span className="label label-default">Description of this lead</span>&nbsp;
                                    { leadDetails.description }
                                </div>
                                <br/><hr/>
                            </div>


                            <div className="row">
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Created Date</span>&nbsp;
                                    {/* originalInLocal.toString() */}
                                    { leadDetails.createdDate }
                                    {/* new Date(new Date(leadDetails.createdDate).setMinutes(new Date(leadDetails.createdDate).getMinutes() - 300)).toString() */}
                                </div>
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Updated Date (?)</span>&nbsp;
                                    { leadDetails.createdDate }
                                    {/* originalInLocal.toString() */}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Currency</span>&nbsp;
                                    { leadDetails.preferredCurrencyUomId }
                                </div>
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Birthday</span>&nbsp;
                                    { leadDetails.birthDate }
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xs-12 col-lg-12">
                                    <span className="label label-default">Comments about this person</span>&nbsp;
                                    { leadDetails.comments }
                                </div>
                                <br/><hr/>
                            </div>


                            <div className="row">
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Company (ID)</span>&nbsp;
                                    { leadDetails.companyName } ({ leadDetails.parentPartyId })
                                </div>
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Annual Revenue</span>&nbsp;
                                    { leadDetails.annualRevenue }
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Ticker Symbol</span>&nbsp;
                                    { leadDetails.tickerSymbol }
                                </div>
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Num of Employees</span>&nbsp;
                                    { leadDetails.numEmployees }
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Industry</span>&nbsp;
                                    { leadDetails.industryEnumId }
                                </div>
                                <div className="col-xs-12 col-lg-6">
                                    <span className="label label-default">Ownership</span>&nbsp;
                                    { leadDetails.ownershipEnumId }
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xs-12 col-lg-12">
                                    <span className="label label-default">Important notes about company</span>&nbsp;
                                    { leadDetails.importantNote }
                                </div>
                                <br/>
                            </div>
                        </div> {/* End of panel-body */}
                    </div> {/* End of panel-info */}

                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Contact Information</h3>
                        </div>
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
                    </div>

                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Accounts</h3>
                        </div>
                        <table id="AccountsTable" className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Account Name</th>
                                    <th>Site Name</th>
                                    <th>Parent ID</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">Cases</h3>
                        </div>
                        <table id="contactsTable" className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>???</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div> {/* End of panel-info for the last table */}

                </div> {/* End of panel-default */}
            </div>
        );
        /* jshint ignore:end */
    }
});

// Added withRouter so that the button could work
module.exports = withRouter(LeadDetailPage);