function acceptRequest(id) {
    $('#userId').attr('value', id);
    $('#frm').attr('action', '/friend/accept');
    $('#frm').submit();
}

function refusRequest(id) {
    $('#userId').attr('value', id);
    $('#frm').attr('action', '/friend/refus');
    $('#frm').submit();
}