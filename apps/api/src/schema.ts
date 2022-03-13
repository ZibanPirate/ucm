import "reflect-metadata";

import { buildSchemaSync } from "type-graphql";

import { CarResolver } from "./car/resolver";

export const schema = buildSchemaSync({
  resolvers: [CarResolver],
});
