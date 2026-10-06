import React from 'react'

function pricing() {
  const services = [
    {
      layanan: 'Cuci Kilat',
      deskripsi: 'Cuci cepat untuk mobil yang tidak terlalu kotor.',
      fitur: 'Cuci luar, vakum interior',
      harga: 'Rp 50.000',
      detail: 'Lihat Detail',
    },
    {
      layanan: 'Cuci Standar',
      deskripsi: 'Cuci menyeluruh untuk mobil yang cukup kotor.',
      fitur: 'Cuci luar dalam, semir ban',
      harga: 'Rp 80.000',
      detail: 'Lihat Detail',
    },
    {
      layanan: 'Cuci Premium',
      deskripsi: 'Cuci lengkap untuk mobil yang sangat kotor atau ingin perawatan ekstra.',
      fitur: 'Cuci luar dalam, semir ban, poles bodi',
      harga: 'Rp 120.000',
      detail: 'Lihat Detail',
    },
  ];
  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#0e151b] tracking-light text-[32px] font-bold leading-tight min-w-72">Daftar Harga</p>
      </div>
      <div className="px-4 py-3 @container">
        <div className="flex overflow-hidden rounded-xl border border-[#d0dde7] bg-slate-50">
          <table className="flex-1">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-3 text-left text-sm font-medium leading-normal text-[#0e151b] @container-[400px]:w-[400px]">
                  Layanan
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium leading-normal text-[#0e151b] @container-[240px]:w-[400px]">
                  Deskripsi
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium leading-normal text-[#0e151b] @container-[360px]:w-[400px]">
                  Fitur Utama
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium leading-normal text-[#0e151b] @container-[480px]:w-[400px]">
                  Harga
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium leading-normal text-[#4e7997] @container-[600px]:w-60">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index} className="border-t border-t-[#d0dde7]">
                  <td className="h-18 px-4 py-2 text-sm font-normal leading-normal text-[#0e151b] @container-[400px]:w-[400px]">
                    {service.layanan}
                  </td>
                  <td className="h-18 px-4 py-2 text-sm font-normal leading-normal text-[#4e7997] @container-[240px]:w-[400px]">
                    {service.deskripsi}
                  </td>
                  <td className="h-18 px-4 py-2 text-sm font-normal leading-normal text-[#4e7997] @container-[360px]:w-[400px]">
                    {service.fitur}
                  </td>
                  <td className="h-18 px-4 py-2 text-sm font-normal leading-normal text-[#4e7997] @container-[480px]:w-[400px]">
                    {service.harga}
                  </td>
                  <td className="h-18 px-4 py-2 text-sm font-bold leading-normal tracking-[0.015em] text-[#4e7997] @container-[600px]:w-60">
                    {service.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h2 className="text-[#0e151b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Faktor yang
        Mempengaruhi Harga</h2>
      <p className="text-[#0e151b] text-base font-normal leading-normal pb-3 pt-1 px-4">
        Harga cuci mobil dapat bervariasi tergantung pada ukuran mobil, tingkat kekotoran, dan jenis layanan yang dipilih.
        Kami menawarkan berbagai paket untuk memenuhi
        kebutuhan dan anggaran Anda.
      </p>
      <h2 className="text-[#0e151b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Penawaran Khusus
      </h2>
      <p className="text-[#0e151b] text-base font-normal leading-normal pb-3 pt-1 px-4">
        Dapatkan diskon 10% untuk pelanggan baru atau cuci mobil gratis setelah 5 kali cuci. Hubungi kami untuk informasi
        lebih lanjut.
      </p>
    </>
  )
}

export default pricing