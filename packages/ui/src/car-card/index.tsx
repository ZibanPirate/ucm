import type { FC, FunctionComponent } from "react";

import { Button } from "../button";
import { Image, imageSizeToStyle } from "../image";
import { Text } from "../text";

export const CarCard: FC<{
  image: string;
  make: string;
  model: string;
  price: number;
  description: string;
  LinkWrapper: FunctionComponent;
}> = ({ image, make, model, price, description, LinkWrapper }) => (
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
    <LinkWrapper>
      <Button size="sm">See more</Button>
    </LinkWrapper>
  </div>
);
