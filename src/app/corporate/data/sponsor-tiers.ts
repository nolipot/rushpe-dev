import type { SponsorTiers } from './types';
import {
  bofaLogo,
  whitingturnerLogo,
  bloombergLogo,
} from './logos';

export const SPONSORS: SponsorTiers = {
  platinum: [

  ],

  gold: [
    
  ],

  silver: [
    { name: 'Bloomberg', href: 'https://www.bloomberg.com/', logo: bloombergLogo, logoClassName: 'mix-blend-multiply' },
  ],
  
  bronze: [
    { name: 'Bank of America', href: 'https://www.bankofamerica.com/', logo: bofaLogo },
    { name: 'Whiting-Turner', href: 'https://www.whiting-turner.com/', logo: whitingturnerLogo },
  ]
};
