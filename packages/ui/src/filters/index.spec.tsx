import { fireEvent, render, screen } from "@testing-library/react";

import { Filter, Filters } from ".";

describe(`Testing component '${Filters.name}' :`, () => {
  it(`should render with options of all types, then change their values`, () => {
    const filters: Filter[] = [
      {
        label: "Make",
        name: "make",
        type: "options",
        options: [
          { name: "BMW", checked: true },
          { name: "Porsche", checked: false },
        ],
      },
      {
        label: "Price",
        name: "price",
        type: "range",
        options: {
          min: 20000,
          max: 100000,
        },
      },
    ];

    const { container } = render(<Filters filters={filters} />);

    const bmwOption = screen.getByText("BMW");
    fireEvent.click(bmwOption);
    const priceRangeMin = screen.getByDisplayValue("20000");
    fireEvent.change(priceRangeMin, { target: { value: 20001 } });
    const priceRangeMax = screen.getByDisplayValue("100000");
    fireEvent.change(priceRangeMax, { target: { value: 100001 } });

    expect(container).toMatchSnapshot();
  });
});
