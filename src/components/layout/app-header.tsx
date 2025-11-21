'use client';

import { Bell, Menu } from 'lucide-react';
import { UserMenu } from './user-menu';

import { Button } from '@/components/ui/button';

type AppHeaderProps = {
  onMenuClick: () => void;
  pageTitle: string;
};

export function AppHeader({ onMenuClick, pageTitle }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>

      <h1 className="hidden text-xl font-semibold md:block font-headline">{pageTitle}</h1>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial" />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <UserMenu />
      </div>
    </header>
  );
}
