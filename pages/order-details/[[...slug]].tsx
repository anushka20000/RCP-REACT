import Link from 'next/link'
import Layout from '../../components/Layout'
import {OrderDetails} from "../../components/pages/OrderDetails/OrderDetails";
import React,{useContext,useEffect,useState} from "react";
import LangContext from '../../providers/language';
import { useQuery } from 'react-query';
import {fetchOrderDetail, fetchInvoice } from '../../services/OrderDetailsServices';
import { useRouter } from 'next/router';
import AuthContext from '../../providers/auth';
import Router from 'next/router';
import { jsPDF } from "jspdf";

const IndexPage = () => {
  const langCtx = useContext(LangContext);
  const authCtx = useContext(AuthContext);
  const [value, setValue] = useState([])
  const [order,setOrder] = useState({});
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
      "order-detail-api-data",
      async () => {
        return await fetchOrderDetail(slug, langCtx.lang);
      },
      {
        enabled: false,
        onSuccess: (res) => {
     
          if(res['datas'] != undefined){
            setValue(res['datas']['OrderDetails']);
            setOrder(res['datas']);
          }
        },
        onError: (err: any) => {
          setValue((err.response?.datas || err));
          setOrder((err.response?.datas || err))
        },
      }
  );

  const viewInvoice = async()=>{
    const res = await fetchInvoice(slug, langCtx.lang)
    const doc = new jsPDF('l', 'pt', [600,810]);
    doc.html(res.data, {
      async callback(doc) {
        await doc.save('Invoice');
      },
    });
 
}
  

  const fetchWidgetDetails = ()=>{
    if(widgetType == 1)
      fetchOrderDetailPageByLang();
  }

  useEffect(() => {
    if(!authCtx.isLoggedIn) {
      //Router.push('/');
    }

    fetchWidgetDetails();       
    }, [widgetType, slug, langCtx.lang]);



return(
  <Layout title="Order Details" description="Order Details | PUJAPATH" og="https://cdn.pujapathbooking.com/cms/astrology-three.jpg">
    <OrderDetails value={value} order={order} viewInvoice={viewInvoice}/>
  </Layout>

)
}


export default IndexPage
