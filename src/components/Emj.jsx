import { useRef, React } from 'react'

const Emj = ({ modal,_message }) => {
    const doSomething = (e) => {
        const emj=e.target.textContent;
        _message.current.value+=emj
    }
    const emjs = [<>๐งก</>,<>๐ฅถ</>,<>๐ฏ</>,<>๐ฉโโค๏ธโ๐ฉ</>,
    <>๐ฉ</>,<>๐ฉโ๐</>,<>๐คถ</>,<>๐ซ</>,<>๐ฉ๐ฟ</>,<>๐ฉ๐ผ</>,<>๐ฐ</>,<>๐ฉ๐ผ</>,<>๐ฉ๐ผ</>,<>๐จโ๐พ</>,<>๐ฉโ๐ป</>,
    <>๐</>,<>๐โโ๏ธ</>,<>๐</>,<>๐</>,<>๐โโ๏ธ</>,<>๐</>,<>๐</>,<>๐ฆป</>,<>๐</>,<>๐ฆถ</>,<>๐ฆป</>,<>๐ก</>,<>๐</>,<>๐ฉณ</>,<>๐ฑโ๐</>,
    <>๐ฅต</>,<>โฝ</>,<>๐</>,<>๐</>,<>๐</>,<>โค</>,<>๐</>,]

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