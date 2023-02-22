


const PopUpLogout = ({ modal, toggleclass, addToggleClass, toggleModal, handleLogout }) => {
    return (
        <div className={`_modal ${!modal && "--d-none"}`}
            onClick={e =>
                [addToggleClass(true),
                setTimeout(() => {
                    addToggleClass(false)
                }, 500)
                ]
            }>
            <div className={`${toggleclass ? "scale" : ""} 
            logout-container`}
                onClick={e => e.stopPropagation()}>
                <h2 style={{ color: "white", textAlign:
                 "center" }}>

                    Are you sure,<br />
                    You Want to logout?

                </h2>




                <div className="btn-logout-container">

                    <button onClick={e => [toggleModal(false)]}>
                    cancel
                    </button>
                    <button onClick={handleLogout}>Logout</button>
                </div>

            </div>
        </div>
    )
}
export default PopUpLogout