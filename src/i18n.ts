const phraseDictionary: Record<string, Record<string, string>> = {
  '안녕하세요 여러분!': {
    en: 'Hello everyone!', ja: 'みなさん、こんにちは！', zh: '大家好！', es: '¡Hola a todos!',
    fr: 'Bonjour à tous !', de: 'Hallo zusammen!', pt: 'Olá a todos!', hi: 'सभी को नमस्ते!', ar: 'مرحباً بالجميع!'
  },
  'Hello everyone! How is your day going?': {
    ko: '안녕하세요 여러분! 오늘 하루 어떠세요?', ja: 'みなさん、こんにちは！今日はどうですか？', zh: '大家好！你们今天过得怎么样？',
    es: '¡Hola a todos! ¿Cómo va su día?', fr: 'Bonjour à tous ! Comment se passe votre journée ?', de: 'Hallo zusammen! Wie läuft euer Tag?',
    pt: 'Olá a todos! Como está o dia de vocês?', hi: 'सभी को नमस्ते! आपका दिन कैसा चल रहा है?', ar: 'مرحباً بالجميع! كيف يومكم؟'
  },
  'Olá! Tudo bem?': {
    en: 'Hello! How are you?', ko: '안녕하세요! 잘 지내세요?', ja: 'こんにちは！お元気ですか？', zh: '你好！你好吗？',
    es: '¡Hola! ¿Todo bien?', fr: 'Salut ! Tout va bien ?', de: 'Hallo! Alles gut?', hi: 'नमस्ते! सब ठीक है?', ar: 'مرحباً! كيف حالك؟'
  },
  'नमस्ते! इंडिया से प्यार।': {
    en: 'Namaste! Love from India.', ko: '나마스테! 인도에서 사랑을 보냅니다.', ja: 'ナマステ！インドから愛を込めて。', zh: '你好！来自印度的爱。',
    es: '¡Namaste! Amor desde India.', fr: 'Namaste ! Amour depuis l\'Inde.', de: 'Namaste! Liebe aus Indien.', pt: 'Namaste! Amor da Índia.', ar: 'ناماستي! حب من الهند.'
  },
  'Bonjour! Je prépare le dîner.': {
    en: 'Hello! I\'m preparing dinner.', ko: '안녕하세요! 저녁을 준비하고 있어요.', ja: 'こんにちは！夕食を準備しています。', zh: '你好！我在准备晚餐。',
    es: '¡Hola! Estoy preparando la cena.', de: 'Hallo! Ich bereite das Abendessen vor.', pt: 'Olá! Estou preparando o jantar.', hi: 'नमस्ते! मैं रात का खाना बना रहा हूँ।', ar: 'مرحباً! أنا أحضر العشاء.'
  },
  'Praying for world peace today.': {
    ko: '오늘 세계 평화를 위해 기도합니다.', ja: '今日は世界平和のために祈ります。', zh: '今天为世界和平祈祷。',
    es: 'Orando por la paz mundial hoy.', fr: 'Je prie pour la paix dans le monde aujourd\'hui.', de: 'Heute bete ich für den Weltfrieden.',
    pt: 'Orando pela paz mundial hoje.', hi: 'आज विश्व शांति के लिए प्रार्थना कर रहा हूँ।', ar: 'أصلي من أجل السلام العالمي اليوم.'
  },
  'اللهم آمين': {
    en: 'Amen, O God.', ko: '아멘, 오 주님.', ja: 'アーメン。', zh: '阿门。',
    es: 'Amén, oh Dios.', fr: 'Amine, ô Dieu.', de: 'Amen, o Gott.', pt: 'Amém, ó Deus.', hi: 'आमीन।'
  },
  'Que Dios nos bendiga a todos.': {
    en: 'May God bless us all.', ko: '하나님께서 우리 모두를 축복하시길.', ja: '神が私たち全員を祝福しますように。', zh: '愿上帝保佑我们所有人。',
    fr: 'Que Dieu nous bénisse tous.', de: 'Möge Gott uns alle segnen.', pt: 'Que Deus nos abençoe a todos.', hi: 'भगवान हम सबको आशीर्वाद दें।', ar: 'بارك الله فينا جميعاً.'
  },
  'Hat jemand gute Buchempfehlungen?': {
    en: 'Does anyone have good book recommendations?', ko: '좋은 책 추천 있으신 분?', ja: 'おすすめの本はありますか？', zh: '有人有好的书推荐吗？',
    es: '¿Alguien tiene buenas recomendaciones de libros?', fr: 'Quelqu\'un a de bonnes recommandations de livres ?', pt: 'Alguém tem boas recomendações de livros?',
    hi: 'क्या किसी के पास अच्छी किताब की सिफारिशें हैं?', ar: 'هل لدى أحد توصيات كتب جيدة؟'
  },
  'I just read "1984" again. It is amazing!': {
    ko: '"1984"를 다시 읽었어요. 정말 놀라워요!', ja: '「1984」をまた読みました。素晴らしいです！', zh: '我又读了一遍《1984》。太棒了！',
    es: '¡Acabo de leer "1984" otra vez. ¡Es increíble!', fr: 'Je viens de relire "1984". C\'est incroyable !', de: 'Ich habe gerade "1984" nochmal gelesen. Es ist großartig!',
    pt: 'Acabei de ler "1984" de novo. É incrível!', hi: 'मैंने अभी "1984" फिर से पढ़ी। यह अद्भुत है!', ar: 'لقد قرأت "1984" مرة أخرى. إنها مذهلة!'
  },
  // Korean replies
  '반갑습니다! 😊': { en: 'Nice to meet you! 😊', ja: 'お会いできて嬉しいです！😊', zh: '很高兴认识你！😊', es: '¡Encantado! 😊', fr: 'Enchanté ! 😊', de: 'Freut mich! 😊', pt: 'Prazer! 😊', hi: 'आपसे मिलकर खुशी हुई! 😊', ar: 'سعيد بلقائك! 😊' },
  '좋은 이야기네요!': { en: 'That\'s a great story!', ja: 'いい話ですね！', zh: '好故事！', es: '¡Qué buena historia!', fr: 'Belle histoire !', de: 'Tolle Geschichte!', pt: 'Que história boa!', hi: 'अच्छी कहानी!', ar: 'قصة رائعة!' },
  '저도 동감합니다 👍': { en: 'I agree too 👍', ja: '私も同感です 👍', zh: '我也同意 👍', es: 'Yo también estoy de acuerdo 👍', fr: 'Je suis d\'accord aussi 👍', de: 'Ich stimme auch zu 👍', pt: 'Eu também concordo 👍', hi: 'मैं भी सहमत हूँ 👍', ar: 'أنا أوافق أيضاً 👍' },
  '오늘 날씨가 좋네요!': { en: 'The weather is great today!', ja: '今日はいい天気ですね！', zh: '今天天气真好！', es: '¡Hoy hace buen tiempo!', fr: 'Il fait beau aujourd\'hui !', de: 'Heute ist schönes Wetter!', pt: 'O tempo está ótimo hoje!', hi: 'आज मौसम बहुत अच्छा है!', ar: 'الطقس رائع اليوم!' },
  '감사합니다 🙏': { en: 'Thank you 🙏', ja: 'ありがとうございます 🙏', zh: '谢谢 🙏', es: 'Gracias 🙏', fr: 'Merci 🙏', de: 'Danke 🙏', pt: 'Obrigado 🙏', hi: 'धन्यवाद 🙏', ar: 'شكراً 🙏' },
  '정말요? 대단해요!': { en: 'Really? That\'s amazing!', ja: '本当ですか？すごい！', zh: '真的吗？太厉害了！', es: '¿De verdad? ¡Increíble!', fr: 'Vraiment ? C\'est incroyable !', de: 'Wirklich? Das ist toll!', pt: 'Sério? Incrível!', hi: 'सच में? अद्भुत!', ar: 'حقاً؟ مذهل!' },
  '재미있는 얘기네요 ㅎㅎ': { en: 'That\'s a fun story haha', ja: '面白いお話ですね(笑)', zh: '哈哈，真有意思的故事', es: '¡Qué historia divertida jajaja!', fr: 'Histoire amusante haha', de: 'Lustige Geschichte haha', pt: 'História divertida kkk', hi: 'मजेदार कहानी है हाहा', ar: 'قصة ممتعة ههه' },
  '언제 한번 만나요!': { en: 'Let\'s meet sometime!', ja: 'いつか一度会いましょう！', zh: '找个时间见个面吧！', es: '¡Quedemos algún día!', fr: 'On se voit un de ces jours !', de: 'Lass uns mal treffen!', pt: 'Vamos nos encontrar um dia desses!', hi: 'कभी मिलते हैं!', ar: 'دعنا نلتقي في وقت ما!' },

  // English replies
  'That\'s awesome! 😊': { ko: '정말 멋지네요! 😊', ja: 'すごいですね！😊', zh: '太棒了！😊', es: '¡Qué genial! 😊', fr: 'C\'est génial ! 😊', de: 'Das ist toll! 😊', pt: 'Que incrível! 😊', hi: 'बहुत बढ़िया! 😊', ar: 'رائع! 😊' },
  'I totally agree!': { ko: '완전히 동의해요!', ja: '完全に同意します！', zh: '我完全同意！', es: '¡Totalmente de acuerdo!', fr: 'Je suis tout à fait d\'accord !', de: 'Ich stimme völlig zu!', pt: 'Concordo totalmente!', hi: 'मैं पूरी तरह सहमत हूँ!', ar: 'أتفق تماماً!' },
  'Thanks for sharing! 👍': { ko: '공유해주셔서 감사합니다! 👍', ja: '共有ありがとう！👍', zh: '谢谢分享！👍', es: '¡Gracias por compartir! 👍', fr: 'Merci pour le partage ! 👍', de: 'Danke fürs Teilen! 👍', pt: 'Obrigado por compartilhar! 👍', hi: 'शेयर करने के लिए धन्यवाद! 👍', ar: 'شكراً للمشاركة! 👍' },
  'Great to hear from you!': { ko: '소식 듣게 되어 정말 반가워요!', ja: 'お便り聞けて嬉しいです！', zh: '很高兴听到你的消息！', es: '¡Qué gusto saber de ti!', fr: 'Ravi de vous entendre !', de: 'Schön von dir zu hören!', pt: 'Muito bom ter notícias suas!', hi: 'आपसे सुनकर बहुत अच्छा लगा!', ar: 'سعيد بسماع أخبارك!' },
  'God bless! 🙏': { ko: '하나님의 축복이 있기를! 🙏', ja: '神のご加護を！🙏', zh: '上帝保佑！🙏', es: '¡Dios te bendiga! 🙏', fr: 'Que Dieu vous bénisse ! 🙏', de: 'Gott segne dich! 🙏', pt: 'Deus abençoe! 🙏', hi: 'भगवान आशीर्वाद दें! 🙏', ar: 'بارك الله فيك! 🙏' },
  'That\'s really interesting!': { ko: '정말 흥미롭네요!', ja: '本当に興味深いですね！', zh: '真有意思！', es: '¡Eso es realmente interesante!', fr: 'C\'est vraiment intéressant !', de: 'Das ist wirklich interessant!', pt: 'Isso é muito interessante!', hi: 'यह वास्तव में दिलचस्प है!', ar: 'هذا مثير للاهتمام حقاً!' },
  'Love this community!': { ko: '이 커뮤니티가 정말 좋아요!', ja: 'このコミュニティが大好きです！', zh: '太喜欢这个社区了！', es: '¡Me encanta esta comunidad!', fr: 'J\'adore cette communauté !', de: 'Ich liebe diese Gemeinschaft!', pt: 'Amo essa comunidade!', hi: 'मुझे यह समुदाय बहुत पसंद है!', ar: 'أحب هذا المجتمع!' },
  'Have a wonderful day!': { ko: '좋은 하루 보내세요!', ja: '素晴らしい一日를！', zh: '祝你有美好的一天！', es: '¡Que tengas un día maravilloso!', fr: 'Passez une merveilleuse journée !', de: 'Hab einen wunderschönen Tag!', pt: 'Tenha um dia maravilhoso!', hi: 'आपका दिन शुभ हो!', ar: 'أتمنى لك يوماً رائعاً!' },

  // Japanese replies
  '素晴らしいですね！😊': { en: 'That\'s wonderful! 😊', ko: '정말 멋지네요! 😊', zh: '太棒了！😊', es: '¡Maravilloso! 😊', fr: 'Merveilleux ! 😊', de: 'Wunderbar! 😊', pt: 'Maravilhoso! 😊', hi: 'अद्भुत! 😊', ar: 'رائع! 😊' },
  'それは面白いです！': { en: 'That\'s interesting!', ko: '그거 정말 재미있네요!', zh: '那真有趣！', es: '¡Eso es interesante!', fr: 'C\'est intéressant !', de: 'Das ist interessant!', pt: 'Isso é interessante!', hi: 'यह दिलचस्प है!', ar: 'هذا ممتع!' },
  '同感です！👍': { en: 'I agree! 👍', ko: '동감이에요! 👍', zh: '同感！👍', es: '¡De acuerdo! 👍', fr: 'D\'accord ! 👍', de: 'Einverstanden! 👍', pt: 'Concordo! 👍', hi: 'सहमत! 👍', ar: 'أوافق! 👍' },
  'ありがとうございます 🙏': { en: 'Thank you 🙏', ko: '감사합니다 🙏', zh: '谢谢 🙏', es: 'Gracias 🙏', fr: 'Merci 🙏', de: 'Danke 🙏', pt: 'Obrigado 🙏', hi: 'धन्यवाद 🙏', ar: 'شكراً 🙏' },
  '今日もいい一日を！': { en: 'Have a great day today too!', ko: '오늘도 좋은 하루 되세요!', zh: '今天也过得愉快！', es: '¡Que hoy también sea un gran día!', fr: 'Bonne journée aujourd\'hui aussi !', de: 'Einen schönen Tag heute noch!', pt: 'Tenha um ótimo dia hoje também!', hi: 'आज का दिन भी अच्छा रहे!', ar: 'أتمنى لك يوماً جميلاً اليوم أيضاً!' },
  '本当ですか？すごい！': { en: 'Really? That\'s awesome!', ko: '정말인가요? 대단해요!', zh: '真的吗？太棒了！', es: '¿De verdad? ¡Increíble!', fr: 'Vraiment ? C\'est génial !', de: 'Wirklich? Das ist super!', pt: 'Sério? Demais!', hi: 'सच में? बहुत खूब!', ar: 'حقاً؟ رائع جداً!' },
  'よろしくお願いします！': { en: 'Nice to meet you!', ko: '잘 부탁드립니다!', zh: '请多关照！', es: '¡Encantado de conocerles!', fr: 'Ravi de vous rencontrer !', de: 'Freut mich, dich kennenzulernen!', pt: 'Muito prazer!', hi: 'आपसे मिलकर अच्छा लगा!', ar: 'تشرفت بلقائكم!' },
  '楽しいですね！': { en: 'This is fun!', ko: '정말 즐겁네요!', zh: '太开心了！', es: '¡Qué divertido!', fr: 'C\'est amusant !', de: 'Das macht Spaß!', pt: 'Que divertido!', hi: 'यह मजेदार है!', ar: 'هذا ممتع للغاية!' },

  // Chinese replies
  '太棒了！😊': { en: 'That\'s awesome! 😊', ko: '정말 멋져요! 😊', ja: '素晴らしいですね！😊', es: '¡Qué genial! 😊', fr: 'C\'est formidable ! 😊', de: 'Das ist spitze! 😊', pt: 'Que maravilha! 😊', hi: 'शानदार! 😊', ar: 'رائع جداً! 😊' },
  '我完全同意！': { en: 'I completely agree!', ko: '전적으로 동의합니다!', ja: '完全に同意します！', es: '¡Totalmente de acuerdo!', fr: 'Je suis entièrement d\'accord !', de: 'Ich stimme vollkommen zu!', pt: 'Concordo totalmente!', hi: 'मैं पूरी तरह सहमत हूँ!', ar: 'أتفق تماماً معك!' },
  '谢谢分享！👍': { en: 'Thanks for sharing! 👍', ko: '공유 감사합니다! 👍', ja: '共有ありがとうございます！👍', es: '¡Gracias por compartir! 👍', fr: 'Merci pour le partage ! 👍', de: 'Danke fürs Teilen! 👍', pt: 'Obrigado por compartilhar! 👍', hi: 'शेयर करने के लिए धन्यवाद! 👍', ar: 'شكراً لمشاركتك! 👍' },
  '说得对！': { en: 'That\'s right!', ko: '맞는 말씀이에요!', ja: 'その通りです！', es: '¡Así es!', fr: 'C\'est vrai !', de: 'Ganz genau!', pt: 'Exatamente!', hi: 'बिल्कुल सही!', ar: 'صحيح تماماً!' },
  '上帝保佑！🙏': { en: 'God bless! 🙏', ko: '하나님의 은혜와 축복이 있기를! 🙏', ja: '神の祝福を！🙏', es: '¡Dios te bendiga! 🙏', fr: 'Que Dieu bénisse ! 🙏', de: 'Gottes Segen! 🙏', pt: 'Deus abençoe! 🙏', hi: 'भगवान का आशीर्वाद! 🙏', ar: 'بارك الله فيك! 🙏' },
  '真的很有趣！': { en: 'That\'s really fun!', ko: '정말 재미있네요!', ja: '本当に面白いですね！', es: '¡Es realmente interesante!', fr: 'C\'est vraiment amusant !', de: 'Das ist wirklich unterhaltsam!', pt: 'Muito interessante!', hi: 'यह वास्तव में मजेदार है!', ar: 'حقاً مسل وممتع!' },
  '大家好！': { en: 'Hello everyone!', ko: '여러분 안녕하세요!', ja: '皆さんこんにちは！', es: '¡Hola a todos!', fr: 'Bonjour à tous !', de: 'Hallo allerseits!', pt: 'Olá a todos!', hi: 'सभी को नमस्कार!', ar: 'مرحباً بالجميع!' },
  '祝你有美好的一天！': { en: 'Wishing you a great day!', ko: '행복한 하루 되시기를 바랍니다!', ja: '素敵な一日を！', es: '¡Te deseo un excelente día!', fr: 'Je vous souhaite une belle journée !', de: 'Einen wunderschönen Tag wünsche ich!', pt: 'Desejo a você um ótimo dia!', hi: 'आपका दिन शुभ हो!', ar: 'أتمنى لك يوماً رائعاً ومباركاً!' },

  // Spanish replies
  '¡Qué bueno! 😊': { en: 'How nice! 😊', ko: '참 좋네요! 😊', ja: 'いいですね！😊', zh: '真好！😊', fr: 'Que c\'est bien ! 😊', de: 'Wie schön! 😊', pt: 'Que bom! 😊', hi: 'कितना अच्छा! 😊', ar: 'كم هو جميل! 😊' },
  '¡Estoy de acuerdo!': { en: 'I agree!', ko: '저도 동의해요!', ja: '賛成です！', zh: '我同意！', fr: 'D\'accord !', de: 'Ich bin einverstanden!', pt: 'Estou de acordo!', hi: 'मैं सहमत हूँ!', ar: 'أنا متفق معك!' },
  '¡Gracias por compartir! 👍': { en: 'Thanks for sharing! 👍', ko: '공유해주셔서 감사합니다! 👍', ja: 'シェアありがとう！👍', zh: '感谢分享！👍', fr: 'Merci pour le partage ! 👍', de: 'Danke fürs Teilen! 👍', pt: 'Obrigado por compartilhar! 👍', hi: 'शेयर करने के लिए धन्यवाद! 👍', ar: 'شكراً لمشاركتك! 👍' },
  '¡Dios los bendiga! 🙏': { en: 'God bless you! 🙏', ko: '하나님의 축복이 있기를! 🙏', ja: '神のご加護を！🙏', zh: '上帝保佑你！🙏', fr: 'Que Dieu vous bénisse ! 🙏', de: 'Gott segne euch! 🙏', pt: 'Deus os abençoe! 🙏', hi: 'भगवान आपको आशीर्वाद दें! 🙏', ar: 'بارك الله فيكم! 🙏' },
  '¡Qué interesante!': { en: 'How interesting!', ko: '정말 흥미롭네요!', ja: '興味深いです！', zh: '真有趣！', fr: 'Comme c\'est intéressant !', de: 'Wie interessant!', pt: 'Que interessante!', hi: 'कितना दिलचस्प!', ar: 'كم هو مثير للاهتمام!' },
  '¡Hola a todos!': { en: 'Hello everyone!', ko: '모두들 안녕하세요!', ja: '皆さんこんにちは！', zh: '大家好！', fr: 'Bonjour tout le monde !', de: 'Hallo an alle!', pt: 'Olá a todos!', hi: 'सबको नमस्ते!', ar: 'مرحباً بالجميع!' },
  '¡Genial!': { en: 'Great!', ko: '최고예요!', ja: '最高です！', zh: '太棒了！', fr: 'Génial !', de: 'Genial!', pt: 'Genial!', hi: 'बहुत खूब!', ar: 'رائع جداً!' },
  '¡Que tengan un buen día!': { en: 'Have a great day everyone!', ko: '모두 좋은 하루 보내세요!', ja: '皆さん良い一日を！', zh: '祝大家有美好的一天！', fr: 'Passez une bonne journée !', de: 'Habt einen schönen Tag!', pt: 'Tenham um bom dia!', hi: 'आप सभी का दिन अच्छा रहे!', ar: 'أتمنى لكم جميعاً يوماً طيباً!' },

  // French replies
  'C\'est génial ! 😊': { en: 'That\'s great! 😊', ko: '대단하네요! 😊', ja: 'すごいです！😊', zh: '太好了！😊', es: '¡Es genial! 😊', de: 'Das ist großartig! 😊', pt: 'É genial! 😊', hi: 'शानदार! 😊', ar: 'رائع! 😊' },
  'Je suis tout à fait d\'accord !': { en: 'I totally agree!', ko: '전적으로 동의합니다!', ja: '全く同感です！', zh: '我完全同意！', es: '¡Estoy totalmente de acuerdo!', de: 'Ich bin absolut der gleichen Meinung!', pt: 'Concordo totalmente!', hi: 'मैं पूरी तरह सहमत हूँ!', ar: 'أنا أوافقك الرأي تماماً!' },
  'Merci pour le partage ! 👍': { en: 'Thanks for sharing! 👍', ko: '공유 감사합니다! 👍', ja: 'シェアありがとうございます！👍', zh: '感谢分享！👍', es: '¡Gracias por compartir! 👍', de: 'Danke fürs Teilen! 👍', pt: 'Obrigado por compartilhar! 👍', hi: 'शेयर करने के लिए धन्यवाद! 👍', ar: 'شكراً لمشاركتك! 👍' },
  'Que Dieu vous bénisse ! 🙏': { en: 'God bless you! 🙏', ko: '하나님의 축복이 있기를! 🙏', ja: '神のご加護を！🙏', zh: '上帝保佑你！🙏', es: '¡Dios te bendiga! 🙏', de: 'Gott segne dich! 🙏', pt: 'Deus te abençoe! 🙏', hi: 'भगवान आपको आशीर्वाद दें! 🙏', ar: 'بارك الله فيك! 🙏' },
  'C\'est très intéressant !': { en: 'That\'s very interesting!', ko: '정말 유익하고 흥미롭네요!', ja: 'とても興味深いです！', zh: '非常有趣！', es: '¡Es muy interesante!', de: 'Das ist sehr interessant!', pt: 'Isso é muito interessante!', hi: 'यह बहुत दिलचस्प है!', ar: 'هذا أمر شيق للغاية!' },
  'Bonjour à tous !': { en: 'Good morning / Hello everyone!', ko: '모두 좋은 아침입니다!', ja: '皆さん、おはようございます！', zh: '各位早上好！', es: '¡Buenos días a todos!', de: 'Guten Morgen an alle!', pt: 'Bom dia a todos!', hi: 'सबको शुभ प्रभात!', ar: 'صباح الخير للجميع!' },
  'Super !': { en: 'Super / Awesome!', ko: '최고예요!', ja: '最高！', zh: '太棒了！', es: '¡Súper!', de: 'Super!', pt: 'Super!', hi: 'शानदार!', ar: 'ممتاز!' },
  'Bonne journée !': { en: 'Have a good day!', ko: '행복한 하루 되세요!', ja: '良い一日を！', zh: '祝今天愉快！', es: '¡Buen día!', de: 'Einen schönen Tag!', pt: 'Bom dia!', hi: 'शुभ दिन!', ar: 'طاب يومك!' },

  // German replies
  'Das ist toll! 😊': { en: 'That\'s great! 😊', ko: '정말 멋져요! 😊', ja: 'すごいです！😊', zh: '太好了！😊', es: '¡Es genial! 😊', fr: 'C\'est super ! 😊', pt: 'É ótimo! 😊', hi: 'बहुत अच्छा! 😊', ar: 'رائع! 😊' },
  'Da stimme ich zu!': { en: 'I agree with that!', ko: '저도 그렇게 생각해요!', ja: 'それに同意します！', zh: '我也同意！', es: '¡Estoy de acuerdo con eso!', fr: 'Je suis d\'accord avec ça !', pt: 'Concordo com isso!', hi: 'मैं इससे सहमत हूँ!', ar: 'أنا متفق مع ذلك!' },
  'Danke fürs Teilen! 👍': { en: 'Thanks for sharing! 👍', ko: '공유 감사합니다! 👍', ja: 'シェア感謝です！👍', zh: '谢谢分享！👍', es: '¡Gracias por compartir! 👍', fr: 'Merci pour le partage ! 👍', pt: 'Obrigado por compartilhar! 👍', hi: 'शेयर करने के लिए धन्यवाद! 👍', ar: 'شكراً لمشاركتك! 👍' },
  'Gott segne euch! 🙏': { en: 'God bless you all! 🙏', ko: '하나님이 여러분을 축복하십니다! 🙏', ja: '神の祝福がありますように！🙏', zh: '愿上帝保佑你们！🙏', es: '¡Dios los bendiga a todos! 🙏', fr: 'Que Dieu vous bénisse tous ! 🙏', pt: 'Deus abençoe todos vocês! 🙏', hi: 'भगवान आप सभी पर कृपा करें! 🙏', ar: 'بارك الله فيكم جميعاً! 🙏' },
  'Das ist wirklich interessant!': { en: 'That\'s really interesting!', ko: '정말 흥미롭네요!', ja: 'それは本当に興味深いですね！', zh: '这真的很有意思！', es: '¡Eso es muy interesante!', fr: 'C\'est vraiment interessant !', pt: 'Isso é muito interessante!', hi: 'यह सच में दिलचस्प है!', ar: 'هذا جدير بالاهتمام حقاً!' },
  'Hallo zusammen!': { en: 'Hello everyone!', ko: '모두 안녕하세요!', ja: '皆さんこんにちは！', zh: '大家好！', es: '¡Hola a todos!', fr: 'Bonjour à tous !', pt: 'Olá a todos!', hi: 'सबको नमस्ते!', ar: 'مرحباً بالجميع!' },
  'Wunderbar!': { en: 'Wonderful!', ko: '경이롭고 아름답네요!', ja: '素晴らしい！', zh: '太美好了！', es: '¡Maravilloso!', fr: 'Magnifique !', pt: 'Maravilhoso!', hi: 'अद्भुत!', ar: 'رائع ومبارك!' },
  'Einen schönen Tag noch!': { en: 'Have a nice rest of the day!', ko: '남은 하루도 행복하세요!', ja: '残りの一日も良い一日を！', zh: '祝你度过美好的一天！', es: '¡Que pases un lindo resto del día!', fr: 'Bonne fin de journée !', pt: 'Tenha um bom resto de dia!', hi: 'आपका शेष दिन अच्छा रहे!', ar: 'أتمنى لك بقية يوم سعيدة!' },

  // Portuguese replies
  'Que legal! 😊': { en: 'How cool! 😊', ko: '참 멋지네요! 😊', ja: 'すごい！😊', zh: '真酷！😊', es: '¡Qué genial! 😊', fr: 'Trop bien ! 😊', de: 'Wie cool! 😊', hi: 'बहुत बढ़िया! 😊', ar: 'رائع! 😊' },
  'Concordo totalmente!': { en: 'I totally agree!', ko: '완전히 공감합니다!', ja: '完全に同感です！', zh: '我完全同意！', es: '¡Totalmente de acuerdo!', fr: 'Tout à fait d\'accord !', de: 'Vollkommen einverstanden!', hi: 'मैं पूरी तरह सहमत हूँ!', ar: 'أتفق تماماً مع هذا!' },
  'Obrigado por compartilhar! 👍': { en: 'Thank you for sharing! 👍', ko: '나눔에 감사드립니다! 👍', ja: '共有ありがとうございます！👍', zh: '感谢分享！👍', es: '¡Gracias por compartir! 👍', fr: 'Merci pour le partage ! 👍', de: 'Danke fürs Teilen! 👍', hi: 'शेयर करने के लिए धन्यवाद! 👍', ar: 'شكراً لمشاركتك الكريمة! 👍' },
  'Deus abençoe! 🙏': { en: 'God bless! 🙏', ko: '하나님의 축복이 함께하길! 🙏', ja: '神の祝福を！🙏', zh: '上帝保佑！🙏', es: '¡Dios bendiga! 🙏', fr: 'Dieu bénisse ! 🙏', de: 'Gott segne! 🙏', hi: 'भगवान आशीर्वाद दें! 🙏', ar: 'بارك الله! 🙏' },
  'Que interessante!': { en: 'How interesting!', ko: '정말 흥미로운 내용이네요!', ja: 'とても興味深いです！', zh: '真有意思！', es: '¡Qué interesante!', fr: 'Très intéressant !', de: 'Wie interessant!', hi: 'कितना दिलचस्प!', ar: 'كم هذا ممتع وشيق!' },
  'Olá a todos!': { en: 'Hello everyone!', ko: '여러분 반갑습니다!', ja: 'みなさん、こんにちは！', zh: '大家好！', es: '¡Hola a todos!', fr: 'Bonjour à tous !', de: 'Hallo zusammen!', hi: 'सबको नमस्ते!', ar: 'أهلاً وسهلاً بالجميع!' },
  'Maravilhoso!': { en: 'Wonderful!', ko: '정말 은혜롭고 멋져요!', ja: '素晴らしいです！', zh: '真精彩！', es: '¡Maravilloso!', fr: 'Merveilleux !', de: 'Wunderbar!', hi: 'अद्भुत!', ar: 'رائع وعظيم!' },
  'Tenham um ótimo dia!': { en: 'Have a great day everyone!', ko: '모두 복된 하루 되세요!', ja: '皆さん素晴らしい一日を！', zh: '祝大家度过美好的一天！', es: '¡Tengan un gran día!', fr: 'Passez une excellente journée !', de: 'Habt einen tollen Tag!', hi: 'आप सभी का दिन शानदार रहे!', ar: 'أتمنى لكم يوماً رائعاً ومثمراً!' },

  // Hindi replies
  'बहुत अच्छा! 😊': { en: 'Very good! 😊', ko: '아주 좋아요! 😊', ja: 'とても良い！😊', zh: '非常好！😊', es: '¡Muy bueno! 😊', fr: 'Très bien ! 😊', de: 'Sehr gut! 😊', pt: 'Muito bom! 😊', ar: 'جيد جداً! 😊' },
  'मैं सहमत हूँ!': { en: 'I agree!', ko: '동의합니다!', ja: '同感です！', zh: '我同意！', es: '¡Estoy de acuerdo!', fr: 'Je suis d\'accord !', de: 'Ich stimme zu!', pt: 'Estou de acordo!', ar: 'أना متفق معك!' },
  'शेयर करने के लिए धन्यवाद! 👍': { en: 'Thanks for sharing! 👍', ko: '공유 감사합니다! 👍', ja: 'シェア感謝します！👍', zh: '谢谢分享！👍', es: '¡Gracias por compartir! 👍', fr: 'Merci pour le partage ! 👍', de: 'Danke fürs Teilen! 👍', pt: 'Obrigado por compartilhar! 👍', ar: 'شكراً للمشاركة! 👍' },
  'भगवान आशीर्वाद दें! 🙏': { en: 'God bless! 🙏', ko: '하나님의 축복을! 🙏', ja: '神の祝福を！🙏', zh: '上帝保佑！🙏', es: '¡Dios bendiga! 🙏', fr: 'Dieu bénisse ! 🙏', de: 'Gott segne! 🙏', pt: 'Deus abençoe! 🙏', ar: 'بارك الله! 🙏' },
  'बहुत दिलचस्प!': { en: 'Very interesting!', ko: '아주 흥미롭네요!', ja: 'とても興味深いです！', zh: '很有意思！', es: '¡Muy interesante!', fr: 'Très intéressant !', de: 'Sehr interessant!', pt: 'Muito interessante!', ar: 'مثير جداً للاهتمام!' },
  'सभी को नमस्ते!': { en: 'Hello everyone!', ko: '모두들 안녕하세요!', ja: '皆さんこんにちは！', zh: '大家好！', es: '¡Hola a todos!', fr: 'Bonjour à tous !', de: 'Hallo allerseits!', pt: 'Olá a todos!', ar: 'مرحباً بالجميع!' },
  'शानदार!': { en: 'Splendid / Great!', ko: '훌륭해요!', ja: '素晴らしい！', zh: '太精彩了！', es: '¡Espléndido!', fr: 'Splendide !', de: 'Großartig!', pt: 'Esplêndido!', ar: 'رائع ومميز!' },
  'आपका दिन शुभ हो!': { en: 'Have a blessed day!', ko: '복된 하루 되세요!', ja: '恵みある一日を！', zh: '祝你度过吉祥的一天！', es: '¡Que tengas un día bendecido!', fr: 'Passez une sainte journée !', de: 'Einen gesegneten Tag!', pt: 'Tenha um dia abençoado!', ar: 'أتمنى لك يوماً مباركاً!' },

  // Arabic replies
  'رائع! 😊': { en: 'Wonderful! 😊', ko: '멋져요! 😊', ja: '素晴らしい！😊', zh: '太好了！😊', es: '¡Maravilloso! 😊', fr: 'Magnifique ! 😊', de: 'Wunderbar! 😊', pt: 'Maravilhoso! 😊', hi: 'शानदार! 😊' },
  'أتفق تماماً!': { en: 'I totally agree!', ko: '전적으로 동의합니다!', ja: '完全に同意します！', zh: '我完全同意！', es: '¡Totalmente de acuerdo!', fr: 'Je suis entièrement d\'accord !', de: 'Ich stimme voll zu!', pt: 'Concordo plenamente!', hi: 'मैं पूरी तरह सहमत हूँ!' },
  'شكراً للمشاركة! 👍': { en: 'Thanks for sharing! 👍', ko: '공유 감사합니다! 👍', ja: 'シェアありがとうございます！👍', zh: '感谢分享！👍', es: '¡Gracias por compartir! 👍', fr: 'Merci pour le partage ! 👍', de: 'Danke fürs Teilen! 👍', pt: 'Obrigado por compartilhar! 👍', hi: 'शेयर करने के लिए धन्यवाद! 👍' },
  'بارك الله فيكم! 🙏': { en: 'God bless you all! 🙏', ko: '하나님의 축복이 함께 하기를! 🙏', ja: '神の祝福がありますように！🙏', zh: '愿上帝保佑你们！🙏', es: '¡Que Dios les bendiga! 🙏', fr: 'Que Dieu vous bénisse ! 🙏', de: 'Gott segne euch alle! 🙏', pt: 'Deus abençoe vocês! 🙏', hi: 'भगवान आप सबको आशीर्वाद दें! 🙏' },
  'مثير للاهتمام!': { en: 'Interesting!', ko: '흥미롭네요!', ja: '興味深いです！', zh: '很有意思！', es: '¡Interesante!', fr: 'Intéressant !', de: 'Interessant!', pt: 'Interessante!', hi: 'दिलचस्प!' },
  'مرحباً بالجميع!': { en: 'Hello everyone!', ko: '모두 환영합니다!', ja: '皆さんこんにちは！', zh: '大家好！', es: '¡Hola a todos!', fr: 'Bienvenue à tous !', de: 'Willkommen zusammen!', pt: 'Bem-vindos a todos!', hi: 'सभी का स्वागत है!' },
  'ممتاز!': { en: 'Excellent!', ko: '최고입니다!', ja: '最高です！', zh: '太优秀了！', es: '¡Excelente!', fr: 'Excellent !', de: 'Ausgezeichnet!', pt: 'Excelente!', hi: 'उत्कृष्ट!' },
  'أتمنى لكم يوماً سعيداً!': { en: 'Wish you all a happy day!', ko: '모두 행복한 하루 되세요!', ja: '皆さん幸せな一日を！', zh: '祝大家有愉快的一天！', es: '¡Les deseo a todos un feliz día!', fr: 'Je vous souhaite à tous une heureuse journée !', de: 'Ich wünsche euch allen einen glücklichen Tag!', pt: 'Desejo a todos um dia feliz!', hi: 'आप सभी का दिन सुखमय हो!' }
};

