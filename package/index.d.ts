export interface ClientOptions {
  cacheTTL?: number;
  cache?: {
    get(key: string): any | Promise<any>;
    set(key: string, value: any): void | Promise<void>;
  };
}

export interface ImageHelper {
  getUrl(path: string | null, size?: string): string | null;
}

export interface MovieNamespace {
  search(query: string, page?: number, language?: string): Promise<any>;
  getDetails(id: number, language?: string): Promise<any>;
  getPopular(page?: number, language?: string): Promise<any>;
  getTrending(timeWindow?: 'day' | 'week', page?: number, language?: string): Promise<any>;
  getUpcoming(page?: number, language?: string): Promise<any>;
  getNowPlaying(page?: number, language?: string): Promise<any>;
  getTopRated(page?: number, language?: string): Promise<any>;
  getGenres(language?: string): Promise<any>;
  discover(params?: any): Promise<any>;
  getWatchProviders(id: number, language?: string): Promise<any>;
  getSimilar(id: number, page?: number, language?: string): Promise<any>;
  getRecommendations(id: number, page?: number, language?: string): Promise<any>;
  getReviews(id: number, page?: number, language?: string): Promise<any>;
  getKeywords(id: number): Promise<any>;
}

export interface TVNamespace {
  search(query: string, page?: number, language?: string): Promise<any>;
  getDetails(id: number, language?: string): Promise<any>;
  getPopular(page?: number, language?: string): Promise<any>;
  getTopRated(page?: number, language?: string): Promise<any>;
  getTrending(timeWindow?: 'day' | 'week', page?: number, language?: string): Promise<any>;
  getAiringToday(page?: number, language?: string): Promise<any>;
  getOnTheAir(page?: number, language?: string): Promise<any>;
  getSeason(id: number, seasonNum: number, language?: string): Promise<any>;
  getEpisode(id: number, seasonNum: number, epNum: number, language?: string): Promise<any>;
  getWatchProviders(id: number, language?: string): Promise<any>;
  getGenres(language?: string): Promise<any>;
  discover(params?: any): Promise<any>;
}

export interface PeopleNamespace {
  search(query: string, page?: number, language?: string): Promise<any>;
  getDetails(id: number, language?: string): Promise<any>;
  getTrending(timeWindow?: 'day' | 'week', page?: number, language?: string): Promise<any>;
  getPopular(page?: number, language?: string): Promise<any>;
}

export declare class StreamingClient {
  constructor(apiKey: string, options?: ClientOptions);
  
  images: ImageHelper;
  movies: MovieNamespace;
  tv: TVNamespace;
  people: PeopleNamespace;
  search: {
    multi(query: string, page?: number, language?: string): Promise<any>;
    keyword(query: string, page?: number): Promise<any>;
    company(query: string, page?: number): Promise<any>;
  };
  collections: {
    getDetails(id: number, language?: string): Promise<any>;
    search(query: string, page?: number, language?: string): Promise<any>;
  };
  find: {
    byId(id: string, source: string, language?: string): Promise<any>;
  };
  configuration: {
    getAPIConfig(): Promise<any>;
    getCountries(): Promise<any>;
    getJobs(): Promise<any>;
    getLanguages(): Promise<any>;
    getPrimaryTranslations(): Promise<any>;
    getTimezones(): Promise<any>;
  };
  trending: {
    getAll(timeWindow?: 'day' | 'week', page?: number): Promise<any>;
  };
  utils: {
    getYouTubeTrailer(videos: any[]): string | null;
    getDirectors(credits: any): any[];
    paginate(method: Function, params?: any[], maxPages?: number): Promise<any[]>;
  };
}

export function createClient(apiKey: string, options?: ClientOptions): StreamingClient;
