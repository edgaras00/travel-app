import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const Footer = () => {
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailInput("");
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
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://travelappbucket.s3.amazonaws.com/imgs/facebook.svg"
              alt="Facebook"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://travelappbucket.s3.amazonaws.com/imgs/instagram.svg"
              alt="Instagram"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://travelappbucket.s3.amazonaws.com/imgs/twitter.svg"
              alt="Twitter"
            />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://travelappbucket.s3.amazonaws.com/imgs/youtube.svg"
              alt="YouTube"
            />
          </a>
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
              <Link to="/" className="company-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="company-link">
                Locations
              </Link>
            </li>
            <li>
              <Link to="/" className="company-link">
                Blog
              </Link>
            </li>

            <li>
              <Link to="/" className="company-link">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/" className="company-link">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/" className="company-link">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/" className="company-link">
                Press
              </Link>
            </li>
          </ul>
        </div>
        <div className="destination-links">
          <h2>Destinations</h2>
          <ul>
            <li>
              <Link to="/destinations/usa" className="company-link">
                USA
              </Link>
            </li>
            <li>
              <Link to="/destinations/south-america" className="company-link">
                South America
              </Link>
            </li>
            <li>
              <Link to="/destinations/central-america" className="company-link">
                Central America
              </Link>
            </li>
            <li>
              <Link to="/destinations/europe" className="company-link">
                Europe
              </Link>
            </li>
            <li>
              <Link to="/destinations/asia" className="company-link">
                Asia
              </Link>
            </li>
            <li>
              <Link to="/destinations/africa" className="company-link">
                Africa
              </Link>
            </li>
            <li>
              <Link to="/destinations/middle-east" className="company-link">
                Middle East
              </Link>
            </li>
            <li>
              <Link to="/destinations/oceania" className="company-link">
                Oceania
              </Link>
            </li>
            <li>
              <Link to="/destinations/antarctica" className="company-link">
                Antarctica
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
