export interface Cocktail {
  id: string;
  name: string;
  nameEn: string;
  image?: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  glass: string;
  category: string;
  alcoholContent: string;
  flavor: string[];
  isOriginal?: boolean;
}

export interface Ingredient {
  name: string;
  amount: string;
  unit?: string;
}