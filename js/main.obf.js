// Önce _0x180a dizisini tanımla
if (typeof _0x180a === 'undefined') {
    var _0x180a=[
        '.hearts',
        '.hearts',
        '.background-decorations',
        '.game-container',
        'power1.out',
        'love-meter-fill',
        '.love-meter-text',
        '.info-toggle',
        '.info-popup',
        '.info-popup-close',
        '.overlay',
        '.info-popup-content',
        '.info-cards.left .info-card',
        '.info-cards.right .info-card:not(.horoscope-card)',
        '.horoscope-card',
        '#horoscope-text',
        'back.out(1.5)'
    ];
}

// Obfuscated version of main.js
(function(_0x4c3d,_0x2c9d3f){
    var _0x4e4d3a=function(_0x5c97e4){
        while(--_0x5c97e4){
            _0x4c3d['push'](_0x4c3d['shift']());
        }
    };
    _0x4e4d3a(++_0x2c9d3f);
}(_0x180a,0x1b3));

var _0x4de5=function(_0x2d8f05,_0x4b81bb){
    _0x2d8f05=_0x2d8f05-0x0;
    var _0x4d74cb=_0x180a[_0x2d8f05];
    return _0x4d74cb;
};

document['addEventListener']('DOMContentLoaded',function(){
    const _0x5a42f8=['❤️','💗','💕','💓','💖'];
    const _0x5a8b90=document['querySelector'](_0x4de5('0x0'))||document['createElement']('div');
    if(!document['querySelector'](_0x4de5('0x1'))){
        _0x5a8b90['className']='hearts';
        document['body']['appendChild'](_0x5a8b90);
    }
    for(let _0x5a8b91=0x0;_0x5a8b91<0xf;_0x5a8b91++){
        const _0x2c9d40=document['createElement']('div');
        _0x2c9d40['className']='heart';
        _0x2c9d40['textContent']=_0x5a42f8[Math['floor'](Math['random']()*_0x5a42f8['length'])];
        _0x2c9d40['style']['left']=Math['random']()*0x64+'%';
        _0x2c9d40['style']['top']=Math['random']()*0x64+'%';
        _0x2c9d40['style']['animationDelay']=Math['random']()*0xf+'s';
        _0x2c9d40['style']['animationDuration']=0xf+Math['random']()*0xf+'s';
        _0x5a8b90['appendChild'](_0x2c9d40);
    }
    const _0x2c9d41=document['querySelector'](_0x4de5('0x2'));
    for(let _0x5a8b92=0x0;_0x5a8b92<0xf;_0x5a8b92++){
        const _0x2c9d42=Math['random']()*0x96+0x32;
        const _0x2c9d43=document['createElement']('div');
        _0x2c9d43['className']='bg-bubble';
        _0x2c9d43['style']['width']=`${_0x2c9d42}px`;
        _0x2c9d43['style']['height']=`${_0x2c9d42}px`;
        _0x2c9d43['style']['left']=`${Math['random']()*0x64}%`;
        _0x2c9d43['style']['animationDelay']=`${Math['random']()*0x14}s`;
        _0x2c9d43['style']['animationDuration']=`${Math['random']()*0xf+0xf}s`;
        _0x2c9d41['appendChild'](_0x2c9d43);
    }
    for(let _0x5a8b93=0x0;_0x5a8b93<0xc;_0x5a8b93++){
        const _0x2c9d44=document['createElement']('div');
        _0x2c9d44['className']='floating-heart';
        _0x2c9d44['textContent']=_0x5a42f8[Math['floor'](Math['random']()*_0x5a42f8['length'])];
        _0x2c9d44['style']['left']=`${Math['random']()*0x64}%`;
        _0x2c9d44['style']['top']=`${Math['random']()*0x64}%`;
        _0x2c9d44['style']['animationDelay']=`${Math['random']()*0x5}s`;
        _0x2c9d44['style']['animationDuration']=`${Math['random']()*0x5+0x7}s`;
        _0x2c9d44['style']['transform']=`scale(${Math['random']()*0.5+0.5})`;
        _0x2c9d44['style']['opacity']=`${Math['random']()*0.3+0.1}`;
        _0x2c9d41['appendChild'](_0x2c9d44);
    }
    document['addEventListener']('mousemove',function(_0x2c9d45){
        const _0x2c9d46=document['querySelector'](_0x4de5('0x3'));
        if(_0x2c9d46 && typeof gsap !== 'undefined') {
            const _0x2c9d47=(_0x2c9d45['clientX']/window['innerWidth']-0.5)*0xa;
            const _0x2c9d48=(_0x2c9d45['clientY']/window['innerHeight']-0.5)*0xa;
            gsap['to'](_0x2c9d46,{
                'rotationY':_0x2c9d47*0.5,
                'rotationX':-_0x2c9d48*0.5,
                'transformPerspective':0x3e8,
                'duration':0.5,
                'ease':'power1.out'
            });
        }
    });
    function _0x2c9d49(){
        const _0x2c9d4a=document['getElementById']('love-meter-fill');
        const _0x2c9d4b=document['querySelector']('.love-meter-text');
        
        if(!_0x2c9d4a || !_0x2c9d4b) return;
        
        const _0x2c9d4c=Math['floor'](Math['random']()*0x65);
        _0x2c9d4a['style']['width']=`${_0x2c9d4c}%`;
        _0x2c9d4b['textContent']=`Aşk Enerjisi %${_0x2c9d4c}`;
        if(_0x2c9d4c>0x46){
            _0x2c9d4b['style']['color']='white';
        }else if(_0x2c9d4c>0x1e){
            _0x2c9d4b['style']['color']='white';
        }else{
            _0x2c9d4b['style']['color']='#555';
        }
        setTimeout(_0x2c9d49,0xbb8+Math['random']()*0x7d0);
    }
    setTimeout(_0x2c9d49,0x5dc);
    const _0x2c9d4d=document['querySelector'](_0x4de5('0x7'));
    const _0x2c9d4e=document['querySelector'](_0x4de5('0x8'));
    const _0x2c9d4f=document['querySelector'](_0x4de5('0x9'));
    const _0x2c9d50=document['querySelector'](_0x4de5('0xa'));
    const _0x2c9d51=document['querySelector'](_0x4de5('0xb'));
    function _0x2c9d52(){
        _0x2c9d51['innerHTML']='';
        const _0x2c9d53=document['querySelectorAll'](_0x4de5('0xc'));
        const _0x2c9d54=document['querySelectorAll'](_0x4de5('0xd'));
        [..._0x2c9d53,..._0x2c9d54]['forEach'](_0x2c9d55=>{
            const _0x2c9d56=_0x2c9d55['cloneNode'](!![]);
            _0x2c9d56['style']['animationDelay']='0s';
            _0x2c9d51['appendChild'](_0x2c9d56);
        });
        const _0x2c9d57=document['querySelector'](_0x4de5('0xe'));
        if(_0x2c9d57){
            const _0x2c9d58=_0x2c9d57['cloneNode'](!![]);
            _0x2c9d58['style']['animationDelay']='0s';
            const _0x2c9d59=_0x2c9d58['querySelector']('select');
            const _0x2c9d5a=_0x2c9d58['querySelector'](_0x4de5('0xf'));
            if(_0x2c9d59&&_0x2c9d5a){
                _0x2c9d59['id']='popup-zodiac-select';
                _0x2c9d5a['id']='popup-horoscope-text';
                _0x2c9d59['addEventListener']('change',function(){
                    const _0x2c9d5b=this['value'];
                    _0x2c9d68(_0x2c9d5b,_0x2c9d5a);
                    const _0x2c9d5c=document['getElementById']('zodiac-select');
                    if(_0x2c9d5c&&_0x2c9d5c['value']!==_0x2c9d5b){
                        _0x2c9d5c['value']=_0x2c9d5b;
                        _0x2c9d68(_0x2c9d5b,document['getElementById']('horoscope-text'));
                    }
                });
                const _0x2c9d5d=document['getElementById']('zodiac-select');
                if(_0x2c9d5d){
                    _0x2c9d59['value']=_0x2c9d5d['value'];
                    _0x2c9d68(_0x2c9d5d['value'],_0x2c9d5a);
                }
            }
            _0x2c9d51['appendChild'](_0x2c9d58);
        }
    }
    function _0x2c9d5e(){
        _0x2c9d52();
        _0x2c9d4e['style']['display']='block';
        _0x2c9d50['style']['display']='block';
        if(typeof gsap !== 'undefined') {
            gsap['fromTo'](_0x2c9d4e,{
                'opacity':0x0,
                'scale':0.8
            },{
                'opacity':0x1,
                'scale':0x1,
                'duration':0.3,
                'ease':'back.out(1.5)'
            });
        }
    }
    function _0x2c9d5f(){
        if(typeof gsap !== 'undefined') {
            gsap['to'](_0x2c9d4e,{
                'opacity':0x0,
                'scale':0.8,
                'duration':0.2,
                'onComplete':()=>{
                    _0x2c9d4e['style']['display']='none';
                    _0x2c9d50['style']['display']='none';
                }
            });
        } else {
            _0x2c9d4e['style']['display']='none';
            _0x2c9d50['style']['display']='none';
        }
    }
    if(_0x2c9d4d) _0x2c9d4d['addEventListener']('click',_0x2c9d5e);
    if(_0x2c9d4f) _0x2c9d4f['addEventListener']('click',_0x2c9d5f);
    if(_0x2c9d50) _0x2c9d50['addEventListener']('click',_0x2c9d5f);

    // Burç bilgisi kısmı
    const _0x2c9d60=document['getElementById']('zodiac-select');
    const _0x2c9d61=document['getElementById']('horoscope-text');
    
    if(_0x2c9d60 && _0x2c9d61){
        function _0x2c9d62(_0x2c9d63){
            const _0x2c9d64 = {
                'today':'bugün 📅',
                'you':'sen 👤',
                'your':'senin 👉',
                'will':'olacak ✨',
                'may':'olabilir 🤔',
                'might':'olabilir 🤷‍♂️',
                'could':'olabilir 💭',
                'should':'gerekir ⚠️',
                'would':'olurdu 💫',
                'can':'yapabilirsin ✅',
                'friends':'arkadaşlar 👫',
                'family':'aile 👨‍👩‍👧‍👦',
                'love':'aşk ❤️',
                'work':'iş 💼',
                'money':'para 💰',
                'time':'zaman ⏰',
                'day':'gün 📆',
                'energy':'enerji ⚡',
                'luck':'şans 🍀',
                'opportunity':'fırsat 🎯',
                'challenge':'zorluk 🏋️‍♂️',
                'relationship':'ilişki 💑',
                'partner':'partner 👫',
                'need':'ihtiyaç 🙏',
                'focus':'odak 🎯',
                'change':'değişim 🔄',
                'success':'başarı 🏆',
                'feel':'hisset 👐',
                'feeling':'his 💭',
                'emotions':'duygular 😊',
                'emotional':'duygusal 😢',
                'happy':'mutlu 😄',
                'sad':'üzgün 😔',
                'heart':'kalp ❤️',
                'mind':'zihin 🧠',
                'think':'düşün 💭',
                'important':'önemli ⭐',
                'life':'hayat 🌈',
                'future':'gelecek 🔮',
                'past':'geçmiş 📜',
                'present':'şimdiki zaman ⏱️',
                'plans':'planlar 📝',
                'good':'iyi 👍',
                'bad':'kötü 👎',
                'great':'harika 🌟',
                'wonderful':'muhteşem 🎉',
                'terrible':'berbat 😱',
                'beautiful':'güzel 🌹',
                'ugly':'çirkin 🥀',
                'health':'sağlık 🏥',
                'wealth':'zenginlik 💎',
                'wisdom':'bilgelik 📚',
                'dream':'rüya 💫',
                'hopes':'umutlar 🌠',
                'fears':'korkular 😨',
                'experience':'deneyim 🧠',
                'adventure':'macera 🚀',
                'journey':'yolculuk 🧳'
            };
            
            let _0x2c9d65 = _0x2c9d63;
            
            // Kelime çevirisi
            Object['keys'](_0x2c9d64)['forEach'](_0x2c9d66 => {
                const _0x2c9d67 = new RegExp(`\\b${_0x2c9d66}\\b`, 'gi');
                _0x2c9d65 = _0x2c9d65['replace'](_0x2c9d67, _0x2c9d64[_0x2c9d66]);
            });
            
            // Cümle kalıpları için basit düzeltmeler
            _0x2c9d65 = _0x2c9d65.replace(/sen olacak/gi, "olacaksın");
            _0x2c9d65 = _0x2c9d65.replace(/sen olabilir/gi, "olabilirsin");
            _0x2c9d65 = _0x2c9d65.replace(/senin gün/gi, "günün");
            
            return _0x2c9d65;
        }
        
        function _0x2c9d68(_0x2c9d69, _0x2c9d6a) {
            if (!_0x2c9d6a) return;
            
            _0x2c9d6a.textContent = 'Burç yorumu alınıyor... ✨';
            
            // Daha güvenilir bir CORS proxy kullan
            const proxy = 'https://api.allorigins.win/raw?url=';
            
            // Aztro API'sini kullanarak burç yorumu al
            fetch(`${proxy}https://aztro.sameerkumar.website/?sign=${_0x2c9d69}&day=today`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Aztro API\'den burç bilgisi alınamadı');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.description) {
                    // İngilizce açıklamayı Türkçe'ye çevir ve emojiler ekle
                    const translatedText = _0x2c9d62(data.description);
                    _0x2c9d6a.textContent = `${translatedText} 🌟`;
                    
                    // Uyumlu günü ve şanslı sayıları da ekle
                    _0x2c9d6a.textContent += `\n\nUyumlu olduğun gün: ${data.compatibility} 💞`;
                    _0x2c9d6a.textContent += `\nŞanslı sayın: ${data.lucky_number} 🍀`;
                    _0x2c9d6a.textContent += `\nRuh halin: ${data.mood} 😊`;
                } else {
                    throw new Error('API yanıtında burç bilgisi bulunamadı');
                }
            })
            .catch(error => {
                console.error('Birinci API hatası:', error);
                
                // Alternatif API'yi dene
                fetch(`${proxy}https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${_0x2c9d69}&day=TODAY`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('İkinci API\'den burç bilgisi alınamadı');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.data && data.data.horoscope_data) {
                        const translatedText = _0x2c9d62(data.data.horoscope_data);
                        _0x2c9d6a.textContent = `${translatedText} 🌟`;
                    } else {
                        throw new Error('İkinci API yanıtında burç bilgisi bulunamadı');
                    }
                })
                .catch(secondError => {
                    console.error('İkinci API hatası:', secondError);
                    
                    // Son çare: Tüm API'ler başarısız olursa, sabit veri göster
                    console.log('Tüm API denemeleri başarısız, sabit verilere geçiliyor');
                    
                    // Günlük deterministik burç yorumları
                    const _0x2c9d70 = [
                        "Bugün yeni başlangıçlar için ideal. İçgüdülerine güven ve tüm konularda kalbini dinle. Etrafında pozitif enerji var. 🌟",
                        "İletişim bugün öne çıkıyor. Düşüncelerini net ifade et ve başkalarını dikkatle dinle. Önemli bir mesaj gelebilir. 💬",
                        "Bugün kişisel hedeflerine odaklan. Kararlılığın sayesinde her engelin üstesinden gelebilirsin. Başarı ulaşılabilir durumda. 🎯",
                        "Yaratıcılığın bugün zirvede. Bu enerjiyi problemleri çözmek için kullan. Diğerleri senin yenilikçi yaklaşımını takdir edecek. ✨",
                        "İlişkiler bugün merkez sahneyi alıyor. Bağlantılarını besle ve önemsediğin kişilere takdirini göster. ❤️",
                        "Bugün büyüme ve öğrenme fırsatları getiriyor. Açık fikirli ol ve konfor alanının dışına çıkmaya istekli ol. 🌱",
                        "Finansal konular bugün dikkatini gerektiriyor. Kaynaklarını gözden geçir ve geleceğin için pratik kararlar al. 💰",
                        "Sezgilerin bugün özellikle güçlü. Karar verirken iç sesini dinle. Seni doğru yönlendirecektir. 🧠"
                    ];
                    
                    // Her burç ve gün için aynı yorumu göstermek üzere deterministik seçim
                    const today = new Date();
                    const dateString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
                    const seed = dateString.length + _0x2c9d69.length * 2 + today.getDate();
                    const randomIndex = seed % _0x2c9d70.length;
                    
                    _0x2c9d6a.textContent = _0x2c9d70[randomIndex];
                });
            });
        }
        
        // İngilizce burç adlarını Türkçe'ye çevir (API için)
        function _0x2c9d69_to_tr(_0x2c9d69) {
            const _0x2c9d69_map = {
                'aries': 'koc',
                'taurus': 'boga',
                'gemini': 'ikizler',
                'cancer': 'yengec',
                'leo': 'aslan',
                'virgo': 'basak',
                'libra': 'terazi',
                'scorpio': 'akrep',
                'sagittarius': 'yay',
                'capricorn': 'oglak',
                'aquarius': 'kova',
                'pisces': 'balik'
            };
            return _0x2c9d69_map[_0x2c9d69] || _0x2c9d69;
        }
        
        // Sayfa yüklendiğinde ilk burç yorumunu al
        if(_0x2c9d60['value']){
            _0x2c9d68(_0x2c9d60['value'],_0x2c9d61);
        }
        
        _0x2c9d60['addEventListener']('change',function(){
            const _0x2c9d72=this['value'];
            if(_0x2c9d72){
                _0x2c9d68(_0x2c9d72,_0x2c9d61);
            }
        });
        
        // Burç yorumlarını otomatik olarak güncelle (her saat)
        setInterval(() => {
            if(_0x2c9d60 && _0x2c9d60['value']){
                _0x2c9d68(_0x2c9d60['value'], _0x2c9d61);
            }
        }, 3600000); // Her saat (3600000 ms)
    }
}); 