export const langNames: Record<string, string> = {
  en: 'English', ko: '한국어', ja: '日本語', zh: '中文', es: 'Español',
  fr: 'Français', de: 'Deutsch', pt: 'Português', hi: 'हिन्दी', ar: 'العربية'
};

// Global in-memory cache for live fetched translations
const liveTranslationCache: Record<string, string> = {};

/**
 * Returns translation synchronously if found in phraseDictionary or memory cache.
 * Returns null if an asynchronous real-time fetch is needed.
 */
export function getCachedTranslation(text: string, fromLang: string, toLang: string): string | null {
  if (!text || fromLang === toLang) return text;
  
  if (phraseDictionary[text] && phraseDictionary[text][toLang]) {
    return phraseDictionary[text][toLang];
  }
  
  const trimmed = text.trim();
  if (phraseDictionary[trimmed] && phraseDictionary[trimmed][toLang]) {
    return phraseDictionary[trimmed][toLang];
  }

  const cacheKey = `${fromLang}|${toLang}|${trimmed}`;
  if (liveTranslationCache[cacheKey]) {
    return liveTranslationCache[cacheKey];
  }

  return null;
}

/**
 * Synchronous translate helper for instant display.
 */
export function translateText(text: string, fromLang: string, toLang: string): string {
  if (!text || fromLang === toLang) return text;
  
  const cached = getCachedTranslation(text, fromLang, toLang);
  if (cached) return cached;

  return '';
}

