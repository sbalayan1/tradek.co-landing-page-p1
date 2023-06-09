"use client"
import React, { ReactNode, useState } from 'react'
import SelectorModal from './SelectorModal'
import Modal from 'react-modal'
import Image from 'next/image'

const customStyles = { overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' }, content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', backgroundColor: 'black', width: '25%' } }
Modal.setAppElement('div');

interface Modals {
    isSelectorOpen: boolean,
    isWatchListOpen: boolean,
    isScreenerOpen: boolean
    [key: string]: boolean
}


export default function CreateWatchListComponent({ addWatchList }: { addWatchList: Function }) {
    const [modals, setModals] = useState({
        isSelectorOpen: false,
        isWatchListOpen: false,
        isScreenerOpen: false
    })

		const [watchlistName, setWatchlistName] = useState('')

    const openModals = (tgts: string[]) => {
        const copy: Modals = {...modals}
        if (tgts.includes('isWatchListOpen') || tgts.includes('isScreenerOpen')) copy['isSelectorOpen'] = false
        tgts.forEach(tgt => copy[tgt] = true)
        setModals(copy)
    }

    const closeModals = (tgts: string[]) => {
        const copy: Modals = {...modals}
        tgts.forEach(tgt => copy[tgt] = false)
        setModals(copy)
    }

		const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			addWatchList(watchlistName) // post request to database
			setWatchlistName('') // reset form
			closeModals(['isWatchListOpen']) // close modal
		}

    return (
        <React.Fragment>
            {modals.isSelectorOpen ?
                <SelectorModal openModals={openModals} closeModals={closeModals} modals={modals}/>
            :
                <button className="text-2xl" onClick={() => openModals(['isSelectorOpen'])}>+</button>
            }

						{/* modal for adding new watchlists to the database */}
            {modals.isWatchListOpen && 
                <Modal isOpen={modals.isWatchListOpen} onRequestClose={() => closeModals(['isWatchListOpen', 'isSelectorOpen'])} style={customStyles}>
                    <div className="flex justify-between">
                        <h1>Create list</h1>
                        <button onClick={() => closeModals(['isSelectorOpen', 'isWatchListOpen'])}>X</button>
                    </div>
                    <form className="" onSubmit={handleSubmit}>
											<div className="flex justify-between">
                        <Image className="bg-white" src="/icons8-feather-50.png" height={50} width={50} alt="temp logo" />
                        <input className="p-4 w-3/4 text-black" placeholder="List Name" value={watchlistName} onChange={(e) => setWatchlistName(e.target.value)}/>
											</div>
											<div className="flex justify-end p-2 text-[13px]">
													<button onClick={() => closeModals(['isWatchListOpen'])}>Cancel</button>
													<button className="ml-4" type='submit'>Create List</button>
											</div>
										</form>
                </Modal>
            }

            {modals.isScreenerOpen && 
                <Modal isOpen={modals.isScreenerOpen} onRequestClose={() => closeModals(['isScreenerOpen', 'isSelectorOpen'])} style={customStyles}>
                    This is the screener modal
                </Modal>
            }
        </React.Fragment>
    )
}