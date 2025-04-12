/**
 * Seviyor Sevmiyor Oyun Mantığı
 * Papatya modelini kullanan ve oyun durumunu yöneten kod
 */

class LovePredictor {
    constructor(options = {}) {
        this.daisyId = options.daisyId || 'daisy-container';
        this.resultTextId = options.resultTextId || 'result-text';
        this.petalCountId = options.petalCountId || 'petal-count';
        this.phrases = options.phrases || [
            "Seviyor", 
            "Sevmiyor", 
            "Seviyor", 
            "Sevmiyor", 
            "Seviyor", 
            "Sevmiyor"
        ];
        
        // Random başlangıç noktası için seed
        this.startingPhraseIndex = Math.floor(Math.random() * this.phrases.length);
        this.totalPetals = options.petalCount || 24;
        this.currentPetal = 0;
        this.petalsRemoved = 0;
        
        this.daisyModel = null;
        this.initialize();
    }
    
    initialize() {
        // Papatya modelini oluştur
        this.daisyModel = new DaisyModel(this.daisyId, {
            petalCount: this.totalPetals,
            onPetalRemoved: this.onPetalRemoved.bind(this)
        });
        
        // Toplam yaprak sayısını güncelle - element yoksa hata vermemesi için kontrol ekleyelim
        const petalCountElement = document.getElementById(this.petalCountId);
        if (petalCountElement) {
            petalCountElement.innerText = `0 / ${this.totalPetals}`;
        }
        
        // Ses efektleri
        this.loadSounds();
        
        // Başlangıç metni
        const resultTextElement = document.getElementById(this.resultTextId);
        if (resultTextElement) {
            resultTextElement.innerText = "Bir taç yaprağı kopar...";
        }
    }
    
    loadSounds() {
        // Yumuşak ses efektleri - bunlar papatya.js içinde oluşturulduğu için burada gerek yok
    }
    
    onPetalRemoved(count, total) {
        this.petalsRemoved = count;
        
        // Sonuç metni - random başlangıç noktasından itibaren döngüsel ilerle
        const phraseIndex = (this.startingPhraseIndex + count - 1) % this.phrases.length;
        const currentPhrase = this.phrases[phraseIndex];
        
        // Metni güncelle
        const resultTextElement = document.getElementById(this.resultTextId);
        if (resultTextElement) {
            resultTextElement.innerText = currentPhrase;
        }
        
        // Son yaprak mı?
        if (count >= total) {
            this.finishGame(currentPhrase);
        }
    }
    
    finishGame(result) {
        // Oyun bitti, final sonucu göster
        setTimeout(() => {
            const resultTextElement = document.getElementById(this.resultTextId);
            if (resultTextElement) {
                resultTextElement.innerHTML = `<strong>${result}</strong>`;
                
                // Sonuca göre renk değiştir
                if (result === "Seviyor") {
                    resultTextElement.style.color = "#e91e63"; // Pembe
                    resultTextElement.style.textShadow = "0 0 10px rgba(233, 30, 99, 0.5)";
                } else {
                    resultTextElement.style.color = "#9e9e9e"; // Gri
                    resultTextElement.style.textShadow = "0 0 10px rgba(158, 158, 158, 0.5)";
                }
            }
            
            // Yeniden başlat butonunu göster
            const resetButton = document.getElementById('reset-button');
            if (resetButton) {
                resetButton.style.display = 'inline-block';
            }
            
            // Sonuca göre farklı konfeti efekti göster
            this.showConfetti(result);
            
            // Sonuca göre farklı melodi çal
            if (result === "Seviyor") {
                this.playHappyMelody();
            } else {
                this.playSadMelody();
            }
        }, 1000);
    }
    
