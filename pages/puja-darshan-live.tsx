
import Layout from '../components/Layout'
import React, { useContext } from "react";
import { PujaLive } from '../components/pages/LivePuja/PujaLive';
import LangContext from "../providers/language";

const DarshanLivePage = () => {
  const langCtx = useContext(LangContext);
  return(
  <Layout title={langCtx.getLabel('Live streaming')}>
      <PujaLive/>
  </Layout>
  )
}

export default DarshanLivePage
