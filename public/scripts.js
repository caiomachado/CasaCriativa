function onOff() {
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")

    document.querySelector("input[name='title']").value = ""
    document.querySelector("input[name='category']").value = ""
    document.querySelector("input[name='image']").value = ""
    document.querySelector("input[name='description']").value = ""
    document.querySelector("input[name='link']").value = ""
}

function checkFields(event) {
    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]

    const isEmpty = valuesToCheck.find(function (value) {

        const checkIfItsString = typeof event.target[value].value === "string"
        const checkIfItsEmpty = !event.target[value].value.trim()
        if (checkIfItsString && checkIfItsEmpty) {
            return true
        }
    })

    if (isEmpty) {
        event.preventDefault()
        alert("Por favor, preencha todos os campos")
    }
}
