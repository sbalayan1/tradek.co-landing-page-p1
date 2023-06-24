import Modal from 'react-modal'
import Image from 'next/image'


const customStyles = { overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' }, content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', backgroundColor: 'black', width: '25%', height: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } }
Modal.setAppElement('div');

interface Modals {
    isSelectorOpen: boolean,
    isWatchListOpen: boolean,
    isScreenerOpen: boolean
    [key: string]: boolean
}


export default function SelectorModal({ openModals, closeModals, modals }: { openModals: Function, closeModals: Function, modals: Modals}) {
    return (
        <Modal isOpen={modals.isSelectorOpen} onRequestClose={() => closeModals(['isSelectorOpen'])} style={customStyles}>
            <div className="flex justify-between text-2xl">   
                <h1>Choose a list type</h1>
                <button onClick={() => closeModals(['isSelectorOpen'])}>X</button>
            </div>
            <div className="flex justify-between">
                <div className="w-1/2">
                    <Image className="bg-white w-40 h-40" src='/next.svg' width={40} height={40} alt="next logo"/>
                    <div className="p-4">
                        <button onClick={() => openModals(['isWatchListOpen'])}>Create Watchlist</button>
                        <p className="text-[11px]">{'Keep an eye on investments you\'re interested in'}</p>
                    </div>
                </div>
                <div className="w-1/2">
                    <Image className="bg-white w-40 h-40" src='/vercel.svg' width={40} height={40} alt="vercel logo"/>
                    <div className="p-4">
                        <button onClick={() => openModals(['isScreenerOpen'])}>Create Screener</button>
                        <p className="text-[11px]">Find your next trade with filters for price, volume, and other indicators</p>
                    </div>
                </div>
            </div>
            <button className="w-full text-red-500" onClick={() => closeModals(['isSelectorOpen'])}>Go back</button>
        </Modal>
    )
}