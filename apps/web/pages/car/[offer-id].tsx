import { gql, useQuery } from "@apollo/client";
import type { CarQuery } from "@ucm/api/dist/car/resolver";
import { Button } from "@ucm/ui/dist/button";
import { Carousel } from "@ucm/ui/dist/carousel";
import { Container } from "@ucm/ui/dist/container";
import { DetailsTable, DetailsTableRow } from "@ucm/ui/dist/details-table";
import { Text } from "@ucm/ui/dist/text";
import { Toolbar } from "@ucm/ui/dist/toolbar";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import { initializeApollo } from "../../providers/apollo";

const carQueryFields = [
  "offerID",
  "variant",
  "fourWheelDrive",
  "gearbox",
  "condition",
  "category",
  "cubicCapacity",
  "exteriorColor",
  "monthlyInstallment",
  "image",
  "images",
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

const detailsRows: DetailsTableRow<keyof Omit<CarQuery, "images">>[] = [
  {
    label: "Model details",
    fields: {
      make: { label: "Make" },
      model: { label: "Model" },
      variant: { label: "Variant" },
      fourWheelDrive: { label: "Is four-wheel drive", mapper: (value) => (value ? "Yes" : "No") },
      gearbox: { label: "Gearbox" },
    },
  },
  {
    label: "Engine",
    fields: {
      consumptionCombined: {
        label: "Consumption",
        mapper: (value, { consumptionUnit }) => `${value} (${consumptionUnit})`,
      },
      fuel: { label: "Fuel" },
      co2: { label: "CO2 emission", mapper: (value) => `${value} (g/Km)` },
      power: { label: "Hours Powers" },
    },
  },
  {
    label: "State",
    fields: {
      condition: { label: "Condition" },
      firstRegistration: { label: "First Registration" },
      mileage: { label: "Mileage", mapper: (value) => `${value} (Km)` },
    },
  },
  {
    label: "Shape",
    fields: {
      category: { label: "Category" },
      cubicCapacity: { label: "Cubic capacity" },
      exteriorColor: { label: "Exterior color" },
    },
  },
  {
    label: "Finance",
    fields: {
      price: { label: "Price", mapper: (value) => `€${(value as number).toFixed(2)}` },
      monthlyInstallment: {
        label: "Monthly installment",
        mapper: (value) => `€${(value as number).toFixed(2)}`,
      },
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
          <Carousel images={data.car.images} />
          <Text size="xl">{`${data.car.make} ${data.car.model}`}</Text>
          <DetailsTable
            rows={detailsRows}
            values={data.car as Omit<CarQuery, "images">}
            mapperParams={{ consumptionUnit: data.car.consumptionUnit }}
          />
          <Toolbar itemsAlignment="center">
            <Button link={`https://www.google.com/search?q=${data.car.make} ${data.car.model}`}>
              Get it
            </Button>
          </Toolbar>
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
