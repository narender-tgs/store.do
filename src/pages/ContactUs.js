import GoogleMapReact from 'google-map-react';
import { Helmet } from 'react-helmet';
// import ALink from "../../components/common/ALink";
// import Card from "../../components/features/accordion/card.jsx";
// import Accordion from "../../components/features/accordion/accordion.jsx";
import Accordion from '../components/features/accordion/accordion';
import Card from '../components/features/accordion/card';

const AnyReactComponent = () => <div></div>;

export default function ContactUs() {
    return (
        <main className="main">
             <Helmet>
        <title>Contact Us - Store.Do</title>
        <meta name="description" content="Contact us today for more information or to get started with our services." />
        <meta name="keywords" content="contact, customer support, helpdesk" />
      </Helmet>
            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            {/* <ALink href="/"><i className="icon-home"></i></ALink> */}
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Contact Us
                        </li>
                    </ol>
                </div>
            </nav>

            {/* <div id="map">
                <GoogleMapReact
                    bootstrapURLKeys={ { key: 'your-api-key' } }
                    defaultCenter={ { lat: 59.95, lng: 30.33 } }
                    defaultZoom={ 11 }
                >
                    <AnyReactComponent
                        lat={ 59.955413 }
                        lng={ 30.337844 }
                    />
                </GoogleMapReact>
            </div> */}

            <div className="container contact-us-container">
                <div className="contact-info">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="ls-n-25 m-b-1">
                                Contact Info
                            </h2>

                            <p>

                                You can directly contact us , at

                                Shopaholic Emporium is located at 123 Main Street, Suite 101, Cityville, State. You can reach us at (555) 123-4567 or via email at info@shopaholicemporium.com.

                                Trendy Threads Co. can be found at 456 Fashion Avenue, Unit B, Trendytown, State. Contact us at (555) 987-6543 or email support@trendythreadsco.com.

                                Chic Boutique's address is 789 Style Boulevard, Chicville, State. Feel free to call us at (555) 456-7890 or email hello@chicboutique.com.
                            </p>
                        </div>

                        <div className="col-sm-6 col-lg-3">
                            <div className="feature-box text-center">
                                <i className="sicon-location-pin"></i>
                                <div className="feature-box-content">
                                    <h3>Address</h3>
                                    <h5>123 Wall Street, New York / NY</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="feature-box text-center">
                                <i className="fa fa-mobile-alt"></i>
                                <div className="feature-box-content">
                                    <h3>Phone Number</h3>
                                    <h5>(800) 123-4567</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="feature-box text-center">
                                <i className="far fa-envelope"></i>
                                <div className="feature-box-content">
                                    <h3>E-mail Address</h3>
                                    <h5>porto@portotheme.com</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="feature-box text-center">
                                <i className="far fa-calendar-alt"></i>
                                <div className="feature-box-content">
                                    <h3>Working Days/Hours</h3>
                                    <h5>Mon - Sun / 9:00AM - 8:00PM</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <h2 className="mt-6 mb-2">Send Us a Message</h2>

                        <form className="mb-0" action="#">
                            <div className="form-group">
                                <label className="mb-1" htmlFor="contact-name">Your Name <span className="required">*</span></label>
                                <input type="text" className="form-control" id="contact-name" name="contact-name"
                                    required />
                            </div>

                            <div className="form-group">
                                <label className="mb-1" htmlFor="contact-email">Your E-mail	<span className="required">*</span></label>
                                <input type="email" className="form-control" id="contact-email" name="contact-email"
                                    required />
                            </div>

                            <div className="form-group">
                                <label className="mb-1" htmlFor="contact-message">Your Message <span className="required">*</span></label>
                                <textarea cols="30" rows="1" id="contact-message" className="form-control"
                                    name="contact-message" required></textarea>
                            </div>

                            <div className="form-footer mb-0">
                                <button type="submit" className="btn btn-dark font-weight-normal">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="col-lg-6">
                        <h2 className="mt-6 mb-1">Frequently Asked Questions</h2>
                        <div id="accordion">
                            <Accordion adClass="accordion-simple">
                                <Card title="How will I detect fraudulent emails/calls seeking sensitive personal and confidential information?" adClass="card-accordion">
                                    <p>
                                        If you receive an e-mail, a call from a person/association claiming to be from Store.Do seeking sensitive confidential
                                        information like debit/credit card PIN, net-banking or mobile banking password, we request you to never provide such
                                        confidential and personal data. We at Store.Do or our affiliate logistics partner never ask for such confidential and personal data. If you have already revealed such information, report it immediately to an appropriate law enforcement agency.
                                        Here are a couple of baits fraudsters often use to cheat consumers:
                                        Congratulations! You have been nominated as a ‘Top Store.Do customer’ and are now eligible for a luxury gift item.
                                        Please share your proof of address and your debit/credit card details to avail this great offer.
                                        Hi, I’m calling from Store.Do. We are happy to let you know that you have won an exclusive lucky draw coupon of
                                        Rs. 5000 on your latest purchase. Please share your credit/debit card number so we can credit the money directly
                                        into your bank account.
                                    </p>
                                </Card>

                                <Card title="Why will 'My Cashback' not be available on Store.Do?" adClass="card-accordion">
                                    <p>To make your shopping experience easier and simpler, 'My Cashback' will be replaced by PhonePe. PhonePe wallet can be used on Store.Do and other PhonePe partners. To use your PhonePe balance, you will have to activate/verify your PhonePe account
                                    </p>
                                </Card>

                                <Card title="How do I cancel the order, I have placed?" adClass="card-accordion">
                                    <p>Order can be canceled till the same is out for delivery. Note: This may not be applicable for certain logistics partner.
                                        You would see an option to cancel within 'My Orders' section under the main menu of your App/Website/M-site then select
                                        the item or order you want to cancel. In case you are unable to cancel the order from'My Orders' section, you can
                                        refuse it at the time of delivery and refund will be processed into the source account, if order amount was paid online.
                                    </p>
                                </Card>

                                <Card title="How do I create a Return Request?" adClass="card-accordion">
                                    <p>To make your shopping experience easier and simpler, 'My Cashback' will be replaced by PhonePe. PhonePe wallet can be used on Store.Do and other PhonePe partners. To use your PhonePe balance, you will have to activate/verify your PhonePe account
                                    </p>
                                </Card>

                                <Card title="I have created a Return request. When will I get the refund?" adClass="card-accordion">
                                    <p>Refund will be initiated upon successful pickup as per the Returns Policy. The refund amount is expected to reflect in the customer account within the following timelines:


                                        NEFT - 1 to 3 business days post refund initiation
                                        Store.Do Credit - Instant
                                        Online Refund – 7 to 10 days post refund initiation, depending on your bank partner
                                        “PhonePe wallet” – Instant

                                        Note: You can maintain up to five bank accounts for NEFT/IMPS refunds and a single bank account can be linked upto five Store.Do accounts. If you wish to add a new bank account over and above, please delete an existing bank account.
                                    </p>
                                </Card>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8"></div>
        </main>
    )
}