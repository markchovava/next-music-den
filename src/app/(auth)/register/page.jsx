import RegisterEdit from './components/RegisterEdit'

export default function page() {
  return (
    <>
    <section className='text-white w-[100%] flex lg:flex-row flex-col items-start justify-start bg-gradient-to-tr from-slate-900 to-black'>
        <div className='lg:w-[55%] w-[100%] min-h-[100vh] h-[100%]  flex flex-col items-start justify-center pl-[4rem]'>
            <div className='text-2xl tracking-wide mb-[2rem]'>MusicDen</div>
            <h2 className='text-[4rem] font-bold leading-tight mb-[2rem]'>Music Search is life to the ear.</h2>
            <p className='text-lg'>Best place to arrange your music, artist and latest albums.</p>
        </div>
        <div className='lg:w-[45%] w-[100%] min-h-[100vh] flex items-center justify-start bg-slate-950'>
           <RegisterEdit />
        </div>
    </section>
    </>
  )
}
