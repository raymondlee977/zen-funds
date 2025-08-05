import AccountGroup from '@/components/AccountGroup'
import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useAuthContext } from '@/hooks/useAuthContext'
import { createAccountGroup, deleteAccountGroup, fetchAccountGroups, reset, selectAllAccountGroups, updateAccountGroup } from '@/slices/accountGroupsSlice.js'
import { icons, colors } from '@/utils/accountGroupIcons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AccountsPage = () => {
  const [createAccountGroupOpen, setCreateAccountGroupOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [accountGroupName, setAccountGroupName] = useState('');
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const accountGroups = useSelector(selectAllAccountGroups);
  const { isError, isLoading, message } = useSelector((state) => state.accountGroups)

  useEffect(() => {
    if (!user) return;
    dispatch(fetchAccountGroups())
  }, [dispatch]);

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(isLoading) {
      console.log('hi')
    }
  }, [isError, isLoading, message])

  const searchAccounts = (query) => {
    console.log(query)
  } ;

  const handleCreateAccountGroup = (e) => {
    e.preventDefault();
    setCreateAccountGroupOpen(false);
    
    const newAccountGroup = {
      name: accountGroupName,
      icon: selectedIcon.displayName,
      color: selectedColor,
    }
    dispatch(createAccountGroup(newAccountGroup));

    setSelectedIcon(icons[0]);
    setSelectedColor(colors[0]);
    setAccountGroupName('');
  };

  const handleEditAccountGroup = async (id, data) => {
    try {
      await dispatch(
        updateAccountGroup({ id, changes: data })
      ).unwrap();
    } catch (error) {
      console.error('failed to update accountGroup:', error);
    }
  }

  const handleDeleteAccountGroup = async (id) => {
    try {
      await dispatch(
        deleteAccountGroup(id)
      ).unwrap();
    } catch {
      console.error('failed to delete accountGroup:', error);
    }
  }
  
  return (
    <div className='flex flex-col w-full h-full items-center'>
      {/* Header */}
      <p className='mt-2 text-l font-bold text-primary'>Accounts</p>
      <Separator className="my-2"/>
      {/* Top level */}
      <div className='flex w-1/2 mt-10 space-x-2'>
        <SearchBar handleSearch={searchAccounts}/>
        <Popover className='w-fit' open={createAccountGroupOpen} onOpenChange={setCreateAccountGroupOpen}>
          <PopoverTrigger asChild>
            <Button className="cursor-pointer">+ Add Group</Button>
          </PopoverTrigger>
          <PopoverContent>
            <form name='createAccountGroupForm' onSubmit={handleCreateAccountGroup} className='flex flex-col'>
              <span className='w-full text-center font-bold'>Create a new Group</span>

              <label className='mt-4 mb-1 text-sm'>Group Name:</label>
              <Input 
                placeholder="Group Name"
                name="name"
                required
                pattern=".*\S.*"
                value={accountGroupName}
                onChange={(e) => setAccountGroupName(e.target.value)}
              />

              <label className='mt-2 mb-1 text-sm'>Choose an Icon:</label>
              <div className='grid grid-cols-6 gap-2 mt-1 overflow-y-scroll scrollbar-thin h-[140px]'>
                {icons.map((Icon, i) => (
                  <Button
                    name='icon'
                    key={i} 
                    variant='ghost'
                    onClick={(e) => { 
                      e.preventDefault();
                      setSelectedIcon(icons[i]);
                    }}
                    className={`h-7 w-7 transition-none ${Icon === selectedIcon ? "text-white hover:text-white" : ""}`}
                    style={{ backgroundColor: selectedIcon === Icon ? selectedColor : "transparent"}}
                  >
                    <Icon/>
                  </Button>
                ))}
              </div>

              <label className='mt-2 mb-1 text-sm'>Choose a Color:</label>
              <div className='grid grid-cols-6 gap-3 mt-1 w-full justify-items-center'>
                {colors.map((color) => (
                  <Button
                    name='color'
                    className={`w-6 h-6 border-2 ${selectedColor === color ? "border-gray-600" : "border-transparent"}`}
                    style={{ backgroundColor: color }}
                    key={color}
                    size='icon'
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedColor(color);
                    }}
                  />
                ))}
              </div>

              <Button
                type='submit'
                className='w-full mt-4'
              >
                Add Group
              </Button>
            </form>
          </PopoverContent>
        </Popover>
        
      </div>
      {/* AccountGroups container */}
      <div className='flex flex-col w-3/4 mt-10 gap-3'>
      {accountGroups && accountGroups.map((accountGroup) => (
        <AccountGroup 
          key={accountGroup._id}
          accountGroup={accountGroup} 
          handleEditAccountGroup={handleEditAccountGroup}
          handleDeleteAccountGroup={handleDeleteAccountGroup}
        />
      ))}
      </div>
      
    </div>
  )
}

export default AccountsPage