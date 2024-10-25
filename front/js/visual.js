function setupDropdownVisual() {
    window.onclick = function (e) {
        if (e.target.closest('.dropdown-check-list') === null) {
            document.querySelectorAll('.dropdown-check-list').forEach((el) => {
                el.classList.remove('visible');
            })
        }
    }
    document.querySelectorAll('.dropdown-check-list').forEach((el) => {
        el.getElementsByClassName('anchor')[0].onclick = function (e) {
            if (el.classList.contains('visible'))
                el.classList.remove('visible');
            else
                el.classList.add('visible');
        }
    })


}
