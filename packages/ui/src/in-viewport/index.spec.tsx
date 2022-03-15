import { render } from "@testing-library/react";

import { InViewport, InViewportProps } from ".";
import { MockedIntersectionObserver } from "./mocked-intersection-observer";

describe(`Testing component '${InViewport.name}' :`, () => {
  it(`should render and notify when it enters the viewport then notify when it leaves it`, () => {
    window.IntersectionObserver = MockedIntersectionObserver;

    const onVisibilityChanged = jest.fn();
    const { container } = render(<InViewport onVisibilityChanged={onVisibilityChanged} />);
    expect(container).toMatchSnapshot();

    MockedIntersectionObserver.changeVisibility(true);
    expect(onVisibilityChanged).toHaveBeenNthCalledWith<
      Parameters<InViewportProps["onVisibilityChanged"]>
    >(1, "entered");
    MockedIntersectionObserver.changeVisibility(false);
    expect(onVisibilityChanged).toHaveBeenNthCalledWith<
      Parameters<InViewportProps["onVisibilityChanged"]>
    >(2, "left");
  });
});
