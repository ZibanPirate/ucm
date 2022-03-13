import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class FilterOption {
  @Field()
  type!: "options" | "range";

  @Field()
  name!: string;

  @Field()
  label!: string;

  @Field(() => [String])
  values!: string[];
}
