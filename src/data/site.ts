export const site = {
  name: 'PropertyRama',
  legalName: 'PropertyRama Ltd',
  phone: '07511 144129',
  phoneHref: 'tel:+447511144129',
  phoneIntl: '+447511144129',
  email: 'info@propertyrama.co.uk',
  address: {
    street: 'Unit 99 Caxton Court, Garamonde Drive',
    lines: ['Unit 99 Caxton Court', 'Garamonde Drive', 'Wymbush, Milton Keynes', 'MK8 8DD'],
    city: 'Milton Keynes',
    postcode: 'MK8 8DD',
    country: 'GB',
  },
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=PropertyRama%2C%20Unit%2099%20Caxton%20Court%2C%20Garamonde%20Drive%2C%20Milton%20Keynes%20MK8%208DD',
  social: [
    { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/propertyrama' },
    { label: 'X', icon: 'x', href: 'https://x.com/propertyrama22' },
    { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/propertyramamk' },
  ],
  // Off until this is the client's live site: adds noindex to every page.
  // Going live also means removing X-Robots-Tag from vercel.json.
  indexable: import.meta.env.PUBLIC_INDEXABLE === 'true',
} as const;

export const nav = [
  { href: '/services', label: 'Services' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/about', label: 'About' },
] as const;
