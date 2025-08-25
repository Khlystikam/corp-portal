import React, { useState, useEffect } from 'react';
import { createPortal } from "react-dom";

interface Props {
    visible: boolean;
    fuulText: string;
    onClose: () => void;
}

const PopUpWindow: React.FC<Props> = ( { visible, onClose, fuulText } ) => {
    const [visiblePopUp, setVisiblePopUp] = useState<string>("hidden");

    useEffect(() => {
        setVisiblePopUp(visible ? "flex" : "hidden");
    }, [visible]);


    return createPortal(
        <div className="pop-up-window-container absolute top-0 left-0 flex-col justify-start items-center gap-5 w-full h-full bg-gray-900/80 z-1000">
            <div
                className={`"pop-up-window absolute top-2/8 left-2/8 flex-col justify-start items-center gap-5 w-1/2 h-1/2 rounded-3xl bg-gray-700 p-10 " ${ visiblePopUp }`}
            >
                <p className="pop-up-window-title text-orange-200 font-bold">
                    Подробное описание вашей задачи
                </p>

                <p className="pop-up-window-text w-full h-full bg-gray-600/20 rounded-2xl p-4">
                    { fuulText }
                </p>

                <div className="pop-up-window-info flex flex-row justify-between items-center w-full text-gray-400">
                    <p className="pop-up-window-info-autor">
                        Автор: Максим Морской
                    </p>
                    <p className="pop-up-window-info-date">
                        Дата постановки задачи: 10.08.25
                    </p>
                </div>

                <button
                    title="button"
                    className="pop-up-close absolute top-2 right-2 w-4 cursor-pointer z-1000"
                    onClick={ onClose }
                >
                    <img
                        src="./assets/popup/close-icon.svg"
                        alt="close-icon"
                    />
                </button>
            </div>
        </div>,

        document.body
    );
};

export default PopUpWindow;