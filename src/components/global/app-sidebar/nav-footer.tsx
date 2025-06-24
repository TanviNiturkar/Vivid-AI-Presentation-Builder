"use client";

import { buySubscription } from '@/actions/lemonSqueezy';
import { Button } from '@/components/ui/button';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const NavFooter = ({
  prismaUser,
  hasUpgraded = false,
}: {
  prismaUser: User;
  hasUpgraded?: boolean;
}) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isLoaded || !isSignedIn) return null;

  const handleUpgrading = async () => {
    setLoading(true);
    try {
      const res = await buySubscription(prismaUser.id);
      if (res.status !== 200) throw new Error('Failed to upgrade subscription');
      router.push(res.url);
    } catch (error) {
      console.error(error);
      toast.error('Error', {
        description: 'Something went wrong. Please try later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden">
          {!prismaUser.subscription && !hasUpgraded && (
            <div className="relative flex w-full flex-col gap-4 rounded-xl border border-vivid/20 bg-muted/40 p-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-vivid">
              <div className="flex flex-col items-start gap-1">
                <p className="text-base font-bold">
                  Get <span className="text-vivid">Creative AI</span>
                </p>
                <span className="text-sm text-muted-white">
                  Unlock all features including AI and more
                </span>
              </div>

              <div className="w-full bg-vivid-gradient p-[1px] rounded-full">
                <Button
                  className="w-full border-vivid bg-background-80 hover:bg-background-90 text-primary rounded-full font-bold transition-transform duration-200 hover:scale-[1.02]"
                  variant="default"
                  size="lg"
                  onClick={handleUpgrading}
                >
                  {loading ? 'Upgrading...' : 'Upgrade'}
                </Button>
              </div>
            </div>
          )}

          <SignedIn>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground transition-all hover:bg-muted/60 rounded-xl"
            >
              <UserButton />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{user?.fullName}</span>
                <span className="truncate text-muted-white">
                  {user?.emailAddresses[0]?.emailAddress}
                </span>
              </div>
            </SidebarMenuButton>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
