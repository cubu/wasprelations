import { Tag } from 'wasp/entities' // Import Tag entity
import { CreateTag } from 'wasp/server/operations'

type CreateTagPayload = {
  name: string
}

export const createTag: CreateTag<CreateTagPayload, Tag> = async ({ name }, context) => {
  return context.entities.Tag.create({
    data: { name },
  })
}