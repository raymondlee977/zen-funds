import React, { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import AlertDialogg from './AlertDialog';
import { Plus, Trash2 } from 'lucide-react';
import Account from './Account';
import { icons, colors } from '@/utils/accountGroupIcons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const AccountGroup = ({ accountGroup, handleEditAccountGroup, handleDeleteAccountGroup }) => {
  const [editMode, setEditMode] = useState(false);
  const [editAccountGroupOpen, setEditAccountGroupOpen] = useState(false);
  const [editAccountGroupName, setEditAccountGroupName] = useState(accountGroup.name);
  const [selectedColor, setSelectedColor] = useState(accountGroup.color);
  const [selectedIcon, setSelectedIcon] = useState(icons.find(icon => icon.displayName === accountGroup.icon));
  const [accounts, setAccounts] = useState([]);

  const getAccountGroupIcon = (accountGroup) => {
    const AccountGroupIcon = icons.find((icon) => icon.displayName === accountGroup.icon);
    return AccountGroupIcon ? <AccountGroupIcon /> : null; // Fallback in case no icon is found
  };

  
  const commitEdit = () => {
    setEditMode(false);
    if (editAccountGroupName === accountGroup.name) return;
    handleEditAccountGroup(accountGroup._id, {name: editAccountGroupName});
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setEditAccountGroupOpen(false);
    handleEditAccountGroup(accountGroup._id, {icon: selectedIcon.displayName, color: selectedColor})
  }
  return (
    <div 
      key={accountGroup._id} 
      className='w-full rounded-xl' 
      style={{ border: `4px solid ${accountGroup.color}`, }}
    >
      {/* AccountGroup Header */}
      <div 
        className='flex text-white font-bold py-1 px-3 items-center justify-between'
        style={{ background: accountGroup.color }}
      >
        {/* AccountGroup Title */}
        <div className='flex gap-2 items-center'>
          <Popover className='w-fit' open={editAccountGroupOpen} onOpenChange={setEditAccountGroupOpen}>
          <PopoverTrigger asChild className='cursor-pointer'>
            {getAccountGroupIcon(accountGroup)}
          </PopoverTrigger>
          <PopoverContent onOpenAutoFocus={(event) => event.preventDefault()}>
            <form name='changeIconForm' onSubmit={handleSubmit} className='flex flex-col'>
              <span className='w-full text-center font-bold'>Edit Board</span>

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
                    className={`h-7 w-7 transition-none cursor-pointer ${Icon === selectedIcon ? "text-white hover:text-white" : ""}`}
                    style={{ backgroundColor: Icon === selectedIcon ? selectedColor : "transparent"}}
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
                    className={`w-6 h-6 border-2 cursor-pointer ${selectedColor === color ? "border-gray-600" : "border-transparent"}`}
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
                className='w-full mt-4 cursor-pointer'
              >
                Update
              </Button>
            </form>
          </PopoverContent>
        </Popover>
          <div className='w-fit' onMouseDown={() => setEditMode(accountGroup._id)}>
          <Input
            className={`p-1.5 ${editMode === accountGroup._id ? 'w-min-0 focus-visible:ring-black focus-visible:border-black' : 'border-transparent shadow-none cursor-pointer'}`}
            value={editAccountGroupName}
            onChange={(e) => setEditAccountGroupName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return;
              commitEdit();
              e.target.blur();
            }}
            onBlur={() => {
              commitEdit();
            }}
          />
        </div>
        </div>
        {/* Buttons */}
        <div className='flex gap-1'>
          <Button
            variant='ghost'
            size='icon'
            className='cursor-pointer hover:text-white hover:brightness-95'
            style={{ backgroundColor: accountGroup.color }}

          >
            <Plus style={{ width: 20, height: 20 }}/>
          </Button>
          <AlertDialogg
          key={accountGroup._id}
            title={'Delete Group'}
desc={<>All accounts under "{accountGroup.name}" will be deleted as well.<br />
        Are you sure you want to delete "{accountGroup.name}"?</>}            
            handleAction={() => handleDeleteAccountGroup(accountGroup._id)}
          >
            <Button
              variant='ghost'
              size='icon'
              className='cursor-pointer text-red-400 hover:text-red-400 hover:brightness-95'
              style={{ backgroundColor: accountGroup.color }}
            >
              <Trash2 style={{ width: 20, height: 20 }}/>
            </Button>
          </AlertDialogg>
          
        </div>
      </div>
      {/* Accounts Container */}
      <div className='flex flex-col p-3'>
        {accounts && accounts.length > 0 ? (
          accounts.map((account) => (
            <Account />
          ))
          ) :
        <p>Click the + icon to create accounts</p>
        }
      </div>
    </div>
  )
}

export default AccountGroup