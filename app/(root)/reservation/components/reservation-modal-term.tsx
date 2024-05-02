import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ModalInfoBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalInfoBooking({ isOpen, onClose }: ModalInfoBookingProps) {
  console.log(isOpen);
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <AlertDialogContent className=" border-none rounded-md overflow-hidden radial-gradient-3 ">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-3xl font-black">
            Syarat dan <br /> Ketentuan Booking
          </AlertDialogTitle>
          <AlertDialogDescription className="text-justify w-full p-5 max-h-[400px] overflow-y-auto text-black">
            Merupakan tanggung jawab penyewa untuk membaca dan memahami Syarat dan Ketentuan
            Pemesananan ini, ketentuan-ketentuan lainnya yang dikeluarkan oleh Soccer Chief untuk
            memahami risiko, kewajiban dan tanggung jawab yang menyertainya. Soccer Chief tidak akan
            bertanggung jawab atas keterlambatan, kerugian, dan biaya yang timbul dari kelalaian dan
            kesalahan penyewa dalam memenuhi kewajiban-kewajiban penyewaan. Dengan melakukan
            penyewaan terhadap lapangan Soccer Chief, seorang penyewa dianggap telah membaca,
            memahami, menerima, dan setuju untuk terikat dengan Syarat dan Ketentuan Pemesananan dan
            Terms of Entry dari fasilitas yang relevan. Jika seorang penyewa tidak menyetujui Syarat
            dan Ketentuan Pemesananan, penyewa tidak boleh menggunakan manfaat yang terkait dengan
            penyewaan dan/atau memasuki fasilitas. 1. Definisi ●  Kegiatan berarti aktivitas yang
            dilakukan di Soccer Chief oleh Penyewa, baik dalam Event ataupun Game, yang sesuai
            dengan Syarat dan Ketentuan Pemesananan ini. ●  E-Booking berarti penyewaan elektronik
            yang dibuat oleh penyewa sesuai dengan Syarat dan Ketentuan Pemesananan ini. ●
             E-Confimation (Barcode) berarti konfirmasi elektronik yang dikeluarkan oleh Soccer
            Chief dari waktu ke waktu. Online Booking System (OBS) berarti sistem penyewaan online
            di www.soccerchief.co yang digunakan oleh penyewa untuk memesan fasilitas Soccer Chief.
            ●  Penyewa berarti individu atau kelompok yang memesan fasilitas untuk kegiatan ●  Event
            berarti suatu kegiatan yang bersifat komersil yang diselenggarakan oleh pihak
            penyelenggara untuk range waktu dari persiapan sampai pembongkaran. ●  Game berarti
            suatu kegiatan yang bersifat non-komersil dan biasanya kegiatan yang rutin dilakukan
            pada sesi tertentu. ●  Fasilitas mengacu pada salah satu fasilitas dan/atau fasilitas
            lain yang berlokasi di kawasan Soccer Chief. 2. Umum ●  Soccer Chief memiliki beberapa
            fasilitas yang tersedia untuk dipesan oleh penyewa. ●  Pemesanan dan penyewaan fasilitas
            mengakibatkan persetujuan penyewa untuk tunduk terhadap Syarat dan Ketentuan Pemesanan
            ini serta semua syarat dan ketentuan lainnya yang berlaku untuk fasilitas yang relevan.
            Penyewa harus meninjau Syarat dan Ketentuan Pemesanan dengan hati-hati karena membentuk
            perjanjian yang mengikat antara penyewa dan Soccer Chief. ● Syarat dan Ketentuan
            Pemesanan ini berhubungan dengan ketentuan lainnya sebagai berikut: ○  Kebijakan
            Perlindungan Data (Privacy Policy); Soccer Chief memahami dan menghormati kepentingan
            data pribadi dan keamanan penyewa yang sudah masuk kedalam OBS. Kebijakan keamanan data
            ini menjelaskan komitmen Soccer Chief dalam kerahasiaan dan keamanan data personal
            penyewa ketika mengunjungi situs web dan ketika memutuskan untuk menjadi penyewa. Soccer
            Chief mempunyai komitmen dalam menjaga kerahasiaan data pribadi penyewa dan tidak akan
            menyalahgunakan dan membagikan informasi pribadi penyewa dengan pihak manapun. Setiap
            informasi pribadi yang masuk kedalam sistem hanya akan dikirim ke OBS untuk diproses.
            Setiap informasi yang sudah dimasukkan akan disimpandalam OBS yang mana akandigunakan
            untuk memesan fasilitas dan juga untuk menghubungi penyewa jika diperlukan. Jika penyewa
            membatalkan pengisian informasi pribadi, data yang sudah dimasukkan akan menghilang
            secara otomatis. Dengan memberikan data sehubungan dengan penyewaan, penyewa dengan ini
            setuju bahwa penyewa telah membaca, memahami, dan setuju untuk terikat dengan Kebijakan
            Perlindungan Data Soccer Chief dan dengan ketentuan yang ditetapkan di sini. ○  Tata
            Tertib Penggunaan Fasilitas: Penyewa diwajibkan untuk mematuhi peraturan/tatatertib yang
            berlaku di fasilitas Soccer Chief terkait. Penyewa menggunakan fasilitas sesuai dengan
            peruntukan dan slot waktu yang telah disewa. Untuk mengakses fasilitas, semua penyewa
            harus membawa: ●  Konfirmasi cetak atau konfirmasi elektronik (Barcode); ●  Kartu
            Identitas Diri (KTP/SIM/ Data DiriLainnya); ○  Tata tertib mengakses fasilitas adalah
            sebagai berikut: Dilarang merusak fasilitas lapangan/gedung. Dilarang membuat
            keributan/kegaduhan. Dilarang membawa makanan dari luar kedalam arena. Dilarang membawa
            sound system, speaker, meja, kursi tambahan kedalam arena. Dilarang merokok di seluruh
            area fasilitas-fasiltas. Dilarang membawa minuman keras dan obat-obatan terlarang.
            Dilarang membawa senjata tajam, senjata api atau sejenisnya. Dilarang merusak
            interior/eksterior bangunan dan memindahkan fasilitas serta perlengkapan yang ada tanpa
            seizin unit terkait. Penyewa wajib mengosongkan dan mengembalikan fasilitas seperti
            sedia kala pada saat kegiatan berakhir. Kebersihan dan keamanan terhadap fasilitas yang
            disewa merupakan tanggung jawab penuh penyewa. Barang bawaan menjadi tanggung jawab
            masing-masing; segala bentuk kerusakan dan kehilangan di luar tanggung jawab Soccer
            Chief Ketika ada kecelakaan yang merenggut jiwa ataupun cidera di area Soccer Chief
            bukan tanggung jawab pihak Soccer Chief Dilarang menggunakan fasilitas untuk Politik
            Hitam/Black Campaign dan/atau penyimpangan/pemanfaatan Suku, Agama, Ras, dan Antar
            Golongan (SARA) dengan tujuan untuk kepentingan dan/atau menjatuhkan salah satu pihak.
            Dilarang membawa bahan-bahan kimia yang mudah terbakar/meledak. Apabila membawa kembang
            api, maka wajib mendapatkan persetujuan dari Unit Usaha terkait dan kepolisian terlebih
            dahulu. 3. Pemesanan ● Penyewa wajib memberikan informasi yang benar dan lengkap sesuai
            dokumen pribadi yang terbukti sah dan valid yang terdapat di OBS. Soccer Chief tidak
            bertanggung jawab apabila dokumen yang diberikan terbukti tidak sah dan valid (palsu).
            3. a) Untuk Game: ●  Penyewa wajib untuk melaksanakan pembayaran dengan cara transfer
            bank setelah dikeluarkannya tagihan (invoice). ●  Penyewa dapat menggunakan fasilitas
            jika melakukan pemesanan dan melunasi biaya sewa sesuai ketentuan. ●  Pihak penyewa
            tidak dibenarkan mengalihkan sewa penggunaan fasilitas sebagaimana yang diperjanjikan
            baik untuk sebagian maupun keseluruhan kepada pihak lain tanpa izin secara tertulis dari
            pihak Soccer Chief. 3. b) Untuk Event: ● Semua dokumen yang dijadikan sebagai syarat
            kelengkapan pemesanan wajib diunggah penyewa maksimal 1 (satu) hari sebelum
            penyelenggaraan event. Dokumen yang tidak dapat dilengkapi dengan alasan apapun akan
            dianggap kelalaian penyewa dan akan dikenakan sanksi sesuai ketentuan yang berlaku. ●
             Untuk pemesanan yang dilakukan lebih dari 7 (tujuh) hari kalender sebelum persiapan
            event: ○  PIHAK KEDUA wajib mengunduh Perjanjian, memparaf di setiap halaman dan
            ditandangani di atas materai oleh pihak yang berwenang. ○  Perjanjian yang telah di
            paraf di setiap halaman dan ditandatangani oleh PIHAK KEDUA, wajib dikirimkan kepada
            PIHAK PERTAMA dan telah diterima PIHAK PERTAMA dalam bentuk hard file paling lambat 8
            (delapan) hari kalender sebelum persiapan event. ●  Pemesanan ?7 (kurang dari sama
            dengan tujuh) hari kalender sebelum persiapan event: ○  PIHAK KEDUA wajib mengunduh
            Perjanjian, memparaf di setiap halaman dan ditandangani di atas materai oleh pihak yang
            berwenang. ○  Perjanjian yang telah diparaf di setiap halaman dan ditandatangani oleh
            PIHAK KEDUA wajib dikirimkan kepada PIHAK PERTAMA dan telah diterima PIHAK PERTAMA dalam
            bentuk hard file paling lambat 1 (satu) hari kalender sebelum persiapan event. ●  Soccer
            Chief berhak menolak perjanjian yang telah ditandatangani oleh penyewa apabila
            perjanjian diubah tidak sesuai dengan yang ada di OBS. ●  Penyewa wajib untuk
            melaksanakan pembayaran dengan cara transfer bank setelah dikeluarkannya tagihan
            (invoice). ●  Penyewa dapat menggunakan fasilitas jika melakukan pemesanan dan melunasi
            biaya sewa sesuai ketentuan. ●  Pihak penyewa tidak dibenarkan mengalihkan sewa
            penggunaan fasilitas sebagaimana yang diperjanjikan baik untuk sebagian maupun
            keseluruhan kepada pihak lain tanpa izin secara tertulis dari pihak Soccer Chief. ●
             Penyewa yang melakukan penambahan peralatan pada fasilitas setelah transaksi online
            atau di luar sistem online reservation, harus terlebih dahulu mendapat persetujuan
            secara tertulis dari Soccer Chief dan akan menjadi biaya yang akan ditagihkan melalui
            invoice baru dan akan menjadi bagian yang tidak terpisahkan dari Perjanjian dan menjadi
            alat bukti yang sah untuk melakukan penagihan dan pembayaran bagi Para Pihak yang wajib
            dibayarkan paling lambat 1 x 24 jam. 4. PembatalandanPengembalianUang ●  Soccer Chief
            berhak menentukan ketersediaan slot waktu/jadwal/venue yang tersedia dan dapat
            mengubah/memindahkan slot waktu/jadwal/venue dalam kondisi tertentu, yaitu : ○  Di mana
            terdapat kegiatan yang bersifat Nasional, Internasional, Kenegaraan dan Latihan Rutin; ○
             Force majure dan bila venue yang digunakan untuk event; ●  Jika penyewa memutuskan
            untuk membatalkan penyewaan karena alasan apapun atau tidak muncul di fasilitas pada
            saat hari pelaksanaan, akan berakibat pada tidak ada pengembalian uang dan pemesanan
            dianggap batal. Dalam kondisi tersebut Soccer Chief memutuskan untuk membatalkan
            penyewaan apapun, karena pelanggaran dalam Syarat dan Ketentuan Pemesananan ini, tidak
            ada pengembalian uang atau pemberitahuan sebelumnya dapat diberikan. 4. a) Untuk Event:
            ● Perubahan venue dan/atau waktu oleh penyewa dapat dilakukan secara offline dapat
            dilakukan dengan ketentuan sebagai berikut: ○ Perubahan hanya bisa dilakukan dalam tahun
            yang sama; atau perubahan hanya dapat dilakukan 3 (tiga) bulan sebelum atau setelah
            tanggal awal pemesanan; ○ Venue dan/atau waktu yang dinginkan masih tersedia; Hanya
            diperbolehkan untuk satu kali perubahan; ○ Uang muka yang telah dibayarkan menjadi milik
            Pihak Pertama; ○ Apabila harga venue dan/atau waktu perubahan yang dipesan harganya
            lebih rendah dari nominal yang telah dibayarkan penyewa, maka selisih harga tersebut
            tidak dapat dikembalikan namun selisih harga tersebut dapat dipakai untuk penambahan
            hari dan/atau fasilitas diluar paket yang diperjanjikan, dalam satu venue, yang akan
            dihitung secara proporsional dan ditagihkan kekurangannya. ●  Perubahan {">"}90 (lebih
            dari sembilan puluh) hari kalender sebelum event maka tidak dikenakan biaya perubahan. ●
             Perubahan 61 s/d 90 (enam puluh satu sampai dengan sembilan puluh) hari kalender
            sebelum event maka semua uang yang telah dibayarkan penyewa dikenakan biaya perubahan
            sebesar 25% (duapuluh lima persen). ●  Perubahan 31 s/d 60 (tiga puluh satu sampai
            dengan enam puluh) hari kalender sebelum event, maka semua uang yang telah dibayarkan
            penyewa dikenakan biaya perubahan sebesar 50% (lima puluh persen). ●  Perubahan {"<"} 30
            (kurang dari tiga puluh) hari kalender sebelum event, maka semua uang yang telah
            dibayarkan penyewa dikenakan biaya perubahan sebesar 100% (seratus persen). ●  Perubahan
            dikarenakan situasi pengamanan dari pemerintah tidak dikenakan biaya perubahan.
            Pembatalan venue dan/atau waktu event dikenakan biaya pembatalan dengan ketentuan: ○
             Jika{" >"} 90 (lebih dari sembilan puluh) hari kalender sebelum event maka semua uang
            yang telah dibayarkan penyewa dikenakan biaya pembatalan sebesar 10%. ○  Jika 61 s/d 90
            (enam puluh satu sampai dengan lebih dari sama dengan sembilan puluh) hari kalender
            sebelum event maka semua uang yang telah dibayarkan penyewa dikenakan biaya pembatalan
            sebesar 50%. ○  Jika 31 s/d 60 (tiga puluh satu sampai dengan enam puluh) hari kalender
            sebelum event, maka semua uang yang telah dibayarkan penyewa dikenakan biaya pembatalan
            sebesar 75%. ○  Jika {"<"} 30 (kurang dari tiga puluh) hari kalender sebelum event, maka
            semua uang yang telah dibayarkan penyewa dikenakan biaya pembatalan sebesar 100%. ○
             Jika perubahan atau pembatalan dikarenakan tidak dikeluarkannya surat izin keramaian
            dari POLRI, dengan syarat penyewa dapat membuktikan bahwa penolakan izin keramaiandari
            POLRI tersebut bukan disebabkan oleh kesalahan dan/atau kelalaian penyewa melainkan
            murni dari kebijakan POLRI dan diluar kendali penyewa, maka semua uang yang telah
            dibayarkan penyewa akan dikembalikan dengan ketentuan adanya Berita Acara yang
            ditandangani oleh Kepala Unit yang bersangkutan dan Penyewa. Apabila Penyewa tidak dapat
            membuktikan telah memberikan surat permohonan izin kermaian kepada POLRI, maka biaya
            pembatalan yang dikenakan mengikuti ketentuan sebagaimana huruf a, b, c, dan d. ●
             Pengembalian uang jaminan kerusakan akan dikembalikan paling lambat 14 (empat belas)
            hari kerja setelah dokumen lengkap dengan ketentuan: ●  Mengisi formulir pengembalian
            uang jaminan yang dilampirkan kuitansi pembayaran uang jaminan kerusakan; ●  Berita
            Acara Inventarisasi yang ditandatangani kedua belah pihak yang sudah dilakukan 1 (satu)
            hari sebelum dan 2 (dua) hari sesudah berakhirnya jangka waktu yang diperjanjikan; ●
             Apabila dalam jangka waktu yang telah ditentukan, Penyewa tidak menandatangani Berita
            Acara Inventarisasi maka penyewa dianggap menyetujui Berita Acara tersebut. ●  Apabila
            terjadi kerusakan dan/atau kotor (“kerugian”) maka uang jaminan dikurangi nilai kerugian
            ●  berdasarkan Berita Acara Inventarisasi. Apabila kerugian yang terjadi nilainya lebih
            besar dari pada jaminan yang diberikan, maka Penyewa berkewajiban untuk menanggung biaya
            kekurangannya. ●  Apabila masih terdapat tanggungan biaya penyewaan yang belum dilunasi
            oleh penyewa akibat adanya penambahan fasilitas setelah jangka waktu yang telah
            ditentukan, maka uang jaminan akan digunakan untuk melunasi kekurangan pembayaran biaya
            penyewaan. 5. FasilitasTambahandiLuarPaket(UntukEvent) ●  Tambahan-tambahan kebutuhan
            penyewa diluar online system dan/atau perjanjianakan menjadi tagihan tersendiri dan
            bagian yang tak terpisahkan dari kontrak antara Soccer Chief dengan penyewa. ●
             Kelebihan jam pemakaian dari slot waktu yang telah disepakati akan dikenakan tambahan
            sebesar 10% (sepuluh persen) dari tarif yang berlaku. 6. ForceMajeure(UntukEvent) ●
             Hal-hal yang termasuk keadaan kahar (force majeure) termasuk namun tidak terbatas pada
            peperangan, kerusuhan, revolusi, bencana alam (banjir, gempa bumi, badai, angin topan,
            gunung meletus, tanah longsor, dan wabah penyakit), pemogokan, kebakaran dan gangguan
            industri, tindakan pemerintah baik eksekutif, legislatif maupun yudikatif, yang
            mempengaruhi jalannya kegiatan. ●  Apabila salah satu pihak terkena salah satu kejadian
            tersebut di atas maka penyewa segera memberitahukan secara tertulis kepada pihak lainnya
            tentang penyebab dan akibatnya dalam jangka waktu 14 (empat belas) hari kalender. ●
             Dalam hal terjadi keadaan kahar, Para Pihak sepakat dalam waktu 5 (lima) hari kerja
            setelah diterimanya surat pemberitahuan, yang kemudian akan dituangkan dalam satu Berita
            Acara Keadaan Kahar. 7. Lain-Lain 7. a) Untuk Event) ●  Soccer Chief berhak menolak atau
            menghentikan pemesanan atau event yang dianggap janggal dengan cara yang Soccer Chief
            anggap benar atas kebijakannya sendiri dan mutlak. ●  Soccer Chief dapat menambahkan
            tambahan biaya jaminan, apabila menurut penilaian PIHAK PERTAMA suatu kegiatan
            dikategorikan memiliki resiko tinggi untuk terjadi kerusakan/pengrusakan pada aset
            Soccer Chief. 7. b) Untuk Event dan Game ●  Soccer Chief dapat mengambil tindakan hukum
            yang dianggap perlu terhadap siapa pun yang melanggar salah satu Syarat dan Ketentuan
            Pemesananan di atas. Sengketa dan klaim yang timbul dari hubungan Syarat dan Ketentuan
            Pemesananan, akan diselesaikan secara musyawarah dan mufakat. Apabila penyelesaian
            musyarawah dan mufakat tidak tercapai, maka akan diselesaikan melalui Pengadilan Negeri
            Jakarta Selatan. ●  Soccer Chief berhak untuk menentukan, menambah, menghapus, atau
            mengubah Syarat dan Ketentuan Pemesanan ini dari waktu ke waktu. Setiap perubahan akan
            tersedia di www..soccerchief.co ●  Dalam menggunakan fasilitas, penyewaakan: ○  Mengurus
            tempat dan peralatan dari fasilitas dan tidak akan menyebabkan kerusakan yang sama; ○
             Memastikan bahwa semua peralatan dikembalikan ke lokasi aslinya; ○  Bersikaplah dengan
            baik dan tidak mengganggu penyewalainnya dan penyewaan fasilitas oleh peserta. ●  Soccer
            Chief berhak untuk melarang menggunakan dan meninggalkan lokasi fasilitas disewa bagi
            penyewa yang bersikap sulit dan/atau tidak kooperatif, atau yang tindakannya dianggap
            tidak beralasan dan merugikan keselamatan penyewa/peserta. Keputusan Soccer Chief dalam
            hal ini adalah final dan Soccer Chief tidak akan diharuskan untuk melakukan pengembalian
            uang jika penyewa dianggap bertanggung jawab atas perilaku tersebut. ●  Penyewa harus
            mematuhi semua permintaan wajar yang dibuat oleh staf Soccer Chief. ●  Penyewa memahami
            bahwa mereka menggunakan fasilitas dan berpartisipasi dalam kegiatan dengan risiko
            mereka sendiri. Penyewa tidak akan menahan Soccer Chief dan/atau stafnya bertanggung
            jawab atas cedera atau kematian pribadi yang timbul dari penyewaan fasilitas atau
            partisipasi dalam kegiatan atau atas kehilangan atau kerusakan pada properti penyewa
            yang timbul dari partisipasi penyewa dalam kegiatan. ●  Penyewa akan bertanggung jawab
            atas segala kerusakan pada fasilitas atau bagian apapun termasuk pada perlengkapan,
            peralatan, atau properti lain di dalamnya. Penyewa akan membayar kerusakan apapun
            (termasuk kerusakan yang tidak disengaja) ke fasilitas yang disebabkan oleh tindakan
            atau kelalaian mereka sendiri, karyawan, agen, atau siapa pun yang diberi wewenang oleh
            penyewa untuk berada di lokasi. ●  Apabila Penyewa menggunakan fasilitas tidak sesuai
            peruntukannya yang disewa dan tidak mendapat izin secara tertulis dari Soccer Chief,
            Soccer Chief berhak menghentikan kegiatan serta membatalkan secara sepihak dan uang yang
            telah dibayarkan tidak dapat dikembalikan. ●  Penyewa akan menggunakan fasilitas sesuai
            dengan rincian dan waktu penyewaan mereka, dan akan mengosongkan fasilitas pada waktu
            berakhirnya waktu penyewaan mereka. ●  Soccer Chief tidak akan bertanggung jawab atas
            properti pribadi penyewa dengan cara apapun selama periode penyewaan. ●  Soccer Chief
            berhak untuk menutup fasilitas atau bagian apapun di dalamnya, untuk alasan apapun,
            termasuk tanpa batasan, keadaan di luar kendali ●  Soccer Chief atau demi keamanan
            publik atau penutupan diperintahkan oleh pihak berwenang, dengan atau tanpa
            pemberitahuan sebelumnya. Soccer Chief tidak akan bertanggung jawab apapun sehubungan
            dengan pembatalan tersebut. Keputusan Soccer Chief bersifat final dan konklusif. ●
             Soccer Chief berhak untuk mengubah atau menyertakan ketentuan tambahan untuk
            pelaksanaan kegiatan apapun di fasilitas jika dianggap perlu. ●  Soccer Chief berhak
            untuk mengambil tindakan yang dianggap perlu apabila penyewa tidak mematuhi Syarat dan
            Ketentuan yang telah ditetapkan. ●  Tarif dapat berubah sewaktu-waktu sesuai kebijakan
            manajemen Soccer Chief. ●  Pada saat penggunaan lapangan terjadi pemadaman lampu
            dan/atau listrik maka kegiatan latihan atau pertandingan akan dijadwalakan ulang.
            Apabila penggunaan lapangan yg sudah melebihi 1⁄2 (setengah) sesi, maka dianggap selesai
            tanpa adanya jadwal ulang. ●  Penyewa agar membawa Tim Medis Kesehatan untuk kegiatan
            Event maupun Game yang melibatkan banyak peserta.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="p-5">
          <AlertDialogCancel className="w-full ">Tutup</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
