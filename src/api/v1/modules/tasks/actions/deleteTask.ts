import { Task, Subtask } from 'wasp/entities' // Ensure Subtask is imported correctly
import { DeleteTask } from 'wasp/server/operations'

type DeleteTaskPayload = Pick<Task, 'id'>

export const deleteTask: DeleteTask<DeleteTaskPayload, Task> = async ({ id }, context) => {
  // First, delete all subtasks associated with the task
  await context.entities.Subtask.deleteMany({
    where: { taskId: id },
  })

  // Then, delete the task itself
  return context.entities.Task.delete({
    where: { id },
  })
}

/* export const deleteTask: DeleteTask<DeleteTaskPayload, Task> = async ({ id }, context) => {
  return context.entities.Task.delete({
    where: { id },
  })
} */
