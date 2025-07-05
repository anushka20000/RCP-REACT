
import Layout from '../components/Layout'
import React from "react";
import { PaymentFailed } from '../components/pages/PaymentFailed/PaymentFailed';

const errorPayment = () => (
  <Layout title="Home | Next.js + TypeScript Example">
      <PaymentFailed />
  </Layout>
)

export default errorPayment