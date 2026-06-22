export interface Profile {
  id: string;
  userId: string;

  gender: string;
  age: number;

  height: number;
  weight: number;

  skinTone: string;
  budgetRange: string;

  favoriteColorId: string;
  preferredStyleId: string;

  favoriteColor: {
    id: string;
    name: string;
    hexCode: string;
  };

  preferredStyle: {
    id: string;
    name: string;
  };
}