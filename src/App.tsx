import './App.css';
import { TodoList } from './Classes/TodoList'
import {useFieldArray, useForm} from 'react-hook-form';
import { TaskComponent } from './Components/TaskComponent';
import { useEffect, useRef, useState } from 'react';
import { AddPlusCircle } from './Assets/add-plus-circle';
import checkmark from './Assets/checked.png'

function App() {
  const { chrome } = window;

  let debounceTimer: NodeJS.Timeout;

  const {control, handleSubmit, register, watch, setValue, getValues} = useForm<TodoList>();

  const {fields, append, remove} = useFieldArray({name: "list", control})

  const [display, setDisplay] = useState("none")

  const addNewTask = () => {
    append({
      description: "",
      completed: false,
      subtasks: []
    })
  }

  const writeToStorage = (data: TodoList) => {
    setDisplay("visible");
    chrome.storage.local.set({ 'todo-list': data });
    debounceTimer = setTimeout(() => {
      setDisplay("")
    }, 1000);
  }

  const submit = (data: TodoList) => {	
    console.log(data);
    writeToStorage(data);
  };

  const save = () => {
    writeToStorage(getValues())
  }

  useEffect(() => {
    chrome.storage.local.get('todo-list').then((data)=> {
      setValue("list", data["todo-list"]["list"])
    })
  }, [setValue]);

  const formRef = useRef<HTMLFormElement>(null)
  return (
    <div className="App">
      <header className="App-header">
        <form ref={formRef} onSubmit={handleSubmit(submit)}>
          <AddPlusCircle onClick={addNewTask}/> 
          {fields.map((field, index) => {
            return (
              <TaskComponent
                key={index}
                register={register} 
                index={index} 
                id={field.id}
                removeTask={remove}
                watch={watch}
                control={control}
                save={save}
              />
            )
          })}
          {/* <input type="submit"/> */}
        </form>
        <div className={`savedNotification ${display}`}>
          <img src={checkmark}/>
          <span>Saved</span>
        </div>
      </header>
    </div>
  );
}

export default App;
