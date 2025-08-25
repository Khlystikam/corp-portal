import React from 'react';

interface Props {
    // Добавьте сюда свойства, если необходимо
    title?: string;
}

const Projects: React.FC<Props> = () => {
    return (
        <div>
            <p>Projects</p>
        </div>
    );
};

export default Projects;