/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {},
    'postcss-hexrgba': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    'postcss-preset-env': {
      autoprefixer: { grid: 'autoplace' },
      browsers: '> 5% in KR, defaults, not IE < 11',
      features: { 'nesting-rules': false },
    },
  },
};

export default config;
