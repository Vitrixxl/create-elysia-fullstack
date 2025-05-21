import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout } from '@/app/layout';
import { Page2 } from '@/app/page-2/page';
import { HomePage } from './app/page';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/page-2' element={<Page2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
