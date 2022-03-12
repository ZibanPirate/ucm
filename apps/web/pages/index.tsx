import { Container } from "@ucm/ui/dist/container";
import { Text } from "@ucm/ui/dist/text";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Text size="xl">Hello There</Text>
      </div>
    </Container>
  );
};

export default Home;
