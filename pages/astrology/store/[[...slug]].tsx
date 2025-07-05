import Layout from '../../../components/Layout'
import React, { useContext, useEffect, useState } from "react";
import Ecommerece from '../../../components/pages/Ecommerece/Ecommerece'
import LangContext from "../../../providers/language";
import AstrologyService from '../../../services/AstrologyService';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import api from '../../../services/apiClient';

const IndexPage = (props) => {
  const router = useRouter()
  const { slug } = router.query;
  const langCtx = useContext(LangContext);
  const [product, setProduct] = useState([])
  const [similarProduct, setSimilarProduct] = useState([])

  const { isLoading, refetch: fetchAstrologyProduct } = useQuery(
    "astrology-product-slug-api-data",
    async () => {
      return await AstrologyService.fetchAstrologyProductBySlug(slug, langCtx.lang);
    },
    {
      enabled: false,
      onSuccess: (res) => {
        if(res['data'] != undefined){ 
          setProduct(res['data']['data']);
          // console.log(res['data']['data'])
          setSimilarProduct(res['data']['product']);
        }
      },
      onError: (err: any) => {
        setProduct([]);
        setSimilarProduct([]);
      }
    }
  )
  useEffect(() => {
    if (!router.isReady) return;
    fetchAstrologyProduct()

  }, [router.isReady, langCtx.lang])
  return (
    <Layout title={props.page && props.page.meta_title ? props.page.meta_title : 'PUJAPATH'} keywords={props.page && props.page.meta_keywords} description={props.page && props.page.meta_description} og={props.page && props.page.meta_image}>
      <Ecommerece refetchData={fetchAstrologyProduct} product={product} similarProduct={similarProduct} />
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  let page = { meta_title: 'PUJAPATH', meta_keywords: 'PUJAPATH', meta_description: 'PUJAPATH', meta_image: 'https://cdn.pujapathbooking.com/puja/0sqyxaai_pujapath_thumbnail.jpg' };

  const response = await api.get("astrology-product-seo/" + params.slug);
  const result: any = response.data;

  if (result.success)
    page = result.data['seo'] && result.data['seo']['AstrologyProduct'];

  return { props: { page } }
}

export default IndexPage
