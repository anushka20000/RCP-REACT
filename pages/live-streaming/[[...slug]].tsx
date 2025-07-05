
import Layout from '../../components/Layout'
import React, { useContext } from "react";
import { PujaLive } from '../../components/pages/LivePuja/PujaLive';
import LangContext from "../../providers/language";
import { LiveStream } from '../../components/pages/LiveStream/LiveStream';
import { useRouter } from 'next/router';
import api from '../../services/apiClient';

const IndexPage = (props) => {
  const langCtx = useContext(LangContext);
  const router = useRouter()
  const { slug } = router.query;
  // console.log(slug)
  return (
    <Layout title={props.page && props.page.meta_title ? props.page.meta_title : 'PUJAPATH'} description={props.page && props.page.meta_description} og={props.page && props.page.meta_image}>
      {/* <PujaLive/> */}
      <LiveStream unique_meeting_id={slug} />
    </Layout>
  )
}
export async function getServerSideProps() {
  let page = { meta_title: 'PUJAPATH', meta_description: 'PUJAPATH', meta_image: 'https://cdn.pujapathbooking.com/puja/0sqyxaai_pujapath_thumbnail.jpg' };

  const response = await api.get("seo/live-streaming");
  const result: any = response.data;

  if (result.success)
    page = result.data['seo'];

  return { props: { page } }
}

export default IndexPage
