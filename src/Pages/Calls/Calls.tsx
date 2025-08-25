import React from 'react';

interface Props {
    // Добавьте сюда свойства, если необходимо
    title?: string;
}

const Calls: React.FC<Props> = () => {
    return (
        <div>
            <p>Calls</p>
        </div>
    );
};

export default Calls;