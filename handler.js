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

    let url = 'https://cdn.zapwp.net';
    let key = '51f0429e31298bf7461bed0a35589cb68d1babce';
    let retina = 'true';
    let webp = 'true';
    let width = '1';
    let quality = $('input[name="quality"]:checked').val();

    let form_data = new FormData();

    for (let index = 0; index < files.length; index++) {
        form_data.append("files[]", files[index]);
    }

    // AJAX request
    $.ajax({
        url: 'upload.php',
        type: 'post',
        data: form_data,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (response) {

            for (var index = 0; index < response.length; index++) {
                var src = response[index];

                // Add img element in <div id='preview'>
                $('#preview').append('<img src="' + url +
                    '/key:' + key +
                    '/q:' + quality +
                    '/retina:' + retina +
                    '/webp:' + webp +
                    '/w:' + width +
                    '/url:' + src +
                    '" width="200px;" height="200px">');
            }
        }
    });
};