window.onload = getUsers;
const table = document.querySelector('table');

// Загрузка списка пользователей
function getUsers() {
	let con = 0;
	fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) =>{return response.json()}) 
	.then((users)=> {
		for (let i = 0; i < 5; i++) {
      table.innerHTML += `
        <tr>
          <td data-rules="name">${users[con].username}</td>
					<td data-rules="tel">${users[con].phone}</td>
					<td class="icons">
						<i class="fas fa-pen"></i>
						<i class="fas fa-trash-alt"></i>
					</td>
        </tr>
			`
			con = con+1;

			// Удаление строки
			table.addEventListener("click", (e) => {
				let target = e.target;
				if (target.className != 'fas fa-trash-alt') return;
				remove(target);
			});
			function remove(tr) {
				tr.parentElement.parentElement.parentElement.remove();
			}
			// end
			// Редактирование строки
			table.addEventListener("click", (e) => {
				let target = e.target;
				if (target.className != 'fas fa-pen') return;
				edit(target);
			});
			function edit(tr) {
				tr.parentElement.parentElement.contentEditable = true;
				let i = document.createElement("i");
				i.className = 'fas fa-check';
				tr.parentNode.replaceChild(i, tr);
			}
			// end
			// Сохранение строки
			table.addEventListener("click", (e) => {
				let target = e.target;
				if (target.className != 'fas fa-check') return;
				save(target);
			});
			function save(tr) {
				tr.parentElement.parentElement.contentEditable = false;
				let i = document.createElement("i");
				i.className = 'fas fa-pen';
				tr.parentNode.replaceChild(i, tr);
			}
			// end
		}})
	.catch((error)=>{
		console.log(error);
	})
};
// end
// Добавление пользователя
const addBtn = document.getElementById('add-btn'); 
const name = document.getElementById('name');
const phone = document.getElementById('phone');	

addBtn.addEventListener('click', (e) => {
	if (name.value && phone.value != '') {
		table.innerHTML += `
			<tr>
				<td>${name.value}</td>
				<td>${phone.value}</td>
				<td class="icons">
					<i class="fas fa-pen"></i>
					<i class="fas fa-trash-alt"></i>
				</td>
			</tr>
		`
	}
	
	name.value = phone.value = '';
});
// end
// Валидация полей
const events  = ['input', 'change', 'blur', 'keyup'];
for (let i in events) {
	phone.addEventListener(events[i], function() {
		let valuePhone = this.value.replace(/[^\+\d-]/, '');
		this.value = valuePhone;
	});
}
// end




