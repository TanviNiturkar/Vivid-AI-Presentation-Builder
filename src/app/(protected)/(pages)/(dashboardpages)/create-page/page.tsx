import React, { Suspense } from 'react'
import CreatePageSkeleton from './_components/CreatePage/createpageskeleton'
import RenderPage from './_components/rednerpage'
import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'

type Props = {}

const page = async (props: Props) => {

  const checkUser = await onAuthenticateUser()
  if(!checkUser.user){
    redirect('/sign-in')
  }
  if(!checkUser.user.subscription){
    redirect('/dashboard')
  }
  return (
    <main className='w-full h-full pt-6'>
        <Suspense fallback={<CreatePageSkeleton/>}>
        <RenderPage />
        </Suspense>
    </main>
  )
}

export default page