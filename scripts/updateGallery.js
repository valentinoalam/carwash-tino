import fs from 'fs/promises';
import path from 'path';

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

const tsContent = `
export interface Image {
  src: string;
  alt: string;
}
export const images: Image[] = ${JSON.stringify(images, null, 2)};
`;
// Tulis kembali ke src/data/hairstyles.ts (sesuaikan path target jika berbeda)
const targetPath = path.join(process.cwd(), 'src', 'data', 'gallery.ts');
fs.writeFile(targetPath, tsContent, 'utf-8');
console.log('✅ File gallery.js berhasil di-update dengan data gallery gambar!');