export type Location = 'ar' | 'g';

export const locations = {
  ar: 'ar', //Argentina
  g: 'g' //Global
} as { [key: string]: Location };

export const defaultLocation: Location = locations.ar as Location;
