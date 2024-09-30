import React, { useState } from "react";

interface ComponentProps {
    props?: {
        name: string;
        enableMouseHover?: boolean,
        styles?: React.CSSProperties; 
    };
    onClickAction?: () => void;

}

const BoxComponent: React.FC<ComponentProps> = ({ props, onClickAction }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleClick = () => {
        if (onClickAction) {
            onClickAction();
        }
    };

    const onMouseHover = (flag: boolean) =>{
      if(props?.enableMouseHover){
        setIsHovered(flag)
      }
    }

    return (
        <div
            style={{
                ...props?.styles,
                textAlign: 'center',
                backgroundColor: isHovered ? props?.styles?.backgroundColor : '',
                transition: 'background-color 0.3s ease', 
                cursor: props?.enableMouseHover ? 'pointer' : 'default', 
            }} 
            onClick={handleClick}
            onMouseEnter={()=> onMouseHover(true)}
            onMouseLeave={()=> onMouseHover(false)}
        >
            <p style={{fontWeight:"bold"}}>{props?.name}</p>
        </div>
    );
};

export default BoxComponent;
