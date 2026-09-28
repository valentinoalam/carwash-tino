"use client";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'; // Import useState

function ContactUs() {
  const [email, setEmail] = useState(''); // State to manage email input

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value); // Update email state on change
  };

  const handleSubscribe = () => {
    // Here you would typically handle the subscription logic,
    // e.g., send the email to an API, validate it, etc.
    console.log('Subscribing with email:', email);
    alert(`Thank you for subscribing, ${email}!`); // Using alert for demonstration, replace with a proper UI message
    setEmail(''); // Clear the input field after subscription
  };

  const openingHours = {
    Monday: "10:00 - 18:00",
    Tuesday: "10:00 - 18:00",
    Wednesday: "10:00 - 18:00",
    Thursday: "10:00 - 18:00",
    Friday: "10:00 - 19:00",
    Saturday: "09:00 - 17:00",
    Sunday: "Closed",
  }
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
      <div className="space-y-2 bg-blue-300/30 p-1 rounded-xs">
        {Object.entries(openingHours).map(([day, hours]) => (
          <div key={day} className="flex justify-between text-sm">
            <span className="font-medium">{day}:</span>
            <span className={hours === "Closed" ? "text-red-600" : "text-gray-600"}>{hours}</span>
          </div>
        ))}
      </div>
      <p className="text-black text-base font-normal leading-normal pb-3 pt-6 px-4 text-center">
        Visit us at 123 Main Street, Anytown, USA. Call us at (555) 123-4567 or email us at info@thehaircut.com.
      </p>
      <div className="flex px-4 py-3">
        {/* Embedded Google Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.254101979929!2d-122.41941568468117!3d37.77492977975931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858086a9d0d3b3%3A0x6a9d0d3b3c3e3a3!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
          width="100%"
          height="auto" // Set height to auto to work with aspect-video
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-video rounded-xl" // Tailwind classes for aspect ratio and rounded corners
          title="Location of The Carwash on Google Maps"
        ></iframe>
      </div>
      <div className="@container">
        <div className="flex flex-col justify-end gap-6 px-2 py-8 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
          <div className="flex flex-col gap-2 text-center">
            <h1
              className="text-black tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]"
            >
              Stay Sharp with Our Newsletter
            </h1>
            <p className="text-black text-base font-normal leading-normal max-w-[720px]">Get exclusive promotions and updates on the latest styles and trends.</p>
          </div>
          <div className="flex flex-1 justify-center">
            <label className="flex flex-col min-w-40 h-14 max-w-[480px] flex-1 @[480px]:h-16">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <input
                  placeholder="Enter your email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-black focus:outline-0 focus:ring-0 bg-[#282939] border-1 border-[#f3c334] focus:border-none h-full placeholder:text-[#bab29c] px-4 rounded-r-none border-r-0 pr-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                  value={email} // Bind value to state
                  onChange={handleEmailChange} // Add onChange handler
                />
                <div className="flex items-center justify-center rounded-r-xl border-l-0 border-t-1 border-r-1 border-amber-200 bg-[#309be8] pr-2">
                  <Button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 border-none text-[#181611] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                    onClick={handleSubscribe} // Add onClick handler
                  >
                    <span className="truncate">Subscribe</span>
                  </Button>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
