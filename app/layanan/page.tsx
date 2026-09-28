import React from 'react'

const page = () => {
  return (
    <>
      <div className="@container">
        <div className="@[480px]:p-4">
          <div
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
            style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDewAzSsYLVpvuA4RzkfMRwWg7Ft0VRJWjGjRKno4yYWJzZWd-gpJav37wq6wGP1dmYxZ-rChsyHIYCDYkmfhQ668EG_RKDQx5NBPqFawX35ZzjEtVgfYV5GI2-iZO8NPGGPgpG_4HvzzqPsNqXs0n57swdbmfGOIbmgjWrozPQfwjLh50eGk_R3K1IIDFrEKkKSt7g7_xXHGNC_m48SnPsk_QGw2vvfZoYs43ZP7X2c882inj0nD1eM-jZj6-YQcfkKUJ_LSMctdn")' }}
          >
            <div className="flex flex-col gap-2 text-center">
              <h1
                className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
              >
                Layanan Cuci Mobil Profesional
              </h1>
              <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                Kami menawarkan berbagai layanan cuci mobil untuk menjaga kendaraan Anda tetap bersih dan terawat. Pilih dari opsi standar hingga detailing lengkap.
              </h2>
            </div>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#afd0e8] text-[#101519] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
            >
              <span className="truncate">Pesan Sekarang</span>
            </button>
          </div>
        </div>
      </div>
      <h2 className="text-[#101519] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Layanan Kami</h2>
      <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-xl bg-gray-50 p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
          <div className="flex flex-[2_2_0px] flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[#101519] text-base font-bold leading-tight">Cuci Standar</p>
              <p className="text-[#5a778c] text-sm font-normal leading-normal">
                Cuci dasar untuk membersihkan kotoran dan debu ringan. Termasuk cuci luar, lap kering, dan pembersihan interior ringan.
              </p>
            </div>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#e9eef1] text-[#101519] text-sm font-medium leading-normal w-fit"
            >
              <span className="truncate">Pesan Sekarang</span>
            </button>
          </div>
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAhZjYuNbSF4mZNI5EoP80Iq91aUUpA0zxPnSPwA_gR9OtbfVXuvalMaDSV-czO71NZQqON1EGuYHCP_YiNjdFgj24umb3TZKIo9bnDcFYk6C9C2APlX7TnHdNT_gq8cq4JTdda52foCarvUYEWguT1iYy4jd8twvj94HH64zWt0ac7JgjuZELSKkHauhwW6uJ9jicXLx9Mr29hMCC00m0m_nTv_R6SS1aTrz-RpIRwnwDqPd1IZNC5Cu7mq1zZOA1wg25Ob_ktViJE")' }}
          ></div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-xl bg-gray-50 p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
          <div className="flex flex-[2_2_0px] flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[#101519] text-base font-bold leading-tight">Cuci Premium</p>
              <p className="text-[#5a778c] text-sm font-normal leading-normal">
                Cuci menyeluruh dengan tambahan perawatan. Termasuk cuci luar, lap kering, pembersihan interior, semir ban, dan pelindung cat.
              </p>
            </div>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#e9eef1] text-[#101519] text-sm font-medium leading-normal w-fit"
            >
              <span className="truncate">Pesan Sekarang</span>
            </button>
          </div>
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5pYlS_1-J1ptIELLEYO04uxI5GTMKCJL_nmr1lnta2NbVegLslDLIwYsxGGo601B0Ma49XNyUmlFazZCS0Qtuuo2I96W2i55LHu82qw6zYeJAs-CC6wH_YBPvDZHa7Jm3PMfoeNG2b7CMU-WSzrakAbWoU5EL_xA-5zLya-HvgW_cXcUYcdijsIe1V9FpVqsnYhIAmboLKYTYrmOCQu1OxogNWUa2OYfFalkO2dh2AkN0Se-rzRdPEtatTjsPyDLX4JJvtFeoPi0z")' }}
          ></div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-xl bg-gray-50 p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
          <div className="flex flex-[2_2_0px] flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[#101519] text-base font-bold leading-tight">Detailing Interior</p>
              <p className="text-[#5a778c] text-sm font-normal leading-normal">
                Pembersihan mendalam bagian dalam mobil. Termasuk vakum menyeluruh, pembersihan jok, karpet, dashboard, dan jendela.
              </p>
            </div>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#e9eef1] text-[#101519] text-sm font-medium leading-normal w-fit"
            >
              <span className="truncate">Pesan Sekarang</span>
            </button>
          </div>
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkimNYcTKmpULmhBpQWeHfnsHif1jJWoJRgapxK52sxtoL-rXtnw65n_3xrzvUXUfXSaw9XuQwis1wj7qekjs-NP-16e3jcD8o0DfzKxB_PuPA4aBZzTxQNE-mo6t66JtDHVDq6wuEvfLswcbxXZDV22MeADmh4NYmsikRwIzcgjd1BI9hwUFnfzsd0L2zGMNxCMSW61OCI_evamTUzANuhSOf_ePuVcJgbAnHkwrs4n1FNTEzVTmLrvGKsFTB85sJhHBm5Ji7Wb4G")' }}
          ></div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-xl bg-gray-50 p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
          <div className="flex flex-[2_2_0px] flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[#101519] text-base font-bold leading-tight">Detailing Eksterior</p>
              <p className="text-[#5a778c] text-sm font-normal leading-normal">
                Perawatan eksterior untuk mengembalikan kilau mobil. Termasuk cuci premium, clay bar, poles, dan lapisan pelindung.
              </p>
            </div>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#e9eef1] text-[#101519] text-sm font-medium leading-normal w-fit"
            >
              <span className="truncate">Pesan Sekarang</span>
            </button>
          </div>
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCrAmzAnZ_fZ-BAbNbUymsbJass0QpyvaYz_oJ-eLm9qdSnBtydjH5BTZa2mEEFFQbs54yTCSpcbJWpSlTEO0fXaatWdD15GPRA6HuqNZz83Ia1I9MFKfUE5dhkZetLPQoP4GD2R7isBxsmDQs_9qnVfP8VvictWLR6wH4oa1PKfH92I83jIyziK954IWY0wmkyxBDdOSBHbRKCXv9A-mZQTtFg4qg_3E8dudYvjNwqyGbhpZzL_UVJWvvY4hAd_lVczRMdSGWsIw0t")' }}
          ></div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-xl bg-gray-50 p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
          <div className="flex flex-[2_2_0px] flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[#101519] text-base font-bold leading-tight">Paket Lengkap</p>
              <p className="text-[#5a778c] text-sm font-normal leading-normal">
                Perawatan menyeluruh untuk mobil Anda. Termasuk cuci premium, detailing interior dan eksterior, serta pemeriksaan kondisi umum.
              </p>
            </div>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#e9eef1] text-[#101519] text-sm font-medium leading-normal w-fit"
            >
              <span className="truncate">Pesan Sekarang</span>
            </button>
          </div>
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDl-AUzHTqmxAap9kP3toTivccxFB0-ZIXXfeDJmQ52eXoWqDgNLGJwSuAsQw1JZ5YOPfWrJfhxvh055Iw5YxKNjaMMpUXZ4iau4G4F7DYBhngpdEUZJorZF2Tp0R_wBPxK9lIe-apghEYKzZnk30FlTP9FjGLs0s4eohe-jh36GWyd39eW27OFeGFT7hLn29rp8jGtkKQoIKzG048GDATBqfRVH2x7s3yft0z3m3A2C14_-v7R2Abqcyo-DoJH1vJm5WJ0RHh1lwCF")' }}
          ></div>
        </div>
      </div>
    </>
  )
}

export default page