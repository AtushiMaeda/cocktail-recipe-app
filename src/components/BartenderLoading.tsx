import { useState, useEffect } from 'react';

interface BartenderLoadingProps {
  isVisible: boolean;
}

export const BartenderLoading = ({ isVisible }: BartenderLoadingProps) => {
  const [videoLoaded, setVideoLoaded] = useState<boolean | null>(null);
  const [videoError, setVideoError] = useState(false);

  // isVisibleが変わるたびにビデオ状態をリセット
  useEffect(() => {
    if (isVisible) {
      setVideoLoaded(null);
      setVideoError(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    console.warn('Bartender animation video failed to load, falling back to emoji');
    setVideoLoaded(false);
    setVideoError(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-2xl text-center max-w-sm mx-4">
        <div className="mb-4">
          {/* 動画読み込み状態に応じて表示を切り替え */}
          {!videoError && videoLoaded !== false ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-32 h-32 mx-auto rounded-lg"
              onLoadedData={handleVideoLoaded}
              onError={handleVideoError}
              style={{ display: videoLoaded !== true ? 'none' : 'block' }}
            >
              <source src="/bartender-animation.mp4" type="video/mp4" />
            </video>
          ) : null}
          
          {/* フォールバック表示（動画読み込み失敗時または初期状態） */}
          {(videoError || videoLoaded === false || videoLoaded === null) && (
            <div className="w-32 h-32 mx-auto flex items-center justify-center text-6xl bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg">
              <div className="animate-bounce">🍸</div>
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          カクテルを調合中...
        </h3>
        <p className="text-gray-600">
          バーテンダーがあなたにぴったりのカクテルを探しています
        </p>
        <div className="mt-4">
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};