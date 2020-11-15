const { listIndexes } = require("../notes_api/models/users");


function get_value(m, a) {
    var t2 = "        ";
    var t3 = "            ";
    var t5 = t2 + t3;
    var wt =  "&nbsp; &nbsp; &nbsp; &nbsp;";
    var wt2 = wt + " &nbsp; &nbsp;";
    var fields = m['fields'];
    var model = m['name'];
    var get_response = '';
    var post_request = '';
    Object.keys(fields).forEach((f) => {
        if(f.includes('name')){
            get_response += t5 + w2 + fields[f] + ' : value\n';
            post_request += t5 + w2 + fields[f] + ' : value\n';
        }
    });
    if(m['fields']['userPOST']) {
        post_request += t5 + w2 + 'author : value\n';
    }
    if(m['timestamp']){
        post_request += t5 + w2 + 'timestamp : value\n';
    }
    var tab_name = t3 + `<li class="nav-item" role="presentation"><a class="nav-link" role="tab" data-toggle="tab" href="#tab-3">$${model}</a></li>`;
    var tab_page = t2 + `<div class="tab-pane" role="tabpanel" id="tab-3">
                <p style="font-family: 'Fira Code', monospace;padding: 20px;">
                    
                    <strong>1. GET '/${model}/' (list of all users):</strong><br>
                    <strong>&nbsp; &nbsp; &nbsp;response body:&nbsp;</strong><br>
                    &nbsp; &nbsp; &nbsp; &nbsp;[{
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'_id' : value,
${get_response}
                    &nbsp; &nbsp; &nbsp; &nbsp;}]
                    <br><br>

                    <strong>2. POST '/${model}/' :</strong><br>
                    <strong>&nbsp; &nbsp; &nbsp;request body:&nbsp;</strong><br>
                    &nbsp; &nbsp; &nbsp; &nbsp;{
${post_request}
                    &nbsp; &nbsp; &nbsp; &nbsp;}
                    <br>
                    <strong>&nbsp; &nbsp; &nbsp;response body:</strong><br>
                    &nbsp; &nbsp; &nbsp; &nbsp;{
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'_id' : value,
${get_response}
                    &nbsp; &nbsp; &nbsp; &nbsp;}
                    <br><br>
                    
                    <strong>3. DELETE '/${model}/' :</strong><br>
                    <strong>&nbsp; &nbsp; &nbsp;response body:</strong> "Respones from the MongoDB server"
                    <br><br>
                    
                    <strong>4. GET '/${model}/:${model}Id' (list of all users):</strong><br>
                    <strong>&nbsp; &nbsp; &nbsp;response body:&nbsp;</strong><br>
                    &nbsp; &nbsp; &nbsp; &nbsp;{
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'_id' : value,
${get_response}
                    &nbsp; &nbsp; &nbsp; &nbsp;}
                    <br><br>
                    
                    <strong>5. PUT&nbsp;'/${model}/:${model}Id'&nbsp;:</strong><br>
                    <strong>&nbsp; &nbsp; &nbsp;request body:&nbsp;</strong><br>
                    &nbsp; &nbsp; &nbsp; &nbsp;{
${post_request}
                    &nbsp; &nbsp; &nbsp; &nbsp;}
                    <br>
                    <strong>&nbsp; &nbsp; &nbsp;response body:</strong><br>
                    &nbsp; &nbsp; &nbsp; &nbsp;{
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'_id' : value,
${get_response}
                    &nbsp; &nbsp; &nbsp; &nbsp;}
                    <br><br>
                    
                    <strong>6. DELETE&nbsp;'/${model}/:${model}Id'&nbsp;:</strong><br>
                    <strong>&nbsp; &nbsp; &nbsp;response body:</strong><br>
                    &nbsp; &nbsp; &nbsp; &nbsp;{
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'_id' : value,
${get_response}
                    &nbsp; &nbsp; &nbsp; &nbsp;}
                </p>
            </div>`;
    return { 'name' : tab_name, 'page' : tab_page};
}

function generate(doc) {

}

module.exports.get_value = get_value;
module.exports.generate = generate;