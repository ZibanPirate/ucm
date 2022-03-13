import { Field, Float, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Car {
  @Field(() => ID)
  offerID!: string;

  @Field()
  make!: string;

  @Field()
  model!: string;

  @Field()
  firstRegistration!: string;

  @Field()
  fuel!: string;

  @Field()
  consumptionUnit!: string;

  @Field()
  image!: string;

  @Field()
  gearbox!: string;

  @Field()
  condition!: string;

  @Field()
  variant!: string;

  @Field()
  category!: string;

  @Field()
  exteriorColor!: string;

  @Field(() => [String])
  images!: string[];

  @Field()
  fourWheelDrive!: boolean;

  @Field()
  mileage!: number;

  @Field()
  power!: number;

  @Field(() => Float, { nullable: true })
  consumptionCombined!: number | null;

  @Field(() => Float, { nullable: true })
  co2!: number | null;

  @Field()
  price!: number;

  @Field()
  monthlyInstallment!: number;

  @Field(() => Float, { nullable: true })
  cubicCapacity!: number | null;
}
