$(document).ready(function(){

    $('#submit').click(function(){

        let url = 'https://cdn.zapwp.net';
        let key = '51f0429e31298bf7461bed0a35589cb68d1babce';
        let retina = 'true';
        let webp = 'true';
        let width = '1';
        let quality = $('input[name="quality"]:checked').val();

        let form_data = new FormData();

        // Read selected files
        let total_files = document.getElementById('files').files.length;

        for (let index = 0; index < total_files; index++) {
            form_data.append("files[]", document.getElementById('files').files[index]);
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

                for(var index = 0; index < response.length; index++) {
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

    });

});