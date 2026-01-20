import Navbar from "@/Components/Navbar";
import Footer from "@/Components/footer";
import "./page.css";
export default function FacilitiesPage() {
return (
  <>
    <Navbar />  
    <main className="themain" style={{ padding: "80px 20px" }}>
      <div className="facilities-section">
        <h1>Room Overview</h1>
        <div className="facilities-cards">
            <div className="cards">
            <div
              className="card">
              <img src="/gallery/room1.jpg" alt="King Bed"  />
            <p>
              <b>Executive Room</b><br/>
              Spacious room with a king-sized bed, ensuite bathroom, and modern amenities.
            </p>
            
            </div>
            <div
              className="card">
              <img src="/gallery/room2.jpg" alt="Bed"  />
            <p>
              <b>Premium Room</b><br/>
              Spacious room with a king-sized bed, ensuite bathroom, and modern amenities.
            </p>
            
            </div>
    </div>
    </div>
    </div>
    </main>
    <Footer />
    </>
)
}