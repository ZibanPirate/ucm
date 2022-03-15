import { render } from "@testing-library/react";

import { Image } from ".";

describe(`Testing component '${Image.name}' :`, () => {
  it(`should render with image url '/assets/test.svg'`, () => {
    const { container } = render(<Image url="/assets/test.svg" />);
    expect(container).toMatchSnapshot();
  });

  it(`should render an auto-sized '${Image.name}' component image url '/assets/test.svg'`, async () => {
    const { container } = render(<Image url="/assets/test.svg" size="auto" />);
    expect(container).toMatchSnapshot();
  });
});
