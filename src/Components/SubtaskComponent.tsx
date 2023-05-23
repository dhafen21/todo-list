import React, { useRef } from "react";
import { UseFieldArrayRemove, UseFormRegister, UseFormWatch } from "react-hook-form";
import { CheckIcon } from "../Assets/check-icon";
import { PencilIcon } from "../Assets/pencil-icon";
import { TrashCanIcon } from "../Assets/trash-can";
import { TodoList } from "../Classes/TodoList";
import { InputComponent } from "./InputComponent";
import './subtask.css'

interface SubtaskComponentProps {
    index: number;
    subtaskIndex: number;
    theme: string;
    register: UseFormRegister<TodoList>;
    watch: UseFormWatch<TodoList>;
    remove: UseFieldArrayRemove;
    save: () => void;
}

export const SubtaskComponent: React.FC<SubtaskComponentProps> = ({index, theme, register, watch, subtaskIndex, remove, save}) => {
    const completed = watch(`list.${index}.subtasks.${subtaskIndex}.completed`);
    const parentCompleted = watch(`list.${index}.completed`);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const isCompleted = completed || parentCompleted;
    
    return (
        <div className={`subtaskWrapper ${theme} ${isCompleted ? "disabled" : ""}`}>
            <input 
                {...register(`list.${index}.subtasks.${subtaskIndex}.completed`)}
                type="checkbox" 
                defaultChecked={completed} 
                style={{pointerEvents:"auto"}}
                />
            <InputComponent
                register={register}
                inputRef={inputRef}
                fieldPath={`list.${index}.subtasks.${subtaskIndex}.description`}
                save={save}
            />
            {false ? 
                <CheckIcon/>: 
                <PencilIcon height={18} width={18} onClick={() => {inputRef.current?.focus()}}/>
            }
            <TrashCanIcon height={18} width={18} onClick={() => {remove(subtaskIndex)}}/>
        </div>
        
    )
}