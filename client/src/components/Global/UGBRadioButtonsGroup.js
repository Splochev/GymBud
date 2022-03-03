import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#23913C',
            light: '#A3D9B0',
            contrastText: '#FFFFFF',
        },
    }
});

const useRadioStyles = makeStyles((theme) => ({
    formControl: {
        "& .MuiFormLabel-root": {
            color: '#757575'
        },
        "& .Mui-focused": {
            color: '#757575'
        },
    },
    inlineFormControl: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        gap: 10,
    },
    blockFormControl: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    inlineRadioGroup: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        width: '100%'
    },
    blockRadioGroup: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        width: '100%'
    }
}));

export function UGBRadioButtonsGroup({ label, $checkedValue, radios, customMap, display, displayFormControl = 'inline' }) {
    const styles = useRadioStyles();

    const handleChange = (event) => {
        $checkedValue[1](event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <FormControl className={clsx(styles.formControl, styles[`${displayFormControl}FormControl`])} >
                <FormLabel style={{ color: '#1B1B1B' }}>{label}</FormLabel>
                <RadioGroup
                    className={styles[`${display}RadioGroup`]}
                    name={label}
                    value={$checkedValue[0]}
                    onChange={handleChange}
                >
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