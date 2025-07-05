
import Layout from '../../components/Layout'
import React, { useContext } from "react";
import Astrology from '../../components/pages/Astrology/Astrology'
import LangContext from "../../providers/language";

const AboutPage = () => {
  const langCtx = useContext(LangContext);

  return(
  <Layout title={langCtx.getLabel('Astrology')}>
      <Astrology/>
  </Layout>
  )
}

export default AboutPage
