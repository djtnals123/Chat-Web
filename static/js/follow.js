

function follow(id) {
    $.ajax({
        url: '/follow',
        type: 'post',
        data: {followeeId: id},
        success: function(result){ 
            $(`#f${id}`).text('언팔로우');
            $(`#f${id}`).attr('onclick', `unfollow(${id})`);
        },
        error: function(err) {
            message = err.responseJSON.message
            alert(message);
        }
    });
}

function unfollow(id, deleteDiv) {
    $.ajax({
        url: `/follow/${id}`,
        type: 'delete',
        success: function(result){ 
            if(deleteDiv){
                $(`#f${id}`).remove();
            } else {
                $(`#f${id}`).text('팔로우');
                $(`#f${id}`).attr('onclick', `follow(${id})`);
            }
        },
        error: function(err) {
            message = err.responseJSON.message
            alert(message);
        }
    });
}