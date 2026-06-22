export interface RecommendationDetail {
  id: string;
  generatedAt: string;
  bmi: number;
  bodyType: string;

  items: RecommendationItem[];
}

export interface RecommendationItem {
  id: string;

  score: number;

  reasons: string[];

  aiResult: {
    advice: string;
    explanation: string;
    imageUrl: string | null;
  } | null;

  outfit: {
    id: string;
    name: string;

    style: {
      name: string;
    };

    occasion: {
      name: string;
    };

    bodyType: {
      name: string;
    };

    outfitItems: {
      role: string;

      fashionItem: {
        name: string;
      };
    }[];
  };
}

export interface LatestRecommendation {
  id: string;
  generatedAt: string;
  bmi: number;
  bodyType: string;

  items: {
    id: string;

    outfit: {
      name: string;
    };

    aiResult: {
      imageUrl: string | null;
    } | null;
  }[];
}