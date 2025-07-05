
import Layout from '../components/Layout'
import React, { useContext } from "react";
import LangContext from "../providers/language";
import PujaStreaming from '../components/pages/PujaStreaming/PujaStreaming';

const DarshanLivePage = () => {
  const langCtx = useContext(LangContext);
  return(
  <Layout title={langCtx.getLabel('Puja streaming')}>
    <div></div>
      <PujaStreaming />
  </Layout>
  )
}

export default DarshanLivePage
