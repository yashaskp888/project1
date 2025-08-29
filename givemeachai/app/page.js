import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (<>
  
    <div className="flex flex-col items-center justify-center  container h-[40vh] md:px-0 md:text-base">
      <div className="text-white text-2xl my-2 font-semibold underline decoration-purple-500 flex "><span className="py-8">Buy Me A Chai</span><span><img src="/chai.gif" className= "w-25 pt-0" /></span></div>
      <div className="text-white my-4">It is a Crowd Funding Website , Which is used to Donate Some Money for The Needy</div>
      <div className="gap-4">
       <Link href={"/Login"}> <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Now</button></Link>
        <Link href={"/About"}><button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Know More</button></Link>
      </div>
    </div>
    
   
    <div className="bg-white h-1 opacity-5"></div>
    <div className="flex justify-around pt-10">
        <div className="flex flex-col items-center justify-center">
        <img src="/fas.gif" className="w-50 rounded-4xl"/>
        <p className="text-purple-400">Your funds</p>
        </div>
        <div  className="flex flex-col items-center justify-center" >
          <img src="/Art Loop GIF.gif"className="w-50 rounded-4xl"/>
          <p className="text-purple-400">Your Donation</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src="/grabd story.gif"className="w-70 rounded-4xl"/>
          <p className="text-purple-400">Learn More</p>
        </div>
    </div>
    <div className="bg-white h-1 opacity-5"></div>
    <div className="flex flex-col justify-center items-center pt-15 gap-5 h-90">
      <p className="text-white text-lg underline">For Learning Trading Watch This</p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/m4k_1pF5zFI?si=_63oaSSLTB8OUZpp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    


  </>
  )
}
