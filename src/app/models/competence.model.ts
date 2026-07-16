export type CategorieCompetence =
  | 'FRONTEND'
  | 'BACKEND'
  | 'MOBILE'
  | 'BASE_DE_DONNEES'
  | 'DEVOPS'
  | 'OUTIL'
  | 'LANGAGE';

export interface Competence {
  id: number;
  nom: string;
  categorie: CategorieCompetence;
  niveau: number;
}

export interface CompetenceRequest {
  nom: string;
  categorie: CategorieCompetence;
  niveau: number;
  ordreAffichage: number;
}