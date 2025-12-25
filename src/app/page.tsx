
import Navbar from "@/Components/Navbar";
import CircularGallery from "@/Components/CircularGallery";
import Footer from "@/Components/footer";
import "./page.css";

export default function Home() {
  return (
    <>
    <Navbar />
      <main className="main">
      <div className="home-bg">
      <h1><b>Welcome to Hill Street Service Apartment</b></h1>
     
     </div>
      <div className="features">
     <h2><b>Stay Highlights</b></h2> 
      <CircularGallery/>
     
    
      </div>
      <div className="about-us">
        <h2><b>About Us</b></h2>
        <p>
         Hill Street Service Apartment is a premium stay option located in Banjara Hills — the heart of Hyderabad. Designed for comfort and convenience, our property offers a peaceful, homely, and secure environment for guests seeking both short and long stays.

          We provide fully furnished, spacious, and well-maintained rooms equipped with modern amenities to ensure a relaxed and enjoyable experience. Whether you are a business traveler, a family on vacation, or someone visiting the city for medical or long-term purposes, we offer an ideal blend of homelike warmth and hotel-style service.

          Our strategic location in Banjara Hills gives guests seamless access to major malls, restaurants, hospitals, and business hubs, making your stay both convenient and memorable. With clean rooms, responsive support, and a calm atmosphere, we focus on delivering comfort, privacy, and a hassle-free experience from check-in to checkout.

          At Hill Street Service Apartment, every guest is valued, and we are committed to providing a stay that feels safe, pleasant, and truly like home — right in the center of the city.</p>
        </div> 
   
   
  
          
          <div className="location" style={{alignItems: 'center'}}>
        <h2><b>Our Location</b></h2>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.684029368478!2d78.43316787462786!3d17.42694480166536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90d3112cf9f9%3A0x64c41d8971f0705a!2sOYO%20Flagship%20Hill%20Street%20Service%20Apartment%20Near%20Gvk%20One%20Mall!5e0!3m2!1sen!2sin!4v1763824757499!5m2!1sen!2sin"
            width="600"
           height="450"
           style={{border:0}}
           
            align-item="center"
             allowFullScreen={true}
             loading="lazy" 
             >

            </iframe>
         


            </div>

      </main>
      
      <Footer />

    
    </>

  );
}
