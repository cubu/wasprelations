// src/api/v1/modules/tasks/queries/getSubtasks.ts
import { Subtask } from 'wasp/entities'
import { GetSubtasks } from 'wasp/server/operations'

export const getSubtasks: GetSubtasks<{ taskId: string }, Subtask[]> = async (
  { taskId },
  context
) => {
  return context.entities.Subtask.findMany({
    where: { taskId },
  })
}
