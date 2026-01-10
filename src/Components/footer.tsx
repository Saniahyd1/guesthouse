"use client";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Address Card */}
        <div className="footer-card">
          <h3>Address</h3>
          <p>
            <b>Hill Street Service Apartment</b><br />
            Lane Opposite TV9,<br />
            Road No. 3, Venkateshwara Nagar,<br />
            Aurora Colony,Banjara Hills,<br />
            Hyderabad, Telangana – 500034, <br />INDIA
          </p>
        </div>

        {/* Contact Card */}
        <div className="footer-card">
          <h3>Contact Us</h3>
          <p>
            Phone:<br />
            <a href="tel:+919985969666">+91 99859 69666</a><br />
            <a href="tel:04031727920">040-31727920</a><br /><br />
            Email: wellness.gardenia@gmail.com<br /><br />
            
          </p>
        </div>

        {/* About Card */}
        <div className="footer-card">
          <h3>About Us</h3>
          <p>
            Hill Street Service Apartment is designed to make every guest
            feel at home, offering comfort, convenience, and care.
          </p>
        </div>

      </div>

      <p className="footer-bottom">
        © 2026 Hill Street — All Rights Reserved<br />
        Created and managed by <a href="https://portfolio-lake-tau-50.vercel.app/">Sania Sultana</a> | 
        <a href="mailto:saniahyd1@gmail.com"> saniahyd1@gmail.com</a>
      </p>
    </footer>
  );
}
