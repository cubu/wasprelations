import { Tag } from 'wasp/entities' // Import Tag entity
import { DeleteTag } from 'wasp/server/operations'

type DeleteTagPayload = {
  id: string
}

export const deleteTag: DeleteTag<DeleteTagPayload, Tag> = async ({ id }, context) => {
  return context.entities.Tag.delete({
    where: { id },
  })
}