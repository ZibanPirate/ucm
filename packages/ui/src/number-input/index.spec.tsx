import { fireEvent, render, screen } from "@testing-library/react";
import { FC, useState } from "react";

import { NumberInput } from ".";

describe(`Testing component '${NumberInput.name}' :`, () => {
  it(`should render with initial value then change it on input change`, () => {
    const FormComponent: FC<{ initialValue: number }> = ({ initialValue }) => {
      const [value, setValue] = useState(initialValue);
      return (
        <NumberInput
          data-testid="number-input"
          label="Mileage"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      );
    };

    const { container } = render(<FormComponent initialValue={20000} />);
    expect(container).toMatchSnapshot("20000");

    const numberInput = screen.getByTestId("number-input");
    fireEvent.change(numberInput, { target: { value: 80000 } });
    expect(container).toMatchSnapshot("80000");
  });

  it(`should render with initial value and no label and no onChange`, () => {
    const { container } = render(<NumberInput data-testid="number-input" value={100} />);
    const numberInput = screen.getByTestId("number-input");
    fireEvent.change(numberInput, { target: { value: 80000 } });
    expect(container).toMatchSnapshot();
  });
});
