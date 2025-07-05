import Layout from '../components/Layout'
import React, { useContext , useState, useEffect} from "react";
import ReligiousTour from '../components/pages/ReligiousTour/ReligiousTour'
import LangContext from "../providers/language";
import { useQuery } from 'react-query';
import fetchTour from '../services/TourService';
import api from '../services/apiClient';

const AboutPage = (props) => {
  const langCtx = useContext(LangContext);
  const [tours, setTours] = useState([])
  const [locations, setLocations] = useState([])
  const [search, setSearch] = useState("") 

  const { isLoading, refetch: fetchTourPageByLang } = useQuery(
    "tour-api-data",
    async () => {
      return await fetchTour(langCtx.lang, search, '');
    },
    {
      enabled: true,
      onSuccess: (res) => {
        setTours(res['datas'])
        setLocations(res['locations'])
      },
      onError: (err: any) => {
        setTours((err.response?.datas || err))
        setLocations((err.response?.datas || err))
      },
    }
  )

  useEffect(() => {
    fetchTourPageByLang()
  }, [langCtx.lang, search == ''])

 
  return(
  <Layout title={props.page && props.page.meta_title ? props.page.meta_title : 'PUJAPATH'} description={props.page && props.page.meta_description} og={props.page && props.page.meta_image}>
      <ReligiousTour tours={tours} locations={locations}  />
  </Layout>
  )
}
export async function getServerSideProps() {
  let page = { meta_title: 'PUJAPATH', meta_description: 'PUJAPATH', meta_image: 'https://cdn.pujapathbooking.com/puja/0sqyxaai_pujapath_thumbnail.jpg' };
  
  const response = await api.get("seo/religious-tour");
  const result: any = response.data;

  if(result.success)
    page = result.data['seo'];

  return { props: { page } }
}

export default AboutPage
