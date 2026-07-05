/**
 * business.constants.js — Static business info for NAP, trust copy, and contact UI.
 */

export const BUSINESS_ADDRESS = {
  street: '227 Main Street',
  city: 'San Jacinto',
  state: 'CA',
  zip: '92583',
  country: 'US',
};

export const BUSINESS_HOURS_WEEKDAY = 'Mon–Fri 9:00 AM – 6:00 PM';
export const BUSINESS_HOURS_SATURDAY = 'Sat 10:00 AM – 4:00 PM';
export const BUSINESS_HOURS = `${BUSINESS_HOURS_WEEKDAY} · ${BUSINESS_HOURS_SATURDAY}`;

export const BUSINESS_SINCE = 2008;

export const TRUST_BADGES = [
  {
    title: `Since ${BUSINESS_SINCE}`,
    description: 'Trusted local print shop',
    descriptionLines: ['Trusted local print shop'],
  },
  {
    title: 'Fast turnaround',
    description: 'Schedule your completion date',
    descriptionLines: ['Schedule your completion date'],
  },
  {
    title: 'Custom design',
    description: 'Cards, shirts, signs & more',
    descriptionLines: ['Cards, shirts, signs & more'],
  },
];

export const BUSINESS_LOCATION_LABEL = 'San Jacinto, California';

export const HERO_CAPTION_TITLE = 'One shop for every custom print job';
export const HERO_CAPTION_TITLE_LINES = ['One shop for every', 'custom print job'];

export const FEATURES_SECTION_SUBTITLE = [
  'Local expertise, online convenience —',
  'Design your order and schedule completion',
  'from one place.',
];

export const REVIEWS_SECTION_SUBTITLE = [
  'Real feedback from',
  'local businesses and families in San Jacinto.',
];

export const CONTACT_SECTION_SUBTITLE = [
  'Questions about an order or a custom project?',
  'Send a message — we typically respond within one business day.',
];
export const HERO_CAPTION_DESC_LEAD =
  'Design online, schedule your completion date, and get quality printing done fast — with a local team';
export const HERO_CAPTION_DESC_TAIL = 'behind every order.';
export const HERO_CAPTION_DESC = `${HERO_CAPTION_DESC_LEAD} ${HERO_CAPTION_DESC_TAIL}`;

export const DEFAULT_FEATURES = [
  {
    title: 'Local & Trusted',
    description:
      'Serving San Jacinto since 2008 with signs, printing, and custom apparel.',
  },
  {
    title: 'Fast Turnaround',
    description:
      'Quality products done fast — with clear scheduling and order updates.',
  },
  {
    title: 'Custom Design',
    description:
      'Design online for business cards, shirts, banners, hats, magnets, and memorial prints.',
  },
];

export const CONTACT_VALUE_PROPS = [
  {
    title: 'Free project quotes',
    description:
      'Share what you need — cards, shirts, signs, or banners — and we’ll estimate pricing and turnaround.',
    descriptionLines: [
      'Share what you need — cards, shirts, signs, or banners —',
      'and we’ll estimate pricing and turnaround.',
    ],
  },
  {
    title: 'Design help before you order',
    description:
      'Not sure about file setup, sizing, or finishes? We guide you through options before checkout.',
    descriptionLines: [
      'Not sure about file setup, sizing, or finishes?',
      'We guide you through options before checkout.',
    ],
  },
  {
    title: 'Real people, fast replies',
    description:
      'Our San Jacinto team reads every message and typically responds within one business day.',
    descriptionLines: [
      'Our San Jacinto team reads every message',
      'and typically responds within one business day.',
    ],
  },
];

export const DEFAULT_ABOUT_CONTENT = {
  eyebrow: 'Design & print',
  title: 'Graphics built to print — not just look good on screen',
  titleLines: [
    'Graphics built to print —',
    'not just look good on screen',
  ],
  intro:
    'We pair graphic design with in-house production so layouts, colors, and files are ready before anything hits the press.',
  since:
    'Since 2008, Namerrs has served San Jacinto and the Inland Empire with professional signs, printing, and custom apparel.',
  support:
    'From business cards and banners to shirts and signage, we handle design, prepress, and production under one roof — keeping your brand consistent across every format.',
  capabilities: [
    {
      title: 'Prepress & file prep',
      description:
        'Bleeds, resolution, trapping, and export settings checked so your art survives production — not just PDF export.',
      descriptionMobile: [
        'Bleeds, resolution, trapping, and export settings checked',
        'so your art survives production — not just PDF export.',
      ],
    },
    {
      title: 'Brand & layout design',
      description:
        'Logos, marketing layouts, and campaign graphics tuned for consistency across cards, signage, and apparel.',
      descriptionMobile: [
        'Logos, marketing layouts, and campaign graphics',
        'tuned for consistency across cards, signage, and apparel.',
      ],
    },
    {
      title: 'Color-managed printing',
      description:
        'Calibrated output for accurate, vivid results on cardstock, wide-format vinyl, textiles, and more.',
      descriptionMobile: [
        'Calibrated output for vivid, accurate color',
        'on cardstock, vinyl, textiles, and more.',
      ],
    },
    {
      title: 'Proof before we run',
      description:
        'Review a digital proof before production starts — catch sizing, copy, and color issues while they are still easy to fix.',
      descriptionMobile: [
        'Review a digital proof before production starts —',
        'catch sizing, copy, and color issues while they are still easy to fix.',
      ],
    },
  ],
};

export const DEFAULT_ABOUT_TEASER = {
  title: DEFAULT_ABOUT_CONTENT.title,
  body: DEFAULT_ABOUT_CONTENT.intro,
  ctaHref: '/#products',
  ctaLabel: 'Start your design',
};

export const DEFAULT_FAQ = [
  {
    question: 'Minimum order for business cards?',
    answer: 'Business cards have a minimum order of 500 cards.',
  },
  {
    question: 'How long does production take?',
    answer:
      'Please allow at least 5 business days from when you place your order for production to complete.',
  },
  {
    question: 'Can I revise my order schedule?',
    answer:
      'You may revise your schedule up to 12 hours before the requested completion date.',
  },
  {
    question: 'What file types can I upload?',
    answer: 'Upload JPEG, PNG, or WebP images up to 10 MB for custom designs.',
  },
];