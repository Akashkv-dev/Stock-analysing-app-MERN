import { useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


const Intervel = () => {
  const [selectedInterval, setSelectedInterval] = useState<string>('1m')

  const handleSelect = (interval:string) => {
    setSelectedInterval(interval)
  }
  const intervels=['1m', '5m', '15m', '1h', '1d']

  return (
    <Menu as="div" className="relative inline-block text-left mx-2">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1 rounded-md text-sm font-semibold text-white-900 shadow-sm  ring-inset ring-gray-300 hover:bg-slate-500">
          {selectedInterval}
          <ChevronDownIcon aria-hidden="true" className=" h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-gray-900 shadow-lg ring-0 ring-black ring-opacity-5 transition focus:outline-none"
      >
        <div className="py-1">
          {intervels.map((interval) => (
            <MenuItem key={interval} as="div">
              {({ focus }) => (
                <a
                  href="#"
                  onClick={() => handleSelect(interval)}
                  className={`block px-2 py-2 text-sm text-gray-400 ${focus ? 'bg-gray-100 text-gray-900' : ''}`}
                >
                  {interval}
                </a>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}

export default Intervel
