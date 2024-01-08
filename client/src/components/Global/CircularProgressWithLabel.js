import { Box, CircularProgress, Typography } from "@material-ui/core";

const CircularProgressWithLabel = (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}С
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="#28A745"
      >
        <Typography variant="caption" component="div">
          {props.label}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
