import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, Mail, MapPin, Download, Copy, MessageCircle, Send,
  Flame, Sparkles, Award, Heart, ChevronDown, Check, Globe, X, Moon, Sun
} from 'lucide-react'
import './App.css'

/* ─────────────────────────── i18n ─────────────────────────── */
const translations = {
  en: {
    heroTagline: 'Premium Handcrafted Decorative Candles',
    heroSub: 'Artisan craftsmanship meets modern elegance. Each candle is a unique work of art, designed to transform your space.',
    ctaContact: 'Contact Me',
    ctaSave: 'Save Contact',
    aboutTitle: 'The Art of Light',
    aboutDesc: 'We create exceptional decorative candles that blend traditional craftsmanship with contemporary design. Every piece is meticulously handcrafted using the finest natural waxes and premium fragrances.',
    serviceTitle1: 'Bespoke Design',
    serviceDesc1: 'Custom candles tailored to your vision — from concept to creation, every detail is perfected.',
    serviceTitle2: 'Premium Materials',
    serviceDesc2: 'Only the finest natural soy and beeswax, paired with hand-selected fragrance oils.',
    serviceTitle3: 'Artisan Craft',
    serviceDesc3: 'Each candle is hand-poured with care, ensuring exceptional quality and uniqueness.',
    serviceTitle4: 'Corporate & Events',
    serviceDesc4: 'Exclusive collections for luxury brands, weddings, and special occasions.',
    contactTitle: 'Get in Touch',
    contactSubtitle: 'Ready to illuminate your world? Reach out for inquiries, custom orders, or collaboration.',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    addressValue: 'Minsk, Belarus',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    wechat: 'WeChat',
    wechatScan: 'Scan QR code to add me on WeChat',
    close: 'Close',
    saveContact: 'Save Contact',
    copyPhone: 'Copy Phone',
    copyEmail: 'Copy Email',
    copied: 'Copied!',
    phoneCopied: 'Phone number copied',
    emailCopied: 'Email copied',
    openInBrowser: 'Open in Safari to save contact',
    openInBrowserDesc: 'Telegram\'s browser cannot save contacts directly. Tap the ••• button at the bottom right, then choose "Open in Safari".',
    owner: 'Company Owner',
    footerNote: 'Crafted with passion',
    langLabel: 'EN',
  },
  ru: {
    heroTagline: 'Премиальные декоративные свечи ручной работы',
    heroSub: 'Мастерство ремесленника встречает современную элегантность. Каждая свеча — уникальное произведение искусства, созданное преобразить ваше пространство.',
    ctaContact: 'Связаться',
    ctaSave: 'Сохранить контакт',
    aboutTitle: 'Искусство света',
    aboutDesc: 'Мы создаём исключительные декоративные свечи, сочетающие традиционное мастерство с современным дизайном. Каждое изделие тщательно изготовлено вручную из лучших натуральных восков и премиальных ароматов.',
    serviceTitle1: 'Индивидуальный дизайн',
    serviceDesc1: 'Свечи на заказ по вашему замыслу — от концепции до воплощения, каждая деталь доведена до совершенства.',
    serviceTitle2: 'Премиум материалы',
    serviceDesc2: 'Только лучший натуральный соевый и пчелиный воск в сочетании с отборными ароматическими маслами.',
    serviceTitle3: 'Ремесленное мастерство',
    serviceDesc3: 'Каждая свеча отлита вручную с заботой, что гарантирует исключительное качество и уникальность.',
    serviceTitle4: 'Корпоратив и мероприятия',
    serviceDesc4: 'Эксклюзивные коллекции для люксовых брендов, свадеб и особых случаев.',
    contactTitle: 'Свяжитесь с нами',
    contactSubtitle: 'Готовы осветить ваш мир? Обращайтесь по вопросам заказов, индивидуальных проектов или сотрудничества.',
    phone: 'Телефон',
    email: 'Эл. почта',
    address: 'Адрес',
    addressValue: 'Минск, Беларусь',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    wechat: 'WeChat',
    wechatScan: 'Отсканируйте QR-код, чтобы добавить меня в WeChat',
    close: 'Закрыть',
    saveContact: 'Сохранить контакт',
    copyPhone: 'Копировать телефон',
    copyEmail: 'Копировать почту',
    copied: 'Скопировано!',
    phoneCopied: 'Номер телефона скопирован',
    emailCopied: 'Почта скопирована',
    openInBrowser: 'Откройте в Safari для сохранения контакта',
    openInBrowserDesc: 'Браузер Telegram не может сохранять контакты напрямую. Нажмите кнопку ••• справа внизу, затем выберите «Открыть в Safari».',
    owner: 'Владелец компании',
    footerNote: 'Создано с любовью',
    langLabel: 'RU',
  },
  zh: {
    heroTagline: '高端手工装饰蜡烛',
    heroSub: '匠心工艺与现代优雅的完美融合。每支蜡烛都是独一无二的艺术品，旨在点亮您的空间。',
    ctaContact: '联系我',
    ctaSave: '保存联系方式',
    aboutTitle: '光的艺术',
    aboutDesc: '我们打造卓越的装饰蜡烛，将传统工艺与现代设计相结合。每件作品均采用最优质的天然蜡和高级香料精心手工制作。',
    serviceTitle1: '定制设计',
    serviceDesc1: '根据您的愿景定制蜡烛——从概念到成品，每一个细节都力臻完美。',
    serviceTitle2: '优质材料',
    serviceDesc2: '只选用最优质的天然大豆蜡和蜂蜡，搭配精选香薰精油。',
    serviceTitle3: '匠人工艺',
    serviceDesc3: '每支蜡烛都经过精心手工浇注，确保卓越的品质和独特性。',
    serviceTitle4: '企业与活动',
    serviceDesc4: '为奢侈品牌、婚礼和特殊场合打造专属系列。',
    contactTitle: '联系方式',
    contactSubtitle: '准备好点亮您的世界了吗？欢迎咨询、定制订单或合作。',
    phone: '电话',
    email: '邮箱',
    address: '地址',
    addressValue: '白俄罗斯，明斯克',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    wechat: '微信',
    wechatScan: '扫描二维码添加我的微信',
    close: '关闭',
    saveContact: '保存联系方式',
    copyPhone: '复制电话',
    copyEmail: '复制邮箱',
    copied: '已复制！',
    phoneCopied: '电话号码已复制',
    emailCopied: '邮箱已复制',
    openInBrowser: '在 Safari 中打开以保存联系人',
    openInBrowserDesc: 'Telegram 浏览器无法直接保存联系人。请点击右下角的 ••• 按钮，然后选择「在 Safari 中打开」。',
    owner: '公司负责人',
    footerNote: '用心创造',
    langLabel: '中文',
  },
}

