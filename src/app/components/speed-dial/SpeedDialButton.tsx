import { useCallback } from 'react';
import { SpeedDial } from '@mui/material';

import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import { DialogExpense } from '../dialog/expense/DialogExpense';
import { DialogInvoice } from '../dialog/invoice/DialogInvoice';
import { useFormDialogContext } from '../../context/FormDialogContext';

interface IActionsType {
  icon: JSX.Element,
  name: string,
  onClick: () => void
}

export const SpeedDialButton = () => {

  const {dialogOpened, handleOpen} = useFormDialogContext();

  const openInvoice = useCallback(() => {
    handleOpen('invoice');
  }, [dialogOpened]);

  const openExpense = useCallback(() => {
    handleOpen('expense');
  }, [dialogOpened]);

  const actions: IActionsType[] = [
    { icon: <ReceiptIcon />, name: 'Nota Fiscal', onClick: openInvoice },
    { icon: <PaymentIcon />, name: 'Despesa', onClick: openExpense },
  ];


  return (
    <>
      <SpeedDial
        ariaLabel="Floating Button"
        sx={{ position: 'absolute', bottom: 40, right: 40 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
      <DialogInvoice />
      <DialogExpense />
    </>
  );
}