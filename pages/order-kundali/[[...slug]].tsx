
import Layout from '../../components/Layout'
import React,{useContext, useState, useEffect} from "react";
import LangContext from '../../providers/language';
import OrderKundali from '../../components/pages/OrderKundali/OrderKundali';
import fetchSettingDetails from '../../services/SettingService';
import { useQuery } from 'react-query';
const orderKundli = () => {
  const langCtx = useContext(LangContext);

  return(
  <Layout title="Home | Next.js + TypeScript Example">
      <OrderKundali />
  </Layout>
  )
}

export default orderKundli