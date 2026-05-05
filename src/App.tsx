/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Search, Instagram, Twitter, Linkedin, ChevronRight } from 'lucide-react';

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
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allTags = Array.from(new Set(ARTICLES.flatMap(article => article.tags))).sort();

  const filteredArticles = selectedTag 
    ? ARTICLES.filter(article => article.tags.includes(selectedTag))
    : ARTICLES;

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-serif">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 border-b ${
          scrolled || selectedArticle ? 'bg-brand-bg/95 border-brand-text' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-end pb-4 pt-6">
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => {
                if (selectedTag) setSelectedTag(null);
                if (selectedArticle) closeArticle();
                setIsMenuOpen(true);
              }}
              className="flex items-center gap-2 hover:italic transition-all group"
            >
              <Menu size={18} />
              <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase">Bulletin</span>
            </button>
            <div className={`hidden md:block transition-opacity duration-500 ${scrolled || selectedArticle ? 'opacity-0' : 'opacity-40'}`}>
              <p className="font-sans text-[10px] uppercase tracking-widest">Issue No. 42</p>
            </div>
          </div>

          <a href="/" onClick={(e) => { e.preventDefault(); closeArticle(); setSelectedTag(null); }} className="flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-none hover:tracking-normal transition-all duration-700">
              THE LEDGER
            </h1>
            <span className="text-[9px] font-sans font-bold tracking-[0.4em] uppercase opacity-60 mt-2">Quarterly Insights & Financial Strategy</span>
          </a>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-6">
              <button className="hover:opacity-40 transition-opacity">
                <Search size={18} />
              </button>
              <button className="bg-brand-text text-brand-bg px-5 py-2 text-[10px] font-sans font-bold tracking-widest uppercase hover:opacity-90 transition-opacity hidden md:block">
                Subscribe
              </button>
            </div>
            <div className={`hidden md:block transition-opacity duration-500 ${scrolled || selectedArticle ? 'opacity-0' : 'opacity-40'}`}>
              <p className="font-sans text-[10px] uppercase tracking-widest font-bold">Spring 2024</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Overlay Component */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-bg z-[100] p-6 flex flex-col"
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
                {['Analysis', 'Markets', 'Strategy', 'Archive', 'About', 'Contact'].map((item, idx) => (
                  <motion.li 
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <a 
                      href="#" 
                      className="text-6xl md:text-9xl font-serif font-black tracking-tighter hover:italic hover:pl-6 transition-all duration-500 uppercase leading-[0.8]"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setSelectedTag(null);
                        closeArticle();
                      }}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-end border-t border-brand-text/10 pt-8">
              <div className="space-y-2">
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase opacity-40 block">Digital Presence</span>
                <div className="flex gap-6">
                  <Twitter size={18} className="hover:opacity-40 cursor-pointer" />
                  <Instagram size={18} className="hover:opacity-40 cursor-pointer" />
                  <Linkedin size={18} className="hover:opacity-40 cursor-pointer" />
                </div>
              </div>
              <p className="text-[9px] font-sans font-bold tracking-widest uppercase opacity-30 text-right leading-relaxed">
                Ledger Media Group.<br />Zurich • New York • Tokyo
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-48 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {!selectedArticle ? (
              <motion.div 
                key="feed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Tag Cloud Section */}
                <section className="mb-12 border-y border-brand-text/10 py-6">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-[10px] font-sans font-bold tracking-widest uppercase opacity-40 mr-4">Filter By Tag:</span>
                    <button 
                      onClick={() => setSelectedTag(null)}
                      className={`text-[10px] font-sans font-bold tracking-widest uppercase px-3 py-1 border transition-all ${
                        !selectedTag ? 'bg-brand-text text-brand-bg border-brand-text' : 'border-transparent hover:border-brand-text/20'
                      }`}
                    >
                      All Articles
                    </button>
                    {allTags.map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`text-[10px] font-sans font-bold tracking-widest uppercase px-3 py-1 border transition-all ${
                          selectedTag === tag ? 'bg-brand-text text-brand-bg border-brand-text' : 'border-transparent hover:border-brand-text/20'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Featured Hero Article - Hide if filtering */}
                {!selectedTag && (
                  <section className="mb-24">
                    <div 
                      className="grid md:grid-cols-12 gap-10 items-center cursor-pointer group border-b border-brand-text pb-16"
                      onClick={() => openArticle(ARTICLES[0])}
                    >
                      <div className="md:col-span-8">
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="article-image-container relative bg-[#D9D7D2]"
                        >
                          <img 
                            src={ARTICLES[0].image}
                            alt={ARTICLES[0].title}
                            className="w-full h-full object-cover grayscale mix-blend-multiply transition-all duration-1000 group-hover:grayscale-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-0 left-0 bg-brand-text text-brand-bg px-3 py-1 text-[10px] font-sans font-bold tracking-widest uppercase">
                            Lead Analysis
                          </div>
                        </motion.div>
                      </div>
                      <div className="md:col-span-4 space-y-6">
                        <div className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
                          {ARTICLES[0].category}
                        </div>
                        <h2 className="text-5xl lg:text-7xl leading-[0.9] font-black tracking-tighter group-hover:italic transition-all duration-500">
                          {ARTICLES[0].title}
                        </h2>
                        <div className="flex gap-2 flex-wrap mb-4">
                          {ARTICLES[0].tags.map(tag => (
                            <span key={tag} className="text-[9px] font-sans font-bold uppercase tracking-widest text-brand-accent/60">#{tag}</span>
                          ))}
                        </div>
                        <p className="text-xl text-brand-text/60 italic leading-tight">
                          {ARTICLES[0].excerpt}
                        </p>
                        <div className="pt-6 flex flex-col gap-4 border-t border-brand-text/10">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-text shadow-xl"></div>
                            <div className="font-sans text-[10px]">
                              <p className="font-bold uppercase tracking-widest">{ARTICLES[0].author}</p>
                              <p className="opacity-40 uppercase tracking-widest pb-1">Senior Editor</p>
                            </div>
                          </div>
                          <button className="flex items-center gap-2 text-[10px] font-sans font-bold tracking-widest uppercase group-hover:pl-2 transition-all">
                            Read The Ledger
                            <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Sub Grid Section */}
                <section className="mb-24">
                  <div className="flex justify-between items-end mb-12 divider-heavy pb-4">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">
                      {selectedTag ? `Tagged: ${selectedTag}` : 'Current Briefings'}
                    </h3>
                    <div className="font-sans text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">Series 04.2</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                    {(selectedTag ? filteredArticles : ARTICLES.slice(1)).map((article, idx) => (
                      <motion.article 
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="article-card group cursor-pointer"
                        id={`article-${article.id}`}
                        onClick={() => openArticle(article)}
                      >
                        <div className="article-image-container mb-6 bg-[#D9D7D2] relative">
                          <img 
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-brand-accent">{article.category}</span>
                            <span className="h-px bg-brand-text/10 flex-1"></span>
                          </div>
                          <h4 className="text-2xl leading-[1.05] font-black group-hover:underline decoration-2 underline-offset-4">
                            {article.title}
                          </h4>
                          <div className="flex gap-2 flex-wrap">
                            {article.tags.map(tag => (
                              <span key={tag} className={`text-[9px] font-sans font-bold uppercase tracking-widest ${selectedTag === tag ? 'text-brand-accent' : 'text-brand-text/30'}`}>#{tag}</span>
                            ))}
                          </div>
                          <p className="text-sm text-brand-text/50 font-sans leading-relaxed line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="pt-4 flex items-center justify-between border-t border-brand-text/10">
                            <span className="font-sans text-[10px] font-bold tracking-widest uppercase opacity-40">{article.date}</span>
                            <span className="font-sans text-[10px] font-bold tracking-widest uppercase opacity-40 italic">{article.readingTime}</span>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </section>
              </motion.div>
            ) : (
              <motion.div 
                key="article"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl mx-auto"
              >
                <button 
                  onClick={closeArticle}
                  className="mb-12 flex items-center gap-2 text-[10px] font-sans font-bold tracking-[0.4em] uppercase opacity-40 hover:opacity-100 transition-opacity"
                >
                  <ChevronRight size={14} className="rotate-180" />
                  Index
                </button>
                
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
                  <img 
                    src={selectedArticle.image} 
                    alt="" 
                    className="w-full h-full object-cover mix-blend-multiply opacity-80"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="max-w-2xl mx-auto space-y-10 text-brand-text/80 leading-relaxed font-serif text-xl">
                  <p className="text-3xl italic text-brand-text/60 font-normal leading-tight first-letter:text-9xl first-letter:font-black first-letter:text-brand-text first-letter:mr-4 first-letter:float-left first-letter:leading-[0.7] first-letter:mt-2">
                    {selectedArticle.excerpt} This marks a significant turning point in the contemporary economic landscape, where traditional models often fail to capture the nuances of digital-first liquidity and shifting political-economic boundaries.
                  </p>
                  <p>
                    For decades, the standard playbook for capital allocation relied on predictable inflation-target frameworks and the assumption of relatively unfettered global trade. However, as we witness the fragmentation of supply chains and the rise of sovereign-wealth-backed industrial policies, the old rules are increasingly obsolete.
                  </p>
                  <div className="py-16 border-y-2 border-brand-text my-20">
                    <blockquote className="text-4xl italic text-center font-normal px-8 leading-none tracking-tight">
                      "True value is no longer found in abundance, but in the verified scarcity of trust within decentralized networks."
                    </blockquote>
                  </div>
                  <p>
                    As we look toward the remainder of the decade, the focus must shift toward resilient asset classes that can withstand shocks while providing consistent exposure to the underlying engines of global growth. This requires a fundamental decoupling from purely quantitative benchmarks in favor of qualitative, deep-sector expertise.
                  </p>
                </div>

                <div className="mt-32 pt-16 border-t border-brand-text/10 flex flex-col md:flex-row justify-between items-center gap-12 font-sans text-[10px] font-bold tracking-widest uppercase">
                   <div className="flex flex-col gap-2 group cursor-pointer max-w-[200px]">
                      <span className="opacity-40">Previous Portfolio</span>
                      <span className="hover:italic transition-all group-hover:pl-2">The Architecture of Venture Capital</span>
                   </div>
                   <button onClick={closeArticle} className="p-4 rounded-full border border-brand-text/10 hover:bg-brand-text hover:text-brand-bg transition-all">
                      <ArrowUpRight size={24} className="rotate-225" />
                   </button>
                   <div className="flex flex-col gap-2 group cursor-pointer text-right max-w-[200px]">
                      <span className="opacity-40">Coming Next</span>
                      <span className="hover:italic transition-all group-hover:pr-2">Capital Efficiency in 2025</span>
                   </div>
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

      {/* Footer */}
      <footer className="pt-24 pb-12 bg-brand-bg border-t border-brand-text/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-2 space-y-8">
              <h2 className="text-5xl font-black tracking-tighter">THE LEDGER</h2>
              <p className="text-brand-text/50 font-serif text-lg leading-relaxed max-w-sm">
                A premier financial journal providing deep-sector analysis and strategic foresight for the modern institution.
              </p>
            </div>
            <div className="space-y-8">
              <h5 className="text-[10px] font-sans font-bold tracking-widest uppercase opacity-40">Portfolio</h5>
              <ul className="space-y-4 font-sans text-[10px] font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:opacity-40 transition-opacity">Global Markets</a></li>
                <li><a href="#" className="hover:opacity-40 transition-opacity">Venture Trends</a></li>
                <li><a href="#" className="hover:opacity-40 transition-opacity">Private Wealth</a></li>
                <li><a href="#" className="hover:opacity-40 transition-opacity">Macro Reports</a></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h5 className="text-[10px] font-sans font-bold tracking-widest uppercase opacity-40">Organization</h5>
              <ul className="space-y-4 font-sans text-[10px] font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:opacity-40 transition-opacity">Our Thesis</a></li>
                <li><a href="#" className="hover:opacity-40 transition-opacity">Archives</a></li>
                <li><a href="#" className="hover:opacity-40 transition-opacity">Legal Notice</a></li>
                <li><a href="#" className="hover:opacity-40 transition-opacity">Communications</a></li>
              </ul>
            </div>
          </div>
          
          <footer className="pt-8 border-t border-brand-text flex justify-between font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
            <div className="flex gap-8">
              <span className="hover:text-brand-accent cursor-pointer transition-colors">Currencies</span>
              <span className="hover:text-brand-accent cursor-pointer transition-colors">Equities</span>
              <span className="hover:text-brand-accent cursor-pointer transition-colors">Fixed Income</span>
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
