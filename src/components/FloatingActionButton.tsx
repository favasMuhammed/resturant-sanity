'use client';

import { useState } from 'react';
import { ShoppingCart, Phone, MapPin, X } from 'lucide-react';
import Link from 'next/link';

interface FloatingActionButtonProps {
  phoneNumber?: string;
}

export default function FloatingActionButton({ phoneNumber = '01161234567' }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: ShoppingCart,
      label: 'Order Now',
      href: '#order',
      color: 'bg-success hover:bg-success/90 shadow-lg hover:shadow-xl'
    },
    {
      icon: Phone,
      label: 'Call Us',
      href: `tel:${phoneNumber}`,
      color: 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl'
    },
    {
      icon: MapPin,
      label: 'Directions',
      href: 'https://maps.google.com/?q=20+Kemble+Gallery+Leicester+LE1+3YT',
      color: 'bg-accent hover:bg-accent/90 shadow-lg hover:shadow-xl'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div className={`flex flex-col space-y-3 mb-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action, index) => (
          action.href.startsWith('tel:') ? (
            <button
              key={index}
              onClick={() => {
                // For tel: links, try to open the dialer
                try {
                  window.location.href = action.href;
                } catch {
                  // Fallback: copy phone number to clipboard
                  const phoneNumber = action.href.replace('tel:', '');
                  navigator.clipboard.writeText(phoneNumber).then(() => {
                    alert(`Phone number ${phoneNumber} copied to clipboard`);
                  }).catch(() => {
                    alert(`Please call us at ${phoneNumber}`);
                  });
                }
              }}
              className={`${action.color} text-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group focus-ring`}
            >
              <action.icon className="w-6 h-6" />
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-neutral-900 text-white px-4 py-2 rounded-2xl text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
                {action.label}
              </span>
            </button>
          ) : (
            <Link
              key={index}
              href={action.href}
              target={action.href.startsWith('http') ? '_blank' : undefined}
              rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`${action.color} text-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group focus-ring`}
            >
              <action.icon className="w-6 h-6" />
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-neutral-900 text-white px-4 py-2 rounded-2xl text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
                {action.label}
              </span>
            </Link>
          )
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-primary/50 z-50 relative"
        type="button"
        aria-label="Toggle quick actions"
      >
        <div className="relative w-6 h-6">
          <X 
            className={`absolute inset-0 w-6 h-6 transition-all duration-500 group-hover:scale-110 ${
              isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'
            }`}
          />
          <ShoppingCart 
            className={`absolute inset-0 w-6 h-6 transition-all duration-500 group-hover:scale-110 ${
              isOpen ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
            }`}
          />
        </div>
      </button>
    </div>
  );
}
