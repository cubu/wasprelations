// src/api/v1/modules/tags/queries/getTasksForTag.ts
import { Task, Tag } from 'wasp/entities' // Import both Task and Tag entities
import { type GetTasks } from 'wasp/server/operations'

type GetTasksForTagPayload = {
  tagId: string
}

export const getTasksForTag: GetTasks<GetTasksForTagPayload, Task[]> = async ({ tagId }, context) => {
  // Query tasks associated with the provided tagId
  return context.entities.Task.findMany({
    where: {
      tags: {
        some: {
          id: tagId, // Ensure we find tasks that are associated with the tagId
        },
      },
    },
  })
}
