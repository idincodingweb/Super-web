const DisclaimersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Disclaimers</h1>
        
        <div className="prose max-w-none space-y-6 text-gray-700">
          <p>
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Informasi Umum</h2>
          <p>
            Informasi yang disediakan di Super Web ditujukan untuk tujuan umum dan edukasi semata. Konten yang
            dipublikasikan tidak dimaksudkan sebagai saran profesional atau rekomendasi spesifik.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Akurasi Informasi</h2>
          <p>
            Meski kami berusaha menyediakan informasi yang akurat dan terkini, kami tidak menjamin bahwa semua
            informasi selalu akurat, lengkap, atau relevan untuk kebutuhan Anda. Pengguna disarankan untuk:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Melakukan verifikasi independen terhadap informasi yang diberikan</li>
            <li>Berkonsultasi dengan profesional yang relevan sebelum mengambil keputusan penting</li>
            <li>Menggunakan penilaian sendiri dalam menginterpretasi informasi</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Tautan Eksternal</h2>
          <p>
            Website kami mungkin memuat tautan ke website pihak ketiga. Kami tidak bertanggung jawab atas:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Konten website pihak ketiga</li>
            <li>Kebijakan privasi website pihak ketiga</li>
            <li>Kerugian yang timbul dari penggunaan website pihak ketiga</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Hak Cipta dan Penggunaan Konten</h2>
          <p>
            Seluruh konten di Super Web dilindungi hak cipta. Pengguna tidak diperkenankan:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Menyalin atau mendistribusikan konten tanpa izin</li>
            <li>Memodifikasi konten untuk tujuan komersial</li>
            <li>Menggunakan konten dengan cara yang melanggar hukum</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Batasan Tanggung Jawab</h2>
          <p>
            Super Web tidak bertanggung jawab atas:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Kerugian langsung atau tidak langsung dari penggunaan website</li>
            <li>Gangguan atau ketidaktersediaan layanan</li>
            <li>Kesalahan atau kelalaian dalam konten</li>
            <li>Virus atau malware yang mungkin ditransmisikan</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Komentar Pengguna</h2>
          <p>
            Komentar yang diberikan oleh pengguna merupakan pendapat pribadi dan tidak mencerminkan pandangan
            Super Web. Kami berhak menghapus komentar yang:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mengandung konten ofensif atau melanggar hukum</li>
            <li>Berisi spam atau iklan tidak sah</li>
            <li>Melanggar hak cipta atau hak kekayaan intelektual</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Perubahan</h2>
          <p>
            Kami berhak mengubah disclaimer ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Pengguna
            disarankan untuk memeriksa halaman ini secara berkala untuk mengetahui perubahan.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Hukum yang Berlaku</h2>
          <p>
            Disclaimer ini tunduk pada hukum yang berlaku di Indonesia. Setiap perselisihan yang timbul akan
            diselesaikan melalui yurisdiksi pengadilan Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimersPage;
