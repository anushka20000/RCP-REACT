
import Layout from '../../components/Layout'
import React, { useContext, useEffect, useState } from "react";
import PujaSamagiri from '../../components/pages/PujaSamagiri/PujaSamagiri'
import LangContext from "../../providers/language";
import { PujaSamagriPackages } from "../../components/pages/PujaSamagiri/PujaSamagriPackages";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import fetchPujaSamagri from "../../services/PujaSamagriService";
import fetchPujaKitDetails from "../../services/PujaKitServices";
import api from '../../services/apiClient';

const IndexPage = (props) => {
  const router = useRouter()
  const { slug } = router.query;
  const langCtx = useContext(LangContext);
  const [listing, setListing] = useState([])
  const [order, setOrder] = useState(0)
  const [search, setSearch] = useState("")
  const [value, setValue] = useState([]);


  let widgetType = 0;
  
  if (slug && slug !== undefined) {
    let parts = slug.toString().split(",");
    parts = parts.filter(n => n);

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

  const { isLoading, refetch: fetchSamagriByLang } = useQuery(
    "samagri-api-data",
    async () => {
      return await fetchPujaSamagri(langCtx.lang, order, search);
    },
    {
      enabled: true,
      onSuccess: (res) => {
        setListing(res['datas'])
      },
      onError: (err: any) => {
        setListing((err.response?.datas || err));
      },
    }
  );

  const { refetch: fetchSamagriPackageByLang } = useQuery(
    "samagri-package-api-data",
    async () => {
      return await fetchPujaKitDetails(slug, langCtx.lang);
    },
    {
      enabled: false,
      onSuccess: (res) => {
        console.log(res["datas"])
        if (res['datas'] !== undefined && res['datas'].length > 0) {
          setValue(res["datas"]);
        }
      },
      onError: (err: any) => {
        setValue((err.response?.datas || err));
      },
    }
  );

  const fetchWidgetDetails = () => {
    if (widgetType == 0)
      fetchSamagriByLang();

    if (widgetType == 1)
      fetchSamagriPackageByLang();
  }

  useEffect(() => {
    fetchWidgetDetails();
  }, [widgetType, slug, langCtx.lang, order, search])

  function handleFilter(i){
    setOrder(i.value)
  }

  function handleSearch(event) {
    setSearch(event.target.value)
  }

//   function click(event){
//     setSearch(searchContent);
//     event.preventDefault();
//     //event.target.reset()
//  }

  return (
    <Layout title={props.page && props.page.meta_title ? props.page.meta_title : 'PUJAPATH'} keywords={props.page && props.page.meta_keywords} description={props.page && props.page.meta_description} og={props.page && props.page.meta_image}>
      {widgetType == 0 ? 
       <PujaSamagiri listing={listing} onFilterData={handleFilter} search={handleSearch} />
      :
       <PujaSamagriPackages value={value}  />
      }
    </Layout>
  )
}
export async function getServerSideProps({ params }) {
  let page = { meta_title: 'PUJAPATH', meta_keywords: 'PUJAPATH', meta_description: 'PUJAPATH', meta_image: 'https://cdn.pujapathbooking.com/puja/0sqyxaai_pujapath_thumbnail.jpg' };
  
  if(params.slug != undefined && params.slug != '') {
    const response = await api.get("samagri-seo/" + params.slug);
    const result: any = response.data;
  
    if(result.success)
      page = result.data['seo']['PujaKit'];
  }
  else {
    const response = await api.get("seo/samagri");
    const result: any = response.data;
  
    if(result.success)
      page = result.data['seo'];
  }
  

  return { props: { page } }
}


export default IndexPage
