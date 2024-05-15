import { useForm, ValidationError } from '@formspree/react';
import './contactUs.css';
import HomeFooter from "./reusable-components/HomeFooter";
import HomeHeader from "./reusable-components/HomeHeader";

export default function ContactUs() {
  const [state, handleSubmit] = useForm("xayrklln");
  if (state.succeeded) {
      return <p>Thanks for Reaching Out! We will get back to you shortly.</p>;
  }
  return (
      <div className="home">
        <HomeHeader />
        <h1>Help Desk</h1>
        <p>We would love to hear from you.</p>
          <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email" 
            name="email"
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
          />
          <textarea
            id="message"
            name="message"
          />
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
          />
          <button type="submit" disabled={state.submitting}>
            Submit
          </button>
        </form>
        <HomeFooter />
      </div>
  );
}