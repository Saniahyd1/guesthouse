"use client";
import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer">

        <div className="footer-container">
          
          <div className="footer-section">
            <h3>Location</h3>
            <p>
              Hill Street Service Apartment, <br />Lane opposite TV9,<br/>
              Road No. 3, Venkateshwara Nagar,<br/> Aurora Colony,<br />
              Banjara Hills, Hyderabad, Telangana 500034, INDIA
            </p>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p className="contact">
              Email: wellness.gardenia@gmail.com<br />
              Phone: <a href="tel:9985969666">9985969666</a> / <a href="tel:040-31727920">040-31727920</a>
            </p>
          </div>

          <div className="footer-section">
            <h3>About</h3>
            <p className="about">Hill Street Service Apartment</p>
            <p>
              A service apartment designed to make every guest feel at home, with comfort and care.
            </p>
          </div>

        </div>
     <p className="footer-bottom">
  © 2026 Hill Street — All Rights Reserved<br />
  Created and managed by Sania Sultana | Contact:{" "}
  <a href="tel:+919515120036">+919515120036</a>
</p>
      </div>
      </footer>
);
}
