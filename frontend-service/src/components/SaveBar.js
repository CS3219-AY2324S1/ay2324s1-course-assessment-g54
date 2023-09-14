import { useState, useEffect, forwardRef} from "react";

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SaveBar = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.onOpen);
  }, [props.onOpen]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    props.onClose(false);
  };

  return (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        This question has been saved!
      </Alert>
    </Snackbar>
  );
}

export default SaveBar;