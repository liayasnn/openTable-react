import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactUs.scss";

export const ContactUs = () => {
  const form = useRef();
  const [hasOrderIssue, setHasOrderIssue] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const orderIdValue = hasOrderIssue
      ? form.current.order_id.value
      : "Not provided";

    emailjs
      .sendForm("service_et8i5r8", "template_kp55gy7", form.current, {
        publicKey: "iNRwm2G2DUvMK2Oxk",
        order_id: orderIdValue,
      })
      .then(
        () => {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 5000);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="contact-us">
      <h2 className="contact-us__title">Contact Us</h2>
      <p className="contact-us__description">
        Have any questions or concerns? We&apos;re here to help! Fill out the
        form below, and we&apos;ll get back to you as soon as possible.
      </p>
      <form ref={form} onSubmit={sendEmail} className="contact-us__form">
        <div className="contact-us__form-group">
          <label className="contact-us__form__label">Name</label>
          <input
            type="text"
            name="user_name"
            className="contact-us__form__input"
            required
          />
        </div>
        <div className="contact-us__form-group">
          <label className="contact-us__form__label">Email</label>
          <input
            type="email"
            name="user_email"
            className="contact-us__form__input"
            required
          />
        </div>
        <div className="contact-us__form-group">
          <label className="contact-us__form__label">Subject</label>
          <input
            type="text"
            name="subject"
            className="contact-us__form__input"
            required
          />
        </div>
        <div className="contact-us__form-group">
          <label className="contact-us__form__label">Message</label>
          <textarea
            name="message"
            className="contact-us__form__textarea"
            required
          />
        </div>

        <div className="contact-us__form-group">
          <label className="contact-us__form__label">
            <input
              type="checkbox"
              checked={hasOrderIssue}
              onChange={(e) => setHasOrderIssue(e.target.checked)}
              className="contact-us__form__checkbox"
            />
            I have an issue with an order
          </label>
        </div>

        {hasOrderIssue && (
          <div className="contact-us__form-group">
            <label className="contact-us__form__label">Order ID</label>
            <input
              type="text"
              name="order_id"
              className="contact-us__form__input"
              placeholder="Enter your order ID"
            />
          </div>
        )}

        <input
          type="submit"
          value="Send"
          className="contact-us__form__submit-button"
        />
      </form>

      {showSuccess && (
        <div className="contact-us__success-popup">
          Your message has been sent successfully!
        </div>
      )}
    </div>
  );
};

export default ContactUs;
