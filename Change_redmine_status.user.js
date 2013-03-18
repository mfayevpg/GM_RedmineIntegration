// ==UserScript==
// @name        Change redmine status
// @downloadURL https://raw.github.com/mfayevpg/GM_RedmineIntegration/master/Change_redmine_status.user.js
// @namespace   mfaye@voyageprive.com
// @description Change task status from github into redmine
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @include     https://github.com/vpg/*/pull/*
// @require     http://crypto.stanford.edu/sjcl/sjcl.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// @version     0.3
// ==/UserScript==

/**
 * Functions definitions
 * and other definitions
 */

var closeImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4hJREFUeNqck21MW2UUx8997m1v27X3ttDSMmVFHYXROZAtOEJkGKviLJFlL9kySRZj0EQTX8JMNFnEqInxox9YljiZcy9mWzabRbeA22BhkTXsBbKOMcAAIm1pSy+0pff2vjw+7Rx+9yS/D8/JyXP+53+eh8qGQtzC7ZFamqcWzA7uoaaCZl73NDAGE2AKw0okun72fN/nbEZ3xd7S9LO81ipSsgqPg95V6vx4uOvrE4ya87m2bem11D6fQAwLWioFmpRjpwKBT0KHvng3fWPodWNV9YxlU9UdLSsCaFoBtDg55bMlIqC7dGVdfPjuXoqmWLA4QAj9CcnBoQ1/nzjZaSayaJeNoZ2WNQZEg1HHrIKe2tp42Ky3CPTCgil6/FxXamyijSLSBFGD8O8DbebRCbCQc66hcpD31Q+w5U+CyVO+CiptbPjF1Oo/lsgX9d+k5o/8dBBLolfLpLYmA5ffs5G8zlkEZdsaevV6GJWi0yDF51dhGNagFPlfvhC5FzzAjk9Zsxd+2zzjXntcDN4ylQgxu0gko1dfEit37I6yvB1UMQtAwX+xfDcISyNB4+hXXd2DBhseAwO+7uDxkNWAx2gW92/cMD7dF+jAGDtFDYNEjHtMFmNAqiYDIMi632j9rLj9zUCaQaCPLQFKi5C0cLh4z65hvtn3QwQgukgaJiiqQJyApAwgvroKzOufAa7aK7g/aP+Ves6TpUlhkQJQYuapik1b6s2MaSdJ6VUiXSNdC+RXiBVgcDz5aBYmDUo8ocqyrOUvyKOLhSFz8ZKdq6mUjKXunBKPgzWzBDJRt7K8AlBXDQxyOYgpGJSJCMx2n96sjjxYQ+kBkkUceSQiZI4e5XlNarI3vXidLbYtojovQIoYSVTkAxUcRbQxfm90v3Dtapseq6B6PMmSzg8HDXv33YhZTcL9np6PJo/1/JhOJPcAQlbGZCRNH62CAfIic5HwjvDZU91ibI5bMlhX3O0dh1zbmw8L7km6wlu5O3bm7MH5gWv+ufGH/mdn3jnprKv9TlfseEAuwoyaXIbIzVuNf13u4/JzG3f6vy95reUIyCkNK4pW1vzCKY63Bm01obfDf/S/f/vLb/ebNtZsd7W8MlZGYYkBUQaVZi+mKrz1Lp6be6LF9w0CTcGqVpgzl/9UijpZ/taBTz2dHeJ0/9XWyPDUfWE2mkmd69VR+F8z/m/8I8AAk6Kca9YlLQ4AAAAASUVORK5CYII=';
var loadingGif = 'data:image/gif;base64,R0lGODlhLQAmAOZPAP///0VFRUSlTfj8+f3+/UinUE6qV1mvYd3v38LixVuwY/v9/KbUq225dODw4uTy5fX69er169rt22m3cV+yZ37BhKrWrvH48snly53Qof7//szmzne+fpLLmLHZtIvHkUuoU7vevqPTqM/o0vv9+/z+/HS8eo/JlJXMmsXjyPn8+Wa1bXC6d/f7+Ljdu/7+/r7gwoXEirTbuPz+/WO0avb69vb793q/gYjGjvz9/PP59O737/r9+t/v4K7YsqDRpKXUqbXcuZrPn2i2b3O7eubz5/n8+vX69vj8+M3n0Pr9+9zu3Y/JlVKsWtHp1P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAABPACwAAAAALQAmAAAH/4AAgoOEhYaHiImKi4yNjo+QkYIOMDIYEZKZAwwHAp6eEwmZjw4KngYcJzGdAhUDo4sOIAIFIguEGzQCDa+whwOmBwi/NwIdvocMtMOIAxQFzMiDpjiLCcbSgxKeI4sLBhTZgtcCF4wNArfZIZ69iibl4hieD4wKBeIAEZ4eiw+7+QBMEHBAHaIPAkQETOHpQ6JrBiAEBFDBEwdMhTwUEBBiIoABLE5lGCFBAoMVnjJ4HGRh1qdPBlysJPQABSsBExhInMmzp8+fQIMKChCJKFFkRx8lRVooQFKnR6ECMOp0kNRGS6MSMjp0qlevWrFu7Tq1qlauYMkyytr1bNuvaBeXKoJqNupVqXGHmk3bM6zQsn8DC/YVCAAh+QQFCgBPACwWAAMABwAFAAAHE4AIAIOEFoSEG4cAGooAQIo+AoEAIfkEBQoATwAsGwAGAAUABgAABw2AADkAhCqEh4iJioiBACH5BAUKAE8ALBsADAAFAAYAAAcOgACCg4SFhQ6EBRw8goEAIfkEBQoATwAsFwAQAAcABQAABxGAAIIAJIOGAAQRhwAVixSLgQAh+QQFCgBPACwOAA4ACgAHAAAHFoANPzsAhYaHiImKhwSLM4clhxCLioEAIfkEBQoATwAsAAAAAAEAAQAABwOAT4EAIfkEBQoATwAsDQAIAAQABwAABxKATylPhAAPQQQAiouMjYo2LYEAIfkEBQoATwAsDgAEAAYABgAABxaAAIIEACaDghYAL4IAPBqMkJE6JIyBACH5BAUKAE8ALBMAAwADAAQAAAcLgAAABIIANYIlgoEAIfkEBQoATwAsFgADAAcABQAABx2AMhgRT4VPAogTCYUnMQeIFUqGGzQNPIZPRkdPgQAh+QQFCgBPACwaAAUABgAHAAAHH4BPTwOCggINhIM3Ah2FAxQFCIUJjIULBhSFT0InBIEAIfkEBQoATwAsGwALAAUABwAABx+AT08NAguCJgIXggoFgg8CDYIfAiJPLSwGEIJPPYKBACH5BAUKAE8ALBcAEAAHAAUAAAccgACCAAkCBoMeBQIhKgwrAgIZgk2GLoMoDBCDgQAh+QQFCgBPACwSABEABwAEAAAHF4BPSE+EhAtDGSMSEk8eAo+QRSgHkBOBACH5BAUKAE8ALA4ADgAGAAcAAAcigE87S0+FTAIHC4UpAgIfhU8VjRwRTwMsjQaQFiCQhQ9PgQAh+QQFCgBPACwNAAkABAAHAAAHGoBPRD4DEgICTgmHFyGHAxiHDxGHHk8TT0+BACH5BAUKAE8ALA4ABAAGAAcAAAchgE+CAymCTw4KBRGHIAIFSQMKAgcITwyOlU+SOIaCI4aBADs=';
var redmineIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAPxQTFRFAAAA/wAAfwAAAAAA/wAA5AAM4wAM4wAM5AAMvwAA3AcA3QsA3QoA4gAL4wAN4wAM3QoA3AsA4AoA3AoA3AsA3AsA4gAF4wAL5AAL3AkA3QsA3QsA4wkAzAAA/wAA3goA3AsA/wAA3QsA3QsAxAAAygAAywAAzAAA4QcA2wUAywAAywAAzAAAzQAAzAAAygAAygAAzAAAvwAAzAAAywAAzAAA1AAAywAAywAAzQAAoQAAoAAApgAAyQAAxgAAoQAAoQAAoAAAoQAAoQAAoQAAoQAAogAAogAAogAAogAAoAAAogAAoAAAoQAAoQAA3QwA3QsAzAAAogAA////Ghi28QAAAE90Uk5TAAICAQS41dOpBEnrNY3VbUvmMTP76TZwcTv57xsFA4NgAYn7DXXkaSIxfPJQOOEiTboUfe7WBvvebKxsFC82HnU29oCWk/5rjMaH01FyvOgmDFMAAAABYktHRFN6Zx0GAAAACXBIWXMAAABIAAAASABGyWs+AAAAlElEQVQY02NgwAEYmZB5zCysbOwcDJwwPhc3Dy8fH7+AoBCELyziLyomLiEp5S8tA+LLyskHKABpRSVlBZAmFVU1dQ2wSkVNLW0dBgZdvcBAfYheg8BAQwYGI2MTU6jhZuYWlgwMVtY2tjDr7OwdHBmcgoKcYQIuQUGuDG5BQe4wAY+gIE8GL29vH5iAr7e3HwPpAAC4nBIFtEJwqAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMi0wOS0xOVQxNTo1MDo1NiswMjowMKD5w/0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTEtMDMtMTZUMjI6MzU6NDErMDE6MDAPFRk1AAAAAElFTkSuQmCC';

