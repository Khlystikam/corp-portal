import React, { useState, useEffect } from 'react';
import { DocumentEditor } from '@onlyoffice/document-editor-react';

const OnlyOfficeEditor: React.FC = () => {
    const [documentConfig, setDocumentConfig] = useState<any>(null);

    useEffect(() => {
        // получаем конфиг + токен с бэкенда
        fetch("https://dev-magick-api.ru/my-projects/corp-portal/config.php?file=budget.xlsx")
        .then(res => res.json())
        .then(data => {
            setDocumentConfig({
            ...data.config,
            token: data.token, // токен прилетает из PHP
            });
        })
        .catch(err => console.error("Ошибка загрузки конфига:", err));
    }, []);

    if (!documentConfig) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <DocumentEditor
                id="onlyoffice-editor"
                documentServerUrl="https://dev-magick-api.ru/office/welcome/"
                config={documentConfig}
                events_onAppReady={() => console.log('Editor ready')}
                events_onDocumentStateChange={(event: any) => console.log('Changes:', event)}
            />
        </div>
    );
};

export default OnlyOfficeEditor;
