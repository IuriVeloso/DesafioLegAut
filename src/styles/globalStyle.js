import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
    margin: 0;
    padding:0;
    outline: 0;
    box-sizing: border-box;
}

html, body , #root{
    min-height: 100%;
    min-width: 100%;
    display: 0;
}

body{
    background: #B1B1B1;
}

button,span {
    cursor: pointer
}

img {
    align-self: center;

}

`;
