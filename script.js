// Film data
const films = [
  {
    title: "The Grand Adventure",
    genre: "Petualangan",
    rating: "★★★★☆",
    description: "Sebuah petualangan epik yang membawa penonton ke dunia penuh misteri dan keajaiban.",
    poster: "img/grand-adventure.jpg",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Romance in Paris",
    genre: "Romantis",
    rating: "★★★★☆",
    description: "Kisah cinta yang mengharukan berlatar belakang kota romantis Paris.",
    poster: "img/romance-paris.jpg",
    trailerUrl: "https://www.youtube.com/embed/nlJtD7jMzuk"
  },
  {
    title: "Galactic Empire",
    genre: "Sci-Fi",
    rating: "★★★☆☆",
    description: "Perang antarbintang dan perjuangan mempertahankan kekaisaran galaksi.",
    poster: "img/galactic-empire.jpg",
    trailerUrl: "https://www.youtube.com/embed/Uu6MDdxBork"
  },
  {
    title: "Hidden Truth",
    genre: "Misteri",
    rating: "★★★★☆",
    description: "Mengungkap rahasia tersembunyi di balik kematian seorang tokoh penting.",
    poster: "img/hidden-truth.jpg",
    trailerUrl: "https://www.youtube.com/embed/abcdef12345"
  },
];

// Fungsi cari film dari navbar search
function searchFilm() {
  const keyword = document.getElementById("search").value.toLowerCase();
  if (!keyword) return alert("Masukkan kata kunci pencarian!");
  alert(`Fitur pencarian sedang dalam pengembangan. Anda mencari: "${keyword}"`);
}

// Filter genre
function filterGenre() {
  const genre = document.getElementById("genre-filter").value;
  const filmElements = document.querySelectorAll(".film-list-vertikal .film-card");

  filmElements.forEach(film => {
    if (genre === "all" || film.getAttribute("data-genre") === genre) {
      film.style.display = "flex";
    } else {
      film.style.display = "none";
    }
  });
}

// Modal login
function openLogin() {
  document.getElementById("login-modal").style.display = "block";
}
function closeLogin() {
  document.getElementById("login-modal").style.display = "none";
}
window.onclick = function (event) {
  const modal = document.getElementById("login-modal");
  if (event.target === modal) {
    closeLogin();
  }
}

// GET PARAMS
function getQueryParams() {
  const params = {};
  window.location.search.substring(1).split("&").forEach(pair => {
    const [key, value] = pair.split("=");
    params[key] = decodeURIComponent(value || "");
  });
  return params;
}

// Tampilkan detail film
function tampilkanDetailFilm() {
  const params = getQueryParams();
  const judul = params.title || "";
  if (!judul) return;

  const film = films.find(f => f.title.toLowerCase() === judul.toLowerCase());
  if (!film) {
    document.getElementById("film-detail").innerHTML = "<p>Film tidak ditemukan.</p>";
    return;
  }

  document.getElementById("judul-film").textContent = film.title;
  document.getElementById("poster-film").src = film.poster;
  document.getElementById("poster-film").alt = "Poster " + film.title;
  document.getElementById("genre-film").textContent = film.genre;
  document.getElementById("rating-film").textContent = film.rating;
  document.getElementById("deskripsi-film").textContent = film.description;
  if (film.trailerUrl && document.getElementById("trailer-film")) {
    document.getElementById("trailer-film").src = film.trailerUrl;
  }

  loadKomentar(film.title);
}

// Komentar pakai localStorage
function getKomentarKey(title) {
  return "komentar_" + title.replace(/\s+/g, "_").toLowerCase();
}

function loadKomentar(title) {
  const komentarList = document.getElementById("list-komentar");
  komentarList.innerHTML = "";

  const komentarKey = getKomentarKey(title);
  let komentarData = localStorage.getItem(komentarKey);
  komentarData = komentarData ? JSON.parse(komentarData) : [];

  if (komentarData.length === 0) {
    komentarList.innerHTML = "<p>Belum ada komentar.</p>";
    return;
  }

  komentarData.forEach(komen => {
    const div = document.createElement("div");
    div.className = "komentar-item";
    div.innerHTML = `
      <div class="nama-komentar"><strong>${escapeHtml(komen.nama)}</strong></div>
      <div class="isi-komentar">${escapeHtml(komen.isi)}</div>
    `;
    komentarList.appendChild(div);
  });
}

function tambahKomentar() {
  const namaInput = document.getElementById("nama-komentar");
  const isiInput = document.getElementById("isi-komentar");
  const params = getQueryParams();
  const title = params.title;

  if (!title) return alert("Film tidak ditemukan.");

  const komentarKey = getKomentarKey(title);
  let komentarData = localStorage.getItem(komentarKey);
  komentarData = komentarData ? JSON.parse(komentarData) : [];

  komentarData.push({
    nama: namaInput.value.trim(),
    isi: isiInput.value.trim(),
  });

  localStorage.setItem(komentarKey, JSON.stringify(komentarData));

  namaInput.value = "";
  isiInput.value = "";

  loadKomentar(title);
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Eksekusi saat halaman detail dimuat
if (window.location.pathname.endsWith("film.html")) {
  window.onload = tampilkanDetailFilm;
}
