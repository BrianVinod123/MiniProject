import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Register', href: '/Register', current: true },
  { name: 'Login', href: '/Login', current: false },
  { name: 'About', href: '#', current: false },
  { name: 'Contact', href: '/Contact', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAACUCAMAAAAJSiMLAAAAMFBMVEXk5ueutLfo6uupsLO6v8Kzuby3vL/g4+Td4OHM0NLCxsnQ09W9wsTJzc/Y29zb3d9DmY3CAAAEC0lEQVR4nO2caQ+bMAxAiUMOcsD//7cLtOvoRXOYOEx5k6ZJ+/JkGTuH02HodDqdTqfT6XQ6nc4xQC2QCAAMWi/hj9r+fQUAtPVulFIIIcfR+Vm1bw7KS/aKmIamzZUdOX+zZoxzaVWj4qAm8cn5bt6qeIj0V+lNfLTNeYMaD51vyNZS3B5H+hFxSy26R5k46+DtqV3/oVyk9Ortmvky3yv1kffYRtdXIsU6MCpq5YBOivUt3vTeKXn98DbU1hBdQ568PW16w5xjHbxnUm+VZx0WhZpSOyOx7xCmN9hsa8ZmMm2VXPt2jGTaU25mr3CqZawqkA4IGm0oCjZZuKEs2CG7KbRzO80Oip4DMbuwQ7gh0Nap69V3ZP1WCVOxNUWW5C39niHYWOri1GYEnRJmBGvGam9zIPJg5Bi+VNYePIp29dMehC+SonJjfJH1+3vRUntHbe3yHrnCa2ujWHftSG2MQtK1/3Pti1YSHO3adfuiXfKqaxKcFeBU2fqi6+2L7m4uupdE+SYJdu4XPSe56KkUyhlgfWuMEkhywF18vi0JpIN2YaOkurwp3JjVXrQ+KAo3n6i0i2qgIJIubDmUw175Z1OUIyUFt2XVj4ifvDN7DtnN9V/vvOkdiqu9J3KOXjnddMODJbkKckk/mRaqd2qaCE2dIiswJFq3Mi2aMsEYMqQR6+DtohPFtGMd6knkSEz185wfgD54l/CQZi2F+o7/Ic4F8YjoZ0Cbo5cgwjdR996BYfHsozjnYiKdDv0BDLPjry+GODd0I5axAOjJrA/KBFv/km5aWnu28gUAUHpe0eoqL/hW6ReojX6wKc6z9ca4ccMZ462ddbv2arZG8o3XL3JFrA8nqR13bHk83YwPu836/87bIE8e91A2Zu8EOzZ+kmejsQtpysBgg/LnDnOkzoQMLZNoDhrmMdl45y4JHsWB+tbHE8S5q/tgFZR1pdL3kE/Vjnlg8BJFehMXZqkRcUC5Invi/H1aqB1ogf4HN6euaoO0xJdevZk/L+KwmBNCfRcfzzrvLnqKFYE7o+mDOic/dvAT9kAnh/rmbXB3yTCYCtZr+8EcHoCCO5pU8K4ZkCZ14kB7Jnx2BXn1xrlDw2/mv7wxKmHlWCN5E1hv3he0LvauWkOevEsuLkETWZfVQajXZd7J7peQ/5sBCOTeXlYv2M9wl3f2hjCfWOadNZVEmyIbOeEufw9ejEsPd/FwIgLpwzKls4k4JM9lYj1QKSQx3G0EO/mnnNJ/LOocEh8Lo7zzQCBxKVhnox5Dyukg0vs8BFJWgqW/84JKgnYjH+QKj88SaCjYLHpBhfDzNIhEL0zAU6vuiR5PL39Rg4mIvUtr6Ytk8ZtK6m3NC7HLKarDkS98ajh/AD4FNnEeKU9qAAAAAElFTkSuQmCC"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
