import { Tag } from 'wasp/entities' // Import Tag entity
import { UpdateTag } from 'wasp/server/operations'

type UpdateTagPayload = {
  id: string
  name: string
}

export const updateTag: UpdateTag<UpdateTagPayload, Tag> = async ({ id, name }, context) => {
  return context.entities.Tag.update({
    where: { id },
    data: { name },
  })
}