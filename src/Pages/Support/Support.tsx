import React from 'react';

interface Props {
    // Добавьте сюда свойства, если необходимо
    title?: string;
}

const Support: React.FC<Props> = () => {
    return (
        <div>
            <p>Support</p>
        </div>
    );
};

export default Support;