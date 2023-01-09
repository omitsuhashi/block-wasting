import React, { PropsWithChildren } from 'react';

type ButtonProp = {
  disable?: boolean,
  onClick?: () => void
};

function Button({ onClick, disable = false, children }: PropsWithChildren<ButtonProp>) {
  return (
    <button type="submit" disabled={disable} onClick={onClick}>{children}</button>
  );
}

export default Button;
