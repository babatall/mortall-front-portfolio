export interface Projet {
  id: number;
  titre: string;
  description: string;
  technologies: string[];
  lienGithub: string;
  lienDemo: string;
  imageUrl: string;
  epingle: boolean;
  ordreAffichage: number;
}

export interface ProjetRequest {
  titre: string;
  description: string;
  technologies: string[];
  lienGithub: string;
  lienDemo: string;
  epingle: boolean;
  ordreAffichage: number;
}