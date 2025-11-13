'use client';

import {
  BookOpenCheck,
  Home,
  Settings,
  Users,
  Upload,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/students', icon: Users, label: 'Students' },
  { href: '/upload', icon: Upload, label: 'Upload Data' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold font-headline text-lg">
          <BookOpenCheck className="h-6 w-6 text-primary" />
          <span>EduInsights Pro</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start px-4 py-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10',
                (pathname.startsWith(item.href) && item.href !== '/') || pathname === item.href
                  ? 'bg-primary/10 text-primary'
                  : ''
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="border-t pt-4">
            <Link
                href="/settings"
                className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10',
                    pathname.startsWith('/settings') ? 'bg-primary/10 text-primary' : ''
                )}
            >
                <Settings className="h-4 w-4" />
                Settings
            </Link>
        </div>
      </div>
    </aside>
  );
}
