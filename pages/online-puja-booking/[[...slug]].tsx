
import Layout from '../../components/Layout'
import PujaBooking from '../../components/pages/PujaBooking/PujaBooking'
import React from "react";
import api from '../../services/apiClient';

const IndexPage = (props) => {
  
  return (
    <Layout title={props.page && props.page.meta_title ? props.page.meta_title : 'PUJAPATH' } keywords={props.page && props.page.meta_keywords} description={props.page && props.page.meta_description} og={props.page && props.page.meta_image}>
      <PujaBooking />
    </Layout>
  )
}

export async function getServerSideProps() {
  let page = { meta_title: 'PUJAPATH', meta_keywords: 'PUJAPATH', meta_description: 'PUJAPATH', meta_image: 'https://cdn.pujapathbooking.com/puja/0sqyxaai_pujapath_thumbnail.jpg' };
  
  const response = await api.get("seo/puja");
  const result: any = response.data;

  if(result.success)
    page = result.data['seo'];

  return { props: { page } }
}

export default IndexPage
