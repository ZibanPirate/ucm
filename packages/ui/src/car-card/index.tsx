import type { FC } from "React";

import { Image, imageSizeToStyle } from "../image";
import { Text } from "../text";
import { Toolbar } from "../toolbar";

export const CarCard: FC<{
  image: string;
  make: string;
  model: string;
  price: number;
  description: string;
}> = ({ image, make, model, price, description }) => (
  <div style={{ width: imageSizeToStyle["md"], backgroundColor: "whitesmoke" }}>
    <Image url={image} />
    <br />
    <Text size="lg" margin={"0.3rem .6rem"}>
      {`${make} ${model}`}
    </Text>
    <br />
    <Text size="md" margin={"0.3rem .6rem"}>{`€${price.toFixed(2)}`}</Text>
    <br />
    <Text size="sm" margin={"0.3rem .6rem .6rem"}>
      {description}
    </Text>
  </div>
);
