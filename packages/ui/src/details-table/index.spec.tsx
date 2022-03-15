import { render } from "@testing-library/react";

import { DetailsTable, DetailsTableRow } from ".";

describe(`Testing component '${DetailsTable.name}' :`, () => {
  it(`should render with provided linkWrapper as Fragment`, () => {
    const detailsRows: DetailsTableRow[] = [
      {
        label: "Model details",
        fields: {
          make: { label: "Make" },
          model: { label: "Model" },
        },
      },
      {
        label: "Finance",
        fields: {
          price: { label: "Price", mapper: (value) => `€${(value as number).toFixed(2)}` },
        },
      },
    ];
    const car = {
      make: "BMW",
      model: "M2",
      price: 39000,
    };

    const { container } = render(<DetailsTable rows={detailsRows} values={car} />);
    expect(container).toMatchSnapshot();
  });
});
