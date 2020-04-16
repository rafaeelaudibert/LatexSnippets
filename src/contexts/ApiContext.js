import React, { useState, useEffect } from 'react'
import useLogin from '../hooks/useLogin'
import { createSnippet, deleteSnippet, saveSnippet } from '../services/snippet.service'
import { getOrCreateUser } from '../services/user.service'

export const ApiContext = React.createContext( {} )

const ApiProvider = ( { children } ) => {
  const [ providerUser, loginHandler ] = useLogin()
  const [ user, setUser ] = useState( null )
  const [ loading, setLoading ] = useState( false )
  const [ error, setError ] = useState()

  // When the provider user changes:
  //    * if we have a user, we fetch the data from the API;
  //    * else, we clear the user which is being passed to the provider consumers.
  useEffect( () => {
    if ( !providerUser ) {
      setUser( null )
    }

    setLoading( true )
    getOrCreateUser( providerUser, providerUser )
      .then( setUser )
      .then( () => setLoading( false ) )
      .catch( setError )
  }, [ providerUser ] )

  return (
    <ApiContext.Provider
      value={{
        snippetApi: {
          createSnippet,
          deleteSnippet,
          saveSnippet
        },
        loginAction: loginHandler.open,
        logoutAction: loginHandler.logout,
        error,
        loading,
        clearError: () => setError( null ),
        user
      }}
    >
      { children }
    </ApiContext.Provider>
  )
}


export default ApiProvider
