import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public', 'img', 'gallery');
    const filenames = await fs.readdir(imagesDirectory);
    
    // Filter only image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
    const imageFiles = filenames.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    const images = imageFiles.map(filename => ({
      src: `/img/gallery/${filename}`,
      alt: filename.replace(/\.[^/.]+$/, "") // Remove file extension
    }));

    return NextResponse.json(images);
  } catch (error) {
    console.error('Failed to read gallery images:', error);
    return NextResponse.json([], { status: 500 });
  }
}