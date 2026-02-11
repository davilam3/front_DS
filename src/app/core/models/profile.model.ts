export interface Educacion {
  titulo: string;
  descripcion: string;
}

export interface Experiencia {
  titulo: string;
  periodo: string;
  detalles: string[];
}

export interface Proyecto {
  titulo: string;
  anio: string;
  descripcion: string;
  enlace: string;
  github?: string;
}

export interface PerfilProgramador {
  id: number;
  nombre: string;
  especialidad: string;
  foto: string;

  correoEmpresarial: string;
  correoPersonal: string;
  telefono: string;
  ubicacion: string;

  github?: string;
  descripcion: string;

  horarios: string[];
  skills: string[];

  educacion: Educacion[];
  cursos: string[];
  idiomas: string[];

  experiencia: Experiencia[];
  proyectos: Proyecto[];
}
