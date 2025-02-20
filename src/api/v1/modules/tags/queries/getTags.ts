import { Tag } from 'wasp/entities' // Import Tag entity
import { type GetTags } from 'wasp/server/operations'

export const getTags: GetTags<void, Tag[]> = async (args, context) => {
  return context.entities.Tag.findMany({   
  })
}
