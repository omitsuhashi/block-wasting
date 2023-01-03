import React from "react";
import {ComponentElement} from "react";
import {createRoot} from "react-dom/client";

const Test = (): ComponentElement<any, any> => {
  return (
      <>
        <h2>popup</h2>
      </>
  )
}

window.onload =  () => {
  const container = document.getElementById('root');
  if (container === null) {
    throw new DOMException('id "root" is not found');
  }
  const root = createRoot(container);
  root.render(<Test />);
}
