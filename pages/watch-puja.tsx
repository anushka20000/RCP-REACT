
import Layout from '../components/Layout'
import React from "react";
import WatchPuja from '../components/pages/WatchPuja/WatchPuja'
import api from '../services/apiClient';
// import Content from '../components/common/Content/Content'

const IndexPage = (props) => {
  return(
  <Layout title={props.page && props.page.meta_title ? props.page.meta_title : 'PUJAPATH'} description={props.page && props.page.meta_description} og={props.page && props.page.meta_image}>
    <div></div>
    <WatchPuja />
  </Layout>

  )
}

export async function getServerSideProps() {
  let page = { meta_title: 'PUJAPATH', meta_description: 'PUJAPATH', meta_image: 'https://cdn.pujapathbooking.com/puja/0sqyxaai_pujapath_thumbnail.jpg' };
  
  const response = await api.get("seo/watch-puja");
  const result: any = response.data;

  if(result.success)
    page = result.data['seo'];

  return { props: { page } }
}


export default IndexPage
