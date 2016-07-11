/////////////////////////////////////////////////
// A party contact info div on Add Lead page.
// Not used. Use Dinesh's AddContactMech instead. 
//
// @file:   PartyContactDiv.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

var React = require('react');

var PartyContactDiv = React.createClass({
    // changed class to className, noon June 16
    // changed input type of three contact mechs to tel, url, email.
    // But React doesn't seem to support them. Will find out.
    // Tel is only supported by Safari browser. 
    render: function () {
        /* jshint ignore:start */
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12">
                        <h2>Basic Info [PARTY CONTACT]</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="postalAddress">Postal Address</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-envelope" aria-hidden="true"></i></div>
                                <input type="text" className="form-control" id="postalAddress" placeholder="Type your postal address" />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="telecomNumber">Telecom Number</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-phone" aria-hidden="true"></i></div>
                                <input className="form-control" id="telecomNumber" type="tel" placeholder="Type your telecom number" />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="emailAddress">Email</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-envelope-o" aria-hidden="true"></i></div>
                                <input type="email" className="form-control" id="emailAddress" placeholder="Type your email address" />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="webAddress">Website</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-internet-explorer" aria-hidden="true"></i></div>
                                <input type="url" className="form-control" id="webAddress" placeholder="Type your web address" />
                            </div>
                        </div>
                    </div>
                </div>


                <br/><hr/>

                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="countryCode">Country Code</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-globe" aria-hidden="true"></i></div>
                                <select id="countryCode" className="form-control">
                                    <option disabled selected> -- select an option -- </option>
                                    <option value="Afghanstan">Afghanstan</option>
                                    <option value="China">China</option>
                                    <option value="Finland">Finland</option>
                                    <option value="India">India</option>
                                    <option value="USA">US of America</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="areaCode">Area Code</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                <input className="form-control" id="areaCode" type="text"/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="contactNum">Contact Number</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                <input type="text" className="form-control" id="contactNum"/>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="askForName">Ask for name</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                <input className="form-control" id="askForName" type="text"/>
                            </div>
                        </div>
                    </div>
                </div>


                <br/><hr/>

                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="toName">To Name</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                <input type="text" className="form-control" id="toName"/>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="attnName">Attn Name</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                <input type="text" className="form-control" id="attnName"/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="address1">Address, Line 1</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                <input type="text" className="form-control" id="address1"/>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="address2">Address, Line 2</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                <input type="text" className="form-control" id="address2"/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="directions">Directions</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-location-arrow" aria-hidden="true"></i></div>
                                <input type="text" className="form-control" id="directions"/>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="city">City</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                <input type="text" className="form-control" id="city"/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="zipPostalCode">Zip code, or postal code</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                <input type="text" className="form-control" id="zipPostalCode"/>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-xs-12">
                        <div className="form-group">
                            <label for="stateProvinceGeoId">State geo id, or province geo id</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                                <input type="text" className="form-control" id="stateProvinceGeoId"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
        /* jshint ignore:end */
    }

});

// It is not okay to use double slash // for comments within the render function, 
// at least not after its return statement, OR at least not with HTML tags
// No             <!-- BASIC PERSON INFO heading -->             style comments either.
module.exports = PartyContactDiv;