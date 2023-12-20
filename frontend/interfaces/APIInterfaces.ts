export interface IAPIResponseItem {
  directors: string[];
  genres: IAPIResponseGenre[];
  imdbId: string;
  originalTitle: string;
  streamingInfo: IAPIResponseStreamingInfo[];
  title: string;
  tmdbId: number;
  type: string;
  year: number;
}

interface IAPIResponseGenre {
  id: number;
  name: string;
}

interface IAPIResponseStreamingInfo {
  us: IAPIResponseStreamingInfoCountry[];
}

interface IAPIResponseStreamingInfoCountry {
  audios: any; // Not being used currently
  availableSince: number;
  link: string;
  price: IAPIResponseStreamingInfoPrice;
  quality: string;
  service: string;
  streamingType: string;
  subtitles: any; // Not being used currently
}

interface IAPIResponseStreamingInfoPrice {
  amount: string;
  currency: string;
  formatted: string;
}
