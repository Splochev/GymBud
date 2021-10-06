const MissingFields = (props) => {
    function closeAlert() {
        props.setAlert('');
    }
    return (<div className="alert alert-danger alert-dismissible">
        <a href="#!" className="close" data-dismiss="alert" aria-label="close" onClick={closeAlert}>&times;</a>
        {props.alertMessage}
    </div>
    );
}

export default MissingFields;