import { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Shine Carwash",
  description: "Get in touch with our team. We'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 md:py-24">
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
          Get in Touch
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Have a question or want to work together? Fill out the form below, and we&apos;ll get back to you as soon as possible.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="bg-card rounded-lg p-6 md:p-8 shadow-sm border">
          <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
          <ContactForm />
        </div>
        
        <div className="space-y-8">
          <div className="bg-card rounded-lg p-6 md:p-8 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-muted-foreground">
                  123 Business Avenue<br />
                  Suite 456<br />
                  New York, NY 10001
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">
                  hello@yourcompany.com
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 md:p-8 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}