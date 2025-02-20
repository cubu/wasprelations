import { Tag } from 'wasp/entities'; // Import Tag entity
import { GetTagsForTask } from 'wasp/server/operations';

type GetTagsForTaskPayload = {
  taskId: string
}

export const getTagsForTask: GetTagsForTask<GetTagsForTaskPayload, Tag[]> = async ({ taskId }, context) => {
  return context.entities.Tag.findMany({
    where: {
      tasks: {
        some: {
          id: taskId
        }
      }
    },
  })
}
