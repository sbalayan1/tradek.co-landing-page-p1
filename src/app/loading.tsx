import Articles from "./Components/Articles/Articles";
import BuyingPower from "./Components/BuyingPower/BuyingPower";

export default function Loading() {
    function stockLayouts(size: number) { 
        return Array(size).fill(0).map((elem, idx) => {
            return (
                <div key={idx} className="flex justify-between w-full h-[5rem] border animate-pulse p-4">
                    <div className="bg-gray-900 rounded-md w-1/5 h-full border"></div>
                    <div className="flex justify-center w-2/5 h-full bg-gray-900 rounded-md"></div>
                    <div className="w-1/5 h-full flex flex-col justify-evenly">
                        <div className="h-2/5 w-full bg-gray-900 border rounded-md"></div>
                        <div className="h-2/5 w-full bg-gray-900 border rounded-md"></div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="flex justify-center">
            <div className="flex p-4 justify-center h-[80rem] ">
                <div className='p-4 w-3/4'>
                    <section>
                        <div className="w-full h-[30rem] animate-pulse bg-gray-900 border"></div>
                        <BuyingPower />
                    </section>
                    <Articles />
                    
                    <section>
                        <h1 className='text-xl'>Discover more</h1>
                    </section>

                    <section>
                        <h1 className='text-xl'>Trending Lists</h1>
                    </section>
                    <section>
                        <h1 className='text-xl'>News</h1>
                    </section>
                </div>
                <aside className="ml-2 w-1/2">
                    <div className="flex justify-between border text-xl p-4">
                      <h1 className='text-xl'>Stocks</h1>
                    </div>
                    {stockLayouts(5)}
                    <div className="flex justify-between text-xl border p-4">
                        <h1 className='text-xl'>Lists</h1>
                    </div>
                    {stockLayouts(5)}
                </aside>
            </div>
        </div>
    )
}