/* ─────────────────────── Contact Info ─────────────────────── */
const CONTACT = {
  name: 'KARALIOU RAMAN', 
  phone: '+375296622515',
  phoneDisplay: '+375296622515',
  email: 'roman18vek@yandex.ru',
  company: 'Decorative Candles Production',
  whatsapp: '375296622515',
  telegram: '@Roman18vek',
}

/* ─────────────────────── vCard Download ──────────────────── */
const VCARD_URL = '/Karaliou_Raman.vcf'

function isInAppBrowser() {
  const ua = navigator.userAgent || ''
  // Known in-app browsers
  if (/Telegram|FBAN|FBAV|Instagram|Line\//i.test(ua)) return true
  // Telegram injects this object
  if (typeof window !== 'undefined' && window.TelegramWebviewProxy) return true
  // iOS WebView: has AppleWebKit but no "Safari/" token (real Safari & Chrome always have it)
  if (/iPhone|iPad|iPod/.test(ua) && /AppleWebKit/.test(ua) && !/Safari\//.test(ua)) return true
  return false
}

/* ──────────────── Clipboard (works over HTTP) ─────────────── */
function copyFallback(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  try { document.execCommand('copy') } catch (e) { /* ignore */ }
  document.body.removeChild(textarea)
}

/* ─────────────────── Animation Variants ───────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

/* ═══════════════════════ MAIN APP ═════════════════════════── */
function App() {
  const [lang, setLang] = useState('en')
  const [copiedField, setCopiedField] = useState(null)
  const [langOpen, setLangOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const t = translations[lang]

  const [wechatOpen, setWechatOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState(null)
  const [safariPrompt, setSafariPrompt] = useState(false)

  const handleSaveContact = useCallback(async () => {
    if (isInAppBrowser()) {
      setSafariPrompt(true)
      return
    }

    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent)

    if (isIOS) {
      // iOS Safari handles .vcf via direct navigation → opens Contacts
      window.location.href = VCARD_URL
    } else {
      // Android & Desktop: fetch the file, create a Blob with correct MIME, trigger download
      try {
        const res = await fetch(VCARD_URL)
        const text = await res.text()
        const blob = new Blob([text], { type: 'text/vcard' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Karaliou_Raman.vcf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } catch {
        // Fallback: direct navigation
        window.location.href = VCARD_URL
      }
    }
  }, [])

  const copyToClipboard = useCallback((text, field) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
    } else {
      copyFallback(text)
    }
    setCopiedField(field)
    const msg = field === 'phone' ? t.phoneCopied : t.emailCopied
    setToastMsg(msg)
    setTimeout(() => { setCopiedField(null); setToastMsg(null) }, 2000)
  }, [t])

  return (
    <div className={`min-h-screen bg-cream font-sans text-charcoal relative overflow-x-hidden transition-colors duration-500${dark ? ' dark' : ''}`}>
      {/* ─── Top Controls ─── */}
      <TopControls lang={lang} setLang={setLang} langOpen={langOpen} setLangOpen={setLangOpen} t={t} dark={dark} setDark={setDark} />

      {/* ─── Hero ─── */}
      <HeroSection t={t} onSave={handleSaveContact} />

      {/* ─── Decorative Divider ─── */}
      <Divider />

      {/* ─── About / Services ─── */}
      <AboutSection t={t} />

      {/* ─── Decorative Divider ─── */}
      <Divider />

      {/* ─── Contact ─── */}
      <ContactSection t={t} copiedField={copiedField} copyToClipboard={copyToClipboard} wechatOpen={wechatOpen} setWechatOpen={setWechatOpen} onSave={handleSaveContact} />

      {/* ─── WeChat QR Modal ─── */}
      <WeChatModal open={wechatOpen} onClose={() => setWechatOpen(false)} t={t} />

      {/* ─── Safari Prompt Modal ─── */}
      <SafariPromptModal open={safariPrompt} onClose={() => setSafariPrompt(false)} t={t} />

      {/* ─── Footer ─── */}
      <Footer t={t} />

      {/* ─── Floating Mobile CTA ─── */}
      <FloatingCTA t={t} onSave={handleSaveContact} />

      {/* ─── Toast ─── */}
      <Toast message={toastMsg} />
    </div>
  )
}

/* ═══════════════════ TOP CONTROLS ══════════════════════════── */
function TopControls({ lang, setLang, langOpen, setLangOpen, t, dark, setDark }) {
  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'zh', label: '中文' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="fixed top-4 right-4 z-50 flex items-center gap-2"
    >
      {/* Theme Toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-md border border-mist flex items-center justify-center text-charcoal shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {dark ? (
            <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Sun size={15} />
            </motion.div>
          ) : (
            <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Moon size={15} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Language Switcher */}
      <div className="relative">
        <button
          onClick={() => setLangOpen(!langOpen)}
          className="flex items-center gap-1.5 bg-card/80 backdrop-blur-md border border-mist rounded-full px-3.5 py-2 text-sm font-medium text-charcoal shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          <Globe size={14} className="text-gold" />
          <span>{t.langLabel}</span>
          <ChevronDown size={12} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {langOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 bg-card/90 backdrop-blur-md border border-mist rounded-2xl shadow-lg overflow-hidden min-w-[100px]"
            >
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setLangOpen(false) }}
                  className={`w-full px-4 py-2.5 text-sm text-left transition-all duration-200 cursor-pointer
                    ${lang === l.code ? 'bg-gold/10 text-gold font-medium' : 'text-charcoal hover:bg-warm'}`}
                >
                  {l.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════ HERO ═════════════════════════════── */
function HeroSection({ t, onSave }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{background: 'radial-gradient(circle, rgba(184,134,11,0.06) 0%, transparent 70%)'}} />
      </div>

      {/* Candle Icon */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="mb-8"
      >
        <div className="logo-ring logo-particles">
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-gold-light/10 flex items-center justify-center border border-gold/20 shadow-[0_0_30px_rgba(184,134,11,0.15)]">
            <Flame size={32} className="text-gold drop-shadow-[0_0_8px_rgba(184,134,11,0.4)]" />
          </div>
        </div>
      </motion.div>

      {/* Name */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
        className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-charcoal leading-tight"
      >
        KARALIOU
        <br />
        <span className="text-gold">RAMAN</span>
      </motion.h1>

      {/* Role */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
        className="mt-4 text-xs sm:text-sm uppercase tracking-[0.3em] text-stone font-medium"
      >
        {t.owner}
      </motion.p>

      {/* Tagline */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={3}
        className="mt-6 max-w-lg text-base sm:text-lg text-stone/80 font-light leading-relaxed"
      >
        {t.heroTagline}
      </motion.p>

      {/* Sub-description */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={4}
        className="mt-3 max-w-md text-sm text-stone/60 font-light leading-relaxed"
      >
        {t.heroSub}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={5}
        className="mt-10 flex flex-col sm:flex-row gap-4"
      >
        <a
          href="#contact"
          className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-charcoal text-cream text-sm font-medium rounded-full hover:bg-charcoal-light transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Mail size={16} />
          {t.ctaContact}
        </a>
        <button
          onClick={onSave}
          className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-transparent border-2 border-charcoal/20 text-charcoal text-sm font-medium rounded-full hover:border-gold hover:text-gold transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
        >
          <Download size={16} />
          {t.ctaSave}
        </button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-stone/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════ DIVIDER ══════════════════════════── */
function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 px-8">
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-mist" />
      <Sparkles size={12} className="text-gold/40" />
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-mist" />
    </div>
  )
}

/* ═══════════════════════ ABOUT ════════════════════════════── */
function AboutSection({ t }) {
  const services = [
    { icon: Sparkles, title: t.serviceTitle1, desc: t.serviceDesc1 },
    { icon: Heart, title: t.serviceTitle2, desc: t.serviceDesc2 },
    // { icon: Flame, title: t.serviceTitle3, desc: t.serviceDesc3 },
    // { icon: Award, title: t.serviceTitle4, desc: t.serviceDesc4 },
  ]

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} custom={0} className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-4">
            ✦
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-6">
            {t.aboutTitle}
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="max-w-2xl mx-auto text-stone/70 text-base sm:text-lg leading-relaxed font-light">
            {t.aboutDesc}
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="group relative bg-card/60 backdrop-blur-sm border border-mist/60 rounded-2xl p-7 hover:shadow-lg hover:border-gold/20 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold/10 to-gold-light/5 flex items-center justify-center mb-5 group-hover:from-gold/20 group-hover:to-gold-light/10 transition-all duration-500">
                <s.icon size={20} className="text-gold" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-2">{s.title}</h3>
              <p className="text-sm text-stone/70 leading-relaxed font-light">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════ CONTACT ══════════════════════════── */
function ContactSection({ t, copiedField, copyToClipboard, wechatOpen, setWechatOpen, onSave }) {
  return (
    <section id="contact" className="px-6 py-20 md:py-28 scroll-mt-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-14"
        >
          <motion.p variants={fadeUp} custom={0} className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-4">
            ✦
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal mb-4">
            {t.contactTitle}
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-stone/70 text-base font-light max-w-lg mx-auto">
            {t.contactSubtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-3 mb-10"
        >
          <motion.div variants={fadeUp} custom={0}
            className="flex items-center gap-4 bg-card/60 backdrop-blur-sm border border-mist/60 rounded-2xl p-5 hover:shadow-md transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold/10 to-gold-light/5 flex items-center justify-center shrink-0">
              <Phone size={18} className="text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-widest text-stone/50 font-medium">{t.phone}</p>
              <a href={`tel:${CONTACT.phone}`} className="text-charcoal font-medium text-base hover:text-gold transition-colors">
                {CONTACT.phoneDisplay}
              </a>
            </div>
            <button
              onClick={() => copyToClipboard(CONTACT.phone, 'phone')}
              className="w-10 h-10 rounded-xl border border-mist/80 flex items-center justify-center text-stone/40 hover:text-gold hover:border-gold/30 transition-all duration-300 shrink-0 cursor-pointer"
              title={t.copyPhone}
            >
              {copiedField === 'phone' ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            </button>
          </motion.div>

          <motion.div variants={fadeUp} custom={1}
            className="flex items-center gap-4 bg-card/60 backdrop-blur-sm border border-mist/60 rounded-2xl p-5 hover:shadow-md transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold/10 to-gold-light/5 flex items-center justify-center shrink-0">
              <Mail size={18} className="text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-widest text-stone/50 font-medium">{t.email}</p>
              <a href={`mailto:${CONTACT.email}`} className="text-charcoal font-medium text-base hover:text-gold transition-colors truncate block">
                {CONTACT.email}
              </a>
            </div>
            <button
              onClick={() => copyToClipboard(CONTACT.email, 'email')}
              className="w-10 h-10 rounded-xl border border-mist/80 flex items-center justify-center text-stone/40 hover:text-gold hover:border-gold/30 transition-all duration-300 shrink-0 cursor-pointer"
              title={t.copyEmail}
            >
              {copiedField === 'email' ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            </button>
          </motion.div>

          <motion.div variants={fadeUp} custom={2}
            className="flex items-center gap-4 bg-card/60 backdrop-blur-sm border border-mist/60 rounded-2xl p-5 hover:shadow-md transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold/10 to-gold-light/5 flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-gold" />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-stone/50 font-medium">{t.address}</p>
              <p className="text-charcoal font-medium text-base">{t.addressValue}</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {/* WhatsApp + Telegram row */}
          <div className="grid grid-cols-2 gap-3">
            <motion.a
              variants={fadeUp}
              custom={0}
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow-green btn-shimmer flex items-center justify-center gap-2.5 py-4 px-5 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] rounded-2xl font-medium text-sm hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(37,211,102,0.3)]"
            >
              <MessageCircle size={18} className="shrink-0" />
              {t.whatsapp}
            </motion.a>

            <motion.a
              variants={fadeUp}
              custom={1}
              href={`https://t.me/${CONTACT.telegram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow-telegram btn-shimmer flex items-center justify-center gap-2.5 py-4 px-5 bg-[#0088cc]/10 border border-[#0088cc]/20 text-[#0088cc] rounded-2xl font-medium text-sm hover:bg-[#0088cc] hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,136,204,0.3)]"
            >
              <Send size={18} className="shrink-0" />
              {t.telegram}
            </motion.a>
          </div>

          {/* WeChat — accent row */}
          <motion.button
            variants={fadeUp}
            custom={2}
            onClick={() => setWechatOpen(true)}
            className="btn-glow-wechat btn-shimmer w-full flex items-center justify-center gap-3 py-5 px-6 bg-[#07C160] text-white rounded-2xl font-semibold text-base shadow-[0_4px_20px_rgba(7,193,96,0.25)] hover:shadow-[0_8px_40px_rgba(7,193,96,0.4)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <MessageCircle size={22} className="shrink-0" />
            {t.wechat}
          </motion.button>

          {/* Save Contact */}
          <motion.button
            variants={fadeUp}
            custom={3}
            onClick={onSave}
            className="btn-glow-dark btn-shimmer w-full flex items-center justify-center gap-2.5 py-4 px-5 bg-charcoal text-cream rounded-2xl font-medium text-sm hover:bg-charcoal-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(184,134,11,0.2)] cursor-pointer"
          >
            <Download size={18} className="shrink-0" />
            {t.saveContact}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════ WECHAT QR MODAL ══════════════════════── */
function WeChatModal({ open, onClose, t }) {
  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative bg-card rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-mist/50 flex items-center justify-center text-stone hover:text-charcoal hover:bg-mist transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* WeChat Icon */}
            <div className="w-14 h-14 rounded-2xl bg-[#07C160]/10 flex items-center justify-center mx-auto mb-5">
              <MessageCircle size={28} className="text-[#07C160]" />
            </div>

            <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">{t.wechat}</h3>
            <p className="text-sm text-stone/60 mb-6">{t.wechatScan}</p>

            {/* QR Code Image */}
            <div className="bg-cream rounded-2xl p-4 border border-mist/60">
              <img
                src="/wechat-qr.png"
                alt="WeChat QR Code"
                className="w-full max-w-[240px] mx-auto rounded-lg"
              />
            </div>

            <button
              onClick={onClose}
              className="mt-6 px-8 py-2.5 bg-charcoal text-cream text-sm font-medium rounded-full hover:bg-charcoal-light transition-all cursor-pointer"
            >
              {t.close}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════ SAFARI PROMPT MODAL ═══════════════════── */
function SafariPromptModal({ open, onClose, t }) {
  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative bg-card rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-mist/50 flex items-center justify-center text-stone hover:text-charcoal hover:bg-mist transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
              <Globe size={28} className="text-gold" />
            </div>

            <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">{t.openInBrowser}</h3>
            <p className="text-sm text-stone/60 mb-6 leading-relaxed">{t.openInBrowserDesc}</p>

            {/* Visual hint: ••• icon */}
            <div className="bg-cream rounded-2xl p-4 border border-mist/60 flex items-center justify-center gap-3 text-stone/80 text-sm">
              <span className="text-2xl tracking-widest font-bold">•••</span>
              <span>→</span>
              <span className="font-medium">Safari</span>
            </div>

            <button
              onClick={onClose}
              className="mt-6 px-8 py-2.5 bg-charcoal text-cream text-sm font-medium rounded-full hover:bg-charcoal-light transition-all cursor-pointer"
            >
              {t.close}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════ FOOTER ═══════════════════════════── */
function Footer({ t }) {
  return (
    <footer className="py-12 text-center">
      <div className="flex items-center justify-center gap-2 text-stone/40 text-xs uppercase tracking-[0.2em]">
        <span>{t.footerNote}</span>
        <Heart size={10} className="text-gold/50 fill-gold/50" />
      </div>
      <p className="text-stone/30 text-xs mt-2 font-light">
        &copy; {new Date().getFullYear()} Karaliou Raman
      </p>
    </footer>
  )
}

/* ═══════════════════ FLOATING CTA (Mobile) ════════════════── */
function FloatingCTA({ t, onSave }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2 md:hidden"
        >
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 bg-charcoal text-cream text-sm font-medium rounded-full shadow-2xl hover:bg-charcoal-light transition-all"
          >
            <Mail size={16} />
            {t.ctaContact}
          </a>
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-5 py-3 bg-card/90 backdrop-blur-md text-charcoal text-sm font-medium rounded-full shadow-2xl border border-mist hover:bg-card transition-all cursor-pointer"
          >
            <Download size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════ TOAST ════════════════════════════── */
function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-[90] px-5 py-2.5 bg-charcoal text-cream text-sm font-medium rounded-full shadow-2xl flex items-center gap-2"
        >
          <Check size={14} className="text-green-400" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
