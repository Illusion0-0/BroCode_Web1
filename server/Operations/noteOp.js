const Note = require("../model/note");
/*
MongoDB queries & Operators
============================
.find({ title: { $lte: "C" } })
eq  (equal)
ne  (not equal)
gt  (greater than)
gte (greater than or equal to)
lt  (lower than)
lte (lower than or equal to)
in
nin (not in)

.find()
        .or([{name: 'C'}, {name: 'B'}]) <-- OR Operator
        .and([{name: 'C'}, {name: 'B'}]) <-- AND Operator
*/

/*
  @param(obj): newNote = contains new note which needs to be inserted
  
  @return: Document ID
*/
async function createNote(newNote) {
  //creating obj from class schema
  const note = new Note(newNote);

  const result = await note.save(); //saving to DB
  return result;
}

/*
  @param(obj): where = contains JSON Object for Where clause of find method
  @param(obj): onlyGet = contains JSON Object of data which needs to extracted
  @param(INT): pageSize = number of documents need to be fetched
  @param(INT): pageNumber = number of pages to be skipped before reading data
  @param(obj): sortBy = contains JSON Object of data by which documents should be sorted
  
  @return(Array): Array of Document Objects
*/
async function getNotes(where, onlyGet, pageSize, pageNumber, sortBy) {
  const notes = await Note.find(where)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .select(onlyGet)
    .sort(sortBy);
  return notes;
}

/*
  @param(String): id = Note ID
  @param(obj): updatedInfo = contains JSON Object of data which needs to be Updated
  
  @return: updated info
*/
async function updateNote(id, updatedInfo) {
  const note = await Note.findById(id);
  if (!note) return;

  updatedInfo.updatedAt = new Date();
  note.set(updatedInfo);
  const result = await note.save();
  return result._id + "";
}

/*
  @param(String): id = Note ID
  
  @return: 0 on false (true = deletion success)
*/
async function removeNote(id) {
  const result = await Note.findByIdAndRemove(id);
  return result;
}

//export
module.exports = { removeNote, createNote, updateNote, getNotes };
