/////////////////////////////////////////////////
// About page component.
//
// @file:   AboutPage.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var React = require('react');

var AboutPage = React.createClass({
    render: function() {
        /* jshint ignore:start */
        return (
            <div className="team">
                <div className="page-header">
                    <h1>Team Titan</h1>
                </div>
                <div className="row well">
                    <div className="col-xs-2 col-lg-2 text-center">
                        <img src='img/Dinesh_avatar_200x200.jpg' alt='' />
                    </div>
                    <div className="col-xs-10 col-lg-10">
                        <h3>Dinesh Shenoy</h3>
                        <p>
                            I earned my PhD in Astrophysics at the University of Minnesota by developing custom Python scripts and modules to analyze mass-loss from hypergiant stars.  Now I use my analytical skills to create enterprise-level applications with a focus on just-in-time development.
                        </p>
                    </div>
                </div>
                <div className="row well">
                    <div className="col-xs-2 col-lg-2 text-center">
                        <img src='img/DukJin_image.jpg' alt='' />
                    </div>
                    <div className="col-xs-10 col-lg-10">
                        <h3>DukJin Ahn</h3>
                        <p>
                            DukJin earned his Bachelor degree in Computer Science from the University of Minnesota.
                        </p>
                    </div>
                </div>
                <div className="row well">
                    <div className="col-xs-2 col-lg-2 text-center">
                        <img src='img/Eric_picture.jpg' alt='' />
                    </div>
                    <div className="col-xs-10 col-lg-10">
                        <h3>Eric Brichetto</h3>
                        <p>
                            Eric earned his Bachelor degree in Physics from St. Olaf College in Northfield, MN.
                        </p>
                    </div>
                </div>
                <div className="row well">
                    <div className="col-xs-2 col-lg-2 text-center">
                        <img src='img/Lucas_avatar_200x200.jpg' alt='' />
                    </div>
                    <div className="col-xs-10 col-lg-10">
                        <h3>Xiaosiqi "Lucas" Yang</h3>
                        <p>
                            I recently graduated from University of Minnesota with a Master's Degree in Computer Science.
                            I was in the spatial Database research group, and did my graduation project on spatial data clustering and prediction in agricultural crop yield. I worked as TA before. <br/>
                            My previous work experience mostly lies in Web Developing (full stack) and Android Developing (in both academy and industry). I love programming and seeing people use tools I built.
                        </p>
                    </div>
                </div>
                <div className="row well">
                    <div className="col-xs-2 col-lg-2 text-center">
                        <img src='img/Bill_avatar_200x200.JPG' alt='' />
                    </div>
                    <div className="col-xs-10 col-lg-10">
                        <h3>William "Bill" Berg</h3>
                        <p>
                            Bill earned his Bachelor degree in Computer Science from the University of Minnesota.
                        </p>
                    </div>
                </div>
                <h3>Also featuring</h3>
                <div className="row well">
                    <div className="col-xs-2 col-lg-2 text-center">
                        <img src='img/anurag_image.jpg' alt='' />
                    </div>
                    <div className="col-xs-10 col-lg-10">
                        <h3>Anurag Bhandari</h3>
                        <p>
                            Anurag has extensive programming and research & development experience with Accenture. With a passion for data analytics and software development, he has worked on a wide variety of cutting edge technologies. Anurag founded India’s very own Linux distro, Granular and has actively contributed to several open-source projects such as OpenMandriva. He has presented many technical talks at top forums including FOSDEM, Brussels. Anurag holds a Bachelor of Technology in Computer Science from National Institute of Technology.
                        </p>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = AboutPage;