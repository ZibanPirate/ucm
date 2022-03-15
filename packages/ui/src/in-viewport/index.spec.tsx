import { render } from "@testing-library/react";

import { InViewport, InViewportProps } from ".";

class MockedIntersectionObserver implements IntersectionObserver {
  private static staticCallback: IntersectionObserverCallback;
  private static staticObserver: IntersectionObserver;
  static changeVisibility(visible: boolean) {
    MockedIntersectionObserver.staticCallback(
      [{ isIntersecting: visible } as IntersectionObserverEntry],
      MockedIntersectionObserver.staticObserver,
    );
  }

  root!: Document | Element | null;
  rootMargin!: string;
  thresholds: readonly number[] = [];

  constructor(callback: IntersectionObserverCallback) {
    MockedIntersectionObserver.staticCallback = callback;
    MockedIntersectionObserver.staticObserver = this;
  }

  disconnect = (): null => null;
  observe = (): null => null;
  takeRecords = (): IntersectionObserverEntry[] => [];
  unobserve = (): null => null;
}

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
