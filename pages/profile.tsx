
import Layout from '../components/Layout'
import React, {useContext, useEffect} from "react";
import Profile from '../components/pages/Profile/Profile'
import AuthContext from '../providers/auth';
import Router from "next/router";

const AboutPage = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if(!authCtx.isLoggedIn){
      Router.push('/');
    }
  }, [authCtx.isLoggedIn])

  return (
    <Layout title="Profile | PUJAPATH" description="Profile | PUJAPATH" og="https://cdn.pujapathbooking.com/cms/astrology-three.jpg">
        <Profile/>
    </Layout>
  )  
}

export default AboutPage
