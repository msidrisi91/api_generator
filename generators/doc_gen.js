tab_name = `<li class="nav-item" role="presentation"><a class="nav-link" role="tab" data-toggle="tab" href="#tab-3">$${model}</a></li>`;
tab_page = `<div class="tab-pane active" role="tabpanel" id="tab-3">
<p style="font-family: 'Fira Code', monospace;padding: 20px;">
    <strong>1. GET '/${model}/' (list of all users):</strong><br>
    <strong>&nbsp; &nbsp; &nbsp;response body:&nbsp;</strong><br>
    &nbsp; &nbsp; &nbsp; &nbsp;${get_response}<br><br>
    <strong>2. POST '/${model}/' :</strong><br>
    <strong>&nbsp; &nbsp; &nbsp;request body:&nbsp;</strong><br>
    &nbsp; &nbsp; &nbsp; &nbsp;${post_request}<br>
    <strong>&nbsp; &nbsp; &nbsp;response body ( success ):</strong><br>
    <strong>&nbsp; &nbsp; &nbsp; &nbsp;</strong>
    ${post_response_success}<br>
    <strong>&nbsp; &nbsp; &nbsp;response body ( failed ):</strong><br>
    <strong>&nbsp; &nbsp; &nbsp; &nbsp;</strong>
    ${post_response_failed}<br><br>
    <strong>3. DELETE '/${model}/' :</strong><br>
    <strong>&nbsp; &nbsp; &nbsp;response body ( success ):</strong><br>
    <strong>&nbsp; &nbsp; &nbsp; &nbsp;</strong>
    ${delete_response_success}<br>
    <strong>&nbsp; &nbsp; &nbsp;response body ( failed ):</strong><br>
    <strong>&nbsp; &nbsp; &nbsp; &nbsp;</strong>
    ${delete_response_failed}<br><br>
    <strong>4. GET '/${model}/:${model}Id' (list of all users):</strong><br>
    <strong>&nbsp; &nbsp; &nbsp;response body:&nbsp;</strong><br>
    &nbsp; &nbsp; &nbsp; &nbsp;${get_id_response}<br><br>
    <strong>5. PUT&nbsp;'/${model}/:${model}Id'&nbsp;:</strong><br>
    <strong>&nbsp; &nbsp; &nbsp;request body:&nbsp;</strong><br>
    &nbsp; &nbsp; &nbsp; &nbsp;${put_id_request}<br>
    <strong>&nbsp; &nbsp; &nbsp;response body ( success ):</strong><br>
    <strong>&nbsp; &nbsp; &nbsp; &nbsp;</strong>
    ${put_id_response_success}<br>
    <strong>&nbsp; &nbsp; &nbsp;response body ( failed ):</strong><br>
    <strong>&nbsp; &nbsp; &nbsp; &nbsp;</strong>
    ${put_id_response_failed}<br><br>
    <strong>6. DELETE&nbsp;'/${model}/:${model}Id'&nbsp;:</strong><br>
    <strong>&nbsp; &nbsp; &nbsp;response body ( success ):</strong><br>
    <strong>&nbsp; &nbsp; &nbsp; &nbsp;</strong>
    ${delete_id_response_success}<br>
    <strong>&nbsp; &nbsp; &nbsp;response body ( failed ):</strong><br>
    <strong>&nbsp; &nbsp; &nbsp; &nbsp;</strong>
    ${delete_id_response_failed}<br>
</p>
</div>`;