var translate = {};
translate.seeIssueInRedmine = 'Voir la demande dans Redmine';
translate.closeIssue = 'Fermer le point';
translate.childrenIssues = 'Demandes enfants';

var encKey = GM_getValue("encKey", "");
var redmineUrl = GM_getValue("redmineUrl", "");
var redmineApiKey = GM_getValue("redmineApi", "");

if (!encKey) {
    encKey = prompt(
        'Merci de spécifier une clé pour [' + location.hostname + ']. De l\'aléatoire:',
        ''
    );
    GM_setValue("encKey", encKey);

    redmineUrl = redmineApiKey = "";   // New key makes prev stored values (if any) unable to decode.
}
redmineUrl = decodeOrPrompt(redmineUrl, "Url d'accès à Redmine", "redmineUrl");
redmineApiKey = decodeOrPrompt(redmineApiKey, "redmine API-Key", "redmineApi");


function decodeOrPrompt(targVar, userPrompt, setValVarName) {
    if (targVar) {
        targVar = unStoreAndDecrypt(targVar);
    }
    else {
        targVar = prompt(userPrompt + ' not set for ' + location.hostname + '. Please enter it now:', '');
        GM_setValue(setValVarName, encryptAndStore(targVar));
    }
    return targVar;
}

function encryptAndStore(clearText) {
    return  JSON.stringify(sjcl.encrypt(encKey, clearText));
}

