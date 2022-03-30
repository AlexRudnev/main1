import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import crossImg from './img/cross.png';
import styles from './Modal.module.css';
import API from '../api/api';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";

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

export default function CurrencyExchangeModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const [item, setItem] = React.useState({});
  const api = new API();

  React.useEffect(() => {
    if(open) {
      const date = new Date();
      const milliseconds = date.getTime();
      setItem({exchange_rate: 1, created_at: milliseconds})
    }
    // eslint-disable-next-line
  },[open])

  const handleChange = e => {
    const { name, value } = e.target;
    if(name === 'amount_pay') {
      setItem(prevItem => ({
        ...prevItem,
        amount_receive: value
      }));
    }
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleDate = (value) => {
    const date = new Date(value);
    const milliseconds = date.getTime();
    setItem(prevItem => ({
      ...prevItem,
      created_at: milliseconds
    }));
  }

  const handleAdd = () => {

    api.add(item, 'moneyExchange').then(data => {
      if (data.status === "error") return alert(data.message)
      setOpen(false);
    })

  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal} sx={style}>
          <img className={styles.modal_img} onClick={handleClose} src={crossImg} alt="cross" />
          <div className={styles.modal_title}>Обмен валют</div>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Касса</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Касса"
              sx={{ marginBottom: '15px' }}
              value={item.cash_account_id}
              name="cash_account_id"
              onChange={handleChange}
            >
              <MenuItem value={1}>Тестовая Касса</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">Отдаю:</InputLabel>
            <Select
              autoWidth
              label="Валюта:"
              sx={{ marginBottom: '15px' }}
              value={item.from_currency_id}
              name="from_currency_id"
              onChange={handleChange}
            >
              <MenuItem value={1}>UAH</MenuItem>
              <MenuItem value={2}>RUB</MenuItem>
              <MenuItem value={3}>USD</MenuItem>
              <MenuItem value={4}>EUR</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">Получаю:</InputLabel>
            <Select
              autoWidth
              label="Валюта:"
              sx={{ marginBottom: '15px' }}
              value={item.to_currency_id}
              name="to_currency_id"
              onChange={handleChange}
            >
              <MenuItem value={1}>UAH</MenuItem>
              <MenuItem value={2}>RUB</MenuItem>
              <MenuItem value={3}>USD</MenuItem>
              <MenuItem value={4}>EUR</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth  style={{ marginBottom: '15px' }}>
            <TextField
              sx={{marginBottom: '15px'}}
              label="Сумма:"
              type="text"
              variant="standard"
              value={item.amount_pay}
              name="amount_pay"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl fullWidth  style={{ marginBottom: '15px' }}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                label="Дата"
                value={item.created_at}
                onChange={(newValue) => {
                  handleDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth  style={{ marginBottom: '15px' }}>
            <TextField
              sx={{marginBottom: '15px'}}
              label="Заметки:"
              type="text"
              variant="standard"
              value={item.note}
              name="note"
              onChange={handleChange}
            />
          </FormControl>

          <Button variant="contained" onClick={handleAdd} className={styles.modal_bankbtn}>Ок</Button>
        </Box>
      </Modal>
    </div>
  );
}