import { globalCss } from ".";

export const globalStyle = globalCss({
    '*': {
        margin: 0,
        paddin: 0,
        boxSizing: 'border-box'
    },

    body:{
        backgroundColor: '$gray900',
        color: '$gray100',
        '-webkit-font-smoothing': 'antialiased',
    },

    'body, input, texarea, button': {
        fontFamily: 'Roboto',
        fontWeight: 400,
    }
})