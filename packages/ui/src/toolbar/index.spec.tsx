import { render } from "@testing-library/react";

import { Toolbar } from ".";

describe(`Testing component '${Toolbar.name}' :`, () => {
  it(`should render with 4 div elements`, () => {
    const { container } = render(
      <Toolbar>
        {[1, 2, 3, 4].map((index) => (
          <div key={index}>{index}</div>
        ))}
      </Toolbar>,
    );
    expect(container).toMatchSnapshot();
  });

  it(`should render with 4 div elements and provided 'itemsAlignment' and 'margin'`, () => {
    const { container } = render(
      <Toolbar itemsAlignment="center" margin="1rem">
        {[1, 2, 3, 4].map((index) => (
          <div key={index}>{index}</div>
        ))}
      </Toolbar>,
    );
    expect(container).toMatchSnapshot();
  });
});
