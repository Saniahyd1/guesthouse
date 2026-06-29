"use client";

import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import "@/Components/ChatBot.css";

interface Message {
  sender: "You" | "Bot";
  text: string;
}

const getBotReply = (input: string) => {
  const msg = input.toLowerCase();

  if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
    return "👋 Welcome to Hill Street Service Apartments! How may I assist you today?";
  }

  if (msg.includes("room")) {
    return "🏨 We offer Deluxe Rooms, Executive Rooms, and Family Suites. Which one would you like to know about?";
  }
  if (msg.includes("book") || msg.includes("reservation")) {
    return "📅 You can book your stay through our website or contact our reception for assistance.";
  }
  if (msg.includes("price") || msg.includes("cost") || msg.includes("rate")) {
    return "💰 Room prices depend on the room type and availability. Please visit the Booking section for the latest rates.";
  }
  if (msg.includes("deluxe") || msg.includes("executive") || msg.includes("family suites")) {
      return "💰 Room prices depend on the room type and availability. Deluxe rooms start at Rs.1900 per night, Executive rooms at Rs.1700, and Family Suites at Rs.1600.";
    }

  if (msg.includes("book") || msg.includes("reservation")) {
    return "📅 You can book your stay through our website or contact our reception for assistance.";
  }

  if (msg.includes("price") || msg.includes("cost") || msg.includes("rate")) {
    return "💰 Room prices depend on the room type and availability. Please visit the Booking section for the latest rates.";
  }

  if (msg.includes("check in") || msg.includes("check-in")) {
    return "🕑 Check-in time is from 2:00 PM onwards.";
  }

  if (msg.includes("check out") || msg.includes("check-out")) {
    return "🕛 Check-out time is before 12:00 PM.";
  }

  if (msg.includes("facility") || msg.includes("wifi") || msg.includes("parking") || msg.includes("amenities")) {
    return "✨ We provide Free Wi-Fi, Air Conditioning, Smart TV, Housekeeping, Parking, Laundry Service, and 24/7 Reception.";
  }

  if (msg.includes("location") || msg.includes("address")) {
    return "📍 We are located in Banjara Hills, Hyderabad, close to shopping malls, hospitals, and major business centers.";
  }

  if (msg.includes("contact") || msg.includes("phone")) {
    return "📞 You can reach us through the Contact Us page or call our reception for assistance.";
  }

  if (msg.includes("nearby") || msg.includes("restaurant") || msg.includes("places")) {
    return "🍽️ Our guest house is near restaurants, shopping malls, hospitals, and popular attractions in Banjara Hills.";
  }

  if (msg.includes("thank")) {
    return "😊 You're welcome! We look forward to hosting you. Have a wonderful day!";
  }

  return "Sorry, I didn't understand. You can ask about rooms, pricing, check-in, check-out, facilities, location, or booking.";
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "Bot",
      text: "Hello! I can help with rooms, pricing, facilities, booking, check-in/out, and location.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const addMessage = (sender: "You" | "Bot", text: string) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const handleInput = async () => {
    const userText = input.trim();
    if (!userText) return;

    addMessage("You", userText);
    setInput("");

    const fallbackReply = getBotReply(userText);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: userText }],
        }),
      });

      if (!response.ok) throw new Error("Chat API failed");

      const data = await response.json();
      addMessage("Bot", data.reply || fallbackReply);
    } catch {
      addMessage("Bot", fallbackReply);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void handleInput();
    }
  };

  return (
    <>
      <button
        className="chat-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <BsChatDotsFill size={26} />
      </button>

      {isOpen && (
        <div id="chatbot" className="chatbot">
          <div className="chat-header">
            <strong>Hill Street Assistant</strong>
            <button className="chat-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={`${msg.sender}-${index}`} className={`chat-message ${msg.sender === "You" ? "user" : "bot"}`}>
                <span>{msg.text}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Ask about rooms, booking..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <button onClick={() => void handleInput()}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;