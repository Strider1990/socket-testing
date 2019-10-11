import React from 'react';

const Input = ({errors, ...props}) => {
    return (
        <>
        <input
            { ...props }
        />
        <span className="ml-2 text-red-500">{ errors }</span>
        </>
    )
};

export default React.memo(Input);