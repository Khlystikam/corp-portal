import React from 'react';
import GetNameUserFiles from './GetNameUserFiles';
import GetDocumentServer from './GetDocumentServer';

const Documents: React.FC = () => {
    return (
        <div className="Documents flex flex-col justify-between gap-5 items-center w-1/1 h-auto">
            <div className="Documents-line-one flex flex-row w-1/1 h-50 justify-around items-center gap-3">
                <div className="flex flex-row w-1/2 h-1/1 justify-around items-center rounded-xl bg-gray-900/50">
                    <GetNameUserFiles />
                </div>
                <div className="flex flex-row w-1/2 h-1/1 justify-around items-center rounded-xl bg-gray-900/50">
                    02
                </div>
            </div>
            <div className="Documents-line-two flex flex-row w-1/1 h-300 justify-around items-center gap-3">
                <div className="flex flex-row w-1/1 h-1/1 justify-around items-center rounded-xl bg-gray-900/50">
                    <GetDocumentServer />
                </div>
            </div>
        </div>
    );
};

export default Documents;