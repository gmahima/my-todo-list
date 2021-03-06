import React, { useContext} from "react";
//import { Consumer } from "./context/index";
import styled from "styled-components";
import { TaskContext } from "./context/index";
import tw from 'twin.macro'
const TaskName = styled.span`
  ${tw`text-gray-700`}
  display: grid;
  align-content: center;
  font-size: 1em;
  text-decoration: ${({checked}) =>  (checked? 'line-through': 'none')};
  @media(max-width: 400px) {
    font-size: 0.7em;
    
  }
`;

const CloseButton = styled.button`
cursor: pointer;
align-self: stretch;
justify-self: stretch;
${tw`text-center rounded sm:text-base text-xs py-0 sm:px-8 px-2  text-gray-500 hover:bg-opacity-75`}
`;

const ToDoItem = styled.div`
height: 100%;
display: grid;
grid-template-columns: auto 1fr auto;
align-items: stretch;
grid-gap: 1px;
${tw`border-b border-gray-300`}
`

const CheckLabel = styled.label`
${tw`text-center rounded sm:text-base text-xs py-0 sm:p-4 p-2  text-gray-500 hover:bg-opacity-75`}
display: grid;
align-content: center;
justify-content: space-around;
padding: 1em;
cursor: pointer;
grid-template-columns: 1fr;
@media(max-width: 400px) {
  padding:0.5em;
  font-size: 0.5em;
  
}
`
const CheckInput = styled.input`
color: #707070;
background: none;
display: none;

`
export default function Task({ id }) {
  const context = useContext(TaskContext);

  const handleChange = (e) =>{
    context.actions.toggleIsDone(e.target.value, e.target.checked)
  }
    let task = null;

 
          
          for(let i = 0; i<context.tasks.length; i++)  {
        if(context.tasks[i].id === id) {
          task = context.tasks[i];
        }
    }
    // useEffect(()=>{
    //   if (isInitialMount.current) {
    //     isInitialMount.current = false;
    //  }
    //   else { context.actions.toggleIsDone(task.id)}
    // },[toggle])
  

  
  if(task===null) {
    return null;
  }
  return (
    
        <ToDoItem>
        <CloseButton
          onClick={() => {
            return context.actions.removeTask(task.id);
          }}
        >
          &times;
        </CloseButton>
        <TaskName checked={task.checked}>{task.name}</TaskName>
       
        <CheckLabel checked={task.checked}>
          <CheckInput type="checkbox"
            value={task.id}
            checked={task.checked}
            onChange={handleChange}
          />
          {task.checked? 'undo': 'done'}
        </CheckLabel>
        </ToDoItem>

    
  );
}
