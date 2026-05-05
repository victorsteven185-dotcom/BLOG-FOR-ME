/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ArrowUpRight, Search, Instagram, Twitter, Linkedin, 
  ChevronRight, ArrowUp, MapPin, Phone, Mail, Globe, Send,
  Facebook, Github, ChevronLeft
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Types
interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  readingTime: string;
  tags: string[];
}

type View = 'home' | 'about' | 'contact' | 'archive' | 'article-detail' | 'team' | 'legal' | 'strategy';

// Mock Data
const STRATEGY_DATA = [
  { title: "Capital Allocation", value: "42%", trend: "+2.4%", desc: "Weighted towards emerging tech and verified digital primitives." },
  { title: "Risk Exposure", value: "Low", trend: "Stable", desc: "Hedging protocols active against volatility in high-yield debt." },
  { title: "Liquidity Depth", value: "$1.2B", trend: "+12%", desc: "Aggregated secondary market depth across Zurich/London nodes." }
];

const TEAM = [
  { name: "Elena Vance", role: "Editor-in-Chief", bio: "Former Lex correspondent with 15 years experience in capital markets.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" },
  { name: "Marcus Thorne", role: "Macro Strategist", bio: "Leading researcher on digital primitives and sovereign wealth shifts.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" },
  { name: "Sarah Chen", role: "Venture Lead", bio: "Specializes in pre-IPO liquidity and foundation-backed capital cycles.", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop" }
];

// Mock Data
const ARTICLES: Article[] = [
  {
    id: 1,
    category: "MARKET ANALYSIS",
    title: "The Silent Transformation of Global Capital Flows",
    excerpt: "How shifting demographic trends in emerging markets are redrawing the map of international investment and liquidity.",
    author: "Elena Vance",
    date: "May 12, 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    readingTime: "8 min read",
    tags: ["Economics", "Emerging Markets", "Liquidity"]
  },
  {
    id: 2,
    category: "STRATEGY",
    title: "Wealth Preservation in the Age of Digital Scarcity",
    excerpt: "Beyond traditional gold: exploring the new primitives of value in a hyper-connected, yet increasingly fragmented economy.",
    author: "Marcus Thorne",
    date: "May 10, 2024",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2022&auto=format&fit=crop",
    readingTime: "6 min read",
    tags: ["Digital Assets", "Gold", "Strategy"]
  },
  {
    id: 3,
    category: "VENTURE",
    title: "The Liquidity Trap: Startups and the New Exit Reality",
    excerpt: "Why the traditional IPO path is being bypassed by a new generation of founders opting for structured private liquidity.",
    author: "Sarah Chen",
    date: "May 08, 2024",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop",
    readingTime: "5 min read",
    tags: ["Venture Capital", "IPOs", "Startups"]
  },
  {
    id: 4,
    category: "MACRO",
    title: "Interest Rates: The End of the 'Free Money' Era",
    excerpt: "Realigning portfolios for a decade where capital has a real cost once again. Winners, losers, and the new neutral.",
    author: "Julian Rossi",
    date: "May 05, 2024",
    image: "https://images.unsplash.com/photo-1611974714024-4696f0148941?q=80&w=2070&auto=format&fit=crop",
    readingTime: "12 min read",
    tags: ["Interest Rates", "Portfolios", "Macro"]
  },
  {
    id: 5,
    category: "INSIGHT",
    title: "Modern Philanthropy as an asset Class",
    excerpt: "How high-net-worth individuals are integrating impact investing directly into their core capital allocation strategies.",
    author: "Diane Lock",
    date: "May 02, 2024",
    image: "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=2070&auto=format&fit=crop",
    readingTime: "4 min read",
    tags: ["Philanthropy", "Impact Investing", "Wealth"]
  },
  {
    id: 6,
    category: "TECHNOLOGY",
    title: "AI in Quantitative Finance: Theory vs. Reality",
    excerpt: "The battle between human intuition and algorithmic precision in the quest for alpha in increasingly efficient markets.",
    author: "Ariel Berg",
    date: "April 28, 2024",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    readingTime: "9 min read",
    tags: ["AI", "Quant", "Alpha"]
  },
  {
    id: 7,
    category: "COMMODITIES",
    title: "The Copper Crunch: Electrification's Achilles Heel",
    excerpt: "Why the global push for renewable energy might stay grounded without a radical restructuring of industrial metal supply chains.",
    author: "Elena Vance",
    date: "April 24, 2024",
    image: "https://images.unsplash.com/photo-1533106497176-45ae19b68ba2?q=80&w=2070&auto=format&fit=crop",
    readingTime: "7 min read",
    tags: ["Copper", "Energy Transition", "Supply Chain"]
  },
  {
    id: 8,
    category: "STRATEGY",
    title: "ESG 2.0: From Compliance to Alpha Generator",
    excerpt: "How institutional investors are moving past checkbox sustainability toward deep structural integration of environmental risk.",
    author: "Julian Rossi",
    date: "April 20, 2024",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
    readingTime: "11 min read",
    tags: ["ESG", "Institutional", "Sustainability"]
  },
  {
    id: 9,
    category: "REAL ESTATE",
    title: "The Ghost Office: Repurposing Urban Dead Zones",
    excerpt: "As commercial occupancy remains low, the conversion of metropolitan hubs into 'living centers' presents a generational arbitrage opportunity.",
    author: "Marcus Thorne",
    date: "April 15, 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    readingTime: "9 min read",
    tags: ["Commercial Real Estate", "Urbanism", "Arbitrage"]
  },
  {
    id: 10,
    category: "DEFI",
    title: "Sovereign Nodes: The Rise of State-Backed Digital Assets",
    excerpt: "Exploring the tension between decentralized ideals and the inevitable integration of central bank digital currencies into global FX markets.",
    author: "Sarah Chen",
    date: "April 10, 2024",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1974&auto=format&fit=crop",
    readingTime: "13 min read",
    tags: ["CBDC", "DeFi", "Sovereignty"]
  }
];

// Mock Market Data
const TICKER_DATA = [
  { symbol: "S&P 500", price: "5,241.53", change: "+0.32%", trending: "up" },
  { symbol: "NASDAQ", price: "16,384.47", change: "-0.12%", trending: "down" },
  { symbol: "BTC/USD", price: "64,212.00", change: "+2.45%", trending: "up" },
  { symbol: "ETH/USD", price: "3,412.15", change: "-0.82%", trending: "down" },
  { symbol: "EUR/USD", price: "1.0842", change: "+0.04%", trending: "up" },
  { symbol: "GBP/USD", price: "1.2631", change: "-0.15%", trending: "down" },
  { symbol: "GOLD", price: "2,324.40", change: "+1.12%", trending: "up" },
  { symbol: "CRUDE OIL", price: "82.14", change: "-2.10%", trending: "down" },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState<View>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const MarketTicker = () => (
    <div className="w-full bg-brand-text text-brand-bg py-2 overflow-hidden border-b border-white/10 select-none">
      <div className="ticker-content">
        {[...TICKER_DATA, ...TICKER_DATA].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 px-8 border-r border-white/5 last:border-r-0">
            <span className="font-sans text-[10px] font-bold tracking-widest uppercase opacity-40">{item.symbol}</span>
            <span className="font-mono text-[10px] font-bold">{item.price}</span>
            <span className={`font-sans text-[9px] font-bold ${item.trending === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // Preloader effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Back to top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Navigation helpers
  const navigateTo = (newView: View, article: Article | null = null) => {
    setView(newView);
    setSelectedArticle(article);
    setIsMenuOpen(false);
    scrollToTop();
  };

  const allTags = Array.from(new Set(ARTICLES.flatMap(article => article.tags))).sort();

  const filteredArticles = ARTICLES.filter(article => {
    const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  const Breadcrumbs = () => (
    <nav className="mb-12 flex items-center gap-2 text-[10px] font-sans font-bold tracking-[0.3em] uppercase opacity-30">
      <button onClick={() => navigateTo('home')} className="hover:opacity-100 transition-opacity">Home</button>
      <span>/</span>
      {view !== 'home' && (
        <>
          <span className="opacity-100">{view.replace('-', ' ')}</span>
          {selectedArticle && (
            <>
              <span>/</span>
              <span className="opacity-100 truncate max-w-[150px]">{selectedArticle.title}</span>
            </>
          )}
        </>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col font-serif selection:bg-brand-text selection:text-brand-bg">
      {/* Preloader */}
      <div className={`preloader ${!loading ? 'hidden' : ''}`}>
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-black tracking-tighter">THE LEDGER</h1>
          <div className="loader-bar"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav 
        className={`fixed w-full z-[1000] transition-all duration-500 border-b ${
          scrolled || view !== 'home' ? 'bg-brand-bg/95 border-brand-text' : 'bg-transparent border-transparent'
        }`}
      >
        <MarketTicker />
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-end pb-4 pt-6">
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 hover:italic transition-all group"
            >
              <Menu size={18} />
              <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase">Bulletin</span>
            </button>
            <div className={`hidden md:block transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-40'}`}>
              <p className="font-sans text-[10px] uppercase tracking-widest text-[#1A1A1A]">Issue No. 42</p>
            </div>
          </div>

          <button onClick={() => navigateTo('home')} className="flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-none hover:tracking-normal transition-all duration-700">
              THE LEDGER
            </h1>
            <span className="text-[9px] font-sans font-bold tracking-[0.4em] uppercase opacity-60 mt-2">Quarterly Insights & Financial Strategy</span>
          </button>

          <div className="flex flex-col items-end gap-2 text-[#1A1A1A]">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => navigateTo('archive')}
                className="hover:opacity-40 transition-opacity"
              >
                <Search size={18} />
              </button>
              <button className="bg-brand-text text-brand-bg px-5 py-2 text-[10px] font-sans font-bold tracking-widest uppercase hover:opacity-90 transition-opacity hidden md:block">
                Subscribe
              </button>
            </div>
            <div className={`hidden md:block transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-40'}`}>
              <p className="font-sans text-[10px] uppercase tracking-widest font-bold">Spring 2024</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-bg z-[1001] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-sans font-bold tracking-widest uppercase opacity-40">Documentation Index</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-brand-text/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
              <ul className="space-y-4 md:space-y-6">
                {[
                  { name: 'Home', view: 'home' as View },
                  { name: 'Archive', view: 'archive' as View },
                  { name: 'Strategy', view: 'strategy' as View },
                  { name: 'Thesis', view: 'about' as View },
                  { name: 'The Team', view: 'team' as View },
                  { name: 'Contact', view: 'contact' as View },
                  { name: 'Legal', view: 'legal' as View }
                ].map((item, idx) => (
                  <motion.li 
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <button 
                      onClick={() => navigateTo(item.view)}
                      className="text-6xl md:text-9xl font-serif font-black tracking-tighter hover:italic hover:pl-6 transition-all duration-500 uppercase leading-[0.8] text-left"
                    >
                      {item.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-end border-t border-brand-text/10 pt-8">
              <div className="space-y-2">
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase opacity-40 block">Digital Presence</span>
                <div className="flex gap-6">
                  <Twitter size={18} className="hover:opacity-40 cursor-pointer" />
                  <Facebook size={18} className="hover:opacity-40 cursor-pointer" />
                  <Instagram size={18} className="hover:opacity-40 cursor-pointer" />
                  <Linkedin size={18} className="hover:opacity-40 cursor-pointer" />
                  <Github size={18} className="hover:opacity-40 cursor-pointer" />
                </div>
              </div>
              <p className="text-[9px] font-sans font-bold tracking-widest uppercase opacity-30 text-right leading-relaxed">
                Ledger Media Group.<br />Zurich • New York • Tokyo
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-72 md:pt-64 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {/* HOME VIEW */}
            {view === 'home' && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Header Swiper Slider */}
                <section className="mb-24 min-h-[500px] md:h-[600px] flex flex-col">
                  <Swiper
                    modules={[Pagination, Autoplay, EffectFade]}
                    effect="fade"
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    className="w-full h-full hero-swiper"
                    autoHeight={true}
                  >
                    {ARTICLES.slice(0, 3).map((article) => (
                      <SwiperSlide key={article.id} className="h-full bg-brand-bg">
                        <div className="grid md:grid-cols-2 h-full items-center gap-8 md:gap-12 pb-20 md:pb-0">
                          <div className="order-2 md:order-1 space-y-4 md:space-y-8">
                            <div>
                              <span className="font-sans text-[10px] font-bold uppercase tracking-widest bg-brand-text text-brand-bg px-2 py-1">
                                Featured Story
                              </span>
                            </div>
                            <h2 className="text-4xl md:text-7xl font-black leading-[0.9] group-hover:italic transition-all">
                              {article.title}
                            </h2>
                            <p className="text-lg md:text-xl text-brand-text/60 italic leading-tight max-w-md">
                              {article.excerpt}
                            </p>
                            <button 
                              onClick={() => navigateTo('article-detail', article)}
                              className="group flex items-center gap-4 text-xs font-sans font-bold tracking-[0.3em] uppercase underline underline-offset-8 decoration-1"
                            >
                              Open Ledger <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                          </div>
                          <div className="order-1 md:order-2 h-64 md:h-full bg-[#D9D7D2] overflow-hidden grayscale contrast-125 relative">
                            <img 
                              src={article.image} 
                              alt={article.title} 
                              className="w-full h-full object-cover mix-blend-multiply opacity-80" 
                              referrerPolicy="no-referrer" 
                            />
                            <div className="absolute inset-0 bg-brand-text/5 mix-blend-overlay"></div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </section>

                {/* Sub Grid Section */}
                <section className="mt-32">
                  <div className="flex justify-between items-end mb-12 divider-heavy pb-4">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">The Briefing</h3>
                    <div className="font-sans text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">Series 04.2</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                    {ARTICLES.slice(3).map((article, idx) => (
                      <motion.article 
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="article-card group cursor-pointer"
                        onClick={() => navigateTo('article-detail', article)}
                      >
                        <div className="article-image-container mb-6">
                          <img src={article.image} alt={article.title} referrerPolicy="no-referrer" />
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-brand-accent">{article.category}</span>
                            <span className="h-px bg-brand-text/10 flex-1"></span>
                          </div>
                          <h4 className="text-2xl leading-[1.05] font-black group-hover:underline decoration-2 underline-offset-4">
                            {article.title}
                          </h4>
                          <p className="text-sm text-brand-text/50 font-sans leading-relaxed line-clamp-2">
                            {article.excerpt}
                          </p>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {/* ARCHIVE VIEW */}
            {view === 'archive' && (
              <motion.div key="archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Breadcrumbs />
                <div className="mb-16 space-y-12">
                  <h2 className="text-6xl md:text-8xl font-black tracking-tighter">THE ARCHIVE</h2>
                  
                  <div className="relative group max-w-2xl">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity" size={24} />
                    <input 
                      type="text" 
                      placeholder="Search signals..."
                      className="w-full bg-transparent border-b border-brand-text/10 py-6 pl-12 text-3xl font-serif italic outline-none focus:border-brand-text transition-colors"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4 flex-wrap border-y border-brand-text/5 py-8">
                    <button 
                      onClick={() => setSelectedTag(null)}
                      className={`text-[10px] font-sans font-bold tracking-[0.2em] uppercase px-4 py-2 border transition-all ${!selectedTag ? 'bg-brand-text text-brand-bg border-brand-text shadow-xl' : 'border-brand-text/10'}`}
                    >
                      All Issues
                    </button>
                    {allTags.map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`text-[10px] font-sans font-bold tracking-[0.2em] uppercase px-4 py-2 border transition-all ${selectedTag === tag ? 'bg-brand-text text-brand-bg border-brand-text shadow-xl' : 'border-brand-text/10'}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 mb-24">
                  {paginatedArticles.map((article) => (
                    <motion.article 
                      key={article.id}
                      layout
                      className="article-card group cursor-pointer"
                      onClick={() => navigateTo('article-detail', article)}
                    >
                      <div className="article-image-container mb-6 h-48">
                        <img src={article.image} alt={article.title} referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-xl leading-tight font-black group-hover:underline">{article.title}</h4>
                      <p className="text-sm text-brand-text/40 opacity-60 font-sans mt-2">{article.date} • {article.readingTime}</p>
                    </motion.article>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-6 border-t border-brand-text/10 pt-12">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className="p-4 rounded-full border border-brand-text/10 hover:bg-brand-text hover:text-brand-bg disabled:opacity-10 transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="font-sans text-[10px] font-bold tracking-widest uppercase">Page {currentPage} of {totalPages}</span>
                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className="p-4 rounded-full border border-brand-text/10 hover:bg-brand-text hover:text-brand-bg disabled:opacity-10 transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* ABOUT VIEW */}
            {view === 'about' && (
              <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Breadcrumbs />
                <div className="grid md:grid-cols-2 gap-24 items-start">
                  <div className="space-y-12">
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter">OUR THESIS</h2>
                    <p className="text-3xl italic text-brand-text/60 leading-tight">
                      We believe that financial reporting should be as sophisticated as the markets it observes.
                    </p>
                    <div className="prose text-lg text-brand-text/80 space-y-6">
                      <p>
                        Established in 2024, The Ledger is a boutique media entity dedicated to providing high-signal reporting for the modern institution. Our focus is not on the noise of the daily ticker, but on the structural shifts that define the coming decade.
                      </p>
                      <p>
                        From our offices in Zurich, New York, and Tokyo, we source insights from the most influential minds in macroeconomics, venture capital, and quantitative strategy.
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#D9D7D2] aspect-[4/5] overflow-hidden grayscale contrast-125">
                    <img 
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                      alt="Office" 
                      className="w-full h-full object-cover mix-blend-multiply opacity-80"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STRATEGY VIEW */}
            {view === 'strategy' && (
              <motion.div key="strategy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Breadcrumbs />
                <div className="space-y-24">
                  <header className="max-w-3xl">
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">GLOBAL STRATEGY</h2>
                    <p className="text-2xl text-brand-text/60 italic">
                      Our live-updating capital allocation dashboard and structural market analysis.
                    </p>
                  </header>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {STRATEGY_DATA.map((item, idx) => (
                      <div key={idx} className="border border-brand-text/10 p-8 space-y-4 hover:border-brand-text transition-colors">
                        <span className="text-[10px] font-sans font-bold tracking-widest uppercase opacity-40">{item.title}</span>
                        <div className="flex items-baseline gap-4">
                          <h4 className="text-4xl font-black">{item.value}</h4>
                          <span className="text-green-600 font-sans text-xs font-bold">{item.trend}</span>
                        </div>
                        <p className="text-sm opacity-60 leading-relaxed italic">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-brand-text text-brand-bg p-12 md:p-20">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                      <div className="space-y-8">
                        <h3 className="text-4xl font-black leading-none">Correlated Signal Detection</h3>
                        <p className="opacity-70 leading-relaxed text-lg">
                          Using proprietary quantitative nodes to filter noise from actual market-moving catalysts. Our strategy is built on the intersection of geopolitics and computational finance.
                        </p>
                        <button className="px-8 py-4 border border-white/20 text-[10px] font-sans font-bold tracking-widest uppercase hover:bg-white hover:text-brand-text transition-all">
                          Download Q2 Report
                        </button>
                      </div>
                      <div className="h-64 border border-white/10 flex items-center justify-center italic opacity-30 text-sm p-12 text-center">
                        [ Interactive Analysis Visualization Restricted to Premium Subscribers ]
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TEAM VIEW */}
            {view === 'team' && (
              <motion.div key="team" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Breadcrumbs />
                <div className="space-y-24">
                  <header>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">THE TEAM</h2>
                    <p className="text-2xl text-brand-text/60 italic max-w-2xl">
                      A collective of specialized researchers and correspondents operating at the intersection of capital and technology.
                    </p>
                  </header>
                  <div className="grid md:grid-cols-3 gap-12">
                    {TEAM.map((member) => (
                      <div key={member.name} className="space-y-6">
                        <div className="aspect-[3/4] bg-[#D9D7D2] grayscale contrast-125 overflow-hidden">
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover mix-blend-multiply opacity-80" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black">{member.name}</h4>
                          <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-accent mb-4">{member.role}</p>
                          <p className="text-sm font-serif opacity-70 leading-relaxed">{member.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* LEGAL VIEW */}
            {view === 'legal' && (
              <motion.div key="legal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Breadcrumbs />
                <div className="max-w-2xl mx-auto space-y-16">
                  <header className="border-b border-brand-text pb-8">
                    <h2 className="text-4xl font-black tracking-tighter">LEGAL NOTICES</h2>
                    <p className="font-sans text-[10px] font-bold uppercase tracking-widest opacity-40 mt-4">Last Updated: May 2024</p>
                  </header>
                  <section className="space-y-6">
                    <h4 className="text-xl font-bold">Privacy Policy</h4>
                    <p className="opacity-70 leading-relaxed">
                      At The Ledger, we take intellectual property and data preservation seriously. Our privacy protocols are designed for maximum discretion.
                    </p>
                    <ul className="list-disc pl-6 opacity-70 space-y-2">
                        <li>We do not track session data through third-party cookies.</li>
                        <li>All correspondence is encrypted under Swiss jurisdiction.</li>
                        <li>Digital signals are processed on private nodes.</li>
                    </ul>
                  </section>
                  <section className="space-y-6">
                    <h4 className="text-xl font-bold">Terms of Service</h4>
                    <p className="opacity-70 leading-relaxed">
                      Redistribution of The Ledger's proprietary analysis is strictly prohibited without prior written authorization from Ledger Media Group. Analysis provided is for informational strategy only and does not constitute formal financial advice.
                    </p>
                  </section>
                </div>
              </motion.div>
            )}

            {/* CONTACT VIEW */}
            {view === 'contact' && (
              <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Breadcrumbs />
                <div className="grid md:grid-cols-2 gap-24">
                  <div className="space-y-12">
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter">CONTACT</h2>
                    <div className="space-y-8">
                      <div className="flex gap-6 items-start">
                        <MapPin size={24} className="mt-1 opacity-40" />
                        <div>
                          <h5 className="font-sans text-[10px] font-bold tracking-widest uppercase mb-2">Main Office</h5>
                          <p className="text-xl font-serif">Bahnhofstrasse 1, 8001 Zürich, Switzerland</p>
                        </div>
                      </div>
                      <div className="flex gap-6 items-start">
                        <Phone size={24} className="mt-1 opacity-40" />
                        <div>
                          <h5 className="font-sans text-[10px] font-bold tracking-widest uppercase mb-2">Inquiries</h5>
                          <p className="text-xl font-serif">+41 44 211 11 11</p>
                        </div>
                      </div>
                      <div className="flex gap-6 items-start">
                        <Mail size={24} className="mt-1 opacity-40" />
                        <div>
                          <h5 className="font-sans text-[10px] font-bold tracking-widest uppercase mb-2">Email</h5>
                          <p className="text-xl font-serif">desk@theledger.journal</p>
                        </div>
                      </div>
                    </div>
                    <div className="h-64 bg-[#D9D7D2] grayscale contrast-125 border border-brand-text/10">
                       <iframe 
                        title="location"
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        scrolling="no" 
                        src="https://maps.google.com/maps?q=Zurich%20Bahnhofstrasse&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      ></iframe>
                    </div>
                  </div>

                  <div className="bg-white p-12 shadow-2xl border border-brand-text/5">
                    <h4 className="text-2xl font-black tracking-tight mb-8">Send a Dispatch</h4>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                      <div className="space-y-2">
                        <label className="text-[10px] font-sans font-bold uppercase tracking-widest opacity-40">Nom de Plume</label>
                        <input type="text" className="w-full border-b border-brand-text/10 py-3 outline-none focus:border-brand-text transition-colors font-serif" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-sans font-bold uppercase tracking-widest opacity-40">Direct Address</label>
                        <input type="email" className="w-full border-b border-brand-text/10 py-3 outline-none focus:border-brand-text transition-colors font-serif" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-sans font-bold uppercase tracking-widest opacity-40">Message</label>
                        <textarea rows={4} className="w-full border-b border-brand-text/10 py-3 outline-none focus:border-brand-text transition-colors font-serif resize-none" />
                      </div>
                      <button className="w-full bg-brand-text text-brand-bg py-5 font-sans font-bold tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-3">
                        Transmit Information <Send size={16} />
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}

            {/* DETAIL VIEW handled in detail view component pattern (simulated) */}
            {view === 'article-detail' && selectedArticle && (
              <motion.div key="article" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Breadcrumbs />
                <header className="space-y-8 mb-16 text-center border-b border-brand-text pb-16">
                  <span className="text-[10px] font-sans font-bold tracking-[0.6em] uppercase text-brand-accent">
                    {selectedArticle.category}
                  </span>
                  <h2 className="text-6xl md:text-9xl leading-[0.85] font-black tracking-tighter">
                    {selectedArticle.title}
                  </h2>
                  <div className="flex flex-col items-center gap-2 pt-8 max-w-xs mx-auto font-sans text-[10px] font-bold tracking-widest uppercase">
                    <span className="opacity-100">{selectedArticle.author}</span>
                    <span className="opacity-40">{selectedArticle.date} • {selectedArticle.readingTime}</span>
                  </div>
                </header>

                <div className="aspect-[21/9] bg-[#D9D7D2] mb-16 overflow-hidden grayscale contrast-125">
                  <img src={selectedArticle.image} alt="" className="w-full h-full object-cover mix-blend-multiply opacity-80" referrerPolicy="no-referrer" />
                </div>

                <div className="max-w-2xl mx-auto space-y-10 text-brand-text/80 leading-relaxed font-serif text-xl">
                  <p className="text-3xl italic text-brand-text/60 font-normal leading-tight first-letter:text-9xl first-letter:font-black first-letter:text-brand-text first-letter:mr-4 first-letter:float-left first-letter:leading-[0.7] first-letter:mt-2">
                    {selectedArticle.excerpt}
                  </p>
                  <p>
                    For decades, the standard playbook for capital allocation relied on predictable inflation-target frameworks and the assumption of relatively unfettered global trade. However, as we witness the fragmentation of supply chains and the rise of sovereign-wealth-backed industrial policies, the old rules are increasingly obsolete.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>


          {/* Newsletter Section */}
          <section className="bg-brand-text text-brand-bg p-12 md:p-24 relative overflow-hidden mt-32">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none text-9xl font-black italic flex items-center justify-center -rotate-12 translate-x-12">
              SIGNAL
            </div>
            
            <div className="max-w-2xl space-y-10 relative z-10">
              <span className="text-[10px] font-sans font-bold tracking-[0.5em] uppercase opacity-40">The Weekly Dossier</span>
              <h3 className="text-6xl md:text-8xl font-black leading-[0.8] tracking-tighter">
                Stay Ahead of<br /><span className="italic font-normal">The Curve.</span>
              </h3>
              <p className="text-brand-bg/60 text-xl leading-snug font-serif">
                Join 50,000+ financial professionals receiving high-signal analysis on global markets and venture trends.
              </p>
              <form className="flex flex-col sm:flex-row gap-6 underline-offset-8" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-transparent border-b border-brand-bg/20 py-4 px-2 flex-1 focus:border-brand-bg outline-none transition-colors text-xl font-serif italic"
                />
                <button className="bg-brand-bg text-brand-text px-12 py-4 font-sans font-bold tracking-[0.2em] uppercase hover:bg-brand-bg/90 transition-colors text-xs whitespace-nowrap">
                  Join Dossier
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>

      {/* Back to Top */}
      <button 
        onClick={scrollToTop}
        className={`back-to-top ${scrolled ? 'visible' : ''}`}
      >
        <ArrowUp size={20} />
      </button>

      {/* Footer */}
      <footer className="pt-24 pb-12 bg-brand-bg border-t border-brand-text/10 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-2 space-y-8">
              <h2 className="text-5xl font-black tracking-tighter cursor-pointer" onClick={() => navigateTo('home')}>THE LEDGER</h2>
              <p className="text-brand-text/50 font-serif text-lg leading-relaxed max-w-sm">
                A premier financial journal providing deep-sector analysis and strategic foresight for the modern institution.
              </p>
            </div>
            <div className="space-y-8">
              <h5 className="text-[10px] font-sans font-bold tracking-widest uppercase opacity-40">Sitemap</h5>
              <ul className="space-y-4 font-sans text-[10px] font-bold uppercase tracking-widest">
                <li><button onClick={() => navigateTo('home')} className="hover:opacity-40 transition-opacity">Global Front</button></li>
                <li><button onClick={() => navigateTo('archive')} className="hover:opacity-40 transition-opacity">Archives</button></li>
                <li><button onClick={() => navigateTo('about')} className="hover:opacity-40 transition-opacity">Thesis</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:opacity-40 transition-opacity">Communication</button></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h5 className="text-[10px] font-sans font-bold tracking-widest uppercase opacity-40">Intelligence</h5>
              <div className="space-y-4 font-sans text-xs">
                <div className="flex justify-between border-b border-brand-text/10 pb-1">
                  <span>S&P 500</span>
                  <span className="text-green-600">+1.24%</span>
                </div>
                <div className="flex justify-between border-b border-brand-text/10 pb-1">
                  <span>BTC/USD</span>
                  <span className="text-red-600">-0.82%</span>
                </div>
                <div className="flex justify-between border-b border-brand-text/10 pb-1">
                  <span>Gold</span>
                  <span className="text-green-600">+0.45%</span>
                </div>
              </div>
            </div>
          </div>
          
          <footer className="pt-8 border-t border-brand-text flex justify-between font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
            <div className="flex gap-8">
              <span className="hover:text-brand-accent cursor-pointer transition-colors">Currencies</span>
              <span className="hover:text-brand-accent cursor-pointer transition-colors">Equities</span>
              <span className="hover:text-brand-accent cursor-pointer transition-colors">Commodities</span>
            </div>
            <div className="opacity-40 hidden md:block">
              &copy; 2024 Ledger Media Group • Zurich • New York • Tokyo
            </div>
          </footer>
        </div>
      </footer>
    </div>
  );
}
