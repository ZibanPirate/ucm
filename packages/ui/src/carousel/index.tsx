import type { FC } from "react";
import { useState } from "react";

import { Button } from "../button";
import { Image } from "../image";
import { Toolbar } from "../toolbar";

export const Carousel: FC<{ images: string[] }> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);
  const changeActiveImage = (by: -1 | 1) => {
    const newActiveImage = activeImage + by;
    if (newActiveImage >= images.length) {
      setActiveImage(0);
    } else if (newActiveImage < 0) {
      setActiveImage(images.length);
    } else {
      setActiveImage(newActiveImage);
    }
  };
  return (
    <div>
      <Image url={images[activeImage]} size="auto" ratio={1600 / 1200} />
      <Toolbar itemsAlignment="space-around">
        <Button onClick={() => changeActiveImage(-1)}>{"<"}</Button>
        <Button onClick={() => changeActiveImage(1)}>{">"}</Button>
      </Toolbar>
    </div>
  );
};
