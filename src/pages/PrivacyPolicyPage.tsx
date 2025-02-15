const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Kebijakan Privasi</h1>
        
        <div className="prose max-w-none space-y-6 text-gray-700">
          <p>
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Pendahuluan</h2>
          <p>
            Super Web menghargai privasi pengguna dan berkomitmen untuk melindungi informasi pribadi yang Anda berikan.
            Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Informasi yang Kami Kumpulkan</h2>
          <p>Kami mengumpulkan informasi berikut:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nama dan alamat email (saat memberikan komentar)</li>
            <li>Informasi penggunaan website</li>
            <li>Cookie dan data analytics</li>
            <li>Informasi perangkat dan browser</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Penggunaan Informasi</h2>
          <p>Informasi yang kami kumpulkan digunakan untuk:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Menyediakan dan mengelola layanan kami</li>
            <li>Meningkatkan pengalaman pengguna</li>
            <li>Mengirim pembaruan dan informasi penting</li>
            <li>Analisis dan pengembangan website</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Perlindungan Data</h2>
          <p>
            Kami mengimplementasikan berbagai tindakan keamanan untuk melindungi informasi Anda, termasuk:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Enkripsi data</li>
            <li>Akses terbatas ke informasi pribadi</li>
            <li>Pemantauan keamanan reguler</li>
            <li>Backup data berkala</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Cookies</h2>
          <p>
            Kami menggunakan cookies untuk meningkatkan pengalaman pengguna. Anda dapat mengatur browser Anda untuk menolak
            cookies, namun hal ini mungkin mempengaruhi fungsionalitas website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Hak Pengguna</h2>
          <p>Anda memiliki hak untuk:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mengakses informasi pribadi Anda</li>
            <li>Meminta koreksi informasi yang tidak akurat</li>
            <li>Meminta penghapusan informasi</li>
            <li>Menolak penggunaan informasi untuk tujuan tertentu</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Perubahan Kebijakan</h2>
          <p>
            Kami berhak mengubah kebijakan privasi ini sewaktu-waktu. Perubahan akan diumumkan melalui website dan
            berlaku sejak tanggal publikasi.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Kontak</h2>
          <p>
            Untuk pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email: privacy@Super Web.com</li>
            <li>Telepon: (021) 1234-5678</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
