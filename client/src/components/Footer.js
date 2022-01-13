import React, { useState } from "react";
import "../styles/footer.css";

const Footer = () => {
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(emailInput);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="company-description">
        <div className="company-description-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae
          turpis fringilla, mattis nisi at, dignissim quam. Morbi facilisis
          blandit euismod. Nulla porta imperdiet imperdiet. Quisque iaculis
          convallis erat eget tincidunt. Mauris viverra, massa id lobortis
          rutrum, orci eros pharetra mauris, vitae faucibus massa ante ac augue.
        </div>
        <div className="social-media-links">
          <span>
            <img
              src="https://travelappbucket.s3.amazonaws.com/imgs/facebook.svg"
              alt="Facebook"
            />
          </span>
          <span>
            <img
              src="https://travelappbucket.s3.amazonaws.com/imgs/instagram.svg"
              alt="Instagram"
            />
          </span>
          <span>
            <img
              src="https://travelappbucket.s3.amazonaws.com/imgs/twitter.svg"
              alt="Twitter"
            />
          </span>
          <span>
            <img
              src="https://travelappbucket.s3.amazonaws.com/imgs/youtube.svg"
              alt="YouTube"
            />
          </span>
        </div>
        <div className="newsletter-offer">
          Get exlusive deals, travel inspo, and expert tips and tricks straight
          to your inbox.
        </div>
        <form className="email-input" onSubmit={(event) => handleSubmit(event)}>
          <input
            type="email"
            name="emailInput"
            placeholder="Your email"
            value={emailInput}
            onChange={(event) => setEmailInput(event.target.value)}
          />
          <button>Sign Up Now</button>
        </form>
        <div className="copyright">
          {" "}
          &copy; {currentYear} Paradise Travel. All rights reserved.
        </div>
      </div>
      <div className="footer-links">
        <div className="company-links">
          <h2>Company</h2>
          <ul>
            <li>
              <div>About</div>
            </li>
            <li>
              <div>Locations</div>
            </li>
            <li>
              <div>Blog</div>
            </li>
            <li>
              <div>Careers</div>
            </li>
            <li>Contact</li>
            <li>
              <div>FAQ</div>
            </li>
            <li>
              <div>Press</div>
            </li>
          </ul>
        </div>
        <div className="destination-links">
          <h2>Destinations</h2>
          <ul>
            <li>
              <div>USA</div>
            </li>
            <li>
              <div>South America</div>
            </li>
            <li>
              <div>Central America</div>
            </li>
            <li>
              <div>Europe</div>
            </li>
            <li>
              <div>Asia</div>
            </li>
            <li>
              <div>Africa</div>
            </li>
            <li>
              <div>Middle East</div>
            </li>
            <li>
              <div>Oceania</div>
            </li>
            <li>
              <div>Antarctica</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
