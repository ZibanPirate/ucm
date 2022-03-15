import { fireEvent, render, screen } from "@testing-library/react";

import { Carousel } from ".";

describe(`Testing component '${Carousel.name}' :`, () => {
  it(`should render it with 2 images, and switch between them`, () => {
    const { container } = render(
      <Carousel
        data-testid="carousel"
        previousProps={{ "data-testid": "carousel-previous" }}
        nextProps={{ "data-testid": "carousel-next" }}
        images={["/assets/test-01.svg", "/assets/test-02.svg"]}
      />,
    );
    expect(container).toMatchSnapshot("First image");

    const carouselNext = screen.getByTestId("carousel-next");
    fireEvent.click(carouselNext);
    expect(container).toMatchSnapshot("Second image");

    fireEvent.click(carouselNext);
    expect(container).toMatchSnapshot("First image again");

    const carouselPrevious = screen.getByTestId("carousel-previous");
    fireEvent.click(carouselPrevious);
    expect(container).toMatchSnapshot("Second image again");
  });

  it(`should render it with 2 images and no optional props`, () => {
    const { container } = render(
      <Carousel images={["/assets/test-01.svg", "/assets/test-02.svg"]} />,
    );
    expect(container).toMatchSnapshot();
  });
});
