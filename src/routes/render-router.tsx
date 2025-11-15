import MainLayout from '@components/layouts/main-layout';
import HomePage from '@components/pages/home-page';
import NotFoundPage from '@components/pages/not-found-page';
import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
  )
}

export default RenderRouter;
