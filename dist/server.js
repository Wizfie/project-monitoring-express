"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app")); // Mengimpor aplikasi dari app.ts
const dotenv_1 = __importDefault(require("dotenv"));
// Memuat variabel lingkungan dari file .env
dotenv_1.default.config();
// Mengambil port dari environment atau menggunakan 3000 jika tidak ada
const PORT = process.env.PORT || 3000;
// Menjalankan server di port yang telah ditentukan
app_1.default.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
