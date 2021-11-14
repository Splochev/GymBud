import { makeStyles } from '@material-ui/core';



export default makeStyles(() => ({
  questionIcon: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration:'none'
    }
  },
  signInOrUpUrls: {
    color: '#343a40',
    fontSize: '20px',
    '&:hover': {
      textDecoration:'underline'
    }
  },
  questionIconDropDown:{
    color: '#343a40',
    fontSize: '20px',
    '&:hover': {
      color: '#343a40',
      textDecoration:'underline',
      backgroundColor:'white'
    }
  },
  nav:{
    backgroundColor:"#343a40"
  },
  logo:{
    width:'50px'
  },
  navUrls:{
    fontSize:'20px',
    color:'white',
    '&:hover': {
      color: 'white',
      textDecoration:'underline'
    }
  },
  navToggler:{
    color:'white'
  },
  blackStripe:{
    backgroundColor:'black',
    paddingTop:'10px'
  }
}))