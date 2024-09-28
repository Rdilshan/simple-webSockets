export default function App() {
  return (
    <>
      <div className="p-10">

        <h2 className="text-4xl font-extrabold">LOGIN</h2>

        <div className="mb-6 mt-5">
          <label htmlFor="large-input" className="block mb-2 text-sm font-medium">Large input</label>
          <input type="text" id="large-input"
            className="block w-full p-4  text-black  rounded-lg border border-gray-600" />
        </div>
        <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
          Button
        </button>
      </div>
    </>
  )
}