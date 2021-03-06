/**
 * @description author profile
 * */

export interface RawProfile {
  name: string;
  logo: {
    url: string;
  };
  email: string;
  url: Map<string, string>;
}

export interface Profile {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  logo: {
    '@type': 'ImageObject';
    url: string;
  };
  email: string;
  url: Map<string, string>;
}

export const EmptyProfile: Profile = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  email: '',
  logo: {
    '@type': 'ImageObject',
    url: '',
  },
  name: '',
  url: new Map<string, string>(),
};
