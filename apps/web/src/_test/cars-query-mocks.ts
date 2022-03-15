import { MockedProviderProps } from "@apollo/client/testing";
import { carMocks } from "@ucm/models/dist/car/mock";

import { CARS_QUERY } from "../pages/home";

const filters = [
  {
    name: "make",
    type: "options",
    label: "Make",
    values: ["BMW", "Skoda", "Volkswagen"],
  },
  {
    name: "power",
    type: "range",
    label: "Power",
    values: ["9", "85"],
  },
];

export const CARS_QUERY_MOCK: MockedProviderProps["mocks"] = [
  {
    request: { query: CARS_QUERY, variables: { filters: [], take: 12 } },
    result: { data: { cars: { result: carMocks(1, 12), filters } } },
  },
  {
    request: { query: CARS_QUERY, variables: { filters: ["make:BMW"], take: 12 } },
    result: { data: { cars: { result: carMocks(1, 3), filters } } },
  },
  {
    request: { query: CARS_QUERY, variables: { filters: ["make:BMW", "power:50,0"], take: 12 } },
    result: { data: { cars: { result: carMocks(5, 17), filters } } },
  },
  {
    request: {
      query: CARS_QUERY,
      variables: { filters: ["make:BMW", "power:50,0"], take: 12, skip: 13 },
    },
    result: { data: { cars: { result: [carMocks(18, 20)], filters } } },
  },
];
