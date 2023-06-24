import Articles from "./Dashboard/Components/Articles/Articles";
import BuyingPower from "./Dashboard/Components/BuyingPower/BuyingPower";




export default function Loading() {
    const stockLayouts = Array(5).fill(0).map(elem => {
        return (
            <div key={elem} className="flex justify-evenly w-full h-[5rem] bg-gray-900 border-[1px] animate-pulse">
            </div>
        )
    })

    return (
        <div className="flex justify-center">
            <div className="flex p-4 justify-center h-[80rem] border-2">
                <div className='p-4 w-3/4'>
                    <section>
                        <div className="w-full h-[30rem] animate-pulse bg-gray-900">

                        </div>
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
                <aside className="ml-2 w-1/2 border-2">
                    <div className="flex justify-between border-b-2 text-xl p-4">
                        <h1 className='text-xl'>Stocks</h1>
                    </div>
                    {stockLayouts}
                    <div className="flex justify-between border-b-2 text-xl p-4">
                        <h1 className='text-xl'>Lists</h1>
                    </div>
                </aside>
            </div>
        </div>
    )
}