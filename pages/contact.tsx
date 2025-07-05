import Link from 'next/link'
import Layout from '../components/Layout'
import React,{useContext,useEffect,useState} from "react";
import LangContext from '../providers/language';
import { useQuery } from 'react-query';
import Contact from '../components/pages/Contact/Contact';
import api from '../services/apiClient';

const ContactPage = (props) => {

return(
  <Layout title={props.page && props.page.meta_title ? props.page.meta_title : 'PUJAPATH'} description={props.page && props.page.meta_description} og={props.page && props.page.meta_image}>
    <Contact/>
  </Layout>

)
}
export async function getServerSideProps() {
  let page = { meta_title: 'PUJAPATH', meta_description: 'PUJAPATH', meta_image: 'https://cdn.pujapathbooking.com/puja/0sqyxaai_pujapath_thumbnail.jpg' };
  
  const response = await api.get("seo/contact");
  const result: any = response.data;

  if(result.success)
    page = result.data['seo'];

  return { props: { page } }
}
export default ContactPage
