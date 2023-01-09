import React, {
  FormEvent,
  FormEventHandler, PropsWithChildren, useState,
} from 'react';
import { z } from 'zod';

type InputValueType = string | number | readonly string[];
type InputFormEvent = FormEvent<HTMLInputElement>;

type InputProp = {
  name: string;
  value?: InputValueType;
  onInput?: FormEventHandler<HTMLInputElement>;
  onBlur?: FormEventHandler<HTMLInputElement>;
  errorMessages?: Array<string>;
};

export const useInput = (schema: z.ZodSchema, args?: { value?: InputValueType }) => {
  type SchemaType = z.infer<typeof schema>;
  const [inputValue, setInput] = useState<SchemaType>(args?.value ?? '');
  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);
  const onInput = (ev: InputFormEvent) => {
    setInput(ev.currentTarget.value);
  };
  const onBlur = (ev: InputFormEvent) => {
    const numberValue = ev.currentTarget.valueAsNumber;
    const strValue = ev.currentTarget.value;
    const parsedStrValue = strValue.trim().length !== 0 ? strValue : undefined;
    const value = Number.isNaN(numberValue) ? parsedStrValue : numberValue;
    const validation = schema.safeParse(value);
    if (!validation.success) {
      const errors = validation.error.issues.map((issue) => issue.message);
      setErrorMessages(errors);
    } else {
      setErrorMessages([]);
    }
  };
  return {
    value: inputValue, errorMessages, onInput, onBlur,
  };
};

function Input({
  onInput, onBlur, value, children, name, errorMessages = [],
}: PropsWithChildren<InputProp>) {
  const errorMessage = errorMessages.length > 0 ? errorMessages[-1] : '';
  return (
    <>
      <label htmlFor={name}>
        {children}
        <input type="number" value={value} onInput={onInput} onBlur={onBlur} name={name} />
      </label>
      <p>{errorMessage}</p>
    </>
  );
}

export default Input;
