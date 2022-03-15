export class MockedIntersectionObserver implements IntersectionObserver {
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