/**
 * Real-time translation fetcher using MyMemory Translation API with cache and timeout.
 */
export async function fetchLiveTranslation(text: string, fromLang: string, toLang: string): Promise<string> {
  if (!text || fromLang === toLang) return text;

  const cached = getCachedTranslation(text, fromLang, toLang);
  if (cached) return cached;

  const trimmed = text.trim();
  const cacheKey = `${fromLang}|${toLang}|${trimmed}`;

  try {
    const pair = `${fromLang}|${toLang}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=${encodeURIComponent(pair)}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data?.responseData?.translatedText) {
        let result: string = data.responseData.translatedText;
        result = result
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');

        if (result && !result.includes('MYMEMORY WARNING:') && !result.includes('IS AN INVALID TARGET LANGUAGE')) {
          liveTranslationCache[cacheKey] = result;
          return result;
        }
      }
    }
  } catch {
    // Network or abort error
  }

  liveTranslationCache[cacheKey] = trimmed;
  return trimmed;
}

export const uiTranslations: Record<string, Record<string, string>> = {
  en: {
    welcome: 'Welcome',
    login: 'Login',
    signup: 'Sign Up',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    country: 'Country',
    gender: 'Gender',
    age: 'Age',
    occupation: 'Occupation',
    language: 'Language',
    bio: 'Bio',
    send: 'Send',
    type_message: 'Type a message...',
    search: 'Search',
    settings: 'Settings',
    profile: 'Profile',
    donate: 'Donate',
    offering: 'Offering',
    amount: 'Amount',
    confirm: 'Confirm',
    cancel: 'Cancel',
    global_chat: 'Global Chat',
    prayer_room: 'Prayer Room',
    free_talk: 'Free Talk',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    prefer_not_to_say: 'Prefer not to say',
    next: 'Next',
    back: 'Back',
    save: 'Save',
    logout: 'Logout',
    online: 'Online',
    offline: 'Offline',
    translation_on: 'Translation On',
    translation_off: 'Translation Off',
    fee_breakdown: 'Fee Breakdown',
    platform_fee: 'Platform Fee',
    processing_fee: 'Processing Fee',
    net_donation: 'Net Donation',
    total: 'Total',
    donate_now: 'Donate Now',
    donation_success: 'Donation Success',
    donation_history: 'Donation History',
    people_nearby: 'People Nearby',
    world_chat: 'World Chat'
  },
  ko: {
    welcome: '환영합니다',
    login: '로그인',
    signup: '가입하기',
    name: '이름',
    email: '이메일',
    password: '비밀번호',
    country: '국가',
    gender: '성별',
    age: '나이',
    occupation: '직업',
    language: '언어',
    bio: '소개',
    send: '보내기',
    type_message: '메시지를 입력하세요...',
    search: '검색',
    settings: '설정',
    profile: '프로필',
    donate: '기부하기',
    offering: '헌금',
    amount: '금액',
    confirm: '확인',
    cancel: '취소',
    global_chat: '글로벌 채팅',
    prayer_room: '기도실',
    free_talk: '자유 대화',
    male: '남성',
    female: '여성',
    other: '기타',
    prefer_not_to_say: '공개 안함',
    next: '다음',
    back: '뒤로',
    save: '저장',
    logout: '로그아웃',
    online: '온라인',
    offline: '오프라인',
    translation_on: '번역 켜짐',
    translation_off: '번역 꺼짐',
    fee_breakdown: '수수료 내역',
    platform_fee: '플랫폼 수수료',
    processing_fee: '처리 수수료',
    net_donation: '순 기부액',
    total: '총액',
    donate_now: '지금 기부하기',
    donation_success: '기부 성공',
    donation_history: '기부 내역',
    people_nearby: '주변 사람',
    world_chat: '월드 채팅'
  },
  ja: {
    welcome: 'ようこそ',
    login: 'ログイン',
    signup: 'サインアップ',
    name: '名前',
    email: 'メールアドレス',
    password: 'パスワード',
    country: '国',
    gender: '性別',
    age: '年齢',
    occupation: '職業',
    language: '言語',
    bio: '自己紹介',
    send: '送信',
    type_message: 'メッセージを入力...',
    search: '検索',
    settings: '設定',
    profile: 'プロフィール',
    donate: '寄付',
    offering: 'お布施',
    amount: '金額',
    confirm: '確認',
    cancel: 'キャンセル',
    global_chat: 'グローバルチャット',
    prayer_room: '祈りの部屋',
    free_talk: 'フリートーク',
    male: '男性',
    female: '女性',
    other: 'その他',
    prefer_not_to_say: '回答しない',
    next: '次へ',
    back: '戻る',
    save: '保存',
    logout: 'ログアウト',
    online: 'オンライン',
    offline: 'オフライン',
    translation_on: '翻訳オン',
    translation_off: '翻訳オフ',
    fee_breakdown: '手数料の内訳',
    platform_fee: 'プラットフォーム手数料',
    processing_fee: '処理手数料',
    net_donation: '純寄付額',
    total: '合計',
    donate_now: '今すぐ寄付する',
    donation_success: '寄付成功',
    donation_history: '寄付履歴',
    people_nearby: '近くの人',
    world_chat: 'ワールドチャット'
  },
  zh: {
    welcome: '欢迎',
    login: '登录',
    signup: '注册',
    name: '姓名',
    email: '邮箱',
    password: '密码',
    country: '国家',
    gender: '性别',
    age: '年龄',
    occupation: '职业',
    language: '语言',
    bio: '简介',
    send: '发送',
    type_message: '输入消息...',
    search: '搜索',
    settings: '设置',
    profile: '个人资料',
    donate: '捐赠',
    offering: '奉献',
    amount: '金额',
    confirm: '确认',
    cancel: '取消',
    global_chat: '全球聊天',
    prayer_room: '祈祷室',
    free_talk: '自由交谈',
    male: '男',
    female: '女',
    other: '其他',
    prefer_not_to_say: '不愿透露',
    next: '下一步',
    back: '返回',
    save: '保存',
    logout: '登出',
    online: '在线',
    offline: '离线',
    translation_on: '翻译开',
    translation_off: '翻译关',
    fee_breakdown: '费用明细',
    platform_fee: '平台费',
    processing_fee: '手续费',
    net_donation: '净捐款',
    total: '总计',
    donate_now: '立即捐款',
    donation_success: '捐赠成功',
    donation_history: '捐赠记录',
    people_nearby: '附近的人',
    world_chat: '世界聊天'
  },
  es: {
    welcome: 'Bienvenido',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    name: 'Nombre',
    email: 'Correo electrónico',
    password: 'Contraseña',
    country: 'País',
    gender: 'Género',
    age: 'Edad',
    occupation: 'Ocupación',
    language: 'Idioma',
    bio: 'Biografía',
    send: 'Enviar',
    type_message: 'Escribe un mensaje...',
    search: 'Buscar',
    settings: 'Configuración',
    profile: 'Perfil',
    donate: 'Donar',
    offering: 'Ofrenda',
    amount: 'Cantidad',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    global_chat: 'Chat Global',
    prayer_room: 'Sala de oración',
    free_talk: 'Charla libre',
    male: 'Masculino',
    female: 'Femenino',
    other: 'Otro',
    prefer_not_to_say: 'Prefiero no decirlo',
    next: 'Siguiente',
    back: 'Atrás',
    save: 'Guardar',
    logout: 'Cerrar sesión',
    online: 'En línea',
    offline: 'Desconectado',
    translation_on: 'Traducción activada',
    translation_off: 'Traducción desactivada',
    fee_breakdown: 'Desglose de tarifas',
    platform_fee: 'Tarifa de plataforma',
    processing_fee: 'Tarifa de procesamiento',
    net_donation: 'Donación neta',
    total: 'Total',
    donate_now: 'Donar ahora',
    donation_success: 'Donación exitosa',
    donation_history: 'Historial de donaciones',
    people_nearby: 'Personas cercanas',
    world_chat: 'Chat mundial'
  },
  fr: {
    welcome: 'Bienvenue',
    login: 'Connexion',
    signup: 'S\'inscrire',
    name: 'Nom',
    email: 'E-mail',
    password: 'Mot de passe',
    country: 'Pays',
    gender: 'Genre',
    age: 'Âge',
    occupation: 'Profession',
    language: 'Langue',
    bio: 'Biographie',
    send: 'Envoyer',
    type_message: 'Tapez un message...',
    search: 'Chercher',
    settings: 'Paramètres',
    profile: 'Profil',
    donate: 'Faire un don',
    offering: 'Offrande',
    amount: 'Montant',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    global_chat: 'Chat mondial',
    prayer_room: 'Salle de prière',
    free_talk: 'Discussion libre',
    male: 'Homme',
    female: 'Femme',
    other: 'Autre',
    prefer_not_to_say: 'Préfère ne pas le dire',
    next: 'Suivant',
    back: 'Retour',
    save: 'Enregistrer',
    logout: 'Déconnexion',
    online: 'En ligne',
    offline: 'Hors ligne',
    translation_on: 'Traduction activée',
    translation_off: 'Traduction désactivée',
    fee_breakdown: 'Répartition des frais',
    platform_fee: 'Frais de plateforme',
    processing_fee: 'Frais de traitement',
    net_donation: 'Don net',
    total: 'Total',
    donate_now: 'Faire un don maintenant',
    donation_success: 'Don réussi',
    donation_history: 'Historique des dons',
    people_nearby: 'Personnes à proximité',
    world_chat: 'Chat mondial'
  },
  de: {
    welcome: 'Willkommen',
    login: 'Anmelden',
    signup: 'Registrieren',
    name: 'Name',
    email: 'E-Mail',
    password: 'Passwort',
    country: 'Land',
    gender: 'Geschlecht',
    age: 'Alter',
    occupation: 'Beruf',
    language: 'Sprache',
    bio: 'Biografie',
    send: 'Senden',
    type_message: 'Nachricht eingeben...',
    search: 'Suche',
    settings: 'Einstellungen',
    profile: 'Profil',
    donate: 'Spenden',
    offering: 'Opfergabe',
    amount: 'Menge',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
    global_chat: 'Globaler Chat',
    prayer_room: 'Gebetsraum',
    free_talk: 'Freies Gespräch',
    male: 'Männlich',
    female: 'Weiblich',
    other: 'Andere',
    prefer_not_to_say: 'Keine Angabe',
    next: 'Weiter',
    back: 'Zurück',
    save: 'Speichern',
    logout: 'Abmelden',
    online: 'Online',
    offline: 'Offline',
    translation_on: 'Übersetzung ein',
    translation_off: 'Übersetzung aus',
    fee_breakdown: 'Gebührenaufschlüsselung',
    platform_fee: 'Plattformgebühr',
    processing_fee: 'Bearbeitungsgebühr',
    net_donation: 'Nettospende',
    total: 'Gesamt',
    donate_now: 'Jetzt spenden',
    donation_success: 'Spende erfolgreich',
    donation_history: 'Spendenverlauf',
    people_nearby: 'Personen in der Nähe',
    world_chat: 'Weltchat'
  },
  ar: {
    welcome: 'مرحباً',
    login: 'تسجيل الدخول',
    signup: 'اشتراك',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    country: 'البلد',
    gender: 'الجنس',
    age: 'العمر',
    occupation: 'المهنة',
    language: 'اللغة',
    bio: 'سيرة ذاتية',
    send: 'إرسال',
    type_message: 'اكتب رسالة...',
    search: 'بحث',
    settings: 'إعدادات',
    profile: 'الملف الشخصي',
    donate: 'تبرع',
    offering: 'عطاء',
    amount: 'المبلغ',
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    global_chat: 'دردشة عالمية',
    prayer_room: 'غرفة الصلاة',
    free_talk: 'حديث حر',
    male: 'ذكر',
    female: 'أنثى',
    other: 'آخر',
    prefer_not_to_say: 'أفضل عدم القول',
    next: 'التالي',
    back: 'رجوع',
    save: 'حفظ',
    logout: 'تسجيل خروج',
    online: 'متصل',
    offline: 'غير متصل',
    translation_on: 'الترجمة قيد التشغيل',
    translation_off: 'الترجمة متوقفة',
    fee_breakdown: 'تفصيل الرسوم',
    platform_fee: 'رسوم المنصة',
    processing_fee: 'رسوم المعالجة',
    net_donation: 'صافي التبرع',
    total: 'المجموع',
    donate_now: 'تبرع الآن',
    donation_success: 'نجاح التبرع',
    donation_history: 'تاريخ التبرعات',
    people_nearby: 'أشخاص بالجوار',
    world_chat: 'دردشة العالم'
  },
  pt: {
    welcome: 'Bem-vindo',
    login: 'Entrar',
    signup: 'Inscrever-se',
    name: 'Nome',
    email: 'E-mail',
    password: 'Senha',
    country: 'País',
    gender: 'Gênero',
    age: 'Idade',
    occupation: 'Ocupação',
    language: 'Idioma',
    bio: 'Biografia',
    send: 'Enviar',
    type_message: 'Digite uma mensagem...',
    search: 'Pesquisar',
    settings: 'Configurações',
    profile: 'Perfil',
    donate: 'Doar',
    offering: 'Oferta',
    amount: 'Quantia',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    global_chat: 'Chat Global',
    prayer_room: 'Sala de Oração',
    free_talk: 'Conversa Livre',
    male: 'Masculino',
    female: 'Feminino',
    other: 'Outro',
    prefer_not_to_say: 'Prefiro não dizer',
    next: 'Próximo',
    back: 'Voltar',
    save: 'Salvar',
    logout: 'Sair',
    online: 'Conectado',
    offline: 'Desconectado',
    translation_on: 'Tradução ligada',
    translation_off: 'Tradução desligada',
    fee_breakdown: 'Detalhamento de taxas',
    platform_fee: 'Taxa da plataforma',
    processing_fee: 'Taxa de processamento',
    net_donation: 'Doação líquida',
    total: 'Total',
    donate_now: 'Doar agora',
    donation_success: 'Doação bem-sucedida',
    donation_history: 'Histórico de doações',
    people_nearby: 'Pessoas próximas',
    world_chat: 'Chat mundial'
  },
  hi: {
    welcome: 'स्वागत है',
    login: 'लॉग इन करें',
    signup: 'साइन अप करें',
    name: 'नाम',
    email: 'ईमेल',
    password: 'पासवर्ड',
    country: 'देश',
    gender: 'लिंग',
    age: 'आयु',
    occupation: 'व्यवसाय',
    language: 'भाषा',
    bio: 'परिचय',
    send: 'भेजें',
    type_message: 'एक संदेश टाइप करें...',
    search: 'खोजें',
    settings: 'सेटिंग्स',
    profile: 'प्रोफ़ाइल',
    donate: 'दान करें',
    offering: 'चढ़ावा',
    amount: 'रकम',
    confirm: 'पुष्टि करें',
    cancel: 'रद्द करें',
    global_chat: 'ग्लोबल चैट',
    prayer_room: 'प्रार्थना कक्ष',
    free_talk: 'फ्री टॉक',
    male: 'पुरुष',
    female: 'महिला',
    other: 'अन्य',
    prefer_not_to_say: 'बताना नहीं चाहेंगे',
    next: 'अगला',
    back: 'पीछे',
    save: 'सहेजें',
    logout: 'लॉग आउट',
    online: 'ऑनलाइन',
    offline: 'ऑफ़लाइन',
    translation_on: 'अनुवाद चालू',
    translation_off: 'अनुवाद बंद',
    fee_breakdown: 'शुल्क विवरण',
    platform_fee: 'मंच शुल्क',
    processing_fee: 'प्रसंस्करण शुल्क',
    net_donation: 'शुद्ध दान',
    total: 'कुल',
    donate_now: 'अभी दान करें',
    donation_success: 'दान सफल',
    donation_history: 'दान इतिहास',
    people_nearby: 'आसपास के लोग',
    world_chat: 'विश्व चैट'
  }
};

export function t(key: string, lang: string): string {
  const translations = uiTranslations[lang] || uiTranslations['en'];
  return translations[key] || uiTranslations['en'][key] || key;
}
