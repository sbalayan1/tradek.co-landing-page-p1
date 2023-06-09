import Timeframes from "./Components/PortfolioChart/Timeframes";

export default function PortfolioChart() {
    return (
        <div className="mb-2">
            {/* Client component */}
            <div className="">
                <h1>$300 Today</h1>
                <h3>$10.00 (3%) After-hours</h3>
            </div>
            {/* client component */}
            <div className="h-96 border-2">
                Graph
            </div>
            {/* client component */}
            <Timeframes />
        </div>
    )
}