    // Konfeti efekti - sonuca göre farklı efektler
    showConfetti(result) {
        const isLoved = result === "Seviyor";
        
        // Temaya uygun konfeti renkleri
        const colors = isLoved 
            ? ['#f8bbd0', '#e91e63', '#ec407a', '#f48fb1', '#d81b60', '#ad1457', '#fce4ec', '#f06292'] // Neşeli pembe tonları
            : ['#b0bec5', '#78909c', '#546e7a', '#607d8b', '#455a64', '#37474f', '#90a4ae', '#cfd8dc']; // Gri-mavi hüzünlü tonlar
        
        const confettiCount = isLoved ? 200 : 150; // Sevmiyor için daha fazla konfeti
        
        // Emoji sembolleri
        const heartEmojis = ['❤️', '💕', '💗', '💖', '💘']; // Seviyor için
        const sadEmojis = ['💔', '🖤', '💭', '⚡', '☁️', '😢', '🤨', '❓']; // Sevmiyor için
        
        // Tüm mevcut konfetileri temizle
        const existingConfetti = document.querySelectorAll('.confetti');
        existingConfetti.forEach(el => el.remove());
        
        // Bölgelere ayır (5 dikey bölge)
        const zones = [
            {minX: 0, maxX: 20}, 
            {minX: 20, maxX: 40}, 
            {minX: 40, maxX: 60},
            {minX: 60, maxX: 80},
            {minX: 80, maxX: 100}
        ];
        
        // Her bölge için konfetileri oluştur (daha dengeli dağılım için)
        zones.forEach(zone => {
            const zoneConfettiCount = Math.floor(confettiCount / zones.length);
            
            for (let i = 0; i < zoneConfettiCount; i++) {
                // GSAP ile animasyon yapacağımız için CSS animasyonu kullanmıyoruz
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                document.body.appendChild(confetti);
                
                // Rastgele başlangıç konumu (bölge içinde)
                const startX = zone.minX + Math.random() * (zone.maxX - zone.minX);
                const startY = -30 - (Math.random() * 100); // Ekran üstünden biraz daha yukarda başla
                
                // Konfeti görünümü
                confetti.style.position = 'fixed';
                confetti.style.zIndex = '1000';
                confetti.style.pointerEvents = 'none';
                confetti.style.left = `${startX}vw`;
                confetti.style.top = `${startY}px`;
                
                // Emoji veya klasik konfeti
                const useEmoji = Math.random() > 0.5;
                if (useEmoji) {
                    // Emoji olarak göster
                    const emojis = isLoved ? heartEmojis : sadEmojis;
                    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                    confetti.innerHTML = emoji;
                    confetti.style.fontSize = `${10 + Math.random() * 10}px`;
                    confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.textShadow = `0 0 3px ${colors[Math.floor(Math.random() * colors.length)]}`;
                    confetti.style.background = 'transparent';
                } else {
                    // Normal konfeti olarak göster
                    confetti.style.width = `${4 + Math.random() * 4}px`;
                    confetti.style.height = `${Math.random() * 4 + 2}px`;
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.opacity = isLoved ? "0.9" : "0.7";
                    
                    if (Math.random() > 0.7) {
                        confetti.style.borderRadius = '50%';
                    }
                }
                
                // GSAP ile düşme animasyonu
                const duration = isLoved 
                    ? 3 + Math.random() * 2 // 3-5 saniye (Seviyor)
                    : 5 + Math.random() * 3; // 5-8 saniye (Sevmiyor)
                
                // Rastgele yol tanımla
                const path = [];
                
                // Başlangıç noktası
                path.push({x: startX, y: startY});
                
                // Rastgele aralık noktaları (zigzag hareketi için)
                const pathPointCount = 3 + Math.floor(Math.random() * 3); // 3-5 nokta
                
                for (let j = 1; j <= pathPointCount; j++) {
                    const pathProgress = j / (pathPointCount + 1);
                    const wiggleX = startX + (Math.random() * 20 - 10); // ±10vw rastgele yalpalama
                    const pathY = startY + (100 + window.innerHeight) * pathProgress; // Aşağı doğru ilerle
                    path.push({x: wiggleX, y: pathY});
                }
                
                // Son nokta (ekran dışına)
                path.push({x: startX + (Math.random() * 30 - 15), y: window.innerHeight + 50});
                
                // Dönüş miktarı 
                const rotation = isLoved 
                    ? Math.random() * 720 - 360 // -360 ile 360 arası (Seviyor)
                    : Math.random() * 180 - 90; // -90 ile 90 arası (Sevmiyor)
                
                // Düşüş hızı (zamanlama fonksiyonu)
                const ease = isLoved ? "power1.in" : "sine.inOut";
                
                // Gecikme süresi
                const delay = Math.random() * (isLoved ? 2 : 4);
                
                // GSAP ile animasyon
                const tl = gsap.timeline({delay: delay, onComplete: () => confetti.remove()});
                
                // Yolu takip et
                for (let j = 1; j < path.length; j++) {
                    tl.to(confetti, {
                        left: `${path[j].x}vw`,
                        top: `${path[j].y}px`,
                        rotation: rotation * (j / path.length),
                        ease: ease,
                        duration: duration * (1 / path.length)
                    });
                }
                
                // Yavaşça kaybol (son %30'luk kısımda)
                tl.to(confetti, {
                    opacity: 0,
                    duration: duration * 0.3,
                    ease: "power2.in"
                }, `-=${duration * 0.3}`);
                
                // Eğer "Seviyor" sonucu ile kalp emoji ise, kalp atma animasyonu ekle
                if (isLoved && useEmoji) {
                    gsap.to(confetti, {
                        scale: 1.3,
                        duration: 0.3,
                        repeat: -1,
                        yoyo: true,
                        ease: "power1.inOut"
                    });
                }
            }
        });
    }
    
