'use client'

import {
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowUpDown,
  ArrowUpNarrowWide,
  ArrowUpZA,
  Check,
} from 'lucide-react'
import { Button } from '../ui/button'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '../ui/menubar'
import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const todoItemSort = [
  {
    name: 'Terbaru',
    value: 'newest',
    icon: <ArrowDownWideNarrow className="text-primary" />,
  },
  {
    name: 'Terlama',
    value: 'oldest',
    icon: <ArrowUpNarrowWide className="text-primary" />,
  },
  {
    name: 'A-Z',
    value: 'a-z',
    icon: <ArrowDownAZ className="text-primary" />,
  },
  {
    name: 'Z-A',
    value: 'z-a',
    icon: <ArrowUpZA className="text-primary" />,
  },
  {
    name: 'Belum Selesai',
    value: 'incomplete',
    icon: <ArrowUpDown className="text-primary" />,
  },
]

export default function ButtonSortTodoItem() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selectedSort, setSelectedSort] = useState(
    searchParams.get('sortBy') ?? todoItemSort[0].value
  )

  return (
    <Menubar className="border-0 bg-transparent  p-0">
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Button
            variant="outline"
            className="aspect-square !rounded-full py-7"
          >
            <ArrowUpDown className="size-8 text-muted-foreground" />
          </Button>
        </MenubarTrigger>
        <MenubarContent>
          {todoItemSort.map(({ icon, name, value }) => (
            <MenubarItem
              key={value}
              className="flex flex-row items-center gap-4 px-5 py-3"
              onClick={() => {
                setSelectedSort(value)
                router.push(`${pathname}?sortBy=${value}`)
              }}
            >
              {icon}
              <div className="flex-1">{name}</div>
              {selectedSort === value && (
                <Check className="text-muted-foreground" />
              )}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
