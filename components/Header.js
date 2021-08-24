import Image from "next/image";
import { 
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon
 } from '@heroicons/react/solid';
import "react-date-range/dist/styles.css"; //main style file
import "react-date-range/dist/theme/default.css"; //theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";
 

function Header() {

  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);

  const selectionRange= {
    startDate:startDate,
    endDate:endDate,
    key: "selection"
  }

  const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const resetInput = () => {
        setSearchInput("");
    }

    const search = () => {
        router.push({
            pathname: "/search",
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests,
            }
        });

        setSearchInput("");
    }

    const [searchStatus] = useState(false);
    const [setScroll] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 20) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [])

  
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:py-10">
      
      {/*Left-Logo*/}
      <div 
        onClick={() => router.push("/")}
        className={!searchStatus ? "flex relative items-center h-10 cursor-pointer my-auto" : "hidden"}
      > 
        <Image className="cursor-pointer active:scale-90"
        src="https://vercel.com/api/www/avatar/c819693a21cb278a8c93e5f46c6ad1eeafc89b79?s=160"
        layout="fill"
        objectFit="contain"
        objectPosition="left"
        />
        <span className="flex items-center ml-12 space-x-4 justify-end text-green-400">TITech Africa</span>
      </div>

      {/*Middle-Search*/}u
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent outline-none" type="text" placeholder="Start your Search" />
          <SearchIcon className="hidden md:inline-flex h-8 bg-green-400 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
      </div>

      {/*Right*/}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
          <p className="hidden md:inline cursor-pointer" >Become a host</p>
          <GlobeAltIcon className="h-6 cursor-pointer"/>
          <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
            <MenuIcon className="h-6"/>
            <UserCircleIcon className="h-6"/>
          </div>
        </div>

      {searchInput && (
                    <div className="flex flex-col col-span-3 mx-auto mt-5 bg-white p-5 rounded-xl">
                        <div className="hidden sm:inline-flex">
                            <DateRangePicker
                                ranges={[selectionRange]}
                                minDate={new Date()}
                                rangeColors={["#00b386"]}
                                onChange={handleSelect}
                            />
                        </div>
                        <div className="inline-flex sm:hidden">
                            <DateRange
                                ranges={[selectionRange]}
                                minDate={new Date()}
                                rangeColors={["#00b386"]}
                                onChange={handleSelect}
                            />
                        </div>
                        <div className="flex items-center border-b mb-4">
                            <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                            <UsersIcon className="h-5" />
                            <input
                                value={noOfGuests}
                                onChange={(e) => setNoOfGuests(e.target.value)}
                                min={1}
                                type="number"
                                className="w-12 pl-2 text-lg outline-none text-green-400"
                            />
                        </div>
                        <div className="flex">
                            <button onClick={resetInput} className="flex-grow text-red-500">Cancel</button>
                            <button onClick={search} className="flex-grow text-green-400">Search</button>
                        </div>
                    </div>
                )}

    </header>
  )
}

export default Header;
