import community from '../../assets/icons/community.svg'

interface GroupsProps {
    handleGroup: (groupOn: boolean) => void;
  }

const Groups = (props: GroupsProps) => {
    const {handleGroup} = props
    const handleGroups = ()=>{
        handleGroup(true)
        console.log('group open');
        
    }
    
  return (
    <div>
        <img className='hover:bg-slate-500 h-10 cursor-pointer' src={community} alt=""
        onClick={handleGroups} />
    </div>
  )
}

export default Groups