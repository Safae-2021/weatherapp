import React, { Component } from 'react'
import axios from 'axios'
import './App.css';
import load from './load.gif';







export default class App extends Component {
  
  
  state={
    temperature:"",
    city:"",
    country:"",
    desc:"",
    icon:"",
    date:"",
    time:0,
    humid :"",
    show:false,
    gif:false,
    error:"",
    maxtmp:"",
    mintmp:"",
  }

    getWeatherData = ()=>{
        console.log(77);
   
// form validation
  if(this.city.value.length < 4 && this.country.value.length < 4 ){
      this.setState({
         error:"This fields are required more than 3 characters"
        }) 
  }else{



        this.setState({
          gif:true,
          show:false,
        }) 
      
        console.log("SUCCESSS")

    
      axios({
        method:"GET",
        url:`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&appid=7cc58b3c51c1874347ad80cd0591de59`
      })
      .then((response)=> {

       
        if (response.status == 200){
      
        console.log("llll")

        var weather =  response.data.weather
        weather.map((elem) => {
          var desc = elem.description;
          var icon = elem.icon;
          this.setState({
          desc:desc,
          icon:icon,
          show:true,
          gif:false,

        }) 
        })

  

        // date


// console.log(new Date(response.data.dt*1000-(response.data.timezone*100))); // minus 
var now = new Date(response.data.dt*1000+(response.data.timezone*1000));
// resolse problem of time over 
var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      console.log(utc );
      var dateApi = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(utc);
          this.setState({
                date:dateApi, // plus
          }) 
    console.log(utc);

 // hudedity
    var humid = response.data.main.humidity;
    this.setState({
          humid:humid,
        }) 
        console.log(humid);

       }

 // Kelvin to Celsius  ℃
	  var  tmp = parseInt(response.data.main.temp -273.15);
    this.setState({
     temperature:tmp  
     }) 
    
   


      //  max temp
    var  mxtmp = parseInt(response.data.main.temp_max -273.15);
    this.setState({
     maxtmp:mxtmp 
     }) 

      //  min temp
    var  mntmp = parseInt(response.data.main.temp_min -273.15);
    this.setState({
     mintmp:mntmp 
     }) 
console.log(response.data.main.temp_max);
console.log(response.data.main.temp_min);







    }).catch((error)=> {
	    console.error(error);
    });
    }
}

  // onchange in the input
  setCity=(e)=>{
    var even = e.target.value
      this.setState({
     city:even,
     
     }) 
  }

setCountry=(e)=>{
    var even = e.target.value
      this.setState({
     country:even,
     
     }) 
  }



  render() {
    return (
      <body>
        
       {/* all component */}
      
      <div className="app" >
      <h1 className="head" >Weather</h1>



      {/* input */} 
     
      <div className="input" >

    
    <input type="text"  id="city" className="city" name="city" ref={(input) =>{this.city=input}} style={{textAlign: "center",}}  onChange={this.setCity} placeholder="City" />  
    
  
    
    <input type="text" id="country" className="country"  name="country"  ref={(input) =>{this.country=input}} style={{textAlign: "center", marginLeft: "20%" }} onChange={this.setCountry} placeholder="Country" />   
    

    <button type="submit"  onClick={this.getWeatherData} style={{backgroundColor: "rgba(50, 87, 87, 0.657)",cursor:"pointer", marginLeft: "20%",}} ><i class="fas fa-search"></i> </button>
    
    </div>
 <br/>
 <br/>
 
 
 <p  className="error">  {this.state.error} </p>

    

     

  <div   style={{marginLeft:"5%",marginTop:"5px",fontWeight:"bold"}}   >
  {/* display name country */}
  <p  style={{ fontSize:"20px"  }} >  {this.state.city}    {this.state.country} </p>
  
   <p  style={{ fontSize:"20px"  }}>  {this.state.date} </p>
   
  

  </div>
      

      {
        this.state.gif?
        <img src={load} alt="loading..." style={{ width:"10%",marginLeft:"44%",marginTop:"10%" }}/>   
      : null
      } 

      {
        this.state.show?
        <div className="output">
    
    

    
<div  className="weather"  >
    <img src={`https://openweathermap.org/img/wn/${this.state.icon}@2x.png`}/>
 
    <br/>
    {this.state.desc}
    <br/>
    
    {Math.round(this.state.temperature*100)/100}℃
</div>
    
    <br/>
    <br/>
    <br/>
<div  className="footer"       >
   <p  className="p"> HUMIDITY <br/> {this.state.humid}% </p> 
   <p  style={{marginLeft:"15%",}} > MAX  <br/> {this.state.maxtmp}℃ </p> 
   <p  style={{marginLeft:"15%",}} >  MIN   <br/> {this.state.maxtmp}℃ </p> 


   
   </div>
        </div>
         :null
      } 
        
      </div>

   
      </body>
    )
  }
}
