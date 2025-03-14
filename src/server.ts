import app from "./app"; // Mengimpor aplikasi dari app.ts
import dotenv from "dotenv";

// Memuat variabel lingkungan dari file .env
dotenv.config();

// Mengambil port dari environment atau menggunakan 3000 jika tidak ada
const PORT = process.env.PORT || 3000;

// Menjalankan server di port yang telah ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
