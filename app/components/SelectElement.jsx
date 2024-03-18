export default function SelectElement({label, handleChange, value, yearsArray}){
    return(
       <>
            <label htmlFor="Search">{label}</label>
            <select name="releaseDate"
             onChange={handleChange}
             value={value}
             >
              <option value="">All</option>
              {yearsArray.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
       </>
    )
}