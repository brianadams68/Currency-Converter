import { Config as ImportedConfig } from 'tailwindcss'

type Config = {
  content: string[];
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': string;
        'gradient-conic': string;
      };
    };
  };
  plugins: never[];
};
