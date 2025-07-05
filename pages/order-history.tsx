import React, { useEffect, useContext} from "react";
import Layout from '../components/Layout'
import { OrderHistory } from "../components/pages/OrderHistory/OrderHistory";
import AuthContext from '../providers/auth';
import Router from "next/router";

const OrderHistoryPage = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if(!authCtx.isLoggedIn){
      Router.push('/');
    }
  }, [authCtx.isLoggedIn])

  return (
    <Layout title="Order History" description="Order History | PUJAPATH" og="https://cdn.pujapathbooking.com/cms/astrology-three.jpg">
      <OrderHistory />
    </Layout>
  )
}

export default OrderHistoryPage
