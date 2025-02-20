import { Task } from 'wasp/entities'
import { MarkTaskAsDone } from 'wasp/server/operations'

type MarkTaskAsDonePayload = {
  id: string,
  isDone: boolean
}

export const markTaskAsDone: MarkTaskAsDone<MarkTaskAsDonePayload, Task> = async (
  { id, isDone },
  context
) => {
  return context.entities.Task.update({
    where: { id },
    data: {
      isDone: isDone, // Update the "isDone" field to the new value (true or false)
    },
  })
}
