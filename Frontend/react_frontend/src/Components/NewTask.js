import react from 'react'
import axios from 'axios'
import DisplayTable from './DisplayTable'
const NewTask = (props) => {
    const styles = { 'background-color': 'grey', color: 'white' }
    const styles1 = { 'background-color': 'lightgray', color: 'white' }
    let [drop_down_name, set_drop_down_name] = react.useState('Choose Category')
    let [new_task_data, set_new_task_data] = react.useState({ task: '', deadline: '', category: '' })
    let [save_btn_ability_flag, set_save_btn_ability_flag] = react.useState(true)
    let [display_render_flag, set_display_render_flag] = react.useState(0)
    const drop_down_click_handler = e => {
        const set_new_task_data_helper = selected_category => {
            set_new_task_data({ ...new_task_data, category: selected_category })
        }
        (document.getElementById('task_field').value.trim().match(/./g) && document.getElementById('deadline_field').value) ? set_save_btn_ability_flag(false) : set_save_btn_ability_flag(true)
        switch (e.target.id) {
            case 'dd1':
                set_drop_down_name('Personal')
                set_new_task_data_helper('Personal')
                break;
            case 'dd2':
                set_drop_down_name('Shopping')
                set_new_task_data_helper('Shopping')
                break;
            case 'dd3':
                set_drop_down_name('Wishlist')
                set_new_task_data_helper('Wishlist')
                break;
            case 'dd4':
                set_drop_down_name('Work')
                set_new_task_data_helper('Work')
                break;
            default:
        }
    }
    const set_new_task_data_handler = e => {
        (e.target.id === 'task_field') ? set_new_task_data({ ...new_task_data, task: e.target.value }) : set_new_task_data({ ...new_task_data, deadline: e.target.value })
        switch (e.target.id) {
            case 'task_field':
                (document.getElementById('task_field').value.trim().match(/./g) && document.getElementById('deadline_field').value && drop_down_name !== 'Choose Category') ? set_save_btn_ability_flag(false) : set_save_btn_ability_flag(true)
                break
            case 'deadline_field':
                (document.getElementById('task_field').value.trim().match(/./g) && document.getElementById('deadline_field').value && drop_down_name !== 'Choose Category') ? set_save_btn_ability_flag(false) : set_save_btn_ability_flag(true)
                break
            default:
        }
    }
    const Save_as_my_to_do_list_handler = async () => {
        set_display_render_flag((prev_flag => prev_flag + 1))
        axios.post('http://127.0.0.1:5000/post_new_to_do', new_task_data)
        set_new_task_data({ ...new_task_data, task: '' })
    }

    const refresh_new_task_page = () => {
        document.getElementById('deadline_field').value = ''
        set_drop_down_name('Choose Category')
        set_save_btn_ability_flag(true)
    }

    return (
        <div className="container-sm">
            <DisplayTable flag={display_render_flag} search_query={props.search_query} drop_down_details={props.drop_down_details} />
            <div className="row">
                <div className="text-end">
                    <button style={styles} onClick={refresh_new_task_page} className="btn rounded-circle col-sm-1 fw-bold fs-1" data-bs-toggle='offcanvas' data-bs-target='#offcanvas_bottom'>+</button>
                </div>
            </div>
            <div className="row">
                <div style={styles1} id="offcanvas_bottom" className="offcanvas offcanvas-start">
                    <div className="offcanvas-header">
                        <h3 className="offcanvas-title text-dark">New Task</h3>
                        <button className="btn btn-close" data-bs-dismiss='offcanvas'></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className='nav nav-pills'>
                            <li className='nav-item dropdown text-center'>
                                <a id='new_task_drop_down' className='nav-link dropdown-toggle active bg-light text-dark border ' data-bs-toggle='dropdown' href="#">{drop_down_name}</a>
                                <ul className='dropdown-menu'>
                                    <li className="text-center"><a id='dd1' className='dropdown-item' onClick={drop_down_click_handler} href='#'>Personal</a></li>
                                    <li className="text-center"><a id='dd2' className='dropdown-item' onClick={drop_down_click_handler} href='#'>Shopping</a></li>
                                    <li className="text-center"><a id='dd3' className='dropdown-item' onClick={drop_down_click_handler} href='#'>Wishlist</a></li>
                                    <li className="text-center"><a id='dd4' className='dropdown-item' onClick={drop_down_click_handler} href='#'>Work</a></li>
                                </ul>
                            </li>
                        </ul>
                        <p className="fw-bold mt-5 text-dark">What's the task to accomplish ?</p>
                        <input id='task_field' value={new_task_data.task} onChange={set_new_task_data_handler} type="text" className="form-control-plaintext" placeholder="Enter your to-do task here" />
                        <p className="fw-bold mt-5 text-dark">Due Date: <span className="fw-normal text-dark">Set a deadline for your task</span></p>
                        <input id='deadline_field' onChange={set_new_task_data_handler} type="date" className="form-control-plaintext" />
                        <button id='new_task_save_btn' data-bs-dismiss='offcanvas' onClick={Save_as_my_to_do_list_handler} disabled={save_btn_ability_flag} className="btn mt-5 text-light bg-success" >Save as my to-do list</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NewTask