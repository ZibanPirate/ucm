import { Button } from "@ucm/ui/dist/button";
import { CarCard } from "@ucm/ui/dist/car-card";
import { Container } from "@ucm/ui/dist/container";
import { Grid } from "@ucm/ui/dist/grid";
import { Toolbar } from "@ucm/ui/dist/toolbar";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container>
      <Toolbar itemsAlignment="space-around">
        <Button stretch>Filters</Button>
        <Button stretch>Sort Options</Button>
      </Toolbar>
      <Grid>
        {[5205, 5355, 20444, 1520, 12005, 505, 8000, 6250, 8000, 52000].map((index) => (
          <CarCard
            key={index}
            imageURL={`https://gravatar.com/avatar/${index}?s=400&d=robohash&r=x`}
            manufacturer={`manufacturer ${index}`}
            model={`model ${index}`}
            price={index}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
