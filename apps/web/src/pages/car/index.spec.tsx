import { MockedProvider } from "@apollo/react-testing";
import { render, screen } from "@testing-library/react";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";

import { CAR_QUERY_MOCK } from "../../_test/car-query-mocks";
import { CarPage } from ".";

const routerMock = {
  route: "/",
  pathname: "",
  query: { "offer-id": "test-id" } as NextParsedUrlQuery,
  asPath: "",
};

jest.mock("next/router", () => ({ useRouter: () => routerMock }));

describe(`Testing component '${CarPage.name}' :`, () => {
  it(`should render with info from test Car 100`, async () => {
    const { container } = render(
      <MockedProvider mocks={CAR_QUERY_MOCK} addTypename={false}>
        <CarPage />
      </MockedProvider>,
    );

    // Initial render (still loading data):
    expect(screen.getByText("Loading")).toBeTruthy();
    expect(container).toMatchSnapshot();

    // Load the data then capture a snapshot:
    await new Promise((resolve) => setTimeout(() => resolve({}), 0));
    expect(container).toMatchSnapshot();
  });

  it(`should render with Error message on network error`, async () => {
    routerMock.query["offer-id"] = "invalid-test-id";
    const { container } = render(
      <MockedProvider mocks={CAR_QUERY_MOCK} addTypename={false}>
        <CarPage />
      </MockedProvider>,
    );

    // Initial render (still loading data):
    expect(screen.getByText("Loading")).toBeTruthy();
    expect(container).toMatchSnapshot();

    // Load the data then capture a snapshot:
    await new Promise((resolve) => setTimeout(() => resolve({}), 0));
    expect(container).toMatchSnapshot();
  });
});
