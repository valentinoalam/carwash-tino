'use client'
import { Car } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

async function getImages(): Promise<{src: string; alt: string}[]> {
  try {
    const response = await fetch('/api/gallery');
    if (!response.ok) throw new Error('Failed to fetch gallery images');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch gallery images:', error);
    return [];
  }
}

function Gallery() {
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      try {
        const imagesData = await getImages();
        setImages(imagesData);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadImages();
  }, []);
  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Gallery</h2>
        <Link href="#" className="text-sm text-blue-600 hover:underline font-medium">
            View All
        </Link>
        </div>

        <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((img) => (
            <div key={img} className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <Car className="h-8 w-8 text-blue-400" />
            </div>
        ))}
        </div>
      </div>
    )};
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Gallery</h2>
        <Link href="#" className="text-sm text-blue-600 hover:underline font-medium">
            View All
        </Link>
        </div>

        <div className="grid grid-cols-3 gap-2">
        {images.map((img) => (
            <div key={img.alt} className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <Image src={img.src} alt='' width={110} height={110} className="h-full w-full object-cover text-blue-400" />
            </div>
        ))}
        </div>
    </div>
  )
}

export default Gallery