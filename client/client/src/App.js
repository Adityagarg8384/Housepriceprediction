import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from 'styled-components';


const Main = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
width: 100vw;
`

const Text = styled.h1`
  color: white;
  font-size: 3rem;
  margin-bottom: 20px;

  @media (max-width: 430px) and (max-height: 932px) {
    font-size: 12px; /* Adjusted font size for smaller screens */
  }
`;

const Head = styled.div`
  display: flex;
  width: 40vw;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #191b21;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* Adjusted width for smaller screens */
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputName = styled.div`
  color: white;
  font-size: 14px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  background-color: #212631;
  color: white;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  @media (min-width: 768px) {
    font-size: 18px; /* Adjusted font size for desktop screens */
  }
`;

const Option = styled.option`

`

const Select = styled.select`
margin-top: 1rem;
margin-bottom: 1rem;
padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  background-color: #212631;
  color: white;
`

function App() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [call, setCall]= useState();
  const [price, setPrice]= useState(null);

  const FormHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const getData = (e) => {
    // e.preventDefault();
    fetch("http://127.0.0.1:5000/get_location_names", {
      method: 'GET',
      // body: JSON.stringify(data),
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json'
      // },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        // console.log(res.locations);
        setLocation(res.locations);
        // console.log(location);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
  }, [call]);

  useEffect(() => {
    // console.log(location);
  }, [location]);

  useEffect(() => {
    
    // console.log(location);
  }, [price]);

  const Estimated= (e)=>{
    e.preventDefault();
    console.log(data);

    fetch("http://127.0.0.1:5000/predict_home_price", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setPrice(res.estimated_price);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <Main>
      <Head>
        <form>
          <Text>House Price Predict</Text>
          <InputWrapper>
            <InputName>Area(sq ft.):</InputName>
            <Input
              type="text"
              name="Area"
              value={data.Area}
              onChange={FormHandler}
            />
          </InputWrapper>
          <InputWrapper>
            <InputName>BHK:</InputName>
            <Input
              type="text"
              name="Bhk"
              value={data.Bhk}
              onChange={FormHandler}
            />
          </InputWrapper>
          <InputWrapper>
            <InputName>Bath:</InputName>
            <Input
              type="text"
              name="Bath"
              value={data.Bath}
              onChange={FormHandler}
            />
          </InputWrapper>
          <InputWrapper>
            <Select name="Location" value={data.Location} onChange={FormHandler}>
              <Option value="" disabled="disabled" selected="selected" >
                Select a location
              </Option>
              {/* <Option>Electronic City</Option>
              <Option>Rajaji Nagar</Option> */}
              {
                location===null ?
                <></>:
                  location.map((e, index) => (
                    <Option key={index} value={e}>
                      {e}
                    </Option>
                  ))
              }
            </Select>
          </InputWrapper>
          <Button type="submit" onClick={Estimated}>Submit</Button>
          <InputWrapper>
          {
            price===null?
            <></>
            :
            <InputName>Estimated Price : {price} Lakh</InputName>
          }
          </InputWrapper>
        </form>
      </Head>
    </Main>
  );
}

export default App;
