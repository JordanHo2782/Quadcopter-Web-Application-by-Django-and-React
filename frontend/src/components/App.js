import React, { Component } from "react";
import { render } from "react-dom";
import './App.css';

import regeneratorRuntime from "regenerator-runtime";

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@material-ui/core'
import Cookies from 'js-cookie'

class App extends Component {
    constructor(props){
        super(props)
        this.ButtonOnClick=this.ButtonOnClick.bind(this)
        this.SubmitForm=this.SubmitForm.bind(this)
        this.state={
            currentlatitude: 22.28552,
            currentlongtitude: 114.15769,
            currentAddress:'The Hong Kong Polytechnic University',
            targetlatituide: 22.28552,
            targetlongtitude: 114.15769,
            targetAddress: 'The Hong Kong Polytechnic University',
            map: null,
            CurrentLocationMarker: null,
            TargetLocationMarker: null,
            RouteLine: null,
            distance:0,
            BatteryLevel:null,
            RouteCoordinate:[{
                lat:22.2888619,
                lng:113.9417394	
            },{
                lat: 22.28552,
                lng: 114.15769
            },{
                lat: -27.467,
                lng: 153.027}
            ],
        }
    }

    ButtonOnClick(){

        let AddressInputValue = document.getElementsByName('Destination')[0].value;

        let GeoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${AddressInputValue}&key=AIzaSyDTSKXMgk0uJMl5ZqrlnwETSLB0dlypp2E`

        fetch(GeoCodeURL).then(res=>{return res.json()}).then(data=>{
            this.setState({
                targetlatituide: data.results[0].geometry.location.lat,
                targetlongtitude: data.results[0].geometry.location.lng,
                targetAddress: data.results[0].formatted_address,
            })})
            this.state.TargetLocationMarker.setPosition({
            lat: this.state.targetlatituide,
            lng: this.state.targetlongtitude,
        }).then(()=>{
            this.FetchRoute()
        }).then(()=>{
            this.state.RouteLine.setMap(this.state.map)
        }).then(()=>{
            console.log(`The currentlatitude is ${this.state.currentlatitude}, the currentlongitude is ${this.state.currentlongtitude}, the targetlatitude is ${this.state.targetlatituide}, the targetlongtitude is ${this.state.targetlongtitude}`)
        })
        //this.FetchRoute();
        //this.state.RouteLine.setMap(this.state.map)
        //console.log(`The currentlatitude is ${this.state.currentlatitude}, the currentlongitude is ${this.state.currentlongtitude}, the targetlatitude is ${this.state.targetlatituide}, the targetlongtitude is ${this.state.targetlongtitude}`)
    }

    componentWillMount(){
        const setLocation = ()=>{
            let GeoLocateurl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDTSKXMgk0uJMl5ZqrlnwETSLB0dlypp2E'
            
            fetch(GeoLocateurl,{method: 'POST'}).then(res=>{return res.json()}).then(data=>{
              this.setState({
              currentlatitude: data.location.lat,
              currentlongtitude: data.location.lng,
              });
              return {currentlatitude: data.location.lat, currentlongtitude: data.location.lng,}
          }).then(data=>{
              fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.currentlatitude},${data.currentlongtitude}&key=AIzaSyDTSKXMgk0uJMl5ZqrlnwETSLB0dlypp2E`).then(res=>{
                return res.json()
              }).then(data=>{
                  this.setState({
                    currentAddress: data.results[0].formatted_address
                  })
              })
          })
        }
        setLocation();
        const initMap = async () =>{

            //Write a promise

            this.setState({
                map: new window.google.maps.Map(document.getElementById('map'), {
                    center: {lat: this.state.currentlatitude, lng: this.state.currentlongtitude},
                    zoom: 20
                  }),
            })
            this.setState({
                CurrentLocationMarker: new window.google.maps.Marker({
                    position: {lat: this.state.currentlatitude, lng: this.state.currentlongtitude},
                    map: this.state.map,
                    title:'Current Location Marker'
                }),
                TargetLocationMarker: new window.google.maps.Marker({
                    position: {lat: this.state.targetlatituide, lng: this.state.targetlongtitude},
                    map: this.state.map,
                    title:'Target Location Marker'
                })
            })

            this.FetchRoute()

            this.setState({
                RouteLine: new window.google.maps.Polyline({
                    path: this.state.RouteCoordinate,
                    geodesic: true,
                    strokeColor:'red',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                })
            })

            this.state.RouteLine.setMap(this.state.map)

            console.log(this.state.RouteCoordinate)

            //await this.state.RouteLine.setMap(this.state.map)
            
            let ClickMapEvent = async ()=>{
                this.state.map.addListener('click',(event)=>{
                    this.setState({
                        targetlatituide: event.latLng.lat(),
                        targetlongtitude: event.latLng.lng(),
                    })
                    //Fetch Address
                    
                    this.state.TargetLocationMarker.setPosition({
                        lat: this.state.targetlatituide,
                        lng: this.state.targetlongtitude,
                    })
                    let GeoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${event.latLng.lat()},${event.latLng.lng()}&key=AIzaSyDTSKXMgk0uJMl5ZqrlnwETSLB0dlypp2E`
                    fetch(GeoCodeURL).then(res=>{return res.json()}).then(data=>{
                        this.setState({
                            targetAddress: data.results[0].formatted_address
                        })
                    })
                    this.state.RouteLine.setMap(this.state.map)
                    this.FetchRoute();
                    //this.state.RouteLine.setMap(this.state.map)
                })
            }
            ClickMapEvent()
        }
        const renderMap = () =>{
            const loadScript = (url)=>{
                const index = window.document.getElementsByTagName('script')[0]
                const script = window.document.createElement('script')
                script.src = url
                script.async = true
                script.defer = true
                index.parentNode.insertBefore(script, index)
            }
            loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDTSKXMgk0uJMl5ZqrlnwETSLB0dlypp2E&callback=initMap');
            window.initMap = initMap
        }
        renderMap()
        this.FetchBatteryLevel()
    }

    FetchRoute(){

        let RouteURL = `https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.currentlatitude},${this.state.currentlongtitude}&destination=${this.state.targetlatituide},${this.state.targetlongtitude}&avoid=indoor&&key=<DIRECTION_API_KEY>`
        fetch(RouteURL).then(res=>{return res.json()}).then(data=>{
            let FlightPath = window.google.maps.geometry.encoding.decodePath(data.routes[0].overview_polyline.points)
            this.setState({
            RouteCoordinate:FlightPath,
            distance: data.routes[0].legs[0].distance.value})
            this.state.RouteLine.setPath(FlightPath)
        }).catch(err=>{
            console.log(`Error code:${err}`)})

        //Only set Route Coordinate, routeline no effect
    }

    FetchBatteryLevel(){
        fetch('http://172.20.10.10:5000')
        .then(res=>{
            return res.text()
        }).then(data=>{
            //Data return
            this.setState({
                BatteryLevel: parseFloat(data)
            })
        })
    }

    SubmitForm(){
        let data = {
            distance: this.state.distance,
            RouteCoordinate: this.state.RouteCoordinate
        };
        let csrftoken = Cookies.get('csrftoken');
        const fetchURL = window.location.href
        fetch(fetchURL,{
            method: 'post',
            body: JSON.stringify(data),
            mode: 'cors',
            credentials: 'same-origin',
            headers:{ "X-CSRFToken": csrftoken },
        }).then((response)=>{console.log('Post request send sucessfully')
        //console.log(JSON.stringify(formData.get('distance')))
        //console.log(JSON.stringify(response.body))
        })
        .catch((err)=>{console.log(`The error is:${err}`)})
        console.log('Button Click')
        //POST /database
    }

    render() {
        //console.log(JSON.stringify(this.state.RouteCoordinate))
        //console.log(this.state.RouteLine)
        const MapStyle={
            margin:'5%',
            height:'95%'
        }

        const FormStyle={
            margin:'5%',
            height:'95%',
        }

        return (
            <div>

                <Container maxWidth="lg" style={{height: '55vh'}}>
                    <div id='map' style={MapStyle} currentlatitude={this.props.currentlatitude} currentlongtitude={this.props.currentlongtitude}></div>
                </Container>

                <Container maxWidth="sm" style={{height: '10vh'}}>
                    <div style={FormStyle}>
                        <form noValidate autoComplete="off">
                            <div>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={9}>
                                        <TextField id="outlined-basic" label="Address" variant="outlined" name='Destination' fullWidth={true}/>
                                    </Grid>
                                    <Grid item xs={12} sm={3} style={{textAlign:'center'}}>
                                        <Button variant="contained" color="primary" onClick={this.ButtonOnClick} name='ArrowButton' fullWidth={true}>Add Address</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    </div>
                </Container>
                <Container style={{height:'2vh'}}/>
                <Container maxWidth='lg' style ={{height:'25vh'}}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Name</TableCell>
                                    <TableCell align='center'>Latitude</TableCell>
                                    <TableCell align="center">Langtitude</TableCell>
                                    <TableCell align="center">Address</TableCell>
                                    <TableCell align="center">Total Distance (km)</TableCell>
                                    <TableCell align="center">Battery Level</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={'Origin'}>
                                    <TableCell component="th" scope="row" align='center'>Origin</TableCell>
                                    <TableCell component="th" scope="row" align='center'>{this.state.currentlatitude}</TableCell>
                                    <TableCell component="th" scope="row" align='center'>{this.state.currentlongtitude}</TableCell>
                                    <TableCell component="th" scope="row" align='center'>{this.state.currentAddress}</TableCell>
                                    <TableCell component="th" scope="row" align='center' rowSpan='2'>{this.state.distance/1000}</TableCell>
                                    <TableCell component="th" scope="row" align='center' rowSpan='2'>{this.state.BatteryLevel}</TableCell>
                                </TableRow>
                                <TableRow key={'Destination'}>
                                    <TableCell component="th" scope="row" align='center'>Destination</TableCell>
                                    <TableCell component="th" scope="row" align='center'>{this.state.targetlatituide}</TableCell>
                                    <TableCell component="th" scope="row" align='center'>{this.state.targetlongtitude}</TableCell>
                                    <TableCell component="th" scope="row" align='center'>{this.state.targetAddress}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                <Container style={{height:'2vh'}}/>
                <Container maxWidth="sm" style={{height: '10vh'}}>
                    <Button variant="contained" color="primary" fullWidth={true} style={{textAlign: 'center', height:'100%'}} onClick={this.SubmitForm}>Submit</Button>
                </Container>
                <Container style={{height:'2vh'}}/>
            </div>
        )
    }

}

export default App;

const container = document.getElementById("app");
render(<App />, container);

