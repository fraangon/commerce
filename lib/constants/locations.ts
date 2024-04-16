export type Location = 'ar' | 'g';

export const locations = {
  ar: 'ar', //Argentina
  g: 'g' //Global
} as { [key: string]: Location };

export const defaultLocation: Location = locations.ar as Location;

export const locationsArray = Object.values(locations);

export const locationNames = {
  [locations.ar as string]: 'Argentina',
  [locations.g as string]: 'Internacional'
};

export const locationCurrencies = {
  [locations.ar as string]: 'ARS',
  [locations.g as string]: 'USD'
};
