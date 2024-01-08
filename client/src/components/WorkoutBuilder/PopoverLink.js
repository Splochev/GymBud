/* eslint-disable no-useless-escape */
import * as React from "react";
import { useState } from "react";
import { makeStyles, Tooltip } from "@material-ui/core";
import UGBLink from "../Global/UGBLink";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    contentBox: {
        display: "initial",
      },
      linkAsChip: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid rgba(0, 0, 0, 0.23)",
        paddingLeft: "12px",
        paddingRight: "12px",
        height: "32px",
        borderRadius: "16px",
      },
      tooltipImg: {
        height: "100%",
        width: theme.spacing(31.25),
      },
      tooltipPopper: {
        background: "#1B1B1B",
        paddingTop: theme.spacing(1),
      },
}));
  
const PopoverLink = ({ ex, color, isChip }) => {
  const styles = useStyles();
  const [videoLink, setVideoLink] = useState("");

  return (
    <Tooltip
      classes={{ tooltip: styles.tooltipPopper }}
      disableHoverListener={!Boolean(videoLink)}
      title={
        videoLink ? (
          <img
            className={styles.tooltipImg}
            src={`https://img.youtube.com/vi/${videoLink}/maxresdefault.jpg`}
            alt=""
          />
        ) : null
      }
    >
      <div
        className={clsx(styles.contentBox, isChip ? styles.linkAsChip : null)}
      >
        <UGBLink
          url={ex.videoLink}
          label="Video Link"
          color={color}
          target="blank"
          onClick={(e) => e.stopPropagation()}
          onHover={(e) => {
            const aEl = e.target.parentElement;
            const regExp =
              /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = regExp.exec(aEl.href);
            if (match && match.length && match[2]) {
              setVideoLink(match[2]);
            }
          }}
        />
      </div>
    </Tooltip>
  );
};

export default PopoverLink;
