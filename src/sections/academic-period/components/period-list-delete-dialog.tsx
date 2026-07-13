/**
 * ==========================================================
 * Mini Test Project
 *
 * Module : Components - Delete Confirmation Dialog
 * List Periode Akademik
 *
 * Tujuan :
 * Dialog konfirmasi untuk menghapus satu atau banyak
 * data Periode Akademik dari daftar.
 * ==========================================================
 */

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// ----------------------------------------------------------------------

type PeriodListDeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
};

export function PeriodListDeleteDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
}: PeriodListDeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Batal
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Hapus
        </Button>
      </DialogActions>
    </Dialog>
  );
}
