import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { debounce, getData } from '../utils/FetchUtils'
import { IconButton, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import { UGBIconInput } from '../Global/UGBInput';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { InputAdornment } from '@material-ui/core';
import { UGBIconButton } from '../Global/UGBButton';

const useStyles = makeStyles(theme => ({
    autocomplete: {
        "& .MuiAutocomplete-clearIndicatorDirty": {
            display: 'none'
        },
        "& .MuiAutocomplete-popupIndicator": {
            marginRight: '10px',
            color: '#1B1B1B',
        },
    },
    clearIconButton: {
        marginRight: '-10px',
        padding: '3px',
        color: '#1B1B1B'
    }
}));

export function ExercisesAutoComplete({label, onSelectedExercise, selectedExercise }) {
    const styles = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState(selectedExercise || '');
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (value && inputValue === value.name) {
            setIsLoading(false);
            return;
        }

        setOpen(inputValue.length > 0);
        (async () => {
            if (!inputValue || !isLoading) {
                return;
            }
            const data = await getData(process.env.REACT_APP_HOST + `/api/artist/?offset=0&limit=${20}&filter=${inputValue}`)
            setIsLoading(false);
            setOptions(data.items);
        })();
    }, [inputValue, isLoading]);

    const debounceMemo = useMemo(
        () => debounce(
            (event, newInputValue) => {
                setOptions([]);
            }, (event, newInputValue) => {
                setIsLoading(newInputValue.length > 0);
                setInputValue(newInputValue);
            }, 500),
        [],
    );

    return (
        <Autocomplete
            className={styles.autocomplete}
            open={open}
            onClose={() => {
                setOpen(false);
                setOptions([]);
            }}
            value={value}
            onChange={(e, newValue) => {
                setValue(newValue);
                setInputValue('');

                const exercise = { name: newValue.name, id: newValue.id };
                onSelectedExercise(exercise);

                setOpen(false);
                setIsLoading(false);
            }}
            onInputChange={debounceMemo}
            blurOnSelect={true}
            clearOnBlur={true}
            clearOnEscape={true}
            getOptionLabel={(option) => option?.name || ''}
            getOptionSelected={() => false}
            renderOption={(ex, option) => {
                return (
                    <ListItem key={ex.id}>
                        <ListItemText primary={ex.name} />
                    </ListItem>
                )
            }}
            options={options}
            loading={isLoading}
            popupIcon={<ExpandMoreIcon />}
            renderInput={(params) => (
                <UGBIconInput
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <UGBIconButton isEnd={false} $onClick={() => history.push('?tab=add-new-exercise')} >
                                    ADD
                                </UGBIconButton>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <React.Fragment>
                                {isLoading ?
                                    <CircularProgress style={{ color: '#1B1B1B' }} size={20} />
                                    :
                                    value ?
                                        <IconButton
                                            classes={{ root: styles.clearIconButton }}
                                            onClick={(e) => {
                                                setValue('');
                                                setInputValue('');
                                                onSelectedExercise({});
                                            }}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                        :
                                        params.InputProps.endAdornment
                                }
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}