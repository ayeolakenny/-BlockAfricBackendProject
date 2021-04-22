import { Todo, TodoModel } from "../entities/Todo";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ObjectIdScalar } from "../object-id.scalar";
import { ObjectId } from "mongodb";

@Resolver()
export class TodoResolver {
  // Add Todos
  @Mutation(() => Todo)
  async addTodo(@Arg("todoName") todoName: string): Promise<Todo> {
    const todo = new TodoModel({
      name: todoName,
    } as Todo);
    await todo.save();
    return todo;
  }

  //Get all Todos
  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return await TodoModel.find({});
  }

  //Get a Todo
  @Query(() => Todo)
  async todo(
    @Arg("todoId", () => ObjectIdScalar) todoId: ObjectId
  ): Promise<Todo> {
    return await TodoModel.findOne({ _id: todoId });
  }

  //Update a Todo
  @Mutation(() => Todo)
  async updateTodo(
    @Arg("todoId", () => ObjectIdScalar) todoId: ObjectId,
    @Arg("todoName") todoName: string
  ): Promise<Todo> {
    const todo = await TodoModel.findOne({ _id: todoId });

    todo.name = todoName;
    todo.updatedAt = new Date();

    await todo.save();
    return todo;
  }

  //Delete a Todo
  @Mutation(() => Boolean)
  async deleteTodo(
    @Arg("todoId", () => ObjectIdScalar) todoId: ObjectId
  ): Promise<Boolean> {
    await TodoModel.deleteOne({ _id: todoId });
    return true;
  }
}
