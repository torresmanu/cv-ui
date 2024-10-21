import { blue, green, grey } from "@material-ui/core/colors";


const darkVariant = {
  name: "Dark",
  palette: {
    primary: {
      main: "#040505",
      contrastText: "#FFF"
    },
    secondary: {
      main: blue[500],
      contrastText: "#FFF"
    },
    textSecondary: {
      main: '#686868'
    }
  },
  header: {
    color: grey[500],
    background: "#FFFFFF",
    search: {
      color: grey[800]
    },
    indicator: {
      background: blue[600]
    }
  },
  sidebar: {
    color: "#242424",
    background: "#F6FBFF",
    header: {
      color: grey[900],
      background: "#F6FBFF",
      brand: {
        color: blue[500]
      }
    },
    footer: {
      color: grey[900],
      background: "#F6FBFF",
      online: {
        background: green[500]
      }
    },
    badge: {
      color: "#FFF",
      background: blue[500]
    }
  },
  body: {
    background: "linear-gradient(180deg, white, black)"  // <-- Set your gradient background here
  }
};

const variants = [
  darkVariant
];

export default variants;
