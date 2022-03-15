import { Car } from ".";

export const carMock = (index: number): Car => ({
  image: `/assets/image-${index}`,
  model: `model-${index}`,
  make: `make-${index}`,
  price: 7416,
  mileage: 62606,
  firstRegistration: `firstRegistration-${index}`,
  fuel: `fuel-${index}`,
  power: 44,
  consumptionCombined: 4.5,
  consumptionUnit: `consumptionUnit-${index}`,
  co2: 107,
  offerID: `offerID-${index}`,
  category: `category-${index}`,
  condition: `condition-${index}`,
  cubicCapacity: 0,
  exteriorColor: `exteriorColor-${index}`,
  fourWheelDrive: true,
  gearbox: `gearbox-${index}`,
  images: [`/assets/image-${index}`],
  monthlyInstallment: 60,
  variant: `variant-${index}`,
});

export const carMocks = (from: number, to: number): Car[] => {
  const cars: Car[] = [];
  for (let index = from; index <= to; index++) {
    cars.push(carMock(index));
  }
  return cars;
};
