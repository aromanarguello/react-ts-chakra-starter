import { lazy } from 'react';

export const Home = lazy(() => import('pages/index'));
export const Login = lazy(() => import('pages/auth/Login'));
