import { useSelector } from "react-redux";
import { FETCH_SUBSCRIPTIONS } from "../../data/constants";
import { useEffect } from "react";

const Subscriptions = () => {
    const accessToken = useSelector(state => state.user.token);
    console.log(accessToken)
    useEffect(() => {
        
        if(accessToken){
            getSubscriptions();
        }
    }, [accessToken]);

    const getSubscriptions = async () => {
        try{
            const data = await fetch(FETCH_SUBSCRIPTIONS);
            // const json = await data.json();
            console.log(data);
        }catch(e){
            console.log(e);
        }
       
    }
  return (
    <div>Subscriptions</div>
  )
}

export default Subscriptions