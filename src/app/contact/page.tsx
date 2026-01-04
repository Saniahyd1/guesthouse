"use client";

import { useEffect, useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/footer";
import "./Page.css";

export default function ContactPage() {
  const [copiedText, setCopiedText] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  setCopiedText(text);

  // Clear message after 2 seconds
  setTimeout(() => setCopiedText(""), 2000);
};

  return (
    <>
      <Navbar />

      <main className="themain" style={{ padding: "80px 20px" }}>
        <div className="contact-section">
          <h1>
            <i>
              <b>Contact Us</b>
            </i>
          </h1>

          <div className="cards">
            <div
              className="card"
              onClick={() => copyToClipboard("9848495689")}
              style={{ cursor: "pointer" }}
            >
              <img src="phone-call.png" alt="Phone" />
              <p>9985969666<br/></p>
            </div>

            <div
              className="card"
              onClick={() => copyToClipboard("9985969666")}
              style={{ cursor: "pointer" }}
            >
              <img src="whatsapp.png" alt="WhatsApp" />
              <p>9985969666</p>
            </div>

            <div
              className="card"
              onClick={() =>
                copyToClipboard("wellness.gardenia@gmail.com")
              }
              style={{ cursor: "pointer" }}
            >
              <img src="email.png" alt="Email" />
              <p>wellness.gardenia@gmail.com</p>
            </div>
          </div>

          {copiedText && (
            <p
              style={{
                marginTop: "15px",
                color: "green",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              ✅ Copied: {copiedText}
            </p>
          )}
        </div>

        <div className="ReveiwSection">
          <div
            className="elfsight-app-db8148c4-d196-463c-be34-ffea461e3f77"
            data-elfsight-app-lazy
          ></div>
        </div>
      </main>

      <Footer />
    </>
  );
}
