import { Popover, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { useQuery } from 'react-query';
import { API_ROUTE } from '../../App';
import Card from './Card';
import Loading from './Loading';

// duration can be tweaked at convenience
const timeoutDuration = 120;
export const PopoverMenu = ({ labelText, queryURL }) => {
  const triggerRef = useRef();
  const timeOutRef = useRef();

  const handleEnter = (isOpen: boolean) => {
    clearTimeout(timeOutRef.current);
    !isOpen && triggerRef.current?.click();
  };

  const handleLeave = (isOpen: boolean) => {
    timeOutRef.current = setTimeout(() => {
      isOpen && triggerRef.current?.click();
    }, timeoutDuration);
  };

  const { data, isLoading } = useQuery({
    queryKey: [queryURL],
    queryFn: async () => (await fetch(API_ROUTE + queryURL)).json(),
  });

  return (
    <Popover className='relative'>
      {({ open }) => (
        <div
          onMouseEnter={() => handleEnter(open)}
          onMouseLeave={() => handleLeave(open)}
        >
          <Popover.Button ref={triggerRef}>{labelText}</Popover.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute left-1/2 z-50 mt-3 -translate-y-1/2 translate-x-14 transform px-4 min-w-40'>
              {isLoading ? (
                <Loading width={12} height={12} />
              ) : (
                <Card>
                  <div className=' before:bg-red-700 before:w-0.5 before:absolute before:h-full before:rounded-sm before:left-0 pl-5 relative flex items-center w-80 mb-6'>
                    <span>{data.name}</span>
                  </div>
                  <div className='flex flex-col w-full justify-start'>
                    <span>{data.desc}</span>
                  </div>
                </Card>
              )}
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
};
