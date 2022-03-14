import { gql, useQuery } from "@apollo/client";
import type { CarQuery } from "@ucm/api/dist/car/resolver";
import { Container } from "@ucm/ui/dist/container";
import { Text } from "@ucm/ui/dist/text";
import { Toolbar } from "@ucm/ui/dist/toolbar";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";

import { initializeApollo } from "../../providers/apollo";

const carQueryFields = [
  "variant",
  "fourWheelDrive",
  "gearbox",
  "condition",
  "category",
  "cubicCapacity",
  "exteriorColor",
  "monthlyInstallment",
  "image",
  "model",
  "make",
  "price",
  "mileage",
  "firstRegistration",
  "fuel",
  "power",
  "consumptionCombined",
  "consumptionUnit",
  "co2",
] as const;

const carQuery = gql`
query Car($offerID: String!) {
  car(offerID: $offerID) {
    ${carQueryFields.join("\n")}
  }
}
`;

const detailsFields: Array<{
  label: string;
  fields: Partial<Record<keyof CarQuery<typeof carQueryFields[number]>, string>>;
}> = [
  {
    label: "Model details",
    fields: {
      make: "Make",
      model: "Model",
      variant: "Variant",
      fourWheelDrive: "Is four-wheel drive",
      gearbox: "Gearbox",
    },
  },
  {
    label: "Engine",
    fields: {
      consumptionCombined: "Consumption",
      fuel: "Fuel",
      co2: "CO2 emission",
      power: "Hours Powers",
    },
  },
  {
    label: "State",
    fields: {
      condition: "Condition",
      firstRegistration: "First Registration",
      mileage: "Mileage",
    },
  },
  {
    label: "Shape",
    fields: {
      category: "Category",
      cubicCapacity: "Cubic capacity",
      exteriorColor: "Exterior color",
    },
  },
  {
    label: "Finance",
    fields: {
      price: "Price",
      monthlyInstallment: "Monthly installment",
    },
  },
];

const Product: NextPage = () => {
  const router = useRouter();

  const { data, loading } = useQuery<{ car: CarQuery<typeof carQueryFields[number]> }>(carQuery, {
    variables: { offerID: router.query["offer-id"] },
  });

  return (
    <Container>
      {loading ? (
        "Loading"
      ) : !data ? (
        "Error Loading, please try again later :("
      ) : (
        <>
          <div>Carousel</div>
          <Text size="xl">{`${data.car.make} ${data.car.model}`}</Text>
          <div>
            {detailsFields.map(({ label, fields }, index) => (
              <div key={index}>
                <Text size="md">{label}</Text>
                {Object.keys(fields).map((key, keyIndex) => {
                  const field = fields[key as keyof typeof fields];
                  return (
                    <Fragment key={keyIndex}>
                      <Toolbar itemsAlignment="space-between">
                        <Text size="sm">{field}</Text>
                        <Text size="sm">{data.car[key as keyof typeof fields]}</Text>
                      </Toolbar>
                      <br />
                    </Fragment>
                  );
                })}
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({ query: carQuery, variables: { offerID: query["offer-id"] } });

  return { props: { initialApolloState: apolloClient.cache.extract() } };
};

export default Product;
