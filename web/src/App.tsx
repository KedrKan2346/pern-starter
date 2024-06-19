import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { NoMatchLayout } from "@features/shared/layouts";
import { Subjects, AddSubject, EditSubject } from "@features/subjects";

export function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index element={<Subjects />} />
          <Route path="add" element={<AddSubject />} />
          <Route path="edit" element={<EditSubject />} />

          {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
          <Route path="*" element={<NoMatchLayout />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
