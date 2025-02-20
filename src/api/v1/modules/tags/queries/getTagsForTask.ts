import { Tag } from 'wasp/entities'  // Import Tag entity
import { type GetTasks } from 'wasp/server/operations'

type GetTagsForTaskPayload = {
  taskId: string
}

export const getTagsForTask: GetTasks<GetTagsForTaskPayload, Tag[]> = async ({ taskId }, context) => {
  // Get the task by taskId first
  const task = await context.entities.Task.findUnique({
    where: { id: taskId },
    include: { tags: true },  // Select tags associated with the task
  })

  // Return the tags associated with the task, or an empty array if none are found
  return task?.tags || []
}
