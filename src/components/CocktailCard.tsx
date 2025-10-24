import type { Cocktail } from '../types/cocktail';

interface CocktailCardProps {
  cocktail: Cocktail;
  onClick: (cocktail: Cocktail) => void;
}

export const CocktailCard = ({ cocktail, onClick }: CocktailCardProps) => {
  const defaultAlcoholLevels: Record<string, { label: string; color: string }> = {
    'non-alcoholic': { label: 'ノンアルコール', color: 'bg-green-100 text-green-800' },
    'low': { label: '低アルコール', color: 'bg-blue-100 text-blue-800' },
    'medium': { label: '中アルコール', color: 'bg-yellow-100 text-yellow-800' },
    'high': { label: '高アルコール', color: 'bg-red-100 text-red-800' }
  };

  // デフォルトタグまたはカスタムタグの処理
  const alcoholInfo = defaultAlcoholLevels[cocktail.alcoholContent] || {
    label: cocktail.alcoholContent,
    color: 'bg-purple-100 text-purple-800'
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(cocktail)}
    >
      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
        {cocktail.image ? (
          <img 
            src={cocktail.image} 
            alt={cocktail.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<div class="text-white text-6xl">🍸</div>';
            }}
          />
        ) : (
          <div className="text-white text-6xl">🍸</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {cocktail.name}
            {cocktail.isOriginal && (
              <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                オリジナル
              </span>
            )}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full ${alcoholInfo.color}`}>
            {alcoholInfo.label}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-2">{cocktail.nameEn}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{cocktail.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {cocktail.flavor.slice(0, 3).map((flavor, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {flavor}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};