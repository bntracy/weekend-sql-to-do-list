// console.log('JS is sourced!');

function onReady() {
    getItems();
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
        if (item.isComplete) {
            completedClass = 'class="completed table-light"';
            disabledButton = 'disabled';
        }
        document.getElementById('item_display').innerHTML += `
            <tr data-testid="toDoItem" ${completedClass}>
                <td>${item.text}</td>
                <td><button data-testid="completeButton" onclick="completeItem(${item.id})" ${disabledButton}>Mark Done</button></td>
                <td><button data-testid="deleteButton" onclick="deleteItem(${item.id})">Delete</button></td>
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