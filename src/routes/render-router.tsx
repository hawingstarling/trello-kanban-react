import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from 'src/pages/Home';
import NotFoundPage from 'src/pages/NotFound';
import MainLayout from 'src/layouts/main';

const RenderRouter: FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/**
         * Root Route
         * All primary pages are wrapped inside MainLayout
         */}
        <Route path="/" element={<MainLayout />}>
          {/*
           * HomePage
           * Default landing page of the application
           * Path: "/"
           */}
          <Route index element={<HomePage />} />

          {/*
           * Other page, etc...
           * <Route path="other-page" element={<OtherPage />} />
           */}

          {/*
           * NotFoundPage
           * Path: Any unmatched route ("*")
           */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RenderRouter;
