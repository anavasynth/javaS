function OnMouseOut() {
    let elem = document.getElementsByClassName('myDiv')
    for (let i = 0; i < elem.length; i++) {
        elem[i].innerHTML = 'Hello World!';
    }
    console.error("Vadym Honchariuk!")
}

let button = document.getElementById("funcButton")
button.addEventListener('mouseout', OnMouseOut)
