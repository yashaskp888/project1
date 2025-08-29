import React from 'react'
import Payments from '@/components/Payments'

const Username = ({ params }) => {
  return (
    <>
    <Payments username={params.username} />
    </>)
}

export default Username
export async function generateMetadata ({params}) {
 return{ title: `${params.username} - Give Me A Chai`}
 
};
