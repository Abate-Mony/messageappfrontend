import { useRef, React } from 'react'

const Emj = ({ modal,_message }) => {
    const doSomething = (e) => {
        console.log(e.target.textContent)
        const emj=e.target.textContent;
        _message.current.value+=emj
    }
    const emjs = [<>😁</>,<>🥶</>,<>🐯</>,<>👩‍❤️‍👩</>,<>👩</>,<>👩‍🚒</>,<>🤶</>,<>👫</>,<>👩🏿</>,<>👩🏼</>,<>👰</>,<>👩🏼</>,<>👩🏼</>,<>👨‍🌾</>,<>👩‍💻</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,<>😁</>,]

    return (
        <div className={`emj-container ${!modal ? "--d-none" : "verse"}`} onClick={(e) => {
            return e.stopPropagation()
        }} >
            <div className="mini-emj-container" >
                {emjs.map((emj, index) => {
                    return (
                        <span key={index} onClick={doSomething}>
                            {emj}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export default Emj