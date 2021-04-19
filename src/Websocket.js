import React,{useState} from 'react'

const Websocket = () => {
    const [price, setPrice] = useState('loading data');
    const [date, setDate] = useState('loading data');
    const ws = new WebSocket("ws://stream.tradingeconomics.com/?client=guest:guest");
    
    ws.addEventListener("open", () => {
      
        console.log("connected")

        ws.send(JSON.stringify({topic: "subscribe", to: "EURUSD:CUR"}));
    })


  ws.addEventListener("message" , async (data) => {
    const info = await JSON.parse(data.data);
    if(!info.price || !info.dt) { 
        
        setPrice("Loading data..");
        setDate("Loading data.."); 
    }

    else {

   
      
   
      setPrice("$" + " " + info.price);
    
      var timestamp = info.dt
      var date = new Date(timestamp);
      


        const setHours = () =>{ if(date.getHours() < 10) {
            const hours = "0"+date.getHours();
            return  hours;
        }
            else return date.getHours();
        }


        const setSeconds = () =>{ if(date.getSeconds() < 10) {
            const seconds = "0"+date.getSeconds();
            return  seconds;
        }
            else return date.getSeconds();
        }

        const setMinutes = () =>{ if(date.getMinutes() < 10) {
            const minutes = "0"+date.getMinutes();
            return  minutes;
        }
            else return date.getMinutes();
        }

        setDate(date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+setHours()+
        ":"+setMinutes()+
        ":"+setSeconds());


        }

        });
    
    
    

 

 
    

    return (
        <div className="card-container">
            <div  className="card">
                <h2>EUR/USD</h2>

                <div className="card-info">
                    <span> <b>Price: </b> {price}</span>
                    <span> <b> Date:</b> {date}</span>
                </div>
                
               
            </div>
        </div>
    )
}

export default Websocket
