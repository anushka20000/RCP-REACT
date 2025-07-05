import React, {useContext, useEffect, useState} from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Link from 'next/link'
import Layout from '../components/Layout'
import LangContext from "../providers/language";
import {Cart} from "../components/pages/Cart/Cart";
import userAddress from "../services/UserAddressService";
import api from "../services/apiClient";

const CartPage = (props) => {
  const langCtx = useContext(LangContext);

  return (
    <Layout title={props.page && props.page.meta_title ? props.page.meta_title : 'PUJAPATH'} description={props.page && props.page.meta_description} og={props.page && props.page.meta_image}>
      <Cart/>
    </Layout>
  )
}
export async function getServerSideProps() {
  let page = { meta_title: 'PUJAPATH', meta_description: 'PUJAPATH', meta_image: 'https://cdn.pujapathbooking.com/puja/0sqyxaai_pujapath_thumbnail.jpg' };
  
  const response = await api.get("seo/cart");
  const result: any = response.data;

  if(result.success)
    page = result.data['seo'];

  return { props: { page } }
}

export default CartPage
