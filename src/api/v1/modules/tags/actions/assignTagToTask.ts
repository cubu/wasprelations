import { Task } from 'wasp/entities'
import { AssignTagToTask } from 'wasp/server/operations'

type AssignTagToTaskPayload = {
  taskId: string
  tagId: string
}

export const assignTagToTask: AssignTagToTask<AssignTagToTaskPayload, Task> = async (
  { taskId, tagId },
  context
) => {
  return context.entities.Task.update({
    where: { id: taskId },
    data: {
      tags: {
        connect: { id: tagId },
      },
    },
  })
}