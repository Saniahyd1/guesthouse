import { NextRequest, NextResponse } from 'next/server';

const getFallbackReply = (input: string) => {
  const msg = input.toLowerCase();

  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
    return '👋 Welcome to Hill Street Service Apartments! How may I assist you today?';
  }

  if (msg.includes('room')) {
    return '🏨 We offer Deluxe Rooms, Executive Rooms, and Family Suites. Which one would you like to know about?';
  }

  if (msg.includes('book') || msg.includes('reservation')) {
    return '📅 You can book your stay through our website or contact our reception for assistance.';
  }

  if (msg.includes('price') || msg.includes('cost') || msg.includes('rate')) {
    return '💰 Room prices depend on the room type and availability. Please visit the Booking section for the latest rates.';
  }

  if (msg.includes('check in') || msg.includes('check-in')) {
    return '🕑 Check-in time is from 2:00 PM onwards.';
  }

  if (msg.includes('check out') || msg.includes('check-out')) {
    return '🕛 Check-out time is before 12:00 PM.';
  }

  if (msg.includes('facility') || msg.includes('wifi') || msg.includes('parking') || msg.includes('amenities')) {
    return '✨ We provide Free Wi-Fi, Air Conditioning, Smart TV, Housekeeping, Parking, Laundry Service, and 24/7 Reception.';
  }

  if (msg.includes('location') || msg.includes('address')) {
    return '📍 We are located in Banjara Hills, Hyderabad, close to shopping malls, hospitals, and major business centers.';
  }

  if (msg.includes('contact') || msg.includes('phone')) {
    return '📞 You can reach us through the Contact Us page or call our reception for assistance.';
  }

  if (msg.includes('nearby') || msg.includes('restaurant') || msg.includes('places')) {
    return '🍽️ Our guest house is near restaurants, shopping malls, hospitals, and popular attractions in Banjara Hills.';
  }

  if (msg.includes('thank')) {
    return '😊 You are welcome! We look forward to hosting you.';
  }

  return 'Sorry, I did not understand. You can ask about rooms, pricing, check-in, check-out, facilities, location, or booking.';
};

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    const lastMessage = Array.isArray(messages) ? messages[messages.length - 1] : null;
    const userText = typeof lastMessage?.content === 'string'
      ? lastMessage.content
      : typeof lastMessage?.content?.[0]?.text === 'string'
        ? lastMessage.content[0].text
        : '';

    const fallbackReply = getFallbackReply(userText);

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ reply: fallbackReply });
    }

    const SYSTEM_PROMPT = `You are a friendly assistant for Hill Street Service Apartment in Banjara Hills, Hyderabad.
Address: Lane Opposite TV9, Road No. 3, Banjara Hills, Hyderabad - 500034
Phone: +91 99859 69666 | 040-31727920
Email: wellness.gardenia@gmail.com
Rooms and Pricing:
- Premium Room: ₹1,650 per night
- Executive Room: ₹1,850 per night
- Multipurpose Hall: ₹2,000 per day — available for functions like birthday parties or any celebrations, but only for guests who are staying at the property.
Amenities:
- Free Wi-Fi
- Parking
- Laundry service
- 24/7 security
- Housekeeping
- Kitchen facilities
- Air conditioning
- Television
- Room service
Always be helpful and provide accurate information. If you do not know something, direct them to call the phone number.`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages
      })
    });

    if (!res.ok) {
      return NextResponse.json({ reply: fallbackReply });
    }

    const data = await res.json();
    const reply = data.content?.[0]?.text || fallbackReply;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ reply: 'Sorry! Please call +91 99859 69666.' });
  }
}