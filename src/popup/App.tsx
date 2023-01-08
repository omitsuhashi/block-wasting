import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import React from 'react';
import RootPage from './pages/Index';
import GroupPage from './pages/groups/Index';
import { BASE_PATH } from './const';

function PopupApp(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${BASE_PATH}/`} element={<RootPage />} />
        <Route path={`${BASE_PATH}/groups/:group`} element={<GroupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

window.onload = () => {
  const container = document.getElementById('root');
  if (container === null) {
    throw new DOMException('id "root" is not found');
  }
  const root = createRoot(container);
  root.render(<PopupApp />);
};
