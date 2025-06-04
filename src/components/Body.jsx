import Cards from './Cards'


export default function Body({user}) {
 
  return (
    <div className='bg-[#20293a] w-screen h-full relative md:h-full lg-h-full px-[10%]  '>
      <img className=' bg-black border-7 rounded-2xl border-[#20293a] w-[100px] h-[100px] md:w-[120px] md:h-[120px] absolute top-[-30px]' src={user.avatar_url} alt="" />
      
      <div className='pt-22 flex flex-col gap-5  md:flex-row  md:items-start md:pt-3 md:justify-start md:pl-32  lg:justify-start lg:pl-40'>
        <div className='flex gap-3 bg-[#111629] w-46 h-12 rounded-xl text-[15px] items-center justify-center text-white/70'>
        <p>Followers</p>
        <p> | </p>
        <span>{user.followers}</span>
      </div>
      <div className='flex gap-3 bg-[#111629] w-37 h-12 rounded-xl text-[15px] items-center justify-center text-white/70'>
        <p>Following</p>
        <p> | </p>
        <span>{user.following}</span>
      </div>
      <div className='flex gap-3 bg-[#111629] w-68 h-12 rounded-xl text-[15px] items-center justify-center text-white/70'>
        <p>Location</p>
        <p> | </p>
        <span>{user.location}</span>
      </div>
      </div>
      <br />
      <h1 className='md:pt-10 text-white/80 font-semibold text-3xl'>{user.login}</h1>
      <p className='text-white/80 text-[15px] pt-1.5'>{user.bio}</p>
      <br />

      <Cards  user={user}/>

    </div>
  )
}
