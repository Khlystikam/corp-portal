import React from 'react';

interface Props {
    // Добавьте сюда свойства, если необходимо
    title?: string;
}

const Mailing: React.FC<Props> = () => {
    return (
        <div>
            <p>Mailing</p>
        </div>
    );
};

export default Mailing;