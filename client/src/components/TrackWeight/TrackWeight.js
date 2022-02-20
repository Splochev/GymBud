import { makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
import { UGBDatePicker } from '../Global/UGBDatePicker';
import UGBButton from '../Global/UGBButton';
import { UGBInput } from '../Global/UGBInput';
import { postData } from '../utils/FetchUtils';
import { parseDate } from '../utils/utilFunc';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    actions: {
        display: 'flex',
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
        "& button:first-child": {
            marginRight: theme.spacing(2),
        },
        "& button": {
            width: '93px'
        }
    },
    inputs: {
        "& .MuiFormControl-root": {
            width: '100%'
        }
    },
    title: {
        color: '#343A40'
    }
}));

const TrackWeight = ({ refreshTableData, setRefreshTableData, onClose }) => {
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
            weight[1]('')
            if (window.location.pathname === '/progress') {
                setRefreshTableData(true);
            }
        }, error => {
            console.log(error)
        })
    }

    return (
        <form onSubmit={onSubmitWeight}>
            <Typography
                className={clsx('d-flex justify-content-center', styles.title)}
                variant='h6'
                component='div'
            >
                Track Daily Weight
            </Typography>
            <hr />
            <div className={clsx('form-group col', styles.inputs)}>
                <UGBDatePicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    minDate={minSelectedDate}
                    maxDate={maxSelectedDate}
                />
            </div>
            <UGBInput
                type='number'
                $value={weight}
                placeholder='Weight'
                min='1'
                iconStart='fas fa-balance-scale'
            />
            <div className={styles.actions}>
                <UGBButton
                    onClick={() => onClose()}
                    btnType='danger'
                >
                    Cancel
                </UGBButton>
                <UGBButton
                    btnType='success'
                    type="submit"
                >
                    Save
                </UGBButton>
            </div>
        </form>
    );
}

export default TrackWeight;