import React, { useState } from 'react';
import { X, Minus, Square } from 'lucide-react';

const RetroPortfolio = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [windowPositions, setWindowPositions] = useState({});
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [time, setTime] = useState(new Date());
  const [showWelcome, setShowWelcome] = useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const windows = {
    portfolio: {
      title: 'Portfolio.exe',
      icon: '💾',
      images: Array(10).fill(null).map((_, i) => ({
        thumb: `https://placehold.co/200x150/E8C4D8/FFFFFF?text=Work+${i+1}`,
        full: `https://placehold.co/800x600/E8C4D8/FFFFFF?text=Work+${i+1}`
      }))
    },
    vjing: {
      title: 'VJing.exe',
      icon: '✨',
      videos: [
        'dQw4w9WgXcQ', 'jNQXAC9IVRw', 'L_jWHffIx5E',
        'kJQP7kiw5Fk', '9bZkp7q19f0', 'fJ9rUzIMcZQ',
        'dQw4w9WgXcQ', 'jNQXAC9IVRw', 'L_jWHffIx5E'
      ]
    },
    video: {
      title: 'Creation_Video.exe',
      icon: '🎬',
      videos: [
        'dQw4w9WgXcQ', 'jNQXAC9IVRw', 'L_jWHffIx5E',
        'kJQP7kiw5Fk', '9bZkp7q19f0', 'fJ9rUzIMcZQ',
        'dQw4w9WgXcQ', 'jNQXAC9IVRw', 'L_jWHffIx5E'
      ]
    },
    ia: {
      title: 'IA_Gallery.exe',
      icon: '🌸',
      images: Array(10).fill(null).map((_, i) => ({
        thumb: `https://placehold.co/200x150/B8C5D6/FFFFFF?text=AI+${i+1}`,
        full: `https://placehold.co/800x600/B8C5D6/FFFFFF?text=AI+${i+1}`
      })),
      tumblrLink: 'https://tumblr.com/your-blog'
    }
  };

  const openWindow = (windowId) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId]);
      const offset = openWindows.length * 30;
      setWindowPositions({
        ...windowPositions,
        [windowId]: { x: 100 + offset, y: 100 + offset }
      });
    }
  };

  const closeWindow = (windowId) => {
    setOpenWindows(openWindows.filter(w => w !== windowId));
    setSelectedImage(null);
  };

  const handleMouseDown = (e, windowId) => {
    if (e.target.closest('.window-content') || e.target.closest('.window-button')) return;
    setDragging(windowId);
    const pos = windowPositions[windowId] || { x: 100, y: 100 };
    setDragOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setWindowPositions({
        ...windowPositions,
        [dragging]: {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        }
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Message envoyé ! (simulation)');
    setFormData({ name: '', email: '', message: '' });
  };

  React.useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, dragOffset]);

  const Window = ({ id, title, icon, children }) => {
    const pos = windowPositions[id] || { x: 100, y: 100 };
    
    return (
      <div
        className="absolute shadow-2xl rounded-lg overflow-hidden"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(26, 26, 36, 0.95) 50%, rgba(30, 30, 30, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          width: '700px',
          maxWidth: '90vw',
          maxHeight: '80vh',
          zIndex: openWindows.indexOf(id) + 10,
          boxShadow: dragging === id 
            ? '0 0 40px rgba(100, 150, 230, 0.6), 0 0 80px rgba(100, 150, 230, 0.3)' 
            : '0 8px 32px rgba(0, 0, 0, 0.4)',
          transition: 'box-shadow 0.3s ease'
        }}
      >
          <div className="px-3 py-2 flex items-center justify-between cursor-move select-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
          onMouseDown={(e) => handleMouseDown(e, id)}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{icon}</span>
            <span className="text-gray-300 font-medium text-sm">{title}</span>
          </div>
          <div className="flex gap-2">
            <button className="window-button w-8 h-8 bg-[#2a2a2a] flex items-center justify-center text-gray-400 hover:bg-[#3a3a3a] rounded transition-all"
              style={{
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.boxShadow = '0 0 15px rgba(139, 200, 255, 0.5)'}
              onMouseLeave={(e) => e.target.style.boxShadow = 'none'}>
              <Minus size={14} />
            </button>
            <button className="window-button w-8 h-8 bg-[#2a2a2a] flex items-center justify-center text-gray-400 hover:bg-[#3a3a3a] rounded transition-all"
              style={{
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.boxShadow = '0 0 15px rgba(139, 200, 255, 0.5)'}
              onMouseLeave={(e) => e.target.style.boxShadow = 'none'}>
              <Square size={12} />
            </button>
            <button 
              onClick={() => closeWindow(id)}
              className="window-button w-8 h-8 bg-[#2a2a2a] flex items-center justify-center text-gray-400 hover:bg-[#E8C4D8] hover:text-white rounded transition-all"
              style={{
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.boxShadow = '0 0 20px rgba(232, 196, 216, 0.6)'}
              onMouseLeave={(e) => e.target.style.boxShadow = 'none'}>
              <X size={14} />
            </button>
          </div>
        </div>
        <div className="window-content p-6 overflow-y-auto" 
          style={{ 
            height: '500px',
            background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(26, 26, 36, 0.95) 50%, rgba(30, 30, 30, 0.95) 100%)',
            backdropFilter: 'blur(10px)'
          }}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{
        fontFamily: "'Pixelify Sans', 'MS Sans Serif', cursive, sans-serif",
        background: '#121212'
      }}>

      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url(https://i.postimg.cc/QhGdzCk8/anxious-rex-pastel-pixel-art-sky-anime-simple-background-ar-15c32ed0-7170-4292-adeb-1561e1fce4b9-1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16 pb-20">
        
        <div className="max-w-2xl w-full space-y-6">
          {/* About Window */}
          <div className="shadow-2xl max-w-[500px] mx-auto rounded-lg overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(26, 26, 36, 0.95) 50%, rgba(30, 30, 30, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
            
            <div className="px-3 py-2"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
              <span className="text-gray-300 font-medium text-sm">About.exe</span>
            </div>

            <div className="p-8">
              <h1 className="text-center text-3xl font-bold mb-2 bg-gradient-to-r from-[#E8C4D8] to-[#B8C5D6] bg-clip-text text-transparent">
                Elisa Bernard
              </h1>

              <div className="text-sm text-gray-400 mb-6 text-center space-y-1">
                <p>Graphiste / Motion Designer 2D/3D</p>
                <p>Illustratrice / VJ / AI Artist</p>
              </div>

              <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                <p>
                  Besoin d'un clip vidéo percutant, d'un VJing live immersif ou d'un show audiovisuel sur mesure ? 
                  Je transforme vos visions en expériences visuelles mémorables.
                </p>
                <p>
                  Forte de 7 ans d'expérience en tant que VJ, j'ai performé dans des contextes variés : 
                  de l'intimité des bars underground aux grandes scènes de festivals. Je m'adapte à toutes les 
                  contraintes techniques et artistiques pour sublimer chaque performance. Passionnée par tous 
                  les genres musicaux et les arts scéniques, je conçois des créations visuelles uniques qui 
                  s'harmonisent parfaitement avec votre univers artistique.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Window */}
          <div className="shadow-2xl max-w-[500px] mx-auto rounded-lg overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(26, 26, 36, 0.95) 50%, rgba(30, 30, 30, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
            
            <div className="px-3 py-2"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
              <span className="text-gray-300 font-medium text-sm">Contact.exe</span>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-[#E8C4D8] to-[#B8C5D6] bg-clip-text text-transparent">
                Contact
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Nom</label>
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 text-gray-200 focus:outline-none rounded border"
                    style={{
                      background: 'rgba(42, 42, 42, 0.6)',
                      backdropFilter: 'blur(10px)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.background = 'rgba(42, 42, 42, 0.8)';
                      e.target.style.borderColor = 'rgba(232, 196, 216, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.target.style.background = 'rgba(42, 42, 42, 0.6)';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Email</label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 text-gray-200 focus:outline-none rounded border"
                    style={{
                      background: 'rgba(42, 42, 42, 0.6)',
                      backdropFilter: 'blur(10px)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.background = 'rgba(42, 42, 42, 0.8)';
                      e.target.style.borderColor = 'rgba(232, 196, 216, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.target.style.background = 'rgba(42, 42, 42, 0.6)';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Message</label>
                  <textarea 
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2 text-gray-200 focus:outline-none resize-none rounded border"
                    style={{
                      background: 'rgba(42, 42, 42, 0.6)',
                      backdropFilter: 'blur(10px)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.background = 'rgba(42, 42, 42, 0.8)';
                      e.target.style.borderColor = 'rgba(232, 196, 216, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.target.style.background = 'rgba(42, 42, 42, 0.6)';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  ></textarea>
                </div>
                <button 
                  onClick={handleSubmit}
                  className="px-6 py-2 font-medium text-sm text-white rounded transition-all"
                  style={{
                    background: 'rgba(232, 196, 216, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(232, 196, 216, 1)';
                    e.target.style.boxShadow = '0 0 25px rgba(232, 196, 216, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(232, 196, 216, 0.8)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Windows */}
      {openWindows.map(windowId => {
        const win = windows[windowId];
        return (
          <Window key={windowId} id={windowId} title={win.title} icon={win.icon}>
            {windowId === 'portfolio' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-[#E8C4D8] to-[#B8C5D6] bg-clip-text text-transparent">
                  Portfolio
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {win.images.map((img, i) => (
                    <div 
                      key={i}
                      className="cursor-pointer hover:opacity-70 transition-opacity rounded overflow-hidden"
                      style={{ border: '2px solid #E8C4D8' }}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img src={img.thumb} alt={`Work ${i+1}`} className="w-full" />
                    </div>
                  ))}
                </div>
                {selectedImage && (
                  <div 
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90"
                    onClick={() => setSelectedImage(null)}
                  >
                    <div className="relative">
                      <img src={selectedImage.full} alt="Preview" className="max-w-[90vw] max-h-[90vh] rounded-lg" />
                      <button 
                        className="absolute -top-4 -right-4 bg-[#E8C4D8] text-white w-10 h-10 flex items-center justify-center hover:bg-[#D4B0C4] rounded-full shadow-lg transition-colors"
                        onClick={() => setSelectedImage(null)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {(windowId === 'vjing' || windowId === 'video') && (
              <div>
                <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-[#E8C4D8] to-[#B8C5D6] bg-clip-text text-transparent">
                  {windowId === 'vjing' ? 'VJing' : 'Création Vidéo'}
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {win.videos.map((videoId, i) => (
                    <div key={i} className="rounded overflow-hidden" style={{ border: '2px solid #B8C5D6' }}>
                      <iframe
                        width="100%"
                        height="150"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-500 text-center mt-6">
                  ⬇️ Scroll pour voir plus de vidéos
                </div>
              </div>
            )}
            
            {windowId === 'ia' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-[#E8C4D8] to-[#B8C5D6] bg-clip-text text-transparent">
                  IA Gallery
                </h2>
                <div className="mb-6 text-center">
                  <a 
                    href={win.tumblrLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 font-medium text-white rounded transition-all"
                    style={{
                      background: 'rgba(184, 197, 214, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(184, 197, 214, 1)';
                      e.target.style.boxShadow = '0 0 25px rgba(184, 197, 214, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(184, 197, 214, 0.8)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <span>🔗</span>
                    <span>Voir plus sur Tumblr</span>
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {win.images.map((img, i) => (
                    <div 
                      key={i}
                      className="cursor-pointer hover:opacity-70 transition-opacity rounded overflow-hidden"
                      style={{ border: '2px solid #B8C5D6' }}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img src={img.thumb} alt={`AI ${i+1}`} className="w-full" />
                    </div>
                  ))}
                </div>
                {selectedImage && (
                  <div 
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90"
                    onClick={() => setSelectedImage(null)}
                  >
                    <div className="relative">
                      <img src={selectedImage.full} alt="Preview" className="max-w-[90vw] max-h-[90vh] rounded-lg" />
                      <button 
                        className="absolute -top-4 -right-4 bg-[#B8C5D6] text-white w-10 h-10 flex items-center justify-center hover:bg-[#A4B1C2] rounded-full shadow-lg transition-colors"
                        onClick={() => setSelectedImage(null)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Window>
        );
      })}

      {/* Welcome Window */}
      {showWelcome && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[60] bg-black bg-opacity-50"
          onClick={() => setShowWelcome(false)}
        >
          <div
            className="shadow-2xl rounded-lg overflow-hidden animate-pulse-slow"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.98) 0%, rgba(26, 26, 36, 0.98) 50%, rgba(30, 30, 30, 0.98) 100%)',
              border: '2px solid rgba(232, 196, 216, 0.6)',
              backdropFilter: 'blur(10px)',
              width: '400px',
              maxWidth: '90vw'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-2"
              style={{
                background: 'linear-gradient(180deg, rgba(232, 196, 216, 0.3) 0%, rgba(232, 196, 216, 0.1) 100%)',
                borderBottom: '1px solid rgba(232, 196, 216, 0.3)',
                backdropFilter: 'blur(10px)'
              }}>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-medium text-sm">Bienvenue.exe</span>
                <button
                  onClick={() => setShowWelcome(false)}
                  className="w-6 h-6 bg-[#2a2a2a] flex items-center justify-center text-gray-400 hover:bg-[#E8C4D8] hover:text-white rounded transition-all"
                  onMouseEnter={(e) => e.target.style.boxShadow = '0 0 20px rgba(232, 196, 216, 0.6)'}
                  onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                >
                  <X size={12} />
                </button>
              </div>
            </div>
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="text-6xl mb-4">👽</div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#E8C4D8] to-[#B8C5D6] bg-clip-text text-transparent">
                  Bienvenue !
                </h2>
                <p className="text-gray-300 text-lg mb-2">
                  Clic START
                </p>
                <p className="text-gray-400 text-sm">
                  pour explorer le portfolio
                </p>
              </div>
              <button
                onClick={() => setShowWelcome(false)}
                className="px-6 py-3 font-medium text-white rounded transition-all"
                style={{
                  background: 'rgba(232, 196, 216, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(232, 196, 216, 1)';
                  e.target.style.boxShadow = '0 0 25px rgba(232, 196, 216, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(232, 196, 216, 0.8)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                OK, Compris !
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-2 py-2 z-50"
        style={{
          background: '#1e1e1e',
          borderTop: '1px solid #3a3a3a'
        }}>
        
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="px-4 py-2 font-medium text-gray-300 hover:bg-[#2a2a2a] rounded transition-all start-button-glow"
          style={{
            transition: 'all 0.3s ease',
            animation: 'pinkGlow 2s ease-in-out infinite',
            boxShadow: '0 0 20px rgba(232, 196, 216, 0.6), 0 0 40px rgba(232, 196, 216, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 0 30px rgba(232, 196, 216, 0.8), 0 0 60px rgba(232, 196, 216, 0.5)';
            e.target.style.background = '#2a2a2a';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = '0 0 20px rgba(232, 196, 216, 0.6), 0 0 40px rgba(232, 196, 216, 0.3)';
            e.target.style.background = 'transparent';
          }}
        >
          <span className="flex items-center gap-2">
            <span>▶</span>
            <span className="text-sm">START</span>
          </span>
        </button>

        <div className="flex-1 flex gap-2 ml-4">
          {openWindows.map(windowId => (
            <div
              key={windowId}
              className="px-3 py-2 bg-[#2a2a2a] flex items-center gap-2 text-sm text-gray-300 rounded border border-[#3a3a3a]"
            >
              <span>{windows[windowId].icon}</span>
              <span className="max-w-[120px] truncate">{windows[windowId].title}</span>
            </div>
          ))}
        </div>

        <div className="px-3 py-2 text-sm text-gray-400">
          {time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Start Menu */}
      {startMenuOpen && (
        <div 
          className="fixed bottom-12 left-2 w-64 z-50 rounded-lg overflow-hidden shadow-2xl"
          style={{ 
            background: '#1e1e1e',
            border: '1px solid #3a3a3a'
          }}
        >
          <div className="text-gray-200 p-4 flex items-center gap-3"
            style={{
              background: '#252525',
              borderBottom: '1px solid #3a3a3a'
            }}>
            <div className="w-10 h-10 rounded bg-gradient-to-br from-[#E8C4D8] to-[#B8C5D6] flex items-center justify-center text-[9px] text-white font-bold leading-tight">
              LOGO<br/>200x200
            </div>
            <div>
              <div className="text-base font-medium">Elisa Bernard</div>
              <div className="text-xs text-gray-400">Portfolio</div>
            </div>
          </div>
          <div className="p-2 space-y-1">
            {Object.entries(windows).map(([key, win]) => (
              <button
                key={key}
                onClick={() => {
                  openWindow(key);
                  setStartMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-[#2a2a2a] text-gray-300 flex items-center gap-3 transition-all rounded"
                style={{
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.boxShadow = 'inset 0 0 20px rgba(139, 200, 255, 0.2)'}
                onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
              >
                <span className="text-lg">{win.icon}</span>
                <span className="text-sm font-medium">{win.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');

        * {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M0,0 L0,12 L3,9 L5,14 L7,13 L5,8 L9,8 Z" fill="white" stroke="black"/></svg>'), auto;
        }

        button, a {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M2,2 L2,6 L6,6 L6,10 L10,10 L10,14 L14,14 L14,2 Z" fill="white" stroke="black"/></svg>'), pointer !important;
        }

        @keyframes pinkGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(232, 196, 216, 0.6), 0 0 40px rgba(232, 196, 216, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(232, 196, 216, 0.9), 0 0 60px rgba(232, 196, 216, 0.5), 0 0 80px rgba(232, 196, 216, 0.2);
          }
        }
      `}</style>
    </div>
  );
};

export default RetroPortfolio;