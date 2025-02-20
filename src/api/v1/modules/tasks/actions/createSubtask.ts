// src/api/v1/modules/tasks/actions/createSubtask.ts
import { Subtask } from 'wasp/entities'
import { CreateSubtask } from 'wasp/server/operations'

type CreateSubtaskPayload = {
  taskId: string
  description: string
}

export const createSubtask: CreateSubtask<CreateSubtaskPayload, Subtask> = async (
  { taskId, description },
  context
) => {
  return context.entities.Subtask.create({
    data: { taskId, description, isDone: false },
  })
}
