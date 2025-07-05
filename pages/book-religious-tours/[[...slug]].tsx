
import Layout from '../../components/Layout'
import React, {useContext, useEffect, useState} from "react";
import ReligiousTourList from '../../components/pages/ReligiousTourList/ReligiousTourList';
import {useRouter} from "next/router";
import LangContext from "../../providers/language";
import {useQuery} from "react-query";
import fetchTour from "../../services/TourService";

const IndexPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const langCtx = useContext(LangContext)
  const [search, setSearch] = useState("")
  const [tours, setTours] = useState([])
  const [locationIndex, setLocationIndex] = useState(0)
  const [locationTitle, setLocationTitle] = useState('')
  const [locations, setLocations] = useState([])
  const [title,setTitle] = useState("Religiou tour")
  const [description,setDescription] = useState("Religiou tour")
  
  let widgetType = 0;
  
  if(slug && slug!== undefined) {
    let parts = slug.toString().split(",");
    parts = parts.filter(n => n);

    switch(parts.length) {
      case 1:{
        widgetType = 1;
        break;
      }
    }
  }

  const { isLoading, refetch: fetchTourPageByLang } = useQuery(
      "tour-api-data-by-location",
      async () => {
        return await fetchTour(langCtx.lang, search, slug);
      },
      {
        enabled: false,
        onSuccess: (res) => {
          if(res['datas']!== undefined) {
            setLocationTitle(res['location']['LocationTranslates'][0].title)
            setTours(res['datas'])
            setLocations(res['locations'])
            setTitle('Religious tour | ' + (res['datas'].length>0 ? res['datas'][0]['Tour']['Location']['LocationTranslates'][0].title : 'Not Found'));
            setDescription('Religious tour | ' + (res['datas'].length>0 ? res['datas'][0]['Tour']['Location']['LocationTranslates'][0].title : 'Not Found'))

            res['locations'].map((element, index) => {
              if(element.id == slug) {
                setLocationIndex(index)
              }
            });
          }
        },
        
        onError: (err: any) => {
          setTours([])
          setLocations((err.response?.datas || err))
          setLocationTitle(err.response?.datas || err)
        },
      }
  );

  const fetchWidgetDetails = ()=>{
    if(widgetType == 1) 
      fetchTourPageByLang()
  }

  useEffect(() => {
    fetchWidgetDetails();
  }, [slug, langCtx.lang, search == ""])

  const OnChange = (event) => {
    setSearch(event.target.value)
  }
  

  return (
      <Layout title={title} description={description}>
          {<ReligiousTourList tours={tours} locations={locations} locationIndex={locationIndex} locationTitle={locationTitle} onChange={OnChange}/>}
      </Layout>
  );
}

export default IndexPage