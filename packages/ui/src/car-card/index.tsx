import type { FC } from "react";

import { Button } from "../button";
import { Image, imageSizeToStyle } from "../image";
import { Text } from "../text";

export const CarCard: FC<{
  offerID: string;
  image: string;
  make: string;
  model: string;
  price: number;
  description: string;
}> = ({ image, make, model, price, description, offerID }) => (
  <div
    style={{
      width: imageSizeToStyle["md"],
      backgroundColor: "whitesmoke",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Image url={image} />
    <Text size="lg" margin={"0.3rem .6rem"}>
      {`${make} ${model}`}
    </Text>
    <Text size="md" margin={"0.3rem .6rem"}>{`€${price.toFixed(2)}`}</Text>
    <Text size="sm" margin={"0.3rem .6rem .6rem"} stretch>
      {description}
    </Text>
    <Button size="sm" link={`/car/${offerID}`}>
      See more
    </Button>
  </div>
);
