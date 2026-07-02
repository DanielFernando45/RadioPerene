import { useState, useEffect, useRef } from "react";
import logo from "./assets/logo.png";

// ========== DATOS CENTRALIZADOS ==========
const navigationItems = [
  { id: "inicio", label: "Inicio" },
  { id: "programas", label: "Programas" },
  { id: "nosotros", label: "Nosotros" },
  { id: "contacto", label: "Contacto" },
];

const programsData = [
  {
    icon: "🌅",
    title: "Mañanas de la Selva",
    desc: "Noticias y actualidad amazónica con los últimos sucesos de la región.",
    time: "06:00 AM",
    host: "Carlos Mamani",
    color: "from-emerald-500/20 to-teal-500/20",
    gradient: "from-emerald-400 to-teal-400"
  },
  {
    icon: "🪘",
    title: "Raíces Asháninkas",
    desc: "Cultura, historias ancestrales y tradición viva de nuestros pueblos.",
    time: "12:00 PM",
    host: "Juana Ríos",
    color: "from-amber-500/20 to-orange-500/20",
    gradient: "from-amber-400 to-orange-400"
  },
  {
    icon: "🎵",
    title: "Ritmos Amazónicos",
    desc: "La mejor música regional con los artistas más destacados de la selva.",
    time: "07:00 PM",
    host: "Pedro Shibao",
    color: "from-rose-500/20 to-red-500/20",
    gradient: "from-rose-400 to-red-400"
  },
];

const features = [
  { icon: "📻", text: "Streaming 24/7", color: "text-emerald-400" },
  { icon: "🎵", text: "Música Regional", color: "text-amber-400" },
  { icon: "👥", text: "Cultura Amazónica", color: "text-rose-400" },
  { icon: "🏆", text: "Noticias Locales", color: "text-blue-400" },
];

const contactInfo = [
  { icon: "📞", title: "Teléfono", value: "+51 949 619 002", link: "tel:+51949619002", color: "hover:bg-blue-500" },
  { icon: "✉️", title: "Correo", value: "genaropoma30@gmail.com", link: "mailto:genaropoma30@gmail.com", color: "hover:bg-red-500" },
  { icon: "📍", title: "Ubicación", value: "Santa Ana - Perene - Chanchamayo", link: null, color: "hover:bg-emerald-500" },
];

const socialLinks = [
  { icon: "📘", name: "Facebook", link: "https://facebook.com", color: "hover:bg-[#1877f2]" },
  { icon: "📸", name: "Instagram", link: "https://instagram.com", color: "hover:bg-gradient-to-r hover:from-[#833ab4] hover:to-[#fd1d1d]" },
  { icon: "▶️", name: "YouTube", link: "https://youtube.com", color: "hover:bg-[#ff0000]" },
];

// ========== COMPONENTES ANIMADOS ==========
const FadeIn = ({ children, delay = 0 }) => (
  <div className={`animate-fadeIn opacity-0`} style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}>
    {children}
  </div>
);

const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      {children}
    </div>
  );
};

// ========== HEADER MODERNO ==========
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/10"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative">
            <div className="flex items-center">
              <img className="h-14 w-20" src={logo} alt="logo" />
              <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
               Radio Perene
              </h1>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex gap-8 lg:gap-12 font-medium">
          {navigationItems.map((item) => (
            <ScrollLink
              key={item.id}
              href={`#${item.id}`}
              className="relative text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-amber-400 group-hover:w-full transition-all duration-300"></span>
            </ScrollLink>
          ))}
        </nav>

        <button
          className="md:hidden p-2 hover:bg-white/10 rounded-xl transition-all text-2xl"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-black/95 backdrop-blur-xl px-6 pb-6 flex flex-col gap-3 border-t border-white/10">
          {navigationItems.map((item) => (
            <ScrollLink
              key={item.id}
              href={`#${item.id}`}
              onClick={closeMenu}
              className="py-3 text-gray-300 hover:text-white transition-colors"
            >
              {item.label}
            </ScrollLink>
          ))}
        </div>
      </div>
    </header>
  );
}

