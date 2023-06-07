import React from 'react'
import prev from '../../images/prev.png'
const RightButton = ({ index, setIndex, length }) => {
    const goRight = () => {
        if (index < length - 1) {
            setIndex((prev) => prev + 1);
        }
    }
    return (
        <img
            src={prev}
            alt=""
            width="35px"
            onClick={() => goRight()}
            height="35px"
            style={{ position: "absolute", left: "92%", bottom: "50%", transform: "translate(-50%, 50%)", cursor: index === length - 1 ? "not-allowed" : "pointer" }}
        />
    )
}


export default RightButton
