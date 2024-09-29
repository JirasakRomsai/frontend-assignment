import React from "react";

interface ComponentProps {
    props?: {
        name: string;
    };
    onClickAction?: () => void;
}

const BoxComponent: React.FC<ComponentProps> = ({ props, onClickAction }) => {
    const handleClick = () => {
        if (onClickAction) {
            onClickAction();
        }
    };

    return (
        <div style={{ border: '1px solid black', textAlign: 'center' }} onClick={handleClick}>
            <p>{props?.name}</p>
        </div>
    );
};

export default BoxComponent;
