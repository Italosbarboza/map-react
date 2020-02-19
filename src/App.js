import React, {useState, Component} from 'react';
import { GoogleMap, withScriptjs,
   withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import * as parksData from "./data/skateboard-parks.json";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
function Map() {
  //toda vez que cria uma variável que vai precisar variar dentro da classe!!!
  const [selectedPark, setselectedPark] = useState(null);
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }));

  const classes = useStyles();

  return (
    // Important! Always set the container height explicitly
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{lat: -3.718460,lng: -38.541672 }}
      >
        {parksData.features.map((park) => (
            <Marker key= {park.properties.id} 
            position = {{ lat: park.properties.longitude,
                          lng: park.properties.latitude}}
                          onClick = { () => {
                            setselectedPark(park)
                          }}
                          icon = {{
                            url: '/hidrante.png',
                            scaledSize: new window.google.maps.Size(20,20)
                          }}
             />
        ))}
      
      { selectedPark && (
        <InfoWindow
            position={{
              lat: selectedPark.properties.longitude,
              lng: selectedPark.properties.latitude
            }}
            onCloseClick={()=>{
              setselectedPark(null);
            }}
            >
              <div>
              <Avatar alt="Remy Sharp" src={selectedPark.imagem.url} className={classes.large} />
              <h4>Número de série: {selectedPark.properties.numero}</h4>
              <h4>Pressão: {selectedPark.vistorias.pressao}</h4>
              <h4>Vazao: {selectedPark.vistorias.vazao}</h4>
              </div>
            </InfoWindow>
      )}
      </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function LatestSales() {
  return (
  <div style= {{width: '80vw', height: '100vh'}}>
    <WrappedMap
     googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
    libraries=geometry,drawing,places&key= AIzaSyDragFl8lssbgGchWJfn8FrAgkDlWoh_TM`}
     loadingElement={<div style={{ height: "100%" }} />}
     containerElement= {<div style={{ height: "100%" }} />}
     mapElement= {<div style={{ height: "100%" }} />}
  />
  </div>
  );
}