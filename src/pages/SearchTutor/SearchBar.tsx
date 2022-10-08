import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { TutorOrdersResponse } from './SearchTutor'
import { searchTutor } from './Service'

const SearchBar = (props: { setTutorList: Dispatch<SetStateAction<TutorOrdersResponse[]>> }) => {
    const { setTutorList } = props
    const [searchStr, setSearchStr] = useState('')


    const onChangeHandler = (e: any) => {
        setSearchStr(e.target.value)

    }
    const onClickHandler = () => {
        searchTutor(searchStr, setTutorList)
    }


    return (
        <>
            <div className="flex flex-row align-items-center gap-3 mb-5">
                <div className="flex ">
                    <span className="p-input-icon-left">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <InputText onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onClickHandler()
                            }
                        }} className="w-12" value={searchStr} onChange={onChangeHandler} placeholder="Session Name" />
                    </span>
                </div>
                <div className="flex flex-column align-items-center gap-3">
                    <Button onClick={onClickHandler} label="Search Tutor" className="p-button-tertiary" />
                </div>
            </div>
        </>
    )
}

export { SearchBar }