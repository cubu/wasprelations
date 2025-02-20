import { Task } from 'wasp/entities'
import { CreateTask } from 'wasp/server/operations'

type CreateTaskPayload = Pick<Task, 'description'>

export const createTask: CreateTask<CreateTaskPayload, Task> = async (
  args,
  context
) => {
  return context.entities.Task.create({
    data: { description: args.description },
  })
}
