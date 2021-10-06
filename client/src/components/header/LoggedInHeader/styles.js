import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  questionIcon: {
    textDecoration: 'none !important',
    '&:hover': {
      textDecoration: 'none !important'
    }
  },
  signInOrUpUrls: {
    color: '#343a40 !important',
    fontSize: '20px',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  dropDown: {
    color: '#343a40 !important',
    fontSize: '20px',
    '&:hover': {
      color: '#343a40 !important',
      textDecoration: 'underline',
      backgroundColor: 'white'
    }
  },
  nav: {
    backgroundColor: "#343a40"
  },
  logo: {
    width: '50px'
  },
  navUrls: {
    fontSize: '20px',
    color: 'white',
    '&:hover': {
      color: 'white',
      textDecoration: 'underline !important'
    }
  },
  navToggler: {
    color: 'white !important'
  },
  blackStripe: {
    backgroundColor: 'black',
    paddingTop: '10px'
  },
  addedFoodCounter: {
    fontSize: '12px',
    verticalAlign: 'text-top'
  }
}))