"use client";
import { useState } from "react";
import "./Navbar.css";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Hill Street Service Apartment</div>

      <div className={`nav-links ${open ? "open" : ""}`}>
        <Link href="/">Home</Link>

        <Link href="/booking">Booking</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <div className="hamburger" onClick={() => setOpen(!open)}>
        <span className={`bar ${open ? "open" : ""}`}></span>
        <span className={`bar ${open ? "open" : ""}`}></span>
        <span className={`bar ${open ? "open" : ""}`}></span>
      </div>
    </nav>
  );
}


