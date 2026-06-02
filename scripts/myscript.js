/* ==================== SAYFA HAZIR ==================== */

document.addEventListener("DOMContentLoaded", function () {
  filtreleriHazirla();
  quizHazirla();
  formHazirla();

  detaySayfasiniDoldur();
  sepeteEkleButonlariniHazirla();
  adetButonlariniHazirla();

  sepetSayisiniGuncelle();
  siparisHazirla();
  sepetiGoster();
});


/* ==================== FİLTRE ==================== */

function filtreleriHazirla() {
  let kutular = document.querySelectorAll(".filtre-listesi input[type='checkbox']");
  kutular.forEach(function (kutu) {
    kutu.addEventListener("change", filtreUygula);
  });
  kitapSayisiniGuncelle();
}

function filtreUygula() {
  let secilenler = [];
  let kutular = document.querySelectorAll(".filtre-listesi input[type='checkbox']");
  kutular.forEach(function (kutu) {
    if (kutu.checked) {
      secilenler.push(kutu.value);
    }
  });

  let kartlar = document.querySelectorAll(".kitaplar-alani .kitap-karti");
  kartlar.forEach(function (kart) {
    let tur = kart.querySelector(".kitap-turu").textContent.trim();
    if (secilenler.length === 0 || secilenler.includes(tur)) {
      kart.style.display = "block";
    } else {
      kart.style.display = "none";
    }
  });

  kitapSayisiniGuncelle();
}

function kitapSayisiniGuncelle() {
  let yazi = document.querySelector(".kitap-sayisi");
  if (!yazi) return;

  let kartlar = document.querySelectorAll(".kitaplar-alani .kitap-karti");
  let sayi = 0;
  kartlar.forEach(function (kart) {
    if (kart.style.display !== "none") {
      sayi = sayi + 1;
    }
  });
  yazi.textContent = sayi + " kitap listeleniyor";
}


/* ==================== SEPET ==================== */

function sepeteEkle(kitapAdi, fiyat) {
  let sepet = JSON.parse(localStorage.getItem("sepet") || "[]");

  let kitap = kitaplar.find(function (k) {
    return k.ad === kitapAdi;
  });

  if (!kitap) return;

  let eklenecekAdet = 1;

  let adetAlani = document.getElementById("adet-goster");

  if (adetAlani) {
    eklenecekAdet = parseInt(adetAlani.textContent);
  }

  let mevcutUrun = sepet.find(function (urun) {
    return urun.ad === kitapAdi;
  });

  if (mevcutUrun) {
    mevcutUrun.adet = mevcutUrun.adet + eklenecekAdet;
  } else {
    sepet.push({
      ad: kitap.ad,
      yazar: kitap.yazar,
      tur: kitap.tur,
      fiyat: fiyat,
      gorsel: kitap.gorsel,
      adet: eklenecekAdet
    });
  }

  localStorage.setItem("sepet", JSON.stringify(sepet));
  sepetSayisiniGuncelle();
  bildirimGoster("Kitabınız sepete eklendi!");
}
function sepeteEkleButonlariniHazirla() {
  let butonlar = document.querySelectorAll(".sepete-ekle-btn");

  butonlar.forEach(function (buton) {
    buton.addEventListener("click", function () {
      let kitapAdi = buton.getAttribute("data-ad");
      let fiyat = parseInt(buton.getAttribute("data-fiyat"));

      if (!kitapAdi || isNaN(fiyat)) {
        return;
      }

      sepeteEkle(kitapAdi, fiyat);
    });
  });
}

function adetButonlariniHazirla() {
  let arttirBtn = document.getElementById("adet-arttir-btn");
  let azaltBtn = document.getElementById("adet-azalt-btn");

  if (arttirBtn) {
    arttirBtn.addEventListener("click", adetArttir);
  }

  if (azaltBtn) {
    azaltBtn.addEventListener("click", adetAzalt);
  }
}

