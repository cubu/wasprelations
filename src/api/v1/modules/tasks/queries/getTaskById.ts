import { Task } from 'wasp/entities'
import { type GetTaskById } from 'wasp/server/operations'

type GetTaskPayload = Pick<Task, 'id'>

export const getTaskById: GetTaskById<GetTaskPayload, Task | null> = async ({ id }, context) => {
  return context.entities.Task.findUnique({
    where: { id },
  })
}
