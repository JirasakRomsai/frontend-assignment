import React from "react";

interface ColumnComponentProps {
    children?: any; 
}

const ColumnComponent: React.FC<ColumnComponentProps> = ({ children }) => {
    return (
        <div style={{ height: '100vh', border: '1px solid black' }}>
            {children}
        </div>
    );
};

export default ColumnComponent;
