
// Müzik kartlarını oluşturma fonksiyonu
function createMusicCard({ title, image, genre, audio, artist }) {
  const container = document.getElementById('music-cards');

  const colDiv = document.createElement('div');
  colDiv.className = 'col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5';
  colDiv.setAttribute('data-genre', genre);
  colDiv.setAttribute('data-artist', artist);

  const figure = document.createElement('figure');
  figure.className = 'effect-ming tm-video-item';

  const img = document.createElement('img');
  img.src = image;
  img.alt = title;
  img.className = 'img-fluid';

  const figcaption = document.createElement('figcaption');
  figcaption.className = 'd-flex align-items-center justify-content-center';

  const h2 = document.createElement('h2');
  h2.innerText = title;

  const link = document.createElement('a');
  link.href = '#'; // Sayfayı yenilemesin
  link.innerText = 'View more';
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini önle
    openMusicModal({ title, artist, image, audio }); // Detay kutusunu aç
  });


  // 🎧 Ses dosyası
  const audioElement = document.createElement('audio');
  audioElement.src = audio; // ses dosyası
  audioElement.preload = 'auto'; // hızlı yükleme
  audioElement.classList.add('d-none'); // görünmez

  // 🎯 Hover ile çalma/durdurma
  figure.addEventListener('mouseenter', () => {
    audioElement.currentTime = 0;
    audioElement.play();
  });

  figure.addEventListener('mouseleave', () => {
    audioElement.pause();
    audioElement.currentTime = 0;
  });

  figcaption.appendChild(h2);
  figcaption.appendChild(link);

  figure.appendChild(img);
  figure.appendChild(figcaption);
  figure.appendChild(audioElement); // ses ekleniyor

  colDiv.appendChild(figure);
  container.appendChild(colDiv);
}


