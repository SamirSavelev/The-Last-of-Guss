import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { LoginPage, RoundsPage, RoundPage } from '@pages';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/rounds',
    element: <RoundsPage />,
  },
  {
    path: '/rounds/:roundId',
    element: <RoundPage />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
];
