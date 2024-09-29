import Assignment1 from './Assignment1';
import Assignment2 from './Assignment2';



const Assignment = ({ id }: { id: string }) => {
    return (
        <div>
            {/* <h2>Assignment ID: {id}</h2>
            {id === '1' && <div>This is Page 1 for ID 1</div>}
            {id === '2' && <div>This is Page 2 for ID 2</div>}
            {id !== '1' && id !== '2' && <div>Page not found</div>} */}
            <h2>Assignment ID: {id}</h2>
            {id === '1' && <Assignment1 />}
            {id === '2' && <Assignment2 />}

        </div>
    );
};

export default Assignment


