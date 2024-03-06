import { LazyExoticComponent, lazy } from 'react';

export interface RouteDescriptor {
    path: string;
    component: LazyExoticComponent<React.ComponentType>;
    title?: string;
}

const routes: RouteDescriptor[] = [
    {
        path: '/',
        component: lazy(() => import('../components/views/Main')),
    },
];

export default routes;
