import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

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
Always be helpful and provide accurate information. If you don't know something, direct them to call the phone number.`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: messages
      })
    });

    if (!res.ok) {
      throw new Error('API request failed');
    }

    const data = await res.json();
    const reply = data.content?.[0]?.text || 'Please call +91 99859 69666 for help.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ reply: 'Sorry! Please call +91 99859 69666.' }, { status: 500 });
  }
}