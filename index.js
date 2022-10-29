const shortenUrl = document.getElementById('shorten-inp')
const shortenBtn = document.getElementById('shorten-btn')
const pleaseMobi = document.getElementById('please-mobi')
const pleaseDesk = document.getElementById('please-desk')
const linkDiv = document.getElementById('link-div')
var urls = []
const link = async (url) => {
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    if(res.status == 400){
        alert('invalid url')
        return
    }
    const data = await res.json()
    let result = data.result
    const {full_short_link, original_link} = result
    urls.push({short_link: full_short_link, original_link: original_link})
    linkDiv.innerHTML = ''
    urls.map(({short_link, original_link}) => {
        linkDiv.innerHTML +=
        `
        <div class="d-flex flex-column flex-md-row bg-white rounded px-3 py-3 mb-2">
            <p class="pt-2">${original_link}</p>
            <p class="text-info ms-md-auto pt-2" id='short_link'>${short_link}</p>
            <button class="btn  text-white h-25 mx-2 copy">copy</button>
        </div>
    
        `
    })
    const copybtns = [...document.querySelectorAll('.copy')]
    // console.log(copy)
    copybtns.forEach(copybtn => {
        copybtn.addEventListener('click', e => {
            let copiedText = e.path[1].children[1].innerText
            navigator.clipboard.writeText(copiedText)
            e.target.innerHTML = 'copied'
            e.target.style.backgroundColor = '#000'
        })
    })
}



shortenBtn.addEventListener('click', e => {
    e.preventDefault()
    if(shortenUrl.value == ''){
        shortenUrl.style.outline = '1px solid red'
        shortenUrl.focus()
        if(screen.width <= 766){
            pleaseMobi.style.display = 'block'
        }else{
            pleaseDesk.style.display = 'flex'
        }
        setTimeout(() => {
            shortenUrl.style.outline = 'none'
            pleaseMobi.style.display = 'none'
            pleaseDesk.style.display = 'none'
        }, 800)
    }else{
        link(shortenUrl.value)
        shortenUrl.value = ''
    }
})