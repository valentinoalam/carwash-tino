"use client"

import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Logo from "../layout/logo"
import { useState } from "react"

interface BlogHeaderProps {
  onSearchChange: (query: string) => void
  searchQuery: string
}

export function BlogHeader({ onSearchChange, searchQuery }: BlogHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    // Close search when opening menu
    if (!isMobileMenuOpen) {
      setIsMobileSearchOpen(false)
    }
  }

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen)
    // Close menu when opening search
    if (!isMobileSearchOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 w-full gap-5 items-center">
            <div className="flex justify-start">
              <Logo />
            </div>
            
            <nav className="flex items-center justify-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
                Home
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
                Blog
              </Link>
              <Link href="/booking" className="text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
                Book Now
              </Link>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
                Contact
              </a>
            </nav>

            <div className="flex justify-end">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 w-64 lg:w-72"
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between w-full">
            <div className="flex items-center">
              <Logo />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileSearch}
                className={isMobileSearchOpen ? "bg-gray-100" : ""}
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu}
                className={isMobileMenuOpen ? "bg-gray-100" : ""}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isMobileSearchOpen && (
            <div className="md:hidden mt-4 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 w-full"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur-md">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-gray-900 transition-colors py-2 border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/blog" 
                  className="text-gray-600 hover:text-gray-900 transition-colors py-2 border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  href="/booking" 
                  className="text-gray-600 hover:text-gray-900 transition-colors py-2 border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Now
                </Link>
                <a 
                  href="#contact" 
                  className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}