    // Mutlu melodi - "Seviyor" için
    playHappyMelody() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Müzik notaları - C majör (do majör) akorundan
            const cMajorScale = [
                261.63, // C4 (Do)
                293.66, // D4 (Re)
                329.63, // E4 (Mi)
                349.23, // F4 (Fa)
                392.00, // G4 (Sol)
                440.00, // A4 (La)
                493.88  // B4 (Si)
            ];
            
            // Mutlu bir melodi dizisi - C majör arpej üzerinde
            const happySequence = [
                { note: 0, duration: 0.2 },  // C
                { note: 2, duration: 0.2 },  // E
                { note: 4, duration: 0.2 },  // G
                { note: 0, duration: 0.1, octave: 1 },  // C bir oktav yukarıda
                { note: 4, duration: 0.2 },  // G
                { note: 2, duration: 0.2 },  // E
                { note: 5, duration: 0.4 },  // A
                { note: 4, duration: 0.2 },  // G
                { note: 2, duration: 0.2 },  // E
                { note: 0, duration: 0.5, octave: 1 }   // C bir oktav yukarıda, final
            ];
            
            // Master out
            const masterGain = audioCtx.createGain();
            masterGain.gain.value = 0.3;
            
            // Reverb efekti
            const convolver = audioCtx.createConvolver();
            const reverbTime = audioCtx.sampleRate * 2.5;
            const reverbBuffer = audioCtx.createBuffer(2, reverbTime, audioCtx.sampleRate);
            
