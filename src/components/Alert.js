import React from 'react'
import { capitalize } from "../Functions"

export default function Alert(props) {
    // Destructuring props
    const { alert, dismissAlert } = props;
    return (
        <div style={{ height: "15px", marginTop: "55px" }}>
            {props.alert && <div className={`alert alert-${alert===null?'danger':alert.type} alert-dismissible fade show`} role="alert">
                <strong>{alert === null ? 'Error' : capitalize(alert.type)} : </strong> {alert===null?'Please ignore this alert':alert.msg}
                <button type="button" className="btn-close" aria-label="Close" onClick={dismissAlert}></button>
                {/* data-dismiss="alert" button attribute is removed to handle is dismasal logic mannulay as the bootstarp dismisal technique and react logic with set time out was causing conflict as bootstrap was unable to find the element once react has removed it from UI */}
            </div>}
        </div>
    )
}
