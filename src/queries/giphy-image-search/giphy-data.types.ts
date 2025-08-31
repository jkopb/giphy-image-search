// Giphy API types based on official schema documentation
export interface GiphyImage {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size?: string;
  mp4?: string;
  webp_size?: string;
  webp?: string;
  frames?: string;
  hash?: string;
}

export interface GiphyImages {
  original: GiphyImage;
  downsized: GiphyImage;
  downsized_large: GiphyImage;
  downsized_medium: GiphyImage;
  downsized_small: GiphyImage;
  downsized_still: GiphyImage;
  fixed_height: GiphyImage;
  fixed_height_downsampled: GiphyImage;
  fixed_height_small: GiphyImage;
  fixed_height_small_still: GiphyImage;
  fixed_height_still: GiphyImage;
  fixed_width: GiphyImage;
  fixed_width_downsampled: GiphyImage;
  fixed_width_small: GiphyImage;
  fixed_width_small_still: GiphyImage;
  fixed_width_still: GiphyImage;
  looping: GiphyImage;
  original_still: GiphyImage;
  original_mp4: GiphyImage;
  preview: GiphyImage;
  preview_gif: GiphyImage;
  preview_webp: GiphyImage;
  "480w_still": GiphyImage;
}

export interface GiphyUser {
  avatar_url: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
}

export interface GiphyAnalytics {
  onload: { url: string };
  onclick: { url: string };
  onsent: { url: string };
}

export interface GiphyData {
  type: string;
  id: string;
  slug: string;
  url: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  source_caption: string;
  update_datetime: string;
  create_datetime: string;
  import_datetime: string;
  trending_datetime: string;
  images: GiphyImages;
  title: string;
  alt_text: string;
  is_low_contrast: boolean;
  is_sticker: number;
  user?: GiphyUser;
  analytics_response_payload: string;
  analytics: GiphyAnalytics;
}

export interface GiphyMeta {
  status: number;
  msg: string;
  response_id: string;
}

export interface GiphyPagination {
  offset: number;
  total_count: number;
  count: number;
}

export interface GiphyResponse {
  data: GiphyData[];
  meta: GiphyMeta;
  pagination: GiphyPagination;
}
    