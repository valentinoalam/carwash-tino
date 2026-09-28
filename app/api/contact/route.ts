import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/schema/contact-schema";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    
    // Validate with zod schema
    const validationResult = contactFormSchema.safeParse(body);
    
    // If validation fails, return 400 with error details
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          status: 400, 
          message: "Validation failed", 
          errors: validationResult.error 
        }, 
        { status: 400 }
      );
    }
    
    // Get validated data
    const data = validationResult.data;
    
    // Send email
    try {
      await sendEmail({ data });
      
      return NextResponse.json(
        { status: 200, message: "Message sent successfully!" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Email sending error:", error);
      
      return NextResponse.json(
        { status: 500, message: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    
    return NextResponse.json(
      { status: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}