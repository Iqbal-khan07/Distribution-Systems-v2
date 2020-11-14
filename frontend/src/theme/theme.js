import {createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#00AB8D"
        }
    },


    typography: {
        fontFamily: ['Montserrat'].join(',')
    },

    template: {
        sideDrawerOpenWidth: 240,
        sideDrawerClosedWidth: 73,
    },

    table: {
        head: {
            fontSize: "1rem",
            fontWeight: "bold"
        },
        body: {
            fontSize: "0.85rem"
        }
    }

});

export default theme