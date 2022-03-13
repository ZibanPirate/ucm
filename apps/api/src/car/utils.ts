import { RangeOption } from "../types";

export const stretchRange = (range: RangeOption, value: number): RangeOption => {
  return [value < range[0] ? value : range[0], value > range[1] ? value : range[1]];
};

export const getYearFromFirstRegistration = (firstRegistration: string): string => {
  return firstRegistration.substring(3);
};
