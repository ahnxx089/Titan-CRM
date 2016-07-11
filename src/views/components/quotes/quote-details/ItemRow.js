/////////////////////////////////////////////////
// Item Row-- child of Quote Panel Body
//
// @file:   ItemRow.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var UpdateItemForm = require('./UpdateItemForm');

var ItemRow = React.createClass({

    getInitialState: function () {
        return {
            acNum: 'accordion_'+this.props.quoteItem.quoteItemSeqId
        };
    },

    componentDidMount: function(){

        // jQuery-UI accordion for UpdateItem panel
        //$('#accordionForUpdate').accordion({
        $('#'+this.state.acNum).accordion({
            active: false,
            collapsible: true
        });
    },

    render: function () {

        // for displaying UT Estimated Delivery Date more readably & deal with null case
        var estimatedDeliveryDate = this.props.quoteItem.estimatedDeliveryDate;
        estimatedDeliveryDate = (estimatedDeliveryDate === null ? '(none)' : new Date(estimatedDeliveryDate).toDateString() );

        /* jshint ignore:start */
        return (

            <div className="row">
                <div className="col-lg-12">
                    <div className="panel panel-info">
                        <div className="panel-heading"><h3>Item #{ this.props.quoteItem.quoteItemSeqId }</h3></div>

                        <div className="panel-body">
                            {/* 2 rows of Item information */}
                                <div className="row">
                                    <div className="col-lg-3 col-xs-6">
                                        <p className="text-right"><strong>Product Id:</strong></p>
                                    </div>
                                    <div className="col-lg-3 col-xs-6">
                                        <p className="text-left">{ this.props.quoteItem.productId }</p>
                                    </div>
                                    <div className="col-lg-3 col-xs-6">
                                        <p className="text-right"><strong>Comments:</strong></p>
                                    </div>
                                    <div className="col-lg-3 col-xs-6">
                                        <p className="text-left">{ this.props.quoteItem.comments }</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-xs-6">
                                        <p className="text-right"><strong>Estimated Delivery Date:</strong></p>
                                    </div>
                                    <div className="col-lg-3 col-xs-6">
                                        <p className="text-left">{ estimatedDeliveryDate }</p>
                                    </div>
                                    <div className="col-lg-3 col-xs-6">
                                        <p className="text-right"><strong>Description:</strong></p>
                                    </div>
                                    <div className="col-lg-3 col-xs-6">
                                        <p className="text-left">{ this.props.quoteItem.description }</p>
                                    </div>
                                </div>
                            {/* Row for Update Item accordion */}
                                <div className="row">
                                    <div className="col-lg-12 col-xs-12">
                                        <div id={ this.state.acNum }>
                                            <h3>
                                                <a className="btn btn-default">
                                                    <span className="fa fa-pencil-square-o"></span>Update Item
                                                </a>
                                            </h3>
                                            <div>
                                                <UpdateItemForm key={ this.state.acNum } quoteItem={ this.props.quoteItem } />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>


        );
        /* jshint ignore:end */
    }
});

module.exports = ItemRow;