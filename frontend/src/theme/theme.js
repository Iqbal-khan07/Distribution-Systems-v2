import {createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#00AB8D"
        }
    },

    typography: {
        fontFamily: ["open sans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
    },

    template: {
        sideDrawerOpenWidth: 240,
        sideDrawerClosedWidth: 73,
    },

    brandLogo: {
        name: "fa fa-graduation-cap",
        title: "Participatory Learning"
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