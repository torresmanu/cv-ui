import React, { useEffect, useState } from "react";
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { InstanceService } from "../../../services/InstanceService";
import ButtonWithStyles from "../../../components/ButtonWithStyles";

export default function HideStudiesDialog({
  open,
  handleClose,
  instance_id,
  institution_id,
  studies,
}) {
  const [list, setList] = useState(studies.list);
  
  useEffect(() => {
    // Transform the list of studies from string to integers. We will use integers because the API expects integers
    const transformedList = studies?.list?.map(item => parseInt(item));
    setList(transformedList);
  }, [studies]);

  const handleCheckboxChange = (id) => {
    setList((prevList) => {
      if (prevList.includes(id)) {
        return prevList.filter((itemId) => itemId !== id); // Remove the item if it's already in the list
      } else {
        return [...prevList, id]; // Add the item to the list if it's not already present
      }
    });
  };
 
  const handleHide = () => {
    InstanceService.set_hidden_studies(institution_id, instance_id, list)
    .then(() => {
      handleClose();
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`Hide Studies for Instance: ${institution_id}.${instance_id}`}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {open && Object.entries(studies.available).map(([id, name]) => {
            const isChecked = list.includes(parseInt(id));
            return (
              <Grid container key={id} alignItems="center">
                <Grid item>
                  <FormControlLabel
                    key={id}
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(parseInt(id))}
                      />
                    }
                    label={name}
                  />
                </Grid>
              </Grid>
            )
            })}
        </DialogContent>
        <DialogActions>
          <ButtonWithStyles onClick={handleClose} variant="text">
            Cancel
          </ButtonWithStyles>
          <ButtonWithStyles onClick={handleHide} variant="contained">
            Confirm
          </ButtonWithStyles>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}