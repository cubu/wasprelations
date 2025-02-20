import { Task } from 'wasp/entities'
import { type GetTasks } from 'wasp/server/operations'

// Define the type for the query arguments
type GetFilteredTasksArgs = {
  isDone?: boolean  // This will filter tasks based on whether they are done or not
}

export const getFilteredTasks: GetTasks<GetFilteredTasksArgs, Task[]> = async (
  args,
  context
) => {
  // Build the filter criteria
  const filter: any = {}
  if (args.isDone !== undefined) {
    filter.isDone = args.isDone
  }

  // Fetch tasks from the database based on the filter
  return context.entities.Task.findMany({
    where: filter,
    orderBy: { id: 'asc' },
  })
}
