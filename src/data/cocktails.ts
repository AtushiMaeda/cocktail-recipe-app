// カクテルのレシピデータを管理するファイル

import type { Cocktail } from '../types/cocktail';

export const cocktails: Cocktail[] = [
  {
    id: '1',
    name: 'モヒート',
    nameEn: 'Mojito',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ラム、ミント、ライムを使った爽やかなカクテル',
    ingredients: [
      { name: 'ホワイトラム', amount: '45', unit: 'ml' },
      { name: 'ライムジュース', amount: '30', unit: 'ml' },
      { name: '砂糖', amount: '2', unit: 'tsp' },
      { name: 'ミントの葉', amount: '6-8', unit: '枚' },
      { name: 'ソーダ水', amount: '適量' },
      { name: '氷', amount: '適量' }
    ],
    instructions: [
      'グラスにミントの葉と砂糖を入れる',
      'ライムジュースを加えて軽くつぶす',
      'クラッシュアイスを加える',
      'ラムを注ぐ',
      'ソーダ水で満たす',
      '軽くステアして完成'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['爽やか', 'ミント', 'ライム']
  },
  {
    id: '2',
    name: 'マルガリータ',
    nameEn: 'Margarita',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'テキーラベースの定番カクテル',
    ingredients: [
      { name: 'テキーラ', amount: '50', unit: 'ml' },
      { name: 'コアントロー', amount: '20', unit: 'ml' },
      { name: 'ライムジュース', amount: '15', unit: 'ml' },
      { name: '塩', amount: '適量' }
    ],
    instructions: [
      'グラスの縁を濡らして塩をつける',
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'グラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['酸味', 'テキーラ', '塩味']
  },
  {
    id: '3',
    name: 'ピニャコラーダ',
    nameEn: 'Piña Colada',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'トロピカルな味わいのラムカクテル',
    ingredients: [
      { name: 'ホワイトラム', amount: '50', unit: 'ml' },
      { name: 'ココナッツクリーム', amount: '30', unit: 'ml' },
      { name: 'パイナップルジュース', amount: '90', unit: 'ml' },
      { name: 'クラッシュアイス', amount: '1', unit: 'カップ' }
    ],
    instructions: [
      'ブレンダーに全ての材料を入れる',
      'なめらかになるまでブレンドする',
      'グラスに注ぐ',
      'パイナップルとチェリーで飾る'
    ],
    glass: 'ハリケーングラス',
    category: 'フローズンカクテル',
    alcoholContent: 'medium',
    flavor: ['トロピカル', 'ココナッツ', 'パイナップル']
  },
  {
    id: '4',
    name: 'マティーニ',
    nameEn: 'Martini',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'カクテルの王様と呼ばれる定番',
    ingredients: [
      { name: 'ジン', amount: '60', unit: 'ml' },
      { name: 'ドライベルモット', amount: '10', unit: 'ml' },
      { name: 'オリーブ', amount: '1', unit: '個' }
    ],
    instructions: [
      'ミキシンググラスに氷を入れる',
      'ジンとベルモットを加える',
      'ステアする',
      'カクテルグラスに注ぐ',
      'オリーブを飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ドライ', 'ジン', 'ハーブ']
  },
  {
    id: '5',
    name: 'コスモポリタン',
    nameEn: 'Cosmopolitan',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ピンク色が美しいウォッカカクテル',
    ingredients: [
      { name: 'ウォッカ', amount: '40', unit: 'ml' },
      { name: 'コアントロー', amount: '15', unit: 'ml' },
      { name: 'クランベリージュース', amount: '30', unit: 'ml' },
      { name: 'ライムジュース', amount: '15', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ',
      'ライムホイールで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['フルーティー', '酸味', 'クランベリー']
  },
  {
    id: '6',
    name: 'ダイキリ',
    nameEn: 'Daiquiri',
    image: 'https://images.unsplash.com/photo-1623183029325-6dcbadf3daa8?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ラムとライムのシンプルなカクテル',
    ingredients: [
      { name: 'ホワイトラム', amount: '60', unit: 'ml' },
      { name: 'ライムジュース', amount: '20', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '10', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['酸味', 'ラム', 'さっぱり']
  },
  {
    id: '7',
    name: 'マイタイ',
    nameEn: 'Mai Tai',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'トロピカルな味わいのティキカクテル',
    ingredients: [
      { name: 'ダークラム', amount: '30', unit: 'ml' },
      { name: 'ホワイトラム', amount: '30', unit: 'ml' },
      { name: 'オレンジキュラソー', amount: '15', unit: 'ml' },
      { name: 'オルジェーシロップ', amount: '15', unit: 'ml' },
      { name: 'ライムジュース', amount: '30', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'ロックグラスに注ぐ',
      'ミントとパイナップルで飾る'
    ],
    glass: 'ロックグラス',
    category: 'ティキカクテル',
    alcoholContent: 'high',
    flavor: ['トロピカル', 'ラム', 'フルーティー']
  },
  {
    id: '8',
    name: 'オールドファッションド',
    nameEn: 'Old Fashioned',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ウイスキーの味わいを楽しむクラシックカクテル',
    ingredients: [
      { name: 'バーボンウイスキー', amount: '60', unit: 'ml' },
      { name: '角砂糖', amount: '1', unit: '個' },
      { name: 'アンゴスチュラビターズ', amount: '2-3', unit: 'dash' },
      { name: 'オレンジピール', amount: '1', unit: '片' }
    ],
    instructions: [
      'グラスに角砂糖とビターズを入れる',
      '少量の水を加えて砂糖を溶かす',
      '氷を加える',
      'ウイスキーを注ぐ',
      'ステアする',
      'オレンジピールを絞って飾る'
    ],
    glass: 'ロックグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ウイスキー', 'ビター', 'オレンジ']
  },
  {
    id: '9',
    name: 'モスコミュール',
    nameEn: 'Moscow Mule',
    image: 'https://images.unsplash.com/photo-1558645836-e44122a743ee?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンジャービアを使った爽やかなカクテル',
    ingredients: [
      { name: 'ウォッカ', amount: '45', unit: 'ml' },
      { name: 'ライムジュース', amount: '15', unit: 'ml' },
      { name: 'ジンジャービア', amount: '120', unit: 'ml' },
      { name: 'ライム', amount: '1', unit: 'くし切り' }
    ],
    instructions: [
      '銅製マグカップに氷を入れる',
      'ウォッカとライムジュースを注ぐ',
      'ジンジャービアで満たす',
      '軽くステアする',
      'ライムを飾る'
    ],
    glass: '銅製マグカップ',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ジンジャー', 'ライム', '爽やか']
  },
  {
    id: '10',
    name: 'ネグローニ',
    nameEn: 'Negroni',
    image: 'https://images.unsplash.com/photo-1634055947646-61e5371bc788?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ビターな味わいのイタリアンカクテル',
    ingredients: [
      { name: 'ジン', amount: '30', unit: 'ml' },
      { name: 'カンパリ', amount: '30', unit: 'ml' },
      { name: 'スイートベルモット', amount: '30', unit: 'ml' },
      { name: 'オレンジピール', amount: '1', unit: '片' }
    ],
    instructions: [
      'ロックグラスに氷を入れる',
      '全ての材料を注ぐ',
      'ステアする',
      'オレンジピールを飾る'
    ],
    glass: 'ロックグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ビター', 'ハーブ', 'オレンジ']
  },
  {
    id: '11',
    name: 'ウイスキーサワー',
    nameEn: 'Whiskey Sour',
    image: 'https://images.unsplash.com/photo-1481671703460-040cb8a2d909?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ウイスキーとレモンの酸味が効いたカクテル',
    ingredients: [
      { name: 'バーボンウイスキー', amount: '60', unit: 'ml' },
      { name: 'レモンジュース', amount: '30', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '15', unit: 'ml' },
      { name: '卵白', amount: '1', unit: '個分' }
    ],
    instructions: [
      'シェーカーに材料を入れて空シェイク',
      '氷を加えて再度シェイク',
      'カクテルグラスに注ぐ',
      'チェリーとオレンジスライスで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['酸味', 'ウイスキー', 'クリーミー']
  },
  {
    id: '12',
    name: 'ロングアイランドアイスティー',
    nameEn: 'Long Island Iced Tea',
    image: 'https://images.unsplash.com/photo-1588673366175-e9133cf0e862?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '複数のスピリッツを使った強いカクテル',
    ingredients: [
      { name: 'ウォッカ', amount: '15', unit: 'ml' },
      { name: 'テキーラ', amount: '15', unit: 'ml' },
      { name: 'ホワイトラム', amount: '15', unit: 'ml' },
      { name: 'ジン', amount: '15', unit: 'ml' },
      { name: 'コアントロー', amount: '15', unit: 'ml' },
      { name: 'レモンジュース', amount: '30', unit: 'ml' },
      { name: 'コーラ', amount: '適量' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'スピリッツとレモンジュースを注ぐ',
      'コーラで満たす',
      'ステアする',
      'レモンスライスで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'high',
    flavor: ['複雑', 'レモン', 'コーラ']
  },
  {
    id: '13',
    name: 'ブラッディマリー',
    nameEn: 'Bloody Mary',
    image: 'https://images.unsplash.com/photo-1624517452488-87b8f3186de1?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'トマトジュースを使ったユニークなカクテル',
    ingredients: [
      { name: 'ウォッカ', amount: '45', unit: 'ml' },
      { name: 'トマトジュース', amount: '90', unit: 'ml' },
      { name: 'レモンジュース', amount: '15', unit: 'ml' },
      { name: 'ウスターソース', amount: '2-3', unit: 'dash' },
      { name: 'タバスコ', amount: '2-3', unit: 'dash' },
      { name: '塩・胡椒', amount: '適量' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      '全ての材料を入れる',
      'よくステアする',
      'セロリスティックで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['トマト', 'スパイシー', '塩味']
  },
  {
    id: '14',
    name: 'ジントニック',
    nameEn: 'Gin and Tonic',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンとトニックウォーターのシンプルなカクテル',
    ingredients: [
      { name: 'ジン', amount: '45', unit: 'ml' },
      { name: 'トニックウォーター', amount: '適量' },
      { name: 'ライム', amount: '1', unit: 'くし切り' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'ジンを注ぐ',
      'トニックウォーターで満たす',
      '軽くステアする',
      'ライムを絞って飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'トニック', '爽やか']
  },
  {
    id: '15',
    name: 'カイピリーニャ',
    nameEn: 'Caipirinha',
    image: 'https://images.unsplash.com/photo-1586338211198-365fa418e7f0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ブラジルの国民的カクテル',
    ingredients: [
      { name: 'カシャーサ', amount: '60', unit: 'ml' },
      { name: 'ライム', amount: '1', unit: '個' },
      { name: '砂糖', amount: '2', unit: 'tsp' }
    ],
    instructions: [
      'ライムを8等分に切る',
      'グラスに入れて砂糖と一緒につぶす',
      'クラッシュアイスを加える',
      'カシャーサを注ぐ',
      'よくステアする'
    ],
    glass: 'ロックグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ライム', 'カシャーサ', '爽やか']
  },
  {
    id: '16',
    name: 'エスプレッソマティーニ',
    nameEn: 'Espresso Martini',
    image: 'https://images.unsplash.com/photo-1615721216093-b68c1846d43e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'コーヒーを使った大人のカクテル',
    ingredients: [
      { name: 'ウォッカ', amount: '50', unit: 'ml' },
      { name: 'コーヒーリキュール', amount: '30', unit: 'ml' },
      { name: 'エスプレッソ', amount: '30', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '10', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      '強くシェイクする',
      'カクテルグラスに注ぐ',
      'コーヒー豆3粒で飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['コーヒー', 'ビター', 'クリーミー']
  },
  {
    id: '17',
    name: 'フレンチ75',
    nameEn: 'French 75',
    image: 'https://images.unsplash.com/photo-1598972265391-322e9b3b1a5a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'シャンパンを使った華やかなカクテル',
    ingredients: [
      { name: 'ジン', amount: '30', unit: 'ml' },
      { name: 'レモンジュース', amount: '15', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '10', unit: 'ml' },
      { name: 'シャンパン', amount: '60', unit: 'ml' }
    ],
    instructions: [
      'シェーカーにジン、レモンジュース、シロップと氷を入れる',
      'シェイクする',
      'シャンパングラスに注ぐ',
      'シャンパンで満たす',
      'レモンツイストで飾る'
    ],
    glass: 'シャンパングラス',
    category: 'スパークリングカクテル',
    alcoholContent: 'medium',
    flavor: ['シャンパン', 'レモン', '華やか']
  },
  {
    id: '18',
    name: 'アペロールスプリッツ',
    nameEn: 'Aperol Spritz',
    image: 'https://images.unsplash.com/photo-1626350720388-f4c30c23afe6?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'イタリアの定番アペリティフ',
    ingredients: [
      { name: 'アペロール', amount: '60', unit: 'ml' },
      { name: 'プロセッコ', amount: '90', unit: 'ml' },
      { name: 'ソーダ水', amount: '30', unit: 'ml' },
      { name: 'オレンジスライス', amount: '1', unit: '枚' }
    ],
    instructions: [
      'ワイングラスに氷を入れる',
      'アペロールを注ぐ',
      'プロセッコを加える',
      'ソーダ水をトップ',
      'オレンジスライスで飾る'
    ],
    glass: 'ワイングラス',
    category: 'スパークリングカクテル',
    alcoholContent: 'low',
    flavor: ['ビター', 'オレンジ', '爽やか']
  },
  {
    id: '19',
    name: 'ピスコサワー',
    nameEn: 'Pisco Sour',
    image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '南米の代表的なカクテル',
    ingredients: [
      { name: 'ピスコ', amount: '60', unit: 'ml' },
      { name: 'ライムジュース', amount: '30', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '20', unit: 'ml' },
      { name: '卵白', amount: '1', unit: '個分' },
      { name: 'アンゴスチュラビターズ', amount: '3', unit: 'dash' }
    ],
    instructions: [
      'シェーカーに材料を入れて空シェイク',
      '氷を加えて再度シェイク',
      'カクテルグラスに注ぐ',
      'ビターズを3滴垂らす'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['酸味', 'ピスコ', 'クリーミー']
  },
  {
    id: '20',
    name: 'ベリーニ',
    nameEn: 'Bellini',
    image: 'https://images.unsplash.com/photo-1481671703460-040cb8a2d909?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ピーチピューレとプロセッコのカクテル',
    ingredients: [
      { name: 'ピーチピューレ', amount: '45', unit: 'ml' },
      { name: 'プロセッコ', amount: '75', unit: 'ml' }
    ],
    instructions: [
      'シャンパングラスにピーチピューレを入れる',
      '冷えたプロセッコをゆっくり注ぐ',
      '軽くステアする'
    ],
    glass: 'シャンパングラス',
    category: 'スパークリングカクテル',
    alcoholContent: 'low',
    flavor: ['ピーチ', 'フルーティー', '甘い']
  },
  {
    id: '21',
    name: 'ミモザ',
    nameEn: 'Mimosa',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'オレンジジュースとシャンパンのカクテル',
    ingredients: [
      { name: 'オレンジジュース', amount: '75', unit: 'ml' },
      { name: 'シャンパン', amount: '75', unit: 'ml' }
    ],
    instructions: [
      'シャンパングラスにオレンジジュースを注ぐ',
      'シャンパンをゆっくり注ぐ',
      '軽くステアする'
    ],
    glass: 'シャンパングラス',
    category: 'スパークリングカクテル',
    alcoholContent: 'low',
    flavor: ['オレンジ', 'シャンパン', '爽やか']
  },
  {
    id: '22',
    name: 'サイドカー',
    nameEn: 'Sidecar',
    image: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ブランデーベースのクラシックカクテル',
    ingredients: [
      { name: 'ブランデー', amount: '50', unit: 'ml' },
      { name: 'コアントロー', amount: '20', unit: 'ml' },
      { name: 'レモンジュース', amount: '20', unit: 'ml' },
      { name: '砂糖', amount: '適量' }
    ],
    instructions: [
      'グラスの縁を濡らして砂糖をつける',
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ブランデー', 'オレンジ', '酸味']
  },
  {
    id: '23',
    name: 'ラムパンチ',
    nameEn: 'Rum Punch',
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'トロピカルフルーツとラムのカクテル',
    ingredients: [
      { name: 'ダークラム', amount: '60', unit: 'ml' },
      { name: 'オレンジジュース', amount: '30', unit: 'ml' },
      { name: 'パイナップルジュース', amount: '30', unit: 'ml' },
      { name: 'グレナディンシロップ', amount: '15', unit: 'ml' },
      { name: 'ライムジュース', amount: '15', unit: 'ml' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      '全ての材料を注ぐ',
      'よくステアする',
      'フルーツで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['トロピカル', 'ラム', 'フルーティー']
  },
  {
    id: '24',
    name: 'カミカゼ',
    nameEn: 'Kamikaze',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ウォッカベースのショートカクテル',
    ingredients: [
      { name: 'ウォッカ', amount: '30', unit: 'ml' },
      { name: 'コアントロー', amount: '30', unit: 'ml' },
      { name: 'ライムジュース', amount: '30', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'ショットグラスに注ぐ'
    ],
    glass: 'ショットグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ウォッカ', 'ライム', '強い']
  },
  {
    id: '25',
    name: 'ブルーハワイ',
    nameEn: 'Blue Hawaii',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '青色が美しいトロピカルカクテル',
    ingredients: [
      { name: 'ホワイトラム', amount: '30', unit: 'ml' },
      { name: 'ブルーキュラソー', amount: '30', unit: 'ml' },
      { name: 'パイナップルジュース', amount: '60', unit: 'ml' },
      { name: 'ココナッツクリーム', amount: '30', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'ハリケーングラスに注ぐ',
      'パイナップルとチェリーで飾る'
    ],
    glass: 'ハリケーングラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['トロピカル', 'ココナッツ', '甘い']
  },
  {
    id: '26',
    name: 'テキーラサンライズ',
    nameEn: 'Tequila Sunrise',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'グラデーションが美しいテキーラカクテル',
    ingredients: [
      { name: 'テキーラ', amount: '45', unit: 'ml' },
      { name: 'オレンジジュース', amount: '90', unit: 'ml' },
      { name: 'グレナディンシロップ', amount: '15', unit: 'ml' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'テキーラとオレンジジュースを注ぐ',
      'ステアする',
      'グレナディンをゆっくり注ぐ',
      'オレンジとチェリーで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['テキーラ', 'オレンジ', '甘い']
  },
  {
    id: '27',
    name: 'ハーベイウォールバンガー',
    nameEn: 'Harvey Wallbanger',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ガリアーノを使った個性的なカクテル',
    ingredients: [
      { name: 'ウォッカ', amount: '30', unit: 'ml' },
      { name: 'ガリアーノ', amount: '15', unit: 'ml' },
      { name: 'オレンジジュース', amount: '120', unit: 'ml' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'ウォッカとオレンジジュースを注ぐ',
      'ステアする',
      'ガリアーノをフロートする',
      'オレンジスライスで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['オレンジ', 'ハーブ', '甘い']
  },
  {
    id: '28',
    name: 'シンガポールスリング',
    nameEn: 'Singapore Sling',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'シンガポール発祥の複雑な味わいのカクテル',
    ingredients: [
      { name: 'ジン', amount: '30', unit: 'ml' },
      { name: 'チェリーブランデー', amount: '15', unit: 'ml' },
      { name: 'コアントロー', amount: '7.5', unit: 'ml' },
      { name: 'ベネディクティン', amount: '7.5', unit: 'ml' },
      { name: 'パイナップルジュース', amount: '120', unit: 'ml' },
      { name: 'ライムジュース', amount: '15', unit: 'ml' },
      { name: 'グレナディンシロップ', amount: '10', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'ハリケーングラスに注ぐ',
      'パイナップルとチェリーで飾る'
    ],
    glass: 'ハリケーングラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['複雑', 'フルーティー', 'ジン']
  },
  {
    id: '29',
    name: 'ホワイトレディ',
    nameEn: 'White Lady',
    image: 'https://images.unsplash.com/photo-1561651188-d207bbec0088?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '卵白を使った白いカクテル',
    ingredients: [
      { name: 'ジン', amount: '40', unit: 'ml' },
      { name: 'コアントロー', amount: '30', unit: 'ml' },
      { name: 'レモンジュース', amount: '20', unit: 'ml' },
      { name: '卵白', amount: '10', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料を入れて空シェイク',
      '氷を加えて再度シェイク',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'レモン', 'クリーミー']
  },
  {
    id: '30',
    name: 'パロマ',
    nameEn: 'Paloma',
    image: 'https://images.unsplash.com/photo-1574095855929-2cec6ab7af69?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'グレープフルーツとテキーラのメキシカンカクテル',
    ingredients: [
      { name: 'テキーラ', amount: '60', unit: 'ml' },
      { name: 'グレープフルーツジュース', amount: '60', unit: 'ml' },
      { name: 'ライムジュース', amount: '15', unit: 'ml' },
      { name: 'ソーダ水', amount: '適量' },
      { name: '塩', amount: '適量' }
    ],
    instructions: [
      'グラスの縁を濡らして塩をつける',
      'グラスに氷を入れる',
      'テキーラとジュースを注ぐ',
      'ソーダ水で満たす',
      'ライムで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['グレープフルーツ', 'テキーラ', '塩味']
  },
  {
    id: '31',
    name: 'ギムレット',
    nameEn: 'Gimlet',
    image: 'https://images.unsplash.com/photo-1586116593897-d2e7d46fc6a0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンとライムのシンプルで洗練されたカクテル',
    ingredients: [
      { name: 'ジン', amount: '60', unit: 'ml' },
      { name: 'ライムジュース', amount: '20', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '10', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ',
      'ライムホイールで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ジン', 'ライム', 'さっぱり']
  },
  {
    id: '32',
    name: 'アイリッシュコーヒー',
    nameEn: 'Irish Coffee',
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ウイスキーと生クリームを使った温かいカクテル',
    ingredients: [
      { name: 'アイリッシュウイスキー', amount: '40', unit: 'ml' },
      { name: 'ホットコーヒー', amount: '80', unit: 'ml' },
      { name: '砂糖', amount: '1', unit: 'tsp' },
      { name: '生クリーム', amount: '30', unit: 'ml' }
    ],
    instructions: [
      'アイリッシュコーヒーグラスを温める',
      '砂糖とウイスキーを入れる',
      'ホットコーヒーを注ぐ',
      'ステアして砂糖を溶かす',
      'スプーンを使って生クリームをフロートする'
    ],
    glass: 'アイリッシュコーヒーグラス',
    category: 'ホットカクテル',
    alcoholContent: 'medium',
    flavor: ['コーヒー', 'ウイスキー', 'クリーミー']
  },
  {
    id: '33',
    name: 'ブランデーアレキサンダー',
    nameEn: 'Brandy Alexander',
    image: 'https://images.unsplash.com/photo-1582818833087-9bdf6ab2bb0f?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'デザートカクテルとして人気',
    ingredients: [
      { name: 'ブランデー', amount: '30', unit: 'ml' },
      { name: 'クレームドカカオ', amount: '30', unit: 'ml' },
      { name: '生クリーム', amount: '30', unit: 'ml' },
      { name: 'ナツメグ', amount: '少々' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ',
      'ナツメグを振りかける'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['チョコレート', 'ブランデー', 'クリーミー']
  },
  {
    id: '34',
    name: 'ラモスジンフィズ',
    nameEn: 'Ramos Gin Fizz',
    image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '泡立ちが特徴的なクラシックカクテル',
    ingredients: [
      { name: 'ジン', amount: '60', unit: 'ml' },
      { name: 'レモンジュース', amount: '15', unit: 'ml' },
      { name: 'ライムジュース', amount: '15', unit: 'ml' },
      { name: '砂糖', amount: '1', unit: 'tsp' },
      { name: '生クリーム', amount: '60', unit: 'ml' },
      { name: '卵白', amount: '1', unit: '個分' },
      { name: 'オレンジフラワーウォーター', amount: '3', unit: 'dash' },
      { name: 'ソーダ水', amount: '適量' }
    ],
    instructions: [
      'シェーカーに材料（ソーダ水以外）を入れる',
      '氷なしで2分間シェイク',
      '氷を加えてさらに1分シェイク',
      'コリンズグラスに注ぐ',
      'ソーダ水をトップ'
    ],
    glass: 'コリンズグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'シトラス', 'クリーミー']
  },
  {
    id: '35',
    name: 'カルーアミルク',
    nameEn: 'Kahlua Milk',
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'コーヒーリキュールとミルクの甘いカクテル',
    ingredients: [
      { name: 'カルーア', amount: '30', unit: 'ml' },
      { name: '牛乳', amount: '90', unit: 'ml' }
    ],
    instructions: [
      'ロックグラスに氷を入れる',
      'カルーアを注ぐ',
      '牛乳を注ぐ',
      '軽くステアする'
    ],
    glass: 'ロックグラス',
    category: 'ロングカクテル',
    alcoholContent: 'low',
    flavor: ['コーヒー', 'ミルク', '甘い']
  },
  {
    id: '36',
    name: 'フローズンダイキリ',
    nameEn: 'Frozen Daiquiri',
    image: 'https://images.unsplash.com/photo-1541855493-0ee1394b1d1e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'シャーベット状のラムカクテル',
    ingredients: [
      { name: 'ホワイトラム', amount: '60', unit: 'ml' },
      { name: 'ライムジュース', amount: '30', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '15', unit: 'ml' },
      { name: 'クラッシュアイス', amount: '1', unit: 'カップ' }
    ],
    instructions: [
      'ブレンダーに全ての材料を入れる',
      'なめらかになるまでブレンド',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'フローズンカクテル',
    alcoholContent: 'medium',
    flavor: ['ラム', 'ライム', '冷たい']
  },
  {
    id: '37',
    name: 'サゼラック',
    nameEn: 'Sazerac',
    image: 'https://images.unsplash.com/photo-1585432553965-3b0b3e6dd5d0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ニューオーリンズ生まれのウイスキーカクテル',
    ingredients: [
      { name: 'ライウイスキー', amount: '60', unit: 'ml' },
      { name: 'アブサン', amount: '10', unit: 'ml' },
      { name: '角砂糖', amount: '1', unit: '個' },
      { name: 'ペイショーズビターズ', amount: '3', unit: 'dash' },
      { name: 'レモンピール', amount: '1', unit: '片' }
    ],
    instructions: [
      'グラスをアブサンでリンスして捨てる',
      '別のグラスで角砂糖とビターズをつぶす',
      'ウイスキーと氷を加えてステア',
      'リンスしたグラスに注ぐ',
      'レモンピールを絞って飾る'
    ],
    glass: 'ロックグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ウイスキー', 'アニス', 'ビター']
  },
  {
    id: '38',
    name: 'ヘミングウェイダイキリ',
    nameEn: 'Hemingway Daiquiri',
    image: 'https://images.unsplash.com/photo-1605270012305-e2d4c97b5f4f?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'グレープフルーツを加えた特別なダイキリ',
    ingredients: [
      { name: 'ホワイトラム', amount: '60', unit: 'ml' },
      { name: 'ライムジュース', amount: '25', unit: 'ml' },
      { name: 'グレープフルーツジュース', amount: '15', unit: 'ml' },
      { name: 'マラスキーノリキュール', amount: '15', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ',
      'ライムホイールで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ラム', 'シトラス', 'さっぱり']
  },
  {
    id: '39',
    name: 'プランターズパンチ',
    nameEn: "Planter's Punch",
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジャマイカ発祥のラムパンチ',
    ingredients: [
      { name: 'ダークラム', amount: '45', unit: 'ml' },
      { name: 'ライムジュース', amount: '35', unit: 'ml' },
      { name: '砂糖', amount: '2', unit: 'tsp' },
      { name: '水', amount: '30', unit: 'ml' },
      { name: 'アンゴスチュラビターズ', amount: '2', unit: 'dash' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'ハイボールグラスに注ぐ',
      'フルーツで豪華に飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ラム', 'ライム', 'フルーティー']
  },
  {
    id: '40',
    name: 'アメリカーノ',
    nameEn: 'Americano',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'カンパリとベルモットのイタリアンカクテル',
    ingredients: [
      { name: 'カンパリ', amount: '30', unit: 'ml' },
      { name: 'スイートベルモット', amount: '30', unit: 'ml' },
      { name: 'ソーダ水', amount: '適量' },
      { name: 'オレンジスライス', amount: '1', unit: '枚' }
    ],
    instructions: [
      'ロックグラスに氷を入れる',
      'カンパリとベルモットを注ぐ',
      'ソーダ水で満たす',
      'ステアする',
      'オレンジスライスで飾る'
    ],
    glass: 'ロックグラス',
    category: 'ロングカクテル',
    alcoholContent: 'low',
    flavor: ['ビター', 'ハーブ', '爽やか']
  },
  {
    id: '41',
    name: 'ダークアンドストーミー',
    nameEn: 'Dark and Stormy',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ダークラムとジンジャービアのカクテル',
    ingredients: [
      { name: 'ダークラム', amount: '60', unit: 'ml' },
      { name: 'ジンジャービア', amount: '100', unit: 'ml' },
      { name: 'ライムジュース', amount: '10', unit: 'ml' },
      { name: 'ライム', amount: '1', unit: 'くし切り' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'ジンジャービアを注ぐ',
      'ラムをフロートする',
      'ライムジュースを加える',
      'ライムで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ラム', 'ジンジャー', 'スパイシー']
  },
  {
    id: '42',
    name: 'ヴェスパー',
    nameEn: 'Vesper',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジェームズ・ボンドが愛したカクテル',
    ingredients: [
      { name: 'ジン', amount: '60', unit: 'ml' },
      { name: 'ウォッカ', amount: '20', unit: 'ml' },
      { name: 'リレブラン', amount: '10', unit: 'ml' },
      { name: 'レモンピール', amount: '1', unit: '片' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      '強くシェイクする',
      'カクテルグラスに注ぐ',
      'レモンピールを絞って飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ジン', 'ウォッカ', 'ドライ']
  },
  {
    id: '43',
    name: 'ペーパープレーン',
    nameEn: 'Paper Plane',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'バーボンベースのモダンクラシック',
    ingredients: [
      { name: 'バーボンウイスキー', amount: '22.5', unit: 'ml' },
      { name: 'アペロール', amount: '22.5', unit: 'ml' },
      { name: 'アマーロノニーノ', amount: '22.5', unit: 'ml' },
      { name: 'レモンジュース', amount: '22.5', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['バーボン', 'ビター', 'バランス']
  },
  {
    id: '44',
    name: 'ビーズニーズ',
    nameEn: "Bee's Knees",
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ハチミツを使った禁酒法時代のカクテル',
    ingredients: [
      { name: 'ジン', amount: '60', unit: 'ml' },
      { name: 'レモンジュース', amount: '22.5', unit: 'ml' },
      { name: 'ハチミツシロップ', amount: '22.5', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ',
      'レモンツイストで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'ハチミツ', 'レモン']
  },
  {
    id: '45',
    name: 'スコッチアンドソーダ',
    nameEn: 'Scotch and Soda',
    image: 'https://images.unsplash.com/photo-1606762899601-16a0b47c2c79?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'スコッチウイスキーのシンプルな飲み方',
    ingredients: [
      { name: 'スコッチウイスキー', amount: '60', unit: 'ml' },
      { name: 'ソーダ水', amount: '適量' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'スコッチを注ぐ',
      'ソーダ水で満たす',
      '軽くステアする'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ウイスキー', '爽やか', 'シンプル']
  },
  {
    id: '46',
    name: 'ラストワード',
    nameEn: 'Last Word',
    image: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'シャルトリューズを使った複雑な味わい',
    ingredients: [
      { name: 'ジン', amount: '22.5', unit: 'ml' },
      { name: 'シャルトリューズヴェール', amount: '22.5', unit: 'ml' },
      { name: 'マラスキーノリキュール', amount: '22.5', unit: 'ml' },
      { name: 'ライムジュース', amount: '22.5', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ハーブ', '複雑', 'バランス']
  },
  {
    id: '47',
    name: 'ペニシリン',
    nameEn: 'Penicillin',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'スコッチウイスキーの新しいクラシック',
    ingredients: [
      { name: 'ブレンデッドスコッチ', amount: '60', unit: 'ml' },
      { name: 'レモンジュース', amount: '22.5', unit: 'ml' },
      { name: 'ハチミツジンジャーシロップ', amount: '22.5', unit: 'ml' },
      { name: 'アイラスコッチ', amount: '7.5', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料（アイラスコッチ以外）と氷を入れる',
      'よくシェイクする',
      'ロックグラスに注ぐ',
      'アイラスコッチをフロートする'
    ],
    glass: 'ロックグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['スコッチ', 'ジンジャー', 'スモーキー']
  },
  {
    id: '48',
    name: 'クローバークラブ',
    nameEn: 'Clover Club',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ラズベリーの風味が特徴的なジンカクテル',
    ingredients: [
      { name: 'ジン', amount: '60', unit: 'ml' },
      { name: 'レモンジュース', amount: '22.5', unit: 'ml' },
      { name: 'ラズベリーシロップ', amount: '15', unit: 'ml' },
      { name: '卵白', amount: '1', unit: '個分' }
    ],
    instructions: [
      'シェーカーに材料を入れて空シェイク',
      '氷を加えて再度シェイク',
      'カクテルグラスに注ぐ',
      'ラズベリーで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'ラズベリー', 'クリーミー']
  },
  {
    id: '49',
    name: 'ブラックベルベット',
    nameEn: 'Black Velvet',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'スタウトビールとシャンパンの組み合わせ',
    ingredients: [
      { name: 'スタウトビール', amount: '125', unit: 'ml' },
      { name: 'シャンパン', amount: '125', unit: 'ml' }
    ],
    instructions: [
      'シャンパングラスを冷やす',
      'スタウトビールをゆっくり注ぐ',
      'シャンパンをゆっくり加える',
      '軽くステアする'
    ],
    glass: 'シャンパングラス',
    category: 'ビアカクテル',
    alcoholContent: 'low',
    flavor: ['ビール', 'シャンパン', 'クリーミー']
  },
  {
    id: '50',
    name: 'トムコリンズ',
    nameEn: 'Tom Collins',
    image: 'https://images.unsplash.com/photo-1606762899601-16a0b47c2c79?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンとレモンの爽やかなロングカクテル',
    ingredients: [
      { name: 'ジン', amount: '60', unit: 'ml' },
      { name: 'レモンジュース', amount: '30', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '15', unit: 'ml' },
      { name: 'ソーダ水', amount: '適量' },
      { name: 'レモンスライス', amount: '1', unit: '枚' },
      { name: 'チェリー', amount: '1', unit: '個' }
    ],
    instructions: [
      'コリンズグラスに氷を入れる',
      'ジン、レモンジュース、シロップを注ぐ',
      'ソーダ水で満たす',
      'ステアする',
      'レモンとチェリーで飾る'
    ],
    glass: 'コリンズグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'レモン', '爽やか']
  },
  {
    id: '51',
    name: 'アビエーション',
    nameEn: 'Aviation',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'クレームドヴィオレットが特徴の紫色のカクテル',
    ingredients: [
      { name: 'ジン', amount: '45', unit: 'ml' },
      { name: 'マラスキーノリキュール', amount: '15', unit: 'ml' },
      { name: 'クレームドヴィオレット', amount: '7.5', unit: 'ml' },
      { name: 'レモンジュース', amount: '22.5', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ',
      'チェリーで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'フローラル', '酸味']
  },
  {
    id: '52',
    name: 'ボールバー',
    nameEn: 'Boulevard',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'バーボンベースのビターカクテル',
    ingredients: [
      { name: 'バーボンウイスキー', amount: '30', unit: 'ml' },
      { name: 'ドライベルモット', amount: '30', unit: 'ml' },
      { name: 'カンパリ', amount: '30', unit: 'ml' },
      { name: 'オレンジピール', amount: '1', unit: '片' }
    ],
    instructions: [
      'ミキシンググラスに氷と材料を入れる',
      'ステアする',
      'カクテルグラスに注ぐ',
      'オレンジピールで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['バーボン', 'ビター', 'ハーブ']
  },
  {
    id: '53',
    name: 'カチャーサソーダ',
    nameEn: 'Cachaça Soda',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ブラジルの蒸留酒カシャーサのシンプルな楽しみ方',
    ingredients: [
      { name: 'カシャーサ', amount: '60', unit: 'ml' },
      { name: 'ライムジュース', amount: '15', unit: 'ml' },
      { name: 'ソーダ水', amount: '適量' },
      { name: 'ライム', amount: '1', unit: 'くし切り' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'カシャーサとライムジュースを注ぐ',
      'ソーダ水で満たす',
      'ステアする',
      'ライムで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['カシャーサ', 'ライム', '爽やか']
  },
  {
    id: '54',
    name: 'チャイナブルー',
    nameEn: 'China Blue',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '鮮やかな青色が印象的なカクテル',
    ingredients: [
      { name: 'ライチリキュール', amount: '30', unit: 'ml' },
      { name: 'ブルーキュラソー', amount: '10', unit: 'ml' },
      { name: 'グレープフルーツジュース', amount: '45', unit: 'ml' },
      { name: 'トニックウォーター', amount: '適量' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'リキュールとジュースを注ぐ',
      'トニックウォーターで満たす',
      'ステアする'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'low',
    flavor: ['ライチ', 'シトラス', '爽やか']
  },
  {
    id: '55',
    name: 'ディサローノサワー',
    nameEn: 'Disaronno Sour',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'アマレットリキュールの酸味カクテル',
    ingredients: [
      { name: 'ディサローノ', amount: '60', unit: 'ml' },
      { name: 'レモンジュース', amount: '30', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '15', unit: 'ml' },
      { name: '卵白', amount: '1', unit: '個分' }
    ],
    instructions: [
      'シェーカーに材料を入れて空シェイク',
      '氷を加えて再度シェイク',
      'ロックグラスに注ぐ',
      'チェリーで飾る'
    ],
    glass: 'ロックグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['アーモンド', '酸味', 'クリーミー']
  },
  {
    id: '56',
    name: 'エルディアブロ',
    nameEn: 'El Diablo',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'テキーラとカシスの悪魔的カクテル',
    ingredients: [
      { name: 'テキーラ', amount: '45', unit: 'ml' },
      { name: 'クレームドカシス', amount: '15', unit: 'ml' },
      { name: 'ライムジュース', amount: '15', unit: 'ml' },
      { name: 'ジンジャービア', amount: '適量' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'テキーラ、カシス、ライムジュースを注ぐ',
      'ジンジャービアで満たす',
      'ステアする',
      'ライムで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['テキーラ', 'カシス', 'ジンジャー']
  },
  {
    id: '57',
    name: 'フィズ',
    nameEn: 'Gin Fizz',
    image: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンベースの泡立つカクテル',
    ingredients: [
      { name: 'ジン', amount: '45', unit: 'ml' },
      { name: 'レモンジュース', amount: '30', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '10', unit: 'ml' },
      { name: 'ソーダ水', amount: '適量' }
    ],
    instructions: [
      'シェーカーに材料（ソーダ水以外）と氷を入れる',
      'シェイクする',
      'タンブラーグラスに注ぐ',
      'ソーダ水をトップ'
    ],
    glass: 'タンブラーグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'レモン', '泡立ち']
  },
  {
    id: '58',
    name: 'ゴールドラッシュ',
    nameEn: 'Gold Rush',
    image: 'https://images.unsplash.com/photo-1606762899601-16a0b47c2c79?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'バーボンとハチミツのモダンカクテル',
    ingredients: [
      { name: 'バーボンウイスキー', amount: '60', unit: 'ml' },
      { name: 'レモンジュース', amount: '22.5', unit: 'ml' },
      { name: 'ハチミツシロップ', amount: '22.5', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'ロックグラスに注ぐ'
    ],
    glass: 'ロックグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['バーボン', 'ハチミツ', 'レモン']
  },
  {
    id: '59',
    name: 'ハンキーパンキー',
    nameEn: 'Hanky Panky',
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンとフェルネットブランカのクラシック',
    ingredients: [
      { name: 'ジン', amount: '45', unit: 'ml' },
      { name: 'スイートベルモット', amount: '45', unit: 'ml' },
      { name: 'フェルネットブランカ', amount: '7.5', unit: 'ml' },
      { name: 'オレンジピール', amount: '1', unit: '片' }
    ],
    instructions: [
      'ミキシンググラスに材料と氷を入れる',
      'ステアする',
      'カクテルグラスに注ぐ',
      'オレンジピールで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ジン', 'ハーブ', 'ビター']
  },
  {
    id: '60',
    name: 'アイスピック',
    nameEn: 'Ice Pick',
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ウォッカとアイスティーの組み合わせ',
    ingredients: [
      { name: 'ウォッカ', amount: '60', unit: 'ml' },
      { name: 'アイスティー', amount: '120', unit: 'ml' },
      { name: 'レモンジュース', amount: '15', unit: 'ml' },
      { name: 'レモンスライス', amount: '1', unit: '枚' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      '材料を全て注ぐ',
      'ステアする',
      'レモンスライスで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ウォッカ', 'ティー', 'レモン']
  },
  {
    id: '61',
    name: 'ジャングルバード',
    nameEn: 'Jungle Bird',
    image: 'https://images.unsplash.com/photo-1582818833087-9bdf6ab2bb0f?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ラムとカンパリのトロピカルカクテル',
    ingredients: [
      { name: 'ダークラム', amount: '45', unit: 'ml' },
      { name: 'カンパリ', amount: '22.5', unit: 'ml' },
      { name: 'パイナップルジュース', amount: '45', unit: 'ml' },
      { name: 'ライムジュース', amount: '15', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '7.5', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'ロックグラスに注ぐ',
      'パイナップルで飾る'
    ],
    glass: 'ロックグラス',
    category: 'ティキカクテル',
    alcoholContent: 'medium',
    flavor: ['ラム', 'ビター', 'トロピカル']
  },
  {
    id: '62',
    name: 'キューバリブレ',
    nameEn: 'Cuba Libre',
    image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ラムコークにライムを加えたカクテル',
    ingredients: [
      { name: 'ホワイトラム', amount: '50', unit: 'ml' },
      { name: 'コーラ', amount: '120', unit: 'ml' },
      { name: 'ライムジュース', amount: '10', unit: 'ml' },
      { name: 'ライム', amount: '1', unit: 'くし切り' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'ラムとライムジュースを注ぐ',
      'コーラで満たす',
      'ステアする',
      'ライムで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ラム', 'コーラ', 'ライム']
  },
  {
    id: '63',
    name: 'リンチバーグレモネード',
    nameEn: 'Lynchburg Lemonade',
    image: 'https://images.unsplash.com/photo-1541855493-0ee1394b1d1e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジャックダニエルズを使ったレモネード',
    ingredients: [
      { name: 'ジャックダニエルズ', amount: '45', unit: 'ml' },
      { name: 'コアントロー', amount: '15', unit: 'ml' },
      { name: 'レモンジュース', amount: '30', unit: 'ml' },
      { name: 'レモンライムソーダ', amount: '適量' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'ウイスキー、コアントロー、レモンジュースを注ぐ',
      'レモンライムソーダで満たす',
      'ステアする',
      'レモンスライスで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ウイスキー', 'レモン', '爽やか']
  },
  {
    id: '64',
    name: 'メキシカンマティーニ',
    nameEn: 'Mexican Martini',
    image: 'https://images.unsplash.com/photo-1574095855929-2cec6ab7af69?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'テキーラベースのマティーニスタイル',
    ingredients: [
      { name: 'テキーラ', amount: '60', unit: 'ml' },
      { name: 'コアントロー', amount: '30', unit: 'ml' },
      { name: 'ライムジュース', amount: '30', unit: 'ml' },
      { name: 'オリーブブライン', amount: '15', unit: 'ml' },
      { name: 'オリーブ', amount: '2', unit: '個' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'マティーニグラスに注ぐ',
      'オリーブで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['テキーラ', 'ライム', '塩味']
  },
  {
    id: '65',
    name: 'ノックアウト',
    nameEn: 'Knockout',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンとアブサンの強力なカクテル',
    ingredients: [
      { name: 'ジン', amount: '30', unit: 'ml' },
      { name: 'ドライベルモット', amount: '30', unit: 'ml' },
      { name: 'アブサン', amount: '7.5', unit: 'ml' },
      { name: 'クレームドマント', amount: '7.5', unit: 'ml' },
      { name: 'レモンピール', amount: '1', unit: '片' }
    ],
    instructions: [
      'ミキシンググラスに材料と氷を入れる',
      'ステアする',
      'カクテルグラスに注ぐ',
      'レモンピールで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ジン', 'アニス', 'ミント']
  },
  {
    id: '66',
    name: 'オパール',
    nameEn: 'Opal',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンとオレンジの華やかなカクテル',
    ingredients: [
      { name: 'ジン', amount: '30', unit: 'ml' },
      { name: 'コアントロー', amount: '15', unit: 'ml' },
      { name: 'オレンジジュース', amount: '30', unit: 'ml' },
      { name: 'オレンジフラワーウォーター', amount: '2', unit: 'dash' },
      { name: '砂糖', amount: '1', unit: 'tsp' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'オレンジ', 'フローラル']
  },
  {
    id: '67',
    name: 'パラダイス',
    nameEn: 'Paradise',
    image: 'https://images.unsplash.com/photo-1561651188-d207bbec0088?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンとアプリコットブランデーのカクテル',
    ingredients: [
      { name: 'ジン', amount: '30', unit: 'ml' },
      { name: 'アプリコットブランデー', amount: '20', unit: 'ml' },
      { name: 'オレンジジュース', amount: '15', unit: 'ml' },
      { name: 'レモンジュース', amount: '5', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'アプリコット', 'フルーティー']
  },
  {
    id: '68',
    name: 'クイーンズパークスウィズル',
    nameEn: "Queen's Park Swizzle",
    image: 'https://images.unsplash.com/photo-1586116593897-d2e7d46fc6a0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'トリニダード発祥のラムカクテル',
    ingredients: [
      { name: 'デメララララム', amount: '60', unit: 'ml' },
      { name: 'ライムジュース', amount: '30', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '15', unit: 'ml' },
      { name: 'ミントの葉', amount: '8-10', unit: '枚' },
      { name: 'アンゴスチュラビターズ', amount: '2', unit: 'dash' }
    ],
    instructions: [
      'コリンズグラスにミントと砂糖を入れて軽くつぶす',
      'クラッシュアイスを入れる',
      'ラムとライムジュースを注ぐ',
      'スウィズルスティックで混ぜる',
      'ビターズをトップ'
    ],
    glass: 'コリンズグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ラム', 'ミント', 'ライム']
  },
  {
    id: '69',
    name: 'レッドスナッパー',
    nameEn: 'Red Snapper',
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンベースのブラッディマリー',
    ingredients: [
      { name: 'ジン', amount: '45', unit: 'ml' },
      { name: 'トマトジュース', amount: '90', unit: 'ml' },
      { name: 'レモンジュース', amount: '15', unit: 'ml' },
      { name: 'ウスターソース', amount: '2-3', unit: 'dash' },
      { name: 'タバスコ', amount: '2-3', unit: 'dash' },
      { name: '塩・胡椒', amount: '適量' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      '全ての材料を入れる',
      'よくステアする',
      'セロリスティックで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'トマト', 'スパイシー']
  },
  {
    id: '70',
    name: 'スティンガー',
    nameEn: 'Stinger',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ブランデーとミントリキュールのデザートカクテル',
    ingredients: [
      { name: 'ブランデー', amount: '50', unit: 'ml' },
      { name: 'ホワイトクレームドマント', amount: '20', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ブランデー', 'ミント', '甘い']
  },
  {
    id: '71',
    name: 'トリニダードサワー',
    nameEn: 'Trinidad Sour',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'アンゴスチュラビターズがベースの珍しいカクテル',
    ingredients: [
      { name: 'アンゴスチュラビターズ', amount: '30', unit: 'ml' },
      { name: 'オルジェーシロップ', amount: '30', unit: 'ml' },
      { name: 'レモンジュース', amount: '22.5', unit: 'ml' },
      { name: 'ライウイスキー', amount: '15', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ビターズ', 'アーモンド', '酸味']
  },
  {
    id: '72',
    name: 'アルティメットマイタイ',
    nameEn: 'Ultimate Mai Tai',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '複数のラムを使った贅沢なマイタイ',
    ingredients: [
      { name: 'ジャマイカンラム', amount: '30', unit: 'ml' },
      { name: 'マルティニークラム', amount: '30', unit: 'ml' },
      { name: 'オレンジキュラソー', amount: '15', unit: 'ml' },
      { name: 'オルジェーシロップ', amount: '10', unit: 'ml' },
      { name: 'ライムジュース', amount: '30', unit: 'ml' },
      { name: 'シンプルシロップ', amount: '7.5', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'ダブルロックグラスに注ぐ',
      'ミントとライムで飾る'
    ],
    glass: 'ダブルロックグラス',
    category: 'ティキカクテル',
    alcoholContent: 'high',
    flavor: ['ラム', 'トロピカル', '複雑']
  },
  {
    id: '73',
    name: 'ヴュー・カレ',
    nameEn: 'Vieux Carré',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ニューオーリンズ発祥のウイスキーカクテル',
    ingredients: [
      { name: 'ライウイスキー', amount: '30', unit: 'ml' },
      { name: 'コニャック', amount: '30', unit: 'ml' },
      { name: 'スイートベルモット', amount: '30', unit: 'ml' },
      { name: 'ベネディクティン', amount: '7.5', unit: 'ml' },
      { name: 'ペイショーズビターズ', amount: '2', unit: 'dash' },
      { name: 'アンゴスチュラビターズ', amount: '2', unit: 'dash' }
    ],
    instructions: [
      'ミキシンググラスに材料と氷を入れる',
      'ステアする',
      'ロックグラスに注ぐ',
      'レモンピールで飾る'
    ],
    glass: 'ロックグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ウイスキー', 'コニャック', '複雑']
  },
  {
    id: '74',
    name: 'ウォーターメロンマティーニ',
    nameEn: 'Watermelon Martini',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'スイカを使った夏のカクテル',
    ingredients: [
      { name: 'ウォッカ', amount: '60', unit: 'ml' },
      { name: 'スイカジュース', amount: '60', unit: 'ml' },
      { name: 'ライムジュース', amount: '15', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '10', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ',
      'スイカの一片で飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ウォッカ', 'スイカ', '爽やか']
  },
  {
    id: '75',
    name: 'エックスワイジー',
    nameEn: 'XYZ',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'アルファベットの最後を冠したラムカクテル',
    ingredients: [
      { name: 'ホワイトラム', amount: '30', unit: 'ml' },
      { name: 'コアントロー', amount: '30', unit: 'ml' },
      { name: 'レモンジュース', amount: '30', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ラム', 'オレンジ', '酸味']
  },
  {
    id: '76',
    name: 'イエローバード',
    nameEn: 'Yellow Bird',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '黄色が美しいトロピカルカクテル',
    ingredients: [
      { name: 'ホワイトラム', amount: '30', unit: 'ml' },
      { name: 'ガリアーノ', amount: '15', unit: 'ml' },
      { name: 'コアントロー', amount: '15', unit: 'ml' },
      { name: 'ライムジュース', amount: '15', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ラム', 'ハーブ', 'シトラス']
  },
  {
    id: '77',
    name: 'ゾンビ',
    nameEn: 'Zombie',
    image: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '複数のラムを使った強力なティキカクテル',
    ingredients: [
      { name: 'ホワイトラム', amount: '30', unit: 'ml' },
      { name: 'ゴールドラム', amount: '30', unit: 'ml' },
      { name: 'ダークラム', amount: '30', unit: 'ml' },
      { name: 'アプリコットブランデー', amount: '15', unit: 'ml' },
      { name: 'パイナップルジュース', amount: '30', unit: 'ml' },
      { name: 'ライムジュース', amount: '30', unit: 'ml' },
      { name: 'グレナディンシロップ', amount: '10', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'ハリケーングラスに注ぐ',
      'フルーツで豪華に飾る'
    ],
    glass: 'ハリケーングラス',
    category: 'ティキカクテル',
    alcoholContent: 'high',
    flavor: ['ラム', 'トロピカル', '複雑']
  },
  {
    id: '78',
    name: 'アラスカ',
    nameEn: 'Alaska',
    image: 'https://images.unsplash.com/photo-1606762899601-16a0b47c2c79?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンとシャルトリューズの強いカクテル',
    ingredients: [
      { name: 'ジン', amount: '60', unit: 'ml' },
      { name: 'シャルトリューズジョーヌ', amount: '15', unit: 'ml' },
      { name: 'オレンジビターズ', amount: '2', unit: 'dash' }
    ],
    instructions: [
      'ミキシンググラスに材料と氷を入れる',
      'ステアする',
      'カクテルグラスに注ぐ',
      'レモンピールで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ジン', 'ハーブ', '強い']
  },
  {
    id: '79',
    name: 'バンブー',
    nameEn: 'Bamboo',
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '日本生まれのシェリーカクテル',
    ingredients: [
      { name: 'ドライシェリー', amount: '45', unit: 'ml' },
      { name: 'ドライベルモット', amount: '45', unit: 'ml' },
      { name: 'オレンジビターズ', amount: '2', unit: 'dash' },
      { name: 'アンゴスチュラビターズ', amount: '1', unit: 'dash' }
    ],
    instructions: [
      'ミキシンググラスに材料と氷を入れる',
      'ステアする',
      'カクテルグラスに注ぐ',
      'レモンピールで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'low',
    flavor: ['シェリー', 'ドライ', '軽い']
  },
  {
    id: '80',
    name: 'カーディナル',
    nameEn: 'Cardinal',
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンとカンパリの赤いカクテル',
    ingredients: [
      { name: 'ジン', amount: '45', unit: 'ml' },
      { name: 'カンパリ', amount: '15', unit: 'ml' },
      { name: 'ドライベルモット', amount: '15', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'ビター', 'ハーブ']
  },
  {
    id: '81',
    name: 'ドゥボネカクテル',
    nameEn: 'Dubonnet Cocktail',
    image: 'https://images.unsplash.com/photo-1582818833087-9bdf6ab2bb0f?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ドゥボネとジンのクラシック',
    ingredients: [
      { name: 'ドゥボネルージュ', amount: '45', unit: 'ml' },
      { name: 'ジン', amount: '45', unit: 'ml' },
      { name: 'オレンジビターズ', amount: '1', unit: 'dash' },
      { name: 'レモンピール', amount: '1', unit: '片' }
    ],
    instructions: [
      'ミキシンググラスに材料と氷を入れる',
      'ステアする',
      'カクテルグラスに注ぐ',
      'レモンピールで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ワイン', 'ジン', 'ハーブ']
  },
  {
    id: '82',
    name: 'イーストインディア',
    nameEn: 'East India',
    image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ブランデーとパイナップルのカクテル',
    ingredients: [
      { name: 'ブランデー', amount: '45', unit: 'ml' },
      { name: 'オレンジキュラソー', amount: '15', unit: 'ml' },
      { name: 'パイナップルジュース', amount: '15', unit: 'ml' },
      { name: 'アンゴスチュラビターズ', amount: '2', unit: 'dash' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ',
      'チェリーで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ブランデー', 'パイナップル', 'フルーティー']
  },
  {
    id: '83',
    name: 'フォグカッター',
    nameEn: 'Fog Cutter',
    image: 'https://images.unsplash.com/photo-1541855493-0ee1394b1d1e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '霧を切り裂くほど強いティキカクテル',
    ingredients: [
      { name: 'ホワイトラム', amount: '30', unit: 'ml' },
      { name: 'ジン', amount: '15', unit: 'ml' },
      { name: 'ブランデー', amount: '15', unit: 'ml' },
      { name: 'オレンジジュース', amount: '60', unit: 'ml' },
      { name: 'レモンジュース', amount: '30', unit: 'ml' },
      { name: 'オルジェーシロップ', amount: '15', unit: 'ml' },
      { name: 'シェリー', amount: '15', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料（シェリー以外）と氷を入れる',
      'よくシェイクする',
      'コリンズグラスに注ぐ',
      'シェリーをフロートする'
    ],
    glass: 'コリンズグラス',
    category: 'ティキカクテル',
    alcoholContent: 'high',
    flavor: ['複雑', 'フルーティー', '強い']
  },
  {
    id: '84',
    name: 'グラスホッパー',
    nameEn: 'Grasshopper',
    image: 'https://images.unsplash.com/photo-1574095855929-2cec6ab7af69?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '緑色のデザートカクテル',
    ingredients: [
      { name: 'グリーンクレームドマント', amount: '30', unit: 'ml' },
      { name: 'ホワイトクレームドカカオ', amount: '30', unit: 'ml' },
      { name: '生クリーム', amount: '30', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'low',
    flavor: ['ミント', 'チョコレート', 'クリーミー']
  },
  {
    id: '85',
    name: 'ホースズネック',
    nameEn: "Horse's Neck",
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ブランデーとジンジャーエールのロングカクテル',
    ingredients: [
      { name: 'ブランデー', amount: '60', unit: 'ml' },
      { name: 'ジンジャーエール', amount: '適量' },
      { name: 'レモンピール', amount: '1', unit: '長い螺旋状' },
      { name: 'アンゴスチュラビターズ', amount: '2', unit: 'dash' }
    ],
    instructions: [
      'ハイボールグラスにレモンピールを螺旋状に入れる',
      '氷を加える',
      'ブランデーとビターズを注ぐ',
      'ジンジャーエールで満たす'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ブランデー', 'ジンジャー', 'レモン']
  },
  {
    id: '86',
    name: 'インペリアル',
    nameEn: 'Imperial',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンとベルモットの王室風カクテル',
    ingredients: [
      { name: 'ジン', amount: '45', unit: 'ml' },
      { name: 'ドライベルモット', amount: '45', unit: 'ml' },
      { name: 'マラスキーノリキュール', amount: '5', unit: 'ml' },
      { name: 'アンゴスチュラビターズ', amount: '2', unit: 'dash' }
    ],
    instructions: [
      'ミキシンググラスに材料と氷を入れる',
      'ステアする',
      'カクテルグラスに注ぐ',
      'チェリーで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'ドライ', 'チェリー']
  },
  {
    id: '87',
    name: 'ジャックローズ',
    nameEn: 'Jack Rose',
    image: 'https://images.unsplash.com/photo-1561651188-d207bbec0088?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'アップルジャックを使ったピンクのカクテル',
    ingredients: [
      { name: 'アップルジャック', amount: '60', unit: 'ml' },
      { name: 'レモンジュース', amount: '20', unit: 'ml' },
      { name: 'グレナディンシロップ', amount: '15', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['アップル', '酸味', '甘い']
  },
  {
    id: '88',
    name: 'キールロワイヤル',
    nameEn: 'Kir Royale',
    image: 'https://images.unsplash.com/photo-1586116593897-d2e7d46fc6a0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'カシスとシャンパンのエレガントなカクテル',
    ingredients: [
      { name: 'クレームドカシス', amount: '15', unit: 'ml' },
      { name: 'シャンパン', amount: '適量' }
    ],
    instructions: [
      'シャンパングラスにカシスを注ぐ',
      '冷えたシャンパンをゆっくり注ぐ',
      '軽くステアする'
    ],
    glass: 'シャンパングラス',
    category: 'スパークリングカクテル',
    alcoholContent: 'low',
    flavor: ['カシス', 'シャンパン', 'エレガント']
  },
  {
    id: '89',
    name: 'リンデンツリー',
    nameEn: 'Linden Tree',
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ハーブリキュールを使った爽やかなカクテル',
    ingredients: [
      { name: 'ジン', amount: '45', unit: 'ml' },
      { name: 'セントジャーメイン', amount: '15', unit: 'ml' },
      { name: 'ライムジュース', amount: '15', unit: 'ml' },
      { name: 'トニックウォーター', amount: '適量' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'ジン、セントジャーメイン、ライムジュースを注ぐ',
      'トニックウォーターで満たす',
      'ステアする',
      'ライムで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ロングカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'エルダーフラワー', '爽やか']
  },
  {
    id: '90',
    name: 'メアリーピックフォード',
    nameEn: 'Mary Pickford',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '女優の名を冠したラムカクテル',
    ingredients: [
      { name: 'ホワイトラム', amount: '60', unit: 'ml' },
      { name: 'パイナップルジュース', amount: '60', unit: 'ml' },
      { name: 'グレナディンシロップ', amount: '10', unit: 'ml' },
      { name: 'マラスキーノリキュール', amount: '5', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ',
      'チェリーで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ラム', 'パイナップル', '甘い']
  },
  {
    id: '91',
    name: 'ニューヨークサワー',
    nameEn: 'New York Sour',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '赤ワインをフロートしたウイスキーサワー',
    ingredients: [
      { name: 'バーボンウイスキー', amount: '60', unit: 'ml' },
      { name: 'レモンジュース', amount: '30', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '15', unit: 'ml' },
      { name: '赤ワイン', amount: '15', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料（赤ワイン以外）と氷を入れる',
      'シェイクする',
      'ロックグラスに注ぐ',
      '赤ワインをフロートする'
    ],
    glass: 'ロックグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ウイスキー', '酸味', 'ワイン']
  },
  {
    id: '92',
    name: 'オリンピック',
    nameEn: 'Olympic',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ブランデーとオレンジのクラシックカクテル',
    ingredients: [
      { name: 'ブランデー', amount: '30', unit: 'ml' },
      { name: 'オレンジキュラソー', amount: '30', unit: 'ml' },
      { name: 'オレンジジュース', amount: '30', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ブランデー', 'オレンジ', 'フルーティー']
  },
  {
    id: '93',
    name: 'ピンクジン',
    nameEn: 'Pink Gin',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンとビターズのシンプルなカクテル',
    ingredients: [
      { name: 'ジン', amount: '60', unit: 'ml' },
      { name: 'アンゴスチュラビターズ', amount: '3-4', unit: 'dash' }
    ],
    instructions: [
      'カクテルグラスにビターズを入れて回す',
      '余分なビターズを捨てる',
      '冷やしたジンを注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['ジン', 'ビター', 'ドライ']
  },
  {
    id: '94',
    name: 'クォーターデック',
    nameEn: 'Quarterdeck',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ラムとシェリーの海軍風カクテル',
    ingredients: [
      { name: 'ダークラム', amount: '45', unit: 'ml' },
      { name: 'ドライシェリー', amount: '30', unit: 'ml' },
      { name: 'ライムジュース', amount: '15', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ラム', 'シェリー', 'ライム']
  },
  {
    id: '95',
    name: 'ラッスルネイル',
    nameEn: 'Rusty Nail',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'スコッチとドランブイのシンプルなカクテル',
    ingredients: [
      { name: 'スコッチウイスキー', amount: '45', unit: 'ml' },
      { name: 'ドランブイ', amount: '25', unit: 'ml' },
      { name: 'レモンピール', amount: '1', unit: '片' }
    ],
    instructions: [
      'ロックグラスに氷を入れる',
      'スコッチとドランブイを注ぐ',
      'ステアする',
      'レモンピールで飾る'
    ],
    glass: 'ロックグラス',
    category: 'ショートカクテル',
    alcoholContent: 'high',
    flavor: ['スコッチ', 'ハチミツ', 'ハーブ']
  },
  {
    id: '96',
    name: 'スロージンフィズ',
    nameEn: 'Sloe Gin Fizz',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'スロージンを使った泡立つカクテル',
    ingredients: [
      { name: 'スロージン', amount: '60', unit: 'ml' },
      { name: 'レモンジュース', amount: '30', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '10', unit: 'ml' },
      { name: 'ソーダ水', amount: '適量' }
    ],
    instructions: [
      'シェーカーに材料（ソーダ水以外）と氷を入れる',
      'シェイクする',
      'コリンズグラスに注ぐ',
      'ソーダ水をトップ'
    ],
    glass: 'コリンズグラス',
    category: 'ロングカクテル',
    alcoholContent: 'low',
    flavor: ['スロー', 'レモン', '泡立ち']
  },
  {
    id: '97',
    name: 'タンゴ',
    nameEn: 'Tango',
    image: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ジンとオレンジの情熱的なカクテル',
    ingredients: [
      { name: 'ジン', amount: '30', unit: 'ml' },
      { name: 'スイートベルモット', amount: '15', unit: 'ml' },
      { name: 'ドライベルモット', amount: '15', unit: 'ml' },
      { name: 'オレンジジュース', amount: '30', unit: 'ml' },
      { name: 'オレンジキュラソー', amount: '5', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ジン', 'オレンジ', 'ベルモット']
  },
  {
    id: '98',
    name: 'アップタウン',
    nameEn: 'Uptown',
    image: 'https://images.unsplash.com/photo-1606762899601-16a0b47c2c79?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'バーボンとアマレットの都会的カクテル',
    ingredients: [
      { name: 'バーボンウイスキー', amount: '45', unit: 'ml' },
      { name: 'アマレット', amount: '30', unit: 'ml' },
      { name: 'オレンジジュース', amount: '60', unit: 'ml' },
      { name: 'アンゴスチュラビターズ', amount: '2', unit: 'dash' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'ロックグラスに注ぐ',
      'オレンジスライスで飾る'
    ],
    glass: 'ロックグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['バーボン', 'アーモンド', 'オレンジ']
  },
  {
    id: '99',
    name: 'ベネチアンサンセット',
    nameEn: 'Venetian Sunset',
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'グラッパとオレンジの夕焼けカクテル',
    ingredients: [
      { name: 'グラッパ', amount: '45', unit: 'ml' },
      { name: 'アペロール', amount: '30', unit: 'ml' },
      { name: 'オレンジジュース', amount: '30', unit: 'ml' },
      { name: 'レモンジュース', amount: '15', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ',
      'オレンジピールで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['グラッパ', 'ビター', 'オレンジ']
  },
  {
    id: '100',
    name: 'ホワイトロシアン',
    nameEn: 'White Russian',
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ウォッカとコーヒーリキュールのクリーミーカクテル',
    ingredients: [
      { name: 'ウォッカ', amount: '40', unit: 'ml' },
      { name: 'コーヒーリキュール', amount: '20', unit: 'ml' },
      { name: '生クリーム', amount: '30', unit: 'ml' }
    ],
    instructions: [
      'ロックグラスに氷を入れる',
      'ウォッカとコーヒーリキュールを注ぐ',
      'ステアする',
      '生クリームをフロートする'
    ],
    glass: 'ロックグラス',
    category: 'ショートカクテル',
    alcoholContent: 'medium',
    flavor: ['ウォッカ', 'コーヒー', 'クリーミー']
  },
  {
    id: '101',
    name: 'ヴァージンモヒート',
    nameEn: 'Virgin Mojito',
    image: 'https://images.unsplash.com/photo-1582818833087-9bdf6ab2bb0f?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ラムを使わない爽やかなノンアルコールモヒート',
    ingredients: [
      { name: 'ミントの葉', amount: '8-10', unit: '枚' },
      { name: 'ライムジュース', amount: '30', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '20', unit: 'ml' },
      { name: 'ソーダ水', amount: '適量' },
      { name: 'ライム', amount: '1', unit: 'くし切り' }
    ],
    instructions: [
      'グラスにミントの葉とシュガーシロップを入れて軽くつぶす',
      'ライムジュースを加える',
      'クラッシュアイスを入れる',
      'ソーダ水で満たす',
      '軽くステアして完成',
      'ライムとミントで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ノンアルコールカクテル',
    alcoholContent: 'non-alcoholic',
    flavor: ['ミント', 'ライム', '爽やか']
  },
  {
    id: '102',
    name: 'シンデレラ',
    nameEn: 'Cinderella',
    image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'フルーツジュースを組み合わせた魔法のノンアルコールカクテル',
    ingredients: [
      { name: 'オレンジジュース', amount: '30', unit: 'ml' },
      { name: 'レモンジュース', amount: '30', unit: 'ml' },
      { name: 'パイナップルジュース', amount: '30', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ'
    ],
    glass: 'カクテルグラス',
    category: 'ノンアルコールカクテル',
    alcoholContent: 'non-alcoholic',
    flavor: ['オレンジ', 'パイナップル', 'フルーティー']
  },
  {
    id: '103',
    name: 'シャーリーテンプル',
    nameEn: 'Shirley Temple',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '子役女優の名前を冠したジンジャーエールベースのカクテル',
    ingredients: [
      { name: 'ジンジャーエール', amount: '180', unit: 'ml' },
      { name: 'グレナディンシロップ', amount: '20', unit: 'ml' },
      { name: 'ライムジュース', amount: '5', unit: 'ml' },
      { name: 'チェリー', amount: '1', unit: '個' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'ジンジャーエールを注ぐ',
      'ライムジュースを加える',
      'グレナディンシロップをゆっくり注いでグラデーションを作る',
      'チェリーで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ノンアルコールカクテル',
    alcoholContent: 'non-alcoholic',
    flavor: ['ジンジャー', 'チェリー', '甘い']
  },
  {
    id: '104',
    name: 'サラトガクーラー',
    nameEn: 'Saratoga Cooler',
    image: 'https://images.unsplash.com/photo-1574095855929-2cec6ab7af69?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ライムとジンジャーエールの爽やかなノンアルコールカクテル',
    ingredients: [
      { name: 'ライムジュース', amount: '20', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '5', unit: 'ml' },
      { name: 'ジンジャーエール', amount: '250', unit: 'ml' },
      { name: 'ライム', amount: '1', unit: 'くし切り' }
    ],
    instructions: [
      'グラスにクラッシュアイスを入れる',
      'ライムジュースとシュガーシロップを注ぐ',
      'ジンジャーエールを注ぐ',
      'ステアする',
      'ライムで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ノンアルコールカクテル',
    alcoholContent: 'non-alcoholic',
    flavor: ['ライム', 'ジンジャー', '爽やか']
  },
  {
    id: '105',
    name: 'フロリダ',
    nameEn: 'Florida',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'フロリダ産の柑橘類をふんだんに使ったノンアルコールカクテル',
    ingredients: [
      { name: 'オレンジジュース', amount: '60', unit: 'ml' },
      { name: 'レモンジュース', amount: '30', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '5', unit: 'ml' },
      { name: 'アンゴスチュラビターズ', amount: '2', unit: 'dash' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ',
      'オレンジスライスで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ノンアルコールカクテル',
    alcoholContent: 'non-alcoholic',
    flavor: ['オレンジ', 'レモン', 'シトラス']
  },
  {
    id: '106',
    name: 'ヴァージンメアリー',
    nameEn: 'Virgin Mary',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ウォッカを使わないブラッディマリー',
    ingredients: [
      { name: 'トマトジュース', amount: '120', unit: 'ml' },
      { name: 'レモンジュース', amount: '10', unit: 'ml' },
      { name: 'ウスターソース', amount: '5', unit: 'dash' },
      { name: 'タバスコ', amount: '5', unit: 'dash' },
      { name: '塩・胡椒', amount: '適量' },
      { name: 'セロリ', amount: '1', unit: '本' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'トマトジュースを注ぐ',
      'レモンジュース、ウスターソース、タバスコを加える',
      '塩・胡椒で味を調える',
      'よくステアする',
      'セロリスティックで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ノンアルコールカクテル',
    alcoholContent: 'non-alcoholic',
    flavor: ['トマト', 'スパイシー', '塩味']
  },
  {
    id: '107',
    name: 'ヴァージンブリーズ',
    nameEn: 'Virgin Breeze',
    image: 'https://images.unsplash.com/photo-1561651188-d207bbec0088?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ピンク色が美しいグレープフルーツとクランベリーのカクテル',
    ingredients: [
      { name: 'グレープフルーツジュース', amount: '60', unit: 'ml' },
      { name: 'クランベリージュース', amount: '30', unit: 'ml' },
      { name: 'ライムジュース', amount: '10', unit: 'ml' }
    ],
    instructions: [
      'シェーカーに材料と氷を入れる',
      'よくシェイクする',
      'カクテルグラスに注ぐ',
      'ライムホイールで飾る'
    ],
    glass: 'カクテルグラス',
    category: 'ノンアルコールカクテル',
    alcoholContent: 'non-alcoholic',
    flavor: ['グレープフルーツ', 'クランベリー', '酸味']
  },
  {
    id: '108',
    name: 'ヴァージンピニャコラーダ',
    nameEn: 'Virgin Piña Colada',
    image: 'https://images.unsplash.com/photo-1586116593897-d2e7d46fc6a0?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'ラムを使わないトロピカルなココナッツとパイナップルのカクテル',
    ingredients: [
      { name: 'ココナッツクリーム', amount: '30', unit: 'ml' },
      { name: 'パイナップルジュース', amount: '90', unit: 'ml' },
      { name: 'ライムジュース', amount: '10', unit: 'ml' },
      { name: 'クラッシュアイス', amount: '1', unit: 'カップ' }
    ],
    instructions: [
      'ブレンダーに全ての材料を入れる',
      'なめらかになるまでブレンドする',
      'ハリケーングラスに注ぐ',
      'パイナップルとチェリーで飾る'
    ],
    glass: 'ハリケーングラス',
    category: 'ノンアルコールカクテル',
    alcoholContent: 'non-alcoholic',
    flavor: ['ココナッツ', 'パイナップル', 'トロピカル']
  },
  {
    id: '109',
    name: 'アーノルドパーマー',
    nameEn: 'Arnold Palmer',
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: 'アイスティーとレモネードを混ぜた爽やかなドリンク',
    ingredients: [
      { name: 'アイスティー', amount: '90', unit: 'ml' },
      { name: 'レモネード', amount: '90', unit: 'ml' },
      { name: 'レモンスライス', amount: '1', unit: '枚' }
    ],
    instructions: [
      'ハイボールグラスに氷を入れる',
      'アイスティーを注ぐ',
      'レモネードを注ぐ',
      '軽くステアする',
      'レモンスライスで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ノンアルコールカクテル',
    alcoholContent: 'non-alcoholic',
    flavor: ['ティー', 'レモン', '爽やか']
  },
  {
    id: '110',
    name: 'スパイシージンジャーライム',
    nameEn: 'Spicy Ginger Lime',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    description: '生姜とライムのスパイシーで爽やかなカクテル',
    ingredients: [
      { name: '生姜', amount: '10', unit: 'g' },
      { name: 'ライムジュース', amount: '30', unit: 'ml' },
      { name: 'シュガーシロップ', amount: '20', unit: 'ml' },
      { name: 'ソーダ水', amount: '120', unit: 'ml' },
      { name: 'ライム', amount: '1', unit: 'くし切り' }
    ],
    instructions: [
      'グラスで生姜とシュガーシロップを軽くつぶす',
      'ライムジュースを加える',
      '氷を入れる',
      'ソーダ水で満たす',
      'よくステアする',
      'ライムで飾る'
    ],
    glass: 'ハイボールグラス',
    category: 'ノンアルコールカクテル',
    alcoholContent: 'non-alcoholic',
    flavor: ['ジンジャー', 'ライム', 'スパイシー']
  }
];