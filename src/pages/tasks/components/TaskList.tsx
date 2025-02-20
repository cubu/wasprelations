import { Task } from 'wasp/entities'
import TaskView from './TaskView'

interface TaskListProps {
  tasks: Task[]
  handleMarkAsDone: (taskId: string, isDone: boolean) => void
  handleDeleteTask: (taskId: string) => void // Pass delete handler to TaskView
}

const TaskList: React.FC<TaskListProps> = ({ tasks, handleMarkAsDone, handleDeleteTask }) => {
  if (!tasks || tasks.length === 0) {
    return <div>No tasks available.</div>
  }

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Render the table only once */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ width: '80%', textAlign: 'center' }}>Title</th>
            <th style={{ width: '5%', textAlign: 'center' }}>Done</th>
            <th style={{ width: '15%', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Render the task rows */}
          {tasks.map((task) => (
            <TaskView
              key={task.id}
              task={task}
              handleMarkAsDone={handleMarkAsDone}
              handleDeleteTask={handleDeleteTask} // Pass handleDeleteTask to TaskView
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskList
