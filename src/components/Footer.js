import React from "react"
import '../styles/footer.css'
import 'materialize-css'
class Footer extends React.Component
{
    render(){
        return(
            <footer className = "footer">
                <div className = "footer_wrapper">
                    <span>ILKMOV	&copy;All Rights Reserved 2020.</span><br/>
                   
               </div>
            </footer>
        )
    }

}
export default Footer