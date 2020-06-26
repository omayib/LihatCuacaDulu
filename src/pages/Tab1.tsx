import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonGrid } from '@ionic/react';
import './Tab1.css';
import WeatherServices from '../services/WeatherServices'

const Tab1: React.FC = () => {
  const [city, setCity] = React.useState(String);
  const [temp, setTemp] = React.useState(String);
  const [desc, setDesc] = React.useState(String);
  const [icon, setIcon] = React.useState(String);
  const [cuaca, setCuaca] = React.useState(String);

  React.useEffect(()=>{
    const weather = new WeatherServices()
    weather.getData().then(result=>{
        setCity(result.data.name)
        setTemp(result.data.main.temp)
        setDesc(result.data.weather[0].description)
        setIcon(`http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`)
        setCuaca(result.data.weather[0].main)
    },fail=>{
      console.log(fail)
    })
    
  })
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cuaca Sekarang</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cuaca Sekarang</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
        <div className="container">
          
          <h1><IonLabel >{temp}°C</IonLabel></h1><br/>
          <img alt="icon" width='50' height='50' src={icon}/><br/>
          <h1><IonLabel>{city}</IonLabel></h1><br/>
          <IonLabel>{cuaca}</IonLabel>
          <IonLabel>({desc})</IonLabel><br/>
         
        </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
