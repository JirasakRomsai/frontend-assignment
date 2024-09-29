import React from "react";

interface ColumnComponentProps {
    // Component: React.ComponentType<any>;
    props?: any; // props ที่จะส่งให้กับคอมโพเนนต์
    children?: React.ReactNode; // children ที่จะส่งเข้าไป
    onClickRemove?: (event: React.MouseEvent) => void;
}

const ColumnComponent: React.FC<ColumnComponentProps> = ({ props, children, onClickRemove }) => {
    console.log("props -", props)
    return (
        <div style={{ height: '100vh', border: '1px solid black' }}
            onMouseDown={onClickRemove}>
            {children}
        </div>
    );
};

export default ColumnComponent;
