/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { UGBButton } from "../Global/UGBButton";
import UGBLabel from "../Global/UGBLabel";
import { UGBIconInput, UGBInputArea } from "../Global/UGBInput";
import { putData } from "../utils/FetchUtils";
import isURL from "validator/es/lib/isURL";
import isEmpty from "validator/es/lib/isEmpty";

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

const dataValidators = {
  isRequired: (value) => {
    const errors = [];
    if (isEmpty(value)) {
      errors.push("Value must not be empty.");
    }
    return errors;
  },
  isLink: (value) => {
    const errors = [];
    if (isEmpty(value)) {
      return errors;
    }
    if (!isURL(value)) {
      errors.push("Invalid link format.");
    }
    return errors;
  },
};

const EditWorkoutJournal = ({
  selectedWorkoutJournalObj,
  setSelectedWorkoutJournalObj,
  workoutJournals,
  setWorkoutJournals,
  onClose,
}) => {
  const styles = useStyles();
  const workoutJournalName = useState(selectedWorkoutJournalObj?.name || "");
  const description = useState(selectedWorkoutJournalObj?.description || "");
  const workoutJournalNamePassed = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [hasNameChanges, setHasNameChanges] = useState(false);
  const [hasDescriptionChanges, setHasDescriptionChanges] = useState(false);

  function editWorkoutJournal(e) {
    e.preventDefault();
    if (!selectedWorkoutJournalObj) {
      return;
    }

    if (!(workoutJournalName[0] && workoutJournalNamePassed[0])) {
      return;
    }
    const changes = { id: selectedWorkoutJournalObj.id };
    if (hasNameChanges) {
      changes.name = workoutJournalName[0];
    }
    if (hasDescriptionChanges) {
      changes.description = description[0];
    }

    putData(
      process.env.REACT_APP_HOST + "/api/workout/edit-workout-journal",
      changes
    ).then(
      (data) => {
        const foundWJ = workoutJournals.find(
          (wj) => wj.id === selectedWorkoutJournalObj.id
        );
        if (hasNameChanges) {
          setSelectedWorkoutJournalObj(
            (workoutJournal) => (
              (workoutJournal.name = workoutJournalName[0]),
              { ...workoutJournal }
            )
          );
          foundWJ.name = workoutJournalName[0];
        }
        if (hasDescriptionChanges) {
          setSelectedWorkoutJournalObj(
            (workoutJournal) => (
              (workoutJournal.description = description[0]),
              { ...workoutJournal }
            )
          );
          foundWJ.description = description[0];
        }
        setWorkoutJournals([...workoutJournals]);
        onClose();
      },
      (error) => {
        console.log("LOGOUT ERROR--->", error);
      }
    );
  }

  useEffect(() => {
    if (
      selectedWorkoutJournalObj &&
      selectedWorkoutJournalObj.name &&
      workoutJournalName[0] === selectedWorkoutJournalObj.name
    ) {
      setHasNameChanges(false);
    } else {
      setHasNameChanges(true);
    }
  }, [workoutJournalName[0]]);

  useEffect(() => {
    if (
      selectedWorkoutJournalObj &&
      selectedWorkoutJournalObj.description &&
      description[0] === selectedWorkoutJournalObj.description
    ) {
      setHasDescriptionChanges(false);
    } else {
      setHasDescriptionChanges(true);
    }
  }, [description[0]]);

  useEffect(() => {
    if (
      workoutJournalName[0] &&
      workoutJournalNamePassed[0] &&
      (hasNameChanges || hasDescriptionChanges)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    workoutJournalName[0],
    workoutJournalNamePassed[0],
    hasNameChanges,
    hasDescriptionChanges,
  ]);

  useEffect(() => {
    if (selectedWorkoutJournalObj) {
      workoutJournalName[1](selectedWorkoutJournalObj.name);
      description[1](selectedWorkoutJournalObj.description);
    }
  }, [selectedWorkoutJournalObj]);

  return (
    <form onSubmit={editWorkoutJournal}>
      <div className={styles.titleSection}>
        <UGBLabel variant="h5">
          Edit workout: {selectedWorkoutJournalObj?.name || ""}
        </UGBLabel>
      </div>
      <UGBIconInput
        $value={workoutJournalName}
        label="Name"
        startIcon="fa-solid fa-file-signature"
        validator={dataValidators.isRequired}
        validatorPassed={workoutJournalNamePassed}
      />
      <UGBInputArea label="Description" $value={description} />
      <div className={styles.actions}>
        <UGBButton btnType="secondary" onClick={() => onClose()}>
          Cancel
        </UGBButton>
        <UGBButton disabled={disabled} type="submit" btnType="primary">
          Save
        </UGBButton>
      </div>
    </form>
  );
};

export default EditWorkoutJournal;
