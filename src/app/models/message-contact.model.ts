export interface MessageContact {
  id: number;
  nom: string;
  email: string;
  message: string;
  lu: boolean;
  dateEnvoi: string;
}

export interface MessageContactRequest {
  nom: string;
  email: string;
  message: string;
}