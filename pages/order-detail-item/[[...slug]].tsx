import Link from 'next/link'
import Layout from '../../components/Layout'
import React,{useContext,useEffect,useState} from "react";
import LangContext from '../../providers/language';
import { useQuery } from 'react-query';
import fetchOrderDetailItem from '../../services/OrderDetailItemService';
import { useRouter } from 'next/router';
import { OrderDetailItem } from '../../components/pages/OrderDetailitem/OrderDetailItem';
import fetchSettingDetails from '../../services/SettingService';
import AuthContext from '../../providers/auth';
import Router
 from 'next/router';
const IndexPage = () => {
  const langCtx = useContext(LangContext);
  const authCtx = useContext(AuthContext);
  const [value, setValue] = useState({})
  const [amount, setAmount] = useState(500);

  const router = useRouter()
  const { slug } = router.query;
  let widgetType = 0;

  if(slug && slug!== undefined) {
    let  parts = slug.toString().split(",");
    parts = parts.filter(n => n);
    switch(parts.length) {
      case 0:{
        break;
      }
      case 1:{
        widgetType = 1;
        break;
      }
    }
  }

  const { isLoading, refetch: fetchOrderDetailPageByLang } = useQuery(
      "order-detail-item-api-data",
      async () => {
        return await fetchOrderDetailItem(slug, langCtx.lang);
      },
      {
        enabled: false,
        onSuccess: (res) => {
       
            setValue(res['datas'])          
        },
        onError: (err: any) => {
          setValue((err.response?.datas || err));
        },
      }
  );
  const {  refetch: fetchSettingDetailByLan } = useQuery(
    "setting-details-api-data",
    async () => {
      return await fetchSettingDetails();
    },
    {
      enabled: false,
      onSuccess: (res) => {
        console.log(res['data']['datas']['shipping_charge'])
        if(res['data'] !== undefined){
          setAmount(res['data']['datas']['shipping_charge'])
        }
      },
      onError: (err: any) => {
        setAmount((err.response?.datas || err));
      },
    }
  );

  const fetchWidgetDetails = ()=>{
    if(widgetType == 1)
      fetchOrderDetailPageByLang();
  }

  useEffect(() => {
      if(!authCtx.isLoggedIn) {
        //Router.push('/');
      }
      else {
        fetchWidgetDetails();   
        fetchSettingDetailByLan()
      }   
    }, [widgetType, slug, langCtx.lang]);

return(
  <Layout title="Order Detail Item" description="Order Detail Item | PUJAPATH" og="https://cdn.pujapathbooking.com/cms/astrology-three.jpg">
    {authCtx.isLoggedIn && <OrderDetailItem value={value} Amount={amount}/>}
  </Layout>

)
}


export default IndexPage
