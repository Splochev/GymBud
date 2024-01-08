import * as React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { UGBButton } from "../Global/UGBButton";
import UGBLabel from "../Global/UGBLabel";
import { deleteData } from "../utils/FetchUtils";

const useStyles = makeStyles((theme) => ({
  titleSection: {
    marginBottom: theme.spacing(1),
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
    "& button:first-child": {
      marginRight: theme.spacing(2),
    },
    "& button": {
      width: theme.spacing(11.625),
    },
  },
}));

const DeleteWorkoutJournal = ({
  selectedWorkoutJournalObj,
  refresh,
  onClose,
}) => {
  const styles = useStyles();
  const workoutJournalName = useState(selectedWorkoutJournalObj?.name || "");

  const deleteWJ = (e) => {
    e.preventDefault();
    deleteData(
      process.env.REACT_APP_HOST + "/api/workout/delete-workout-journal",
      { id: selectedWorkoutJournalObj.id }
    ).then(
      (data) => {
        refresh();
        onClose();
      },
      (error) => {
        console.log("LOGOUT ERROR--->", error);
      }
    );
  };

  useEffect(() => {
    if (selectedWorkoutJournalObj) {
      workoutJournalName[1](selectedWorkoutJournalObj.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWorkoutJournalObj]);

  return (
    <form onSubmit={deleteWJ}>
      <div className={styles.titleSection}>
        <UGBLabel variant="h5">
          Are you sure you want to delete workout &ldquo;{workoutJournalName}
          &rdquo;?
        </UGBLabel>
      </div>
      <div className={styles.actions}>
        <UGBButton btnType="secondary" onClick={() => onClose()}>
          Cancel
        </UGBButton>
        <UGBButton type="submit" btnType="outlinedSecondary">
          Delete
        </UGBButton>
      </div>
    </form>
  );
};

export default DeleteWorkoutJournal;
