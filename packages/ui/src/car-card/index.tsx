import type { FC } from "React";

import { Image, imageSizeToStyle } from "../image";
import { Text } from "../text";
import { Toolbar } from "../toolbar";

export const CarCard: FC<{
  imageURL: string;
  manufacturer: string;
  model: string;
  price: number;
}> = ({ imageURL, manufacturer, model, price }) => (
  <div style={{ width: imageSizeToStyle["md"], backgroundColor: "whitesmoke" }}>
    <Image url={imageURL} />
    <br />
    <Text size="lg" margin={0.5}>
      {model}
    </Text>
    <br />
    <Toolbar itemsAlignment="space-between">
      <Text size="sm" margin={0.5}>
        {manufacturer}
      </Text>
      <Text size="sm" margin={0.5}>{`€${price.toFixed(2)}`}</Text>
    </Toolbar>
    <br />
  </div>
);
