import React, { useRef } from "react";
import { Control, useFieldArray, UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import { AddPlusCircle } from "../Assets/add-plus-circle";
import { CheckIcon } from "../Assets/check-icon";
import { PencilIcon } from "../Assets/pencil-icon";
import { TrashCanIcon } from "../Assets/trash-can";
import { TodoList } from "../Classes/TodoList";
import './task.css';
import { InputComponent } from "./InputComponent";
import { SubtaskComponent } from "./SubtaskComponent";

interface TaskComponentProps {
    methods : UseFormReturn<TodoList>;
    control: Control<TodoList, any>;
    index: number;
    id: string;
    removeTask: UseFieldArrayRemove;
    save: () => void;
}
export const TaskComponent: React.FC<TaskComponentProps> = ({methods, index, id, removeTask, save, control}) => {
    const completed = methods.watch(`list.${index}.completed`)
    const {fields, append, remove} = useFieldArray({name: `list.${index}.subtasks`, control})
    const colors = ["raspberry", "sky", "lime", "royal", "teal", "bubblegum", "amber"];
    const inputRef = useRef<HTMLInputElement | null>(null);
    const theme = colors[index % (colors.length)]

    const deleteEntireTask = () => {
        remove();
        removeTask(index);
        save();
    }

    const onCheck = () => {
        methods.setValue(`list.${index}.completed`, !completed);
        save();
    }
        
    return (
        <div className="outerWrapper" >
            <div 
                key={id} 
                className={`taskWrapper ${completed ? "disabled" : ""}
                ${theme}`}
            >
                <div style={{display: "flex"}}>
                <input 
                    type="checkbox" 
                    defaultChecked={completed} 
                    style={{pointerEvents:"auto"}}
                    onChange={onCheck}
                    />
                <InputComponent
                    register={methods.register}
                    inputRef={inputRef}
                    fieldPath={`list.${index}.description`}
                    save={save}
                />
                {false ? 
                    <CheckIcon/>: 
                    <PencilIcon onClick={() => {inputRef.current?.focus()}}/>
                }
                <TrashCanIcon onClick={deleteEntireTask}/>
                </div>
            </div>
            {fields.map((field, subtaskIndex) => {
                return (
                    <SubtaskComponent 
                        methods={methods}
                        theme={theme}
                        index={index}
                        subtaskIndex={subtaskIndex}
                        remove={remove}
                        key={field.id}
                        save={save}
                    />
                )
            })}
            <div className="add-subtask-icon" style={{display: completed ? "none": ""}}>
                <AddPlusCircle
                    onClick={() => {append({description: "", completed: false})}} 
                    height={24} 
                    width={24}
                />
            </div>
        </div>
    )
}