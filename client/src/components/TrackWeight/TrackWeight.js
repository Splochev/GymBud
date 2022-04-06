import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { UGBDatePicker } from '../Global/UGBDatePicker';
import { UGBInput } from '../Global/UGBInput';
import { postData } from '../utils/FetchUtils';
import { parseDate } from '../utils/utilFunc';
import { UGBButton } from '../Global/UGBButton';
import UGBLabel from '../Global/UGBLabel';
import UGBHr from '../Global/UGBHr';

const useStyles = makeStyles((theme) => ({
    actions: {
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
        "& button:first-child": {
            marginRight: theme.spacing(2),
        },
        "& button": {
            width: theme.spacing(11.625),
        }
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1.25),
    },
    datePicker: {
        "& .MuiFormControl-root": {
            width: '100%'
        }
    }
}));

const customStyles = {
    title: {
        textAlign: 'center',
        width: '100%',
    }
}

const TrackWeight = ({ onClose }) => {
    const styles = useStyles();
    const [defaultSelectedDate] = useState(new Date());
    const [maxSelectedDate] = useState(new Date(defaultSelectedDate.setDate(defaultSelectedDate.getDate())));
    const [selectedDate, setSelectedDate] = useState(new Date(defaultSelectedDate.setDate(defaultSelectedDate.getDate())));
    const [minSelectedDate] = useState(new Date(defaultSelectedDate.setDate(defaultSelectedDate.getDate() - 30)));
    const weight = useState('')

    function onSubmitWeight(e) {
        e.preventDefault();
        const parsedDate = parseDate(selectedDate);
        const parsedWeight = Number(weight[0]);

        if (!parsedWeight || !parsedDate) {
            console.log("invalid weight or date")
            return;
        }

        postData(process.env.REACT_APP_HOST + `/api/weight-tracker/submit-weight`, {
            date: parsedDate,
            weight: Number(weight[0])
        }).then(data => {
            weight[1]('');
        }, error => {
            console.log(error);
        })
    }

    return (
        <form onSubmit={onSubmitWeight}>
            <UGBLabel variant='h5' style={customStyles.title}>
                Track Daily Weight
            </UGBLabel>
            <UGBHr type='horizontal' />
            <div className={styles.inputs}>
                <div className={styles.datePicker}>
                    <UGBDatePicker
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        minDate={minSelectedDate}
                        maxDate={maxSelectedDate}
                    />
                </div>
                <UGBInput
                    $value={weight}
                    label='Weight'
                    iconStart='fas fa-balance-scale'
                />
            </div>
            <div className={styles.actions}>
                <UGBButton
                    btnType='secondary'
                    onClick={() => onClose()}
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    type='submit'
                    btnType='primary'
                >
                    Save
                </UGBButton>
            </div>
        </form >
    );
}

export default TrackWeight;