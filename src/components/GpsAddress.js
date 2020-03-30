import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { getAddressByLatLng } from '../app/helper/getAddressByLatLng';
import { PAGE_MAP, PAGE_EDIT_ADDRESS } from '../app/AppConstant';
import EnterAddress from './EnterAddress';
const GpsAddress=(props)=>{
    const [marker,setMarker]=useState(false);
    const [center,setCenter]=useState({ lat: 20.3423744, lng: 85.8161152});
    const[myAddress,setMyAddress]=useState(false);
    const [fullAddress,setFullAddress]=useState({});
    const [page,setPage]=useState(PAGE_MAP);
    const [locationFetched,setLocationFetched]=useState(false);
    const [viewBounds,setViewBounds]=useState(false);
    /**
     * add search bar to map
     * @param {*} mapProps 
     * @param {*} map 
     */
   const  fetchPlaces=(mapProps, map)=> {
       getLocation(locationFetched);
       setLocationFetched(true);
        if(viewBounds)
            map.fitBounds(viewBounds);
        const {google} = mapProps;
        const input = document.getElementById('searchbox');
        map.controls[google.maps.ControlPosition.TOP].push(input);
        var circle = new google.maps.Circle(
            {center: center, radius: 50*1000});
          var searchBox = new google.maps.places.SearchBox(input, {
            bounds: circle.getBounds(),
            componentRestrictions: {country: 'in'}
          });
          searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();
            if (places.length === 0) {
              return;
            }
            let bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
                if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
                }
                 setMarker({latitude:place.geometry.location.lat(),longitude:place.geometry.location.lng()});
                 setAddress(place);
                  if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                  } else {
                    bounds.extend(place.geometry.location);
                  }
                });
                setViewBounds(bounds);
                map.fitBounds(bounds);
        })
    }
 
    

    const mapStyles = {
       position:'relative',
       width:'100%',
       height:'100%',
      };
      /**
       * get user's gps address when button is clicked.
       */
    const getLocation=(loaded)=>{
   if(!loaded){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos=>{
                console.log('geoloc')
                setCenter( {lat:pos.coords.latitude,
                    lng:pos.coords.longitude});
                setMarker(pos.coords);
               getAddress({latitude:pos.coords.latitude,longitude:pos.coords.longitude});
       
               
            });
          } else { 
           console.log("Geolocation is not supported by this browser.");
          }
        }
   

    }
    /**
     * get address of given location by calling map api
     * and call set address function
     * @param {*} latLng latitude and longitude of location
     */
    const getAddress=(latLng)=>{
        getAddressByLatLng(latLng).then(address=>{
         setAddress(address);
        })
    }
    /**
     * set fullAddress and display formatted address
     * @param {*} address address by fetch call to map api
     */

    const setAddress=(address)=>{
  
        let fullAddress={};
        address.address_components.forEach(element => {
            if(element.types.includes('locality')){
                fullAddress.locality=element.long_name;
            }
            else if(element.types.includes('premise')){
                fullAddress.address?
                fullAddress.address+=' '+element.long_name:
                fullAddress.address=element.long_name;
            }
            else if(element.types.includes('neighborhood')|| element.types.includes('route')){
                fullAddress.landmark=element.long_name;
                fullAddress.address?
                fullAddress.address+=' , '+element.long_name:
                fullAddress.address=element.long_name;
            }
            else if(element.types.includes('sublocality')){
                fullAddress.address?
                fullAddress.address+=' , '+element.long_name:
                fullAddress.address=element.long_name;
                }
            else if(element.types.includes('administrative_area_level_2')){
                fullAddress.city=element.long_name;
            }
            else if(element.types.includes('administrative_area_level_1')){
                fullAddress.state=element.long_name;
            }
            else if(element.types.includes('postal_code')){
                fullAddress.pin=element.long_name;
            }

        });
        fullAddress.formatted_address=address.formatted_address;
        setMyAddress(address.formatted_address);
        setFullAddress(fullAddress);
    }
    /**
     * handless marker drag event
     * @param {*} cord cordinate of user's location
     */
    const markerDraged=(cord)=>{
        const latLng={latitude:cord.latLng.lat(),longitude:cord.latLng.lng()}
        setMarker(latLng)
        getAddress(latLng);
    }
    /**
     * dispay address and button
     */
    const ViewAddress=()=>{
      
    return <div>
       
        <h2>{myAddress}</h2>
        <div className='mb-4'>
        <Button variant='info' onClick={()=>props.setAddress({...fullAddress,latLng:marker})}> Select this Location</Button>
        <Button variant='warning' className='ml-3' onClick={()=>setPage(PAGE_EDIT_ADDRESS)}>Edit Address</Button>
        </div>
       
    </div>
    
    }
    /**
     * dispay marker in map
     */
   const MyLocation=()=>{
       let pos={
        lat:marker.latitude,
        lng:marker.longitude
       }
      if(marker){
        return(
            <Marker position={pos}
            draggable={true}
            onDragend={(t,map,coord)=>markerDraged(coord)}
             />
        )
    }
    else{
        return <></>
    }
    }
   
    const setValidAddress=(status,address={})=>{
        if(status){
            setFullAddress(address);
            setMyAddress(address.formatted_address);
        }
        setPage(PAGE_MAP);    
    }
 if(page===PAGE_MAP)  
    return(
        <div className='text-center'>
            <Button className='mt-4 mb-3'onClick={()=>getLocation(false)}>
                Get My Location
            </Button>
            <div>
                {myAddress?<ViewAddress/>:<></>}
            </div>
        
                    <input type='text' id='searchbox' className='form-control col-md-4 mt-2' size="30" placeholder="Search place in map"/>
        
                <div>
            <Map
            google={props.google}
            zoom={15}
            style={mapStyles}
            center={center}
            initialCenter={center}
            panControl={true}
            onReady={fetchPlaces}
            >
                
                {MyLocation()}

                {/* <Polyline path={path} options={{ strokeColor: "#FF0000 " }} /> */}
                </Map>
                </div>
            
        </div>
        
    )
    else if(page===PAGE_EDIT_ADDRESS){
        return(
            <EnterAddress buttonText='SAVE ADDRESS' fullAddress={fullAddress} setValidAddress={setValidAddress}/>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAP_API_KEY,
  })(GpsAddress);