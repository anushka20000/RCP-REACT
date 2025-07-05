import Layout from '../components/Layout'
import React,{useContext,useEffect,useState} from "react";
import Content from '../components/common/Content/Content'
import LangContext from '../providers/language';
import { useQuery } from 'react-query';
import fetchApi from '../services/AboutService';
import api from '../services/apiClient';

const AboutPage = (props) => {

  let slug = 'about';
  const langCtx = useContext(LangContext);
  const [value,setValue] = useState([])
  const { refetch: fetchcmsByLang } = useQuery(
    "cms-api-data",
    async () => {
      return await fetchApi(slug, langCtx.lang);
    },
    {
      enabled: false,
      onSuccess: (res) => {
        if(res['datas']!==undefined && res['datas'].length>0) {
          setValue(res['datas'][0]['cm']['CmsTranslates']);
        }
      },
      onError: (err: any) => {
        setValue((err.response?.datas || err));
      },
    }
);
useEffect(() => {
  fetchcmsByLang();
}, [slug, langCtx.lang])

  return(
    value.map(val => (
  <Layout title={props.page && props.page.meta_title ? props.page.meta_title : 'PUJAPATH'} description={props.page && props.page.meta_description} og={props.page && props.page.meta_image}>
    <Content title={val.title} content={val.description}/>
    {console.log(val.description)}
  </Layout>
    ))
  )

}
export async function getServerSideProps() {
  let page = { meta_title: 'PUJAPATH', meta_description: 'PUJAPATH', meta_image: 'https://cdn.pujapathbooking.com/puja/0sqyxaai_pujapath_thumbnail.jpg' };
  
  const response = await api.get("seo/about");
  const result: any = response.data;

  if(result.success)
    page = result.data['seo'];

  return { props: { page } }
}


export default AboutPage
