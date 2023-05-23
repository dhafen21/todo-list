import React from "react";
import { UseFormRegister } from "react-hook-form";
import { TodoList } from "../Classes/TodoList";
import './task.css';

interface InputComponentProps {
    register: UseFormRegister<TodoList>;
    inputRef: React.MutableRefObject<HTMLInputElement | null>
    fieldPath: string;
    save: () => void;
}

let debounceTimer: NodeJS.Timeout;

export const InputComponent: React.FC<InputComponentProps> = ({register, inputRef, fieldPath, save}) => {

    const { ref, ...rest } = register(fieldPath as any);

    const handleDoubleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(
            inputRef.current.value.length,
            inputRef.current.value.length
          );
    }

    const handleSingleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        if (inputRef.current !== document.activeElement) {
            event.preventDefault();
        }
    }

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            inputRef.current?.blur();
            save();
        };
    }

    const onFocusOut = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                save();
            }, 1000);
    }

    return (
        <>
            <input
                className="input" 
                {...rest}
                ref={(e) => {
                    ref(e)
                    inputRef.current = e // you can still assign to ref
                  }}
                onMouseDown={handleSingleClick}
                onDoubleClick={handleDoubleClick}
                onKeyUp = {handleKeyUp}
                onBlur={onFocusOut}
            />
        </>
    )
}