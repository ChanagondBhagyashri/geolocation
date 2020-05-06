import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import CurrentLocation from './CurrentLocation ';
const mapStyles = {
  width: '100%',
  height: '100%'
};

 class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
      };
    constructor(props) {
        super(props);  
       
      }    
   
   componentDidMount() {   
       /* navigator.geolocation.getCurrentPosition(function(position) {
        this.setState({Latitude : position.coords.latitude });
        console.log(this.state.Latitude);
         console.log("Longitude is :", position.coords.longitude);
        }); */


      }
      onMarkerClick = (props, marker, e) =>{
        console.log(props);
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};
  render() {
    return (
        <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick} name={this.state.selectedPlace.name} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDL7Q9Ly_HIv0CkLrvDj5jwnXTwZb36_6w'
})(MapContainer);