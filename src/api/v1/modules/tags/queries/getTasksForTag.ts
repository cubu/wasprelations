// src/api/v1/modules/tags/queries/getTasksForTag.ts
import { Task } from 'wasp/entities'
import { GetTasksForTag } from 'wasp/server/operations'

type GetTasksForTagPayload = {
  tagId: string
}

export const getTasksForTag: GetTasksForTag<GetTasksForTagPayload, Task[]> = async ({ tagId }, context) => {
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
