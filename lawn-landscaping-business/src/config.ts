interface Config {
  API_URL: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  MAX_ITEMS_PER_PAGE: number;
  DEFAULT_CURRENCY: string;
  DATE_FORMAT: string;
  // Add other configuration variables as needed
}

const config: Config = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY || '',
  MAX_ITEMS_PER_PAGE: 20,
  DEFAULT_CURRENCY: 'USD',
  DATE_FORMAT: 'YYYY-MM-DD',
  // Add other configuration values
};

export default config;
