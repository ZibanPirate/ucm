export const mockedMatchMedia =
  (assignCallback: (callback: (e: MediaQueryListEvent) => void) => void) => (): MediaQueryList =>
    ({
      addEventListener: (_event: string, callback: (e: MediaQueryListEvent) => void) => {
        assignCallback(callback);
      },
      removeEventListener: () => null,
      matches: true,
    } as unknown as MediaQueryList);
