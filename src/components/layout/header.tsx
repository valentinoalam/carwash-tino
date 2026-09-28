'use client'

import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Logo from './logo'
import { cn } from '@/lib/utils'
import navLinks from '@/data/headerNavLinks'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('header')) {
        setIsMobileMenuOpen(false)
      }
    }
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = 'unset'
      
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[99.5%] max-w-6xl px-4 transition-all duration-300 ${
        isScrolled ? 'top-2' : 'top-8'
      }`}>
        <div className={`backdrop-blur-md rounded-4xl border px-6 py-2 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'bg-white/95 border-gray-200/50 shadow-2xl shadow-black/10' : 'bg-white/25 border-gray-200/10 shadow-xl shadow-black/5'
        }`}>
          {/* Logo */}
          <div className="flex-shrink-0 justify-items-start flex-grow-1">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 flex-grow-2 z-100 justify-center items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn("text-sm font-medium  transition-all duration-200 relative group",
                  isScrolled ? "text-gray-700 hover:text-primary-600" : "text-gray-50 hover:text-primary-50"
                )}
                prefetch={false}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="lg:flex items-center gap-3 space-x-1.5">
            <Button suppressHydrationWarning
              variant="ghost"
              className="text-sm bg-[#309be8]/60 cursor-pointer text-white hover:bg-[#afd0e8]/80 hover:scale-105 rounded-xl px-5 py-2.5 font-medium border border-primary-200/50 transition-all duration-200"
            >
              Sign In
            </Button>
            <Button suppressHydrationWarning className={cn("text-sm cursor-pointer bg-gradient-to-r from-primary-600 to-primary-700 hover:bg-primary-50/80 text-primary-foreground hover:from-primary-700 hover:to-primary-800 hover:scale-105 rounded-l-xl rounded-r-2xl px-5 py-2.5 font-medium shadow-lg hover:shadow-xl transition-all duration-300 group",
              isScrolled ? 'bg-gradient-to-r from-[#309be8]/60 via-10% via-advertiser/80 to-advertiser' : ''
            )}>
              Book Now 
              <ArrowRight className="hidden sm:flex ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="lg:hidden p-2 invert hover:invert-0 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile Menu Panel */}
        <div className={`absolute w-full transition-all duration-300
          top-16 sm:top-20 left-1/2 transform -translate-x-1/2 
          max-w-[95vw] sm:max-w-md mx-auto
          bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-gray-200/50 shadow-2xl 
          ${isMobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`}>
          <div className="p-4 sm:p-6">
            {/* Mobile Navigation Links - Only navigation items, no buttons */}
            <nav className="space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg sm:rounded-xl font-medium transition-all duration-200 transform hover:translate-x-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    animationDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                    animation: isMobileMenuOpen ? 'slideInFromRight 0.3s ease-out forwards' : 'none'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}

export default Header