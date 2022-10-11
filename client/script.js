

let url = 'http://localhost:3001/dashboard'
let swapFunctions = true
let widow_bg = document.querySelector(".widow_bg")
function getInfo() {
    axios.get(url)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                if (swapFunctions === true) {
                    reloadTabl(res.data);
                } else if (swapFunctions === false) {
                    reloadPlitku(res.data)

                }

            }
        })
}

getInfo()

let add_form = document.forms.add_form

add_form.onsubmit = (event) => {
    event.preventDefault()


    let dashboard = {
        id: Math.random()
    }

    let frm = new FormData(add_form)

    frm.forEach((value, key) => {
        dashboard[key] = value
    })

    axios.post(url, dashboard)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                getInfo()
            }
        })


}


let create_cont = document.querySelector('.create_cont')


function reloadTabl(arr) {
    create_cont.innerHTML = ``
    let table = document.createElement('table')
    create_cont.append(table)
    table.innerHTML +=
        `<tr>
    <th>Заголовок задачи</th>
    <th>Описание задачи</th>
    <th>Дата</th>
    <th>Время</th>
    <th>Выполнено</th>
    <th>Действия</th>
    </tr>`
    for (let item of arr) {
        let tr = document.createElement('tr')
        let title = document.createElement('td')
        let description = document.createElement('td')
        let date = document.createElement('td')
        let time = document.createElement('td')
        let option = document.createElement('td')
        let edit = document.createElement('td')
        let edit_img = document.createElement('img')



        table.classList.add('table')
        option.classList.add('option')
        edit_img.classList.add('edit_img')
        edit_img.src = "./img/1976055_edit_edit document_edit file_edited_editing_icon.svg"
        title.innerHTML = item.title
        description.innerHTML = item.description
        date.innerHTML = item.date
        time.innerHTML = item.time
        if (item.option === "undone") {
            option.innerHTML = "Не выполнено"
            option.style.color = "#FF3F3F"
        } else if (item.option === "done") {
            option.innerHTML = "Готово"
            option.style.color = "#000000"
        } else if (item.option === "loading") {
            option.innerHTML = "В прогрессе"
            option.style.color = "#0F86FF"
        }
        table.append(tr)
        tr.append(title, description, date, time, option, edit)
        edit.append(edit_img)




        let edit_box = document.querySelector('.edit_box')
        let edit_close_bts = document.querySelector('.edit_close_bts')
        let edit_delete_bts = document.querySelector('.edit_delete_bts')




        edit_img.onclick = () => {
            let edit_title = document.querySelector('#title')
            let edit_description = document.querySelector('#description')
            let edit_date = document.querySelector('#date')
            let edit_time = document.querySelector('#time')

            edit_title.value = item.title
            edit_description.value = item.description
            edit_date.value = item.date
            edit_time.value = item.time
            let edit_form = document.forms.edit_form
            edit_form.onsubmit = (event) => {
                event.preventDefault()


                let dashboard = {
                    "id": item.id,
                }

                let frm = new FormData(edit_form)

                frm.forEach((value, key) => {
                    dashboard[key] = value
                })

                console.log(dashboard);
                axios.patch(`${url}/${item.id}`, dashboard)
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            getInfo()
                        }
                    })
            }

            edit_box.style.display = "block"
            widow_bg.style.display = "block"

            setTimeout(() => {
                edit_box.style.transform = "translate(-50%,-50%) scale(1)"
                edit_box.style.opacity = "1"
                widow_bg.style.opacity = "1"
            }, 200);

            edit_close_bts.onclick = () => {
                edit_box.style.transform = "translate(-50%,-50%) scale(0.01)"
                edit_box.style.opacity = "0"
                widow_bg.style.opacity = "0"
                setTimeout(() => {
                    edit_box.style.display = "none"
                    widow_bg.style.display = "none"
                }, 200);
            }


            edit_delete_bts.onclick = () => {
                let del = arr.indexOf(item)
                arr.splice(del, 1)
                let id = item.id

                axios.delete(`${url}/${id}`)
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            getInfo()
                        }
                    })
                edit_box.style.transform = "translate(-50%,-50%) scale(0.01)"
                edit_box.style.opacity = "0"
                widow_bg.style.opacity = "0"
                setTimeout(() => {
                    edit_box.style.display = "none"
                    widow_bg.style.display = "none"
                }, 200);

            }


        }
    }
}









