// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyByMeC-9rQlygbQ6JHjbsSwnFzAwQe_Kvw",
  authDomain: "enggal-jaya.firebaseapp.com",
  databaseURL: "https://enggal-jaya-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "enggal-jaya",
  storageBucket: "enggal-jaya.firebasestorage.app",
  messagingSenderId: "280949878033",
  appId: "1:280949878033:web:7f5d8ec30540a78aac70b0"
};

// Tunggu sampai dokumen dimuat
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Inisialisasi Firebase
    if (typeof firebase !== 'undefined') {
      // Inisialisasi Firebase hanya jika belum diinisialisasi
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      // Referensi ke database
      const visitorCountRef = firebase.database().ref('visitorCount');

      // Fungsi untuk menambah jumlah pengunjung (hanya di halaman home)
      function incrementVisitorCount() {
        try {
          // Dapatkan nama file halaman saat ini
          const path = window.location.pathname;
          const currentPage = path.split('/').pop() || 'index.html';
          
          // Hanya tambah counter jika halaman saat ini adalah index.html
          // atau root path (/) atau halaman utama dengan nama domain saja
          if (currentPage === 'index.html' || currentPage === '' || path === '/') {
            console.log('Halaman home terdeteksi, menambah counter pengunjung');
            visitorCountRef.transaction((currentCount) => {
              return (currentCount || 0) + 1;
            }).catch(error => {
              console.error('Error saat menambah counter:', error);
            });
          } else {
            console.log('Bukan halaman home, tidak menambah counter');
          }
        } catch (error) {
          console.error('Error saat mendeteksi halaman:', error);
        }
      }

      // Fungsi untuk menampilkan jumlah pengunjung (di semua halaman)
      function displayVisitorCount() {
        visitorCountRef.on('value', (snapshot) => {
          try {
            const count = snapshot.val() || 0;
            const counterElement = document.getElementById('visitor-count');
            if (counterElement) {
              counterElement.textContent = count;
            }
          } catch (error) {
            console.error('Error saat menampilkan counter:', error);
          }
        }, (error) => {
          console.error('Error saat membaca data counter:', error);
        });
      }

      // Panggil fungsi-fungsi
      incrementVisitorCount(); // Hanya menambah counter di halaman home
      displayVisitorCount();   // Menampilkan counter di semua halaman
    } else {
      console.error('Firebase SDK belum dimuat dengan benar');
    }
  } catch (error) {
    console.error('Error saat inisialisasi visitor counter:', error);
  }
}); 