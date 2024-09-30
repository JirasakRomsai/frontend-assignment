import { lazy } from 'react';
const Assignment1 = lazy(() => import('./Assignment1'));
const Assignment2 = lazy(() => import('./Assignment2'));

const Assignment = ({ id }: { id: string }) => {
    return (
        <div>
            <h2>Assignment ID: {id}</h2>
            {id === '1' && <Assignment1 />}
            {id === '2' && <Assignment2 />}
        </div>
    );
};

export default Assignment;
