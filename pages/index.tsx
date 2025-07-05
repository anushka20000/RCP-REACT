import Layout from '../components/Layout'
import Home from '../components/pages/Home/Home'
import React from "react";
import api from '../services/apiClient';

const IndexPage = ({ page }) => {
  return (
    <Layout title={page.meta_title ? page.meta_title : 'PUJAPATH'} keywords= {page.meta_keywords} description={page.meta_description} og={page.meta_image}>
      <Home />
    </Layout>
  )
}

export async function getServerSideProps() {
  let page = { meta_title: 'PUJAPATH', meta_keywords: 'PUJAPATH', meta_description: 'PUJAPATH', meta_image: 'https://cdn.pujapathbooking.com/puja/0sqyxaai_pujapath_thumbnail.jpg' };
  
  const response = await api.get("seo/home");
  const result: any = response.data;

  if(result.success)
    page = result.data['seo'];

  return { props: { page } }
}

export default IndexPage

