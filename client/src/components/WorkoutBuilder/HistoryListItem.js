import * as React from "react";
import { useState, useEffect } from "react";
import {
  IconButton,
  ListItemIcon,
  makeStyles,
  ListItemText,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
  sort: {
    minWidth: "auto",
    "& .MuiSvgIcon-root": {
      color: "#757575",
    },
  },
  historyContainer: {
    display: "flex",
    alignItems: "center",
    "& .MuiListItemText-root": {
      textAlign: "center",
      flex: "unset",
      "& .MuiListItemText-primary": {
        width: "116px",
        fontSize: "13px",
      },
      "& .MuiListItemText-secondary ": {
        width: "116px",
      },
    },
  },
  changePadding: {
    padding: theme.spacing(0.375),
  }
}));

const HistoryListItem = ({ historicalEntry }) => {
    const styles = useStyles();
    const [max, setMax] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      if (historicalEntry) {
        setMax(historicalEntry.length);
        setCurrentIndex(historicalEntry.length - 1);
      }
    }, [historicalEntry]);
  
    return (
      <div className={styles.historyContainer}>
        <ListItemIcon className={styles.sort}>
          <IconButton
            className={styles.changePadding}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </ListItemIcon>
        <ListItemText
          primary={
            historicalEntry &&
            historicalEntry[currentIndex] &&
            (historicalEntry[currentIndex].weight ||
              historicalEntry[currentIndex].reps)
              ? `${historicalEntry[currentIndex].weight || 0}Kg X ${
                  historicalEntry[currentIndex].reps || 0
                }Reps`
              : "N/A"
          }
          secondary={
            historicalEntry &&
            historicalEntry[currentIndex] &&
            (historicalEntry[currentIndex].weight ||
              historicalEntry[currentIndex].reps)
              ? historicalEntry[currentIndex].date
              : "N/A"
          }
        />
        <ListItemIcon className={styles.sort}>
          <IconButton
            className={styles.changePadding}
            disabled={currentIndex + 1 >= max}
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </ListItemIcon>
      </div>
    );
  };
  
export default HistoryListItem;
