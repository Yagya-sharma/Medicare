import { createContext } from "react";

export const AppContext=createContext()

const AppContextProvider=(props)=>{
    // const calculateAge=(dob)=>{
    //     const today=new Date()
    //     const birthDate=new Date(dob)
    //     let age=today.getFullYear()-birthDate.getFullYear()
    //     return age
    // }
    const calculateAge = (dob) => {
  if (!dob) return 'N/A'

  // convert "12_04_2002" → "2002-04-12"
  const parts = dob.split('_')
  if (parts.length !== 3) return 'N/A'

  const formattedDOB = `${parts[2]}-${parts[1]}-${parts[0]}`

  const birthDate = new Date(formattedDOB)
  if (isNaN(birthDate)) return 'N/A'

  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age
}



    const value={
        calculateAge
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider