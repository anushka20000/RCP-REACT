import Layout from "../../components/Layout";
import React, { useContext, useEffect, useState } from "react";
import { ReligiousTourDetails } from "../../components/pages/ReligiousTourList/ReligiousTourDetails";
import { useRouter } from "next/router";
import LangContext from "../../providers/language";
import { useQuery } from "react-query";
import fetchTourDetails from "../../services/TourServiceDetailService";
import api from "../../services/apiClient";

const IndexPage = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  const langCtx = useContext(LangContext);
  const [itemDetail, setItemDetail] = useState({})
  const [tourDetail, setTourDetail] = useState([])

  let widgetType = 0;
  if (slug && slug !== undefined) {
    let parts = slug.toString().split(",");
    parts = parts.filter((n) => n);
    switch (parts.length) {
      case 0: {
        // no slug, return back to the pujas page
        break;
      }
      case 1: {
        // one slug part means puja details
        widgetType = 1;
        break;
      }
    }
  }

  const fetchWidgetDetails = () => {
    if (widgetType == 1) fetchTourDetailsPageByLang();
  };

  const { isLoading, refetch: fetchTourDetailsPageByLang } = useQuery(
    "tour-details-api-data",
    async () => {
      return await fetchTourDetails(slug, langCtx.lang);
    },
    {
      enabled: false,
      onSuccess: (res) => {
        console.log(res)
        if (res["datas"] !== undefined && res["datas"].length > 0) {
          setItemDetail({
            id: res["datas"][0].id,
            title: res["datas"][0]["Tour"].TourTranslates[0].title,
            image: res["datas"][0]["Tour"].image,
            address: res["datas"][0]["Tour"].address,
            description: res["datas"][0]["Tour"].TourTranslates[0].description
          });
          setTourDetail(res["datas"][0]["Tour"].TourDetails);
        }
      },
      onError: (err: any) => {
        setItemDetail(err.response?.datas || err);
      }
    }
  );

  useEffect(() => {
    fetchWidgetDetails();

    let detailItemId = [];
    tourDetail.map((data) => {
      if (data["is_required"] == 1) {
        data["TourDetailItems"].map((res) => {
          detailItemId.push({
            id: data.id,
            item_id: res.id,
          });
        });
      }
    });
  }, [slug, langCtx.lang, widgetType]);
  return (
    <Layout title={props.page && props.page.meta_title ? props.page.meta_title : 'PUJAPATH'} keywords={props.page && props.page.meta_keywords} description={props.page && props.page.meta_description} og={props.page && props.page.meta_image}>
      {<ReligiousTourDetails itemDetail = {itemDetail} tourDetails = {tourDetail}/>}
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  let page = { meta_title: 'PUJAPATH', meta_keywords: 'PUJAPATH', meta_description: 'PUJAPATH', meta_image: 'https://cdn.pujapathbooking.com/puja/0sqyxaai_pujapath_thumbnail.jpg' };
  
  const response = await api.get("religious-tour-seo/" + params.slug);
  const result: any = response.data;

  if(result.success)
    page = result.data['seo'] && result.data['seo']['Tour'];

   return { props: { page } }
}

export default IndexPage;