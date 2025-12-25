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
              Hill Street Service Apartment Near Gvk One Mall,<br />
              54, Venkateshwara Nagar, Aurora Colony,<br />
              Banjara Hills, Hyderabad, Telangana 500034, INDIA
            </p>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p className="contact">
              Email: wellness.gardenia@gmail.com<br />
              Phone: 9985969666
            </p>
          </div>

          <div className="footer-section">
            <h3>About</h3>
            <p className="about">Hill Street Service Apartment</p>
            <p>
              A guest house designed to make every guest feel at home with comfort and care.
            </p>
          </div>

        </div>

        <p className="footer-bottom">© 2025 Hill Street — All Rights Reserved</p>
      </div>
    </footer>
  );
}
