
import Layout from '../components/Layout'
import React, { useEffect, useContext, useState} from "react";
import AstrologySession from '../components/pages/AstrologySession/AstrologySession';
import fetchSettingDetails from '../services/SettingService';
import { useQuery } from 'react-query';
import LangContext from '../providers/language';

const sessionWithAstrologer = () => {

  return(

  <Layout title="PUJAPATH">
      <AstrologySession  />
  </Layout>
  )
}


export default sessionWithAstrologer