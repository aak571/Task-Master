import react_dom from 'react-dom'
import Nav from './Components/Nav'
const RootComponent = ()=>{
    return(
        <div>
            <Nav/>
        </div>
    )
}
react_dom.render(<RootComponent/>, document.getElementById('rootComponent'))