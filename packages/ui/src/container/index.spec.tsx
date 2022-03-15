import { render } from "@testing-library/react";

import { Container } from ".";

describe(`Testing component '${Container.name}' :`, () => {
  it(`should render with 4 div elements`, () => {
    const { container } = render(
      <Container>
        {[1, 2, 3, 4].map((index) => (
          <div key={index}>{index}</div>
        ))}
      </Container>,
    );
    expect(container).toMatchSnapshot();
  });
});
