import { Task, Tag } from 'wasp/entities' // Import both Task and Tag entities
import { UpdateTask } from 'wasp/server/operations'

type AssignTagToTaskPayload = {
  taskId: string
  tagId: string
}

export const assignTagToTask: UpdateTask<AssignTagToTaskPayload, Task> = async (
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