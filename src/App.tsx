import { useEffect, useRef, useState } from 'react';

// TradingView Widget Component
const TradingViewWidget = ({ symbol, label }: { symbol: string; label: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      colorTheme: 'dark',
      isTransparent: true,
      locale: 'en',
      width: '100%'
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="relative">
      <div className="absolute -top-3 left-4 z-10">
        <span className="px-3 py-1 text-xs font-bold tracking-widest bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full uppercase shadow-lg shadow-blue-500/30">
          {label}
        </span>
      </div>
      <div
        ref={containerRef}
        className="tradingview-widget-container min-h-[80px]"
      />
    </div>
  );
};

// Oil Drop SVG
const OilDrop = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 32" className={className} fill="currentColor">
    <path d="M12 0C12 0 0 14 0 22C0 27.523 5.373 32 12 32C18.627 32 24 27.523 24 22C24 14 12 0 12 0Z" />
  </svg>
);

// Animated Oil Drip Background
const OilDrips = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-drip"
          style={{
            left: `${10 + i * 12}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${4 + Math.random() * 3}s`
          }}
        >
          <OilDrop className="w-4 h-6 text-blue-500/10" />
        </div>
      ))}
    </div>
  );
};

// Header Component
const Header = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = '0x21FD44bE608F1D18689CDcC8861AE74571Ae8888';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="relative z-20 border-b border-blue-500/20 bg-gradient-to-b from-blue-950/50 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <OilDrop className="w-8 h-10 md:w-10 md:h-12 text-blue-500 drop-shadow-[0_0_10px_rgba(0,82,255,0.5)]" />
              <div className="absolute inset-0 animate-pulse">
                <OilDrop className="w-8 h-10 md:w-10 md:h-12 text-blue-400/50 blur-sm" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                BASE<span className="text-blue-500">CRUDE</span>
              </h1>
              <p className="text-[10px] md:text-xs text-blue-400/70 tracking-widest uppercase">Commodity Trading on Base</p>
            </div>
          </div>

          {/* Contract Info */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div
              className="flex items-center gap-2 px-3 py-2 bg-blue-950/50 border border-blue-500/30 rounded-lg cursor-pointer hover:border-blue-500/60 transition-colors group"
              onClick={copyToClipboard}
            >
              <span className="text-xs md:text-sm text-blue-400 font-medium">BASE.MEME $OIL CA:</span>
              <code className="text-[10px] md:text-xs text-blue-300 font-mono truncate max-w-[120px] md:max-w-none">
                {contractAddress}
              </code>
              <span className="text-[10px] text-blue-500 group-hover:text-blue-400 transition-colors">
                {copied ? '✓' : 'COPY'}
              </span>
            </div>

            <a
              href="https://base.meme/coin/base:0x21FD44bE608F1D18689CDcC8861AE74571Ae8888?referrer=0xFCE86e6A615B40A620b1a666ff4B866Cd273c476"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm md:text-base rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
            >
              <OilDrop className="w-4 h-5" />
              BUY $OIL
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

// X/Twitter Feed Component with iframe
const XFeed = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(k => k + 1);
      setLastRefresh(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">$OIL Live Feed</h3>
            <p className="text-xs text-blue-400/70">Auto-refresh every 10s</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-blue-400/70">
            {lastRefresh.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="flex-1 bg-blue-950/30 rounded-xl border border-blue-500/20 overflow-hidden min-h-[400px]">
        <iframe
          key={refreshKey}
          src="https://syndication.twitter.com/srv/timeline-profile/screen-name/Basecrude?dnt=true&embedId=twitter-widget-0&frame=false&hideBorder=true&hideFooter=true&hideHeader=true&hideScrollBar=false&lang=en&theme=dark&transparent=true"
          className="w-full h-full min-h-[400px] border-0"
          title="X Feed"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <a
          href="https://x.com/search?q=%24OIL&src=typed_query&f=live"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>View Live $OIL Feed</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <a
          href="https://x.com/Basecrude"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-sm font-medium text-white">@Basecrude</span>
        </a>
      </div>
    </div>
  );
};

// Price Card Component
const PriceCard = ({ symbol, label, isPrimary = false }: { symbol: string; label: string; isPrimary?: boolean }) => {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${isPrimary ? 'border-2 border-blue-500/50' : 'border border-blue-500/20'}`}>
      {/* Background gradient */}
      <div className={`absolute inset-0 ${isPrimary ? 'bg-gradient-to-br from-blue-900/50 via-blue-950/50 to-black/50' : 'bg-gradient-to-br from-yellow-900/20 via-blue-950/50 to-black/50'}`} />

      {/* Glow effect for primary */}
      {isPrimary && (
        <div className="absolute -inset-1 bg-blue-500/20 blur-xl" />
      )}

      <div className="relative p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          {isPrimary ? (
            <div className="p-2 md:p-3 bg-blue-500/20 rounded-xl">
              <OilDrop className="w-6 h-8 md:w-8 md:h-10 text-blue-400" />
            </div>
          ) : (
            <div className="p-2 md:p-3 bg-yellow-500/20 rounded-xl">
              <svg viewBox="0 0 24 24" className="w-6 h-8 md:w-8 md:h-10 text-yellow-400" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
          )}
          <div>
            <h2 className={`text-xl md:text-2xl font-black ${isPrimary ? 'text-blue-400' : 'text-yellow-400'}`}>
              ${label}
            </h2>
            <p className="text-xs text-blue-400/50 uppercase tracking-wider">Real-time Price</p>
          </div>
          {isPrimary && (
            <div className="ml-auto px-3 py-1 bg-blue-500/20 rounded-full">
              <span className="text-xs font-bold text-blue-400 animate-pulse">● LIVE</span>
            </div>
          )}
        </div>

        <TradingViewWidget symbol={symbol} label={label} />
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-[#060a12] text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0052FF 1px, transparent 1px),
              linear-gradient(to bottom, #0052FF 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <OilDrips />

      <Header />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4 md:mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs md:text-sm text-blue-400 font-medium">Powered by BASE Chain</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
              Commodity Trading
            </span>
            <br />
            <span className="text-blue-500">Reimagined</span>
          </h2>
          <p className="text-sm md:text-lg text-blue-300/60 max-w-2xl mx-auto px-4">
            Track real-time prices of $OIL and $GOLD on the blockchain.
            The future of commodities is decentralized.
          </p>
        </div>

        {/* Price Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          <PriceCard symbol="XTCOM:OILUSDT.P" label="OIL" isPrimary />
          <PriceCard symbol="PEPPERSTONE:XAUUSD" label="GOLD" />
        </div>

        {/* News Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-900/20 to-blue-950/20 rounded-2xl border border-blue-500/20 p-4 md:p-6">
            <XFeed />
          </div>

          {/* Side Panel */}
          <div className="space-y-4 md:space-y-6">
            {/* Quick Links */}
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-950/20 rounded-2xl border border-blue-500/20 p-4 md:p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a
                  href="https://base.meme/coin/base:0x21FD44bE608F1D18689CDcC8861AE74571Ae8888?referrer=0xFCE86e6A615B40A620b1a666ff4B866Cd273c476"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl transition-colors group"
                >
                  <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <OilDrop className="w-5 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Buy $OIL</p>
                    <p className="text-xs text-blue-400/70">on BASE.MEME</p>
                  </div>
                  <svg className="w-5 h-5 text-blue-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                <a
                  href="https://x.com/Basecrude"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group"
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white">@Basecrude</p>
                    <p className="text-xs text-blue-400/70">Follow on X</p>
                  </div>
                  <svg className="w-5 h-5 text-blue-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* About */}
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-950/20 rounded-2xl border border-blue-500/20 p-4 md:p-6">
              <h3 className="text-lg font-bold text-white mb-3">About BASECRUDE</h3>
              <p className="text-sm text-blue-300/70 leading-relaxed">
                BASECRUDE brings commodity trading to the blockchain.
                Track $OIL prices in real-time and trade with confidence
                on the BASE chain ecosystem.
              </p>
              <div className="mt-4 pt-4 border-t border-blue-500/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-400/50">Network</span>
                  <span className="text-blue-400 font-medium">BASE Chain</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="text-blue-400/50">Token</span>
                  <span className="text-blue-400 font-medium">$OIL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 md:mt-20 border-t border-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <OilDrop className="w-5 h-6 text-blue-500/50" />
              <span className="text-sm text-blue-400/50">BASECRUDE © 2024</span>
            </div>
            <p className="text-xs text-blue-400/30">
              Requested by{' '}
              <a href="https://x.com/Basecrude" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400/50 transition-colors">
                @BASECRUDE
              </a>
              {' · Built by '}
              <a href="https://x.com/clonkbot" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400/50 transition-colors">
                @clonkbot
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>{`
        @keyframes drip {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        .animate-drip {
          animation: drip linear infinite;
        }

        .tradingview-widget-container {
          width: 100% !important;
        }

        .tradingview-widget-container iframe {
          width: 100% !important;
        }
      `}</style>
    </div>
  );
}

export default App;
