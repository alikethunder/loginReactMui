import * as React from "react";
import { buttonClasses } from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toggleButtonClasses } from "@mui/material/ToggleButton";

export default function DisabledTheme(props) {

    const defaultTheme = createTheme();
    const theme = createTheme({
        palette: {
            action: {
                disabledBackground: defaultTheme.palette.primary.main,
                disabled: "white"
            }
        },
        components: {
            MuiButtonBase: {
                styleOverrides: {
                    root: {
                        [`&.${buttonClasses.disabled}`]: {
                            opacity: '1!important'
                        },
                        [`&.${toggleButtonClasses.root}.${buttonClasses.disabled}`]: {
                            color: defaultTheme.palette.text.primary,
                            //borderColor: defaultTheme.palette.action.disabledBackground
                        }
                    }
                }
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}