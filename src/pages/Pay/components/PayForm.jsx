import React from 'react';

import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import styles from './../css/PayForm.module.css'

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import TextareaAutosize from '@mui/material/TextareaAutosize';

function UserForm({ item, setItem }) {
  const payTypes = { cash: 'Наличные', bank_account: 'Касса'}
  const pageTypes = {
    pay_supplier: 'Поставщик',
    pay_customer: 'Клиенту(возврат)',
    expend: 'Прочий расход',
    salary: 'Зарплата',
    pay_owner: 'Собственнику',
    receive_customer: 'От клиента',
    receive_supplier: 'От поставщика',
    receive_income: 'Прочее поступление',
    receive_owner: 'Взнос от собственника',
    receive_balance: 'Ввод остатков',
  }
  const [payType, setPayType] = React.useState('cash');
  const [paymentList, setPaymentList] = React.useState([{ currency: null, value: null}]);
  const [changeList, setChangeList] = React.useState([{ currency: null, value: null}]);

  const currentPathName = new URL(window.location.href).pathname.split('/')[1];

  const togglePayType = (e) => {
    setPayType(e.target.value)
  }

  const addPayment = (e) => {
    setPaymentList([...paymentList, { currency: null, value: null}]);
  }

  const addChange = (e) => {
    setChangeList([...changeList, { currency: null, value: null}]);
  }

  const removePayment = (index) => {
    setPaymentList(paymentList.filter((o, i) => index !== i));
  };

  const removeChange = (index) => {
    setChangeList(changeList.filter((o, i) => index !== i));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  return (
    <>
      <div className={styles.boxesWrapper__user}>
        {currentPathName !== 'receive_balance' && <div>
          <h3>Кому</h3>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{pageTypes[currentPathName]}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={item.supplier}
              label="Поставщик"
            >
              <MenuItem value={1}>Тестовый</MenuItem>
            </Select>
          </FormControl>
        </div>}

        <h3 style={{ marginBottom: '15px', marginTop: '15px' }}>Откуда</h3>
        <FormControl >
          <FormLabel id="demo-row-radio-buttons-group-label">Вид оплаты</FormLabel>
          <RadioGroup
            row
            defaultValue="cash"
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="cash" control={<Radio />} label="Наличные" onChange={togglePayType}/>
            <FormControlLabel value="bank_account" control={<Radio />} label="Со счета" onChange={togglePayType} />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{payTypes[payType]}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={item.supplier2}
            label="Поставщик"
            sx={{ marginBottom: '15px' }}
          >
            <MenuItem value={1}>Тестовый</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label="Дата"
            value={item.date}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField
          sx={{marginBottom: '15px'}}
          label="Заметки:"
          type="text"
          variant="standard"
          value={item.note}
          name="note"
          onChange={handleChange}
        />

      </div>

      <div className={styles.boxesWrapper__information} >
        {payType == 'bank_account' &&
          <div>
            <TextField
              sx={{ marginBottom: '15px' }} id="standard-multiline-flexible" label="Сумма:" multiline   variant="standard"
            />
            <h3>Печать</h3>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Организация</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Организация"
              >
                <MenuItem value={1}>Тестовая</MenuItem>
              </Select>
            </FormControl>
          </div>
        }
        {payType == 'cash' &&
          <div>
            {paymentList.map((c, i) => {
              return (<div key={i}>
                <FormControl sx={{m: 1, minWidth: 120}}>
                  <InputLabel id="demo-simple-select-autowidth-label">Валюта:</InputLabel>
                  <Select
                    autoWidth
                    label="Тип цены:"
                  >
                    <MenuItem value={'UAH'}>UAH</MenuItem>
                    <MenuItem value={'RUB'}>RUB</MenuItem>
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'EUR'}>EUR</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  sx={{marginBottom: '15px'}}
                  label="Оплата:"
                  type="number"
                  variant="standard"
                />
                <button className={'MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root PayForm_button__YjScY css-1rwt2y5-MuiButtonBase-root-MuiButton-root'} variant="outlined" onClick={() => removePayment(i)}>X</button>
              </div>)
            })}
            <Button onClick={addPayment}  className={styles.button}  variant="outlined">+ Добавить валюту</Button>
            <br/>

            {changeList.map((c, i) => {
              return (<div key={i}>
                <FormControl sx={{m: 1, minWidth: 120}}>
                  <InputLabel id="demo-simple-select-autowidth-label">Валюта:</InputLabel>
                  <Select
                    autoWidth
                    label="Тип цены:"
                  >
                    <MenuItem value={'UAH'}>UAH</MenuItem>
                    <MenuItem value={'RUB'}>RUB</MenuItem>
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'EUR'}>EUR</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  sx={{marginBottom: '15px'}}
                  label="Сдача:"
                  type="number"
                  variant="standard"
                />
                <button className={'MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root PayForm_button__YjScY css-1rwt2y5-MuiButtonBase-root-MuiButton-root'} variant="outlined" onClick={() => removeChange(i)}>X</button>
              </div>)
            })}
            <Button onClick={addChange}  className={styles.button}  variant="outlined">+ Добавить валюту</Button>
            <h3>Печать</h3>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Организация</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Организация"
              >
                <MenuItem >Нету данных</MenuItem>
              </Select>
            </FormControl>
          </div>
        }

      </div>
    </>
  )
}
export default UserForm