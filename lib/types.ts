export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
}

export interface BrandTypography {
  heading: {
    family: string;
    weight: number;
    style: string;
  };
  body: {
    family: string;
    weight: number;
    style: string;
  };
}

export interface BrandVoice {
  adjectives: string[];
  doSay: string[];
  dontSay: string[];
}

export interface BrandIdentity {
  id: string;
  brandName: string;
  tagline: string;
  colors: BrandColors;
  typography: BrandTypography;
  voice: BrandVoice;
  logoText: string;
  logoIcon: string;
  description: string;
}