function unStoreAndDecrypt(jsonObj) {
    return  sjcl.decrypt(encKey, JSON.parse(jsonObj));
}

//-- Add menu commands that will allow U and P to be changed.
GM_registerMenuCommand("Change redmine url", changeRedmineUrl);
GM_registerMenuCommand("Change redmine API Key", changeredminApiKey);

function changeRedmineUrl() {
    promptAndChangeStoredValue(redmineUrl, "U-name", "redmineUrl");
}

function changeredminApiKey() {
    promptAndChangeStoredValue(redmineApiKey, "P-word", "redmineApi");
}

function promptAndChangeStoredValue(targVar, userPrompt, setValVarName) {
    targVar = prompt(
        'Change ' + userPrompt + ' for ' + location.hostname + ':',
        targVar
    );
    GM_setValue(setValVarName, encryptAndStore(targVar));
}

function getRedmineHeaderMap(){
    return {
        "Content-Type": "application/json",
        "X-Redmine-API-Key": redmineApiKey
    };
}

function closeDemand(issueId, callback) {
    var url = redmineUrl + 'issues/' + issueId + '.json';
    GM_xmlhttpRequest(
        {
            method: "PUT",
            url: url,
            data: '{"issue":{"status_id": 5}}',
            headers: getRedmineHeaderMap(),
            onload: function (response) {
                if (response.status == 200) {
                    callback(issueId);
                }else{
                    console.error('An error occured when calling API to close issue : ', response);
                }
            }
        });
}

var issueCache = {};

function getRedmineStatus(issueId, callback) {
    var url = redmineUrl + 'issues/' + issueId + '.json';
    if(!issueCache[issueId]){
        GM_xmlhttpRequest(
            {
                method: "GET",
                url: url,
                headers: getRedmineHeaderMap(),
                onload: function (response) {
                    if (response.status == 200) {
                        var parsedIssue = JSON.parse(response.responseText).issue;
                        issueCache[issueId] = parsedIssue;
                        callback(parsedIssue);
                    } else {
                        console.log('Erreur lors de la récupération des infos pour', issueId, response);
                    }
                }
            });
    }else{
        callback(issueCache[issueId]);
    }
}

function getMainIssueData(issueId, callback) {

    var url = redmineUrl + 'issues/' + issueId + '.json?include=children';
    console.log('Appel getMainIssueData', url);
    GM_xmlhttpRequest(
        {
            method: "GET",
            url: url,
            headers: getRedmineHeaderMap(),
            onload: function (response) {
                if (response.status == 200) {
                    var issueContainer = JSON.parse(response.responseText);
                    callback(issueContainer.issue);
                }
            }
        });
}

function getRedmineIssueUrl(issueId){
    return redmineUrl + 'issues/' + issueId;
}


/**
 *
 * MAIN
 *
 */
