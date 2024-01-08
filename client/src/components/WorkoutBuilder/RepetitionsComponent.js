import * as React from "react";
import { useState } from "react";
import {
  makeStyles,
} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import { UGBLoaderSpinner } from "../Global/UGBLoader";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import RepetitionsTabPanel from "./RepetitionsTabPanel";

const useStyles = makeStyles((theme) => ({
  repetitionsComponentContainer: {
    flexGrow: 1,
    width: "100%",
    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#28A745",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#28A745",
    },
    "& .MuiBox-root": {
      padding: 0,
    },
    "& .MuiButtonBase-root": {
      color: "#1B1B1B",
    },
    "& .Mui-selected": {
      color: "#28A745",
    },
  },
  tabs: {
    "& .Mui-selected": {
      "& .MuiTab-wrapper": {
        height: "34px",
        alignItems: "normal",
        gap: theme.spacing(1),
        flexDirection: "row-reverse",
      },
    },
  },
  barIconWidth: {
    width: "24px",
  }
}));

const getProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const RepetitionsComponent = ({ exercise }) => {
  const styles = useStyles();
  const [value, setValue] = React.useState(0);
  const [isSaving, setIsSaving] = useState([]);
  const [isSaved, setIsSaved] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.repetitionsComponentContainer}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          className={styles.tabs}
        >
          {exercise && exercise.superset ? (
            exercise.superset.map((exx, i) => (
              <Tab
                key={"tab" + exx.id}
                label={exx.exercise}
                {...getProps(i)}
                icon={
                  isSaving.length && i === value ? (
                    <div className={styles.barIconWidth}>
                      <UGBLoaderSpinner
                        height={20}
                        width={20}
                        color="#28A745"
                      />
                    </div>
                  ) : isSaved.length && i === value ? (
                    <div className={styles.barIconWidth}>
                      <CloudDoneIcon />
                    </div>
                  ) : (
                    <div className={styles.barIconWidth} />
                  )
                }
              />
            ))
          ) : exercise ? (
            <Tab
              icon={
                isSaving.length ? (
                  <div className={styles.barIconWidth}>
                    <UGBLoaderSpinner height={20} width={20} color="#28A745" />
                  </div>
                ) : isSaved.length ? (
                  <div className={styles.barIconWidth}>
                    <CloudDoneIcon />
                  </div>
                ) : (
                  <div className={styles.barIconWidth} />
                )
              }
              key={"tab" + exercise.id}
              label={exercise.exercise}
              {...getProps(0)}
            />
          ) : (
            <Tab
              icon={
                isSaving.length ? (
                  <div className={styles.barIconWidth}>
                    <UGBLoaderSpinner height={20} width={20} color="#28A745" />
                  </div>
                ) : isSaved.length ? (
                  <div className={styles.barIconWidth}>
                    <CloudDoneIcon />
                  </div>
                ) : (
                  <div className={styles.barIconWidth} />
                )
              }
              label=""
              {...getProps(0)}
            />
          )}
        </Tabs>
      </AppBar>
      {exercise && exercise.superset ? (
        exercise.superset.map((exx, i) => {
          return (
            <TabPanel key={exx.id} value={value} index={i}>
              <RepetitionsTabPanel
                exercise={exx}
                setIsSaving={setIsSaving}
                setIsSaved={setIsSaved}
                isSaving={isSaving}
                isSaved={isSaved}
              />
            </TabPanel>
          );
        })
      ) : exercise ? (
        <TabPanel key={exercise.id} value={value} index={0}>
          <RepetitionsTabPanel
            exercise={exercise}
            setIsSaving={setIsSaving}
            setIsSaved={setIsSaved}
            isSaving={isSaving}
            isSaved={isSaved}
          />
        </TabPanel>
      ) : (
        <TabPanel value={value} index={0} />
      )}
    </div>
  );
};

export default RepetitionsComponent;