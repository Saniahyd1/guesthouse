
"use client";

import { useState } from "react";
import Image from "next/image";
import "./page.css";
import Footer from "@/Components/footer";
import Navbar from "@/Components/Navbar"; 

type GalleryItem = {
  src: string;
  caption: string;
};

const images: GalleryItem[] = [
  { src: "/gallery/room1.jpg", caption: "Deluxe Suite" },
  { src: "/gallery/hall22.jpg", caption: "Multipurpose Hall – used for both meetings and celebrations" },
   { src: "/gallery/hall2.jpg", caption: "Multipurpose Hall – used for both meetings and celebrations" },
  { src: "/gallery/lobby.jpg", caption: "Dinning Hall" },
   
  { src: "/gallery/room3.jpg", caption: "Room" },
  { src: "/gallery/outside.jpg", caption: "Outside Image" },
  { src: "/gallery/room2.jpg", caption: "Room" },
  { src: "/gallery/Bathroom.jpg", caption: "Rest room" }

];

export default function GalleryPage() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <>
     <Navbar />
     
     <main>
      <i><b><h1>Gallery</h1></b></i>
      <div className="columns-1 sm:columns-2 md:columns-2 gap-4 p-4">
        
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative mb-4 cursor-pointer overflow-hidden rounded-lg group"
            onClick={() => setSelected(img)}
          >
            <Image
              src={img.src}
              alt={img.caption}
              width={600}
              height={400}
              className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hover Caption */}
            <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-50 transition-opacity duration-500">
              <p className="text-white text-lg font-semibold p-2">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-3xl w-full px-4">
            <Image
              src={selected.src}
              alt={selected.caption}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold">
              {selected.caption}
            </p>
          </div>
        </div>
        
      )}
      </main>


    <Footer/>
    </>
    
  );
}