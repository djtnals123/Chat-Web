function friendRequest(userId) {
    $.ajax({
        url: '/friend/request',
        type: 'post',
        data: { userId },
        success: function(result){ 
            $(`#fr${userId}`).remove();
        },
        error: function(err) {
            message = err.responseJSON.message
            alert(message);
        }
    });
}