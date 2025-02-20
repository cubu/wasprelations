import { useState } from 'react'
import { useQuery } from 'wasp/client/operations'
import { Task } from 'wasp/entities'
import TaskList from './components/TaskList'
import { getFilteredTasks, markTaskAsDone, createTask, deleteTask } from 'wasp/client/operations'

export const TaskPage = () => {
  const [filter, setFilter] = useState<'all' | 'done' | 'notDone'>('all') // State for filter
  const [newTaskDescription, setNewTaskDescription] = useState('') // State for new task description

  // Fetch tasks based on filter
  const { data: tasks, isLoading, error } = useQuery(getFilteredTasks, {
    isDone: filter === 'all' ? undefined : filter === 'done' ? true : false
  })

  // Handle task marked as done or undone
  const handleMarkAsDone = async (taskId: string, isDone: boolean) => {
    try {
      await markTaskAsDone({ id: taskId, isDone: !isDone }) // Toggle isDone state
    } catch (error: any) {
      window.alert('Error while updating task status: ' + error.message)
    }
  }

  // Handle new task description change
  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskDescription(event.target.value) // Update the new task description
  }

  // Handle new task form submission
  const handleCreateNewTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent page reload on form submission
    if (newTaskDescription.trim() === '') {
      window.alert('Please enter a task description')
      return
    }

    try {
      // Call the createTask function to create the new task
      await createTask({ description: newTaskDescription })
      setNewTaskDescription('') // Clear the input field after creating the task
    } catch (error: any) {
      window.alert('Error while creating task: ' + error.message)
    }
  }

  // Handle task deletion
  const handleDeleteTask = async (taskId: string) => {
    try {
      const confirmDelete = window.confirm(
        'If you click delete this task, all the subtasks of it will also be deleted. Are you sure?'
      )
      if (confirmDelete) {
        await deleteTask({ id: taskId }) // Call deleteTask action
      }
    } catch (error: any) {
      window.alert('Error while deleting task: ' + error.message)
    }
  }

  // Handle filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as 'all' | 'done' | 'notDone') // Update filter state based on user selection
  }

  if (isLoading) return <div>Loading tasks...</div>
  if (error) return <div>Error loading tasks</div>

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Task List</h2>

      {/* Create Task Form */}
      <div style={{ marginBottom: '20px' }}>
        <form onSubmit={handleCreateNewTask}>
          <input
            type="text"
            placeholder="Enter task description"
            value={newTaskDescription}
            onChange={handleNewTaskChange}
            style={{ padding: '8px', width: '300px', fontSize: '16px' }}
          />
          <button type="submit" style={{ padding: '8px 12px', fontSize: '16px' }}>
            Create Task
          </button>
        </form>
      </div>

      {/* Filter dropdown to select tasks by status */}
      <div>
        <label>Filter by status: </label>
        <select value={filter} onChange={handleFilterChange} style={{ padding: '8px', fontSize: '16px' }}>
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="notDone">Not Done</option>
        </select>
      </div>

      {/* Pass filtered tasks and handleMarkAsDone function to TaskList */}
      <TaskList tasks={tasks || []} handleMarkAsDone={handleMarkAsDone} handleDeleteTask={handleDeleteTask} />
    </div>
  )
}
