export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  repo: string | null;
  tags: string[];
  isVisible: boolean;
  isPrivate: boolean;
  createdAt: Date;
};