function sepetSayisiniGuncelle() {
  let sepet = JSON.parse(localStorage.getItem("sepet") || "[]");
  let toplamAdet = 0;
  sepet.forEach(function (urun) {
    toplamAdet = toplamAdet + urun.adet;
  });

  let sayac = document.getElementById("sepet-sayisi");
  if (sayac) {
    sayac.textContent = toplamAdet;
  }
}

function bildirimGoster(mesaj) {
  let eskiBildirim = document.querySelector(".sepet-bildirimi");
  if (eskiBildirim) eskiBildirim.remove();

  let bildirim = document.createElement("div");
  bildirim.className = "sepet-bildirimi";
  bildirim.textContent = mesaj;
  document.body.appendChild(bildirim);

  setTimeout(function () {
    bildirim.remove();
  }, 2000);
}


/* ==================== ADET SEÇİCİ ==================== */

function adetArttir() {
  let span = document.getElementById("adet-goster");
  if (span) span.textContent = parseInt(span.textContent) + 1;
}

function adetAzalt() {
  let span = document.getElementById("adet-goster");
  if (span && parseInt(span.textContent) > 1) {
    span.textContent = parseInt(span.textContent) - 1;
  }
}


/* ==================== KİTAP VERİLERİ ==================== */

let kitaplar = [
  { id: 1, ad: "Yüzüklerin Efendisi", yazar: "J.R.R. Tolkien", tur: "Fantastik", fiyat: 345, gorsel: "../img/yüzüklerinEfendisi.webp", aciklama: "Orta Dünya'da geçen bu destansı roman, iyilik ve kötülük arasındaki büyük mücadeleyi anlatır." },
  { id: 2, ad: "1984", yazar: "George Orwell", tur: "Distopya", fiyat: 380, gorsel: "../img/1984_.jpg", aciklama: "Totaliter bir rejimde geçen bu roman, gözetim ve özgürlük üzerine düşündürür." },
  { id: 3, ad: "Dune", yazar: "Frank Herbert", tur: "Bilim Kurgu", fiyat: 285, gorsel: "../img/dune_.jpg", aciklama: "Çöl gezegeni Arrakis'te geçen epik bir bilim kurgu klasiği." },
  { id: 4, ad: "Tutunamayanlar", yazar: "Oğuz Atay", tur: "Türk Klasiği", fiyat: 190, gorsel: "../img/tutunamayanlar_.jpg", aciklama: "Türk edebiyatının en özgün romanlarından biri." },
  { id: 5, ad: "Huzur", yazar: "Ahmet Hamdi Tanpınar", tur: "Türk Klasiği", fiyat: 220, gorsel: "../img/huzur.jpeg", aciklama: "İstanbul'u ve ruhunu anlatan derin bir Türk klasiği." },
  { id: 6, ad: "Alacakaranlık", yazar: "Stephenie Meyer", tur: "Romantik", fiyat: 420, gorsel: "../img/alacakaranlık.jpeg", aciklama: "Vampir ve insan aşkını anlatan romantik bir roman." },
  { id: 7, ad: "Harry Potter ve Felsefe Taşı", yazar: "J.K. Rowling", tur: "Fantastik", fiyat: 375, gorsel: "../img/harrypotter.jpeg", aciklama: "Sihir dünyasına açılan kapı, efsanevi bir serinin ilk kitabı." },
  { id: 8, ad: "Araba Sevdası", yazar: "Recaizade Mahmut Ekrem", tur: "Türk Klasiği", fiyat: 150, gorsel: "../img/arabasevdasi.jpg", aciklama: "Tanzimat dönemi Türk edebiyatının önemli romanlarından biri." },
  { id: 9, ad: "Solaris", yazar: "Stanislaw Lem", tur: "Bilim Kurgu", fiyat: 410, gorsel: "../img/solaris.jpg", aciklama: "İnsanlığın bilinmeyenle yüzleşmesini anlatan derin bir bilim kurgu." },
  { id: 10, ad: "Yaban", yazar: "Yakup Kadri Karaosmanoğlu", tur: "Türk Klasiği", fiyat: 170, gorsel: "../img/yaban.jpeg", aciklama: "Kurtuluş Savaşı dönemini anlatan güçlü bir Türk romanı." },
  { id: 11, ad: "Suç ve Ceza", yazar: "Fyodor Dostoyevski", tur: "Dram", fiyat: 425, gorsel: "../img/sucveceza.jpeg", aciklama: "Psikolojik gerilimin zirvesi, dünya edebiyatının başyapıtı." },
  { id: 12, ad: "İnce Memed", yazar: "Yaşar Kemal", tur: "Türk Klasiği", fiyat: 215, gorsel: "../img/incememed.jpeg", aciklama: "Anadolu halkının destanını anlatan unutulmaz bir roman." }
];


