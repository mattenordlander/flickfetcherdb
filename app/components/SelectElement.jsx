export default function SelectElement({label, handleChange, value, yearsArray, disabled}){
    return(
       <>
            <label htmlFor="Search">{label}</label>
            <select name="releaseDate"
             onChange={handleChange}
             value={value}
             disabled={disabled}
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