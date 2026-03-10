const config = {
  plugins: {
    "postcss-preset-mantine": {
      // autoRem: true, // enable if you want px -> rem conversion
    },
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
      },
    },
    "@tailwindcss/postcss": {},
  },
};

export default config;