/* ==================== DETAY SAYFASI ==================== */

function detaySayfasiniDoldur() {
  let params = new URLSearchParams(window.location.search);
  let id = parseInt(params.get("id"));
  if (!id) return;

  let kitap = kitaplar.find(function (k) { return k.id === id; });
  if (!kitap) return;

  let gorsel = document.querySelector(".detay-gorsel img");
  if (gorsel) { gorsel.src = kitap.gorsel; gorsel.alt = kitap.ad; }

  let tur = document.querySelector(".detay-bilgiler .kitap-turu");
  if (tur) tur.textContent = kitap.tur;

  let ad = document.querySelector(".detay-bilgiler .kitap-adi");
  if (ad) ad.textContent = kitap.ad;

  let yazar = document.querySelector(".detay-bilgiler .kitap-yazar");
  if (yazar) yazar.textContent = kitap.yazar;

  let fiyat = document.querySelector(".detay-fiyat");
  if (fiyat) fiyat.textContent = kitap.fiyat + " ₺";

  let aciklama = document.querySelector(".detay-aciklama");
  if (aciklama) aciklama.textContent = kitap.aciklama;

 let buton = document.querySelector(".detay-butonlar .buton-ana");

if (buton) {
  buton.setAttribute("data-ad", kitap.ad);
  buton.setAttribute("data-fiyat", kitap.fiyat);
}

document.title = kitap.ad + " | Kitap Dükkanım";
}
/* ==================== QUİZ ==================== */

let sorular = [
  {
    soru: "Bir hikayede seni en çok ne çeker?",
    aciklama: "İlk aklına gelen cevabı seç.",
    secenekler: [
      { metin: "Büyü, ejderhalar ve epik macera", etiketler: ["fantastik"] },
      { metin: "Aşk ve duygusal olaylar", etiketler: ["romantik"] },
      { metin: "Gelecek, teknoloji ve farklı dünyalar", etiketler: ["bilimkurgu", "distopya"] },
      { metin: "İnsan ilişkileri ve psikoloji", etiketler: ["klasik"] }
    ]
  },
  {
    soru: "Hangi kitap dünyası sana daha yakın?",
    aciklama: "Okurken içinde olmak isteyeceğin ortamı düşün.",
    secenekler: [
      { metin: "Sihirli ve fantastik bir dünya", etiketler: ["fantastik"] },
      { metin: "Romantik ve duygusal bir hikaye", etiketler: ["romantik"] },
      { metin: "Uzay, gezegenler ve bilim kurgu", etiketler: ["bilimkurgu"] },
      { metin: "Toplumu sorgulatan karanlık bir dünya", etiketler: ["distopya"] }
    ]
  },
  {
    soru: "Okurken nasıl bir tempo seversin?",
    aciklama: "Kitap okuma alışkanlığına göre seç.",
    secenekler: [
      { metin: "Hızlı ve maceralı", etiketler: ["fantastik", "bilimkurgu"] },
      { metin: "Duygusal ve akıcı", etiketler: ["romantik"] },
      { metin: "Yavaş ama derin", etiketler: ["klasik"] },
      { metin: "Düşündüren ve sorgulatan", etiketler: ["distopya"] }
    ]
  },
  {
    soru: "Bir kitabı bitirince ne hissetmek istersin?",
    aciklama: "Sana en yakın olanı seç.",
    secenekler: [
      { metin: "Yeni bir maceraya başlamak isterim", etiketler: ["fantastik"] },
      { metin: "Karakterlerle duygusal bağ kurmak isterim", etiketler: ["romantik"] },
      { metin: "Aklımda yeni fikirler kalsın isterim", etiketler: ["bilimkurgu"] },
      { metin: "Toplumu ve insanı sorgulamak isterim", etiketler: ["klasik", "distopya"] }
    ]
  }
];

