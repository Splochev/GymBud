import { useEffect } from "react";

//HAS BOOTSTRAP
const UGBMissingFields = (props) => {
    function closeAlert() {
        props.setAlert('');
    }

    useEffect(() => {
        setTimeout(() => { closeAlert() }, 2000);
    }, []);

    return (
        <div className="alert alert-danger alert-dismissible">
            {props.alertMessage}
        </div>
    );
}

export default UGBMissingFields;