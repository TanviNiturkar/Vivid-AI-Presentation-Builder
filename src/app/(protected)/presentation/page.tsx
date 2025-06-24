import { redirect } from 'next/navigation'


type Props = {}

const page = (props: Props) => {
  redirect('/dashboard')
}

export default page