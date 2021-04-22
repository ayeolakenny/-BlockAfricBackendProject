import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Todo {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const TodoModel = getModelForClass(Todo, {
  schemaOptions: {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
});
