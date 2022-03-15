import { render } from "@testing-library/react";

import { Grid } from ".";

describe(`Testing component '${Grid.name}' :`, () => {
  it(`should render with 4 div elements`, () => {
    const { container } = render(
      <Grid>
        {[1, 2, 3, 4].map((index) => (
          <div key={index}>{index}</div>
        ))}
      </Grid>,
    );
    expect(container).toMatchSnapshot();
  });
});
