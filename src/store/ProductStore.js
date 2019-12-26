import React, {createContext, useState} from 'react'

export const ProductContext = createContext();

export default function ProductStore({children}) {

  const [success, setSuccess] = useState(false);

  return (
    <React.Fragment>
      <ProductContext.Provider value={[success, setSuccess]}>
        {children}
      </ProductContext.Provider>
    </React.Fragment>
  )
}
