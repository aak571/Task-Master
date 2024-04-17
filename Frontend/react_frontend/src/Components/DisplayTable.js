import react from 'react'
import axios from 'axios'
const DisplayTable = (props) => {
    const styles = { 'font-size': '120px', color: 'lightpink' }
    const styles1 = { 'background-color': 'grey', color: 'white' }
    const styles2 = { 'background-color': 'lightseagreen', color: 'white' }
    const styles3 = { 'background-color': 'lightcoral', color: 'white' }
    const styles4 = { 'background-color': 'lightgray' }
    const [display_and_search_data, set_display_and_search_data] = react.useState({ to_do_data_jsx: <></>, array_for_search: [] })
    const [parti_data, set_parti_data] = react.useState({ task: '', deadline: '', edit_item_id: '0' })
    const [get_on_delete_flag, set_get_on_delete_flag] = react.useState(0)
    const [get_on_update_flag, set_get_on_update_flag] = react.useState(0)
    let filtered_to_do_data_jsx, filtered_array
    react.useEffect(() => {
        const get_to_do = async () => {
            const res_to_do = await axios.get('http://127.0.0.1:5000/get_data_from_mongoDB')
            let jsx_data, search_array = []
            jsx_data = res_to_do.data.map(to_do => {
                search_array = [...search_array, [to_do.to_do_item, to_do.deadline, to_do.category, to_do._id]]
                return (
                    <tr className="text-center row my-auto mt-2">
                        <td style={styles1} className="col-sm-4 rounded shadow-lg">{to_do.to_do_item}</td>
                        <td style={styles1} className="col-sm-2 rounded mx-2 shadow-lg">{to_do.deadline}</td>
                        <td style={styles1} className="col-sm-2 rounded shadow-lg">{to_do.category}</td>
                        <a style={styles2} id={`${to_do._id}`} className="mx-4 btn col-sm-1 rounded shadow-lg" onClick={Edit} data-bs-toggle='modal' data-bs-target="#myModal">edit</a>
                        <a style={styles3} id={`${to_do._id}`} className="col-sm-1 btn rounded shadow-lg" onClick={Delete}>delete</a>
                    </tr>
                )
            })
            set_display_and_search_data({ ...display_and_search_data, to_do_data_jsx: jsx_data, array_for_search: search_array })
        }
        get_to_do()
    }, [props.flag, get_on_delete_flag, get_on_update_flag])

    const Edit = async e => {
        const parti_to_do_data = await axios.get(`http://127.0.0.1:5000/get_to_do_by_ID/${e.target.id}`)
        set_parti_data({ ...parti_data, task: parti_to_do_data.data.to_do_item, deadline: parti_to_do_data.data.deadline, edit_item_id: e.target.id })
    }

    const Delete = async e => {
        axios.delete(`http://127.0.0.1:5000/delete_to_do_item/${e.target.id}`)
        set_get_on_delete_flag((prev_flag) => prev_flag + 1)
    }

    const edit_modal_onchange_handler = e => {
        (e.target.id === 'edit_task') ? set_parti_data({ ...parti_data, task: e.target.value }) : set_parti_data({ ...parti_data, deadline: e.target.value })
        switch (e.target.id) {
            case 'edit_task':
                (document.getElementById('edit_task').value.trim().match(/./g) && document.getElementById('edit_deadline').value) ? document.getElementById('save_changes_btn').disabled = false : document.getElementById('save_changes_btn').disabled = true
                break
            case 'edit_deadline':
                (document.getElementById('edit_task').value.trim().match(/./g) && document.getElementById('edit_deadline').value) ? document.getElementById('save_changes_btn').disabled = false : document.getElementById('save_changes_btn').disabled = true
                break
            default:
        }
    }

    const save_changes_btn = async () => {
        axios.put(`http://127.0.0.1:5000/update_parti_item/${parti_data.edit_item_id}`, parti_data)
        set_get_on_update_flag((prev_flag) => prev_flag + 1)
    }

    const form_JSX = val => {
        if (val === 0) {
            filtered_to_do_data_jsx = filtered_array.map(filtered_to_do => {
                let i = -1
                const highlighter = () => {
                    const splits = filtered_to_do[0].split(new RegExp(props.search_query, 'gi'))
                    const query_string = filtered_to_do[0].match(new RegExp(props.search_query, 'gi'))
                    function highlighter_helper(splits_helper) {
                        splits_helper = splits_helper.map((split) => {
                            return (
                                <div>
                                    <span>{split}</span>
                                    <span className='fw-bold text-info'>{query_string[++i]}</span>
                                </div>
                            )
                        })
                        splits_helper[splits_helper.length - 1] = <div>
                            <span>{splits[splits.length - 1]}</span>
                        </div>
                        return splits_helper
                    }
                    return (
                        <div className='d-flex'>
                            {highlighter_helper(splits)}
                        </div>
                    )
                }
                return (
                    <tr className="text-center row my-auto mt-2">
                        <td style={styles1} className="col-sm-4 rounded shadow-lg">{highlighter()}</td>
                        <td style={styles1} className="col-sm-2 rounded mx-2 shadow-lg">{filtered_to_do[1]}</td>
                        <td style={styles1} className="col-sm-2 rounded shadow-lg">{filtered_to_do[2]}</td>
                        <a style={styles2} id={`${filtered_to_do[3]}`} className="mx-4 btn col-sm-1 rounded shadow-lg" onClick={Edit} data-bs-toggle='modal' data-bs-target="#myModal">edit</a>
                        <a style={styles3} id={`${filtered_to_do[3]}`} className="col-sm-1 btn rounded shadow-lg" onClick={Delete}>delete</a>
                    </tr>
                )
            })
        }
        else {
            filtered_to_do_data_jsx = filtered_array.map(filtered_to_do => {
                return (
                    <tr className="text-center row my-auto mt-2">
                        <td style={styles1} className="col-sm-4 rounded shadow-lg">{filtered_to_do[0]}</td>
                        <td style={styles1} className="col-sm-2 rounded mx-2 shadow-lg">{filtered_to_do[1]}</td>
                        <td style={styles1} className="col-sm-2 rounded shadow-lg">{filtered_to_do[2]}</td>
                        <a style={styles2} id={`${filtered_to_do[3]}`} className="mx-4 btn col-sm-1 rounded shadow-lg" onClick={Edit} data-bs-toggle='modal' data-bs-target="#myModal">edit</a>
                        <a style={styles3} id={`${filtered_to_do[3]}`} className="col-sm-1 btn rounded shadow-lg" onClick={Delete}>delete</a>
                    </tr>
                )
            })
        }

    }

    const prepare_filtered_to_do_data_jsx_by_search_query = () => {
        filtered_array = filtered_array.filter((arr) => arr[0].toLowerCase().match(new RegExp(props.search_query.toLowerCase(), 'g')));
        form_JSX(0)
    }

    const prepare_filtered_to_do_data_jsx_by_category = category_value => {
        if (category_value === 1) {
            filtered_array = display_and_search_data.array_for_search.filter((arr) => arr[2] === 'Personal');
        }
        else if (category_value === 2) {
            filtered_array = display_and_search_data.array_for_search.filter((arr) => arr[2] === 'Shopping');
        }
        else if (category_value === 3) {
            filtered_array = display_and_search_data.array_for_search.filter((arr) => arr[2] === 'Wishlist');
        }
        else if (category_value === 4) {
            filtered_array = display_and_search_data.array_for_search.filter((arr) => arr[2] === 'Work');
        }
        else if (category_value === 0) {
            filtered_array = display_and_search_data.array_for_search
        }
        form_JSX(1)
    }

    if (props.drop_down_details.display_drop_down >= 0) {
        console.log()
        prepare_filtered_to_do_data_jsx_by_category(props.drop_down_details.display_drop_down)
    }

    if (props.search_query) {
        prepare_filtered_to_do_data_jsx_by_search_query()
    }

    return (
        <div className="container-sm mt-5">
            <div className="modal fade" id="myModal">
                <div className="modal-dialog modal-fullscreen-sm-down">
                    <div className="modal-content">
                        <div style={styles4} className="modal-header">
                            <h4 className="modal-title">Edit Task</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input style={styles4} id='edit_task' className='' type='text' onChange={edit_modal_onchange_handler} value={parti_data.task} />
                            <input style={styles4} id='edit_deadline' type='date' className='mx-3' onChange={edit_modal_onchange_handler} value={parti_data.deadline} />
                        </div>
                        <div className="modal-footer">
                            <button id='save_changes_btn' onClick={save_changes_btn} type="button" className="btn bg-info" data-bs-dismiss="modal">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {display_and_search_data.to_do_data_jsx.length == 0 && <div className='row'>
                <div className='col-sm-12 text-center mt-5'>
                    <p style={styles}>No Data Yet !!!</p>
                </div>
            </div>}
            {display_and_search_data.to_do_data_jsx.length > 0 && <div className="row table-responsive">
                <div className="col-sm-9 mx-auto table-responsive">
                    <table className="table table-hover table-fixed">
                        <thead className='table-dark'>
                            <tr className="text-center row">
                                <th className="col-sm-4 rounded">Your Bucket List</th>
                                <th className="col-sm-2 rounded mx-2">Your Deadline</th>
                                <th className="col-sm-2 rounded">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered_to_do_data_jsx}
                        </tbody>
                    </table>
                </div>
            </div>}
        </div>
    )
}
export default DisplayTable