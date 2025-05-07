/**
 * Papatya Modeli (SVG Tabanlı)
 * Daha güvenilir ve basit bir papatya modellemesi
 */

class DaisyModel {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        
        // SVG namespace
        this.svgNS = "http://www.w3.org/2000/svg";
        
        // Boyutlar
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        
        // Yaprak sayısı ve durum
        this.petalCount = options.petalCount || 24;
        this.petals = [];
        this.currentPetal = 0;
        this.onPetalRemoved = options.onPetalRemoved || function() {};
        
        // SVG oluştur
        this.createSvg();
        
        // Rastgele ID
        this.randomId = Math.floor(Math.random() * 1000000);
        
        // Papatya oluştur
        this.createDaisy();
        
        // Tıklama olayı ekle
        this.container.addEventListener('click', this.handleClick.bind(this));
    }
    
    createSvg() {
        // Ana SVG elementini oluştur
        this.svg = document.createElementNS(this.svgNS, "svg");
        this.svg.setAttribute("width", "100%");
        this.svg.setAttribute("height", "100%");
        this.svg.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
        
        // Defs bölümü - filtreler ve gradientler için
        this.defs = document.createElementNS(this.svgNS, "defs");
        
        // Filtreler
        this.createFilters();
        
        this.svg.appendChild(this.defs);
        
        // Ana gruplar
        this.mainGroup = document.createElementNS(this.svgNS, "g");
        this.stemGroup = document.createElementNS(this.svgNS, "g");
        this.daisyGroup = document.createElementNS(this.svgNS, "g");
        
        this.mainGroup.appendChild(this.stemGroup);
        this.mainGroup.appendChild(this.daisyGroup);
        this.svg.appendChild(this.mainGroup);
        
        // Konteyner'e ekle
        this.container.appendChild(this.svg);
    }
    
    createFilters() {
        // Hafif gölge filtresi
        const shadowFilter = document.createElementNS(this.svgNS, "filter");
        shadowFilter.setAttribute("id", `shadow-${this.randomId}`);
        
        const feDropShadow = document.createElementNS(this.svgNS, "feDropShadow");
        feDropShadow.setAttribute("dx", "0");
        feDropShadow.setAttribute("dy", "2");
        feDropShadow.setAttribute("stdDeviation", "2");
        feDropShadow.setAttribute("flood-color", "rgba(0,0,0,0.3)");
        
        shadowFilter.appendChild(feDropShadow);
        this.defs.appendChild(shadowFilter);
        
        // Doku filtresi - daha belirgin
        const textureFilter = document.createElementNS(this.svgNS, "filter");
        textureFilter.setAttribute("id", `texture-${this.randomId}`);
        
        const feTurbulence = document.createElementNS(this.svgNS, "feTurbulence");
        feTurbulence.setAttribute("type", "fractalNoise");
        feTurbulence.setAttribute("baseFrequency", "0.8");
        feTurbulence.setAttribute("numOctaves", "2");
        feTurbulence.setAttribute("stitchTiles", "stitch");
        feTurbulence.setAttribute("result", "noise");
        
        const feDisplacementMap = document.createElementNS(this.svgNS, "feDisplacementMap");
        feDisplacementMap.setAttribute("in", "SourceGraphic");
        feDisplacementMap.setAttribute("in2", "noise");
        feDisplacementMap.setAttribute("scale", "2");
        feDisplacementMap.setAttribute("xChannelSelector", "R");
        feDisplacementMap.setAttribute("yChannelSelector", "G");
        
        textureFilter.appendChild(feTurbulence);
        textureFilter.appendChild(feDisplacementMap);
        this.defs.appendChild(textureFilter);
    }
    
    createDaisy() {
        const daisySize = Math.min(this.width, this.height) * 0.6;
        const centerRadius = daisySize * 0.15;
        const petalLength = daisySize * 0.4;
        const petalWidth = daisySize * 0.12;
        
        // Sap
        const stem = document.createElementNS(this.svgNS, "path");
        const stemHeight = daisySize * 0.7;
        const stemStartY = this.centerY + centerRadius * 0.7;
        const stemPath = `M ${this.centerX},${stemStartY} C ${this.centerX - 20},${stemStartY + stemHeight/3} ${this.centerX + 20},${stemStartY + stemHeight*2/3} ${this.centerX},${stemStartY + stemHeight}`;
        
        stem.setAttribute("d", stemPath);
        stem.setAttribute("stroke", "#7CB342");
        stem.setAttribute("stroke-width", daisySize * 0.02);
        stem.setAttribute("fill", "none");
        
        this.stemGroup.appendChild(stem);
        
        // Yapraklar (sap yaprakları)
        const leafCount = 2;
        for (let i = 0; i < leafCount; i++) {
            const leaf = document.createElementNS(this.svgNS, "path");
            
            const leafPosition = stemStartY + stemHeight * (0.3 + i * 0.25);
            const leafSize = daisySize * (0.2 - i * 0.05);
            const leafDirection = i % 2 === 0 ? -1 : 1;
            
            const leafPath = this.createLeafPath(this.centerX, leafPosition, leafSize, leafDirection);
            
            leaf.setAttribute("d", leafPath);
            leaf.setAttribute("fill", "#8BC34A");
            leaf.setAttribute("stroke", "#7CB342");
            leaf.setAttribute("stroke-width", "1");
            
            this.stemGroup.appendChild(leaf);
        }
        
        // Merkez (sarı kısım)
        const center = document.createElementNS(this.svgNS, "circle");
        center.setAttribute("cx", this.centerX);
        center.setAttribute("cy", this.centerY);
        center.setAttribute("r", centerRadius);
        center.setAttribute("fill", "#FFC107");
        center.setAttribute("filter", `url(#texture-${this.randomId})`);
        
        this.daisyGroup.appendChild(center);
        
        // Üst katman - taç yapraklar
        for (let i = 0; i < this.petalCount; i++) {
            const angle = (360 / this.petalCount) * i * (Math.PI / 180);
            const petalGroup = document.createElementNS(this.svgNS, "g");
            petalGroup.setAttribute("class", "petal");
            petalGroup.setAttribute("data-index", i);
            
            // Yapraklar sarı merkeze daha yakından başlasın
            const startX = this.centerX + Math.cos(angle) * (centerRadius * 0.95);
            const startY = this.centerY + Math.sin(angle) * (centerRadius * 0.95);
            
            // Yaprak uzunluğu biraz değişken olsun - daha doğal bir görünüm için
            const petalLengthVariation = 0.9 + Math.random() * 0.2;
            const endX = this.centerX + Math.cos(angle) * (petalLength * petalLengthVariation + centerRadius);
            const endY = this.centerY + Math.sin(angle) * (petalLength * petalLengthVariation + centerRadius);
            
            // Yaprak genişliği için perpendicular açı
            const perpAngle = angle + Math.PI / 2;
            const petalWidthFactor = 0.4 + Math.random() * 0.1; // Biraz varyasyon
            
            // Kontrol noktalarını hesapla - klasik bir yaprak şekli
            const cp1x = startX + Math.cos(angle) * petalLength * 0.3 + Math.cos(perpAngle) * petalWidth * petalWidthFactor;
            const cp1y = startY + Math.sin(angle) * petalLength * 0.3 + Math.sin(perpAngle) * petalWidth * petalWidthFactor;
            
            const cp2x = startX + Math.cos(angle) * petalLength * 0.7 + Math.cos(perpAngle) * petalWidth * petalWidthFactor;
            const cp2y = startY + Math.sin(angle) * petalLength * 0.7 + Math.sin(perpAngle) * petalWidth * petalWidthFactor;
            
            const cp3x = startX + Math.cos(angle) * petalLength * 0.7 - Math.cos(perpAngle) * petalWidth * petalWidthFactor;
            const cp3y = startY + Math.sin(angle) * petalLength * 0.7 - Math.sin(perpAngle) * petalWidth * petalWidthFactor;
            
            const cp4x = startX + Math.cos(angle) * petalLength * 0.3 - Math.cos(perpAngle) * petalWidth * petalWidthFactor;
            const cp4y = startY + Math.sin(angle) * petalLength * 0.3 - Math.sin(perpAngle) * petalWidth * petalWidthFactor;
            
            // Yaprak çizimi - daha yumuşak bezier eğrileri
            const petalPath = `
                M ${startX} ${startY}
                C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}
                C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${startX} ${startY}
            `;
            
            // Hafif ışık/gölge efekti
            const highlight = document.createElementNS(this.svgNS, "path");
            highlight.setAttribute("d", petalPath);
            highlight.setAttribute("fill", "white");
            highlight.setAttribute("opacity", "0.05");
            highlight.setAttribute("transform", `translate(${Math.cos(angle+Math.PI/4)*2}, ${Math.sin(angle+Math.PI/4)*2})`);
            
            // Ana yaprak
            const petal = document.createElementNS(this.svgNS, "path");
            petal.setAttribute("d", petalPath);
            petal.setAttribute("fill", "white");
            petal.setAttribute("stroke", "#f5f5f5");
            petal.setAttribute("stroke-width", "0.5");
            petal.setAttribute("filter", `url(#shadow-${this.randomId})`);
            
            petalGroup.appendChild(highlight);
            petalGroup.appendChild(petal);
            
            this.daisyGroup.appendChild(petalGroup);
            this.petals.push(petalGroup);
        }
        
        // Merkez üst detayı (polen dokusu)
        const centerDetail = document.createElementNS(this.svgNS, "circle");
        centerDetail.setAttribute("cx", this.centerX);
        centerDetail.setAttribute("cy", this.centerY);
        centerDetail.setAttribute("r", centerRadius * 0.8);
        centerDetail.setAttribute("fill", "#FFA000");
        centerDetail.setAttribute("opacity", "0.7");
        centerDetail.setAttribute("filter", `url(#texture-${this.randomId})`);
        
        this.daisyGroup.appendChild(centerDetail);
    }
    
    // Sap yaprağı şekli
    createLeafPath(stemX, stemY, size, direction) {
        const tipX = stemX + direction * size * 1.5;
        const tipY = stemY;
        
        const cp1x = stemX + direction * size * 0.5;
        const cp1y = stemY - size * 0.7;
        
        const cp2x = stemX + direction * size * 1.2;
        const cp2y = stemY - size * 0.5;
        
        const cp3x = stemX + direction * size * 1.2;
        const cp3y = stemY + size * 0.5;
        
        const cp4x = stemX + direction * size * 0.5;
        const cp4y = stemY + size * 0.7;
        
        return `
            M ${stemX},${stemY}
            C ${cp1x},${cp1y} ${cp2x},${cp2y} ${tipX},${tipY}
            C ${cp3x},${cp3y} ${cp4x},${cp4y} ${stemX},${stemY}
        `;
    }
    
    handleClick(e) {
        if (this.currentPetal < this.petalCount) {
            this.playPetalSound();
            this.removePetal();
        }
    }
    
    playPetalSound() {
        try {
            // Web Audio API kullanarak daha sevimli bir ses oluştur
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Ana melodi osilatörü - daha yumuşak bir ton
            const oscillator1 = audioCtx.createOscillator();
            oscillator1.type = 'sine'; // En yumuşak dalga formu
            
            // Sevimli çıngırak notaları - D majör (re majör) akorundan
            const notes = [587.33, 659.25, 783.99]; // D, E, G notaları
            oscillator1.frequency.value = notes[Math.floor(Math.random() * notes.length)];
            
            // İkinci osilatör - daha hafif ton, harmonik
            const oscillator2 = audioCtx.createOscillator();
            oscillator2.type = 'sine';
            oscillator2.frequency.value = oscillator1.frequency.value * 1.5; // bir beşli üstü
            
            // Üçüncü osilatör - çok hafif parlak detay
            const oscillator3 = audioCtx.createOscillator();
            oscillator3.type = 'triangle'; // çok hafif harmonik
            oscillator3.frequency.value = oscillator1.frequency.value * 2; // bir oktav üstü
            
            // Reverb efekti - daha uzun ve yumuşak
            const convolver = audioCtx.createConvolver();
            const reverbLength = audioCtx.sampleRate * 2.5; // 2.5 saniyelik reverb
            const reverbBuffer = audioCtx.createBuffer(2, reverbLength, audioCtx.sampleRate);
            
            // Daha yumuşak reverb impulse response oluştur
            for (let channel = 0; channel < 2; channel++) {
                const reverbData = reverbBuffer.getChannelData(channel);
                for (let i = 0; i < reverbLength; i++) {
                    // Daha yumuşak, yavaş azalan bir reverb
                    reverbData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbLength, 3);
                }
            }
            
            convolver.buffer = reverbBuffer;
            
            // Düşük geçiş filtresi - sesi daha yumuşat
            const lowpassFilter = audioCtx.createBiquadFilter();
            lowpassFilter.type = "lowpass";
            lowpassFilter.frequency.value = 2000;
            lowpassFilter.Q.value = 0.7;
            
            // Volume kontrolleri
            const gainNode1 = audioCtx.createGain();
            gainNode1.gain.value = 0;
            
            const gainNode2 = audioCtx.createGain();
            gainNode2.gain.value = 0;
            
            const gainNode3 = audioCtx.createGain();
            gainNode3.gain.value = 0;
            
            const masterGain = audioCtx.createGain();
            masterGain.gain.value = 0.15; // Düşük ana ses seviyesi
            
            // Bağlantılar
            oscillator1.connect(gainNode1);
            oscillator2.connect(gainNode2);
            oscillator3.connect(gainNode3);
            
            gainNode1.connect(lowpassFilter);
            gainNode2.connect(lowpassFilter);
            gainNode3.connect(lowpassFilter);
            
            lowpassFilter.connect(convolver);
            convolver.connect(masterGain);
            masterGain.connect(audioCtx.destination);
            
            // Sesleri başlat
            oscillator1.start();
            oscillator2.start();
            oscillator3.start();
            
            // Çok yumuşak atak ve uzun düşüş - sanki bir çiçek tanesi düşüyor gibi
            gainNode1.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode1.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.04);
            gainNode1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);
            
            gainNode2.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode2.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.08);
            gainNode2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
            
            gainNode3.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode3.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.1);
            gainNode3.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
            
            // Temizleme
            setTimeout(() => {
                oscillator1.stop();
                oscillator2.stop();
                oscillator3.stop();
            }, 2500); // Daha uzun süre bırak
        } catch(e) {
            console.log("Ses oluşturulamadı:", e);
        }
    }
    
    removePetal() {
        if (this.currentPetal < this.petalCount) {
            const petal = this.petals[this.currentPetal];
            const petalIndex = this.currentPetal;
            this.currentPetal++;
            
            // Yaprak pozisyonunu al
            const petalElement = petal.querySelector('path:last-child');
            const bbox = petalElement.getBBox();
            const centerX = bbox.x + bbox.width / 2;
            const centerY = bbox.y + bbox.height / 2;
            
            // Sarsılma animasyonu - daha doğal görünsün
            const shake = () => {
                // Yaprak vurgusu - kullanıcıya hangi yaprağı koparacağını göster
                petal.style.transform = `scale(1.05) rotate(${Math.random() * 10 - 5}deg)`;
                petal.style.transformOrigin = 'center';
                petal.style.transition = 'transform 0.2s ease-in-out';
                
                // Kısa süre sonra kopma efekti
                setTimeout(() => {
                    // Yaprak kopma anı - DOM'dan kaldır ve CSS animasyon elementine dönüştür
                    const rect = petal.getBoundingClientRect();
                    const containerRect = this.container.getBoundingClientRect();
                    
                    // Sarsılmayı sıfırla
                    petal.style.transform = '';
                    
                    // Gerçek DOM elementini kaldır
                    petal.remove();
                    
                    // CSS animasyonu için yaprak elementini oluştur
                    const fallingPetal = document.createElement('div');
                    fallingPetal.className = 'falling-petal';
                    
                    // SVG içeriğini kopyala
                    fallingPetal.innerHTML = petal.innerHTML;
                    
                    // Pozisyonu ayarla
                    fallingPetal.style.position = 'absolute';
                    fallingPetal.style.left = `${rect.left - containerRect.left}px`;
                    fallingPetal.style.top = `${rect.top - containerRect.top}px`;
                    fallingPetal.style.width = `${rect.width}px`;
                    fallingPetal.style.height = `${rect.height}px`;
                    fallingPetal.style.pointerEvents = 'none';
                    fallingPetal.style.zIndex = '100';
                    fallingPetal.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))';
                    
                    // Konteyner'e ekle
                    this.container.appendChild(fallingPetal);
                    
                    // Düşme animasyonu başlat
                    startFallingAnimation(fallingPetal, rect.left, rect.top);
                    
                    // Parçacık efekti
                    this.createParticles(centerX, centerY);
                    
                    // Geri çağırma
                    this.onPetalRemoved(this.currentPetal, this.petalCount);
                }, 300);
            };
            
            // Süzülerek düşme animasyonu - daha yumuşak ve daha uzun
            const startFallingAnimation = (petal, startX, startY) => {
                // Süzülme animasyonu için zamanlama
                const duration = 2000 + Math.random() * 800; // Daha uzun süre
                
                // Animasyon değişkenleri
                const startTime = Date.now();
                let lastTime = startTime;
                
                // Başlangıç pozisyonu
                let currentX = startX;
                let currentY = startY;
                
                // Hedef pozisyon - rastgele bir yere düşsün
                const endX = startX + (Math.random() * 250 - 125);
                const endY = window.innerHeight + 100 + Math.random() * 100; // Ekranın altına kadar düşsün
                
                // Rotasyon değişkenleri
                const rotationSpeed = 0.05; // Daha yavaş dönüş
                const initialRotation = Math.random() * 20 - 10;
                const totalRotation = Math.random() * 360 - 180;
                
                // Sallanma değişkenleri - hafif sağa sola sallanma
                const swingAmplitude = 25 + Math.random() * 30;
                const swingFrequency = 0.2 + Math.random() * 0.3; // Daha yavaş sallanma
                
                // Bezier eğrisi için kontrol noktaları - daha doğal bir düşüş
                const controlPoint1X = startX + (endX - startX) * 0.3 + (Math.random() * 40 - 20);
                const controlPoint1Y = startY + (endY - startY) * 0.3;
                const controlPoint2X = startX + (endX - startX) * 0.7 + (Math.random() * 40 - 20);
                const controlPoint2Y = startY + (endY - startY) * 0.7;
                
                const animate = () => {
                    const now = Date.now();
                    const elapsed = now - startTime;
                    
                    if (elapsed < duration) {
                        // Bezier eğrisi üzerindeki konum
                        const t = elapsed / duration;
                        
                        // Cubic Bezier interpolasyon
                        const u = 1 - t;
                        const tt = t * t;
                        const uu = u * u;
                        const uuu = uu * u;
                        const ttt = tt * t;
                        
                        // 3D hareket hissi vermek için küçük sallanma ekle
                        const swingOffset = Math.sin(t * Math.PI * 2 * swingFrequency) * swingAmplitude * (1 - t);
                        
                        let x = uuu * startX + 
                                3 * uu * t * controlPoint1X + 
                                3 * u * tt * controlPoint2X + 
                                ttt * endX;
                        
                        const y = uuu * startY + 
                                3 * uu * t * controlPoint1Y + 
                                3 * u * tt * controlPoint2Y + 
                                ttt * endY;
                        
                        // Sallanma ekle
                        x += swingOffset;
                        
                        // Rotasyon - daha yumuşak ve doğal
                        const currentRotation = initialRotation + t * totalRotation;
                        
                        // Boyut değişimi - hafifçe küçülsün
                        const scale = 1 - t * 0.15;
                        
                        // Opaklık - yavaşça kaybolsun
                        const opacity = 1 - Math.pow(t, 2) * 0.7; // Daha geç kaybolmaya başlasın
                        
                        // Transformasyonu uygula
                        petal.style.transform = `translate(${x - startX}px, ${y - startY}px) rotate(${currentRotation}deg) scale(${scale})`;
                        petal.style.opacity = opacity;
                        
                        requestAnimationFrame(animate);
                    } else {
                        // Animasyon tamamlandı, elementi kaldır
                        petal.remove();
                    }
                };
                
                // Animasyonu başlat
                requestAnimationFrame(animate);
            };
            
            // Sarsılma animasyonunu başlat
            shake();
        }
    }
    
    createParticles(x, y) {
        const particleCount = 8 + Math.floor(Math.random() * 4);
        const particles = [];
        
        // Konteyner rect
        const containerRect = this.container.getBoundingClientRect();
        
        for (let i = 0; i < particleCount; i++) {
            // Daha küçük ve zarif parçacıklar
            const particle = document.createElement('div');
            particle.className = 'petal-particle';
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 4 + 1}px`;
            particle.style.height = `${Math.random() * 4 + 1}px`;
            particle.style.borderRadius = '50%';
            
            // Temaya uygun renkler - pembe tonları
            const hue = 350 + Math.random() * 20; // 350-370 arası (0-360 arasında, 10 değer taşma sorun değil)
            const saturation = 80 + Math.random() * 20; // 80%-100%
            const lightness = 70 + Math.random() * 20; // 70%-90%
            
            particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            particle.style.boxShadow = `0 0 2px rgba(255, 100, 150, 0.8)`;
            
            // Başlangıç pozisyonu - yaprak kopma noktası
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // Konteyner'e ekle
            this.container.appendChild(particle);
            particles.push(particle);
            
            // Rastgele yönde fırlatma
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 40;
            const duration = 400 + Math.random() * 400;
            
            // GSAP animasyonu
            gsap.to(particle, {
                duration: duration / 1000,
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                scale: 0.4,
                ease: "power1.out",
                onComplete: function() {
                    particle.remove();
                }
            });
        }
    }
    
    reset() {
        // Mevcut yaprakları temizle
        while (this.daisyGroup.firstChild) {
            this.daisyGroup.removeChild(this.daisyGroup.firstChild);
        }
        
        while (this.stemGroup.firstChild) {
            this.stemGroup.removeChild(this.stemGroup.firstChild);
        }
        
        // Değişkenleri sıfırla
        this.petals = [];
        this.currentPetal = 0;
        
        // Yeni papatya oluştur
        this.createDaisy();
    }
}

// DaisyModel sınıfını dışa aktar
window.DaisyModel = DaisyModel; 