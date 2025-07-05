import Layout from '../components/Layout'
import React, {useContext, useEffect, useState} from "react"
import LangContext from "../providers/language"
import {useQuery} from "react-query"
import fetchSettingDetails from '../services/SettingService'
import KundaliMatching from '../components/pages/KundaliMatching/KundaliMatching'
import api from '../services/apiClient'

const IndexPage = (props) => {
  const langCtx = useContext(LangContext);
  const [title,setTitle] = useState("Kundali details");
  const [description,setDescription] = useState("Kundali details");
  const [amount, setAmount] = useState(500)
  const { isLoading, refetch: fetchSettingDetailByLan } = useQuery(
    "setting-details-api-data",
    async () => {
      return await fetchSettingDetails();
    },
    {
      enabled: false,
      onSuccess: (res) => {
        if(res['data']!==undefined){
          setAmount(res['data']['datas']['kundli_match_amount'])
        }
      },
      onError: (err: any) => {
        setAmount((err.response?.datas || err));
      },
    }
);

useEffect(() => {
  fetchSettingDetailByLan();
}, [])

  return (
      <Layout title={props.page && props.page.meta_title ? props.page.meta_title : 'PUJAPATH'} description={props.page && props.page.meta_description} og={props.page && props.page.meta_image}>
          {<KundaliMatching amount={amount} />}
      </Layout>
  );
}
export async function getServerSideProps() {
  let page = { meta_title: 'PUJAPATH', meta_description: 'PUJAPATH', meta_image: 'https://cdn.pujapathbooking.com/puja/0sqyxaai_pujapath_thumbnail.jpg' };
  
  const response = await api.get("seo/kundali-matching");
  const result: any = response.data;

  if(result.success)
    page = result.data['seo'];

  return { props: { page } }
}

export default IndexPage
