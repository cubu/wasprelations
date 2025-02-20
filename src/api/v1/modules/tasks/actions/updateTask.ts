import { Task } from 'wasp/entities'
import { UpdateTask } from 'wasp/server/operations'

type UpdateTaskPayload = Pick<Task, 'id' | 'description' | 'isDone'>

export const updateTask: UpdateTask<UpdateTaskPayload, Task> = async (
  { id, description, isDone },
  context
) => {
  return context.entities.Task.update({
    where: { id },
    data: {            
      description,
      isDone: isDone
    },
  })
}