const ScrollLink = ({ href, children, onClick, className = "" }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      onClick?.();
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

// ========== HERO MODERNO ==========
function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center scale-110 animate-slowZoom"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn delay={200}>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                  <div className="w-2 h-2 rounded-full bg-red-500 absolute top-0"></div>
                </div>
                <span className="text-sm font-semibold tracking-wide">🔴 EN VIVO</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                El Sonido
                <span className="block bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent mt-2">
                  de la Selva
                </span>
              </h1>

              <p className="text-lg text-gray-200 leading-relaxed max-w-lg">
                Música, cultura y tradición inspirando a las comunidades Asháninkas y la selva peruana.
              </p>

              <div className="flex gap-8 pt-8">
                <div>
                  <div className="text-3xl font-black text-emerald-400">24/7</div>
                  <div className="text-sm text-gray-300">Transmisión</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <div className="text-3xl font-black text-emerald-400">50K+</div>
                  <div className="text-sm text-gray-300">Oyentes</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <div className="text-3xl font-black text-emerald-400">10+</div>
                  <div className="text-sm text-gray-300">Programas</div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <PlayerCard />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ========== PLAYER MODERNO ==========
function PlayerCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(245);

  useEffect(() => {
    let interval;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => setCurrentTime(prev => Math.min(prev + 1, duration)), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, currentTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl hover:border-emerald-500/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-red-500 absolute top-0 animate-ping"></div>
          </div>
          <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">En Vivo</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">📡 Streaming HD</span>
        </div>
      </div>

      <div className="relative group mb-6">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
        
        <div className="relative bg-gradient-to-r from-black/50 to-emerald-950/30 rounded-xl p-3 border border-white/10 group-hover:border-emerald-500/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-400">Radio Perene - Reproductor Oficial</span>
          </div>
          
          <iframe 
            src="https://sonic.globalstream.pro/cp/widgets/player/single/?p=8012" 
            height="120" 
            width="100%" 
            scrolling="no"
            className="rounded-lg"
            style={{ minHeight: '120px' }}
            title="Radio Perene Player"
          ></iframe>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
        <StatCard icon="📻" title="24/7" subtitle="En Vivo" />
        <StatCard icon="🎧" title="HD" subtitle="Audio" />
        <StatCard icon="⏰" title="FM" subtitle="Online" />
      </div>
    </div>
  );
}

function StatCard({ icon, title, subtitle }) {
  return (
    <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition-all group">
      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="text-lg font-black">{title}</h4>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}

// ========== PROGRAMAS MODERNOS ==========
function Programs() {
  return (
    <section id="programas" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 px-4 py-2 rounded-full mb-4">
              <span className="text-emerald-400">📅</span>
              <span className="text-sm font-semibold text-emerald-400">Programación Semanal</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              Programas Destacados
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Descubre nuestra programación diaria diseñada para conectar tecnología y tradición
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsData.map((program, index) => (
            <ScrollReveal key={index}>
              <div className={`group relative bg-gradient-to-br ${program.color} rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${program.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className="relative">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {program.icon}
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full mb-4">
                    <span>⏰</span>
                    <span className="text-xs font-semibold">{program.time}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-2">{program.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">🎙️ con {program.host}</p>
                  <p className="text-gray-400 leading-relaxed">{program.desc}</p>
                  <button className="mt-6 text-emerald-400 hover:text-emerald-300 font-semibold text-sm flex items-center gap-1 group/btn">
                    Más información 
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========== ABOUT MODERNO ==========
function About() {
  return (
    <section id="nosotros" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 px-4 py-2 rounded-full">
                <span className="text-rose-400">❤️</span>
                <span className="text-sm font-semibold text-emerald-400">Nuestra Historia</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                Cultura y{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                  Tecnología
                </span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Radio Perene conecta la rica tradición amazónica con una experiencia digital moderna, 
                llevando la voz de la selva a todo el mundo.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-all">
                    <span className={`text-2xl ${feature.color}`}>{feature.icon}</span>
                    <span className="font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-2xl p-6 border border-white/10 mt-6">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-rose-400">❤️</span>
                  ))}
                </div>
                <p className="text-gray-200 italic">"La mejor radio para conectar con mis raíces amazónicas"</p>
                <p className="text-sm text-emerald-400 mt-2">— María Fernández, Oyente</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop"
                alt="Río amazónico"
                className="relative rounded-3xl shadow-2xl object-cover h-[400px] lg:h-[500px] w-full"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ========== FACEBOOK LIVE SECTION ==========
function FacebookLive() {
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoId, setVideoId] = useState(null);
  
  // Cambia esto por el ID de tu página de Facebook
  const FACEBOOK_PAGE_ID = "TU_PAGE_ID"; // REEMPLAZA CON EL ID DE TU PÁGINA

  useEffect(() => {
    // Simulación de verificación de live
    // En producción, conecta con la API real de Facebook
    const checkLiveStatus = async () => {
      try {
        setIsLoading(true);
        
        // Simulación - Cambia a true para probar modo live
        const mockLiveStatus = false; // Cambia a true para ver el modo live
        
        setTimeout(() => {
          if (mockLiveStatus) {
            setIsLive(true);
            setVideoId("1234567890");
          } else {
            setIsLive(false);
            setVideoId(null);
          }
          setIsLoading(false);
        }, 1500);
        
      } catch (err) {
        console.error("Error:", err);
        setIsLoading(false);
      }
    };

    checkLiveStatus();
  }, []);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 px-4 py-2 rounded-full mb-4">
              <span className="text-emerald-400">📺</span>
              <span className="text-sm font-semibold text-emerald-400">Facebook Live</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              Transmisión en Vivo
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Mira nuestras transmisiones especiales en Facebook Live y sé parte de nuestra comunidad
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Video Player Section */}
          <ScrollReveal>
            <div className="relative">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full">
                {isLoading ? (
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                ) : isLive ? (
                  <>
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-red-500 absolute top-0 animate-ping"></div>
                    </div>
                    <span className="text-sm font-bold text-red-500">EN VIVO AHORA</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                    <span className="text-sm font-bold text-gray-400">NO TRANSMITIENDO</span>
                  </>
                )}
              </div>

              <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/20 p-4 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: '400px' }}>
                  {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-emerald-500/10 to-amber-500/10">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-400">Cargando transmisión...</p>
                      </div>
                    </div>
                  ) : isLive ? (
                    <iframe
                      src={`https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/${FACEBOOK_PAGE_ID}/videos/${videoId}&show_text=false&width=560&height=400`}
                      width="100%"
                      height="450"
                      style={{ border: 'none', overflow: 'hidden' }}
                      scrolling="no"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      title="Facebook Live Video"
                      className="rounded-xl"
                    ></iframe>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-emerald-950">
                      <div className="text-center p-8">
                        <div className="text-7xl mb-4">📺</div>
                        <h3 className="text-2xl font-bold mb-2">No hay transmisión en vivo</h3>
                        <p className="text-gray-400 mb-6">
                          Actualmente no estamos transmitiendo en vivo.{"\n"}
                          ¡Síguenos para saber cuándo empezamos!
                        </p>
                        <a
                          href={`https://www.facebook.com/${FACEBOOK_PAGE_ID}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-amber-500 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all"
                        >
                          <span>📘</span>
                          Visitar nuestra página
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Información de la Página */}
          <ScrollReveal>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📅</span>
                  <h3 className="text-xl font-bold">Próximas Transmisiones</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <div>
                      <p className="font-semibold">Programa Especial</p>
                      <p className="text-sm text-gray-400">Concierto Asháninka</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-bold">Hoy 7:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <div>
                      <p className="font-semibold">Ritmos Amazónicos</p>
                      <p className="text-sm text-gray-400">Música en vivo</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-bold">Mañana 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📊</span>
                  <h3 className="text-xl font-bold">Estadísticas de la Comunidad</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <div className="text-2xl font-black text-emerald-400">50K+</div>
                    <div className="text-xs text-gray-400">Seguidores</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <div className="text-2xl font-black text-emerald-400">45K+</div>
                    <div className="text-xs text-gray-400">Likes</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <div className="text-2xl font-black text-emerald-400">10K+</div>
                    <div className="text-xs text-gray-400">Interacciones</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <div className="text-2xl font-black text-emerald-400">24/7</div>
                    <div className="text-xs text-gray-400">Comunidad activa</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={`https://www.facebook.com/${FACEBOOK_PAGE_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>📘</span>
                  Ver Página
                </a>
                <button
                  onClick={() => window.open(`https://www.facebook.com/${FACEBOOK_PAGE_ID}/videos`, '_blank')}
                  className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>🎥</span>
                  Ver Videos
                </button>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔔</span>
                  <p className="text-sm text-gray-300">
                    ¡Activa las notificaciones para no perderte nuestras transmisiones en vivo!
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ========== SOCIAL MEDIA SECTION ==========
function SocialMedia() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">Síguenos en redes</h2>
            <p className="text-gray-300">Mantente conectado con nuestra comunidad amazónica</p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-6">
          {socialLinks.map((social, index) => (
            <ScrollReveal key={index}>
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10 transition-all duration-300 hover:-translate-y-2 ${social.color}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                <div className="text-6xl mx-auto mb-4 group-hover:scale-110 transition-transform">{social.icon}</div>
                <h3 className="text-xl font-bold">{social.name}</h3>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========== CONTACT MODERNO ==========
function Contact() {
  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 px-4 py-2 rounded-full mb-4">
              <span className="text-emerald-400">✉️</span>
              <span className="text-sm font-semibold text-emerald-400">Contáctanos</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              Comunícate con Nosotros
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Estamos aquí para escucharte. Contáctanos a través de cualquiera de estos medios
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => (
            <ScrollReveal key={index}>
              {info.link ? (
                <a
                  href={info.link}
                  className={`group block bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:${info.color}`}
                >
                  <div className="text-5xl mx-auto mb-4 group-hover:scale-110 transition-transform">{info.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                  <p className="text-gray-400">{info.value}</p>
                </a>
              ) : (
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10">
                  <div className="text-5xl mx-auto mb-4">{info.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                  <p className="text-gray-400">{info.value}</p>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========== FOOTER MODERNO ==========
function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 text-center bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors text-2xl"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Radio Perene • Inspirado en la Amazonía Peruana
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-emerald-400 transition-colors">Términos</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ========== APP PRINCIPAL ==========
export default function App() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slowZoom {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(1.1);
        }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.8s ease-out forwards;
      }
      
      .animate-slowZoom {
        animation: slowZoom 20s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Programs />
        <About />
        <FacebookLive />
        <SocialMedia />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}