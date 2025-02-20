// src/api/v1/modules/tasks/actions/updateSubtask.ts
import { Subtask } from 'wasp/entities'
import { UpdateSubtask } from 'wasp/server/operations'

type UpdateSubtaskPayload = {
  id: string
  description?: string
  isDone: boolean
}

export const updateSubtask: UpdateSubtask<UpdateSubtaskPayload, Subtask> = async (
  { id, description, isDone },
  context
) => {
  return context.entities.Subtask.update({
    where: { id },
    data: { description, isDone },
  })
}
