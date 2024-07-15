export const useAPI = (uid) => {
    const domain = 'http://localhost:5000/'

    const _fetch = async (path, method, data) => {
        if(method === 'GET'){
            return await fetch(domain + 'api/' + path);
        }else{
            if(data == null){
                return await fetch(domain + 'api/' + path, {'method': method});
            }
            return await fetch(domain + 'api/' + path, {'method': method, headers: {'Content-Type': 'application/json'}, data: data}); 
        }
    }


    const addUser = async () => {
        const res = await _fetch('u', 'POST');
        return (await res.json()).id;
    }
    const deleteUser = async () => {
        _fetch('u/' + uid, 'DELETE');
    }
    const getMyNotes = async () => {
        const res = await _fetch('u/' + uid + '/n', 'GET');
        return (await res.json()).notes;
    }
    const getNote = async (nid) => {
        const res = await _fetch('n/' + nid, 'GET');
        return await res.json();
    }
    const addNote = async () => {
        const res = await _fetch('n', 'POST', {'u': uid});
        return (await res.json()).id;
    }
    return { uid, addUser, deleteUser, getMyNotes, getNote, addNote };
}
