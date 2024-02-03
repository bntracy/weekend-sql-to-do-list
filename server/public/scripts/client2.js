// console.log('JS is sourced!');

function onReady() {
    getItems();
    let deleteModal = document.getElementById('deleteModal');
    // console.log('deleteModal loaded', deleteModal);
    deleteModal.addEventListener("show.bs.modal", function(event) {
        // console.log('in event listener');
        var button = event.relatedTarget;
        var id = button.getAttribute("data-item-id");
        // alert(id);
        document.getElementById('confirmed-delete').setAttribute('onclick', `deleteItem(${id})`);
    });
}

onReady();

function getItems() {
    axios.get('/todos').then(response => {
        // console.log(response.data);
        renderItems(response.data);
    }).catch(error => {
        console.log('Error in GET', error);
        alert('Something went wrong!');
    });
}

function renderItems(items) {
    document.getElementById('item_display').innerHTML = '';
    for (let item of items) {
        let completedClass = '';
        let disabledButton = '';
        let textMuted = '';
        let timestamp ='';
        if (item.isComplete) {
            completedClass = 'class="completed table-light"';
            disabledButton = 'disabled';
            textMuted = 'class="text-muted"';
            timestamp = prettyTimestamp(item.completedAt);
        }
        document.getElementById('item_display').innerHTML += `
            <tr data-testid="toDoItem" ${completedClass}>
                <td ${textMuted}>${item.text}</td>
                <td><button data-testid="completeButton" onclick="completeItem(${item.id})" class="btn btn-success" ${disabledButton}>Mark Done</button></td>
                <td ${textMuted}>${timestamp}</td>
                <td><button data-item-id="${item.id}" data-bs-toggle="modal" data-bs-target="#deleteModal" class="btn btn-danger">Delete</button></td>
            </tr>
        `;
    }
}

function addItem(event) {
    event.preventDefault();
    let text = document.getElementById('to-do_input').value;
    axios.post('/todos', { text: text }).then(response => {
        getItems();
        document.getElementById('to-do_input').value = '';
    }).catch(error => {
        console.log('Error in POST', error);
        alert('Something went wrong!');
    });
}

function completeItem(id) {
    axios.patch(`/todos/mark/${id}`).then(response => {
        getItems();
    }).catch(error => {
        console.log('Error in PATCH', error);
        alert('Something went wrong!');
    });
}

function deleteItem(id) {
    axios.delete(`/todos/${id}`).then(response => {
        getItems();
    }).catch(error => {
        console.log('Error in DELETE', error);
        alert('Something went wrong!');
    });
}

function prettyTimestamp(timestamp) {
    let localTimestamp = new Date(timestamp);
    // console.log(localTimestamp);
    let hours = localTimestamp.getHours();
    let amOrPm = 'AM';
    if (hours > 12) {
        hours -= 12;
        amOrPm = 'PM';
    }
    let prettyString = `${localTimestamp.toDateString()} ${hours}:${localTimestamp.getMinutes()} ${amOrPm}`;
    return prettyString;
}