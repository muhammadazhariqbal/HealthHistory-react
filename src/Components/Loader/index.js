import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmbulance } from '@fortawesome/free-solid-svg-icons'


const Loader = () => {
    return <>
        <div className="loader-container">
            <div className="loader-icon">
                <FontAwesomeIcon icon={faAmbulance} />
            </div>

        </div>
    </>
}
export default Loader