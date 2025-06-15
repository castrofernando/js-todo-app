import AppContainer from '../components/AppContainer/AppContainer'
import { Container, TextField, List, ListItem, Divider,ListItemText, 
  Card, CardMedia, CardContent, Typography, Checkbox} from '@mui/material'
import todoImage from '../assets/todo.jpg'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import './App.css'
import { Fragment, useEffect, useState } from 'react';
import type { Task } from '../model/task';
import DeleteIcon from '@mui/icons-material/Delete';
import {AXIOS} from '../services/httpService';
import { useSnackbar} from 'notistack';

function App() {
  const [Tasks,SetTasks] = useState<Task[]>([]);
  const [NewTask, SetNewTask] = useState<string>('');
  const [FilteredTasks, SetFilteredTasks] = useState<Task[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const onInputTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetNewTask(event.target.value);
  }

  const updateTask = (id: string, done: boolean) => {
    const response = AXIOS.patch<Task>(`/task/${id}`, {
      done: done
    });
    response.then((res) => {
      const updatedTasks = Tasks.map(t => t.id === res.data.id ? res.data : t);
      SetTasks(updatedTasks);
      SetFilteredTasks(updatedTasks); // Update filtered tasks as well
    }).catch((e) => {
      enqueueSnackbar(`Error updating task ${e}`, {autoHideDuration: 3000, variant: 'error'});
    });
  }

  const removeTask = (id: string) => {
    const response = AXIOS.delete(`/task/${id}`);
    response.then(() => {
      SetTasks(Tasks.filter(task => task.id !== id));
      SetFilteredTasks(FilteredTasks.filter(task => task.id !== id)); // Update filtered tasks as well
      enqueueSnackbar('Task removed successfully', {autoHideDuration: 3000, variant: 'success'});
    }).catch((e) => {
      enqueueSnackbar(`Error removing task ${e}`, {autoHideDuration: 3000, variant: 'error'});
    });
  }
  
  const handleAddTask = () => {
    if (NewTask.trim() === '') {
      console.error('Task description cannot be empty');
      enqueueSnackbar('Task description cannot be empty', {autoHideDuration: 3000, variant: 'error'});
      return;
    }
    // Create a new task object
    const response = AXIOS.post<Task>('/task', {
      description: NewTask,
      done: false
    });
    response.then((res) => {
      SetTasks([...Tasks, res.data]);
      SetFilteredTasks([...FilteredTasks, res.data]); // Update filtered tasks as well
      SetNewTask(''); // Clear the input field after adding the task
      enqueueSnackbar('Task added successfully', {autoHideDuration: 3000, variant: 'success'});
    }
    ).catch((e) => {
      enqueueSnackbar(`Error adding task ${e}`, {autoHideDuration: 3000, variant: 'error'});
    }
    );
  }

  const handleTaskChanged = (event: React.ChangeEvent<HTMLInputElement>, task:Task) => {
    updateTask(task.id, event.target.checked);
    enqueueSnackbar(`Task ${task.description} marked as ${event.target.checked ? 'done' : 'not done'}`, {autoHideDuration: 3000, variant: 'info'});
  };

  const retrieveTasks = async () => {
    try {
      const response = await AXIOS.get<Task[]>(`/task`); 
      SetTasks(response.data);
      SetFilteredTasks(response.data); // Store the original tasks for filtering);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    const fetchTasks = () => {     
      retrieveTasks();
    };
    fetchTasks();
  }, []);

  const handleSearchChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      const tasks = Tasks.filter(task => task.description.toLowerCase().includes(searchTerm));
      SetFilteredTasks(tasks);
    } else {
      retrieveTasks(); // Reset to all tasks if search term is empty
    }
  };

  return (
      <>
        <AppContainer handleSearchChanged={handleSearchChanged}/>
        <Container>
          <Card sx={{ margin: 'auto', marginTop: 2, height: '90vh'}}>
              <CardMedia
                component="img"
                height="140"
                image={todoImage}
                alt="list of tasks"
              />
              <Fab color="primary" className="add-todo" aria-label="add" onClick={handleAddTask}>
                <AddIcon />
              </Fab>
              <CardContent>
                <Typography component={'span'} variant="body2" sx={{ color: 'text.secondary' }}>
                  <div className='todo-content'>
                    <div className="todo-input">
                      <TextField required fullWidth value={NewTask} id="standard-basic" label="ADD A NEW TASK" variant="standard" onChange={onInputTextChange}/>
                    </div>
                    <div className='todo-tasks'>
                    <List sx={style} aria-label="mailbox folders">
                      { FilteredTasks.length === 0 && (
                        <ListItem>
                          <ListItemText primary="No tasks found" />
                        </ListItem>
                      )}  

                      {FilteredTasks.map((t) => (
                        <Fragment key={t.id}>
                        <ListItem key={t.id} className={t.done ? 'done' : ''}>
                          <Checkbox defaultChecked color="success" onChange={event => handleTaskChanged(event, t)} checked={t.done}/>
                          <ListItemText primary={t.description} sx={t.done ? { textDecoration: 'line-through'  } : {}} />                     
                          <DeleteIcon className='remove-icon' onClick={() => removeTask(t.id)}/>
                        </ListItem>
                        {FilteredTasks.indexOf(t) < FilteredTasks.length -1 && (
                          <Divider component="li" />
                        )}
                        </Fragment>
                      ))}                 
                    </List>
                    </div>  
                  </div>              
                </Typography>
              </CardContent>
          </Card>
        </Container>
      </>
  )
}

  const style = {
  width: '100%',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
};
export default App
