
 const DateFormater = ({ date }) => {
    const _date=new Date(date).toDateString()
    return (
        <span style={{display:"block",
        color:"rgb(5, 5, 46)",textAlign:"center",
        padding:"2rem 0.5rem",fontSize:"1rem",
        fontStyle:"italic",
        fontWeight:900,
        letterSpacing:"0.3rem"} }>
            {_date}

        </span>
    )
}
export default  DateFormater