"use client";

import Navbar from "@/Components/Navbar";
import "./page.css";
import { useState } from "react";
import Footer from "@/Components/footer";
import { useRouter } from "next/navigation";




  export default function Booking() {
  const router = useRouter();
const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  guests: "",
  rooms: "",
  roomType: "single",
  checkin: "",
  checkout: "",
});
const today = new Date().toISOString().split("T")[0];

const getNextDay = (date: string): string => {
  if (!date) return "";
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};


const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const payload = {
      ...formData,
      guests: Number(formData.guests),
      rooms: Number(formData.rooms),
    };

    const res = await fetch("/api/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Server error");
      return;
    }

    const data = await res.json();

    if (data.success) router.push("/thank-you");
    else alert(data.error || "Reservation failed");

  } catch (err) {
    alert("Error: " + err);
  }
};

    return (
  <>
    <Navbar />
    <main style={{ padding: "80px 20px" }}>
      <i><b><h1>Ready to Book Your Stay?</h1></b></i>

      <form onSubmit={handleSubmit} className="booking-form" style={{ display: "flex", gap: "40px" }}>
        {/* Left Column */}
        <div className="left-column" style={{ flex: 1 }}>
          <input type="text" name="name" value={formData.name}
  onChange={handleChange} placeholder="  Enter your name" required />
       
          <br /><br />

          <input type="tel" name="phone" value={formData.phone}
  onChange={handleChange} placeholder="  Enter mobile number" required />
          <br /><br />

          <input type="email" name="email" value={formData.email}
  onChange={handleChange} placeholder="  Enter Email-ID" required />
          <br /><br />

          <input type="number" name="guests" placeholder="  Number of Guests" min="1" value={formData.guests}
          onChange={handleChange} required />
          <br /><br />

          <input
         type="number"
         name="rooms"
        placeholder="  Number of Rooms"
        min="1"
         value={formData.rooms}
         onChange={handleChange}
         required
        />

          <br /><br />
        </div>

       
        <div className="right-column" style={{ flex: 1 }}>
          <label> Room Type: </label>
          <select name="roomType"  value={formData.roomType} onChange={handleChange} required>
            <option value=" " disabled selected>--Select Room Type--</option>
            <option value="single">Premium</option>
            
            <option value="suite">Executive</option>
          </select>
          <br /><br />

         <label>Check-in Date: </label>
<input
  type="date"
  name="checkin"
  value={formData.checkin}
  onChange={handleChange}
  min={today}
  required
/>
<br /><br />


          <label>Check-out Date: </label>
<input
  type="date"
  name="checkout"
  value={formData.checkout}
  onChange={handleChange}
  min={getNextDay(formData.checkin)}
  required
/>
<br /><br />

          <button type="submit" className="btn">Book Now</button>
        </div>
      </form>
    </main>
 
  <Footer />
  </>
);

}