
"use client";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Thank You!</h1>
        <p className="text-center mb-6">
          Thank you for choosing our guest house!<br/>
Our team will contact you via phone to confirm your booking details.<br/>
We look forward to hosting you and ensuring a comfortable stay.<br/>
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}