import React from "react";
import { createTheme, FormControlLabel, Checkbox } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#28A745',
            contrastText: '#FFFFFF',
        },
    }
});

export function UGBCheckbox({ $value, ...props }) {
    return ($value ?
        <ThemeProvider theme={theme}>
            <FormControlLabel
                checked={$value[0]}
                onChange={e => $value[1](e.target.checked)}
                control={<Checkbox />}
                {...props}
            />
        </ThemeProvider>
        :
        <ThemeProvider theme={theme}>
            <FormControlLabel control={<Checkbox />} {...props} />
        </ThemeProvider>
    );
}
