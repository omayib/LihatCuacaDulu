import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonGrid, IonRow, IonCol, IonItem, IonButton } from '@ionic/react';
import './Tab2.css';
import WeatherServices from '../services/WeatherServices'

const Tab2: React.FC = () => {
 
  const [weather, setWeather] = React.useState([]);
  const [keterangan, setKeterangan] = React.useState(String);

  function getForecast(){
    if(localStorage.getItem("forecast")){
        setKeterangan("Data dari local storage")
        console.log('local',localStorage.getItem("forecast"))
        var lastData=localStorage.getItem("forecast")!;
        var lastDataObj = JSON.parse(lastData);
        console.log('parsed',JSON.parse(lastData));
        setWeather(lastDataObj) 
    }else{
        setKeterangan("Connecting..")
    }

    const services = new WeatherServices()
    console.log('waiting...')
    services.getDataForecast().then(result=>{
      console.log('done')
      setWeather([])
      setWeather(result.data.list)  
      setKeterangan("Data dari server")
      localStorage.setItem("forecast",JSON.stringify(result.data.list)) 
    },fail=>{
      console.log(fail)
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Prediction</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton  title="Perkiraan" onClick={getForecast}>Lihat Perkiraan</IonButton>
        {keterangan}
        <div className="container">
        <IonList>
          <IonGrid>
          { 
            weather.map(item => {
              var waktu = item['dt_txt']
              var suhu = item['main']['temp']
              var cuaca = item['weather']['0']['main']
              var keterangan=item['weather']['0']['description']
              var imgicon=`http://openweathermap.org/img/wn/${item['weather']['0']['icon']}@2x.png`
              return (
                <IonRow>
                  <IonCol size="auto">
                    <IonItem>
                    <img alt='icon' src={imgicon}></img>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      waktu {waktu}<br/>
                      suhu {suhu}°C<br/>
                      cuaca {cuaca}<br/>
                      keterangan - {keterangan}<br/>
                    </IonItem>
                  </IonCol>
                </IonRow>
              );
            })
          }
          </IonGrid>
        </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
