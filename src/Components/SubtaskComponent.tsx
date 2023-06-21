import React, { useRef } from "react";
import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
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
    methods: UseFormReturn<TodoList, any>;
    remove: UseFieldArrayRemove;
    save: () => void;
}

export const SubtaskComponent: React.FC<SubtaskComponentProps> = ({index, theme, methods, subtaskIndex, remove, save}) => {
    const completed = methods.watch(`list.${index}.subtasks.${subtaskIndex}.completed`);
    const parentCompleted = methods.watch(`list.${index}.completed`);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const isCompleted = completed || parentCompleted;

    const onCheck = () => {
        methods.setValue(`list.${index}.subtasks.${subtaskIndex}.completed`, !completed)
        save();
    }

    const removeSubtask = () => {
        remove(subtaskIndex);
        save();
    }
    
    return (
        <div className={`subtaskWrapper ${theme} ${isCompleted ? "disabled" : ""}`}>
            <input 
                {...methods.register(`list.${index}.subtasks.${subtaskIndex}.completed`)}
                type="checkbox" 
                defaultChecked={completed} 
                style={{pointerEvents:"auto"}}
                onChange={onCheck}
                />
            <InputComponent
                register={methods.register}
                inputRef={inputRef}
                fieldPath={`list.${index}.subtasks.${subtaskIndex}.description`}
                save={save}
            />
            {false ? 
                <CheckIcon/>: 
                <PencilIcon height={18} width={18} onClick={() => {inputRef.current?.focus()}}/>
            }
            <TrashCanIcon height={18} width={18} onClick={() => {removeSubtask()}}/>
        </div>
        
    )
}