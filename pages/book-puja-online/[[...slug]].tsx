
import Layout from '../../components/Layout'
import React, {useContext, useEffect, useState} from "react";
import {PujaDetails} from "../../components/pages/PujaDetails/PujaDetails";
import {PujaDetailsPackages} from "../../components/pages/PujaDetails/PujaDetailsPackages";
import {useRouter} from "next/router";
import LangContext from "../../providers/language";
import {useQuery} from "react-query";
import fetchPujaDetails from "../../services/PujaDetailsServices";
import fetchPackage from "../../services/PackageService";
import api from '../../services/apiClient';



const IndexPage = (props) => {  
  const langCtx = useContext(LangContext);
  const [pujaDetails, setPujaDetails] = useState([]);
  const [pujaPackages, setPujaPackages] = useState([]);
  const [locations, setLocatoins] = useState([]);
  const [languages, setLanguages] = useState([]);
  const router = useRouter()
  const { slug } = router.query;

  let widgetType = 0;

  if(slug && slug!== undefined){
    let  parts = slug.toString().split(",");
    parts = parts.filter(n => n);
    switch(parts.length) {
      case 0:{
        // no slug, return back to the pujas page
        break;
      }
      case 1:{
        // one slug part means puja details
        widgetType = 1;
        break;
      }
      case 2:{
       // alert(parts[1]);
        // two slug part means puja packages if second slug is packages
        if(parts[1]==="packages"){
          widgetType = 2;
     
        }
      }
    }
  }

  const { isLoading, refetch: fetchPujaDetailsPageByLang } = useQuery(
      "puja-details-api-data",
      async () => {
        return await fetchPujaDetails(slug, langCtx.lang);
      },
      {
        enabled: false,
        onSuccess: (res) => {
          if(res['datas']!==undefined && res['datas'].length>0){
            setPujaDetails(res['datas'][0]);
          }
        },
        onError: (err: any) => {
          setPujaDetails((err.response?.datas || err));
        },
      }
  );

  const { refetch: fetchPujaPackageByLang } = useQuery(
      "Package-api-data",
      async () => {
        return await fetchPackage(slug[0], langCtx.lang);
      },
      {
        enabled: false,
        onSuccess: (res) => {
          if(res['data'] !== undefined) {
            setPujaPackages(res['data'])
            setLocatoins(res['locations'])
            setLanguages(res['language'])
          }
        },
        onError: (err: any) => {
          setPujaPackages((err.response?.data || err));
          setLocatoins((err.response?.data || err))
        },
      }
  );

  const fetchWidgetDetails = ()=>{
    if(widgetType == 1){
      fetchPujaDetailsPageByLang();
    }

    if(widgetType == 2)
      fetchPujaPackageByLang();
  }

  useEffect(() => {
    fetchWidgetDetails();
  }, [widgetType,slug, langCtx.lang])

  return (
      <Layout title={props.page && props.page.meta_title ? props.page.meta_title : 'PUJAPATH'} keywords={props.page && props.page.meta_keywords} description={props.page && props.page.meta_description} og={props.page && props.page.meta_image}>
          {widgetType == 1 && <PujaDetails pujaDetails={pujaDetails} slug={slug}/>}
          {widgetType == 2 && <PujaDetailsPackages packageDetails={pujaPackages} locations={locations} language={languages}/> }
      </Layout>
  );
}

export async function getServerSideProps({ params }) {
  let page = { meta_title: 'PUJAPATH', meta_keywords: 'PUJAPATH', meta_description: 'PUJAPATH', meta_image: 'https://cdn.pujapathbooking.com/puja/0sqyxaai_pujapath_thumbnail.jpg' };

  const response = await api.get("puja-seo/" + params.slug);
  const result: any = response.data;

  if(result.success)
    page = result.data ? result.data['seo'] && result.data['seo']['Puja'] : '';
    return { props: { page } }
}

export default IndexPage
