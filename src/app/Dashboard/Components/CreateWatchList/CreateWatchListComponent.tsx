"use client"
import React, { useState } from 'react'
import SelectorModal from './SelectorModal'
import Modal from 'react-modal'
import Image from 'next/image'
import { postWatchListData } from '@/app/UserDataUtils/postWatchListData'

const customStyles = { overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' }, content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', backgroundColor: 'black', width: '25%' } }
Modal.setAppElement('div');

interface Modals {
    isSelectorOpen: boolean,
    isWatchListOpen: boolean,
    isScreenerOpen: boolean
    [key: string]: boolean
}

interface WatchList {
    id: number,
    name: string,
    icon: string,
    stocks: string[]
}


export default function CreateWatchListComponent({ addWatchList }: { addWatchList: Function}) {
    const [modals, setModals] = useState({
        isSelectorOpen: false,
        isWatchListOpen: false,
        isScreenerOpen: false
    })

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

    // const addWatchList = async () => {
    //     console.log('creating watchlist')
    //     // server side post request to localhost:4000/watchlists 
    //     // a watchList looks like the following: 
    //             // interface WatchList {
    //             //     name: string,
    //             //     icon: string,
    //             //     stocks: string[]
    //             // }
        
    //     // test a server side post request built out in your UserDataUtils
    //     // test to see if revalidation works and causes a rerender or if we need to pass our watchlists state into this component and update state. 
    //         // if we need to update state, then we have to make our watchlists container a client component


    // // test a regular post request on the client to see how NextJS works. Result: fails due to id error?
    //     // fetch('http://localhost:4000/watchlists', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Content-Type': 'application/json',

    //     //     },
    //     //     body: JSON.stringify({
    //     //         name: 'FAANG',
    //     //         icon: '/next.svg',
    //     //         stocks: ['msft', 'googl', 'meta', 'amzn']
    //     //     })
    //     // })

    //     const res = await postWatchListData()
    //     console.log(res)


    //     // { cache: no-store } lets us refetch our data on every render. this lets us make changes to our database and regrab our data on the server.
    // }

    return (
        <React.Fragment>
            {modals.isSelectorOpen ?
                <SelectorModal openModals={openModals} closeModals={closeModals} modals={modals}/>
            :
                <button className="text-2xl" onClick={() => openModals(['isSelectorOpen'])}>+</button>
            }

            {modals.isWatchListOpen && 
                <Modal isOpen={modals.isWatchListOpen} onRequestClose={() => closeModals(['isWatchListOpen', 'isSelectorOpen'])} style={customStyles}>
                    <div className="flex justify-between">
                        <h1>Create list</h1>
                        <button onClick={() => closeModals(['isSelectorOpen', 'isWatchListOpen'])}>X</button>
                    </div>
                    <div className="flex justify-between">
                        <Image className="bg-white" src="/icons8-feather-50.png" height={50} width={50} alt="temp logo" />
                        <input className="p-4 w-3/4 text-black" placeholder="List Name"/>
                    </div>
                    <div className="flex justify-end p-2 text-[13px]">
                        <button onClick={() => closeModals(['isWatchListOpen'])}>Cancel</button>
                        <button className="ml-4" onClick={() => addWatchList()}>Create List</button>
                    </div>
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