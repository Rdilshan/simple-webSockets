import axios from "axios";
import { useEffect, useState } from "react"


export default function Chat() {

    const [names, setNames] = useState([]);


    useEffect(() => {
        const fetchNames = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/names');

                console.log(response.data); 
                setNames(response.data.names);
            } catch (error) {
                console.error('Error fetching names:', error); // Handle errors
            }
        };

        fetchNames(); 
    }, []);

    return (
        <div className="p-10">

            <div className="mb-6 mt-5">
                <label htmlFor="large-input" className="block mb-2 text-sm font-medium">Select User</label>
                <div className="w-full max-w-sm min-w-[200px]">
                    <div className="relative">
                        <select
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                            <option value="All">All</option>

                            {Array.isArray(names) ? ( // Check if names is an array before mapping
                                names.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))
                            ) : (
                                <option>No names found</option> // Fallback if names is not an array
                            )}



                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </div>
                </div>



                <label htmlFor="message" className="mt-4 block mb-2 text-sm font-medium ">Reciver</label>
                <textarea id="message" rows={4} className="block p-2.5 w-full border border-gray-300" placeholder="Write your thoughts here..." readOnly></textarea>



                <label htmlFor="message" className=" mt-4 block mb-2 text-sm font-medium ">Send Message</label>
                <textarea id="message" rows={4} className="block p-2.5 w-full border border-gray-300" placeholder="Write your thoughts here..."></textarea>

                <button className="mt-4 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                    Send
                </button>
            </div>



        </div>
    )
}
