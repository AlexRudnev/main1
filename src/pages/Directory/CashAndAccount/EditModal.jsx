import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import crossImg from '@/static/img/cross.png';
import styles from '@/styles/modules/CashAndAccounts.module.css';

import API from '@/api/api'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function EditModal({ open, setOpenEditModal, cashId, cash_and_accounts, auxiliaryList }) {
  const [currentCashAndAccount, setCurrentCashAndAccount] = React.useState([]);
  const [name, setName] = React.useState('');
  const [type_accounts, setType_accounts] = React.useState('');
  // type_accounts - 1 (Счёт) - false
  // type_accounts - 2 (Касса) - true
  const [currency, setCurrency] = React.useState('');
  const [resultBalance, setResultBalance] = React.useState('');
  const [balanceList, setBalanceList] = React.useState([{ currency_id: null, balance: null }]);
  const [item, setItem] = React.useState({ stream: {} });

  const handleCloseChildModal = () => {
    setOpenEditModal(false);
  }

  const updateBalance = (e, index) => {
    const { name, value } = e.target;
    balanceList[index][name] = value
    balanceList[index] = Object.assign({}, balanceList[index]);
    setItem(prevItem => ({
      ...prevItem,
      balance: balanceList
    }));
  };

  React.useEffect(() => {
    cash_and_accounts.forEach((elem) => {

      if (elem.id === cashId) {
        const { name, type_order } = elem;

        const type_acc = type_order === "account" ? 2 : 1;

        const index = auxiliaryList.currencies.findIndex(data => data.id === elem.cash_accounts_balance[0].currency_id)

        setName(name);
        setType_accounts(type_acc);
        setCurrency(auxiliaryList.currencies[index].name);
        setCurrentCashAndAccount(elem);
        setResultBalance(elem.cash_accounts_balance[0].balance);
      }

    });
    // eslint-disable-next-line
  }, []);

  const handleSave = () => {
    const body = currentCashAndAccount;

    const type = type_accounts === 1 ? false : true;

    body.type_accounts = type;
    body.Name = name;
    body.Represent = currency.toUpperCase();
    body.balance = resultBalance;

    cash_and_accounts.forEach((elem) => {
      if (elem.id === cashId) {
        return elem = body;
      }
    });

    handleCloseChildModal();
  }

  const api = new API();

  const handleDelete = () => {
    api.remove(cashId, 'cashAndAccount').then(data => {
      if (data.status === "error") return alert(data.message)
      handleCloseChildModal();
    });
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseChildModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style} className={styles.childModal}>

          {type_accounts === 2 &&
            <div>
              <FormControl variant="standard" style={{ width: '100%', marginBottom: '20px' }}>
                {balanceList.map((c, i) => {
                  return (<div key={i}>
                    <img className={styles.modal_img} onClick={handleCloseChildModal} src={crossImg} alt="cross" />
                    <div className={styles.modal_title}>Редактирование счёта</div>
                    <TextField
                      sx={{ marginBottom: '20px', width: '70%' }}
                      id="standard-multiline-flexible"
                      label="Название:"
                      multiline maxRows={2}
                      value={name || ''}
                      onChange={(e) => setName(e.target.value)} variant="standard"
                    />
                    <TextField
                      sx={{ marginBottom: '30px', width: '70%' }}
                      disabled
                      label="Валюта"
                      value={currency}
                      variant="standard"
                    />
                    <TextField sx={{ marginBottom: '30px', width: '70%' }}
                      label={resultBalance || ''}
                      type="number"
                      variant="standard"
                      value={c.value}
                      name="balance"
                      onChange={(e) => updateBalance(e, i)}
                    />
                  </div>)
                })}

              </FormControl>
            </div>
          }
        </Box>


      </Modal>
    </div>
  );
}
