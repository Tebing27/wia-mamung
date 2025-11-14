// Import local images
import umkm1 from "../assets/umkm1.webp";
import umkm2 from "../assets/umkm2.png";
import umkm3 from "../assets/umkm3.jpg";
import umkm4 from "../assets/umkm4.jpg";
import umkm5 from "../assets/umkm5.jpg";
import umkm6 from "../assets/umkm6.jpg";
import umkm7 from "../assets/umkm7.jpg";
import umkm8 from "../assets/umkm8.jpg";
import umkm9 from "../assets/umkm9.jpg";
import umkm10 from "../assets/umkm10.jpg";

// TypeScript types for UMKM data
export interface UmkmData {
  id: number;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  address?: string;
  license?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  website?: string;
  phone?: string;
  mapsUrl?: string;
  latitude: number;
  longitude: number;
  color: string;
  featured?: boolean; // For hero section carousel
}

export interface Category {
  value: string;
  label: string;
}

// Available categories
export const categories: Category[] = [
  { value: "Semua", label: "Semua Kategori" },
  { value: "Kuliner", label: "Kuliner" },
  { value: "Fashion", label: "Fashion" },
  { value: "Perdagangan", label: "Perdagangan" },
  { value: "Jasa", label: "Jasa" },
];

// UMKM data with coordinates (example coordinates around Jakarta/Depok area)
export const umkmList: UmkmData[] = [
  {
    id: 1,
    name: "Bunbun Cemilan Sehat",
    category: "Kuliner",
    description:
      "Dimsum, Salad buah, Asinan nanas, Kuah lemon, dll. 🌱 Always Fresh | 👌 Halal F&B | 📌 Keep in refrigerator | 🎁 Jabodetabek | Order DM",
    imageUrl: umkm8,
    address:
      "Vila Rizki Ilhami 2 Blok RA no. 18A, Pengasinan, Sawangan, Depok City, West Java 16518",
    license: "SIUP, Sertifikasi Halal MUI",
    instagram: "bunbuncemilansehat",
    facebook: "bunbuncemilansehat",
    tiktok: "bunbuncemilansehat",
    website: "bunbuncemilansehat.com",
    phone: "081285295547",
    mapsUrl:
      "https://www.google.com/maps/place/Beeu+Kopi+X+Bunbun+Cemilan+Sehat/@-6.4085202,106.7494413,17z/data=!4m6!3m5!1s0x2e69e914525565d7:0xe8ff2be543f7cb27!8m2!3d-6.4084941!4d106.7495789!16s%2Fg%2F11q_7p40wl?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D", // Replace with actual Google Maps link
    latitude: -6.40843,
    longitude: 106.74957,
    color: "#EF4444", // red
  },
  {
    id: 2,
    name: "Akaya Homemade",
    category: "Kuliner",
    description:
      "Minuman Jus Kedondong Kiamboy, Snack Ranting Keju, Cookies, Cake, Asinan Sayur +buah, Bubur jongkong",
    imageUrl: umkm9,
    address:
      "BSI 2 Jl Garuda Blok C4 No 70 Rt 4 Rw10 Kel Pengasinan, Sawangan. Depok 16518",
    license: "PIRT DEPKES",
    instagram: "akaya_homemade",
    facebook: "akaya homemade",
    tiktok: "akayahomemade",
    website: "akayahomemade.com",
    phone: "081383691202",
    mapsUrl:
      "https://www.google.com/maps/place/Akaya_Homemade/@-6.4250986,106.7518071,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69e904bfddc265:0xfad5b1d0d64c95a8!8m2!3d-6.4250986!4d106.7566834!16s%2Fg%2F11fsp0h1rr?entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D",
    latitude: -6.42498,
    longitude: 106.75666,
    color: "#3B82F6", // blue
  },
  {
    id: 3,
    name: "Dapoer Melyza",
    category: "Kuliner",
    description: "Catering, Penyetan Ayam, Lele dan Ikan nila, Snack Box",
    imageUrl: umkm10,
    address:
      "BSI 2 Blok B2C Rt05 Rw.09 No.47, Pengasinan, Kec. Sawangan, Kota Depok, Jawa Barat 16518",
    license: "SIUP, IUMK, NIB",
    instagram: "fera_meilvira",
    facebook: "fera.melvira.5",
    tiktok: "fera_meilvira",
    website: "ferameilvira.com",
    phone: "082213920247",
    mapsUrl:
      "https://www.google.com/maps/place/Dapoer+Melyza/@-6.4213044,106.7556127,17z/data=!4m15!1m8!3m7!1s0x2e69e99e6be66ea5:0x5c21d6c614c57cde!2sDapoer+Melyza!8m2!3d-6.4213533!4d106.7556158!10e9!16s%2Fg%2F11lthkpfhs!3m5!1s0x2e69e99e6be66ea5:0x5c21d6c614c57cde!8m2!3d-6.4213533!4d106.7556158!16s%2Fg%2F11lthkpfhs?entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D",
    latitude: -6.42117,
    longitude: 106.75563,
    color: "#F59E0B", // yellow
  },
  {
    id: 4,
    name: "Saung Icip",
    category: "Kuliner",
    description:
      "Warung makan dengan menu favorit seperti Bakso, Mie ayam, Es Oyen dan berbagai menu lainnya. Tempat nyaman untuk makan bersama keluarga.",
    imageUrl: umkm1,
    address:
      "Jl. Pengasinan, Kp. Kebon Kopi, RT 04/06, Kel. Pengasinan, Kec. Sawangan, Kota Depok.",
    license: "IUMK",
    instagram: "saungicip",
    facebook: "Saung Icip",
    tiktok: "saungicip",
    website: "saungicip.com",
    phone: "089681733955",
    mapsUrl: "https://maps.app.goo.gl/HjZyKmQA9cB3z2Pp9",
    latitude: -6.41855,
    longitude: 106.75305,
    color: "#10B981", // green
    featured: true, // Mark as featured for hero section
  },
  {
    id: 5,
    name: "Alesha Kuliner",
    category: "Kuliner",
    description:
      "Dessert Homemade dengan berbagai pilihan: Singkong thailand, Ketan durian, Ketan srikaya, Dessert pandan, Ketan mangga. Semua dibuat fresh setiap hari.",
    imageUrl: umkm2,
    address:
      "Jl. Raya Pengasinan Kel No.18, RT.2/RW.7, Pengasinan, Kec. Sawangan, Kota Depok, Jawa Barat 16518",
    license: "SIUP, IUMK",
    instagram: "hayatun_nufushn",
    facebook: "aleshakuliner",
    tiktok: "aleshakuliner",
    website: "aleshakuliner.com",
    phone: "081219978322",
    mapsUrl:
      "https://www.google.com/maps/place/Alesha+Kuliner/@-6.4146856,106.751491,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69e900211a939b:0x8b142319845e6c7f!8m2!3d-6.4146856!4d106.7540713!16s%2Fg%2F11lv4_tcl_?entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D",
    latitude: -6.41454,
    longitude: 106.75401,
    color: "#8B5CF6", // purple
    featured: true,
  },
  {
    id: 6,
    name: "Jajanan Korea",
    category: "Kuliner",
    description:
      "Spesialis jajanan Korea authentic: Rapoki (ramen topoki), Topoki, Sate odeng, Kimbab, Dimsum. Rasa original Korea dengan harga lokal.",
    imageUrl: umkm3,
    address:
      "Kamila Regency, Pengasinan, Kavling No. 6, RT 001 RW 007, Kelurahan Pengasinan, Kecamatan Sawangan, Kota Depok.",
    license: "NIB",
    instagram: "doktertopoki",
    facebook: "jajanankorea",
    tiktok: "jajanankorea",
    website: "jajanankorea.com",
    mapsUrl:
      "https://www.google.com/maps/place/KAMILA+REGENCY+PENGASINAN/@-6.4122965,106.7536959,20.55z/data=!4m6!3m5!1s0x2e69e91ad9f94e5b:0x7237b20e6e4bc754!8m2!3d-6.4122121!4d106.7538988!16s%2Fg%2F11ptlkgbtz?entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D",
    phone: "089512203392",
    latitude: -6.41219,
    longitude: 106.75388,
    color: "#EC4899", // pink
    featured: true,
  },
  {
    id: 7,
    name: "Ucuynoel Store",
    category: "Fashion",
    description:
      "Toko fashion lengkap dengan koleksi baju, celana, sendal, dan sepatu untuk pria dan wanita. Harga terjangkau dengan kualitas terbaik.",
    imageUrl: umkm4,
    address:
      "Jl. Raya Muchtar, Sawangan Baru, Kec. Sawangan, Kota Depok, Jawa Barat 16511",
    license: "SIUP",
    instagram: "ucuynoel.store",
    facebook: "ucuynoel",
    tiktok: "ucuynoel",
    website: "ucuynoel.com",
    phone: "082219004720",
    mapsUrl:
      "https://www.google.com/maps/place/Ucuynoel+Store/@-6.4034481,106.7652228,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69e98cf23fd71f:0xbb519cb4e163e94b!8m2!3d-6.4034481!4d106.7678031!16s%2Fg%2F11j3rf55qm?entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D",
    latitude: -6.40319,
    longitude: 106.76766,
    color: "#06B6D4", // cyan
    featured: true,
  },
  {
    id: 8,
    name: "Reni Bakery",
    category: "Kuliner",
    description:
      "Harga lebih hemat, Rasa lebih nikmat & Lebih Lengkap. Bersertifikasi Halal",
    imageUrl: umkm7,
    address:
      "bumi sawangan indah 2, Jl. Kutilang 11 No.75, Pengasinan, Kec. Sawangan, Kota Depok, Jawa Barat 16518",
    license: "PIRT DEPKES",
    instagram: "rr_bakery._",
    facebook: "Reni Bakery",
    tiktok: "renibakery",
    website: "renibakery.com",
    phone: "085711624656",
    mapsUrl:
      "https://www.google.com/maps/place/Reni+bakery/@-6.4287064,106.7607076,19.29z/data=!4m6!3m5!1s0x2e69e91e3edbf719:0xf346702273a980e3!8m2!3d-6.4286941!4d106.761008!16s%2Fg%2F11qgfjcyj_?entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D",
    latitude: -6.42868,
    longitude: 106.76099,
    color: "#FBBF24", // amber
  },
  {
    id: 9,
    name: "Nasi Liwet Lavanda",
    category: "Kuliner",
    description:
      "Kami hadir dengan kelezatan liwet khas tradisional yang disajikan dengan cinta. Temukan pengalaman makan yang tak terlupakan dengan berbagai pilihan menu favorit untuk Anda dan keluarga.",
    imageUrl: umkm5,
    address:
      "Jl. Panda IV Jl. Cikarang Baru Raya No.41 Blok D4, Jayamukti, Kec. Cikarang Pusat, Kabupaten Bekasi, Jawa Barat 17530",
    license: "SIUP, IUMK",
    instagram: "@lavandanasiliwet",
    facebook: "rm.nasiliwetlavanda",
    website: "nasiliwetlavanda.com",
    phone: "082123602168",
    mapsUrl:
      "https://www.google.com/maps/place/Nasi+Liwet+Lavanda+-+Jayamukti/@-6.3169147,107.1617895,18z/data=!4m12!1m5!3m4!2zNsKwMTgnNTguMSJTIDEwN8KwMDknNDYuNCJF!8m2!3d-6.3161389!4d107.1628889!3m5!1s0x2e699bab28de03a9:0xd6e84ab22894cb4d!8m2!3d-6.3164029!4d107.1627937!16s%2Fg%2F11h6tkcz0p?entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D",
    latitude: -6.31637,
    longitude: 107.1628,
    color: "#FBBF24", // amber
    featured: true,
  },
  {
    id: 10,
    name: "Warung Kopi Warisan",
    category: "Kuliner",
    description: "Warung kopi dengan menu yang modern dan harga murah meriah.",
    imageUrl: umkm6,
    address:
      "Jl. Telaga Harapan Raya, Kalijaya, Kec. Cikarang Barat, Kabupaten Bekasi, Jawa Barat",
    license: "SIUP, IUMK",
    instagram: "warkop.warisan",
    facebook: "Warkop Warisan",
    website: "warkowar.com",
    phone: "081210638373",
    mapsUrl:
      "https://www.google.com/maps/place/Warkowar+(Warkop+Warisan)/@-6.2596199,107.1247417,21z/data=!4m6!3m5!1s0x2e6985001acea361:0xc2558381cd32db8e!8m2!3d-6.2595913!4d107.1246758!16s%2Fg%2F11yl0brdg_?entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D",
    latitude: -6.25957,
    longitude: 107.12647,
    color: "#006effff", // amber
    featured: true,
  },
];

// Helper function to get UMKM by ID
export const getUmkmById = (id: number): UmkmData | undefined => {
  return umkmList.find((umkm) => umkm.id === id);
};

// Helper function to get UMKM by category
export const getUmkmByCategory = (category: string): UmkmData[] => {
  if (category === "Semua") return umkmList;
  return umkmList.filter((umkm) => umkm.category === category);
};

// Helper function to search UMKM
export const searchUmkm = (query: string): UmkmData[] => {
  const lowerQuery = query.toLowerCase();
  return umkmList.filter(
    (umkm) =>
      umkm.name.toLowerCase().includes(lowerQuery) ||
      umkm.category.toLowerCase().includes(lowerQuery) ||
      umkm.description.toLowerCase().includes(lowerQuery)
  );
};

// Helper function to get featured UMKM for hero section
export const getFeaturedUmkm = (): UmkmData[] => {
  return umkmList.filter((umkm) => umkm.featured === true);
};
