const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Tentang Super Web</h1>
        
        <div className="prose max-w-none space-y-6 text-gray-700">
          <p>
            Super Web adalah platform konten digital yang didedikasikan untuk menyajikan artikel-artikel berkualitas tinggi
            kepada pembaca Indonesia. Didirikan pada tahun 2024, kami berkomitmen untuk menjadi sumber informasi terpercaya
            yang menginspirasi dan mendidik.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Visi Kami</h2>
          <p>
            Menjadi platform konten digital terdepan di Indonesia yang memberikan wawasan berharga dan menginspirasi jutaan
            pembaca melalui konten berkualitas.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Misi Kami</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Menyajikan konten berkualitas tinggi yang informatif dan menginspirasi</li>
            <li>Membangun komunitas pembaca yang aktif dan engaged</li>
            <li>Mendukung perkembangan literasi digital di Indonesia</li>
            <li>Menjadi wadah bagi penulis berbakat untuk berbagi pengetahuan</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Tim Kami</h2>
          <p>
            Super Web dijalankan oleh tim profesional yang passionate di bidang konten digital, teknologi, dan pendidikan.
            Kami terdiri dari editor berpengalaman, penulis berbakat, dan teknologi handal yang berkomitmen untuk
            memberikan pengalaman terbaik bagi pembaca.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Nilai-Nilai Kami</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Kualitas: Mengutamakan konten berkualitas tinggi</li>
            <li>Integritas: Menjunjung tinggi kejujuran dan transparansi</li>
            <li>Inovasi: Terus berinovasi dalam penyajian konten</li>
            <li>Kolaborasi: Membangun kerjasama yang bermanfaat</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Hubungi Kami</h2>
          <p>
            Kami selalu terbuka untuk saran, kritik, dan kolaborasi yang membangun. Jangan ragu untuk menghubungi kami
            melalui:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email: info@Super Web.com</li>
            <li>Telepon: (021) 1234-5678</li>
            <li>Alamat: Karawang, Indonesia</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
