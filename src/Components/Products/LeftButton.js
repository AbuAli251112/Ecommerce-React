import React from 'react'
import next from '../../images/next.png'

const LeftButton = ( { index, setIndex }) => {
    const goLeft = () => {
        if (index > 0) {
            setIndex((prev) => prev - 1);
        }
    }
    return (
        <img
            src={next}
            alt=""
            width="35px"
            onClick={() => goLeft()}
            height="35px"
            style={{ position: "absolute", left: "3%", bottom: "50%" ,transform: "translate(0%, 50%)", cursor: index > 0 ? "pointer" : "not-allowed" }}
        />
    )
}

export default LeftButton