            for (let channel = 0; channel < 2; channel++) {
                const reverbData = reverbBuffer.getChannelData(channel);
                for (let i = 0; i < reverbTime; i++) {
                    reverbData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (reverbTime * 0.6));
                }
            }
            
            convolver.buffer = reverbBuffer;
            
            // Filtreler
            const filter = audioCtx.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.value = 3000;
            
            // Bağlantılar
            masterGain.connect(filter);
            filter.connect(convolver);
            convolver.connect(audioCtx.destination);
            
            // Mutlu melodiyi çal
            let startTime = audioCtx.currentTime + 0.1;
            
            happySequence.forEach(step => {
                // Melodiyi çal
                const osc = audioCtx.createOscillator();
                osc.type = 'triangle'; // Daha yumuşak ses
                
                const noteOctave = step.octave || 0;
                const frequency = cMajorScale[step.note] * Math.pow(2, noteOctave);
                osc.frequency.value = frequency;
                
                // Envelope
                const noteGain = audioCtx.createGain();
                noteGain.gain.value = 0;
                
                // Bağlantılar
                osc.connect(noteGain);
                noteGain.connect(masterGain);
                
                // Sesi başlat ve envelope uygula
                osc.start(startTime);
                noteGain.gain.setValueAtTime(0, startTime);
                noteGain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
                noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + step.duration);
                
                osc.stop(startTime + step.duration + 0.1);
                
                startTime += step.duration;
            });
            
            // Basit bir arka plan akoru ekle - C major
            const chordNotes = [261.63, 329.63, 392.00]; // C, E, G
            
            chordNotes.forEach(note => {
                const oscChord = audioCtx.createOscillator();
                oscChord.type = 'sine';
                oscChord.frequency.value = note;
                
                const chordGain = audioCtx.createGain();
                chordGain.gain.value = 0;
                
                oscChord.connect(chordGain);
                chordGain.connect(masterGain);
                
                oscChord.start(audioCtx.currentTime);
                chordGain.gain.setValueAtTime(0, audioCtx.currentTime);
                chordGain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.5);
                chordGain.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 1.5);
                chordGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3.5);
                
                oscChord.stop(audioCtx.currentTime + 4);
            });
            
        } catch(e) {
            console.log("Mutlu melodi oluşturulamadı:", e);
        }
    }
    
    // Hüzünlü melodi - "Sevmiyor" için
    playSadMelody() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Müzik notaları - A minör (la minör) akorundan
            const aMinorScale = [
                220.00, // A3 (La)
                246.94, // B3 (Si)
                261.63, // C4 (Do)
                293.66, // D4 (Re)
                329.63, // E4 (Mi)
                349.23, // F4 (Fa)
                392.00  // G4 (Sol)
            ];
            
            // Hüzünlü bir melodi dizisi - A minör arpej üzerinde
            const sadSequence = [
                { note: 0, duration: 0.4 },  // A
                { note: 2, duration: 0.4 },  // C
                { note: 0, duration: 0.25 },  // A
                { note: 2, duration: 0.25 },  // C
                { note: 4, duration: 0.5 },  // E
                { note: 3, duration: 0.5 },  // D
                { note: 2, duration: 0.35 },  // C
                { note: 0, duration: 0.8 }   // A, final
            ];
            
            // Master out
            const masterGain = audioCtx.createGain();
            masterGain.gain.value = 0.3;
            
            // Uzun reverb efekti - hüzünlü ses için
            const convolver = audioCtx.createConvolver();
            const reverbTime = audioCtx.sampleRate * 3.5; // Daha uzun reverb
            const reverbBuffer = audioCtx.createBuffer(2, reverbTime, audioCtx.sampleRate);
            
            for (let channel = 0; channel < 2; channel++) {
                const reverbData = reverbBuffer.getChannelData(channel);
                for (let i = 0; i < reverbTime; i++) {
                    reverbData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (reverbTime * 0.8));
                }
            }
            
            convolver.buffer = reverbBuffer;
            
            // Filtreler - düşük frekans ağırlıklı (daha karanlık ses)
            const filter = audioCtx.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.value = 1800;
            
            // Hafif distorsiyon - hüzünlü ton için
            const distortion = audioCtx.createWaveShaper();
            function makeDistortionCurve(amount) {
                const n_samples = 44100;
                const curve = new Float32Array(n_samples);
                const deg = Math.PI / 180;
                
                for (let i = 0; i < n_samples; ++i) {
                    const x = i * 2 / n_samples - 1;
                    curve[i] = (3 + amount) * x * 20 * deg / (Math.PI + amount * Math.abs(x));
                }
                
                return curve;
            }
            
            distortion.curve = makeDistortionCurve(2);
            distortion.oversample = '2x';
            
            // Bağlantılar
            masterGain.connect(filter);
            filter.connect(distortion);
            distortion.connect(convolver);
            convolver.connect(audioCtx.destination);
            
            // Hüzünlü melodiyi çal
            let startTime = audioCtx.currentTime + 0.2;
            
            sadSequence.forEach(step => {
                // Melodiyi çal
                const osc = audioCtx.createOscillator();
                osc.type = 'sine'; // Daha nazik ses
                osc.frequency.value = aMinorScale[step.note];
                
                // Vibrato efekti - hafif titreşim
                const vibrato = audioCtx.createOscillator();
                vibrato.type = 'sine';
                vibrato.frequency.value = 5 + Math.random() * 2; // 5-7 Hz vibrato
                
                const vibratoGain = audioCtx.createGain();
                vibratoGain.gain.value = 3; // Vibrato derinliği
                
                // Envelope
                const noteGain = audioCtx.createGain();
                noteGain.gain.value = 0;
                
                // Vibrato bağlantıları
                vibrato.connect(vibratoGain);
                vibratoGain.connect(osc.frequency);
                
                // Ana bağlantılar
                osc.connect(noteGain);
                noteGain.connect(masterGain);
                
                // Sesi başlat ve envelope uygula
                osc.start(startTime);
                vibrato.start(startTime);
                
                noteGain.gain.setValueAtTime(0, startTime);
                noteGain.gain.linearRampToValueAtTime(0.1, startTime + step.duration * 0.1);
                noteGain.gain.linearRampToValueAtTime(0.2, startTime + step.duration * 0.3);
                noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + step.duration + 0.5);
                
                osc.stop(startTime + step.duration + 0.6);
                vibrato.stop(startTime + step.duration + 0.6);
                
                startTime += step.duration;
            });
            
            // Hüzünlü arka plan akoru - A minör
            const chordNotes = [220.00, 261.63, 329.63]; // A, C, E (minör akor)
            
            chordNotes.forEach(note => {
                const oscChord = audioCtx.createOscillator();
                oscChord.type = 'sine';
                oscChord.frequency.value = note;
                
                const chordGain = audioCtx.createGain();
                chordGain.gain.value = 0;
                
                oscChord.connect(chordGain);
                chordGain.connect(masterGain);
                
                oscChord.start(audioCtx.currentTime);
                chordGain.gain.setValueAtTime(0, audioCtx.currentTime);
                chordGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.8);
                chordGain.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 2.5);
                chordGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 5);
                
                oscChord.stop(audioCtx.currentTime + 5.5);
            });
            
        } catch(e) {
            console.log("Hüzünlü melodi oluşturulamadı:", e);
        }
    }
    
    reset() {
        // Yeni bir başlangıç randomluğu belirle
        this.startingPhraseIndex = Math.floor(Math.random() * this.phrases.length);
        
        // Rastgele yeni yaprak sayısı (18-28 arası)
        const newPetalCount = Math.floor(Math.random() * 11) + 18;
        this.totalPetals = newPetalCount;
        
        // Papatya modelini sıfırla ve yeni yaprak sayısını güncelle
        this.daisyModel.updatePetalCount(newPetalCount);
        this.petalsRemoved = 0;
        this.currentPetal = 0;
        
        // Metinleri sıfırla
        const resultTextElement = document.getElementById(this.resultTextId);
        if (resultTextElement) {
            resultTextElement.innerText = "Bir taç yaprağı kopar...";
        }
        
        // Yeniden başlat butonunu gizle
        const resetButton = document.getElementById('reset-button');
        if (resetButton) {
            resetButton.style.display = 'none';
        }
    }
}

