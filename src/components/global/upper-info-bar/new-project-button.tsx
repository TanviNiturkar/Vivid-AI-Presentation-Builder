'use client'

import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const NewProjectButton = ({ user }: { user: User }) => {
  const router = useRouter()

  const handleClick = () => {
    const isSubscribed = user.subscription ?? false // ✅ Ensure boolean
    console.log("SUBSCRIPTION STATUS:", isSubscribed)

    if (!isSubscribed) {
      toast.warning('Please upgrade to create new projects!')
      return
    }

    router.push('/create-page')
  }

  return (
    <Button
      className="rounded-lg font-semibold"
      onClick={handleClick}
      disabled={user.subscription === false}
    >
      <Plus />
      New Project
    </Button>
  )
}

export default NewProjectButton