var issueObjectHash = {};
$(document).ready(function () {

    var regExp = new RegExp("[refs|fixes] ?#?([0-9]+)");
    var mainIssueId = $('.discussion-topic-title').text().replace('Point ', '').replace('refs #', '').replace('closes #').replace(' ', '_');
    getMainIssueData(mainIssueId, function (retrievedIssue) {

        var $branchTitle = $('h2.discussion-topic-title');
        var toInsert = '<h4>' + retrievedIssue.subject + '</h4>';
        var $mainTitle = $(toInsert);
        $mainTitle.insertAfter($branchTitle);
        if (retrievedIssue.children) {
            var childrenHtml = '<h4 class="discussion-topic-title">' + translate.childrenIssues + '</h4>';
            childrenHtml += '<ul style="margin-left: 15px;">';
            for (var i = 0; i < retrievedIssue.children.length; i++) {
                var currentChildIssue = retrievedIssue.children[i];
                childrenHtml += '<li id="childIssue_'+ currentChildIssue.id + '">' + currentChildIssue.id + ' : ';
                childrenHtml += '   <a href="' + getRedmineIssueUrl(currentChildIssue.id) + '" target="_blank">' + currentChildIssue.subject + '</a>';
                getRedmineStatus(currentChildIssue.id, function(currentIssue){
                    $('#childIssue_' + currentIssue.id).append('&nbsp;&#8594;&nbsp;' + currentIssue.status.name);
                });
                childrenHtml += '</li>';
            }
            childrenHtml += '</ul>';
            $(childrenHtml).insertAfter($mainTitle);
        }
    });

    var nbSpottedIssues = 0;
    $('a[class="message"]:visible').each(function () {
        var currentMessage = $(this).text();
        var result = regExp.exec(currentMessage);
        if (result != null && result.length == 2) {
            if (typeof(issueObjectHash[result[1]]) == 'undefined') {
                nbSpottedIssues++;
                issueObjectHash[result[1]] = [$(this)];
            } else {
                issueObjectHash[result[1]].push($(this));
            }
        }
    });

    for (var issueId in issueObjectHash) {
        getRedmineStatus(issueId, function (issueObject) {
            if (issueObject != null) {
                var jQueryWrapperListLength = issueObjectHash[issueObject.id].length;
                for (var j = 0; j < jQueryWrapperListLength; j++) {
                    var currentJQuery = issueObjectHash[issueObject.id][j];
                    var issueUrl = getRedmineIssueUrl(issueObject.id);

                    var linkHtml = '';
                    linkHtml += '<span style="font-size: 6px; float: left; width: 88px;">';
                    linkHtml += '    <a href="' + issueUrl + '" alt="' + translate.seeIssueInRedmine + '" ';
                    linkHtml += '       title="' + translate.seeIssueInRedmine + '" target="_blank">';
                    linkHtml += '        <img src="' + redmineIcon + '" />';
                    linkHtml += '    </a>&nbsp;';
                    linkHtml += '    <span style="float: right;">';
                    if (issueObject.status.id == 16) {
                        var linkId = issueObject.id + '_' + j;
                        linkHtml += '<a href="#" id="close_' + linkId + '" alt="' + translate.closeIssue + '" ';
                        linkHtml += '   title="' + translate.closeIssue + '" rel="' + issueObject.id + '">';
                        linkHtml += '   <img id="img_' + linkId + '" src="' + closeImg + '"/>';
                        linkHtml += '</a>&nbsp;';
                    } else {
                        linkHtml += issueObject.status.name;
                    }
                    linkHtml += '</span></span>';
                    currentJQuery.parent().prepend(linkHtml);
                    if (issueObject.status.id == 5) {
                        currentJQuery.css('text-decoration', 'line-through');
                    }
                }
            } else {
                console.log('NOK', issueObject);
            }
        });
    }
});

$(document).on('click', 'a[id^="close_"]', {}, function (event) {
    event.preventDefault();
    var clickedIssueId = $(this).attr('rel');
    console.log('about to close : ', clickedIssueId);
    $('img[id^="img_' + clickedIssueId + '"]').each(function () {
        $(this).attr('src', loadingGif);
    });
    closeDemand(clickedIssueId, function(issueId){
        $('img[id^="img_' + issueId + '"]').remove();
        var jQueryElementListLength = issueObjectHash[issueId].length;
        for (var i = 0; i < jQueryElementListLength; i++) {
            issueObjectHash[issueId][i].css('text-decoration', 'line-through');
        }
    });

});
$('span.css-truncate-target').each(function () {
    var cleanBranchName = $(this).text().replace(/\s+/g, '');
    $(this).wrapInner('<a href="https://github.com/vpg/dev_vp_bong/tree/' + cleanBranchName + '" target="_blank"></a>');
});
