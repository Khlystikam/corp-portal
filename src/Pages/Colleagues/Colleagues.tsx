import React from 'react';

interface Props {
    // Добавьте сюда свойства, если необходимо
    title?: string;
}

const Colleagues: React.FC<Props> = () => {
    return (
        <div>
            <p>Colleagues</p>
        </div>
    );
};

export default Colleagues;