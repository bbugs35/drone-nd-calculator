function NDResult({ result }) {
  return (
    <div className="rounded-[34px] border-[5px] border-orange-500 p-8 text-center bg-black">
      <p className="uppercase tracking-[0.3em] text-zinc-300 text-lg mb-2">
        Correct ND Filter
      </p>

      <h2 className="text-8xl font-black text-orange-500 leading-none mb-2">
        {result.nd.label}
      </h2>

      <div className="flex justify-center items-center gap-3 text-zinc-300 flex-wrap">
        <span className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-lg">
          {result.nd.stops} Stops
        </span>

        <span className="text-lg">
          Exact Math: ND{result.exactND}
        </span>
      </div>
    </div>
  )
}

export default NDResult