


export const initialState = {
  
    user:null,
    genres:[]
    
}

const  reducer = (state, action) =>{
    
    switch(action.type){
        case 'SET_USER':
            
           
            localStorage.setItem("refresh",action.refresh)
            localStorage.setItem("access",action.access)
           
            return {
                
                user:action.user
            }
        case 'LOGOUT_USER':
            localStorage.clear()
            return {
              
                user:null
            }




      
    }
}
export default reducer