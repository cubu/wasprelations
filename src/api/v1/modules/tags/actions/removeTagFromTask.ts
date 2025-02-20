import { Task } from 'wasp/entities'
import { RemoveTagFromTask } from 'wasp/server/operations'

type RemoveTagFromTaskPayload = {
  taskId: string
  tagId: string
}

export const removeTagFromTask: RemoveTagFromTask<RemoveTagFromTaskPayload, Task> = async (
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