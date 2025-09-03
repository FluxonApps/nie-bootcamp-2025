export interface Adulterant {
  name?: string;
  healthImpact?: string;
}

export interface Ingredient {
  name: string;
  description?: string;
  type?: string;
  adulterants?: Adulterant[];
  quantity?: string;
}

export interface Concern {
  type?: string;
  description?: string;
  severity?: "Low" | "Medium" | "High";
}

export interface Features {
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
  vitamins?: string[];
  minerals?: string[];
  otherBenefits?: string[];
}

export interface Product {
  name: string;
  aliases?: string[];
  brand?: string;
  description?: string;
  category?: string;
  ingredients: Ingredient[];
  useCases?: string[];
  features?: Features;
  isApproved?: boolean;
  verdict?: string;
}
