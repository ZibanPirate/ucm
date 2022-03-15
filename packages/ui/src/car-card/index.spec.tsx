import { render } from "@testing-library/react";

import { CarCard } from ".";

describe(`Testing component '${CarCard.name}' :`, () => {
  it(`should render with provided linkWrapper as Fragment`, () => {
    const { container } = render(
      <CarCard
        LinkWrapper={() => <></>}
        description={"test description"}
        image="/assets/test.svg"
        make="BMW"
        model="M2"
        price={39000}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
