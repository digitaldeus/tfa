import React from 'react'

export default React.createClass({
  render: function () {
    return (
      <div>
        <div className='landing-contact'>
          <div className='hero-container'>
            <h2 className='text-center'>
              Have a Question?Let us Help!
            </h2>
          </div>
          <div className='container container-overlay'>
            <div className='row'>
              <div className='small-12'>
                <p className='text-center'>
                  Taking the first steps into any new technology can be daunting and
                  we want to help make your transition smooth and stress free.Send us a
                  message with your questions or concerns and we will be sure to respond
                  promptly.
                  <br />
                  <br />
                  Please fill out the form below.
                </p>
                <form data-abide=" " className="new_customer_contact" id="new_customer_contact" action="/contact_us" accept-charset="UTF-8" method="post">
                  <div className='row' style={{ marginTop: "4rem" }}>
                    <div className='small-12 medium-6 column text-center medium-text-left'>
                      <input placeholder="First name*" required="required" type="text" name="customer_contact[first_name]" id="customer_contact_first_name" />
                      <span className='form-error'>
                        First name is required
                      </span>
                    </div>
                    <div className='small-12 medium-6 column text-center medium-text-left'>
                      <input placeholder="Last name*" required="required" type="text" name="customer_contact[last_name]" id="customer_contact_last_name" />
                      <span className='form-error'>
                        Last name is required
                      </span>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='small-12 medium-6 column text-center medium-text-left'>
                      <input placeholder="Email*" required="required" type="email" name="customer_contact[email]" id="customer_contact_email" />
                      <span className='form-error'>
                        Email is required
                      </span>
                    </div>
                    <div className='small-12 medium-6 column text-center medium-text-left'>
                      <input placeholder="Phone number" type="tel" name="customer_contact[phone]" id="customer_contact_phone" />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='small-12 column text-center medium-text-left'>
                      <textarea placeholder="Type message here..." rows="8" name="customer_contact[details]" id="customer_contact_details">
                      </textarea>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='small-12 column text-center medium-text-right'>
                      <button name="button" type="submit" value="submit">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='row align-center' style={{ marginTop: "4rem" }}>
              <div className='columns small-12 large-3 text-center large-text-left'>
                <p className='title'>
                  SAN FRANCISCO
                </p>
                <p>
                  288 Athens Street
                  <br />
                  San Francisco, CA 94112
                </p>
              </div>
              <div className='columns small-12 large-3 text-center large-text-left'>
                <p className='title'>
                  OAKLAND
                </p>
                <p>
                  1466 36th Ave
                  <br />
                  Oakland, CA 94601
                </p>
              </div>
              <div className='columns small-12 large-3 text-center large-text-left'>
                <p className='title'>
                  PRESS &amp; PUBLIC RELATIONS
                </p>
                <p>
                  <span style={{ fontSize: "0.9rem" }}>TELEPHONE</span>
                  <br />
                  <a className='dark_text' color='#969695' href='tel:14157452347'>
                    (415) 745-2347
                  </a>
                </p>
                <p>
                  <span style={{ fontSize: "0.8rem" }}>EMAIL</span>
                  info @thefellowshipapp.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
});