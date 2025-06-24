import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  description: string
  loading?: boolean
  onClick?: () => void
  open: boolean
  handleOpen: () => void
}

const AlertDialogBox = ({
  children,
  className,
  description,
  loading,
  onClick,
  handleOpen,
  open,
}: Props) => {
  return (
    <AlertDialog onOpenChange={handleOpen} open={open}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent
        className={cn(
          'border-none shadow-xl rounded-xl backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 transition-all duration-300'
        )}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold tracking-wide">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel
            className="hover:scale-[1.02] transition-all rounded-md bg-muted px-4"
          >
            Cancel
          </AlertDialogCancel>
          <Button
            variant={'destructive'}
            className={cn(
              'flex gap-2 items-center hover:scale-[1.02] active:scale-[0.98] transition-all rounded-md',
              className
            )}
            onClick={onClick}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Loading...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertDialogBox
