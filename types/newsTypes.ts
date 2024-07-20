export interface NewsApiResponse {
    status: string;
    totalResults: number;
    results: {
      title: string;
      description: string;
      link: string;
    }[];
  }