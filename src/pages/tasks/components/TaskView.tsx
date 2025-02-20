import { Task } from 'wasp/entities'
import { Link } from 'react-router-dom' // Import Link to navigate to TaskDetailsPage

interface TaskViewProps {
  task: Task
  handleMarkAsDone: (taskId: string, isDone: boolean) => void
  handleDeleteTask: (taskId: string) => void // Pass delete handler to handle task deletion
}

const TaskView: React.FC<TaskViewProps> = ({ task, handleMarkAsDone, handleDeleteTask }) => {
  return (
    <tr>
      <td style={{ textAlign: 'center' }}>
        {/* Task Title with hyperlink to TaskDetailsPage */}
        <Link to={`/tasks/${task.id}`} style={{ textDecoration: 'underline', color: 'blue' }}>
          {task.description}
        </Link>
      </td>
      <td style={{ textAlign: 'center' }}>
        {/* Checkbox to mark the task as done/undone */}
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => handleMarkAsDone(task.id, task.isDone)} // Call to handleMarkAsDone function
        />
      </td>
      <td style={{ textAlign: 'center' }}>
        {/* Button to delete the task */}
        <button onClick={() => handleDeleteTask(task.id)} style={{ color: 'red' }}>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default TaskView