let sonuclar = {
  fantastik: { baslik: "Yüzüklerin Efendisi", yazar: "J.R.R. Tolkien", aciklama: "Macera ve fantastik dünya seviyorsan bu kitap sana uygun." },
  romantik: { baslik: "Alacakaranlık", yazar: "Stephenie Meyer", aciklama: "Duygusal ve romantik hikayelerden hoşlanıyorsan bunu deneyebilirsin." },
  bilimkurgu: { baslik: "Dune", yazar: "Frank Herbert", aciklama: "Gelecek, gezegenler ve farklı toplumlar ilgini çekiyorsa iyi bir seçenek." },
  distopya: { baslik: "1984", yazar: "George Orwell", aciklama: "Toplum ve iktidar üzerine düşündüren bir kitap arıyorsan sana uygun." },
  klasik: { baslik: "Tutunamayanlar", yazar: "Oğuz Atay", aciklama: "Daha derin ve düşündürücü bir okuma istiyorsan bu kitap iyi bir seçim." }
};

let puanlar = {};
let aktifSoru = 0;

function quizHazirla() {
  let baslat = document.getElementById("quiz-baslat");
  if (!baslat) return;
  baslat.addEventListener("click", quizBaslat);
}

function quizBaslat() {
  puanlar = { fantastik: 0, romantik: 0, bilimkurgu: 0, distopya: 0, klasik: 0 };
  aktifSoru = 0;
  soruYaz();
}

function soruYaz() {
  let alan = document.getElementById("quiz-alani");
  if (!alan) return;

  if (aktifSoru >= sorular.length) {
    sonucYaz();
    return;
  }

  let soru = sorular[aktifSoru];
  let oran = Math.round((aktifSoru / sorular.length) * 100);

  alan.innerHTML =
    "<div class='quiz-ilerleme'><div class='ilerleme-cubugu'></div></div>" +
    "<p class='soru-sayac'>Soru " + (aktifSoru + 1) + " / " + sorular.length + "</p>" +
    "<h3 class='soru-metni'>" + soru.soru + "</h3>" +
    "<p class='soru-aciklama'>" + soru.aciklama + "</p>" +
    "<div class='secenekler-grid' id='secenekler'></div>";

  alan.querySelector(".ilerleme-cubugu").style.width = oran + "%";

  let secenekler = document.getElementById("secenekler");
  soru.secenekler.forEach(function (secenek, index) {
    let buton = document.createElement("button");
    buton.type = "button";
    buton.className = "quiz-secenek";
    buton.textContent = secenek.metin;
    buton.addEventListener("click", function () { cevapSec(index); });
    secenekler.appendChild(buton);
  });
}

function cevapSec(index) {
  let secenek = sorular[aktifSoru].secenekler[index];
  secenek.etiketler.forEach(function (etiket) {
    puanlar[etiket] = puanlar[etiket] + 1;
  });
  aktifSoru = aktifSoru + 1;
  soruYaz();
}

function sonucYaz() {
  let alan = document.getElementById("quiz-alani");
  let enYuksekTur = "fantastik";

  for (let tur in puanlar) {
    if (puanlar[tur] > puanlar[enYuksekTur]) {
      enYuksekTur = tur;
    }
  }

  let sonuc = sonuclar[enYuksekTur];
  alan.innerHTML =
    "<div class='quiz-sonuc'>" +
    "<p class='sonuc-etiket'>Senin için önerilen kitap:</p>" +
    "<h3 class='sonuc-kitap'>" + sonuc.baslik + "</h3>" +
    "<p class='sonuc-yazar'>" + sonuc.yazar + "</p>" +
    "<p class='sonuc-aciklama'>" + sonuc.aciklama + "</p>" +
    "<button type='button' class='buton buton-ana' id='quiz-tekrar'>Tekrar Dene</button>" +
    "</div>";

  document.getElementById("quiz-tekrar").addEventListener("click", quizBaslat);
}


