import React, { useState, useEffect } from 'react';
import { createPortal } from "react-dom";
import module from './PopUpWindow.module.css';

interface Props {
    visible: boolean;
    fullText: {
        text: string;
        author: string;
        date: string;
    };
    onClose: () => void;
}

const PopUpWindow: React.FC<Props> = ( { visible, onClose, fullText } ) => {
    const [visiblePopUp, setVisiblePopUp] = useState<string>("hidden");

    useEffect(() => {
        setVisiblePopUp(visible ? "flex" : "hidden");
    }, [visible]);


    return createPortal(
        <div className={ module.popUpWindowContainer }>
            <div
                className={`${module.popUpWindow} ${visiblePopUp}`}
            >
                <p className={ module.popUpWindowTitle }>
                    Подробное описание вашей задачи
                </p>

                <p className={ module.popUpWindowText }>
                    { fullText.text }
                </p>

                {fullText.author && fullText.date && (
                    <div className={ module.popUpWindowInfo }>
                        <div className={ module.popUpWindowInfo__author }>
                            <p className={ module.popUpWindowInfo__authorTitle }>Автор задачи:</p>
                            <p className={ module.popUpWindowInfo__authorText }>{ fullText.author }</p>
                        </div>
                        
                        <div className={ module.popUpWindowInfo__date }>
                            <p className={ module.popUpWindowInfo__dateTitle }>Дата постановки:</p>
                            <p className= { module.popUpWindowInfo__dateText }>{ fullText.date }</p>
                        </div>
                    </div>
                )}

                <button
                    title="button"
                    className={ module.popUpClose }
                    onClick={ onClose }
                >
                    <img
                        src="./assets/popup/close-icon.svg"
                        alt="close-icon"
                    />
                </button>
            </div>
        </div>, document.body
    );
};

export default PopUpWindow;