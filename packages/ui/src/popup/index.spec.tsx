import { fireEvent, render, screen } from "@testing-library/react";
import { FC, useState } from "react";

import { Popup } from ".";

describe(`Testing component '${Popup.name}' :`, () => {
  it(`should render it shown, then hid it`, () => {
    const PageComponent: FC = () => {
      const [shown, setShown] = useState(true);
      return (
        <Popup
          data-testid="popup"
          containerProps={{ "data-testid": "popup-container" }}
          shown={shown}
          onClose={() => setShown(false)}
        />
      );
    };

    const { container } = render(<PageComponent />);
    expect(container).toMatchSnapshot("Shown");

    const popup = screen.getByTestId("popup");
    fireEvent.click(popup);
    expect(container).toMatchSnapshot("Stays shown");

    const popupContainer = screen.getByTestId("popup-container");
    fireEvent.click(popupContainer);
    expect(container).toMatchSnapshot("Hidden");
  });

  it(`should render it with no optional props`, () => {
    const { container } = render(<Popup data-testid="popup" shown={true} onClose={() => null} />);
    const popup = screen.getByTestId("popup");
    fireEvent.click(popup);
    expect(container).toMatchSnapshot();
  });
});
