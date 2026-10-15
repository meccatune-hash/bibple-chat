import React, { useState } from 'react';
import { useApp } from '../store';
import { languages } from '../countries';

export default function LoginScreen() {
  const { setScreen, translate } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLang, setSelectedLang] = useState(() => {
    if (typeof navigator !== 'undefined' && navigator.language) {
      const code = navigator.language.split('-')[0].toLowerCase();
      if (['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de', 'pt', 'hi', 'ar'].includes(code)) {
        return code;
      }
    }
    return 'ko';
  });
  const [showEmailLogin, setShowEmailLogin] = useState(false);

  // Multilingual unity messages
  const messages: Record<string, { main: string; highlight: string; sub: string; verse: string; verseRef: string; signIn: string; joinBtn: string; noAccount: string; emailBtn: string }> = {
    ko: { main: '모든 민족이 ', highlight: '하나', sub: '되는 그날까지', verse: '"유대인이나 헬라인이나 종이나 자유인이나 남자나 여자나 다 그리스도 예수 안에서 하나이니라"', verseRef: '— 갈라디아서 3:28', signIn: '로그인', joinBtn: 'Bibple 가입하기', noAccount: '계정이 없으신가요?', emailBtn: '이메일로 로그인' },
    en: { main: 'Until all nations become ', highlight: 'One', sub: '', verse: '"There is neither Jew nor Gentile... for you are all one in Christ Jesus."', verseRef: '— Galatians 3:28', signIn: 'Sign In', joinBtn: 'Join Bibple', noAccount: "Don't have an account?", emailBtn: 'Sign in with Email' },
    ja: { main: 'すべての民族が', highlight: 'ひとつ', sub: 'になるその日まで', verse: '「ユダヤ人もギリシア人もなく…あなたがたは皆キリスト・イエスにあって一つだからです」', verseRef: '— ガラテヤ 3:28', signIn: 'ログイン', joinBtn: 'Bibple に参加', noAccount: 'アカウントをお持ちでないですか？', emailBtn: 'メールでログイン' },
    zh: { main: '直到万族成为', highlight: '一体', sub: '的那一天', verse: '"不分犹太人、希腊人…因为你们在基督耶稣里都成为一了"', verseRef: '— 加拉太书 3:28', signIn: '登录', joinBtn: '加入 Bibple', noAccount: '还没有账号？', emailBtn: '用邮箱登录' },
    es: { main: 'Hasta que todas las naciones sean ', highlight: 'Una', sub: '', verse: '"Ya no hay judío ni gentil… porque todos ustedes son uno en Cristo Jesús."', verseRef: '— Gálatas 3:28', signIn: 'Iniciar sesión', joinBtn: 'Únete a Bibple', noAccount: '¿No tienes cuenta?', emailBtn: 'Iniciar con email' },
    fr: { main: "Jusqu'à ce que toutes les nations deviennent ", highlight: 'Une', sub: '', verse: '"Il n\'y a plus ni Juif ni Grec… car tous vous êtes un en Jésus-Christ."', verseRef: '— Galates 3:28', signIn: 'Se connecter', joinBtn: 'Rejoindre Bibple', noAccount: "Pas encore de compte ?", emailBtn: 'Se connecter par email' },
    de: { main: 'Bis alle Völker ', highlight: 'Eins', sub: ' werden', verse: '"Da ist nicht Jude noch Grieche… denn ihr alle seid einer in Christus Jesus."', verseRef: '— Galater 3:28', signIn: 'Anmelden', joinBtn: 'Bibple beitreten', noAccount: 'Noch kein Konto?', emailBtn: 'Mit E-Mail anmelden' },
    pt: { main: 'Até que todas as nações se tornem ', highlight: 'Uma', sub: '', verse: '"Não há judeu nem grego… pois todos vocês são um em Cristo Jesus."', verseRef: '— Gálatas 3:28', signIn: 'Entrar', joinBtn: 'Junte-se ao Bibple', noAccount: 'Não tem conta?', emailBtn: 'Entrar com email' },
    hi: { main: 'जब तक सभी राष्ट्र ', highlight: 'एक', sub: ' न हो जाएं', verse: '"न यहूदी है न यूनानी… क्योंकि तुम सब मसीह यीशु में एक हो।"', verseRef: '— गलातियों 3:28', signIn: 'साइन इन', joinBtn: 'Bibple से जुड़ें', noAccount: 'खाता नहीं है?', emailBtn: 'ईमेल से साइन इन' },
    ar: { main: 'حتى تصبح جميع الأمم ', highlight: 'واحدة', sub: '', verse: '"ليس يهودي ولا يوناني... لأنكم جميعاً واحد في المسيح يسوع."', verseRef: '— غلاطية 3:28', signIn: 'تسجيل الدخول', joinBtn: 'انضم إلى Bibple', noAccount: 'ليس لديك حساب؟', emailBtn: 'الدخول بالبريد' },
  };

  const msg = messages[selectedLang] || messages['en'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setScreen('profile-setup');
  };

  const handleSnsLogin = (provider: string) => {
    setScreen('profile-setup');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1a1145] via-[#2d1b69] to-[#1a1145] flex flex-col items-center justify-center p-4">
      
      {/* Animated background glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-amber-500/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Floating people emojis around the globe - representing unity */}
      <div className="absolute top-[12%] left-[15%] text-2xl animate-float" style={{ animationDuration: '6s' }}>🧑🏻</div>
      <div className="absolute top-[8%] right-[18%] text-2xl animate-float" style={{ animationDuration: '7s', animationDelay: '1s' }}>👩🏽</div>
      <div className="absolute top-[30%] left-[8%] text-2xl animate-float" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>👨🏿</div>
      <div className="absolute top-[25%] right-[10%] text-2xl animate-float" style={{ animationDuration: '6.5s', animationDelay: '2s' }}>🧕🏽</div>
      <div className="absolute bottom-[25%] left-[12%] text-2xl animate-float" style={{ animationDuration: '5.5s', animationDelay: '1.5s' }}>👲🏻</div>
      <div className="absolute bottom-[20%] right-[15%] text-2xl animate-float" style={{ animationDuration: '7s', animationDelay: '0.8s' }}>👩🏼</div>
      <div className="absolute bottom-[35%] left-[20%] text-2xl animate-float" style={{ animationDuration: '6s', animationDelay: '2.5s' }}>🧑🏾</div>
      <div className="absolute bottom-[30%] right-[22%] text-2xl animate-float" style={{ animationDuration: '5s', animationDelay: '3s' }}>👨🏼</div>

      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-20">
        <select 
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="bg-white/10 backdrop-blur-md text-white/80 border border-white/20 rounded-full px-4 py-2 outline-none appearance-none cursor-pointer text-sm"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code} className="text-gray-900">
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Logo Section */}
        <div className="text-center mb-8">
          {/* Globe with cross icon */}
          <div className="relative inline-block mb-6">
            <div className="text-8xl">🌍</div>
            <div className="absolute -bottom-1 -right-1 text-3xl bg-[#2d1b69] rounded-full p-1">✝️</div>
          </div>
          
          {/* Brand Name */}
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-2">
            <span className="text-amber-400">Bib</span><span className="text-white">ple</span> <span className="text-purple-300">Chat</span>
          </h1>
          
          {/* Tagline - Bible + People */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-amber-400/80 text-sm font-semibold tracking-widest uppercase">Bible</span>
            <span className="text-white/40">+</span>
            <span className="text-purple-300/80 text-sm font-semibold tracking-widest uppercase">People</span>
            <span className="text-white/40">=</span>
            <span className="text-white text-sm font-bold tracking-widest uppercase">One</span>
          </div>

          {/* Unity Message */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 mx-4">
            <p className="text-white/90 text-lg font-medium leading-relaxed">
              {msg.main}<span className="text-amber-400 font-bold">{msg.highlight}</span>{msg.sub}
            </p>
          </div>

          {/* Connecting dots line */}
          <div className="flex items-center justify-center gap-1 mt-5 mb-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
            <div className="w-8 h-px bg-gradient-to-r from-amber-400 to-purple-400"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-8 h-px bg-gradient-to-r from-purple-400 to-indigo-400"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            <div className="w-8 h-px bg-gradient-to-r from-indigo-400 to-emerald-400"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: '0.9s' }}></div>
            <div className="w-8 h-px bg-gradient-to-r from-emerald-400 to-rose-400"></div>
            <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" style={{ animationDelay: '1.2s' }}></div>
          </div>
          <p className="text-white/40 text-xs tracking-wider">CONNECTING HEARTS WORLDWIDE</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/15 shadow-2xl">
          
          {/* SNS Login Buttons */}
          <div className="space-y-3 mb-6">
            {/* Google */}
            <button
              onClick={() => handleSnsLogin('google')}
              className="w-full flex items-center gap-3 bg-white text-gray-700 font-semibold rounded-xl px-5 py-4 hover:bg-gray-50 transform hover:scale-[1.02] transition-all active:scale-[0.98] shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="flex-1 text-left">Continue with Google</span>
            </button>

            {/* Apple */}
            <button
              onClick={() => handleSnsLogin('apple')}
              className="w-full flex items-center gap-3 bg-black text-white font-semibold rounded-xl px-5 py-4 hover:bg-gray-900 transform hover:scale-[1.02] transition-all active:scale-[0.98] shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="flex-1 text-left">Continue with Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/40 text-xs font-medium tracking-wider">OR</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Email Login Toggle */}
          {!showEmailLogin ? (
            <button
              onClick={() => setShowEmailLogin(true)}
              className="w-full flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold rounded-xl px-5 py-4 hover:bg-white/20 transition-all"
            >
              <span>✉️</span>
              <span>Sign in with Email</span>
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl px-4 py-4 hover:from-amber-600 hover:to-amber-700 transform hover:scale-[1.02] transition-all active:scale-[0.98] shadow-lg"
              >
                Sign In
              </button>
            </form>
          )}

          {/* Create Account */}
          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              Don't have an account?{' '}
              <button 
                onClick={() => setScreen('profile-setup')}
                className="text-amber-400 font-semibold hover:underline"
              >
                Join Bibple
              </button>
            </p>
          </div>
        </div>

        {/* Bottom verse */}
        <div className="text-center mt-6 px-4">
          <p className="text-white/30 text-xs italic leading-relaxed">
            {msg.verse}
          </p>
          <p className="text-white/20 text-xs mt-1">{msg.verseRef}</p>
        </div>
      </div>
    </div>
  );
}