/* ==================== FORM ==================== */

function formHazirla() {
  let form = document.getElementById("iletisim-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let mesaj = document.getElementById("form-mesaji");
    if (mesaj) mesaj.textContent = "Mesajınız alındı, teşekkürler.";
    form.reset();
  });
}
function siparisHazirla() {
  let buton = document.getElementById("siparis-btn");
  if (!buton) return;

  buton.addEventListener("click", function () {
    let sepet = JSON.parse(localStorage.getItem("sepet") || "[]");

    if (sepet.length === 0) {
      bildirimGoster("Sepetiniz zaten boş.");
      return;
    }

    localStorage.removeItem("sepet");

    sepetSayisiniGuncelle();
    sepetiGoster();

    bildirimGoster("Siparişiniz alındı, teşekkürler!");
  });
}

function sepetiGoster() {
  let sepetListesi = document.getElementById("sepet-listesi");

  if (!sepetListesi) return;

  let sepet = JSON.parse(localStorage.getItem("sepet") || "[]");

  sepetListesi.innerHTML = "";

  if (sepet.length === 0) {
    sepetListesi.innerHTML = "<p>Sepetinizde ürün bulunmamaktadır.</p>";
    sepetToplaminiGuncelle();
    return;
  }

  sepet.forEach(function (urun) {
    let urunSatiri = document.createElement("div");
    urunSatiri.className = "sepet-satiri";

    urunSatiri.innerHTML = `
      <div class="sepet-gorsel">
        <img src="${urun.gorsel}" alt="${urun.ad}">
      </div>

      <div class="sepet-bilgi">
        <h3>${urun.ad}</h3>
        <p class="sepet-yazar">${urun.yazar}</p>
        <p class="sepet-tur">${urun.tur}</p>
      </div>

      <div class="sepet-adet">
        <span>${urun.adet} adet</span>
      </div>

      <p class="sepet-fiyat">${urun.fiyat * urun.adet} ₺</p>

      <button type="button" class="sil-butonu">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    sepetListesi.appendChild(urunSatiri);
  });

  sepetToplaminiGuncelle();
  sepetSilmeHazirla();
}
function sepetSilmeHazirla() {
  let silButonlari = document.querySelectorAll(".sil-butonu");

  silButonlari.forEach(function (buton) {
    buton.addEventListener("click", function () {
      let urunSatiri = buton.closest(".sepet-satiri");
      let urunAdi = urunSatiri.querySelector("h3").textContent;

      let sepet = JSON.parse(localStorage.getItem("sepet") || "[]");

      sepet = sepet.filter(function (urun) {
        return urun.ad !== urunAdi;
      });

      localStorage.setItem("sepet", JSON.stringify(sepet));

      sepetiGoster();
      sepetSayisiniGuncelle();
    });
  });
}
function sepetToplaminiGuncelle() {
  let sepet = JSON.parse(localStorage.getItem("sepet") || "[]");

  let araToplam = 0;

  sepet.forEach(function (urun) {
    araToplam = araToplam + urun.fiyat * urun.adet;
  });

  let kargo = 56.50;

  if (araToplam === 0) {
    kargo = 0;
  }

  let genelToplam = araToplam + kargo;

  let araToplamAlani = document.getElementById("ara-toplam");
  let kargoAlani = document.getElementById("kargo-ucreti");
  let genelToplamAlani = document.getElementById("genel-toplam");

  if (araToplamAlani) {
    araToplamAlani.textContent = araToplam.toFixed(2).replace(".", ",") + " ₺";
  }

  if (kargoAlani) {
    kargoAlani.textContent = kargo.toFixed(2).replace(".", ",") + " ₺";
  }

  if (genelToplamAlani) {
    genelToplamAlani.textContent = genelToplam.toFixed(2).replace(".", ",") + " ₺";
  }
}
