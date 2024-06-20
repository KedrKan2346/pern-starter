import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { NoMatchLayout } from '@features/shared/layouts';
import { Subjects, AddSubject, EditSubject } from '@features/subjects';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

export function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <React.StrictMode>
      <MantineProvider>
        <ModalsProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route index element={<Subjects />} />
                <Route path="add" element={<AddSubject />} />
                <Route path="edit/:id" element={<EditSubject />} />

                {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
                <Route path="*" element={<NoMatchLayout />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </ModalsProvider>
      </MantineProvider>
    </React.StrictMode>
  );
}
