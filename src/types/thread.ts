export interface Thread {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateThreadInput {
  title: string;
  content: string;
  author: string;
}
