const form_add = document.querySelector('#modal-add #dev-add');
const dev_edit = document.querySelector('#dev-edit');
const view_show = document.querySelector('#view_show');
const mod_del = document.querySelector('#modal-delete');

form_add.addEventListener('submit', function(e) {
    e.preventDefault();

    let name = this.querySelector('#name');
    let email = this.querySelector('#email');
    let phone = this.querySelector('#phone');
    let photo = this.querySelector('#photo');
    let skill = this.querySelector('#skill');

    if (name.value == '' || email.value == '' || phone.value == '' || photo.value == '' || skill.value == '') {
        alert('all fields are required');
    } else {
        axios.post(`http://localhost:5050/Devs`, {
            id : "",
            name : name.value,
            email : email.value,
            phone : phone.value,
            photo : photo.value,
            skillId : skill.value
        }).then(res => {
            name.value = '';
            email.value = '';
            phone.value = '';
            photo.value = '';
            skill.value = '';

            get_data();
        });
    }
});

// Devs Edit//

function edit_developer(id) {
    let name = document.querySelector('#ename');
    let email = document.querySelector('#eemail');
    let phone = document.querySelector('#ephone');
    let photo = document.querySelector('#ephoto');
    let skill = document.querySelector('#eskill');
    let eimg = document.querySelector('#eimg');

    axios.get(`http://localhost:5050/Devs/${id}`).then(res => {
        name.value = res.data.name;
        email.value = res.data.email;
        phone.value = res.data.phone;
        photo.value = res.data.photo;
        skill.value = res.data.skillId;
        eid.value = id;
        eimg.setAttribute('src', res.data.photo)
    })
}

dev_edit.addEventListener('submit', function(e) {
    let name = document.querySelector('#ename');
    let email = document.querySelector('#eemail');
    let phone = document.querySelector('#ephone');
    let photo = document.querySelector('#ephoto');
    let skill = document.querySelector('#eskill');
    let eid = document.querySelector('#eid');

    axios.patch(`http://localhost:5050/Devs/${eid.value}`, {
            id : "",
            name : name.value,
            email : email.value,
            phone : phone.value,
            photo : photo.value,
            skillId : skill.value
    }).then(res => {
            name.value = '';
            email.value = '';
            phone.value = '';
            photo.value = '';
            skill.value = '';

            get_data();
    })
})

// View Developer//
function view_dev(id) {
    let view_e = '';
    axios.get(`http://localhost:5050/Devs/${id}`).then(res => {
        view_e = `
        
                    <img src="${res.data.photo}" alt="">
                    <h4>${res.data.name}</h4>
                    <p>Email : ${res.data.email}</p>
                    <p>Phone : ${res.data.phone}</p>
        
        `
    })
    view_show.innerHTML = view_e;
}