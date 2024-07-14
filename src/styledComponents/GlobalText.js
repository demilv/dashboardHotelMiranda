import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&family=Open+Sans:wght@400;700&family=Roboto:wght@400;700&family=Oswald:wght@400;700&display=swap');

  body {
    font-family: 'Roboto', sans-serif;
  }

  h3, h4 {
    font-family: 'Oswald', sans-serif; 
  }

  h5, h6, p {
    font-family: 'Old Standard TT', sans-serif;
  }

  .open-sans {
    font-family: 'Open Sans', sans-serif; 
  }

  .oswald {
    font-family: 'Oswald', sans-serif; 
  }

  .roboto {
    font-family: 'Roboto', sans-serif;
  }

`;

export default GlobalStyles;
