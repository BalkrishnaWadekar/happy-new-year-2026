export const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const sample = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateId = () => Math.random().toString(36).substr(2, 9);
