import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#007BFF',
            light: '#B3D7FF',
            contrastText: '#FFFFFF',
        },
    }
});

const useRadioStyles = makeStyles((theme) => ({
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        "& .MuiFormLabel-root": {
            color: 'black'
        },
        "& .Mui-focused": {
            color: 'black'
        },
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
    },
    radioColor: {
        color: 'blue'
    }
}));

export function UGBRadioButtonsGroup({ label, $checkedValue, radios, customMap, display }) {
    const styles = useRadioStyles();

    const handleChange = (event) => {
        $checkedValue[1](event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <FormControl className={display === 'inline' ? styles.formControl : undefined} >
                <FormLabel>{label}</FormLabel>
                <RadioGroup className={display === 'inline' ? styles.radioGroup : undefined} name={label} value={$checkedValue[0]} onChange={handleChange}>
                    {customMap ?
                        customMap()
                        :
                        radios.map((radio, index) => {
                            return (
                                <FormControlLabel key={radio + index} value={radio} control={<Radio color='primary' />} label={radio} />
                            );
                        })}
                </RadioGroup>
            </FormControl >
        </ThemeProvider>
    );
}