/**
 * Sayfa Yöneticisi
 * Sayfa UI elementlerini kontrol eder
 */
class GameManager {
    constructor() {
        this.lovePredictor = null;
        this.initialize();
    }
    
    initialize() {
        // Rastgele yaprak sayısı (18-28 arasında)
        const randomPetalCount = Math.floor(Math.random() * 11) + 18;
        
        // Daha çeşitli sonuç ifadeleri - Rastgele sıralı seviyor/sevmiyor dizisi
        const basePhrases = ["Seviyor", "Sevmiyor"];
        const phrases = [];
        
        // 6-10 arası rastgele tekrar sayısı (daha önceleri hep 6 kelimeydi)
        const repeatCount = Math.floor(Math.random() * 5) + 6;
        
        // Seviyor/sevmiyor ifadelerini rastgele bir düzende ekle
        for (let i = 0; i < repeatCount; i++) {
            // Sırayı karıştır
            if (Math.random() > 0.5) {
                phrases.push(basePhrases[0], basePhrases[1]); // Seviyor, Sevmiyor
            } else {
                phrases.push(basePhrases[1], basePhrases[0]); // Sevmiyor, Seviyor
            }
        }
        
        // Oyun nesnesini oluştur
        this.lovePredictor = new LovePredictor({
            petalCount: Math.floor(Math.random() * 11) + 18, // 18-28 arası rastgele sayı
            phrases: phrases
        });
        
        // Yeniden başlat butonu
        const resetButton = document.getElementById('reset-button');
        if (resetButton) {
            resetButton.addEventListener('click', this.onReset.bind(this));
        }
        
        // Ekranı yeniden boyutlandır
        window.addEventListener('resize', this.onResize.bind(this));
        
        // İlk yükleme - animasyon ekle
        this.addInitialAnimation();
    }
    
    onReset() {
        this.lovePredictor.reset();
        
        // Reset butonuna animasyon ekle
        const resetButton = document.getElementById('reset-button');
        resetButton.classList.add('rotate-animation');
        setTimeout(() => {
            resetButton.classList.remove('rotate-animation');
        }, 500);
    }
    
    onResize() {
        // Gerekirse yeniden yerleştir
    }
    
    addInitialAnimation() {
        // Sayfa yüklendiğinde papatyaya giriş animasyonu ekle
        const daisyContainer = document.getElementById('daisy-container');
        
        if (daisyContainer) {
            daisyContainer.style.opacity = 0;
            daisyContainer.style.transform = 'scale(0.9) translateY(20px)';
            daisyContainer.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
            
            setTimeout(() => {
                daisyContainer.style.opacity = 1;
                daisyContainer.style.transform = 'scale(1) translateY(0)';
            }, 300);
        }
        
        // Başlık için animasyon
        const titleElement = document.querySelector('.game-title');
        if (titleElement) {
            titleElement.style.opacity = 0;
            titleElement.style.transform = 'translateY(-20px)';
            titleElement.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
            
            setTimeout(() => {
                titleElement.style.opacity = 1;
                titleElement.style.transform = 'translateY(0)';
            }, 600);
        }
    }
}

// Sayfa yüklendiğinde oyunu başlat
window.addEventListener('DOMContentLoaded', () => {
    window.gameManager = new GameManager();
}); 