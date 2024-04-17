import react from 'react'
import NewTask from './NewTask'
const NavComponent = () => {
    const styles = { 'background-color': 'grey' }
    const [drop_down_details, set_drop_down_details] = react.useState({ drop_down_name: 'All Lists', display_drop_down: 0 })
    const [search_query, set_search_query] = react.useState('')
    let drop_down_click_handler = e => {
        switch (e.target.id) {
            case 'dd1':
                set_drop_down_details({ ...drop_down_details, drop_down_name: 'All Lists', display_drop_down: 0 })
                break;
            case 'dd2':
                set_drop_down_details({ ...drop_down_details, drop_down_name: 'Personal', display_drop_down: 1 })
                break;
            case 'dd3':
                set_drop_down_details({ ...drop_down_details, drop_down_name: 'Shopping', display_drop_down: 2 })
                break;
            case 'dd4':
                set_drop_down_details({ ...drop_down_details, drop_down_name: 'Wishlist', display_drop_down: 3 })
                break;
            case 'dd5':
                set_drop_down_details({ ...drop_down_details, drop_down_name: 'Work', display_drop_down: 4 })
                break;
            default:
        }
    }

    const search_bar_onchange_handler = e => {
        set_search_query(e.target.value)
    }

    return (
        <div className='container-sm mt-3'>
            <div className='row'>
                <div className="col-sm-12">
                    <ul className='nav nav-pills'>
                        <li className='nav-item dropdown col-sm-2 text-center'>
                            <a style={styles} className='nav-link dropdown-toggle active col-sm-12 text-light shadow-lg' data-bs-toggle='dropdown' href="#">{drop_down_details.drop_down_name}</a>
                            <ul style={styles} className='dropdown-menu col-sm-12'>
                                <li className="text-center"><a id='dd1' className='dropdown-item' onClick={drop_down_click_handler} href='#'>All Lists</a></li>
                                <li className="text-center"><a id='dd2' className='dropdown-item' onClick={drop_down_click_handler} href='#'>Personal</a></li>
                                <li className="text-center"><a id='dd3' className='dropdown-item' onClick={drop_down_click_handler} href='#'>Shopping</a></li>
                                <li className="text-center"><a id='dd4' className='dropdown-item' onClick={drop_down_click_handler} href='#'>Wishlist</a></li>
                                <li className="text-center"><a id='dd5' className='dropdown-item' onClick={drop_down_click_handler} href='#'>Work</a></li>
                            </ul>
                        </li>
                        <li className='nav-item col-sm-6 mx-5'>
                            <input onChange={search_bar_onchange_handler} className="col-sm-12 shadow-lg rounded" placeholder="Search your list"></input>
                        </li>
                    </ul>
                </div>
            </div>
            <NewTask search_query={search_query.trim().replace(/\s+/g, ' ')} drop_down_details={drop_down_details} />
        </div>
    )
}
export default NavComponent