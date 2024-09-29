import { Suspense, lazy } from 'react';
import { createBrowserRouter, useParams } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/Home'));
const AssignmentIndexPage = lazy(() => import('../pages/assignment/index'));
const LoadingComponent = lazy(() => import('../components/Loading'));

const AssignmentWrapper = () => {
    const { id } = useParams<{ id: string }>();
    return <AssignmentIndexPage id={id!} />;
};
const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <HomePage />
            </Suspense>
        ),
    },
    {
        path: "assignment/:id",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <AssignmentWrapper />
            </Suspense>
        ),
    },
]);

export default router;
