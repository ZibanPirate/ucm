import { fireEvent, render, screen } from "@testing-library/react";
import { FC, useState } from "react";

import { CheckBox } from ".";

describe(`Testing component '${CheckBox.name}' :`, () => {
  it(`should render it unchecked then check it`, () => {
    const FormComponent: FC = () => {
      const [checked, setChecked] = useState(false);
      return (
        <CheckBox
          data-testid="bmw-checkbox"
          label="BMW"
          checked={checked}
          onChange={(newChecked) => setChecked(newChecked)}
        />
      );
    };

    const { container } = render(<FormComponent />);
    expect(container).toMatchSnapshot("Not checked");

    const checkBox = screen.getByTestId("bmw-checkbox");
    fireEvent.click(checkBox);
    expect(container).toMatchSnapshot("Checked");
  });

  it(`should render it with no label and no initial checked state`, () => {
    const { container } = render(<CheckBox data-testid="checkbox" />);
    const checkBox = screen.getByTestId("checkbox");
    fireEvent.click(checkBox);
    expect(container).toMatchSnapshot();
  });
});
