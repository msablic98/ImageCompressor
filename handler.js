$(document).ready(function() {
    let dropArea = document.getElementById("drop-area");

// Prevent default drag behaviors
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
        document.body.addEventListener(eventName, preventDefaults, false)
    })

// Highlight drop area when item is dragged over it
    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    })

    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    })

// Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false)

    function preventDefaults(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    function highlight(e) {
        dropArea.classList.add('highlight')
    }

    function unhighlight(e) {
        dropArea.classList.remove('active')
    }

    function handleDrop(e) {
        var dt = e.dataTransfer
        var files = dt.files

        uploadData(files)
    }
});

function uploadData(files) {

    let url = 'https://frankfurt.zapwp.net';
    let key = '51f0429e31298bf7461bed0a35589cb68d1babce';
    let retina = 'true';
    let webp = 'false';
    let width = '1';
    let quality = $('input[name="quality"]:checked').val();

    let form_data = new FormData();

    for (let index = 0; index < files.length; index++) {
        form_data.append("files[]", files[index]);
    }

    // AJAX request
    $.ajax({
        xhr: function() {
            let xhr = new window.XMLHttpRequest();
            let progressBar = document.getElementById('progress-bar');
            progressBar.style.visibility = 'visible';
            xhr.upload.addEventListener("progress", function(evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);
                    progressBar.value = percentComplete;

                    if (percentComplete === 100) {
                        progressBar.value = 0;
                        progressBar.style.visibility = 'hidden';
                    }

                }
            }, false);
            return xhr;
        },
        url: 'upload.php',
        type: 'post',
        data: form_data,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (response) {
            for (let index = 0; index < response.length; index++) {
                let src = response[index];
                let apiFullURL = url +
                    '/info:true' +
                    '/key:' + key +
                    '/q:' + quality +
                    '/retina:' + retina +
                    '/webp:' + webp +
                    '/w:' + width +
                    '/url:' + src;

                $.getJSON(apiFullURL, function(response) {
                    let imgUrl = response.data.img_url;
                    let before = response.data.before;
                    let after = response.data.after;

                    // Add img element in <div id='preview'>
                    $('#preview').append('<div><img src="' + imgUrl + '"><br>'
                    + '<span>Size before: ' + before + ' B</span><br>'
                    + '<span>Size after: ' + after + ' B</span></div>');
                });
            }
        }
    });
};