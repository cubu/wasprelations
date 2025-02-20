import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Task } from 'wasp/entities'
import { useQuery, useAction } from 'wasp/client/operations'

// Import the individual operation functions
import { getTaskById, updateTask, deleteTask, getSubtasks, createSubtask, updateSubtask, deleteSubtask } from 'wasp/client/operations'

export const TaskDetailsPage = () => {
  const { taskId } = useParams() // Get taskId from URL params
  const navigate = useNavigate() // To redirect after delete/update

  // State for task description and isDone status
  const [taskDescription, setTaskDescription] = useState('') // Task description state
  const [taskIsDone, setTaskIsDone] = useState(false) // Task status (done or not)

  // State for subtasks
  const [subtasks, setSubtasks] = useState<{ id: string; description: string; isDone: boolean; taskId: string }[]>([])
  const [newSubtaskDescription, setNewSubtaskDescription] = useState('') // Subtask description state

  // Handle case when taskId is undefined
  if (!taskId) {
    window.alert('Invalid task ID')
    navigate('/tasks') // Redirect to task list if taskId is invalid
    return null
  }

  // Fetch task data based on taskId from the URL
  const { data: task, isLoading, error } = useQuery(getTaskById, { id: taskId })
  const { data: subtasksData } = useQuery(getSubtasks, { taskId: taskId ?? '' })

  useEffect(() => {
    if (subtasksData) {
      setSubtasks(subtasksData) // Set subtasks once fetched
    }
    if (task) {
      setTaskDescription(task.description) // Set task description once fetched
      setTaskIsDone(task.isDone) // Set task isDone once fetched
    }
  }, [subtasksData, task])

  // Action for creating subtask
  const createSubtaskAction = useAction(createSubtask)

  const handleCreateSubtask = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!newSubtaskDescription.trim()) {
      window.alert('Please enter a subtask description')
      return
    }

    try {
      await createSubtaskAction({ taskId: taskId!, description: newSubtaskDescription })
      setNewSubtaskDescription('') // Clear the input field after creating the subtask
    } catch (error: any) {
      window.alert('Error creating subtask: ' + error.message)
    }
  }

  // Action for updating task
  const updateTaskAction = useAction(updateTask)

  // Action for deleting task
  const deleteTaskAction = useAction(deleteTask)

  // Action for updating subtask
  const updateSubtaskAction = useAction(updateSubtask)

  // Handle task description change
  const handleTaskDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(event.target.value)
  }

  // Handle task isDone status change
  const handleTaskIsDoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskIsDone(event.target.checked)
  }

  // Handle updating the task description and isDone status
  const handleUpdateTask = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!taskDescription.trim()) {
      window.alert('Description cannot be empty')
      return
    }

    try {
      await updateTaskAction({ id: taskId, description: taskDescription, isDone: taskIsDone })
      navigate('/tasks') // Redirect back to the tasks list
    } catch (error: any) {
      window.alert('Error updating task: ' + error.message)
    }
  }

  // Handle deleting task
  const handleDeleteTask = async () => {
    try {
      const confirmDelete = window.confirm(
        'Are you sure to delete this subtask?'
      )
      if (confirmDelete) {
        // Ensure taskId is a string before passing to deleteTaskAction
        await deleteTaskAction({ id: taskId })
        navigate('/tasks') // Redirect back to tasks list after deletion
      }
    } catch (error: any) {
      window.alert('Error deleting task: ' + error.message)
    }
  }

  // Handle updating subtask status
  const handleSubtaskStatusChange = async (subtaskId: string, isDone: boolean) => {
    try {
      await updateSubtaskAction({ id: subtaskId, isDone: !isDone }) // Toggle the subtask status
    } catch (error: any) {
      window.alert('Error updating subtask: ' + error.message)
    }
  }

  // Handle deleting subtask
  const handleDeleteSubtask = async (subtaskId: string) => {
    try {
      await deleteSubtask({ id: subtaskId }) // Call deleteSubtask action
    } catch (error: any) {
      window.alert('Error deleting subtask: ' + error.message)
    }
  }

  if (isLoading) return <div>Loading task...</div>
  if (error) return <div>Error loading task: {error.message}</div>

  return (
    <div>
      <h2>Task Details</h2>

      {/* Display task details */}
      <div>
        <p><strong>Description:</strong> {task?.description}</p>
        <p><strong>Status:</strong> {task?.isDone ? 'Done' : 'Not Done'}</p>
      </div>

      {/* Form to update task */}
      <form onSubmit={handleUpdateTask}>
        <div>
          <label>Update Task Description: </label>
          <input
            type="text"
            placeholder="New description"
            value={taskDescription}
            onChange={handleTaskDescriptionChange}
          />
        </div>

        <div>
          <label>Mark as Done: </label>
          <input
            type="checkbox"
            checked={taskIsDone}
            onChange={handleTaskIsDoneChange} // Handle checkbox change
          />
        </div>

        <button type="submit">Update Task</button>
      </form>

      {/* Button to delete task */}
      <div>
        <button onClick={handleDeleteTask}>Delete Task</button>
      </div>

      {/* Subtasks Section */}
      <h3>Subtasks</h3>
      <ul>
        {subtasks.map((subtask) => (
          <li key={subtask.id}>
            <div>
              {subtask.description} - {subtask.isDone ? 'Done' : 'Not Done'}
              <input
                type="checkbox"
                checked={subtask.isDone}
                onChange={() => handleSubtaskStatusChange(subtask.id, subtask.isDone)} // Toggle subtask status
              />
              <button onClick={() => handleDeleteSubtask(subtask.id)} style={{ color: 'red' }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Form for adding a new subtask */}
      <form onSubmit={handleCreateSubtask}>
        <input
          type="text"
          placeholder="Enter subtask description"
          value={newSubtaskDescription}
          onChange={(e) => setNewSubtaskDescription(e.target.value)}
        />
        <button type="submit">Add Subtask</button>
      </form>
    </div>
  )
}
