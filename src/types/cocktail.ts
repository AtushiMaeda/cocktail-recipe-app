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
  userId?: string;
  canEdit?: boolean;
}

export interface Ingredient {
  name: string;
  amount: string;
  unit?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}