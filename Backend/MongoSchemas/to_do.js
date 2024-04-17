import mongoose from 'mongoose'
const to_do_schema = new mongoose.Schema({
    to_do_item: String,
    deadline: String,
    category: String
})
export default mongoose.model('ToDo', to_do_schema)