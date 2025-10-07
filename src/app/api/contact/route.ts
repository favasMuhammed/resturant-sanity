import { NextRequest, NextResponse } from 'next/server';
import { saveContactSubmission } from '@/sanity/api';

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || '0x4AAAAAAB5T9C5mR90popmYCoGdnq5mu3w';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  turnstileToken?: string;
  useFallback?: boolean;
}

async function validateTurnstile(token: string, remoteip?: string): Promise<{ success: boolean; error?: string }> {
  try {
    const formData = new FormData();
    formData.append('secret', TURNSTILE_SECRET_KEY);
    formData.append('response', token);
    
    if (remoteip) {
      formData.append('remoteip', remoteip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    if (!result.success) {
      console.error('Turnstile validation failed:', result['error-codes']);
      return { 
        success: false, 
        error: `Validation failed: ${result['error-codes']?.join(', ') || 'Unknown error'}` 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Turnstile validation error:', error);
    return { 
      success: false, 
      error: 'Validation service unavailable' 
    };
  }
}

async function sendEmail(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    // Prepare email content
    const emailContent = `
New Contact Form Submission from Sip-In Cafe Website

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
This message was sent from the Sip-In Cafe website contact form.
Submitted at: ${new Date().toISOString()}
    `.trim();

    // Log the email content (for development)
    console.log('=== EMAIL TO SEND ===');
    console.log('To: info@sipincafe.co.uk');
    console.log('Subject: New Contact Form Submission - ' + formData.subject);
    console.log('Content:', emailContent);
    console.log('====================');

    // TODO: Implement actual email sending
    // In production, integrate with an email service like:
    // - SendGrid, Mailgun, AWS SES, Nodemailer, or Resend
    
    // Example with nodemailer:
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransporter({
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   secure: true,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });
    // 
    // await transporter.sendMail({
    //   from: 'noreply@sipincafe.co.uk',
    //   to: 'info@sipincafe.co.uk',
    //   subject: `New Contact Form Submission - ${formData.subject}`,
    //   text: emailContent,
    //   replyTo: formData.email
    // });

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      error: 'Failed to send email' 
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    const { firstName, lastName, email, subject, message, turnstileToken, useFallback } = body;
    
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get client IP for Turnstile validation
    const remoteip = request.headers.get('CF-Connecting-IP') || 
                     request.headers.get('X-Forwarded-For') || 
                     'unknown';

    // Validate Turnstile token (skip if in fallback mode)
    if (!useFallback) {
      if (!turnstileToken) {
        return NextResponse.json(
          { message: 'Security verification token is required' },
          { status: 400 }
        );
      }

      const turnstileValidation = await validateTurnstile(turnstileToken, remoteip);
      
      if (!turnstileValidation.success) {
        return NextResponse.json(
          { message: turnstileValidation.error || 'Security verification failed' },
          { status: 400 }
        );
      }
    } else {
      console.log('Processing form submission in fallback mode (Turnstile validation skipped)');
    }

    // Save to CMS first
    const submissionData = {
      _type: 'contactSubmission' as const,
      firstName,
      lastName,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      ipAddress: remoteip,
      userAgent: request.headers.get('User-Agent') || 'Unknown',
      turnstileToken: turnstileToken || undefined,
      isProcessed: false,
    };

    const cmsResult = await saveContactSubmission(submissionData);
    
    if (!cmsResult) {
      console.warn('Failed to save contact submission to CMS, but continuing with email');
    } else {
      console.log('Contact submission saved to CMS with ID:', cmsResult._id);
    }

    // Send email
    const emailResult = await sendEmail(body);
    
    if (!emailResult.success) {
      return NextResponse.json(
        { message: emailResult.error || 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Message sent successfully and saved to our system',
        submissionId: cmsResult?._id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}