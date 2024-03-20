export default function TwCard({image, title, extra, fontForExtra}){
    return(
        <div className="bg-white max-w-sm overflow-hidden flex flex-col border-4 border-black" style={{boxShadow:"8px 7px 0px 3px #1b1d21"}}>
        <img className="w-full" src={`https://image.tmdb.org/t/p/w500${image}`} alt="Sunset in the mountains"/>
        <div className="px-3 py-4 flex-grow">
          <div className="truncate text-lg font-bold text-stone-950">
            <p>{title}</p>
            <p className="text-sm" style={fontForExtra}>{extra}</p>
          
          </div>
        </div>
              </div>
    )
}