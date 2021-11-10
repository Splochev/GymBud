import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    articleCardTextWoman: {
        paddingBottom: '60px'
    },
    articleCardTextComputer: {
        paddingBottom: '30px'
    },
    homePageSection: {
        marginRight: 0,
        marginLeft: 0
    },
    postcard: {
        flexWrap: 'wrap',
        display: 'flex',
        borderRadius: '10px',
        margin: '0 0 2rem 0',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'black',
        color: 'white',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: 'linear-gradient(-70deg, #343a40, transparent 60%)',
            opacity: 1
        },
        '&:hover': {
            "& $postCardBar": {
                width: '95%'
            }


        },
        '@media (min-width: 1500px)': {
            flexWrap: 'inherit',
            '&:hover': {
                "& $postcardImg": {
                    transform: 'scale(1.1)'
                }
            },
            '&:nth-child(2n+0)': {
                flexDirection: 'row-reverse',
                "& $postCardText": {
                    '&::before': {
                        right: '-12px !important',
                        transform: 'rotate(-4deg)'
                    },
                }
            },
            '&:nth-child(2n+1)': {
                "& $postCardText": {
                    '&::before': {
                        left: '-12px !important',
                        transform: 'rotate(4deg)'
                    },
                }
            },

        }
    },
    postcardImg: {
        maxHeight: '180px',
        width: '100%',
        objectFit: 'cover',
        position: 'relative',
        '@media (min-width: 1500px)': {
            maxWidth: '300px',
            maxHeight: '100%',
            transition: 'transform 0.3s ease'
        }
    },
    postCardBar: {
        width: '50px',
        height: '10px',
        margin: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#343a40',
        transition: 'width 0.2s ease'
    },
    postCardText: {
        position: 'relative',
        '@media (min-width: 1500px)': {
            padding: '3rem',
            width: '100%',
            '&::before': {
                background: '#343a40',
                content: '""',
                position: 'absolute',
                display: 'block',
                top: '-20%',
                height: '130%',
                width: '55px'
            },
        }
    },
    postCardPreviewText: {
        height: '100%',
        fontSize: '20px',
        paddingRight: '40px',
        paddingLeft: '40px'
    }
}))