import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, Maximize2, RefreshCw, Lock, Shield } from 'lucide-react';

interface DashboardEmbedProps {
  title: string;
  embedUrl: string;
  description?: string;
  userRole?: string;
}

export const DashboardEmbed: React.FC<DashboardEmbedProps> = ({
  title,
  embedUrl,
  description,
  userRole
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isConfigured = embedUrl && embedUrl !== '';

  useEffect(() => {
    setIsLoading(true);
    setError(false);
  }, [embedUrl]);

  const handleIframeLoad = () => { setIsLoading(false); setError(false); };
  const handleIframeError = () => { setIsLoading(false); setError(true); };
  const handleRetry = () => {
    setIsLoading(true);
    setError(false);
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  };

  if (!isConfigured) {
    return (
      <div className="glass rounded-xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Accès non autorisé</h3>
          <p className="text-gray-400">Vous n'avez pas les droits d'accès à ce dashboard.</p>
          <p className="text-sm text-gray-500 mt-2">Veuillez contacter votre administrateur.</p>
        </div>
      </div>
    );
  }

  const buildLockedUrl = (url: string) => {
    const base = url.split('?')[0];
    const params = new URLSearchParams({ rm: 'minimal', nf: 'true', ns: 'true' });
    return `${base}?${params.toString()}`;
  };

  const lockedUrl = buildLockedUrl(embedUrl);
  const containerHeight = isFullscreen ? 'calc(100vh - 80px)' : '660px';

  return (
    <div className={`glass rounded-xl overflow-hidden transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50 bg-navy-950' : ''}`}>

      {/* Header */}
      <div className="p-4 border-b border-navy-700 bg-navy-800/50 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-0.5 bg-gold-500/10 border border-gold-500/20 rounded-full">
            <Shield className="w-3 h-3 text-gold-500" />
            <span className="text-[10px] text-gold-500 font-semibold tracking-wider">CLASSIFIÉ</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleRetry} className="p-2 hover:bg-navy-700 rounded-lg transition-colors" title="Recharger">
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 hover:bg-navy-700 rounded-lg transition-colors" title={isFullscreen ? 'Quitter plein écran' : 'Plein écran'}>
            <Maximize2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Watermark bar */}
      <div className="bg-navy-900/80 border-b border-gold-500/10 px-4 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-3 h-3 text-gold-500/50" />
          <span className="text-[10px] text-gold-500/50 tracking-widest font-mono">
            NEXUS360 · DGSN · ACCÈS RESTREINT
          </span>
        </div>
        <span className="text-[10px] text-gray-600 font-mono">
          {userRole} · {new Date().toLocaleDateString('fr-FR')}
        </span>
      </div>

      {/* iframe container */}
      <div className="relative overflow-hidden" style={{ height: containerHeight }}>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-900/80 z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400 text-sm">Chargement sécurisé...</p>
              <p className="text-gray-600 text-xs mt-1">NEXUS360 · DGSN</p>
            </div>
          </div>
        )}

        {error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-md p-6">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-400 font-semibold mb-2">Erreur de chargement</p>
              <p className="text-sm text-gray-500 mb-4">Vérifiez que le dashboard est correctement partagé.</p>
              <button onClick={handleRetry} className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-navy-900 rounded-lg transition-colors font-semibold">
                Réessayer
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* iframe shifted left to hide the page selector panel,
                container overflow:hidden clips what sticks out        */}
            <iframe
              ref={iframeRef}
              src={lockedUrl}
              title={title}
              className="absolute top-0 border-0"
              style={{
                /* Pull iframe 56px to the left — hides the page selector panel */
                left: '-56px',
                /* Compensate width so right edge still fills container */
                width: 'calc(100% + 56px)',
                height: '100%',
              }}
              allow="fullscreen"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-storage-access-by-user-activation allow-popups-to-escape-sandbox"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Left blocker — final safety net over any leftover panel edge */}
            <div
              className="absolute top-0 left-0 bottom-0 bg-navy-950"
              style={{ width: '4px', zIndex: 5 }}
            />
          </>
        )}
      </div>

      {/* Slim secure footer */}
      <div className="px-4 py-1 bg-navy-900/50 border-t border-navy-700/50 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-green-500/60" />
          <span className="text-[10px] text-green-500/60">Vue sécurisée · Navigation désactivée</span>
        </div>
        <span className="text-[10px] text-gray-700">© DGSN {new Date().getFullYear()}</span>
      </div>

    </div>
  );
};