function reloadPlitku(arr) {
    create_cont.innerHTML = ``

    for (let item of arr) {
        let box = document.createElement('div')
        let inline_box = document.createElement('div')
        let title = document.createElement('p')
        let description = document.createElement('p')
        let date = document.createElement('p')
        let time = document.createElement('p')
        let option = document.createElement('p')
        let edit_img_plitka = document.createElement('img')


        edit_img_plitka.classList.add('edit_img_plitka')
        edit_img_plitka.src = "./img/1976055_edit_edit document_edit file_edited_editing_icon.svg"
        box.classList.add('box')
        inline_box.classList.add('inline_box')
        title.classList.add('title')
        description.classList.add('description')
        date.classList.add('date')
        time.classList.add('time')
        option.classList.add('option')



        title.innerHTML = item.title
        description.innerHTML = item.description
        date.innerHTML = item.date
        time.innerHTML = item.time
        if (item.option === "undone") {
            option.innerHTML = "Не выполнено"
            option.style.color = "#FF3F3F"
        } else if (item.option === "done") {
            option.innerHTML = "Готово"
            option.style.color = "#000000"
        } else if (item.option === "loading") {
            option.innerHTML = "В прогрессе"
            option.style.color = "#0F86FF"
        }
        create_cont.append(box)
        box.append(title, description, inline_box, option, edit_img_plitka)
        inline_box.append(date, time)





        let edit_box = document.querySelector('.edit_box')
        let edit_close_bts = document.querySelector('.edit_close_bts')
        let edit_delete_bts = document.querySelector('.edit_delete_bts')

        edit_img_plitka.onclick = () => {
            edit_box.style.display = "block"
            widow_bg.style.display = "block"
            let edit_title = document.querySelector('#title')
            let edit_description = document.querySelector('#description')
            let edit_date = document.querySelector('#date')
            let edit_time = document.querySelector('#time')

            let edit_form = document.forms.edit_form
            edit_form.onsubmit = (event) => {
                event.preventDefault()


                let dashboard = {
                    "id": item.id,
                }

                let frm = new FormData(edit_form)

                frm.forEach((value, key) => {
                    dashboard[key] = value
                })

                console.log(dashboard);
                axios.patch(`${url}/${item.id}`, dashboard)
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            getInfo()
                        }
                    })
            }
            edit_title.value = item.title
            edit_description.value = item.description
            edit_date.value = item.date
            edit_time.value = item.time
            setTimeout(() => {
                edit_box.style.transform = "translate(-50%,-50%) scale(1)"
                edit_box.style.opacity = "1"
                widow_bg.style.opacity = "1"
            }, 200);

            edit_close_bts.onclick = () => {
                edit_box.style.transform = "translate(-50%,-50%) scale(0.01)"
                edit_box.style.opacity = "0"
                widow_bg.style.opacity = "0"
                setTimeout(() => {
                    edit_box.style.display = "none"
                    widow_bg.style.display = "none"
                }, 200);
            }


            edit_delete_bts.onclick = () => {
                let del = arr.indexOf(item)
                arr.splice(del, 1)
                let id = item.id

                axios.delete(`${url}/${id}`)
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            getInfo()
                        }
                    })
                edit_box.style.transform = "translate(-50%,-50%) scale(0.01)"
                edit_box.style.opacity = "0"
                widow_bg.style.opacity = "0"
                setTimeout(() => {
                    edit_box.style.display = "none"
                    widow_bg.style.display = "none"
                }, 200);

            }



        }
    }

}



let vid = document.querySelectorAll('.vid')


vid.forEach(swap => {
    swap.onclick = () => {

        if (swap.innerHTML === 'Таблица') {
            vid[1].classList.remove('active')
            swap.classList.add('active')
            swapFunctions = true
            getInfo()
        } else if (swap.innerHTML === 'Плитка') {
            vid[0].classList.remove('active')
            swap.classList.add('active')
            swapFunctions = false
            getInfo()

        }
    }
})






let open_add_window = document.querySelector(".open_add_window")
let add_window = document.querySelector(".add_window")
let close_add_window = document.querySelector(".close_add_window")
let add_inputs = document.querySelectorAll('.add_form input')


open_add_window.onclick = () => {
    add_window.style.display = "block"
    widow_bg.style.display = "block"



    setTimeout(() => {
        add_window.style.opacity = "1"
        widow_bg.style.opacity = "1"
        add_window.style.left = "50%"
        add_window.style.top = "50%"
        add_window.style.transform = "translateX(-50%)translateY(0%)scale(1)"
    }, 100);



}

close_add_window.onclick = () => {
    add_window.style.transform = "translate(0,0) scale(0.01)"
    add_window.style.left = "70px"
    add_window.style.top = "-430%"
    add_window.style.opacity = "0"
    widow_bg.style.opacity = "0"
    add_inputs.forEach(inp => {
        inp.value = ''
    })
    setTimeout(() => {
        add_window.style.display = "none"
        widow_bg.style.display = "none"
    }, 200);
}

