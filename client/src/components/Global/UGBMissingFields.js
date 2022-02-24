import { useEffect } from "react";

const UGBMissingFields = (props) => {
    function closeAlert() {
        props.setAlert('');
    }

    useEffect(() => {
        setTimeout(() => { closeAlert() }, 2000);
    }, []);

    return (
        <div
            style={{
                background: '#f8d7da',
                color: '#721c24',
                padding: '.75rem 1.25rem',
                width:'100%',
                border: '1px solid #f5c6cb',
                borderRadius: '0.25rem'
            }}
        >
            {props.alertMessage}
        </div>
    );
}

export default UGBMissingFields;