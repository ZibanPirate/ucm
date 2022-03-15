import { MockedProviderProps } from "@apollo/client/testing";
import { carMock } from "@ucm/models/dist/car/mock";

import { CAR_QUERY } from "../pages/car";

export const CAR_QUERY_MOCK: MockedProviderProps["mocks"] = [
  {
    request: { query: CAR_QUERY, variables: { offerID: "test-id" } },
    result: { data: { car: carMock(100) } },
  },
];
