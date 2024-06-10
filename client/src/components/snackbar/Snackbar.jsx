import Snackbar from "@material-ui/core/Snackbar";

export default function SimpleSnackbar({
  open,
  handleClose,
  handleOpen,
  hideDuration,
  message,
}) {

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={hideDuration || 3000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}
