import { MockedProvider } from "@apollo/react-testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { MockedIntersectionObserver } from "@ucm/ui/dist/in-viewport/mocked-intersection-observer";
import { mockedMatchMedia } from "@ucm/ui/dist/media-query/mocked-match-media";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";

import { CARS_QUERY_MOCK } from "../../_test/cars-query-mocks";
import { HomePage } from ".";

const routerMock = {
  route: "/",
  pathname: "",
  query: {} as NextParsedUrlQuery,
  asPath: "",
  push: (url: string) => {
    const urlObject = new URL(url, "https://ucm.zakiii.com");
    routerMock.query = {};
    urlObject.searchParams.forEach((value, key) => {
      routerMock.query[key] = value;
    });
  },
};

jest.mock("next/router", () => ({ useRouter: () => routerMock }));

describe(`Testing component '${HomePage.name}' :`, () => {
  it(`should render '${HomePage.name}', then change both filters, then preform an infinite scroll`, async () => {
    window.IntersectionObserver = MockedIntersectionObserver;
    let callbackMock: (e: MediaQueryListEvent) => void = () => null;
    window.matchMedia = mockedMatchMedia((callback) => (callbackMock = callback));

    const { container } = render(
      <MockedProvider mocks={CARS_QUERY_MOCK} addTypename={false}>
        <HomePage />
      </MockedProvider>,
    );

    // Initial render (still loading data):
    expect(screen.getByText("Loading")).toBeTruthy();
    expect(container).toMatchSnapshot();

    // Load the data then capture a snapshot:
    await new Promise((resolve) => setTimeout(() => resolve({}), 0));
    expect(container).toMatchSnapshot();

    // Modify an Option filter (select BMW make):
    fireEvent.click(screen.getByTestId("filters-button"));
    fireEvent.click(screen.getAllByText("BMW")[0]);
    fireEvent.click(screen.getByTestId("popup-container"));
    expect(screen.getByText("Loading")).toBeTruthy();
    expect(container).toMatchSnapshot();
    await new Promise((resolve) => setTimeout(() => resolve({}), 0));
    expect(container).toMatchSnapshot();

    // Modify a Range filter (max power):
    fireEvent.click(screen.getByTestId("filters-button"));
    fireEvent.change(screen.getByLabelText("Min"), { target: { value: 50 } });
    fireEvent.click(screen.getByTestId("popup-container"));
    expect(screen.getByText("Loading")).toBeTruthy();
    expect(container).toMatchSnapshot();
    await new Promise((resolve) => setTimeout(() => resolve({}), 0));
    expect(container).toMatchSnapshot();

    // Infinite scroll:
    MockedIntersectionObserver.changeVisibility(true);
    await new Promise((resolve) => setTimeout(() => resolve({}), 0));
    expect(container).toMatchSnapshot();

    // Network error:
    fireEvent.click(screen.getByTestId("filters-button"));
    fireEvent.change(screen.getByLabelText("Max"), { target: { value: 60 } });
    fireEvent.click(screen.getByTestId("popup-container"));
    expect(screen.getByText("Loading")).toBeTruthy();
    expect(container).toMatchSnapshot();
    await new Promise((resolve) => setTimeout(() => resolve({}), 0));
    expect(container).toMatchSnapshot();
  });
});
