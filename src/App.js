import React, {useEffect,useState} from 'react';
import './App.css';

const inputData = {
"Exam Fee":{
    "INDIAN":{
      "ALL_COURSES":{
        "ALL_LEVEL":{
        "amount":400
        }
      }
    },
    "FOREIGN":{
      "ALL_COURSES":{
        "ALL_LEVEL":{
        "amount":100
        }
      }
    },
    "NRI":{
      "ALL_COURSES":{
        "ALL_LEVEL":{
        "amount":600
        }
      }
    },
    "SAARC":{
      "ALL_COURSES":{
        "ALL_LEVEL":{
        "amount":600
        }
      }
    }
 },
 "Application Fee":{
        "INDIAN":{
          "ALL_COURSES":{
              "UG":{
              "amount":200
              },
              "DIPLOMA":{
              "amount":300
              },
              "PG":{
              "amount":500
              },
              "Ph.D":{
                "amount": 600
              }
          }
        },
        "FOREIGN":{
          "ALL_COURSES":{
              "UG":{
              "amount":400
              },
              "DIPLOMA":{
              "amount":400
              },
              "PG":{
              "amount":700
              },
              "Ph.D":{
                "amount": 600
              }
          }
        }
 }
}

const cources = ["Medical", "Dental", "Ayurveda"];
const levels = ["UG", "PG", "DIPLOMA", "Ph.D"];


const feeTypes = Object.keys(inputData);


function App() {

  const [nationality, setNationality] = useState([]);
  
  const [selectedFeeType, setSelectedFeeType] = useState("")
  const [selectednationality, setSelectedNationality] = useState("")
  const [selectedlevel, setSelectedlevel] = useState("")
  const [selectedcource, setSelectedcource] = useState("")

  const [fee, setFee] = useState('');
  
  const onChangeFee=(data)=>{
      setNationality(data ? Object.keys(inputData[data]) : []);
      setSelectedNationality('');
      setSelectedcource('');
      setSelectedlevel('');
      setFee('');
      setSelectedFeeType(data);
  }

  const onChangeNation=(data)=>{
    setSelectedcource('');
    setSelectedlevel('');
    setFee('');
    setSelectedNationality(data);
  }

  const onChangeCource=(data)=>{
    setSelectedcource(data);
    setSelectedlevel('');
    setFee('');
  }
  
  const onChangeLevel=(data)=>{
    if(data){
      if(selectedFeeType == "Application Fee"){
        setFee(inputData[selectedFeeType][selectednationality]["ALL_COURSES"][data].amount);
      }
      else{
        setFee(inputData[selectedFeeType][selectednationality]["ALL_COURSES"]["ALL_LEVEL"].amount);
      }
      setSelectedlevel(data)
    }else{
      setFee('');
      setSelectedlevel('')
    }
      
  }


  return (
    <div className="App">
      <span>Fee Type: </span>
      <select value={selectedFeeType} onChange={(e)=>onChangeFee(e.target.value)}>
            <option value="">Select Fee Type</option>
        {
          feeTypes.map((data1,i)=>{
              return <option value={data1} key={i}>{data1}</option>
          })
        }
      </select>

      {
          selectedFeeType ? 
          <>
          <span> Nationalities: </span>
          <select value={selectednationality} onChange={(e)=>onChangeNation(e.target.value)}>
            <option value="">Select Nationality</option>
            {
              nationality.map((data1,i)=>{
                  return <option value={data1} key={i}>{data1}</option>
              })
            }
          </select>
          </>
          :
          null
      }

      {
          selectednationality ? 
          <>
          <span> Cources: </span>
          <select value={selectedcource} onChange={(e)=>onChangeCource(e.target.value)}>
            <option value="">Select Cources</option>
            {
              cources.map((data1,i)=>{
                  return <option value={data1} key={i}>{data1}</option>
              })
            }
          </select>
          </>
          :
          null
      }

      {
          selectedcource ? 
          <>
          <span> Levels: </span>
          <select value={selectedlevel} onChange={(e)=>onChangeLevel(e.target.value)}>
            <option value="">Select Lavels</option>
            {
              levels.map((data1,i)=>{
                  return <option value={data1} key={i}>{data1}</option>
              })
            }
          </select>
          </>
          :
          null
      }

       {fee ? <p>Fee : {fee}</p> : null }

    </div>
  );
}

export default App;
