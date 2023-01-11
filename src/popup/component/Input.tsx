import React, {
  PropsWithChildren,
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputProp = {
  reg: UseFormRegisterReturn;
  name: string;
  errorMessage?: string;
};

function Input({
  reg, children, name, errorMessage,
}: PropsWithChildren<InputProp>) {
  return (
    <>
      <label htmlFor={name}>
        {children}
        <input {...reg} name={name} />
      </label>
      <p>{errorMessage}</p>
    </>
  );
}

export default Input;
