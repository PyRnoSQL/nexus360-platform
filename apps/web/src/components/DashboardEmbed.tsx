import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, ExternalLink, AlertCircle, Maximize2, RefreshCw, Lock } from 'lucide-react';

interface DashboardEmbedProps {
  title: string;
  embedUrl: string;
  description?: string;
  userRole?: string;
}

export const DashboardEmbed: React.FC<DashboardEmbedProps> = ({ title, embedUrl, description, userRole }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isConfigured = embedUrl && embedUrl !== "";

  useEffect(() => {
    setIsLoading(true);
    setError(false);
  }, [embedUrl]);

  const handleIframeLoad = () => {
    console.log("Iframe loaded successfully:", title);
    setIsLoading(false);
    setError(false);
  };

  const handleIframeError = () => {
    console.error("Iframe failed to load:", title);
    setIsLoading(false);
    setError(true);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(false);
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = src;
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isConfigured) {
    return (
      <div className="glass rounded-xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-yellow-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Accès non autorisé</h3>
          <p className="text-gray-400">
            Vous n'avez pas les droits d'accès à ce dashboard.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Veuillez contacter votre administrateur.
          </p>
        </div>
      </div>
    );
  }

  const embedSrc = embedUrl.includes('?') ? `${embedUrl}&rm=minimal` : `${embedUrl}?rm=minimal`;

  return (
    <div className={`glass rounded-xl overflow-hidden transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50 bg-navy-950' : ''}`}>
      <div className="p-4 border-b border-navy-700 bg-navy-800/50 flex justify-between items-center flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRetry}
            className="p-2 hover:bg-navy-700 rounded-lg transition-colors"
            title="Recharger"
          >
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-navy-700 rounded-lg transition-colors"
            title={isFullscreen ? "Quitter plein écran" : "Plein écran"}
          >
            <Maximize2 className="w-4 h-4 text-gray-400" />
          </button>
          <a
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-navy-700 rounded-lg transition-colors"
            title="Ouvrir dans un nouvel onglet"
          >
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
        </div>
      </div>

      <div className="relative" style={{ height: isFullscreen ? 'calc(100vh - 80px)' : '600px' }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-900/80 z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Chargement du dashboard...</p>
            </div>
          </div>
        )}
        
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-md p-6">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-400 font-semibold mb-2">Erreur de chargement du dashboard</p>
              <p className="text-sm text-gray-500 mb-4">
                Vérifiez que le dashboard est correctement partagé.
              </p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-navy-900 rounded-lg transition-colors"
              >
                Réessayer
              </button>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={embedSrc}
            title={title}
            className="w-full h-full border-0"
            allow="fullscreen"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-storage-access-by-user-activation allow-popups-to-escape-sandbox"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
    </div>
  );
};
