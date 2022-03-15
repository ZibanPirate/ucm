import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from ".";

describe(`Testing component '${Button.name}' :`, () => {
  it(`should render with text 'OK' and fire an 'onClick' event when clicked`, () => {
    const onClick = jest.fn();
    const { container } = render(
      <Button data-testid="ok-button" onClick={onClick}>
        OK
      </Button>,
    );
    expect(container).toMatchSnapshot();

    const okButton = screen.getByTestId("ok-button");
    fireEvent.click(okButton);
    expect(onClick).toBeCalledTimes(1);
  });

  it(`should render a stretched '${Button.name}' component with text 'See More' and do nothing when clicked`, async () => {
    const { container } = render(
      <Button data-testid="see-more-button" stretch>
        See More
      </Button>,
    );
    expect(container).toMatchSnapshot();

    const seeMoreButton = screen.getByTestId("see-more-button");

    fireEvent.click(seeMoreButton);
  });
});
