import React from 'react'
import { ContactForm } from "@/components/contact-form";

const Contact = () => {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-[#0e151b] tracking-light text-[32px] font-bold leading-tight">Hubungi Kami</p>
          <p className="text-[#4e7997] text-sm font-normal leading-normal">
            Kami siap membantu Anda. Silakan isi formulir di bawah ini atau hubungi kami melalui informasi kontak yang
            tersedia.
          </p>
        </div>
      </div>
      <ContactForm />
      <h2 className="text-[#0e151b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Informasi Kontak
      </h2>
      <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
        <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0dde7] py-5">
          <p className="text-[#4e7997] text-sm font-normal leading-normal">Alamat</p>
          <p className="text-[#0e151b] text-sm font-normal leading-normal">Jl. Raya Utama No. 123, Kota Besar, Indonesia</p>
        </div>
        <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0dde7] py-5">
          <p className="text-[#4e7997] text-sm font-normal leading-normal">Telepon</p>
          <p className="text-[#0e151b] text-sm font-normal leading-normal">+62 21 555 6789</p>
        </div>
        <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0dde7] py-5">
          <p className="text-[#4e7997] text-sm font-normal leading-normal">Email</p>
          <p className="text-[#0e151b] text-sm font-normal leading-normal">info@autospa.com</p>
        </div>
        <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0dde7] py-5">
          <p className="text-[#4e7997] text-sm font-normal leading-normal">Jam Operasional</p>
          <p className="text-[#0e151b] text-sm font-normal leading-normal">Senin - Minggu: 09.00 - 18.00</p>
        </div>
      </div>
      <div className="flex px-4 py-3">
        <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl object-cover"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCnrwnVOVvB61jta60ssTZcLzCg4YeMC_xTyYwmCIqqy3eMqdGeypAiO7S3l9EEAAQ8K94onWF3ZjtZ9nl_8j07VybkiAbRieBMM4www5s06HEYzMVPFCOFZqYgs-fHLEjWQDXL0rWxsRnF89oUtsdzhPs0wDPkeS37OVccZoGOmtq1u_45WDPyupKdEcB0Ma-d6zHQpYL0dNYHatJZrZkKPLc9Pwv58bs70MXMHYaKNZm-3tyQceiTIIchoweAJgLmXFssXvLGkYeX")' }}>
        </div>
      </div>
    </>
  )
}

export default Contact