/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState, useEffect } from "react";
import {
  IconButton,
  InputAdornment,
  makeStyles,
  Popover,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import { UGBButton } from "../Global/UGBButton";
import UGBLabel from "../Global/UGBLabel";
import { UGBIconInput, UGBInput } from "../Global/UGBInput";
import { postData } from "../utils/FetchUtils";
import isURL from "validator/es/lib/isURL";
import isEmpty from "validator/es/lib/isEmpty";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import muscle from "../assets/muscle.svg";

const useStyles = makeStyles((theme) => ({
  selectedPopoverElement: {
    background: "#F5F5F5",
    color: "#28A745",
  },
  titleSection: {
    marginBottom: theme.spacing(1),
  },
  imgIcon: {
    width: "auto",
    height: "90%",
    marginRight: theme.spacing(1.25),
  },

  showMoreIcon: {
    padding: theme.spacing(0.7),
    marginRight: theme.spacing(-2.25),
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

const MUSCLE_GROUPS = [
  "Neck",
  "Traps",
  "Shoulders",
  "Chest",
  "Biceps",
  "Forearms",
  "Abs",
  "Quadriceps",
  "Calves",
  "Upper Back",
  "Triceps",
  "Lower Back",
  "Glutes",
  "Hamstring",
];

const AddNewExercise = ({ onClose, missingExerciseName }) => {
  const styles = useStyles();
  const videoLink = useState("");
  const videoLinkPassed = useState(true);
  const exercise = useState(missingExerciseName || "");
  const exercisePassed = useState(true);
  const [muscleGroups] = useState(MUSCLE_GROUPS);
  const [selectedMuscleGroupsStr, setSelectedMuscleGroupsStr] = useState("");
  const [selectedMuscleGroupsArr, setSelectedMuscleGroupsArr] = useState([]);
  const [anchorEl, setAnchorEl] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (exercise[0] && exercisePassed[0] && videoLinkPassed[0]) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [exercise[0], exercisePassed[0], videoLinkPassed[0]]);

  useEffect(() => {
    setSelectedMuscleGroupsStr(selectedMuscleGroupsArr.join(", "));
  }, [selectedMuscleGroupsArr]);

  function addExercise(e) {
    e.preventDefault();
    if (!(exercise[0] && exercisePassed[0] && videoLinkPassed[0])) {
      return;
    }

    postData(process.env.REACT_APP_HOST + "/api/workout/add-exercise", {
      exercise: exercise[0],
      videoUrl: videoLink[0],
      muscleGroups: selectedMuscleGroupsStr,
    }).then(
      (data) => {
        onClose();
      },
      (error) => {
        console.log("LOGOUT ERROR--->", error);
      }
    );
  }

  return (
    <>
      <Popover
        anchorEl={anchorEl}
        keepMounted
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuList>
          {muscleGroups.map((muscleGroup, j) => {
            return (
              <MenuItem
                classes={{
                  root:
                    selectedMuscleGroupsArr.indexOf(muscleGroup) >= 0
                      ? styles.selectedPopoverElement
                      : null,
                }}
                key={j}
                onClick={(e) => {
                  const selectedMuscleGroupsArrIndex =
                    selectedMuscleGroupsArr.indexOf(muscleGroup);
                  if (selectedMuscleGroupsArrIndex >= 0) {
                    const tempSelectedMuscleGroupsArr = selectedMuscleGroupsArr;
                    tempSelectedMuscleGroupsArr.splice(
                      selectedMuscleGroupsArrIndex,
                      1
                    );
                    setSelectedMuscleGroupsArr([
                      ...tempSelectedMuscleGroupsArr,
                    ]);
                  } else {
                    setSelectedMuscleGroupsArr([
                      ...selectedMuscleGroupsArr,
                      muscleGroup,
                    ]);
                  }
                }}
              >
                {muscleGroup}
              </MenuItem>
            );
          })}
        </MenuList>
      </Popover>
      <form onSubmit={addExercise}>
        <div className={styles.titleSection}>
          <UGBLabel variant="h5">Add a new exercise</UGBLabel>
        </div>
        <UGBIconInput
          $value={exercise}
          label="Exercise"
          MuiIconStart={FitnessCenterIcon}
          validator={dataValidators.isRequired}
          validatorPassed={exercisePassed}
        />
        <UGBIconInput
          $value={videoLink}
          label="Video link"
          startIcon="fa-solid fa-link"
          validator={dataValidators.isLink}
          validatorPassed={videoLinkPassed}
        />
        <UGBInput
          label="Targeted Muscle Groups"
          value={selectedMuscleGroupsStr}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          InputProps={{
            startAdornment: (
              <img src={muscle} alt="muscle" className={styles.imgIcon} />
            ),
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  className={styles.showMoreIcon}
                  disableRipple
                  isEnd={false}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className={styles.actions}>
          <UGBButton btnType="secondary" onClick={() => onClose()}>
            Cancel
          </UGBButton>
          <UGBButton disabled={disabled} type="submit" btnType="primary">
            Add
          </UGBButton>
        </div>
      </form>
    </>
  );
};

export default AddNewExercise;
