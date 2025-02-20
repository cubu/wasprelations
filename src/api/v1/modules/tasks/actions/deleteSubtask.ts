// src/api/v1/modules/tasks/actions/deleteSubtask.ts
import { Subtask } from 'wasp/entities'
import { DeleteSubtask } from 'wasp/server/operations'

type DeleteSubtaskPayload = { id: string }

export const deleteSubtask: DeleteSubtask<DeleteSubtaskPayload, Subtask> = async (
  { id },
  context
) => {
  return context.entities.Subtask.delete({
    where: { id },
  })
}