// Tür filtreleme
function filterGenre(selectedGenre) {
  const cards = document.querySelectorAll('#music-cards > div');

  cards.forEach(card => {
    const genre = card.getAttribute('data-genre');
    if (selectedGenre === 'hepsi' || genre === selectedGenre) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterBySearch(query) {
  const cards = document.querySelectorAll('#music-cards .col-xl-3');

  cards.forEach(card => {
    const title = card.querySelector('h2')?.textContent.toLowerCase() || '';
    const artist = card.getAttribute('data-artist')?.toLowerCase() || '';

    if (title.startsWith(query) || artist.startsWith(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const query = document.getElementById('search-input').value.toLowerCase().trim();

  filterBySearch(query);
});
//Anlık arama
document.getElementById('search-input').addEventListener('input', function () {
  const query = this.value.toLowerCase().trim();
  filterBySearch(query);
});


// Favori şarkıları yönetme
// LocalStorage'ta favori kontrolü ve toggle işlemi
const favBtn = document.querySelector('#music-modal .fav-btn');

function isFavorited(title) {
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  return favs.some(song => song.title === title);
}

function toggleFavorite(song) {
  let favs = JSON.parse(localStorage.getItem('favorites') || '[]');

  const index = favs.findIndex(s => s.title === song.title);
  if (index > -1) {
    favs.splice(index, 1);
    favBtn.classList.remove('active');
    favBtn.textContent = '🤍';
  } else {
    favs.push(song);
    favBtn.classList.add('active');
    favBtn.textContent = '❤️';
  }

  localStorage.setItem('favorites', JSON.stringify(favs));
}




// Modal açma fonksiyonu
function openMusicModal({ title, artist, image, audio }) {
  const modal = document.getElementById('music-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalArtist = document.getElementById('modal-artist');
  const modalImage = document.getElementById('modal-image');
  const modalAudio = document.getElementById('modal-audio');

  modalTitle.textContent = title;
  modalArtist.textContent = artist;
  modalImage.src = image;
  modalAudio.src = audio;

  const song = { title, artist, image, audio };

  // Favori durumu kontrol
  if (isFavorited(title)) {
    favBtn.classList.add('active');
    favBtn.textContent = '❤️';
  } else {
    favBtn.classList.remove('active');
    favBtn.textContent = '🤍';
  }

  // Butona click atanır
  favBtn.onclick = () => toggleFavorite(song);

  modal.classList.remove('d-none');
  document.body.classList.add('modal-open');
}

// Modal kapatma fonksiyonu
function closeMusicModal() {
  const modal = document.getElementById('music-modal');
  const modalAudio = document.getElementById('modal-audio');

  modal.classList.add('d-none');
  modalAudio.pause();
  modalAudio.currentTime = 0;
  document.body.classList.remove('modal-open');
}

// X'e basınca kapat
document.querySelector('.close-btn').addEventListener('click', closeMusicModal);

// Modal dışına tıklayınca kapat
document.getElementById('music-modal').addEventListener('click', (event) => {
  if (!event.target.closest('.music-modal-content')) {
    closeMusicModal();
  }
});

// Müzik listesi
const muziklistesi = [
  {
    title: "Sen Benim Şarkılarımsın",
    artist: "Cem Adrian",
    image: "img/cem adrian sen benim şarkılarımsın.jpeg",
    description: "Motivasyon bombası.",
    genre: "slow",
    audio: "audio/ahmet beyin ceketi.mp3",
  },
  {
    title: "Git",
    artist: "Sezen Aksu",
    image: "img/maxresdefault.jpg",
    description: "Motivasyon bombası.",
    genre: "slow",
    audio: "audio/ahmet beyin ceketi.mp3",
  },
  {
    title: "Beyaz Skandalım",
    artist: "Emir Can İğrek",
    image: "img/emircan.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "slow",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Fırtınadayım",
    artist: "Mabel Matiz",
    image: "img/mabel.jpeg",
    description: "Motivasyon bombası.",
    genre: "slow",
    audio: "audio/ahmet beyin ceketi.mp3",
  },
  {
    title: "Hoşçakal",
    artist: "Emre Aydın",
    image: "img/emreay.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "slow",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Papatya",
    artist: "Çağan Şengül",
    image: "img/papatya.jpeg",
    description: "Motivasyon bombası.",
    genre: "slow",
    audio: "audio/ahmet beyin ceketi.mp3",
  },
  {
    title: "Değmesin Ellerimiz",
    artist: "Model",
    image: "img/modeljpeg.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "slow",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Gömülür",
    artist: "Nil İpek",
    image: "img/nil.jpeg",
    description: "Motivasyon bombası.",
    genre: "slow",
    audio: "audio/lose_yourself.mp3",
  },
  {
    title: "Sevmemeliyiz",
    artist: "Sena Sever",
    image: "img/senasevjpeg.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "slow",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Yalan",
    artist: "Ceren Sagu",
    image: "img/yalan.jpeg",
    description: "Motivasyon bombası.",
    genre: "slow",
    audio: "audio/lose_yourself.mp3",
  },
  {
    title: "Aşkın Kanunu",
    artist: "Tuğkan",
    image: "img/tuğkan.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "slow",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Gökyüzünü Tutamam",
    artist: "Can Koç",
    image: "img/gökyüzü.jpeg",
    description: "Motivasyon bombası.",
    genre: "slow",
    audio: "audio/lose_yourself.mp3",
  },
  {
    title: "Sopa",
    artist: "Hande Yener",
    image: "img/hand.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "pop",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Önümüz Yaz",
    artist: "Simge",
    image: "img/simgejpeg.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "pop",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Maziden",
    artist: "Afra",
    image: "img/maziden.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "pop",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Hayat Şaşırtır",
    artist: "Aydilge",
    image: "img/hayat.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "pop",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Saygımdan",
    artist: "Bengü",
    image: "img/bengü.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "pop",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Böyle Sever",
    artist: "Kahraman Deniz",
    image: "img/böylesev.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "pop",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Anahtar",
    artist: "Simge",
    image: "img/aanahtar.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "pop",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Yansıma",
    artist: "Derya Uluğ",
    image: "img/yansıma.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "pop",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Galiba",
    artist: "Sagopa",
    image: "img/galiba.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "rap",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Ceza",
    artist: "Suspus",
    image: "img/suspus.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "rap",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Aşk Şarkısı",
    artist: "Şanışer",
    image: "img/şanışer.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "rap",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Mayın Tarlası",
    artist: "Şebnem Ferah",
    image: "img/mayın .jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "rock",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Senden Daha Güzel",
    artist: "Duman",
    image: "img/duman.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "rock",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  },
  {
    title: "Dursun Zaman",
    artist: "Manga",
    image: "img/manga.jpeg",
    description: "Grunge'ın şaheseri.",
    genre: "rock",
    audio: "audio/Ahmet Beyin Ceketi.mp3",
  }
];
// Müzik kartlarını oluştur
muziklistesi.forEach(createMusicCard);
