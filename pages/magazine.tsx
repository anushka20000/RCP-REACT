
import Layout from '../components/Layout'
import React,{useContext} from "react";
import Magazine from '../components/pages/Magazine/Magazine'
import LangContext from '../providers/language';
import api from '../services/apiClient';

const AboutPage = (props) => {
  const langCtx = useContext(LangContext);

return(

  <Layout title={props.page && props.page.meta_title ? props.page.meta_title : 'PUJAPATH'} description={props.page && props.page.meta_description} og={props.page && props.page.meta_image}>
      <Magazine/>
  </Layout>
)
}
export async function getServerSideProps() {
  let page = { meta_title: 'PUJAPATH', meta_description: 'PUJAPATH', meta_image: 'https://cdn.pujapathbooking.com/puja/0sqyxaai_pujapath_thumbnail.jpg' };
  
  const response = await api.get("seo/magazine");
  const result: any = response.data;

  if(result.success)
    page = result.data['seo'];

  return { props: { page } }
}

export default AboutPage
