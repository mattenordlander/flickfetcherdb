'use client'

import { useRouter } from "next/navigation";
export default function SelectElement({
  yearLabel,
  inputLabel,
  handleChange,
  value,
  yearsArray,
  disabled,
  titleValue,
  onClick,
  onClickForClear,
  disabledForClear
})
 {

  const router = useRouter();

  return (
    <form className="flex md:flex-row gap-4 justify-center item-start md:items-end justify-center p-2 flex-col">
      <div className="flex flex-col w-100 md:w-3/4">
        <label className="text-xl" htmlFor="Search">{inputLabel}</label>
        <input
          type="text"
          onChange={handleChange}
          value={titleValue}
          name={"movieTitle"}
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col w-100 md:w-1/4">
        <label className="text-xl" htmlFor="Search">{yearLabel}</label>
        <select
          name="releaseDate"
          onChange={handleChange}
          value={value}
          disabled={disabled}
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All</option>
          {yearsArray.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-4">
        <button
          className="bg-gray-700 hover:bg-gray-500 text-white py-2 px-4 rounded disabled:bg-gray-500"
          onClick={onClick}
          disabled={disabled}
        >
          Search
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-500 text-white py-2 px-4 rounded disabled:bg-gray-500"
          onClick={onClickForClear}
          disabled={disabledForClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
