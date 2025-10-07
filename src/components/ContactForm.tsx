'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// Turnstile API types
interface TurnstileAPI {
  render: (container: string, options: TurnstileOptions) => string;
  getResponse: (widgetId?: string) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
}

interface TurnstileOptions {
  sitekey: string;
  theme?: 'auto' | 'light' | 'dark';
  size?: 'normal' | 'compact';
  callback?: (token: string) => void;
  'error-callback'?: (error: string) => void;
  'expired-callback'?: () => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileAPI;
  }
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: ''
  });

  const [turnstileReady, setTurnstileReady] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  // Set up Turnstile with explicit rendering
  useEffect(() => {
    let widgetId: string | null = null;
    let pollInterval: NodeJS.Timeout | null = null;
    let timeout: NodeJS.Timeout | null = null;

    const renderTurnstile = () => {
      if (window.turnstile && document.getElementById('turnstile-container')) {
        try {
          console.log('Rendering Turnstile widget...');
          widgetId = window.turnstile.render('#turnstile-container', {
            sitekey: '0x4AAAAAAB5T9ESvcx6n4PsQ',
            theme: 'auto',
            size: 'normal',
            callback: (token: string) => {
              console.log('Turnstile success:', token);
              setTurnstileReady(true);
            },
            'error-callback': (error: string) => {
              console.error('Turnstile error:', error);
              setTurnstileReady(false);
              
              // Handle specific error codes
              if (error === '110200') {
                console.log('Turnstile 110200 error - enabling fallback mode');
                setUseFallback(true);
                setFormState({ 
                  status: 'idle', 
                  message: '' 
                });
              } else {
                setFormState({ 
                  status: 'error', 
                  message: 'Security verification failed. Please try again.' 
                });
              }
            },
            'expired-callback': () => {
              console.log('Turnstile expired');
              setTurnstileReady(false);
              setFormState({ 
                status: 'error', 
                message: 'Security verification expired. Please complete it again.' 
              });
            }
          });
          console.log('Turnstile widget rendered successfully');
        } catch (error) {
          console.error('Failed to render Turnstile:', error);
          setFormState({ 
            status: 'error', 
            message: 'Security verification failed to load. Please refresh the page.' 
          });
        }
      }
    };

    const checkAndRender = () => {
      if (window.turnstile) {
        console.log('Turnstile script loaded, rendering widget...');
        renderTurnstile();
        if (pollInterval) {
          clearInterval(pollInterval);
          pollInterval = null;
        }
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        return true;
      }
      return false;
    };

    // Check if Turnstile is already loaded
    if (checkAndRender()) {
      return;
    }

    // Poll for Turnstile availability
    console.log('Polling for Turnstile script...');
    pollInterval = setInterval(() => {
      if (checkAndRender()) {
        return;
      }
    }, 100);

    // Cleanup after 10 seconds
    timeout = setTimeout(() => {
      if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
      }
      if (!window.turnstile) {
        console.error('Turnstile script failed to load within 10 seconds - enabling fallback mode');
        setUseFallback(true);
        setFormState({ 
          status: 'idle', 
          message: '' 
        });
      }
    }, 10000);

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
      if (timeout) {
        clearTimeout(timeout);
      }
      if (widgetId && window.turnstile?.remove) {
        console.log('Removing Turnstile widget...');
        window.turnstile.remove(widgetId);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ status: 'submitting', message: '' });

    try {
      // Get Turnstile token (or use fallback)
      let turnstileToken = null;
      
      if (!useFallback && window.turnstile?.getResponse) {
        turnstileToken = window.turnstile.getResponse();
      }
      
      // In fallback mode, we'll skip Turnstile validation on the client
      // The server will handle this appropriately
      if (!useFallback && !turnstileToken) {
        setFormState({ 
          status: 'error', 
          message: 'Please complete the security verification.' 
        });
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
          useFallback
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setFormState({ 
          status: 'success', 
          message: 'Thank you! Your message has been sent successfully.' 
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
        // Reset Turnstile widget (if not in fallback mode)
        if (!useFallback && window.turnstile?.reset) {
          window.turnstile.reset();
        }
      } else {
        setFormState({ 
          status: 'error', 
          message: result.message || 'Failed to send message. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState({ 
        status: 'error', 
        message: 'An error occurred. Please try again later.' 
      });
    }
  };

  return (
    <div className="card-modern p-8">
      <h2 className="text-3xl font-heading font-bold mb-8 text-primary">Send us a Message</h2>
      
      {/* Status Messages */}
      {formState.status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center space-x-3"
        >
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-green-800 dark:text-green-200 font-medium">{formState.message}</p>
        </motion.div>
      )}

      {formState.status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center space-x-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-red-800 dark:text-red-200 font-medium">{formState.message}</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-muted-foreground/60"
              placeholder="Enter your first name"
              required
              disabled={formState.status === 'submitting'}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-muted-foreground/60"
              placeholder="Enter your last name"
              required
              disabled={formState.status === 'submitting'}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-muted-foreground/60"
            placeholder="Enter your email address"
            required
            disabled={formState.status === 'submitting'}
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-muted-foreground/60"
            placeholder="What's this about?"
            required
            disabled={formState.status === 'submitting'}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/60"
            placeholder="Tell us what's on your mind..."
            required
            disabled={formState.status === 'submitting'}
          />
        </div>

        {/* Turnstile Widget or Fallback */}
        <div className="flex justify-center">
          {useFallback ? (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm text-center">
                Security verification is temporarily unavailable. Your form will still be processed securely.
              </p>
            </div>
          ) : (
            <div id="turnstile-container" />
          )}
        </div>

        <button
          type="submit"
          disabled={formState.status === 'submitting' || (!turnstileReady && !useFallback)}
          className="w-full btn-modern text-center flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formState.status === 'submitting' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : !turnstileReady && !useFallback ? (
            <>
              <AlertCircle className="w-5 h-5" />
              <span>Complete Security Verification</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
