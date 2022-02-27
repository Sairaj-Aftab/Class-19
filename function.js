const skill_list = document.querySelector('#skill');
const data_list_ht = document.querySelector('tbody')

function skills() {
    axios.get(`http://localhost:5050/Skill`).then(data => {
        let ht_skill = '';
        data.data.map(data => {
            ht_skill += `<option value="${data.id}">${data.name}</option>`;
        })
        skill_list.insertAdjacentHTML('beforeend', ht_skill);
    });
}
skills();

// -------Data get from Json--------//
function get_data() {
    axios.get(`http://localhost:5050/devs`).then(res => {
        let data_item = '';
        res.data.map((data, index) => {
            data_item += `
            
                            <tr>
                                <td>${index + 1}</td>
                                <td>${data.name}</td>
                                <td>${data.skillId}</td>
                                <td>${data.email}</td>
                                <td>${data.phone}</td>
                                <td><img src="${data.photo}" alt=""></td>
                                <td>
                                    <a class="btn btn-info btn-sm" data-bs-toggle="modal" onclick="view_dev(${data.id})" href="#modal-view"><i class="fa fa-eye" aria-hidden="true"></i></a>
                                    <a class="btn btn-success btn-sm" data-bs-toggle="modal" onclick="edit_developer(${data.id})" href="#modal-edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                                    <a class="btn btn-danger btn-sm" data-bs-toggle="modal" onclick="dev_delete(${data.id})" href="#modal-delete"><i class="fa fa-trash" aria-hidden="true"></i></a>
                                </td>
                            </tr>
            
            `
        })
        data_list_ht.innerHTML = data_item;
    })
}
get_data();

let dev_dele = document.getElementById('dev-dele');
function dev_delete(id) {
    
    dev_dele.setAttribute('delid' , id)
}

dev_dele.addEventListener('click', function(){
    let del_id = this.getAttribute('delid');

    axios.delete(`http://localhost:5050/devs/${del_id}`).then(res => {

        get_data();

    })
})