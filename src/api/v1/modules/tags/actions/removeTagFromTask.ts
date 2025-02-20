import { Task, Tag } from 'wasp/entities' // Import both Task and Tag entities
import { UpdateTask } from 'wasp/server/operations'

type RemoveTagFromTaskPayload = {
  taskId: string
  tagId: string
}

export const removeTagFromTask: UpdateTask<RemoveTagFromTaskPayload, Task> = async (
  { taskId, tagId },
  context
) => {
  return context.entities.Task.update({
    where: { id: taskId },
    data: {
      tags: {
        disconnect: { id: tagId },
      },
    },
  })
}