import { render } from "@testing-library/react";

import { Text } from ".";

describe(`Testing component '${Text.name}' :`, () => {
  it(`should render with text 'Hi'`, () => {
    const { container } = render(<Text>OK</Text>);
    expect(container).toMatchSnapshot();
  });

  it(`should render a stretched '${Text.name}' component with text 'Used Cars Market'`, async () => {
    const { container } = render(<Text stretch>Used Cars Market</Text>);
    expect(container).toMatchSnapshot();
  });
});
