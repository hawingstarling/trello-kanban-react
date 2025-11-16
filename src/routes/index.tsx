import { Suspense } from 'react';
import RenderRouter from './render-router';


const Routes = () => {
  return (
    <Suspense fallback="loading...">
        <RenderRouter />
    </Suspense>
  );
};

export default Routes;
