
export interface Usuario {
  id: number;
  name: string;
  email: string;
  roles: string[];
  enabled: boolean;
}


export interface Portfolio {
  id: number;
  userId: number;
  fullName: string;
  speciality: string;
  description: string;
  skills: string[];
  imageUrl?: string;
  githubUrl?: string;
}
