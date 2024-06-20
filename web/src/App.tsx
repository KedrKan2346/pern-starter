import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { NoMatchLayout } from '@features/shared/layouts';
import { Subjects, AddSubject, EditSubject } from '@features/subjects';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

export function App() {
  const queryClient = new QueryClient();
  return (
    <React.StrictMode>
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </MantineProvider>
    </React.StrictMode>
  );
}
