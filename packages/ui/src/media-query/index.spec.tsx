import { render } from "@testing-library/react";

import { MediaQuery } from ".";
import { mockedMatchMedia } from "./mocked-match-media";

describe(`Testing component '${MediaQuery.name}' :`, () => {
  it(`should render with 4 div elements then hide responsively`, () => {
    let callbackMock: (e: MediaQueryListEvent) => void = () => null;
    window.matchMedia = mockedMatchMedia((callback) => (callbackMock = callback));
    const { container } = render(
      <MediaQuery query="test-query">
        {[1, 2, 3, 4].map((index) => (
          <div key={index}>{index}</div>
        ))}
      </MediaQuery>,
    );
    expect(container).toMatchSnapshot("shown");

    callbackMock({ matches: false } as unknown as MediaQueryListEvent);
    expect(container).toMatchSnapshot("hidden");
  });
});
