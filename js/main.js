// Sayfa yüklendiğinde dekoratif arkaplan elementleri ekle
document.addEventListener('DOMContentLoaded', function() {
    // Kalpli arkaplan
    const heartSymbols = ['❤️', '💗', '💕', '💓', '💖'];
    const heartsContainer = document.querySelector('.hearts') || document.createElement('div');
    
    if (!document.querySelector('.hearts')) {
        heartsContainer.className = 'hearts';
        document.body.appendChild(heartsContainer);
    }
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.animationDuration = 15 + Math.random() * 15 + 's';
        heartsContainer.appendChild(heart);
    }
    
    // Arkaplan baloncukları ve dekoratif elementler
    const bgDecorations = document.querySelector('.background-decorations');
    
    // Baloncuklar
    for (let i = 0; i < 15; i++) {
        const size = Math.random() * 150 + 50;
        const bubble = document.createElement('div');
        bubble.className = 'bg-bubble';
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDelay = `${Math.random() * 20}s`;
        bubble.style.animationDuration = `${Math.random() * 15 + 15}s`;
        bgDecorations.appendChild(bubble);
    }
    
    // Yüzen kalpler
    for (let i = 0; i < 12; i++) {
        const floatingHeart = document.createElement('div');
        floatingHeart.className = 'floating-heart';
        floatingHeart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        floatingHeart.style.left = `${Math.random() * 100}%`;
        floatingHeart.style.top = `${Math.random() * 100}%`;
        floatingHeart.style.animationDelay = `${Math.random() * 5}s`;
        floatingHeart.style.animationDuration = `${Math.random() * 5 + 7}s`;
        floatingHeart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        floatingHeart.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        bgDecorations.appendChild(floatingHeart);
    }
    
    // Mouse hareketi efekti - 3D rotasyon
    document.addEventListener('mousemove', function(e) {
        const gameContainer = document.querySelector('.game-container');
        const xPos = (e.clientX / window.innerWidth - 0.5) * 10;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 10;
        
        gsap.to(gameContainer, {
            rotationY: xPos * 0.5,
            rotationX: -yPos * 0.5,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power1.out"
        });
    });
    
    // Aşk göstergesini rastgele hareket ettir
    function updateLoveMeter() {
        const loveMeterFill = document.getElementById('love-meter-fill');
        const loveMeterText = document.querySelector('.love-meter-text');
        
        // Rastgele yeni değer
        const newValue = Math.floor(Math.random() * 101);
        loveMeterFill.style.width = `${newValue}%`;
        loveMeterText.textContent = `Aşk Enerjisi %${newValue}`;
        
        // Animasyonlu metin rengi
        if (newValue > 70) {
            loveMeterText.style.color = 'white';
        } else if (newValue > 30) {
            loveMeterText.style.color = 'white';
        } else {
            loveMeterText.style.color = '#555';
        }
        
        // 3-5 saniye içinde tekrar güncelle
        setTimeout(updateLoveMeter, 3000 + Math.random() * 2000);
    }
    
    // İlk çağrı
    setTimeout(updateLoveMeter, 1500);
    
    // Bilgi kartları popup fonksiyonları
    const infoToggle = document.querySelector('.info-toggle');
    const infoPopup = document.querySelector('.info-popup');
    const popupClose = document.querySelector('.info-popup-close');
    const overlay = document.querySelector('.overlay');
    const popupContent = document.querySelector('.info-popup-content');
    
    // Bilgi kartlarını popup içeriğine kopyala
    function preparePopupContent() {
        // İçeriği temizle
        popupContent.innerHTML = '';
        
        // Tüm bilgi kartlarını topla
        const leftCards = document.querySelectorAll('.info-cards.left .info-card');
        const rightCards = document.querySelectorAll('.info-cards.right .info-card:not(.horoscope-card)');
        
        // Sol ve sağ bilgi kartlarını popup içeriğine ekle
        [...leftCards, ...rightCards].forEach(card => {
            const cardClone = card.cloneNode(true);
            cardClone.style.animationDelay = '0s'; // Gecikmeyi kaldır
            popupContent.appendChild(cardClone);
        });
        
        // Burç yorumu kartını özel olarak ekle
        const horoscopeCard = document.querySelector('.horoscope-card');
        if (horoscopeCard) {
            const horoscopeClone = horoscopeCard.cloneNode(true);
            horoscopeClone.style.animationDelay = '0s';
            
            // Yeni select elemanını oluştur ve olayları bağla
            const newSelect = horoscopeClone.querySelector('select');
            const newText = horoscopeClone.querySelector('#horoscope-text');
            
            if (newSelect && newText) {
                newSelect.id = 'popup-zodiac-select';
                newText.id = 'popup-horoscope-text';
                
                // Popup içindeki burç değiştiriciye yeni bir olay dinleyicisi ekle
                newSelect.addEventListener('change', function() {
                    const sign = this.value;
                    
                    fetchAndTranslateHoroscope(sign, newText);
                    
                    // Ana sayfadaki burç seçiciyi de güncelle
                    const mainSelect = document.getElementById('zodiac-select');
                    if (mainSelect && mainSelect.value !== sign) {
                        mainSelect.value = sign;
                        fetchAndTranslateHoroscope(sign, document.getElementById('horoscope-text'));
                    }
                });
                
                // İlk yükleme için ana sayfadaki seçilen burcu kullan
                const mainSelect = document.getElementById('zodiac-select');
                if (mainSelect) {
                    newSelect.value = mainSelect.value;
                    fetchAndTranslateHoroscope(mainSelect.value, newText);
                }
            }
            
            popupContent.appendChild(horoscopeClone);
        }
    }
    
    // Popup'ı aç
    function openInfoPopup() {
        preparePopupContent();
        infoPopup.style.display = 'block';
        overlay.style.display = 'block';
        
        // Açılış animasyonu
        gsap.fromTo(infoPopup, 
            { opacity: 0, scale: 0.8 }, 
            { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" }
        );
    }
    
    // Popup'ı kapat
    function closeInfoPopup() {
        gsap.to(infoPopup, {
            opacity: 0, 
            scale: 0.8, 
            duration: 0.2, 
            onComplete: () => {
                infoPopup.style.display = 'none';
                overlay.style.display = 'none';
            }
        });
    }
    
    // Olay dinleyicileri
    infoToggle.addEventListener('click', openInfoPopup);
    popupClose.addEventListener('click', closeInfoPopup);
    overlay.addEventListener('click', closeInfoPopup);
    
    // GÜNLÜK BURÇ YORUMU ENTEGRASYONU
    const select = document.getElementById('zodiac-select');
    const text = document.getElementById('horoscope-text');
    
    if (select && text) {
        // İngilizce burç yorumlarını Türkçe'ye çeviren basit çeviri fonksiyonu
        function translateHoroscope(text) {
            // Basit kelime dağarcığı çevirisi
            const dictionary = {
                "today": "bugün",
                "you": "sen",
                "your": "senin",
                "will": "olacak",
                "may": "olabilir",
                "might": "olabilir",
                "could": "olabilir",
                "should": "gerekir",
                "would": "olurdu",
                "can": "yapabilirsin",
                "friends": "arkadaşlar",
                "family": "aile",
                "love": "aşk",
                "work": "iş",
                "money": "para",
                "time": "zaman",
                "day": "gün",
                "energy": "enerji",
                "luck": "şans",
                "opportunity": "fırsat",
                "challenge": "zorluk",
                "relationship": "ilişki",
                "partner": "partner",
                "need": "ihtiyaç",
                "focus": "odak",
                "change": "değişim",
                "success": "başarı",
                "feel": "hisset",
                "feeling": "his",
                "emotions": "duygular",
                "emotional": "duygusal",
                "happy": "mutlu",
                "sad": "üzgün",
                "heart": "kalp",
                "mind": "zihin",
                "think": "düşün",
                "important": "önemli",
                "life": "hayat",
                "future": "gelecek",
                "past": "geçmiş",
                "present": "şimdiki zaman",
                "plans": "planlar"
            };
            
            // GPT benzeri basit bir çeviri fonksiyonu
            // Gerçek bir NLP çevirisi değil, sadece genel anlamı verecek şekilde
            let translatedText = text;
            
            // Temel kelime çevirisi
            Object.keys(dictionary).forEach(word => {
                const regex = new RegExp(`\\b${word}\\b`, 'gi');
                translatedText = translatedText.replace(regex, dictionary[word]);
            });
            
            // Birkaç yaygın kalıp için çeviri
            translatedText = translatedText.replace(/it's a good day to/gi, "bugün iyi bir gün");
            translatedText = translatedText.replace(/keep in mind/gi, "aklında tut");
            translatedText = translatedText.replace(/take care of/gi, "dikkat et");
            translatedText = translatedText.replace(/don't forget/gi, "unutma");
            translatedText = translatedText.replace(/make sure to/gi, "mutlaka");
            
            // Basit cümle yapılarını düzeltme
            translatedText = translatedText.replace(/you will/gi, "sen olacak"); 
            translatedText = translatedText.replace(/you may/gi, "sen olabilir");
            
            // Basit düzeltmeler
            translatedText = translatedText.replace(/sen olacak/gi, "olacaksın");
            translatedText = translatedText.replace(/sen olabilir/gi, "olabilirsin");
            
            return "🌟 " + translatedText + " 🌟";
        }
        
        // Burç yorumu çekme ve çevirme işlemini tek bir fonksiyona aldık
        // Bu fonksiyon hem ana ekran hem de popup için kullanılabilir
        function fetchAndTranslateHoroscope(sign, targetElement) {
            targetElement.textContent = "Yükleniyor...";
            
            // CORS sorunu yaşama ihtimaline karşı fallback yorumları
            const fallbackHoroscopes = {
                "aries": "Bugün kendinizi çok enerjik hissedeceksiniz. Yeni başlangıçlar için ideal bir gün. Cesaretiniz ve liderlik yeteneğiniz ön plana çıkacak.",
                "taurus": "Bugün maddi konularda şanslı bir gün geçirebilirsiniz. Sabırlı ve kararlı doğanız, uzun süredir beklediğiniz sonuçları almanızı sağlayacak.",
                "gemini": "İletişim yetenekleriniz bugün dorukta olacak. Sosyal ilişkilerinizde parlayacak ve çevrenizdeki insanları etkileyeceksiniz.",
                "cancer": "Duygusal dünyada yoğun bir gün geçirebilirsiniz. Ailenizle ilgili güzel gelişmeler yaşanabilir. Sezgilerinize güvenin.",
                "leo": "Bugün sahne sizin! Yaratıcılığınız ve karizma doruğa çıkacak. Kendinizi ifade etme fırsatlarını değerlendirin.",
                "virgo": "Detaylara olan dikkatiniz bugün size avantaj sağlayacak. İş hayatınızda başarı elde edebilirsiniz. Sağlığınıza dikkat edin.",
                "libra": "Denge ve uyum arayışınız bugün olumlu sonuçlar verecek. İlişkilerinizde harmonik bir gün geçirebilirsiniz.",
                "scorpio": "Tutkulu ve kararlı yapınız bugün hedeflerinize ulaşmanızı sağlayacak. Gizli kalmış gerçekler ortaya çıkabilir.",
                "sagittarius": "Özgürlük ve macera arzunuz bugün ön planda olacak. Yeni bilgiler edinmek ve ufkunuzu genişletmek için harika bir gün.",
                "capricorn": "Disiplinli ve çalışkan yapınız bugün kariyerinizde ilerleme kaydetmenizi sağlayacak. Sorumluluk almaktan çekinmeyin.",
                "aquarius": "Yenilikçi fikirleriniz ve farklı bakış açınız bugün takdir görecek. Sosyal çevrenizde pozitif değişiklikler olabilir.",
                "pisces": "Sanatsal yetenekleriniz ve sezgileriniz bugün güçlenecek. Hayal gücünüzü kullanarak güzel işler başarabilirsiniz."
            };
            
            fetch(`https://ohmanda.com/api/horoscope/${sign}/`)
                .then(res => res.json())
                .then(data => {
                    // İngilizce yorumu Türkçe'ye çevir
                    const translatedHoroscope = translateHoroscope(data.horoscope || "Bugün için bir yorum bulunamadı.");
                    targetElement.textContent = translatedHoroscope;
                })
                .catch(() => {
                    // API'den veri çekemezsek fallback yorumu göster
                    targetElement.textContent = `🌟 ${fallbackHoroscopes[sign] || "Bugün şanslı gününüzdesiniz. Kendinize güvenin ve fırsatları değerlendirin!"} 🌟`;
                });
        }
        
        select.addEventListener('change', () => fetchAndTranslateHoroscope(select.value, text));
        
        // Sayfa açıldığında varsayılan burç yorumu
        fetchAndTranslateHoroscope(select.value, text);
    }
}); 