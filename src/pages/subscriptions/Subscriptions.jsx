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
            const json = await data.json();
            console.log(json);
        }catch(e){
            console.error(e);
        }
       
    }
  return (
    <div>Subscriptions</div>
  )
}

export default Subscriptions